// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IReactive} from "reactive-lib/interfaces/IReactive.sol";
import {
    AbstractReactive
} from "reactive-lib/abstract-base/AbstractReactive.sol";
import {SystemContract} from "system-smart-contracts/SystemContract.sol";

contract AegisSentinel is AbstractReactive {
    // --- Constants (Gas Optimization) ---
    uint256 public constant CRASH_THRESHOLD = 1500 ether;
    uint256 public constant SEPOLIA_CHAIN_ID = 11155111;
    uint256 public constant UNICHAIN_CHAIN_ID = 1301;

    // Pre-calculated topic hashes to avoid runtime keccak256 (Production Standard)
    uint256 private constant TOPIC_PRICE_UPDATE = 0xc25b2dced4384fb51ce018b01853e1c22dcfdf8b2c95ab0f8672e44b8b31f24c;
    uint256 private constant TOPIC_FEEDBACK = 0x6255e82cc5d38fd9ae9676f1beedee31dd8926eb0b9bfcd9e4c8f419b18d1643;

    // --- State ---
    address public immutable owner;
    address public immutable aegisHook;
    uint256 public constant MIN_CONFIRMATIONS = 2; // Aegis Prime Consensus Requirement
    uint256 public currentConfirmations;

    // --- Events ---
    event PanicTriggered(uint256 indexed price);
    event AgentReputationBoosted(address indexed agent, uint256 score);

    /// @notice Senior-grade constructor targeting cross-chain endpoints
    /// @param _aegisHook The Uniswap v4 Hook address on Unichain
    constructor(
        address _service,
        address _aegisHook,
        address /* _mockOracle */
    ) AbstractReactive() {
        owner = msg.sender;
        service = SystemContract(payable(_service));
        aegisHook = _aegisHook;
    }

    /// @notice Subscribes to the Oracle Price Feed on Ethereum Sepolia
    /// @param _contract Address of the MockOracle
    function subscribeToOracle(address _contract) external {
        if (msg.sender != owner) revert("Only owner");

        bytes memory payload = abi.encodeWithSignature(
            "subscribe(uint256,address,uint256,uint256,uint256,uint256)",
            SEPOLIA_CHAIN_ID,
            _contract,
            TOPIC_PRICE_UPDATE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );

        (bool success, ) = address(service).call(payload);
        if (!success) revert("Subscription failed");
    }

    /// @notice Subscribes to the Cross-Chain Identity Registry
    /// @param _contract Address of AegisGuardianRegistry on Unichain
    function subscribeToRegistry(address _contract) external {
        if (msg.sender != owner) revert("Only owner");

        bytes memory payload = abi.encodeWithSignature(
            "subscribe(uint256,address,uint256,uint256,uint256,uint256)",
            UNICHAIN_CHAIN_ID,
            _contract,
            TOPIC_FEEDBACK,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );

        (bool success, ) = address(service).call(payload);
        if (!success) revert("Subscription failed");
    }

    /// @notice Core reaction logic (Reactive Virtual Machine Entrypoint)
    /// @dev Senior implementation: Decoupled logic from emission logic
    function react(LogRecord calldata log) external override vmOnly {
        // Branch 1: Market Crash Detection (Sepolia -> Unichain)
        if (log.chain_id == SEPOLIA_CHAIN_ID && log.topic_0 == TOPIC_PRICE_UPDATE) {
            _handlePriceUpdate(log.data);
        }
        // Branch 2: Heroic Intervention Capture (Unichain -> Analytics)
        else if (log.chain_id == UNICHAIN_CHAIN_ID && log.topic_0 == TOPIC_FEEDBACK) {
            _handleFeedback(log.topic_2, log.data);
        }
    }

    // --- Internal Helpers (Production Ready) ---

    function _handlePriceUpdate(bytes calldata data) internal {
        (uint256 price, ) = abi.decode(data, (uint256, uint256));
        
        if (price < CRASH_THRESHOLD) {
            currentConfirmations++;
            if (currentConfirmations >= MIN_CONFIRMATIONS) {
                emit PanicTriggered(price);
                _emitCallback(UNICHAIN_CHAIN_ID, aegisHook, abi.encodeWithSignature("setPanicMode(bool)", true));
            }
        } else {
            // Market Stabilized - Reset Consensus
            currentConfirmations = 0;
            _emitCallback(UNICHAIN_CHAIN_ID, aegisHook, abi.encodeWithSignature("setPanicMode(bool)", false));
        }
    }

    function _handleFeedback(uint256 agentTopic, bytes calldata data) internal {
        address agent = address(uint160(agentTopic));
        (, int128 value, , , , , , ) = abi.decode(data, (uint64, int128, uint8, string, string, string, string, bytes32));

        if (value > 0) {
            emit AgentReputationBoosted(agent, 100);
            _emitCallback(UNICHAIN_CHAIN_ID, aegisHook, abi.encodeWithSignature("setAgentReputation(address,uint256)", agent, 100));
        }
    }

    function _emitCallback(uint256 chainId, address target, bytes memory payload) internal {
        emit Callback(chainId, target, 1000000, payload);
    }
}
