# Cheatcode GenerationLink copied!
Relevant source files
- [contracts/lib/forge-std/scripts/vm.py](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py)

This document describes the `vm.py` script that automatically generates Solidity interface files (`Vm.sol` and `VmSafe.sol`) from the Foundry cheatcodes JSON specification. This code generation system ensures that forge-std's cheatcode interfaces remain synchronized with the canonical cheatcode definitions maintained by the Foundry project.

The script is part of the forge-std testing framework infrastructure. For information about how these generated interfaces are used in tests, see [Forge Standard Library](#7.2).

## Purpose and ScopeLink copied!

The `vm.py` script serves as a code generator that transforms Foundry's machine-readable cheatcode specification into human-readable Solidity interfaces. It performs several key functions:

1. Fetches the latest cheatcode definitions from the Foundry repository
2. Parses JSON containing function signatures, documentation, and metadata
3. Categorizes cheatcodes by safety level (safe vs. unsafe)
4. Generates two distinct Solidity interfaces with proper documentation
5. Formats the output using `forge fmt` for consistent code style

The script outputs to `src/Vm.sol`, which contains both `VmSafe` and `Vm` interfaces used throughout the forge-std test framework.

Sources:[contracts/lib/forge-std/scripts/vm.py#1-107](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L1-L107)

## Architecture OverviewLink copied!

#mermaid-pgdozvj6yz{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-pgdozvj6yz .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-pgdozvj6yz .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-pgdozvj6yz .error-icon{fill:#a44141;}#mermaid-pgdozvj6yz .error-text{fill:#ddd;stroke:#ddd;}#mermaid-pgdozvj6yz .edge-thickness-normal{stroke-width:1px;}#mermaid-pgdozvj6yz .edge-thickness-thick{stroke-width:3.5px;}#mermaid-pgdozvj6yz .edge-pattern-solid{stroke-dasharray:0;}#mermaid-pgdozvj6yz .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-pgdozvj6yz .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-pgdozvj6yz .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-pgdozvj6yz .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-pgdozvj6yz .marker.cross{stroke:lightgrey;}#mermaid-pgdozvj6yz svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-pgdozvj6yz p{margin:0;}#mermaid-pgdozvj6yz .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-pgdozvj6yz .cluster-label text{fill:#F9FFFE;}#mermaid-pgdozvj6yz .cluster-label span{color:#F9FFFE;}#mermaid-pgdozvj6yz .cluster-label span p{background-color:transparent;}#mermaid-pgdozvj6yz .label text,#mermaid-pgdozvj6yz span{fill:#ccc;color:#ccc;}#mermaid-pgdozvj6yz .node rect,#mermaid-pgdozvj6yz .node circle,#mermaid-pgdozvj6yz .node ellipse,#mermaid-pgdozvj6yz .node polygon,#mermaid-pgdozvj6yz .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-pgdozvj6yz .rough-node .label text,#mermaid-pgdozvj6yz .node .label text,#mermaid-pgdozvj6yz .image-shape .label,#mermaid-pgdozvj6yz .icon-shape .label{text-anchor:middle;}#mermaid-pgdozvj6yz .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-pgdozvj6yz .rough-node .label,#mermaid-pgdozvj6yz .node .label,#mermaid-pgdozvj6yz .image-shape .label,#mermaid-pgdozvj6yz .icon-shape .label{text-align:center;}#mermaid-pgdozvj6yz .node.clickable{cursor:pointer;}#mermaid-pgdozvj6yz .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-pgdozvj6yz .arrowheadPath{fill:lightgrey;}#mermaid-pgdozvj6yz .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-pgdozvj6yz .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-pgdozvj6yz .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-pgdozvj6yz .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-pgdozvj6yz .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-pgdozvj6yz .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-pgdozvj6yz .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-pgdozvj6yz .cluster text{fill:#F9FFFE;}#mermaid-pgdozvj6yz .cluster span{color:#F9FFFE;}#mermaid-pgdozvj6yz div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-pgdozvj6yz .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-pgdozvj6yz rect.text{fill:none;stroke-width:0;}#mermaid-pgdozvj6yz .icon-shape,#mermaid-pgdozvj6yz .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-pgdozvj6yz .icon-shape p,#mermaid-pgdozvj6yz .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-pgdozvj6yz .icon-shape rect,#mermaid-pgdozvj6yz .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-pgdozvj6yz .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-pgdozvj6yz .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-pgdozvj6yz :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Output

Code Generator

Processing Pipeline

JSON Parser

Input Sources

urlopen

Path.read_text

CHEATCODES_JSON_URL https://raw.githubusercontent.com/...

Local JSON File --from PATH

cheatcodes.json

Cheatcodes.from_json()

Error[] Event[] Enum[] Struct[] Cheatcode[]

Filter experimental/internal status != 'experimental' status != 'internal'

Sort by func.id

Categorize by safety safe vs. unsafe

prefix_with_group_headers()

CheatcodesPrinter

Generate VmSafe interface safe cheatcodes only

Generate Vm interface unsafe cheatcodes inherits VmSafe

src/Vm.sol

forge fmt

Sources:[contracts/lib/forge-std/scripts/vm.py#30-107](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L30-L107)

## Data ModelLink copied!

The script defines a comprehensive type system for representing cheatcode definitions:

### Core ClassesLink copied!

ClassPurposeKey Fields`Function`Represents a single cheatcode function`id`, `description`, `declaration`, `visibility`, `mutability`, `signature`, `selector``Cheatcode`Wraps a Function with metadata`func: Function`, `group: str`, `status: str`, `safety: str``Error`Custom Solidity error definition`name`, `description`, `declaration``Event`Solidity event definition`name`, `description`, `declaration``Enum`Solidity enum with variants`name`, `description`, `variants: list[EnumVariant]``Struct`Solidity struct with fields`name`, `description`, `fields: list[StructField]``Cheatcodes`Container for all definitions`errors`, `events`, `enums`, `structs`, `cheatcodes`

Sources:[contracts/lib/forge-std/scripts/vm.py#181-374](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L181-L374)

### Cheatcode MetadataLink copied!

Each cheatcode is classified along three dimensions:

#mermaid-8xwosgvt8h7{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-8xwosgvt8h7 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-8xwosgvt8h7 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-8xwosgvt8h7 .error-icon{fill:#a44141;}#mermaid-8xwosgvt8h7 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-8xwosgvt8h7 .edge-thickness-normal{stroke-width:1px;}#mermaid-8xwosgvt8h7 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-8xwosgvt8h7 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-8xwosgvt8h7 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-8xwosgvt8h7 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-8xwosgvt8h7 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-8xwosgvt8h7 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-8xwosgvt8h7 .marker.cross{stroke:lightgrey;}#mermaid-8xwosgvt8h7 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-8xwosgvt8h7 p{margin:0;}#mermaid-8xwosgvt8h7 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-8xwosgvt8h7 .cluster-label text{fill:#F9FFFE;}#mermaid-8xwosgvt8h7 .cluster-label span{color:#F9FFFE;}#mermaid-8xwosgvt8h7 .cluster-label span p{background-color:transparent;}#mermaid-8xwosgvt8h7 .label text,#mermaid-8xwosgvt8h7 span{fill:#ccc;color:#ccc;}#mermaid-8xwosgvt8h7 .node rect,#mermaid-8xwosgvt8h7 .node circle,#mermaid-8xwosgvt8h7 .node ellipse,#mermaid-8xwosgvt8h7 .node polygon,#mermaid-8xwosgvt8h7 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-8xwosgvt8h7 .rough-node .label text,#mermaid-8xwosgvt8h7 .node .label text,#mermaid-8xwosgvt8h7 .image-shape .label,#mermaid-8xwosgvt8h7 .icon-shape .label{text-anchor:middle;}#mermaid-8xwosgvt8h7 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-8xwosgvt8h7 .rough-node .label,#mermaid-8xwosgvt8h7 .node .label,#mermaid-8xwosgvt8h7 .image-shape .label,#mermaid-8xwosgvt8h7 .icon-shape .label{text-align:center;}#mermaid-8xwosgvt8h7 .node.clickable{cursor:pointer;}#mermaid-8xwosgvt8h7 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-8xwosgvt8h7 .arrowheadPath{fill:lightgrey;}#mermaid-8xwosgvt8h7 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-8xwosgvt8h7 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-8xwosgvt8h7 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8xwosgvt8h7 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-8xwosgvt8h7 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8xwosgvt8h7 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-8xwosgvt8h7 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-8xwosgvt8h7 .cluster text{fill:#F9FFFE;}#mermaid-8xwosgvt8h7 .cluster span{color:#F9FFFE;}#mermaid-8xwosgvt8h7 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-8xwosgvt8h7 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-8xwosgvt8h7 rect.text{fill:none;stroke-width:0;}#mermaid-8xwosgvt8h7 .icon-shape,#mermaid-8xwosgvt8h7 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-8xwosgvt8h7 .icon-shape p,#mermaid-8xwosgvt8h7 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-8xwosgvt8h7 .icon-shape rect,#mermaid-8xwosgvt8h7 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-8xwosgvt8h7 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-8xwosgvt8h7 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-8xwosgvt8h7 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Cheatcode Classification

Functional Group

evm

json

filesystem

environment

scripting

...

Cheatcode

Safety Level

safe No EVM state manipulation

unsafe Manipulates EVM state

Development Status

stable Production-ready

experimental Excluded from output

internal Excluded from output

Sources:[contracts/lib/forge-std/scripts/vm.py#225-244](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L225-L244)

## Processing PipelineLink copied!

### Step 1: Fetch and ParseLink copied!

The script begins by fetching the JSON specification:

Cheatcodes.from_json()Local FilesystemGitHub Raw URLargparsevm.pyCheatcodes.from_json()Local FilesystemGitHub Raw URLargparsevm.py#mermaid-0nhnfztv5yqc{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-0nhnfztv5yqc .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-0nhnfztv5yqc .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-0nhnfztv5yqc .error-icon{fill:#a44141;}#mermaid-0nhnfztv5yqc .error-text{fill:#ddd;stroke:#ddd;}#mermaid-0nhnfztv5yqc .edge-thickness-normal{stroke-width:1px;}#mermaid-0nhnfztv5yqc .edge-thickness-thick{stroke-width:3.5px;}#mermaid-0nhnfztv5yqc .edge-pattern-solid{stroke-dasharray:0;}#mermaid-0nhnfztv5yqc .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-0nhnfztv5yqc .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-0nhnfztv5yqc .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-0nhnfztv5yqc .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-0nhnfztv5yqc .marker.cross{stroke:lightgrey;}#mermaid-0nhnfztv5yqc svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-0nhnfztv5yqc p{margin:0;}#mermaid-0nhnfztv5yqc .actor{stroke:#ccc;fill:#1f2020;}#mermaid-0nhnfztv5yqc text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-0nhnfztv5yqc .actor-line{stroke:#ccc;}#mermaid-0nhnfztv5yqc .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-0nhnfztv5yqc .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-0nhnfztv5yqc .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-0nhnfztv5yqc #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-0nhnfztv5yqc .sequenceNumber{fill:black;}#mermaid-0nhnfztv5yqc #sequencenumber{fill:lightgrey;}#mermaid-0nhnfztv5yqc #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-0nhnfztv5yqc .messageText{fill:lightgrey;stroke:none;}#mermaid-0nhnfztv5yqc .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-0nhnfztv5yqc .labelText,#mermaid-0nhnfztv5yqc .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-0nhnfztv5yqc .loopText,#mermaid-0nhnfztv5yqc .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-0nhnfztv5yqc .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-0nhnfztv5yqc .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-0nhnfztv5yqc .noteText,#mermaid-0nhnfztv5yqc .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-0nhnfztv5yqc .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-0nhnfztv5yqc .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-0nhnfztv5yqc .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-0nhnfztv5yqc .actorPopupMenu{position:absolute;}#mermaid-0nhnfztv5yqc .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-0nhnfztv5yqc .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-0nhnfztv5yqc .actor-man circle,#mermaid-0nhnfztv5yqc line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-0nhnfztv5yqc :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}alt[No --from specified][--from specified]Parse --from PATH argumenturlopen(CHEATCODES_JSON_URL)JSON stringPath.read_text()JSON stringfrom_json(json_str)Cheatcodes object

The default URL is hardcoded at line 15:

```
CHEATCODES_JSON_URL = "https://raw.githubusercontent.com/foundry-rs/foundry/master/crates/cheatcodes/assets/cheatcodes.json"
```

Sources:[contracts/lib/forge-std/scripts/vm.py#15-41](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L15-L41)

### Step 2: Filter and SortLink copied!

#mermaid-vlzm05pji7{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-vlzm05pji7 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-vlzm05pji7 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-vlzm05pji7 .error-icon{fill:#a44141;}#mermaid-vlzm05pji7 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-vlzm05pji7 .edge-thickness-normal{stroke-width:1px;}#mermaid-vlzm05pji7 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-vlzm05pji7 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-vlzm05pji7 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-vlzm05pji7 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-vlzm05pji7 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-vlzm05pji7 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-vlzm05pji7 .marker.cross{stroke:lightgrey;}#mermaid-vlzm05pji7 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-vlzm05pji7 p{margin:0;}#mermaid-vlzm05pji7 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-vlzm05pji7 .cluster-label text{fill:#F9FFFE;}#mermaid-vlzm05pji7 .cluster-label span{color:#F9FFFE;}#mermaid-vlzm05pji7 .cluster-label span p{background-color:transparent;}#mermaid-vlzm05pji7 .label text,#mermaid-vlzm05pji7 span{fill:#ccc;color:#ccc;}#mermaid-vlzm05pji7 .node rect,#mermaid-vlzm05pji7 .node circle,#mermaid-vlzm05pji7 .node ellipse,#mermaid-vlzm05pji7 .node polygon,#mermaid-vlzm05pji7 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-vlzm05pji7 .rough-node .label text,#mermaid-vlzm05pji7 .node .label text,#mermaid-vlzm05pji7 .image-shape .label,#mermaid-vlzm05pji7 .icon-shape .label{text-anchor:middle;}#mermaid-vlzm05pji7 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-vlzm05pji7 .rough-node .label,#mermaid-vlzm05pji7 .node .label,#mermaid-vlzm05pji7 .image-shape .label,#mermaid-vlzm05pji7 .icon-shape .label{text-align:center;}#mermaid-vlzm05pji7 .node.clickable{cursor:pointer;}#mermaid-vlzm05pji7 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-vlzm05pji7 .arrowheadPath{fill:lightgrey;}#mermaid-vlzm05pji7 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-vlzm05pji7 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-vlzm05pji7 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-vlzm05pji7 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-vlzm05pji7 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-vlzm05pji7 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-vlzm05pji7 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-vlzm05pji7 .cluster text{fill:#F9FFFE;}#mermaid-vlzm05pji7 .cluster span{color:#F9FFFE;}#mermaid-vlzm05pji7 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-vlzm05pji7 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-vlzm05pji7 rect.text{fill:none;stroke-width:0;}#mermaid-vlzm05pji7 .icon-shape,#mermaid-vlzm05pji7 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-vlzm05pji7 .icon-shape p,#mermaid-vlzm05pji7 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-vlzm05pji7 .icon-shape rect,#mermaid-vlzm05pji7 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-vlzm05pji7 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-vlzm05pji7 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-vlzm05pji7 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

All cheatcodes from JSON

Filter out experimental status != 'experimental'

Filter out internal status != 'internal'

Sort by func.id

Split by safety

safe cheatcodes

unsafe cheatcodes

CmpCheatcode sort group → status → safety → id

CmpCheatcode sort group → status → safety → id

The `CmpCheatcode` comparator implements a hierarchical sort:

1. Group (e.g., "evm", "filesystem", "json")
2. Status (e.g., "stable" before others)
3. Safety (safe/unsafe)
4. Function ID (alphabetical)

Sources:[contracts/lib/forge-std/scripts/vm.py#43-54](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L43-L54)[contracts/lib/forge-std/scripts/vm.py#110-136](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L110-L136)

### Step 3: Add Group HeadersLink copied!

The `prefix_with_group_headers()` function inserts comment headers to organize cheatcodes by functional group:

#mermaid-tch1u5jfggm{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-tch1u5jfggm .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-tch1u5jfggm .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-tch1u5jfggm .error-icon{fill:#a44141;}#mermaid-tch1u5jfggm .error-text{fill:#ddd;stroke:#ddd;}#mermaid-tch1u5jfggm .edge-thickness-normal{stroke-width:1px;}#mermaid-tch1u5jfggm .edge-thickness-thick{stroke-width:3.5px;}#mermaid-tch1u5jfggm .edge-pattern-solid{stroke-dasharray:0;}#mermaid-tch1u5jfggm .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-tch1u5jfggm .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-tch1u5jfggm .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-tch1u5jfggm .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-tch1u5jfggm .marker.cross{stroke:lightgrey;}#mermaid-tch1u5jfggm svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-tch1u5jfggm p{margin:0;}#mermaid-tch1u5jfggm .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-tch1u5jfggm .cluster-label text{fill:#F9FFFE;}#mermaid-tch1u5jfggm .cluster-label span{color:#F9FFFE;}#mermaid-tch1u5jfggm .cluster-label span p{background-color:transparent;}#mermaid-tch1u5jfggm .label text,#mermaid-tch1u5jfggm span{fill:#ccc;color:#ccc;}#mermaid-tch1u5jfggm .node rect,#mermaid-tch1u5jfggm .node circle,#mermaid-tch1u5jfggm .node ellipse,#mermaid-tch1u5jfggm .node polygon,#mermaid-tch1u5jfggm .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-tch1u5jfggm .rough-node .label text,#mermaid-tch1u5jfggm .node .label text,#mermaid-tch1u5jfggm .image-shape .label,#mermaid-tch1u5jfggm .icon-shape .label{text-anchor:middle;}#mermaid-tch1u5jfggm .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-tch1u5jfggm .rough-node .label,#mermaid-tch1u5jfggm .node .label,#mermaid-tch1u5jfggm .image-shape .label,#mermaid-tch1u5jfggm .icon-shape .label{text-align:center;}#mermaid-tch1u5jfggm .node.clickable{cursor:pointer;}#mermaid-tch1u5jfggm .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-tch1u5jfggm .arrowheadPath{fill:lightgrey;}#mermaid-tch1u5jfggm .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-tch1u5jfggm .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-tch1u5jfggm .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-tch1u5jfggm .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-tch1u5jfggm .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-tch1u5jfggm .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-tch1u5jfggm .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-tch1u5jfggm .cluster text{fill:#F9FFFE;}#mermaid-tch1u5jfggm .cluster span{color:#F9FFFE;}#mermaid-tch1u5jfggm div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-tch1u5jfggm .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-tch1u5jfggm rect.text{fill:none;stroke-width:0;}#mermaid-tch1u5jfggm .icon-shape,#mermaid-tch1u5jfggm .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-tch1u5jfggm .icon-shape p,#mermaid-tch1u5jfggm .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-tch1u5jfggm .icon-shape rect,#mermaid-tch1u5jfggm .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-tch1u5jfggm .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-tch1u5jfggm .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-tch1u5jfggm :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Example Output Structure

// ======== EVM ========

cheatcode 1

cheatcode 2

// ======== Filesystem ========

cheatcode 3

cheatcode 4

Sorted cheatcode list

prefix_with_group_headers()

Cheatcode list with headers

The function uses a hack: it creates dummy cheatcodes with no description and a declaration string containing the header comment. The printer outputs these as-is.

Sources:[contracts/lib/forge-std/scripts/vm.py#138-160](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L138-L160)

## Code GenerationLink copied!

### CheatcodesPrinter ClassLink copied!

The `CheatcodesPrinter` class is responsible for generating formatted Solidity code:

#mermaid-v1jc92rm3gd{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-v1jc92rm3gd .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-v1jc92rm3gd .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-v1jc92rm3gd .error-icon{fill:#a44141;}#mermaid-v1jc92rm3gd .error-text{fill:#ddd;stroke:#ddd;}#mermaid-v1jc92rm3gd .edge-thickness-normal{stroke-width:1px;}#mermaid-v1jc92rm3gd .edge-thickness-thick{stroke-width:3.5px;}#mermaid-v1jc92rm3gd .edge-pattern-solid{stroke-dasharray:0;}#mermaid-v1jc92rm3gd .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-v1jc92rm3gd .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-v1jc92rm3gd .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-v1jc92rm3gd .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-v1jc92rm3gd .marker.cross{stroke:lightgrey;}#mermaid-v1jc92rm3gd svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-v1jc92rm3gd p{margin:0;}#mermaid-v1jc92rm3gd g.classGroup text{fill:#ccc;stroke:none;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:10px;}#mermaid-v1jc92rm3gd g.classGroup text .title{font-weight:bolder;}#mermaid-v1jc92rm3gd .nodeLabel,#mermaid-v1jc92rm3gd .edgeLabel{color:#e0dfdf;}#mermaid-v1jc92rm3gd .edgeLabel .label rect{fill:#1f2020;}#mermaid-v1jc92rm3gd .label text{fill:#e0dfdf;}#mermaid-v1jc92rm3gd .labelBkg{background:#1f2020;}#mermaid-v1jc92rm3gd .edgeLabel .label span{background:#1f2020;}#mermaid-v1jc92rm3gd .classTitle{font-weight:bolder;}#mermaid-v1jc92rm3gd .node rect,#mermaid-v1jc92rm3gd .node circle,#mermaid-v1jc92rm3gd .node ellipse,#mermaid-v1jc92rm3gd .node polygon,#mermaid-v1jc92rm3gd .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-v1jc92rm3gd .divider{stroke:#ccc;stroke-width:1;}#mermaid-v1jc92rm3gd g.clickable{cursor:pointer;}#mermaid-v1jc92rm3gd g.classGroup rect{fill:#1f2020;stroke:#ccc;}#mermaid-v1jc92rm3gd g.classGroup line{stroke:#ccc;stroke-width:1;}#mermaid-v1jc92rm3gd .classLabel .box{stroke:none;stroke-width:0;fill:#1f2020;opacity:0.5;}#mermaid-v1jc92rm3gd .classLabel .label{fill:#ccc;font-size:10px;}#mermaid-v1jc92rm3gd .relation{stroke:lightgrey;stroke-width:1;fill:none;}#mermaid-v1jc92rm3gd .dashed-line{stroke-dasharray:3;}#mermaid-v1jc92rm3gd .dotted-line{stroke-dasharray:1 2;}#mermaid-v1jc92rm3gd #compositionStart,#mermaid-v1jc92rm3gd .composition{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #compositionEnd,#mermaid-v1jc92rm3gd .composition{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #dependencyStart,#mermaid-v1jc92rm3gd .dependency{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #dependencyStart,#mermaid-v1jc92rm3gd .dependency{fill:lightgrey!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #extensionStart,#mermaid-v1jc92rm3gd .extension{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #extensionEnd,#mermaid-v1jc92rm3gd .extension{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #aggregationStart,#mermaid-v1jc92rm3gd .aggregation{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #aggregationEnd,#mermaid-v1jc92rm3gd .aggregation{fill:transparent!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #lollipopStart,#mermaid-v1jc92rm3gd .lollipop{fill:#1f2020!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd #lollipopEnd,#mermaid-v1jc92rm3gd .lollipop{fill:#1f2020!important;stroke:lightgrey!important;stroke-width:1;}#mermaid-v1jc92rm3gd .edgeTerminals{font-size:11px;line-height:initial;}#mermaid-v1jc92rm3gd .classTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-v1jc92rm3gd .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-v1jc92rm3gd .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-v1jc92rm3gd :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

CheatcodesPrinter

+str buffer

+bool prelude

+str spdx_identifier

+str solidity_requirement

+bool abicoder_v2

+bool block_doc_style

+int indent_level

+str nl_str

+ItemOrder items_order

+finish() : str

+p_contract(contract, name, inherits)

+p_errors(errors)

+p_events(events)

+p_enums(enums)

+p_structs(structs)

+p_functions(cheatcodes)

-_p_comment(s, doc)

-_p_indent()

-_p_str(txt)

ItemOrder

+list<Item> _list

+get_list() : list

+default() : ItemOrder

«enumeration»

Item

ERROR

EVENT

ENUM

STRUCT

FUNCTION

The printer builds Solidity code incrementally by appending to an internal buffer. It handles:

- Indentation management (`_inc_indent()`, `_dec_indent()`)
- Comment formatting (single-line `//` or block `/* */` style)
- Documentation comments (triple-slash `///` for NatSpec)
- Item ordering (errors, events, enums, structs, functions)

Sources:[contracts/lib/forge-std/scripts/vm.py#409-643](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L409-L643)

### Output StructureLink copied!

The script generates three main sections in `src/Vm.sol`:

#mermaid-j04opkas3a9{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-j04opkas3a9 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-j04opkas3a9 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-j04opkas3a9 .error-icon{fill:#a44141;}#mermaid-j04opkas3a9 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-j04opkas3a9 .edge-thickness-normal{stroke-width:1px;}#mermaid-j04opkas3a9 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-j04opkas3a9 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-j04opkas3a9 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-j04opkas3a9 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-j04opkas3a9 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-j04opkas3a9 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-j04opkas3a9 .marker.cross{stroke:lightgrey;}#mermaid-j04opkas3a9 svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-j04opkas3a9 p{margin:0;}#mermaid-j04opkas3a9 .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-j04opkas3a9 .cluster-label text{fill:#F9FFFE;}#mermaid-j04opkas3a9 .cluster-label span{color:#F9FFFE;}#mermaid-j04opkas3a9 .cluster-label span p{background-color:transparent;}#mermaid-j04opkas3a9 .label text,#mermaid-j04opkas3a9 span{fill:#ccc;color:#ccc;}#mermaid-j04opkas3a9 .node rect,#mermaid-j04opkas3a9 .node circle,#mermaid-j04opkas3a9 .node ellipse,#mermaid-j04opkas3a9 .node polygon,#mermaid-j04opkas3a9 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-j04opkas3a9 .rough-node .label text,#mermaid-j04opkas3a9 .node .label text,#mermaid-j04opkas3a9 .image-shape .label,#mermaid-j04opkas3a9 .icon-shape .label{text-anchor:middle;}#mermaid-j04opkas3a9 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-j04opkas3a9 .rough-node .label,#mermaid-j04opkas3a9 .node .label,#mermaid-j04opkas3a9 .image-shape .label,#mermaid-j04opkas3a9 .icon-shape .label{text-align:center;}#mermaid-j04opkas3a9 .node.clickable{cursor:pointer;}#mermaid-j04opkas3a9 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-j04opkas3a9 .arrowheadPath{fill:lightgrey;}#mermaid-j04opkas3a9 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-j04opkas3a9 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-j04opkas3a9 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-j04opkas3a9 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-j04opkas3a9 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-j04opkas3a9 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-j04opkas3a9 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-j04opkas3a9 .cluster text{fill:#F9FFFE;}#mermaid-j04opkas3a9 .cluster span{color:#F9FFFE;}#mermaid-j04opkas3a9 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-j04opkas3a9 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-j04opkas3a9 rect.text{fill:none;stroke-width:0;}#mermaid-j04opkas3a9 .icon-shape,#mermaid-j04opkas3a9 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-j04opkas3a9 .icon-shape p,#mermaid-j04opkas3a9 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-j04opkas3a9 .icon-shape rect,#mermaid-j04opkas3a9 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-j04opkas3a9 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-j04opkas3a9 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-j04opkas3a9 :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

src/Vm.sol

Prelude SPDX + pragma

interface VmSafe

errors + events + enums + structs + safe cheatcodes

interface Vm is VmSafe

unsafe cheatcodes only

#### VmSafe Interface

The `VmSafe` interface contains cheatcodes marked as "safe". These do not manipulate EVM state and are recommended for use in scripts:

- Includes: All type definitions (errors, events, enums, structs)
- Includes: Safe cheatcodes (e.g., file I/O, JSON parsing, environment variables)
- Excludes: State-manipulating cheatcodes

#### Vm Interface

The `Vm` interface inherits from `VmSafe` and adds unsafe cheatcodes:

- Inherits: All safe cheatcodes from `VmSafe`
- Includes: Unsafe cheatcodes (e.g., `prank`, `roll`, `warp`, `deal`)
- Excludes: Type definitions (already in `VmSafe`)

Sources:[contracts/lib/forge-std/scripts/vm.py#69-92](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L69-L92)

## Generation WorkflowLink copied!

forge fmtsrc/Vm.solCheatcodesPrinterAdd HeadersFilter & SortFetch JSONmain()forge fmtsrc/Vm.solCheatcodesPrinterAdd HeadersFilter & SortFetch JSONmain()#mermaid-g43peq44j0h{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-g43peq44j0h .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-g43peq44j0h .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-g43peq44j0h .error-icon{fill:#a44141;}#mermaid-g43peq44j0h .error-text{fill:#ddd;stroke:#ddd;}#mermaid-g43peq44j0h .edge-thickness-normal{stroke-width:1px;}#mermaid-g43peq44j0h .edge-thickness-thick{stroke-width:3.5px;}#mermaid-g43peq44j0h .edge-pattern-solid{stroke-dasharray:0;}#mermaid-g43peq44j0h .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-g43peq44j0h .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-g43peq44j0h .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-g43peq44j0h .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-g43peq44j0h .marker.cross{stroke:lightgrey;}#mermaid-g43peq44j0h svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-g43peq44j0h p{margin:0;}#mermaid-g43peq44j0h .actor{stroke:#ccc;fill:#1f2020;}#mermaid-g43peq44j0h text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-g43peq44j0h .actor-line{stroke:#ccc;}#mermaid-g43peq44j0h .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-g43peq44j0h .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-g43peq44j0h .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-g43peq44j0h #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-g43peq44j0h .sequenceNumber{fill:black;}#mermaid-g43peq44j0h #sequencenumber{fill:lightgrey;}#mermaid-g43peq44j0h #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-g43peq44j0h .messageText{fill:lightgrey;stroke:none;}#mermaid-g43peq44j0h .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-g43peq44j0h .labelText,#mermaid-g43peq44j0h .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-g43peq44j0h .loopText,#mermaid-g43peq44j0h .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-g43peq44j0h .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-g43peq44j0h .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-g43peq44j0h .noteText,#mermaid-g43peq44j0h .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-g43peq44j0h .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-g43peq44j0h .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-g43peq44j0h .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-g43peq44j0h .actorPopupMenu{position:absolute;}#mermaid-g43peq44j0h .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-g43peq44j0h .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-g43peq44j0h .actor-man circle,#mermaid-g43peq44j0h line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-g43peq44j0h :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Generate preludeGenerate VmSafeGenerate VmDownload or read JSONCheatcodes objectFilter experimental/internalSort by func.idSplit safe/unsafesafe[], unsafe[]prefix_with_group_headers(safe)prefix_with_group_headers(unsafe)safe[], unsafe[]p_prelude()SPDX + pragmap_contract(vm_safe | "VmSafe")VmSafe interface codep_contract(vm_unsafe | "Vm" | "VmSafe")Vm interface codeWrite complete outputforge fmt src/Vm.solexit code 0

Sources:[contracts/lib/forge-std/scripts/vm.py#30-107](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L30-L107)

## Memory-to-Calldata TransformationLink copied!

For compatibility with Solidity versions < 0.8.0, the script performs a regex replacement:

```
def memory_to_calldata(m: re.Match) -> str:
    return " calldata " + m.group(1)
 
out = re.sub(r" memory (.*returns)", memory_to_calldata, out)
```

This transforms function signatures like:

```
function readFile(string memory path) external view returns (string memory);
```

Into:

```
function readFile(string calldata path) external view returns (string memory);
```

The transformation only affects parameters, not return values, enabling compatibility with older Solidity versions that don't support `memory` parameters in external interfaces.

Sources:[contracts/lib/forge-std/scripts/vm.py#94-98](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L94-L98)

## UsageLink copied!

### Command-Line InterfaceLink copied!

The script accepts an optional `--from` argument:

```
# Fetch from GitHub (default)
python scripts/vm.py
 
# Use local JSON file
python scripts/vm.py --from path/to/cheatcodes.json
```

The script performs the following operations:

1. Parse command-line arguments
2. Fetch or read JSON input
3. Filter and sort cheatcodes
4. Generate Solidity code
5. Write to `src/Vm.sol`
6. Run `forge fmt src/Vm.sol`
7. Print success message

Sources:[contracts/lib/forge-std/scripts/vm.py#30-107](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L30-L107)

### Integration with Forge-StdLink copied!

The generated `Vm.sol` file is the foundation of the forge-std testing framework. Test contracts typically import and use it as follows:

```
import {Test} from "forge-std/Test.sol";
 
contract MyTest is Test {
    function testExample() public {
        vm.prank(address(1));  // vm is of type Vm
        // ...
    }
}
```

The `Test` contract (not shown in provided files) exposes a `Vm public constant vm` instance that test contracts inherit.

## Key Design DecisionsLink copied!

### Safety SegregationLink copied!

The split between `VmSafe` and `Vm` serves two purposes:

1. Script Safety: Scripts can import only `VmSafe` to prevent accidental state manipulation
2. Clear Intent: The interface hierarchy documents which operations are "safe" vs. "testing-only"

### Automated GenerationLink copied!

Rather than manually maintaining `Vm.sol`, the script ensures:

- Synchronization: Cheatcodes stay in sync with Foundry's implementation
- Consistency: All documentation and signatures are canonical
- Maintainability: Changes to cheatcodes require no manual interface updates

### Group OrganizationLink copied!

The group headers (`// ======== EVM ========`) improve readability by clustering related cheatcodes:

- evm: State manipulation (`roll`, `warp`, `deal`)
- filesystem: File operations (`readFile`, `writeFile`)
- json: JSON parsing (`parseJson`, `serializeJson`)
- environment: Environment variables (`envBool`, `envString`)
- scripting: Script utilities (`broadcast`, `startBroadcast`)

Sources:[contracts/lib/forge-std/scripts/vm.py#138-160](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L138-L160)

## Error HandlingLink copied!

The script includes minimal error handling:

```
assert res.returncode == 0, f"command failed: {forge_fmt}"
```

If `forge fmt` fails, the script terminates with an assertion error. This ensures the generated output is always properly formatted before being committed.

The script also validates data structures during initialization:

- `ItemOrder` asserts no duplicate items
- `ItemOrder` asserts list length ≤ enum length

Sources:[contracts/lib/forge-std/scripts/vm.py#103-105](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L103-L105)[contracts/lib/forge-std/scripts/vm.py#387-391](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/scripts/vm.py#L387-L391)

---

Note: This code generation system is part of the forge-std infrastructure and is not specific to the Aegis project. However, Aegis depends on forge-std for testing, so understanding this generation mechanism helps explain how the `vm` cheatcodes become available in test files throughout the codebase.