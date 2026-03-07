# Deployment ScriptsLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json)
- [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json)
- [contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json)

## Purpose and ScopeLink copied!

This document provides technical reference for the Foundry deployment scripts used to deploy Aegis contracts across three blockchain networks: Ethereum Sepolia (L1), Reactive Network (Lasna), and Unichain Sepolia (L2). The deployment process is a critical multi-chain orchestration that must be executed in a specific sequence to establish proper cross-chain communication channels.

For information about the deployed contract addresses and transaction details, see [Deployed Contract Addresses](#5.3) and [Transaction Details](#5.4). For network-specific RPC configuration, see [Network Configuration](#5.2).

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)

---

## OverviewLink copied!

Aegis uses three Foundry Solidity scripts located in the `contracts/script/` directory to deploy its core contracts. These scripts leverage Foundry's `forge script` command to deterministically deploy contracts while generating detailed broadcast logs for auditability.

### Deployment Scripts SummaryLink copied!

ScriptNetworkContractTransaction TypeSpecial Flags`04_DeployOracle.s.sol`Sepolia (L1)MockOracleCREATENone`05_DeploySentinel.s.sol`Reactive LasnaAegisSentinelCREATE`--legacy``06_DeployHook.s.sol`Unichain Sepolia (L2)AegisHookCREATE2Salt mining required

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#L1-L46)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#1-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#L1-L50)[contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#L1-L58)

---

## Deployment ArchitectureLink copied!

#mermaid-lokba9xsolb{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-lokba9xsolb .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-lokba9xsolb .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-lokba9xsolb .error-icon{fill:#a44141;}#mermaid-lokba9xsolb .error-text{fill:#ddd;stroke:#ddd;}#mermaid-lokba9xsolb .edge-thickness-normal{stroke-width:1px;}#mermaid-lokba9xsolb .edge-thickness-thick{stroke-width:3.5px;}#mermaid-lokba9xsolb .edge-pattern-solid{stroke-dasharray:0;}#mermaid-lokba9xsolb .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-lokba9xsolb .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-lokba9xsolb .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-lokba9xsolb .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-lokba9xsolb .marker.cross{stroke:lightgrey;}#mermaid-lokba9xsolb svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-lokba9xsolb p{margin:0;}#mermaid-lokba9xsolb .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-lokba9xsolb .cluster-label text{fill:#F9FFFE;}#mermaid-lokba9xsolb .cluster-label span{color:#F9FFFE;}#mermaid-lokba9xsolb .cluster-label span p{background-color:transparent;}#mermaid-lokba9xsolb .label text,#mermaid-lokba9xsolb span{fill:#ccc;color:#ccc;}#mermaid-lokba9xsolb .node rect,#mermaid-lokba9xsolb .node circle,#mermaid-lokba9xsolb .node ellipse,#mermaid-lokba9xsolb .node polygon,#mermaid-lokba9xsolb .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-lokba9xsolb .rough-node .label text,#mermaid-lokba9xsolb .node .label text,#mermaid-lokba9xsolb .image-shape .label,#mermaid-lokba9xsolb .icon-shape .label{text-anchor:middle;}#mermaid-lokba9xsolb .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-lokba9xsolb .rough-node .label,#mermaid-lokba9xsolb .node .label,#mermaid-lokba9xsolb .image-shape .label,#mermaid-lokba9xsolb .icon-shape .label{text-align:center;}#mermaid-lokba9xsolb .node.clickable{cursor:pointer;}#mermaid-lokba9xsolb .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-lokba9xsolb .arrowheadPath{fill:lightgrey;}#mermaid-lokba9xsolb .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-lokba9xsolb .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-lokba9xsolb .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-lokba9xsolb .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-lokba9xsolb .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-lokba9xsolb .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-lokba9xsolb .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-lokba9xsolb .cluster text{fill:#F9FFFE;}#mermaid-lokba9xsolb .cluster span{color:#F9FFFE;}#mermaid-lokba9xsolb div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-lokba9xsolb .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-lokba9xsolb rect.text{fill:none;stroke-width:0;}#mermaid-lokba9xsolb .icon-shape,#mermaid-lokba9xsolb .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-lokba9xsolb .icon-shape p,#mermaid-lokba9xsolb .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-lokba9xsolb .icon-shape rect,#mermaid-lokba9xsolb .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-lokba9xsolb .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-lokba9xsolb .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-lokba9xsolb :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Broadcast Artifacts

