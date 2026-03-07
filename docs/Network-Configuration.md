# Network ConfigurationLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml)

## Purpose and ScopeLink copied!

This document provides technical reference for the network configuration of the Aegis system. It covers RPC endpoint setup, chain IDs, and network-specific parameters required for deploying and interacting with Aegis contracts across three blockchain networks: Ethereum Sepolia (L1), Reactive Network Lasna (orchestration layer), and Unichain Sepolia (L2).

For the actual deployment scripts and execution procedures, see [Deployment Scripts](#5.1). For the deployed contract addresses resulting from these network configurations, see [Deployed Contract Addresses](#5.3).

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)[contracts/foundry.toml#1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L27)

---

## Network OverviewLink copied!

The Aegis system operates across three distinct blockchain networks, each serving a specific architectural role:

Network NameChain IDRoleContracts DeployedEthereum Sepolia11155111L1 Price Oracle & Identity Layer`MockOracle`, `GuardianRegistry`Reactive Network Lasna5318007Cross-Chain Event Orchestration`AegisSentinel`Unichain Sepolia1301L2 DEX Hook Enforcement`AegisHook`

Network Architecture Roles

#mermaid-8y9nzj1a4yp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-8y9nzj1a4yp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-8y9nzj1a4yp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-8y9nzj1a4yp .error-icon{fill:#a44141;}#mermaid-8y9nzj1a4yp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-8y9nzj1a4yp .edge-thickness-normal{stroke-width:1px;}#mermaid-8y9nzj1a4yp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-8y9nzj1a4yp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-8y9nzj1a4yp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-8y9nzj1a4yp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-8y9nzj1a4yp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-8y9nzj1a4yp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-8y9nzj1a4yp .marker.cross{stroke:lightgrey;}#mermaid-8y9nzj1a4yp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-8y9nzj1a4yp p{margin:0;}#mermaid-8y9nzj1a4yp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-8y9nzj1a4yp .cluster-label text{fill:#F9FFFE;}#mermaid-8y9nzj1a4yp .cluster-label span{color:#F9FFFE;}#mermaid-8y9nzj1a4yp .cluster-label span p{background-color:transparent;}#mermaid-8y9nzj1a4yp .label text,#mermaid-8y9nzj1a4yp span{fill:#ccc;color:#ccc;}#mermaid-8y9nzj1a4yp .node rect,#mermaid-8y9nzj1a4yp .node circle,#mermaid-8y9nzj1a4yp .node ellipse,#mermaid-8y9nzj1a4yp .node polygon,#mermaid-8y9nzj1a4yp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-8y9nzj1a4yp .rough-node .label text,#mermaid-8y9nzj1a4yp .node .label text,#mermaid-8y9nzj1a4yp .image-shape .label,#mermaid-8y9nzj1a4yp .icon-shape .label{text-anchor:middle;}#mermaid-8y9nzj1a4yp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-8y9nzj1a4yp .rough-node .label,#mermaid-8y9nzj1a4yp .node .label,#mermaid-8y9nzj1a4yp .image-shape .label,#mermaid-8y9nzj1a4yp .icon-shape .label{text-align:center;}#mermaid-8y9nzj1a4yp .node.clickable{cursor:pointer;}#mermaid-8y9nzj1a4yp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-8y9nzj1a4yp .arrowheadPath{fill:lightgrey;}#mermaid-8y9nzj1a4yp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-8y9nzj1a4yp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-8y9nzj1a4yp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8y9nzj1a4yp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-8y9nzj1a4yp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8y9nzj1a4yp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-8y9nzj1a4yp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-8y9nzj1a4yp .cluster text{fill:#F9FFFE;}#mermaid-8y9nzj1a4yp .cluster span{color:#F9FFFE;}#mermaid-8y9nzj1a4yp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-8y9nzj1a4yp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-8y9nzj1a4yp rect.text{fill:none;stroke-width:0;}#mermaid-8y9nzj1a4yp .icon-shape,#mermaid-8y9nzj1a4yp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8y9nzj1a4yp .icon-shape p,#mermaid-8y9nzj1a4yp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-8y9nzj1a4yp .icon-shape rect,#mermaid-8y9nzj1a4yp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8y9nzj1a4yp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-8y9nzj1a4yp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-8y9nzj1a4yp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

PriceUpdate events

NewFeedback events

setPanicMode() calls

updateReputation() calls

Unichain Sepolia (Chain ID: 1301)

L2 Enforcement Layer - Hook execution - Swap gating - Panic mode state

Reactive Network Lasna (Chain ID: 5318007)

Orchestration Layer - Event listener - Cross-chain coordinator - Autonomous executor

Ethereum Sepolia (Chain ID: 11155111)

L1 Layer - Price feed source - Reputation authority - Guardian NFT registry

Sources:[contracts/README.md#9-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L9-L26)[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)

---

## RPC Endpoint ConfigurationLink copied!

### Foundry Configuration FileLink copied!

All network RPC endpoints are centrally defined in the `[rpc_endpoints]` section of `foundry.toml`. This configuration enables Foundry's deployment scripts and CLI tools (`forge`, `cast`) to interact with each network using named aliases.

Configuration Structure

[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)

```
[rpc_endpoints]
unichain_sepolia = "https://unichain-sepolia-rpc.publicnode.com"
reactive = "https://lasna-rpc.rnk.dev/"
sepolia = "https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX"
```

### RPC Endpoint DetailsLink copied!

AliasNetworkURLProviderPurpose`sepolia`Ethereum Sepolia`https://eth-sepolia.g.alchemy.com/v2/...`AlchemyOracle and Registry deployment`reactive`Reactive Lasna`https://lasna-rpc.rnk.dev/`Reactive NetworkSentinel deployment`unichain_sepolia`Unichain Sepolia`https://unichain-sepolia-rpc.publicnode.com`PublicNodeHook deployment

Configuration-to-Deployment Mapping

#mermaid-cbp3ektmh0j{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-cbp3ektmh0j .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-cbp3ektmh0j .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-cbp3ektmh0j .error-icon{fill:#a44141;}#mermaid-cbp3ektmh0j .error-text{fill:#ddd;stroke:#ddd;}#mermaid-cbp3ektmh0j .edge-thickness-normal{stroke-width:1px;}#mermaid-cbp3ektmh0j .edge-thickness-thick{stroke-width:3.5px;}#mermaid-cbp3ektmh0j .edge-pattern-solid{stroke-dasharray:0;}#mermaid-cbp3ektmh0j .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-cbp3ektmh0j .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-cbp3ektmh0j .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-cbp3ektmh0j .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-cbp3ektmh0j .marker.cross{stroke:lightgrey;}#mermaid-cbp3ektmh0j svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-cbp3ektmh0j p{margin:0;}#mermaid-cbp3ektmh0j .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-cbp3ektmh0j .cluster-label text{fill:#F9FFFE;}#mermaid-cbp3ektmh0j .cluster-label span{color:#F9FFFE;}#mermaid-cbp3ektmh0j .cluster-label span p{background-color:transparent;}#mermaid-cbp3ektmh0j .label text,#mermaid-cbp3ektmh0j span{fill:#ccc;color:#ccc;}#mermaid-cbp3ektmh0j .node rect,#mermaid-cbp3ektmh0j .node circle,#mermaid-cbp3ektmh0j .node ellipse,#mermaid-cbp3ektmh0j .node polygon,#mermaid-cbp3ektmh0j .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-cbp3ektmh0j .rough-node .label text,#mermaid-cbp3ektmh0j .node .label text,#mermaid-cbp3ektmh0j .image-shape .label,#mermaid-cbp3ektmh0j .icon-shape .label{text-anchor:middle;}#mermaid-cbp3ektmh0j .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-cbp3ektmh0j .rough-node .label,#mermaid-cbp3ektmh0j .node .label,#mermaid-cbp3ektmh0j .image-shape .label,#mermaid-cbp3ektmh0j .icon-shape .label{text-align:center;}#mermaid-cbp3ektmh0j .node.clickable{cursor:pointer;}#mermaid-cbp3ektmh0j .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-cbp3ektmh0j .arrowheadPath{fill:lightgrey;}#mermaid-cbp3ektmh0j .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-cbp3ektmh0j .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-cbp3ektmh0j .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cbp3ektmh0j .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-cbp3ektmh0j .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cbp3ektmh0j .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-cbp3ektmh0j .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-cbp3ektmh0j .cluster text{fill:#F9FFFE;}#mermaid-cbp3ektmh0j .cluster span{color:#F9FFFE;}#mermaid-cbp3ektmh0j div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-cbp3ektmh0j .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-cbp3ektmh0j rect.text{fill:none;stroke-width:0;}#mermaid-cbp3ektmh0j .icon-shape,#mermaid-cbp3ektmh0j .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cbp3ektmh0j .icon-shape p,#mermaid-cbp3ektmh0j .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-cbp3ektmh0j .icon-shape rect,#mermaid-cbp3ektmh0j .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cbp3ektmh0j .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-cbp3ektmh0j .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-cbp3ektmh0j :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Target Networks

Deployment Scripts

foundry.toml Configuration

sepolia (RPC alias)

reactive (RPC alias)

unichain_sepolia (RPC alias)

04_DeployOracle.s.sol --rpc-url sepolia

05_DeploySentinel.s.sol --rpc-url reactive

06_DeployHook.s.sol --rpc-url unichain_sepolia

Ethereum Sepolia Chain ID: 11155111

Reactive Lasna Chain ID: 5318007

Unichain Sepolia Chain ID: 1301

Sources:[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)[contracts/README.md#105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L105-L122)

---

## Network-Specific ConsiderationsLink copied!

### Ethereum Sepolia (L1)Link copied!

Chain ID: 11155111RPC Alias:`sepolia`Transaction Type: EIP-1559 (Type 2)

Configuration Characteristics:

- Standard Ethereum testnet with EIP-1559 gas mechanics
- Requires testnet ETH for deployment transactions
- Supports standard Foundry deployment flags (`--broadcast`, `--verify`)

Deployed Contracts:

- `MockOracle` at `0x1392C38921A818cEdb100cC3767e8f30deC3a7D8`
- Event emission: `PriceUpdate(uint256 price, uint256 timestamp)`

Sources:[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)[contracts/README.md#107-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L107-L110)

---

### Reactive Network Lasna (Orchestration Layer)Link copied!

Chain ID: 5318007RPC Alias:`reactive`Transaction Type: Legacy (Type 0)

Configuration Characteristics:

- Requires `--legacy` flag for all deployments due to network transaction format requirements
- Uses autonomous contract execution model
- Requires manual subscription call post-deployment for event listening activation

Deployed Contracts:

- `AegisSentinel` at `0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6`

Special Deployment Procedure:

[contracts/README.md#112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L112-L116)

```
forge script script/05_DeploySentinel.s.sol \
    --rpc-url reactive \
    --broadcast \
    --legacy
```

Note: The `--legacy` flag is mandatory because Reactive Network does not support EIP-1559 transaction types. Omitting this flag will cause deployment failures.

Post-Deployment Requirement:
After deploying `AegisSentinel`, a manual subscription transaction must be sent to activate event listening. This is a network-specific requirement of the Reactive protocol.

Sources:[contracts/README.md#112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L112-L116)[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)

---

### Unichain Sepolia (L2)Link copied!

Chain ID: 1301RPC Alias:`unichain_sepolia`Transaction Type: Optimistic Rollup (EIP-1559 compatible)

Configuration Characteristics:

- Uniswap V4-compatible testnet with optimistic rollup architecture
- Requires CREATE2 salt mining for hook address validation (must start with `0x80`)
- Supports Flashblocks (sub-second block times)

Deployed Contracts:

- `AegisHook` at `0x1E2aE114cF3B63779A1367eD704ccA51a0218080`

Address Validation Requirement:

Uniswap V4 hooks must have addresses with specific permission flags encoded in the leading bytes. The `AegisHook` deployment uses CREATE2 with salt mining to achieve an address starting with `0x1E`, which encodes the `BEFORE_SWAP_FLAG` permission bit.

Deployment with Salt Mining:

[contracts/README.md#118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L118-L122)

```
forge script script/06_DeployHook.s.sol \
    --rpc-url unichain_sepolia \
    --broadcast
```

The deployment script automatically performs salt mining to find a valid CREATE2 salt that produces a compliant hook address.

Sources:[contracts/README.md#99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L104)[contracts/README.md#118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L118-L122)

---

## Compiler and EVM ConfigurationLink copied!

The Foundry configuration specifies network-agnostic compilation settings that work across all three target networks:

[contracts/foundry.toml#1-8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L8)

SettingValuePurpose`solc_version``0.8.26`Solidity compiler version`evm_version``cancun`Target EVM version (latest features)`bytecode_hash``none`Disables metadata hash for deterministic builds`via_ir``true`Enables IR-based compilation for optimization

EVM Version Compatibility:

The `cancun` EVM version (specified in [contracts/foundry.toml#3](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L3-L3)) is compatible with all three target networks as of their current testnet configurations:

- Ethereum Sepolia: Native Cancun support
- Reactive Lasna: EVM-compatible with Cancun opcodes
- Unichain Sepolia: Optimistic rollup with Cancun equivalence

Sources:[contracts/foundry.toml#1-8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L1-L8)

---

## Usage in Forge CommandsLink copied!

### Deployment ExampleLink copied!

```
# Deploy to Ethereum Sepolia
forge script script/04_DeployOracle.s.sol \
    --rpc-url sepolia \
    --broadcast \
    --verify
 
# Deploy to Reactive Network (note --legacy flag)
forge script script/05_DeploySentinel.s.sol \
    --rpc-url reactive \
    --broadcast \
    --legacy
 
# Deploy to Unichain Sepolia
forge script script/06_DeployHook.s.sol \
    --rpc-url unichain_sepolia \
    --broadcast
```

### Contract Interaction ExampleLink copied!

```
# Query Oracle price on Sepolia
cast call 0x1392C38921A818cEdb100cC3767e8f30deC3a7D8 \
    "getLatestPrice()(uint256)" \
    --rpc-url sepolia
 
# Check panic mode status on Unichain
cast call 0x1E2aE114cF3B63779A1367eD704ccA51a0218080 \
    "panicMode()(bool)" \
    --rpc-url unichain_sepolia
```

RPC Alias Resolution Flow

#mermaid-aqwwj1qz7c{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-aqwwj1qz7c .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-aqwwj1qz7c .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-aqwwj1qz7c .error-icon{fill:#a44141;}#mermaid-aqwwj1qz7c .error-text{fill:#ddd;stroke:#ddd;}#mermaid-aqwwj1qz7c .edge-thickness-normal{stroke-width:1px;}#mermaid-aqwwj1qz7c .edge-thickness-thick{stroke-width:3.5px;}#mermaid-aqwwj1qz7c .edge-pattern-solid{stroke-dasharray:0;}#mermaid-aqwwj1qz7c .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-aqwwj1qz7c .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-aqwwj1qz7c .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-aqwwj1qz7c .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-aqwwj1qz7c .marker.cross{stroke:lightgrey;}#mermaid-aqwwj1qz7c svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-aqwwj1qz7c p{margin:0;}#mermaid-aqwwj1qz7c .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-aqwwj1qz7c .cluster-label text{fill:#F9FFFE;}#mermaid-aqwwj1qz7c .cluster-label span{color:#F9FFFE;}#mermaid-aqwwj1qz7c .cluster-label span p{background-color:transparent;}#mermaid-aqwwj1qz7c .label text,#mermaid-aqwwj1qz7c span{fill:#ccc;color:#ccc;}#mermaid-aqwwj1qz7c .node rect,#mermaid-aqwwj1qz7c .node circle,#mermaid-aqwwj1qz7c .node ellipse,#mermaid-aqwwj1qz7c .node polygon,#mermaid-aqwwj1qz7c .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-aqwwj1qz7c .rough-node .label text,#mermaid-aqwwj1qz7c .node .label text,#mermaid-aqwwj1qz7c .image-shape .label,#mermaid-aqwwj1qz7c .icon-shape .label{text-anchor:middle;}#mermaid-aqwwj1qz7c .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-aqwwj1qz7c .rough-node .label,#mermaid-aqwwj1qz7c .node .label,#mermaid-aqwwj1qz7c .image-shape .label,#mermaid-aqwwj1qz7c .icon-shape .label{text-align:center;}#mermaid-aqwwj1qz7c .node.clickable{cursor:pointer;}#mermaid-aqwwj1qz7c .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-aqwwj1qz7c .arrowheadPath{fill:lightgrey;}#mermaid-aqwwj1qz7c .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-aqwwj1qz7c .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-aqwwj1qz7c .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-aqwwj1qz7c .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-aqwwj1qz7c .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-aqwwj1qz7c .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-aqwwj1qz7c .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-aqwwj1qz7c .cluster text{fill:#F9FFFE;}#mermaid-aqwwj1qz7c .cluster span{color:#F9FFFE;}#mermaid-aqwwj1qz7c div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-aqwwj1qz7c .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-aqwwj1qz7c rect.text{fill:none;stroke-width:0;}#mermaid-aqwwj1qz7c .icon-shape,#mermaid-aqwwj1qz7c .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-aqwwj1qz7c .icon-shape p,#mermaid-aqwwj1qz7c .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-aqwwj1qz7c .icon-shape rect,#mermaid-aqwwj1qz7c .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-aqwwj1qz7c .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-aqwwj1qz7c .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-aqwwj1qz7c :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

forge script ... --rpc-url sepolia

foundry.toml [rpc_endpoints]

Alias: 'sepolia'

URL: https://eth-sepolia.g.alchemy.com/...

HTTP JSON-RPC Request

Sources:[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)[contracts/README.md#105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L105-L122)

---

## Dependency RemappingsLink copied!

The network configuration works in conjunction with library remappings defined in [contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14):

```
remappings = [
    "reactive-lib/=lib/system-smart-contracts/lib/reactive-lib/src/",
    "system-smart-contracts/=lib/system-smart-contracts/src/",
    "v4-core/=lib/uniswap-hooks/lib/v4-core/",
    "v4-periphery/=lib/uniswap-hooks/lib/v4-periphery/"
]
```

These remappings ensure that:

- `AegisSentinel` can import Reactive Network SDK components
- `AegisHook` can implement Uniswap V4 interfaces
- All contracts compile successfully regardless of target network

Sources:[contracts/foundry.toml#9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L9-L14)

---

## Network Configuration Summary TableLink copied!

Configuration ParameterSepoliaReactive LasnaUnichain SepoliaChain ID1115511153180071301RPC Alias`sepolia``reactive``unichain_sepolia`RPC ProviderAlchemyReactive NetworkPublicNodeTransaction TypeEIP-1559Legacy (`--legacy`)EIP-1559Special RequirementsNoneManual subscription post-deployCREATE2 salt miningBlock Time~12 secondsVariable<1 second (Flashblocks)Gas TokenSepolia ETHReactive REACTUnichain Sepolia ETHExploreretherscan.io/sepoliaN/A (custom indexer)uniscan.xyz

Sources:[contracts/README.md#9-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L9-L26)[contracts/README.md#99-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L99-L122)[contracts/foundry.toml#19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml#L19-L22)