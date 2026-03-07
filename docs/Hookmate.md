# Hookmate
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)

## Purpose and Scope

This document describes the **Hookmate** library, a third-party utility library used in the Aegis project to facilitate Uniswap v4 hook development. Hookmate provides helper functions and development tools specifically designed to simplify the implementation and deployment of Uniswap v4 hooks.

For information about the Uniswap v4 integration in general, see [Uniswap V4 Integration](/HACK3R-CRYPTO/Aegis/6.2-uniswap-v4-integration). For details about the AegisHook contract that uses Hookmate, see [AegisHook](/HACK3R-CRYPTO/Aegis/2.3-aegishook). For information about hook address mining (CREATE2 salt calculation), see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining).

---

## Overview

Hookmate is an open-source library developed by Akshat Mittal and maintained at [github.com/akshatmittal/hookmate](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/github.com/akshatmittal/hookmate) It is integrated into the Aegis project as a Git submodule located at `lib/hookmate/`.

The library addresses common challenges in Uniswap v4 hook development, including:

- Hook address calculation and validation
- CREATE2 deployment utilities
- Helper functions for hook flag checking
- Development and testing utilities

Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)

---

## Integration as Git Submodule

Hookmate is managed as a Git submodule in the Aegis repository, alongside other key dependencies such as forge-std, uniswap-hooks, and system-smart-contracts.

### Submodule Configuration

```
Aegis Repository

Git Submodules

defines

defines

defines

defines

contains

contains

contains

contains

provides utilities to

.gitmodules

lib/

forge-std/

uniswap-hooks/

hookmate/

system-smart-contracts/

AegisHook.sol
```

**Diagram: Hookmate Submodule Integration**

The submodule is configured in `.gitmodules` with the following entry:
PropertyValuePath`lib/hookmate`URL`https://github.com/akshatmittal/hookmate`TypeGit Submodule
Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)

---

## Dependency Relationship

Hookmate occupies a specific role in the Aegis dependency graph, providing hook development utilities that complement the core Uniswap v4 interfaces.

```
Development Tools

Core Uniswap V4 Dependencies

Aegis Smart Contracts

implements

inherits

uses utilities from

tested with

builds on

depends on

AegisHook.sol

v4-core
(IHooks interface)

v4-periphery
(Helper contracts)

uniswap-hooks
(OpenZeppelin base)

hookmate
(Hook utilities)

forge-std
(Testing framework)
```

**Diagram: Hookmate in the Dependency Graph**

Unlike forge-std (testing) or uniswap-hooks (base implementations), Hookmate provides specialized utilities for hook development workflows, particularly around address calculation and CREATE2 deployment patterns required for Uniswap v4 hooks.

Sources: [contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Hook Development Utilities

Hookmate provides utilities that address specific challenges in Uniswap v4 hook development. The most critical utility relates to hook address requirements.

### Hook Address Requirements

Uniswap v4 uses hook addresses as permission flags. The address of a hook contract encodes which callbacks it implements through specific bit flags in its address:
Address PrefixFlagHook Callback`0x80...``BEFORE_SWAP_FLAG``beforeSwap()``0x40...``AFTER_SWAP_FLAG``afterSwap()``0x20...``BEFORE_ADD_LIQUIDITY_FLAG``beforeAddLiquidity()``0x10...``AFTER_ADD_LIQUIDITY_FLAG``afterAddLiquidity()`
To obtain an address with specific flags, developers must:

1. Use CREATE2 deployment
2. Calculate a salt that produces the desired address prefix
3. Validate the address meets Uniswap v4 requirements

Hookmate provides utilities to streamline this process.

---

## Usage in Aegis

The AegisHook contract requires the `BEFORE_SWAP_FLAG` (`0x80...`) because it implements the `beforeSwap()` callback to enforce the circuit breaker. Hookmate utilities assist in calculating the CREATE2 salt needed for this deployment.

```
"Uniswap v4"
"CREATE2 Deployment"
"Hookmate Library"
"HookMiner Script"
"Developer"
"Uniswap v4"
"CREATE2 Deployment"
"Hookmate Library"
"HookMiner Script"
"Developer"
loop
["Iterate salts"]
"Need 0x80... address"
"calculateSalt(bytecode, deployer)"
"computeAddress(salt)"
"Check address prefix"
"Salt: 0xabcd..."
"Use this salt for deployment"
"deploy(bytecode, salt)"
"Deployed to 0x80..."
"registerHook(0x80...)"
"Validate address flags"
"Hook registered"
```

**Diagram: Hookmate Usage in Hook Deployment Workflow**

The AegisHook deployment process leverages Hookmate utilities to:

1. Calculate the CREATE2 salt needed to produce a `0x80...` address
2. Validate the computed address meets Uniswap v4 requirements
3. Ensure EIP-55 checksum compatibility across networks

Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)

