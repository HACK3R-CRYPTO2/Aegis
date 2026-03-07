# Prerequisites
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

This page documents the required software tools and system dependencies needed to build, test, and deploy the Aegis cross-chain circuit breaker system. These prerequisites must be installed before proceeding with project setup ([Project Structure](/HACK3R-CRYPTO/Aegis/4.2-project-structure)) or development work.

For information about configuring Foundry after installation, see [Foundry Configuration](/HACK3R-CRYPTO/Aegis/4.4-foundry-configuration). For details on initializing dependencies, see [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules).

---

## Overview

The Aegis repository requires three primary toolchains:

1. **Foundry** - Solidity development framework for smart contract compilation, testing, and deployment
2. **Node.js** - JavaScript runtime for the Next.js frontend and TypeScript-based relayer
3. **Git** - Version control system for repository cloning and submodule management

Additional optional tools include code editors with Solidity language support and blockchain explorers for contract verification.

**Sources:**[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)

---

## Tool Requirements Matrix
ToolMinimum VersionPurposeInstallation PriorityFoundryLatest stableSmart contract development**Required**Solidity0.8.26Contract compilation**Required** (bundled with Foundry)Node.js16.x or higherFrontend and relayer runtime**Required**npm/yarnLatest stableJavaScript package management**Required** (bundled with Node.js)Git2.x or higherRepository cloning and submodules**Required**VSCodeLatestSolidity editing with formattingOptional
**Sources:**[contracts/foundry.toml8](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L8-L8)[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)

---

## Foundry Toolchain

### Overview

Foundry is a blazing-fast Ethereum development toolkit written in Rust. Aegis uses Foundry for all smart contract operations including compilation, testing, deployment scripting, and on-chain interactions.

### Components

The Foundry installation provides four core command-line tools:

- **`forge`** - Smart contract compilation, testing, and build management
- **`cast`** - Ethereum RPC interactions and data conversions
- **`anvil`** - Local Ethereum testnet for development
- **`chisel`** - Solidity REPL for rapid prototyping

### Installation

#### Linux/macOS

```
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

This installs `foundryup`, the Foundry version manager, which then downloads and installs all four tools.

#### Windows

Use Windows Subsystem for Linux (WSL) and follow the Linux installation instructions, or download precompiled binaries from the [Foundry releases page](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/Foundry releases page)

### Version Requirements

The Aegis project requires:

- **Solidity compiler version**: 0.8.26
- **EVM version**: Cancun
- **Via IR compilation**: Enabled

These are configured in [contracts/foundry.toml3-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L3-L16) and automatically used by `forge` when building contracts.

### Verification

```
forge --version
# Expected output: forge 0.2.0 (or higher)

cast --version
# Expected output: cast 0.2.0 (or higher)
```

**Sources:**[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)[README.md109-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L109-L110)

---

## Node.js and npm

### Overview

Node.js is required for two components in the Aegis system:

1. **Frontend Dashboard** - Next.js application running on `localhost:3000`
2. **Hybrid Relayer** - TypeScript-based fallback relay service (`relay.ts`)

### Installation

#### Linux (Ubuntu/Debian)

```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### macOS

```
brew install node
```

#### Windows

