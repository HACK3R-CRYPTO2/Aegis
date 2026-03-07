# System ArchitectureLink copied!
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

## Purpose and ScopeLink copied!

This document describes the overall architectural design of the Aegis system, a cross-chain circuit breaker for Uniswap v4 liquidity pools. It covers the three-layer network topology, cross-chain communication patterns, and key design decisions that enable autonomous panic mode activation.

For detailed cross-chain communication mechanisms, see [Cross-Chain Design](#2.1). For circuit breaker implementation specifics, see [Circuit Breaker Mechanism](#2.2). For individual contract documentation, see [Core Smart Contracts](#3).

Sources:[README.md#1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L1-L149)[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)

---

## Three-Layer Architecture OverviewLink copied!

Aegis operates across three distinct blockchain networks, each serving a specific architectural role. This separation enables autonomous cross-chain event monitoring without requiring centralized infrastructure.

### Network LayersLink copied!

LayerNetworkChain IDRoleKey ContractsL1Ethereum Sepolia11155111Authority & Data Source`MockOracle`, `GuardianRegistry`OrchestrationReactive Network Lasna5318007Event Listener & Controller`AegisSentinel`ExecutionUnichain Sepolia1301Pool Protection & Trading`AegisHook`

The three-layer design addresses the "inversion of control" problem: rather than requiring off-chain bots to poll L1 and trigger L2 actions, the `AegisSentinel` contract on Reactive Network autonomously listens to L1 events and executes cross-chain calls to L2.

Sources:[README.md#55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L55-L75)[contracts/README.md#7-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L7-L26)

---

## System Component DiagramLink copied!

#mermaid-j079iu1p1a{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-j079iu1p1a .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-j079iu1p1a .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-j079iu1p1a .error-icon{fill:#a44141;}#mermaid-j079iu1p1a .error-text{fill:#ddd;stroke:#ddd;}#mermaid-j079iu1p1a .edge-thickness-normal{stroke-width:1px;}#mermaid-j079iu1p1a .edge-thickness-thick{stroke-width:3.5px;}#mermaid-j079iu1p1a .edge-pattern-solid{stroke-dasharray:0;}#mermaid-j079iu1p1a .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-j079iu1p1a .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-j079iu1p1a .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-j079iu1p1a .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-j079iu1p1a .marker.cross{stroke:lightgrey;}#mermaid-j079iu1p1a svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-j079iu1p1a p{margin:0;}#mermaid-j079iu1p1a .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-j079iu1p1a .cluster-label text{fill:#F9FFFE;}#mermaid-j079iu1p1a .cluster-label span{color:#F9FFFE;}#mermaid-j079iu1p1a .cluster-label span p{background-color:transparent;}#mermaid-j079iu1p1a .label text,#mermaid-j079iu1p1a span{fill:#ccc;color:#ccc;}#mermaid-j079iu1p1a .node rect,#mermaid-j079iu1p1a .node circle,#mermaid-j079iu1p1a .node ellipse,#mermaid-j079iu1p1a .node polygon,#mermaid-j079iu1p1a .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-j079iu1p1a .rough-node .label text,#mermaid-j079iu1p1a .node .label text,#mermaid-j079iu1p1a .image-shape .label,#mermaid-j079iu1p1a .icon-shape .label{text-anchor:middle;}#mermaid-j079iu1p1a .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-j079iu1p1a .rough-node .label,#mermaid-j079iu1p1a .node .label,#mermaid-j079iu1p1a .image-shape .label,#mermaid-j079iu1p1a .icon-shape .label{text-align:center;}#mermaid-j079iu1p1a .node.clickable{cursor:pointer;}#mermaid-j079iu1p1a .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-j079iu1p1a .arrowheadPath{fill:lightgrey;}#mermaid-j079iu1p1a .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-j079iu1p1a .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-j079iu1p1a .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-j079iu1p1a .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-j079iu1p1a .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-j079iu1p1a .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-j079iu1p1a .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-j079iu1p1a .cluster text{fill:#F9FFFE;}#mermaid-j079iu1p1a .cluster span{color:#F9FFFE;}#mermaid-j079iu1p1a div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-j079iu1p1a .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-j079iu1p1a rect.text{fill:none;stroke-width:0;}#mermaid-j079iu1p1a .icon-shape,#mermaid-j079iu1p1a .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-j079iu1p1a .icon-shape p,#mermaid-j079iu1p1a .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-j079iu1p1a .icon-shape rect,#mermaid-j079iu1p1a .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-j079iu1p1a .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-j079iu1p1a .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-j079iu1p1a :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

External Actors

Unichain Sepolia (Chain ID: 1301)

Reactive Network Lasna (Chain ID: 5318007)

Ethereum Sepolia (Chain ID: 11155111)

PriceUpdate event

NewFeedback event

IService.call() setPanicMode(bool)

IService.call() updateReputation(address,uint256)

beforeSwap() hook callback

swap()

provideLiquidity()

cross-chain recordFeedback()

mint()

MockOracle (0x1392...a7D8) setPrice() emits PriceUpdate

GuardianRegistry ERC-721 + ERC-8004 recordFeedback() emits NewFeedback

AegisSentinel (0x0B6a...b6B6) extends AbstractReactive react() callback setPanicMode() call

AegisHook (0x1E2a...8080) beforeSwap() gate panicMode state guardianReputation mapping

Uniswap v4 PoolManager swap() entrypoint

Traders/LPs

Guardians

This diagram maps system components to their actual contract names and key functions. The `AegisSentinel` contract extends `AbstractReactive` from the Reactive Network SDK, enabling it to listen to L1 events via the `react()` callback function. Cross-chain calls use the `IService.call()` interface to invoke `setPanicMode(bool)` and `updateReputation(address, uint256)` on the `AegisHook` contract.

Sources:[README.md#55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L55-L75)[contracts/README.md#27-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L27-L58)

---

## Core Architectural PatternsLink copied!

### 1. Hook-Based Access ControlLink copied!

The `AegisHook` contract implements Uniswap v4's `IHooks` interface, specifically the `beforeSwap()` function. This function is invoked by the `PoolManager` before every swap execution, providing a gating mechanism.

Key Pattern: The hook does not pause the entire `PoolManager`; it only controls access to specific pools. Each pool deployed with the `AegisHook` address is independently protected.

AegisHookPoolManagerTraderAegisHookPoolManagerTrader#mermaid-nvntxuc2ve{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-nvntxuc2ve .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-nvntxuc2ve .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-nvntxuc2ve .error-icon{fill:#a44141;}#mermaid-nvntxuc2ve .error-text{fill:#ddd;stroke:#ddd;}#mermaid-nvntxuc2ve .edge-thickness-normal{stroke-width:1px;}#mermaid-nvntxuc2ve .edge-thickness-thick{stroke-width:3.5px;}#mermaid-nvntxuc2ve .edge-pattern-solid{stroke-dasharray:0;}#mermaid-nvntxuc2ve .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-nvntxuc2ve .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-nvntxuc2ve .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-nvntxuc2ve .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-nvntxuc2ve .marker.cross{stroke:lightgrey;}#mermaid-nvntxuc2ve svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-nvntxuc2ve p{margin:0;}#mermaid-nvntxuc2ve .actor{stroke:#ccc;fill:#1f2020;}#mermaid-nvntxuc2ve text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-nvntxuc2ve .actor-line{stroke:#ccc;}#mermaid-nvntxuc2ve .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-nvntxuc2ve .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-nvntxuc2ve .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-nvntxuc2ve #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-nvntxuc2ve .sequenceNumber{fill:black;}#mermaid-nvntxuc2ve #sequencenumber{fill:lightgrey;}#mermaid-nvntxuc2ve #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-nvntxuc2ve .messageText{fill:lightgrey;stroke:none;}#mermaid-nvntxuc2ve .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-nvntxuc2ve .labelText,#mermaid-nvntxuc2ve .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-nvntxuc2ve .loopText,#mermaid-nvntxuc2ve .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-nvntxuc2ve .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-nvntxuc2ve .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-nvntxuc2ve .noteText,#mermaid-nvntxuc2ve .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-nvntxuc2ve .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-nvntxuc2ve .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-nvntxuc2ve .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-nvntxuc2ve .actorPopupMenu{position:absolute;}#mermaid-nvntxuc2ve .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-nvntxuc2ve .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-nvntxuc2ve .actor-man circle,#mermaid-nvntxuc2ve line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-nvntxuc2ve :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}alt[panicMode == true &&reputation < 90][panicMode == false ||reputation >= 90]"swap(poolKey | params)""beforeSwap(sender | key | params)""revert PoolPaused()""revert""return BeforeSwapDelta""execute swap""success"

Contract Implementation:

- Hook deployment uses CREATE2 with a mined salt to achieve an address starting with `0x80...` (indicating `BEFORE_SWAP_FLAG` is set)
- The `beforeSwap()` function checks `panicMode` state variable [src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisHook.sol)
- VIP guardians (reputation >= 90) bypass the panic gate [src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisHook.sol)

Sources:[README.md#39-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L39-L42)[contracts/README.md#32-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L32-L37)

---

### 2. Reactive Event ListeningLink copied!

The `AegisSentinel` contract uses Reactive Network's `AbstractReactive` base contract to subscribe to events on origin chains. This eliminates the need for off-chain relayer infrastructure.

Key Pattern: The Sentinel is itself a smart contract, not a traditional bot. It executes autonomously when subscribed events are emitted.

#mermaid-pap35kuf3x{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-pap35kuf3x .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-pap35kuf3x .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-pap35kuf3x .error-icon{fill:#a44141;}#mermaid-pap35kuf3x .error-text{fill:#ddd;stroke:#ddd;}#mermaid-pap35kuf3x .edge-thickness-normal{stroke-width:1px;}#mermaid-pap35kuf3x .edge-thickness-thick{stroke-width:3.5px;}#mermaid-pap35kuf3x .edge-pattern-solid{stroke-dasharray:0;}#mermaid-pap35kuf3x .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-pap35kuf3x .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-pap35kuf3x .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-pap35kuf3x .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-pap35kuf3x .marker.cross{stroke:lightgrey;}#mermaid-pap35kuf3x svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-pap35kuf3x p{margin:0;}#mermaid-pap35kuf3x .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-pap35kuf3x .cluster-label text{fill:#F9FFFE;}#mermaid-pap35kuf3x .cluster-label span{color:#F9FFFE;}#mermaid-pap35kuf3x .cluster-label span p{background-color:transparent;}#mermaid-pap35kuf3x .label text,#mermaid-pap35kuf3x span{fill:#ccc;color:#ccc;}#mermaid-pap35kuf3x .node rect,#mermaid-pap35kuf3x .node circle,#mermaid-pap35kuf3x .node ellipse,#mermaid-pap35kuf3x .node polygon,#mermaid-pap35kuf3x .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-pap35kuf3x .rough-node .label text,#mermaid-pap35kuf3x .node .label text,#mermaid-pap35kuf3x .image-shape .label,#mermaid-pap35kuf3x .icon-shape .label{text-anchor:middle;}#mermaid-pap35kuf3x .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-pap35kuf3x .rough-node .label,#mermaid-pap35kuf3x .node .label,#mermaid-pap35kuf3x .image-shape .label,#mermaid-pap35kuf3x .icon-shape .label{text-align:center;}#mermaid-pap35kuf3x .node.clickable{cursor:pointer;}#mermaid-pap35kuf3x .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-pap35kuf3x .arrowheadPath{fill:lightgrey;}#mermaid-pap35kuf3x .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-pap35kuf3x .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-pap35kuf3x .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-pap35kuf3x .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-pap35kuf3x .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-pap35kuf3x .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-pap35kuf3x .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-pap35kuf3x .cluster text{fill:#F9FFFE;}#mermaid-pap35kuf3x .cluster span{color:#F9FFFE;}#mermaid-pap35kuf3x div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-pap35kuf3x .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-pap35kuf3x rect.text{fill:none;stroke-width:0;}#mermaid-pap35kuf3x .icon-shape,#mermaid-pap35kuf3x .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-pap35kuf3x .icon-shape p,#mermaid-pap35kuf3x .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-pap35kuf3x .icon-shape rect,#mermaid-pap35kuf3x .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-pap35kuf3x .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-pap35kuf3x .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-pap35kuf3x :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Destination Chain (Unichain)

Reactive Network

Origin Chain (Sepolia)

emit PriceUpdate(price)

invoke react(chain, caller, topic0, data)

IService.call(chainId, target, callData)

MockOracle contract

Reactive System Contract

AegisSentinel extends AbstractReactive

AegisHook contract

Contract Implementation:

- Sentinel implements `react(uint256 chain, address _contract, uint256 topic0, uint256 topic1, uint256 topic2, uint256 topic3, bytes calldata data, uint256 blockNumber, uint256 op)` callback [src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisSentinel.sol)
- Subscription is registered via manual call to system contract after deployment (see deployment logs)
- Cross-chain calls use `IService(SERVICE).call{value: remainingGas}(UNICHAIN_CHAIN_ID, aegisHookAddress, callData)`[src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisSentinel.sol)

Sources:[README.md#43-47](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L43-L47)[contracts/README.md#39-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L39-L44)

---

### 3. Reputation-Based Access TiersLink copied!

The system implements a dual-tier access model during panic mode. This pattern is inspired by ERC-8004 (Trustless Agents), which standardizes on-chain reputation feedback.

Access TierConditionSwap PermissionFee RateUse CaseStandard`reputation < 90`Blocked during panic0.30% (normal)Regular tradersVIP Lane`reputation >= 90`Allowed during panic0.01% (reduced)Trusted guardians

Contract Implementation:

- Reputation stored in `mapping(address => uint256) public guardianReputation`[src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisHook.sol)
- Updated via `updateReputation(address guardian, uint256 newReputation)` function [src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisHook.sol)
- VIP check: `if (panicMode && guardianReputation[sender] < 90) revert PoolPaused();`[src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/src/AegisHook.sol)

Sources:[README.md#24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L24-L33)[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)

---

## Network Topology and DeploymentLink copied!

### Address ResolutionLink copied!

The system uses deterministic addressing via CREATE2 for the `AegisHook` contract. The salt is mined to ensure the deployed address has the `BEFORE_SWAP_FLAG` (0x80...) prefix required by Uniswap v4.

Deployed Addresses:

ContractNetworkAddressVerification`MockOracle`Sepolia`0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`[Etherscan](https://sepolia.etherscan.io/address/0x1392C38921A818cEdb100cC3767e8f30deC3a7D8)`AegisSentinel`Reactive Lasna`0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6`Reactive Explorer`AegisHook`Unichain Sepolia`0x1E2aE114cF3B63779A1367eD704ccA51a0218080`Unichain Explorer

Hook Address Validation:

- Prefix `0x1E2aE114cF3B63779A1367eD704ccA51a0218080` contains the 8th bit set: `0x80` in the first byte after `0x`
- This indicates `BEFORE_SWAP_FLAG` is enabled, making the contract valid for use as a Uniswap v4 hook

Sources:[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)

---

### Deployment SequenceLink copied!

The contracts must be deployed in a specific order due to constructor dependencies.

"Unichain Sepolia""Reactive Network""Ethereum Sepolia""Developer""Unichain Sepolia""Reactive Network""Ethereum Sepolia""Developer"#mermaid-bfs5msc6aom{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-bfs5msc6aom .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-bfs5msc6aom .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-bfs5msc6aom .error-icon{fill:#a44141;}#mermaid-bfs5msc6aom .error-text{fill:#ddd;stroke:#ddd;}#mermaid-bfs5msc6aom .edge-thickness-normal{stroke-width:1px;}#mermaid-bfs5msc6aom .edge-thickness-thick{stroke-width:3.5px;}#mermaid-bfs5msc6aom .edge-pattern-solid{stroke-dasharray:0;}#mermaid-bfs5msc6aom .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-bfs5msc6aom .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-bfs5msc6aom .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-bfs5msc6aom .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-bfs5msc6aom .marker.cross{stroke:lightgrey;}#mermaid-bfs5msc6aom svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-bfs5msc6aom p{margin:0;}#mermaid-bfs5msc6aom .actor{stroke:#ccc;fill:#1f2020;}#mermaid-bfs5msc6aom text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-bfs5msc6aom .actor-line{stroke:#ccc;}#mermaid-bfs5msc6aom .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-bfs5msc6aom .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-bfs5msc6aom .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-bfs5msc6aom #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-bfs5msc6aom .sequenceNumber{fill:black;}#mermaid-bfs5msc6aom #sequencenumber{fill:lightgrey;}#mermaid-bfs5msc6aom #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-bfs5msc6aom .messageText{fill:lightgrey;stroke:none;}#mermaid-bfs5msc6aom .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-bfs5msc6aom .labelText,#mermaid-bfs5msc6aom .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-bfs5msc6aom .loopText,#mermaid-bfs5msc6aom .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-bfs5msc6aom .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-bfs5msc6aom .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-bfs5msc6aom .noteText,#mermaid-bfs5msc6aom .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-bfs5msc6aom .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-bfs5msc6aom .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-bfs5msc6aom .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-bfs5msc6aom .actorPopupMenu{position:absolute;}#mermaid-bfs5msc6aom .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-bfs5msc6aom .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-bfs5msc6aom .actor-man circle,#mermaid-bfs5msc6aom line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-bfs5msc6aom :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"Step 1: Deploy Oracle""Step 2: Deploy Sentinel (with Oracle address)""Step 3: Subscribe Sentinel (manual system contract call)""Step 4: Mine CREATE2 salt (for BEFORE_SWAP_FLAG)""Step 5: Deploy Hook""forge script 04_DeployOracle.s.sol""MockOracle @ 0x1392...a7D8""forge script 05_DeploySentinel.s.sol --legacy""AegisSentinel @ 0x0B6a...b6B6""subscribe(topics | origin chain)""Calculate salt for 0x80... prefix""forge script 06_DeployHook.s.sol""AegisHook @ 0x1E2a...8080"

Deployment Scripts:

- Oracle: [script/04_DeployOracle.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/script/04_DeployOracle.s.sol)
- Sentinel: [script/05_DeploySentinel.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/script/05_DeploySentinel.s.sol)
- Hook: [script/06_DeployHook.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/script/06_DeployHook.s.sol)

Critical Dependency: The `AegisSentinel` constructor requires the `MockOracle` address as a parameter to subscribe to its events. The `AegisHook` address must be communicated to the Sentinel after deployment for cross-chain calls.

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)

---

## Design DecisionsLink copied!

### Why Three Chains?Link copied!

Alternative Considered: Deploying all logic on L2 (Unichain) and using off-chain bots to monitor L1.

Decision: Use Reactive Network as an intermediate orchestration layer.

Rationale:

1. Autonomous Operation: Reactive contracts execute autonomously when events are emitted, eliminating single points of failure from off-chain infrastructure
2. Gas Efficiency: Reactive Network charges lower gas fees for event listening compared to storing listener logic on L1 or L2
3. Latency: Cross-chain calls from Reactive to Unichain complete faster than multi-hop bridge messages from L1 → L2

Trade-off: Adds complexity of managing three deployments and requires manual subscription registration post-deployment.

Sources:[README.md#43-51](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L43-L51)[contracts/README.md#59-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L59-L68)

---

### Why Mock Oracle for Demo?Link copied!

Alternative Considered: Integrating with live Chainlink price feeds on Sepolia.

Decision: Deploy `MockOracle` with manual `setPrice()` function.

Rationale:

1. Deterministic Testing: Allows simulation of 50%+ price crashes on-demand for demonstration purposes
2. Interface Compatibility:`MockOracle` emits identical `PriceUpdate(uint256 price)` event signature as production oracles
3. Production Migration: The `AegisSentinel` listens for event topics, not contract addresses—swapping to a real oracle requires only updating the subscription origin address

Implementation: The `MockOracle` contract is intentionally simple (single state variable, single function) to avoid introducing test-specific logic into the Sentinel.

Sources:[contracts/README.md#59-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L59-L68)

---

### Why Uniswap v4 Hooks?Link copied!

Alternative Considered: Deploying a custom AMM with built-in circuit breaker.

Decision: Integrate with Uniswap v4 via the `beforeSwap()` hook.

Rationale:

1. Composability: Hooks allow injection of custom logic without forking the entire Uniswap v4 codebase
2. Liquidity Network Effects: Uniswap v4 has deeper liquidity than any new AMM could bootstrap
3. Unichain Flashblocks: Uniswap v4 on Unichain benefits from 250ms block times, providing faster response than L1 or traditional L2s

Trade-off: Requires address salt mining to deploy hooks with specific permission flags (e.g., `BEFORE_SWAP_FLAG`).

Sources:[README.md#39-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L39-L42)[README.md#49-51](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L49-L51)

---

## Data Flow DiagramsLink copied!

### Panic Mode Activation FlowLink copied!

#mermaid-jcy5c8ixgd{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-jcy5c8ixgd .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-jcy5c8ixgd .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-jcy5c8ixgd .error-icon{fill:#a44141;}#mermaid-jcy5c8ixgd .error-text{fill:#ddd;stroke:#ddd;}#mermaid-jcy5c8ixgd .edge-thickness-normal{stroke-width:1px;}#mermaid-jcy5c8ixgd .edge-thickness-thick{stroke-width:3.5px;}#mermaid-jcy5c8ixgd .edge-pattern-solid{stroke-dasharray:0;}#mermaid-jcy5c8ixgd .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-jcy5c8ixgd .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-jcy5c8ixgd .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-jcy5c8ixgd .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-jcy5c8ixgd .marker.cross{stroke:lightgrey;}#mermaid-jcy5c8ixgd svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-jcy5c8ixgd p{margin:0;}#mermaid-jcy5c8ixgd .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-jcy5c8ixgd .cluster-label text{fill:#F9FFFE;}#mermaid-jcy5c8ixgd .cluster-label span{color:#F9FFFE;}#mermaid-jcy5c8ixgd .cluster-label span p{background-color:transparent;}#mermaid-jcy5c8ixgd .label text,#mermaid-jcy5c8ixgd span{fill:#ccc;color:#ccc;}#mermaid-jcy5c8ixgd .node rect,#mermaid-jcy5c8ixgd .node circle,#mermaid-jcy5c8ixgd .node ellipse,#mermaid-jcy5c8ixgd .node polygon,#mermaid-jcy5c8ixgd .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-jcy5c8ixgd .rough-node .label text,#mermaid-jcy5c8ixgd .node .label text,#mermaid-jcy5c8ixgd .image-shape .label,#mermaid-jcy5c8ixgd .icon-shape .label{text-anchor:middle;}#mermaid-jcy5c8ixgd .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-jcy5c8ixgd .rough-node .label,#mermaid-jcy5c8ixgd .node .label,#mermaid-jcy5c8ixgd .image-shape .label,#mermaid-jcy5c8ixgd .icon-shape .label{text-align:center;}#mermaid-jcy5c8ixgd .node.clickable{cursor:pointer;}#mermaid-jcy5c8ixgd .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-jcy5c8ixgd .arrowheadPath{fill:lightgrey;}#mermaid-jcy5c8ixgd .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-jcy5c8ixgd .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-jcy5c8ixgd .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-jcy5c8ixgd .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-jcy5c8ixgd .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-jcy5c8ixgd .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-jcy5c8ixgd .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-jcy5c8ixgd .cluster text{fill:#F9FFFE;}#mermaid-jcy5c8ixgd .cluster span{color:#F9FFFE;}#mermaid-jcy5c8ixgd div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-jcy5c8ixgd .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-jcy5c8ixgd rect.text{fill:none;stroke-width:0;}#mermaid-jcy5c8ixgd .icon-shape,#mermaid-jcy5c8ixgd .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-jcy5c8ixgd .icon-shape p,#mermaid-jcy5c8ixgd .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-jcy5c8ixgd .icon-shape rect,#mermaid-jcy5c8ixgd .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-jcy5c8ixgd .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-jcy5c8ixgd .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-jcy5c8ixgd :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Yes

No

Yes

No

Oracle.setPrice(1000) on Sepolia

emit PriceUpdate(1000)

Reactive System Contract detects event

AegisSentinel.react() callback invoked

price < THRESHOLD (1500)?

IService.call() to Unichain

AegisHook.setPanicMode(true)

panicMode = true

Trader calls swap()

PoolManager invokes AegisHook.beforeSwap()

panicMode == true && reputation < 90?

revert PoolPaused()

execute swap

Monitor continues

Sources:[README.md#55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L55-L75)[contracts/README.md#7-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L7-L26)

---

### Reputation Feedback LoopLink copied!

#mermaid-cs7e4cdli2{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-cs7e4cdli2 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-cs7e4cdli2 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-cs7e4cdli2 .error-icon{fill:#a44141;}#mermaid-cs7e4cdli2 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-cs7e4cdli2 .edge-thickness-normal{stroke-width:1px;}#mermaid-cs7e4cdli2 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-cs7e4cdli2 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-cs7e4cdli2 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-cs7e4cdli2 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-cs7e4cdli2 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-cs7e4cdli2 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-cs7e4cdli2 .marker.cross{stroke:lightgrey;}#mermaid-cs7e4cdli2 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-cs7e4cdli2 p{margin:0;}#mermaid-cs7e4cdli2 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-cs7e4cdli2 .cluster-label text{fill:#F9FFFE;}#mermaid-cs7e4cdli2 .cluster-label span{color:#F9FFFE;}#mermaid-cs7e4cdli2 .cluster-label span p{background-color:transparent;}#mermaid-cs7e4cdli2 .label text,#mermaid-cs7e4cdli2 span{fill:#ccc;color:#ccc;}#mermaid-cs7e4cdli2 .node rect,#mermaid-cs7e4cdli2 .node circle,#mermaid-cs7e4cdli2 .node ellipse,#mermaid-cs7e4cdli2 .node polygon,#mermaid-cs7e4cdli2 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-cs7e4cdli2 .rough-node .label text,#mermaid-cs7e4cdli2 .node .label text,#mermaid-cs7e4cdli2 .image-shape .label,#mermaid-cs7e4cdli2 .icon-shape .label{text-anchor:middle;}#mermaid-cs7e4cdli2 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-cs7e4cdli2 .rough-node .label,#mermaid-cs7e4cdli2 .node .label,#mermaid-cs7e4cdli2 .image-shape .label,#mermaid-cs7e4cdli2 .icon-shape .label{text-align:center;}#mermaid-cs7e4cdli2 .node.clickable{cursor:pointer;}#mermaid-cs7e4cdli2 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-cs7e4cdli2 .arrowheadPath{fill:lightgrey;}#mermaid-cs7e4cdli2 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-cs7e4cdli2 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-cs7e4cdli2 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cs7e4cdli2 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-cs7e4cdli2 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cs7e4cdli2 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-cs7e4cdli2 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-cs7e4cdli2 .cluster text{fill:#F9FFFE;}#mermaid-cs7e4cdli2 .cluster span{color:#F9FFFE;}#mermaid-cs7e4cdli2 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-cs7e4cdli2 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-cs7e4cdli2 rect.text{fill:none;stroke-width:0;}#mermaid-cs7e4cdli2 .icon-shape,#mermaid-cs7e4cdli2 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cs7e4cdli2 .icon-shape p,#mermaid-cs7e4cdli2 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-cs7e4cdli2 .icon-shape rect,#mermaid-cs7e4cdli2 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cs7e4cdli2 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-cs7e4cdli2 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-cs7e4cdli2 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

No

Yes

Future swaps benefit

Guardian calls swap() during panic mode

AegisHook.beforeSwap() checks reputation

reputation >= 90?

Allow swap (VIP lane)

Block swap revert PoolPaused()

Swap executes volume recorded

AegisHook calls Registry.recordFeedback()

emit NewFeedback(guardian, volume)

AegisSentinel.react() callback invoked

IService.call() updateReputation()

AegisHook.updateReputation() guardianReputation[addr] += boost

Sources:[README.md#24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L24-L33)[README.md#55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L55-L75)

---

## Summary Table: System ComponentsLink copied!

ComponentTypeChainPurposeKey Functions`AegisHook`Uniswap v4 HookUnichainCircuit breaker gate`beforeSwap()`, `setPanicMode()`, `updateReputation()``AegisSentinel`Reactive ContractReactive NetworkEvent orchestrator`react()`, cross-chain `IService.call()``MockOracle`Price feed simulatorEthereum SepoliaData source`setPrice()`, emits `PriceUpdate``GuardianRegistry`ERC-721 + ERC-8004Ethereum SepoliaIdentity & reputation`mint()`, `recordFeedback()`, emits `NewFeedback`

Sources:[README.md#1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L1-L149)[contracts/README.md#27-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L27-L58)