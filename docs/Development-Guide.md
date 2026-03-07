# Development GuideLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

This document provides instructions for setting up a local development environment for Aegis, building the smart contracts, running tests, and understanding the development workflow. This guide covers the prerequisites, quick start process, and the development loop for contributors working on the Aegis codebase.

For detailed information on the monorepo structure, see [Project Structure](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Project Structure) For Foundry installation and configuration, see [Foundry Setup](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Foundry Setup) For dependency management, see [Dependencies and Submodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Dependencies and Submodules) For build system configuration, see [Build System](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Build System) For testing procedures and CI/CD, see [Testing and CI/CD](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Testing and CI/CD) For deployment procedures, see [Deployment](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Deployment)

---

## PrerequisitesLink copied!

The Aegis development environment requires the following tools:

ToolPurposeInstallationFoundrySolidity compilation, testing, deployment`curl -L https://foundry.paradigm.xyz | bash && foundryup`GitVersion control with submodulesStandard package managerNode.jsFrontend development (optional)v18+ recommended

The core contract development uses Foundry exclusively. The Solidity compiler version is `0.8.26` with Cancun EVM features enabled, as specified in [contracts/foundry.toml#8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L8-L8) All source contracts are located in [contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/src/)

Sources: [contracts/foundry.toml#8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L8-L8)[contracts/README.md#1-5](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L5)

---

## Environment SetupLink copied!

### 1. Clone RepositoryLink copied!

```
git clone https://github.com/HACK3R-CRYPTO/Aegis
cd Aegis
```

### 2. Initialize SubmodulesLink copied!

Aegis uses Git submodules for external dependencies. Initialize them:

```
git submodule update --init --recursive
```

This fetches the following critical dependencies defined in [.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitmodules):

- `lib/system-smart-contracts` - Reactive Network SDK for `AbstractReactive` base class
- `lib/uniswap-hooks` - Uniswap v4 core interfaces and periphery contracts
- `lib/forge-std` - Foundry standard testing library (`Test`, `console2`, `Vm`)

Sources: [.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitmodules)[contracts/README.md#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L58)

### 3. Configure Environment VariablesLink copied!

Create a `.env` file in the `contracts/` directory. The `.gitignore` file excludes `.env` and `.env.local` from version control [.gitignore#2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L2-L3)

Required variables for deployment scripts ([script/04_DeployOracle.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/script/04_DeployOracle.s.sol)[script/05_DeploySentinel.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/script/05_DeploySentinel.s.sol)[script/06_DeployHook.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/script/06_DeployHook.s.sol)):

```
# Private key for deployment transactions
PRIVATE_KEY=0x...
 
# RPC endpoints (if not using foundry.toml defaults)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/...
REACTIVE_RPC_URL=https://lasna-rpc.rnk.dev/
UNICHAIN_RPC_URL=https://unichain-sepolia-rpc.publicnode.com
 
# Optional: Etherscan API keys for verification
ETHERSCAN_API_KEY=...
```

Security Note: Never commit private keys. The `.gitignore` configuration at [.gitignore#2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L2-L3) ensures environment files are excluded from Git tracking.

Sources: [.gitignore#2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L2-L3)[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)

---

## Quick Start WorkflowLink copied!

The development workflow follows a standard edit-build-test cycle:

#mermaid-3mf7bjaqeit{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-3mf7bjaqeit .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-3mf7bjaqeit .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-3mf7bjaqeit .error-icon{fill:#a44141;}#mermaid-3mf7bjaqeit .error-text{fill:#ddd;stroke:#ddd;}#mermaid-3mf7bjaqeit .edge-thickness-normal{stroke-width:1px;}#mermaid-3mf7bjaqeit .edge-thickness-thick{stroke-width:3.5px;}#mermaid-3mf7bjaqeit .edge-pattern-solid{stroke-dasharray:0;}#mermaid-3mf7bjaqeit .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-3mf7bjaqeit .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-3mf7bjaqeit .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-3mf7bjaqeit .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-3mf7bjaqeit .marker.cross{stroke:lightgrey;}#mermaid-3mf7bjaqeit svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-3mf7bjaqeit p{margin:0;}#mermaid-3mf7bjaqeit .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-3mf7bjaqeit .cluster-label text{fill:#F9FFFE;}#mermaid-3mf7bjaqeit .cluster-label span{color:#F9FFFE;}#mermaid-3mf7bjaqeit .cluster-label span p{background-color:transparent;}#mermaid-3mf7bjaqeit .label text,#mermaid-3mf7bjaqeit span{fill:#ccc;color:#ccc;}#mermaid-3mf7bjaqeit .node rect,#mermaid-3mf7bjaqeit .node circle,#mermaid-3mf7bjaqeit .node ellipse,#mermaid-3mf7bjaqeit .node polygon,#mermaid-3mf7bjaqeit .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-3mf7bjaqeit .rough-node .label text,#mermaid-3mf7bjaqeit .node .label text,#mermaid-3mf7bjaqeit .image-shape .label,#mermaid-3mf7bjaqeit .icon-shape .label{text-anchor:middle;}#mermaid-3mf7bjaqeit .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-3mf7bjaqeit .rough-node .label,#mermaid-3mf7bjaqeit .node .label,#mermaid-3mf7bjaqeit .image-shape .label,#mermaid-3mf7bjaqeit .icon-shape .label{text-align:center;}#mermaid-3mf7bjaqeit .node.clickable{cursor:pointer;}#mermaid-3mf7bjaqeit .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-3mf7bjaqeit .arrowheadPath{fill:lightgrey;}#mermaid-3mf7bjaqeit .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-3mf7bjaqeit .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-3mf7bjaqeit .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3mf7bjaqeit .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-3mf7bjaqeit .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3mf7bjaqeit .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-3mf7bjaqeit .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-3mf7bjaqeit .cluster text{fill:#F9FFFE;}#mermaid-3mf7bjaqeit .cluster span{color:#F9FFFE;}#mermaid-3mf7bjaqeit div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-3mf7bjaqeit .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-3mf7bjaqeit rect.text{fill:none;stroke-width:0;}#mermaid-3mf7bjaqeit .icon-shape,#mermaid-3mf7bjaqeit .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3mf7bjaqeit .icon-shape p,#mermaid-3mf7bjaqeit .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-3mf7bjaqeit .icon-shape rect,#mermaid-3mf7bjaqeit .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3mf7bjaqeit .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-3mf7bjaqeit .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-3mf7bjaqeit :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Yes

No

Edit Contracts src/*.sol

forge build

forge test

Tests Pass?

Deploy (Optional) forge script

Debug Failures

Complete

Sources: [contracts/README.md#74-82](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L74-L82)[contracts/foundry.toml#1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L16)

### Build ContractsLink copied!

Navigate to the contracts directory and compile:

```
cd contracts
forge build
```

This compiles all contracts in [contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/src/) and outputs artifacts to [contracts/out/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/out/) Build artifacts are excluded from version control at [.gitignore#16-17](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L16-L17)

Compiler Settings: The build uses `via_ir = true` at [contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16) for optimizer improvements, which is required for complex contracts like `AegisHook.sol` that integrate Uniswap v4 hooks and `AegisSentinel.sol` that extend Reactive Network contracts.

Sources: [contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16)[.gitignore#16-17](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L16-L17)[contracts/README.md#74-77](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L74-L77)

### Run TestsLink copied!

Execute the test suite:

```
forge test -vv
```

For specific test contracts (e.g., [test/AegisIntegrationTest.t.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/test/AegisIntegrationTest.t.sol)):

```
forge test --match-contract AegisIntegrationTest -vv
```

The `-vv` flag provides verbose output showing function calls and events. For more verbosity levels, see [Testing and CI/CD](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Testing and CI/CD)

Sources: [contracts/README.md#80-82](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L80-L82)

---

## Development LoopLink copied!

### Typical Development SessionLink copied!

Title: Contract Modification Workflow

The standard development cycle for modifying Aegis smart contracts:

"Sepolia/Reactive/Unichain""test/*.t.sol""forge CLI""Code Editor""Developer""Sepolia/Reactive/Unichain""test/*.t.sol""forge CLI""Code Editor""Developer"#mermaid-s03uguflqtl{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-s03uguflqtl .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-s03uguflqtl .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-s03uguflqtl .error-icon{fill:#a44141;}#mermaid-s03uguflqtl .error-text{fill:#ddd;stroke:#ddd;}#mermaid-s03uguflqtl .edge-thickness-normal{stroke-width:1px;}#mermaid-s03uguflqtl .edge-thickness-thick{stroke-width:3.5px;}#mermaid-s03uguflqtl .edge-pattern-solid{stroke-dasharray:0;}#mermaid-s03uguflqtl .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-s03uguflqtl .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-s03uguflqtl .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-s03uguflqtl .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-s03uguflqtl .marker.cross{stroke:lightgrey;}#mermaid-s03uguflqtl svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-s03uguflqtl p{margin:0;}#mermaid-s03uguflqtl .actor{stroke:#ccc;fill:#1f2020;}#mermaid-s03uguflqtl text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-s03uguflqtl .actor-line{stroke:#ccc;}#mermaid-s03uguflqtl .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-s03uguflqtl .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-s03uguflqtl .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-s03uguflqtl #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-s03uguflqtl .sequenceNumber{fill:black;}#mermaid-s03uguflqtl #sequencenumber{fill:lightgrey;}#mermaid-s03uguflqtl #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-s03uguflqtl .messageText{fill:lightgrey;stroke:none;}#mermaid-s03uguflqtl .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-s03uguflqtl .labelText,#mermaid-s03uguflqtl .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-s03uguflqtl .loopText,#mermaid-s03uguflqtl .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-s03uguflqtl .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-s03uguflqtl .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-s03uguflqtl .noteText,#mermaid-s03uguflqtl .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-s03uguflqtl .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-s03uguflqtl .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-s03uguflqtl .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-s03uguflqtl .actorPopupMenu{position:absolute;}#mermaid-s03uguflqtl .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-s03uguflqtl .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-s03uguflqtl .actor-man circle,#mermaid-s03uguflqtl line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-s03uguflqtl :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"Edit contracts/src/AegisHook.sol"1"forge build"2"Compilation: out/AegisHook.sol/AegisHook.json"3"forge test --match-contract AegisIntegrationTest"4"Execute test/AegisIntegrationTest.t.sol"5"4/4 tests passed"6"Test Results"7"forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia"8"Deploy via CREATE2"9"Transaction: broadcast/06_DeployHook.s.sol/1301/run-latest.json"10"Contract Address: 0x1E2a...8080"11

Sources: [contracts/README.md#74-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L74-L122)[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)

### File System OrganizationLink copied!

Title: Aegis Repository Structure

The repository follows a monorepo structure with source contracts, tests, and deployment scripts separated:

#mermaid-0yc4uy9zv69{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-0yc4uy9zv69 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-0yc4uy9zv69 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-0yc4uy9zv69 .error-icon{fill:#a44141;}#mermaid-0yc4uy9zv69 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-0yc4uy9zv69 .edge-thickness-normal{stroke-width:1px;}#mermaid-0yc4uy9zv69 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-0yc4uy9zv69 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-0yc4uy9zv69 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-0yc4uy9zv69 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-0yc4uy9zv69 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-0yc4uy9zv69 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-0yc4uy9zv69 .marker.cross{stroke:lightgrey;}#mermaid-0yc4uy9zv69 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-0yc4uy9zv69 p{margin:0;}#mermaid-0yc4uy9zv69 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-0yc4uy9zv69 .cluster-label text{fill:#F9FFFE;}#mermaid-0yc4uy9zv69 .cluster-label span{color:#F9FFFE;}#mermaid-0yc4uy9zv69 .cluster-label span p{background-color:transparent;}#mermaid-0yc4uy9zv69 .label text,#mermaid-0yc4uy9zv69 span{fill:#ccc;color:#ccc;}#mermaid-0yc4uy9zv69 .node rect,#mermaid-0yc4uy9zv69 .node circle,#mermaid-0yc4uy9zv69 .node ellipse,#mermaid-0yc4uy9zv69 .node polygon,#mermaid-0yc4uy9zv69 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-0yc4uy9zv69 .rough-node .label text,#mermaid-0yc4uy9zv69 .node .label text,#mermaid-0yc4uy9zv69 .image-shape .label,#mermaid-0yc4uy9zv69 .icon-shape .label{text-anchor:middle;}#mermaid-0yc4uy9zv69 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-0yc4uy9zv69 .rough-node .label,#mermaid-0yc4uy9zv69 .node .label,#mermaid-0yc4uy9zv69 .image-shape .label,#mermaid-0yc4uy9zv69 .icon-shape .label{text-align:center;}#mermaid-0yc4uy9zv69 .node.clickable{cursor:pointer;}#mermaid-0yc4uy9zv69 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-0yc4uy9zv69 .arrowheadPath{fill:lightgrey;}#mermaid-0yc4uy9zv69 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-0yc4uy9zv69 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-0yc4uy9zv69 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-0yc4uy9zv69 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-0yc4uy9zv69 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-0yc4uy9zv69 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-0yc4uy9zv69 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-0yc4uy9zv69 .cluster text{fill:#F9FFFE;}#mermaid-0yc4uy9zv69 .cluster span{color:#F9FFFE;}#mermaid-0yc4uy9zv69 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-0yc4uy9zv69 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-0yc4uy9zv69 rect.text{fill:none;stroke-width:0;}#mermaid-0yc4uy9zv69 .icon-shape,#mermaid-0yc4uy9zv69 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-0yc4uy9zv69 .icon-shape p,#mermaid-0yc4uy9zv69 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-0yc4uy9zv69 .icon-shape rect,#mermaid-0yc4uy9zv69 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-0yc4uy9zv69 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-0yc4uy9zv69 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-0yc4uy9zv69 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

excludes

excludes

excludes

Aegis Repository

contracts/

frontend/

lib/

Config Files

src/

test/

script/

foundry.toml

out/ (ignored)

cache/ (ignored)

broadcast/ (ignored)

AegisHook.sol Uniswap v4 Hook

AegisSentinel.sol Reactive Contract

MockOracle.sol Price Feed Simulator

AegisGuardianRegistry.sol ERC-721 + ERC-8004

AegisIntegrationTest.t.sol Cross-chain Tests

04_DeployOracle.s.sol Sepolia Deployment

05_DeploySentinel.s.sol Reactive Deployment

06_DeployHook.s.sol Unichain Deployment

forge-std/ Test.sol, Vm.sol

uniswap-hooks/ v4-core, v4-periphery

system-smart-contracts/ AbstractReactive.sol

.gitignore

.gitmodules

foundry.lock

For detailed directory structure documentation, see [Project Structure](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Project Structure)

Sources: [.gitignore#15-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L15-L18)[contracts/README.md#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L58)[contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)

### Build ArtifactsLink copied!

The Foundry build system generates several output directories:

DirectoryPurposeContentsVersion Control`contracts/out/`Compiled bytecode and ABIs`*.sol/*.json` files with bytecode, ABI, metadataExcluded at [.gitignore#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L16-L16)`contracts/cache/`Compiler cache for faster rebuildsSolidity compiler cacheExcluded at [.gitignore#17](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L17-L17)`contracts/broadcast/`Deployment transaction logs`<script>/<chainId>/run-latest.json` filesExcluded at [.gitignore#18](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L18-L18)

These directories are automatically created during `forge build` and deployment scripts. They should not be committed to version control.

Sources: [.gitignore#16-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L16-L18)[contracts/README.md#74-77](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L74-L77)

---

## Contract RemappingsLink copied!

Title: Foundry Import Resolution

Foundry uses remappings defined at [contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14) to resolve imports from external libraries:

#mermaid-pqvry0ha8l{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-pqvry0ha8l .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-pqvry0ha8l .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-pqvry0ha8l .error-icon{fill:#a44141;}#mermaid-pqvry0ha8l .error-text{fill:#ddd;stroke:#ddd;}#mermaid-pqvry0ha8l .edge-thickness-normal{stroke-width:1px;}#mermaid-pqvry0ha8l .edge-thickness-thick{stroke-width:3.5px;}#mermaid-pqvry0ha8l .edge-pattern-solid{stroke-dasharray:0;}#mermaid-pqvry0ha8l .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-pqvry0ha8l .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-pqvry0ha8l .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-pqvry0ha8l .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-pqvry0ha8l .marker.cross{stroke:lightgrey;}#mermaid-pqvry0ha8l svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-pqvry0ha8l p{margin:0;}#mermaid-pqvry0ha8l .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-pqvry0ha8l .cluster-label text{fill:#F9FFFE;}#mermaid-pqvry0ha8l .cluster-label span{color:#F9FFFE;}#mermaid-pqvry0ha8l .cluster-label span p{background-color:transparent;}#mermaid-pqvry0ha8l .label text,#mermaid-pqvry0ha8l span{fill:#ccc;color:#ccc;}#mermaid-pqvry0ha8l .node rect,#mermaid-pqvry0ha8l .node circle,#mermaid-pqvry0ha8l .node ellipse,#mermaid-pqvry0ha8l .node polygon,#mermaid-pqvry0ha8l .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-pqvry0ha8l .rough-node .label text,#mermaid-pqvry0ha8l .node .label text,#mermaid-pqvry0ha8l .image-shape .label,#mermaid-pqvry0ha8l .icon-shape .label{text-anchor:middle;}#mermaid-pqvry0ha8l .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-pqvry0ha8l .rough-node .label,#mermaid-pqvry0ha8l .node .label,#mermaid-pqvry0ha8l .image-shape .label,#mermaid-pqvry0ha8l .icon-shape .label{text-align:center;}#mermaid-pqvry0ha8l .node.clickable{cursor:pointer;}#mermaid-pqvry0ha8l .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-pqvry0ha8l .arrowheadPath{fill:lightgrey;}#mermaid-pqvry0ha8l .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-pqvry0ha8l .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-pqvry0ha8l .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-pqvry0ha8l .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-pqvry0ha8l .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-pqvry0ha8l .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-pqvry0ha8l .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-pqvry0ha8l .cluster text{fill:#F9FFFE;}#mermaid-pqvry0ha8l .cluster span{color:#F9FFFE;}#mermaid-pqvry0ha8l div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-pqvry0ha8l .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-pqvry0ha8l rect.text{fill:none;stroke-width:0;}#mermaid-pqvry0ha8l .icon-shape,#mermaid-pqvry0ha8l .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-pqvry0ha8l .icon-shape p,#mermaid-pqvry0ha8l .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-pqvry0ha8l .icon-shape rect,#mermaid-pqvry0ha8l .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-pqvry0ha8l .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-pqvry0ha8l .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-pqvry0ha8l :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Actual File Locations

foundry.toml Remappings

Contract Import Statements

import 'reactive-lib/AbstractReactive.sol'

import 'system-smart-contracts/...'

import 'v4-core/interfaces/IHooks.sol'

import 'v4-periphery/...'

reactive-lib/=lib/system-smart-contracts/ lib/reactive-lib/src/

system-smart-contracts/=lib/ system-smart-contracts/src/

v4-core/=lib/uniswap-hooks/ lib/v4-core/

v4-periphery/=lib/uniswap-hooks/ lib/v4-periphery/

lib/system-smart-contracts/lib/ reactive-lib/src/AbstractReactive.sol

lib/system-smart-contracts/src/...

lib/uniswap-hooks/lib/v4-core/ interfaces/IHooks.sol

lib/uniswap-hooks/lib/ v4-periphery/...

Example Usage in `AegisSentinel.sol`:

```
import {AbstractReactive} from "system-smart-contracts/AbstractReactive.sol";
```

This import statement resolves to `lib/system-smart-contracts/src/AbstractReactive.sol` via the remapping rule.

Example Usage in `AegisHook.sol`:

```
import {IHooks} from "v4-core/interfaces/IHooks.sol";
```

This resolves to `lib/uniswap-hooks/lib/v4-core/interfaces/IHooks.sol`.

For detailed dependency management, see [Dependencies and Submodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Dependencies and Submodules)

Sources: [contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14)

---

## Deployment SequenceLink copied!

Title: Multi-Chain Deployment Order

Deployment follows a strict ordering due to cross-contract dependencies:

#mermaid-z3b051gvkfs{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-z3b051gvkfs .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-z3b051gvkfs .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-z3b051gvkfs .error-icon{fill:#a44141;}#mermaid-z3b051gvkfs .error-text{fill:#ddd;stroke:#ddd;}#mermaid-z3b051gvkfs .edge-thickness-normal{stroke-width:1px;}#mermaid-z3b051gvkfs .edge-thickness-thick{stroke-width:3.5px;}#mermaid-z3b051gvkfs .edge-pattern-solid{stroke-dasharray:0;}#mermaid-z3b051gvkfs .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-z3b051gvkfs .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-z3b051gvkfs .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-z3b051gvkfs .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-z3b051gvkfs .marker.cross{stroke:lightgrey;}#mermaid-z3b051gvkfs svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-z3b051gvkfs p{margin:0;}#mermaid-z3b051gvkfs .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-z3b051gvkfs .cluster-label text{fill:#F9FFFE;}#mermaid-z3b051gvkfs .cluster-label span{color:#F9FFFE;}#mermaid-z3b051gvkfs .cluster-label span p{background-color:transparent;}#mermaid-z3b051gvkfs .label text,#mermaid-z3b051gvkfs span{fill:#ccc;color:#ccc;}#mermaid-z3b051gvkfs .node rect,#mermaid-z3b051gvkfs .node circle,#mermaid-z3b051gvkfs .node ellipse,#mermaid-z3b051gvkfs .node polygon,#mermaid-z3b051gvkfs .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-z3b051gvkfs .rough-node .label text,#mermaid-z3b051gvkfs .node .label text,#mermaid-z3b051gvkfs .image-shape .label,#mermaid-z3b051gvkfs .icon-shape .label{text-anchor:middle;}#mermaid-z3b051gvkfs .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-z3b051gvkfs .rough-node .label,#mermaid-z3b051gvkfs .node .label,#mermaid-z3b051gvkfs .image-shape .label,#mermaid-z3b051gvkfs .icon-shape .label{text-align:center;}#mermaid-z3b051gvkfs .node.clickable{cursor:pointer;}#mermaid-z3b051gvkfs .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-z3b051gvkfs .arrowheadPath{fill:lightgrey;}#mermaid-z3b051gvkfs .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-z3b051gvkfs .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-z3b051gvkfs .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-z3b051gvkfs .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-z3b051gvkfs .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-z3b051gvkfs .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-z3b051gvkfs .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-z3b051gvkfs .cluster text{fill:#F9FFFE;}#mermaid-z3b051gvkfs .cluster span{color:#F9FFFE;}#mermaid-z3b051gvkfs div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-z3b051gvkfs .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-z3b051gvkfs rect.text{fill:none;stroke-width:0;}#mermaid-z3b051gvkfs .icon-shape,#mermaid-z3b051gvkfs .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-z3b051gvkfs .icon-shape p,#mermaid-z3b051gvkfs .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-z3b051gvkfs .icon-shape rect,#mermaid-z3b051gvkfs .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-z3b051gvkfs .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-z3b051gvkfs .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-z3b051gvkfs :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Step 3: Unichain Sepolia (Chain 1301)

Step 2: Reactive Network Lasna (Chain 5318007)

Step 1: Ethereum Sepolia (Chain 11155111)

Start Deployment

script/04_DeployOracle.s.sol

Deploy MockOracle.sol

Address: 0x1392C38921A818cEdb100cC3767e8f30deC3a7D8

script/05_DeploySentinel.s.sol

Deploy AegisSentinel.sol Constructor: (oracleAddress)

Manual: Call subscribe() function

Address: 0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6

script/06_DeployHook.s.sol

Mine CREATE2 salt for 0x80... address (BEFORE_SWAP_FLAG requirement)

Deploy AegisHook.sol via CREATE2

Address: 0x1E2aE114cF3B63779A1367eD704ccA51a0218080

Deployment Complete

Important Notes:

- Scripts are numbered sequentially (04, 05, 06) to indicate required execution order
- `AegisSentinel` constructor requires the deployed `MockOracle` address
- `AegisHook` requires CREATE2 salt mining to generate an address starting with `0x80` (Uniswap v4 `BEFORE_SWAP_FLAG` requirement)
- Manual `subscribe()` call required on Sentinel after deployment to begin listening to L1 events

For complete deployment instructions, see [Deployment Scripts](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Deployment Scripts) and [Network Configuration](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Network Configuration)

Sources: [contracts/README.md#99-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L122)

### Deployment CommandsLink copied!

Oracle (Sepolia):

```
cd contracts
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast --verify
```

Sentinel (Reactive Lasna):

```
forge script script/05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacy
```

Note: The `--legacy` flag is required for Reactive Network compatibility. Manual `subscribe()` call required after deployment.

Hook (Unichain):

```
forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcast
```

The deployment scripts read constructor arguments from the broadcast logs of previous deployments. Each deployment generates a JSON log file at `broadcast/<script>/<chainId>/run-latest.json`.

For complete deployment instructions, see [Deployment Scripts](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Deployment Scripts) For network-specific configuration, see [Network Configuration](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Network Configuration) For deployed addresses, see [Deployed Contract Addresses](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Deployed Contract Addresses)

Sources: [contracts/README.md#106-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L106-L122)

---

## RPC Endpoint ConfigurationLink copied!

The RPC endpoints for each network are configured in [contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22):

Network NameChain IDRPC EndpointContract Deployed`sepolia`11155111`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}``MockOracle.sol``reactive`5318007`https://lasna-rpc.rnk.dev/``AegisSentinel.sol``unichain_sepolia`1301`https://unichain-sepolia-rpc.publicnode.com``AegisHook.sol`

These network names are used with the `--rpc-url` flag in deployment commands:

```
forge script <script_path> --rpc-url sepolia --broadcast
```

The `[rpc_endpoints]` section at [contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22) maps these network names to their RPC URLs.

Sources: [contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)[contracts/README.md#99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L103)

---

## Foundry ConfigurationLink copied!

Title: foundry.toml Configuration Structure

The [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml) file controls compilation and deployment behavior:

#mermaid-y8dya3sgrvr{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-y8dya3sgrvr .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-y8dya3sgrvr .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-y8dya3sgrvr .error-icon{fill:#a44141;}#mermaid-y8dya3sgrvr .error-text{fill:#ddd;stroke:#ddd;}#mermaid-y8dya3sgrvr .edge-thickness-normal{stroke-width:1px;}#mermaid-y8dya3sgrvr .edge-thickness-thick{stroke-width:3.5px;}#mermaid-y8dya3sgrvr .edge-pattern-solid{stroke-dasharray:0;}#mermaid-y8dya3sgrvr .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-y8dya3sgrvr .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-y8dya3sgrvr .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-y8dya3sgrvr .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-y8dya3sgrvr .marker.cross{stroke:lightgrey;}#mermaid-y8dya3sgrvr svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-y8dya3sgrvr p{margin:0;}#mermaid-y8dya3sgrvr .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-y8dya3sgrvr .cluster-label text{fill:#F9FFFE;}#mermaid-y8dya3sgrvr .cluster-label span{color:#F9FFFE;}#mermaid-y8dya3sgrvr .cluster-label span p{background-color:transparent;}#mermaid-y8dya3sgrvr .label text,#mermaid-y8dya3sgrvr span{fill:#ccc;color:#ccc;}#mermaid-y8dya3sgrvr .node rect,#mermaid-y8dya3sgrvr .node circle,#mermaid-y8dya3sgrvr .node ellipse,#mermaid-y8dya3sgrvr .node polygon,#mermaid-y8dya3sgrvr .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-y8dya3sgrvr .rough-node .label text,#mermaid-y8dya3sgrvr .node .label text,#mermaid-y8dya3sgrvr .image-shape .label,#mermaid-y8dya3sgrvr .icon-shape .label{text-anchor:middle;}#mermaid-y8dya3sgrvr .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-y8dya3sgrvr .rough-node .label,#mermaid-y8dya3sgrvr .node .label,#mermaid-y8dya3sgrvr .image-shape .label,#mermaid-y8dya3sgrvr .icon-shape .label{text-align:center;}#mermaid-y8dya3sgrvr .node.clickable{cursor:pointer;}#mermaid-y8dya3sgrvr .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-y8dya3sgrvr .arrowheadPath{fill:lightgrey;}#mermaid-y8dya3sgrvr .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-y8dya3sgrvr .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-y8dya3sgrvr .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-y8dya3sgrvr .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-y8dya3sgrvr .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-y8dya3sgrvr .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-y8dya3sgrvr .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-y8dya3sgrvr .cluster text{fill:#F9FFFE;}#mermaid-y8dya3sgrvr .cluster span{color:#F9FFFE;}#mermaid-y8dya3sgrvr div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-y8dya3sgrvr .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-y8dya3sgrvr rect.text{fill:none;stroke-width:0;}#mermaid-y8dya3sgrvr .icon-shape,#mermaid-y8dya3sgrvr .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-y8dya3sgrvr .icon-shape p,#mermaid-y8dya3sgrvr .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-y8dya3sgrvr .icon-shape rect,#mermaid-y8dya3sgrvr .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-y8dya3sgrvr .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-y8dya3sgrvr .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-y8dya3sgrvr :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

contracts/foundry.toml

[profile.default] Lines 1-17

[rpc_endpoints] Lines 19-22

[lint] Lines 24-27

solc_version = '0.8.26' Line 8

evm_version = 'cancun' Line 3

via_ir = true Line 16

ffi = true Line 4

bytecode_hash = 'none' Line 2

cbor_metadata = false Line 6

remappings = [4 entries] Lines 9-14

sepolia = alchemy URL

reactive = lasna-rpc.rnk.dev

unichain_sepolia = publicnode

exclude_lints

lint_on_build = false

For complete Foundry configuration reference, see [Foundry Configuration Reference](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Foundry Configuration Reference)

Sources: [contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)

### Key Configuration SettingsLink copied!

SettingLocationValuePurpose`solc_version`[contracts/foundry.toml#8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L8-L8)`"0.8.26"`Solidity compiler version`evm_version`[contracts/foundry.toml#3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L3-L3)`"cancun"`Enables Cancun EVM opcodes (TSTORE, TLOAD, etc.)`via_ir`[contracts/foundry.toml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L16-L16)`true`IR-based optimizer for complex contracts (required for Uniswap v4 hooks)`bytecode_hash`[contracts/foundry.toml#2](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L2-L2)`"none"`Deterministic bytecode for CREATE2 address prediction`cbor_metadata`[contracts/foundry.toml#6](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L6-L6)`false`Excludes CBOR metadata from bytecode`ffi`[contracts/foundry.toml#4](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L4-L4)`true`Allows forge scripts to execute external commands

Why `via_ir = true` is Required:

- `AegisHook.sol` implements Uniswap v4's `IHooks` interface with complex callback logic
- `AegisSentinel.sol` extends `AbstractReactive` with cross-chain messaging
- Without IR optimizer, these contracts exceed EVM contract size limits

Why `bytecode_hash = "none"` is Required:

- `AegisHook` uses CREATE2 deployment to achieve a specific address starting with `0x80`
- Uniswap v4 hook addresses must have specific flag bits set in the address
- Deterministic bytecode allows salt mining to find the correct deployment salt

For detailed build system documentation, see [Build System](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Build System)

Sources: [contracts/foundry.toml#1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L16)

---

## Testing WorkflowLink copied!

The test suite at [test/AegisIntegrationTest.t.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/test/AegisIntegrationTest.t.sol) validates the entire cross-chain system:

Test CaseTest FunctionDescriptionStatusOracle Update`testOracleUpdate()`Updates `MockOracle.setPrice()` on L1✅ PASSAccess Control`testAccessControl()`Confirms only Sentinel can call `AegisHook.setPanicMode()`✅ PASSPanic Trigger`testPanicTrigger()`Triggers `setPanicMode(true)` via Sentinel✅ PASSCircuit Breaker`testCircuitBreaker()`Reverts Uniswap v4 swaps when panic is active✅ PASS

Sources: [contracts/README.md#88-95](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L88-L95)

### Running TestsLink copied!

```
# Run all tests
forge test
 
# Run with verbosity (shows logs)
forge test -vv
 
# Run specific test contract
forge test --match-contract AegisIntegrationTest -vv
 
# Run specific test function
forge test --match-test testCircuitBreaker -vvvv
```

Verbosity levels:

- `-v`: Test results only
- `-vv`: Test results + `console.log()` output from contracts
- `-vvv`: Test results + logs + execution traces
- `-vvvv`: Test results + logs + traces + stack traces
- `-vvvvv`: Test results + logs + traces + stack traces + setup traces

The `console.log()` function is imported from `forge-std/console2.sol` and can be used in contracts during testing.

For detailed testing documentation, see [Testing and CI/CD](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Testing and CI/CD) For forge-std test utilities, see [Forge Standard Library](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Forge Standard Library)

Sources: Foundry documentation conventions

---

## Common Development TasksLink copied!

### Task: Add New ContractLink copied!

1. Create contract file in [contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/src/)
```
touch contracts/src/NewContract.sol
```
2. Write tests in [contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/test/)
```
touch contracts/test/NewContract.t.sol
```
3. Import test utilities: `import {Test} from "forge-std/Test.sol";`
4. Run `forge build` to verify compilation
5. Run `forge test --match-contract NewContract` to verify functionality
6. Create deployment script in [contracts/script/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/script/) if deploying

### Task: Modify Existing ContractLink copied!

1. Edit contract in [contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/src/) (e.g., `AegisHook.sol`)
2. Update tests in [contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/test/) to reflect changes
3. Run `forge build` to check for compilation errors
4. Run `forge test` to verify no regressions
5. Update deployment scripts if constructor or interface changes
6. Update broadcast logs if redeploying

### Task: Debug Test FailuresLink copied!

1. Run test with maximum verbosity:

```
forge test --match-test testCircuitBreaker -vvvvv
```
2. Check console logs and stack traces in output
3. Add `console2.log()` statements in contracts:

```
import {console2} from "forge-std/console2.sol";
console2.log("panicMode value:", panicMode);
```
4. Use forge debugger for interactive debugging:

```
forge test --debug testCircuitBreaker
```
5. Check trace output to see exact opcode execution

### Task: Clean Build ArtifactsLink copied!

```
# Remove all build artifacts and cache
forge clean
 
# Rebuild from scratch
forge build
```

This is useful when:

- Git submodules are updated ([lib/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/lib/) directories)
- Compiler settings in [foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/foundry.toml) are modified
- Cached artifacts are corrupted
- Switching between different Solidity versions

Sources: Standard Foundry workflow patterns

---

## CI/CD IntegrationLink copied!

The repository uses GitHub Actions for continuous integration. On every pull request and push to main branch:

1. Checkout repository with submodules
2. Install Foundry toolchain (`foundryup`)
3. Install dependencies (`forge install` - initializes Git submodules)
4. Compile contracts (`forge build`)
5. Run test suite (`forge test -vvv`)
6. Format check (`forge fmt --check`)

Failed tests or formatting violations block merging. The CI configuration is typically located at `.github/workflows/test.yml`.

Expected CI Workflow Steps:

#mermaid-g041mip6e3i{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-g041mip6e3i .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-g041mip6e3i .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-g041mip6e3i .error-icon{fill:#a44141;}#mermaid-g041mip6e3i .error-text{fill:#ddd;stroke:#ddd;}#mermaid-g041mip6e3i .edge-thickness-normal{stroke-width:1px;}#mermaid-g041mip6e3i .edge-thickness-thick{stroke-width:3.5px;}#mermaid-g041mip6e3i .edge-pattern-solid{stroke-dasharray:0;}#mermaid-g041mip6e3i .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-g041mip6e3i .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-g041mip6e3i .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-g041mip6e3i .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-g041mip6e3i .marker.cross{stroke:lightgrey;}#mermaid-g041mip6e3i svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-g041mip6e3i p{margin:0;}#mermaid-g041mip6e3i .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-g041mip6e3i .cluster-label text{fill:#F9FFFE;}#mermaid-g041mip6e3i .cluster-label span{color:#F9FFFE;}#mermaid-g041mip6e3i .cluster-label span p{background-color:transparent;}#mermaid-g041mip6e3i .label text,#mermaid-g041mip6e3i span{fill:#ccc;color:#ccc;}#mermaid-g041mip6e3i .node rect,#mermaid-g041mip6e3i .node circle,#mermaid-g041mip6e3i .node ellipse,#mermaid-g041mip6e3i .node polygon,#mermaid-g041mip6e3i .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-g041mip6e3i .rough-node .label text,#mermaid-g041mip6e3i .node .label text,#mermaid-g041mip6e3i .image-shape .label,#mermaid-g041mip6e3i .icon-shape .label{text-anchor:middle;}#mermaid-g041mip6e3i .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-g041mip6e3i .rough-node .label,#mermaid-g041mip6e3i .node .label,#mermaid-g041mip6e3i .image-shape .label,#mermaid-g041mip6e3i .icon-shape .label{text-align:center;}#mermaid-g041mip6e3i .node.clickable{cursor:pointer;}#mermaid-g041mip6e3i .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-g041mip6e3i .arrowheadPath{fill:lightgrey;}#mermaid-g041mip6e3i .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-g041mip6e3i .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-g041mip6e3i .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-g041mip6e3i .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-g041mip6e3i .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-g041mip6e3i .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-g041mip6e3i .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-g041mip6e3i .cluster text{fill:#F9FFFE;}#mermaid-g041mip6e3i .cluster span{color:#F9FFFE;}#mermaid-g041mip6e3i div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-g041mip6e3i .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-g041mip6e3i rect.text{fill:none;stroke-width:0;}#mermaid-g041mip6e3i .icon-shape,#mermaid-g041mip6e3i .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-g041mip6e3i .icon-shape p,#mermaid-g041mip6e3i .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-g041mip6e3i .icon-shape rect,#mermaid-g041mip6e3i .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-g041mip6e3i .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-g041mip6e3i .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-g041mip6e3i :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

GitHub Push/PR

actions/checkout@v3 with submodules

Install Foundry foundryup

forge install (init submodules)

forge build

forge test -vvv

forge fmt --check

Result

✓ All Checks Pass

✗ Tests Fail or Format Issues

Allow Merge

Block Merge

For detailed CI/CD configuration and testing procedures, see [Testing and CI/CD](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Testing and CI/CD)

Sources: Standard Foundry CI patterns

---

## Next StepsLink copied!

For specific development topics:

- Understanding the codebase structure: See [Project Structure](#5.1)
- Configuring the build system: See [Build System](#5.2)
- Managing dependencies: See [Dependencies](#5.3)
- Writing and running tests: See [Testing](#5.4)
- Deploying to networks: See [Deployment](#4)
- Contract-specific documentation: See [Smart Contracts](#3)

For contributing to the project, see [Contributing Guidelines](#7.3).

Sources: [contracts/README.md#1-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L122)[contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)