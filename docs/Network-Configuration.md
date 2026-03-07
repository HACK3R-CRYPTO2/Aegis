# Network Configuration
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

This page documents the RPC endpoints, chain identifiers, and network-specific configurations required for deploying and operating the Aegis system across its three-network architecture. This includes Ethereum Sepolia (L1), Reactive Network Kopli (middleware), and Unichain Sepolia (L2).

For information about the deployment scripts that utilize these network configurations, see [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts). For details on the deployment logs generated per network, see [Deployment Logs](/HACK3R-CRYPTO/Aegis/3.3-deployment-logs).

## Network Architecture Overview

The Aegis system operates across three distinct blockchain networks, each serving a specific role in the cross-chain circuit breaker mechanism:

```
Unichain Sepolia L2

Reactive Network Kopli

Ethereum Sepolia L1

foundry.toml Configuration

sepolia = https://eth-sepolia.g.alchemy.com/v2/...

reactive = https://lasna-rpc.rnk.dev/

unichain_sepolia = https://unichain-sepolia-rpc.publicnode.com

Chain ID: 11155111

MockOracle
0x29f8...BA3b

AegisGuardianRegistry
(Future)

Chain ID: 5318007

AegisSentinel
0x0f76...b482

--legacy Flag Required
(EIP-155 Compatibility)

Chain ID: 1301

AegisHook
0xBaa0...2C080

CREATE2 Salt Mining
for 0x80... Address
```

**Sources:**[contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)[contracts/README.md99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L103)

## Network Details

### Ethereum Sepolia (L1)

