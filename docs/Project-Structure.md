# Project Structure

## Purpose and Scope

This document describes the physical organization of the Aegis repository, including directory layouts, file locations, and version control patterns. It covers the separation between source code, generated artifacts, dependencies, and configuration files.

---

## Repository Layout Overview

The Aegis repository is organized into three primary directories with supporting configuration at the root:

```mermaid
graph TD
    Root[Aegis Repository Root]
    Root --> Contracts[contracts/]
    Root --> Frontend[frontend/]
    Root --> Lib[lib/]
    Root --> Config[Root configuration files]

    Contracts --> Src[src/]
    Contracts --> Script[script/]
    Contracts --> Test[test/]
    Contracts --> Out[out/ (ignored)]
    Contracts --> Cache[cache/ (ignored)]
    Contracts --> Broadcast[broadcast/ (ignored)]

    Frontend --> App[src/]
    Frontend --> NextBuild[.next/ (ignored)]
    Frontend --> Static[out/ (ignored)]

    Lib --> ForgeStd[forge-std/]
    Lib --> Uniswap[uniswap-hooks/]
    Lib --> Hookmate[hookmate/]
    Lib --> Reactive[system-smart-contracts/]

    Config --> GitIgnore[.gitignore]
    Config --> FoundryToml[foundry.toml]
    Config --> GitModules[.gitmodules]
```

---

## Contracts Directory Structure (`contracts/`)

The `contracts/` directory contains all Solidity smart contracts and follows the standard Foundry project layout:

### Source Contracts (`contracts/src/`)

Contains the deployable smart contracts that implement the Aegis system:

| Contract File | Purpose | Deployment Target |
| :--- | :--- | :--- |
| `AegisHook.sol` | Uniswap v4 hook implementing circuit breaker | Unichain Sepolia (L2) |
| `AegisSentinel.sol` | Reactive Network orchestrator | Reactive Network (Lasna) |
| `MockOracle.sol` | Test oracle for price feeds | Ethereum Sepolia (L1) |
| `AegisGuardianRegistry.sol` | ERC-721 reputation system | Ethereum Sepolia (L1) |

### Deployment Scripts (`contracts/script/`)

Foundry scripts for deploying contracts across chains:

- `04_DeployOracle.s.sol`: Deploys `MockOracle` to Sepolia L1
- `05_DeploySentinel.s.sol`: Deploys `AegisSentinel` to Reactive Network
- `06_DeployHook.s.sol`: Deploys `AegisHook` to Unichain L2

### Test Suite (`contracts/test/`)

Contains `*.t.sol` test files that verify contract behavior. Tests use the `forge-std` library for testing utilities.

---

## Frontend Directory Structure (`frontend/`)

The `frontend/` directory contains the Next.js dashboard for monitoring the Aegis system:

### Source Code (`frontend/src/`)

Contains React/TypeScript components, pages, and application logic. The dashboard provides:

- Guardian reputation statistics
- Panic mode status monitoring
- Pool health metrics
- Intervention history

---

## Library Dependencies (`lib/`)

The `lib/` directory contains git submodules that provide external dependencies. These are not stored directly in the repository but referenced via `.gitmodules`:

| Submodule | Repository | Purpose |
| :--- | :--- | :--- |
| `forge-std` | `foundry-rs/forge-std` | Testing utilities and standard library |
| `uniswap-hooks` | `openzeppelin/uniswap-hooks` | Uniswap v4 hook interfaces |
| `hookmate` | `akshatmittal/hookmate` | Hook development utilities |
| `system-smart-contracts` | `Reactive-Network/system-smart-contracts` | Reactive Network SDK |

To initialize dependencies:
```bash
git submodule update --init --recursive
```

---

## Version Control Patterns

The repository uses `.gitignore` files to exclude generated artifacts from version control:

| Pattern | Purpose |
| :--- | :--- |
| `.env`, `.env.local` | Environment variables with secrets |
| `node_modules/` | Node.js dependencies |
| `contracts/out/`, `contracts/cache/` | Foundry artifacts |
| `contracts/broadcast/` | Deployment logs |
| `frontend/.next/`, `frontend/out/` | Next.js build outputs |