Deployed Contracts

Target Networks

Deployment Scripts

forge script --rpc-url sepolia --broadcast

forge script --rpc-url reactive --broadcast --legacy

forge script --rpc-url unichain_sepolia --broadcast

CREATE tx

CREATE tx

CREATE2 tx

Generates

Generates

Generates

04_DeployOracle.s.sol Script Contract

05_DeploySentinel.s.sol Script Contract

06_DeployHook.s.sol Script Contract

Ethereum Sepolia Chain ID: 11155111

Reactive Lasna Chain ID: 5318007

Unichain Sepolia Chain ID: 1301

MockOracle 0x29f8...ba3b

AegisSentinel 0x0f76...b482

AegisHook 0xbaa0...c080

04_DeployOracle.s.sol/ 11155111/run-*.json

05_DeploySentinel.s.sol/ 5318007/run-*.json

06_DeployHook.s.sol/ 1301/run-*.json

Sources:[contracts/README.md#99-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L122)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#3-20](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#L3-L20)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#3-24](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#L3-L24)[contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#3-24](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#L3-L24)

---

## Script 1: Oracle Deployment (`04_DeployOracle.s.sol`)Link copied!

### PurposeLink copied!

Deploys the `MockOracle` contract to Ethereum Sepolia (L1), which acts as the price feed source that triggers the cross-chain circuit breaker mechanism.

### Deployment CommandLink copied!

```
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast
```

### Transaction DetailsLink copied!

The deployment uses a standard `CREATE` opcode transaction:

PropertyValueTransaction Type`CREATE`Contract Name`MockOracle`NetworkEthereum SepoliaChain ID`11155111` (`0xaa36a7`)Deployed Address`0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b`Gas Used`206,613` (`0x32915`)Transaction Hash`0x3a084a0a072d935c30754dc6b246b1869ae71c2e3b99527b4f43fe49934349ba`

### Constructor ArgumentsLink copied!

The `MockOracle` contract initializes with:

- Owner: Set to `msg.sender` (deployer address `0xd2df53d9791e98db221842dd085f4144014bbe2a`)
- Initial Price: `2000 * 10^18` (`686c6b935b8bbd400000` in hex) representing $2000

### Broadcast ArtifactLink copied!

Upon successful deployment, the script generates a broadcast log at:

```
contracts/broadcast/04_DeployOracle.s.sol/11155111/run-<timestamp>.json
```

The broadcast JSON contains the complete transaction data, receipt, and deployment metadata for audit trails.

Sources:[contracts/README.md#107-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L107-L110)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#L1-L46)

---

## Script 2: Sentinel Deployment (`05_DeploySentinel.s.sol`)Link copied!

### PurposeLink copied!

Deploys the `AegisSentinel` contract to the Reactive Network (Lasna), which acts as the autonomous cross-chain orchestrator that listens to L1 events and triggers L2 actions.

### Deployment CommandLink copied!

```
forge script script/05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacy
```

### Special ConsiderationsLink copied!

#### Legacy Transaction Flag

The `--legacy` flag is required for Reactive Network deployment. This forces Foundry to use legacy (non-EIP-1559) transactions without `maxFeePerGas` and `maxPriorityFeePerGas` fields.

#### Post-Deployment Subscription

After deployment, the Sentinel contract requires a manual subscription call to start listening to L1 events. This is noted in the deployment documentation but not automated by the script.

### Transaction DetailsLink copied!

PropertyValueTransaction Type`CREATE`Contract Name`AegisSentinel`NetworkReactive Network (Lasna)Chain ID`5318007` (`0x512577`)Deployed Address`0x0f764437ffbe1fcd0d0d276a164610422710b482`Gas Used`1,107,184` (`0x10e4f0`)Transaction Hash`0x98d0ea4fda0f82a98d840f2df750a61cdcb3265acf6f54e9653a59aa76d8fa89`

### Constructor ArgumentsLink copied!

The `AegisSentinel` constructor receives three critical addresses:

```
constructor(
    address _reactiveServiceAddress,  // 0x0000000000000000000000000000000000fffFfF
    address _hook,                    // 0xBaa0573e3BE4291b58083e717E9EF5051772C080
    address _priceOracle              // 0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b
)
```

ParameterValuePurpose`_reactiveServiceAddress``0x0000000000000000000000000000000000fffFfF`Reactive Network system contract`_hook``0xBaa0573e3BE4291b58083e717E9EF5051772C080`AegisHook address on Unichain L2`_priceOracle``0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`MockOracle address on Sepolia L1

The constructor arguments are encoded in the deployment transaction input data starting at byte position after the contract bytecode.

### Broadcast ArtifactLink copied!

```
contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-<timestamp>.json
```

Sources:[contracts/README.md#112-117](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L112-L117)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#1-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#L1-L50)

---

## Script 3: Hook Deployment (`06_DeployHook.s.sol`)Link copied!

### PurposeLink copied!

Deploys the `AegisHook` contract to Unichain Sepolia (L2) using `CREATE2` with deterministic address generation. The hook implements the Uniswap v4 `beforeSwap` circuit breaker mechanism.

### Deployment CommandLink copied!

```
forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcast
```

### CREATE2 Deployment StrategyLink copied!

Unlike the other two contracts, `AegisHook` uses the `CREATE2` opcode for deployment. This is required for Uniswap v4 hooks because the hook address must have specific flag bits set to indicate which callback functions it implements.

#### CREATE2 Transaction Structure

PropertyValueTransaction Type`CREATE2`Factory Address`0x4e59b44847b379578588920ca78fbf26c0b4956c` (Standard CREATE2 deployer)Salt`0x0000000000000000000000000000000000000000000000000000000000003264`Contract Name`AegisHook`NetworkUnichain SepoliaChain ID`1301` (`0x515`)Deployed Address`0xbaa0573e3be4291b58083e717e9ef5051772c080`

#### Salt Mining for Hook Permissions

The deployment script uses salt mining to find a salt value that produces a hook address with the correct permission bits. The final address `0xbaa0573e3be4291b58083e717e9ef5051772c080` encodes hook permissions in its leading bytes.

### Transaction DetailsLink copied!

PropertyValueGas Used`1,424,687` (`0x15bd2f`)Effective Gas Price`1,500,000` wei (`0x16e360`)Transaction Hash`0x1a6abff8b974723219d62b4b8f9ac4d27fd24e11fe23c03f21a392574c5458d7`Block Number`42,733,259` (`0x28c16cb`)

#### Unichain-Specific Costs

The receipt includes Unichain's unique gas accounting fields:

FieldValuePurpose`blobGasUsed``1,879,040` (`0x1cafc0`)EIP-4844 blob gas for data availability`l1Fee``0x449aa04dabc`L1 data availability cost`l1GasUsed``0x125c5`Equivalent L1 gas consumption`l1BlobBaseFee``0x404710a2`L1 blob gas price`daFootprintGasScalar``0x190`Data availability multiplier

### Constructor ArgumentsLink copied!

```
constructor(
    address _poolManager,  // 0x00B036B58a818B1BC34d502D3fE730Db729e62AC
    address _owner         // 0xd2df53D9791e98Db221842Dd085F4144014BBE2a
)
```

ParameterValuePurpose`_poolManager``0x00B036B58a818B1BC34d502D3fE730Db729e62AC`Uniswap v4 PoolManager on Unichain`_owner``0xd2df53D9791e98Db221842Dd085F4144014BBE2a`Owner address for access control

### Broadcast ArtifactLink copied!

```
contracts/broadcast/06_DeployHook.s.sol/1301/run-<timestamp>.json
```

Sources:[contracts/README.md#118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L118-L122)[contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#L1-L58)

---

## Deployment WorkflowLink copied!

"broadcast/""Unichain L2""Reactive Network""Sepolia L1""forge script""Developer""broadcast/""Unichain L2""Reactive Network""Sepolia L1""forge script""Developer"#mermaid-t9jnlu90yr{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-t9jnlu90yr .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-t9jnlu90yr .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-t9jnlu90yr .error-icon{fill:#a44141;}#mermaid-t9jnlu90yr .error-text{fill:#ddd;stroke:#ddd;}#mermaid-t9jnlu90yr .edge-thickness-normal{stroke-width:1px;}#mermaid-t9jnlu90yr .edge-thickness-thick{stroke-width:3.5px;}#mermaid-t9jnlu90yr .edge-pattern-solid{stroke-dasharray:0;}#mermaid-t9jnlu90yr .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-t9jnlu90yr .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-t9jnlu90yr .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-t9jnlu90yr .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-t9jnlu90yr .marker.cross{stroke:lightgrey;}#mermaid-t9jnlu90yr svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-t9jnlu90yr p{margin:0;}#mermaid-t9jnlu90yr .actor{stroke:#ccc;fill:#1f2020;}#mermaid-t9jnlu90yr text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-t9jnlu90yr .actor-line{stroke:#ccc;}#mermaid-t9jnlu90yr .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-t9jnlu90yr .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-t9jnlu90yr .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-t9jnlu90yr #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-t9jnlu90yr .sequenceNumber{fill:black;}#mermaid-t9jnlu90yr #sequencenumber{fill:lightgrey;}#mermaid-t9jnlu90yr #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-t9jnlu90yr .messageText{fill:lightgrey;stroke:none;}#mermaid-t9jnlu90yr .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-t9jnlu90yr .labelText,#mermaid-t9jnlu90yr .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-t9jnlu90yr .loopText,#mermaid-t9jnlu90yr .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-t9jnlu90yr .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-t9jnlu90yr .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-t9jnlu90yr .noteText,#mermaid-t9jnlu90yr .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-t9jnlu90yr .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-t9jnlu90yr .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-t9jnlu90yr .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-t9jnlu90yr .actorPopupMenu{position:absolute;}#mermaid-t9jnlu90yr .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-t9jnlu90yr .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-t9jnlu90yr .actor-man circle,#mermaid-t9jnlu90yr line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-t9jnlu90yr :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Step 1: Deploy Oracle (L1)Step 2: Deploy Hook (L2)Salt mining for CREATE2Step 3: Deploy Sentinel (Reactive)Constructor args use Oracle and Hook addressesStep 4: Manual Subscriptionforge script 04_DeployOracle.s.sol --rpc-url sepolia --broadcastCREATE MockOracle tx: 0x3a084a0a...Deployed at 0x29f8...ba3bWrite broadcast JSON 11155111/run-*.jsonforge script 06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcastCREATE2 AegisHook via 0x4e59...956c tx: 0x1a6abff8...Deployed at 0xbaa0...c080Write broadcast JSON 1301/run-*.jsonforge script 05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacyCREATE AegisSentinel args: (0xfff...FfF | 0xbaa0...c080 | 0x29f8...ba3b) tx: 0x98d0ea4f...Deployed at 0x0f76...b482Write broadcast JSON 5318007/run-*.jsonCall Sentinel.subscribe() to start listening to L1 events

Deployment Order Rationale:

1. Oracle First: Must exist before Sentinel can reference it
2. Hook Second: Must exist before Sentinel can reference it for cross-chain calls
3. Sentinel Last: Requires both Oracle and Hook addresses as constructor arguments

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)

---

## Broadcast Logs StructureLink copied!

Each deployment script generates a structured JSON broadcast log containing complete transaction metadata. The logs follow this directory structure:

```
contracts/broadcast/
├── 04_DeployOracle.s.sol/
│   └── 11155111/
│       └── run-<timestamp>.json
├── 05_DeploySentinel.s.sol/
│   └── 5318007/
│       └── run-<timestamp>.json
└── 06_DeployHook.s.sol/
    └── 1301/
        └── run-<timestamp>.json
```

### Broadcast JSON SchemaLink copied!

#mermaid-4fq89g0q30f{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-4fq89g0q30f .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-4fq89g0q30f .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-4fq89g0q30f .error-icon{fill:#a44141;}#mermaid-4fq89g0q30f .error-text{fill:#ddd;stroke:#ddd;}#mermaid-4fq89g0q30f .edge-thickness-normal{stroke-width:1px;}#mermaid-4fq89g0q30f .edge-thickness-thick{stroke-width:3.5px;}#mermaid-4fq89g0q30f .edge-pattern-solid{stroke-dasharray:0;}#mermaid-4fq89g0q30f .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-4fq89g0q30f .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-4fq89g0q30f .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-4fq89g0q30f .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-4fq89g0q30f .marker.cross{stroke:lightgrey;}#mermaid-4fq89g0q30f svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-4fq89g0q30f p{margin:0;}#mermaid-4fq89g0q30f .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-4fq89g0q30f .cluster-label text{fill:#F9FFFE;}#mermaid-4fq89g0q30f .cluster-label span{color:#F9FFFE;}#mermaid-4fq89g0q30f .cluster-label span p{background-color:transparent;}#mermaid-4fq89g0q30f .label text,#mermaid-4fq89g0q30f span{fill:#ccc;color:#ccc;}#mermaid-4fq89g0q30f .node rect,#mermaid-4fq89g0q30f .node circle,#mermaid-4fq89g0q30f .node ellipse,#mermaid-4fq89g0q30f .node polygon,#mermaid-4fq89g0q30f .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-4fq89g0q30f .rough-node .label text,#mermaid-4fq89g0q30f .node .label text,#mermaid-4fq89g0q30f .image-shape .label,#mermaid-4fq89g0q30f .icon-shape .label{text-anchor:middle;}#mermaid-4fq89g0q30f .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-4fq89g0q30f .rough-node .label,#mermaid-4fq89g0q30f .node .label,#mermaid-4fq89g0q30f .image-shape .label,#mermaid-4fq89g0q30f .icon-shape .label{text-align:center;}#mermaid-4fq89g0q30f .node.clickable{cursor:pointer;}#mermaid-4fq89g0q30f .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-4fq89g0q30f .arrowheadPath{fill:lightgrey;}#mermaid-4fq89g0q30f .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-4fq89g0q30f .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-4fq89g0q30f .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-4fq89g0q30f .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-4fq89g0q30f .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-4fq89g0q30f .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-4fq89g0q30f .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-4fq89g0q30f .cluster text{fill:#F9FFFE;}#mermaid-4fq89g0q30f .cluster span{color:#F9FFFE;}#mermaid-4fq89g0q30f div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-4fq89g0q30f .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-4fq89g0q30f rect.text{fill:none;stroke-width:0;}#mermaid-4fq89g0q30f .icon-shape,#mermaid-4fq89g0q30f .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-4fq89g0q30f .icon-shape p,#mermaid-4fq89g0q30f .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-4fq89g0q30f .icon-shape rect,#mermaid-4fq89g0q30f .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-4fq89g0q30f .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-4fq89g0q30f .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-4fq89g0q30f :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Broadcast JSON Root

transactions[]

receipts[]

Metadata

hash

transactionType (CREATE/CREATE2)

contractName

contractAddress

arguments[]

transaction{} from, gas, value, input, nonce, chainId

status

gasUsed

blockHash

blockNumber

logsBloom

contractAddress

chain (chainId)

timestamp

commit (git hash)

### Key FieldsLink copied!

Field PathDescriptionExample`transactions[0].hash`Transaction hash`0x3a084a0a072d935c3075...``transactions[0].contractName`Deployed contract name`"MockOracle"``transactions[0].contractAddress`Deployed address`"0x29f8f8d2a00330f9683..."``transactions[0].transactionType`Deployment method`"CREATE"` or `"CREATE2"``receipts[0].gasUsed`Actual gas consumed`"0x32915"` (206,613)`receipts[0].blockNumber`Block number`"0x9ab972"` (10,139,010)`chain`Network chain ID`11155111``timestamp`Unix timestamp (ms)`1769586193733``commit`Git commit hash`"08ea552"`

Sources:[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json#L1-L46)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#1-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json#L1-L50)[contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#L1-L58)

---

## Special Deployment ConsiderationsLink copied!

### Network-Specific RequirementsLink copied!

NetworkRequirementReasonReactive Network`--legacy` flag requiredDoes not support EIP-1559 transaction formatUnichainCREATE2 with salt miningHook address bits must encode permissionsSepoliaStandard deploymentNo special requirements

### Gas ConsiderationsLink copied!

The Hook deployment on Unichain is the most expensive:

```
Direct Gas Cost:     1,424,687 wei × 1,500,000 = 2,137,030,500,000 wei
L1 Data Cost:        0x449aa04dabc ≈ 75,000,000,000,000 wei
Total:               ~77 Twei (~0.000077 ETH)
```

The high L1 data cost is due to Unichain's EIP-4844 blob-based data availability system, which posts transaction data to Ethereum L1.

### Post-Deployment ActionsLink copied!

After running all three deployment scripts, the following manual steps are required:

1. Subscribe Sentinel to Oracle Events

- Call `AegisSentinel.subscribe()` on Reactive Network
- This activates the event listener for `PriceUpdate` events from L1
2. Verify Cross-Chain Communication

- Test that Oracle price updates trigger Sentinel reactions
- Confirm Sentinel can successfully call `setPanicMode()` on Hook
3. Initialize Pool with Hook

- Deploy a Uniswap v4 pool on Unichain that references the deployed Hook address
- Ensure the Hook permissions match the pool's requirements

Sources:[contracts/README.md#112-117](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L112-L117)[contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#39-49](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json#L39-L49)

---

## Script Execution ReferenceLink copied!

### Environment VariablesLink copied!

The deployment scripts require the following environment variables (typically stored in `.env`):

```
SEPOLIA_RPC_URL=<Ethereum Sepolia RPC endpoint>
REACTIVE_RPC_URL=<Reactive Network RPC endpoint>
UNICHAIN_SEPOLIA_RPC_URL=<Unichain Sepolia RPC endpoint>
PRIVATE_KEY=<Deployer private key>
```

These correspond to the RPC aliases used in the `forge script` commands: `sepolia`, `reactive`, and `unichain_sepolia`.

### Complete Deployment SequenceLink copied!

```
# Step 1: Deploy Oracle to Sepolia L1
forge script script/04_DeployOracle.s.sol \
  --rpc-url sepolia \
  --broadcast \
  --verify
 
# Step 2: Deploy Hook to Unichain L2
forge script script/06_DeployHook.s.sol \
  --rpc-url unichain_sepolia \
  --broadcast \
  --verify
 
# Step 3: Deploy Sentinel to Reactive Network
# Note: Uses addresses from Steps 1 and 2
forge script script/05_DeploySentinel.s.sol \
  --rpc-url reactive \
  --broadcast \
  --legacy
 
# Step 4: Manual subscription call
cast send <SENTINEL_ADDRESS> "subscribe()" \
  --rpc-url reactive \
  --private-key $PRIVATE_KEY
```

### Dry Run (Simulation)Link copied!

To simulate deployment without broadcasting transactions:

```
forge script script/04_DeployOracle.s.sol --rpc-url sepolia
```

Omitting the `--broadcast` flag performs a local simulation that estimates gas costs and validates constructor arguments.

Sources:[contracts/README.md#107-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L107-L122)