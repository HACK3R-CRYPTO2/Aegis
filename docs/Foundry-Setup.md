# Foundry Setup

## Purpose and Scope

This page provides a guide for setting up the Foundry development environment to work with the Aegis codebase. It covers Foundry installation, initial configuration verification, and essential commands for building and testing the contracts.

---

## Prerequisites

Before installing Foundry, ensure your system has the following:

| Requirement | Minimum Version | Purpose |
| :--- | :--- | :--- |
| Git | 2.0+ | Required for submodule management |
| Rust/Cargo | Latest stable | Foundry is built in Rust |
| Unix-like Env | macOS/Linux/WSL2 | Native Windows support is limited |

---

## Installing Foundry

### Using Foundryup (Recommended)

Foundryup is the official installer and version manager for Foundry.

```bash
# 1. Download and run foundryup
curl -L https://foundry.paradigm.xyz | bash

# 2. Reload shell environment
source ~/.bashrc  # or ~/.zshrc

# 3. Install latest Foundry version
foundryup
```

### Verifying Installation

Confirm all tools are correctly installed:

```bash
forge --version
cast --version
anvil --version
```

---

## Initializing the Aegis Project

### Clone and Setup

```bash
# 1. Clone the repository
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis/contracts

# 2. Initialize Git submodules (critical step)
git submodule update --init --recursive

# 3. Install dependencies via Foundry
forge install
```

---

## Core Foundry Commands

### Build Commands

The primary command for compiling Solidity contracts:

```bash
# Standard build
forge build

# Clean build (removes cache)
forge clean && forge build
```

### Test Commands

```bash
# Run all tests
forge test

# Run with verbose output (shows logs)
forge test -vv

# Run specific test contract
forge test --match-contract AegisIntegrationTest
```

### Script Commands

Aegis uses three deployment scripts in sequence:

```bash
# 1. Deploy MockOracle to Sepolia
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast

# 2. Deploy AegisSentinel to Reactive Network
forge script script/05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacy

# 3. Deploy AegisHook to Unichain
forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcast
```

---

## Configuration Verification

After installation, verify that Foundry reads the Aegis configuration correctly:

```bash
# Check Solidity Version (Should be 0.8.26)
forge config | grep solc_version

# Verify Remappings
forge remappings
```