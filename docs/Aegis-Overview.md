# Aegis OverviewLink copied!
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore)
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

## Purpose and ScopeLink copied!

This document provides a high-level introduction to the Aegis cross-chain circuit breaker system. It explains the problem Aegis solves, introduces the core smart contracts and their roles, and describes the cross-chain architecture that enables automated liquidity protection on Uniswap v4.

For detailed architectural patterns and design decisions, see [System Architecture](#2). For individual contract specifications, see [Core Smart Contracts](#3). For deployment procedures and network configuration, see [Deployment](#5).

Sources:[README.md#1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L1-L149)

---

## Problem Statement: Loss Versus Rebalancing (LVR)Link copied!

Liquidity Providers on Layer 2 exchanges suffer from Loss Versus Rebalancing (LVR), a form of adverse selection where arbitrage bots exploit stale pool prices during market volatility. When Ethereum mainnet experiences a price crash, arbitrageurs race to L2 chains to trade against Automated Market Maker (AMM) pools before price oracles update, extracting value from LPs through what is known as "toxic flow."

Aegis addresses this by implementing an autonomous circuit breaker that:

1. Monitors price volatility on Ethereum Sepolia (L1) via oracle events
2. Detects crash conditions (e.g., >50% price drop) using the Reactive Network
3. Instantly gates Uniswap v4 pools on Unichain Sepolia (L2) to prevent exploitation
4. Resumes trading automatically when volatility subsides

This architecture leverages Unichain's 250ms Flashblocks to "front-run the front-runners," closing the temporal arbitrage window before toxic flow can drain LP positions.

Sources:[README.md#13-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L13-L22)

---

## System ComponentsLink copied!

Aegis consists of four core smart contracts deployed across three blockchain networks:

ContractFileNetworkAddressRole`MockOracle``contracts/src/MockOracle.sol`Ethereum Sepolia`0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`Price feed source; emits `PriceUpdate` events`AegisSentinel``contracts/src/AegisSentinel.sol`Reactive Lasna`0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6`Event listener; triggers cross-chain actions`AegisHook``contracts/src/AegisHook.sol`Unichain Sepolia`0x1E2aE114cF3B63779A1367eD704ccA51a0218080`Uniswap v4 hook; gates swaps via `beforeSwap``AegisGuardianRegistry``contracts/src/AegisGuardianRegistry.sol`Ethereum SepoliaTBDERC-721 + ERC-8004 identity and reputation registry

Sources:[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)[contracts/README.md#99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L103)

### Component Architecture DiagramLink copied!

#mermaid-3zf2rg77pjl{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-3zf2rg77pjl .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-3zf2rg77pjl .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-3zf2rg77pjl .error-icon{fill:#a44141;}#mermaid-3zf2rg77pjl .error-text{fill:#ddd;stroke:#ddd;}#mermaid-3zf2rg77pjl .edge-thickness-normal{stroke-width:1px;}#mermaid-3zf2rg77pjl .edge-thickness-thick{stroke-width:3.5px;}#mermaid-3zf2rg77pjl .edge-pattern-solid{stroke-dasharray:0;}#mermaid-3zf2rg77pjl .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-3zf2rg77pjl .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-3zf2rg77pjl .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-3zf2rg77pjl .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-3zf2rg77pjl .marker.cross{stroke:lightgrey;}#mermaid-3zf2rg77pjl svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-3zf2rg77pjl p{margin:0;}#mermaid-3zf2rg77pjl .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-3zf2rg77pjl .cluster-label text{fill:#F9FFFE;}#mermaid-3zf2rg77pjl .cluster-label span{color:#F9FFFE;}#mermaid-3zf2rg77pjl .cluster-label span p{background-color:transparent;}#mermaid-3zf2rg77pjl .label text,#mermaid-3zf2rg77pjl span{fill:#ccc;color:#ccc;}#mermaid-3zf2rg77pjl .node rect,#mermaid-3zf2rg77pjl .node circle,#mermaid-3zf2rg77pjl .node ellipse,#mermaid-3zf2rg77pjl .node polygon,#mermaid-3zf2rg77pjl .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-3zf2rg77pjl .rough-node .label text,#mermaid-3zf2rg77pjl .node .label text,#mermaid-3zf2rg77pjl .image-shape .label,#mermaid-3zf2rg77pjl .icon-shape .label{text-anchor:middle;}#mermaid-3zf2rg77pjl .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-3zf2rg77pjl .rough-node .label,#mermaid-3zf2rg77pjl .node .label,#mermaid-3zf2rg77pjl .image-shape .label,#mermaid-3zf2rg77pjl .icon-shape .label{text-align:center;}#mermaid-3zf2rg77pjl .node.clickable{cursor:pointer;}#mermaid-3zf2rg77pjl .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-3zf2rg77pjl .arrowheadPath{fill:lightgrey;}#mermaid-3zf2rg77pjl .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-3zf2rg77pjl .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-3zf2rg77pjl .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3zf2rg77pjl .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-3zf2rg77pjl .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3zf2rg77pjl .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-3zf2rg77pjl .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-3zf2rg77pjl .cluster text{fill:#F9FFFE;}#mermaid-3zf2rg77pjl .cluster span{color:#F9FFFE;}#mermaid-3zf2rg77pjl div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-3zf2rg77pjl .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-3zf2rg77pjl rect.text{fill:none;stroke-width:0;}#mermaid-3zf2rg77pjl .icon-shape,#mermaid-3zf2rg77pjl .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3zf2rg77pjl .icon-shape p,#mermaid-3zf2rg77pjl .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-3zf2rg77pjl .icon-shape rect,#mermaid-3zf2rg77pjl .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3zf2rg77pjl .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-3zf2rg77pjl .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-3zf2rg77pjl :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (Chain ID: 1301)

Reactive Lasna (Chain ID: 5318007)

Ethereum Sepolia (Chain ID: 11155111)

emit PriceUpdate(uint256)

emit NewFeedback(address, uint256)

setPanicMode(bool)

boostReputation(address, uint256)

beforeSwap gate

recordIntervention(address, uint256)

MockOracle.sol 0x1392...a7D8

AegisGuardianRegistry.sol ERC-721 + ERC-8004

AegisSentinel.sol 0x0B6a...b6B6 extends AbstractReactive

AegisHook.sol 0x1E2a...8080 implements BaseHook

Uniswap v4 Pool PoolManager

Sources:[contracts/README.md#8-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L8-L26)[README.md#55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L55-L75)

---

## Core Workflow: Circuit Breaker ActivationLink copied!

The following sequence demonstrates how Aegis responds to a market crash event:

### Cross-Chain Message FlowLink copied!

"User/Trader""AegisHook (Unichain)""AegisSentinel (Reactive)""MockOracle (Sepolia)""User/Trader""AegisHook (Unichain)""AegisSentinel (Reactive)""MockOracle (Sepolia)"#mermaid-senw0rz39fc{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-senw0rz39fc .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-senw0rz39fc .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-senw0rz39fc .error-icon{fill:#a44141;}#mermaid-senw0rz39fc .error-text{fill:#ddd;stroke:#ddd;}#mermaid-senw0rz39fc .edge-thickness-normal{stroke-width:1px;}#mermaid-senw0rz39fc .edge-thickness-thick{stroke-width:3.5px;}#mermaid-senw0rz39fc .edge-pattern-solid{stroke-dasharray:0;}#mermaid-senw0rz39fc .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-senw0rz39fc .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-senw0rz39fc .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-senw0rz39fc .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-senw0rz39fc .marker.cross{stroke:lightgrey;}#mermaid-senw0rz39fc svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-senw0rz39fc p{margin:0;}#mermaid-senw0rz39fc .actor{stroke:#ccc;fill:#1f2020;}#mermaid-senw0rz39fc text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-senw0rz39fc .actor-line{stroke:#ccc;}#mermaid-senw0rz39fc .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-senw0rz39fc .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-senw0rz39fc .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-senw0rz39fc #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-senw0rz39fc .sequenceNumber{fill:black;}#mermaid-senw0rz39fc #sequencenumber{fill:lightgrey;}#mermaid-senw0rz39fc #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-senw0rz39fc .messageText{fill:lightgrey;stroke:none;}#mermaid-senw0rz39fc .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-senw0rz39fc .labelText,#mermaid-senw0rz39fc .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-senw0rz39fc .loopText,#mermaid-senw0rz39fc .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-senw0rz39fc .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-senw0rz39fc .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-senw0rz39fc .noteText,#mermaid-senw0rz39fc .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-senw0rz39fc .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-senw0rz39fc .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-senw0rz39fc .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-senw0rz39fc .actorPopupMenu{position:absolute;}#mermaid-senw0rz39fc .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-senw0rz39fc .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-senw0rz39fc .actor-man circle,#mermaid-senw0rz39fc line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-senw0rz39fc :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"Initial state: price = 3000""Detect: 1000 < THRESHOLD(1500)""State: CIRCUIT_BREAKER_ACTIVE""All swaps blocked until setPanicMode(false) called""setPrice(1000)""emit PriceUpdate(1000)""abi.encodeWithSignature setPanicMode(true)""panicMode = true""beforeSwap()""revert PoolPaused()"

Sources:[contracts/README.md#8-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L8-L26)[README.md#55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L55-L75)

### Key Functions and EventsLink copied!

ComponentFunction/EventPurpose`MockOracle``setPrice(uint256 newPrice)`Simulates price update; emits `PriceUpdate``MockOracle``event PriceUpdate(uint256 price, uint256 timestamp)`Signals price change to Sentinel`AegisSentinel``react(...)`Callback invoked by Reactive Network; checks threshold`AegisSentinel`Cross-chain call to `setPanicMode(bool)`Activates/deactivates circuit breaker on L2`AegisHook``beforeSwap(...)`Intercepts swap attempts; reverts if `panicMode == true``AegisHook``error PoolPaused()`Revert reason when circuit breaker active

Sources:[contracts/README.md#32-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L32-L50)[README.md#39-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L39-L42)

---

## Key FeaturesLink copied!

### 1. Autonomous Event-Driven ArchitectureLink copied!

Aegis eliminates the need for centralized keeper bots by leveraging the Reactive Network's inversion-of-control model. The `AegisSentinel` contract subscribes to L1 events and autonomously triggers L2 state changes without external coordination.

- Subscribe: Sentinel registers for `PriceUpdate` events on Sepolia [contracts/README.md#42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L44)
- React: Reactive Network invokes `react()` callback when event matches [contracts/README.md#42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L44)
- Execute: Sentinel sends cross-chain message to Unichain via Reactive Network bridge [contracts/README.md#42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L44)

Sources:[contracts/README.md#39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L39-L50)[README.md#44-47](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L44-L47)

### 2. Reputation-Aware Gating (ERC-8004)Link copied!

The system implements a trust layer using ERC-8004 (Trustless Agents) and ERC-721 for Guardian identity management:

- Identity: Guardians mint an `AegisGuardian` NFT to establish on-chain identity [README.md#28](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L28-L28)
- Heroic Interventions: When agents provide liquidity during panic mode, `AegisHook` records intervention volume [README.md#30](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L30-L30)
- Reputation Sync: Sentinel listens to `NewFeedback` events and calls `boostReputation()` on L2 [README.md#30-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L30-L32)
- VIP Lane: Guardians with reputation > 90 pay reduced fees (0.01%) even during panic [README.md#31](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L31-L31)

Sources:[README.md#24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L24-L33)[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)

### 3. Hybrid Relayer FallbackLink copied!

To ensure message delivery reliability during testnet instability, Aegis includes a fallback relay mechanism:

- Primary: Reactive Network's public relayer handles cross-chain message forwarding
- Fallback: Custom TypeScript relayer (`relay.ts`) monitors Oracle directly and forwards messages if public relayer experiences delays
- Implementation: See [Hybrid Relayer](#4.1) for details

Sources:[README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

---

## Technology StackLink copied!

### Protocol IntegrationsLink copied!

TechnologyVersion/ChainPurposeUniswap v4Hooks FrameworkProvides `beforeSwap` gate mechanism via BaseHook interfaceReactive NetworkLasna TestnetEvent-driven cross-chain orchestration; AbstractReactive baseUnichainSepolia Testnet250ms Flashblocks enable sub-second circuit breaker activationFoundryLatestSmart contract development, testing, and deployment framework

Sources:[README.md#36-52](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L36-L52)

### Development DependenciesLink copied!

The project uses git submodules for external libraries:

- `lib/forge-std`: Foundry standard library for testing utilities
- `lib/uniswap-hooks`: OpenZeppelin's Uniswap v4 hook implementation templates
- `lib/hookmate`: Hook utility functions (e.g., salt mining for permissions)
- `lib/system-smart-contracts`: Reactive Network core contracts (`AbstractReactive`)

For dependency management details, see [Dependencies and Submodules](#6.3).

Sources:[README.md#36-52](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L36-L52)

---

## Repository StructureLink copied!

```
aegis/
├── contracts/               # Foundry project
│   ├── src/                 # Smart contract source files
│   │   ├── AegisHook.sol           # Uniswap v4 hook (L2)
│   │   ├── AegisSentinel.sol       # Reactive listener (Reactive)
│   │   ├── MockOracle.sol          # Price feed simulator (L1)
│   │   └── AegisGuardianRegistry.sol  # Identity & reputation (L1)
│   ├── script/              # Deployment scripts
│   │   ├── 04_DeployOracle.s.sol   # Deploy to Sepolia
│   │   ├── 05_DeploySentinel.s.sol # Deploy to Reactive
│   │   └── 06_DeployHook.s.sol     # Deploy to Unichain
│   ├── test/                # Test suites
│   ├── lib/                 # Git submodules (dependencies)
│   ├── foundry.toml         # Foundry configuration
│   └── broadcast/           # Deployment transaction logs
├── frontend/                # Next.js dashboard
│   └── src/                 # Frontend source code
└── README.md                # Project documentation
```

For detailed directory structure and file organization, see [Project Structure](#6.1).

Sources:[README.md#95-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L95-L122)

---

## Quick StartLink copied!

### PrerequisitesLink copied!

- Foundry installed (`curl -L https://foundry.paradigm.xyz | bash`)
- Node.js v18+ and npm

### Testing LocallyLink copied!

```
# Clone repository
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis/contracts
 
# Install dependencies (submodules)
forge install
 
# Run test suite
forge test
 
# Run circuit breaker integration test
forge test --match-contract AegisIntegrationTest -vv
```

### Running DashboardLink copied!

```
cd frontend
npm install
 
# Start hybrid relayer (background)
npm run relay &
 
# Start Next.js dashboard
npm run dev
# Navigate to http://localhost:3000
```

For detailed deployment to testnets, see [Deployment Scripts](#5.1).

Sources:[README.md#104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L104-L122)[contracts/README.md#70-95](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L70-L95)

---

## Design Philosophy: Simulation vs. ProductionLink copied!

The current implementation uses `MockOracle` for deterministic testing and demonstration purposes. This design choice enables:

1. Controlled Testing: Simulate 50% market crash events on-demand via `setPrice(1000)`[contracts/README.md#65-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L65-L68)
2. Demo Reliability: Guarantee circuit breaker activation during presentations without waiting for real market volatility [contracts/README.md#65-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L65-L68)
3. Interface Agnostic:`AegisSentinel` listens for standard `PriceUpdate(uint256, uint256)` event signature; production deployment simply swaps `MockOracle` address for Chainlink Oracle address with zero code changes [contracts/README.md#67-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L67-L68)

Sources:[contracts/README.md#59-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L59-L68)

---

## Verification and TestingLink copied!

Aegis includes comprehensive integration tests that verify the complete cross-chain flow:

Test CaseValidationStatusOracle Update`MockOracle.setPrice()` emits `PriceUpdate` event✅ PASSAccess ControlOnly `AegisSentinel` can call `AegisHook.setPanicMode()`✅ PASSPanic TriggerSentinel successfully calls `setPanicMode(true)` cross-chain✅ PASSCircuit Breaker`AegisHook.beforeSwap()` reverts with `PoolPaused()` when active✅ PASS

For step-by-step verification walkthrough, see `walkthrough.md` referenced in [README.md#136](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L136-L136)

Sources:[README.md#126-136](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L126-L136)[contracts/README.md#85-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L85-L94)

---

## Next StepsLink copied!

- For detailed architectural patterns including cross-chain design and circuit breaker mechanics, see [System Architecture](#2)
- For contract-level specifications and function signatures, see [Core Smart Contracts](#3)
- For off-chain components including the hybrid relayer and dashboard, see [Supporting Components](#4)
- For deployment procedures and network configuration, see [Deployment](#5)
- For development workflow and contributing guidelines, see [Development Guide](#6)

Sources:[README.md#1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L1-L149)