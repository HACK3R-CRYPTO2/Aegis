# Deployment
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

This page provides an overview of the Aegis deployment process, which spans three blockchain networks with different technical requirements and deployment sequences. The deployment strategy is designed to establish the cross-chain circuit breaker system across Ethereum Sepolia (L1), Reactive Network, and Unichain Sepolia (L2).

For detailed information about specific aspects of deployment:

- Deployment script implementation and execution order: see [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts)
- RPC endpoints and chain-specific configurations: see [Network Configuration](/HACK3R-CRYPTO/Aegis/3.2-network-configuration)
- Broadcast logs and transaction records: see [Deployment Logs](/HACK3R-CRYPTO/Aegis/3.3-deployment-logs)
- CREATE2 salt calculation for hook addresses: see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining)

For information about setting up the development environment before deployment: see [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup).

## Deployment Strategy

Aegis uses a **sequential multi-network deployment** approach where contracts must be deployed in a specific order to establish proper cross-chain communication channels. The deployment process uses Foundry's script infrastructure, with each contract deployed via numbered scripts that execute against different RPC endpoints.

The deployment sequence is:

1. **Oracle** (Sepolia L1) - Establishes the price feed source
2. **Sentinel** (Reactive Network) - Deploys the autonomous watcher
3. **Hook** (Unichain L2) - Installs the circuit breaker on the target pool

This order is critical because:

- The Sentinel requires the Oracle's contract address to subscribe to `PriceUpdate` events
- The Hook requires the Sentinel's address for access control on `setPanicMode()`
- The Sentinel requires the Hook's address to send cross-chain panic triggers

**Sources:**[contracts/README.md96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L96-L122)

## Network Topology

The following diagram maps the deployment targets to their respective blockchain networks and shows the dependency relationships:

```
Unichain Sepolia (Chain ID: 1301)

Reactive Network Lasna (Chain ID: 5318007)

Ethereum Sepolia (Chain ID: 11155111)

Deployment Sequence

forge script 04_DeployOracle.s.sol

forge script 05_DeploySentinel.s.sol --legacy

forge script 06_DeployHook.s.sol

Address required by

Address required by

1. Deploy MockOracle
2. Deploy AegisSentinel
3. Deploy AegisHook

MockOracle.sol
0x29f8...BA3b
Emits PriceUpdate events

AegisSentinel.sol
0x0f76...b482
Listens & Triggers

AegisHook.sol
0xBaa0...C080
Circuit Breaker
```

**Sources:**[contracts/README.md99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L103)[contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)

## Deployment Tooling

Aegis uses the **Foundry** toolchain for all contract deployment operations. The primary tool is `forge script`, which executes Solidity deployment scripts that inherit from the `Script` base class provided by `forge-std`.

### Core Commands
CommandPurpose`forge build`Compiles all contracts and generates artifacts in `out/``forge script <path> --rpc-url <network> --broadcast`Executes a deployment script and broadcasts transactions`forge script <path> --rpc-url <network> --broadcast --legacy`Same as above, but uses legacy transaction format (EIP-155)`forge verify-contract`Verifies deployed contract source code on block explorers
The `--broadcast` flag causes transactions to be signed and sent to the network, with results recorded in the `broadcast/` directory. Without this flag, scripts execute in simulation mode only.

