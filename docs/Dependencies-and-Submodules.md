# Dependencies and SubmodulesLink copied!
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules)
- [contracts/foundry.lock](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock)

## Purpose and ScopeLink copied!

This document explains the external dependencies managed through Git submodules in the Aegis project. It details each of the four core dependencies, their purpose, how they integrate with Aegis contracts, and the workflow for managing them. For general project structure, see [Project Structure](#6.1). For build configuration that uses these dependencies, see [Build System](#6.4).

The Aegis project uses Git submodules to manage all external smart contract dependencies, ensuring reproducible builds and version control. All submodules are located in the `lib/` directory within the contracts workspace.

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)

---

## Submodule OverviewLink copied!

Aegis depends on four external repositories managed as Git submodules. Each submodule provides specific functionality required by the core contracts:

SubmoduleRepositoryPurposeUsed By`forge-std`foundry-rs/forge-stdTesting utilities and standard libraryAll test contracts`uniswap-hooks`openzeppelin/uniswap-hooksUniswap v4 hook frameworkAegisHook`hookmate`akshatmittal/hookmateAdditional hook utilitiesAegisHook`system-smart-contracts`Reactive-Network/system-smart-contractsReactive Network core contractsAegisSentinel

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)

---

## Submodule ConfigurationLink copied!

### Git Submodules FileLink copied!

The `.gitmodules` file defines all external dependencies. Each entry specifies the local path where the submodule is checked out and the remote URL from which it is cloned.

