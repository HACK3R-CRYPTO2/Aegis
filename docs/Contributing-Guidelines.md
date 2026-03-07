# Contributing GuidelinesLink copied!
Relevant source files
- [contracts/lib/forge-std/.github/CODEOWNERS](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/CODEOWNERS)
- [contracts/lib/forge-std/CONTRIBUTING.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md)

## Purpose and ScopeLink copied!

This document provides guidelines for contributing to the Aegis project codebase. It covers contribution workflows for both the core Aegis smart contracts and the forge-std dependency, testing requirements, code review processes, and continuous integration requirements. For information about the forge-std library itself, see [Forge Standard Library](#7.2). For details on cheatcode generation when modifying forge-std, see [Cheatcode Generation](#7.3).

---

## OverviewLink copied!

The Aegis project accepts contributions across multiple areas:

ComponentLocationPrimary LanguageReview ProcessCore Contracts`contracts/src/`SolidityAegis maintainersDeployment Scripts`contracts/script/`SolidityAegis maintainersTest Suite`contracts/test/`SolidityAegis maintainersFrontend Dashboard`frontend/`TypeScriptAegis maintainersforge-std Library`contracts/lib/forge-std/`Solidityforge-std code owners

Sources: Project directory structure, [contracts/lib/forge-std/.github/CODEOWNERS#1](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/CODEOWNERS#L1-L1)

---

## Contribution WorkflowLink copied!

### Overall ProcessLink copied!

#mermaid-0y0959vjl16s{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-0y0959vjl16s .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-0y0959vjl16s .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-0y0959vjl16s .error-icon{fill:#a44141;}#mermaid-0y0959vjl16s .error-text{fill:#ddd;stroke:#ddd;}#mermaid-0y0959vjl16s .edge-thickness-normal{stroke-width:1px;}#mermaid-0y0959vjl16s .edge-thickness-thick{stroke-width:3.5px;}#mermaid-0y0959vjl16s .edge-pattern-solid{stroke-dasharray:0;}#mermaid-0y0959vjl16s .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-0y0959vjl16s .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-0y0959vjl16s .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-0y0959vjl16s .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-0y0959vjl16s .marker.cross{stroke:lightgrey;}#mermaid-0y0959vjl16s svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-0y0959vjl16s p{margin:0;}#mermaid-0y0959vjl16s .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-0y0959vjl16s .cluster-label text{fill:#F9FFFE;}#mermaid-0y0959vjl16s .cluster-label span{color:#F9FFFE;}#mermaid-0y0959vjl16s .cluster-label span p{background-color:transparent;}#mermaid-0y0959vjl16s .label text,#mermaid-0y0959vjl16s span{fill:#ccc;color:#ccc;}#mermaid-0y0959vjl16s .node rect,#mermaid-0y0959vjl16s .node circle,#mermaid-0y0959vjl16s .node ellipse,#mermaid-0y0959vjl16s .node polygon,#mermaid-0y0959vjl16s .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-0y0959vjl16s .rough-node .label text,#mermaid-0y0959vjl16s .node .label text,#mermaid-0y0959vjl16s .image-shape .label,#mermaid-0y0959vjl16s .icon-shape .label{text-anchor:middle;}#mermaid-0y0959vjl16s .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-0y0959vjl16s .rough-node .label,#mermaid-0y0959vjl16s .node .label,#mermaid-0y0959vjl16s .image-shape .label,#mermaid-0y0959vjl16s .icon-shape .label{text-align:center;}#mermaid-0y0959vjl16s .node.clickable{cursor:pointer;}#mermaid-0y0959vjl16s .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-0y0959vjl16s .arrowheadPath{fill:lightgrey;}#mermaid-0y0959vjl16s .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-0y0959vjl16s .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-0y0959vjl16s .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-0y0959vjl16s .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-0y0959vjl16s .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-0y0959vjl16s .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-0y0959vjl16s .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-0y0959vjl16s .cluster text{fill:#F9FFFE;}#mermaid-0y0959vjl16s .cluster span{color:#F9FFFE;}#mermaid-0y0959vjl16s div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-0y0959vjl16s .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-0y0959vjl16s rect.text{fill:none;stroke-width:0;}#mermaid-0y0959vjl16s .icon-shape,#mermaid-0y0959vjl16s .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-0y0959vjl16s .icon-shape p,#mermaid-0y0959vjl16s .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-0y0959vjl16s .icon-shape rect,#mermaid-0y0959vjl16s .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-0y0959vjl16s .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-0y0959vjl16s .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-0y0959vjl16s :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}
1. Open Issue Bug Report or Feature Request

2. Fork Repository

3. Create Feature Branch

4. Make Changes Contracts/Tests/Scripts

5. Run Local Tests forge test -vvv

6. Format Code forge fmt

7. Multi-compiler Test solc 0.6.2, 0.6.12, 0.7.0, 0.7.6, 0.8.0

8. Commit Changes Logical commits with clear messages

9. Push to Fork

10. Open Pull Request Fill out PR template

11. Code Review By maintainers/community

12. Address Feedback Update PR as needed

13. CI Checks Pass GitHub Actions

14. Merge Squash or rebase

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#75-125](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L75-L125)

---

## Contributing to Aegis Core ContractsLink copied!

### Setting Up Development EnvironmentLink copied!

Before making changes to Aegis contracts, ensure your environment is properly configured:

1. Install Foundry: Foundry toolchain must be installed (see [Foundry Setup](#6.2))
2. Clone Repository: Clone the Aegis repository with submodules
3. Initialize Submodules: Run `git submodule update --init --recursive`
4. Install Dependencies: Dependencies are managed via git submodules

### Making Changes to ContractsLink copied!

When modifying contracts in `contracts/src/`, follow these guidelines:

File Locations:

- `contracts/src/AegisHook.sol` - Uniswap v4 hook implementation
- `contracts/src/AegisSentinel.sol` - Reactive Network sentinel contract
- `contracts/src/MockOracle.sol` - Price feed oracle for testing
- `contracts/src/GuardianRegistry.sol` - ERC-721/ERC-8004 reputation system

Testing Requirements:

#mermaid-i1u25sr38jb{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-i1u25sr38jb .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-i1u25sr38jb .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-i1u25sr38jb .error-icon{fill:#a44141;}#mermaid-i1u25sr38jb .error-text{fill:#ddd;stroke:#ddd;}#mermaid-i1u25sr38jb .edge-thickness-normal{stroke-width:1px;}#mermaid-i1u25sr38jb .edge-thickness-thick{stroke-width:3.5px;}#mermaid-i1u25sr38jb .edge-pattern-solid{stroke-dasharray:0;}#mermaid-i1u25sr38jb .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-i1u25sr38jb .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-i1u25sr38jb .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-i1u25sr38jb .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-i1u25sr38jb .marker.cross{stroke:lightgrey;}#mermaid-i1u25sr38jb svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-i1u25sr38jb p{margin:0;}#mermaid-i1u25sr38jb .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-i1u25sr38jb .cluster-label text{fill:#F9FFFE;}#mermaid-i1u25sr38jb .cluster-label span{color:#F9FFFE;}#mermaid-i1u25sr38jb .cluster-label span p{background-color:transparent;}#mermaid-i1u25sr38jb .label text,#mermaid-i1u25sr38jb span{fill:#ccc;color:#ccc;}#mermaid-i1u25sr38jb .node rect,#mermaid-i1u25sr38jb .node circle,#mermaid-i1u25sr38jb .node ellipse,#mermaid-i1u25sr38jb .node polygon,#mermaid-i1u25sr38jb .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-i1u25sr38jb .rough-node .label text,#mermaid-i1u25sr38jb .node .label text,#mermaid-i1u25sr38jb .image-shape .label,#mermaid-i1u25sr38jb .icon-shape .label{text-anchor:middle;}#mermaid-i1u25sr38jb .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-i1u25sr38jb .rough-node .label,#mermaid-i1u25sr38jb .node .label,#mermaid-i1u25sr38jb .image-shape .label,#mermaid-i1u25sr38jb .icon-shape .label{text-align:center;}#mermaid-i1u25sr38jb .node.clickable{cursor:pointer;}#mermaid-i1u25sr38jb .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-i1u25sr38jb .arrowheadPath{fill:lightgrey;}#mermaid-i1u25sr38jb .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-i1u25sr38jb .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-i1u25sr38jb .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-i1u25sr38jb .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-i1u25sr38jb .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-i1u25sr38jb .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-i1u25sr38jb .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-i1u25sr38jb .cluster text{fill:#F9FFFE;}#mermaid-i1u25sr38jb .cluster span{color:#F9FFFE;}#mermaid-i1u25sr38jb div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-i1u25sr38jb .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-i1u25sr38jb rect.text{fill:none;stroke-width:0;}#mermaid-i1u25sr38jb .icon-shape,#mermaid-i1u25sr38jb .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-i1u25sr38jb .icon-shape p,#mermaid-i1u25sr38jb .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-i1u25sr38jb .icon-shape rect,#mermaid-i1u25sr38jb .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-i1u25sr38jb .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-i1u25sr38jb .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-i1u25sr38jb :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Code Changes

Unit Tests contracts/test/*.t.sol

Integration Tests Multi-chain simulation

Formatting forge fmt --check

Compilation forge build

Multi-compiler Tests Solidity 0.6.2-0.8.0

Required Test Commands:

CommandPurpose`forge fmt --check`Verify code formatting`forge test -vvv`Run full test suite with verbose output`forge build --skip test --use solc:0.6.2`Test compatibility with Solidity 0.6.2`forge build --skip test --use solc:0.6.12`Test compatibility with Solidity 0.6.12`forge build --skip test --use solc:0.7.0`Test compatibility with Solidity 0.7.0`forge build --skip test --use solc:0.7.6`Test compatibility with Solidity 0.7.6`forge build --skip test --use solc:0.8.0`Test compatibility with Solidity 0.8.0

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#83-100](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L83-L100)

### Contract-Specific ConsiderationsLink copied!

When modifying specific contracts, keep these considerations in mind:

AegisHook.sol:

- Changes to `beforeSwap` function must preserve circuit breaker logic
- Modifications to `panicMode` state transitions must maintain safety guarantees
- Reputation caching logic must remain consistent with Guardian Registry

AegisSentinel.sol:

- Event listener subscriptions must match oracle event signatures
- Cross-chain message formatting must be compatible with destination chains
- Price threshold calculations must not introduce arithmetic errors

MockOracle.sol:

- Price feed updates must emit correct event signatures
- Test scenarios should cover edge cases (zero prices, overflow conditions)

GuardianRegistry.sol:

- ERC-721 compliance must be maintained
- ERC-8004 trustless agent requirements must be satisfied
- Reputation score calculations must be deterministic

---

## Contributing to forge-std SubmoduleLink copied!

### When to Contribute UpstreamLink copied!

Changes to the forge-std library should be contributed upstream when:

1. Adding New Cheatcodes: New Foundry cheatcodes require updates to `contracts/lib/forge-std/src/Vm.sol`
2. Fixing Bugs: Bugs discovered in forge-std utilities (stdError, stdStorage, stdCheats)
3. Improving Documentation: Enhancing forge-std documentation or examples

### Submodule Contribution ProcessLink copied!

#mermaid-v6cpp3z79mq{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-v6cpp3z79mq .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-v6cpp3z79mq .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-v6cpp3z79mq .error-icon{fill:#a44141;}#mermaid-v6cpp3z79mq .error-text{fill:#ddd;stroke:#ddd;}#mermaid-v6cpp3z79mq .edge-thickness-normal{stroke-width:1px;}#mermaid-v6cpp3z79mq .edge-thickness-thick{stroke-width:3.5px;}#mermaid-v6cpp3z79mq .edge-pattern-solid{stroke-dasharray:0;}#mermaid-v6cpp3z79mq .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-v6cpp3z79mq .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-v6cpp3z79mq .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-v6cpp3z79mq .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-v6cpp3z79mq .marker.cross{stroke:lightgrey;}#mermaid-v6cpp3z79mq svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-v6cpp3z79mq p{margin:0;}#mermaid-v6cpp3z79mq .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-v6cpp3z79mq .cluster-label text{fill:#F9FFFE;}#mermaid-v6cpp3z79mq .cluster-label span{color:#F9FFFE;}#mermaid-v6cpp3z79mq .cluster-label span p{background-color:transparent;}#mermaid-v6cpp3z79mq .label text,#mermaid-v6cpp3z79mq span{fill:#ccc;color:#ccc;}#mermaid-v6cpp3z79mq .node rect,#mermaid-v6cpp3z79mq .node circle,#mermaid-v6cpp3z79mq .node ellipse,#mermaid-v6cpp3z79mq .node polygon,#mermaid-v6cpp3z79mq .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-v6cpp3z79mq .rough-node .label text,#mermaid-v6cpp3z79mq .node .label text,#mermaid-v6cpp3z79mq .image-shape .label,#mermaid-v6cpp3z79mq .icon-shape .label{text-anchor:middle;}#mermaid-v6cpp3z79mq .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-v6cpp3z79mq .rough-node .label,#mermaid-v6cpp3z79mq .node .label,#mermaid-v6cpp3z79mq .image-shape .label,#mermaid-v6cpp3z79mq .icon-shape .label{text-align:center;}#mermaid-v6cpp3z79mq .node.clickable{cursor:pointer;}#mermaid-v6cpp3z79mq .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-v6cpp3z79mq .arrowheadPath{fill:lightgrey;}#mermaid-v6cpp3z79mq .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-v6cpp3z79mq .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-v6cpp3z79mq .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-v6cpp3z79mq .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-v6cpp3z79mq .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-v6cpp3z79mq .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-v6cpp3z79mq .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-v6cpp3z79mq .cluster text{fill:#F9FFFE;}#mermaid-v6cpp3z79mq .cluster span{color:#F9FFFE;}#mermaid-v6cpp3z79mq div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-v6cpp3z79mq .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-v6cpp3z79mq rect.text{fill:none;stroke-width:0;}#mermaid-v6cpp3z79mq .icon-shape,#mermaid-v6cpp3z79mq .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-v6cpp3z79mq .icon-shape p,#mermaid-v6cpp3z79mq .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-v6cpp3z79mq .icon-shape rect,#mermaid-v6cpp3z79mq .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-v6cpp3z79mq .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-v6cpp3z79mq .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-v6cpp3z79mq :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Not Upstream

Already Exists

Identify Need for forge-std Change

Check if Already Exists in forge-std Master

Fork foundry-rs/forge-std

Make Changes to forge-std

Update Cheatcodes If adding new cheatcodes

Run ./scripts/vm.py Generate Vm.sol

Test Changes forge test in forge-std

Open PR to foundry-rs/forge-std

Await Upstream Merge

Update Submodule in Aegis git submodule update

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#102-114](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L102-L114)

### Cheatcode UpdatesLink copied!

When adding or modifying cheatcodes in forge-std:

1. Update cheatcodes.json: The cheatcode interface definition is maintained at `https://raw.githubusercontent.com/foundry-rs/foundry/master/crates/cheatcodes/assets/cheatcodes.json`
2. Run vm.py Script: Execute `./scripts/vm.py` from `contracts/lib/forge-std/` directory
3. Review Generated Changes: The script updates `contracts/lib/forge-std/src/Vm.sol`
4. Commit Generated File: Include the updated `Vm.sol` in your commit

Script Usage:

```
# Default: fetch from Foundry repository
./scripts/vm.py
 
# Custom cheatcodes.json path
./scripts/vm.py --from path/to/cheatcodes.json
```

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#106-114](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L106-L114) see also [Cheatcode Generation](#7.3)

### forge-std Code OwnersLink copied!

Pull requests to forge-std are reviewed by the following code owners:

```
@danipopes @klkvr @mattsse @grandizzy @yash-atreya @zerosnacks
```

These maintainers review changes to ensure compatibility across the Foundry ecosystem.

Sources: [contracts/lib/forge-std/.github/CODEOWNERS#1](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/CODEOWNERS#L1-L1)

---

## Code Review ProcessLink copied!

### Review ResponsibilitiesLink copied!

#mermaid-twicgxoq65d{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-twicgxoq65d .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-twicgxoq65d .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-twicgxoq65d .error-icon{fill:#a44141;}#mermaid-twicgxoq65d .error-text{fill:#ddd;stroke:#ddd;}#mermaid-twicgxoq65d .edge-thickness-normal{stroke-width:1px;}#mermaid-twicgxoq65d .edge-thickness-thick{stroke-width:3.5px;}#mermaid-twicgxoq65d .edge-pattern-solid{stroke-dasharray:0;}#mermaid-twicgxoq65d .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-twicgxoq65d .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-twicgxoq65d .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-twicgxoq65d .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-twicgxoq65d .marker.cross{stroke:lightgrey;}#mermaid-twicgxoq65d svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-twicgxoq65d p{margin:0;}#mermaid-twicgxoq65d .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-twicgxoq65d .cluster-label text{fill:#F9FFFE;}#mermaid-twicgxoq65d .cluster-label span{color:#F9FFFE;}#mermaid-twicgxoq65d .cluster-label span p{background-color:transparent;}#mermaid-twicgxoq65d .label text,#mermaid-twicgxoq65d span{fill:#ccc;color:#ccc;}#mermaid-twicgxoq65d .node rect,#mermaid-twicgxoq65d .node circle,#mermaid-twicgxoq65d .node ellipse,#mermaid-twicgxoq65d .node polygon,#mermaid-twicgxoq65d .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-twicgxoq65d .rough-node .label text,#mermaid-twicgxoq65d .node .label text,#mermaid-twicgxoq65d .image-shape .label,#mermaid-twicgxoq65d .icon-shape .label{text-anchor:middle;}#mermaid-twicgxoq65d .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-twicgxoq65d .rough-node .label,#mermaid-twicgxoq65d .node .label,#mermaid-twicgxoq65d .image-shape .label,#mermaid-twicgxoq65d .icon-shape .label{text-align:center;}#mermaid-twicgxoq65d .node.clickable{cursor:pointer;}#mermaid-twicgxoq65d .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-twicgxoq65d .arrowheadPath{fill:lightgrey;}#mermaid-twicgxoq65d .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-twicgxoq65d .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-twicgxoq65d .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-twicgxoq65d .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-twicgxoq65d .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-twicgxoq65d .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-twicgxoq65d .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-twicgxoq65d .cluster text{fill:#F9FFFE;}#mermaid-twicgxoq65d .cluster span{color:#F9FFFE;}#mermaid-twicgxoq65d div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-twicgxoq65d .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-twicgxoq65d rect.text{fill:none;stroke-width:0;}#mermaid-twicgxoq65d .icon-shape,#mermaid-twicgxoq65d .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-twicgxoq65d .icon-shape p,#mermaid-twicgxoq65d .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-twicgxoq65d .icon-shape rect,#mermaid-twicgxoq65d .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-twicgxoq65d .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-twicgxoq65d .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-twicgxoq65d :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Conflicts Exist

No Conflicts

Pull Request Opened

Automated Checks CI/CD Pipeline

Community Review Any member can review

Maintainer Review Core team review

Provide Feedback

Author Addresses Feedback

Check for Conflicting Feedback

Code Owner Provides Guidance if Conflicts

Approval LGTM

Merge PR Squash or Rebase

### Review GuidelinesLink copied!

What Reviewers Should Focus On:

1. Correctness: Does the change make sense for Aegis?
2. Improvement: Does this make Aegis better, even if only incrementally?
3. Bugs: Are there clear bugs or larger scale issues?
4. Commit Messages: Are commit messages readable and correct?

What Reviewers Should Avoid:

- Demanding perfection - incremental improvement is sufficient
- Micro-optimizations that don't significantly impact functionality
- Blocking PRs without clear explanation
- Dismissive or disrespectful comments

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#135-169](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L135-L169)

### Handling NitsLink copied!

Nits (non-blocking suggestions for small improvements) should be clearly marked:

```
Nit: Consider renaming `guardianScore` to `reputationScore` for consistency.
But this is not blocking.
```

Reviewers should hide resolved or mistaken comments to keep conversation flow clear.

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#164-168](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L164-L168)

---

## Continuous Integration RequirementsLink copied!

### CI WorkflowLink copied!

The Aegis project uses GitHub Actions for continuous integration. The workflow is defined in `.github/workflows/test.yml`:

#mermaid-19bruaxojrn{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-19bruaxojrn .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-19bruaxojrn .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-19bruaxojrn .error-icon{fill:#a44141;}#mermaid-19bruaxojrn .error-text{fill:#ddd;stroke:#ddd;}#mermaid-19bruaxojrn .edge-thickness-normal{stroke-width:1px;}#mermaid-19bruaxojrn .edge-thickness-thick{stroke-width:3.5px;}#mermaid-19bruaxojrn .edge-pattern-solid{stroke-dasharray:0;}#mermaid-19bruaxojrn .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-19bruaxojrn .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-19bruaxojrn .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-19bruaxojrn .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-19bruaxojrn .marker.cross{stroke:lightgrey;}#mermaid-19bruaxojrn svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-19bruaxojrn p{margin:0;}#mermaid-19bruaxojrn .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-19bruaxojrn .cluster-label text{fill:#F9FFFE;}#mermaid-19bruaxojrn .cluster-label span{color:#F9FFFE;}#mermaid-19bruaxojrn .cluster-label span p{background-color:transparent;}#mermaid-19bruaxojrn .label text,#mermaid-19bruaxojrn span{fill:#ccc;color:#ccc;}#mermaid-19bruaxojrn .node rect,#mermaid-19bruaxojrn .node circle,#mermaid-19bruaxojrn .node ellipse,#mermaid-19bruaxojrn .node polygon,#mermaid-19bruaxojrn .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-19bruaxojrn .rough-node .label text,#mermaid-19bruaxojrn .node .label text,#mermaid-19bruaxojrn .image-shape .label,#mermaid-19bruaxojrn .icon-shape .label{text-anchor:middle;}#mermaid-19bruaxojrn .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-19bruaxojrn .rough-node .label,#mermaid-19bruaxojrn .node .label,#mermaid-19bruaxojrn .image-shape .label,#mermaid-19bruaxojrn .icon-shape .label{text-align:center;}#mermaid-19bruaxojrn .node.clickable{cursor:pointer;}#mermaid-19bruaxojrn .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-19bruaxojrn .arrowheadPath{fill:lightgrey;}#mermaid-19bruaxojrn .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-19bruaxojrn .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-19bruaxojrn .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-19bruaxojrn .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-19bruaxojrn .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-19bruaxojrn .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-19bruaxojrn .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-19bruaxojrn .cluster text{fill:#F9FFFE;}#mermaid-19bruaxojrn .cluster span{color:#F9FFFE;}#mermaid-19bruaxojrn div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-19bruaxojrn .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-19bruaxojrn rect.text{fill:none;stroke-width:0;}#mermaid-19bruaxojrn .icon-shape,#mermaid-19bruaxojrn .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-19bruaxojrn .icon-shape p,#mermaid-19bruaxojrn .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-19bruaxojrn .icon-shape rect,#mermaid-19bruaxojrn .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-19bruaxojrn .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-19bruaxojrn .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-19bruaxojrn :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Pass

Pass

Pass

Pass

Fail

Fail

Fail

Fail

Push to Branch

Checkout Code actions/checkout

Setup Foundry Install toolchain

Cache Dependencies lib/ directory

Initialize Submodules git submodule update

Format Check forge fmt --check

Build Check forge build

Test Run forge test -vvv

Multi-compiler Builds solc 0.6.2-0.8.0

CI Pass ✓

CI Fail ✗

### CI Pass CriteriaLink copied!

All of the following must pass for a PR to be merged:

CheckCommandPurposeFormatting`forge fmt --check`Code style consistencyCompilation`forge build`Syntax and type checkingTest Suite`forge test -vvv`Functional correctnessSolidity 0.6.2`forge build --skip test --use solc:0.6.2`Backward compatibilitySolidity 0.6.12`forge build --skip test --use solc:0.6.12`Backward compatibilitySolidity 0.7.0`forge build --skip test --use solc:0.7.0`Backward compatibilitySolidity 0.7.6`forge build --skip test --use solc:0.7.6`Backward compatibilitySolidity 0.8.0`forge build --skip test --use solc:0.8.0`Backward compatibility

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#83-100](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L83-L100)

---

## Commit ConventionsLink copied!

### Commit StructureLink copied!

Commits should be logically grouped and represent single, coherent changes:

#mermaid-ojvyw9zo11{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ojvyw9zo11 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ojvyw9zo11 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ojvyw9zo11 .error-icon{fill:#a44141;}#mermaid-ojvyw9zo11 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ojvyw9zo11 .edge-thickness-normal{stroke-width:1px;}#mermaid-ojvyw9zo11 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ojvyw9zo11 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ojvyw9zo11 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ojvyw9zo11 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ojvyw9zo11 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ojvyw9zo11 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ojvyw9zo11 .marker.cross{stroke:lightgrey;}#mermaid-ojvyw9zo11 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ojvyw9zo11 p{margin:0;}#mermaid-ojvyw9zo11 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ojvyw9zo11 .cluster-label text{fill:#F9FFFE;}#mermaid-ojvyw9zo11 .cluster-label span{color:#F9FFFE;}#mermaid-ojvyw9zo11 .cluster-label span p{background-color:transparent;}#mermaid-ojvyw9zo11 .label text,#mermaid-ojvyw9zo11 span{fill:#ccc;color:#ccc;}#mermaid-ojvyw9zo11 .node rect,#mermaid-ojvyw9zo11 .node circle,#mermaid-ojvyw9zo11 .node ellipse,#mermaid-ojvyw9zo11 .node polygon,#mermaid-ojvyw9zo11 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ojvyw9zo11 .rough-node .label text,#mermaid-ojvyw9zo11 .node .label text,#mermaid-ojvyw9zo11 .image-shape .label,#mermaid-ojvyw9zo11 .icon-shape .label{text-anchor:middle;}#mermaid-ojvyw9zo11 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ojvyw9zo11 .rough-node .label,#mermaid-ojvyw9zo11 .node .label,#mermaid-ojvyw9zo11 .image-shape .label,#mermaid-ojvyw9zo11 .icon-shape .label{text-align:center;}#mermaid-ojvyw9zo11 .node.clickable{cursor:pointer;}#mermaid-ojvyw9zo11 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ojvyw9zo11 .arrowheadPath{fill:lightgrey;}#mermaid-ojvyw9zo11 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ojvyw9zo11 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ojvyw9zo11 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ojvyw9zo11 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ojvyw9zo11 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ojvyw9zo11 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ojvyw9zo11 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ojvyw9zo11 .cluster text{fill:#F9FFFE;}#mermaid-ojvyw9zo11 .cluster span{color:#F9FFFE;}#mermaid-ojvyw9zo11 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ojvyw9zo11 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ojvyw9zo11 rect.text{fill:none;stroke-width:0;}#mermaid-ojvyw9zo11 .icon-shape,#mermaid-ojvyw9zo11 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ojvyw9zo11 .icon-shape p,#mermaid-ojvyw9zo11 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ojvyw9zo11 .icon-shape rect,#mermaid-ojvyw9zo11 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ojvyw9zo11 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ojvyw9zo11 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ojvyw9zo11 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Feature Implementation

Commit 1: Add price threshold check to AegisSentinel.sol

Commit 2: Add test for threshold to AegisSentinel.t.sol

Commit 3: Update deployment script to set threshold parameter

Squash Checkpoint Commits Remove 'WIP' or 'fix typo' commits

### Commit Message FormatLink copied!

Good Commit Messages:

- `feat: Add reputation boost for heroic interventions in AegisHook`
- `fix: Correct arithmetic overflow in Guardian Registry score calculation`
- `test: Add integration test for cross-chain panic mode activation`
- `docs: Update deployment guide with Unichain RPC endpoints`

Avoid:

- `WIP`
- `fix`
- `update stuff`
- `changes`

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#116-120](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L116-L120)

---

## Issue ReportingLink copied!

### Bug ReportsLink copied!

When filing a bug report, include:

InformationExampleFoundry Version`forge 0.2.0 (abc1234 2024-01-15)`Platform`macOS 14.0 (M1)` or `Ubuntu 22.04` or `Windows 11`Code SnippetMinimal reproducible exampleSteps to ReproduceNumbered list of exact commandsExpected BehaviorWhat should happenActual BehaviorWhat actually happens

Minimal Reproducible Example:

- Strip down to smallest possible contract that reproduces bug
- Remove all unnecessary dependencies
- Include only relevant functions

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#49-66](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L49-L66)

### Feature RequestsLink copied!

When requesting a feature, provide:

1. Detailed Explanation: What feature you want and why
2. Use Cases: How this feature would be used in practice
3. Examples: Other tools that have similar features
4. Impact: How many users/use cases would benefit

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#68-73](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L68-L73)

---

## Pull Request TemplateLink copied!

When opening a pull request, fill out the template with:

### DescriptionLink copied!

Brief summary of changes made and problem solved.

### MotivationLink copied!

Why these changes are necessary.

### Changes MadeLink copied!

- List of specific changes
- Files modified
- Functions added/modified/removed

### TestingLink copied!

- Unit tests added/modified
- Integration tests performed
- Manual testing steps

### ChecklistLink copied!

- `forge fmt --check` passes
- `forge test -vvv` passes
- Multi-compiler tests pass
- Documentation updated if needed
- CHANGELOG updated if applicable

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#122-125](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L122-L125)

---

## Getting HelpLink copied!

### Support ChannelsLink copied!

ChannelPurposeResponse TimeGitHub DiscussionsQuestions about Aegis architecture1-3 daysGitHub IssuesBug reports and feature requests1-7 daysFoundry Support TelegramFoundry tooling questionsHoursFoundry Dev TelegramDevelopment discussionHours to days

### Documentation ResourcesLink copied!

- Aegis Documentation: This wiki
- Foundry Book: [https://book.getfoundry.sh/](https://book.getfoundry.sh/)
- Uniswap v4 Docs: Uniswap v4 documentation
- Reactive Network Docs: Reactive Network documentation

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#39-47](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L39-L47)

---

## Code of ConductLink copied!

The Aegis project adheres to the Rust Code of Conduct. All contributors are expected to:

1. Be respectful and constructive in all interactions
2. Focus on what is best for the community
3. Show empathy towards other community members
4. Accept constructive criticism gracefully

Violations can be reported to project maintainers.

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#12-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L12-L16)

---

## Special Contribution TypesLink copied!

### Spelling and GrammarLink copied!

At this time, contributions that only fix spelling or grammatical errors will not be accepted. Such fixes should be bundled with substantive changes.

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#34-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L34-L37)

### Abandoned Pull RequestsLink copied!

If a PR appears abandoned:

1. Check with Contributor: Politely ask if they plan to continue
2. Offer to Take Over: Ask permission to complete their work
3. Preserve Credit: Use `Author:` or `Co-authored-by:` metadata tags
4. Wait Reasonable Time: Give at least 2 weeks before considering abandoned

Sources: [contracts/lib/forge-std/CONTRIBUTING.md#174-176](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/CONTRIBUTING.md#L174-L176)