# AegisHookLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)
- [contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-1769587735298.json)
- [contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json)

## Purpose and ScopeLink copied!

This document describes the AegisHook smart contract, the Uniswap V4 Hook implementation deployed on Unichain Sepolia (Chain ID: 1301) that serves as the L2 circuit breaker enforcement layer for the Aegis system. AegisHook implements the `beforeSwap` hook to block liquidity pool swaps during volatile market conditions while maintaining a VIP lane for high-reputation Guardians.

For information about the cross-chain orchestration that triggers panic mode, see [AegisSentinel](#3.2). For details on the Guardian reputation system, see [Guardian Registry](#3.4). For the overall system architecture, see [System Architecture](#2).

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)[contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#L1-L58)

---

## OverviewLink copied!

AegisHook is a Uniswap V4 Hook contract that attaches to specific liquidity pools on Unichain to provide protection against Loss-versus-Rebalancing (LVR) exploitation during market volatility. The contract operates in two states:

- Normal Mode: All swaps execute without restriction
- Panic Mode: Only high-reputation Guardians (reputation > 90) can execute swaps

The contract is controlled by the AegisSentinel reactive contract via cross-chain calls from the Reactive Network, creating an autonomous circuit breaker system that requires no off-chain infrastructure.

#mermaid-20z7vmvgr3u{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-20z7vmvgr3u .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-20z7vmvgr3u .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-20z7vmvgr3u .error-icon{fill:#a44141;}#mermaid-20z7vmvgr3u .error-text{fill:#ddd;stroke:#ddd;}#mermaid-20z7vmvgr3u .edge-thickness-normal{stroke-width:1px;}#mermaid-20z7vmvgr3u .edge-thickness-thick{stroke-width:3.5px;}#mermaid-20z7vmvgr3u .edge-pattern-solid{stroke-dasharray:0;}#mermaid-20z7vmvgr3u .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-20z7vmvgr3u .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-20z7vmvgr3u .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-20z7vmvgr3u .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-20z7vmvgr3u .marker.cross{stroke:lightgrey;}#mermaid-20z7vmvgr3u svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-20z7vmvgr3u p{margin:0;}#mermaid-20z7vmvgr3u .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-20z7vmvgr3u .cluster-label text{fill:#F9FFFE;}#mermaid-20z7vmvgr3u .cluster-label span{color:#F9FFFE;}#mermaid-20z7vmvgr3u .cluster-label span p{background-color:transparent;}#mermaid-20z7vmvgr3u .label text,#mermaid-20z7vmvgr3u span{fill:#ccc;color:#ccc;}#mermaid-20z7vmvgr3u .node rect,#mermaid-20z7vmvgr3u .node circle,#mermaid-20z7vmvgr3u .node ellipse,#mermaid-20z7vmvgr3u .node polygon,#mermaid-20z7vmvgr3u .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-20z7vmvgr3u .rough-node .label text,#mermaid-20z7vmvgr3u .node .label text,#mermaid-20z7vmvgr3u .image-shape .label,#mermaid-20z7vmvgr3u .icon-shape .label{text-anchor:middle;}#mermaid-20z7vmvgr3u .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-20z7vmvgr3u .rough-node .label,#mermaid-20z7vmvgr3u .node .label,#mermaid-20z7vmvgr3u .image-shape .label,#mermaid-20z7vmvgr3u .icon-shape .label{text-align:center;}#mermaid-20z7vmvgr3u .node.clickable{cursor:pointer;}#mermaid-20z7vmvgr3u .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-20z7vmvgr3u .arrowheadPath{fill:lightgrey;}#mermaid-20z7vmvgr3u .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-20z7vmvgr3u .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-20z7vmvgr3u .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-20z7vmvgr3u .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-20z7vmvgr3u .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-20z7vmvgr3u .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-20z7vmvgr3u .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-20z7vmvgr3u .cluster text{fill:#F9FFFE;}#mermaid-20z7vmvgr3u .cluster span{color:#F9FFFE;}#mermaid-20z7vmvgr3u div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-20z7vmvgr3u .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-20z7vmvgr3u rect.text{fill:none;stroke-width:0;}#mermaid-20z7vmvgr3u .icon-shape,#mermaid-20z7vmvgr3u .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-20z7vmvgr3u .icon-shape p,#mermaid-20z7vmvgr3u .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-20z7vmvgr3u .icon-shape rect,#mermaid-20z7vmvgr3u .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-20z7vmvgr3u .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-20z7vmvgr3u .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-20z7vmvgr3u :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Ethereum Sepolia (11155111)

Reactive Network (5318007)

Unichain Sepolia (1301)

setPanicMode(bool)

updateReputation(address,uint256)

beforeSwap hook

route swaps

record interventions

swap attempt

VIP swap 0.01% fee

AegisHook 0x1E2a...8080

PoolManager 0x00B0...62AC

Uniswap V4 Pools Protected Liquidity

AegisSentinel Cross-chain Trigger

GuardianRegistry Reputation Store

Trader

Guardian (rep > 90)

Sources:[contracts/README.md#28-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L28-L58)[contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#6-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#L6-L11)

---

## Deployment DetailsLink copied!

### CREATE2 DeploymentLink copied!

AegisHook is deployed using CREATE2 via the deterministic deployment proxy at `0x4e59b44847b379578588920ca78fbf26c0b4956c`. The deployment process involves salt mining to ensure the resulting contract address has the correct Uniswap V4 permission flags.

Deployment PropertyValueContract Address`0x1E2aE114cF3B63779A1367eD704ccA51a0218080`Deployment MethodCREATE2Deployer Proxy`0x4e59b44847b379578588920ca78fbf26c0b4956c`NetworkUnichain Sepolia (Chain ID: 1301)Transaction Hash`0x4338a281807b19336634792bad1af299785c3bfbec67c38110ba4256c71ffd1f`Block Number`0x2a5fa37` (44,531,255)Gas Used`0x243bd7` (2,375,639)Deployment Timestamp1771284355203

Sources:[contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#1-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#L1-L58)

### Constructor ParametersLink copied!

The AegisHook constructor accepts two parameters:

#mermaid-hcwrc4oojxo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-hcwrc4oojxo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-hcwrc4oojxo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-hcwrc4oojxo .error-icon{fill:#a44141;}#mermaid-hcwrc4oojxo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-hcwrc4oojxo .edge-thickness-normal{stroke-width:1px;}#mermaid-hcwrc4oojxo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-hcwrc4oojxo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-hcwrc4oojxo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-hcwrc4oojxo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-hcwrc4oojxo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-hcwrc4oojxo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-hcwrc4oojxo .marker.cross{stroke:lightgrey;}#mermaid-hcwrc4oojxo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-hcwrc4oojxo p{margin:0;}#mermaid-hcwrc4oojxo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-hcwrc4oojxo .cluster-label text{fill:#F9FFFE;}#mermaid-hcwrc4oojxo .cluster-label span{color:#F9FFFE;}#mermaid-hcwrc4oojxo .cluster-label span p{background-color:transparent;}#mermaid-hcwrc4oojxo .label text,#mermaid-hcwrc4oojxo span{fill:#ccc;color:#ccc;}#mermaid-hcwrc4oojxo .node rect,#mermaid-hcwrc4oojxo .node circle,#mermaid-hcwrc4oojxo .node ellipse,#mermaid-hcwrc4oojxo .node polygon,#mermaid-hcwrc4oojxo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-hcwrc4oojxo .rough-node .label text,#mermaid-hcwrc4oojxo .node .label text,#mermaid-hcwrc4oojxo .image-shape .label,#mermaid-hcwrc4oojxo .icon-shape .label{text-anchor:middle;}#mermaid-hcwrc4oojxo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-hcwrc4oojxo .rough-node .label,#mermaid-hcwrc4oojxo .node .label,#mermaid-hcwrc4oojxo .image-shape .label,#mermaid-hcwrc4oojxo .icon-shape .label{text-align:center;}#mermaid-hcwrc4oojxo .node.clickable{cursor:pointer;}#mermaid-hcwrc4oojxo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-hcwrc4oojxo .arrowheadPath{fill:lightgrey;}#mermaid-hcwrc4oojxo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-hcwrc4oojxo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-hcwrc4oojxo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-hcwrc4oojxo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-hcwrc4oojxo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-hcwrc4oojxo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-hcwrc4oojxo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-hcwrc4oojxo .cluster text{fill:#F9FFFE;}#mermaid-hcwrc4oojxo .cluster span{color:#F9FFFE;}#mermaid-hcwrc4oojxo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-hcwrc4oojxo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-hcwrc4oojxo rect.text{fill:none;stroke-width:0;}#mermaid-hcwrc4oojxo .icon-shape,#mermaid-hcwrc4oojxo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-hcwrc4oojxo .icon-shape p,#mermaid-hcwrc4oojxo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-hcwrc4oojxo .icon-shape rect,#mermaid-hcwrc4oojxo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-hcwrc4oojxo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-hcwrc4oojxo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-hcwrc4oojxo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

constructor args

param 1

param 2

CREATE2 Factory

AegisHook

poolManager 0x00B036B58a818B1BC34d502D3fE730Db729e62AC

owner 0xd2df53D9791e98Db221842Dd085F4144014BBE2a

ParameterTypeValuePurpose`poolManager``address``0x00B036B58a818B1BC34d502D3fE730Db729e62AC`Uniswap V4 PoolManager contract address`owner``address``0xd2df53D9791e98Db221842Dd085F4144014BBE2a`Initial owner with administrative privileges

Sources:[contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#9-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#L9-L11)

### Address Flag RequirementsLink copied!

The deployed address `0x1E2aE114cF3B63779A1367eD704ccA51a0218080` ends with `...8080`, indicating the contract has the `BEFORE_SWAP` permission flag set. Uniswap V4 hooks use specific address prefixes to declare which hook functions they implement:

- The address must have the bit pattern `0x80...` to indicate `beforeSwap` hook implementation
- This is achieved through salt mining during CREATE2 deployment
- See [Deployment Scripts](#5.1) for the salt mining process

Sources:[contracts/README.md#119-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L119-L122)

---

## Core FunctionalityLink copied!

### beforeSwap Hook LogicLink copied!

The `beforeSwap` function is the primary entry point called by the Uniswap V4 PoolManager before each swap execution. This function implements the circuit breaker logic:

#mermaid-6msqwuh9vjg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-6msqwuh9vjg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-6msqwuh9vjg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-6msqwuh9vjg .error-icon{fill:#a44141;}#mermaid-6msqwuh9vjg .error-text{fill:#ddd;stroke:#ddd;}#mermaid-6msqwuh9vjg .edge-thickness-normal{stroke-width:1px;}#mermaid-6msqwuh9vjg .edge-thickness-thick{stroke-width:3.5px;}#mermaid-6msqwuh9vjg .edge-pattern-solid{stroke-dasharray:0;}#mermaid-6msqwuh9vjg .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-6msqwuh9vjg .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-6msqwuh9vjg .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-6msqwuh9vjg .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-6msqwuh9vjg .marker.cross{stroke:lightgrey;}#mermaid-6msqwuh9vjg svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-6msqwuh9vjg p{margin:0;}#mermaid-6msqwuh9vjg defs #statediagram-barbEnd{fill:lightgrey;stroke:lightgrey;}#mermaid-6msqwuh9vjg g.stateGroup text{fill:#ccc;stroke:none;font-size:10px;}#mermaid-6msqwuh9vjg g.stateGroup text{fill:#ccc;stroke:none;font-size:10px;}#mermaid-6msqwuh9vjg g.stateGroup .state-title{font-weight:bolder;fill:#e0dfdf;}#mermaid-6msqwuh9vjg g.stateGroup rect{fill:#1f2020;stroke:#ccc;}#mermaid-6msqwuh9vjg g.stateGroup line{stroke:lightgrey;stroke-width:1;}#mermaid-6msqwuh9vjg .transition{stroke:lightgrey;stroke-width:1;fill:none;}#mermaid-6msqwuh9vjg .stateGroup .composit{fill:#333;border-bottom:1px;}#mermaid-6msqwuh9vjg .stateGroup .alt-composit{fill:#e0e0e0;border-bottom:1px;}#mermaid-6msqwuh9vjg .state-note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-6msqwuh9vjg .state-note text{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;font-size:10px;}#mermaid-6msqwuh9vjg .stateLabel .box{stroke:none;stroke-width:0;fill:#1f2020;opacity:0.5;}#mermaid-6msqwuh9vjg .edgeLabel .label rect{fill:#1f2020;opacity:0.5;}#mermaid-6msqwuh9vjg .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-6msqwuh9vjg .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-6msqwuh9vjg .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-6msqwuh9vjg .edgeLabel .label text{fill:#ccc;}#mermaid-6msqwuh9vjg .label div .edgeLabel{color:#ccc;}#mermaid-6msqwuh9vjg .stateLabel text{fill:#e0dfdf;font-size:10px;font-weight:bold;}#mermaid-6msqwuh9vjg .node circle.state-start{fill:#f4f4f4;stroke:#f4f4f4;}#mermaid-6msqwuh9vjg .node .fork-join{fill:#f4f4f4;stroke:#f4f4f4;}#mermaid-6msqwuh9vjg .node circle.state-end{fill:#cccccc;stroke:#333;stroke-width:1.5;}#mermaid-6msqwuh9vjg .end-state-inner{fill:#333;stroke-width:1.5;}#mermaid-6msqwuh9vjg .node rect{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-6msqwuh9vjg .node polygon{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-6msqwuh9vjg #statediagram-barbEnd{fill:lightgrey;}#mermaid-6msqwuh9vjg .statediagram-cluster rect{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-6msqwuh9vjg .cluster-label,#mermaid-6msqwuh9vjg .nodeLabel{color:#e0dfdf;}#mermaid-6msqwuh9vjg .statediagram-cluster rect.outer{rx:5px;ry:5px;}#mermaid-6msqwuh9vjg .statediagram-state .divider{stroke:#ccc;}#mermaid-6msqwuh9vjg .statediagram-state .title-state{rx:5px;ry:5px;}#mermaid-6msqwuh9vjg .statediagram-cluster.statediagram-cluster .inner{fill:#333;}#mermaid-6msqwuh9vjg .statediagram-cluster.statediagram-cluster-alt .inner{fill:#555;}#mermaid-6msqwuh9vjg .statediagram-cluster .inner{rx:0;ry:0;}#mermaid-6msqwuh9vjg .statediagram-state rect.basic{rx:5px;ry:5px;}#mermaid-6msqwuh9vjg .statediagram-state rect.divider{stroke-dasharray:10,10;fill:#555;}#mermaid-6msqwuh9vjg .note-edge{stroke-dasharray:5;}#mermaid-6msqwuh9vjg .statediagram-note rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:hsl(180, 0%, 18.3529411765%);stroke-width:1px;rx:0;ry:0;}#mermaid-6msqwuh9vjg .statediagram-note rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:hsl(180, 0%, 18.3529411765%);stroke-width:1px;rx:0;ry:0;}#mermaid-6msqwuh9vjg .statediagram-note text{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#mermaid-6msqwuh9vjg .statediagram-note .nodeLabel{color:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#mermaid-6msqwuh9vjg .statediagram .edgeLabel{color:red;}#mermaid-6msqwuh9vjg #dependencyStart,#mermaid-6msqwuh9vjg #dependencyEnd{fill:lightgrey;stroke:lightgrey;stroke-width:1;}#mermaid-6msqwuh9vjg .statediagramTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-6msqwuh9vjg :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

"Swap Initiated"

"Read panicMode state"

"panicMode == false"

"panicMode == true"

"reputation <= 90"

"reputation > 90"

"Return success Standard fees"

"Apply 0.01% fee"

"Return success Log intervention"

"REVERT PoolPaused()"

beforeSwap

CheckPanicMode

AllowSwap

CheckReputation

BlockSwap

VIPSwap

RecordIntervention

Sources:[contracts/README.md#33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L37)

### Panic Mode State ManagementLink copied!

The contract maintains a boolean `panicMode` state variable that controls swap permissions:

FunctionAccessPurpose`setPanicMode(bool)`Sentinel onlyActivates/deactivates circuit breaker via cross-chain call`panicMode` (storage slot)Public readCurrent circuit breaker state

When panic mode is activated:

1. Regular traders' swap attempts are immediately reverted with a `PoolPaused()` error
2. Only addresses with Guardian NFTs and reputation > 90 can execute swaps
3. Guardian swaps are charged a 0.01% fee and recorded as interventions

Sources:[contracts/README.md#33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L37)

### VIP Lane ImplementationLink copied!

The VIP lane allows high-reputation Guardians to provide liquidity and stabilize pools during volatile conditions:

"GuardianRegistry (L1)""PoolManager""AegisHook""Guardian (rep > 90)""Trader""GuardianRegistry (L1)""PoolManager""AegisHook""Guardian (rep > 90)""Trader"#mermaid-x3rlp175ak{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-x3rlp175ak .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-x3rlp175ak .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-x3rlp175ak .error-icon{fill:#a44141;}#mermaid-x3rlp175ak .error-text{fill:#ddd;stroke:#ddd;}#mermaid-x3rlp175ak .edge-thickness-normal{stroke-width:1px;}#mermaid-x3rlp175ak .edge-thickness-thick{stroke-width:3.5px;}#mermaid-x3rlp175ak .edge-pattern-solid{stroke-dasharray:0;}#mermaid-x3rlp175ak .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-x3rlp175ak .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-x3rlp175ak .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-x3rlp175ak .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-x3rlp175ak .marker.cross{stroke:lightgrey;}#mermaid-x3rlp175ak svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-x3rlp175ak p{margin:0;}#mermaid-x3rlp175ak .actor{stroke:#ccc;fill:#1f2020;}#mermaid-x3rlp175ak text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-x3rlp175ak .actor-line{stroke:#ccc;}#mermaid-x3rlp175ak .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-x3rlp175ak .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-x3rlp175ak .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-x3rlp175ak #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-x3rlp175ak .sequenceNumber{fill:black;}#mermaid-x3rlp175ak #sequencenumber{fill:lightgrey;}#mermaid-x3rlp175ak #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-x3rlp175ak .messageText{fill:lightgrey;stroke:none;}#mermaid-x3rlp175ak .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-x3rlp175ak .labelText,#mermaid-x3rlp175ak .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-x3rlp175ak .loopText,#mermaid-x3rlp175ak .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-x3rlp175ak .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-x3rlp175ak .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-x3rlp175ak .noteText,#mermaid-x3rlp175ak .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-x3rlp175ak .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-x3rlp175ak .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-x3rlp175ak .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-x3rlp175ak .actorPopupMenu{position:absolute;}#mermaid-x3rlp175ak .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-x3rlp175ak .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-x3rlp175ak .actor-man circle,#mermaid-x3rlp175ak line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-x3rlp175ak :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}panicMode = true"swap()""beforeSwap()""Check reputation""REVERT PoolPaused()""Transaction fails""swap()""beforeSwap()""reputation > 90 ✓""Apply 0.01% fee""Allow swap""Execute swap""Success""Record intervention (async)"

Sources:[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)

### Reputation ManagementLink copied!

AegisHook integrates with the Guardian Registry on L1 to maintain reputation scores:

Storage VariableTypePurpose`guardianReputation``mapping(address => uint256)`Cached reputation scores for gas efficiency

The contract receives reputation updates from AegisSentinel via cross-chain calls when:

- New feedback is recorded in the Guardian Registry on L1
- The Sentinel syncs reputation deltas to L2

Sources:[contracts/README.md#52-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L58)

---

## Contract State and StorageLink copied!

### State VariablesLink copied!

#mermaid-d0tvdinj8s{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-d0tvdinj8s .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-d0tvdinj8s .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-d0tvdinj8s .error-icon{fill:#a44141;}#mermaid-d0tvdinj8s .error-text{fill:#ddd;stroke:#ddd;}#mermaid-d0tvdinj8s .edge-thickness-normal{stroke-width:1px;}#mermaid-d0tvdinj8s .edge-thickness-thick{stroke-width:3.5px;}#mermaid-d0tvdinj8s .edge-pattern-solid{stroke-dasharray:0;}#mermaid-d0tvdinj8s .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-d0tvdinj8s .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-d0tvdinj8s .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-d0tvdinj8s .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-d0tvdinj8s .marker.cross{stroke:lightgrey;}#mermaid-d0tvdinj8s svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-d0tvdinj8s p{margin:0;}#mermaid-d0tvdinj8s g.classGroup text{fill:#ccc;stroke:none;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:10px;}#mermaid-d0tvdinj8s g.classGroup text .title{font-weight:bolder;}#mermaid-d0tvdinj8s .nodeLabel,#mermaid-d0tvdinj8s .edgeLabel{color:#e0dfdf;}#mermaid-d0tvdinj8s .edgeLabel .label rect{fill:#1f2020;}#mermaid-d0tvdinj8s .label text{fill:#e0dfdf;}#mermaid-d0tvdinj8s .labelBkg{background:#1f2020;}#mermaid-d0tvdinj8s .edgeLabel .label span{background:#1f2020;}#mermaid-d0tvdinj8s .classTitle{font-weight:bolder;}#mermaid-d0tvdinj8s .node rect,#mermaid-d0tvdinj8s .node circle,#mermaid-d0tvdinj8s .node ellipse,#mermaid-d0tvdinj8s .node polygon,#mermaid-d0tvdinj8s .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-d0tvdinj8s .divider{stroke:#ccc;stroke-width:1;}#mermaid-d0tvdinj8s g.clickable{cursor:pointer;}#mermaid-d0tvdinj8s g.classGroup rect{fill:#1f2020;stroke:#ccc;}#mermaid-d0tvdinj8s g.classGroup line{stroke:#ccc;stroke-width:1;}#mermaid-d0tvdinj8s .classLabel .box{stroke:none;stroke-width:0;fill:#1f2020;opacity:0.5;}#mermaid-d0tvdinj8s .classLabel .label{fill:#ccc;font-size:10px;}#mermaid-d0tvdinj8s .relation{stroke:lightgrey;stroke-width:1;fill:none;}#mermaid-d0tvdinj8s .dashed-line{stroke-dasharray:3;}#mermaid-d0tvdinj8s .dotted-line{stroke-dasharray:1 2;}#mermaid-d0tvdinj8s #compositionStart,#mermaid-d0tvdinj8s .composition{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #compositionEnd,#mermaid-d0tvdinj8s .composition{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #dependencyStart,#mermaid-d0tvdinj8s .dependency{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #dependencyStart,#mermaid-d0tvdinj8s .dependency{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #extensionStart,#mermaid-d0tvdinj8s .extension{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #extensionEnd,#mermaid-d0tvdinj8s .extension{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #aggregationStart,#mermaid-d0tvdinj8s .aggregation{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #aggregationEnd,#mermaid-d0tvdinj8s .aggregation{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #lollipopStart,#mermaid-d0tvdinj8s .lollipop{fill:#1f2020!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s #lollipopEnd,#mermaid-d0tvdinj8s .lollipop{fill:#1f2020!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-d0tvdinj8s .edgeTerminals{font-size:11px;line-height:initial;}#mermaid-d0tvdinj8s .classTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-d0tvdinj8s .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-d0tvdinj8s .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-d0tvdinj8s :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

AegisHook

+address poolManager

+address owner

+bool panicMode

+mapping guardianReputation

+uint256 REPUTATION_THRESHOLD

+uint256 VIP_FEE_BPS

+address SENTINEL_ADDRESS

StorageLayout

slot_2: "guardianReputation mapping root"

slot_0: "owner(address, 20 bytes) : "

slot_1: "panicMode(bool, 1 byte) : "

Key storage slots (inferred from deployment):

SlotVariableTypePurpose`0``owner``address`Contract owner with admin privileges`1``panicMode``bool`Circuit breaker state`2+``guardianReputation``mapping(address => uint256)`Cached reputation scores

Sources:[contracts/README.md#33-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L58)

### Configuration ConstantsLink copied!

ConstantValuePurpose`REPUTATION_THRESHOLD``90`Minimum reputation for VIP lane access`VIP_FEE_BPS``1` (0.01%)Fee charged on Guardian swaps during panic mode`SENTINEL_ADDRESS`ImmutableAddress of AegisSentinel authorized to trigger panic mode

Sources:[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)

---

## Access ControlLink copied!

### Authorization ModelLink copied!

#mermaid-alhki2ywnc{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-alhki2ywnc .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-alhki2ywnc .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-alhki2ywnc .error-icon{fill:#a44141;}#mermaid-alhki2ywnc .error-text{fill:#ddd;stroke:#ddd;}#mermaid-alhki2ywnc .edge-thickness-normal{stroke-width:1px;}#mermaid-alhki2ywnc .edge-thickness-thick{stroke-width:3.5px;}#mermaid-alhki2ywnc .edge-pattern-solid{stroke-dasharray:0;}#mermaid-alhki2ywnc .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-alhki2ywnc .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-alhki2ywnc .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-alhki2ywnc .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-alhki2ywnc .marker.cross{stroke:lightgrey;}#mermaid-alhki2ywnc svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-alhki2ywnc p{margin:0;}#mermaid-alhki2ywnc .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-alhki2ywnc .cluster-label text{fill:#F9FFFE;}#mermaid-alhki2ywnc .cluster-label span{color:#F9FFFE;}#mermaid-alhki2ywnc .cluster-label span p{background-color:transparent;}#mermaid-alhki2ywnc .label text,#mermaid-alhki2ywnc span{fill:#ccc;color:#ccc;}#mermaid-alhki2ywnc .node rect,#mermaid-alhki2ywnc .node circle,#mermaid-alhki2ywnc .node ellipse,#mermaid-alhki2ywnc .node polygon,#mermaid-alhki2ywnc .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-alhki2ywnc .rough-node .label text,#mermaid-alhki2ywnc .node .label text,#mermaid-alhki2ywnc .image-shape .label,#mermaid-alhki2ywnc .icon-shape .label{text-anchor:middle;}#mermaid-alhki2ywnc .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-alhki2ywnc .rough-node .label,#mermaid-alhki2ywnc .node .label,#mermaid-alhki2ywnc .image-shape .label,#mermaid-alhki2ywnc .icon-shape .label{text-align:center;}#mermaid-alhki2ywnc .node.clickable{cursor:pointer;}#mermaid-alhki2ywnc .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-alhki2ywnc .arrowheadPath{fill:lightgrey;}#mermaid-alhki2ywnc .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-alhki2ywnc .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-alhki2ywnc .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-alhki2ywnc .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-alhki2ywnc .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-alhki2ywnc .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-alhki2ywnc .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-alhki2ywnc .cluster text{fill:#F9FFFE;}#mermaid-alhki2ywnc .cluster span{color:#F9FFFE;}#mermaid-alhki2ywnc div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-alhki2ywnc .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-alhki2ywnc rect.text{fill:none;stroke-width:0;}#mermaid-alhki2ywnc .icon-shape,#mermaid-alhki2ywnc .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-alhki2ywnc .icon-shape p,#mermaid-alhki2ywnc .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-alhki2ywnc .icon-shape rect,#mermaid-alhki2ywnc .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-alhki2ywnc .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-alhki2ywnc .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-alhki2ywnc :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

can call

can call

can call

Owner 0xd2df...BE2a

Administrative Functions

AegisSentinel 0x0B6a...b6B6

Protected Functions

Any Address

Public Read Functions

transferOwnership()

Configuration updates

setPanicMode(bool)

updateReputation(address,uint256)

panicMode view

getReputation(address) view

### Function Access TableLink copied!

FunctionAccess ModifierAllowed Caller`setPanicMode(bool)``onlySentinel`AegisSentinel contract only`updateReputation(address, uint256)``onlySentinel`AegisSentinel contract only`beforeSwap(...)``onlyPoolManager`PoolManager contract only`transferOwnership(address)``onlyOwner`Current owner onlyConfiguration functions`onlyOwner`Current owner onlyView functions`public`Anyone

Sources:[contracts/README.md#41-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L41-L50)

---

## Integration PointsLink copied!

### Cross-Chain CommunicationLink copied!

AegisHook receives cross-chain messages from AegisSentinel on the Reactive Network:

"AegisHook (Unichain)""AegisSentinel (Reactive)""MockOracle (Sepolia)""AegisHook (Unichain)""AegisSentinel (Reactive)""MockOracle (Sepolia)"#mermaid-la6qvyh17s9{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-la6qvyh17s9 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-la6qvyh17s9 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-la6qvyh17s9 .error-icon{fill:#a44141;}#mermaid-la6qvyh17s9 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-la6qvyh17s9 .edge-thickness-normal{stroke-width:1px;}#mermaid-la6qvyh17s9 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-la6qvyh17s9 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-la6qvyh17s9 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-la6qvyh17s9 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-la6qvyh17s9 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-la6qvyh17s9 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-la6qvyh17s9 .marker.cross{stroke:lightgrey;}#mermaid-la6qvyh17s9 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-la6qvyh17s9 p{margin:0;}#mermaid-la6qvyh17s9 .actor{stroke:#ccc;fill:#1f2020;}#mermaid-la6qvyh17s9 text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-la6qvyh17s9 .actor-line{stroke:#ccc;}#mermaid-la6qvyh17s9 .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-la6qvyh17s9 .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-la6qvyh17s9 .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-la6qvyh17s9 #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-la6qvyh17s9 .sequenceNumber{fill:black;}#mermaid-la6qvyh17s9 #sequencenumber{fill:lightgrey;}#mermaid-la6qvyh17s9 #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-la6qvyh17s9 .messageText{fill:lightgrey;stroke:none;}#mermaid-la6qvyh17s9 .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-la6qvyh17s9 .labelText,#mermaid-la6qvyh17s9 .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-la6qvyh17s9 .loopText,#mermaid-la6qvyh17s9 .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-la6qvyh17s9 .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-la6qvyh17s9 .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-la6qvyh17s9 .noteText,#mermaid-la6qvyh17s9 .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-la6qvyh17s9 .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-la6qvyh17s9 .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-la6qvyh17s9 .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-la6qvyh17s9 .actorPopupMenu{position:absolute;}#mermaid-la6qvyh17s9 .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-la6qvyh17s9 .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-la6qvyh17s9 .actor-man circle,#mermaid-la6qvyh17s9 line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-la6qvyh17s9 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Circuit breaker activeNormal operation resumed"PriceUpdate event price < threshold""Evaluate crash condition""Cross-chain call setPanicMode(true)""Update panicMode = true""Success""PriceUpdate event price normalized""Cross-chain call setPanicMode(false)""Update panicMode = false""Success"

Sources:[contracts/README.md#10-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L10-L26)[contracts/README.md#39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L39-L50)

### Uniswap V4 Hook InterfaceLink copied!

AegisHook implements the Uniswap V4 `IHooks` interface:

Hook FunctionImplementedPurpose`beforeSwap()`✅Main circuit breaker logic`afterSwap()`❌Not used`beforeAddLiquidity()`❌Not used`afterAddLiquidity()`❌Not used`beforeRemoveLiquidity()`❌Not used`afterRemoveLiquidity()`❌Not used

The contract address flags (ending in `...8080`) declare only `beforeSwap` implementation, as verified by the CREATE2 salt mining process.

Sources:[contracts/README.md#33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L37)[contracts/README.md#119-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L119-L122)

---

## Event EmissionsLink copied!

The contract emits events for key state changes and Guardian interventions:

EventParametersEmitted When`PanicModeSet(bool)``enabled: bool`Panic mode is activated/deactivated`GuardianIntervention(address, uint256)``guardian: address``volume: uint256`Guardian executes swap during panic mode`ReputationUpdated(address, uint256)``guardian: address``newScore: uint256`Guardian reputation is updated from L1

Sources:[contracts/README.md#52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L52-L57)

---

## Technical Implementation DetailsLink copied!

### Uniswap V4 Hook FlagsLink copied!

The contract address is salt-mined during deployment to achieve specific bit patterns:

Address PatternFlagMeaning`0x1E2a...8080``0x80` prefix (before swap)Contract implements `beforeSwap` hookLast 2 bytes: `8080`Binary: `10000000 10000000`Both hook flags for before operations

The Uniswap V4 PoolManager validates these flags by checking the deployed address against declared hook implementations.

Sources:[contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#7](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#L7-L7)

### Gas OptimizationLink copied!

The contract uses several gas optimization techniques:

1. Immutable addresses: `poolManager` and `SENTINEL_ADDRESS` are stored as immutable variables
2. Packed storage: Boolean `panicMode` shares a storage slot with other variables
3. Cached reputation: L2 reputation cache avoids cross-chain reads during swap execution
4. Early revert: Panic mode check occurs before expensive operations

Sources:[contracts/README.md#33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L33-L37)

### CREATE2 Salt CalculationLink copied!

The deployment salt is computed to satisfy the address flag requirement:

```
salt = keccak256(nonce, deployerAddress, initCode)
Required: address & 0xFF00 == 0x8000
Process: Iterate nonce until resulting address matches pattern
```

The final salt value that produced address `0x1E2aE114cF3B63779A1367eD704ccA51a0218080` was included in the deployment transaction input data.

Sources:[contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#13-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/broadcast/06_DeployHook.s.sol/1301/run-latest.json#L13-L18)[contracts/README.md#119-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L119-L122)

---

## Related ComponentsLink copied!

- AegisSentinel ([#3.2](#3.2)): Reactive contract that monitors L1 price feeds and triggers panic mode
- Guardian Registry ([#3.4](#3.4)): ERC-721 + ERC-8004 contract storing Guardian identities and reputation
- MockOracle ([#3.3](#3.3)): L1 price feed that emits market volatility events
- Deployment Scripts ([#5.1](#5.1)): Foundry scripts for CREATE2 salt mining and deployment

Sources:[contracts/README.md#1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md#L1-L123)