# Development Guide

This document provides instructions for setting up a local development environment for Aegis, building the smart contracts, running tests, and understanding the development workflow. This guide covers the prerequisites, quick start process, and the development loop for contributors working on the Aegis codebase.

For detailed information on the monorepo structure, see [Project Structure](Project-Structure.md). For deployment procedures, see [Deployment](Deployment.md).

---

## Prerequisites

The Aegis development environment requires the following tools:

| Tool | Purpose | Installation |
| :--- | :--- | :--- |
| **Foundry** | Solidity compilation, testing, deployment | `curl -L https://foundry.paradigm.xyz \| bash && foundryup` |
| **Git** | Version control with submodules | Standard package manager |
| **Node.js** | Frontend development (optional) | v18+ recommended |

The core contract development uses Foundry exclusively. The Solidity compiler version is `0.8.26` with Cancun EVM features enabled, as specified in `contracts/foundry.toml`. All source contracts are located in `contracts/src/`.

---

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis
```

### 2. Initialize Submodules

Aegis uses Git submodules for external dependencies. Initialize them:

```bash
git submodule update --init --recursive
```

This fetches the following critical dependencies:
*   `lib/system-smart-contracts`: Reactive Network SDK for `AbstractReactive` base class.
*   `lib/uniswap-hooks`: Uniswap v4 core interfaces and periphery contracts.
*   `lib/forge-std`: Foundry standard testing library (`Test`, `console2`, `Vm`).

### 3. Configure Environment Variables

Create a `.env` file in the `contracts/` directory using `.env.example` as a template.

Required variables for deployment scripts:

```ini
# Private key for deployment transactions
PRIVATE_KEY=0x...

# RPC endpoints (if not using foundry.toml defaults)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/...
REACTIVE_RPC_URL=https://lasna-rpc.rnk.dev/
UNICHAIN_RPC_URL=https://unichain-sepolia-rpc.publicnode.com

# Optional: Etherscan API keys for verification
ETHERSCAN_API_KEY=...
```

**Security Note**: Never commit private keys. The `.gitignore` configuration ensures environment files are excluded from Git tracking.

---

## Quick Start Workflow

### Build Contracts

Navigate to the contracts directory and compile:

```bash
cd contracts
forge build
```

This compiles all contracts in `contracts/src/` and outputs artifacts to `contracts/out/`.

**Compiler Settings**: The build uses `via_ir = true` for optimizer improvements, which is required for complex contracts like `AegisHook.sol` that integrate Uniswap v4 hooks.

### Run Tests

Execute the test suite:

```bash
forge test -vv
```

For specific test contracts (e.g., `AegisIntegrationTest`):

```bash
forge test --match-contract AegisIntegrationTest -vv
```

The `-vv` flag provides verbose output showing function calls and events.

---

## Development Loop

### Typical Development Session

1.  **Edit** contracts in `contracts/src/*.sol`.
2.  **Build** using `forge build` to check for compilation errors.
3.  **Test** using `forge test` to verify logic.
4.  **Debug** failures using `console2.log` or `forge test --debug`.

### File System Organization

The repository follows a monorepo structure:

*   `contracts/`: Foundry project root.
    *   `src/`: Smart contract source files.
        *   `AegisHook.sol`: Uniswap v4 Hook.
        *   `AegisSentinel.sol`: Reactive Contract.
        *   `MockOracle.sol`: Price Feed Simulator.
        *   `AegisGuardianRegistry.sol`: ERC-721 + ERC-8004.
    *   `test/`: Test suites (e.g., `AegisIntegrationTest.t.sol`).
    *   `script/`: Deployment scripts.
    *   `lib/`: External dependencies (git submodules).
*   `frontend/`: Next.js dashboard.

### Build Artifacts

Foundry generates several output directories which are git-ignored:

*   `contracts/out/`: Compiled bytecode and ABIs.
*   `contracts/cache/`: Compiler cache for faster rebuilds.
*   `contracts/broadcast/`: Deployment transaction logs.

---

## Contract Remappings

Foundry uses remappings defined in `contracts/foundry.toml` to resolve imports:

| Remapping | Points to | Purpose |
| :--- | :--- | :--- |
| `reactive-lib/` | `lib/system-smart-contracts/lib/reactive-lib/src/` | Reactive SDK imports |
| `system-smart-contracts/` | `lib/system-smart-contracts/src/` | Sentinel base contracts |
| `v4-core/` | `lib/uniswap-hooks/lib/v4-core/` | Uniswap v4 interfaces |
| `v4-periphery/` | `lib/uniswap-hooks/lib/v4-periphery/` | Uniswap v4 libraries |

**Example Usage**:
```solidity
import {AbstractReactive} from "system-smart-contracts/AbstractReactive.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
```

---

## Deployment Sequence

Deployment follows a strict ordering due to cross-contract dependencies. See [Deployment Scripts](Deployment-Scripts.md) for detailed commands.

1.  **Ethereum Sepolia (L1)**: Deploy `MockOracle` and `GuardianRegistry`.
2.  **Reactive Network**: Deploy `AegisSentinel` (requires Oracle address).
3.  **Unichain Sepolia (L2)**: Deploy `AegisHook` (requires CREATE2 salt mining).

---

## Foundry Configuration

The `contracts/foundry.toml` file controls compilation and deployment behavior.

### Key Settings

| Setting | Value | Purpose |
| :--- | :--- | :--- |
| `solc_version` | `0.8.26` | Solidity compiler version |
| `evm_version` | `cancun` | Enables Cancun EVM opcodes |
| `via_ir` | `true` | IR-based optimizer (required for v4 hooks) |
| `bytecode_hash` | `none` | Deterministic bytecode for CREATE2 prediction |
| `ffi` | `true` | Allows scripts to execute external commands |

**Why `via_ir = true`?**
Required for `AegisHook.sol` to handle complex stack operations typical in Uniswap v4 hooks.

**Why `bytecode_hash = "none"`?**
Ensures deterministic bytecode generation, which is critical for mining the specific salt required to deploy the hook at a valid address (starting with `0x80`).

---

## Testing Workflow

The test suite at `contracts/test/AegisIntegrationTest.t.sol` validates the entire system.

| Test Function | Description |
| :--- | :--- |
| `testOracleUpdate()` | Updates `MockOracle.setPrice()` on L1. |
| `testAccessControl()` | Confirms only Sentinel can call `setPanicMode()`. |
| `testPanicTrigger()` | Triggers `setPanicMode(true)` via Sentinel. |
| `testCircuitBreaker()` | Reverts Uniswap v4 swaps when panic is active. |

### Debugging Tips

1.  **Verbosity**: Use `-vvvv` to see stack traces and `console.log` output.
2.  **Console Logging**: Import `forge-std/console2.sol` to log values during execution.
    ```solidity
    import {console2} from "forge-std/console2.sol";
    console2.log("Current price:", price);
    ```
3.  **Debugger**: Use `forge test --debug <test_name>` to step through opcodes.

---

## Common Tasks

### Add New Contract
1.  Create file in `contracts/src/`.
2.  Create test in `contracts/test/`.
3.  Run `forge build` and `forge test`.

### Clean Build Artifacts
If you encounter strange compilation errors, try cleaning the artifacts:
```bash
forge clean && forge build
```

## CI/CD Integration

GitHub Actions automatically runs tests on every push. The workflow:
1.  Installs Foundry.
2.  Installs dependencies.
3.  Runs `forge build`.
4.  Runs `forge test`.
5.  Check formatting (`forge fmt --check`).