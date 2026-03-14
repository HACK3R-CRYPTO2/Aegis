// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {AegisSentinel} from "../src/AegisSentinel.sol";
import {IReactive} from "reactive-lib/interfaces/IReactive.sol";

contract AegisSentinelTest is Test {
    AegisSentinel sentinel;
    address hook = address(0x1234);
    address mockOracle = address(0x5678);

    event Callback(
        uint256 indexed chain_id,
        address indexed _contract,
        uint64 indexed gas_limit,
        bytes payload
    );

    function setUp() public {
        sentinel = new AegisSentinel(address(0), hook, mockOracle);
    }

    function test_ReactToPriceUpdate_Consensus() public {
        uint256 crashPrice = 1000 ether;
        // 1. First breach - No callback yet
        IReactive.LogRecord memory log = _createPriceLog(crashPrice);
        
        vm.prank(address(0));
        sentinel.react(log);
        assertEq(sentinel.currentConfirmations(), 1);

        // 2. Second breach - Trigger Callback with Price
        bytes memory expectedPayload = abi.encodeWithSignature("setL1Price(uint256,bool)", crashPrice, true);
        vm.expectEmit(true, true, true, true);
        emit Callback(1301, hook, 1000000, expectedPayload);

        vm.prank(address(0));
        sentinel.react(log);
        assertEq(sentinel.currentConfirmations(), 2);
    }

    function test_ReactToPriceUpdate_Recovery() public {
        // 1. Crash first
        IReactive.LogRecord memory crashLog = _createPriceLog(1000 ether);
        vm.prank(address(0));
        sentinel.react(crashLog);
        vm.prank(address(0));
        sentinel.react(crashLog);
        assertEq(sentinel.currentConfirmations(), 2);

        // 2. Recovery - Trigger Callback with high price and armed=false
        uint256 recoveryPrice = 2000 ether;
        IReactive.LogRecord memory recoveryLog = _createPriceLog(recoveryPrice);
        
        bytes memory expectedPayload = abi.encodeWithSignature("setL1Price(uint256,bool)", recoveryPrice, false);
        vm.expectEmit(true, true, true, true);
        emit Callback(1301, hook, 1000000, expectedPayload);

        vm.prank(address(0));
        sentinel.react(recoveryLog);
        assertEq(sentinel.currentConfirmations(), 0);
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
