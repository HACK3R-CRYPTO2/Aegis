# Guardian RegistryLink copied!
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

## Purpose and ScopeLink copied!

The Guardian Registry is a smart contract deployed on Ethereum Sepolia (L1) that manages Guardian identities and reputation within the Aegis system. It combines ERC-721 (NFT) and ERC-8004 (Trustless Agents) standards to create a trust layer for agents that provide liquidity during market volatility.

This document covers:

- Contract architecture and standards compliance
- Identity management via NFT profiles
- Reputation tracking and feedback mechanisms
- Cross-chain integration with AegisSentinel and AegisHook

For information about how reputation is used to gate swaps on L2, see [AegisHook](#3.1). For details on the cross-chain synchronization mechanism, see [AegisSentinel](#3.2).

Sources:[README.md#24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L24-L33)[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)

---

## Contract OverviewLink copied!

The Guardian Registry implements two complementary standards to create a comprehensive identity and reputation system:

StandardPurposeKey FeaturesERC-721Identity LayerUnique NFT profiles for each Guardian, enables wallet-to-identity mappingERC-8004Reputation LayerImmutable feedback storage for agent actions, trustless reputation aggregation

The contract serves as the source of truth for Guardian reputation, which is then propagated cross-chain to influence behavior on the L2 execution layer (Unichain).

Sources:[README.md#28-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L28-L29)[contracts/README.md#53-54](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L53-L54)

---

## System Integration ArchitectureLink copied!

#mermaid-wzlx826s0u{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-wzlx826s0u .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-wzlx826s0u .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-wzlx826s0u .error-icon{fill:#a44141;}#mermaid-wzlx826s0u .error-text{fill:#ddd;stroke:#ddd;}#mermaid-wzlx826s0u .edge-thickness-normal{stroke-width:1px;}#mermaid-wzlx826s0u .edge-thickness-thick{stroke-width:3.5px;}#mermaid-wzlx826s0u .edge-pattern-solid{stroke-dasharray:0;}#mermaid-wzlx826s0u .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-wzlx826s0u .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-wzlx826s0u .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-wzlx826s0u .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-wzlx826s0u .marker.cross{stroke:lightgrey;}#mermaid-wzlx826s0u svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-wzlx826s0u p{margin:0;}#mermaid-wzlx826s0u .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-wzlx826s0u .cluster-label text{fill:#F9FFFE;}#mermaid-wzlx826s0u .cluster-label span{color:#F9FFFE;}#mermaid-wzlx826s0u .cluster-label span p{background-color:transparent;}#mermaid-wzlx826s0u .label text,#mermaid-wzlx826s0u span{fill:#ccc;color:#ccc;}#mermaid-wzlx826s0u .node rect,#mermaid-wzlx826s0u .node circle,#mermaid-wzlx826s0u .node ellipse,#mermaid-wzlx826s0u .node polygon,#mermaid-wzlx826s0u .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-wzlx826s0u .rough-node .label text,#mermaid-wzlx826s0u .node .label text,#mermaid-wzlx826s0u .image-shape .label,#mermaid-wzlx826s0u .icon-shape .label{text-anchor:middle;}#mermaid-wzlx826s0u .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-wzlx826s0u .rough-node .label,#mermaid-wzlx826s0u .node .label,#mermaid-wzlx826s0u .image-shape .label,#mermaid-wzlx826s0u .icon-shape .label{text-align:center;}#mermaid-wzlx826s0u .node.clickable{cursor:pointer;}#mermaid-wzlx826s0u .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-wzlx826s0u .arrowheadPath{fill:lightgrey;}#mermaid-wzlx826s0u .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-wzlx826s0u .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-wzlx826s0u .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-wzlx826s0u .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-wzlx826s0u .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-wzlx826s0u .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-wzlx826s0u .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-wzlx826s0u .cluster text{fill:#F9FFFE;}#mermaid-wzlx826s0u .cluster span{color:#F9FFFE;}#mermaid-wzlx826s0u div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-wzlx826s0u .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-wzlx826s0u rect.text{fill:none;stroke-width:0;}#mermaid-wzlx826s0u .icon-shape,#mermaid-wzlx826s0u .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-wzlx826s0u .icon-shape p,#mermaid-wzlx826s0u .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-wzlx826s0u .icon-shape rect,#mermaid-wzlx826s0u .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-wzlx826s0u .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-wzlx826s0u .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-wzlx826s0u :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (L2)

Reactive Network

Ethereum Sepolia (L1)

recordIntervention() Cross-chain call

emit NewFeedback()

boostReputation() Cross-chain call

Check local rep cache during beforeSwap()

mint NFT profile

swap during panic

AegisGuardianRegistry.sol ERC-721 + ERC-8004

AegisSentinel.sol Event Listener

AegisHook.sol Swap Gatekeeper

Guardian Agent

Diagram: Guardian Registry Cross-Chain Data Flow

The Registry acts as a hub in the cross-chain reputation cycle:

1. Inbound: Receives intervention records from `AegisHook` on L2
2. Storage: Maintains immutable feedback records per ERC-8004
3. Outbound: Emits `NewFeedback` events that trigger reputation boosts via `AegisSentinel`

Sources:[README.md#56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L56-L75)[contracts/README.md#10-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L10-L26)

---

## Core Data StructuresLink copied!

### Guardian Profile (ERC-721 Token)Link copied!

Each Guardian mints a unique NFT that serves as their on-chain identity. The token metadata tracks:

FieldTypeDescription`tokenId``uint256`Unique identifier for the Guardian NFT`owner``address`Wallet address that owns the Guardian profile`interventionCount``uint256`Number of heroic interventions performed`totalStabilizedVolume``uint256`Cumulative volume provided during panic events`reputationScore``uint256`Derived reputation metric (0-100 scale)

### Intervention Record (ERC-8004 Feedback)Link copied!

Each time a Guardian provides liquidity during a panic event, an immutable feedback record is created:

FieldTypeDescription`guardian``address`Address of the Guardian who intervened`timestamp``uint256`Block timestamp of the intervention`volumeProvided``uint256`Amount of liquidity provided during the event`marketCondition``enum`Crash severity level at time of intervention`responseLatency``uint256`Time delta between panic activation and intervention

Sources:[README.md#28-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L28-L29)[contracts/README.md#53-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L53-L57)

---

## Core FunctionalityLink copied!

### Identity ManagementLink copied!

#### Minting Guardian Profiles

"AegisGuardianRegistry""Guardian Wallet""AegisGuardianRegistry""Guardian Wallet"#mermaid-thjtdt6lr98{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-thjtdt6lr98 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-thjtdt6lr98 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-thjtdt6lr98 .error-icon{fill:#a44141;}#mermaid-thjtdt6lr98 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-thjtdt6lr98 .edge-thickness-normal{stroke-width:1px;}#mermaid-thjtdt6lr98 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-thjtdt6lr98 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-thjtdt6lr98 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-thjtdt6lr98 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-thjtdt6lr98 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-thjtdt6lr98 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-thjtdt6lr98 .marker.cross{stroke:lightgrey;}#mermaid-thjtdt6lr98 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-thjtdt6lr98 p{margin:0;}#mermaid-thjtdt6lr98 .actor{stroke:#ccc;fill:#1f2020;}#mermaid-thjtdt6lr98 text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-thjtdt6lr98 .actor-line{stroke:#ccc;}#mermaid-thjtdt6lr98 .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-thjtdt6lr98 .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-thjtdt6lr98 .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-thjtdt6lr98 #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-thjtdt6lr98 .sequenceNumber{fill:black;}#mermaid-thjtdt6lr98 #sequencenumber{fill:lightgrey;}#mermaid-thjtdt6lr98 #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-thjtdt6lr98 .messageText{fill:lightgrey;stroke:none;}#mermaid-thjtdt6lr98 .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-thjtdt6lr98 .labelText,#mermaid-thjtdt6lr98 .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-thjtdt6lr98 .loopText,#mermaid-thjtdt6lr98 .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-thjtdt6lr98 .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-thjtdt6lr98 .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-thjtdt6lr98 .noteText,#mermaid-thjtdt6lr98 .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-thjtdt6lr98 .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-thjtdt6lr98 .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-thjtdt6lr98 .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-thjtdt6lr98 .actorPopupMenu{position:absolute;}#mermaid-thjtdt6lr98 .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-thjtdt6lr98 .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-thjtdt6lr98 .actor-man circle,#mermaid-thjtdt6lr98 line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-thjtdt6lr98 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"mint()""Validate: no existing profile""_safeMint(msg.sender | tokenId)""Initialize reputation = 50""emit Transfer(0x0 | user | tokenId)""Return tokenId"

Diagram: Guardian Profile Minting Flow

The minting process ensures one NFT per address, establishing a 1:1 mapping between wallets and Guardian identities. Initial reputation is set to a neutral baseline of 50.

Function Reference: The contract likely implements `mint()` or `register()` functions for profile creation, following standard ERC-721 minting patterns.

Sources:[README.md#28](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L28-L28)[contracts/README.md#53-54](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L53-L54)

---

### Reputation TrackingLink copied!

#### Recording Interventions

The Registry receives cross-chain calls from `AegisHook` whenever a Guardian provides liquidity during an active panic event:

"AegisSentinel""AegisGuardianRegistry (L1)""Cross-Chain Bridge""AegisHook (L2)""AegisSentinel""AegisGuardianRegistry (L1)""Cross-Chain Bridge""AegisHook (L2)"#mermaid-ymwh8qkvb9s{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ymwh8qkvb9s .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ymwh8qkvb9s .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ymwh8qkvb9s .error-icon{fill:#a44141;}#mermaid-ymwh8qkvb9s .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ymwh8qkvb9s .edge-thickness-normal{stroke-width:1px;}#mermaid-ymwh8qkvb9s .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ymwh8qkvb9s .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ymwh8qkvb9s .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ymwh8qkvb9s .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ymwh8qkvb9s .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ymwh8qkvb9s .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ymwh8qkvb9s .marker.cross{stroke:lightgrey;}#mermaid-ymwh8qkvb9s svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ymwh8qkvb9s p{margin:0;}#mermaid-ymwh8qkvb9s .actor{stroke:#ccc;fill:#1f2020;}#mermaid-ymwh8qkvb9s text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-ymwh8qkvb9s .actor-line{stroke:#ccc;}#mermaid-ymwh8qkvb9s .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-ymwh8qkvb9s .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-ymwh8qkvb9s .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-ymwh8qkvb9s #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-ymwh8qkvb9s .sequenceNumber{fill:black;}#mermaid-ymwh8qkvb9s #sequencenumber{fill:lightgrey;}#mermaid-ymwh8qkvb9s #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-ymwh8qkvb9s .messageText{fill:lightgrey;stroke:none;}#mermaid-ymwh8qkvb9s .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-ymwh8qkvb9s .labelText,#mermaid-ymwh8qkvb9s .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-ymwh8qkvb9s .loopText,#mermaid-ymwh8qkvb9s .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-ymwh8qkvb9s .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-ymwh8qkvb9s .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-ymwh8qkvb9s .noteText,#mermaid-ymwh8qkvb9s .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-ymwh8qkvb9s .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-ymwh8qkvb9s .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-ymwh8qkvb9s .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-ymwh8qkvb9s .actorPopupMenu{position:absolute;}#mermaid-ymwh8qkvb9s .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-ymwh8qkvb9s .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-ymwh8qkvb9s .actor-man circle,#mermaid-ymwh8qkvb9s line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-ymwh8qkvb9s :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}"Guardian swaps during panic""recordIntervention(guardian | volume)""Forward cross-chain message""Store feedback per ERC-8004""Increment interventionCount""Update totalStabilizedVolume""emit NewFeedback(guardian | volume)"

Diagram: Intervention Recording Sequence

The `recordIntervention` function creates an immutable ERC-8004 feedback entry. This design ensures that reputation is built on verifiable on-chain actions, not subjective assessments.

Sources:[README.md#68-70](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L68-L70)[contracts/README.md#56-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L56-L57)

---

### Reputation CalculationLink copied!

The Registry implements a reputation scoring algorithm that considers multiple factors:

FactorWeightLogicIntervention Count40%More interventions → higher scoreVolume Provided30%Larger liquidity contributions → higher scoreResponse Latency20%Faster response to panic events → higher scoreConsistency10%Regular participation over time → higher score

Reputation Tiers:

Score RangeTierBenefits on L290-100VIP0.01% swap fees during panic mode70-89Trusted0.05% swap fees during panic mode50-69Standard0.10% swap fees during panic mode0-49UnprovenFull fees or restricted access

Sources:[README.md#30-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L30-L32)

---

## Events and Cross-Chain TriggersLink copied!

### NewFeedback EventLink copied!

The `NewFeedback` event is the critical bridge between L1 reputation storage and L2 reputation application:

```
event NewFeedback(
    address indexed guardian,
    uint256 volumeProvided,
    uint256 timestamp,
    uint256 newReputationScore
);
```

Event Flow:

#mermaid-oeyg252f12p{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-oeyg252f12p .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-oeyg252f12p .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-oeyg252f12p .error-icon{fill:#a44141;}#mermaid-oeyg252f12p .error-text{fill:#ddd;stroke:#ddd;}#mermaid-oeyg252f12p .edge-thickness-normal{stroke-width:1px;}#mermaid-oeyg252f12p .edge-thickness-thick{stroke-width:3.5px;}#mermaid-oeyg252f12p .edge-pattern-solid{stroke-dasharray:0;}#mermaid-oeyg252f12p .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-oeyg252f12p .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-oeyg252f12p .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-oeyg252f12p .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-oeyg252f12p .marker.cross{stroke:lightgrey;}#mermaid-oeyg252f12p svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-oeyg252f12p p{margin:0;}#mermaid-oeyg252f12p .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-oeyg252f12p .cluster-label text{fill:#F9FFFE;}#mermaid-oeyg252f12p .cluster-label span{color:#F9FFFE;}#mermaid-oeyg252f12p .cluster-label span p{background-color:transparent;}#mermaid-oeyg252f12p .label text,#mermaid-oeyg252f12p span{fill:#ccc;color:#ccc;}#mermaid-oeyg252f12p .node rect,#mermaid-oeyg252f12p .node circle,#mermaid-oeyg252f12p .node ellipse,#mermaid-oeyg252f12p .node polygon,#mermaid-oeyg252f12p .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-oeyg252f12p .rough-node .label text,#mermaid-oeyg252f12p .node .label text,#mermaid-oeyg252f12p .image-shape .label,#mermaid-oeyg252f12p .icon-shape .label{text-anchor:middle;}#mermaid-oeyg252f12p .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-oeyg252f12p .rough-node .label,#mermaid-oeyg252f12p .node .label,#mermaid-oeyg252f12p .image-shape .label,#mermaid-oeyg252f12p .icon-shape .label{text-align:center;}#mermaid-oeyg252f12p .node.clickable{cursor:pointer;}#mermaid-oeyg252f12p .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-oeyg252f12p .arrowheadPath{fill:lightgrey;}#mermaid-oeyg252f12p .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-oeyg252f12p .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-oeyg252f12p .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-oeyg252f12p .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-oeyg252f12p .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-oeyg252f12p .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-oeyg252f12p .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-oeyg252f12p .cluster text{fill:#F9FFFE;}#mermaid-oeyg252f12p .cluster span{color:#F9FFFE;}#mermaid-oeyg252f12p div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-oeyg252f12p .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-oeyg252f12p rect.text{fill:none;stroke-width:0;}#mermaid-oeyg252f12p .icon-shape,#mermaid-oeyg252f12p .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-oeyg252f12p .icon-shape p,#mermaid-oeyg252f12p .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-oeyg252f12p .icon-shape rect,#mermaid-oeyg252f12p .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-oeyg252f12p .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-oeyg252f12p .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-oeyg252f12p :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Event emitted on L1

Cross-chain call: boostReputation()

Update guardianRep mapping

AegisGuardianRegistry emit NewFeedback()

AegisSentinel listen & react

AegisHook update local cache

Diagram: NewFeedback Event Propagation

The `AegisSentinel` subscribes to this event on Sepolia. When detected, it automatically triggers a cross-chain call to `AegisHook.boostReputation()` to synchronize the updated reputation score to L2.

Sources:[README.md#32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L32-L32)[contracts/README.md#57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L57-L57)

---

## Contract DeploymentLink copied!

The Guardian Registry is deployed on Ethereum Sepolia as part of the L1 infrastructure. While the exact deployment address is not listed in the provided deployment logs, it follows the same deployment pattern as the other core contracts.

### Expected Deployment ConfigurationLink copied!

ParameterValueNetworkEthereum SepoliaChain ID11155111Token Name"Aegis Guardian"Token Symbol"AEGIS"Initial Supply0 (minted on demand)

Sources:[README.md#139-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L139-L142)[contracts/README.md#99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L103)

---

## ERC-8004 ComplianceLink copied!

The Guardian Registry implements the ERC-8004 (Trustless Agents) standard, which defines how smart contracts can manage agent reputations without trusted intermediaries.

### Key ERC-8004 RequirementsLink copied!

RequirementImplementationImmutable FeedbackAll intervention records are append-only and cannot be modifiedPublic VerificationAny address can query a Guardian's reputation historyAction-Based ReputationReputation derives from verifiable on-chain actions (swaps during panic)No Central AuthorityThe `AegisSentinel` autonomously updates reputation based on events

This compliance ensures that Guardian reputation is trustless, transparent, and resistant to manipulation.

Sources:[README.md#6](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L6-L6)[README.md#29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L29-L29)[contracts/README.md#53-54](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L53-L54)

---

## Gamification and LeaderboardsLink copied!

The Registry's data structure enables future gamification features mentioned in the project roadmap:

### Planned MetricsLink copied!

MetricDescriptionSource`totalStabilizedVolume`Cumulative liquidity provided across all interventionsSum of feedback entries`responseLatency`Average time to respond to panic eventsTimestamp deltas in feedback`consecutiveInterventions`Streak of panic events where Guardian participatedSequential feedback analysis`effectivenessScore`Ratio of successful interventions to total attemptsFeedback success flags

These metrics can be queried to build public leaderboards that incentivize Guardian participation.

Sources:[README.md#87-89](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L87-L89)

---

## Security ConsiderationsLink copied!

### Access ControlLink copied!

The Registry implements strict access control to prevent unauthorized reputation manipulation:

FunctionAllowed CallersProtection Mechanism`mint()`Any address (once)Enforces one NFT per address`recordIntervention()`Only AegisHook (via bridge)`onlyCrossChainCaller` modifier`transferFrom()`Token ownerStandard ERC-721 permissions

### Cross-Chain Message ValidationLink copied!

When receiving `recordIntervention` calls from L2, the Registry must validate:

1. Origin Chain: Message originated from Unichain Sepolia (Chain ID 1301)
2. Sender Contract: Message was sent by the authorized `AegisHook` address
3. Signature Verification: Cross-chain bridge signature is valid

Sources:[README.md#81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L81-L84)

---

## Integration PointsLink copied!

### With AegisHook (L2)Link copied!

The Registry receives intervention records from the Hook:

```
AegisHook.recordIntervention() 
  → Cross-chain bridge 
    → AegisGuardianRegistry.recordIntervention()
```

Referenced in:[contracts/README.md#56-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L56-L57)

### With AegisSentinel (Reactive)Link copied!

The Sentinel listens for reputation updates to sync back to L2:

```
AegisGuardianRegistry.emit NewFeedback() 
  → AegisSentinel.react() 
    → AegisHook.boostReputation()
```

Referenced in:[README.md#32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L32-L32)[contracts/README.md#57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L57-L57)

---

## Future EnhancementsLink copied!

The roadmap includes several planned improvements to the Guardian Registry:

1. Leaderboard UI: Public dashboard displaying top Guardians by volume, latency, and consistency
2. Decay Mechanism: Reputation scores decay over time to incentivize ongoing participation
3. Multi-Chain Support: Expand to track interventions across multiple L2s (Arbitrum, Optimism, etc.)
4. Slashing: Penalize Guardians who abandon positions during recovery periods

Sources:[README.md#87-91](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L87-L91)

---

## SummaryLink copied!

The Guardian Registry serves as the identity and reputation backbone of the Aegis system:

- Identity: ERC-721 NFTs provide unique, ownable Guardian profiles
- Reputation: ERC-8004 feedback records create trustless, verifiable reputation
- Cross-Chain: Events propagate reputation updates from L1 to L2 via AegisSentinel
- Incentives: VIP tiers reward high-reputation Guardians with reduced fees

By anchoring reputation on L1 while applying it on L2, the Registry creates a secure, decentralized trust system that enables autonomous agent coordination during market crises.

Sources:[README.md#24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/README.md#L24-L33)[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)