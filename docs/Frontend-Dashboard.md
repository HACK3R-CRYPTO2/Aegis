# Frontend DashboardLink copied!
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore)
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md)

## Purpose and ScopeLink copied!

The Frontend Dashboard is a Next.js application that provides a user interface for monitoring and interacting with the Aegis cross-chain circuit breaker system. The application is located in the `frontend/` directory and connects to deployed smart contracts on Unichain Sepolia and Ethereum Sepolia to display system status and Guardian metrics.

The README references the dashboard at [README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98) with the note "Dashboard setup and feature documentation," indicating that detailed frontend-specific documentation exists in `frontend/README.md`. The dashboard runs concurrently with the Hybrid Relayer service to provide a complete monitoring solution.

This document covers the dashboard's structure based on repository-level configuration and integration patterns. For the fallback relay mechanism that runs alongside the dashboard, see [Hybrid Relayer](#4.1). For deployed contract details, see [Deployed Contract Addresses](#5.3).

Sources:[README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98)[README.md#112-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L112-L122)[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)

## Technology Stack and Project StructureLink copied!

### Framework and LanguageLink copied!

The dashboard is built with Next.js, as indicated by the `.gitignore` exclusions for Next.js-specific build artifacts at [.gitignore#21](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L21-L21) (`frontend/.next/`) and [.gitignore#22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L22-L22) (`frontend/out/`). The README's quick start commands at [README.md#113-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L113-L121) confirm the use of npm as the package manager.

ComponentEvidencePurposeFramework`.gitignore` excludes `frontend/.next/`Next.js application frameworkPackage Manager`npm install`, `npm run dev` commandsNode.js dependency managementDevelopment Server`npm run dev`Local development environmentRelay Service`npm run relay`Hybrid Relayer background process

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)[README.md#113-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L113-L121)

### Build Artifacts and Version ControlLink copied!

The `.gitignore` configuration at [.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22) excludes two frontend-specific directories from version control:

ArtifactLocationDescriptionDevelopment Build`frontend/.next/`Next.js development server cache and compiled pagesStatic Export`frontend/out/`Production static site export (if `next export` is used)

These exclusions indicate that the frontend follows standard Next.js build patterns, where build artifacts are generated locally and not committed to the repository.

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)

### Directory Structure ContextLink copied!

The repository structure shows frontend-related configuration at the root level:

```
aegis/
├── frontend/              # Next.js application directory
│   ├── .next/            # Build artifacts (ignored)
│   └── out/              # Static export (ignored)
├── contracts/            # Foundry smart contracts
├── .gitignore            # Excludes frontend build artifacts
└── README.md             # References frontend/README.md
```

The README at [README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98) states: "[Frontend README](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Frontend README): Dashboard setup and feature documentation," indicating that detailed frontend-specific documentation exists within the `frontend/` directory itself.

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)[README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98)

## Dashboard CapabilitiesLink copied!

The README describes the dashboard as part of a complete monitoring solution that runs alongside the Hybrid Relayer. Based on the system architecture and deployed contracts, the dashboard is designed to interact with the following system components:

### Contract Integration RequirementsLink copied!

The dashboard must connect to three deployed contracts across two networks to display system status:

NetworkContractAddressDashboard PurposeEthereum Sepolia`MockOracle``0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`Monitor price feed dataEthereum SepoliaGuardian Registry*(See deployment docs)*Query Guardian reputation and intervention historyUnichain Sepolia`AegisHook``0x1E2aE114cF3B63779A1367eD704ccA51a0218080`Monitor panic mode state and swap activity

