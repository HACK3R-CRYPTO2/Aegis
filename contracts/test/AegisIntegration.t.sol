// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseTest} from "./utils/BaseTest.sol";
import {MockOracle} from "../src/MockOracle.sol";
import {AegisHook} from "../src/AegisHook.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {
    BeforeSwapDelta,
    BeforeSwapDeltaLibrary
} from "v4-core/src/types/BeforeSwapDelta.sol";
import {SwapParams} from "v4-core/src/types/PoolOperation.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";

contract AegisIntegrationTest is BaseTest {
    MockOracle oracle;
    AegisHook hook;
    address sentinel = address(0x999);

    function setUp() public {
        // 1. Deploy v4 Setup (PoolManager, etc)
        deployArtifactsAndLabel();

        // 2. Deploy Oracle
        oracle = new MockOracle();

        // 3. Mine Salt & Deploy Hook
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);
        (address hookAddress, bytes32 salt) = HookMiner.find(
            address(this),
            flags,
            type(AegisHook).creationCode,
            abi.encode(address(poolManager), address(this))
        );

        hook = new AegisHook{salt: salt}(poolManager, address(this));
        require(address(hook) == hookAddress, "Hook address mismatch");

        // 4. Configure Hook
        hook.setSentinel(sentinel);
    }

    function test_PanicFlow() public {
        // A. Initial State: Panic is FALSE
        assertEq(hook.panicMode(), false);

        // B. Simulate Crash on Oracle
        uint256 newPrice = 1000 ether;
        oracle.setPrice(newPrice);

        // C. Sentinel sends message to Hook
        vm.prank(sentinel);
        hook.setPanicMode(true);

        // D. Verify Hook State
        assertEq(hook.panicMode(), true);

        // E. Verify Swap REVERTS due to PoolPaused
        PoolKey memory key;
        SwapParams memory params;

        vm.prank(address(poolManager));
        vm.expectRevert(AegisHook.PoolPaused.selector);
        hook.beforeSwap(address(0), key, params, "");
    }

    function test_AccessControl_Revert() public {
        // 1. Try to set panic mode as a random user (not sentinel, not owner)
        address randomUser = address(0x12345);
        vm.prank(randomUser);

        // 2. Expect Revert "OnlySentinel"
        vm.expectRevert(AegisHook.OnlySentinel.selector);
        hook.setPanicMode(true);
    }
}
