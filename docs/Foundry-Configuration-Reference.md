# Foundry Configuration ReferenceLink copied!
Relevant source files
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml)
- [contracts/lib/forge-std/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/foundry.toml)

This document provides a complete reference for the Foundry configuration files in the Aegis repository. It covers all settings in `foundry.toml`, including compiler options, RPC endpoints, import remappings, and linting rules.

For information about setting up the Foundry development environment and installing dependencies, see [Foundry Setup](#6.2). For details on the build process and compilation output, see [Build System](#6.4).

---

## OverviewLink copied!

Foundry uses `foundry.toml` files to configure the behavior of its toolchain (`forge`, `cast`, `anvil`). The Aegis repository contains two configuration files:

Configuration FilePurposeScope[`contracts/foundry.toml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml`)()Main project configurationAegis contracts, deployment scripts, tests[`contracts/lib/forge-std/foundry.toml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/lib/forge-std/foundry.toml`)()Dependency configurationforge-std library testing and formatting

Configuration settings are organized into profiles (e.g., `[profile.default]`) and specialized sections (e.g., `[rpc_endpoints]`, `[lint]`, `[fmt]`).

Sources:`contracts/foundry.toml`, `contracts/lib/forge-std/foundry.toml`

---

## Configuration ArchitectureLink copied!

#mermaid-0pfecryqzn49{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-0pfecryqzn49 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-0pfecryqzn49 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-0pfecryqzn49 .error-icon{fill:#a44141;}#mermaid-0pfecryqzn49 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-0pfecryqzn49 .edge-thickness-normal{stroke-width:1px;}#mermaid-0pfecryqzn49 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-0pfecryqzn49 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-0pfecryqzn49 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-0pfecryqzn49 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-0pfecryqzn49 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-0pfecryqzn49 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-0pfecryqzn49 .marker.cross{stroke:lightgrey;}#mermaid-0pfecryqzn49 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-0pfecryqzn49 p{margin:0;}#mermaid-0pfecryqzn49 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-0pfecryqzn49 .cluster-label text{fill:#F9FFFE;}#mermaid-0pfecryqzn49 .cluster-label span{color:#F9FFFE;}#mermaid-0pfecryqzn49 .cluster-label span p{background-color:transparent;}#mermaid-0pfecryqzn49 .label text,#mermaid-0pfecryqzn49 span{fill:#ccc;color:#ccc;}#mermaid-0pfecryqzn49 .node rect,#mermaid-0pfecryqzn49 .node circle,#mermaid-0pfecryqzn49 .node ellipse,#mermaid-0pfecryqzn49 .node polygon,#mermaid-0pfecryqzn49 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-0pfecryqzn49 .rough-node .label text,#mermaid-0pfecryqzn49 .node .label text,#mermaid-0pfecryqzn49 .image-shape .label,#mermaid-0pfecryqzn49 .icon-shape .label{text-anchor:middle;}#mermaid-0pfecryqzn49 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-0pfecryqzn49 .rough-node .label,#mermaid-0pfecryqzn49 .node .label,#mermaid-0pfecryqzn49 .image-shape .label,#mermaid-0pfecryqzn49 .icon-shape .label{text-align:center;}#mermaid-0pfecryqzn49 .node.clickable{cursor:pointer;}#mermaid-0pfecryqzn49 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-0pfecryqzn49 .arrowheadPath{fill:lightgrey;}#mermaid-0pfecryqzn49 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-0pfecryqzn49 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-0pfecryqzn49 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-0pfecryqzn49 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-0pfecryqzn49 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-0pfecryqzn49 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-0pfecryqzn49 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-0pfecryqzn49 .cluster text{fill:#F9FFFE;}#mermaid-0pfecryqzn49 .cluster span{color:#F9FFFE;}#mermaid-0pfecryqzn49 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-0pfecryqzn49 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-0pfecryqzn49 rect.text{fill:none;stroke-width:0;}#mermaid-0pfecryqzn49 .icon-shape,#mermaid-0pfecryqzn49 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-0pfecryqzn49 .icon-shape p,#mermaid-0pfecryqzn49 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-0pfecryqzn49 .icon-shape rect,#mermaid-0pfecryqzn49 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-0pfecryqzn49 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-0pfecryqzn49 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-0pfecryqzn49 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Build Artifacts

Foundry Commands

lib/ Dependencies

Aegis Repository Root

Configures

Configures

Configures

Defines remappings to

Defines remappings to

Defines remappings to

Inherited by tests

Configures

Produces

Uses

Updates

fs_permissions

fs_permissions

contracts/foundry.toml [profile.default] [rpc_endpoints] [lint]

lib/forge-std/foundry.toml [profile.default] [rpc_endpoints] [fmt]

lib/uniswap-hooks/

lib/hookmate/

lib/system-smart-contracts/

forge build

forge test

forge script

forge fmt

out/ Compiled bytecode

cache/ Compiler cache

.forge-snapshots/ Gas snapshots

Diagram: Foundry configuration flow showing how `foundry.toml` files control the build toolchain and define project structure.

Sources:`contracts/foundry.toml`, `contracts/lib/forge-std/foundry.toml`

---

## Main Project ConfigurationLink copied!

The primary configuration file at [`contracts/foundry.toml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml`)() contains all settings for building, testing, and deploying Aegis contracts.

### Profile SettingsLink copied!

The `[profile.default]` section defines compiler behavior and project structure:

#mermaid-2p4btp6d0g1{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-2p4btp6d0g1 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-2p4btp6d0g1 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-2p4btp6d0g1 .error-icon{fill:#a44141;}#mermaid-2p4btp6d0g1 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-2p4btp6d0g1 .edge-thickness-normal{stroke-width:1px;}#mermaid-2p4btp6d0g1 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-2p4btp6d0g1 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-2p4btp6d0g1 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-2p4btp6d0g1 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-2p4btp6d0g1 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-2p4btp6d0g1 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-2p4btp6d0g1 .marker.cross{stroke:lightgrey;}#mermaid-2p4btp6d0g1 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-2p4btp6d0g1 p{margin:0;}#mermaid-2p4btp6d0g1 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-2p4btp6d0g1 .cluster-label text{fill:#F9FFFE;}#mermaid-2p4btp6d0g1 .cluster-label span{color:#F9FFFE;}#mermaid-2p4btp6d0g1 .cluster-label span p{background-color:transparent;}#mermaid-2p4btp6d0g1 .label text,#mermaid-2p4btp6d0g1 span{fill:#ccc;color:#ccc;}#mermaid-2p4btp6d0g1 .node rect,#mermaid-2p4btp6d0g1 .node circle,#mermaid-2p4btp6d0g1 .node ellipse,#mermaid-2p4btp6d0g1 .node polygon,#mermaid-2p4btp6d0g1 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-2p4btp6d0g1 .rough-node .label text,#mermaid-2p4btp6d0g1 .node .label text,#mermaid-2p4btp6d0g1 .image-shape .label,#mermaid-2p4btp6d0g1 .icon-shape .label{text-anchor:middle;}#mermaid-2p4btp6d0g1 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-2p4btp6d0g1 .rough-node .label,#mermaid-2p4btp6d0g1 .node .label,#mermaid-2p4btp6d0g1 .image-shape .label,#mermaid-2p4btp6d0g1 .icon-shape .label{text-align:center;}#mermaid-2p4btp6d0g1 .node.clickable{cursor:pointer;}#mermaid-2p4btp6d0g1 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-2p4btp6d0g1 .arrowheadPath{fill:lightgrey;}#mermaid-2p4btp6d0g1 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-2p4btp6d0g1 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-2p4btp6d0g1 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-2p4btp6d0g1 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-2p4btp6d0g1 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-2p4btp6d0g1 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-2p4btp6d0g1 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-2p4btp6d0g1 .cluster text{fill:#F9FFFE;}#mermaid-2p4btp6d0g1 .cluster span{color:#F9FFFE;}#mermaid-2p4btp6d0g1 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-2p4btp6d0g1 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-2p4btp6d0g1 rect.text{fill:none;stroke-width:0;}#mermaid-2p4btp6d0g1 .icon-shape,#mermaid-2p4btp6d0g1 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-2p4btp6d0g1 .icon-shape p,#mermaid-2p4btp6d0g1 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-2p4btp6d0g1 .icon-shape rect,#mermaid-2p4btp6d0g1 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-2p4btp6d0g1 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-2p4btp6d0g1 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-2p4btp6d0g1 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

External Interactions

Compilation Effects

[profile.default] Settings

Enables

Enables

Improves

Allows

Permits

bytecode_hash = 'none' Disable metadata hash

evm_version = 'cancun' Target Cancun hardfork

solc_version = '0.8.26' Solidity compiler

via_ir = true IR-based compilation

ffi = true Foreign Function Interface

libs = ['lib'] Dependency directory

src = 'src' Contract sources

out = 'out' Build output

fs_permissions Filesystem access

CREATE2 determinism AegisHook deployment

Advanced optimizations via Yul IR

Gas efficiency for L2 deployment

cast/forge calls to RPC endpoints

Write gas snapshots to .forge-snapshots/

Diagram: Profile settings and their effects on compilation and deployment.

SettingValuePurpose`bytecode_hash``"none"`Disables metadata hash injection for deterministic CREATE2 deployment of [`AegisHook`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`AegisHook`)()`evm_version``"cancun"`Targets Cancun EVM opcodes (required for Unichain Sepolia compatibility)`solc_version``"0.8.26"`Solidity compiler version (supports transient storage and recent features)`via_ir``true`Enables IR-based code generation for advanced optimizations (required for complex contracts)`ffi``true`Allows Foreign Function Interface calls (used by deployment scripts for CREATE2 salt mining)`libs``["lib"]`Directory containing Git submodule dependencies`src``"src"`Directory containing contract source files`out``"out"`Directory for compiled bytecode and ABIs`fs_permissions``[{access = "read-write", path = ".forge-snapshots/"}]`Grants read-write access to gas snapshot directory

Critical Configuration: The `bytecode_hash = "none"` setting is essential for CREATE2 determinism. The [`06_DeployHook.s.sol`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`06_DeployHook.s.sol`)() script mines a salt to deploy [`AegisHook`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`AegisHook`)() at an address with the `BEFORE_SWAP_FLAG` (0x80...) required by Uniswap V4. Any metadata hash in the bytecode would break this calculation.

Sources:[`contracts/foundry.toml#1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml#L1-L16)()

---

### RPC EndpointsLink copied!

The `[rpc_endpoints]` section defines blockchain network connections for deployment and testing:

#mermaid-l7huq6k0oga{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-l7huq6k0oga .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-l7huq6k0oga .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-l7huq6k0oga .error-icon{fill:#a44141;}#mermaid-l7huq6k0oga .error-text{fill:#ddd;stroke:#ddd;}#mermaid-l7huq6k0oga .edge-thickness-normal{stroke-width:1px;}#mermaid-l7huq6k0oga .edge-thickness-thick{stroke-width:3.5px;}#mermaid-l7huq6k0oga .edge-pattern-solid{stroke-dasharray:0;}#mermaid-l7huq6k0oga .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-l7huq6k0oga .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-l7huq6k0oga .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-l7huq6k0oga .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-l7huq6k0oga .marker.cross{stroke:lightgrey;}#mermaid-l7huq6k0oga svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-l7huq6k0oga p{margin:0;}#mermaid-l7huq6k0oga .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-l7huq6k0oga .cluster-label text{fill:#F9FFFE;}#mermaid-l7huq6k0oga .cluster-label span{color:#F9FFFE;}#mermaid-l7huq6k0oga .cluster-label span p{background-color:transparent;}#mermaid-l7huq6k0oga .label text,#mermaid-l7huq6k0oga span{fill:#ccc;color:#ccc;}#mermaid-l7huq6k0oga .node rect,#mermaid-l7huq6k0oga .node circle,#mermaid-l7huq6k0oga .node ellipse,#mermaid-l7huq6k0oga .node polygon,#mermaid-l7huq6k0oga .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-l7huq6k0oga .rough-node .label text,#mermaid-l7huq6k0oga .node .label text,#mermaid-l7huq6k0oga .image-shape .label,#mermaid-l7huq6k0oga .icon-shape .label{text-anchor:middle;}#mermaid-l7huq6k0oga .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-l7huq6k0oga .rough-node .label,#mermaid-l7huq6k0oga .node .label,#mermaid-l7huq6k0oga .image-shape .label,#mermaid-l7huq6k0oga .icon-shape .label{text-align:center;}#mermaid-l7huq6k0oga .node.clickable{cursor:pointer;}#mermaid-l7huq6k0oga .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-l7huq6k0oga .arrowheadPath{fill:lightgrey;}#mermaid-l7huq6k0oga .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-l7huq6k0oga .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-l7huq6k0oga .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-l7huq6k0oga .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-l7huq6k0oga .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-l7huq6k0oga .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-l7huq6k0oga .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-l7huq6k0oga .cluster text{fill:#F9FFFE;}#mermaid-l7huq6k0oga .cluster span{color:#F9FFFE;}#mermaid-l7huq6k0oga div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-l7huq6k0oga .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-l7huq6k0oga rect.text{fill:none;stroke-width:0;}#mermaid-l7huq6k0oga .icon-shape,#mermaid-l7huq6k0oga .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-l7huq6k0oga .icon-shape p,#mermaid-l7huq6k0oga .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-l7huq6k0oga .icon-shape rect,#mermaid-l7huq6k0oga .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-l7huq6k0oga .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-l7huq6k0oga .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-l7huq6k0oga :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Deployed Contracts

Deployment Scripts

[rpc_endpoints] Section

Used by

Used by

Used by

Deploys to

Deploys to

Deploys to

unichain_sepolia publicnode.com Chain ID: 1301

reactive lasna-rpc.rnk.dev Chain ID: 5318007

sepolia eth-sepolia.g.alchemy.com Chain ID: 11155111

04_DeployOracle.s.sol --rpc-url sepolia

05_DeploySentinel.s.sol --rpc-url reactive

06_DeployHook.s.sol --rpc-url unichain_sepolia

MockOracle 0x1392...a7D8

AegisSentinel 0x0B6a...b6B6

AegisHook 0x1E2a...8080

Diagram: RPC endpoint mapping to deployment scripts and target contracts.

Endpoint NameURLNetworkChain IDContracts Deployed`sepolia``https://eth-sepolia.g.alchemy.com/v2/...`Ethereum Sepolia11155111[`MockOracle`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`MockOracle`)(), [`GuardianRegistry`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`GuardianRegistry`)()`reactive``https://lasna-rpc.rnk.dev/`Reactive Network Lasna5318007[`AegisSentinel`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`AegisSentinel`)()`unichain_sepolia``https://unichain-sepolia-rpc.publicnode.com`Unichain Sepolia1301[`AegisHook`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`AegisHook`)()

Usage in Deployment:

- [`script/04_DeployOracle.s.sol`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`script/04_DeployOracle.s.sol`)(): `forge script --rpc-url sepolia`
- [`script/05_DeploySentinel.s.sol`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`script/05_DeploySentinel.s.sol`)(): `forge script --rpc-url reactive`
- [`script/06_DeployHook.s.sol`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`script/06_DeployHook.s.sol`)(): `forge script --rpc-url unichain_sepolia`

For complete deployment details, see [Deployment Scripts](#5.1) and [Network Configuration](#5.2).

Sources:[`contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml#L19-L22)()

---

### Import RemappingsLink copied!

The `remappings` array defines import path aliases for external dependencies managed as Git submodules:

RemappingTarget PathPurpose`reactive-lib/``lib/system-smart-contracts/lib/reactive-lib/src/`Reactive Network SDK ([`AbstractReactive`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`AbstractReactive`)(), event subscription interfaces)`system-smart-contracts/``lib/system-smart-contracts/src/`Reactive Network system contracts (used by [`AegisSentinel`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`AegisSentinel`)())`v4-core/``lib/uniswap-hooks/lib/v4-core/`Uniswap V4 core contracts ([`IHooks`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`IHooks`)(), [`PoolManager`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`PoolManager`)())`v4-periphery/``lib/uniswap-hooks/lib/v4-periphery/`Uniswap V4 periphery contracts (router, swap utilities)

Code Example - Remapping Usage in AegisHook:

```
// File: contracts/src/AegisHook.sol
import {BaseHook} from "v4-core/BaseHook.sol";  // Resolves to lib/uniswap-hooks/lib/v4-core/
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
```

Code Example - Remapping Usage in AegisSentinel:

```
// File: contracts/src/AegisSentinel.sol
import {AbstractReactive} from "reactive-lib/AbstractReactive.sol";  // Resolves to lib/system-smart-contracts/lib/reactive-lib/src/
import {IReactive} from "reactive-lib/IReactive.sol";
```

Submodule Management: These remappings correspond to Git submodules defined in [`.gitmodules`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`.gitmodules`)(). For details on updating and managing submodules, see [Dependencies and Submodules](#6.3).

Sources:[`contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml#L9-L14)()

---

### Linting ConfigurationLink copied!

The `[lint]` section controls Solidity linting behavior:

```
[lint]
exclude_lints = ["screaming-snake-case-immutable", "screaming-snake-case-const"]
lint_on_build = false
```

SettingValueRationale`exclude_lints``["screaming-snake-case-immutable", "screaming-snake-case-const"]`Disables warnings for non-uppercase `immutable` and `constant` variables (the codebase uses camelCase for consistency with Solidity conventions)`lint_on_build``false`Disables automatic linting during `forge build` (linting is performed separately in CI/CD via GitHub Actions)

Example - Immutable Variable Style:

```
// Allowed by exclude_lints configuration:
address immutable hook;          // camelCase (not HOOK)
uint256 constant threshold = 10; // camelCase (not THRESHOLD)
```

The linting exclusions accommodate the project's coding style, which follows Solidity's standard camelCase convention rather than SCREAMING_SNAKE_CASE for constants and immutables.

Sources:[`contracts/foundry.toml#24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml#L24-L26)()

---

## Forge-std ConfigurationLink copied!

The [`contracts/lib/forge-std/foundry.toml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/lib/forge-std/foundry.toml`)() file configures the forge-std testing library. This configuration is inherited by Aegis tests that import forge-std utilities.

### Forge-std Profile SettingsLink copied!

```
[profile.default]
fs_permissions = [{ access = "read-write", path = "./"}]
optimizer = true
optimizer_runs = 200
```

SettingValuePurpose`fs_permissions``[{ access = "read-write", path = "./"}]`Grants full filesystem access (required for forge-std's file operations and test utilities)`optimizer``true`Enables Solidity optimizer for forge-std library compilation`optimizer_runs``200`Optimizer run count (standard default for balanced optimization)

Sources:[`contracts/lib/forge-std/foundry.toml#1-4](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/lib/forge-std/foundry.toml#L1-L4)()

---

### Forge-std RPC EndpointsLink copied!

The forge-std library defines test RPC endpoints for testing initialization and endpoint parsing:

```
[rpc_endpoints]
mainnet = "https://eth.merkle.io"
optimism_sepolia = "https://sepolia.optimism.io/"
arbitrum_one_sepolia = "https://sepolia-rollup.arbitrum.io/rpc/"
needs_undefined_env_var = "${UNDEFINED_RPC_URL_PLACEHOLDER}"
```

These endpoints are not used by Aegis contracts. They exist for forge-std's internal testing of RPC configuration parsing and environment variable substitution.

Sources:[`contracts/lib/forge-std/foundry.toml#6-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/lib/forge-std/foundry.toml#L6-L11)()

---

### Formatting ConfigurationLink copied!

The `[fmt]` section defines code formatting rules for `forge fmt`:

```
[fmt]
line_length = 120
tab_width = 4
bracket_spacing = false
int_types = 'long'
multiline_func_header = 'attributes_first'
quote_style = 'double'
number_underscore = 'preserve'
single_line_statement_blocks = 'preserve'
ignore = ["src/console.sol", "src/console2.sol"]
```

SettingValueEffect`line_length``120`Maximum line length before wrapping`tab_width``4`Number of spaces per indentation level`bracket_spacing``false`No spaces inside curly braces (`{a: 1}` not `{ a: 1 }`)`int_types``'long'`Use full type names (`uint256` not `uint`)`multiline_func_header``'attributes_first'`Place function modifiers before parameters when wrapping`quote_style``'double'`Use double quotes for strings`number_underscore``'preserve'`Keep existing numeric separators (e.g., `1_000_000`)`single_line_statement_blocks``'preserve'`Don't reformat single-line control flow blocks`ignore``["src/console.sol", "src/console2.sol"]`Skip formatting for console logging contracts (external dependencies)

CI/CD Integration: The GitHub Actions workflow at [`.github/workflows/test.yml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`.github/workflows/test.yml`)() runs `forge fmt --check` to enforce formatting consistency. See [Testing and CI/CD](#6.5) for details.

Sources:[`contracts/lib/forge-std/foundry.toml#13-23](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/lib/forge-std/foundry.toml#L13-L23)()

---

## Configuration Inheritance and OverridesLink copied!

#mermaid-cs87sno7sj{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-cs87sno7sj .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-cs87sno7sj .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-cs87sno7sj .error-icon{fill:#a44141;}#mermaid-cs87sno7sj .error-text{fill:#ddd;stroke:#ddd;}#mermaid-cs87sno7sj .edge-thickness-normal{stroke-width:1px;}#mermaid-cs87sno7sj .edge-thickness-thick{stroke-width:3.5px;}#mermaid-cs87sno7sj .edge-pattern-solid{stroke-dasharray:0;}#mermaid-cs87sno7sj .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-cs87sno7sj .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-cs87sno7sj .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-cs87sno7sj .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-cs87sno7sj .marker.cross{stroke:lightgrey;}#mermaid-cs87sno7sj svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-cs87sno7sj p{margin:0;}#mermaid-cs87sno7sj .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-cs87sno7sj .cluster-label text{fill:#F9FFFE;}#mermaid-cs87sno7sj .cluster-label span{color:#F9FFFE;}#mermaid-cs87sno7sj .cluster-label span p{background-color:transparent;}#mermaid-cs87sno7sj .label text,#mermaid-cs87sno7sj span{fill:#ccc;color:#ccc;}#mermaid-cs87sno7sj .node rect,#mermaid-cs87sno7sj .node circle,#mermaid-cs87sno7sj .node ellipse,#mermaid-cs87sno7sj .node polygon,#mermaid-cs87sno7sj .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-cs87sno7sj .rough-node .label text,#mermaid-cs87sno7sj .node .label text,#mermaid-cs87sno7sj .image-shape .label,#mermaid-cs87sno7sj .icon-shape .label{text-anchor:middle;}#mermaid-cs87sno7sj .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-cs87sno7sj .rough-node .label,#mermaid-cs87sno7sj .node .label,#mermaid-cs87sno7sj .image-shape .label,#mermaid-cs87sno7sj .icon-shape .label{text-align:center;}#mermaid-cs87sno7sj .node.clickable{cursor:pointer;}#mermaid-cs87sno7sj .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-cs87sno7sj .arrowheadPath{fill:lightgrey;}#mermaid-cs87sno7sj .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-cs87sno7sj .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-cs87sno7sj .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cs87sno7sj .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-cs87sno7sj .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cs87sno7sj .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-cs87sno7sj .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-cs87sno7sj .cluster text{fill:#F9FFFE;}#mermaid-cs87sno7sj .cluster span{color:#F9FFFE;}#mermaid-cs87sno7sj div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-cs87sno7sj .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-cs87sno7sj rect.text{fill:none;stroke-width:0;}#mermaid-cs87sno7sj .icon-shape,#mermaid-cs87sno7sj .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cs87sno7sj .icon-shape p,#mermaid-cs87sno7sj .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-cs87sno7sj .icon-shape rect,#mermaid-cs87sno7sj .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cs87sno7sj .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-cs87sno7sj .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-cs87sno7sj :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Example: forge script

Resolves to

forge script DeployHook --rpc-url unichain_sepolia --optimizer-runs 1000

RPC: unichain_sepolia from CLI flag  Optimizer runs: 1000 from CLI flag  via_ir: true from foundry.toml

Configuration Resolution Order

Overrides

Overrides

Overrides

Overrides

Command-line flags --rpc-url, --optimizer, etc.

Environment variables FOUNDRY_*, ETH_RPC_URL

contracts/foundry.toml (Main project config)

lib/*/foundry.toml (Dependency configs)

Foundry defaults (Built-in)

Diagram: Foundry configuration resolution order, with command-line flags taking highest precedence.

### Precedence RulesLink copied!

1. Command-line flags (highest priority): `--rpc-url`, `--optimizer-runs`, `--ffi`, etc.
2. Environment variables: `FOUNDRY_RPC_URL`, `FOUNDRY_OPTIMIZER`, `ETH_RPC_URL`
3. Project config: [`contracts/foundry.toml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`contracts/foundry.toml`)()
4. Dependency configs: [`lib/forge-std/foundry.toml`](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`lib/forge-std/foundry.toml`)(), etc.
5. Foundry defaults (lowest priority): Built-in Foundry defaults

### Common Override ScenariosLink copied!

Scenario 1 - Override RPC endpoint via CLI:

```
forge script script/04_DeployOracle.s.sol \
  --rpc-url https://custom-sepolia-endpoint.com \
  --broadcast
```

Overrides the `sepolia` RPC endpoint defined in [`foundry.toml#22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/`foundry.toml#L22-L22)().

Scenario 2 - Override optimizer via environment variable:

```
export FOUNDRY_OPTIMIZER_RUNS=10000
forge build
```

Overrides the optimizer setting while preserving other config values.

Scenario 3 - Profile-specific configuration:

```
[profile.production]
via_ir = true
optimizer_runs = 10000
 
[profile.development]
via_ir = false
optimizer_runs = 200
```

Switch profiles with: `forge build --profile production`

Note: The Aegis repository uses only the `[profile.default]` profile. Custom profiles can be added for production deployments with different optimization settings.

Sources:`contracts/foundry.toml`, `contracts/lib/forge-std/foundry.toml`

---

## Configuration Summary TableLink copied!

### Complete Setting ReferenceLink copied!

SectionSettingAegis ValueForge-std ValuePurpose`[profile.default]``bytecode_hash``"none"`(default: `"ipfs"`)Enables CREATE2 determinism`evm_version``"cancun"`(default)Targets Cancun hardfork`ffi``true`(default: `false`)Allows external process calls`fs_permissions``.forge-snapshots/` read-write`./` read-writeFilesystem access control`libs``["lib"]`(default)Dependency directory`out``"out"`(default)Build output directory`solc_version``"0.8.26"`(default)Solidity compiler version`src``"src"`(default)Source directory`via_ir``true`(default: `false`)IR-based optimization`optimizer`(default: `false`)`true`Enable optimizer`optimizer_runs`(default: `200`)`200`Optimizer run count`[rpc_endpoints]``unichain_sepolia``publicnode.com`N/AUnichain L2 RPC`reactive``lasna-rpc.rnk.dev`N/AReactive Network RPC`sepolia``alchemy.com`N/AEthereum testnet RPC`[lint]``exclude_lints``["screaming-snake-case-*"]`N/ADisable uppercase lints`lint_on_build``false`N/ADisable auto-linting`[fmt]``line_length`(default)`120`Max line length`int_types`(default)`'long'`Use full type names`ignore`N/A`["src/console*.sol"]`Skip formatting files

Sources:`contracts/foundry.toml`, `contracts/lib/forge-std/foundry.toml`

---

## Related DocumentationLink copied!

- [Foundry Setup](#6.2) - Installing and initializing Foundry toolchain
- [Build System](#6.4) - Compilation process and output artifacts
- [Dependencies and Submodules](#6.3) - Managing Git submodules referenced in remappings
- [Network Configuration](#5.2) - Detailed RPC endpoint information and chain IDs
- [Deployment Scripts](#5.1) - Using configured RPC endpoints for multi-chain deployment

Sources:`contracts/foundry.toml`, `contracts/lib/forge-std/foundry.toml`