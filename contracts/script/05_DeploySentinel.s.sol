// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {AegisSentinel} from "../src/AegisSentinel.sol";

contract DeploySentinel is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // CONFIGURATION
        address REACTIVE_SYSTEM_SERVICE = 0x0000000000000000000000000000000000fffFfF; // Lasna Testnet Service
        address AEGIS_HOOK = 0xBaa0573e3BE4291b58083e717E9EF5051772C080; // Unichain deployment
        address MOCK_ORACLE = 0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b; // Sepolia deployment
        address GUARDIAN_REGISTRY = 0xaDdf307296EFC3720D3e38E72d2A417327161cDb; // Unichain deployment

        AegisSentinel sentinel = new AegisSentinel(
            REACTIVE_SYSTEM_SERVICE,
            AEGIS_HOOK,
            MOCK_ORACLE
        );
        console.log("AegisSentinel deployed to:", address(sentinel));

        // Call subscriptions
        sentinel.subscribeToOracle(MOCK_ORACLE);
        console.log("Subscribed to MockOracle at:", MOCK_ORACLE);

        sentinel.subscribeToRegistry(GUARDIAN_REGISTRY);
        console.log("Subscribed to GuardianRegistry at:", GUARDIAN_REGISTRY);

        vm.stopBroadcast();
    }
}