```
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

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)

### Dependency GraphLink copied!

#mermaid-2qpbeiuf44o{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-2qpbeiuf44o .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-2qpbeiuf44o .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-2qpbeiuf44o .error-icon{fill:#a44141;}#mermaid-2qpbeiuf44o .error-text{fill:#ddd;stroke:#ddd;}#mermaid-2qpbeiuf44o .edge-thickness-normal{stroke-width:1px;}#mermaid-2qpbeiuf44o .edge-thickness-thick{stroke-width:3.5px;}#mermaid-2qpbeiuf44o .edge-pattern-solid{stroke-dasharray:0;}#mermaid-2qpbeiuf44o .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-2qpbeiuf44o .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-2qpbeiuf44o .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-2qpbeiuf44o .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-2qpbeiuf44o .marker.cross{stroke:lightgrey;}#mermaid-2qpbeiuf44o svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-2qpbeiuf44o p{margin:0;}#mermaid-2qpbeiuf44o .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-2qpbeiuf44o .cluster-label text{fill:#F9FFFE;}#mermaid-2qpbeiuf44o .cluster-label span{color:#F9FFFE;}#mermaid-2qpbeiuf44o .cluster-label span p{background-color:transparent;}#mermaid-2qpbeiuf44o .label text,#mermaid-2qpbeiuf44o span{fill:#ccc;color:#ccc;}#mermaid-2qpbeiuf44o .node rect,#mermaid-2qpbeiuf44o .node circle,#mermaid-2qpbeiuf44o .node ellipse,#mermaid-2qpbeiuf44o .node polygon,#mermaid-2qpbeiuf44o .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-2qpbeiuf44o .rough-node .label text,#mermaid-2qpbeiuf44o .node .label text,#mermaid-2qpbeiuf44o .image-shape .label,#mermaid-2qpbeiuf44o .icon-shape .label{text-anchor:middle;}#mermaid-2qpbeiuf44o .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-2qpbeiuf44o .rough-node .label,#mermaid-2qpbeiuf44o .node .label,#mermaid-2qpbeiuf44o .image-shape .label,#mermaid-2qpbeiuf44o .icon-shape .label{text-align:center;}#mermaid-2qpbeiuf44o .node.clickable{cursor:pointer;}#mermaid-2qpbeiuf44o .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-2qpbeiuf44o .arrowheadPath{fill:lightgrey;}#mermaid-2qpbeiuf44o .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-2qpbeiuf44o .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-2qpbeiuf44o .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-2qpbeiuf44o .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-2qpbeiuf44o .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-2qpbeiuf44o .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-2qpbeiuf44o .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-2qpbeiuf44o .cluster text{fill:#F9FFFE;}#mermaid-2qpbeiuf44o .cluster span{color:#F9FFFE;}#mermaid-2qpbeiuf44o div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-2qpbeiuf44o .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-2qpbeiuf44o rect.text{fill:none;stroke-width:0;}#mermaid-2qpbeiuf44o .icon-shape,#mermaid-2qpbeiuf44o .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-2qpbeiuf44o .icon-shape p,#mermaid-2qpbeiuf44o .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-2qpbeiuf44o .icon-shape rect,#mermaid-2qpbeiuf44o .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-2qpbeiuf44o .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-2qpbeiuf44o .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-2qpbeiuf44o :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Key Source Files

Nested Submodules

contracts/lib/ Directory

Git Configuration

contains

contains nested

contains nested

contains

defines paths

pins versions

.gitmodules Submodule URLs

foundry.lock Commit Hashes

lib/forge-std/ commit: 8bbcf6e3f8f

lib/uniswap-hooks/ commit: e59fe72c110

lib/hookmate/ commit: 33408fbc15e

lib/system-smart-contracts/ unpinned

lib/uniswap-hooks/lib/v4-core/ IHooks.sol PoolManager.sol

lib/uniswap-hooks/lib/v4-periphery/ Pool utilities

lib/forge-std/src/Test.sol lib/forge-std/src/Vm.sol lib/forge-std/src/console.sol

lib/system-smart-contracts/src/ AbstractReactive.sol IReactive.sol

Diagram: Dependency File System Structure

This diagram shows how `.gitmodules` and `foundry.lock` configure the actual file system layout in the `lib/` directory, including nested dependencies and key source files.

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

## Contract-to-Dependency MappingLink copied!

#mermaid-jzt2wrjumc{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-jzt2wrjumc .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-jzt2wrjumc .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-jzt2wrjumc .error-icon{fill:#a44141;}#mermaid-jzt2wrjumc .error-text{fill:#ddd;stroke:#ddd;}#mermaid-jzt2wrjumc .edge-thickness-normal{stroke-width:1px;}#mermaid-jzt2wrjumc .edge-thickness-thick{stroke-width:3.5px;}#mermaid-jzt2wrjumc .edge-pattern-solid{stroke-dasharray:0;}#mermaid-jzt2wrjumc .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-jzt2wrjumc .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-jzt2wrjumc .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-jzt2wrjumc .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-jzt2wrjumc .marker.cross{stroke:lightgrey;}#mermaid-jzt2wrjumc svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-jzt2wrjumc p{margin:0;}#mermaid-jzt2wrjumc .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-jzt2wrjumc .cluster-label text{fill:#F9FFFE;}#mermaid-jzt2wrjumc .cluster-label span{color:#F9FFFE;}#mermaid-jzt2wrjumc .cluster-label span p{background-color:transparent;}#mermaid-jzt2wrjumc .label text,#mermaid-jzt2wrjumc span{fill:#ccc;color:#ccc;}#mermaid-jzt2wrjumc .node rect,#mermaid-jzt2wrjumc .node circle,#mermaid-jzt2wrjumc .node ellipse,#mermaid-jzt2wrjumc .node polygon,#mermaid-jzt2wrjumc .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-jzt2wrjumc .rough-node .label text,#mermaid-jzt2wrjumc .node .label text,#mermaid-jzt2wrjumc .image-shape .label,#mermaid-jzt2wrjumc .icon-shape .label{text-anchor:middle;}#mermaid-jzt2wrjumc .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-jzt2wrjumc .rough-node .label,#mermaid-jzt2wrjumc .node .label,#mermaid-jzt2wrjumc .image-shape .label,#mermaid-jzt2wrjumc .icon-shape .label{text-align:center;}#mermaid-jzt2wrjumc .node.clickable{cursor:pointer;}#mermaid-jzt2wrjumc .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-jzt2wrjumc .arrowheadPath{fill:lightgrey;}#mermaid-jzt2wrjumc .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-jzt2wrjumc .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-jzt2wrjumc .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-jzt2wrjumc .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-jzt2wrjumc .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-jzt2wrjumc .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-jzt2wrjumc .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-jzt2wrjumc .cluster text{fill:#F9FFFE;}#mermaid-jzt2wrjumc .cluster span{color:#F9FFFE;}#mermaid-jzt2wrjumc div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-jzt2wrjumc .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-jzt2wrjumc rect.text{fill:none;stroke-width:0;}#mermaid-jzt2wrjumc .icon-shape,#mermaid-jzt2wrjumc .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-jzt2wrjumc .icon-shape p,#mermaid-jzt2wrjumc .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-jzt2wrjumc .icon-shape rect,#mermaid-jzt2wrjumc .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-jzt2wrjumc .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-jzt2wrjumc .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-jzt2wrjumc :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

lib/system-smart-contracts/src/

lib/uniswap-hooks/

lib/forge-std/src/

contracts/test/

contracts/src/

import IHooks

extends AbstractReactive

implements IReactive

import Test

import Vm

import console

tested by

tested by

tested by

tested by

import utilities

lib/hookmate/src/

Hook utilities

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

GuardianRegistry.sol

*.t.sol test files

Test.sol

Vm.sol

console.sol

lib/v4-core/src/ IHooks.sol PoolManager.sol

lib/v4-periphery/src/

AbstractReactive.sol

IReactive.sol

Diagram: Source File Dependencies

This diagram maps Aegis contracts in `contracts/src/` to specific dependency source files within the `lib/` directory structure.

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

---

## forge-std: Foundry Standard LibraryLink copied!

### PurposeLink copied!

The `forge-std` submodule provides the Foundry standard library, which includes testing utilities, console logging, and helper functions for writing Solidity tests. It is maintained by the Foundry team and is the standard testing framework for all Foundry projects.

### ConfigurationLink copied!

- Repository:[https://github.com/foundry-rs/forge-std](https://github.com/foundry-rs/forge-std)
- Local Path:`lib/forge-std`
- Pinned Commit:`8bbcf6e3f8f62f419e5429a0bd89331c85c37824`

### File StructureLink copied!

```
lib/forge-std/
├── src/
│   ├── Test.sol              # Base test contract
│   ├── Vm.sol                # Cheatcode interface
│   ├── console.sol           # Console logging
│   ├── console2.sol          # Enhanced console
│   ├── StdAssertions.sol     # Assertion helpers
│   ├── StdCheats.sol         # Common test patterns
│   ├── StdStorage.sol        # Storage manipulation
│   └── StdError.sol          # Error code constants
└── lib/
    └── ds-test/              # Legacy test utilities
