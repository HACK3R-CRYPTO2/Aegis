# Forge Standard LibraryLink copied!
Relevant source files
- [contracts/lib/forge-std/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md)
- [contracts/lib/forge-std/package.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/package.json)
- [contracts/lib/forge-std/src/Base.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol)

## Purpose and ScopeLink copied!

This page documents the Forge Standard Library (`forge-std`), a collection of helper contracts and utilities used throughout the Aegis project for testing, deployment scripting, and development. The library provides wrappers around Foundry's cheatcodes, standardized testing utilities, and enhanced developer experience features.

For information about the overall Foundry framework configuration, see [Foundry Configuration Reference](#7.1). For details on deployment scripts that use these utilities, see [Deployment Scripts](#5.1).

Sources:[contracts/lib/forge-std/README.md#1-5](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L5)

## Library StructureLink copied!

The Forge Standard Library is organized into several core modules that provide different categories of functionality. The Aegis project leverages these modules primarily through the `Test.sol` and `Script.sol` base contracts.

### Module ArchitectureLink copied!

#mermaid-q74vjcse2vo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-q74vjcse2vo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-q74vjcse2vo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-q74vjcse2vo .error-icon{fill:#a44141;}#mermaid-q74vjcse2vo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-q74vjcse2vo .edge-thickness-normal{stroke-width:1px;}#mermaid-q74vjcse2vo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-q74vjcse2vo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-q74vjcse2vo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-q74vjcse2vo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-q74vjcse2vo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-q74vjcse2vo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-q74vjcse2vo .marker.cross{stroke:lightgrey;}#mermaid-q74vjcse2vo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-q74vjcse2vo p{margin:0;}#mermaid-q74vjcse2vo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-q74vjcse2vo .cluster-label text{fill:#F9FFFE;}#mermaid-q74vjcse2vo .cluster-label span{color:#F9FFFE;}#mermaid-q74vjcse2vo .cluster-label span p{background-color:transparent;}#mermaid-q74vjcse2vo .label text,#mermaid-q74vjcse2vo span{fill:#ccc;color:#ccc;}#mermaid-q74vjcse2vo .node rect,#mermaid-q74vjcse2vo .node circle,#mermaid-q74vjcse2vo .node ellipse,#mermaid-q74vjcse2vo .node polygon,#mermaid-q74vjcse2vo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-q74vjcse2vo .rough-node .label text,#mermaid-q74vjcse2vo .node .label text,#mermaid-q74vjcse2vo .image-shape .label,#mermaid-q74vjcse2vo .icon-shape .label{text-anchor:middle;}#mermaid-q74vjcse2vo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-q74vjcse2vo .rough-node .label,#mermaid-q74vjcse2vo .node .label,#mermaid-q74vjcse2vo .image-shape .label,#mermaid-q74vjcse2vo .icon-shape .label{text-align:center;}#mermaid-q74vjcse2vo .node.clickable{cursor:pointer;}#mermaid-q74vjcse2vo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-q74vjcse2vo .arrowheadPath{fill:lightgrey;}#mermaid-q74vjcse2vo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-q74vjcse2vo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-q74vjcse2vo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-q74vjcse2vo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-q74vjcse2vo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-q74vjcse2vo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-q74vjcse2vo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-q74vjcse2vo .cluster text{fill:#F9FFFE;}#mermaid-q74vjcse2vo .cluster span{color:#F9FFFE;}#mermaid-q74vjcse2vo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-q74vjcse2vo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-q74vjcse2vo rect.text{fill:none;stroke-width:0;}#mermaid-q74vjcse2vo .icon-shape,#mermaid-q74vjcse2vo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-q74vjcse2vo .icon-shape p,#mermaid-q74vjcse2vo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-q74vjcse2vo .icon-shape rect,#mermaid-q74vjcse2vo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-q74vjcse2vo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-q74vjcse2vo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-q74vjcse2vo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Aggregate Contracts

Console Modules

Core Modules

Base.sol CommonBase, TestBase, ScriptBase

Vm.sol Cheatcode Interface

StdStorage.sol Storage Manipulation

StdCheats.sol Prank/Hoax Wrappers

StdError.sol Error Codes

StdUtils.sol Utility Functions

console.sol Hardhat Compatible

console2.sol Forge Optimized

safeconsole.sol Safe Variant

Test.sol Testing Base

Script.sol Deployment Base

Sources:[contracts/lib/forge-std/src/Base.sol#1-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L1-L43)[contracts/lib/forge-std/src/Script.sol#1-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Script.sol#L1-L29)

### Integration with Aegis ContractsLink copied!

#mermaid-ij42ztoo7i{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ij42ztoo7i .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ij42ztoo7i .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ij42ztoo7i .error-icon{fill:#a44141;}#mermaid-ij42ztoo7i .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ij42ztoo7i .edge-thickness-normal{stroke-width:1px;}#mermaid-ij42ztoo7i .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ij42ztoo7i .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ij42ztoo7i .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ij42ztoo7i .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ij42ztoo7i .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ij42ztoo7i .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ij42ztoo7i .marker.cross{stroke:lightgrey;}#mermaid-ij42ztoo7i svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ij42ztoo7i p{margin:0;}#mermaid-ij42ztoo7i .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ij42ztoo7i .cluster-label text{fill:#F9FFFE;}#mermaid-ij42ztoo7i .cluster-label span{color:#F9FFFE;}#mermaid-ij42ztoo7i .cluster-label span p{background-color:transparent;}#mermaid-ij42ztoo7i .label text,#mermaid-ij42ztoo7i span{fill:#ccc;color:#ccc;}#mermaid-ij42ztoo7i .node rect,#mermaid-ij42ztoo7i .node circle,#mermaid-ij42ztoo7i .node ellipse,#mermaid-ij42ztoo7i .node polygon,#mermaid-ij42ztoo7i .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ij42ztoo7i .rough-node .label text,#mermaid-ij42ztoo7i .node .label text,#mermaid-ij42ztoo7i .image-shape .label,#mermaid-ij42ztoo7i .icon-shape .label{text-anchor:middle;}#mermaid-ij42ztoo7i .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ij42ztoo7i .rough-node .label,#mermaid-ij42ztoo7i .node .label,#mermaid-ij42ztoo7i .image-shape .label,#mermaid-ij42ztoo7i .icon-shape .label{text-align:center;}#mermaid-ij42ztoo7i .node.clickable{cursor:pointer;}#mermaid-ij42ztoo7i .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ij42ztoo7i .arrowheadPath{fill:lightgrey;}#mermaid-ij42ztoo7i .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ij42ztoo7i .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ij42ztoo7i .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ij42ztoo7i .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ij42ztoo7i .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ij42ztoo7i .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ij42ztoo7i .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ij42ztoo7i .cluster text{fill:#F9FFFE;}#mermaid-ij42ztoo7i .cluster span{color:#F9FFFE;}#mermaid-ij42ztoo7i div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ij42ztoo7i .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ij42ztoo7i rect.text{fill:none;stroke-width:0;}#mermaid-ij42ztoo7i .icon-shape,#mermaid-ij42ztoo7i .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ij42ztoo7i .icon-shape p,#mermaid-ij42ztoo7i .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ij42ztoo7i .icon-shape rect,#mermaid-ij42ztoo7i .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ij42ztoo7i .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ij42ztoo7i .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ij42ztoo7i :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Aegis Deployment Scripts

Aegis Test Contracts

forge-std Library

Test.sol

Script.sol

AegisHook.t.sol Hook Unit Tests

AegisSentinel.t.sol Sentinel Unit Tests

Integration.t.sol Cross-Chain Tests

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol

Sources:[contracts/lib/forge-std/README.md#1-5](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L5)

## Core Constants and AddressesLink copied!

The `CommonBase` contract defines essential constants used throughout testing and scripting contexts. These addresses are deterministically computed or standardized across Foundry projects.

ConstantValueDescription`VM_ADDRESS``0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`Foundry VM cheatcode interface address`CONSOLE``0x000000000000000000636F6e736F6c652e6c6f67`Console logging staticcall target`CREATE2_FACTORY``0x4e59b44847b379578588920cA78FbF26c0B4956C`Deterministic deployment proxy`DEFAULT_SENDER``0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38`Default tx.origin and msg.sender`DEFAULT_TEST_CONTRACT``0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f`First CREATE'd contract address`MULTICALL3_ADDRESS``0xcA11bde05977b3631167028862bE2a173976CA11`Multicall3 deployment address`SECP256K1_ORDER``115792089...494337`secp256k1 curve order`UINT256_MAX``115792089...639935`Maximum uint256 value

The `vm` and `vmSafe` constants provide access to the Foundry cheatcode interface through the `Vm` and `VmSafe` structs respectively. The `stdstore` instance provides access to storage manipulation utilities.

Sources:[contracts/lib/forge-std/src/Base.sol#7-36](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L7-L36)

## stdErrorLink copied!

The `stdError` contract provides standardized error signatures for all Solidity compiler built-in errors. This is particularly useful with the `vm.expectRevert` cheatcode when testing expected failure conditions.

### Common Error TypesLink copied!

#mermaid-cc0zqi20egh{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-cc0zqi20egh .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-cc0zqi20egh .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-cc0zqi20egh .error-icon{fill:#a44141;}#mermaid-cc0zqi20egh .error-text{fill:#ddd;stroke:#ddd;}#mermaid-cc0zqi20egh .edge-thickness-normal{stroke-width:1px;}#mermaid-cc0zqi20egh .edge-thickness-thick{stroke-width:3.5px;}#mermaid-cc0zqi20egh .edge-pattern-solid{stroke-dasharray:0;}#mermaid-cc0zqi20egh .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-cc0zqi20egh .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-cc0zqi20egh .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-cc0zqi20egh .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-cc0zqi20egh .marker.cross{stroke:lightgrey;}#mermaid-cc0zqi20egh svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-cc0zqi20egh p{margin:0;}#mermaid-cc0zqi20egh .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-cc0zqi20egh .cluster-label text{fill:#F9FFFE;}#mermaid-cc0zqi20egh .cluster-label span{color:#F9FFFE;}#mermaid-cc0zqi20egh .cluster-label span p{background-color:transparent;}#mermaid-cc0zqi20egh .label text,#mermaid-cc0zqi20egh span{fill:#ccc;color:#ccc;}#mermaid-cc0zqi20egh .node rect,#mermaid-cc0zqi20egh .node circle,#mermaid-cc0zqi20egh .node ellipse,#mermaid-cc0zqi20egh .node polygon,#mermaid-cc0zqi20egh .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-cc0zqi20egh .rough-node .label text,#mermaid-cc0zqi20egh .node .label text,#mermaid-cc0zqi20egh .image-shape .label,#mermaid-cc0zqi20egh .icon-shape .label{text-anchor:middle;}#mermaid-cc0zqi20egh .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-cc0zqi20egh .rough-node .label,#mermaid-cc0zqi20egh .node .label,#mermaid-cc0zqi20egh .image-shape .label,#mermaid-cc0zqi20egh .icon-shape .label{text-align:center;}#mermaid-cc0zqi20egh .node.clickable{cursor:pointer;}#mermaid-cc0zqi20egh .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-cc0zqi20egh .arrowheadPath{fill:lightgrey;}#mermaid-cc0zqi20egh .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-cc0zqi20egh .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-cc0zqi20egh .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cc0zqi20egh .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-cc0zqi20egh .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cc0zqi20egh .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-cc0zqi20egh .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-cc0zqi20egh .cluster text{fill:#F9FFFE;}#mermaid-cc0zqi20egh .cluster span{color:#F9FFFE;}#mermaid-cc0zqi20egh div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-cc0zqi20egh .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-cc0zqi20egh rect.text{fill:none;stroke-width:0;}#mermaid-cc0zqi20egh .icon-shape,#mermaid-cc0zqi20egh .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-cc0zqi20egh .icon-shape p,#mermaid-cc0zqi20egh .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-cc0zqi20egh .icon-shape rect,#mermaid-cc0zqi20egh .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-cc0zqi20egh .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-cc0zqi20egh .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-cc0zqi20egh :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

stdError Contract

arithmeticError Overflow/Underflow

assertionError assert() Failed

divisionError Division by Zero

enumConversionError Invalid Enum Cast

encodeStorageError Storage Encode Fail

popError Empty Array Pop

indexOOBError Array Index OOB

memOverflowError Memory Overflow

zeroVarError Zero Init Variable

### Usage PatternLink copied!

The typical usage pattern in Aegis tests involves calling `vm.expectRevert(stdError.arithmeticError)` before executing a function expected to revert with an arithmetic error. This ensures tests verify not just that a revert occurs, but that the correct type of error is thrown.

```
// Example pattern from forge-std README
vm.expectRevert(stdError.arithmeticError);
contractUnderTest.functionThatOverflows();
```

Sources:[contracts/lib/forge-std/README.md#14-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L14-L44)

## stdStorageLink copied!

The `stdStorage` library provides powerful storage slot manipulation capabilities. It wraps Foundry's `record` and `accesses` cheatcodes to automatically find and write to storage slots without requiring knowledge of the storage layout.

### Storage Slot DiscoveryLink copied!

#mermaid-d13st5ydayv{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-d13st5ydayv .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-d13st5ydayv .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-d13st5ydayv .error-icon{fill:#a44141;}#mermaid-d13st5ydayv .error-text{fill:#ddd;stroke:#ddd;}#mermaid-d13st5ydayv .edge-thickness-normal{stroke-width:1px;}#mermaid-d13st5ydayv .edge-thickness-thick{stroke-width:3.5px;}#mermaid-d13st5ydayv .edge-pattern-solid{stroke-dasharray:0;}#mermaid-d13st5ydayv .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-d13st5ydayv .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-d13st5ydayv .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-d13st5ydayv .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-d13st5ydayv .marker.cross{stroke:lightgrey;}#mermaid-d13st5ydayv svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-d13st5ydayv p{margin:0;}#mermaid-d13st5ydayv .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-d13st5ydayv .cluster-label text{fill:#F9FFFE;}#mermaid-d13st5ydayv .cluster-label span{color:#F9FFFE;}#mermaid-d13st5ydayv .cluster-label span p{background-color:transparent;}#mermaid-d13st5ydayv .label text,#mermaid-d13st5ydayv span{fill:#ccc;color:#ccc;}#mermaid-d13st5ydayv .node rect,#mermaid-d13st5ydayv .node circle,#mermaid-d13st5ydayv .node ellipse,#mermaid-d13st5ydayv .node polygon,#mermaid-d13st5ydayv .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-d13st5ydayv .rough-node .label text,#mermaid-d13st5ydayv .node .label text,#mermaid-d13st5ydayv .image-shape .label,#mermaid-d13st5ydayv .icon-shape .label{text-anchor:middle;}#mermaid-d13st5ydayv .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-d13st5ydayv .rough-node .label,#mermaid-d13st5ydayv .node .label,#mermaid-d13st5ydayv .image-shape .label,#mermaid-d13st5ydayv .icon-shape .label{text-align:center;}#mermaid-d13st5ydayv .node.clickable{cursor:pointer;}#mermaid-d13st5ydayv .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-d13st5ydayv .arrowheadPath{fill:lightgrey;}#mermaid-d13st5ydayv .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-d13st5ydayv .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-d13st5ydayv .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-d13st5ydayv .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-d13st5ydayv .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-d13st5ydayv .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-d13st5ydayv .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-d13st5ydayv .cluster text{fill:#F9FFFE;}#mermaid-d13st5ydayv .cluster span{color:#F9FFFE;}#mermaid-d13st5ydayv div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-d13st5ydayv .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-d13st5ydayv rect.text{fill:none;stroke-width:0;}#mermaid-d13st5ydayv .icon-shape,#mermaid-d13st5ydayv .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-d13st5ydayv .icon-shape p,#mermaid-d13st5ydayv .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-d13st5ydayv .icon-shape rect,#mermaid-d13st5ydayv .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-d13st5ydayv .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-d13st5ydayv .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-d13st5ydayv :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Yes

No

Yes

No

stdstore.target(address)

sig(bytes4 selector)

Mapping?

with_key(key)

Struct?

depth(uint256)

Operation

find() Returns slot number

checked_write(value) Writes to slot

read() Reads from slot

### Key OperationsLink copied!

MethodPurposeReturns`target(address)`Sets the target contract address`StdStorage``sig(bytes4)` / `sig(string)`Sets the function selector to locate`StdStorage``with_key(address/uint256)`Provides mapping key(s)`StdStorage``depth(uint256)`Specifies struct field index`StdStorage``find()`Locates the storage slot`uint256``checked_write(uint256)`Safely writes to the slot`void``read()`Reads the current value`bytes32`

### Struct Field DepthLink copied!

When targeting struct fields, the `depth` parameter specifies which field to access:

```
struct T {
    uint256 a;  // depth 0
    uint256 b;  // depth 1
}
```

### Packed Storage LimitationLink copied!

The library can find storage slots for packed variables but cannot safely write to them unless they are uninitialized (`bytes32(0)`). Writing to packed slots that share space with other variables will cause execution to revert with an error.

Sources:[contracts/lib/forge-std/README.md#46-164](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L46-L164)

## stdCheatsLink copied!

The `stdCheats` module provides developer-friendly wrappers around common Foundry cheatcodes, particularly for address impersonation and ETH balance manipulation.

### hoax Function FamilyLink copied!

#mermaid-qgooq8ogmo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-qgooq8ogmo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-qgooq8ogmo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-qgooq8ogmo .error-icon{fill:#a44141;}#mermaid-qgooq8ogmo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-qgooq8ogmo .edge-thickness-normal{stroke-width:1px;}#mermaid-qgooq8ogmo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-qgooq8ogmo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-qgooq8ogmo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-qgooq8ogmo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-qgooq8ogmo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-qgooq8ogmo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-qgooq8ogmo .marker.cross{stroke:lightgrey;}#mermaid-qgooq8ogmo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-qgooq8ogmo p{margin:0;}#mermaid-qgooq8ogmo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-qgooq8ogmo .cluster-label text{fill:#F9FFFE;}#mermaid-qgooq8ogmo .cluster-label span{color:#F9FFFE;}#mermaid-qgooq8ogmo .cluster-label span p{background-color:transparent;}#mermaid-qgooq8ogmo .label text,#mermaid-qgooq8ogmo span{fill:#ccc;color:#ccc;}#mermaid-qgooq8ogmo .node rect,#mermaid-qgooq8ogmo .node circle,#mermaid-qgooq8ogmo .node ellipse,#mermaid-qgooq8ogmo .node polygon,#mermaid-qgooq8ogmo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-qgooq8ogmo .rough-node .label text,#mermaid-qgooq8ogmo .node .label text,#mermaid-qgooq8ogmo .image-shape .label,#mermaid-qgooq8ogmo .icon-shape .label{text-anchor:middle;}#mermaid-qgooq8ogmo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-qgooq8ogmo .rough-node .label,#mermaid-qgooq8ogmo .node .label,#mermaid-qgooq8ogmo .image-shape .label,#mermaid-qgooq8ogmo .icon-shape .label{text-align:center;}#mermaid-qgooq8ogmo .node.clickable{cursor:pointer;}#mermaid-qgooq8ogmo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-qgooq8ogmo .arrowheadPath{fill:lightgrey;}#mermaid-qgooq8ogmo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-qgooq8ogmo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-qgooq8ogmo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-qgooq8ogmo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-qgooq8ogmo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-qgooq8ogmo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-qgooq8ogmo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-qgooq8ogmo .cluster text{fill:#F9FFFE;}#mermaid-qgooq8ogmo .cluster span{color:#F9FFFE;}#mermaid-qgooq8ogmo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-qgooq8ogmo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-qgooq8ogmo rect.text{fill:none;stroke-width:0;}#mermaid-qgooq8ogmo .icon-shape,#mermaid-qgooq8ogmo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-qgooq8ogmo .icon-shape p,#mermaid-qgooq8ogmo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-qgooq8ogmo .icon-shape rect,#mermaid-qgooq8ogmo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-qgooq8ogmo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-qgooq8ogmo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-qgooq8ogmo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Multi-Call Pranks

Single-Call Pranks

deal(who, 2^128)

deal(who, give)

deal(who, 2^128)

deal(who, give)

hoax(address who)

hoax(address who, uint256 give)

startHoax(address who)

startHoax(address who, uint256 give)

vm.deal()

vm.deal()

vm.prank(who)

vm.prank(who)

vm.deal()

vm.deal()

vm.startPrank(who)

vm.startPrank(who)

### Function ReferenceLink copied!

FunctionBehaviorUse Case`hoax(address)`Sets ETH balance to 2^128, pranks next callSingle transaction with funded address`hoax(address, uint256)`Sets custom ETH balance, pranks next callSingle transaction with specific balance`startHoax(address)`Sets ETH balance to 2^128, starts persistent prankMultiple transactions from funded address`startHoax(address, uint256)`Sets custom ETH balance, starts persistent prankMultiple transactions with specific balance

### Safety ConsiderationsLink copied!

The `hoax` functions overwrite existing ETH balances. For addresses that already have ETH and should retain it, use `vm.prank()` directly. If explicit balance changes are needed, use `vm.deal()` separately. The `hoax` family is designed for test scenarios where the address balance should be explicitly controlled.

Sources:[contracts/lib/forge-std/README.md#166-216](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L166-L216)

## Console LoggingLink copied!

Forge Standard Library provides three console logging variants: `console.sol`, `console2.sol`, and `safeconsole.sol`.

### Console Variants ComparisonLink copied!

ModuleCompatibilityForge Trace DecodingSafetyUse Case`console.sol`Hardhat compatiblePartial (uint256/int256 bug)StandardCross-framework compatibility`console2.sol`Forge specificFullStandardForge-only projects (recommended)`safeconsole.sol`Forge specificFullSafe for scriptsDeployment scripts

### Recommended UsageLink copied!

```
// For test contracts - use console2
import "forge-std/Test.sol";
// console2 is included automatically
 
contract MyTest is Test {
    function testSomething() public {
        console2.log("Value:", someValue);
    }
}
```

```
// For deployment scripts - safeconsole is included
import "forge-std/Script.sol";
 
contract DeployScript is Script {
    function run() public {
        // safeconsole available automatically
    }
}
```

### Console.log MechanismLink copied!

Console logging works by executing a `staticcall` to the `CONSOLE` address (`0x000000000000000000636F6e736F6c652e6c6f67`). Foundry intercepts these calls and formats them for output. This mechanism allows logging without modifying contract state or consuming actual gas on real networks.

Sources:[contracts/lib/forge-std/README.md#222-246](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L222-L246)[contracts/lib/forge-std/src/Base.sol#11-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L11-L13)

## Base ContractsLink copied!

The `Base.sol` file defines three abstract base contracts that serve as the foundation for test and script contracts.

### Base Contract HierarchyLink copied!

#mermaid-fuwi2kn4bp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-fuwi2kn4bp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-fuwi2kn4bp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-fuwi2kn4bp .error-icon{fill:#a44141;}#mermaid-fuwi2kn4bp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-fuwi2kn4bp .edge-thickness-normal{stroke-width:1px;}#mermaid-fuwi2kn4bp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-fuwi2kn4bp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-fuwi2kn4bp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-fuwi2kn4bp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-fuwi2kn4bp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-fuwi2kn4bp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-fuwi2kn4bp .marker.cross{stroke:lightgrey;}#mermaid-fuwi2kn4bp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-fuwi2kn4bp p{margin:0;}#mermaid-fuwi2kn4bp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-fuwi2kn4bp .cluster-label text{fill:#F9FFFE;}#mermaid-fuwi2kn4bp .cluster-label span{color:#F9FFFE;}#mermaid-fuwi2kn4bp .cluster-label span p{background-color:transparent;}#mermaid-fuwi2kn4bp .label text,#mermaid-fuwi2kn4bp span{fill:#ccc;color:#ccc;}#mermaid-fuwi2kn4bp .node rect,#mermaid-fuwi2kn4bp .node circle,#mermaid-fuwi2kn4bp .node ellipse,#mermaid-fuwi2kn4bp .node polygon,#mermaid-fuwi2kn4bp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-fuwi2kn4bp .rough-node .label text,#mermaid-fuwi2kn4bp .node .label text,#mermaid-fuwi2kn4bp .image-shape .label,#mermaid-fuwi2kn4bp .icon-shape .label{text-anchor:middle;}#mermaid-fuwi2kn4bp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-fuwi2kn4bp .rough-node .label,#mermaid-fuwi2kn4bp .node .label,#mermaid-fuwi2kn4bp .image-shape .label,#mermaid-fuwi2kn4bp .icon-shape .label{text-align:center;}#mermaid-fuwi2kn4bp .node.clickable{cursor:pointer;}#mermaid-fuwi2kn4bp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-fuwi2kn4bp .arrowheadPath{fill:lightgrey;}#mermaid-fuwi2kn4bp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-fuwi2kn4bp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-fuwi2kn4bp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-fuwi2kn4bp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-fuwi2kn4bp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-fuwi2kn4bp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-fuwi2kn4bp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-fuwi2kn4bp .cluster text{fill:#F9FFFE;}#mermaid-fuwi2kn4bp .cluster span{color:#F9FFFE;}#mermaid-fuwi2kn4bp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-fuwi2kn4bp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-fuwi2kn4bp rect.text{fill:none;stroke-width:0;}#mermaid-fuwi2kn4bp .icon-shape,#mermaid-fuwi2kn4bp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-fuwi2kn4bp .icon-shape p,#mermaid-fuwi2kn4bp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-fuwi2kn4bp .icon-shape rect,#mermaid-fuwi2kn4bp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-fuwi2kn4bp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-fuwi2kn4bp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-fuwi2kn4bp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

defines

defines

defines

defines

CommonBase Abstract Contract

TestBase Extends CommonBase

ScriptBase Extends CommonBase

vm: Vm constant

stdstore: StdStorage

VM_ADDRESS, CONSOLE, etc.

vmSafe: VmSafe constant

Test.sol Full Testing Suite

Script.sol Deployment Suite

### CommonBase MembersLink copied!

The `CommonBase` contract provides:

- vm: Full access to Foundry cheatcodes via the `Vm` interface at [contracts/lib/forge-std/src/Base.sol#34](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L34-L34)
- stdstore: Storage manipulation utilities via the `StdStorage` library at [contracts/lib/forge-std/src/Base.sol#35](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L35-L35)
- Constants: Standardized addresses and values for testing contexts at [contracts/lib/forge-std/src/Base.sol#8-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L8-L32)

### TestBase vs ScriptBaseLink copied!

The distinction between `TestBase` and `ScriptBase` is minimal at the base level:

- `TestBase`: Used as the foundation for `Test.sol`, which aggregates testing utilities
- `ScriptBase`: Used as the foundation for `Script.sol`, adds `vmSafe` for safer script operations at [contracts/lib/forge-std/src/Base.sol#41](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L41-L41)

The `vmSafe` constant in `ScriptBase` provides the `VmSafe` interface, which excludes potentially dangerous cheatcodes that should not be used in deployment scripts (like `etch` for replacing code at an address).

Sources:[contracts/lib/forge-std/src/Base.sol#1-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Base.sol#L1-L43)

## Test Contract AggregationLink copied!

The `Test.sol` contract (not shown in provided files but referenced in README) aggregates all testing utilities into a single import. Aegis test contracts inherit from `Test` to gain access to:

- Standard assertions
- Console logging (`console2`)
- Storage manipulation (`stdstore`)
- Cheatcode wrappers (`hoax`, `startHoax`, etc.)
- Error helpers (`stdError`)
- VM access (`vm`)

This pattern allows test contracts to use a single import:

```
import "forge-std/Test.sol";
 
contract MyTest is Test {
    // All utilities available
}
```

Sources:[contracts/lib/forge-std/README.md#24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L24-L33)[contracts/lib/forge-std/README.md#178-180](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L178-L180)

## Script Contract AggregationLink copied!

The `Script.sol` contract aggregates utilities suitable for deployment scripts. It includes safe variants and excludes testing-specific features.

### Script.sol Module CompositionLink copied!

#mermaid-8m3nrxagc65{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-8m3nrxagc65 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-8m3nrxagc65 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-8m3nrxagc65 .error-icon{fill:#a44141;}#mermaid-8m3nrxagc65 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-8m3nrxagc65 .edge-thickness-normal{stroke-width:1px;}#mermaid-8m3nrxagc65 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-8m3nrxagc65 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-8m3nrxagc65 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-8m3nrxagc65 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-8m3nrxagc65 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-8m3nrxagc65 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-8m3nrxagc65 .marker.cross{stroke:lightgrey;}#mermaid-8m3nrxagc65 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-8m3nrxagc65 p{margin:0;}#mermaid-8m3nrxagc65 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-8m3nrxagc65 .cluster-label text{fill:#F9FFFE;}#mermaid-8m3nrxagc65 .cluster-label span{color:#F9FFFE;}#mermaid-8m3nrxagc65 .cluster-label span p{background-color:transparent;}#mermaid-8m3nrxagc65 .label text,#mermaid-8m3nrxagc65 span{fill:#ccc;color:#ccc;}#mermaid-8m3nrxagc65 .node rect,#mermaid-8m3nrxagc65 .node circle,#mermaid-8m3nrxagc65 .node ellipse,#mermaid-8m3nrxagc65 .node polygon,#mermaid-8m3nrxagc65 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-8m3nrxagc65 .rough-node .label text,#mermaid-8m3nrxagc65 .node .label text,#mermaid-8m3nrxagc65 .image-shape .label,#mermaid-8m3nrxagc65 .icon-shape .label{text-anchor:middle;}#mermaid-8m3nrxagc65 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-8m3nrxagc65 .rough-node .label,#mermaid-8m3nrxagc65 .node .label,#mermaid-8m3nrxagc65 .image-shape .label,#mermaid-8m3nrxagc65 .icon-shape .label{text-align:center;}#mermaid-8m3nrxagc65 .node.clickable{cursor:pointer;}#mermaid-8m3nrxagc65 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-8m3nrxagc65 .arrowheadPath{fill:lightgrey;}#mermaid-8m3nrxagc65 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-8m3nrxagc65 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-8m3nrxagc65 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8m3nrxagc65 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-8m3nrxagc65 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8m3nrxagc65 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-8m3nrxagc65 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-8m3nrxagc65 .cluster text{fill:#F9FFFE;}#mermaid-8m3nrxagc65 .cluster span{color:#F9FFFE;}#mermaid-8m3nrxagc65 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-8m3nrxagc65 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-8m3nrxagc65 rect.text{fill:none;stroke-width:0;}#mermaid-8m3nrxagc65 .icon-shape,#mermaid-8m3nrxagc65 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8m3nrxagc65 .icon-shape p,#mermaid-8m3nrxagc65 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-8m3nrxagc65 .icon-shape rect,#mermaid-8m3nrxagc65 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8m3nrxagc65 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-8m3nrxagc65 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-8m3nrxagc65 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

extends

extends

extends

extends

imports

imports

imports

imports

imports

imports

imports

imports

Script Abstract Contract

ScriptBase

StdChains Chain RPC/ID Helpers

StdCheatsSafe Safe Cheat Wrappers

StdUtils Utility Functions

console.sol

console2.sol

safeconsole.sol

StdConstants

stdJson

stdMath

stdStorageSafe

StdStyle

The `IS_SCRIPT` boolean flag at [contracts/lib/forge-std/src/Script.sol#27](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Script.sol#L27-L27) identifies contracts as deployment scripts rather than test contracts. This flag must return `true` for script contexts.

Sources:[contracts/lib/forge-std/src/Script.sol#1-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Script.sol#L1-L29)

## Usage in Aegis DeploymentLink copied!

The Aegis deployment scripts leverage the `Script` base contract to access safe utilities for multi-chain deployment:

1. 04_DeployOracle.s.sol: Deploys `MockOracle` to Ethereum Sepolia
2. 05_DeploySentinel.s.sol: Deploys `AegisSentinel` to Reactive Network
3. 06_DeployHook.s.sol: Deploys `AegisHook` to Unichain Sepolia

Each script inherits from `Script` to access:

- Network configuration via `StdChains`
- JSON parsing for broadcast files via `stdJson`
- Safe cheatcodes via `StdCheatsSafe`
- Console logging for deployment status

For details on these deployment scripts, see [Deployment Scripts](#5.1).

Sources:[contracts/lib/forge-std/src/Script.sol#1-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Script.sol#L1-L29)[contracts/lib/forge-std/README.md#1-5](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L5)

## Installation and VersionLink copied!

The Aegis project includes forge-std as a git submodule. The library is installed at `contracts/lib/forge-std/` and tracked in the `.gitmodules` file.

Installation command for new projects:

```
forge install foundry-rs/forge-std
```

The library is dual-licensed under MIT and Apache 2.0, providing flexibility for integration into various projects.

Sources:[contracts/lib/forge-std/README.md#7-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L7-L11)[contracts/lib/forge-std/README.md#264-266](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L264-L266)