---

## Development Workflow Integration

Hookmate integrates into the Aegis development workflow at the pre-deployment stage, working in conjunction with Foundry tooling.

```
Deployment Phase

Pre-Deployment Phase

Development Phase

uses

Write AegisHook.sol
(implements beforeSwap)

forge build
(compile bytecode)

HookMiner Script

Hookmate Library

Address Validation

06_DeployHook.s.sol

CREATE2 Deployment

AegisHook
(0x80... address)
```

**Diagram: Hookmate in the Development Workflow**

The workflow demonstrates how Hookmate utilities are primarily used during the pre-deployment phase to calculate the necessary parameters for CREATE2 deployment, ensuring the final hook address meets Uniswap v4's address-as-permission-flag requirements.

Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)

---

## Initialization and Setup

To initialize the Hookmate submodule in a fresh clone of the Aegis repository:

```
# Initialize all submodules (including Hookmate)
git submodule update --init --recursive

# Or initialize only Hookmate
git submodule update --init lib/hookmate
```

After initialization, the Hookmate library is available at `lib/hookmate/` and can be imported in Solidity contracts using Foundry's remapping system.

### Foundry Remapping

The Foundry configuration (`foundry.toml`) includes remappings that allow contracts to import Hookmate utilities. While the specific remapping syntax depends on the Hookmate library structure, it typically follows the pattern:

```
hookmate/=lib/hookmate/src/

```

This allows Solidity files to import Hookmate utilities with clean import statements.

Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)

---

## Relationship to Other Dependencies

Hookmate complements but does not replace other dependencies in the Aegis project:
DependencyPurposeRelationship to Hookmate**forge-std**Testing and deployment frameworkSeparate concern; both used in development**uniswap-hooks**Base hook implementations (OpenZeppelin)Provides contract bases; Hookmate provides utilities**v4-core**Core Uniswap v4 interfacesDefines requirements; Hookmate helps meet them**system-smart-contracts**Reactive Network contractsUnrelated; for cross-chain functionality
Hookmate specifically addresses hook-specific development challenges, particularly around address calculation and CREATE2 deployment, which are not covered by the other dependencies.

Sources: [contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Practical Considerations

### Address Flag Requirements

When developing with Hookmate for the Aegis project, developers should be aware of:

1. **Address Prefix Requirements**: The AegisHook needs `0x80...` for `BEFORE_SWAP_FLAG`
2. **Salt Calculation Time**: Computing the correct salt may take time depending on hardware
3. **Deterministic Deployment**: The same salt and bytecode always produce the same address
4. **Network Independence**: The same salt works across all EVM-compatible networks

### Deployment Validation

Before deploying a hook contract:

- Verify the computed address has the correct prefix
- Validate EIP-55 checksum compatibility
- Test the deployment on a testnet first
- Ensure the bytecode matches what was used for salt calculation

Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)

---

## Summary

Hookmate is a utility library that simplifies Uniswap v4 hook development by providing tools for:

- CREATE2 address calculation
- Hook flag validation
- Deployment utilities

In the Aegis project, Hookmate is integrated as a Git submodule and used primarily during the pre-deployment phase to calculate the CREATE2 salt needed to deploy AegisHook with the required `BEFORE_SWAP_FLAG` (`0x80...`) address prefix.

The library complements other dependencies like forge-std (testing), uniswap-hooks (base implementations), and v4-core (interfaces) by focusing specifically on the unique address calculation requirements of Uniswap v4 hooks.

Sources: [contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)