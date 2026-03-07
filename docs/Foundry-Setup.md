# Foundry SetupLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/foundry.lock](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml)

## Purpose and ScopeLink copied!

This page provides a guide for setting up the Foundry development environment to work with the Aegis codebase. It covers Foundry installation, initial configuration verification, and essential commands for building and testing the contracts. For detailed configuration settings, see [Foundry Configuration Reference](#7.1). For dependency management, see [Dependencies and Submodules](#6.3). For the complete build process, see [Build System](#6.4).

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)

---

## PrerequisitesLink copied!

Before installing Foundry, ensure your system has the following:

RequirementMinimum VersionPurposeGit2.0+Required for submodule management and Foundry installationRust/CargoLatest stableFoundry is built in RustUnix-like environmentmacOS, Linux, or WSL2Native Windows support is limitedRPC API KeysN/ARequired for testnet deployments (Alchemy, Infura, etc.)

Sources:[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)

---

## Installing FoundryLink copied!

### Using Foundryup (Recommended)Link copied!

Foundryup is the official installer and version manager for Foundry. It installs four core tools:

#mermaid-lood8kvckeo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-lood8kvckeo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-lood8kvckeo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-lood8kvckeo .error-icon{fill:#a44141;}#mermaid-lood8kvckeo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-lood8kvckeo .edge-thickness-normal{stroke-width:1px;}#mermaid-lood8kvckeo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-lood8kvckeo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-lood8kvckeo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-lood8kvckeo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-lood8kvckeo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-lood8kvckeo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-lood8kvckeo .marker.cross{stroke:lightgrey;}#mermaid-lood8kvckeo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-lood8kvckeo p{margin:0;}#mermaid-lood8kvckeo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-lood8kvckeo .cluster-label text{fill:#F9FFFE;}#mermaid-lood8kvckeo .cluster-label span{color:#F9FFFE;}#mermaid-lood8kvckeo .cluster-label span p{background-color:transparent;}#mermaid-lood8kvckeo .label text,#mermaid-lood8kvckeo span{fill:#ccc;color:#ccc;}#mermaid-lood8kvckeo .node rect,#mermaid-lood8kvckeo .node circle,#mermaid-lood8kvckeo .node ellipse,#mermaid-lood8kvckeo .node polygon,#mermaid-lood8kvckeo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-lood8kvckeo .rough-node .label text,#mermaid-lood8kvckeo .node .label text,#mermaid-lood8kvckeo .image-shape .label,#mermaid-lood8kvckeo .icon-shape .label{text-anchor:middle;}#mermaid-lood8kvckeo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-lood8kvckeo .rough-node .label,#mermaid-lood8kvckeo .node .label,#mermaid-lood8kvckeo .image-shape .label,#mermaid-lood8kvckeo .icon-shape .label{text-align:center;}#mermaid-lood8kvckeo .node.clickable{cursor:pointer;}#mermaid-lood8kvckeo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-lood8kvckeo .arrowheadPath{fill:lightgrey;}#mermaid-lood8kvckeo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-lood8kvckeo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-lood8kvckeo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-lood8kvckeo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-lood8kvckeo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-lood8kvckeo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-lood8kvckeo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-lood8kvckeo .cluster text{fill:#F9FFFE;}#mermaid-lood8kvckeo .cluster span{color:#F9FFFE;}#mermaid-lood8kvckeo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-lood8kvckeo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-lood8kvckeo rect.text{fill:none;stroke-width:0;}#mermaid-lood8kvckeo .icon-shape,#mermaid-lood8kvckeo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-lood8kvckeo .icon-shape p,#mermaid-lood8kvckeo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-lood8kvckeo .icon-shape rect,#mermaid-lood8kvckeo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-lood8kvckeo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-lood8kvckeo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-lood8kvckeo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Installs

Installs

Installs

Installs

foundryup (Installer)

forge (Build & Test)

cast (RPC Interaction)

anvil (Local Node)

chisel (REPL)

Installation Steps:

```
# 1. Download and run foundryup
curl -L https://foundry.paradigm.xyz | bash
 
# 2. Reload shell environment
source ~/.bashrc  # or ~/.zshrc
 
# 3. Install latest Foundry version
foundryup
```

### Verifying InstallationLink copied!

Confirm all tools are correctly installed:

```
# Check forge version
forge --version
# Expected output: forge 0.2.0 (...)
 
# Check cast version
cast --version
# Expected output: cast 0.2.0 (...)
 
# Check anvil version
anvil --version
# Expected output: anvil 0.2.0 (...)
```

