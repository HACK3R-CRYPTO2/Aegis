# Uniswap V4 Integration
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

## Purpose and Scope

This document describes the Uniswap V4 dependencies used by Aegis for implementing the `AegisHook` circuit breaker mechanism. It covers the three primary libraries that enable hook development: the OpenZeppelin `uniswap-hooks` base library, Uniswap's `v4-core` interfaces, and `v4-periphery` helper contracts.

For implementation details of the `AegisHook` contract itself, see [AegisHook](/HACK3R-CRYPTO/Aegis/2.3-aegishook). For the complete dependency overview, see [Dependencies](/HACK3R-CRYPTO/Aegis/6-dependencies).

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/README.md1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L123)

---

## Uniswap V4 Hook System

Uniswap V4 introduces a **hooks architecture** that allows developers to inject custom logic at specific points during pool operations. Unlike previous versions where pool behavior was fixed, V4 pools can delegate execution to external hook contracts at key lifecycle events:

- `beforeInitialize` / `afterInitialize` - Pool creation
- `beforeAddLiquidity` / `afterAddLiquidity` - Liquidity provision
- `beforeRemoveLiquidity` / `afterRemoveLiquidity` - Liquidity withdrawal
- **`beforeSwap`** / `afterSwap` - Swap execution (critical for Aegis)
- `beforeDonate` / `afterDonate` - Donations

The `AegisHook` contract leverages the **`beforeSwap`** hook to implement a circuit breaker that can halt trading during market volatility.

**Sources:**[contracts/README.md34-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L34-L37)

---

## Dependencies Overview

Aegis integrates three distinct Uniswap V4 libraries, each serving a specific role:
LibraryRepositoryPurpose**uniswap-hooks**`github.com/openzeppelin/uniswap-hooks`OpenZeppelin-audited base contracts for hook development**v4-core**Uniswap V4 CoreCore interfaces (`IHooks`, `IPoolManager`) and pool logic**v4-periphery**Uniswap V4 PeripheryHelper contracts and utilities for interacting with pools
**Sources:**[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)

### Dependency Installation

These dependencies are managed as Git submodules and initialized during development setup:

```
git submodule update --init --recursive
```

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Dependency Architecture

```
Uniswap V4 Periphery

Uniswap V4 Core

OpenZeppelin Base

Aegis Implementation

inherits

implements

references

uses

implements

built on

depends on

defined in

defined in

defined in

AegisHook.sol
(src/AegisHook.sol)

uniswap-hooks
lib/uniswap-hooks/

BaseHook.sol
(Base Implementation)

v4-core
(Core Interfaces)

IHooks.sol
(Hook Interface)

IPoolManager.sol
(Pool Manager)

PoolKey.sol
(Pool Identifier)

v4-periphery
(Helper Contracts)

Deployment Helpers
Test Utilities
```

**Explanation:**`AegisHook` inherits from OpenZeppelin's audited `BaseHook` contract, which provides boilerplate hook functionality. Both ultimately implement the `IHooks` interface from `v4-core`. The hook interacts with pools via the `IPoolManager` interface.

**Sources:**[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)[contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)

---

## uniswap-hooks Library (OpenZeppelin)

### Overview

The `uniswap-hooks` library from OpenZeppelin provides production-ready base contracts for hook development. This is the **primary dependency** that `AegisHook` inherits from.

```
[submodule "lib/uniswap-hooks"]
    path = lib/uniswap-hooks
    url = https://github.com/openzeppelin/uniswap-hooks
```

**Sources:**[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)

### Key Features

The OpenZeppelin base implementation provides:

1. **Interface Compliance** - Automatically implements all required `IHooks` functions
2. **Permission Management** - Handles the complex permission bitmap system
3. **Hook Validation** - Ensures hooks are called by authorized pool managers
4. **Safe Defaults** - Stubs for unused hook functions with correct return values
5. **Audited Code** - Security-reviewed by OpenZeppelin's audit team

### Usage in AegisHook

The `AegisHook` contract inherits from the OpenZeppelin base and overrides only the necessary functions:

```
contract AegisHook is BaseHook {
    // Override only beforeSwap - all other hooks use safe defaults
    function beforeSwap(...) external override returns (bytes4) {
        // Circuit breaker logic
    }
}
```

This inheritance pattern minimizes custom code and reduces the attack surface by leveraging audited implementations.

**Sources:**[contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)

---

## v4-core: Core Interfaces

### IHooks Interface

The `IHooks` interface defines the standard hook function signatures that all hooks must implement:

```
Hook Functions

IHooks Interface

AegisHook overrides

IHooks.sol

beforeInitialize()

afterInitialize()

beforeAddLiquidity()

afterAddLiquidity()

beforeRemoveLiquidity()

afterRemoveLiquidity()

beforeSwap()

afterSwap()

beforeDonate()

afterDonate()

Circuit Breaker Logic
```

**Sources:**[contracts/README.md34-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L34-L37)

### IPoolManager Interface

The `IPoolManager` is the central contract that manages all Uniswap V4 pools. Hooks interact with pools through this interface:

- `swap()` - Execute a token swap
- `modifyLiquidity()` - Add or remove liquidity
- `initialize()` - Create a new pool
- `donate()` - Donate tokens to liquidity providers

The `AegisHook.beforeSwap()` function can communicate with the pool manager to control swap execution.

### PoolKey Structure

The `PoolKey` struct uniquely identifies a pool and its associated hook:

```
struct PoolKey {
    Currency currency0;      // First token
    Currency currency1;      // Second token
    uint24 fee;             // Fee tier
    int24 tickSpacing;      // Tick spacing
    IHooks hooks;           // Hook contract address
}

```

The hook address in the `PoolKey` must satisfy the permission bitmap requirements (see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining) for details on the `0x80...` address requirement).

**Sources:**[contracts/README.md99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L103)

---

## v4-periphery: Helper Contracts

The `v4-periphery` repository provides auxiliary contracts and utilities:

### Purpose

1. **Deployment Tools** - Scripts for deploying pools with hooks
2. **Testing Utilities** - Mock contracts for testing hook behavior
3. **Router Contracts** - User-facing contracts for interacting with V4 pools
4. **Example Implementations** - Reference hook implementations

### Usage in Aegis

While Aegis primarily depends on `v4-core` for interfaces, `v4-periphery` provides:

- Test harnesses for validating hook behavior in isolation
- Deployment patterns for CREATE2 address mining
- Integration test frameworks

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Hook Permission System

### Address-Based Permissions

Uniswap V4 uses the hook contract's **address** to encode which functions it has permission to call. The address acts as a bitmap where specific bit positions indicate permissions:

```
Hook Address as Bitmap

AegisHook requires

Hook Address: 0x8000...

Bit 7 (0x80): BEFORE_SWAP

Bit 6 (0x40): AFTER_SWAP

Bit 5 (0x20): BEFORE_ADD_LIQUIDITY

Bit 4 (0x10): AFTER_ADD_LIQUIDITY

beforeSwap() permission
```

**AegisHook Requirement:** The contract must be deployed at an address starting with `0x80...` to have `BEFORE_SWAP` permission. This requires CREATE2 salt mining (see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining)).

**Sources:**[contracts/README.md118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L118-L122)

### EIP-55 Checksum Validation

The hook address must also satisfy EIP-55 checksum requirements for cross-chain compatibility. The deployment script validates this before deployment.

**Sources:**[contracts/README.md118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L118-L122)

---

## Integration Flow: Swap Execution

```
"Pool State"
"AegisHook
(beforeSwap)"
"IPoolManager"
"V4 Router"
"User/Trader"
"Pool State"
"AegisHook
(beforeSwap)"
"IPoolManager"
"V4 Router"
"User/Trader"
alt
[Panic Mode Active]
[Normal Operation]
"swap(poolKey, params)"
"swap(poolKey, params)"
"Extract hook address
from poolKey.hooks"
"beforeSwap(sender, poolKey, params)"
"Check panicMode == true"
"revert PoolPaused()"
"Revert"
"Transaction Failed ❌"
"Check panicMode == false"
"Return success selector"
"Execute swap logic"
"Updated state"
"afterSwap(sender, poolKey, params)"
"Return success"
"Swap complete"
"Swap Successful ✅"
```

