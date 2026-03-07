# Dependencies and Submodules

## Purpose and Scope

This document explains the external dependencies managed through Git submodules in the Aegis project. It details each of the four core dependencies, their purpose, how they integrate with Aegis contracts, and the workflow for managing them.

For general project structure, see [Project Structure](Project-Structure.md). For build configuration that uses these dependencies, see [Build System](Build-System.md).

---

## Submodule Overview

Aegis depends on four external repositories managed as Git submodules in the `lib/` directory:

| Submodule | Repository | Purpose | Used By |
| :--- | :--- | :--- | :--- |
| **forge-std** | `foundry-rs/forge-std` | Testing utilities and standard library | All test contracts |
| **uniswap-hooks** | `openzeppelin/uniswap-hooks` | Uniswap v4 hook framework | `AegisHook.sol` |
| **hookmate** | `akshatmittal/hookmate` | Additional hook utilities | `AegisHook.sol` |
| **system-smart-contracts** | `Reactive-Network/system-smart-contracts` | Reactive Network core contracts | `AegisSentinel.sol` |

---

## Submodule Configuration

### Git Submodules File

The `.gitmodules` file in the root directory defines these dependencies:

```ini
[submodule "lib/forge-std"]
    path = lib/forge-std
    url = https://github.com/foundry-rs/forge-std

[submodule "lib/uniswap-hooks"]
    path = lib/uniswap-hooks
    url = https://github.com/openzeppelin/uniswap-hooks

[submodule "lib/hookmate"]
    path = lib/hookmate
    url = https://github.com/akshatmittal/hookmate

[submodule "lib/system-smart-contracts"]
    path = lib/system-smart-contracts
    url = https://github.com/Reactive-Network/system-smart-contracts
```

### Dependency Usage

#### forge-std: Foundry Standard Library
Provides `Test.sol`, `Vm.sol` (cheatcodes), and `console.sol`.
*   **Location**: `lib/forge-std/`
*   **Usage**: Imported by all test files in `contracts/test/`.
    ```solidity
    import {Test, console2} from "forge-std/Test.sol";
    ```

#### uniswap-hooks: Uniswap v4 Framework
Provides `IHooks`, `PoolManager`, and `Hooks` library.
*   **Location**: `lib/uniswap-hooks/`
*   **Usage**: Used by `AegisHook.sol` to implement the `IHooks` interface.
    ```solidity
    import {IHooks} from "v4-core/interfaces/IHooks.sol";
    import {PoolManager} from "v4-core/PoolManager.sol";
    ```

#### hookmate: Hook Utilities
Provides helpers for hook flag calculation (`HookFlags`) and pool keys (`PoolKeyLib`).
*   **Location**: `lib/hookmate/`
*   **Usage**: Used by `AegisHook.sol` for salt mining and key management.
    ```solidity
    import {HookFlags} from "hookmate/HookFlags.sol";
    ```

#### system-smart-contracts: Reactive Network Core
Provides `AbstractReactive` base contract and `IReactive` interface.
*   **Location**: `lib/system-smart-contracts/`
*   **Usage**: Extended by `AegisSentinel.sol` to handle cross-chain events.
    ```solidity
    import {AbstractReactive} from "reactive-lib/AbstractReactive.sol";
    ```

---

## Version Pinning

To ensure reproducible builds, specific commits are pinned in `contracts/foundry.lock`.

| Library | Status | Locked Commit |
| :--- | :--- | :--- |
| `forge-std` | Pinned | `8bbcf6e3...` |
| `hookmate` | Pinned | `33408fbc...` |
| `uniswap-hooks` | Pinned | `e59fe72c...` |
| `system-smart-contracts` | Unpinned | Tracks HEAD (usually) |

**Note**: `system-smart-contracts` is often unpinned to track the latest Reactive Network updates, but for production, a specific commit should be targeted.

---

## Managing Submodules

### Initial Setup

When cloning the repository, initialize submodules:

```bash
git clone --recursive https://github.com/HACK3R-CRYPTO/Aegis.git
# OR
git submodule update --init --recursive
```

### Updating Submodules

To update a specific submodule to the latest version:

```bash
cd lib/forge-std
git checkout main
git pull
cd ../..
git add lib/forge-std
git commit -m "Update forge-std"
```

### Troubleshooting

**Problem**: Build fails with "file not found" for imports.
**Solution**: Run `git submodule update --init --recursive`.

**Problem**: Detached HEAD state.
**Solution**: This is normal for pinned submodules. If you need to make changes, checkout a branch first.

---

## Import Remappings

Foundry maps short import paths to physical directory locations via `contracts/foundry.toml`:

| Prefix | Maps to |
| :--- | :--- |
| `forge-std/` | `lib/forge-std/src/` |
| `v4-core/` | `lib/uniswap-hooks/lib/v4-core/src/` |
| `v4-periphery/` | `lib/uniswap-hooks/lib/v4-periphery/src/` |
| `hookmate/` | `lib/hookmate/src/` |
| `reactive-lib/` | `lib/system-smart-contracts/lib/reactive-lib/src/` |
| `system-smart-contracts/` | `lib/system-smart-contracts/src/` |

This allows succinct imports like `import "v4-core/PoolManager.sol"` instead of long relative paths.