```

### Usage in AegisLink copied!

All test files in `contracts/test/` import and extend `Test.sol` from this dependency:

```
import "forge-std/Test.sol";
 
contract MyTest is Test {
    // Inherits assertion methods, vm cheatcodes, and utilities
}
```

For detailed information about forge-std utilities, see [Forge Standard Library](#7.2).

Sources:[contracts/.gitmodules#1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L3)[contracts/foundry.lock#2-4](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L2-L4)

---

## uniswap-hooks: Uniswap v4 Hook FrameworkLink copied!

### PurposeLink copied!

The `uniswap-hooks` submodule contains OpenZeppelin's Uniswap v4 hook framework, which provides the interfaces and base contracts needed to implement custom hooks for Uniswap v4 pools. This includes both the core v4 protocol contracts and peripheral utilities.

### ConfigurationLink copied!

- Repository:[https://github.com/openzeppelin/uniswap-hooks](https://github.com/openzeppelin/uniswap-hooks)
- Local Path:`lib/uniswap-hooks`
- Pinned Commit:`e59fe72c110c3862eec9b332530dce49ca506bbb`

### File Structure with Nested DependenciesLink copied!

```
lib/uniswap-hooks/
├── lib/
│   ├── v4-core/                    # Nested submodule
│   │   └── src/
│   │       ├── interfaces/
│   │       │   ├── IHooks.sol      # Hook interface
│   │       │   └── IPoolManager.sol
│   │       ├── PoolManager.sol     # Core pool manager
│   │       ├── types/
│   │       │   └── Hooks.sol       # Hook flag definitions
│   │       └── libraries/
│   │           └── Pool.sol
│   └── v4-periphery/               # Nested submodule
│       └── src/
│           ├── PoolInitializer.sol
│           └── base/
│               └── PoolKey.sol
```

### Usage in AegisLink copied!

`AegisHook.sol` in `contracts/src/` imports from the nested v4-core dependency:

```
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolManager} from "v4-core/PoolManager.sol";
import {Hooks} from "v4-core/types/Hooks.sol";
```

The hook implements the `IHooks` interface and uses `beforeSwap` lifecycle callback to enforce circuit breaker logic. The hook's CREATE2 deployment address must satisfy flag requirements defined in `Hooks.sol`.

Sources:[contracts/.gitmodules#4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L4-L6)[contracts/foundry.lock#8-10](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L8-L10)

---

## hookmate: Hook UtilitiesLink copied!

### PurposeLink copied!

The `hookmate` submodule provides additional utilities and helpers for working with Uniswap v4 hooks. Developed by Akshat Mittal, it offers convenience functions and patterns for common hook implementations.

### ConfigurationLink copied!

- Repository:[https://github.com/akshatmittal/hookmate](https://github.com/akshatmittal/hookmate)
- Local Path:`lib/hookmate`
- Pinned Commit:`33408fbc15e083eb0bc4205fa37cb6ba0a926f44`

### File StructureLink copied!

```
lib/hookmate/
└── src/
    ├── HookBase.sol           # Base hook implementation
    ├── HookFlags.sol          # Flag computation utilities
    ├── PoolKeyLib.sol         # Pool key helpers
    └── test/
        └── HookTest.sol       # Testing utilities
