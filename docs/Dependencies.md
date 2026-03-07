# Dependencies
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)
- [contracts/foundry.lock](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock)

This document provides an overview of the external libraries and frameworks used in the Aegis project. It covers the dependency management strategy, version pinning approach, and the relationship between Aegis contracts and their external dependencies.

For detailed information about specific dependency categories, see:

- **Foundry Standard Library**: [Foundry Standard Library](/HACK3R-CRYPTO/Aegis/6.1-foundry-standard-library)
- **Uniswap V4 Integration**: [Uniswap V4 Integration](/HACK3R-CRYPTO/Aegis/6.2-uniswap-v4-integration)
- **Reactive Network**: [Reactive Network](/HACK3R-CRYPTO/Aegis/6.3-reactive-network)
- **Hookmate**: [Hookmate](/HACK3R-CRYPTO/Aegis/6.4-hookmate)

For development setup instructions including how to initialize these dependencies, see [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules).

## Dependency Management Strategy

The Aegis project uses **Git submodules** to manage external dependencies rather than a package manager like npm or Yarn. This approach ensures:

1. **Deterministic builds**: All dependencies are pinned to specific Git commits
2. **Transparency**: The exact source code of dependencies is visible in the repository
3. **Compatibility**: Works seamlessly with Foundry's Solidity toolchain
4. **Auditability**: Security audits can include dependency code at specific versions

All submodules are declared in the `.gitmodules` file and their commit hashes are locked in `foundry.lock` to prevent unexpected updates.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

## Dependency Categories

The Aegis project has four primary external dependencies, each serving a distinct purpose:
CategorySubmoduleRepositoryPurposeTesting & Deployment`lib/forge-std`foundry-rs/forge-stdProvides testing framework, deployment scripts base, and common utilitiesHook Development`lib/uniswap-hooks`openzeppelin/uniswap-hooksAudited base implementations for Uniswap V4 hooksHook Utilities`lib/hookmate`akshatmittal/hookmateDevelopment utilities for hook patterns and testingCross-Chain`lib/system-smart-contracts`Reactive-Network/system-smart-contractsCore contracts for Reactive Network integration
**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

## Dependency Graph

The following diagram illustrates how Aegis contracts depend on external libraries:

```
Deployment Scripts

lib/system-smart-contracts

lib/hookmate

lib/uniswap-hooks

lib/forge-std

Aegis Smart Contracts

inherits

implements

inherits

implements

inherits

inherits

inherits

uses

tested via

tested via

tested via

tested via

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

AegisGuardianRegistry.sol

Test.sol

Script.sol

console.sol

Vm.sol

BaseHook.sol

IHooks.sol

Hooks.sol

HookMiner.sol

HookTest.sol

AbstractReactive.sol

IReactive.sol

Reactive events

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol
```

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

## Version Pinning

The `foundry.lock` file pins dependencies to specific Git commit hashes to ensure reproducible builds across all development environments and CI/CD pipelines. This prevents "works on my machine" issues and ensures that all developers and automated systems compile contracts with identical dependency versions.
SubmodulePinned Commit HashStatus`lib/forge-std``8bbcf6e3f8f62f419e5429a0bd89331c85c37824`✅ Locked`lib/hookmate``33408fbc15e083eb0bc4205fa37cb6ba0a926f44`✅ Locked`lib/uniswap-hooks``e59fe72c110c3862eec9b332530dce49ca506bbb`✅ Locked`lib/system-smart-contracts`N/A⚠️ Not in lock file
**Note:** The `system-smart-contracts` dependency does not appear in `foundry.lock`. This may indicate it uses a different versioning strategy or is tracked through Git submodule commit references only.

**Sources:**[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

## Contract-Dependency Integration Points

The following diagram maps specific Aegis contract files to the dependency interfaces and base contracts they utilize:

```
lib/system-smart-contracts

lib/hookmate

lib/uniswap-hooks

lib/forge-std

Deployment Infrastructure

Reactive Network

L2 Contracts (Unichain)

L1 Contracts (Sepolia)

extends

implements

extends

implements

extends

extends

extends

imports

uses

tested with

tested with

tested with

tested with

MockOracle.sol
Price feed simulator

AegisGuardianRegistry.sol
ERC-721 + ERC-8004

AegisHook.sol
Circuit breaker hook

AegisSentinel.sol
Autonomous monitor

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol

HookMiner calculation

Test.sol
Unit testing

Script.sol
Deployment base

BaseHook.sol
Hook template

IHooks.sol
Hook interface

HookMiner.sol
Salt calculation

AbstractReactive.sol
Reactive base

IReactive.sol
Event subscription
```

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

## Dependency Initialization

To initialize all Git submodules when cloning the repository:

```
git submodule update --init --recursive
```

This command:

1. Initializes submodule configuration in `.git/config`
2. Clones each submodule repository to the specified path
3. Checks out the commit hash specified in the parent repository
4. Recursively initializes any nested submodules

The `--recursive` flag ensures that if any dependency has its own submodules (such as Uniswap V4 dependencies), those are also initialized.

For more details on development environment setup, see [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup).

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

## Dependency Update Policy

The commit hashes in `foundry.lock` should only be updated when:

1. A critical security vulnerability is discovered in a dependency
2. A required feature is added to an upstream dependency
3. The project undergoes a major version upgrade

When updating dependencies:

1. Update the Git submodule to the desired commit
2. Run the full test suite to verify compatibility
3. Update `foundry.lock` by committing the submodule reference
4. Document the change in commit messages and release notes

**Sources:**[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

## Submodule Directory Structure

All external dependencies are organized under the `contracts/lib/` directory:

```
contracts/
├── lib/
│   ├── forge-std/           # Foundry standard library
│   ├── hookmate/            # Hook development utilities
│   ├── system-smart-contracts/  # Reactive Network core
│   └── uniswap-hooks/       # OpenZeppelin hook base contracts
├── src/                     # Aegis contract source code
├── script/                  # Deployment scripts
└── test/                    # Integration tests

```

This structure follows Foundry conventions where all external code is isolated in `lib/`, preventing naming conflicts and making the boundary between project code and dependencies explicit.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)