**Key Points:**

1. The `PoolManager` extracts the hook address from `poolKey.hooks`
2. Calls `beforeSwap()` on the hook before executing swap logic
3. If hook reverts, the entire transaction reverts (circuit breaker activated)
4. If hook returns success, swap proceeds and `afterSwap()` is called

**Sources:**[contracts/README.md34-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L34-L37)

---

## Hook Implementation Pattern

### Minimal Override Strategy

The OpenZeppelin base contract implements all `IHooks` functions with safe defaults. `AegisHook` overrides **only** the functions it needs:

```
BaseHook (OpenZeppelin)
├── beforeInitialize() ───────► Default Implementation
├── afterInitialize() ────────► Default Implementation
├── beforeAddLiquidity() ─────► Default Implementation
├── afterAddLiquidity() ──────► Default Implementation
├── beforeRemoveLiquidity() ──► Default Implementation
├── afterRemoveLiquidity() ───► Default Implementation
├── beforeSwap() ─────────────► ✅ OVERRIDDEN BY AEGIS
├── afterSwap() ──────────────► Default Implementation
├── beforeDonate() ───────────► Default Implementation
└── afterDonate() ────────────► Default Implementation

```

This pattern ensures that:

- Only critical logic is custom-implemented
- All other functions return correct default values
- The hook remains forward-compatible with V4 updates

**Sources:**[contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)

### Circuit Breaker Implementation

The `AegisHook.beforeSwap()` implementation follows this pattern:

```
function beforeSwap(...) {
    1. Check panicMode flag
    2. If true → revert PoolPaused()
    3. If false → return success selector
    4. Pool manager continues with swap
}

```

The simplicity of this pattern makes the circuit breaker mechanism auditable and gas-efficient.

**Sources:**[contracts/README.md34-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L34-L37)

---

## Foundry Remappings

The Foundry configuration maps the submodule paths to import-friendly aliases:

```
remappings = [
    '@uniswap/v4-core/=lib/v4-core/src/',
    '@uniswap/v4-periphery/=lib/v4-periphery/src/',
    '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
    ...
]
```

This allows contracts to import using clean paths:

```
import {IHooks} from "@uniswap/v4-core/interfaces/IHooks.sol";
import {BaseHook} from "@openzeppelin/contracts/hooks/BaseHook.sol";
```

**Sources:**[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)

---

## Version Compatibility

The Uniswap V4 ecosystem is under active development. Aegis pins specific commits in the Git submodules to ensure reproducible builds:

```
# Pin to specific commit hashes
[submodule "lib/uniswap-hooks"]
    path = lib/uniswap-hooks
    url = https://github.com/openzeppelin/uniswap-hooks
    # Commit hash pinned in .git/modules
```

To update dependencies:

```
cd lib/uniswap-hooks
git pull origin main
cd ../..
git add lib/uniswap-hooks
git commit -m "Update uniswap-hooks dependency"
```

**Sources:**[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)

---

## Testing with V4 Dependencies

The test suite uses the V4 dependencies to validate hook behavior:

```
forge test --match-contract AegisIntegrationTest
├── Deploys PoolManager (from v4-core)
├── Deploys AegisHook (inherits from uniswap-hooks)
├── Creates pool with PoolKey referencing hook
├── Executes swap through PoolManager
└── Validates beforeSwap() reverts during panic

```

This integration testing ensures compatibility with the actual V4 protocol implementation.

**Sources:**[contracts/README.md80-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L80-L94)

---

## Summary

The Uniswap V4 integration in Aegis relies on three complementary dependencies:

1. **uniswap-hooks (OpenZeppelin)** - Provides audited base implementations
2. **v4-core** - Defines the `IHooks` interface and pool manager
3. **v4-periphery** - Supplies testing and deployment utilities

The `AegisHook` leverages these dependencies to implement a minimal, auditable circuit breaker that integrates seamlessly with the Uniswap V4 hook system. The use of OpenZeppelin's base contracts reduces custom code and inherits security guarantees from a well-audited codebase.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/README.md1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L123)