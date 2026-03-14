// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {IHooks} from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import {console} from "forge-std/console.sol";

contract PoolIdTest is Test {
    function testPrintPoolId() public pure {
        address currency0 = 0x0165878A594ca255338adfa4d48449f69242Eb8F;
        address currency1 = 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853;
        uint24 fee = 3000;
        int24 tickSpacing = 60;
        address hooks = 0xC9d1feD83361Fa922D5D479071d2957029cA8080;

        PoolKey memory key = PoolKey({
            currency0: Currency.wrap(currency0),
            currency1: Currency.wrap(currency1),
            fee: fee,
            tickSpacing: tickSpacing,
            hooks: IHooks(hooks)
        });

        bytes32 id = keccak256(abi.encode(key));
        console.log("PoolId with Hook:");
        console.logBytes32(id);

        key.hooks = IHooks(address(0));
        id = keccak256(abi.encode(key));
        console.log("PoolId with No Hook:");
        console.logBytes32(id);
        
        key.fee = 0x800000;
        id = keccak256(abi.encode(key));
        console.log("PoolId with Dynamic Fee, No Hook:");
        console.logBytes32(id);
    }
}
