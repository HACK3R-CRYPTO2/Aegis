# DeploymentLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

This document provides a comprehensive guide for deploying the Aegis cross-chain circuit breaker system across three blockchain networks: Ethereum Sepolia (L1), Reactive Network Lasna, and Unichain Sepolia (L2). The deployment process requires executing multiple Foundry scripts in a specific order, with cross-chain configuration dependencies between contracts.

For detailed information about individual deployment scripts, see [Deployment Scripts](#5.1). For network-specific RPC endpoints and chain IDs, see [Network Configuration](#5.2). For a reference table of deployed addresses, see [Deployed Contract Addresses](#5.3).

---

## Deployment ArchitectureLink copied!

The Aegis system consists of four smart contracts deployed across three separate blockchain networks. Each network serves a distinct architectural role in the cross-chain circuit breaker mechanism.

#mermaid-mkbzfkx7wlj{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-mkbzfkx7wlj .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-mkbzfkx7wlj .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-mkbzfkx7wlj .error-icon{fill:#a44141;}#mermaid-mkbzfkx7wlj .error-text{fill:#ddd;stroke:#ddd;}#mermaid-mkbzfkx7wlj .edge-thickness-normal{stroke-width:1px;}#mermaid-mkbzfkx7wlj .edge-thickness-thick{stroke-width:3.5px;}#mermaid-mkbzfkx7wlj .edge-pattern-solid{stroke-dasharray:0;}#mermaid-mkbzfkx7wlj .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-mkbzfkx7wlj .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-mkbzfkx7wlj .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-mkbzfkx7wlj .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-mkbzfkx7wlj .marker.cross{stroke:lightgrey;}#mermaid-mkbzfkx7wlj svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-mkbzfkx7wlj p{margin:0;}#mermaid-mkbzfkx7wlj .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-mkbzfkx7wlj .cluster-label text{fill:#F9FFFE;}#mermaid-mkbzfkx7wlj .cluster-label span{color:#F9FFFE;}#mermaid-mkbzfkx7wlj .cluster-label span p{background-color:transparent;}#mermaid-mkbzfkx7wlj .label text,#mermaid-mkbzfkx7wlj span{fill:#ccc;color:#ccc;}#mermaid-mkbzfkx7wlj .node rect,#mermaid-mkbzfkx7wlj .node circle,#mermaid-mkbzfkx7wlj .node ellipse,#mermaid-mkbzfkx7wlj .node polygon,#mermaid-mkbzfkx7wlj .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-mkbzfkx7wlj .rough-node .label text,#mermaid-mkbzfkx7wlj .node .label text,#mermaid-mkbzfkx7wlj .image-shape .label,#mermaid-mkbzfkx7wlj .icon-shape .label{text-anchor:middle;}#mermaid-mkbzfkx7wlj .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-mkbzfkx7wlj .rough-node .label,#mermaid-mkbzfkx7wlj .node .label,#mermaid-mkbzfkx7wlj .image-shape .label,#mermaid-mkbzfkx7wlj .icon-shape .label{text-align:center;}#mermaid-mkbzfkx7wlj .node.clickable{cursor:pointer;}#mermaid-mkbzfkx7wlj .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-mkbzfkx7wlj .arrowheadPath{fill:lightgrey;}#mermaid-mkbzfkx7wlj .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-mkbzfkx7wlj .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-mkbzfkx7wlj .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-mkbzfkx7wlj .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-mkbzfkx7wlj .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-mkbzfkx7wlj .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-mkbzfkx7wlj .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-mkbzfkx7wlj .cluster text{fill:#F9FFFE;}#mermaid-mkbzfkx7wlj .cluster span{color:#F9FFFE;}#mermaid-mkbzfkx7wlj div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-mkbzfkx7wlj .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-mkbzfkx7wlj rect.text{fill:none;stroke-width:0;}#mermaid-mkbzfkx7wlj .icon-shape,#mermaid-mkbzfkx7wlj .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-mkbzfkx7wlj .icon-shape p,#mermaid-mkbzfkx7wlj .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-mkbzfkx7wlj .icon-shape rect,#mermaid-mkbzfkx7wlj .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-mkbzfkx7wlj .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-mkbzfkx7wlj .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-mkbzfkx7wlj :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Unichain Sepolia (Chain ID: 1301)

Reactive Network Lasna (Chain ID: 5318007)

Ethereum Sepolia (Chain ID: 11155111)

PriceUpdate(uint256 price)

setPanicMode(bool)

NewFeedback(uint256 nftId)

updateReputation(address, uint256)

1.04_DeployOracle.s.sol

2.05_DeploySentinel.s.sol

3.06_DeployHook.s.sol

MockOracle 0x1392C38921A818cEdb100cC3767e8f30deC3a7D8 Emits PriceUpdate events

GuardianRegistry (Future: ERC-721 + ERC-8004) Reputation state

AegisSentinel 0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6 Extends AbstractReactive Listens to L1 events

AegisHook 0x1E2aE114cF3B63779A1367eD704ccA51a0218080 BaseHook implementation CREATE2-deployed with salt

Deployment Environment Foundry + forge scripts

Sources:[contracts/README.md#9-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L9-L26)[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)

---

## Deployment Order and DependenciesLink copied!

The deployment process must follow a strict sequential order due to cross-contract dependencies. Each contract requires configuration data from previously deployed contracts.

Deployment StepContractNetworkScriptDependencies1`MockOracle`Ethereum Sepolia`04_DeployOracle.s.sol`None2`AegisSentinel`Reactive Lasna`05_DeploySentinel.s.sol`Oracle address from Step 13`AegisHook`Unichain Sepolia`06_DeployHook.s.sol`Sentinel address from Step 2

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)

### Critical Deployment ConstraintsLink copied!

1. Oracle-First Requirement: `AegisSentinel` constructor requires the deployed `MockOracle` address to configure event subscription parameters via `subscribe()` method.
2. Sentinel Address for Hook: `AegisHook` constructor requires the deployed `AegisSentinel` address to restrict `setPanicMode()` access control using the `onlySentinel` modifier.
3. CREATE2 Salt Mining: `AegisHook` deployment requires a pre-computed salt value to ensure the deployed address has the `BEFORE_SWAP_FLAG` (0x80...) required by Uniswap V4 pool manager hook validation.

Sources:[contracts/README.md#105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L105-L122)

---

## Deployment WorkflowLink copied!

The following sequence diagram illustrates the complete deployment workflow, including cross-network contract instantiation and post-deployment configuration steps.

"Unichain Sepolia RPC""Reactive Network RPC""Ethereum Sepolia RPC""Foundry Toolchain""Developer""Unichain Sepolia RPC""Reactive Network RPC""Ethereum Sepolia RPC""Foundry Toolchain""Developer"#mermaid-p8qx7dpj39{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-p8qx7dpj39 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-p8qx7dpj39 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-p8qx7dpj39 .error-icon{fill:#a44141;}#mermaid-p8qx7dpj39 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-p8qx7dpj39 .edge-thickness-normal{stroke-width:1px;}#mermaid-p8qx7dpj39 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-p8qx7dpj39 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-p8qx7dpj39 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-p8qx7dpj39 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-p8qx7dpj39 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-p8qx7dpj39 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-p8qx7dpj39 .marker.cross{stroke:lightgrey;}#mermaid-p8qx7dpj39 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-p8qx7dpj39 p{margin:0;}#mermaid-p8qx7dpj39 .actor{stroke:#ccc;fill:#1f2020;}#mermaid-p8qx7dpj39 text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-p8qx7dpj39 .actor-line{stroke:#ccc;}#mermaid-p8qx7dpj39 .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-p8qx7dpj39 .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-p8qx7dpj39 .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-p8qx7dpj39 #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-p8qx7dpj39 .sequenceNumber{fill:black;}#mermaid-p8qx7dpj39 #sequencenumber{fill:lightgrey;}#mermaid-p8qx7dpj39 #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-p8qx7dpj39 .messageText{fill:lightgrey;stroke:none;}#mermaid-p8qx7dpj39 .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-p8qx7dpj39 .labelText,#mermaid-p8qx7dpj39 .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-p8qx7dpj39 .loopText,#mermaid-p8qx7dpj39 .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-p8qx7dpj39 .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-p8qx7dpj39 .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-p8qx7dpj39 .noteText,#mermaid-p8qx7dpj39 .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-p8qx7dpj39 .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-p8qx7dpj39 .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-p8qx7dpj39 .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-p8qx7dpj39 .actorPopupMenu{position:absolute;}#mermaid-p8qx7dpj39 .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-p8qx7dpj39 .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-p8qx7dpj39 .actor-man circle,#mermaid-p8qx7dpj39 line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-p8qx7dpj39 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Phase 1: Deploy Oracle on L1Phase 2: Deploy Sentinel on Reactive NetworkManual Step: Subscribe Sentinel to Oracle eventsPhase 3: Mine CREATE2 SaltPhase 4: Deploy Hook on L2Deployment Completeforge script 04_DeployOracle.s.sol --rpc-url sepolia --broadcastDeploy MockOracle.solContract deployed 0x1392...a7D8Save to broadcast/ 04_DeployOracle.s.sol/ 11155111/run-latest.jsonExtract Oracle address from broadcast JSONforge script 05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacyDeploy AegisSentinel.sol constructor(chainId | oracleAddr)Contract deployed 0x0B6a...b6B6Save to broadcast/ 05_DeploySentinel.s.sol/ 5318007/run-latest.jsonCall subscribe() on Sentinel to register L1 event listenerRun salt mining utility to find valid hook addressSalt value for 0x1E2a...8080 with BEFORE_SWAP_FLAGforge script 06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcastDeploy AegisHook.sol via CREATE2 constructor(poolManager | sentinelAddr) with computed saltContract deployed 0x1E2a...8080Save to broadcast/ 06_DeployHook.s.sol/ 1301/run-latest.json

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)

---

## Foundry Script ExecutionLink copied!

Each deployment script is executed using the `forge script` command with network-specific parameters. The scripts inherit from `forge-std/Script.sol` and use `vm.startBroadcast()` to execute on-chain transactions.

### Oracle Deployment (Step 1)Link copied!

```
forge script script/04_DeployOracle.s.sol \
  --rpc-url sepolia \
  --broadcast \
  --verify
```

Script Functionality:

- Deploys `MockOracle` contract to Ethereum Sepolia
- No constructor arguments required
- Outputs deployment address to `broadcast/04_DeployOracle.s.sol/11155111/run-latest.json`

Sources:[contracts/README.md#107-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L107-L110)

---

### Sentinel Deployment (Step 2)Link copied!

```
forge script script/05_DeploySentinel.s.sol \
  --rpc-url reactive \
  --broadcast \
  --legacy
```

Script Functionality:

- Deploys `AegisSentinel` contract to Reactive Network Lasna
- Constructor requires: `chainId` (11155111), `oracleAddress` (from Step 1)
- Requires `--legacy` flag due to Reactive Network EVM compatibility
- Requires manual `subscribe()` call post-deployment to activate event listening

Post-Deployment Requirement:
After deployment, the contract owner must call `subscribe()` with appropriate event topic parameters to register the Sentinel as a listener for `PriceUpdate` events from the L1 Oracle.

Sources:[contracts/README.md#112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L112-L116)

---

### Hook Deployment (Step 3)Link copied!

```
forge script script/06_DeployHook.s.sol \
  --rpc-url unichain_sepolia \
  --broadcast \
  --verify
```

Script Functionality:

- Deploys `AegisHook` contract to Unichain Sepolia using CREATE2
- Constructor requires: `poolManager` address, `sentinelAddress` (from Step 2)
- Uses pre-computed salt to achieve hook address with `BEFORE_SWAP_FLAG` prefix
- Validates deployed address matches expected hook permissions bitmap

CREATE2 Address Requirements:
The deployed address must satisfy Uniswap V4's hook validation logic, which checks that the hook address contains permission flags in its first byte. The `BEFORE_SWAP_FLAG` (0x80) indicates the hook implements the `beforeSwap()` callback.

Sources:[contracts/README.md#118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L118-L122)

---

## Network Configuration RequirementsLink copied!

The deployment process requires properly configured RPC endpoints and private keys for all three networks. These are specified in `foundry.toml` under the `[rpc_endpoints]` section.

NetworkChain IDRPC Configuration KeyRequired forEthereum Sepolia11155111`sepolia`Oracle deploymentReactive Lasna5318007`reactive`Sentinel deploymentUnichain Sepolia1301`unichain_sepolia`Hook deployment

Environment Variables:

- `PRIVATE_KEY`: Deployer account private key (must have native tokens on all networks)
- `ETHERSCAN_API_KEY`: For contract verification on Sepolia
- `RPC_URL_SEPOLIA`: Ethereum Sepolia HTTP endpoint
- `RPC_URL_REACTIVE`: Reactive Network HTTP endpoint
- `RPC_URL_UNICHAIN_SEPOLIA`: Unichain Sepolia HTTP endpoint

For complete RPC endpoint URLs and chain-specific configuration, see [Network Configuration](#5.2).

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)

---

## Post-Deployment ConfigurationLink copied!

After all contracts are deployed, additional configuration steps are required to activate the cross-chain system.

### Sentinel Event SubscriptionLink copied!

The `AegisSentinel` contract must be manually configured to listen for `PriceUpdate` events from the deployed `MockOracle`:

```
cast send 0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6 \
  "subscribe()" \
  --rpc-url reactive \
  --private-key $PRIVATE_KEY
```

This call registers the Sentinel with the Reactive Network's event subscription system, establishing the L1→Reactive event bridge.

Sources:[contracts/README.md#112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L112-L116)

---

### Verification of Cross-Chain LinkageLink copied!

After deployment and configuration, verify the system is correctly wired:

1. Oracle→Sentinel Subscription: Confirm Sentinel is subscribed to Oracle events
2. Sentinel→Hook Authorization: Confirm Hook's `authorizedSentinel` matches deployed Sentinel address
3. Hook Address Validation: Confirm Hook address contains `BEFORE_SWAP_FLAG` (0x80)

Sources:[contracts/README.md#33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L37)

---

## Deployment Output ArtifactsLink copied!

Each deployment script generates a broadcast log JSON file containing complete transaction metadata. These files are stored in `broadcast/<ScriptName>/<ChainID>/run-latest.json` and include:

- Deployed contract addresses
- Constructor arguments
- Transaction hashes
- Gas usage statistics
- Block numbers and timestamps
- Contract ABI and bytecode

For detailed transaction receipts and deployment metadata, see [Transaction Details](#5.4).

Sources:[contracts/README.md#105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L105-L122)

---

## Deployment State DiagramLink copied!

The following diagram illustrates the deployment lifecycle and system state transitions:

#mermaid-mh9c14spg4p{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-mh9c14spg4p .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-mh9c14spg4p .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-mh9c14spg4p .error-icon{fill:#a44141;}#mermaid-mh9c14spg4p .error-text{fill:#ddd;stroke:#ddd;}#mermaid-mh9c14spg4p .edge-thickness-normal{stroke-width:1px;}#mermaid-mh9c14spg4p .edge-thickness-thick{stroke-width:3.5px;}#mermaid-mh9c14spg4p .edge-pattern-solid{stroke-dasharray:0;}#mermaid-mh9c14spg4p .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-mh9c14spg4p .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-mh9c14spg4p .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-mh9c14spg4p .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-mh9c14spg4p .marker.cross{stroke:lightgrey;}#mermaid-mh9c14spg4p svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-mh9c14spg4p p{margin:0;}#mermaid-mh9c14spg4p defs #statediagram-barbEnd{fill:lightgrey;stroke:lightgrey;}#mermaid-mh9c14spg4p g.stateGroup text{fill:#ccc;stroke:none;font-size:10px;}#mermaid-mh9c14spg4p g.stateGroup text{fill:#ccc;stroke:none;font-size:10px;}#mermaid-mh9c14spg4p g.stateGroup .state-title{font-weight:bolder;fill:#e0dfdf;}#mermaid-mh9c14spg4p g.stateGroup rect{fill:#1f2020;stroke:#ccc;}#mermaid-mh9c14spg4p g.stateGroup line{stroke:lightgrey;stroke-width:1;}#mermaid-mh9c14spg4p .transition{stroke:lightgrey;stroke-width:1;fill:none;}#mermaid-mh9c14spg4p .stateGroup .composit{fill:#333;border-bottom:1px;}#mermaid-mh9c14spg4p .stateGroup .alt-composit{fill:#e0e0e0;border-bottom:1px;}#mermaid-mh9c14spg4p .state-note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-mh9c14spg4p .state-note text{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;font-size:10px;}#mermaid-mh9c14spg4p .stateLabel .box{stroke:none;stroke-width:0;fill:#1f2020;opacity:0.5;}#mermaid-mh9c14spg4p .edgeLabel .label rect{fill:#1f2020;opacity:0.5;}#mermaid-mh9c14spg4p .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-mh9c14spg4p .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-mh9c14spg4p .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-mh9c14spg4p .edgeLabel .label text{fill:#ccc;}#mermaid-mh9c14spg4p .label div .edgeLabel{color:#ccc;}#mermaid-mh9c14spg4p .stateLabel text{fill:#e0dfdf;font-size:10px;font-weight:bold;}#mermaid-mh9c14spg4p .node circle.state-start{fill:#f4f4f4;stroke:#f4f4f4;}#mermaid-mh9c14spg4p .node .fork-join{fill:#f4f4f4;stroke:#f4f4f4;}#mermaid-mh9c14spg4p .node circle.state-end{fill:#cccccc;stroke:#333;stroke-width:1.5;}#mermaid-mh9c14spg4p .end-state-inner{fill:#333;stroke-width:1.5;}#mermaid-mh9c14spg4p .node rect{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-mh9c14spg4p .node polygon{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-mh9c14spg4p #statediagram-barbEnd{fill:lightgrey;}#mermaid-mh9c14spg4p .statediagram-cluster rect{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-mh9c14spg4p .cluster-label,#mermaid-mh9c14spg4p .nodeLabel{color:#e0dfdf;}#mermaid-mh9c14spg4p .statediagram-cluster rect.outer{rx:5px;ry:5px;}#mermaid-mh9c14spg4p .statediagram-state .divider{stroke:#ccc;}#mermaid-mh9c14spg4p .statediagram-state .title-state{rx:5px;ry:5px;}#mermaid-mh9c14spg4p .statediagram-cluster.statediagram-cluster .inner{fill:#333;}#mermaid-mh9c14spg4p .statediagram-cluster.statediagram-cluster-alt .inner{fill:#555;}#mermaid-mh9c14spg4p .statediagram-cluster .inner{rx:0;ry:0;}#mermaid-mh9c14spg4p .statediagram-state rect.basic{rx:5px;ry:5px;}#mermaid-mh9c14spg4p .statediagram-state rect.divider{stroke-dasharray:10,10;fill:#555;}#mermaid-mh9c14spg4p .note-edge{stroke-dasharray:5;}#mermaid-mh9c14spg4p .statediagram-note rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:hsl(180, 0%, 18.3529411765%);stroke-width:1px;rx:0;ry:0;}#mermaid-mh9c14spg4p .statediagram-note rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:hsl(180, 0%, 18.3529411765%);stroke-width:1px;rx:0;ry:0;}#mermaid-mh9c14spg4p .statediagram-note text{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#mermaid-mh9c14spg4p .statediagram-note .nodeLabel{color:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#mermaid-mh9c14spg4p .statediagram .edgeLabel{color:red;}#mermaid-mh9c14spg4p #dependencyStart,#mermaid-mh9c14spg4p #dependencyEnd{fill:lightgrey;stroke:lightgrey;stroke-width:1;}#mermaid-mh9c14spg4p .statediagramTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-mh9c14spg4p :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

"Initial State"

"forge script 04_DeployOracle"

"forge script 05_DeploySentinel"

"forge script 06_DeployHook"

"Subscribe Sentinel"

Undeployed

OracleDeployed

"MockOracle @ Sepolia Can emit PriceUpdate events"

SentinelDeployed

"Manual subscribe() call"

"AegisSentinel @ Reactive Not listening to events"

"Listening to L1 Oracle"

HookDeployed

"AegisHook @ Unichain Can receive setPanicMode calls"

FullyOperational

"Oracle emits events Sentinel processes Hook enforces rules"

Address saved to:broadcast/04_DeployOracle.s.sol/11155111/run-latest.json

Address saved to:broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json

Address saved to:broadcast/06_DeployHook.s.sol/1301/run-latest.json

Sources:[contracts/README.md#96-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L96-L122)

---

## SummaryLink copied!

The Aegis deployment process consists of three sequential Foundry script executions across three blockchain networks, followed by manual configuration of the Sentinel's event subscription. Each deployment step generates a broadcast log artifact for auditability and reference. The complete deployment workflow typically takes 5-10 minutes, excluding block confirmation times and network-specific gas price considerations.

For environment-specific deployment procedures and troubleshooting, consult the child pages under this section.

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)