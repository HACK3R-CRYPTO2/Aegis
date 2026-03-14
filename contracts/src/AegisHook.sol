// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseHook} from "v4-periphery/src/utils/BaseHook.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "v4-core/src/types/BeforeSwapDelta.sol";
import {SwapParams} from "v4-core/src/types/PoolOperation.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {StateLibrary} from "v4-core/src/libraries/StateLibrary.sol";
import {FullMath} from "v4-core/src/libraries/FullMath.sol";
import {LPFeeLibrary} from "v4-core/src/libraries/LPFeeLibrary.sol";
import {console} from "forge-std/console.sol";

contract AegisHook is BaseHook {
    using BeforeSwapDeltaLibrary for BeforeSwapDelta;
    using PoolIdLibrary for PoolKey;
    using StateLibrary for IPoolManager;

    uint256 public l1Price; // Verified price from Ethereum Sepolia
    bool public sentinelArmed; // Consensus arming flag
    
    address public reactiveSentinel;
    address public immutable owner;

    // Fee Tiers (in pips, 10000 = 1%)
    uint24 public constant DEFAULT_FEE = 3000; // 0.3%
    uint24 public constant BUFFER_FEE = 500;   // 0.05% safety margin

    event SentinelResponse(uint256 price, bool armed);
    error OnlySentinel();

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

    function setSentinel(address _sentinel) external {
        if (msg.sender != owner) revert OnlySentinel();
        reactiveSentinel = _sentinel;
    }

    /// @notice Updated entry point for the Equilibrium Shield
    function setL1Price(uint256 _price, bool _armed) external onlySentinelOrOwner {
        l1Price = _price;
        sentinelArmed = _armed;
        emit SentinelResponse(_price, _armed);
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
                beforeSwap: true,
                afterSwap: false,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnDelta: false,
                afterSwapReturnDelta: false,
                afterAddLiquidityReturnDelta: false,
                afterRemoveLiquidityReturnDelta: false
            });
    }

    /// @notice THE EQUILIBRIUM SHIELD: Offsets arbitrage divergence in real-time
    function _beforeSwap(
        address,
        PoolKey calldata key,
        SwapParams calldata,
        bytes calldata
    ) internal override returns (bytes4, BeforeSwapDelta, uint24) {
        uint24 fee = DEFAULT_FEE;

        if (sentinelArmed && l1Price > 0) {
            // 1. Fetch current L2 state from PoolManager using StateLibrary
            (uint160 sqrtPriceX96, , , ) = poolManager.getSlot0(key.toId());
            
            // 2. Convert sqrtPriceX96 to L2 Price (using mulDiv to avoid intermediate overflow)
            uint256 l2Price = FullMath.mulDiv(uint256(sqrtPriceX96) * uint256(sqrtPriceX96), 1e18, 1 << 192);
            console.log("L2 Price:", l2Price);
            console.log("L1 Price:", l1Price);

            // 3. Calculate Divergence (using 1e6 scaling for BP)
            if (l2Price > l1Price) {
                uint256 priceDiff = l2Price - l1Price;
                uint256 divergenceBP = (priceDiff * 1_000_000) / l2Price;
                console.log("Divergence (BP):", divergenceBP);
                
                // 4. Set Fee = Divergence + 0.05% safety buffer
                fee = uint24(divergenceBP + BUFFER_FEE); 
                
                // Cap at 99%
                if (fee > 990000) fee = 990000;
            }
        }

        return (
            BaseHook.beforeSwap.selector,
            BeforeSwapDeltaLibrary.ZERO_DELTA,
            fee | LPFeeLibrary.OVERRIDE_FEE_FLAG
        );
    }
}
