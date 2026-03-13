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
    address public immutable owner;

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

    /// @notice Intercepts swaps to enforce panic mode and tiered fees
    /// @param params Swap parameters
    /// @return selector The function selector
    /// @return delta The swap delta (ZERO_DELTA)
    /// @return lpFee The dynamic fee for LPs (with 0x800000 flag)
    function _beforeSwap(
        address,
        PoolKey calldata,
        SwapParams calldata params,
        bytes calldata
    ) internal override returns (bytes4, BeforeSwapDelta, uint24) {
        uint24 fee = DEFAULT_FEE;

        if (panicMode) {
            // Senior optimization: Use EIP-8004 identity for tiered fees
            // Check reputation of tx.origin (standard for agents)
            if (agentReputation[tx.origin] >= REPUTATION_THRESHOLD) {
                fee = PANIC_VIP_FEE;

                // Gas Optimization: Only call registry if volume is significant or for metrics
                if (guardianRegistry != address(0)) {
                    _recordHeroicIntervention(tx.origin, params.amountSpecified);
                }
            } else {
                fee = PANIC_BOT_FEE;
            }
        }

        // Return with dynamic fee flag (0x800000) to allow hook-defined fees
        return (
            BaseHook.beforeSwap.selector,
            BeforeSwapDeltaLibrary.ZERO_DELTA,
            fee | 0x800000
        );
    }

    /// @dev Internal helper to record intervention volume (Agentic Metrics)
    function _recordHeroicIntervention(address agent, int256 amount) internal {
        (bool successId, bytes memory dataId) = guardianRegistry.staticcall(
            abi.encodeWithSignature("getAgentId(address)", agent)
        );

        if (successId && dataId.length == 32) {
            uint256 agentId = abi.decode(dataId, (uint256));
            if (agentId > 0) {
                uint256 volume = amount > 0 ? uint256(amount) : uint256(-amount);
                // Non-blocking call to giveFeedback
                guardianRegistry.call(
                    abi.encodeWithSignature(
                        "giveFeedback(uint256,int128,uint8,string,string,string,string,bytes32)",
                        agentId,
                        int128(int256(volume)),
                        18,
                        "stabilized_volume",
                        "panic_mode",
                        "",
                        "",
                        bytes32(0)
                    )
                );
            }
        }
    }
}