```

### FeaturesLink copied!

Hookmate provides utilities that simplify hook development:

- HookFlags.sol - Helper functions for hook flag computation and validation
- PoolKeyLib.sol - Utilities for pool key management and hashing
- HookBase.sol - Common patterns for hook state management
- HookTest.sol - Testing utilities specific to hooks

### Usage in AegisLink copied!

`AegisHook.sol` leverages hookmate utilities to reduce boilerplate:

```
import {HookFlags} from "hookmate/HookFlags.sol";
import {PoolKeyLib} from "hookmate/PoolKeyLib.sol";
```

These utilities simplify flag validation and pool key operations in the hook implementation.

Sources:[contracts/.gitmodules#7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L7-L9)[contracts/foundry.lock#5-7](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L5-L7)

---

## system-smart-contracts: Reactive Network CoreLink copied!

### PurposeLink copied!

The `system-smart-contracts` submodule contains the core smart contracts for the Reactive Network. It provides the abstract base contracts and interfaces needed to build reactive contracts that listen to events from other chains.

### ConfigurationLink copied!

- Repository:[https://github.com/Reactive-Network/system-smart-contracts](https://github.com/Reactive-Network/system-smart-contracts)
- Local Path:`lib/system-smart-contracts`
- Pinned Commit: Not specified in foundry.lock (follows default branch)

### File StructureLink copied!

```
lib/system-smart-contracts/
└── src/
    ├── AbstractReactive.sol      # Base reactive contract
    ├── IReactive.sol             # Reactive interface
    ├── ISystemContract.sol       # System contract interface
    ├── ISubscriptionService.sol  # Event subscription
    └── libraries/
        └── Callback.sol          # Cross-chain callback utilities
```

### Key ComponentsLink copied!

The reactive SDK provides:

- AbstractReactive.sol - Base contract that reactive contracts extend
- IReactive.sol - Interface defining `react()` callback function
- ISubscriptionService.sol - Event subscription primitives
- ISystemContract.sol - System-level contract interfaces for cross-chain messaging
- Callback.sol - Utilities for encoding/decoding cross-chain callback data

### Usage in AegisLink copied!

`AegisSentinel.sol` in `contracts/src/` extends the reactive base:

```
import {AbstractReactive} from "reactive-lib/AbstractReactive.sol";
import {IReactive} from "reactive-lib/IReactive.sol";
 
