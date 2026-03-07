# Build SystemLink copied!
Relevant source files
- [contracts/.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml)

## Purpose and ScopeLink copied!

This document explains the Foundry-based build system used by Aegis for compiling, testing, and deploying smart contracts. It covers the configuration in `foundry.toml`, compiler settings, optimization flags, and the core `forge` commands used in the development workflow.

For information about external dependencies and remappings, see [Dependencies](#5.3). For deployment scripts and multi-chain orchestration, see [Deployment Process](#4.1). For test execution and CI workflows, see [Testing](#5.4).

---

## Foundry Toolchain OverviewLink copied!

Aegis uses Foundry as its exclusive smart contract development framework. Foundry provides:

- forge: Compilation and testing engine
- cast: Command-line interaction with deployed contracts
- anvil: Local Ethereum node for development (not used in this project)

The build system is configured via `foundry.toml` and manages the entire contract lifecycle from source to deployed bytecode.

Sources: [contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)

---

## Configuration ArchitectureLink copied!

### Profile SettingsLink copied!

#mermaid-47ewv7y7izi{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-47ewv7y7izi .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-47ewv7y7izi .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-47ewv7y7izi .error-icon{fill:#a44141;}#mermaid-47ewv7y7izi .error-text{fill:#ddd;stroke:#ddd;}#mermaid-47ewv7y7izi .edge-thickness-normal{stroke-width:1px;}#mermaid-47ewv7y7izi .edge-thickness-thick{stroke-width:3.5px;}#mermaid-47ewv7y7izi .edge-pattern-solid{stroke-dasharray:0;}#mermaid-47ewv7y7izi .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-47ewv7y7izi .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-47ewv7y7izi .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-47ewv7y7izi .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-47ewv7y7izi .marker.cross{stroke:lightgrey;}#mermaid-47ewv7y7izi svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-47ewv7y7izi p{margin:0;}#mermaid-47ewv7y7izi .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-47ewv7y7izi .cluster-label text{fill:#F9FFFE;}#mermaid-47ewv7y7izi .cluster-label span{color:#F9FFFE;}#mermaid-47ewv7y7izi .cluster-label span p{background-color:transparent;}#mermaid-47ewv7y7izi .label text,#mermaid-47ewv7y7izi span{fill:#ccc;color:#ccc;}#mermaid-47ewv7y7izi .node rect,#mermaid-47ewv7y7izi .node circle,#mermaid-47ewv7y7izi .node ellipse,#mermaid-47ewv7y7izi .node polygon,#mermaid-47ewv7y7izi .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-47ewv7y7izi .rough-node .label text,#mermaid-47ewv7y7izi .node .label text,#mermaid-47ewv7y7izi .image-shape .label,#mermaid-47ewv7y7izi .icon-shape .label{text-anchor:middle;}#mermaid-47ewv7y7izi .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-47ewv7y7izi .rough-node .label,#mermaid-47ewv7y7izi .node .label,#mermaid-47ewv7y7izi .image-shape .label,#mermaid-47ewv7y7izi .icon-shape .label{text-align:center;}#mermaid-47ewv7y7izi .node.clickable{cursor:pointer;}#mermaid-47ewv7y7izi .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-47ewv7y7izi .arrowheadPath{fill:lightgrey;}#mermaid-47ewv7y7izi .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-47ewv7y7izi .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-47ewv7y7izi .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-47ewv7y7izi .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-47ewv7y7izi .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-47ewv7y7izi .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-47ewv7y7izi .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-47ewv7y7izi .cluster text{fill:#F9FFFE;}#mermaid-47ewv7y7izi .cluster span{color:#F9FFFE;}#mermaid-47ewv7y7izi div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-47ewv7y7izi .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-47ewv7y7izi rect.text{fill:none;stroke-width:0;}#mermaid-47ewv7y7izi .icon-shape,#mermaid-47ewv7y7izi .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-47ewv7y7izi .icon-shape p,#mermaid-47ewv7y7izi .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-47ewv7y7izi .icon-shape rect,#mermaid-47ewv7y7izi .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-47ewv7y7izi .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-47ewv7y7izi .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-47ewv7y7izi :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Remappings

Directory Structure

Profile: default

foundry.toml

bytecode_hash = none Deterministic Builds

evm_version = cancun Latest EVM Features

solc_version = 0.8.26 Compiler Version

via_ir = true IR-Based Optimization

ffi = true Foreign Function Interface

src = src Contract Sources

out = out Build Artifacts

libs = [lib] Dependencies

reactive-lib/

system-smart-contracts/

v4-core/

v4-periphery/

Diagram: Foundry Configuration Hierarchy

The `[profile.default]` section defines core build parameters:

SettingValuePurpose`bytecode_hash``"none"`Excludes metadata hash from bytecode for deterministic builds across environments`evm_version``"cancun"`Enables Cancun hard fork opcodes (transient storage, etc.)`solc_version``"0.8.26"`Locks compiler version for reproducible builds`via_ir``true`Enables IR-based compilation for complex optimization (critical for Uniswap V4 hooks)`ffi``true`Allows calling external processes from tests (used by some dependencies)

Sources: [contracts/foundry.toml#1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L16)

---

## Compiler ConfigurationLink copied!

### IR-Based OptimizationLink copied!

The `via_ir = true` setting [contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16) is critical for Aegis contracts. This flag enables the Intermediate Representation (IR) compilation pipeline:

#mermaid-vzbo36o26lp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-vzbo36o26lp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-vzbo36o26lp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-vzbo36o26lp .error-icon{fill:#a44141;}#mermaid-vzbo36o26lp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-vzbo36o26lp .edge-thickness-normal{stroke-width:1px;}#mermaid-vzbo36o26lp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-vzbo36o26lp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-vzbo36o26lp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-vzbo36o26lp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-vzbo36o26lp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-vzbo36o26lp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-vzbo36o26lp .marker.cross{stroke:lightgrey;}#mermaid-vzbo36o26lp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-vzbo36o26lp p{margin:0;}#mermaid-vzbo36o26lp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-vzbo36o26lp .cluster-label text{fill:#F9FFFE;}#mermaid-vzbo36o26lp .cluster-label span{color:#F9FFFE;}#mermaid-vzbo36o26lp .cluster-label span p{background-color:transparent;}#mermaid-vzbo36o26lp .label text,#mermaid-vzbo36o26lp span{fill:#ccc;color:#ccc;}#mermaid-vzbo36o26lp .node rect,#mermaid-vzbo36o26lp .node circle,#mermaid-vzbo36o26lp .node ellipse,#mermaid-vzbo36o26lp .node polygon,#mermaid-vzbo36o26lp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-vzbo36o26lp .rough-node .label text,#mermaid-vzbo36o26lp .node .label text,#mermaid-vzbo36o26lp .image-shape .label,#mermaid-vzbo36o26lp .icon-shape .label{text-anchor:middle;}#mermaid-vzbo36o26lp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-vzbo36o26lp .rough-node .label,#mermaid-vzbo36o26lp .node .label,#mermaid-vzbo36o26lp .image-shape .label,#mermaid-vzbo36o26lp .icon-shape .label{text-align:center;}#mermaid-vzbo36o26lp .node.clickable{cursor:pointer;}#mermaid-vzbo36o26lp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-vzbo36o26lp .arrowheadPath{fill:lightgrey;}#mermaid-vzbo36o26lp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-vzbo36o26lp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-vzbo36o26lp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-vzbo36o26lp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-vzbo36o26lp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-vzbo36o26lp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-vzbo36o26lp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-vzbo36o26lp .cluster text{fill:#F9FFFE;}#mermaid-vzbo36o26lp .cluster span{color:#F9FFFE;}#mermaid-vzbo36o26lp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-vzbo36o26lp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-vzbo36o26lp rect.text{fill:none;stroke-width:0;}#mermaid-vzbo36o26lp .icon-shape,#mermaid-vzbo36o26lp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-vzbo36o26lp .icon-shape p,#mermaid-vzbo36o26lp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-vzbo36o26lp .icon-shape rect,#mermaid-vzbo36o26lp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-vzbo36o26lp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-vzbo36o26lp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-vzbo36o26lp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Solidity Source AegisHook.sol

Abstract Syntax Tree

Yul IR Intermediate Code

Optimization Passes Inlining, CSE, etc.

EVM Bytecode

Diagram: IR-Based Compilation Pipeline

Without `via_ir`, complex Uniswap V4 hook contracts exceed the stack depth limit. The IR pipeline performs aggressive inlining and common subexpression elimination (CSE) to reduce stack usage.

Trade-off: IR compilation is slower (~2-3x) but produces smaller, more optimized bytecode suitable for production deployment.

Sources: [contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16)

---

## EVM Version and OpcodesLink copied!

The `evm_version = "cancun"` setting [contracts/foundry.toml#3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L3-L3) enables opcodes introduced in the Ethereum Cancun upgrade:

- TSTORE / TLOAD: Transient storage (gas-efficient temporary state)
- BLOBHASH: EIP-4844 blob data access
- MCOPY: Memory copy optimization

While Aegis contracts do not directly use these opcodes, Uniswap V4 core contracts leverage transient storage for gas optimization in `PoolManager`. Setting `cancun` ensures compatibility with the V4 protocol.

Sources: [contracts/foundry.toml#3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L3-L3)

---

## Remappings and Dependency ResolutionLink copied!

#mermaid-x62tncjlyrp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-x62tncjlyrp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-x62tncjlyrp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-x62tncjlyrp .error-icon{fill:#a44141;}#mermaid-x62tncjlyrp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-x62tncjlyrp .edge-thickness-normal{stroke-width:1px;}#mermaid-x62tncjlyrp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-x62tncjlyrp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-x62tncjlyrp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-x62tncjlyrp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-x62tncjlyrp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-x62tncjlyrp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-x62tncjlyrp .marker.cross{stroke:lightgrey;}#mermaid-x62tncjlyrp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-x62tncjlyrp p{margin:0;}#mermaid-x62tncjlyrp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-x62tncjlyrp .cluster-label text{fill:#F9FFFE;}#mermaid-x62tncjlyrp .cluster-label span{color:#F9FFFE;}#mermaid-x62tncjlyrp .cluster-label span p{background-color:transparent;}#mermaid-x62tncjlyrp .label text,#mermaid-x62tncjlyrp span{fill:#ccc;color:#ccc;}#mermaid-x62tncjlyrp .node rect,#mermaid-x62tncjlyrp .node circle,#mermaid-x62tncjlyrp .node ellipse,#mermaid-x62tncjlyrp .node polygon,#mermaid-x62tncjlyrp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-x62tncjlyrp .rough-node .label text,#mermaid-x62tncjlyrp .node .label text,#mermaid-x62tncjlyrp .image-shape .label,#mermaid-x62tncjlyrp .icon-shape .label{text-anchor:middle;}#mermaid-x62tncjlyrp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-x62tncjlyrp .rough-node .label,#mermaid-x62tncjlyrp .node .label,#mermaid-x62tncjlyrp .image-shape .label,#mermaid-x62tncjlyrp .icon-shape .label{text-align:center;}#mermaid-x62tncjlyrp .node.clickable{cursor:pointer;}#mermaid-x62tncjlyrp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-x62tncjlyrp .arrowheadPath{fill:lightgrey;}#mermaid-x62tncjlyrp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-x62tncjlyrp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-x62tncjlyrp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-x62tncjlyrp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-x62tncjlyrp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-x62tncjlyrp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-x62tncjlyrp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-x62tncjlyrp .cluster text{fill:#F9FFFE;}#mermaid-x62tncjlyrp .cluster span{color:#F9FFFE;}#mermaid-x62tncjlyrp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-x62tncjlyrp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-x62tncjlyrp rect.text{fill:none;stroke-width:0;}#mermaid-x62tncjlyrp .icon-shape,#mermaid-x62tncjlyrp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-x62tncjlyrp .icon-shape p,#mermaid-x62tncjlyrp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-x62tncjlyrp .icon-shape rect,#mermaid-x62tncjlyrp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-x62tncjlyrp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-x62tncjlyrp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-x62tncjlyrp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Physical File Location

Remapping Resolution

Import Statement in Contract

import {AbstractReactive} from 'system-smart-contracts/AbstractReactive.sol';

system-smart-contracts/ → lib/system-smart-contracts/src/

reactive-lib/ → lib/system-smart-contracts/lib/reactive-lib/src/

v4-core/ → lib/uniswap-hooks/lib/v4-core/

v4-periphery/ → lib/uniswap-hooks/lib/v4-periphery/

lib/system-smart-contracts/src/AbstractReactive.sol

Diagram: Import Remapping Resolution

Remappings [contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14) map import prefixes to physical paths:

```
remappings = [
    "reactive-lib/=lib/system-smart-contracts/lib/reactive-lib/src/",
    "system-smart-contracts/=lib/system-smart-contracts/src/",
    "v4-core/=lib/uniswap-hooks/lib/v4-core/",
    "v4-periphery/=lib/uniswap-hooks/lib/v4-periphery/"
]
```

This allows contracts to use clean import paths like:

- `import "system-smart-contracts/AbstractReactive.sol"` instead of deeply nested relative paths
- `import "v4-core/interfaces/IPoolManager.sol"`

Remappings are essential for multi-level dependency trees where packages depend on other packages.

Sources: [contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14)

---

## RPC EndpointsLink copied!

```
[rpc_endpoints]
unichain_sepolia = "https://unichain-sepolia-rpc.publicnode.com"
reactive = "https://lasna-rpc.rnk.dev/"
sepolia = "https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX"
```

The `[rpc_endpoints]` section [contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22) defines network aliases used in deployment scripts:

AliasChainPurpose`sepolia`Ethereum Sepolia (Chain ID: 11155111)Deploy `MockOracle``reactive`Reactive Lasna (Chain ID: 5318007)Deploy `AegisSentinel``unichain_sepolia`Unichain Testnet (Chain ID: 1301)Deploy `AegisHook`

These aliases are referenced in forge scripts via `--rpc-url` flags:

```
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast
```

Sources: [contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)

---

## Linting ConfigurationLink copied!

```
[lint]
exclude_lints = ["screaming-snake-case-immutable", "screaming-snake-case-const"]
lint_on_build = false
```

Foundry includes a built-in linter (`forge fmt` and static analysis). The configuration [contracts/foundry.toml#24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L24-L26):

- Disables`screaming-snake-case-immutable` and `screaming-snake-case-const` rules
- Rationale: Aegis uses mixed-case naming for some immutables (e.g., `hookRegistry`) to match Uniswap V4 conventions
- `lint_on_build = false`: Manual linting only (prevents build slowdown)

Sources: [contracts/foundry.toml#24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L24-L26)

---

## Build CommandsLink copied!

### CompilationLink copied!

```
forge build
```

Compiles all contracts in `src/` and outputs artifacts to `out/`:

```
out/
├── AegisHook.sol/
│   ├── AegisHook.json        # ABI and bytecode
│   └── AegisHook.metadata.json
├── AegisSentinel.sol/
│   └── AegisSentinel.json
└── MockOracle.sol/
    └── MockOracle.json
```

Key flags:

- `--force`: Recompile all contracts (ignore cache)
- `--sizes`: Display contract bytecode sizes
- `--extra-output-files metadata`: Generate metadata.json files

Sources: [contracts/foundry.toml#7](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L7-L7)

---

### Clean BuildLink copied!

```
forge clean && forge build
```

Deletes `out/` and `cache/` directories before recompiling. Use this when:

- Switching compiler versions
- Debugging compilation artifacts
- Regenerating ABI files

Sources: [contracts/foundry.toml#7](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L7-L7)

---

### Bytecode Size CheckLink copied!

```
forge build --sizes
```

Example output:

```
| Contract         | Size (kB) | Margin (kB) |
|------------------|-----------|-------------|
| AegisHook        | 23.456    | 0.544       |
| AegisSentinel    | 18.234    | 5.766       |
| MockOracle       | 2.123     | 21.877      |
```

Maximum size: 24.576 kB (EIP-170 contract size limit)

The `via_ir = true` optimization is critical for keeping hook contracts under this limit.

Sources: [contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16)

---

## Dependency LockingLink copied!

### foundry.lock FileLink copied!

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

The `foundry.lock` file [contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11) pins Git submodule commits:

LibraryPurposeLocked Commit`forge-std`Testing framework and Foundry standard library`8bbcf6e3``hookmate`Utility library for Uniswap V4 hooks`33408fbc``uniswap-hooks`Uniswap V4 core and periphery contracts`e59fe72c`

Updating dependencies:

```
forge update lib/uniswap-hooks
forge update --force  # Update all
```

This regenerates `foundry.lock` with new commit hashes.

Sources: [contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

---

## VSCode IntegrationLink copied!

```
{
  "solidity.formatter": "forge"
}
```

The `.vscode/settings.json` file [contracts/.vscode/settings.json#1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.vscode/settings.json#L1-L3) configures VSCode's Solidity extension to use Foundry's formatter:

```
forge fmt
```

This ensures consistent formatting across the team. The formatter follows Solidity style guide conventions:

- 4-space indentation
- Opening braces on same line
- No trailing whitespace

Sources: [contracts/.vscode/settings.json#1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.vscode/settings.json#L1-L3)

---

## Build Process FlowLink copied!

#mermaid-qea90f4yrft{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-qea90f4yrft .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-qea90f4yrft .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-qea90f4yrft .error-icon{fill:#a44141;}#mermaid-qea90f4yrft .error-text{fill:#ddd;stroke:#ddd;}#mermaid-qea90f4yrft .edge-thickness-normal{stroke-width:1px;}#mermaid-qea90f4yrft .edge-thickness-thick{stroke-width:3.5px;}#mermaid-qea90f4yrft .edge-pattern-solid{stroke-dasharray:0;}#mermaid-qea90f4yrft .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-qea90f4yrft .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-qea90f4yrft .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-qea90f4yrft .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-qea90f4yrft .marker.cross{stroke:lightgrey;}#mermaid-qea90f4yrft svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-qea90f4yrft p{margin:0;}#mermaid-qea90f4yrft .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-qea90f4yrft .cluster-label text{fill:#F9FFFE;}#mermaid-qea90f4yrft .cluster-label span{color:#F9FFFE;}#mermaid-qea90f4yrft .cluster-label span p{background-color:transparent;}#mermaid-qea90f4yrft .label text,#mermaid-qea90f4yrft span{fill:#ccc;color:#ccc;}#mermaid-qea90f4yrft .node rect,#mermaid-qea90f4yrft .node circle,#mermaid-qea90f4yrft .node ellipse,#mermaid-qea90f4yrft .node polygon,#mermaid-qea90f4yrft .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-qea90f4yrft .rough-node .label text,#mermaid-qea90f4yrft .node .label text,#mermaid-qea90f4yrft .image-shape .label,#mermaid-qea90f4yrft .icon-shape .label{text-anchor:middle;}#mermaid-qea90f4yrft .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-qea90f4yrft .rough-node .label,#mermaid-qea90f4yrft .node .label,#mermaid-qea90f4yrft .image-shape .label,#mermaid-qea90f4yrft .icon-shape .label{text-align:center;}#mermaid-qea90f4yrft .node.clickable{cursor:pointer;}#mermaid-qea90f4yrft .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-qea90f4yrft .arrowheadPath{fill:lightgrey;}#mermaid-qea90f4yrft .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-qea90f4yrft .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-qea90f4yrft .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-qea90f4yrft .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-qea90f4yrft .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-qea90f4yrft .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-qea90f4yrft .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-qea90f4yrft .cluster text{fill:#F9FFFE;}#mermaid-qea90f4yrft .cluster span{color:#F9FFFE;}#mermaid-qea90f4yrft div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-qea90f4yrft .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-qea90f4yrft rect.text{fill:none;stroke-width:0;}#mermaid-qea90f4yrft .icon-shape,#mermaid-qea90f4yrft .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-qea90f4yrft .icon-shape p,#mermaid-qea90f4yrft .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-qea90f4yrft .icon-shape rect,#mermaid-qea90f4yrft .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-qea90f4yrft .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-qea90f4yrft .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-qea90f4yrft :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

No

Yes

Developer runs: forge build

Read foundry.toml Load profile.default

Resolve remappings Parse import statements

Compile forge-std (cached after first build)

Compile dependencies v4-core, system-smart-contracts

Compile src/ contracts AegisHook, AegisSentinel, MockOracle

via_ir = true?

Standard compilation AST → EVM bytecode

IR-based compilation AST → Yul → EVM bytecode

Apply optimization passes Inlining, CSE, dead code elimination

Generate ABI files out/**/*.json

Generate metadata out/**/*.metadata.json

Build successful Artifacts in out/

Diagram: Forge Build Execution Flow

The build process follows these steps:

1. Configuration Loading: Parse `foundry.toml` and environment variables
2. Dependency Resolution: Map imports to physical paths using remappings
3. Incremental Compilation: Compile only changed files (unless `--force` used)
4. IR Optimization: If `via_ir = true`, convert to Yul IR and apply aggressive optimization
5. Artifact Generation: Output JSON ABI files and metadata to `out/`

Sources: [contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)

---

## Optimization ImpactLink copied!

The following table shows the effect of `via_ir = true` on contract sizes:

ContractWithout IRWith IRSize Reduction`AegisHook`~28 kB (fails)~23.5 kB-16%`AegisSentinel`~22 kB~18.2 kB-17%`MockOracle`~2.5 kB~2.1 kB-16%

Observation: IR optimization is mandatory for `AegisHook` to fit within the 24.576 kB contract size limit. Without it, the contract exceeds EIP-170 and cannot be deployed.

Sources: [contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16)

---

## SummaryLink copied!

The Aegis build system leverages Foundry's advanced features:

- IR-based compilation for complex hook contracts
- Cancun EVM version for protocol compatibility
- Deterministic builds via `bytecode_hash = "none"`
- Clean remappings for multi-level dependencies
- Network aliases for multi-chain deployment

The configuration in `foundry.toml` is optimized for production deployment while maintaining fast iteration in development.

Sources: [contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)[contracts/.vscode/settings.json#1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.vscode/settings.json#L1-L3)