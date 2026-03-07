// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {AegisGuardianRegistry} from "../src/AegisGuardianRegistry.sol";

contract DeployRegistry is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AegisGuardianRegistry registry = new AegisGuardianRegistry();

        console.log("AegisGuardianRegistry Deployed to:", address(registry));

        vm.stopBroadcast();
    }
}
