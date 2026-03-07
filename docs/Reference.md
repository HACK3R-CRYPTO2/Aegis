# ReferenceLink copied!
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/README.md)

This section provides reference documentation for supporting libraries, configuration files, code generation scripts, and project metadata used in the Aegis codebase. The reference materials cover foundational components that enable development, testing, and deployment of the Aegis cross-chain circuit breaker system.

The reference section is organized into five subsections covering distinct aspects of the project infrastructure:

## Reference CategoriesLink copied!

SubsectionContentPrimary Audience7.1 Foundry Configuration ReferenceDetailed breakdown of `foundry.toml` settings including compiler options, network configurations, and build profilesDevelopers modifying build settings or adding new networks7.2 Forge Standard LibraryDocumentation of forge-std utilities (`Test.sol`, `StdCheats`, `StdStorage`, `console2`, etc.) used throughout the test suiteDevelopers writing or debugging tests7.3 Cheatcode GenerationExplanation of the `vm.py` script that generates `Vm.sol` and `VmSafe.sol` from `cheatcodes.json`Developers working with Foundry internals or updating forge-std7.4 Contributing GuidelinesGuidelines for contributing to forge-std and best practices for Aegis developmentExternal contributors and core team members7.5 License InformationLicense details for Aegis contracts (MIT) and dependencies (MIT/Apache 2.0)Legal compliance and auditors

