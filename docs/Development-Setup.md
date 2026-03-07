# Development Setup
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore)
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

This document provides a comprehensive guide for setting up a development environment to work with the Aegis codebase. It covers the initial setup process, project structure, dependency management, and configuration required to build, test, and deploy the smart contracts and frontend application.

For detailed information about specific deployment procedures, see [Deployment](/HACK3R-CRYPTO/Aegis/3-deployment). For testing strategies and CI/CD configuration, see [Testing](/HACK3R-CRYPTO/Aegis/5-testing).

---

## Overview

The Aegis repository uses a **monorepo architecture** with two primary development environments:

1. **Smart Contracts**: Foundry-based Solidity development with multi-chain deployment support
2. **Frontend**: Next.js application for monitoring and interacting with deployed contracts

The smart contract development workflow centers around the Foundry toolchain (`forge`, `cast`, `anvil`), while the frontend uses standard Node.js package management. All external dependencies for smart contracts are managed via **Git submodules** rather than npm, ensuring reproducible builds and precise version control.

---

## Directory Structure and Build Pipeline

The following diagram illustrates the repository layout and how build artifacts are generated:

```
Repository Root

contracts/

frontend/

next dev

next build

dependencies

excludes

excludes

excludes

excludes

excludes

excludes

configures

defines

forge build

forge build

imported by

lib/

forge-std/

uniswap-hooks/

hookmate/

system-smart-contracts/

src/
Next.js source

.next/
Dev server cache

out/
Static build output

node_modules/

.gitignore
Excludes artifacts

out/
Compiled artifacts

cache/
Solidity cache

broadcast/
Deployment logs

foundry.toml
Config file

src/

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

AegisGuardianRegistry.sol

.gitmodules
Submodule definitions

next.config.js
```

