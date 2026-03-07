# Core Smart ContractsLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

The Aegis system is composed of four core smart contracts that work together across three blockchain networks to implement a cross-chain circuit breaker for Uniswap v4 pools. This page introduces each contract, their roles, and how they interact.

For detailed implementation documentation of individual contracts, see:

- [AegisHook](#3.1) - Uniswap v4 hook implementation
- [AegisSentinel](#3.2) - Reactive Network listener contract
- [MockOracle](#3.3) - Price feed simulator
- [Guardian Registry](#3.4) - Reputation system implementation

For deployment procedures, see [Deployment](#5). For development setup and testing, see [Development Guide](#6).

Sources:[contracts/README.md#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L58)

## The Four Core ContractsLink copied!

Aegis consists of four smart contracts deployed across three blockchain networks. Each contract has a specific role in the circuit breaker system.

ContractFile PathNetworkPrimary Role`MockOracle`[src/MockOracle.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/MockOracle.sol)Ethereum Sepolia (11155111)Price feed simulator that emits `PriceUpdate` events`AegisSentinel`[src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisSentinel.sol)Reactive Network Lasna (5318007)Cross-chain orchestrator that monitors L1 events and triggers L2 actions`AegisHook`[src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisHook.sol)Unichain Sepolia (1301)Uniswap v4 hook that implements the `beforeSwap` circuit breaker`AegisGuardianRegistry`[src/AegisGuardianRegistry.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisGuardianRegistry.sol)Ethereum Sepolia (11155111)ERC-721 + ERC-8004 contract for Guardian identity and reputation

### Contract RolesLink copied!

`MockOracle` acts as the trigger source on L1. It simulates a Chainlink price feed by allowing manual price updates via `setPrice(uint256)` and emitting `PriceUpdate(uint256)` events that the Sentinel monitors.

`AegisSentinel` serves as the autonomous watchdog on the Reactive Network. It subscribes to events from `MockOracle` and `AegisGuardianRegistry` on L1, evaluates conditions, and sends cross-chain messages to `AegisHook` on L2 to activate or deactivate panic mode.

`AegisHook` is the enforcement layer on Unichain. It implements Uniswap v4's `IHooks` interface and controls swap execution through its `beforeSwap()` function. When `panicMode` is true, all regular swaps revert with the `PoolPaused()` error.

`AegisGuardianRegistry` maintains the identity and reputation system for Guardians who can provide liquidity during panic mode. It implements ERC-721 for identity NFTs and ERC-8004 for trustless agent feedback.

Sources:[contracts/README.md#28-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L28-L58)

## Contract Interaction FlowLink copied!

#### Diagram: Circuit Breaker Activation Sequence

UserPoolManagerAegisHookAegisSentinelMockOracleUserPoolManagerAegisHookAegisSentinelMockOracle#mermaid-8vl1n5hzsew{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-8vl1n5hzsew .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-8vl1n5hzsew .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-8vl1n5hzsew .error-icon{fill:#a44141;}#mermaid-8vl1n5hzsew .error-text{fill:#ddd;stroke:#ddd;}#mermaid-8vl1n5hzsew .edge-thickness-normal{stroke-width:1px;}#mermaid-8vl1n5hzsew .edge-thickness-thick{stroke-width:3.5px;}#mermaid-8vl1n5hzsew .edge-pattern-solid{stroke-dasharray:0;}#mermaid-8vl1n5hzsew .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-8vl1n5hzsew .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-8vl1n5hzsew .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-8vl1n5hzsew .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-8vl1n5hzsew .marker.cross{stroke:lightgrey;}#mermaid-8vl1n5hzsew svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-8vl1n5hzsew p{margin:0;}#mermaid-8vl1n5hzsew .actor{stroke:#ccc;fill:#1f2020;}#mermaid-8vl1n5hzsew text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-8vl1n5hzsew .actor-line{stroke:#ccc;}#mermaid-8vl1n5hzsew .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-8vl1n5hzsew .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-8vl1n5hzsew .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-8vl1n5hzsew #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-8vl1n5hzsew .sequenceNumber{fill:black;}#mermaid-8vl1n5hzsew #sequencenumber{fill:lightgrey;}#mermaid-8vl1n5hzsew #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-8vl1n5hzsew .messageText{fill:lightgrey;stroke:none;}#mermaid-8vl1n5hzsew .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-8vl1n5hzsew .labelText,#mermaid-8vl1n5hzsew .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-8vl1n5hzsew .loopText,#mermaid-8vl1n5hzsew .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-8vl1n5hzsew .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-8vl1n5hzsew .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-8vl1n5hzsew .noteText,#mermaid-8vl1n5hzsew .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-8vl1n5hzsew .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-8vl1n5hzsew .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-8vl1n5hzsew .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-8vl1n5hzsew .actorPopupMenu{position:absolute;}#mermaid-8vl1n5hzsew .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-8vl1n5hzsew .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-8vl1n5hzsew .actor-man circle,#mermaid-8vl1n5hzsew line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-8vl1n5hzsew :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}setPrice(1000)react() callback triggeredpanicMode = trueMarket stabilizespanicMode = falseemit PriceUpdate(1000)Event captured via subscribe()Check price < THRESHOLDsetPanicMode(true) [cross-chain]swap()beforeSwap()require(!panicMode)revert PoolPaused()Transaction revertedsetPanicMode(false) [cross-chain]

This sequence shows how the four contracts coordinate during a market crash. The `MockOracle.setPrice()` function triggers a `PriceUpdate` event that the `AegisSentinel` receives through the Reactive Network's subscription system. The Sentinel's `react()` callback evaluates the price against a hardcoded `THRESHOLD` and sends a cross-chain message to call `AegisHook.setPanicMode(true)`. Subsequently, when users attempt to swap, the `PoolManager` invokes `AegisHook.beforeSwap()`, which reverts if `panicMode` is active.

Sources:[contracts/README.md#11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L11-L26)[contracts/README.md#33-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L50)

## Key Code EntitiesLink copied!

The following table maps system concepts to specific code entities (functions, events, state variables) that can be searched in the codebase.

### FunctionsLink copied!

FunctionContractVisibilityDescription`setPrice(uint256 newPrice)``MockOracle``external`Updates the price and emits `PriceUpdate` event`setPanicMode(bool _panic)``AegisHook``external`Activates/deactivates circuit breaker (only callable by `SENTINEL_ADDRESS`)`beforeSwap(...)``AegisHook``public`Hook callback invoked by `PoolManager` before each swap`react(...)``AegisSentinel``internal`Reactive Network callback that processes subscribed events

### EventsLink copied!

EventContractSignaturePurpose`PriceUpdate``MockOracle``event PriceUpdate(uint256 newPrice)`Signals L1 price changes`PanicModeSet``AegisHook``event PanicModeSet(bool isPanic)`Logs circuit breaker state changes`NewFeedback``AegisGuardianRegistry``event NewFeedback(...)`Records Guardian intervention feedback

### State VariablesLink copied!

VariableContractTypeDescription`panicMode``AegisHook``bool`Circuit breaker activation state`SENTINEL_ADDRESS``AegisHook``address` (immutable)Address authorized to call `setPanicMode``THRESHOLD``AegisSentinel``uint256` (constant)Price threshold for panic activation`currentPrice``MockOracle``uint256`Latest price value

Sources:[contracts/README.md#33-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L58)

## Multi-Chain Deployment ArchitectureLink copied!

#### Diagram: Contract Deployment Topology

#mermaid-b5pacx89lbe{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-b5pacx89lbe .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-b5pacx89lbe .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-b5pacx89lbe .error-icon{fill:#a44141;}#mermaid-b5pacx89lbe .error-text{fill:#ddd;stroke:#ddd;}#mermaid-b5pacx89lbe .edge-thickness-normal{stroke-width:1px;}#mermaid-b5pacx89lbe .edge-thickness-thick{stroke-width:3.5px;}#mermaid-b5pacx89lbe .edge-pattern-solid{stroke-dasharray:0;}#mermaid-b5pacx89lbe .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-b5pacx89lbe .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-b5pacx89lbe .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-b5pacx89lbe .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-b5pacx89lbe .marker.cross{stroke:lightgrey;}#mermaid-b5pacx89lbe svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-b5pacx89lbe p{margin:0;}#mermaid-b5pacx89lbe .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-b5pacx89lbe .cluster-label text{fill:#F9FFFE;}#mermaid-b5pacx89lbe .cluster-label span{color:#F9FFFE;}#mermaid-b5pacx89lbe .cluster-label span p{background-color:transparent;}#mermaid-b5pacx89lbe .label text,#mermaid-b5pacx89lbe span{fill:#ccc;color:#ccc;}#mermaid-b5pacx89lbe .node rect,#mermaid-b5pacx89lbe .node circle,#mermaid-b5pacx89lbe .node ellipse,#mermaid-b5pacx89lbe .node polygon,#mermaid-b5pacx89lbe .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-b5pacx89lbe .rough-node .label text,#mermaid-b5pacx89lbe .node .label text,#mermaid-b5pacx89lbe .image-shape .label,#mermaid-b5pacx89lbe .icon-shape .label{text-anchor:middle;}#mermaid-b5pacx89lbe .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-b5pacx89lbe .rough-node .label,#mermaid-b5pacx89lbe .node .label,#mermaid-b5pacx89lbe .image-shape .label,#mermaid-b5pacx89lbe .icon-shape .label{text-align:center;}#mermaid-b5pacx89lbe .node.clickable{cursor:pointer;}#mermaid-b5pacx89lbe .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-b5pacx89lbe .arrowheadPath{fill:lightgrey;}#mermaid-b5pacx89lbe .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-b5pacx89lbe .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-b5pacx89lbe .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-b5pacx89lbe .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-b5pacx89lbe .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-b5pacx89lbe .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-b5pacx89lbe .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-b5pacx89lbe .cluster text{fill:#F9FFFE;}#mermaid-b5pacx89lbe .cluster span{color:#F9FFFE;}#mermaid-b5pacx89lbe div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-b5pacx89lbe .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-b5pacx89lbe rect.text{fill:none;stroke-width:0;}#mermaid-b5pacx89lbe .icon-shape,#mermaid-b5pacx89lbe .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-b5pacx89lbe .icon-shape p,#mermaid-b5pacx89lbe .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-b5pacx89lbe .icon-shape rect,#mermaid-b5pacx89lbe .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-b5pacx89lbe .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-b5pacx89lbe .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-b5pacx89lbe :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (1301)

Reactive Network Lasna (5318007)

Ethereum Sepolia (11155111)

PriceUpdate event

NewFeedback event

setPanicMode(bool)

boostReputation(address)

beforeSwap() callback

recordIntervention()

MockOracle

AegisGuardianRegistry

AegisSentinel

AegisHook

PoolManager

The contracts are distributed across three networks to leverage each chain's unique capabilities:

- Ethereum Sepolia (L1): Hosts `MockOracle` and `AegisGuardianRegistry` as the source of truth for price data and Guardian identity/reputation.
- Reactive Network Lasna: Runs `AegisSentinel`, which provides autonomous event monitoring without requiring off-chain keeper infrastructure.
- Unichain Sepolia (L2): Deploys `AegisHook` alongside Uniswap v4's `PoolManager` for fast swap protection using 250ms Flashblocks.

Sources:[contracts/README.md#99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L103)[contracts/README.md#11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L11-L26)

## Contract DependenciesLink copied!

#### Diagram: Inheritance and External Dependencies

### Dependency DetailsLink copied!

`AegisHook` implements Uniswap v4's `IHooks` interface from the `v4-core` library. It inherits from `BaseHook` to get standardized hook callback stubs and helper functions.

`AegisSentinel` extends `AbstractReactive` from the `reactive-lib` library. This base contract provides the `react()` callback mechanism and cross-chain messaging utilities required for the Reactive Network.

`AegisGuardianRegistry` implements both ERC-721 (for NFT-based identity) and ERC-8004 (for trustless agent feedback). This dual implementation enables Guardians to receive reputation updates as immutable on-chain feedback.

`MockOracle` is a standalone contract with no external dependencies beyond standard Solidity primitives.

Sources:[contracts/README.md#33-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L58)

## Access Control PatternsLink copied!

The Aegis system implements strict access control to prevent unauthorized manipulation of the circuit breaker.

ContractProtected FunctionAccess ControlEnforced By`AegisHook``setPanicMode(bool)`Only `SENTINEL_ADDRESS``require(msg.sender == SENTINEL_ADDRESS)``AegisSentinel``react(...)`Only Reactive Network systemEnforced by `AbstractReactive` base contract`MockOracle``setPrice(uint256)`No restriction (testnet only)N/A - production uses Chainlink

The most critical access control is in `AegisHook.setPanicMode()`, which can only be called by the `SENTINEL_ADDRESS`. This immutable address is set during deployment and points to the `AegisSentinel` contract on the Reactive Network.

Sources:[contracts/README.md#33-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L50)

## Design PhilosophyLink copied!

The Aegis smart contract architecture adheres to several key principles:

1. Event-Driven Design: All cross-chain coordination is triggered by on-chain events, eliminating the need for centralized monitoring bots.
2. Interface Agnostic: The `AegisSentinel` listens for the standard `PriceUpdate(uint256)` event signature. In production, `MockOracle` can be replaced with a Chainlink oracle address without any code changes to the Sentinel logic.
3. Deterministic Testing: The `MockOracle` contract allows for reproducible demonstrations of circuit breaker activation during market crash simulations.
4. Access Control: The `AegisHook` enforces strict access control—only the `SENTINEL_ADDRESS` can modify `panicMode`, preventing unauthorized manipulation.
5. Minimal Trust Assumptions: The system requires trust only in the oracle data source (Chainlink in production) and the Reactive Network's cross-chain messaging reliability.

Sources:[contracts/README.md#59-69](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L59-L69)