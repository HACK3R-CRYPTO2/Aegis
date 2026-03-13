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

    event AgentReputationBoosted(address indexed agent, uint256 score);

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
            chain_id: 1301, // Unichain
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

        vm.expectEmit(true, false, false, true);
        emit AgentReputationBoosted(agent, 100);

        vm.expectEmit(true, true, true, true);
        emit Callback(1301, hook, 1000000, expectedPayload);

        // 3. Call react
        vm.prank(address(0)); // vmOnly
        sentinel.react(log);
    }

    function test_ReactToPriceUpdate_Consensus() public {
        // 1. First breach - No callback yet
        IReactive.LogRecord memory log = _createPriceLog(1000 ether);
        
        vm.prank(address(0));
        sentinel.react(log);
        assertEq(sentinel.currentConfirmations(), 1);

        // 2. Second breach - Trigger Callback
        bytes memory expectedPayload = abi.encodeWithSignature("setPanicMode(bool)", true);
        vm.expectEmit(true, true, true, true);
        emit Callback(1301, hook, 1000000, expectedPayload);

        vm.prank(address(0));
        sentinel.react(log);
        assertEq(sentinel.currentConfirmations(), 2);
    }

    function _createPriceLog(uint256 price) internal view returns (IReactive.LogRecord memory) {
         return IReactive.LogRecord({
            chain_id: 11155111,
            _contract: mockOracle,
            topic_0: 0xc25b2dced4384fb51ce018b01853e1c22dcfdf8b2c95ab0f8672e44b8b31f24c,
            topic_1: 0,
            topic_2: 0,
            topic_3: 0,
            data: abi.encode(price, block.timestamp),
            block_number: 12345,
            op_code: 1,
            block_hash: 0,
            tx_hash: 0,
            log_index: 0
        });
    }
}
