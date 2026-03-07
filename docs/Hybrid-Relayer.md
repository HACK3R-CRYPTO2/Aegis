# Hybrid RelayerLink copied!
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md)

## Purpose and ScopeLink copied!

The Hybrid Relayer is an off-chain monitoring and fallback execution component that ensures reliable circuit breaker activation when testnet infrastructure experiences latency or instability. It directly monitors the `MockOracle` contract on Ethereum Sepolia and can trigger panic mode on the `AegisHook` contract on Unichain, bypassing the primary Reactive Network path when necessary.

This document covers the design rationale, implementation details, and operational characteristics of the Hybrid Relayer. For information about the primary reactive monitoring path, see [AegisSentinel](#3.2). For the target contract that receives triggers, see [AegisHook](#3.1).

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

---

## Design RationaleLink copied!

### The Testnet Infrastructure ChallengeLink copied!

The Aegis system's primary monitoring path relies on the Reactive Network to observe events on Ethereum Sepolia and trigger cross-chain calls to Unichain. During development and hackathon testing, the public testnet relayers for Unichain Sepolia (Chain ID 1301) exhibited intermittent reliability issues:

IssueImpactMitigationMessage Forwarding DelaysCross-chain calls from Reactive Network to Unichain sometimes delayed by 30-60 secondsHybrid Relayer provides direct pathRelayer Node InstabilityPublic relayer nodes occasionally failed to process messagesIndependent monitoring eliminates single point of failureDemo Reliability RequirementsHackathon demonstrations require consistent, repeatable behaviorFallback path ensures predictable circuit breaker activation

The `AegisSentinel` contract on Reactive Network correctly detected Oracle events, but messages occasionally got "stuck" in the cross-chain relay infrastructure before reaching Unichain.

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

### Architectural DecisionLink copied!

Rather than waiting for testnet infrastructure maturation, the team built the Hybrid Relayer as a defense-in-depth mechanism. This design choice provides:

1. Dual-Path Reliability: Both Reactive Network and Hybrid Relayer monitor the same Oracle events
2. Fast Failover: If the Reactive path delays, the Hybrid Relayer immediately triggers protection
3. Production Readiness: Demonstrates system resilience patterns applicable to mainnet deployments
4. Zero Centralization Cost: The fallback path operates independently; neither path is a "master" coordinator

#mermaid-9x3riju7xas{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-9x3riju7xas .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-9x3riju7xas .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-9x3riju7xas .error-icon{fill:#a44141;}#mermaid-9x3riju7xas .error-text{fill:#ddd;stroke:#ddd;}#mermaid-9x3riju7xas .edge-thickness-normal{stroke-width:1px;}#mermaid-9x3riju7xas .edge-thickness-thick{stroke-width:3.5px;}#mermaid-9x3riju7xas .edge-pattern-solid{stroke-dasharray:0;}#mermaid-9x3riju7xas .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-9x3riju7xas .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-9x3riju7xas .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-9x3riju7xas .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-9x3riju7xas .marker.cross{stroke:lightgrey;}#mermaid-9x3riju7xas svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-9x3riju7xas p{margin:0;}#mermaid-9x3riju7xas .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-9x3riju7xas .cluster-label text{fill:#F9FFFE;}#mermaid-9x3riju7xas .cluster-label span{color:#F9FFFE;}#mermaid-9x3riju7xas .cluster-label span p{background-color:transparent;}#mermaid-9x3riju7xas .label text,#mermaid-9x3riju7xas span{fill:#ccc;color:#ccc;}#mermaid-9x3riju7xas .node rect,#mermaid-9x3riju7xas .node circle,#mermaid-9x3riju7xas .node ellipse,#mermaid-9x3riju7xas .node polygon,#mermaid-9x3riju7xas .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-9x3riju7xas .rough-node .label text,#mermaid-9x3riju7xas .node .label text,#mermaid-9x3riju7xas .image-shape .label,#mermaid-9x3riju7xas .icon-shape .label{text-anchor:middle;}#mermaid-9x3riju7xas .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-9x3riju7xas .rough-node .label,#mermaid-9x3riju7xas .node .label,#mermaid-9x3riju7xas .image-shape .label,#mermaid-9x3riju7xas .icon-shape .label{text-align:center;}#mermaid-9x3riju7xas .node.clickable{cursor:pointer;}#mermaid-9x3riju7xas .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-9x3riju7xas .arrowheadPath{fill:lightgrey;}#mermaid-9x3riju7xas .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-9x3riju7xas .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-9x3riju7xas .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-9x3riju7xas .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-9x3riju7xas .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-9x3riju7xas .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-9x3riju7xas .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-9x3riju7xas .cluster text{fill:#F9FFFE;}#mermaid-9x3riju7xas .cluster span{color:#F9FFFE;}#mermaid-9x3riju7xas div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-9x3riju7xas .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-9x3riju7xas rect.text{fill:none;stroke-width:0;}#mermaid-9x3riju7xas .icon-shape,#mermaid-9x3riju7xas .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-9x3riju7xas .icon-shape p,#mermaid-9x3riju7xas .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-9x3riju7xas .icon-shape rect,#mermaid-9x3riju7xas .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-9x3riju7xas .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-9x3riju7xas .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-9x3riju7xas :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Fallback Path

Primary Path

PriceUpdate Events

Event Monitoring

Cross-Chain Call

May Delay (Testnet)

Direct Trigger

setPanicMode()

MockOracle Contract Sepolia: 0x1392...a7D8

AegisSentinel Reactive Network 0x0B6a...b6B6

Reactive Public Relayer Infrastructure

relay.ts Off-Chain Monitor Direct RPC Calls

AegisHook Contract Unichain: 0x1E2a...8080

Diagram: Dual-path architecture showing primary Reactive Network path and fallback Hybrid Relayer path to AegisHook

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)[README.md#56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L56-L75)

---

## Component ArchitectureLink copied!

### High-Level ResponsibilitiesLink copied!

The Hybrid Relayer operates as a TypeScript process (`relay.ts`) that performs three core functions:

#mermaid-rwnfqktubms{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-rwnfqktubms .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-rwnfqktubms .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-rwnfqktubms .error-icon{fill:#a44141;}#mermaid-rwnfqktubms .error-text{fill:#ddd;stroke:#ddd;}#mermaid-rwnfqktubms .edge-thickness-normal{stroke-width:1px;}#mermaid-rwnfqktubms .edge-thickness-thick{stroke-width:3.5px;}#mermaid-rwnfqktubms .edge-pattern-solid{stroke-dasharray:0;}#mermaid-rwnfqktubms .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-rwnfqktubms .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-rwnfqktubms .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-rwnfqktubms .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-rwnfqktubms .marker.cross{stroke:lightgrey;}#mermaid-rwnfqktubms svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-rwnfqktubms p{margin:0;}#mermaid-rwnfqktubms defs #statediagram-barbEnd{fill:lightgrey;stroke:lightgrey;}#mermaid-rwnfqktubms g.stateGroup text{fill:#ccc;stroke:none;font-size:10px;}#mermaid-rwnfqktubms g.stateGroup text{fill:#ccc;stroke:none;font-size:10px;}#mermaid-rwnfqktubms g.stateGroup .state-title{font-weight:bolder;fill:#e0dfdf;}#mermaid-rwnfqktubms g.stateGroup rect{fill:#1f2020;stroke:#ccc;}#mermaid-rwnfqktubms g.stateGroup line{stroke:lightgrey;stroke-width:1;}#mermaid-rwnfqktubms .transition{stroke:lightgrey;stroke-width:1;fill:none;}#mermaid-rwnfqktubms .stateGroup .composit{fill:#333;border-bottom:1px;}#mermaid-rwnfqktubms .stateGroup .alt-composit{fill:#e0e0e0;border-bottom:1px;}#mermaid-rwnfqktubms .state-note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-rwnfqktubms .state-note text{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;font-size:10px;}#mermaid-rwnfqktubms .stateLabel .box{stroke:none;stroke-width:0;fill:#1f2020;opacity:0.5;}#mermaid-rwnfqktubms .edgeLabel .label rect{fill:#1f2020;opacity:0.5;}#mermaid-rwnfqktubms .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-rwnfqktubms .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-rwnfqktubms .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-rwnfqktubms .edgeLabel .label text{fill:#ccc;}#mermaid-rwnfqktubms .label div .edgeLabel{color:#ccc;}#mermaid-rwnfqktubms .stateLabel text{fill:#e0dfdf;font-size:10px;font-weight:bold;}#mermaid-rwnfqktubms .node circle.state-start{fill:#f4f4f4;stroke:#f4f4f4;}#mermaid-rwnfqktubms .node .fork-join{fill:#f4f4f4;stroke:#f4f4f4;}#mermaid-rwnfqktubms .node circle.state-end{fill:#cccccc;stroke:#333;stroke-width:1.5;}#mermaid-rwnfqktubms .end-state-inner{fill:#333;stroke-width:1.5;}#mermaid-rwnfqktubms .node rect{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-rwnfqktubms .node polygon{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-rwnfqktubms #statediagram-barbEnd{fill:lightgrey;}#mermaid-rwnfqktubms .statediagram-cluster rect{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-rwnfqktubms .cluster-label,#mermaid-rwnfqktubms .nodeLabel{color:#e0dfdf;}#mermaid-rwnfqktubms .statediagram-cluster rect.outer{rx:5px;ry:5px;}#mermaid-rwnfqktubms .statediagram-state .divider{stroke:#ccc;}#mermaid-rwnfqktubms .statediagram-state .title-state{rx:5px;ry:5px;}#mermaid-rwnfqktubms .statediagram-cluster.statediagram-cluster .inner{fill:#333;}#mermaid-rwnfqktubms .statediagram-cluster.statediagram-cluster-alt .inner{fill:#555;}#mermaid-rwnfqktubms .statediagram-cluster .inner{rx:0;ry:0;}#mermaid-rwnfqktubms .statediagram-state rect.basic{rx:5px;ry:5px;}#mermaid-rwnfqktubms .statediagram-state rect.divider{stroke-dasharray:10,10;fill:#555;}#mermaid-rwnfqktubms .note-edge{stroke-dasharray:5;}#mermaid-rwnfqktubms .statediagram-note rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:hsl(180, 0%, 18.3529411765%);stroke-width:1px;rx:0;ry:0;}#mermaid-rwnfqktubms .statediagram-note rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:hsl(180, 0%, 18.3529411765%);stroke-width:1px;rx:0;ry:0;}#mermaid-rwnfqktubms .statediagram-note text{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#mermaid-rwnfqktubms .statediagram-note .nodeLabel{color:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#mermaid-rwnfqktubms .statediagram .edgeLabel{color:red;}#mermaid-rwnfqktubms #dependencyStart,#mermaid-rwnfqktubms #dependencyEnd{fill:lightgrey;stroke:lightgrey;stroke-width:1;}#mermaid-rwnfqktubms .statediagramTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-rwnfqktubms :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Start Process

Connect to Sepolia RPC

Listen for PriceUpdate Events

Event Detected

Price Normal

Price Below Threshold

Call AegisHook.setPanicMode(true)

Wait for Next Event

Process Terminated

Initialized

MonitoringOracle

ThresholdCheck

TriggerPanic

DirectCall

Diagram: State machine representing the Hybrid Relayer's operational lifecycle

FunctionDescriptionCode LocationEvent MonitoringSubscribe to `PriceUpdate` events from MockOracle on Sepolia`relay.ts`Threshold EvaluationDetermine if price breach requires panic mode activation`relay.ts`Direct TriggeringExecute transaction calling `AegisHook.setPanicMode()` on Unichain`relay.ts`

Sources: [README.md#116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L121)

### Runtime ConfigurationLink copied!

The Hybrid Relayer requires several environment variables for cross-chain operation:

VariablePurposeExample Value`SEPOLIA_RPC_URL`Connection to Ethereum Sepolia for Oracle monitoring`https://sepolia.infura.io/v3/...``UNICHAIN_RPC_URL`Connection to Unichain for Hook triggering`https://sepolia.unichain.org``PRIVATE_KEY`Signer for transactions to AegisHook`0x...` (Guardian wallet)`ORACLE_ADDRESS`MockOracle contract address on Sepolia`0x1392C38921A818cEdb100cC3767e8f30deC3a7D8``HOOK_ADDRESS`AegisHook contract address on Unichain`0x1E2aE114cF3B63779A1367eD704ccA51a0218080`

Sources: [README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

---

## Operational FlowLink copied!

### Event Detection and ResponseLink copied!

The following sequence diagram shows how the Hybrid Relayer responds to a price crash event:

"AegisHook setPanicMode()""Unichain RPC eth_sendTransaction""relay.ts Event Listener""Sepolia RPC eth_getLogs""MockOracle setPriceData()""AegisHook setPanicMode()""Unichain RPC eth_sendTransaction""relay.ts Event Listener""Sepolia RPC eth_getLogs""MockOracle setPriceData()"#mermaid-i3shqn25t3s{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-i3shqn25t3s .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-i3shqn25t3s .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-i3shqn25t3s .error-icon{fill:#a44141;}#mermaid-i3shqn25t3s .error-text{fill:#ddd;stroke:#ddd;}#mermaid-i3shqn25t3s .edge-thickness-normal{stroke-width:1px;}#mermaid-i3shqn25t3s .edge-thickness-thick{stroke-width:3.5px;}#mermaid-i3shqn25t3s .edge-pattern-solid{stroke-dasharray:0;}#mermaid-i3shqn25t3s .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-i3shqn25t3s .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-i3shqn25t3s .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-i3shqn25t3s .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-i3shqn25t3s .marker.cross{stroke:lightgrey;}#mermaid-i3shqn25t3s svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-i3shqn25t3s p{margin:0;}#mermaid-i3shqn25t3s .actor{stroke:#ccc;fill:#1f2020;}#mermaid-i3shqn25t3s text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-i3shqn25t3s .actor-line{stroke:#ccc;}#mermaid-i3shqn25t3s .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-i3shqn25t3s .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-i3shqn25t3s .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-i3shqn25t3s #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-i3shqn25t3s .sequenceNumber{fill:black;}#mermaid-i3shqn25t3s #sequencenumber{fill:lightgrey;}#mermaid-i3shqn25t3s #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-i3shqn25t3s .messageText{fill:lightgrey;stroke:none;}#mermaid-i3shqn25t3s .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-i3shqn25t3s .labelText,#mermaid-i3shqn25t3s .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-i3shqn25t3s .loopText,#mermaid-i3shqn25t3s .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-i3shqn25t3s .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-i3shqn25t3s .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-i3shqn25t3s .noteText,#mermaid-i3shqn25t3s .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-i3shqn25t3s .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-i3shqn25t3s .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-i3shqn25t3s .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-i3shqn25t3s .actorPopupMenu{position:absolute;}#mermaid-i3shqn25t3s .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-i3shqn25t3s .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-i3shqn25t3s .actor-man circle,#mermaid-i3shqn25t3s line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-i3shqn25t3s :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Market crash: ETH $2000 → $1500Threshold Check: 1500 < 1800? YES → Trigger PanicCircuit breaker ACTIVE Pool protectedemit PriceUpdate(1500)Filter for PriceUpdate eventsEvent: {price: 1500, timestamp}Send Transaction: setPanicMode(true)Execute CallpanicMode = trueTransaction ReceiptTx Hash: 0xabc...

Diagram: Sequence showing Hybrid Relayer's direct monitoring and triggering flow from Oracle event to Hook activation

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

### Parallel Operation with Reactive SentinelLink copied!

The Hybrid Relayer operates in parallel with the `AegisSentinel` contract on Reactive Network. Both paths monitor the same Oracle events, but the Hybrid Relayer provides faster triggering when testnet infrastructure experiences delays:

#mermaid-47cud4lx34x{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-47cud4lx34x .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-47cud4lx34x .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-47cud4lx34x .error-icon{fill:#a44141;}#mermaid-47cud4lx34x .error-text{fill:#ddd;stroke:#ddd;}#mermaid-47cud4lx34x .edge-thickness-normal{stroke-width:1px;}#mermaid-47cud4lx34x .edge-thickness-thick{stroke-width:3.5px;}#mermaid-47cud4lx34x .edge-pattern-solid{stroke-dasharray:0;}#mermaid-47cud4lx34x .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-47cud4lx34x .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-47cud4lx34x .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-47cud4lx34x .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-47cud4lx34x .marker.cross{stroke:lightgrey;}#mermaid-47cud4lx34x svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-47cud4lx34x p{margin:0;}#mermaid-47cud4lx34x .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-47cud4lx34x .cluster-label text{fill:#F9FFFE;}#mermaid-47cud4lx34x .cluster-label span{color:#F9FFFE;}#mermaid-47cud4lx34x .cluster-label span p{background-color:transparent;}#mermaid-47cud4lx34x .label text,#mermaid-47cud4lx34x span{fill:#ccc;color:#ccc;}#mermaid-47cud4lx34x .node rect,#mermaid-47cud4lx34x .node circle,#mermaid-47cud4lx34x .node ellipse,#mermaid-47cud4lx34x .node polygon,#mermaid-47cud4lx34x .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-47cud4lx34x .rough-node .label text,#mermaid-47cud4lx34x .node .label text,#mermaid-47cud4lx34x .image-shape .label,#mermaid-47cud4lx34x .icon-shape .label{text-anchor:middle;}#mermaid-47cud4lx34x .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-47cud4lx34x .rough-node .label,#mermaid-47cud4lx34x .node .label,#mermaid-47cud4lx34x .image-shape .label,#mermaid-47cud4lx34x .icon-shape .label{text-align:center;}#mermaid-47cud4lx34x .node.clickable{cursor:pointer;}#mermaid-47cud4lx34x .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-47cud4lx34x .arrowheadPath{fill:lightgrey;}#mermaid-47cud4lx34x .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-47cud4lx34x .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-47cud4lx34x .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-47cud4lx34x .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-47cud4lx34x .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-47cud4lx34x .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-47cud4lx34x .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-47cud4lx34x .cluster text{fill:#F9FFFE;}#mermaid-47cud4lx34x .cluster span{color:#F9FFFE;}#mermaid-47cud4lx34x div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-47cud4lx34x .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-47cud4lx34x rect.text{fill:none;stroke-width:0;}#mermaid-47cud4lx34x .icon-shape,#mermaid-47cud4lx34x .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-47cud4lx34x .icon-shape p,#mermaid-47cud4lx34x .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-47cud4lx34x .icon-shape rect,#mermaid-47cud4lx34x .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-47cud4lx34x .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-47cud4lx34x .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-47cud4lx34x :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Delayed (30-60s)

Yes

No

PriceUpdate Event on MockOracle

Path 1: Reactive Network

Path 2: Hybrid Relayer

AegisSentinel.react()

Relayer Infrastructure

AegisHook.setPanicMode()

relay.ts Event Handler

Price  Threshold?

Direct RPC Call

No Action

AegisHook.setPanicMode()

Hook State Update

Pool Protected panicMode = true

Diagram: Flowchart showing parallel execution paths from Oracle event to Hook protection

Sources: [README.md#56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L56-L75)

### Idempotency and Race ConditionsLink copied!

The `AegisHook` contract's `setPanicMode()` function is idempotent—calling it multiple times with the same boolean value has no negative side effects. This design choice enables safe parallel operation:

ScenarioResultSystem BehaviorBoth Paths Succeed`setPanicMode(true)` called twiceSecond call is no-op, gas spent but harmlessReactive Path DelayedHybrid Relayer triggers firstProtection activates immediately, Reactive call arrives later as redundant confirmationHybrid Relayer FailsOnly Reactive path succeedsSystem still protected via primary pathBoth Paths FailNo protection activatedEdge case requiring manual intervention (monitored via dashboard)

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

---

## Deployment and ExecutionLink copied!

### Starting the RelayerLink copied!

The Hybrid Relayer is deployed as a background process alongside the frontend application:

```
# Navigate to frontend directory
cd frontend
 
# Install dependencies
npm install
 
# Start Relayer in background
npm run relay &
 
# Start frontend UI
npm run dev
```

The `npm run relay` command executes the `relay.ts` script, which:

1. Initializes Web3 providers for Sepolia and Unichain
2. Subscribes to `PriceUpdate` events from the MockOracle contract
3. Maintains a persistent connection to both networks
4. Logs monitoring activity to console for debugging

Sources: [README.md#116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L121)

### Process ManagementLink copied!

ConsiderationImplementationProcess SupervisionUse `pm2` or `systemd` for production deploymentsLoggingConsole output includes event timestamps, prices, and transaction hashesError HandlingAutomatic reconnection on RPC failures, exponential backoffGraceful ShutdownSIGINT/SIGTERM handlers unsubscribe from events before exit

Sources: [README.md#116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L121)

---

## Code Structure and Key FunctionsLink copied!

### Event SubscriptionLink copied!

The Relayer establishes event listeners using ethers.js or web3.js:

```
relay.ts (inferred structure):
- setupProviders(): Initialize Sepolia and Unichain RPC connections
- subscribeToOracle(): Listen for PriceUpdate events on MockOracle
- evaluateThreshold(): Compare price against panic threshold (e.g., 1800 USD)
- triggerPanicMode(): Send transaction to AegisHook.setPanicMode(true)
```

### Transaction SigningLink copied!

The Relayer uses a private key (configured via environment variable) to sign transactions sent to the `AegisHook` contract. This requires:

1. Gas Estimation: Calculate gas limit for `setPanicMode()` call
2. Nonce Management: Track transaction nonce to prevent double-spending
3. EIP-1559 Fees: Use `maxFeePerGas` and `maxPriorityFeePerGas` for fast inclusion
4. Receipt Confirmation: Wait for transaction inclusion before logging success

Sources: [README.md#116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L121)

---

## Integration with Primary SystemLink copied!

### Relationship to AegisSentinelLink copied!

The Hybrid Relayer provides a fallback path but does not replace the `AegisSentinel` contract. The primary Reactive Network path remains the canonical monitoring mechanism for production deployments once testnet infrastructure stabilizes.

AspectAegisSentinel (Primary)Hybrid Relayer (Fallback)DeploymentOn-chain smart contract (Reactive Network)Off-chain TypeScript processTriggeringAutonomous via `react()` callbackManual RPC call via private keyDecentralizationFully decentralizedRequires Guardian operatorCross-Chain ProtocolNative Reactive Network messagingDirect RPC to target chainProduction SuitabilityHigh (once infrastructure matures)Medium (requires process management)

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

### Guardian Reputation ImplicationsLink copied!

Transactions sent by the Hybrid Relayer are signed with a Guardian's private key. If the Guardian Registry is monitoring these interventions, the Guardian may earn reputation points for successful panic mode activations. However, unlike the `AegisSentinel` contract which is whitelisted to call `setPanicMode()`, the Relayer operates through standard access control checks.

Sources: [README.md#27-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L27-L33)

---

## Future EvolutionLink copied!

### Mainnet StrategyLink copied!

For production deployments on Ethereum mainnet and Unichain mainnet, the Hybrid Relayer serves two potential roles:

1. Temporary Redundancy: Continue operating until Reactive Network relayer infrastructure proves stable over 6+ months
2. Emergency Override: Maintain as a "break glass" mechanism for scenarios where the Reactive path fails catastrophically
3. Deprecation: Phase out entirely once the primary path demonstrates 99.9%+ reliability

### Advanced Monitoring FeaturesLink copied!

Potential enhancements to the Hybrid Relayer:

FeatureDescriptionValueMulti-Oracle SupportMonitor Chainlink, Pyth, and other price feeds simultaneouslyEliminates single point of failure in price dataMetrics ExportPublish Prometheus metrics for latency, success rate, gas costsEnables operational dashboardsThreshold ConfigurationDynamic panic thresholds based on volatility indices (e.g., VIX)More intelligent circuit breaker logicMulti-Sig TriggeringRequire 2-of-3 Guardian signatures for panic activationReduces false positive risk

Sources: [README.md#86-92](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L86-L92)

---

## SummaryLink copied!

The Hybrid Relayer (`relay.ts`) is a pragmatic architectural component that ensures Aegis system reliability during testnet development. It monitors the `MockOracle` contract on Ethereum Sepolia directly and can trigger panic mode on the `AegisHook` contract on Unichain, bypassing potential delays in the Reactive Network public relayer infrastructure.

Key characteristics:

- Off-chain TypeScript process executed via `npm run relay`
- Direct RPC monitoring of Oracle events without relying on cross-chain messaging
- Parallel operation with the primary `AegisSentinel` reactive contract
- Idempotent triggering that safely races with the Reactive path
- Testnet-focused design intended to be deprecated or reduced in scope for mainnet

The component demonstrates that Aegis can maintain high availability even when underlying infrastructure experiences transient failures—a critical property for any system protecting hundreds of millions in liquidity.

Sources: [README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)[README.md#116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L121)