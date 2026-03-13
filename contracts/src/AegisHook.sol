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
            // 1. Fetch current L2 state from PoolManager
            (uint160 sqrtPriceX96, , , ) = poolManager.getSlot0(key.toId());
            
            // 2. Convert sqrtPriceX96 to L2 Price (simplified for 18 decimal pairs)
            // Price = (sqrtPriceX96 / 2^96)^2
            // We scale by 1e18 to maintain precision
            uint256 l2Price = (uint256(sqrtPriceX96) * uint256(sqrtPriceX96) * 1e18) >> (96 * 2);

            // 3. Calculate Divergence (using 1e18 scaling for 100%)
            if (l2Price > l1Price) {
                uint256 priceDiff = l2Price - l1Price;
                uint256 divergenceBasisPoints = (priceDiff * 1000000) / l2Price;
                
                // 4. Set fee to neutralize arbitrage profit + safety buffer
                // divergenceBasisPoints is in 1,000,000 scale (10,000 = 1%)
                fee = uint24(divergenceBasisPoints) + BUFFER_FEE;
                
                // Cap fee at 99%
                if (fee > 990000) fee = 990000;
            }
        }

        return (
            BaseHook.beforeSwap.selector,
            BeforeSwapDeltaLibrary.ZERO_DELTA,
            fee | 0x800000
        );
    }
}
