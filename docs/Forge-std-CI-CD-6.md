# Forge-std CI/CDLink copied!
Relevant source files
- [contracts/lib/forge-std/.github/workflows/ci.yml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml)
- [contracts/lib/forge-std/.github/workflows/sync.yml](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml)

This document describes the continuous integration and deployment workflows implemented for the forge-std library, which is a dependency of the Aegis project. These workflows ensure code quality, compatibility across multiple Solidity compiler versions, and automated branch synchronization for release management.

For information about the main Aegis project's CI/CD pipeline, see [Testing and CI/CD](#6.5).

## Workflow OverviewLink copied!

The forge-std repository maintains two GitHub Actions workflows:

WorkflowFilePurposeTriggerCI`.github/workflows/ci.yml`Comprehensive build, test, and quality checksPush to master, PRs, manual dispatchSync Release Branch`.github/workflows/sync.yml`Synchronize release branch with tagged releasesRelease creation

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#1-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L1-L83)[contracts/lib/forge-std/.github/workflows/sync.yml#1-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L1-L32)

## CI Workflow ArchitectureLink copied!

### Workflow Jobs and DependenciesLink copied!

#mermaid-kpnl67t50pp{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-kpnl67t50pp .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-kpnl67t50pp .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-kpnl67t50pp .error-icon{fill:#a44141;}#mermaid-kpnl67t50pp .error-text{fill:#ddd;stroke:#ddd;}#mermaid-kpnl67t50pp .edge-thickness-normal{stroke-width:1px;}#mermaid-kpnl67t50pp .edge-thickness-thick{stroke-width:3.5px;}#mermaid-kpnl67t50pp .edge-pattern-solid{stroke-dasharray:0;}#mermaid-kpnl67t50pp .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-kpnl67t50pp .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-kpnl67t50pp .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-kpnl67t50pp .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-kpnl67t50pp .marker.cross{stroke:lightgrey;}#mermaid-kpnl67t50pp svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-kpnl67t50pp p{margin:0;}#mermaid-kpnl67t50pp .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-kpnl67t50pp .cluster-label text{fill:#F9FFFE;}#mermaid-kpnl67t50pp .cluster-label span{color:#F9FFFE;}#mermaid-kpnl67t50pp .cluster-label span p{background-color:transparent;}#mermaid-kpnl67t50pp .label text,#mermaid-kpnl67t50pp span{fill:#ccc;color:#ccc;}#mermaid-kpnl67t50pp .node rect,#mermaid-kpnl67t50pp .node circle,#mermaid-kpnl67t50pp .node ellipse,#mermaid-kpnl67t50pp .node polygon,#mermaid-kpnl67t50pp .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-kpnl67t50pp .rough-node .label text,#mermaid-kpnl67t50pp .node .label text,#mermaid-kpnl67t50pp .image-shape .label,#mermaid-kpnl67t50pp .icon-shape .label{text-anchor:middle;}#mermaid-kpnl67t50pp .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-kpnl67t50pp .rough-node .label,#mermaid-kpnl67t50pp .node .label,#mermaid-kpnl67t50pp .image-shape .label,#mermaid-kpnl67t50pp .icon-shape .label{text-align:center;}#mermaid-kpnl67t50pp .node.clickable{cursor:pointer;}#mermaid-kpnl67t50pp .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-kpnl67t50pp .arrowheadPath{fill:lightgrey;}#mermaid-kpnl67t50pp .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-kpnl67t50pp .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-kpnl67t50pp .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-kpnl67t50pp .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-kpnl67t50pp .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-kpnl67t50pp .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-kpnl67t50pp .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-kpnl67t50pp .cluster text{fill:#F9FFFE;}#mermaid-kpnl67t50pp .cluster span{color:#F9FFFE;}#mermaid-kpnl67t50pp div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-kpnl67t50pp .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-kpnl67t50pp rect.text{fill:none;stroke-width:0;}#mermaid-kpnl67t50pp .icon-shape,#mermaid-kpnl67t50pp .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-kpnl67t50pp .icon-shape p,#mermaid-kpnl67t50pp .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-kpnl67t50pp .icon-shape rect,#mermaid-kpnl67t50pp .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-kpnl67t50pp .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-kpnl67t50pp .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-kpnl67t50pp :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Yes

No

Test Matrix Strategy

stable toolchain

nightly toolchain

Build Matrix Strategy

stable toolchain

nightly toolchain

9 flag combinations per toolchain

Trigger Events (push to master, PR, manual)

