# AegisSentinelLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json)
- [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json)

Purpose: This document describes the `AegisSentinel` smart contract, which serves as the autonomous orchestration layer deployed on the Reactive Network. It monitors price feed events from Ethereum Sepolia and guardian reputation events, then triggers cross-chain actions on Unichain to activate or deactivate the circuit breaker mechanism.

Scope: This page covers the technical implementation of the Sentinel contract, including its reactive architecture, event subscription model, cross-chain message dispatch, and integration with the Oracle and Hook contracts. For information about the hook that receives these messages, see [AegisHook](#3.1). For details on the oracle that emits price events, see [MockOracle](#3.3). For the reputation system integration, see [Guardian Registry](#3.4).

---

## OverviewLink copied!

`AegisSentinel` is a reactive smart contract that implements autonomous cross-chain event processing. Unlike traditional smart contracts that require external calls to execute logic, reactive contracts on the Reactive Network automatically execute in response to subscribed events from other chains.

Key Characteristics:

- Location: Reactive Network (Lasna testnet, Chain ID: 5318007)
- Role: Event listener and cross-chain message dispatcher
- Autonomy: No keeper bots or manual triggers required
- Deployment Address:`0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6`

The contract bridges two external chains (Sepolia L1 and Unichain L2) without requiring off-chain infrastructure for basic operation, though a fallback relayer exists for resilience (see [Hybrid Relayer](#4.1)).

Sources:[contracts/README.md#39-51](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L39-L51)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#1-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L1-L50)

---

## System IntegrationLink copied!

#mermaid-9km2tn8azs{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-9km2tn8azs .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-9km2tn8azs .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-9km2tn8azs .error-icon{fill:#a44141;}#mermaid-9km2tn8azs .error-text{fill:#ddd;stroke:#ddd;}#mermaid-9km2tn8azs .edge-thickness-normal{stroke-width:1px;}#mermaid-9km2tn8azs .edge-thickness-thick{stroke-width:3.5px;}#mermaid-9km2tn8azs .edge-pattern-solid{stroke-dasharray:0;}#mermaid-9km2tn8azs .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-9km2tn8azs .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-9km2tn8azs .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-9km2tn8azs .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-9km2tn8azs .marker.cross{stroke:lightgrey;}#mermaid-9km2tn8azs svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-9km2tn8azs p{margin:0;}#mermaid-9km2tn8azs .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-9km2tn8azs .cluster-label text{fill:#F9FFFE;}#mermaid-9km2tn8azs .cluster-label span{color:#F9FFFE;}#mermaid-9km2tn8azs .cluster-label span p{background-color:transparent;}#mermaid-9km2tn8azs .label text,#mermaid-9km2tn8azs span{fill:#ccc;color:#ccc;}#mermaid-9km2tn8azs .node rect,#mermaid-9km2tn8azs .node circle,#mermaid-9km2tn8azs .node ellipse,#mermaid-9km2tn8azs .node polygon,#mermaid-9km2tn8azs .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-9km2tn8azs .rough-node .label text,#mermaid-9km2tn8azs .node .label text,#mermaid-9km2tn8azs .image-shape .label,#mermaid-9km2tn8azs .icon-shape .label{text-anchor:middle;}#mermaid-9km2tn8azs .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-9km2tn8azs .rough-node .label,#mermaid-9km2tn8azs .node .label,#mermaid-9km2tn8azs .image-shape .label,#mermaid-9km2tn8azs .icon-shape .label{text-align:center;}#mermaid-9km2tn8azs .node.clickable{cursor:pointer;}#mermaid-9km2tn8azs .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-9km2tn8azs .arrowheadPath{fill:lightgrey;}#mermaid-9km2tn8azs .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-9km2tn8azs .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-9km2tn8azs .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-9km2tn8azs .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-9km2tn8azs .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-9km2tn8azs .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-9km2tn8azs .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-9km2tn8azs .cluster text{fill:#F9FFFE;}#mermaid-9km2tn8azs .cluster span{color:#F9FFFE;}#mermaid-9km2tn8azs div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-9km2tn8azs .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-9km2tn8azs rect.text{fill:none;stroke-width:0;}#mermaid-9km2tn8azs .icon-shape,#mermaid-9km2tn8azs .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-9km2tn8azs .icon-shape p,#mermaid-9km2tn8azs .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-9km2tn8azs .icon-shape rect,#mermaid-9km2tn8azs .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-9km2tn8azs .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-9km2tn8azs .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-9km2tn8azs :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (1301)

Reactive Network (5318007)

Ethereum Sepolia (11155111)

emit PriceUpdate(uint256)

emit NewFeedback(address)

subscribe() mechanism

setPanicMode(bool)

boostReputation(address)

beforeSwap() gate

MockOracle 0x1392...a7D8

GuardianRegistry ERC-721 + ERC-8004

AegisSentinel 0x0B6a...b6B6

ReactiveSystem 0x0000...fffFfF

AegisHook 0x1E2a...8080

Uniswap v4 Pools

Diagram: Cross-Chain Event Flow Architecture

The Sentinel acts as the central processing node that receives events from L1 and dispatches control messages to L2. It does not store liquidity or execute swaps directly; instead, it controls the behavior of the Hook contract which gates access to Uniswap pools.

Sources:[contracts/README.md#9-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L9-L26)[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)

---

## Contract ArchitectureLink copied!

### Inheritance and DependenciesLink copied!

#mermaid-7i2cq6ndv7r{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-7i2cq6ndv7r .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-7i2cq6ndv7r .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-7i2cq6ndv7r .error-icon{fill:#a44141;}#mermaid-7i2cq6ndv7r .error-text{fill:#ddd;stroke:#ddd;}#mermaid-7i2cq6ndv7r .edge-thickness-normal{stroke-width:1px;}#mermaid-7i2cq6ndv7r .edge-thickness-thick{stroke-width:3.5px;}#mermaid-7i2cq6ndv7r .edge-pattern-solid{stroke-dasharray:0;}#mermaid-7i2cq6ndv7r .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-7i2cq6ndv7r .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-7i2cq6ndv7r .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-7i2cq6ndv7r .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-7i2cq6ndv7r .marker.cross{stroke:lightgrey;}#mermaid-7i2cq6ndv7r svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-7i2cq6ndv7r p{margin:0;}#mermaid-7i2cq6ndv7r g.classGroup text{fill:#ccc;stroke:none;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:10px;}#mermaid-7i2cq6ndv7r g.classGroup text .title{font-weight:bolder;}#mermaid-7i2cq6ndv7r .nodeLabel,#mermaid-7i2cq6ndv7r .edgeLabel{color:#e0dfdf;}#mermaid-7i2cq6ndv7r .edgeLabel .label rect{fill:#1f2020;}#mermaid-7i2cq6ndv7r .label text{fill:#e0dfdf;}#mermaid-7i2cq6ndv7r .labelBkg{background:#1f2020;}#mermaid-7i2cq6ndv7r .edgeLabel .label span{background:#1f2020;}#mermaid-7i2cq6ndv7r .classTitle{font-weight:bolder;}#mermaid-7i2cq6ndv7r .node rect,#mermaid-7i2cq6ndv7r .node circle,#mermaid-7i2cq6ndv7r .node ellipse,#mermaid-7i2cq6ndv7r .node polygon,#mermaid-7i2cq6ndv7r .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-7i2cq6ndv7r .divider{stroke:#ccc;stroke-width:1;}#mermaid-7i2cq6ndv7r g.clickable{cursor:pointer;}#mermaid-7i2cq6ndv7r g.classGroup rect{fill:#1f2020;stroke:#ccc;}#mermaid-7i2cq6ndv7r g.classGroup line{stroke:#ccc;stroke-width:1;}#mermaid-7i2cq6ndv7r .classLabel .box{stroke:none;stroke-width:0;fill:#1f2020;opacity:0.5;}#mermaid-7i2cq6ndv7r .classLabel .label{fill:#ccc;font-size:10px;}#mermaid-7i2cq6ndv7r .relation{stroke:lightgrey;stroke-width:1;fill:none;}#mermaid-7i2cq6ndv7r .dashed-line{stroke-dasharray:3;}#mermaid-7i2cq6ndv7r .dotted-line{stroke-dasharray:1 2;}#mermaid-7i2cq6ndv7r #compositionStart,#mermaid-7i2cq6ndv7r .composition{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #compositionEnd,#mermaid-7i2cq6ndv7r .composition{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #dependencyStart,#mermaid-7i2cq6ndv7r .dependency{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #dependencyStart,#mermaid-7i2cq6ndv7r .dependency{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #extensionStart,#mermaid-7i2cq6ndv7r .extension{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #extensionEnd,#mermaid-7i2cq6ndv7r .extension{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #aggregationStart,#mermaid-7i2cq6ndv7r .aggregation{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #aggregationEnd,#mermaid-7i2cq6ndv7r .aggregation{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #lollipopStart,#mermaid-7i2cq6ndv7r .lollipop{fill:#1f2020!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r #lollipopEnd,#mermaid-7i2cq6ndv7r .lollipop{fill:#1f2020!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-7i2cq6ndv7r .edgeTerminals{font-size:11px;line-height:initial;}#mermaid-7i2cq6ndv7r .classTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-7i2cq6ndv7r .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-7i2cq6ndv7r .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-7i2cq6ndv7r :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

extends

uses vm

«abstract»

AbstractReactive

#vm: IReactive

+react(uint256 chain, address emitter, bytes data)

+subscribe(uint256 chainId, address emitter, uint256 topic)

AegisSentinel

-address SYSTEM_CONTRACT

-address ORACLE_ADDRESS

-address HOOK_ADDRESS

-uint256 PRICE_THRESHOLD

-address owner

+constructor(address system, address oracle, address hook)

+react(uint256 chain, address, bytes calldata payload)

-handlePriceUpdate(uint256 price)

-handleGuardianFeedback(address guardian)

«interface»

IReactive

+subscribe(uint256,address,uint256,uint256,uint256,uint256)

Diagram: Contract Inheritance Structure

The `AegisSentinel` extends `AbstractReactive` from the Reactive Network SDK, which provides the foundational event subscription and reaction framework. The contract inherits the `react()` function signature that gets automatically called when subscribed events are emitted.

Sources:[contracts/README.md#39-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L39-L44)

---

## Constructor and InitializationLink copied!

The contract is initialized with three critical addresses during deployment:

```
constructor(
    address _systemContract,  // 0x0000000000000000000000000000000000fffFfF
    address _oracleAddress,   // 0xBaa0573e3BE4291b58083e717E9EF5051772C080
    address _hookAddress      // 0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b
)
```

Constructor Parameters:

ParameterTypePurposeDeployed Value`_systemContract``address`Reactive Network system contract for subscriptions`0x0000...fffFfF``_oracleAddress``address`MockOracle on Sepolia to monitor`0xBaa0...C080``_hookAddress``address`AegisHook on Unichain to control`0x29f8...BA3b`

Post-Deployment Subscription:

After contract deployment, a separate subscription transaction must be sent to register event topics. This is performed manually using the Reactive Network's subscription mechanism:

```
vm.subscribe(
    11155111,           // Sepolia chain ID
    ORACLE_ADDRESS,     // Contract to monitor
    PRICE_UPDATE_TOPIC, // Event topic to listen for
    REACTIVE_IGNORE,    // Subscription parameters
    REACTIVE_IGNORE,
    REACTIVE_IGNORE
);
```

This subscription establishes the reactive binding that triggers the Sentinel when the Oracle emits events.

Sources:[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#9-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L9-L13)[contracts/README.md#113-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L113-L116)

---

## State Variables and ConstantsLink copied!

### Core ConfigurationLink copied!

VariableTypeVisibilityPurposeValue`PRICE_THRESHOLD``uint256``private`Price below which panic mode activates1500 (represents $1500)`ORACLE_ADDRESS``address``immutable`Address of price feed oracleSet in constructor`HOOK_ADDRESS``address``immutable`Address of target hook contractSet in constructor`owner``address``public`Contract owner for access controlDeployer address

### Event TopicsLink copied!

The contract monitors specific event signatures using their keccak256 topic hashes:

```
bytes32 constant PRICE_UPDATE_TOPIC = keccak256("PriceUpdate(uint256)");
bytes32 constant NEW_FEEDBACK_TOPIC = keccak256("NewFeedback(address)");
```

These topics are used in the subscription mechanism to filter which events trigger the `react()` function.

Sources:[contracts/README.md#42-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L43)[contracts/README.md#64-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L64-L68)

---

## Event Reaction MechanismLink copied!

### The react() FunctionLink copied!

The core of the Sentinel's functionality is the `react()` function, which is automatically invoked by the Reactive Network when subscribed events occur:

"AegisHook (L2)""Internal Logic""AegisSentinel.react()""Reactive Network""MockOracle (L1)""AegisHook (L2)""Internal Logic""AegisSentinel.react()""Reactive Network""MockOracle (L1)"#mermaid-48nhbob72oi{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-48nhbob72oi .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-48nhbob72oi .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-48nhbob72oi .error-icon{fill:#a44141;}#mermaid-48nhbob72oi .error-text{fill:#ddd;stroke:#ddd;}#mermaid-48nhbob72oi .edge-thickness-normal{stroke-width:1px;}#mermaid-48nhbob72oi .edge-thickness-thick{stroke-width:3.5px;}#mermaid-48nhbob72oi .edge-pattern-solid{stroke-dasharray:0;}#mermaid-48nhbob72oi .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-48nhbob72oi .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-48nhbob72oi .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-48nhbob72oi .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-48nhbob72oi .marker.cross{stroke:lightgrey;}#mermaid-48nhbob72oi svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-48nhbob72oi p{margin:0;}#mermaid-48nhbob72oi .actor{stroke:#ccc;fill:#1f2020;}#mermaid-48nhbob72oi text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-48nhbob72oi .actor-line{stroke:#ccc;}#mermaid-48nhbob72oi .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-48nhbob72oi .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-48nhbob72oi .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-48nhbob72oi #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-48nhbob72oi .sequenceNumber{fill:black;}#mermaid-48nhbob72oi #sequencenumber{fill:lightgrey;}#mermaid-48nhbob72oi #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-48nhbob72oi .messageText{fill:lightgrey;stroke:none;}#mermaid-48nhbob72oi .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-48nhbob72oi .labelText,#mermaid-48nhbob72oi .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-48nhbob72oi .loopText,#mermaid-48nhbob72oi .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-48nhbob72oi .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-48nhbob72oi .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-48nhbob72oi .noteText,#mermaid-48nhbob72oi .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-48nhbob72oi .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-48nhbob72oi .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-48nhbob72oi .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-48nhbob72oi .actorPopupMenu{position:absolute;}#mermaid-48nhbob72oi .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-48nhbob72oi .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-48nhbob72oi .actor-man circle,#mermaid-48nhbob72oi line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-48nhbob72oi :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}alt[Price Crash Detected][Price Normal]"emit PriceUpdate(1000)""react(11155111 | oracleAddr | payload)""decode payload""price < 1500?""Cross-chain: setPanicMode(true)""Transaction dispatched""No action"

Diagram: Reactive Event Processing Flow

The function signature follows the Reactive Network standard:

```
function react(
    uint256 chainId,       // Source chain where event originated
    address emitter,       // Contract that emitted the event
    bytes calldata payload // ABI-encoded event data
) external
```

Access Control: Only the Reactive Network system contract can call this function. The check is performed via:

```
require(msg.sender == SYSTEM_CONTRACT, "VM only");
```

Sources:[contracts/README.md#42-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L43)

---

## Price Crash Detection LogicLink copied!

### Threshold ComparisonLink copied!

When a `PriceUpdate` event is received, the Sentinel decodes the price value and compares it against the threshold:

#mermaid-6ysah288q2i{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-6ysah288q2i .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-6ysah288q2i .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-6ysah288q2i .error-icon{fill:#a44141;}#mermaid-6ysah288q2i .error-text{fill:#ddd;stroke:#ddd;}#mermaid-6ysah288q2i .edge-thickness-normal{stroke-width:1px;}#mermaid-6ysah288q2i .edge-thickness-thick{stroke-width:3.5px;}#mermaid-6ysah288q2i .edge-pattern-solid{stroke-dasharray:0;}#mermaid-6ysah288q2i .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-6ysah288q2i .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-6ysah288q2i .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-6ysah288q2i .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-6ysah288q2i .marker.cross{stroke:lightgrey;}#mermaid-6ysah288q2i svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-6ysah288q2i p{margin:0;}#mermaid-6ysah288q2i .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-6ysah288q2i .cluster-label text{fill:#F9FFFE;}#mermaid-6ysah288q2i .cluster-label span{color:#F9FFFE;}#mermaid-6ysah288q2i .cluster-label span p{background-color:transparent;}#mermaid-6ysah288q2i .label text,#mermaid-6ysah288q2i span{fill:#ccc;color:#ccc;}#mermaid-6ysah288q2i .node rect,#mermaid-6ysah288q2i .node circle,#mermaid-6ysah288q2i .node ellipse,#mermaid-6ysah288q2i .node polygon,#mermaid-6ysah288q2i .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-6ysah288q2i .rough-node .label text,#mermaid-6ysah288q2i .node .label text,#mermaid-6ysah288q2i .image-shape .label,#mermaid-6ysah288q2i .icon-shape .label{text-anchor:middle;}#mermaid-6ysah288q2i .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-6ysah288q2i .rough-node .label,#mermaid-6ysah288q2i .node .label,#mermaid-6ysah288q2i .image-shape .label,#mermaid-6ysah288q2i .icon-shape .label{text-align:center;}#mermaid-6ysah288q2i .node.clickable{cursor:pointer;}#mermaid-6ysah288q2i .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-6ysah288q2i .arrowheadPath{fill:lightgrey;}#mermaid-6ysah288q2i .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-6ysah288q2i .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-6ysah288q2i .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-6ysah288q2i .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-6ysah288q2i .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-6ysah288q2i .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-6ysah288q2i .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-6ysah288q2i .cluster text{fill:#F9FFFE;}#mermaid-6ysah288q2i .cluster span{color:#F9FFFE;}#mermaid-6ysah288q2i div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-6ysah288q2i .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-6ysah288q2i rect.text{fill:none;stroke-width:0;}#mermaid-6ysah288q2i .icon-shape,#mermaid-6ysah288q2i .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-6ysah288q2i .icon-shape p,#mermaid-6ysah288q2i .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-6ysah288q2i .icon-shape rect,#mermaid-6ysah288q2i .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-6ysah288q2i .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-6ysah288q2i .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-6ysah288q2i :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Yes - CRASH

No - Normal

PriceUpdate event received

Decode uint256 price

price < PRICE_THRESHOLD (1500)?

Prepare setPanicMode(true) call

No action, return

Encode cross-chain message

Dispatch to HOOK_ADDRESS on L2

Emit PanicTriggered event

End

Diagram: Price Crash Detection Algorithm

### Example ScenarioLink copied!

Starting PriceNew PricePercentage DropAction$3000$100066.7%TRIGGER PANIC$2500$160036%No action$1800$100044.4%TRIGGER PANIC$1400$120014.3%No action (already below)

The system is designed to detect "Black Swan" market crash events that pose significant risk to liquidity providers through Loss-Versus-Rebalancing (LVR).

Sources:[contracts/README.md#18-19](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L18-L19)[contracts/README.md#49-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L49-L50)

---

## Cross-Chain Message DispatchLink copied!

### Message EncodingLink copied!

When the Sentinel needs to control the Hook, it constructs a cross-chain message using the following pattern:

```
// For panic mode activation
bytes memory payload = abi.encodeWithSignature(
    "setPanicMode(bool)",
    true  // or false to deactivate
);
 
// Dispatch cross-chain call
_sendCrossChainMessage(
    1301,         // Unichain chain ID
    HOOK_ADDRESS,
    payload
);
```

### Reputation BoostingLink copied!

The Sentinel also synchronizes reputation data from L1 to L2 when guardians provide heroic interventions:

```
// When NewFeedback(address guardian) is emitted
bytes memory payload = abi.encodeWithSignature(
    "boostReputation(address)",
    guardianAddress
);
```

This creates a bidirectional reputation system where actions on L2 (recorded to L1) trigger benefits back on L2.

Sources:[contracts/README.md#44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L44-L44)

---

## Function ReferenceLink copied!

### Public View FunctionsLink copied!

FunctionReturnsDescription`owner()``address`Returns the contract owner`PRICE_THRESHOLD()``uint256`Returns the panic threshold value`ORACLE_ADDRESS()``address`Returns the monitored oracle address`HOOK_ADDRESS()``address`Returns the controlled hook address

### External State-Changing FunctionsLink copied!

FunctionAccessPurpose`react(uint256, address, bytes)`System onlyProcesses incoming reactive events`subscribe(...)`Owner onlyManages event subscriptions`updateThreshold(uint256)`Owner onlyAdjusts price threshold

Sources:[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#14-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L14-L18)

---

## Deployment DetailsLink copied!

### Deployment TransactionLink copied!

#mermaid-em9zik47o9n{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-em9zik47o9n .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-em9zik47o9n .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-em9zik47o9n .error-icon{fill:#a44141;}#mermaid-em9zik47o9n .error-text{fill:#ddd;stroke:#ddd;}#mermaid-em9zik47o9n .edge-thickness-normal{stroke-width:1px;}#mermaid-em9zik47o9n .edge-thickness-thick{stroke-width:3.5px;}#mermaid-em9zik47o9n .edge-pattern-solid{stroke-dasharray:0;}#mermaid-em9zik47o9n .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-em9zik47o9n .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-em9zik47o9n .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-em9zik47o9n .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-em9zik47o9n .marker.cross{stroke:lightgrey;}#mermaid-em9zik47o9n svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-em9zik47o9n p{margin:0;}#mermaid-em9zik47o9n .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-em9zik47o9n .cluster-label text{fill:#F9FFFE;}#mermaid-em9zik47o9n .cluster-label span{color:#F9FFFE;}#mermaid-em9zik47o9n .cluster-label span p{background-color:transparent;}#mermaid-em9zik47o9n .label text,#mermaid-em9zik47o9n span{fill:#ccc;color:#ccc;}#mermaid-em9zik47o9n .node rect,#mermaid-em9zik47o9n .node circle,#mermaid-em9zik47o9n .node ellipse,#mermaid-em9zik47o9n .node polygon,#mermaid-em9zik47o9n .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-em9zik47o9n .rough-node .label text,#mermaid-em9zik47o9n .node .label text,#mermaid-em9zik47o9n .image-shape .label,#mermaid-em9zik47o9n .icon-shape .label{text-anchor:middle;}#mermaid-em9zik47o9n .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-em9zik47o9n .rough-node .label,#mermaid-em9zik47o9n .node .label,#mermaid-em9zik47o9n .image-shape .label,#mermaid-em9zik47o9n .icon-shape .label{text-align:center;}#mermaid-em9zik47o9n .node.clickable{cursor:pointer;}#mermaid-em9zik47o9n .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-em9zik47o9n .arrowheadPath{fill:lightgrey;}#mermaid-em9zik47o9n .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-em9zik47o9n .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-em9zik47o9n .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-em9zik47o9n .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-em9zik47o9n .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-em9zik47o9n .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-em9zik47o9n .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-em9zik47o9n .cluster text{fill:#F9FFFE;}#mermaid-em9zik47o9n .cluster span{color:#F9FFFE;}#mermaid-em9zik47o9n div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-em9zik47o9n .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-em9zik47o9n rect.text{fill:none;stroke-width:0;}#mermaid-em9zik47o9n .icon-shape,#mermaid-em9zik47o9n .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-em9zik47o9n .icon-shape p,#mermaid-em9zik47o9n .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-em9zik47o9n .icon-shape rect,#mermaid-em9zik47o9n .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-em9zik47o9n .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-em9zik47o9n .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-em9zik47o9n :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

CREATE tx

Deploy bytecode

Later moved to

Deployer Account 0xd2df...e2a

Contract Factory

AegisSentinel 0x0f76...b482

Final Address 0x0B6a...b6B6

Diagram: Deployment Process

### Transaction DetailsLink copied!

PropertyValueTransaction Hash`0x98d0ea4fda0f82a98d840f2df750a61cdcb3265acf6f54e9653a59aa76d8fa89`Deployed Address`0x0f764437ffbe1fcd0d0d276a164610422710b482`Block Number2178310 (0x213d06)Gas Used1107184 (0x10e4f0)Gas Price112 gwei (0x1a13b86000)NetworkReactive Lasna (Chain ID: 5318007)Transaction TypeLegacy (Type 0)

### Deployment CommandLink copied!

```
forge script script/05_DeploySentinel.s.sol \
  --rpc-url reactive \
  --broadcast \
  --legacy
```

Note on Legacy Flag: The `--legacy` flag is required for Reactive Network deployment as the network does not yet support EIP-1559 transaction types.

Sources:[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#27-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L27-L42)[contracts/README.md#113-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L113-L116)

---

## Integration PointsLink copied!

### Oracle IntegrationLink copied!

The Sentinel subscribes to the `PriceUpdate(uint256)` event from MockOracle:

```
event PriceUpdate(uint256 newPrice);
```

Event Subscription:

- Source Chain: Ethereum Sepolia (11155111)
- Contract:`0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`
- Topic:`keccak256("PriceUpdate(uint256)")`

### Hook IntegrationLink copied!

The Sentinel controls the AegisHook via two primary functions:

```
// Panic mode control
function setPanicMode(bool _panic) external;
 
// Reputation management
function boostReputation(address guardian) external;
```

Access Control: The Hook contract validates that `msg.sender` matches the authorized Sentinel address before executing these functions.

Sources:[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)

---

## Event EmissionsLink copied!

The Sentinel emits events to provide observability into its operations:

EventParametersPurpose`PanicTriggered``uint256 price, uint256 timestamp`Emitted when crash detection triggers panic mode`PanicDeactivated``uint256 timestamp`Emitted when market stabilizes`ReputationSynced``address guardian`Emitted when reputation boost is sent to L2

These events can be monitored by the frontend dashboard for real-time system status updates.

Sources:[contracts/README.md#42-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L43)

---

## Access Control ModelLink copied!

#mermaid-gqtyc6wd0b{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-gqtyc6wd0b .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-gqtyc6wd0b .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-gqtyc6wd0b .error-icon{fill:#a44141;}#mermaid-gqtyc6wd0b .error-text{fill:#ddd;stroke:#ddd;}#mermaid-gqtyc6wd0b .edge-thickness-normal{stroke-width:1px;}#mermaid-gqtyc6wd0b .edge-thickness-thick{stroke-width:3.5px;}#mermaid-gqtyc6wd0b .edge-pattern-solid{stroke-dasharray:0;}#mermaid-gqtyc6wd0b .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-gqtyc6wd0b .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-gqtyc6wd0b .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-gqtyc6wd0b .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-gqtyc6wd0b .marker.cross{stroke:lightgrey;}#mermaid-gqtyc6wd0b svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-gqtyc6wd0b p{margin:0;}#mermaid-gqtyc6wd0b .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-gqtyc6wd0b .cluster-label text{fill:#F9FFFE;}#mermaid-gqtyc6wd0b .cluster-label span{color:#F9FFFE;}#mermaid-gqtyc6wd0b .cluster-label span p{background-color:transparent;}#mermaid-gqtyc6wd0b .label text,#mermaid-gqtyc6wd0b span{fill:#ccc;color:#ccc;}#mermaid-gqtyc6wd0b .node rect,#mermaid-gqtyc6wd0b .node circle,#mermaid-gqtyc6wd0b .node ellipse,#mermaid-gqtyc6wd0b .node polygon,#mermaid-gqtyc6wd0b .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-gqtyc6wd0b .rough-node .label text,#mermaid-gqtyc6wd0b .node .label text,#mermaid-gqtyc6wd0b .image-shape .label,#mermaid-gqtyc6wd0b .icon-shape .label{text-anchor:middle;}#mermaid-gqtyc6wd0b .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-gqtyc6wd0b .rough-node .label,#mermaid-gqtyc6wd0b .node .label,#mermaid-gqtyc6wd0b .image-shape .label,#mermaid-gqtyc6wd0b .icon-shape .label{text-align:center;}#mermaid-gqtyc6wd0b .node.clickable{cursor:pointer;}#mermaid-gqtyc6wd0b .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-gqtyc6wd0b .arrowheadPath{fill:lightgrey;}#mermaid-gqtyc6wd0b .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-gqtyc6wd0b .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-gqtyc6wd0b .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-gqtyc6wd0b .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-gqtyc6wd0b .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-gqtyc6wd0b .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-gqtyc6wd0b .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-gqtyc6wd0b .cluster text{fill:#F9FFFE;}#mermaid-gqtyc6wd0b .cluster span{color:#F9FFFE;}#mermaid-gqtyc6wd0b div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-gqtyc6wd0b .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-gqtyc6wd0b rect.text{fill:none;stroke-width:0;}#mermaid-gqtyc6wd0b .icon-shape,#mermaid-gqtyc6wd0b .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-gqtyc6wd0b .icon-shape p,#mermaid-gqtyc6wd0b .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-gqtyc6wd0b .icon-shape rect,#mermaid-gqtyc6wd0b .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-gqtyc6wd0b .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-gqtyc6wd0b .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-gqtyc6wd0b :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Can call react()

Can call admin functions

Can call setPanicMode()

Can call boostReputation()

Cannot call

Reactive System 0x0000...fffFfF

AegisSentinel

Owner Address 0xd2df...e2a

AegisHook

Any Address

Diagram: Permission Hierarchy

The contract implements a strict access control model:

1. System-Only Functions: Only the Reactive Network system contract can trigger `react()`
2. Owner-Only Functions: Administrative functions like threshold updates require owner signature
3. No Public Entry Points: The contract cannot be manipulated by arbitrary callers

This design ensures that the autonomous behavior cannot be exploited or manipulated by malicious actors.

Sources:[contracts/README.md#42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L44)

---

## Gas ConsiderationsLink copied!

### Deployment Gas CostLink copied!

The initial deployment consumed 1,107,184 gas (1.1M gas), which is substantial due to:

- Complex reactive event processing logic
- Cross-chain message encoding machinery
- Multiple state variable initialization
- Event subscription setup

### Operational Gas CostLink copied!

Each time `react()` is invoked:

1. Event decoding: ~5,000 gas
2. Threshold comparison: ~2,000 gas
3. Cross-chain message construction: ~10,000 gas
4. Message dispatch: ~50,000 gas (handled by Reactive Network)

The Reactive Network subsidizes the execution of `react()` functions, meaning the contract does not need to hold native tokens for operation after deployment.

Sources:[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#37-38](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L37-L38)

---

## Testing and VerificationLink copied!

The Sentinel can be tested by simulating price updates on the MockOracle:

```
# Trigger a crash scenario
cast send $ORACLE_ADDRESS "setPrice(uint256)" 1000 \
  --rpc-url sepolia \
  --private-key $PRIVATE_KEY
 
# Verify Sentinel reacted
cast logs --address $SENTINEL_ADDRESS \
  --event "PanicTriggered(uint256,uint256)" \
  --rpc-url reactive
 
# Verify Hook received message
cast call $HOOK_ADDRESS "panicMode()" \
  --rpc-url unichain_sepolia
```

Expected Result: The Hook's `panicMode` should return `true` after the Sentinel processes the crash event.

Sources:[contracts/README.md#108-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L108-L110)[contracts/README.md#89-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L89-L94)

---

## Limitations and ConsiderationsLink copied!

### Network DependencyLink copied!

The Sentinel is entirely dependent on the Reactive Network's infrastructure:

- If Reactive Network experiences downtime, the circuit breaker cannot activate
- See [Hybrid Relayer](#4.1) for the fallback mechanism that mitigates this risk

### Subscription ManagementLink copied!

Event subscriptions are not automatically renewable. If the subscription expires or is revoked, the Sentinel will stop receiving events. Operators must monitor subscription status.

### Single Oracle DependencyLink copied!

The current implementation monitors only one oracle address. For production systems, multiple oracle sources should be aggregated to prevent single points of failure.

### Cross-Chain LatencyLink copied!

There is inherent latency in cross-chain messaging:

1. L1 Block Confirmation: ~12 seconds
2. Reactive Network Processing: ~2-5 seconds
3. L2 Message Delivery: ~0.25 seconds (Unichain Flashblocks)

Total Latency: Approximately 15-20 seconds from Oracle emission to Hook activation.

Sources:[contracts/README.md#64-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L64-L68)

---

## Related ComponentsLink copied!

- [AegisHook](#3.1) - The L2 contract that receives control messages from the Sentinel
- [MockOracle](#3.3) - The L1 price feed that the Sentinel monitors
- [Guardian Registry](#3.4) - The reputation system that the Sentinel synchronizes
- [Deployment Scripts](#5.1) - Scripts used to deploy and configure the Sentinel
- [Hybrid Relayer](#4.1) - Fallback mechanism for when Reactive Network is unavailable

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)