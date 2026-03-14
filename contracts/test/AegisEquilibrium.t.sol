// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseTest} from "./utils/BaseTest.sol";
import {AegisHook} from "../src/AegisHook.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {
    BeforeSwapDelta,
    BeforeSwapDeltaLibrary
} from "v4-core/src/types/BeforeSwapDelta.sol";
import {SwapParams} from "v4-core/src/types/PoolOperation.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";

import {Currency} from "v4-core/src/types/Currency.sol";
import {LPFeeLibrary} from "v4-core/src/libraries/LPFeeLibrary.sol";

contract AegisEquilibriumTest is BaseTest {
    AegisHook hook;
    address sentinel = address(0x999);
    Currency currency0;
    Currency currency1;

    PoolKey key;

    function setUp() public {
        deployArtifactsAndLabel();

        // 1. Deploy Currencies
        (currency0, currency1) = deployCurrencyPair();

        // 2. Mine Salt & Deploy Hook
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);
        (address hookAddress, bytes32 salt) = HookMiner.find(
            address(this),
            flags,
            type(AegisHook).creationCode,
            abi.encode(address(poolManager), address(this))
        );

        hook = new AegisHook{salt: salt}(poolManager, address(this));
        hook.setSentinel(sentinel);

        // 3. Define Pool Key
        key = PoolKey({
            currency0: currency0,
            currency1: currency1,
            fee: LPFeeLibrary.DYNAMIC_FEE_FLAG,
            tickSpacing: 60,
            hooks: hook
        });
    }

    function test_DefaultFee_NormalMarket() public {
        SwapParams memory params;

        vm.prank(address(poolManager));
        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");
        
        uint24 fee = returnedFee & LPFeeLibrary.REMOVE_OVERRIDE_MASK;
        assertEq(fee, 3000); // 0.3%
    }

    function test_EquilibriumFee_NoDivergence() public {
        // Arm the shield but set price equal to pool price
        uint160 sqrtPriceX96 = 79228162514264337593543950336; // 1:1, Price = 1
        uint256 l1Price = 1e18; // $1

        // Initialize Pool with price
        poolManager.initialize(key, sqrtPriceX96);

        vm.prank(sentinel);
        hook.setL1Price(l1Price, true);

        SwapParams memory params;
        vm.prank(address(poolManager));
        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");
        
        uint24 fee = returnedFee & LPFeeLibrary.REMOVE_OVERRIDE_MASK;
        assertEq(fee, 3000); // Should still be default if no divergence
    }

    function test_EquilibriumFee_WithDivergence() public {
        // Scenario: L2 Pool is ETH=$2000, L1 Global is ETH=$1500 (25% drop)
        uint256 l1Price = 1500 ether;
        uint160 sqrtPriceX96 = 3543191142285914205922034323211; // sqrt(2000) * 2^96

        // Initialize Pool with price
        poolManager.initialize(key, sqrtPriceX96);

        vm.prank(sentinel);
        hook.setL1Price(l1Price, true);

        SwapParams memory params;
        vm.prank(address(poolManager));
        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");
        
        uint24 fee = returnedFee & LPFeeLibrary.REMOVE_OVERRIDE_MASK;
        
        // Calculation:
        // l2Price = 2000e18
        // divergenceBP = 249,999 (rounding)
        // fee = 249,999 + 500 = 250,499
        assertEq(fee, 250499); 
    }

    function test_EquilibriumFee_Cap() public {
        // Scenario: Extreme divergence (L2=$2000, L1=$10)
        uint256 l1Price = 10 ether;
        uint160 sqrtPriceX96 = 3543191142285914205922034323211; // $2000

        // Initialize Pool with price
        poolManager.initialize(key, sqrtPriceX96);

        vm.prank(sentinel);
        hook.setL1Price(l1Price, true);

        SwapParams memory params;
        vm.prank(address(poolManager));
        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");
        
        uint24 fee = returnedFee & LPFeeLibrary.REMOVE_OVERRIDE_MASK;
        assertEq(fee, 990000); // Capped at 99%
    }
}
