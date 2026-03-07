# MockOracleLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json)
- [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json)

## Purpose and ScopeLink copied!

This document describes the `MockOracle` contract, a test oracle deployed on Ethereum Sepolia (L1) that simulates price feed behavior for the Aegis circuit breaker system. The MockOracle emits `PriceUpdate` events that trigger the AegisSentinel on the Reactive Network to activate circuit breaker protection on Unichain.

For information about how the Sentinel processes these price updates, see [AegisSentinel](#3.2). For details on the circuit breaker activation mechanism, see [Circuit Breaker Mechanism](#2.2).

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)

---

## OverviewLink copied!

The MockOracle contract serves as a controllable price feed oracle for testing and demonstration purposes. It provides a deterministic way to trigger market crash simulations by allowing manual price updates via the `setPrice()` function. In production deployments, this contract would be replaced with a live Chainlink price feed oracle without requiring changes to downstream contracts.

### Key CharacteristicsLink copied!

PropertyValueNetworkEthereum Sepolia (Chain ID: 11155111)Deployed Address`0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b`PurposeSimulate ETH price feed for circuit breaker testingInitial Price2000 ETH (2000000000000000000000 wei)Access ControlOwner-only price updates

Sources:[contracts/README.md#101-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L101-L104)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L1-L46)

---

## Contract ArchitectureLink copied!

The MockOracle implements a minimal oracle interface consisting of price storage, an owner access control pattern, and event emission for cross-chain listeners.

### MockOracle System PositionLink copied!

#mermaid-8v6a5haiphh{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-8v6a5haiphh .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-8v6a5haiphh .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-8v6a5haiphh .error-icon{fill:#a44141;}#mermaid-8v6a5haiphh .error-text{fill:#ddd;stroke:#ddd;}#mermaid-8v6a5haiphh .edge-thickness-normal{stroke-width:1px;}#mermaid-8v6a5haiphh .edge-thickness-thick{stroke-width:3.5px;}#mermaid-8v6a5haiphh .edge-pattern-solid{stroke-dasharray:0;}#mermaid-8v6a5haiphh .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-8v6a5haiphh .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-8v6a5haiphh .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-8v6a5haiphh .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-8v6a5haiphh .marker.cross{stroke:lightgrey;}#mermaid-8v6a5haiphh svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-8v6a5haiphh p{margin:0;}#mermaid-8v6a5haiphh .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-8v6a5haiphh .cluster-label text{fill:#F9FFFE;}#mermaid-8v6a5haiphh .cluster-label span{color:#F9FFFE;}#mermaid-8v6a5haiphh .cluster-label span p{background-color:transparent;}#mermaid-8v6a5haiphh .label text,#mermaid-8v6a5haiphh span{fill:#ccc;color:#ccc;}#mermaid-8v6a5haiphh .node rect,#mermaid-8v6a5haiphh .node circle,#mermaid-8v6a5haiphh .node ellipse,#mermaid-8v6a5haiphh .node polygon,#mermaid-8v6a5haiphh .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-8v6a5haiphh .rough-node .label text,#mermaid-8v6a5haiphh .node .label text,#mermaid-8v6a5haiphh .image-shape .label,#mermaid-8v6a5haiphh .icon-shape .label{text-anchor:middle;}#mermaid-8v6a5haiphh .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-8v6a5haiphh .rough-node .label,#mermaid-8v6a5haiphh .node .label,#mermaid-8v6a5haiphh .image-shape .label,#mermaid-8v6a5haiphh .icon-shape .label{text-align:center;}#mermaid-8v6a5haiphh .node.clickable{cursor:pointer;}#mermaid-8v6a5haiphh .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-8v6a5haiphh .arrowheadPath{fill:lightgrey;}#mermaid-8v6a5haiphh .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-8v6a5haiphh .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-8v6a5haiphh .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8v6a5haiphh .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-8v6a5haiphh .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8v6a5haiphh .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-8v6a5haiphh .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-8v6a5haiphh .cluster text{fill:#F9FFFE;}#mermaid-8v6a5haiphh .cluster span{color:#F9FFFE;}#mermaid-8v6a5haiphh div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-8v6a5haiphh .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-8v6a5haiphh rect.text{fill:none;stroke-width:0;}#mermaid-8v6a5haiphh .icon-shape,#mermaid-8v6a5haiphh .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8v6a5haiphh .icon-shape p,#mermaid-8v6a5haiphh .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-8v6a5haiphh .icon-shape rect,#mermaid-8v6a5haiphh .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8v6a5haiphh .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-8v6a5haiphh .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-8v6a5haiphh :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

setPrice(uint256)

emit PriceUpdate

Cross-chain subscription

Triggers panic mode

Owner Account (0xd2df...be2a)

MockOracle Sepolia L1 0x29f8...ba3b

PriceUpdate Event (newPrice, timestamp)

AegisSentinel Reactive Network 0x0B6a...b6B6

AegisHook Unichain L2 0x1E2a...8080

Sources:[contracts/README.md#12-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L12-L26)

---

## State VariablesLink copied!

The contract maintains two primary state variables:

### `price` (uint256)Link copied!

Stores the current price value in wei. This represents the simulated ETH price feed value. The initial value is set to `2000000000000000000000` wei (2000 ETH) in the constructor.

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

### `owner` (address)Link copied!

Stores the address authorized to call `setPrice()`. Set to the deployer address (`msg.sender`) in the constructor. The deployed contract has owner address `0xd2df53d9791e98db221842dd085f4144014bbe2a`.

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

---

## EventsLink copied!

### `PriceUpdate`Link copied!

Emitted whenever the price is updated via `setPrice()`.

Event Signature:

```
event PriceUpdate(uint256 newPrice, uint256 timestamp)
```

Parameters:

ParameterTypeDescription`newPrice``uint256`The new price value in wei`timestamp``uint256`Block timestamp when price was updated

This event is the critical trigger mechanism for the Aegis system. The AegisSentinel contract on the Reactive Network subscribes to this event and monitors for price drops below the crash threshold.

Sources:[contracts/README.md#14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L14-L14)[contracts/README.md#42-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L43)

---

## FunctionsLink copied!

### ConstructorLink copied!

Initializes the contract by setting the deployer as owner and establishing the initial price at 2000 ETH.

Behavior:

1. Sets `owner` to `msg.sender`
2. Sets initial `price` to `2000000000000000000000` wei (2000 ETH)

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

### `setPrice(uint256 newPrice)`Link copied!

Updates the stored price and emits a `PriceUpdate` event. This function is restricted to the contract owner.

Parameters:

- `newPrice`: The new price value to set (in wei)

Access Control: Owner-only (enforced via modifier or require statement)

Side Effects:

1. Updates storage variable `price` to `newPrice`
2. Emits `PriceUpdate(newPrice, block.timestamp)`

Usage Example:
To simulate a 50% market crash from 2000 ETH to 1000 ETH:

```
cast send $ORACLE_ADDRESS "setPrice(uint256)" 1000000000000000000000 \
  --rpc-url sepolia --private-key $PRIVATE_KEY
```

Sources:[contracts/README.md#50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L50-L50)

### `price()` (view)Link copied!

Returns the current stored price value.

Returns:`uint256` - Current price in wei

Sources:[contracts/README.md#49-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L49-L50)

### `owner()` (view)Link copied!

Returns the address authorized to update prices.

Returns:`address` - Owner address

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L11-L11)

---

## Price Update FlowLink copied!

The following diagram shows how a price update propagates through the Aegis system:

### Price Event PropagationLink copied!

"AegisHook panicMode state""AegisSentinel react() function""Reactive Network Event System""PriceUpdate Event Sepolia logs""MockOracle price storage""Owner EOA""AegisHook panicMode state""AegisSentinel react() function""Reactive Network Event System""PriceUpdate Event Sepolia logs""MockOracle price storage""Owner EOA"#mermaid-fzxg9mqgzgu{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-fzxg9mqgzgu .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-fzxg9mqgzgu .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-fzxg9mqgzgu .error-icon{fill:#a44141;}#mermaid-fzxg9mqgzgu .error-text{fill:#ddd;stroke:#ddd;}#mermaid-fzxg9mqgzgu .edge-thickness-normal{stroke-width:1px;}#mermaid-fzxg9mqgzgu .edge-thickness-thick{stroke-width:3.5px;}#mermaid-fzxg9mqgzgu .edge-pattern-solid{stroke-dasharray:0;}#mermaid-fzxg9mqgzgu .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-fzxg9mqgzgu .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-fzxg9mqgzgu .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-fzxg9mqgzgu .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-fzxg9mqgzgu .marker.cross{stroke:lightgrey;}#mermaid-fzxg9mqgzgu svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-fzxg9mqgzgu p{margin:0;}#mermaid-fzxg9mqgzgu .actor{stroke:#ccc;fill:#1f2020;}#mermaid-fzxg9mqgzgu text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-fzxg9mqgzgu .actor-line{stroke:#ccc;}#mermaid-fzxg9mqgzgu .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-fzxg9mqgzgu .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-fzxg9mqgzgu .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-fzxg9mqgzgu #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-fzxg9mqgzgu .sequenceNumber{fill:black;}#mermaid-fzxg9mqgzgu #sequencenumber{fill:lightgrey;}#mermaid-fzxg9mqgzgu #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-fzxg9mqgzgu .messageText{fill:lightgrey;stroke:none;}#mermaid-fzxg9mqgzgu .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-fzxg9mqgzgu .labelText,#mermaid-fzxg9mqgzgu .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-fzxg9mqgzgu .loopText,#mermaid-fzxg9mqgzgu .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-fzxg9mqgzgu .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-fzxg9mqgzgu .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-fzxg9mqgzgu .noteText,#mermaid-fzxg9mqgzgu .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-fzxg9mqgzgu .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-fzxg9mqgzgu .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-fzxg9mqgzgu .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-fzxg9mqgzgu .actorPopupMenu{position:absolute;}#mermaid-fzxg9mqgzgu .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-fzxg9mqgzgu .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-fzxg9mqgzgu .actor-man circle,#mermaid-fzxg9mqgzgu line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-fzxg9mqgzgu :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"Circuit breaker activated Swaps now blocked""setPrice(1000)""price = 1000""emit PriceUpdate(1000 | timestamp)""Event indexed in logs""Trigger react() callback""Check: price < THRESHOLD (1500)""Condition: TRUE (crash detected)""Cross-chain: setPanicMode(true)""panicMode = true"

Sources:[contracts/README.md#12-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L12-L26)[contracts/README.md#42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L42-L44)

---

## Integration with Aegis SystemLink copied!

### Event Subscription ArchitectureLink copied!

The MockOracle functions as the L1 trigger point in the three-chain Aegis architecture:

#mermaid-quu9y6xojt{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-quu9y6xojt .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-quu9y6xojt .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-quu9y6xojt .error-icon{fill:#a44141;}#mermaid-quu9y6xojt .error-text{fill:#ddd;stroke:#ddd;}#mermaid-quu9y6xojt .edge-thickness-normal{stroke-width:1px;}#mermaid-quu9y6xojt .edge-thickness-thick{stroke-width:3.5px;}#mermaid-quu9y6xojt .edge-pattern-solid{stroke-dasharray:0;}#mermaid-quu9y6xojt .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-quu9y6xojt .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-quu9y6xojt .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-quu9y6xojt .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-quu9y6xojt .marker.cross{stroke:lightgrey;}#mermaid-quu9y6xojt svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-quu9y6xojt p{margin:0;}#mermaid-quu9y6xojt .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-quu9y6xojt .cluster-label text{fill:#F9FFFE;}#mermaid-quu9y6xojt .cluster-label span{color:#F9FFFE;}#mermaid-quu9y6xojt .cluster-label span p{background-color:transparent;}#mermaid-quu9y6xojt .label text,#mermaid-quu9y6xojt span{fill:#ccc;color:#ccc;}#mermaid-quu9y6xojt .node rect,#mermaid-quu9y6xojt .node circle,#mermaid-quu9y6xojt .node ellipse,#mermaid-quu9y6xojt .node polygon,#mermaid-quu9y6xojt .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-quu9y6xojt .rough-node .label text,#mermaid-quu9y6xojt .node .label text,#mermaid-quu9y6xojt .image-shape .label,#mermaid-quu9y6xojt .icon-shape .label{text-anchor:middle;}#mermaid-quu9y6xojt .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-quu9y6xojt .rough-node .label,#mermaid-quu9y6xojt .node .label,#mermaid-quu9y6xojt .image-shape .label,#mermaid-quu9y6xojt .icon-shape .label{text-align:center;}#mermaid-quu9y6xojt .node.clickable{cursor:pointer;}#mermaid-quu9y6xojt .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-quu9y6xojt .arrowheadPath{fill:lightgrey;}#mermaid-quu9y6xojt .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-quu9y6xojt .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-quu9y6xojt .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-quu9y6xojt .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-quu9y6xojt .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-quu9y6xojt .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-quu9y6xojt .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-quu9y6xojt .cluster text{fill:#F9FFFE;}#mermaid-quu9y6xojt .cluster span{color:#F9FFFE;}#mermaid-quu9y6xojt div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-quu9y6xojt .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-quu9y6xojt rect.text{fill:none;stroke-width:0;}#mermaid-quu9y6xojt .icon-shape,#mermaid-quu9y6xojt .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-quu9y6xojt .icon-shape p,#mermaid-quu9y6xojt .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-quu9y6xojt .icon-shape rect,#mermaid-quu9y6xojt .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-quu9y6xojt .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-quu9y6xojt .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-quu9y6xojt :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (L2)

Reactive Network (Lasna)

Ethereum Sepolia (L1)

stores

emits

monitors

triggers

executes in

setPanicMode() call

updates

MockOracle 0x29f8...ba3b

price: uint256

PriceUpdate event

Event Subscription subscribe() call

AegisSentinel 0x0B6a...b6B6

react() callback

AegisHook 0x1E2a...8080

panicMode: bool

Sources:[contracts/README.md#12-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L12-L26)[contracts/README.md#101-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L101-L104)

### Threshold LogicLink copied!

The AegisSentinel monitors `PriceUpdate` events from the MockOracle and compares the new price against a hardcoded threshold. When the price drops below this threshold, the circuit breaker activates:

ScenarioInitial PriceNew PriceThresholdResultNormal operation2000 ETH1800 ETH1500 ETHNo action (1800 > 1500)Market crash2000 ETH1000 ETH1500 ETH⚠️ Circuit breaker activatedSevere crash2000 ETH500 ETH1500 ETH⚠️ Circuit breaker activated

Sources:[contracts/README.md#18](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L18-L18)[contracts/README.md#50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L50-L50)

---

## Production ConsiderationsLink copied!

### Design RationaleLink copied!

The MockOracle is explicitly designed as a test/demo artifact. According to the system documentation:

> "For this Hackathon demonstration, we utilize a `MockOracle` instead of a live Chainlink feed for one critical reason: Determinism."

The key advantages of using MockOracle for demonstration:

1. Deterministic Testing: Allows on-demand triggering of crash scenarios without waiting for real market volatility
2. Demo Reliability: Ensures the circuit breaker activation can be demonstrated within a 3-minute presentation window
3. Controlled Environment: Enables precise testing of threshold boundaries and edge cases

Sources:[contracts/README.md#59-69](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L59-L69)

### Production Migration PathLink copied!

The Aegis system is designed for zero-code migration to production oracles:

> "Production Readiness: The `AegisSentinel` logic is interface-agnostic. It listens for the standard `PriceUpdate` event signature. In a mainnet deployment, the `MockOracle` address is simply swapped for the official Chainlink Oracle address with zero code changes required in the Sentinel logic."

Migration Steps:

1. Deploy Chainlink price feed oracle (or other standard oracle) on mainnet
2. Verify oracle emits compatible `PriceUpdate(uint256 newPrice, uint256 timestamp)` events
3. Update AegisSentinel constructor/configuration to subscribe to production oracle address
4. Redeploy Sentinel with new oracle address
5. No changes required to AegisHook or other downstream contracts

Sources:[contracts/README.md#67-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L67-L68)

---

## Deployment DetailsLink copied!

### Deployment TransactionLink copied!

The MockOracle was deployed to Ethereum Sepolia using the deployment script at [contracts/script/04_DeployOracle.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/script/04_DeployOracle.s.sol)

Deployment Command:

```
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast
```

Sources:[contracts/README.md#107-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L107-L110)

### Transaction Receipt DetailsLink copied!

FieldValueTransaction Hash`0x3a084a0a072d935c30754dc6b246b1869ae71c2e3b99527b4f43fe49934349ba`Block Number10140018 (0x9ab972)Block Hash`0xfea675d5d250c01e362a0b6ccb9bbbdb7e859c85e3d8e988594951c8f2087ac5`Transaction Index72 (0x48)From Address`0xd2df53d9791e98db221842dd085f4144014bbe2a`Contract Address`0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b`Gas Used206,101 (0x32915)Effective Gas Price957,242,208 wei (0x3919ff60)Deployment Status✅ Success (status: 0x1)

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#22-39](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L22-L39)

### Constructor Bytecode AnalysisLink copied!

The deployment input bytecode shows the contract constructor logic:

1. Sets `owner` storage slot to deployer address (`msg.sender`)
2. Initializes `price` storage slot to `0x686c6b935b8bbd400000` (2000 ETH in wei)

The runtime bytecode includes function selectors for:

- `0x8da5cb5b`: `owner()` view function
- `0x91b7f5ed`: `setPrice(uint256)` state-changing function
- `0xa035b1fe`: `price()` view function

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

---

## Testing and VerificationLink copied!

### Integration Test CoverageLink copied!

The MockOracle is tested as part of the `AegisIntegrationTest` suite:

Test CaseDescriptionStatusOracle UpdateVerifies `setPrice()` successfully updates price storage✅ PASSEvent EmissionConfirms `PriceUpdate` event is emitted with correct parameters✅ PASSPanic TriggerTests that price drop below threshold triggers Sentinel reaction✅ PASS

Test Command:

```
forge test --match-contract AegisIntegrationTest -vv
```

Sources:[contracts/README.md#80-95](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L80-L95)

### Manual VerificationLink copied!

To verify the deployed MockOracle on Sepolia:

```
# Read current price
cast call 0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b "price()" --rpc-url sepolia
 
# Read owner
cast call 0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b "owner()" --rpc-url sepolia
 
# Simulate price update (requires owner private key)
cast send 0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b \
  "setPrice(uint256)" 1000000000000000000000 \
  --rpc-url sepolia --private-key $PRIVATE_KEY
```

Sources:[contracts/README.md#101-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L101-L104)