**Sources**: [.gitignore1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L1-L26)[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Developer Workflow

The typical development cycle involves building, testing, and deploying contracts across multiple networks:

```
Deployment

Development

Initial Setup

git clone
HACK3R-CRYPTO/Aegis

git submodule
update --init
--recursive

curl -L foundry.paradigm.xyz
foundryup

Edit *.sol
in src/

forge build
--sizes

forge test
-vvv

forge fmt

Set .env
PRIVATE_KEY

forge script
04_DeployOracle

forge script
05_DeploySentinel
--legacy

forge script
06_DeployHook

Check broadcast/
run-*.json
```

**Sources**: [contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

---

## Quick Start

### Step 1: Clone Repository

```
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis
```

### Step 2: Initialize Git Submodules

The project uses four Git submodules for external dependencies. Initialize them with:

```
git submodule update --init --recursive
```

This downloads:

- `lib/forge-std` - Foundry standard library
- `lib/uniswap-hooks` - Uniswap V4 hook interfaces
- `lib/hookmate` - Hook development utilities
- `lib/system-smart-contracts` - Reactive Network contracts

See [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules) for detailed information about each submodule.

**Sources**: [contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

### Step 3: Install Foundry

Install the Foundry toolchain (includes `forge`, `cast`, `anvil`):

```
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Verify installation:

```
forge --version
# Should output: forge 0.2.0 or later
```

See [Prerequisites](/HACK3R-CRYPTO/Aegis/4.1-prerequisites) for alternative installation methods.

### Step 4: Build Contracts

Navigate to the contracts directory and compile:

```
cd contracts
forge build --sizes
```

The `--sizes` flag displays contract bytecode sizes, useful for identifying contracts approaching the 24KB limit. Compiled artifacts are written to `out/` and cached in `cache/`.

**Sources**: [.gitignore16-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L16-L18)[contracts/foundry.toml1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L16)

### Step 5: Run Tests

Execute the test suite with verbose output:

```
forge test -vvv
```

The `-vvv` flag provides detailed logging including:

- Gas usage per test
- Event emissions
- Contract calls and reverts

See [Test Suite](/HACK3R-CRYPTO/Aegis/5.1-test-suite) for details on individual tests.

---

## Foundry Configuration Overview

The `foundry.toml` file configures the Solidity compiler, optimizer, and RPC endpoints. Key settings include:
SettingValuePurpose`solc_version``0.8.26`Solidity compiler version`evm_version``cancun`Target EVM version (Dencun upgrade)`via_ir``true`Enable IR-based compilation for optimization`bytecode_hash``none`Disable metadata hash for deterministic builds`ffi``true`Allow foreign function interface for HookMiner`libs``["lib"]`Library directory for dependencies
### Remappings

Import remappings simplify dependency management in Solidity files:

```
reactive-lib/           → lib/system-smart-contracts/lib/reactive-lib/src/
system-smart-contracts/ → lib/system-smart-contracts/src/
v4-core/                → lib/uniswap-hooks/lib/v4-core/
v4-periphery/           → lib/uniswap-hooks/lib/v4-periphery/

```

These allow importing with clean paths like:

```
import "v4-core/src/interfaces/IHooks.sol";
```

### RPC Endpoints

Pre-configured RPC endpoints for deployment:
NetworkChain IDRPC AliasEndpointEthereum Sepolia11155111`sepolia`Alchemy RPCReactive Kopli5318007`reactive``https://lasna-rpc.rnk.dev/`Unichain Sepolia1301`unichain_sepolia`PublicNode RPC
See [Network Configuration](/HACK3R-CRYPTO/Aegis/3.2-network-configuration) for detailed deployment instructions.

**Sources**: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

---

## Build Artifacts and Caching

### Compiled Output Structure

After running `forge build`, the `out/` directory contains:

```
out/
├── AegisHook.sol/
│   ├── AegisHook.json         # Contract ABI and metadata
│   └── AegisHook.metadata.json
├── AegisSentinel.sol/
│   ├── AegisSentinel.json
│   └── AegisSentinel.metadata.json
├── MockOracle.sol/
│   ├── MockOracle.json
│   └── MockOracle.metadata.json
└── AegisGuardianRegistry.sol/
    ├── AegisGuardianRegistry.json
    └── AegisGuardianRegistry.metadata.json

```

Each `.json` file includes:

- **ABI**: Function signatures, events, and errors
- **Bytecode**: Deployed contract code
- **Metadata**: Compiler settings and source mappings

### Ignored Artifacts

The `.gitignore` configuration excludes build artifacts from version control:

```
contracts/out/       # Compiled contracts
contracts/cache/     # Solidity compiler cache
contracts/broadcast/ # Deployment transaction logs

```

This ensures:

- Smaller repository size
- Faster cloning
- No merge conflicts on generated files
- Reproducible builds from source

**Sources**: [.gitignore16-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L16-L18)[contracts/foundry.toml7](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L7-L7)

---

## Environment Variables

Create a `.env` file in the `contracts/` directory for sensitive configuration:

```
# Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Optional: Override RPC endpoints
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
REACTIVE_RPC_URL=https://lasna-rpc.rnk.dev/
UNICHAIN_RPC_URL=https://unichain-sepolia-rpc.publicnode.com
```

**Security Note**: The `.env` file is excluded from version control [.gitignore2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L2-L3) Never commit private keys to the repository.

**Sources**: [.gitignore2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L2-L3)

---

## Common Development Commands
CommandPurposeExample`forge build`Compile all contracts`forge build --sizes``forge test`Run test suite`forge test -vvv``forge fmt`Format Solidity code`forge fmt``forge clean`Remove build artifacts`forge clean``forge script`Execute deployment script`forge script script/04_DeployOracle.s.sol``forge snapshot`Create gas snapshots`forge snapshot``forge coverage`Generate coverage report`forge coverage``cast call`Query contract state`cast call <addr> "panicMode()"``cast send`Send transaction`cast send <addr> "setPrice(uint256)" 1000`
### Build Profile

The repository supports multiple build profiles. The CI profile is automatically used in GitHub Actions:

```
# Use CI profile (more strict)
FOUNDRY_PROFILE=ci forge build

# Use default profile
forge build
```

**Sources**: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

---

## Frontend Development

The Next.js frontend is located in the `frontend/` directory. To set up:

```
cd frontend
npm install        # or yarn install
npm run dev        # Start development server on localhost:3000
npm run build      # Build for production
```

Build artifacts:

- `.next/` - Development server cache (excluded from git)
- `out/` - Static export output (excluded from git)

See [Frontend Application](/HACK3R-CRYPTO/Aegis/7-frontend-application) for detailed documentation.

**Sources**: [.gitignore20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L20-L22)

---

## Submodule Management

### Updating Submodules

To update all submodules to their latest commits:

```
git submodule update --remote --merge
```

To update a specific submodule:

```
git submodule update --remote lib/forge-std
```

### Checking Submodule Status

View current commit hashes:

```
git submodule status
```

Output format:

```
 <commit-hash> lib/forge-std (v1.7.3)
 <commit-hash> lib/uniswap-hooks (heads/main)
 <commit-hash> lib/hookmate (v0.1.0)
 <commit-hash> lib/system-smart-contracts (heads/main)

```

See [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules) for detailed information about each dependency.

**Sources**: [contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Troubleshooting

### "Submodule not initialized" Error

If you see errors about missing dependencies:

```
git submodule update --init --recursive
```

### "Solidity version mismatch" Error

The project requires Solidity 0.8.26. Verify your Foundry installation:

```
forge --version
foundryup  # Update to latest Foundry
```

### "Out of gas" During Tests

Some tests (especially cross-chain interactions) require higher gas limits. The `foundry.toml` is pre-configured, but you can override:

```
forge test --gas-limit 30000000
```

### RPC Rate Limiting

If deployment scripts fail due to rate limits, consider:

1. Using a dedicated RPC endpoint (Alchemy, Infura)
2. Adding delays between transactions
3. Configuring custom RPC URLs in `.env`

**Sources**: [contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)

---

## Next Steps

After completing the development setup:

1. **Review Smart Contracts**: Study the [Smart Contracts](/HACK3R-CRYPTO/Aegis/2-smart-contracts) section to understand the architecture
2. **Run Tests**: Explore the [Test Suite](/HACK3R-CRYPTO/Aegis/5.1-test-suite) to validate your setup
3. **Configure Networks**: Set up RPC endpoints following [Network Configuration](/HACK3R-CRYPTO/Aegis/3.2-network-configuration)
4. **Deploy Contracts**: Follow the [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts) guide for multi-chain deployment
5. **Mine Hook Address**: Review [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining) to understand CREATE2 address generation

**Sources**: [.gitignore1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L1-L26)[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)