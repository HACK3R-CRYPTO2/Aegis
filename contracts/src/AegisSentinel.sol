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

    // Manual subscription to Oracle (Sepolia)
    function subscribeToOracle(address _contract) external {
        require(msg.sender == owner, "Only owner");

        bytes memory payload = abi.encodeWithSignature(
            "subscribe(uint256,address,uint256,uint256,uint256,uint256)",
            SEPOLIA_CHAIN_ID,
            _contract,
            uint256(keccak256("PriceUpdate(uint256,uint256)")),
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );

        (bool success, ) = address(service).call(payload);
        require(success, "Oracle Subscription failed");
    }

    // Manual subscription to Registry (Unichain)
    function subscribeToRegistry(address _contract) external {
        require(msg.sender == owner, "Only owner");

        bytes memory payload = abi.encodeWithSignature(
            "subscribe(uint256,address,uint256,uint256,uint256,uint256)",
            UNICHAIN_CHAIN_ID,
            _contract,
            uint256(
                keccak256(
                    "NewFeedback(uint256,address,address,uint64,int128,uint8,string,string,string,string,bytes32)"
                )
            ),
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );

        (bool success, ) = address(service).call(payload);
        require(success, "Registry Subscription failed");
    }

    function react(LogRecord calldata log) external override vmOnly {
        // Price Update Logic (from Sepolia)
        if (
            log.chain_id == SEPOLIA_CHAIN_ID &&
            log.topic_0 == uint256(keccak256("PriceUpdate(uint256,uint256)"))
        ) {
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
        // NewFeedback Logic (from Unichain)
        else if (
            log.chain_id == UNICHAIN_CHAIN_ID &&
            log.topic_0 ==
            uint256(
                keccak256(
                    "NewFeedback(uint256,address,address,uint64,int128,uint8,string,string,string,string,bytes32)"
                )
            )
        ) {
            // Event: NewFeedback(unused, agentAddress, unused, ...)
            // Topic 1: agentId (indexed)
            // Topic 2: agentAddress (indexed)
            // Topic 3: clientAddress (indexed)

            address agent = address(uint160(log.topic_2));

            // Decode non-indexed data: index, value, decimals, tag1, tag2, endpoint, uri, hash
            (, int128 value, , , , , , ) = abi.decode(
                log.data,
                (uint64, int128, uint8, string, string, string, string, bytes32)
            );

            // Logic: If positive volume intervention, boost reputation
            if (value > 0) {
                // Set Reputation to 100 (Trusted)
                bytes memory payload = abi.encodeWithSignature(
                    "setAgentReputation(address,uint256)",
                    agent,
                    100
                );

                emitCallback(UNICHAIN_CHAIN_ID, aegisHook, 1000000, payload);
            }
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