Sources:[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

### System Monitoring FeaturesLink copied!

Based on the Aegis architecture described in [README.md#18-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L18-L33) the dashboard is designed to provide visibility into:

1. Circuit Breaker Status: The `AegisHook` contract's `panicMode` state, which gates swap execution on Unichain
2. Guardian Reputation: The ERC-721 + ERC-8004 reputation scores stored in the Guardian Registry on Ethereum Sepolia
3. Intervention Tracking: Records of "heroic interventions" where Guardians provide liquidity during volatility events
4. VIP Lane Activity: Swap activity from high-reputation Guardians (reputation > 90) during panic mode

The specific implementation details of these features are documented in the `frontend/README.md` file referenced at [README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98)

Sources:[README.md#18-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L18-L33)[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

### Relationship to Core ArchitectureLink copied!

The dashboard serves as the visualization layer for the cross-chain circuit breaker described in Diagram 2 (Cross-Chain Architecture) from the high-level system overview. It displays the outcomes of the following event flow:

1. `MockOracle` emits `PriceUpdate` events on Ethereum Sepolia
2. `AegisSentinel` on Reactive Network detects crashes and triggers panic mode
3. `AegisHook` on Unichain blocks swaps or allows VIP lane access
4. Guardian Registry records interventions and updates reputation
5. Dashboard queries all three networks to display current system state

Sources:[README.md#56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L56-L75) (Architecture diagram)

## Application ArchitectureLink copied!

### High-Level StructureLink copied!

Diagram: Frontend Layer Architecture

#mermaid-fzhc9m6dw3{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-fzhc9m6dw3 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-fzhc9m6dw3 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-fzhc9m6dw3 .error-icon{fill:#a44141;}#mermaid-fzhc9m6dw3 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-fzhc9m6dw3 .edge-thickness-normal{stroke-width:1px;}#mermaid-fzhc9m6dw3 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-fzhc9m6dw3 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-fzhc9m6dw3 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-fzhc9m6dw3 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-fzhc9m6dw3 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-fzhc9m6dw3 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-fzhc9m6dw3 .marker.cross{stroke:lightgrey;}#mermaid-fzhc9m6dw3 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-fzhc9m6dw3 p{margin:0;}#mermaid-fzhc9m6dw3 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-fzhc9m6dw3 .cluster-label text{fill:#F9FFFE;}#mermaid-fzhc9m6dw3 .cluster-label span{color:#F9FFFE;}#mermaid-fzhc9m6dw3 .cluster-label span p{background-color:transparent;}#mermaid-fzhc9m6dw3 .label text,#mermaid-fzhc9m6dw3 span{fill:#ccc;color:#ccc;}#mermaid-fzhc9m6dw3 .node rect,#mermaid-fzhc9m6dw3 .node circle,#mermaid-fzhc9m6dw3 .node ellipse,#mermaid-fzhc9m6dw3 .node polygon,#mermaid-fzhc9m6dw3 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-fzhc9m6dw3 .rough-node .label text,#mermaid-fzhc9m6dw3 .node .label text,#mermaid-fzhc9m6dw3 .image-shape .label,#mermaid-fzhc9m6dw3 .icon-shape .label{text-anchor:middle;}#mermaid-fzhc9m6dw3 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-fzhc9m6dw3 .rough-node .label,#mermaid-fzhc9m6dw3 .node .label,#mermaid-fzhc9m6dw3 .image-shape .label,#mermaid-fzhc9m6dw3 .icon-shape .label{text-align:center;}#mermaid-fzhc9m6dw3 .node.clickable{cursor:pointer;}#mermaid-fzhc9m6dw3 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-fzhc9m6dw3 .arrowheadPath{fill:lightgrey;}#mermaid-fzhc9m6dw3 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-fzhc9m6dw3 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-fzhc9m6dw3 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-fzhc9m6dw3 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-fzhc9m6dw3 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-fzhc9m6dw3 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-fzhc9m6dw3 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-fzhc9m6dw3 .cluster text{fill:#F9FFFE;}#mermaid-fzhc9m6dw3 .cluster span{color:#F9FFFE;}#mermaid-fzhc9m6dw3 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-fzhc9m6dw3 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-fzhc9m6dw3 rect.text{fill:none;stroke-width:0;}#mermaid-fzhc9m6dw3 .icon-shape,#mermaid-fzhc9m6dw3 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-fzhc9m6dw3 .icon-shape p,#mermaid-fzhc9m6dw3 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-fzhc9m6dw3 .icon-shape rect,#mermaid-fzhc9m6dw3 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-fzhc9m6dw3 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-fzhc9m6dw3 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-fzhc9m6dw3 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Deployed Contracts

Build Artifacts (.gitignore)

frontend/ Directory

Defines

Defines

Generates

Exports to

Query State

Query Reputation

Query Price

Monitor Events

Forward Messages

Documents

Documents

Next.js Application npm run dev :3000

relay.ts npm run relay

package.json Scripts & Dependencies

README.md Feature Documentation

frontend/.next/ Development Cache

frontend/out/ Static Export

MockOracle 0x1392...a7D8 Ethereum Sepolia

AegisHook 0x1E2a...8080 Unichain Sepolia

GuardianRegistry Ethereum Sepolia ERC-721 + ERC-8004

The `frontend/` directory contains both the Next.js dashboard application and the `relay.ts` Hybrid Relayer script. Both services are started via npm scripts defined in `package.json` and documented in `frontend/README.md`.

Sources:[README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98)[README.md#113-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L113-L121)[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)

### Deployment to Contract IntegrationLink copied!

Diagram: Contract Query Patterns

#mermaid-bshwunr3kj6{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-bshwunr3kj6 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-bshwunr3kj6 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-bshwunr3kj6 .error-icon{fill:#a44141;}#mermaid-bshwunr3kj6 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-bshwunr3kj6 .edge-thickness-normal{stroke-width:1px;}#mermaid-bshwunr3kj6 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-bshwunr3kj6 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-bshwunr3kj6 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-bshwunr3kj6 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-bshwunr3kj6 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-bshwunr3kj6 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-bshwunr3kj6 .marker.cross{stroke:lightgrey;}#mermaid-bshwunr3kj6 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-bshwunr3kj6 p{margin:0;}#mermaid-bshwunr3kj6 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-bshwunr3kj6 .cluster-label text{fill:#F9FFFE;}#mermaid-bshwunr3kj6 .cluster-label span{color:#F9FFFE;}#mermaid-bshwunr3kj6 .cluster-label span p{background-color:transparent;}#mermaid-bshwunr3kj6 .label text,#mermaid-bshwunr3kj6 span{fill:#ccc;color:#ccc;}#mermaid-bshwunr3kj6 .node rect,#mermaid-bshwunr3kj6 .node circle,#mermaid-bshwunr3kj6 .node ellipse,#mermaid-bshwunr3kj6 .node polygon,#mermaid-bshwunr3kj6 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-bshwunr3kj6 .rough-node .label text,#mermaid-bshwunr3kj6 .node .label text,#mermaid-bshwunr3kj6 .image-shape .label,#mermaid-bshwunr3kj6 .icon-shape .label{text-anchor:middle;}#mermaid-bshwunr3kj6 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-bshwunr3kj6 .rough-node .label,#mermaid-bshwunr3kj6 .node .label,#mermaid-bshwunr3kj6 .image-shape .label,#mermaid-bshwunr3kj6 .icon-shape .label{text-align:center;}#mermaid-bshwunr3kj6 .node.clickable{cursor:pointer;}#mermaid-bshwunr3kj6 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-bshwunr3kj6 .arrowheadPath{fill:lightgrey;}#mermaid-bshwunr3kj6 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-bshwunr3kj6 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-bshwunr3kj6 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-bshwunr3kj6 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-bshwunr3kj6 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-bshwunr3kj6 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-bshwunr3kj6 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-bshwunr3kj6 .cluster text{fill:#F9FFFE;}#mermaid-bshwunr3kj6 .cluster span{color:#F9FFFE;}#mermaid-bshwunr3kj6 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-bshwunr3kj6 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-bshwunr3kj6 rect.text{fill:none;stroke-width:0;}#mermaid-bshwunr3kj6 .icon-shape,#mermaid-bshwunr3kj6 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-bshwunr3kj6 .icon-shape p,#mermaid-bshwunr3kj6 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-bshwunr3kj6 .icon-shape rect,#mermaid-bshwunr3kj6 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-bshwunr3kj6 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-bshwunr3kj6 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-bshwunr3kj6 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (1301)

Ethereum Sepolia (11155111)

Web3 RPC Connections

User Browser

eth_call

eth_call

Returns: price data

Returns: reputation scores

Returns: panicMode state

Dashboard UI localhost:3000

Ethereum Sepolia RPC

Unichain Sepolia RPC

MockOracle 0x1392...a7D8

GuardianRegistry (See deployment docs)

AegisHook 0x1E2a...8080

The dashboard uses standard web3 RPC connections to query read-only state from deployed contracts. Contract addresses are configured according to the deployment table at [README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

Sources:[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

## Deployed Contract AddressesLink copied!

The dashboard must be configured with the following deployed contract addresses to function correctly:

### Contract Address ReferenceLink copied!

ContractNetworkChain IDAddressPurposeMockOracleEthereum Sepolia11155111`0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`Price feed sourceAegisHookUnichain Sepolia1301`0x1E2aE114cF3B63779A1367eD704ccA51a0218080`Panic mode controlAegisSentinelReactive Network Lasna5318007`0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6`Cross-chain orchestrator (not directly queried by dashboard)

The Guardian Registry address is deployed on Ethereum Sepolia but not listed in the README deployment table. See [Guardian Registry](#3.4) for implementation details.

Sources:[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

### Network Configuration RequirementsLink copied!

The dashboard requires RPC endpoint configuration for two networks:

NetworkChain IDRPC PurposeEthereum Sepolia11155111Query `MockOracle` and Guardian RegistryUnichain Sepolia1301Query `AegisHook` panic mode state

RPC endpoint configuration is documented in [Network Configuration](#5.2).

Sources:[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

## Development SetupLink copied!

### Quick Start CommandsLink copied!

The README provides a quick start sequence at [README.md#104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L104-L122) for running the dashboard:

```
# Clone repository
git clone https://github.com/ogazboiz/aegis.git
 
# Navigate to frontend directory
cd aegis/frontend
 
# Install dependencies
npm install
 
# Start the Hybrid Relayer in background
npm run relay &
 
# Start the dashboard development server
npm run dev
 
# Dashboard available at http://localhost:3000
```

Sources:[README.md#104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L104-L122)

### Concurrent Service ExecutionLink copied!

The quick start guide demonstrates that two npm scripts run concurrently:

ScriptCommandPort/ServicePurposeDashboard`npm run dev``http://localhost:3000`Next.js development server with hot reloadRelayer`npm run relay &`Background processHybrid Relayer fallback mechanism (see [Hybrid Relayer](#4.1))

The `&` suffix on `npm run relay &` indicates the relayer runs as a background process, allowing the dashboard to start in the foreground. This architecture ensures both monitoring (dashboard) and fallback message delivery (relayer) operate simultaneously.

Sources:[README.md#116-120](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L120)

### Build Artifact ManagementLink copied!

During development, the Next.js build system generates artifacts in `frontend/.next/`. These files are automatically excluded from version control by the `.gitignore` configuration at [.gitignore#21](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L21-L21):

```
# Frontend
frontend/.next/
frontend/out/
```

The `frontend/out/` directory is also ignored, suggesting the dashboard may support static export via `next export` for production deployment to static hosting services.

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)

## Relationship to Hybrid RelayerLink copied!

### Frontend Layer ComponentsLink copied!

Both the dashboard and Hybrid Relayer are located in the `frontend/` directory and run concurrently via npm scripts. However, they serve distinct purposes in the Aegis monitoring infrastructure:

ComponentLocationScriptOperation TypePurposeDashboard`frontend/``npm run dev`Read-only queriesDisplay system state and metricsHybrid Relayer`frontend/relay.ts``npm run relay`Event monitoring + write transactionsFallback message delivery to L2

Sources:[README.md#116-120](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L120)

### Architectural JustificationLink copied!

The README explains the need for the Hybrid Relayer at [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84):

> Infrastructure Gaps: Reactive Network is an amazing technology, but public testnet relayers for Unichain Sepolia (Chain ID 1301) were not fully stable during the hackathon.
> 
> - The Issue: The `Sentinel` contract on Reactive Network correctly detected events on Sepolia, but the message sometimes got "stuck" because the public relayer node wasn't forwarding it to Unichain fast enough.
> - The Solution: We built a Hybrid Relayer (`relay.ts`) to bridge the gap.

This architectural decision places the relayer in the frontend layer as a development-time fallback mechanism, distinct from the dashboard's visualization purpose.

Sources:[README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

### Operational FlowLink copied!

Diagram: Frontend Layer Responsibilities

#mermaid-hya9tiietit{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-hya9tiietit .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-hya9tiietit .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-hya9tiietit .error-icon{fill:#a44141;}#mermaid-hya9tiietit .error-text{fill:#ddd;stroke:#ddd;}#mermaid-hya9tiietit .edge-thickness-normal{stroke-width:1px;}#mermaid-hya9tiietit .edge-thickness-thick{stroke-width:3.5px;}#mermaid-hya9tiietit .edge-pattern-solid{stroke-dasharray:0;}#mermaid-hya9tiietit .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-hya9tiietit .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-hya9tiietit .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-hya9tiietit .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-hya9tiietit .marker.cross{stroke:lightgrey;}#mermaid-hya9tiietit svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-hya9tiietit p{margin:0;}#mermaid-hya9tiietit .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-hya9tiietit .cluster-label text{fill:#F9FFFE;}#mermaid-hya9tiietit .cluster-label span{color:#F9FFFE;}#mermaid-hya9tiietit .cluster-label span p{background-color:transparent;}#mermaid-hya9tiietit .label text,#mermaid-hya9tiietit span{fill:#ccc;color:#ccc;}#mermaid-hya9tiietit .node rect,#mermaid-hya9tiietit .node circle,#mermaid-hya9tiietit .node ellipse,#mermaid-hya9tiietit .node polygon,#mermaid-hya9tiietit .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-hya9tiietit .rough-node .label text,#mermaid-hya9tiietit .node .label text,#mermaid-hya9tiietit .image-shape .label,#mermaid-hya9tiietit .icon-shape .label{text-anchor:middle;}#mermaid-hya9tiietit .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-hya9tiietit .rough-node .label,#mermaid-hya9tiietit .node .label,#mermaid-hya9tiietit .image-shape .label,#mermaid-hya9tiietit .icon-shape .label{text-align:center;}#mermaid-hya9tiietit .node.clickable{cursor:pointer;}#mermaid-hya9tiietit .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-hya9tiietit .arrowheadPath{fill:lightgrey;}#mermaid-hya9tiietit .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-hya9tiietit .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-hya9tiietit .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-hya9tiietit .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-hya9tiietit .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-hya9tiietit .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-hya9tiietit .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-hya9tiietit .cluster text{fill:#F9FFFE;}#mermaid-hya9tiietit .cluster span{color:#F9FFFE;}#mermaid-hya9tiietit div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-hya9tiietit .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-hya9tiietit rect.text{fill:none;stroke-width:0;}#mermaid-hya9tiietit .icon-shape,#mermaid-hya9tiietit .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-hya9tiietit .icon-shape p,#mermaid-hya9tiietit .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-hya9tiietit .icon-shape rect,#mermaid-hya9tiietit .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-hya9tiietit .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-hya9tiietit .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-hya9tiietit :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (1301)

Ethereum Sepolia (11155111)

Frontend Layer (frontend/)

User Interaction

HTTP GET

eth_call (read)

eth_call (read)

eth_call (read)

Monitor PriceUpdate events

eth_sendTransaction (write)

Display relay status

Browser at localhost:3000

npm run dev Next.js Dashboard READ OPERATIONS

npm run relay relay.ts Script WRITE OPERATIONS

MockOracle 0x1392...a7D8 Emits PriceUpdate

GuardianRegistry Stores Reputation

AegisHook 0x1E2a...8080 Circuit Breaker

The dashboard queries contract state via read-only `eth_call` RPC methods, while the relayer monitors events and submits transactions via `eth_sendTransaction` when the public Reactive Network relayer experiences delays.

Sources:[README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)[README.md#116-120](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L120)[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

### Testnet Stability ContextLink copied!

The README notes at [README.md#84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L84-L84) a reference to deeper documentation: "Deep Dive: Read [Why We Built a Custom Relayer](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/Why We Built a Custom Relayer)" This indicates that the Hybrid Relayer exists specifically to work around testnet infrastructure limitations, not as a permanent production requirement. See [Hybrid Relayer](#4.1) for detailed implementation.

Sources:[README.md#84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L84-L84)

## Deployment ConsiderationsLink copied!

### Static ExportLink copied!

The Next.js application can be built as a static export for decentralized hosting:

```
# Build static files
npm run build
 
# Output location: frontend/out/
```

This produces a fully static site that can be hosted on IPFS, GitHub Pages, or other static hosting services while maintaining full blockchain interaction capabilities through client-side web3 connections.

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)

### Environment ConfigurationLink copied!

Contract addresses and RPC endpoints must be configured to point to the deployed instances on the respective networks (Sepolia, Unichain Sepolia). See [Deployed Contract Addresses](#5.3) for the current deployment addresses referenced by the dashboard.

Sources:[README.md#140-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L140-L142)