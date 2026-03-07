# Project StructureLink copied!
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore)
- [contracts/.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore)
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules)

## Purpose and ScopeLink copied!

This document describes the physical organization of the Aegis repository, including directory layouts, file locations, and version control patterns. It covers the separation between source code, generated artifacts, dependencies, and configuration files. For information about setting up the Foundry build system, see [Foundry Setup](#6.2). For details on managing git submodule dependencies, see [Dependencies and Submodules](#6.3).

## Repository Layout OverviewLink copied!

The Aegis repository is organized into three primary directories with supporting configuration at the root:

#mermaid-arvgui7d1be{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-arvgui7d1be .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-arvgui7d1be .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-arvgui7d1be .error-icon{fill:#a44141;}#mermaid-arvgui7d1be .error-text{fill:#ddd;stroke:#ddd;}#mermaid-arvgui7d1be .edge-thickness-normal{stroke-width:1px;}#mermaid-arvgui7d1be .edge-thickness-thick{stroke-width:3.5px;}#mermaid-arvgui7d1be .edge-pattern-solid{stroke-dasharray:0;}#mermaid-arvgui7d1be .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-arvgui7d1be .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-arvgui7d1be .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-arvgui7d1be .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-arvgui7d1be .marker.cross{stroke:lightgrey;}#mermaid-arvgui7d1be svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-arvgui7d1be p{margin:0;}#mermaid-arvgui7d1be .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-arvgui7d1be .cluster-label text{fill:#F9FFFE;}#mermaid-arvgui7d1be .cluster-label span{color:#F9FFFE;}#mermaid-arvgui7d1be .cluster-label span p{background-color:transparent;}#mermaid-arvgui7d1be .label text,#mermaid-arvgui7d1be span{fill:#ccc;color:#ccc;}#mermaid-arvgui7d1be .node rect,#mermaid-arvgui7d1be .node circle,#mermaid-arvgui7d1be .node ellipse,#mermaid-arvgui7d1be .node polygon,#mermaid-arvgui7d1be .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-arvgui7d1be .rough-node .label text,#mermaid-arvgui7d1be .node .label text,#mermaid-arvgui7d1be .image-shape .label,#mermaid-arvgui7d1be .icon-shape .label{text-anchor:middle;}#mermaid-arvgui7d1be .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-arvgui7d1be .rough-node .label,#mermaid-arvgui7d1be .node .label,#mermaid-arvgui7d1be .image-shape .label,#mermaid-arvgui7d1be .icon-shape .label{text-align:center;}#mermaid-arvgui7d1be .node.clickable{cursor:pointer;}#mermaid-arvgui7d1be .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-arvgui7d1be .arrowheadPath{fill:lightgrey;}#mermaid-arvgui7d1be .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-arvgui7d1be .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-arvgui7d1be .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-arvgui7d1be .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-arvgui7d1be .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-arvgui7d1be .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-arvgui7d1be .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-arvgui7d1be .cluster text{fill:#F9FFFE;}#mermaid-arvgui7d1be .cluster span{color:#F9FFFE;}#mermaid-arvgui7d1be div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-arvgui7d1be .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-arvgui7d1be rect.text{fill:none;stroke-width:0;}#mermaid-arvgui7d1be .icon-shape,#mermaid-arvgui7d1be .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-arvgui7d1be .icon-shape p,#mermaid-arvgui7d1be .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-arvgui7d1be .icon-shape rect,#mermaid-arvgui7d1be .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-arvgui7d1be .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-arvgui7d1be .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-arvgui7d1be :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Aegis Repository Root

contracts/ Solidity smart contracts

frontend/ Next.js dashboard

lib/ Git submodule dependencies

Root configuration files

src/ Source contracts

script/ Deployment scripts

test/ Test suites

out/ Compiled artifacts (ignored)

cache/ Build cache (ignored)

broadcast/ Deployment logs (ignored)

src/ React components

.next/ Build output (ignored)

out/ Static export (ignored)

forge-std/ Testing utilities

uniswap-hooks/ Uniswap v4 framework

hookmate/ Hook utilities

system-smart-contracts/ Reactive SDK

.gitignore Root ignore patterns

foundry.toml Foundry configuration

.gitmodules Submodule definitions

Sources:[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)[contracts/.gitignore#1-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L1-L15)

## Contracts Directory StructureLink copied!

The `contracts/` directory contains all Solidity smart contracts and follows the standard Foundry project layout:

### Source Contracts (`contracts/src/`)Link copied!

Contains the deployable smart contracts that implement the Aegis system:

Contract FilePurposeDeployment Target`AegisHook.sol`Uniswap v4 hook implementing circuit breakerUnichain Sepolia (L2)`AegisSentinel.sol`Reactive Network orchestratorReactive Network (Lasna)`MockOracle.sol`Test oracle for price feedsEthereum Sepolia (L1)Guardian Registry contractsERC-721/ERC-8004 reputation systemEthereum Sepolia (L1)

### Deployment Scripts (`contracts/script/`)Link copied!

Foundry scripts for deploying contracts across chains:

- `04_DeployOracle.s.sol` - Deploys `MockOracle` to Sepolia L1
- `05_DeploySentinel.s.sol` - Deploys `AegisSentinel` to Reactive Network
- `06_DeployHook.s.sol` - Deploys `AegisHook` to Unichain L2

For detailed usage of these scripts, see [Deployment Scripts](#5.1).

### Test Suite (`contracts/test/`)Link copied!

Contains `*.t.sol` test files that verify contract behavior. Tests use the forge-std library for testing utilities. See [Testing and CI/CD](#6.5) for test execution details.

### Generated Artifacts (Excluded from Git)Link copied!

The contracts directory generates several artifact types during build and deployment:

#mermaid-itumapggivp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-itumapggivp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-itumapggivp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-itumapggivp .error-icon{fill:#a44141;}#mermaid-itumapggivp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-itumapggivp .edge-thickness-normal{stroke-width:1px;}#mermaid-itumapggivp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-itumapggivp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-itumapggivp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-itumapggivp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-itumapggivp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-itumapggivp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-itumapggivp .marker.cross{stroke:lightgrey;}#mermaid-itumapggivp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-itumapggivp p{margin:0;}#mermaid-itumapggivp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-itumapggivp .cluster-label text{fill:#F9FFFE;}#mermaid-itumapggivp .cluster-label span{color:#F9FFFE;}#mermaid-itumapggivp .cluster-label span p{background-color:transparent;}#mermaid-itumapggivp .label text,#mermaid-itumapggivp span{fill:#ccc;color:#ccc;}#mermaid-itumapggivp .node rect,#mermaid-itumapggivp .node circle,#mermaid-itumapggivp .node ellipse,#mermaid-itumapggivp .node polygon,#mermaid-itumapggivp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-itumapggivp .rough-node .label text,#mermaid-itumapggivp .node .label text,#mermaid-itumapggivp .image-shape .label,#mermaid-itumapggivp .icon-shape .label{text-anchor:middle;}#mermaid-itumapggivp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-itumapggivp .rough-node .label,#mermaid-itumapggivp .node .label,#mermaid-itumapggivp .image-shape .label,#mermaid-itumapggivp .icon-shape .label{text-align:center;}#mermaid-itumapggivp .node.clickable{cursor:pointer;}#mermaid-itumapggivp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-itumapggivp .arrowheadPath{fill:lightgrey;}#mermaid-itumapggivp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-itumapggivp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-itumapggivp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-itumapggivp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-itumapggivp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-itumapggivp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-itumapggivp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-itumapggivp .cluster text{fill:#F9FFFE;}#mermaid-itumapggivp .cluster span{color:#F9FFFE;}#mermaid-itumapggivp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-itumapggivp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-itumapggivp rect.text{fill:none;stroke-width:0;}#mermaid-itumapggivp .icon-shape,#mermaid-itumapggivp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-itumapggivp .icon-shape p,#mermaid-itumapggivp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-itumapggivp .icon-shape rect,#mermaid-itumapggivp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-itumapggivp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-itumapggivp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-itumapggivp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

contracts/src/ Source Files

forge build

contracts/out/ Compiled ABIs & Bytecode

contracts/cache/ Compiler Cache

forge script

contracts/broadcast/ Deployment Logs

.gitignore excludes

Sources:[contracts/.gitignore#1-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L1-L15)

#### `contracts/out/`

Contains compiled contract artifacts generated by `forge build`:

- JSON files with ABI definitions
- Bytecode for deployment
- Metadata and source mappings

Excluded by:[contracts/.gitignore#3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L3-L3)

#### `contracts/cache/`

Stores Solidity compiler cache to speed up incremental builds. This directory is managed entirely by Foundry and should not be committed.

Excluded by:[contracts/.gitignore#2](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L2-L2)

#### `contracts/broadcast/`

Contains deployment transaction logs created by `forge script`. These files record:

- Deployment transaction hashes
- Deployed contract addresses
- Block numbers and timestamps
- Full transaction receipts

The broadcast logs provide an audit trail but are excluded from git as they contain network-specific deployment artifacts. For current deployed addresses, see [Deployed Contract Addresses](#5.3).

Excluded by:[contracts/.gitignore#6](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L6-L6)

## Frontend Directory StructureLink copied!

The `frontend/` directory contains the Next.js dashboard for monitoring the Aegis system:

### Source Code (`frontend/src/`)Link copied!

Contains React/TypeScript components, pages, and application logic. The dashboard provides:

- Guardian reputation statistics
- Panic mode status monitoring
- Pool health metrics
- Intervention history

For implementation details, see [Frontend Dashboard](#4.2).

### Build Artifacts (Excluded from Git)Link copied!

#mermaid-ridd5xx0xmc{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ridd5xx0xmc .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ridd5xx0xmc .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ridd5xx0xmc .error-icon{fill:#a44141;}#mermaid-ridd5xx0xmc .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ridd5xx0xmc .edge-thickness-normal{stroke-width:1px;}#mermaid-ridd5xx0xmc .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ridd5xx0xmc .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ridd5xx0xmc .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ridd5xx0xmc .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ridd5xx0xmc .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ridd5xx0xmc .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ridd5xx0xmc .marker.cross{stroke:lightgrey;}#mermaid-ridd5xx0xmc svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ridd5xx0xmc p{margin:0;}#mermaid-ridd5xx0xmc .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ridd5xx0xmc .cluster-label text{fill:#F9FFFE;}#mermaid-ridd5xx0xmc .cluster-label span{color:#F9FFFE;}#mermaid-ridd5xx0xmc .cluster-label span p{background-color:transparent;}#mermaid-ridd5xx0xmc .label text,#mermaid-ridd5xx0xmc span{fill:#ccc;color:#ccc;}#mermaid-ridd5xx0xmc .node rect,#mermaid-ridd5xx0xmc .node circle,#mermaid-ridd5xx0xmc .node ellipse,#mermaid-ridd5xx0xmc .node polygon,#mermaid-ridd5xx0xmc .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ridd5xx0xmc .rough-node .label text,#mermaid-ridd5xx0xmc .node .label text,#mermaid-ridd5xx0xmc .image-shape .label,#mermaid-ridd5xx0xmc .icon-shape .label{text-anchor:middle;}#mermaid-ridd5xx0xmc .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ridd5xx0xmc .rough-node .label,#mermaid-ridd5xx0xmc .node .label,#mermaid-ridd5xx0xmc .image-shape .label,#mermaid-ridd5xx0xmc .icon-shape .label{text-align:center;}#mermaid-ridd5xx0xmc .node.clickable{cursor:pointer;}#mermaid-ridd5xx0xmc .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ridd5xx0xmc .arrowheadPath{fill:lightgrey;}#mermaid-ridd5xx0xmc .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ridd5xx0xmc .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ridd5xx0xmc .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ridd5xx0xmc .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ridd5xx0xmc .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ridd5xx0xmc .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ridd5xx0xmc .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ridd5xx0xmc .cluster text{fill:#F9FFFE;}#mermaid-ridd5xx0xmc .cluster span{color:#F9FFFE;}#mermaid-ridd5xx0xmc div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ridd5xx0xmc .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ridd5xx0xmc rect.text{fill:none;stroke-width:0;}#mermaid-ridd5xx0xmc .icon-shape,#mermaid-ridd5xx0xmc .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ridd5xx0xmc .icon-shape p,#mermaid-ridd5xx0xmc .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ridd5xx0xmc .icon-shape rect,#mermaid-ridd5xx0xmc .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ridd5xx0xmc .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ridd5xx0xmc .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ridd5xx0xmc :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

frontend/src/ TypeScript Source

next build

frontend/.next/ Next.js Build Output

frontend/out/ Static Export

.gitignore excludes

#### `frontend/.next/`

Contains the Next.js build cache and server-side rendering artifacts. This is the primary output directory for `next build` and includes:

- Compiled pages and components
- Build manifests
- Server bundles

Excluded by:[.gitignore#21](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L21-L21)

#### `frontend/out/`

Contains static HTML export when running `next export`. This directory is used for static site generation if needed.

Excluded by:[.gitignore#22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L22-L22)

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)

## Library Dependencies (`lib/`)Link copied!

The `lib/` directory contains git submodules that provide external dependencies. These are not stored directly in the repository but referenced via [.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitmodules):

SubmoduleRepositoryPurpose`forge-std`foundry-rs/forge-stdTesting utilities and standard library for Foundry tests`uniswap-hooks`openzeppelin/uniswap-hooksUniswap v4 hook interfaces and implementations`hookmate`akshatmittal/hookmateAdditional hook development utilities`system-smart-contracts`Reactive-Network/system-smart-contractsReactive Network SDK and AbstractReactive base contract

These dependencies are managed via git submodules and must be initialized with:

```
git submodule update --init --recursive
```

For detailed information on managing these dependencies, see [Dependencies and Submodules](#6.3).

## Version Control PatternsLink copied!

The repository uses two `.gitignore` files to exclude generated artifacts from version control:

### Root `.gitignore` PatternsLink copied!

The root [.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26) excludes:

PatternPurposeLines`.env`, `.env.local`Environment variables with secrets2-3`.DS_Store`macOS system files4`node_modules/`Node.js dependencies7`dist/`, `out/`, `cache/`, `artifacts/`Generic build outputs10-13`contracts/out/`, `contracts/cache/`, `contracts/broadcast/`Foundry artifacts16-18`frontend/.next/`, `frontend/out/`Next.js build outputs21-22`*.md` (except `README.md`)Markdown documentation25-26

The last rule (`*.md` with exception for `README.md`) excludes all markdown files except the main README, preventing documentation drafts from being committed.

Sources:[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)

### Contracts `.gitignore` PatternsLink copied!

The contracts-specific [contracts/.gitignore#1-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L1-L15) provides additional exclusions:

PatternPurposeLines`cache/`, `out/`Compiler artifacts2-3`broadcast/`Deployment logs6`docs/`Generated documentation9`.env`Environment variables12`node_modules/`Node dependencies15

This file duplicates some patterns from the root `.gitignore` to ensure proper exclusion when working in the `contracts/` subdirectory independently.

Sources:[contracts/.gitignore#1-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L1-L15)

## Build Artifact FlowLink copied!

The following diagram shows how source files flow through the build system to generate artifacts that are excluded from version control:

#mermaid-8ahxbj7dwvy{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-8ahxbj7dwvy .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-8ahxbj7dwvy .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-8ahxbj7dwvy .error-icon{fill:#a44141;}#mermaid-8ahxbj7dwvy .error-text{fill:#ddd;stroke:#ddd;}#mermaid-8ahxbj7dwvy .edge-thickness-normal{stroke-width:1px;}#mermaid-8ahxbj7dwvy .edge-thickness-thick{stroke-width:3.5px;}#mermaid-8ahxbj7dwvy .edge-pattern-solid{stroke-dasharray:0;}#mermaid-8ahxbj7dwvy .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-8ahxbj7dwvy .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-8ahxbj7dwvy .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-8ahxbj7dwvy .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-8ahxbj7dwvy .marker.cross{stroke:lightgrey;}#mermaid-8ahxbj7dwvy svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-8ahxbj7dwvy p{margin:0;}#mermaid-8ahxbj7dwvy .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-8ahxbj7dwvy .cluster-label text{fill:#F9FFFE;}#mermaid-8ahxbj7dwvy .cluster-label span{color:#F9FFFE;}#mermaid-8ahxbj7dwvy .cluster-label span p{background-color:transparent;}#mermaid-8ahxbj7dwvy .label text,#mermaid-8ahxbj7dwvy span{fill:#ccc;color:#ccc;}#mermaid-8ahxbj7dwvy .node rect,#mermaid-8ahxbj7dwvy .node circle,#mermaid-8ahxbj7dwvy .node ellipse,#mermaid-8ahxbj7dwvy .node polygon,#mermaid-8ahxbj7dwvy .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-8ahxbj7dwvy .rough-node .label text,#mermaid-8ahxbj7dwvy .node .label text,#mermaid-8ahxbj7dwvy .image-shape .label,#mermaid-8ahxbj7dwvy .icon-shape .label{text-anchor:middle;}#mermaid-8ahxbj7dwvy .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-8ahxbj7dwvy .rough-node .label,#mermaid-8ahxbj7dwvy .node .label,#mermaid-8ahxbj7dwvy .image-shape .label,#mermaid-8ahxbj7dwvy .icon-shape .label{text-align:center;}#mermaid-8ahxbj7dwvy .node.clickable{cursor:pointer;}#mermaid-8ahxbj7dwvy .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-8ahxbj7dwvy .arrowheadPath{fill:lightgrey;}#mermaid-8ahxbj7dwvy .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-8ahxbj7dwvy .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-8ahxbj7dwvy .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8ahxbj7dwvy .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-8ahxbj7dwvy .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8ahxbj7dwvy .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-8ahxbj7dwvy .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-8ahxbj7dwvy .cluster text{fill:#F9FFFE;}#mermaid-8ahxbj7dwvy .cluster span{color:#F9FFFE;}#mermaid-8ahxbj7dwvy div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-8ahxbj7dwvy .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-8ahxbj7dwvy rect.text{fill:none;stroke-width:0;}#mermaid-8ahxbj7dwvy .icon-shape,#mermaid-8ahxbj7dwvy .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8ahxbj7dwvy .icon-shape p,#mermaid-8ahxbj7dwvy .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-8ahxbj7dwvy .icon-shape rect,#mermaid-8ahxbj7dwvy .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8ahxbj7dwvy .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-8ahxbj7dwvy .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-8ahxbj7dwvy :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Generated Artifacts (Ignored)

Build Process

Source Code (Committed)

excluded by

excluded by

excluded by

excluded by

excluded by

contracts/src/*.sol

contracts/test/*.t.sol

contracts/script/*.s.sol

frontend/src/**/*

foundry.toml

forge build (Solidity compilation)

forge test (Test execution)

forge script (Contract deployment)

next build (Frontend compilation)

contracts/out/ ABIs, bytecode, metadata

contracts/cache/ Compiler cache

contracts/broadcast/ Deployment receipts

frontend/.next/ Built pages

frontend/out/ Static export

contracts/.gitignore

.gitignore

Sources:[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)[contracts/.gitignore#1-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L1-L15)

## Configuration Files at RootLink copied!

The repository root contains several configuration files that define project behavior:

FilePurposeRelated Documentation`foundry.toml`Foundry compiler settings, network RPC endpoints, remappings[Foundry Configuration Reference](#7.1)`.gitmodules`Git submodule definitions for lib/ dependencies[Dependencies and Submodules](#6.3)`.gitignore`Version control exclusion patterns(this section)`package.json`Node.js dependencies for frontend and relayerN/A`.github/workflows/test.yml`CI/CD pipeline configuration[Testing and CI/CD](#6.5)

## Directory Ownership and PurposesLink copied!

The following table summarizes which directories contain source code versus generated artifacts:

DirectoryTypeCommitted to GitGenerated By`contracts/src/`Source✅ YesManual development`contracts/test/`Source✅ YesManual development`contracts/script/`Source✅ YesManual development`contracts/out/`Artifact❌ No`forge build``contracts/cache/`Artifact❌ No`forge build``contracts/broadcast/`Artifact❌ No`forge script``frontend/src/`Source✅ YesManual development`frontend/.next/`Artifact❌ No`next build``frontend/out/`Artifact❌ No`next export``lib/`Dependency✅ Yes (submodules)`git submodule`

This separation ensures that only human-authored source code and configuration is version controlled, while machine-generated artifacts are excluded. The `.gitignore` files enforce this boundary, preventing accidental commits of build outputs.

Sources:[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)[contracts/.gitignore#1-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitignore#L1-L15)