Ethereum Sepolia serves as the data availability layer where price oracles and the guardian registry are deployed.
ParameterValue**Network Name**Ethereum Sepolia**Chain ID**`11155111`**RPC Endpoint**`https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX`**RPC Alias**`sepolia`**Block Explorer**[https://sepolia.etherscan.io](https://sepolia.etherscan.io)**Deployed Contracts**MockOracle (`0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`)
**Configuration:**

- Standard EVM-compatible network with no special deployment flags required
- Uses default transaction type (EIP-1559)
- Supports standard Foundry deployment workflow

**Sources:**[contracts/foundry.toml22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L22-L22)[contracts/README.md101](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L101-L101)

### Reactive Network Kopli

Reactive Network (Kopli testnet, formerly "Lasna") is the middleware layer that enables autonomous cross-chain monitoring and execution.
ParameterValue**Network Name**Reactive Network Kopli**Chain ID**`5318007`**RPC Endpoint**`https://lasna-rpc.rnk.dev/`**RPC Alias**`reactive`**Block Explorer**[https://kopli.reactscan.net](https://kopli.reactscan.net)**Deployed Contracts**AegisSentinel (`0x0f764437ffBE1fcd0d0d276a164610422710B482`)
**Special Requirements:**

The Reactive Network requires the `--legacy` flag during deployment to maintain EIP-155 compatibility:

```
forge script script/05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacy
```

This flag forces Foundry to use legacy transaction format instead of EIP-1559, which is necessary for the Reactive Network's current implementation.

**Post-Deployment Action:**
After deploying `AegisSentinel`, a manual subscription call must be made to register the contract as an event listener for the L1 oracle's `PriceUpdate` events.

**Sources:**[contracts/README.md112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L112-L116)[contracts/foundry.toml21](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L21-L21)

### Unichain Sepolia (L2)

Unichain Sepolia is the execution layer where Uniswap v4 pools are protected via the `AegisHook` circuit breaker.
ParameterValue**Network Name**Unichain Sepolia**Chain ID**`1301`**RPC Endpoint**`https://unichain-sepolia-rpc.publicnode.com`**RPC Alias**`unichain_sepolia`**Block Explorer**[https://unichain-sepolia.blockscout.com](https://unichain-sepolia.blockscout.com)**Deployed Contracts**AegisHook (`0xBaa0573e3BE4291b58083e717E9EF5051772C080`)
**Special Requirements:**

The `AegisHook` deployment requires CREATE2 salt mining to generate an address with the `BEFORE_SWAP` flag prefix (`0x80...`). This is a Uniswap v4 requirement for hooks that implement the `beforeSwap` callback.

```
forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcast
```

The deployment script internally uses a salt mining algorithm to satisfy the Uniswap v4 address validation requirements. For details on this process, see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining).

**Sources:**[contracts/README.md118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L118-L122)[contracts/foundry.toml20](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L20-L20)

## Foundry RPC Configuration

The network endpoints are configured in the `[rpc_endpoints]` section of `foundry.toml`:

```
[rpc_endpoints]
unichain_sepolia = "https://unichain-sepolia-rpc.publicnode.com"
reactive = "https://lasna-rpc.rnk.dev/"
sepolia = "https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX"
```

These aliases are referenced in deployment scripts using the `--rpc-url` flag:

```
foundry.toml [rpc_endpoints]

CLI Flags

Deployment Scripts

resolves to

resolves to

resolves to

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol

--rpc-url sepolia

--rpc-url reactive
--legacy

--rpc-url unichain_sepolia

sepolia: Alchemy RPC

reactive: Lasna RPC

unichain_sepolia: PublicNode RPC
```

**Sources:**[contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)[contracts/README.md107-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L107-L122)

## Cross-Network Message Flow

Understanding the network configuration requires understanding the data flow between networks:

```
"Unichain L2
Chain: 1301
RPC: unichain-sepolia-rpc.publicnode.com"
"Reactive Kopli
Chain: 5318007
RPC: lasna-rpc.rnk.dev"
"Sepolia L1
Chain: 11155111
RPC: eth-sepolia.g.alchemy.com"
"Unichain L2
Chain: 1301
RPC: unichain-sepolia-rpc.publicnode.com"
"Reactive Kopli
Chain: 5318007
RPC: lasna-rpc.rnk.dev"
"Sepolia L1
Chain: 11155111
RPC: eth-sepolia.g.alchemy.com"
"AegisSentinel.react()
Triggered automatically"
alt
["Price Below Threshold"]
"MockOracle.setPrice(1000)"
"emit PriceUpdate(1000)
[Cross-chain Event]"
"Check: price < THRESHOLD?"
"AegisHook.setPanicMode(true)
[Cross-chain Call]"
"panicMode = true"
```

**Network Interaction Requirements:**

- **L1 → Reactive**: Event subscription configured via Reactive Network's system contracts
- **Reactive → L2**: Cross-chain function call via Reactive Network's bridge
- All interactions are autonomous once deployed; no manual relay required in production

**Sources:**[contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)

## Network-Specific Deployment Flags
NetworkRequired FlagsReason**Sepolia**`--broadcast`Standard deployment**Reactive**`--broadcast --legacy`EIP-155 compatibility requirement**Unichain**`--broadcast`Standard deployment (salt mining handled internally)
**Additional Foundry Configuration:**

The `[profile.default]` section includes network-agnostic compiler settings that apply to all deployments:

```
evm_version = "cancun"
solc_version = "0.8.26"
via_ir = true
bytecode_hash = "none"
```

- `evm_version = "cancun"`: Targets the Cancun hard fork for all networks
- `via_ir = true`: Enables the Yul intermediate representation optimizer
- `bytecode_hash = "none"`: Produces deterministic bytecode for CREATE2 deployments

**Sources:**[contracts/foundry.toml1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L16)

## Private Key Management

While not explicitly configured in `foundry.toml`, all deployment scripts require a private key via environment variable:

```
export PRIVATE_KEY=0x...
```

The deployment scripts retrieve this via Foundry's standard key management:

```
uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
vm.startBroadcast(deployerPrivateKey);
```

**Security Note:** The `.gitignore` configuration ensures `.env` files containing private keys are never committed to version control.

**Sources:**[contracts/README.md107-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L107-L122)

## Broadcast Log Organization

Each network's deployment transactions are logged to chain-specific directories:

```
contracts/broadcast/
├── 04_DeployOracle.s.sol/
│   └── 11155111/          # Sepolia chain ID
│       └── run-latest.json
├── 05_DeploySentinel.s.sol/
│   └── 5318007/           # Reactive chain ID
│       └── run-latest.json
└── 06_DeployHook.s.sol/
    └── 1301/              # Unichain chain ID
        └── run-latest.json

```

This organization allows easy identification of which contracts were deployed to which networks. For details on interpreting these logs, see [Deployment Logs](/HACK3R-CRYPTO/Aegis/3.3-deployment-logs).

**Sources:**[contracts/README.md99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L103)