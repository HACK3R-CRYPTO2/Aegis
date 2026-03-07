# Supporting ComponentsLink copied!
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore)
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md)

## Purpose and ScopeLink copied!

This document covers the off-chain and frontend components that support the core Aegis smart contracts. While the smart contracts provide the on-chain functionality (see page 3), the supporting components enable monitoring, fallback mechanisms, and user interfaces. This includes:

- Hybrid Relayer (`relay.ts`): An off-chain fallback mechanism that ensures message delivery between chains during Reactive Network testnet instability
- Frontend Dashboard (`frontend/`): A Next.js application for monitoring system state and Guardian statistics
- Node.js Infrastructure: Package management, dependencies, and environment configuration

For deployment-related infrastructure, see page 5. For the smart contract testing framework, see page 6.5.

Sources:[README.md#1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L1-L149)[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)

---

## System OverviewLink copied!

The supporting components operate alongside the deployed smart contracts to provide resilience and observability. The components consist of Node.js applications that interact with deployed contracts via RPC endpoints.

### Supporting Components ArchitectureLink copied!

#mermaid-7oehn6oi9si{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-7oehn6oi9si .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-7oehn6oi9si .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-7oehn6oi9si .error-icon{fill:#a44141;}#mermaid-7oehn6oi9si .error-text{fill:#ddd;stroke:#ddd;}#mermaid-7oehn6oi9si .edge-thickness-normal{stroke-width:1px;}#mermaid-7oehn6oi9si .edge-thickness-thick{stroke-width:3.5px;}#mermaid-7oehn6oi9si .edge-pattern-solid{stroke-dasharray:0;}#mermaid-7oehn6oi9si .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-7oehn6oi9si .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-7oehn6oi9si .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-7oehn6oi9si .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-7oehn6oi9si .marker.cross{stroke:lightgrey;}#mermaid-7oehn6oi9si svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-7oehn6oi9si p{margin:0;}#mermaid-7oehn6oi9si .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-7oehn6oi9si .cluster-label text{fill:#F9FFFE;}#mermaid-7oehn6oi9si .cluster-label span{color:#F9FFFE;}#mermaid-7oehn6oi9si .cluster-label span p{background-color:transparent;}#mermaid-7oehn6oi9si .label text,#mermaid-7oehn6oi9si span{fill:#ccc;color:#ccc;}#mermaid-7oehn6oi9si .node rect,#mermaid-7oehn6oi9si .node circle,#mermaid-7oehn6oi9si .node ellipse,#mermaid-7oehn6oi9si .node polygon,#mermaid-7oehn6oi9si .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-7oehn6oi9si .rough-node .label text,#mermaid-7oehn6oi9si .node .label text,#mermaid-7oehn6oi9si .image-shape .label,#mermaid-7oehn6oi9si .icon-shape .label{text-anchor:middle;}#mermaid-7oehn6oi9si .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-7oehn6oi9si .rough-node .label,#mermaid-7oehn6oi9si .node .label,#mermaid-7oehn6oi9si .image-shape .label,#mermaid-7oehn6oi9si .icon-shape .label{text-align:center;}#mermaid-7oehn6oi9si .node.clickable{cursor:pointer;}#mermaid-7oehn6oi9si .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-7oehn6oi9si .arrowheadPath{fill:lightgrey;}#mermaid-7oehn6oi9si .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-7oehn6oi9si .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-7oehn6oi9si .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-7oehn6oi9si .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-7oehn6oi9si .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-7oehn6oi9si .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-7oehn6oi9si .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-7oehn6oi9si .cluster text{fill:#F9FFFE;}#mermaid-7oehn6oi9si .cluster span{color:#F9FFFE;}#mermaid-7oehn6oi9si div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-7oehn6oi9si .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-7oehn6oi9si rect.text{fill:none;stroke-width:0;}#mermaid-7oehn6oi9si .icon-shape,#mermaid-7oehn6oi9si .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-7oehn6oi9si .icon-shape p,#mermaid-7oehn6oi9si .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-7oehn6oi9si .icon-shape rect,#mermaid-7oehn6oi9si .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-7oehn6oi9si .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-7oehn6oi9si .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-7oehn6oi9si :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Build Artifacts (gitignored)

Deployed Smart Contracts

Off-Chain Infrastructure

web3.eth.subscribe('PriceUpdate')

contract.methods.setPanicMode(true)

useReadContract(panicMode)

useReadContract(reputation)

useWatchContractEvent(PriceUpdate)

emit PriceUpdate

reactive.call(setPanicMode)

reactive.call(updateReputation)

Configures

Configures

relay.ts Hybrid Relayer Process

frontend/src/ Next.js App Source

package.json Dependency Management

MockOracle.sol Sepolia: 0x1392...a7D8 PriceUpdate event

AegisSentinel.sol Reactive: 0x0B6a...b6B6 Cross-chain Orchestrator

AegisHook.sol Unichain: 0x1E2a...8080 setPanicMode()

GuardianRegistry.sol Sepolia reputation mapping

frontend/.next/ Development Cache

frontend/out/ Production Build

node_modules/ npm Dependencies

.env.local RPC URLs + Keys

Sources:[README.md#82-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L82-L84)[README.md#113-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L113-L121)[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)

---

## Hybrid RelayerLink copied!

### Purpose and ArchitectureLink copied!

The Hybrid Relayer (`relay.ts`) is a critical fallback mechanism that addresses infrastructure instability in the Reactive Network's public relayer system. During the hackathon, the team discovered that messages from the Reactive Network to Unichain Sepolia (Chain ID 1301) were sometimes delayed or stuck due to testnet relayer issues.

Problem Statement: The `AegisSentinel` contract on Reactive Network correctly detected price crash events from Sepolia, but cross-chain messages to the `AegisHook` on Unichain were not reliably forwarded by the public relayer infrastructure [README.md#81-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L83)

Solution: The Hybrid Relayer provides a redundant path that monitors the `MockOracle` directly and forwards messages to the `AegisHook` if the primary Reactive Network path experiences delays.

### Operational FlowLink copied!

"AegisHook (Unichain)""relay.ts (Off-Chain)""Reactive Public Relayer""AegisSentinel (Reactive)""MockOracle (Sepolia)""AegisHook (Unichain)""relay.ts (Off-Chain)""Reactive Public Relayer""AegisSentinel (Reactive)""MockOracle (Sepolia)"#mermaid-f10cyqdgaqj{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-f10cyqdgaqj .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-f10cyqdgaqj .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-f10cyqdgaqj .error-icon{fill:#a44141;}#mermaid-f10cyqdgaqj .error-text{fill:#ddd;stroke:#ddd;}#mermaid-f10cyqdgaqj .edge-thickness-normal{stroke-width:1px;}#mermaid-f10cyqdgaqj .edge-thickness-thick{stroke-width:3.5px;}#mermaid-f10cyqdgaqj .edge-pattern-solid{stroke-dasharray:0;}#mermaid-f10cyqdgaqj .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-f10cyqdgaqj .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-f10cyqdgaqj .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-f10cyqdgaqj .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-f10cyqdgaqj .marker.cross{stroke:lightgrey;}#mermaid-f10cyqdgaqj svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-f10cyqdgaqj p{margin:0;}#mermaid-f10cyqdgaqj .actor{stroke:#ccc;fill:#1f2020;}#mermaid-f10cyqdgaqj text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-f10cyqdgaqj .actor-line{stroke:#ccc;}#mermaid-f10cyqdgaqj .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-f10cyqdgaqj .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-f10cyqdgaqj .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-f10cyqdgaqj #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-f10cyqdgaqj .sequenceNumber{fill:black;}#mermaid-f10cyqdgaqj #sequencenumber{fill:lightgrey;}#mermaid-f10cyqdgaqj #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-f10cyqdgaqj .messageText{fill:lightgrey;stroke:none;}#mermaid-f10cyqdgaqj .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-f10cyqdgaqj .labelText,#mermaid-f10cyqdgaqj .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-f10cyqdgaqj .loopText,#mermaid-f10cyqdgaqj .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-f10cyqdgaqj .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-f10cyqdgaqj .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-f10cyqdgaqj .noteText,#mermaid-f10cyqdgaqj .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-f10cyqdgaqj .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-f10cyqdgaqj .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-f10cyqdgaqj .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-f10cyqdgaqj .actorPopupMenu{position:absolute;}#mermaid-f10cyqdgaqj .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-f10cyqdgaqj .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-f10cyqdgaqj .actor-man circle,#mermaid-f10cyqdgaqj line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-f10cyqdgaqj :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"Price crash: 3000 → 1000""⚠️ Sometimes stuck""✅ Ensures delivery"par[Primary Path][Fallback Path]"🔒 Circuit breaker active""emit PriceUpdate(1000)""Event: PriceUpdate""Detect crash""Cross-chain message""setPanicMode(true)""Monitor events""Detect delay""Direct call: setPanicMode(true)""panicMode = true"

### Technical ImplementationLink copied!

The `relay.ts` module implements the fallback relay logic as a Node.js process. The implementation architecture:

Relayer Implementation Flow:

"AegisHook.sol 0x1E2a...8080""Unichain RPC Endpoint""MockOracle.sol 0x1392...a7D8""Sepolia RPC Endpoint""relay.ts Process""AegisHook.sol 0x1E2a...8080""Unichain RPC Endpoint""MockOracle.sol 0x1392...a7D8""Sepolia RPC Endpoint""relay.ts Process"#mermaid-0wcxkd770fol{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-0wcxkd770fol .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-0wcxkd770fol .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-0wcxkd770fol .error-icon{fill:#a44141;}#mermaid-0wcxkd770fol .error-text{fill:#ddd;stroke:#ddd;}#mermaid-0wcxkd770fol .edge-thickness-normal{stroke-width:1px;}#mermaid-0wcxkd770fol .edge-thickness-thick{stroke-width:3.5px;}#mermaid-0wcxkd770fol .edge-pattern-solid{stroke-dasharray:0;}#mermaid-0wcxkd770fol .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-0wcxkd770fol .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-0wcxkd770fol .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-0wcxkd770fol .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-0wcxkd770fol .marker.cross{stroke:lightgrey;}#mermaid-0wcxkd770fol svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-0wcxkd770fol p{margin:0;}#mermaid-0wcxkd770fol .actor{stroke:#ccc;fill:#1f2020;}#mermaid-0wcxkd770fol text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-0wcxkd770fol .actor-line{stroke:#ccc;}#mermaid-0wcxkd770fol .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-0wcxkd770fol .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-0wcxkd770fol .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-0wcxkd770fol #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-0wcxkd770fol .sequenceNumber{fill:black;}#mermaid-0wcxkd770fol #sequencenumber{fill:lightgrey;}#mermaid-0wcxkd770fol #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-0wcxkd770fol .messageText{fill:lightgrey;stroke:none;}#mermaid-0wcxkd770fol .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-0wcxkd770fol .labelText,#mermaid-0wcxkd770fol .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-0wcxkd770fol .loopText,#mermaid-0wcxkd770fol .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-0wcxkd770fol .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-0wcxkd770fol .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-0wcxkd770fol .noteText,#mermaid-0wcxkd770fol .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-0wcxkd770fol .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-0wcxkd770fol .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-0wcxkd770fol .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-0wcxkd770fol .actorPopupMenu{position:absolute;}#mermaid-0wcxkd770fol .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-0wcxkd770fol .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-0wcxkd770fol .actor-man circle,#mermaid-0wcxkd770fol line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-0wcxkd770fol :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"npm run relay""panicMode = true Circuit breaker activated"alt[Panic mode should be true but is false]"web3.eth.subscribe('logs' | filterOptions)""Listen for PriceUpdate events""emit PriceUpdate(newPrice | timestamp)""Event data: {price, timestamp}""Calculate crash: abs(oldPrice - newPrice) / oldPrice""If crash > 5%: trigger = true""eth_call: hook.panicMode()""Read panicMode storage slot""panicMode = false""false""eth_sendTransaction: setPanicMode(true)""Execute setPanicMode(true)""console.log('Fallback relay triggered')"

### Relayer OperationsLink copied!

OperationMethodChainPurposeEvent Monitoring`web3.eth.subscribe('logs')`SepoliaListen to `MockOracle.PriceUpdate` eventsState Check`hook.methods.panicMode().call()`UnichainVerify current panic stateFallback Trigger`hook.methods.setPanicMode(true).send()`UnichainActivate circuit breaker if neededCrash DetectionLocal computationOff-chainReplicate `AegisSentinel` threshold logic

### Running the RelayerLink copied!

The relayer is executed as a background process:

```
# Start the relayer in background
npm run relay &
 
# Start the frontend
npm run dev
```

The `relay` script in `package.json` executes the TypeScript file using `ts-node` or compiles and runs it with `node`.

### Design RationaleLink copied!

The hybrid approach provides defense in depth:

LayerMechanismReliabilitySpeedPrimaryReactive Network cross-chain messagingSubject to testnet stability~1-5 secondsFallbackDirect off-chain monitoring and forwardingHigh (controlled infrastructure)~2-10 secondsCombinedWhichever succeeds firstVery highBest of both

This architecture ensures that Aegis can operate reliably even when third-party infrastructure experiences issues, which is critical for a security-focused system.

Sources:[README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)[README.md#116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L116-L121)

---

## Frontend DashboardLink copied!

### OverviewLink copied!

The Frontend Dashboard is a Next.js application located in `frontend/src/` that provides real-time monitoring and visualization of the Aegis system state. It serves as the primary user interface for Guardians, LPs, and system operators.

### ArchitectureLink copied!

#mermaid-rju2r0putwj{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-rju2r0putwj .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-rju2r0putwj .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-rju2r0putwj .error-icon{fill:#a44141;}#mermaid-rju2r0putwj .error-text{fill:#ddd;stroke:#ddd;}#mermaid-rju2r0putwj .edge-thickness-normal{stroke-width:1px;}#mermaid-rju2r0putwj .edge-thickness-thick{stroke-width:3.5px;}#mermaid-rju2r0putwj .edge-pattern-solid{stroke-dasharray:0;}#mermaid-rju2r0putwj .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-rju2r0putwj .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-rju2r0putwj .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-rju2r0putwj .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-rju2r0putwj .marker.cross{stroke:lightgrey;}#mermaid-rju2r0putwj svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-rju2r0putwj p{margin:0;}#mermaid-rju2r0putwj .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-rju2r0putwj .cluster-label text{fill:#F9FFFE;}#mermaid-rju2r0putwj .cluster-label span{color:#F9FFFE;}#mermaid-rju2r0putwj .cluster-label span p{background-color:transparent;}#mermaid-rju2r0putwj .label text,#mermaid-rju2r0putwj span{fill:#ccc;color:#ccc;}#mermaid-rju2r0putwj .node rect,#mermaid-rju2r0putwj .node circle,#mermaid-rju2r0putwj .node ellipse,#mermaid-rju2r0putwj .node polygon,#mermaid-rju2r0putwj .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-rju2r0putwj .rough-node .label text,#mermaid-rju2r0putwj .node .label text,#mermaid-rju2r0putwj .image-shape .label,#mermaid-rju2r0putwj .icon-shape .label{text-anchor:middle;}#mermaid-rju2r0putwj .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-rju2r0putwj .rough-node .label,#mermaid-rju2r0putwj .node .label,#mermaid-rju2r0putwj .image-shape .label,#mermaid-rju2r0putwj .icon-shape .label{text-align:center;}#mermaid-rju2r0putwj .node.clickable{cursor:pointer;}#mermaid-rju2r0putwj .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-rju2r0putwj .arrowheadPath{fill:lightgrey;}#mermaid-rju2r0putwj .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-rju2r0putwj .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-rju2r0putwj .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-rju2r0putwj .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-rju2r0putwj .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-rju2r0putwj .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-rju2r0putwj .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-rju2r0putwj .cluster text{fill:#F9FFFE;}#mermaid-rju2r0putwj .cluster span{color:#F9FFFE;}#mermaid-rju2r0putwj div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-rju2r0putwj .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-rju2r0putwj rect.text{fill:none;stroke-width:0;}#mermaid-rju2r0putwj .icon-shape,#mermaid-rju2r0putwj .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-rju2r0putwj .icon-shape p,#mermaid-rju2r0putwj .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-rju2r0putwj .icon-shape rect,#mermaid-rju2r0putwj .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-rju2r0putwj .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-rju2r0putwj .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-rju2r0putwj :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Build Process

On-Chain Data Sources

Web3 Integration

Next.js Application

Pages frontend/src/pages/

Components frontend/src/components/

React Hooks frontend/src/hooks/

Utilities frontend/src/utils/

ethers.js / viem RPC Connections

Contract ABIs Type Definitions

Contract Instances

AegisHook 0x1E2a...8080

Guardian Registry Sepolia

MockOracle 0x1392...a7D8

next build

next dev

frontend/.next/ frontend/out/

### Frontend Application StructureLink copied!

The `frontend/` directory contains a Next.js application with the following structure:

```
frontend/
├── src/                    # Application source code
│   ├── pages/             # Next.js route pages
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks for contract interaction
│   └── utils/             # Utility functions
├── .next/                 # Build cache (gitignored)
├── out/                   # Static export (gitignored)
├── package.json           # Frontend dependencies
└── README.md              # Frontend documentation
```

Sources:[.gitignore#20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L20-L22)[README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98)

### Key Features and Contract InteractionsLink copied!

The dashboard implements real-time monitoring through Web3 integration:

#### 1. Guardian Statistics Dashboard

FeatureContract MethodChainDisplay ComponentGuardian Profiles`GuardianRegistry.tokenURI()`SepoliaNFT identity cardReputation Scores`GuardianRegistry.reputation(address)`SepoliaNumeric score + badgeIntervention Volume`GuardianRegistry.totalStabilizedVolume(tokenId)`SepoliaVolume chartVIP Status`reputation > 90` checkLocalVIP badge icon

#### 2. Panic Mode Monitoring

FeatureContract ReadUpdate PatternPurposeCircuit Breaker Status`AegisHook.panicMode()`Poll every 2sReal-time status indicatorPool Gate Status`AegisHook.getHookPermissions()`On mountShow active poolsPanic History`getPastLogs(PanicModeSet)`On demandEvent timeline

#### 3. Price Feed Display

FeatureContract MethodChainUpdate FrequencyCurrent Price`MockOracle.latestAnswer()`SepoliaPoll every 5sPrice History`getPastLogs(PriceUpdate)`SepoliaOn page loadVolatility MetricsLocal calculationClient-sideComputed from events

### Frontend Build ProcessLink copied!

Development Workflow:

#mermaid-ztomt6uugp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ztomt6uugp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ztomt6uugp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ztomt6uugp .error-icon{fill:#a44141;}#mermaid-ztomt6uugp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ztomt6uugp .edge-thickness-normal{stroke-width:1px;}#mermaid-ztomt6uugp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ztomt6uugp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ztomt6uugp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ztomt6uugp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ztomt6uugp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ztomt6uugp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ztomt6uugp .marker.cross{stroke:lightgrey;}#mermaid-ztomt6uugp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ztomt6uugp p{margin:0;}#mermaid-ztomt6uugp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ztomt6uugp .cluster-label text{fill:#F9FFFE;}#mermaid-ztomt6uugp .cluster-label span{color:#F9FFFE;}#mermaid-ztomt6uugp .cluster-label span p{background-color:transparent;}#mermaid-ztomt6uugp .label text,#mermaid-ztomt6uugp span{fill:#ccc;color:#ccc;}#mermaid-ztomt6uugp .node rect,#mermaid-ztomt6uugp .node circle,#mermaid-ztomt6uugp .node ellipse,#mermaid-ztomt6uugp .node polygon,#mermaid-ztomt6uugp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ztomt6uugp .rough-node .label text,#mermaid-ztomt6uugp .node .label text,#mermaid-ztomt6uugp .image-shape .label,#mermaid-ztomt6uugp .icon-shape .label{text-anchor:middle;}#mermaid-ztomt6uugp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ztomt6uugp .rough-node .label,#mermaid-ztomt6uugp .node .label,#mermaid-ztomt6uugp .image-shape .label,#mermaid-ztomt6uugp .icon-shape .label{text-align:center;}#mermaid-ztomt6uugp .node.clickable{cursor:pointer;}#mermaid-ztomt6uugp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ztomt6uugp .arrowheadPath{fill:lightgrey;}#mermaid-ztomt6uugp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ztomt6uugp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ztomt6uugp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ztomt6uugp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ztomt6uugp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ztomt6uugp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ztomt6uugp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ztomt6uugp .cluster text{fill:#F9FFFE;}#mermaid-ztomt6uugp .cluster span{color:#F9FFFE;}#mermaid-ztomt6uugp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ztomt6uugp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ztomt6uugp rect.text{fill:none;stroke-width:0;}#mermaid-ztomt6uugp .icon-shape,#mermaid-ztomt6uugp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ztomt6uugp .icon-shape p,#mermaid-ztomt6uugp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ztomt6uugp .icon-shape rect,#mermaid-ztomt6uugp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ztomt6uugp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ztomt6uugp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ztomt6uugp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

frontend/src/

next dev Port 3000

frontend/.next/ Build cache

Hot Module Replacement

http://localhost:3000

.env.local RPC URLs

package.json Dependencies

Production Build:

#mermaid-ms8ja5kh1ik{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ms8ja5kh1ik .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ms8ja5kh1ik .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ms8ja5kh1ik .error-icon{fill:#a44141;}#mermaid-ms8ja5kh1ik .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ms8ja5kh1ik .edge-thickness-normal{stroke-width:1px;}#mermaid-ms8ja5kh1ik .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ms8ja5kh1ik .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ms8ja5kh1ik .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ms8ja5kh1ik .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ms8ja5kh1ik .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ms8ja5kh1ik .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ms8ja5kh1ik .marker.cross{stroke:lightgrey;}#mermaid-ms8ja5kh1ik svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ms8ja5kh1ik p{margin:0;}#mermaid-ms8ja5kh1ik .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ms8ja5kh1ik .cluster-label text{fill:#F9FFFE;}#mermaid-ms8ja5kh1ik .cluster-label span{color:#F9FFFE;}#mermaid-ms8ja5kh1ik .cluster-label span p{background-color:transparent;}#mermaid-ms8ja5kh1ik .label text,#mermaid-ms8ja5kh1ik span{fill:#ccc;color:#ccc;}#mermaid-ms8ja5kh1ik .node rect,#mermaid-ms8ja5kh1ik .node circle,#mermaid-ms8ja5kh1ik .node ellipse,#mermaid-ms8ja5kh1ik .node polygon,#mermaid-ms8ja5kh1ik .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ms8ja5kh1ik .rough-node .label text,#mermaid-ms8ja5kh1ik .node .label text,#mermaid-ms8ja5kh1ik .image-shape .label,#mermaid-ms8ja5kh1ik .icon-shape .label{text-anchor:middle;}#mermaid-ms8ja5kh1ik .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ms8ja5kh1ik .rough-node .label,#mermaid-ms8ja5kh1ik .node .label,#mermaid-ms8ja5kh1ik .image-shape .label,#mermaid-ms8ja5kh1ik .icon-shape .label{text-align:center;}#mermaid-ms8ja5kh1ik .node.clickable{cursor:pointer;}#mermaid-ms8ja5kh1ik .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ms8ja5kh1ik .arrowheadPath{fill:lightgrey;}#mermaid-ms8ja5kh1ik .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ms8ja5kh1ik .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ms8ja5kh1ik .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ms8ja5kh1ik .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ms8ja5kh1ik .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ms8ja5kh1ik .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ms8ja5kh1ik .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ms8ja5kh1ik .cluster text{fill:#F9FFFE;}#mermaid-ms8ja5kh1ik .cluster span{color:#F9FFFE;}#mermaid-ms8ja5kh1ik div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ms8ja5kh1ik .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ms8ja5kh1ik rect.text{fill:none;stroke-width:0;}#mermaid-ms8ja5kh1ik .icon-shape,#mermaid-ms8ja5kh1ik .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ms8ja5kh1ik .icon-shape p,#mermaid-ms8ja5kh1ik .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ms8ja5kh1ik .icon-shape rect,#mermaid-ms8ja5kh1ik .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ms8ja5kh1ik .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ms8ja5kh1ik .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ms8ja5kh1ik :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

frontend/src/

next build Optimized bundle

frontend/out/ Static HTML/CSS/JS

Deploy to hosting (Vercel/Netlify)

### Running the DashboardLink copied!

```
cd frontend
npm install        # Install dependencies from package.json
npm run dev        # Start development server
# Access at http://localhost:3000
```

The development server uses hot module replacement for rapid iteration. Changes to `src/` files automatically refresh the browser.

### Build Artifacts and Git ExclusionsLink copied!

The Next.js build process generates several directories that are excluded from version control:

DirectoryPurposeGeneration CommandGit Status`frontend/.next/`Development build cache and compiled pages`npm run dev`Ignored per [.gitignore#21](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L21-L21)`frontend/out/`Static HTML export for production`npm run build && npm run export`Ignored per [.gitignore#22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L22-L22)`node_modules/`Installed npm packages`npm install`Ignored per [.gitignore#7](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L7-L7)`dist/`Alternative build outputCustom build scriptsIgnored per [.gitignore#10](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L10-L10)

Production Build Commands:

```
npm run build      # Creates optimized production build in .next/
npm run export     # Generates static HTML in out/ (if configured)
npm run start      # Serves production build locally
```

Sources:[README.md#98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L98)[README.md#113-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L113-L121)[.gitignore#7-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L7-L22)

---

## Node.js DependenciesLink copied!

### Dependency ManagementLink copied!

Both the Hybrid Relayer and Frontend Dashboard rely on Node.js dependencies managed via `npm`. The `node_modules/` directory contains all installed packages and is excluded from version control to keep the repository clean.

### Key DependenciesLink copied!

The supporting components depend on standard Web3 and Next.js packages:

Package CategoryPurposeCommon PackagesUsed ByWeb3 LibrariesRPC communication and contract interaction`ethers`, `viem`, `web3.js`, `@wagmi/core``relay.ts`, FrontendFrontend FrameworkUI components and routing`next`, `react`, `react-dom`FrontendTypeScriptType safety for contract ABIs and components`typescript`, `@types/node`, `@types/react`BothDevelopment ToolsBuild tooling and code quality`ts-node`, `eslint`, `prettier`BothContract ABIsType-safe contract interactionGenerated from `contracts/out/`Both

### Installation and CacheLink copied!

```
# Install all dependencies
npm install
 
# Dependencies are cached locally
# node_modules/ is created (ignored by git)
```

The `.gitignore` file explicitly excludes dependency artifacts:

```
node_modules/     # npm packages <FileRef file-url="https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L7-L7" min=7  file-path=".gitignore">Hii</FileRef>
dist/             # Build outputs <FileRef file-url="https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L10-L10" min=10  file-path=".gitignore">Hii</FileRef>
.env              # Environment variables <FileRef file-url="https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L2-L2" min=2  file-path=".gitignore">Hii</FileRef>
.env.local        # Local overrides <FileRef file-url="https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L3-L3" min=3  file-path=".gitignore">Hii</FileRef>
```

### Environment ConfigurationLink copied!

The supporting components require environment variables stored in `.env` or `.env.local` files:

Required Environment Variables:

VariablePurposeExample ValueUsed By`SEPOLIA_RPC_URL`Ethereum Sepolia RPC endpoint`https://sepolia.infura.io/v3/...`Relayer, Frontend`UNICHAIN_RPC_URL`Unichain Sepolia RPC endpoint`https://sepolia.unichain.org`Relayer, Frontend`REACTIVE_RPC_URL`Reactive Network Lasna RPC`https://lasna.rpc.reactive.network`Frontend (optional)`PRIVATE_KEY`Operator wallet private key`0x...`Relayer (write operations)`MOCK_ORACLE_ADDRESS`Deployed MockOracle contract`0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`Relayer, Frontend`AEGIS_HOOK_ADDRESS`Deployed AegisHook contract`0x1E2aE114cF3B63779A1367eD704ccA51a0218080`Relayer, Frontend`GUARDIAN_REGISTRY_ADDRESS`Deployed GuardianRegistry contractContract address on SepoliaFrontend

Security Notes:

- Environment files (`.env`, `.env.local`) are excluded from version control [.gitignore#2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L2-L3)
- Private keys must never be committed to the repository
- Use `.env.local` for local overrides of `.env` defaults

Sources:[.gitignore#1-4](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L4)[README.md#138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L138-L142)

---

## Integration with Core SystemLink copied!

### Component-to-Contract Interaction MapLink copied!

The supporting components interact with deployed contracts through RPC endpoints and ABIs:

#mermaid-xgvfbumvo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-xgvfbumvo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-xgvfbumvo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-xgvfbumvo .error-icon{fill:#a44141;}#mermaid-xgvfbumvo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-xgvfbumvo .edge-thickness-normal{stroke-width:1px;}#mermaid-xgvfbumvo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-xgvfbumvo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-xgvfbumvo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-xgvfbumvo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-xgvfbumvo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-xgvfbumvo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-xgvfbumvo .marker.cross{stroke:lightgrey;}#mermaid-xgvfbumvo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-xgvfbumvo p{margin:0;}#mermaid-xgvfbumvo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-xgvfbumvo .cluster-label text{fill:#F9FFFE;}#mermaid-xgvfbumvo .cluster-label span{color:#F9FFFE;}#mermaid-xgvfbumvo .cluster-label span p{background-color:transparent;}#mermaid-xgvfbumvo .label text,#mermaid-xgvfbumvo span{fill:#ccc;color:#ccc;}#mermaid-xgvfbumvo .node rect,#mermaid-xgvfbumvo .node circle,#mermaid-xgvfbumvo .node ellipse,#mermaid-xgvfbumvo .node polygon,#mermaid-xgvfbumvo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-xgvfbumvo .rough-node .label text,#mermaid-xgvfbumvo .node .label text,#mermaid-xgvfbumvo .image-shape .label,#mermaid-xgvfbumvo .icon-shape .label{text-anchor:middle;}#mermaid-xgvfbumvo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-xgvfbumvo .rough-node .label,#mermaid-xgvfbumvo .node .label,#mermaid-xgvfbumvo .image-shape .label,#mermaid-xgvfbumvo .icon-shape .label{text-align:center;}#mermaid-xgvfbumvo .node.clickable{cursor:pointer;}#mermaid-xgvfbumvo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-xgvfbumvo .arrowheadPath{fill:lightgrey;}#mermaid-xgvfbumvo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-xgvfbumvo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-xgvfbumvo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-xgvfbumvo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-xgvfbumvo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-xgvfbumvo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-xgvfbumvo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-xgvfbumvo .cluster text{fill:#F9FFFE;}#mermaid-xgvfbumvo .cluster span{color:#F9FFFE;}#mermaid-xgvfbumvo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-xgvfbumvo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-xgvfbumvo rect.text{fill:none;stroke-width:0;}#mermaid-xgvfbumvo .icon-shape,#mermaid-xgvfbumvo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-xgvfbumvo .icon-shape p,#mermaid-xgvfbumvo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-xgvfbumvo .icon-shape rect,#mermaid-xgvfbumvo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-xgvfbumvo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-xgvfbumvo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-xgvfbumvo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Build Artifacts

Deployed Smart Contracts

RPC Endpoints

Off-Chain Components

web3.eth.subscribe

contract.methods.setPanicMode

ethers.Contract.call

ethers.Contract.call

Contract interfaces

Contract interfaces

Contract addresses

Contract addresses

relay.ts Fallback Relay

frontend/src/pages/ Next.js Routes

frontend/src/hooks/ useContract Hooks

Sepolia RPC SEPOLIA_RPC_URL

Unichain RPC UNICHAIN_RPC_URL

MockOracle.sol 0x1392...a7D8 latestAnswer() PriceUpdate event

AegisHook.sol 0x1E2a...8080 setPanicMode(bool) panicMode() getHookPermissions()

GuardianRegistry.sol Sepolia reputation(address) totalStabilizedVolume(uint256) NewFeedback event

contracts/out/ AegisHook.json MockOracle.json GuardianRegistry.json

broadcast/ Deployment logs

### Data Flow PatternLink copied!

The supporting components implement a read-heavy, write-light pattern:

1. Reads (Frequent):

- Query `panicMode` state from `AegisHook`
- Fetch reputation scores from `GuardianRegistry`
- Monitor `PriceUpdate` events from `MockOracle`
2. Writes (Rare):

- Fallback `setPanicMode()` calls from Hybrid Relayer
- User-initiated transactions from Frontend (wallet integration)

This pattern ensures the supporting components can provide real-time monitoring without introducing excessive write load on the blockchain.

Sources:[README.md#56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L56-L75)[README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

---

## Operational Commands and WorkflowsLink copied!

### Command ReferenceLink copied!

CommandWorking DirectoryComponentPurposeOutput`npm install``frontend/`BothInstall all dependencies from `package.json`Populates `node_modules/``npm run relay``frontend/`Hybrid RelayerStart fallback relay monitoringBackground process`npm run dev``frontend/`FrontendLaunch Next.js development server`http://localhost:3000``npm run build``frontend/`FrontendCreate optimized production build`frontend/.next/``npm run start``frontend/`FrontendServe production build`http://localhost:3000`

### Combined Startup ProcedureLink copied!

For complete system operation with deployed contracts:

```
# Navigate to frontend directory
cd frontend
 
# Install dependencies (first time only)
npm install
 
# Start the hybrid relayer in background
npm run relay &
 
# Start the dashboard development server
npm run dev
 
# Access dashboard at http://localhost:3000
```

This startup procedure provides:

1. Fallback Resilience: The relayer monitors and forwards panic mode triggers
2. Real-Time Monitoring: The dashboard displays current system state
3. Interactive Management: Users can view Guardian statistics and pool health

### Production DeploymentLink copied!

```
# Build optimized production bundle
npm run build
 
# Start production server
npm run start
 
# Or export static files for CDN hosting
npm run export
# Static files generated in frontend/out/
```

Sources:[README.md#104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L104-L122)

---

## File StructureLink copied!

### Supporting Component LayoutLink copied!

```
aegis/
├── frontend/
│   ├── src/              # Next.js application source
│   ├── .next/            # Build cache (ignored)
│   ├── out/              # Static export (ignored)
│   └── package.json      # Frontend dependencies
├── relay.ts              # Hybrid relayer source (inferred location)
├── node_modules/         # Installed packages (ignored)
├── .env                  # Environment config (ignored)
├── .env.local            # Local overrides (ignored)
└── package.json          # Root package management
```

### Ignored ArtifactsLink copied!

The `.gitignore` configuration ensures clean version control:

```
# Environment
.env
.env.local
 
# Dependencies
node_modules/
 
# Frontend Build
frontend/.next/
frontend/out/
```

This separation keeps the repository focused on source code while allowing developers to generate and use build artifacts locally.

Sources:[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)[README.md#98-100](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L98-L100)

---

## Resilience and Fallback StrategyLink copied!

### Multi-Layer DefenseLink copied!

The supporting components implement a comprehensive fallback strategy:

#mermaid-58g2u234syb{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-58g2u234syb .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-58g2u234syb .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-58g2u234syb .error-icon{fill:#a44141;}#mermaid-58g2u234syb .error-text{fill:#ddd;stroke:#ddd;}#mermaid-58g2u234syb .edge-thickness-normal{stroke-width:1px;}#mermaid-58g2u234syb .edge-thickness-thick{stroke-width:3.5px;}#mermaid-58g2u234syb .edge-pattern-solid{stroke-dasharray:0;}#mermaid-58g2u234syb .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-58g2u234syb .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-58g2u234syb .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-58g2u234syb .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-58g2u234syb .marker.cross{stroke:lightgrey;}#mermaid-58g2u234syb svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-58g2u234syb p{margin:0;}#mermaid-58g2u234syb .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-58g2u234syb .cluster-label text{fill:#F9FFFE;}#mermaid-58g2u234syb .cluster-label span{color:#F9FFFE;}#mermaid-58g2u234syb .cluster-label span p{background-color:transparent;}#mermaid-58g2u234syb .label text,#mermaid-58g2u234syb span{fill:#ccc;color:#ccc;}#mermaid-58g2u234syb .node rect,#mermaid-58g2u234syb .node circle,#mermaid-58g2u234syb .node ellipse,#mermaid-58g2u234syb .node polygon,#mermaid-58g2u234syb .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-58g2u234syb .rough-node .label text,#mermaid-58g2u234syb .node .label text,#mermaid-58g2u234syb .image-shape .label,#mermaid-58g2u234syb .icon-shape .label{text-anchor:middle;}#mermaid-58g2u234syb .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-58g2u234syb .rough-node .label,#mermaid-58g2u234syb .node .label,#mermaid-58g2u234syb .image-shape .label,#mermaid-58g2u234syb .icon-shape .label{text-align:center;}#mermaid-58g2u234syb .node.clickable{cursor:pointer;}#mermaid-58g2u234syb .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-58g2u234syb .arrowheadPath{fill:lightgrey;}#mermaid-58g2u234syb .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-58g2u234syb .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-58g2u234syb .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-58g2u234syb .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-58g2u234syb .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-58g2u234syb .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-58g2u234syb .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-58g2u234syb .cluster text{fill:#F9FFFE;}#mermaid-58g2u234syb .cluster span{color:#F9FFFE;}#mermaid-58g2u234syb div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-58g2u234syb .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-58g2u234syb rect.text{fill:none;stroke-width:0;}#mermaid-58g2u234syb .icon-shape,#mermaid-58g2u234syb .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-58g2u234syb .icon-shape p,#mermaid-58g2u234syb .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-58g2u234syb .icon-shape rect,#mermaid-58g2u234syb .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-58g2u234syb .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-58g2u234syb .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-58g2u234syb :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Price Crash Event on MockOracle

Primary Path: Reactive Network

Fallback Path: Hybrid Relayer

AegisSentinel detects

Reactive cross-chain message

Public relayer forwards

relay.ts monitors Oracle

Detects crash + checks Hook state

Direct call to Hook

AegisHook.setPanicMode(true)

✅ Circuit Breaker Active

### Reliability GuaranteesLink copied!

Failure ModePrimary ImpactFallback ResponseResultPublic relayer downReactive messages stuckHybrid relayer forwards directlySystem operationalHybrid relayer downNo fallbackPrimary path still activeSystem operationalBoth paths downNo panic activationManual intervention possibleDegraded modeFrontend downNo monitoring UIContracts still function autonomouslyCore protection intact

This multi-layer approach ensures that the Aegis circuit breaker remains operational even when individual components experience issues.

Sources:[README.md#77-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L77-L84)

---

## SummaryLink copied!

The Supporting Components layer provides critical infrastructure for the Aegis system:

- Hybrid Relayer: Ensures reliable cross-chain message delivery with fallback mechanisms
- Frontend Dashboard: Provides real-time monitoring and Guardian management
- Node.js Infrastructure: Manages dependencies and build processes
- Resilient Architecture: Multiple fallback layers prevent single points of failure

Together with the core smart contracts ([Core Smart Contracts](#3)), these components form a complete, production-ready cross-chain circuit breaker system. For deployment procedures, see [Deployment](#5). For development workflows, see [Development Guide](#6).

Sources:[README.md#1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L1-L149)[.gitignore#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/.gitignore#L1-L26)