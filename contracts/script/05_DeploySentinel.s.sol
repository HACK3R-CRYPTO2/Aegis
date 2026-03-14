// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {AegisSentinel} from "../src/AegisSentinel.sol";

contract DeploySentinel is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // CONFIGURATION (Injected via env or previous deployment logs)
        address REACTIVE_SYSTEM_SERVICE = vm.envOr("REACTIVE_SERVICE", address(0x0000000000000000000000000000000000fffFfF));
        address AEGIS_HOOK = vm.envAddress("AEGIS_HOOK");
        address MOCK_ORACLE = vm.envAddress("MOCK_ORACLE");

        AegisSentinel sentinel = new AegisSentinel(
            REACTIVE_SYSTEM_SERVICE,
            AEGIS_HOOK,
            MOCK_ORACLE
        );
        console.log("AegisSentinel deployed to:", address(sentinel));

        // Call subscriptions
        sentinel.subscribeToOracle(MOCK_ORACLE);
        console.log("Subscribed to MockOracle at:", MOCK_ORACLE);

        vm.stopBroadcast();
    }
}