Sources: [contracts/lib/forge-std/README.md#1-267](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L267)

## Reference Material ArchitectureLink copied!

The following diagram shows how reference materials relate to the Aegis development workflow:

#mermaid-od3qt56iwu{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-od3qt56iwu .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-od3qt56iwu .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-od3qt56iwu .error-icon{fill:#a44141;}#mermaid-od3qt56iwu .error-text{fill:#ddd;stroke:#ddd;}#mermaid-od3qt56iwu .edge-thickness-normal{stroke-width:1px;}#mermaid-od3qt56iwu .edge-thickness-thick{stroke-width:3.5px;}#mermaid-od3qt56iwu .edge-pattern-solid{stroke-dasharray:0;}#mermaid-od3qt56iwu .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-od3qt56iwu .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-od3qt56iwu .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-od3qt56iwu .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-od3qt56iwu .marker.cross{stroke:lightgrey;}#mermaid-od3qt56iwu svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-od3qt56iwu p{margin:0;}#mermaid-od3qt56iwu .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-od3qt56iwu .cluster-label text{fill:#F9FFFE;}#mermaid-od3qt56iwu .cluster-label span{color:#F9FFFE;}#mermaid-od3qt56iwu .cluster-label span p{background-color:transparent;}#mermaid-od3qt56iwu .label text,#mermaid-od3qt56iwu span{fill:#ccc;color:#ccc;}#mermaid-od3qt56iwu .node rect,#mermaid-od3qt56iwu .node circle,#mermaid-od3qt56iwu .node ellipse,#mermaid-od3qt56iwu .node polygon,#mermaid-od3qt56iwu .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-od3qt56iwu .rough-node .label text,#mermaid-od3qt56iwu .node .label text,#mermaid-od3qt56iwu .image-shape .label,#mermaid-od3qt56iwu .icon-shape .label{text-anchor:middle;}#mermaid-od3qt56iwu .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-od3qt56iwu .rough-node .label,#mermaid-od3qt56iwu .node .label,#mermaid-od3qt56iwu .image-shape .label,#mermaid-od3qt56iwu .icon-shape .label{text-align:center;}#mermaid-od3qt56iwu .node.clickable{cursor:pointer;}#mermaid-od3qt56iwu .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-od3qt56iwu .arrowheadPath{fill:lightgrey;}#mermaid-od3qt56iwu .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-od3qt56iwu .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-od3qt56iwu .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-od3qt56iwu .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-od3qt56iwu .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-od3qt56iwu .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-od3qt56iwu .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-od3qt56iwu .cluster text{fill:#F9FFFE;}#mermaid-od3qt56iwu .cluster span{color:#F9FFFE;}#mermaid-od3qt56iwu div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-od3qt56iwu .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-od3qt56iwu rect.text{fill:none;stroke-width:0;}#mermaid-od3qt56iwu .icon-shape,#mermaid-od3qt56iwu .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-od3qt56iwu .icon-shape p,#mermaid-od3qt56iwu .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-od3qt56iwu .icon-shape rect,#mermaid-od3qt56iwu .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-od3qt56iwu .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-od3qt56iwu .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-od3qt56iwu :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Generated Code

Build Artifacts

Aegis Source Code

External Dependencies

Configuration Files

configures

configures

defines networks

tracks

tracks

tracks

provides Test.sol

provides hook interfaces

provides AbstractReactive

forge build

forge build

cached

vm.py

vm.py

imported by

foundry.toml Compiler & Network Settings

.gitmodules Dependency Tracking

lib/forge-std/ Testing Library

lib/uniswap-hooks/ Uniswap v4 Framework

lib/system-smart-contracts/ Reactive Network SDK

src/*.sol Core Contracts

test/*.t.sol Test Suite

script/*.s.sol Deployment Scripts

out/ Compiled ABIs & Bytecode

cache/ Compiler Cache

Vm.sol Cheatcode Interface

VmSafe.sol Safe Cheatcodes

cheatcodes.json Cheatcode Definitions

Sources: [contracts/lib/forge-std/README.md#1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L11)[contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml)[contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules)

## Dependency ManagementLink copied!

Aegis uses git submodules to manage external dependencies, ensuring reproducible builds and version pinning. The dependency tree is defined in [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules) and tracks three primary libraries:

### Core DependenciesLink copied!

#mermaid-e7mjmvll5ok{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-e7mjmvll5ok .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-e7mjmvll5ok .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-e7mjmvll5ok .error-icon{fill:#a44141;}#mermaid-e7mjmvll5ok .error-text{fill:#ddd;stroke:#ddd;}#mermaid-e7mjmvll5ok .edge-thickness-normal{stroke-width:1px;}#mermaid-e7mjmvll5ok .edge-thickness-thick{stroke-width:3.5px;}#mermaid-e7mjmvll5ok .edge-pattern-solid{stroke-dasharray:0;}#mermaid-e7mjmvll5ok .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-e7mjmvll5ok .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-e7mjmvll5ok .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-e7mjmvll5ok .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-e7mjmvll5ok .marker.cross{stroke:lightgrey;}#mermaid-e7mjmvll5ok svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-e7mjmvll5ok p{margin:0;}#mermaid-e7mjmvll5ok .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-e7mjmvll5ok .cluster-label text{fill:#F9FFFE;}#mermaid-e7mjmvll5ok .cluster-label span{color:#F9FFFE;}#mermaid-e7mjmvll5ok .cluster-label span p{background-color:transparent;}#mermaid-e7mjmvll5ok .label text,#mermaid-e7mjmvll5ok span{fill:#ccc;color:#ccc;}#mermaid-e7mjmvll5ok .node rect,#mermaid-e7mjmvll5ok .node circle,#mermaid-e7mjmvll5ok .node ellipse,#mermaid-e7mjmvll5ok .node polygon,#mermaid-e7mjmvll5ok .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-e7mjmvll5ok .rough-node .label text,#mermaid-e7mjmvll5ok .node .label text,#mermaid-e7mjmvll5ok .image-shape .label,#mermaid-e7mjmvll5ok .icon-shape .label{text-anchor:middle;}#mermaid-e7mjmvll5ok .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-e7mjmvll5ok .rough-node .label,#mermaid-e7mjmvll5ok .node .label,#mermaid-e7mjmvll5ok .image-shape .label,#mermaid-e7mjmvll5ok .icon-shape .label{text-align:center;}#mermaid-e7mjmvll5ok .node.clickable{cursor:pointer;}#mermaid-e7mjmvll5ok .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-e7mjmvll5ok .arrowheadPath{fill:lightgrey;}#mermaid-e7mjmvll5ok .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-e7mjmvll5ok .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-e7mjmvll5ok .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-e7mjmvll5ok .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-e7mjmvll5ok .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-e7mjmvll5ok .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-e7mjmvll5ok .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-e7mjmvll5ok .cluster text{fill:#F9FFFE;}#mermaid-e7mjmvll5ok .cluster span{color:#F9FFFE;}#mermaid-e7mjmvll5ok div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-e7mjmvll5ok .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-e7mjmvll5ok rect.text{fill:none;stroke-width:0;}#mermaid-e7mjmvll5ok .icon-shape,#mermaid-e7mjmvll5ok .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-e7mjmvll5ok .icon-shape p,#mermaid-e7mjmvll5ok .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-e7mjmvll5ok .icon-shape rect,#mermaid-e7mjmvll5ok .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-e7mjmvll5ok .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-e7mjmvll5ok .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-e7mjmvll5ok :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

system-smart-contracts (Reactive)

uniswap-hooks (Protocol)

forge-std (Testing)

Aegis Contracts

inherits

aggregates

aggregates

imports

inherits

implements

inherits

implements

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

AegisIntegrationTest.t.sol

Test.sol

StdCheats.sol

StdStorage.sol

console2.sol

BaseHook.sol

IHooks.sol

PoolManager.sol

AbstractReactive.sol

IReactive.sol

Sources: [contracts/lib/forge-std/README.md#1-267](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L267)[contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules)

## Configuration and Build SystemLink copied!

The Aegis build system is configured through [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml) which defines:

- Compiler Settings: Solidity version (`0.8.26`), optimizer runs, EVM version
- Network Configurations: RPC endpoints for Sepolia, Reactive Network, and Unichain
- Build Profiles: Default, CI, and production profiles with different settings
- Remappings: Path aliases for clean imports (e.g., `forge-std/` → `lib/forge-std/src/`)

See subsection 7.1 for detailed configuration reference.

Sources: [contracts/lib/forge-std/README.md#9-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L9-L11)

## Testing InfrastructureLink copied!

Aegis uses the Forge Standard Library for testing, which provides:

- Cheatcodes: VM manipulation via `vm.prank()`, `vm.deal()`, `vm.expectRevert()`
- Storage Access: Direct storage manipulation with `stdstore`
- Assertions: Enhanced test assertions beyond basic Solidity `assert()`
- Logging: Trace-decoded console output via `console2.log()`

All test contracts inherit from `Test.sol` ([contracts/lib/forge-std/src/Test.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Test.sol)), which aggregates these utilities. See subsection 7.2 for detailed forge-std documentation.

Sources: [contracts/lib/forge-std/README.md#13-246](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L13-L246)

## Cheatcode Interface GenerationLink copied!

The `Vm.sol` and `VmSafe.sol` interfaces used by forge-std are generated from a canonical `cheatcodes.json` definition file using the `vm.py` Python script. This ensures type-safe access to Foundry's cheatcode precompiles. See subsection 7.3 for details on the generation process.

Sources: [contracts/lib/forge-std/README.md#1-267](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L267)

## Contributing and LicensingLink copied!

- Contributing: See subsection 7.4 for guidelines on contributing to forge-std and Aegis development best practices
- Licensing: Aegis contracts are MIT-licensed (copyright 2023 saucepoint); forge-std offers dual MIT/Apache 2.0 licensing. See subsection 7.5 for complete license information.

Sources: [contracts/lib/forge-std/README.md#248-266](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L248-L266)[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)

## NavigationLink copied!

For development workflow and deployment information, see:

- Build System: Section 6.4
- Network Configuration: Section 5.2
- Deployment Scripts: Section 5.1
- Testing and CI/CD: Section 6.5

## Forge Standard Library IntegrationLink copied!

The Aegis project uses forge-std as a Git submodule located at [contracts/lib/forge-std](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std) to provide testing capabilities. All test contracts in [contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/test/) inherit from `Test.sol`, which aggregates forge-std functionality.

### Dependency StructureLink copied!

#mermaid-3fh6exhllwe{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-3fh6exhllwe .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-3fh6exhllwe .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-3fh6exhllwe .error-icon{fill:#a44141;}#mermaid-3fh6exhllwe .error-text{fill:#ddd;stroke:#ddd;}#mermaid-3fh6exhllwe .edge-thickness-normal{stroke-width:1px;}#mermaid-3fh6exhllwe .edge-thickness-thick{stroke-width:3.5px;}#mermaid-3fh6exhllwe .edge-pattern-solid{stroke-dasharray:0;}#mermaid-3fh6exhllwe .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-3fh6exhllwe .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-3fh6exhllwe .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-3fh6exhllwe .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-3fh6exhllwe .marker.cross{stroke:lightgrey;}#mermaid-3fh6exhllwe svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-3fh6exhllwe p{margin:0;}#mermaid-3fh6exhllwe .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-3fh6exhllwe .cluster-label text{fill:#F9FFFE;}#mermaid-3fh6exhllwe .cluster-label span{color:#F9FFFE;}#mermaid-3fh6exhllwe .cluster-label span p{background-color:transparent;}#mermaid-3fh6exhllwe .label text,#mermaid-3fh6exhllwe span{fill:#ccc;color:#ccc;}#mermaid-3fh6exhllwe .node rect,#mermaid-3fh6exhllwe .node circle,#mermaid-3fh6exhllwe .node ellipse,#mermaid-3fh6exhllwe .node polygon,#mermaid-3fh6exhllwe .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-3fh6exhllwe .rough-node .label text,#mermaid-3fh6exhllwe .node .label text,#mermaid-3fh6exhllwe .image-shape .label,#mermaid-3fh6exhllwe .icon-shape .label{text-anchor:middle;}#mermaid-3fh6exhllwe .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-3fh6exhllwe .rough-node .label,#mermaid-3fh6exhllwe .node .label,#mermaid-3fh6exhllwe .image-shape .label,#mermaid-3fh6exhllwe .icon-shape .label{text-align:center;}#mermaid-3fh6exhllwe .node.clickable{cursor:pointer;}#mermaid-3fh6exhllwe .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-3fh6exhllwe .arrowheadPath{fill:lightgrey;}#mermaid-3fh6exhllwe .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-3fh6exhllwe .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-3fh6exhllwe .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3fh6exhllwe .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-3fh6exhllwe .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3fh6exhllwe .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-3fh6exhllwe .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-3fh6exhllwe .cluster text{fill:#F9FFFE;}#mermaid-3fh6exhllwe .cluster span{color:#F9FFFE;}#mermaid-3fh6exhllwe div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-3fh6exhllwe .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-3fh6exhllwe rect.text{fill:none;stroke-width:0;}#mermaid-3fh6exhllwe .icon-shape,#mermaid-3fh6exhllwe .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-3fh6exhllwe .icon-shape p,#mermaid-3fh6exhllwe .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-3fh6exhllwe .icon-shape rect,#mermaid-3fh6exhllwe .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-3fh6exhllwe .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-3fh6exhllwe .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-3fh6exhllwe :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Foundry Core

forge-std Library

Aegis Test Suite

inherits

inherits

aggregates

aggregates

aggregates

aggregates

aggregates

uses

uses

implemented by

AegisIntegrationTest.t.sol

Test Base Contracts

Test.sol Aggregator Contract

StdCheats.sol Prank/Deal Utils

StdAssertions.sol Assertion Helpers

StdStorage.sol Storage Manipulation

StdError.sol Error Constants

console2.sol Logging

Vm.sol Cheatcode Interface

forge VM Cheatcode Implementation

Sources: [contracts/lib/forge-std/README.md#1-267](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L267)

### Core ComponentsLink copied!

The forge-std library provides several utility contracts that Aegis tests leverage:

ComponentPurposeUsed In Aegis For`Test.sol`Base test contract aggregating all utilitiesInherited by all `*.t.sol` files`StdCheats.sol`Prank, deal, hoax wrappersSimulating user interactions and funding accounts`StdStorage.sol`Storage slot manipulationFinding and modifying contract storage directly`StdAssertions.sol`Enhanced assertionsVerifying contract state and behavior`StdError.sol`Compiler error constantsTesting revert cases with `vm.expectRevert()``console2.sol`Decoded loggingDebugging test execution with trace output`Vm.sol`Cheatcode interfaceAccessing all Foundry cheatcodes

Sources: [contracts/lib/forge-std/README.md#13-246](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L13-L246)

### Testing Utilities in AegisLink copied!

#mermaid-mkbi7eewwoo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-mkbi7eewwoo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-mkbi7eewwoo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-mkbi7eewwoo .error-icon{fill:#a44141;}#mermaid-mkbi7eewwoo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-mkbi7eewwoo .edge-thickness-normal{stroke-width:1px;}#mermaid-mkbi7eewwoo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-mkbi7eewwoo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-mkbi7eewwoo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-mkbi7eewwoo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-mkbi7eewwoo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-mkbi7eewwoo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-mkbi7eewwoo .marker.cross{stroke:lightgrey;}#mermaid-mkbi7eewwoo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-mkbi7eewwoo p{margin:0;}#mermaid-mkbi7eewwoo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-mkbi7eewwoo .cluster-label text{fill:#F9FFFE;}#mermaid-mkbi7eewwoo .cluster-label span{color:#F9FFFE;}#mermaid-mkbi7eewwoo .cluster-label span p{background-color:transparent;}#mermaid-mkbi7eewwoo .label text,#mermaid-mkbi7eewwoo span{fill:#ccc;color:#ccc;}#mermaid-mkbi7eewwoo .node rect,#mermaid-mkbi7eewwoo .node circle,#mermaid-mkbi7eewwoo .node ellipse,#mermaid-mkbi7eewwoo .node polygon,#mermaid-mkbi7eewwoo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-mkbi7eewwoo .rough-node .label text,#mermaid-mkbi7eewwoo .node .label text,#mermaid-mkbi7eewwoo .image-shape .label,#mermaid-mkbi7eewwoo .icon-shape .label{text-anchor:middle;}#mermaid-mkbi7eewwoo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-mkbi7eewwoo .rough-node .label,#mermaid-mkbi7eewwoo .node .label,#mermaid-mkbi7eewwoo .image-shape .label,#mermaid-mkbi7eewwoo .icon-shape .label{text-align:center;}#mermaid-mkbi7eewwoo .node.clickable{cursor:pointer;}#mermaid-mkbi7eewwoo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-mkbi7eewwoo .arrowheadPath{fill:lightgrey;}#mermaid-mkbi7eewwoo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-mkbi7eewwoo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-mkbi7eewwoo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-mkbi7eewwoo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-mkbi7eewwoo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-mkbi7eewwoo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-mkbi7eewwoo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-mkbi7eewwoo .cluster text{fill:#F9FFFE;}#mermaid-mkbi7eewwoo .cluster span{color:#F9FFFE;}#mermaid-mkbi7eewwoo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-mkbi7eewwoo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-mkbi7eewwoo rect.text{fill:none;stroke-width:0;}#mermaid-mkbi7eewwoo .icon-shape,#mermaid-mkbi7eewwoo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-mkbi7eewwoo .icon-shape p,#mermaid-mkbi7eewwoo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-mkbi7eewwoo .icon-shape rect,#mermaid-mkbi7eewwoo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-mkbi7eewwoo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-mkbi7eewwoo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-mkbi7eewwoo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Contract Interactions

forge-std Utilities

Test Scenarios

uses

uses

uses

uses

uses

simulates caller

expects revert

modifies storage

Price Update Monitoring Test

Circuit Breaker Activation Test

Reputation Boost Test

vm.expectRevert() StdError.arithmeticError

vm.prank(address) Simulate msg.sender

vm.deal(address, uint) Fund test accounts

stdstore.target().sig() Manipulate storage

console2.log() Debug output

MockOracle updatePrice()

AegisHook beforeSwap()

GuardianRegistry recordFeedback()

Sources: [contracts/lib/forge-std/README.md#20-163](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L20-L163)

## Remappings and Import PathsLink copied!

The forge-std library is mapped in [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/foundry.toml) to enable clean import statements:

```
forge-std/ = lib/forge-std/src/
```

This allows Aegis test files to import using:

```
import "forge-std/Test.sol";
```

Instead of relative paths like:

```
import "../lib/forge-std/src/Test.sol";
```

### Import Pattern in Test FilesLink copied!

Aegis test contracts follow this standard pattern:

```
[test file] -> imports "forge-std/Test.sol" -> inherits Test -> gains access to vm, console2, stdstore
```

The `vm` variable (type `Vm`) is automatically available in any contract inheriting from `Test`, providing access to all Foundry cheatcodes defined in [contracts/lib/forge-std/src/Vm.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/src/Vm.sol)

Sources: [contracts/lib/forge-std/README.md#10-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L10-L11)

## Key forge-std Features Used by AegisLink copied!

### StdError ConstantsLink copied!

The `StdError` contract provides constants for common Solidity error types. Aegis uses these in [test/AegisIntegrationTest.t.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/test/AegisIntegrationTest.t.sol) to verify expected reverts:

Error ConstantSolidity ErrorUsage in Aegis`arithmeticError`Arithmetic overflow/underflowTesting uint256 boundary conditions`assertionError``assert()` failureVerifying invariants`divisionError`Division by zeroNot currently used`enumConversionError`Invalid enum castNot currently used`encodeStorageError`Storage encoding errorNot currently used`popError`Pop from empty arrayNot currently used`indexOOBError`Array index out of boundsNot currently used`memOverflowError`Memory allocation overflowNot currently used`zeroVarError`Zero-initialized variableNot currently used

Example Usage Pattern:

```
vm.expectRevert(stdError.arithmeticError);
contractUnderTest.functionThatOverflows();
```

Sources: [contracts/lib/forge-std/README.md#14-43](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L14-L43)

### StdStorage for State ManipulationLink copied!

The `stdStorage` library enables finding and writing to arbitrary storage slots without knowing the storage layout. This is particularly useful for:

- Setting up test preconditions by directly modifying contract state
- Testing behavior with unusual storage values
- Bypassing access control for testing internal state

Pattern:

```
using stdStorage for StdStorage;
 
// Find slot for public variable
uint256 slot = stdstore
    .target(contractAddress)
    .sig("variableName()")
    .find();
 
// Write to slot
stdstore
    .target(contractAddress)
    .sig("variableName()")
    .checked_write(newValue);
```

The library handles:

- Simple storage variables
- Mappings (using `.with_key(key)`)
- Nested mappings (multiple `.with_key()` calls)
- Structs (using `.depth(fieldIndex)`)

Sources: [contracts/lib/forge-std/README.md#46-163](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L46-L163)

### Cheat Wrappers (hoax, startHoax)Link copied!

The `hoax` and `startHoax` functions combine `vm.deal` and `vm.prank` for convenience:

FunctionEquivalent ToUse Case`hoax(addr)``vm.deal(addr, 2^128 wei); vm.prank(addr)`Single-call impersonation with ETH`hoax(addr, give)``vm.deal(addr, give); vm.prank(addr)`Single-call with specific ETH amount`startHoax(addr)``vm.deal(addr, 2^128 wei); vm.startPrank(addr)`Multi-call impersonation with ETH`startHoax(addr, give)``vm.deal(addr, give); vm.startPrank(addr)`Multi-call with specific ETH amount

These are used in Aegis tests to simulate funded guardian accounts providing liquidity during panic mode.

Sources: [contracts/lib/forge-std/README.md#166-215](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L166-L215)

## Console LoggingLink copied!

Aegis uses `console2.sol` for trace-decoded logging. The import is available through `Test.sol`:

```
import "forge-std/Test.sol";
// console2 is now available
console2.log("Value:", someValue);
```

The `console2` variant provides proper decoding of `uint256` and `int256` types in Forge traces, unlike the original `console.sol` which has a decoding bug. The API is identical to Hardhat's `console.log`.

Sources: [contracts/lib/forge-std/README.md#222-246](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L222-L246)

## Versioning and UpdatesLink copied!

The forge-std library is pinned as a Git submodule at [contracts/lib/forge-std](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std) To update to a newer version:

```
cd contracts/lib/forge-std
git fetch origin
git checkout <tag-or-commit>
cd ../..
git add lib/forge-std
git commit -m "Update forge-std to <version>"
```

The current version used by Aegis can be found in [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/.gitmodules)

Sources: [contracts/lib/forge-std/README.md#9-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L9-L11)

## Relationship to Aegis Test SuiteLink copied!

#mermaid-fsssg6ss45k{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-fsssg6ss45k .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-fsssg6ss45k .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-fsssg6ss45k .error-icon{fill:#a44141;}#mermaid-fsssg6ss45k .error-text{fill:#ddd;stroke:#ddd;}#mermaid-fsssg6ss45k .edge-thickness-normal{stroke-width:1px;}#mermaid-fsssg6ss45k .edge-thickness-thick{stroke-width:3.5px;}#mermaid-fsssg6ss45k .edge-pattern-solid{stroke-dasharray:0;}#mermaid-fsssg6ss45k .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-fsssg6ss45k .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-fsssg6ss45k .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-fsssg6ss45k .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-fsssg6ss45k .marker.cross{stroke:lightgrey;}#mermaid-fsssg6ss45k svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-fsssg6ss45k p{margin:0;}#mermaid-fsssg6ss45k .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-fsssg6ss45k .cluster-label text{fill:#F9FFFE;}#mermaid-fsssg6ss45k .cluster-label span{color:#F9FFFE;}#mermaid-fsssg6ss45k .cluster-label span p{background-color:transparent;}#mermaid-fsssg6ss45k .label text,#mermaid-fsssg6ss45k span{fill:#ccc;color:#ccc;}#mermaid-fsssg6ss45k .node rect,#mermaid-fsssg6ss45k .node circle,#mermaid-fsssg6ss45k .node ellipse,#mermaid-fsssg6ss45k .node polygon,#mermaid-fsssg6ss45k .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-fsssg6ss45k .rough-node .label text,#mermaid-fsssg6ss45k .node .label text,#mermaid-fsssg6ss45k .image-shape .label,#mermaid-fsssg6ss45k .icon-shape .label{text-anchor:middle;}#mermaid-fsssg6ss45k .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-fsssg6ss45k .rough-node .label,#mermaid-fsssg6ss45k .node .label,#mermaid-fsssg6ss45k .image-shape .label,#mermaid-fsssg6ss45k .icon-shape .label{text-align:center;}#mermaid-fsssg6ss45k .node.clickable{cursor:pointer;}#mermaid-fsssg6ss45k .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-fsssg6ss45k .arrowheadPath{fill:lightgrey;}#mermaid-fsssg6ss45k .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-fsssg6ss45k .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-fsssg6ss45k .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-fsssg6ss45k .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-fsssg6ss45k .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-fsssg6ss45k .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-fsssg6ss45k .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-fsssg6ss45k .cluster text{fill:#F9FFFE;}#mermaid-fsssg6ss45k .cluster span{color:#F9FFFE;}#mermaid-fsssg6ss45k div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-fsssg6ss45k .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-fsssg6ss45k rect.text{fill:none;stroke-width:0;}#mermaid-fsssg6ss45k .icon-shape,#mermaid-fsssg6ss45k .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-fsssg6ss45k .icon-shape p,#mermaid-fsssg6ss45k .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-fsssg6ss45k .icon-shape rect,#mermaid-fsssg6ss45k .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-fsssg6ss45k .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-fsssg6ss45k .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-fsssg6ss45k :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Test Scenarios

forge-std Capabilities

Test Infrastructure

Source Contracts

tested by

tested by

tested by

tested by

inherits

provides

provides

provides

provides

provides

uses

uses

uses

uses

deploys

deploys

deploys

deploys

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

AegisGuardianRegistry.sol

AegisIntegrationTest.t.sol inherits Test

Test.sol forge-std aggregator

Cheatcodes vm.prank, vm.deal, vm.expectRevert

Storage Manipulation stdstore

Assertions assertEq, assertGt

Logging console2.log

Error Constants stdError.*

setUp() Deploy contracts

testPriceUpdate() Monitor oracle events

testCircuitBreaker() Verify panic mode

testReputation() Check feedback loop

Sources: [contracts/lib/forge-std/README.md#1-267](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L267)

## Licensing StructureLink copied!

The Aegis project and its dependencies have distinct licenses:

#mermaid-vf4wfdynexs{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-vf4wfdynexs .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-vf4wfdynexs .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-vf4wfdynexs .error-icon{fill:#a44141;}#mermaid-vf4wfdynexs .error-text{fill:#ddd;stroke:#ddd;}#mermaid-vf4wfdynexs .edge-thickness-normal{stroke-width:1px;}#mermaid-vf4wfdynexs .edge-thickness-thick{stroke-width:3.5px;}#mermaid-vf4wfdynexs .edge-pattern-solid{stroke-dasharray:0;}#mermaid-vf4wfdynexs .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-vf4wfdynexs .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-vf4wfdynexs .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-vf4wfdynexs .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-vf4wfdynexs .marker.cross{stroke:lightgrey;}#mermaid-vf4wfdynexs svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-vf4wfdynexs p{margin:0;}#mermaid-vf4wfdynexs .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-vf4wfdynexs .cluster-label text{fill:#F9FFFE;}#mermaid-vf4wfdynexs .cluster-label span{color:#F9FFFE;}#mermaid-vf4wfdynexs .cluster-label span p{background-color:transparent;}#mermaid-vf4wfdynexs .label text,#mermaid-vf4wfdynexs span{fill:#ccc;color:#ccc;}#mermaid-vf4wfdynexs .node rect,#mermaid-vf4wfdynexs .node circle,#mermaid-vf4wfdynexs .node ellipse,#mermaid-vf4wfdynexs .node polygon,#mermaid-vf4wfdynexs .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-vf4wfdynexs .rough-node .label text,#mermaid-vf4wfdynexs .node .label text,#mermaid-vf4wfdynexs .image-shape .label,#mermaid-vf4wfdynexs .icon-shape .label{text-anchor:middle;}#mermaid-vf4wfdynexs .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-vf4wfdynexs .rough-node .label,#mermaid-vf4wfdynexs .node .label,#mermaid-vf4wfdynexs .image-shape .label,#mermaid-vf4wfdynexs .icon-shape .label{text-align:center;}#mermaid-vf4wfdynexs .node.clickable{cursor:pointer;}#mermaid-vf4wfdynexs .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-vf4wfdynexs .arrowheadPath{fill:lightgrey;}#mermaid-vf4wfdynexs .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-vf4wfdynexs .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-vf4wfdynexs .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-vf4wfdynexs .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-vf4wfdynexs .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-vf4wfdynexs .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-vf4wfdynexs .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-vf4wfdynexs .cluster text{fill:#F9FFFE;}#mermaid-vf4wfdynexs .cluster span{color:#F9FFFE;}#mermaid-vf4wfdynexs div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-vf4wfdynexs .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-vf4wfdynexs rect.text{fill:none;stroke-width:0;}#mermaid-vf4wfdynexs .icon-shape,#mermaid-vf4wfdynexs .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-vf4wfdynexs .icon-shape p,#mermaid-vf4wfdynexs .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-vf4wfdynexs .icon-shape rect,#mermaid-vf4wfdynexs .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-vf4wfdynexs .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-vf4wfdynexs .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-vf4wfdynexs :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Licenses

Dependencies

Aegis Contracts

licensed under

licensed under

licensed under

dual licensed

see submodule

see submodule

Aegis Smart Contracts src/*.sol

Aegis Tests test/*.sol

Deployment Scripts script/*.sol

forge-std lib/forge-std/

uniswap-hooks lib/uniswap-hooks/

system-smart-contracts lib/system-smart-contracts/

MIT License Copyright 2023 saucepoint

MIT License OR Apache 2.0

Various Licenses See dependency READMEs

Sources: [contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/README.md#264-266](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L264-L266)

### Aegis LicenseLink copied!

Aegis contracts are licensed under the MIT License with copyright held by saucepoint (2023). The full license text is available at [contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)

Key Terms:

- Permission granted for use, copy, modify, merge, publish, distribute, sublicense, and sell
- Provided "as is" without warranty
- Requires inclusion of copyright notice and permission notice in all copies

### forge-std LicenseLink copied!

The Forge Standard Library offers dual licensing:

- MIT License
- Apache 2.0 License

Users may choose either license. Full license texts are available in the forge-std repository at `LICENSE-MIT` and `LICENSE-APACHE`.

Sources: [contracts/lib/forge-std/README.md#264-266](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L264-L266)

## Subsection OverviewLink copied!

The following subsections provide detailed documentation of specific reference materials:

- [Forge Standard Library](#7.1): Comprehensive documentation of Test.sol, StdCheats, StdStorage, console2, and other utilities
- [Cheatcode Generation](#7.2): Explanation of the `vm.py` script that generates Vm.sol from cheatcodes.json
- [Contributing Guidelines](#7.3): Process for contributing to forge-std including bug reports, feature requests, and pull request guidelines
- [Licensing](#7.4): Detailed license information for Aegis and all dependencies

These materials are essential for developers modifying the test suite, contributing to dependencies, or understanding the legal framework of the project.

Sources: [contracts/lib/forge-std/README.md#1-267](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/README.md#L1-L267)[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)