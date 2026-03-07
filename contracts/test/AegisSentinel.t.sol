// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {AegisSentinel} from "../src/AegisSentinel.sol";
import {IReactive} from "reactive-lib/interfaces/IReactive.sol";

contract AegisSentinelTest is Test {
    AegisSentinel sentinel;
    address hook = address(0x1234);
    address mockOracle = address(0x5678);
    address registry = address(0x9ABC);
    address agent = address(0xDEF0);

    event Callback(
        uint256 indexed chain_id,
        address indexed _contract,
        uint64 indexed gas_limit,
        bytes payload
    );

    function setUp() public {
        sentinel = new AegisSentinel(address(0), hook, mockOracle);
    }

    function test_ReactToFeedback() public {
        // 1. Construct Mock Log for NewFeedback
        // Event: NewFeedback(unused, agentAddress, unused, ...)
        // Topic 0: Keccak("NewFeedback(...)")
        // Topic 1: agentId (indexed)
        // Topic 2: agentAddress (indexed) -> WE NEED THIS
        // Topic 3: clientAddress (indexed)

        bytes32 topic0 = keccak256(
            "NewFeedback(uint256,address,address,uint64,int128,uint8,string,string,string,string,bytes32)"
        );
        bytes32 topic1 = bytes32(uint256(1)); // AgentID = 1
        bytes32 topic2 = bytes32(uint256(uint160(agent))); // Agent Address

        // Data: index (u64), value (i128), decimals (u8), ... (strings)
        // We only care about value > 0
        bytes memory data = abi.encode(
            uint64(0), // index
            int128(100), // value (positive)
            uint8(18), // decimals
            "tag1",
            "tag2",
            "http",
            "ipfs",
            bytes32(0)
        );

        IReactive.LogRecord memory log = IReactive.LogRecord({
            chain_id: 11155111, // Sepolia
            _contract: registry,
            topic_0: uint256(topic0),
            topic_1: uint256(topic1),
            topic_2: uint256(topic2),
            topic_3: 0,
            data: data,
            block_number: 12345,
            op_code: 1,
            block_hash: 0,
            tx_hash: 0,
            log_index: 0
        });

        // 2. Expect Callback
        bytes memory expectedPayload = abi.encodeWithSignature(
            "setAgentReputation(address,uint256)",
            agent,
            100 // Trusted Score
        );

        vm.expectEmit(true, true, true, true);
        emit Callback(1301, hook, 1000000, expectedPayload);

        // 3. Call react
        vm.prank(address(0)); // vmOnly
        sentinel.react(log);
    }
}