contract AegisSentinel is AbstractReactive {
    // Implements react() callback
    // Subscribes to PriceUpdate events from L1
    // Triggers cross-chain setPanicMode() calls to L2
}
```

The Sentinel subscribes to `PriceUpdate` events emitted by `MockOracle` on Ethereum Sepolia and triggers cross-chain actions on Unichain via the Reactive Network's callback system.

Sources:[contracts/.gitmodules#10-12](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L10-L12)

---

## Contract-to-Dependency MappingLink copied!

#mermaid-02l29z41uys{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-02l29z41uys .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-02l29z41uys .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-02l29z41uys .error-icon{fill:#a44141;}#mermaid-02l29z41uys .error-text{fill:#ddd;stroke:#ddd;}#mermaid-02l29z41uys .edge-thickness-normal{stroke-width:1px;}#mermaid-02l29z41uys .edge-thickness-thick{stroke-width:3.5px;}#mermaid-02l29z41uys .edge-pattern-solid{stroke-dasharray:0;}#mermaid-02l29z41uys .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-02l29z41uys .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-02l29z41uys .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-02l29z41uys .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-02l29z41uys .marker.cross{stroke:lightgrey;}#mermaid-02l29z41uys svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-02l29z41uys p{margin:0;}#mermaid-02l29z41uys .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-02l29z41uys .cluster-label text{fill:#F9FFFE;}#mermaid-02l29z41uys .cluster-label span{color:#F9FFFE;}#mermaid-02l29z41uys .cluster-label span p{background-color:transparent;}#mermaid-02l29z41uys .label text,#mermaid-02l29z41uys span{fill:#ccc;color:#ccc;}#mermaid-02l29z41uys .node rect,#mermaid-02l29z41uys .node circle,#mermaid-02l29z41uys .node ellipse,#mermaid-02l29z41uys .node polygon,#mermaid-02l29z41uys .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-02l29z41uys .rough-node .label text,#mermaid-02l29z41uys .node .label text,#mermaid-02l29z41uys .image-shape .label,#mermaid-02l29z41uys .icon-shape .label{text-anchor:middle;}#mermaid-02l29z41uys .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-02l29z41uys .rough-node .label,#mermaid-02l29z41uys .node .label,#mermaid-02l29z41uys .image-shape .label,#mermaid-02l29z41uys .icon-shape .label{text-align:center;}#mermaid-02l29z41uys .node.clickable{cursor:pointer;}#mermaid-02l29z41uys .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-02l29z41uys .arrowheadPath{fill:lightgrey;}#mermaid-02l29z41uys .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-02l29z41uys .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-02l29z41uys .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-02l29z41uys .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-02l29z41uys .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-02l29z41uys .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-02l29z41uys .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-02l29z41uys .cluster text{fill:#F9FFFE;}#mermaid-02l29z41uys .cluster span{color:#F9FFFE;}#mermaid-02l29z41uys div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-02l29z41uys .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-02l29z41uys rect.text{fill:none;stroke-width:0;}#mermaid-02l29z41uys .icon-shape,#mermaid-02l29z41uys .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-02l29z41uys .icon-shape p,#mermaid-02l29z41uys .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-02l29z41uys .icon-shape rect,#mermaid-02l29z41uys .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-02l29z41uys .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-02l29z41uys .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-02l29z41uys :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Key Imports

lib/ Dependencies

Aegis Contracts

imports

imports

uses

extends

imports

extends

imports

extends

uses

tested with

provides

provides

provides

provides

provides

AegisHook.sol contracts/src/AegisHook.sol

AegisSentinel.sol contracts/src/AegisSentinel.sol

MockOracle.sol contracts/src/MockOracle.sol

Test Contracts contracts/test/*.t.sol

forge-std lib/forge-std/

uniswap-hooks lib/uniswap-hooks/

hookmate lib/hookmate/

system-smart-contracts lib/system-smart-contracts/

IHooks interface

BaseHook

AbstractReactive

Test

Vm cheatcodes

Diagram: Contract Usage of Dependencies

This diagram maps which Aegis contracts depend on which submodules and what specific interfaces or base contracts they import.

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)

---

## Version Pinning with foundry.lockLink copied!

### Lock File FormatLink copied!

The `foundry.lock` file pins specific Git commit hashes for each submodule, ensuring reproducible builds across different development environments. This file is automatically generated and updated by Foundry when dependencies are installed or updated.

```
{
  "lib/forge-std": {
    "rev": "8bbcf6e3f8f62f419e5429a0bd89331c85c37824"
  },
  "lib/hookmate": {
    "rev": "33408fbc15e083eb0bc4205fa37cb6ba0a926f44"
  },
  "lib/uniswap-hooks": {
    "rev": "e59fe72c110c3862eec9b332530dce49ca506bbb"
  }
}
```

### Pinned VersionsLink copied!

SubmodulePathCommit HashLock Statusforge-stdlib/forge-std8bbcf6e3f8f62f419e5429a0bd89331c85c37824Pinnedhookmatelib/hookmate33408fbc15e083eb0bc4205fa37cb6ba0a926f44Pinneduniswap-hookslib/uniswap-hookse59fe72c110c3862eec9b332530dce49ca506bbbPinnedsystem-smart-contractslib/system-smart-contracts(not in foundry.lock)Unpinned - tracks HEAD

Note on Unpinned Dependencies: The `system-smart-contracts` submodule is not listed in `foundry.lock`, meaning it tracks the default branch of the repository. This allows Aegis to automatically receive updates from the Reactive Network SDK, but may introduce breaking changes. Consider pinning this dependency in production deployments.

Sources:[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)[contracts/.gitmodules#10-12](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L10-L12)

---

## Managing SubmodulesLink copied!

### Initial SetupLink copied!

When cloning the Aegis repository, submodules must be initialized and updated:

```
# Clone with submodules
git clone --recursive https://github.com/HACK3R-CRYPTO/Aegis
 