Download the installer from [nodejs.org](https://nodejs.org/) and run the MSI package.

### Version Requirements

- **Node.js**: 16.x or higher (18.x LTS recommended)
- **npm**: 7.x or higher (bundled with Node.js)

Alternative package managers like `yarn` or `pnpm` can also be used.

### Verification

```
node --version
# Expected output: v18.x.x (or higher)

npm --version
# Expected output: 8.x.x (or higher)
```

**Sources:**[README.md113-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L113-L122)

---

## Git Version Control

### Overview

Git is required for:

- Cloning the Aegis repository
- Managing Git submodules for external dependencies
- Version control during development

### Installation

#### Linux (Ubuntu/Debian)

```
sudo apt-get update
sudo apt-get install git
```

#### macOS

```
brew install git
```

#### Windows

Download the installer from [git-scm.com](https://git-scm.com/) and follow the installation wizard.

### Submodule Support

The Aegis repository uses Git submodules extensively for dependency management (see [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules)). Ensure Git is version 2.x or higher for full submodule functionality.

### Verification

```
git --version
# Expected output: git version 2.x.x (or higher)
```

**Sources:**[README.md107](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L107-L107)

---

## Toolchain Architecture Diagram

The following diagram shows how the prerequisite tools interact during the development workflow:

```
Build Artifacts

Aegis Repository

Developer Workstation

git submodule update

forge build

reads

forge test

forge script

compiles to

generates

npm install

npm run dev

npm run relay

next build

git clone --recurse-submodules

Git 2.x+
Repository Management

Foundry Toolchain
forge, cast, anvil

Node.js 16+
JavaScript Runtime

contracts/
Solidity Source

frontend/
Next.js Application

lib/
Git Submodules

foundry.toml
Foundry Configuration

contracts/out/
Compiled ABIs

frontend/out/
Static HTML

contracts/broadcast/
Deployment Receipts
```

**Sources:**[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

---

## Installation Dependency Graph

The following diagram shows the installation order and dependencies between tools:

```
Operating System
Linux/macOS/Windows

Git
git clone, submodule

Foundry
foundryup installer

Node.js
npm bundled

Rust Toolchain
Required by Foundry

Solidity Compiler 0.8.26
Bundled with forge

npm Package Manager
Bundled with Node.js

Aegis Repository
git clone

Forge Dependencies
forge install

Node Modules
npm install
```

**Sources:**[README.md107-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L107-L110)[contracts/foundry.toml6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L6-L6)

---

## Optional Development Tools

### Visual Studio Code

VSCode provides Solidity syntax highlighting and integrates with `forge fmt` for automatic code formatting. The Aegis repository includes a `.vscode/settings.json` configuration (see [Editor Setup](/HACK3R-CRYPTO/Aegis/4.5-editor-setup)).

**Recommended Extensions:**

- `juanblanco.solidity` - Solidity language support
- `NomicFoundation.hardhat-solidity` - Enhanced Solidity features

### Blockchain Explorers

While not installed locally, these web-based tools are useful for verifying deployed contracts:
NetworkExplorerPurposeEthereum Sepoliaetherscan.ioVerify `MockOracle` and `AegisGuardianRegistry`Unichain Sepoliauniscan.xyzVerify `AegisHook` deploymentReactive Kopliexplorer.reactive.networkVerify `AegisSentinel`
**Sources:**[README.md138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L138-L142)

---

## System Requirements

### Hardware

- **CPU**: Multi-core processor (2+ cores recommended)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Disk**: 5 GB free space for tools and dependencies

### Network

- **Internet connection** required for:

- RPC endpoint access ([contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22))
- Git submodule initialization
- npm package downloads

### Operating Systems

Aegis has been tested on:

- **Linux**: Ubuntu 20.04+, Debian 11+
- **macOS**: 11 (Big Sur) or higher
- **Windows**: Windows 10+ with WSL 2

**Sources:**[contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)

---

## Verification Checklist

After installing all prerequisites, verify the installation with these commands:

```
# Check Git
git --version

# Check Foundry
forge --version
cast --version

# Check Node.js
node --version
npm --version

# Clone repository (test Git + network)
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis

# Initialize submodules (test Git submodule support)
git submodule update --init --recursive

# Test Foundry (test Solc compilation)
cd contracts
forge build

# Test Node.js (test npm package manager)
cd ../frontend
npm install --version
```

All commands should execute without errors. If any command fails, revisit the installation instructions for that specific tool.

**Sources:**[README.md107-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L107-L122)

---

## Troubleshooting

### Common Issues
IssueSymptomSolution`forge: command not found`Foundry not in PATHRun `foundryup` again, then restart terminal`npm: command not found`Node.js not in PATHReinstall Node.js and restart terminal`git submodule` failsNetwork firewall blocking Git protocolUse `https://` URLs in `.gitmodules``forge build` fails with memory errorInsufficient RAM for `via_ir` compilationIncrease Docker/VM memory or use `--no-via-ir` flag
### Getting Help

If issues persist after following this guide:

1. Check the [Foundry Book](https://book.getfoundry.sh/) for Foundry-specific issues
2. Review the [Node.js documentation](https://nodejs.org/docs/) for Node.js issues
3. Consult the Aegis repository's GitHub Issues page

**Sources:**[contracts/foundry.toml16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L16-L16)