# License InformationLink copied!
Relevant source files
- [contracts/LICENSE](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE)
- [contracts/lib/forge-std/LICENSE-APACHE](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE)
- [contracts/lib/forge-std/LICENSE-MIT](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT)

## Purpose and ScopeLink copied!

This page documents the licensing terms for the Aegis codebase and its direct dependencies. It covers the MIT License applied to the main Aegis contracts and the dual-licensing structure (MIT/Apache-2.0) of the Forge Standard Library dependency. For contributing guidelines and development setup, see [Contributing Guidelines](#7.4) and [Foundry Setup](#6.2).

---

## Main Project LicenseLink copied!

The core Aegis contracts are licensed under the MIT License with copyright attribution to saucepoint (2023).

### License TermsLink copied!

The MIT License grants broad permissions including:

- Commercial and private use
- Modification and distribution
- Sublicensing

The license requires:

- Copyright notice and license text inclusion in all copies
- No warranty or liability guarantees

Sources:[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)

---

## Forge Standard Library LicensingLink copied!

The `forge-std` library, included as a git submodule at [contracts/lib/forge-std](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std) uses a dual-licensing model allowing users to choose between two licenses:

### MIT License OptionLink copied!

```
Copyright Contributors to Forge Standard Library
```

The MIT License for `forge-std` provides the same permissive terms as the main project license, allowing unrestricted use, modification, and distribution with attribution.

Sources:[contracts/lib/forge-std/LICENSE-MIT#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L1-L26)

### Apache License 2.0 OptionLink copied!

```
Copyright Contributors to Forge Standard Library
Apache License, Version 2.0, January 2004
```

The Apache 2.0 License provides additional patent protection clauses and explicit handling of contributions. Key differences from MIT include:

FeatureMITApache 2.0Patent GrantNot explicitly addressedExplicit patent license grantContribution TermsNot specifiedDefined in Section 5Trademark RightsNot addressedExplicitly not granted (Section 6)Redistribution RequirementsSimple attributionDetailed in Section 4 with NOTICE file handling

Sources:[contracts/lib/forge-std/LICENSE-APACHE#1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

---

## License File StructureLink copied!

The following diagram shows the location of license files in the repository structure:

#mermaid-14vnv5a5jay{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-14vnv5a5jay .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-14vnv5a5jay .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-14vnv5a5jay .error-icon{fill:#a44141;}#mermaid-14vnv5a5jay .error-text{fill:#ddd;stroke:#ddd;}#mermaid-14vnv5a5jay .edge-thickness-normal{stroke-width:1px;}#mermaid-14vnv5a5jay .edge-thickness-thick{stroke-width:3.5px;}#mermaid-14vnv5a5jay .edge-pattern-solid{stroke-dasharray:0;}#mermaid-14vnv5a5jay .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-14vnv5a5jay .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-14vnv5a5jay .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-14vnv5a5jay .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-14vnv5a5jay .marker.cross{stroke:lightgrey;}#mermaid-14vnv5a5jay svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-14vnv5a5jay p{margin:0;}#mermaid-14vnv5a5jay .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-14vnv5a5jay .cluster-label text{fill:#F9FFFE;}#mermaid-14vnv5a5jay .cluster-label span{color:#F9FFFE;}#mermaid-14vnv5a5jay .cluster-label span p{background-color:transparent;}#mermaid-14vnv5a5jay .label text,#mermaid-14vnv5a5jay span{fill:#ccc;color:#ccc;}#mermaid-14vnv5a5jay .node rect,#mermaid-14vnv5a5jay .node circle,#mermaid-14vnv5a5jay .node ellipse,#mermaid-14vnv5a5jay .node polygon,#mermaid-14vnv5a5jay .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-14vnv5a5jay .rough-node .label text,#mermaid-14vnv5a5jay .node .label text,#mermaid-14vnv5a5jay .image-shape .label,#mermaid-14vnv5a5jay .icon-shape .label{text-anchor:middle;}#mermaid-14vnv5a5jay .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-14vnv5a5jay .rough-node .label,#mermaid-14vnv5a5jay .node .label,#mermaid-14vnv5a5jay .image-shape .label,#mermaid-14vnv5a5jay .icon-shape .label{text-align:center;}#mermaid-14vnv5a5jay .node.clickable{cursor:pointer;}#mermaid-14vnv5a5jay .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-14vnv5a5jay .arrowheadPath{fill:lightgrey;}#mermaid-14vnv5a5jay .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-14vnv5a5jay .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-14vnv5a5jay .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-14vnv5a5jay .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-14vnv5a5jay .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-14vnv5a5jay .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-14vnv5a5jay .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-14vnv5a5jay .cluster text{fill:#F9FFFE;}#mermaid-14vnv5a5jay .cluster span{color:#F9FFFE;}#mermaid-14vnv5a5jay div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-14vnv5a5jay .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-14vnv5a5jay rect.text{fill:none;stroke-width:0;}#mermaid-14vnv5a5jay .icon-shape,#mermaid-14vnv5a5jay .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-14vnv5a5jay .icon-shape p,#mermaid-14vnv5a5jay .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-14vnv5a5jay .icon-shape rect,#mermaid-14vnv5a5jay .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-14vnv5a5jay .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-14vnv5a5jay .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-14vnv5a5jay :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Applies to

Applies to

Applies to

Repository Root

contracts/

contracts/lib/

contracts/lib/forge-std/

LICENSE (MIT License) Copyright 2023 saucepoint

LICENSE-MIT (MIT Option) Forge Standard Library

LICENSE-APACHE (Apache 2.0 Option) Forge Standard Library

AegisHook.sol AegisSentinel.sol MockOracle.sol Guardian Registry

Test.sol Script.sol console.sol Vm.sol

Sources:[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE#1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

---

## License Compatibility MatrixLink copied!

The following table shows the compatibility between licenses used in the Aegis project:

ComponentLicenseLocationDerivative Works AllowedAegis Core ContractsMIT[contracts/LICENSE](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE)Yes, with attributionForge Standard LibraryMIT or Apache-2.0[contracts/lib/forge-std/](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/)Yes, under either licenseTest ContractsInherits from both[contracts/test/*.t.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/test/*.t.sol)Yes, MIT + chosen forge-std licenseDeployment ScriptsInherits from both[contracts/script/*.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/script/*.s.sol)Yes, MIT + chosen forge-std license

Sources:[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE#1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

---

## Usage in Solidity ContractsLink copied!

The license terms apply to the following contract categories:

#mermaid-ip54hlq4pl8{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ip54hlq4pl8 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ip54hlq4pl8 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ip54hlq4pl8 .error-icon{fill:#a44141;}#mermaid-ip54hlq4pl8 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ip54hlq4pl8 .edge-thickness-normal{stroke-width:1px;}#mermaid-ip54hlq4pl8 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ip54hlq4pl8 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ip54hlq4pl8 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ip54hlq4pl8 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ip54hlq4pl8 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ip54hlq4pl8 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ip54hlq4pl8 .marker.cross{stroke:lightgrey;}#mermaid-ip54hlq4pl8 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ip54hlq4pl8 p{margin:0;}#mermaid-ip54hlq4pl8 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ip54hlq4pl8 .cluster-label text{fill:#F9FFFE;}#mermaid-ip54hlq4pl8 .cluster-label span{color:#F9FFFE;}#mermaid-ip54hlq4pl8 .cluster-label span p{background-color:transparent;}#mermaid-ip54hlq4pl8 .label text,#mermaid-ip54hlq4pl8 span{fill:#ccc;color:#ccc;}#mermaid-ip54hlq4pl8 .node rect,#mermaid-ip54hlq4pl8 .node circle,#mermaid-ip54hlq4pl8 .node ellipse,#mermaid-ip54hlq4pl8 .node polygon,#mermaid-ip54hlq4pl8 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ip54hlq4pl8 .rough-node .label text,#mermaid-ip54hlq4pl8 .node .label text,#mermaid-ip54hlq4pl8 .image-shape .label,#mermaid-ip54hlq4pl8 .icon-shape .label{text-anchor:middle;}#mermaid-ip54hlq4pl8 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ip54hlq4pl8 .rough-node .label,#mermaid-ip54hlq4pl8 .node .label,#mermaid-ip54hlq4pl8 .image-shape .label,#mermaid-ip54hlq4pl8 .icon-shape .label{text-align:center;}#mermaid-ip54hlq4pl8 .node.clickable{cursor:pointer;}#mermaid-ip54hlq4pl8 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ip54hlq4pl8 .arrowheadPath{fill:lightgrey;}#mermaid-ip54hlq4pl8 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ip54hlq4pl8 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ip54hlq4pl8 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ip54hlq4pl8 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ip54hlq4pl8 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ip54hlq4pl8 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ip54hlq4pl8 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ip54hlq4pl8 .cluster text{fill:#F9FFFE;}#mermaid-ip54hlq4pl8 .cluster span{color:#F9FFFE;}#mermaid-ip54hlq4pl8 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ip54hlq4pl8 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ip54hlq4pl8 rect.text{fill:none;stroke-width:0;}#mermaid-ip54hlq4pl8 .icon-shape,#mermaid-ip54hlq4pl8 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ip54hlq4pl8 .icon-shape p,#mermaid-ip54hlq4pl8 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ip54hlq4pl8 .icon-shape rect,#mermaid-ip54hlq4pl8 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ip54hlq4pl8 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ip54hlq4pl8 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ip54hlq4pl8 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

forge-std Library (MIT OR Apache-2.0)

Deploy Scripts (MIT + forge-std)

Test Contracts (MIT + forge-std)

Core Contracts (MIT)

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

Guardian Registry

AegisHookTest.t.sol

AegisSentinelTest.t.sol

MockOracleTest.t.sol

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol

Test.sol

Script.sol

console.sol

Sources:[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE#1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

---

## Redistribution RequirementsLink copied!

### For Aegis Core ContractsLink copied!

When redistributing or creating derivative works of Aegis contracts:

1. Include the copyright notice:

```
Copyright (c) 2023 saucepoint
```
2. Include the MIT License text from [contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)
3. Maintain license notice in all substantial portions of the code

### For forge-std Derived WorksLink copied!

When using or redistributing code that depends on `forge-std`:

If choosing MIT:

- Include copyright notice: "Copyright Contributors to Forge Standard Library"
- Include MIT License text from [contracts/lib/forge-std/LICENSE-MIT#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L1-L26)

If choosing Apache 2.0:

- Include copyright notice: "Copyright Contributors to Forge Standard Library"
- Include full Apache 2.0 License text from [contracts/lib/forge-std/LICENSE-APACHE#1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)
- Provide notice of any modifications (Section 4.b)
- Retain patent, trademark, and attribution notices (Section 4.c)

Sources:[contracts/LICENSE#6-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L6-L14)[contracts/lib/forge-std/LICENSE-MIT#3-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L3-L15)[contracts/lib/forge-std/LICENSE-APACHE#91-130](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L91-L130)

---

## External DependenciesLink copied!

The Aegis project includes additional git submodules that have their own licensing terms:

DependencySubmodule PathLicense Source`uniswap-hooks`[contracts/lib/uniswap-hooks](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/uniswap-hooks)See dependency repository`hookmate`[contracts/lib/hookmate](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/hookmate)See dependency repository`system-smart-contracts`[contracts/lib/system-smart-contracts](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/system-smart-contracts)See dependency repository

Users should review the license terms of these dependencies separately. For information on managing these dependencies, see [Dependencies and Submodules](#6.3).

Sources: Inferred from architecture diagrams in high-level system documentation

---

## License Warranty DisclaimersLink copied!

Both the MIT and Apache 2.0 licenses include explicit warranty disclaimers:

### MIT License DisclaimerLink copied!

The software is provided "AS IS" without warranty of any kind, express or implied, including but not limited to:

- MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NON-INFRINGEMENT

Sources:[contracts/LICENSE#15-21](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L15-L21)[contracts/lib/forge-std/LICENSE-MIT#17-25](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L17-L25)

### Apache 2.0 DisclaimerLink copied!

The Apache 2.0 license provides a more detailed warranty disclaimer in Section 7, emphasizing that contributions are provided on an "AS IS" basis without warranties or conditions of:

- TITLE
- NON-INFRINGEMENT
- MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE

Additionally, Section 8 limits liability for damages including direct, indirect, special, incidental, or consequential damages.

Sources:[contracts/lib/forge-std/LICENSE-APACHE#145-153](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L145-L153)[contracts/lib/forge-std/LICENSE-APACHE#155-166](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L155-L166)

---

## SummaryLink copied!

AspectDetailsMain ProjectMIT License, Copyright 2023 saucepointPrimary Dependencyforge-std with dual MIT/Apache-2.0 licensingAttribution RequiredYes, for both main project and forge-stdCommercial UsePermitted under both licensesPatent GrantOnly explicit in Apache 2.0 optionRedistributionAllowed with license and copyright notices

For questions about licensing and contributions, see [Contributing Guidelines](#7.4).

Sources:[contracts/LICENSE#1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT#1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE#1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)