# Or initialize after cloning
git submodule init
git submodule update
```

### Updating SubmodulesLink copied!

To update a submodule to a newer version:

```
# Update specific submodule
cd lib/forge-std
git checkout <new-commit-or-tag>
cd ../..
git add lib/forge-std
 
# Update all submodules to latest
git submodule update --remote
 
# Foundry will automatically update foundry.lock
forge build
```

### Verifying Submodule StatusLink copied!

Check current submodule status:

```
# List all submodules and their commits
git submodule status
 
# Expected output format:
# 8bbcf6e3f8f62f419e5429a0bd89331c85c37824 lib/forge-std (v1.8.1)
# 33408fbc15e083eb0bc4205fa37cb6ba0a926f44 lib/hookmate (heads/main)
# e59fe72c110c3862eec9b332530dce49ca506bbb lib/uniswap-hooks (heads/main)
```

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

---

## Import RemappingsLink copied!

Foundry uses import remappings to simplify import paths in Solidity contracts. These remappings are configured in `foundry.toml` and map submodule paths to shorter aliases. For details on remapping configuration, see [Foundry Configuration Reference](#7.1).

### Remapping ConfigurationLink copied!

Aegis dependencies use the following import path remappings:

Import PrefixMaps ToSubmodule Source`forge-std/``lib/forge-std/src/`forge-std`v4-core/``lib/uniswap-hooks/lib/v4-core/src/`uniswap-hooks (nested)`v4-periphery/``lib/uniswap-hooks/lib/v4-periphery/src/`uniswap-hooks (nested)`hookmate/``lib/hookmate/src/`hookmate`reactive-lib/``lib/system-smart-contracts/src/`system-smart-contracts

### Import Resolution ExampleLink copied!

#mermaid-rfbn4xrxn1p{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-rfbn4xrxn1p .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-rfbn4xrxn1p .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-rfbn4xrxn1p .error-icon{fill:#a44141;}#mermaid-rfbn4xrxn1p .error-text{fill:#ddd;stroke:#ddd;}#mermaid-rfbn4xrxn1p .edge-thickness-normal{stroke-width:1px;}#mermaid-rfbn4xrxn1p .edge-thickness-thick{stroke-width:3.5px;}#mermaid-rfbn4xrxn1p .edge-pattern-solid{stroke-dasharray:0;}#mermaid-rfbn4xrxn1p .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-rfbn4xrxn1p .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-rfbn4xrxn1p .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-rfbn4xrxn1p .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-rfbn4xrxn1p .marker.cross{stroke:lightgrey;}#mermaid-rfbn4xrxn1p svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-rfbn4xrxn1p p{margin:0;}#mermaid-rfbn4xrxn1p .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-rfbn4xrxn1p .cluster-label text{fill:#F9FFFE;}#mermaid-rfbn4xrxn1p .cluster-label span{color:#F9FFFE;}#mermaid-rfbn4xrxn1p .cluster-label span p{background-color:transparent;}#mermaid-rfbn4xrxn1p .label text,#mermaid-rfbn4xrxn1p span{fill:#ccc;color:#ccc;}#mermaid-rfbn4xrxn1p .node rect,#mermaid-rfbn4xrxn1p .node circle,#mermaid-rfbn4xrxn1p .node ellipse,#mermaid-rfbn4xrxn1p .node polygon,#mermaid-rfbn4xrxn1p .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-rfbn4xrxn1p .rough-node .label text,#mermaid-rfbn4xrxn1p .node .label text,#mermaid-rfbn4xrxn1p .image-shape .label,#mermaid-rfbn4xrxn1p .icon-shape .label{text-anchor:middle;}#mermaid-rfbn4xrxn1p .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-rfbn4xrxn1p .rough-node .label,#mermaid-rfbn4xrxn1p .node .label,#mermaid-rfbn4xrxn1p .image-shape .label,#mermaid-rfbn4xrxn1p .icon-shape .label{text-align:center;}#mermaid-rfbn4xrxn1p .node.clickable{cursor:pointer;}#mermaid-rfbn4xrxn1p .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-rfbn4xrxn1p .arrowheadPath{fill:lightgrey;}#mermaid-rfbn4xrxn1p .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-rfbn4xrxn1p .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-rfbn4xrxn1p .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-rfbn4xrxn1p .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-rfbn4xrxn1p .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-rfbn4xrxn1p .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-rfbn4xrxn1p .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-rfbn4xrxn1p .cluster text{fill:#F9FFFE;}#mermaid-rfbn4xrxn1p .cluster span{color:#F9FFFE;}#mermaid-rfbn4xrxn1p div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-rfbn4xrxn1p .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-rfbn4xrxn1p rect.text{fill:none;stroke-width:0;}#mermaid-rfbn4xrxn1p .icon-shape,#mermaid-rfbn4xrxn1p .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-rfbn4xrxn1p .icon-shape p,#mermaid-rfbn4xrxn1p .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-rfbn4xrxn1p .icon-shape rect,#mermaid-rfbn4xrxn1p .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-rfbn4xrxn1p .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-rfbn4xrxn1p .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-rfbn4xrxn1p :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Resolved File Paths

foundry.toml remappings

contracts/src/AegisHook.sol

applies

applies

applies

resolves to

resolves to

resolves to

import forge-std/Test.sol

import v4-core/interfaces/IHooks.sol

import hookmate/HookFlags.sol

forge-std/ → lib/forge-std/src/

v4-core/ → lib/uniswap-hooks/lib/v4-core/src/

hookmate/ → lib/hookmate/src/

lib/forge-std/src/Test.sol

lib/uniswap-hooks/lib/v4-core/src/interfaces/IHooks.sol

lib/hookmate/src/HookFlags.sol

Diagram: Import Path Resolution

This diagram shows how import statements in contract source files are resolved to actual file paths through Foundry's remapping system.

### Usage in ContractsLink copied!

These remappings enable clean import statements in Aegis contracts:

```
// In contracts/src/AegisHook.sol
import "forge-std/Test.sol";
import "v4-core/interfaces/IHooks.sol";
import "hookmate/HookFlags.sol";
 