build job

test job

fmt job

typos job

ci-success job (requires all)

All Green?

✓ CI Pass

✗ CI Fail

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#10-82](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L10-L82)

The CI workflow is triggered on three events: pushes to the `master` branch, pull requests, and manual workflow dispatch [contracts/lib/forge-std/.github/workflows/ci.yml#3-8](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L3-L8) All jobs run in parallel and must succeed for the `ci-success` job to pass [contracts/lib/forge-std/.github/workflows/ci.yml#69-82](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L69-L82)

### Build Job Matrix ConfigurationLink copied!

The `build` job employs a comprehensive matrix strategy to ensure compatibility across multiple Solidity compiler versions and compilation modes:

DimensionValuesToolchain`stable`, `nightly`Solidity Versions0.6.2, 0.6.12, 0.7.0, 0.7.6, 0.8.0, 0.8.17, latestIR ModeDefault, `--via-ir`

Build Job Execution Flow:

forge CLIFoundry Toolchainubuntu-latest RunnerGitHub Actionsforge CLIFoundry Toolchainubuntu-latest RunnerGitHub Actions#mermaid-7it6dm9aztd{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-7it6dm9aztd .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-7it6dm9aztd .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-7it6dm9aztd .error-icon{fill:#a44141;}#mermaid-7it6dm9aztd .error-text{fill:#ddd;stroke:#ddd;}#mermaid-7it6dm9aztd .edge-thickness-normal{stroke-width:1px;}#mermaid-7it6dm9aztd .edge-thickness-thick{stroke-width:3.5px;}#mermaid-7it6dm9aztd .edge-pattern-solid{stroke-dasharray:0;}#mermaid-7it6dm9aztd .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-7it6dm9aztd .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-7it6dm9aztd .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-7it6dm9aztd .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-7it6dm9aztd .marker.cross{stroke:lightgrey;}#mermaid-7it6dm9aztd svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-7it6dm9aztd p{margin:0;}#mermaid-7it6dm9aztd .actor{stroke:#ccc;fill:#1f2020;}#mermaid-7it6dm9aztd text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-7it6dm9aztd .actor-line{stroke:#ccc;}#mermaid-7it6dm9aztd .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-7it6dm9aztd .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-7it6dm9aztd .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-7it6dm9aztd #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-7it6dm9aztd .sequenceNumber{fill:black;}#mermaid-7it6dm9aztd #sequencenumber{fill:lightgrey;}#mermaid-7it6dm9aztd #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-7it6dm9aztd .messageText{fill:lightgrey;stroke:none;}#mermaid-7it6dm9aztd .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-7it6dm9aztd .labelText,#mermaid-7it6dm9aztd .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-7it6dm9aztd .loopText,#mermaid-7it6dm9aztd .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-7it6dm9aztd .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-7it6dm9aztd .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-7it6dm9aztd .noteText,#mermaid-7it6dm9aztd .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-7it6dm9aztd .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-7it6dm9aztd .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-7it6dm9aztd .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-7it6dm9aztd .actorPopupMenu{position:absolute;}#mermaid-7it6dm9aztd .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-7it6dm9aztd .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-7it6dm9aztd .actor-man circle,#mermaid-7it6dm9aztd line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-7it6dm9aztd :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Via-IR compilation time checkalt[Via-IR Flag Present]alt[Build Success][Build Failure]Checkout code @ actions/checkout@v4Install Foundry @ foundry-rs/foundry-toolchain@v1Execute "forge --version"Version infoExecute "forge build --skip test --deny-warnings $flags"Build outputExecute "forge build --contracts test/compilation/*"Build outputJob SuccessJob Failure

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#11-36](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L11-L36)

The build job performs the following steps:

1. Checkout: Uses `actions/checkout@v4` to fetch the repository code [contracts/lib/forge-std/.github/workflows/ci.yml#30](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L30-L30)
2. Toolchain Setup: Installs Foundry using `foundry-rs/foundry-toolchain@v1`[contracts/lib/forge-std/.github/workflows/ci.yml#31](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L31-L31)
3. Version Check: Runs `forge --version` to verify installation [contracts/lib/forge-std/.github/workflows/ci.yml#32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L32-L32)
4. Main Build: Executes `forge build --skip test --deny-warnings` with matrix flags [contracts/lib/forge-std/.github/workflows/ci.yml#33](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L33-L33)
5. Via-IR Validation: If `--via-ir` flag is present, builds compilation test contracts [contracts/lib/forge-std/.github/workflows/ci.yml#35-36](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L35-L36)

The `fail-fast: false` configuration [contracts/lib/forge-std/.github/workflows/ci.yml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L16-L16) ensures all matrix combinations are tested even if one fails, providing comprehensive compatibility reports.

### Test JobLink copied!

The test job runs with both `stable` and `nightly` toolchain versions:

#mermaid-ttev2p3ielm{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ttev2p3ielm .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ttev2p3ielm .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ttev2p3ielm .error-icon{fill:#a44141;}#mermaid-ttev2p3ielm .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ttev2p3ielm .edge-thickness-normal{stroke-width:1px;}#mermaid-ttev2p3ielm .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ttev2p3ielm .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ttev2p3ielm .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ttev2p3ielm .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ttev2p3ielm .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ttev2p3ielm .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ttev2p3ielm .marker.cross{stroke:lightgrey;}#mermaid-ttev2p3ielm svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ttev2p3ielm p{margin:0;}#mermaid-ttev2p3ielm .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-ttev2p3ielm .cluster-label text{fill:#F9FFFE;}#mermaid-ttev2p3ielm .cluster-label span{color:#F9FFFE;}#mermaid-ttev2p3ielm .cluster-label span p{background-color:transparent;}#mermaid-ttev2p3ielm .label text,#mermaid-ttev2p3ielm span{fill:#ccc;color:#ccc;}#mermaid-ttev2p3ielm .node rect,#mermaid-ttev2p3ielm .node circle,#mermaid-ttev2p3ielm .node ellipse,#mermaid-ttev2p3ielm .node polygon,#mermaid-ttev2p3ielm .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-ttev2p3ielm .rough-node .label text,#mermaid-ttev2p3ielm .node .label text,#mermaid-ttev2p3ielm .image-shape .label,#mermaid-ttev2p3ielm .icon-shape .label{text-anchor:middle;}#mermaid-ttev2p3ielm .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-ttev2p3ielm .rough-node .label,#mermaid-ttev2p3ielm .node .label,#mermaid-ttev2p3ielm .image-shape .label,#mermaid-ttev2p3ielm .icon-shape .label{text-align:center;}#mermaid-ttev2p3ielm .node.clickable{cursor:pointer;}#mermaid-ttev2p3ielm .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-ttev2p3ielm .arrowheadPath{fill:lightgrey;}#mermaid-ttev2p3ielm .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-ttev2p3ielm .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-ttev2p3ielm .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ttev2p3ielm .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-ttev2p3ielm .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ttev2p3ielm .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-ttev2p3ielm .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-ttev2p3ielm .cluster text{fill:#F9FFFE;}#mermaid-ttev2p3ielm .cluster span{color:#F9FFFE;}#mermaid-ttev2p3ielm div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-ttev2p3ielm .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-ttev2p3ielm rect.text{fill:none;stroke-width:0;}#mermaid-ttev2p3ielm .icon-shape,#mermaid-ttev2p3ielm .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-ttev2p3ielm .icon-shape p,#mermaid-ttev2p3ielm .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-ttev2p3ielm .icon-shape rect,#mermaid-ttev2p3ielm .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-ttev2p3ielm .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-ttev2p3ielm .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-ttev2p3ielm :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Pass

Fail

test job

actions/checkout@v4 foundry-rs/foundry-toolchain@v1

forge --version

forge test -vvv

Test Result

✓ Job Success

✗ Job Failure

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#38-51](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L38-L51)

The test execution uses the `-vvv` flag [contracts/lib/forge-std/.github/workflows/ci.yml#51](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L51-L51) for maximum verbosity, which outputs:

- Stack traces for all test failures
- Emitted events during test execution
- Gas usage statistics
- Detailed assertion failure messages

### Format Verification JobLink copied!

The `fmt` job enforces code formatting consistency:

Job Specification:

ParameterValueRunner`ubuntu-latest`Timeout10 minutesCommand`forge fmt --check`

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#53-60](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L53-L60)

The `--check` flag [contracts/lib/forge-std/.github/workflows/ci.yml#60](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L60-L60) runs the formatter in validation mode without modifying files. If any file deviates from the standard format, the job fails and reports the non-compliant files.

### Typos Detection JobLink copied!

The `typos` job scans the codebase for spelling errors using the `typos` tool:

#mermaid-7j3ylowkigo{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-7j3ylowkigo .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-7j3ylowkigo .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-7j3ylowkigo .error-icon{fill:#a44141;}#mermaid-7j3ylowkigo .error-text{fill:#ddd;stroke:#ddd;}#mermaid-7j3ylowkigo .edge-thickness-normal{stroke-width:1px;}#mermaid-7j3ylowkigo .edge-thickness-thick{stroke-width:3.5px;}#mermaid-7j3ylowkigo .edge-pattern-solid{stroke-dasharray:0;}#mermaid-7j3ylowkigo .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-7j3ylowkigo .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-7j3ylowkigo .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-7j3ylowkigo .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-7j3ylowkigo .marker.cross{stroke:lightgrey;}#mermaid-7j3ylowkigo svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-7j3ylowkigo p{margin:0;}#mermaid-7j3ylowkigo .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-7j3ylowkigo .cluster-label text{fill:#F9FFFE;}#mermaid-7j3ylowkigo .cluster-label span{color:#F9FFFE;}#mermaid-7j3ylowkigo .cluster-label span p{background-color:transparent;}#mermaid-7j3ylowkigo .label text,#mermaid-7j3ylowkigo span{fill:#ccc;color:#ccc;}#mermaid-7j3ylowkigo .node rect,#mermaid-7j3ylowkigo .node circle,#mermaid-7j3ylowkigo .node ellipse,#mermaid-7j3ylowkigo .node polygon,#mermaid-7j3ylowkigo .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-7j3ylowkigo .rough-node .label text,#mermaid-7j3ylowkigo .node .label text,#mermaid-7j3ylowkigo .image-shape .label,#mermaid-7j3ylowkigo .icon-shape .label{text-anchor:middle;}#mermaid-7j3ylowkigo .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-7j3ylowkigo .rough-node .label,#mermaid-7j3ylowkigo .node .label,#mermaid-7j3ylowkigo .image-shape .label,#mermaid-7j3ylowkigo .icon-shape .label{text-align:center;}#mermaid-7j3ylowkigo .node.clickable{cursor:pointer;}#mermaid-7j3ylowkigo .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-7j3ylowkigo .arrowheadPath{fill:lightgrey;}#mermaid-7j3ylowkigo .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-7j3ylowkigo .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-7j3ylowkigo .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-7j3ylowkigo .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-7j3ylowkigo .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-7j3ylowkigo .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-7j3ylowkigo .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-7j3ylowkigo .cluster text{fill:#F9FFFE;}#mermaid-7j3ylowkigo .cluster span{color:#F9FFFE;}#mermaid-7j3ylowkigo div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-7j3ylowkigo .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-7j3ylowkigo rect.text{fill:none;stroke-width:0;}#mermaid-7j3ylowkigo .icon-shape,#mermaid-7j3ylowkigo .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-7j3ylowkigo .icon-shape p,#mermaid-7j3ylowkigo .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-7j3ylowkigo .icon-shape rect,#mermaid-7j3ylowkigo .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-7j3ylowkigo .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-7j3ylowkigo .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-7j3ylowkigo :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

None

Found

typos job

actions/checkout@v4

crate-ci/typos@v1

Typos Found?

✓ Job Success

✗ Job Failure (lists typos)

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#62-67](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L62-L67)

This job uses the `crate-ci/typos@v1` action [contracts/lib/forge-std/.github/workflows/ci.yml#67](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L67-L67) to detect common spelling mistakes in code comments, documentation, and string literals.

### CI Success GateLink copied!

The `ci-success` job serves as a required status check gate:

#mermaid-m9w67hf4exa{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-m9w67hf4exa .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-m9w67hf4exa .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-m9w67hf4exa .error-icon{fill:#a44141;}#mermaid-m9w67hf4exa .error-text{fill:#ddd;stroke:#ddd;}#mermaid-m9w67hf4exa .edge-thickness-normal{stroke-width:1px;}#mermaid-m9w67hf4exa .edge-thickness-thick{stroke-width:3.5px;}#mermaid-m9w67hf4exa .edge-pattern-solid{stroke-dasharray:0;}#mermaid-m9w67hf4exa .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-m9w67hf4exa .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-m9w67hf4exa .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-m9w67hf4exa .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-m9w67hf4exa .marker.cross{stroke:lightgrey;}#mermaid-m9w67hf4exa svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-m9w67hf4exa p{margin:0;}#mermaid-m9w67hf4exa .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#ccc;}#mermaid-m9w67hf4exa .cluster-label text{fill:#F9FFFE;}#mermaid-m9w67hf4exa .cluster-label span{color:#F9FFFE;}#mermaid-m9w67hf4exa .cluster-label span p{background-color:transparent;}#mermaid-m9w67hf4exa .label text,#mermaid-m9w67hf4exa span{fill:#ccc;color:#ccc;}#mermaid-m9w67hf4exa .node rect,#mermaid-m9w67hf4exa .node circle,#mermaid-m9w67hf4exa .node ellipse,#mermaid-m9w67hf4exa .node polygon,#mermaid-m9w67hf4exa .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-m9w67hf4exa .rough-node .label text,#mermaid-m9w67hf4exa .node .label text,#mermaid-m9w67hf4exa .image-shape .label,#mermaid-m9w67hf4exa .icon-shape .label{text-anchor:middle;}#mermaid-m9w67hf4exa .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-m9w67hf4exa .rough-node .label,#mermaid-m9w67hf4exa .node .label,#mermaid-m9w67hf4exa .image-shape .label,#mermaid-m9w67hf4exa .icon-shape .label{text-align:center;}#mermaid-m9w67hf4exa .node.clickable{cursor:pointer;}#mermaid-m9w67hf4exa .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-m9w67hf4exa .arrowheadPath{fill:lightgrey;}#mermaid-m9w67hf4exa .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-m9w67hf4exa .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-m9w67hf4exa .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-m9w67hf4exa .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-m9w67hf4exa .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-m9w67hf4exa .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-m9w67hf4exa .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-m9w67hf4exa .cluster text{fill:#F9FFFE;}#mermaid-m9w67hf4exa .cluster span{color:#F9FFFE;}#mermaid-m9w67hf4exa div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-m9w67hf4exa .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-m9w67hf4exa rect.text{fill:none;stroke-width:0;}#mermaid-m9w67hf4exa .icon-shape,#mermaid-m9w67hf4exa .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-m9w67hf4exa .icon-shape p,#mermaid-m9w67hf4exa .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-m9w67hf4exa .icon-shape rect,#mermaid-m9w67hf4exa .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-m9w67hf4exa .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-m9w67hf4exa .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-m9w67hf4exa :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}

Yes

No

ci-success job runs-on: ubuntu-latest if: always()

build job result

test job result

fmt job result

typos job result

re-actors/alls-green@release/v1 Evaluate all job results

All Jobs Successful?

✓ CI Success Branch Protection Pass

✗ CI Failure Block Merge

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#69-82](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L69-L82)

This job uses the `re-actors/alls-green@release/v1` action [contracts/lib/forge-std/.github/workflows/ci.yml#80](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L80-L80) to aggregate results from all dependent jobs. The `if: always()` condition [contracts/lib/forge-std/.github/workflows/ci.yml#71](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L71-L71) ensures this job runs even if previous jobs fail, allowing it to report the overall CI status.

The job receives the status of all dependent jobs via the `needs` array [contracts/lib/forge-std/.github/workflows/ci.yml#72-76](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L72-L76) and serializes them as JSON input [contracts/lib/forge-std/.github/workflows/ci.yml#82](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L82-L82)

## Release Branch Synchronization WorkflowLink copied!

### Sync Workflow Trigger and LogicLink copied!

The `sync.yml` workflow automates the synchronization of the `v1` release branch with tagged releases:

Git Operationssync-release-branch jobGitHubRepository MaintainerGit Operationssync-release-branch jobGitHubRepository Maintainer#mermaid-ybu7d8lekcf{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-ybu7d8lekcf .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-ybu7d8lekcf .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-ybu7d8lekcf .error-icon{fill:#a44141;}#mermaid-ybu7d8lekcf .error-text{fill:#ddd;stroke:#ddd;}#mermaid-ybu7d8lekcf .edge-thickness-normal{stroke-width:1px;}#mermaid-ybu7d8lekcf .edge-thickness-thick{stroke-width:3.5px;}#mermaid-ybu7d8lekcf .edge-pattern-solid{stroke-dasharray:0;}#mermaid-ybu7d8lekcf .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-ybu7d8lekcf .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-ybu7d8lekcf .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-ybu7d8lekcf .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-ybu7d8lekcf .marker.cross{stroke:lightgrey;}#mermaid-ybu7d8lekcf svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-ybu7d8lekcf p{margin:0;}#mermaid-ybu7d8lekcf .actor{stroke:#ccc;fill:#1f2020;}#mermaid-ybu7d8lekcf text.actor>tspan{fill:lightgrey;stroke:none;}#mermaid-ybu7d8lekcf .actor-line{stroke:#ccc;}#mermaid-ybu7d8lekcf .innerArc{stroke-width:1.5;stroke-dasharray:none;}#mermaid-ybu7d8lekcf .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-ybu7d8lekcf .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-ybu7d8lekcf #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-ybu7d8lekcf .sequenceNumber{fill:black;}#mermaid-ybu7d8lekcf #sequencenumber{fill:lightgrey;}#mermaid-ybu7d8lekcf #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-ybu7d8lekcf .messageText{fill:lightgrey;stroke:none;}#mermaid-ybu7d8lekcf .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-ybu7d8lekcf .labelText,#mermaid-ybu7d8lekcf .labelText>tspan{fill:lightgrey;stroke:none;}#mermaid-ybu7d8lekcf .loopText,#mermaid-ybu7d8lekcf .loopText>tspan{fill:lightgrey;stroke:none;}#mermaid-ybu7d8lekcf .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-ybu7d8lekcf .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-ybu7d8lekcf .noteText,#mermaid-ybu7d8lekcf .noteText>tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-ybu7d8lekcf .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-ybu7d8lekcf .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-ybu7d8lekcf .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-ybu7d8lekcf .actorPopupMenu{position:absolute;}#mermaid-ybu7d8lekcf .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-ybu7d8lekcf .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-ybu7d8lekcf .actor-man circle,#mermaid-ybu7d8lekcf line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-ybu7d8lekcf :root{--mermaid-font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;}Move v1 to release tagalt[Tag does not start with "v1"][Tag starts with "v1"]Create Release with tag v1.x.xTrigger "release.created" eventSkip execution (if condition false)actions/checkout@v4 (fetch-depth: 0 | ref: v1)Full history, v1 branch checked outConfigure git user (github-actions[bot])User configuredgit fetch --tagsTags fetchedgit checkout v1On v1 branchgit reset --hard ${GITHUB_REF}Branch reset completegit push --forcev1 branch updated

Sources:[contracts/lib/forge-std/.github/workflows/sync.yml#1-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L1-L32)

Workflow Configuration:

ParameterValuePurposeTrigger Event`release.created`Runs when a new release is publishedCondition`startsWith(github.event.release.tag_name, 'v1')`Only processes v1.x.x releasesFetch Depth`0`Fetches complete git historyCheckout Ref`v1`Checks out the v1 branch

The workflow performs the following operations:

1. Repository Checkout: Fetches the complete git history with `fetch-depth: 0`[contracts/lib/forge-std/.github/workflows/sync.yml#16](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L16-L16) and checks out the `v1` branch [contracts/lib/forge-std/.github/workflows/sync.yml#17](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L17-L17)
2. Git Configuration: Sets the git author to `github-actions[bot]` with email `41898282+github-actions[bot]@users.noreply.github.com`[contracts/lib/forge-std/.github/workflows/sync.yml#22-24](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L22-L24)
3. Branch Synchronization:

- Fetches all tags with `git fetch --tags`[contracts/lib/forge-std/.github/workflows/sync.yml#28](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L28-L28)
- Checks out the `v1` branch [contracts/lib/forge-std/.github/workflows/sync.yml#29](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L29-L29)
- Hard resets to the release tag with `git reset --hard ${GITHUB_REF}`[contracts/lib/forge-std/.github/workflows/sync.yml#30](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L30-L30)
- Force pushes the updated branch with `git push --force`[contracts/lib/forge-std/.github/workflows/sync.yml#31](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L31-L31)

This workflow maintains a stable `v1` branch that tracks the latest v1.x.x release, allowing consumers to use `v1` as a moving target for the latest stable version within the v1 major version line.

## Workflow Execution EnvironmentLink copied!

Both workflows execute on GitHub-hosted runners with the following specifications:

ConfigurationValueOperating System`ubuntu-latest`Default Timeout10 minutesConcurrency ControlNone (all pushes trigger separate runs)

Sources:[contracts/lib/forge-std/.github/workflows/ci.yml#13-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L13-L14)[contracts/lib/forge-std/.github/workflows/ci.yml#39-40](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/ci.yml#L39-L40)[contracts/lib/forge-std/.github/workflows/sync.yml#10](https://github.com/HACK3R-CRYPTO/Aegis/blob/e155cd67/contracts/lib/forge-std/.github/workflows/sync.yml#L10-L10)

The 10-minute timeout prevents hung jobs from consuming runner resources indefinitely. In practice, the CI workflow typically completes in 2-5 minutes, and the sync workflow completes in under 30 seconds.