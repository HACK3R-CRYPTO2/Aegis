// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IReactive} from "reactive-lib/interfaces/IReactive.sol";
import {
    AbstractReactive
} from "reactive-lib/abstract-base/AbstractReactive.sol";
import {SystemContract} from "system-smart-contracts/SystemContract.sol";

contract AegisSentinel is AbstractReactive {
    // --- Configuration ---
    address public owner;
    uint256 public constant CRASH_THRESHOLD = 1500 ether;

    address public aegisHook;

    uint256 public constant SEPOLIA_CHAIN_ID = 11155111;
    uint256 public constant UNICHAIN_CHAIN_ID = 1301;

    // --- Events ---
    event PanicTriggered(uint256 price);

    // Constructor now calls parameterless AbstractReactive()
    constructor(
        address /* _service */, // Ignored as AbstractReactive uses hardcoded service
        address _aegisHook,
        address _mockOracle
    ) AbstractReactive() {
        owner = msg.sender;
        aegisHook = _aegisHook;
        // Subscription moved to subscribeToOracle()
    }

    // Manual subscription function to be called after deployment
    function subscribeToOracle(address _mockOracle) external {
        require(msg.sender == owner, "Only owner");

        // Subscription logic to MockOracle
        bytes memory payload = abi.encodeWithSignature(
            "subscribe(uint256,address,uint256,uint256,uint256,uint256)",
            SEPOLIA_CHAIN_ID,
            _mockOracle,
            uint256(keccak256("PriceUpdate(uint256,uint256)")),
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );

        (bool success, ) = address(service).call(payload);
        require(success, "Subscription failed");
    }

    // Updated Signature: react(LogRecord calldata log)
    function react(LogRecord calldata log) external override vmOnly {
        if (log.chain_id != SEPOLIA_CHAIN_ID) return;

        // Decode: price is the first unindexed parameter in data
        (uint256 price, ) = abi.decode(log.data, (uint256, uint256));

        if (price < CRASH_THRESHOLD) {
            emit PanicTriggered(price);

            bytes memory payload = abi.encodeWithSignature(
                "setPanicMode(bool)",
                true
            );

            emitCallback(UNICHAIN_CHAIN_ID, aegisHook, 1000000, payload);
        }
    }

    // Helper to emit callback
    function emitCallback(
        uint256 chain_id,
        address _contract,
        uint64 gas_limit,
        bytes memory payload
    ) internal {
        emit Callback(chain_id, _contract, gas_limit, payload);
    }
}
