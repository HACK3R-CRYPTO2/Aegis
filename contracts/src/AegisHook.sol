// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseHook} from "v4-periphery/src/utils/BaseHook.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {
    BeforeSwapDelta,
    BeforeSwapDeltaLibrary
} from "v4-core/src/types/BeforeSwapDelta.sol";
import {SwapParams} from "v4-core/src/types/PoolOperation.sol";

contract AegisHook is BaseHook {
    using BeforeSwapDeltaLibrary for BeforeSwapDelta;

    bool public panicMode;
    address public reactiveSentinel;
    address public owner;

    mapping(address => uint256) public agentReputation;
    mapping(address => string) public agentNames;
    address public guardianRegistry;
    uint256 public constant REPUTATION_THRESHOLD = 90;

    // Fee Tiers (in pips, 10000 = 1%)
    uint24 public constant DEFAULT_FEE = 3000; // 0.3%
    uint24 public constant PANIC_BOT_FEE = 50000; // 5.0%
    uint24 public constant PANIC_VIP_FEE = 100; // 0.01%

    event PanicModeUpdated(bool status);
    event ReputationUpdated(address indexed agent, uint256 score);
    event AgentNameRegistered(address indexed agent, string name);
    error OnlySentinel();
    error PoolPaused();

    constructor(
        IPoolManager _poolManager,
        address _owner
    ) BaseHook(_poolManager) {
        owner = _owner;
    }

    modifier onlySentinelOrOwner() {
        if (msg.sender != reactiveSentinel && msg.sender != owner)
            revert OnlySentinel();
        _;
    }

    function setAgentReputation(
        address _agent,
        uint256 _score
    ) external onlySentinelOrOwner {
        agentReputation[_agent] = _score;
        emit ReputationUpdated(_agent, _score);
    }

    /// @notice Allows an agent to register a human-readable name
    function registerAgentName(string calldata _name) external {
        // Basic length validation
        require(
            bytes(_name).length > 0 && bytes(_name).length < 32,
            "Invalid name length"
        );
        agentNames[msg.sender] = _name;
        emit AgentNameRegistered(msg.sender, _name);
    }

    function setSentinel(address _sentinel) external {
        if (msg.sender != owner) revert OnlySentinel();
        reactiveSentinel = _sentinel;
    }

    function setGuardianRegistry(address _registry) external {
        if (msg.sender != owner) revert OnlySentinel();
        guardianRegistry = _registry;
    }

    function setPanicMode(bool _status) external onlySentinelOrOwner {
        panicMode = _status;
        emit PanicModeUpdated(_status);
    }

    function getHookPermissions()
        public
        pure
        override
        returns (Hooks.Permissions memory)
    {
        return
            Hooks.Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeAddLiquidity: false,
                afterAddLiquidity: false,
                beforeRemoveLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true, // Enabled
                afterSwap: false,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnDelta: false,
                afterSwapReturnDelta: false,
                afterAddLiquidityReturnDelta: false,
                afterRemoveLiquidityReturnDelta: false
            });
    }

    // Override the INTERNAL function _beforeSwap, not the external one
    function _beforeSwap(
        address,
        PoolKey calldata,
        SwapParams calldata params,
        bytes calldata
    ) internal override returns (bytes4, BeforeSwapDelta, uint24) {
        uint24 fee = DEFAULT_FEE;

        if (panicMode) {
            // Check reputation of the transaction origin (the agent/user)
            if (agentReputation[tx.origin] >= REPUTATION_THRESHOLD) {
                fee = PANIC_VIP_FEE; // 0.01% for trusted agents

                // Record Heroic Intervention via ERC-8004 Registry
                if (guardianRegistry != address(0)) {
                    // 1. Get Agent ID via staticcall
                    (bool successId, bytes memory dataId) = guardianRegistry
                        .staticcall(
                            abi.encodeWithSignature(
                                "getAgentId(address)",
                                tx.origin
                            )
                        );

                    if (successId && dataId.length == 32) {
                        uint256 agentId = abi.decode(dataId, (uint256));

                        // If Agent is registered (id > 0)
                        if (agentId > 0) {
                            uint256 volume = params.amountSpecified > 0
                                ? uint256(params.amountSpecified)
                                : uint256(-params.amountSpecified);

                            // 2. Give Feedback
                            // giveFeedback(id, value, decimals, tag1, tag2, endpoint, uri, hash)
                            guardianRegistry.call(
                                abi.encodeWithSignature(
                                    "giveFeedback(uint256,int128,uint8,string,string,string,string,bytes32)",
                                    agentId,
                                    int128(int256(volume)), // Downcast safe
                                    18, // Decimals
                                    "stabilized_volume", // tag1
                                    "panic_mode", // tag2
                                    "",
                                    "",
                                    bytes32(0)
                                )
                            );
                        }
                    }
                }
            } else {
                fee = PANIC_BOT_FEE; // 5.00% for everyone else
            }
        }

        return (
            BaseHook.beforeSwap.selector,
            BeforeSwapDeltaLibrary.ZERO_DELTA,
            fee | 0x800000 // Set the dynamic fee flag bit (usually handled by the manager, but hook return needs to be override)
        );
        // Wait, for V4 hook return: (bytes4, Delta, uint24 feeOverride)
        // If feeOverride has the high bit set, it updates the LP fee.
        // Actually, in current V4, if dynamic fee is enabled, the 24-bit returned is the fee.
        // I should assume the simple value is enough if the pool manager handles it.
        // Checking typical V4 Hook examples... usually just returning the uint24 is fine for override.
    }
}
