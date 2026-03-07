# Build System

## Purpose and Scope

This document explains the Foundry-based build system used by Aegis for compiling, testing, and deploying smart contracts. It covers configuration, compiler settings, optimization flags, and core commands.

For detailed dependency info, see [Dependencies](Dependencies-and-Submodules.md). For deployment scripts, see [Deployment Scripts](Deployment-Scripts.md).

---

## Foundry Toolchain

Aegis uses [Foundry](https://getfoundry.sh/) for all smart contract development:
*   **forge**: Compilation, testing, scripting.
*   **cast**: Command-line chain interaction.
*   **anvil**: Local testnet node.

---

## Configuration (`foundry.toml`)

The `contracts/foundry.toml` file controls the build process. Key settings include:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.26"
evm_version = "cancun"
via_ir = true
bytecode_hash = "none"
ffi = true
```

### Key Settings Explained

| Setting | Value | Why? |
| :--- | :--- | :--- |
| `solc_version` | `0.8.26` | Ensures consistent compiler behavior. |
| `evm_version` | `cancun` | Enables modern opcodes (e.g., `TSTORE` usage in v4). |
| `via_ir` | `true` | **Critical**. Enables IR-based optimization needed for v4 hooks to fit in bytecode limits. |
| `bytecode_hash` | `none` | **Critical**. Removes metadata hash from bytecode to allow deterministic address prediction for CREATE2 (salt mining). |
| `ffi` | `true` | Allows scripts to call external commands (sometimes needed for complex setups). |

---

## Dependency Management

### Remappings
Remappings allow for clean import statements. Usage in `foundry.toml`:

```toml
remappings = [
    "forge-std/=lib/forge-std/src/",
    "reactive-lib/=lib/system-smart-contracts/lib/reactive-lib/src/",
    "system-smart-contracts/=lib/system-smart-contracts/src/",
    "v4-core/=lib/uniswap-hooks/lib/v4-core/",
    "v4-periphery/=lib/uniswap-hooks/lib/v4-periphery/",
    "hookmate/=lib/hookmate/src/"
]
```

---

## Build Commands

### Compile
```bash
forge build
```
Compiles contracts in `src/` and outputs artifacts to `out/`.

### Clean
```bash
forge clean
```
Removes `out/` and `cache/` directories. Useful if you encounter strange compilation artifacts.

### Check Sizes
```bash
forge build --sizes
```
Displays the size of compiled contracts against the EIP-170 limit (24KB).
*   **Note**: `via_ir` significantly reduces `AegisHook` size.

---

## Networks and RPCs

Network aliases are defined in the `[rpc_endpoints]` section:

```toml
[rpc_endpoints]
sepolia = "https://eth-sepolia.g.alchemy.com/v2/..."
reactive = "https://lasna-rpc.rnk.dev/"
unichain_sepolia = "https://unichain-sepolia-rpc.publicnode.com"
```

Usage in scripts:
```bash
forge script script/04_DeployOracle.s.sol --rpc-url sepolia
```

---

## CI/CD Integration

Foundry integrates with GitHub Actions via the `foundry-rs/foundry-toolchain` action.
Standard CI steps:
1.  Check formatting: `forge fmt --check`
2.  Compile: `forge build`
3.  Run tests: `forge test`

See [Development Guide](Development-Guide.md) for more workflow details.