Sources:[contracts/README.md#72-77](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L72-L77)

---

## Foundry Toolchain ArchitectureLink copied!

The following diagram shows how Foundry tools interact with the Aegis codebase:

#mermaid-f3gcveoifj{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-f3gcveoifj .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-f3gcveoifj .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-f3gcveoifj .error-icon{fill:#a44141;}#mermaid-f3gcveoifj .error-text{fill:#ddd;stroke:#ddd;}#mermaid-f3gcveoifj .edge-thickness-normal{stroke-width:1px;}#mermaid-f3gcveoifj .edge-thickness-thick{stroke-width:3.5px;}#mermaid-f3gcveoifj .edge-pattern-solid{stroke-dasharray:0;}#mermaid-f3gcveoifj .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-f3gcveoifj .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-f3gcveoifj .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-f3gcveoifj .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-f3gcveoifj .marker.cross{stroke:lightgrey;}#mermaid-f3gcveoifj svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-f3gcveoifj p{margin:0;}#mermaid-f3gcveoifj .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-f3gcveoifj .cluster-label text{fill:#F9FFFE;}#mermaid-f3gcveoifj .cluster-label span{color:#F9FFFE;}#mermaid-f3gcveoifj .cluster-label span p{background-color:transparent;}#mermaid-f3gcveoifj .label text,#mermaid-f3gcveoifj span{fill:#ccc;color:#ccc;}#mermaid-f3gcveoifj .node rect,#mermaid-f3gcveoifj .node circle,#mermaid-f3gcveoifj .node ellipse,#mermaid-f3gcveoifj .node polygon,#mermaid-f3gcveoifj .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-f3gcveoifj .rough-node .label text,#mermaid-f3gcveoifj .node .label text,#mermaid-f3gcveoifj .image-shape .label,#mermaid-f3gcveoifj .icon-shape .label{text-anchor:middle;}#mermaid-f3gcveoifj .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-f3gcveoifj .rough-node .label,#mermaid-f3gcveoifj .node .label,#mermaid-f3gcveoifj .image-shape .label,#mermaid-f3gcveoifj .icon-shape .label{text-align:center;}#mermaid-f3gcveoifj .node.clickable{cursor:pointer;}#mermaid-f3gcveoifj .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-f3gcveoifj .arrowheadPath{fill:lightgrey;}#mermaid-f3gcveoifj .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-f3gcveoifj .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-f3gcveoifj .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-f3gcveoifj .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-f3gcveoifj .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-f3gcveoifj .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-f3gcveoifj .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-f3gcveoifj .cluster text{fill:#F9FFFE;}#mermaid-f3gcveoifj .cluster span{color:#F9FFFE;}#mermaid-f3gcveoifj div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-f3gcveoifj .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-f3gcveoifj rect.text{fill:none;stroke-width:0;}#mermaid-f3gcveoifj .icon-shape,#mermaid-f3gcveoifj .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-f3gcveoifj .icon-shape p,#mermaid-f3gcveoifj .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-f3gcveoifj .icon-shape rect,#mermaid-f3gcveoifj .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-f3gcveoifj .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-f3gcveoifj .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-f3gcveoifj :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Build Artifacts

Configuration

Foundry Tools

Source Files

forge build

forge test

forge script

Configures

Version pins

Submodules

Outputs

Outputs

Produces

RPC calls

Local testing

src/*.sol (Solidity Contracts)

test/*.t.sol (Test Files)

script/*.s.sol (Deploy Scripts)

forge

cast

anvil

foundry.toml

foundry.lock

.gitmodules

out/ (Compiled Bytecode)

cache/ (Build Cache)

broadcast/ (Deployment Logs)

Sources:[contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

---

## Initializing the Aegis ProjectLink copied!

### Clone and SetupLink copied!

```
# 1. Clone the repository
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis/contracts
 
# 2. Initialize Git submodules (critical step)
git submodule update --init --recursive
 
# 3. Install dependencies via Foundry
forge install
```

### Dependency StructureLink copied!

The Aegis project uses Git submodules for dependency management. The following dependencies are pinned in [foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.lock#L1-L11):

SubmodulePurposeLocked Revision`lib/forge-std`Testing framework`8bbcf6e3f8f62f419e5429a0bd89331c85c37824``lib/hookmate`Hook utilities`33408fbc15e083eb0bc4205fa37cb6ba0a926f44``lib/uniswap-hooks`Uniswap V4 integration`e59fe72c110c3862eec9b332530dce49ca506bbb`

Sources:[contracts/foundry.lock#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.lock#L1-L11)

---

## Core Foundry CommandsLink copied!

### Build CommandsLink copied!

The primary command for compiling Solidity contracts:

```
# Standard build
forge build
 
# Clean build (removes cache)
forge clean && forge build
 
# Build with size optimization report
forge build --sizes
```

Configuration Applied:

- Solidity version: `0.8.26`[foundry.toml#8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L8-L8)
- EVM version: `cancun`[foundry.toml#3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L3-L3)
- Via IR optimization: `enabled`[foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L16-L16)
- Output directory: `out/`[foundry.toml#7](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L7-L7)

### Test CommandsLink copied!

```
# Run all tests
forge test
 
# Run with verbose output (shows logs)
forge test -vv
 
# Run specific test contract
forge test --match-contract AegisIntegrationTest
 
# Run with gas reporting
forge test --gas-report
```

### Script CommandsLink copied!

Aegis uses three deployment scripts in sequence:

```
# 1. Deploy MockOracle to Sepolia
forge script script/04_DeployOracle.s.sol \
  --rpc-url sepolia \
  --broadcast
 
# 2. Deploy AegisSentinel to Reactive Network
forge script script/05_DeploySentinel.s.sol \
  --rpc-url reactive \
  --broadcast \
  --legacy
 
# 3. Deploy AegisHook to Unichain
forge script script/06_DeployHook.s.sol \
  --rpc-url unichain_sepolia \
  --broadcast
```

Sources:[contracts/README.md#106-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L106-L122)

---

## Foundry Command WorkflowLink copied!

This diagram maps Foundry commands to their corresponding file operations:

#mermaid-3t18o1rgdep{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-3t18o1rgdep .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-3t18o1rgdep .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-3t18o1rgdep .error-icon{fill:#a44141;}#mermaid-3t18o1rgdep .error-text{fill:#ddd;stroke:#ddd;}#mermaid-3t18o1rgdep .edge-thickness-normal{stroke-width:1px;}#mermaid-3t18o1rgdep .edge-thickness-thick{stroke-width:3.5px;}#mermaid-3t18o1rgdep .edge-pattern-solid{stroke-dasharray:0;}#mermaid-3t18o1rgdep .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-3t18o1rgdep .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-3t18o1rgdep .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-3t18o1rgdep .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-3t18o1rgdep .marker.cross{stroke:lightgrey;}#mermaid-3t18o1rgdep svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-3t18o1rgdep p{margin:0;}#mermaid-3t18o1rgdep .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-3t18o1rgdep .cluster-label text{fill:#F9FFFE;}#mermaid-3t18o1rgdep .cluster-label span{color:#F9FFFE;}#mermaid-3t18o1rgdep .cluster-label span p{background-color:transparent;}#mermaid-3t18o1rgdep .label text,#mermaid-3t18o1rgdep span{fill:#ccc;color:#ccc;}#mermaid-3t18o1rgdep .node rect,#mermaid-3t18o1rgdep .node circle,#mermaid-3t18o1rgdep .node ellipse,#mermaid-3t18o1rgdep .node polygon,#mermaid-3t18o1rgdep .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-3t18o1rgdep .rough-node .label text,#mermaid-3t18o1rgdep .node .label text,#mermaid-3t18o1rgdep .image-shape .label,#mermaid-3t18o1rgdep .icon-shape .label{text-anchor:middle;}#mermaid-3t18o1rgdep .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-3t18o1rgdep .rough-node .label,#mermaid-3t18o1rgdep .node .label,#mermaid-3t18o1rgdep .image-shape .label,#mermaid-3t18o1rgdep .icon-shape .label{text-align:center;}#mermaid-3t18o1rgdep .node.clickable{cursor:pointer;}#mermaid-3t18o1rgdep .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-3t18o1rgdep .arrowheadPath{fill:lightgrey;}#mermaid-3t18o1rgdep .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-3t18o1rgdep .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-3t18o1rgdep .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3t18o1rgdep .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-3t18o1rgdep .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3t18o1rgdep .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-3t18o1rgdep .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-3t18o1rgdep .cluster text{fill:#F9FFFE;}#mermaid-3t18o1rgdep .cluster span{color:#F9FFFE;}#mermaid-3t18o1rgdep div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-3t18o1rgdep .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-3t18o1rgdep rect.text{fill:none;stroke-width:0;}#mermaid-3t18o1rgdep .icon-shape,#mermaid-3t18o1rgdep .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3t18o1rgdep .icon-shape p,#mermaid-3t18o1rgdep .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-3t18o1rgdep .icon-shape rect,#mermaid-3t18o1rgdep .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3t18o1rgdep .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-3t18o1rgdep .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-3t18o1rgdep :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Compiles

Outputs to

Caches in

Executes

Imports

Uses

Runs

Logs to

Uses RPC

Removes

Removes

Configures

Configures

Defines RPC

forge build

forge test

forge script

forge clean

src/*.sol

out/

cache/

test/*.t.sol

lib/forge-std/

Test.sol vm.* cheats

script/*.s.sol

broadcast/

sepolia reactive unichain_sepolia

foundry.toml

Sources:[contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)[contracts/README.md#75-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L75-L122)

---

## Configuration VerificationLink copied!

After installation, verify that Foundry reads the Aegis configuration correctly:

### Check Solidity VersionLink copied!

```
forge config | grep solc_version
# Expected: solc_version = "0.8.26"
```

### Verify RPC EndpointsLink copied!

The project defines three RPC endpoints in [foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L19-L22):

```
# List configured RPC endpoints
forge config --json | jq '.rpc_endpoints'
 
# Test Sepolia RPC connection
cast block-number --rpc-url sepolia
 
# Test Reactive Network RPC connection
cast block-number --rpc-url reactive
 
# Test Unichain Sepolia RPC connection
cast block-number --rpc-url unichain_sepolia
```

### Verify RemappingsLink copied!

Remappings allow clean import paths. Verify they resolve correctly:

```
# Display all remappings
forge remappings
 
# Expected output includes:
# reactive-lib/=lib/system-smart-contracts/lib/reactive-lib/src/
# v4-core/=lib/uniswap-hooks/lib/v4-core/
# v4-periphery/=lib/uniswap-hooks/lib/v4-periphery/
```

Sources:[contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14)[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)

---

## Initial Build TestLink copied!

Verify the environment is correctly configured by building the Aegis contracts:

```
# Navigate to contracts directory
cd contracts/
 
# Clean any existing artifacts
forge clean
 
# Build all contracts
forge build
 
# Expected output:
# [⠊] Compiling...
# [⠒] Compiling 4 files with 0.8.26
# [⠢] Solc 0.8.26 finished in X.XXs
# Compiler run successful!
```

Success Indicators:

IndicatorMeaning`Compiler run successful!`All contracts compiled without errors`out/` directory createdBytecode artifacts generated`cache/` directory createdBuild cache initializedNo `Error` messagesConfiguration is valid

### Troubleshooting Common IssuesLink copied!

ErrorCauseSolution`Error: submodule not initialized`Git submodules not fetchedRun `git submodule update --init --recursive``Error: solc version not found`Solidity compiler not installedFoundry auto-installs; ensure internet connection`Error: unknown config key`Invalid `foundry.toml`Check syntax in [foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L1-L27)`Error: RPC endpoint unreachable`Network issue or invalid URLVerify RPC URLs in [foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml#L19-L22)

Sources:[contracts/README.md#74-77](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L74-L77)[contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)

---

## Running Initial TestsLink copied!

After a successful build, validate the test suite:

```
# Run all tests with verbose output
forge test -vv
 
# Expected output should include:
# [PASS] testOracleUpdate() (gas: 123456)
# [PASS] testAccessControl() (gas: 234567)
# [PASS] testPanicTrigger() (gas: 345678)
# [PASS] testCircuitBreaker() (gas: 456789)
```

The Aegis test suite validates four critical scenarios documented in [contracts/README.md#86-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L86-L94):

Test CaseContractPurpose`testOracleUpdate``MockOracle.t.sol`Verifies price update events on L1`testAccessControl``AegisHook.t.sol`Ensures only Sentinel can trigger panic mode`testPanicTrigger``AegisSentinel.t.sol`Validates cross-chain panic activation`testCircuitBreaker``AegisHook.t.sol`Confirms swaps revert during panic mode

Sources:[contracts/README.md#80-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L80-L94)

---

## Next StepsLink copied!

After completing Foundry setup, proceed to:

1. [Dependencies and Submodules](#6.3) - Understand the external libraries (forge-std, uniswap-hooks, hookmate, reactive-lib)
2. [Build System](#6.4) - Learn about compilation settings, optimization flags, and artifacts
3. [Testing and CI/CD](#6.5) - Explore the test suite architecture and GitHub Actions workflows
4. [Foundry Configuration Reference](#7.1) - Deep dive into `foundry.toml` settings and profiles

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)