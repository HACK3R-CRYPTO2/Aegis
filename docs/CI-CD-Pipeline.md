# CI/CD Pipeline
Relevant source files
- [contracts/.github/workflows/test.yml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

## Purpose and Scope

This document describes the Continuous Integration and Continuous Deployment (CI/CD) infrastructure for the Aegis smart contracts. The CI/CD pipeline automates the build and test process using GitHub Actions and the Foundry toolchain. For information about the actual test suite that runs in the pipeline, see [Test Suite](/HACK3R-CRYPTO/Aegis/5.1-test-suite). For details on Foundry configuration, see [Foundry Configuration](/HACK3R-CRYPTO/Aegis/4.4-foundry-configuration).

## Workflow Overview

The Aegis project uses GitHub Actions to automate smart contract testing and validation. The pipeline ensures that all code changes are automatically built and tested before deployment, maintaining code quality and preventing regressions.

**Workflow Execution Flow**

```
Build Succeeds

Build Fails

Tests Pass

Tests Fail

Workflow Trigger
(workflow_dispatch)

Checkout Repository
actions/checkout@v4

Initialize Git Submodules
(recursive)

Install Foundry Toolchain
foundry-rs/foundry-toolchain@v1

forge --version

forge build --sizes

forge test -vvv

✓ CI Success

✗ CI Failure
```

Sources: [contracts/.github/workflows/test.yml1-35](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L1-L35)

## GitHub Actions Configuration

The CI/CD pipeline is defined in the GitHub Actions workflow file located at `.github/workflows/test.yml` within the `contracts/` directory.

### Workflow Metadata
PropertyValueDescription**Name**`Test Suite`Display name in GitHub Actions UI**Trigger**`workflow_dispatch`Manual trigger only (currently)**Runner**`ubuntu-latest`Linux environment for execution**Environment**`FOUNDRY_PROFILE: ci`Uses CI-specific Foundry profile
Sources: [contracts/.github/workflows/test.yml1-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L1-L9)

### Trigger Configuration

The workflow is currently configured for manual triggering via `workflow_dispatch`. Automated triggers for push and pull request events are commented out:

```
on:
  workflow_dispatch:
  # push:
  # pull_request:
```

This configuration suggests the pipeline is in a development or pre-production state. In a production environment, the commented triggers would typically be enabled to run automatically on code changes.

Sources: [contracts/.github/workflows/test.yml3-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L3-L6)

## Workflow Jobs

The pipeline consists of a single job named `test` that runs on `ubuntu-latest`. The job executes three primary steps: checkout, build, and test.

**Job Execution Architecture**

```
Repository Filesystem

GitHub Actions Runner
(ubuntu-latest)

Step 4: Test

Step 3: Build

Step 2: Install Foundry

Step 1: Checkout

Clones Repo

Initializes

Installs

Compiles

Outputs

Executes

Imports

actions/checkout@v4

submodules: recursive

foundry-rs/foundry-toolchain@v1

version: stable

forge --version

forge build --sizes

id: build

forge test -vvv

id: test

src/*.sol

test/*.sol

lib/
(Git Submodules)

out/
(Compiled Artifacts)
```

Sources: [contracts/.github/workflows/test.yml11-34](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L11-L34)

### Step 1: Repository Checkout

The first step checks out the repository code using `actions/checkout@v4` with recursive submodule initialization:

```
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

The `submodules: recursive` option is critical for Aegis because the project depends on multiple Git submodules including `forge-std`, `uniswap-hooks`, `hookmate`, and `system-smart-contracts`. For more information on these dependencies, see [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules).

Sources: [contracts/.github/workflows/test.yml16-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L16-L18)

### Step 2: Foundry Installation

The pipeline installs the Foundry toolchain using the official `foundry-rs/foundry-toolchain@v1` action:

```
- name: Install Foundry
  uses: foundry-rs/foundry-toolchain@v1
  with:
    version: stable
```

This action installs the complete Foundry suite, including:

- `forge` - Smart contract compiler and test runner
- `cast` - Command-line tool for Ethereum RPC calls
- `anvil` - Local Ethereum node

The `version: stable` configuration ensures the latest stable release is used.

Sources: [contracts/.github/workflows/test.yml20-23](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L20-L23)

### Step 3: Build

The build step compiles all Solidity contracts and reports their bytecode sizes:

```
- name: Build
  run: |
    forge --version
    forge build --sizes
  id: build
```

**Build Command Analysis:**
CommandPurpose`forge --version`Verifies Foundry installation and logs version`forge build --sizes`Compiles contracts and displays bytecode sizes
The `--sizes` flag is particularly useful for monitoring contract size limits. Ethereum has a maximum contract size of 24KB (EIP-170), and this flag helps ensure contracts remain deployable.

The step is assigned `id: build` to allow other steps to reference its status if needed.

Sources: [contracts/.github/workflows/test.yml25-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L25-L29)

### Step 4: Test Execution

The final step runs the test suite with verbose output:

```
- name: Test
  run: |
    forge test -vvv
  id: test
```

The `-vvv` flag enables maximum verbosity, providing:

- Stack traces for failed tests
- Decoded event logs
- Gas usage reports
- Detailed assertion failures

This verbosity level is essential for debugging test failures in the CI environment where interactive debugging is not possible.

Sources: [contracts/.github/workflows/test.yml31-34](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L31-L34)

## CI Environment Configuration

The workflow sets the `FOUNDRY_PROFILE` environment variable to `ci` at the workflow level:

```
env:
  FOUNDRY_PROFILE: ci
```

This environment variable instructs Foundry to use the `[profile.ci]` configuration section from `foundry.toml`. However, examining the Foundry configuration file reveals that no explicit `[profile.ci]` section is defined—only `[profile.default]` exists.

**Foundry Profile Resolution**

```
Falls Back To

solc_version

evm_version

via_ir

ffi

FOUNDRY_PROFILE=ci
(GitHub Actions)

foundry.toml

[profile.ci]
(Not Defined)

[profile.default]

Effective Configuration

0.8.26

cancun

true

true
```

When a specified profile doesn't exist, Foundry falls back to the `default` profile. The effective CI configuration includes:
SettingValuePurpose`solc_version``0.8.26`Solidity compiler version`evm_version``cancun`Target EVM version`via_ir``true`Enable IR-based compilation`ffi``true`Allow Foreign Function Interface`bytecode_hash``none`Disable metadata hash
Sources: [contracts/.github/workflows/test.yml8-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L8-L9)[contracts/foundry.toml1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L16)

## Build Process Details

The `forge build` command compiles all Solidity source files in the `src/` directory, resolving imports through the configured remappings.

**Build Process Flow**

```
Build Output

Compilation Process

Input Sources

src/
MockOracle.sol
AegisSentinel.sol
AegisHook.sol
AegisGuardianRegistry.sol

lib/
forge-std
uniswap-hooks
hookmate
system-smart-contracts

Remapping Resolution

Solidity Compiler v0.8.26

IR-based Optimizer
(via_ir = true)

Bytecode Generation

out/
Compiled Artifacts

Contract ABIs (JSON)

Deployment Bytecode

Contract Sizes Report
```

The remappings defined in `foundry.toml` are critical for resolving imports:

```
remappings = [
    "reactive-lib/=lib/system-smart-contracts/lib/reactive-lib/src/",
    "system-smart-contracts/=lib/system-smart-contracts/src/",
    "v4-core/=lib/uniswap-hooks/lib/v4-core/",
    "v4-periphery/=lib/uniswap-hooks/lib/v4-periphery/"
]
```

These remappings allow contracts to import dependencies using clean paths like `import "v4-core/interfaces/IHooks.sol"` instead of relative paths.

Sources: [contracts/foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L9-L14)

## Test Execution Details

The `forge test` command discovers and executes all test contracts in the `test/` directory. Test contracts inherit from `forge-std/Test.sol` and follow the naming convention `*.t.sol`.

**Test Execution Pipeline**

```
Test Results

Test Execution

Test Environment Setup

Anvil Instance
(Fork Configuration)

Foundry Cheatcodes
(vm.prank, vm.expectRevert)

Deploy Test Fixtures

Test Discovery
(test/*.t.sol)

OracleUpdateTest

AccessControlTest

PanicTriggerTest

CircuitBreakerTest

setUp() Functions

test*() Functions

require() / assertEq()

✓ Passed Tests

✗ Failed Tests

Gas Usage Report

Stack Traces (-vvv)
```

The `-vvv` verbosity flag provides detailed output for debugging:

**Verbosity Levels**
FlagOutput LevelUse Case(none)MinimalProduction runs, quick checks`-v`MediumBasic test execution logs`-vv`HighStack traces on failures`-vvv`MaximumFull traces, events, gas reports`-vvvv`DebugAll EVM opcodes
The CI pipeline uses `-vvv` to ensure sufficient information is captured for diagnosing failures without overwhelming the logs with opcode-level details.

Sources: [contracts/.github/workflows/test.yml32-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L32-L33)

## Triggering the Pipeline

The current workflow configuration only supports manual triggering through the GitHub Actions UI via `workflow_dispatch`. This means:

1. Navigate to the repository's **Actions** tab on GitHub
2. Select the **Test Suite** workflow
3. Click **Run workflow** button
4. Select the branch to run against
5. Click **Run workflow** to start execution

**Workflow Trigger Configuration Options**

```
Production Configuration

Commented Configuration

Current Configuration

Uncomment Lines 5-6

Currently Disabled

Currently Disabled

workflow_dispatch
(Manual Only)

push
(Auto on Push)

pull_request
(Auto on PR)

workflow_dispatch
+ push
+ pull_request
```

To enable automated CI on code changes, uncomment lines 5-6 in the workflow file:

```
# Uncomment these lines for automatic triggers:
# push:
# pull_request:
```

This would enable the workflow to run automatically on:

- Every push to any branch
- Every pull request creation and update

Sources: [contracts/.github/workflows/test.yml3-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L3-L6)

## Integration with Development Workflow

The CI/CD pipeline integrates with the broader development workflow to ensure code quality before deployment:

**Development Workflow Integration**

```
Fix Issues

Local Development
(forge build, forge test)

Git Commit
(Local Changes)

Git Push
(Remote Repository)

Manual CI Trigger
(workflow_dispatch)

GitHub Actions
Build Step

GitHub Actions
Test Step

✓ CI Passes

✗ CI Fails

Deployment Scripts
(04_, 05_, 06_Deploy*.s.sol)

Live Networks
(Sepolia, Reactive, Unichain)
```

The pipeline serves as a quality gate before deployment to live networks. The deployment scripts (documented in [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts)) should only be executed after CI passes.

Sources: [contracts/.github/workflows/test.yml1-35](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L1-L35)

## Future Enhancements

Potential improvements to the CI/CD pipeline include:
EnhancementBenefitImplementation**Automatic Triggers**Run CI on every push/PRUncomment lines 5-6 in `test.yml`**Code Coverage**Track test coverage metricsAdd `forge coverage` step**Gas Snapshots**Monitor gas usage changesAdd `forge snapshot --check`**Slither Analysis**Static security analysisAdd Slither action**Deployment Preview**Test deployment scriptsAdd dry-run deployment step**Multi-chain Testing**Validate fork testsAdd forking tests for each network
The most immediate improvement would be enabling automatic triggers to catch issues earlier in the development cycle.

Sources: [contracts/.github/workflows/test.yml1-35](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L1-L35)[contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)