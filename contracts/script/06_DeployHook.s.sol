// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {PoolManager} from "v4-core/src/PoolManager.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";
import {AegisHook} from "../src/AegisHook.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";

contract DeployHook is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        // Unichain Sepolia PoolManager
        IPoolManager manager = IPoolManager(
            0x00B036B58a818B1BC34d502D3fE730Db729e62AC
        );

        // Mine a salt for the hook to get flags: BEFORE_SWAP_FLAG = 1 << 7 = 128
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);
        (address hookAddress, bytes32 salt) = HookMiner.find(
            0x4e59b44847b379578588920cA78FbF26c0B4956C, // Forge Script CREATE2 Proxy
            flags,
            type(AegisHook).creationCode,
            abi.encode(address(manager), deployer)
        );

        AegisHook hook = new AegisHook{salt: salt}(manager, deployer);
        console.log("AegisHook deployed to:", address(hook));

        vm.stopBroadcast();
    }
}