// In contracts/src/AegisSentinel.sol
import "reactive-lib/AbstractReactive.sol";
import "reactive-lib/IReactive.sol";
```

The Solidity compiler automatically resolves these short import paths to the actual file locations within the `lib/` directory structure using the configured remappings.

Sources:[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)

---

## Dependency Update StrategyLink copied!

### Security ConsiderationsLink copied!

When updating dependencies:

1. Review Changes - Check the commit history and release notes for breaking changes
2. Test Thoroughly - Run the full test suite after updating: `forge test -vvv`
3. Update Lock File - Commit the updated `foundry.lock` to ensure team consistency
4. Document Breaking Changes - Note any API changes that affect Aegis contracts

### Recommended Update FrequencyLink copied!

- forge-std - Update quarterly or when new testing features are needed
- uniswap-hooks - Update conservatively; v4 is still evolving
- hookmate - Update as needed for new utilities
- system-smart-contracts - Monitor Reactive Network releases closely

Sources:[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

---

## TroubleshootingLink copied!

### Submodule Not InitializedLink copied!

Symptom: Build fails with "file not found" errors for imports

Solution:

```
git submodule update --init --recursive
```

### Submodule Detached HEADLink copied!

Symptom: Git shows submodule is in detached HEAD state

Solution: This is normal for submodules pinned to specific commits. To work on the submodule:

```
cd lib/forge-std
git checkout main
# Make changes, commit, then:
cd ../..
git add lib/forge-std
```

### Lock File ConflictsLink copied!

Symptom: Merge conflicts in `foundry.lock`

Solution:

```
# Accept incoming or current, then rebuild
forge build
# This regenerates the lock file correctly
```

Sources:[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)[contracts/.gitmodules#1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules#L1-L13)