**Sources:**[contracts/README.md70-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L70-L122)[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

## Pre-Deployment Requirements

Before executing deployment scripts, the following must be configured:

### Environment Variables

Deployment scripts require private keys for transaction signing. These are typically loaded from environment variables or `.env` files:

```
# Required for all deployments
PRIVATE_KEY=0x...

# Network-specific RPC URLs (can override foundry.toml)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/...
REACTIVE_RPC_URL=https://lasna-rpc.rnk.dev/
UNICHAIN_SEPOLIA_RPC_URL=https://unichain-sepolia-rpc.publicnode.com
```

### RPC Endpoint Configuration

The RPC endpoints are defined in [foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L19-L22):

```
[rpc_endpoints]
unichain_sepolia = "https://unichain-sepolia-rpc.publicnode.com"
reactive = "https://lasna-rpc.rnk.dev/"
sepolia = "https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX"
```

### Compiler Configuration

The [foundry.toml1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L1-L16) file specifies critical compiler settings:
SettingValuePurpose`solc_version``0.8.26`Solidity compiler version`evm_version``cancun`Target EVM version for deployment`via_ir``true`Enables IR-based compilation for optimizer`bytecode_hash``none`Disables metadata hash for deterministic builds`ffi``true`Allows Foundry scripts to execute external commands (required for hook mining)
**Sources:**[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

## Deployment Workflow

The following sequence diagram illustrates the complete deployment workflow, including compilation, script execution, and transaction broadcasting:

```
"broadcast/
Logs"
"Target Network
(RPC Endpoint)"
"Deployment Script
(inherits Script)"
"forge script"
"Developer"
"broadcast/
Logs"
"Target Network
(RPC Endpoint)"
"Deployment Script
(inherits Script)"
"forge script"
"Developer"
"Logs contain: address, tx hash, block number, gas used"
"forge build"
"Compile contracts"
"Artifacts in out/"
"forge script ... --rpc-url <network> --broadcast"
"Execute run() function"
"vm.startBroadcast()"
"Deploy contract via new"
"Send transaction"
"Return tx hash + address"
"vm.stopBroadcast()"
"Return deployment data"
"Write JSON log"
"Deployment complete"
```

**Sources:**[contracts/README.md70-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L70-L122)

## Network-Specific Deployment Considerations

Each target network has unique deployment requirements:

### Sepolia (L1) - Oracle Deployment

- **Script:**`script/04_DeployOracle.s.sol`
- **Command:**`forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast`
- **Considerations:**
- Standard deployment, no special flags required
- Contract address needed by Sentinel for event subscription
- Deploys to: `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`

### Reactive Network - Sentinel Deployment

- **Script:**`script/05_DeploySentinel.s.sol`
- **Command:**`forge script script/05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacy`
- **Considerations:**
- **Requires `--legacy` flag** for EIP-155 compatibility
- Post-deployment subscription call required (manual step)
- Deploys to Lasna testnet: `0x0f764437ffBE1fcd0d0d276a164610422710B482`

The `--legacy` flag is critical as noted in [contracts/README.md115](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L115-L115) This forces Foundry to use pre-EIP-1559 transaction format, which the Reactive Network requires.

### Unichain Sepolia (L2) - Hook Deployment

- **Script:**`script/06_DeployHook.s.sol`
- **Command:**`forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcast`
- **Considerations:**
- **Requires salt mining** to generate address with `BEFORE_SWAP` flag (0x80...)
- Uses CREATE2 for deterministic deployment
- Hook address must match Uniswap v4 permission flags
- Deploys to: `0xBaa0573e3BE4291b58083e717E9EF5051772C080`

The hook deployment is the most complex due to Uniswap v4's address-based permission system (see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining) for details).

**Sources:**[contracts/README.md105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L105-L122)

## Deployment Results

The successfully deployed contract addresses are:
ContractNetworkChain IDAddressPurpose`MockOracle`Ethereum Sepolia11155111`0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`Price feed simulator`AegisSentinel`Reactive Lasna5318007`0x0f764437ffBE1fcd0d0d276a164610422710B482`Autonomous watcher & cross-chain orchestrator`AegisHook`Unichain Sepolia1301`0xBaa0573e3BE4291b58083e717E9EF5051772C080`Uniswap v4 circuit breaker hook
These addresses represent the current testnet deployment. The `AegisGuardianRegistry` (ERC-721/ERC-8004) is planned for future deployment on Sepolia.

**Sources:**[contracts/README.md99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L103)

## Post-Deployment Verification

After deployment, the system should be verified through:

1. **Contract Verification** - Source code verification on block explorers
2. **Integration Testing** - Execute the integration test suite:

```
forge test --match-contract AegisIntegrationTest -vv
```
3. **Manual Subscription** - The Sentinel requires a manual subscription call to register with the Reactive Network's event system (this step is noted in [contracts/README.md114](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L114-L114))
4. **Cross-Chain Testing** - Trigger a test price update on the Oracle and verify the Hook responds with panic mode activation

For comprehensive testing procedures, see [Testing](/HACK3R-CRYPTO/Aegis/5-testing).

**Sources:**[contracts/README.md79-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L79-L94)