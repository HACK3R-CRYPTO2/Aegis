// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseTest} from "./utils/BaseTest.sol";
import {MockOracle} from "../src/MockOracle.sol";
import {AegisHook} from "../src/AegisHook.sol";
import {AegisGuardianRegistry} from "../src/AegisGuardianRegistry.sol";
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
    AegisGuardianRegistry registry;
    address sentinel = address(0x999);

    function setUp() public {
        // 1. Deploy v4 Setup (PoolManager, etc)
        deployArtifactsAndLabel();

        // 2. Deploy Oracle & Registry
        oracle = new MockOracle();
        registry = new AegisGuardianRegistry();

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

        // 4. Configure Hook & Registry
        hook.setSentinel(sentinel);
        hook.setGuardianRegistry(address(registry));

        // Link Registry to Hook (only Hook can record interventions)
        // registry.setAegisHook(address(hook)); // Removed for ERC-8004 compliance
    }

    function test_DefaultFee() public {
        // A. Initial State: Panic is FALSE
        assertEq(hook.panicMode(), false);

        // B. Verify Default Fee (3000 = 0.3%)
        PoolKey memory key;
        SwapParams memory params;

        // Execute beforeSwap (Authenticated as PoolManager)
        vm.prank(address(poolManager));
        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");

        uint24 fee = returnedFee & 0x7FFFFF;

        // C. Assert Fee
        assertEq(fee, 3000);
    }

    function test_PanicFee_LowRep() public {
        // A. Set Panic Mode
        vm.prank(sentinel);
        hook.setPanicMode(true);

        // B. Simulate Low Rep User (Default is 0)
        address lowRepAgent = address(0x555);

        // C. Verify Fee (50000 = 5%)
        PoolKey memory key;
        SwapParams memory params;

        // Set tx.origin to lowRepAgent
        vm.prank(address(poolManager), lowRepAgent);

        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");
        uint24 fee = returnedFee & 0x7FFFFF;

        assertEq(fee, 50000);
    }

    function test_PanicFee_HighRep() public {
        // A. Set Panic Mode
        vm.prank(sentinel);
        hook.setPanicMode(true);

        // B. Set High Reputation
        address highRepAgent = address(0x888);
        vm.prank(sentinel);
        hook.setAgentReputation(highRepAgent, 95); // > 90

        // C. Verify Fee (100 = 0.01%)
        PoolKey memory key;
        SwapParams memory params;

        vm.prank(address(poolManager), highRepAgent);
        (, , uint24 returnedFee) = hook.beforeSwap(address(0), key, params, "");
        uint24 fee = returnedFee & 0x7FFFFF;

        assertEq(fee, 100);
    }

    function test_AccessControl() public {
        // 1. Try to set reputation as random user
        address randomUser = address(0x12345);
        vm.prank(randomUser);

        // 2. Expect Revert "OnlySentinel"
        vm.expectRevert(AegisHook.OnlySentinel.selector);
        hook.setAgentReputation(address(0x1), 100);
    }

    function test_AgentRegistration() public {
        address agent = address(0xABC);
        string memory name = "GuardianOne";

        vm.prank(agent);
        hook.registerAgentName(name);

        assertEq(hook.agentNames(agent), name);
    }

    function test_GuardianStats_ERC8004() public {
        // A. Setup High Rep Agent
        address guardian = address(0x777);
        vm.prank(sentinel);
        hook.setAgentReputation(guardian, 95);

        // B. Register in ERC-8004 Registry
        vm.prank(guardian);
        uint256 agentId = registry.register("ipfs://my-agent");
        assertEq(agentId, 1);

        // C. Set Panic Mode
        vm.prank(sentinel);
        hook.setPanicMode(true);

        // D. Execute Swap as Guardian
        PoolKey memory key;
        SwapParams memory params;
        params.amountSpecified = -1000 ether; // Swapping 1000 tokens

        vm.prank(address(poolManager), guardian);
        hook.beforeSwap(address(0), key, params, "");

        // E. Verify Feedback (ERC-8004)
        uint256 count = registry.getFeedbackCount(agentId);
        assertEq(count, 1);

        int128 volume = registry.getTotalStabilizedVolume(agentId);
        assertEq(volume, 1000 ether);
    }

    function test_GuardianNFT() public {
        address guardian = address(0xABC);
        string memory uri = "ipfs://guardian-profile";

        vm.prank(guardian);
        uint256 agentId = registry.register(uri);

        // 1. Verify ID Generation
        assertEq(agentId, 1);

        // 2. Verify NFT Ownership (ERC-721)
        assertEq(registry.ownerOf(agentId), guardian);
        assertEq(registry.balanceOf(guardian), 1);

        // 3. Verify Metadata (ERC-721 URI Storage)
        assertEq(registry.tokenURI(agentId), uri);

        // 4. Verify Identity Mapping
        assertEq(registry.getAgentId(guardian), agentId);
    }
}
