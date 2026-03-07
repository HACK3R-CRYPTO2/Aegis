# Testing
Relevant source files
- [contracts/.github/workflows/test.yml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

This document describes the testing infrastructure for the Aegis smart contract system. It covers the integration test suite, local test execution, and the automated CI/CD pipeline that validates contract behavior across multiple compiler versions.

For deployment procedures after testing, see [Deployment](/HACK3R-CRYPTO/Aegis/3-deployment). For setting up your development environment to run tests, see [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup).

## Testing Philosophy

The Aegis testing strategy focuses on **integration testing** over unit testing due to the cross-chain nature of the system. The test suite validates the complete circuit breaker flow from price oracle updates on Ethereum Sepolia through to swap blocking on Unichain, ensuring that all three blockchain layers (L1, Reactive Network, L2) interact correctly.

All tests are written using the Foundry testing framework and inherit from `forge-std/Test.sol`, which provides cheatcode access for blockchain state manipulation and event assertion capabilities.

**Sources:**[contracts/README.md59-95](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L59-L95)

## Test Execution

### Local Testing

Tests are executed using the `forge test` command from the Foundry toolchain. The standard invocation includes verbose output flags for debugging:

```
forge test -vvv
```

The verbosity levels control output detail:

- `-v`: Display test names only
- `-vv`: Show test names and failure reasons
- `-vvv`: Show test names, failure reasons, and all emitted events
- `-vvvv`: Show full trace including call stacks

To run specific test contracts, use the `--match-contract` flag:

```
forge test --match-contract AegisIntegrationTest -vv
```

**Sources:**[contracts/README.md80-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L80-L83)[contracts/.github/workflows/test.yml31-34](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L31-L34)

### Test Contract Structure

The primary test contract is `AegisIntegrationTest`, which orchestrates multi-contract interactions to validate the autonomous circuit breaker mechanism. This test contract simulates the complete flow from oracle price updates to swap rejection.

```
setPrice()

expectEmit()

setPanicMode()

vm.expectRevert()

emit PriceUpdate

cross-chain call

beforeSwap() reverts

inherits

provides

AegisIntegrationTest.sol

MockOracle.sol

AegisSentinel.sol

AegisHook.sol

Uniswap v4 Pool

forge-std/Test.sol

vm.expectRevert()
vm.expectEmit()
vm.prank()
```

**Sources:**[contracts/README.md80-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L80-L83)

## Integration Test Suite

The test suite validates four critical scenarios that form the core of the Aegis protection mechanism. Each test is isolated but builds upon the previous to demonstrate the complete system behavior.

### Test Scenarios
Test CaseContract Under TestValidation TargetExpected Outcome**Oracle Update**`MockOracle`Price feed update mechanism`PriceUpdate` event emitted with new price**Access Control**`AegisHook`Sentinel-only authorizationNon-sentinel calls to `setPanicMode()` revert**Panic Trigger**`AegisSentinel` + `AegisHook`Cross-chain message delivery`panicMode` state variable transitions to `true`**Circuit Breaker**`AegisHook` + Uniswap v4 PoolSwap blocking enforcement`beforeSwap()` reverts with `PoolPaused()` error
**Sources:**[contracts/README.md85-95](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L85-L95)

### Test Flow Diagram

This diagram maps the test execution flow to specific contract functions and state transitions:

```
"PoolManager
swap()"
"AegisHook
setPanicMode()
beforeSwap()"
"AegisSentinel
react()"
"MockOracle
setPrice()"
"AegisIntegrationTest"
"PoolManager
swap()"
"AegisHook
setPanicMode()
beforeSwap()"
"AegisSentinel
react()"
"MockOracle
setPrice()"
"AegisIntegrationTest"
Test 1: Oracle Update
Test 2: Access Control
Test 3: Panic Trigger
Test 4: Circuit Breaker
setPrice(1000)
latestPrice = 1000
emit PriceUpdate(1000)
assert event emitted
setPanicMode(true)
[as non-sentinel]
revert Unauthorized()
assert revert
simulate price < THRESHOLD
setPanicMode(true)
[cross-chain]
panicMode = true
success
panicMode?
true
assert panicMode == true
swap(params)
beforeSwap(...)
if (panicMode) revert
revert PoolPaused()
revert PoolPaused()
vm.expectRevert(PoolPaused)
```

**Sources:**[contracts/README.md85-95](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L85-L95)

## CI/CD Pipeline

The automated testing pipeline is defined in `.github/workflows/test.yml` and executes on every code change (currently configured for manual dispatch via `workflow_dispatch`, with push/pull request triggers commented out).

### Workflow Configuration

```
test job (ubuntu-latest)

workflow_dispatch
(manual)

actions/checkout@v4
--submodules recursive

foundry-rs/foundry-toolchain@v1
version: stable

forge build --sizes

forge test -vvv

CI Pass

CI Fail
```

**Sources:**[contracts/.github/workflows/test.yml1-35](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L1-L35)

### Environment Configuration

The CI pipeline uses a dedicated Foundry profile to optimize for continuous integration:
Environment VariableValuePurpose`FOUNDRY_PROFILE``ci`Activates CI-specific configuration in `foundry.toml`
This profile typically includes:

- Reduced fuzz runs for faster execution
- Stricter compiler warnings
- Optimized gas reporting

**Sources:**[contracts/.github/workflows/test.yml8-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L8-L9)

### Pipeline Steps

The GitHub Actions workflow executes in the following sequence:

1. **Checkout**[contracts/.github/workflows/test.yml16-18](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L16-L18)

- Clones repository with full Git submodule recursion
- Ensures all dependencies (`forge-std`, `uniswap-hooks`, `hookmate`, `system-smart-contracts`) are initialized
2. **Install Foundry**[contracts/.github/workflows/test.yml20-23](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L20-L23)

- Installs the stable release of the Foundry toolchain
- Provides `forge`, `cast`, and `anvil` binaries
3. **Build**[contracts/.github/workflows/test.yml25-29](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L25-L29)

- Outputs Foundry version for debugging: `forge --version`
- Compiles all contracts with size reporting: `forge build --sizes`
- Validates Solidity compilation across configured versions
4. **Test**[contracts/.github/workflows/test.yml31-34](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L31-L34)

- Executes full test suite: `forge test -vvv`
- Verbosity level `-vvv` captures all event emissions for failure diagnosis
- Job fails if any test case reverts unexpectedly

**Sources:**[contracts/.github/workflows/test.yml16-34](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L16-L34)

## Quality Gates

### Code Formatting

Foundry includes a built-in formatter (`forge fmt`) that enforces consistent Solidity style. The CI pipeline can be configured to validate formatting:

```
forge fmt --check
```

This command exits with a non-zero status if any files require formatting, preventing unformatted code from merging.

**Sources:** Referenced in high-level architecture diagrams

### Multi-Version Compatibility

The `foundry.toml` configuration specifies a Solidity version range to ensure contracts compile across multiple compiler versions:

```
solc = "0.8.26"
evm_version = "cancun"
```

While the primary version is `0.8.26`, the system architecture documentation indicates compatibility testing from Solc `0.6.2` through `0.8.26`, ensuring maximum interoperability with existing DeFi infrastructure.

**Sources:** Referenced in high-level architecture diagrams, [contracts/README.md1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L123)

### Contract Size Validation

The `forge build --sizes` command outputs contract bytecode sizes to ensure they remain under the 24KB deployment limit imposed by EIP-170. This is critical for L2 deployments where gas optimization directly impacts user costs.

**Sources:**[contracts/.github/workflows/test.yml28](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L28-L28)

## Test Execution Matrix

The following table summarizes the different test execution contexts:
ContextCommandEnvironmentPurpose**Local Development**`forge test -vvv`Developer workstationRapid iteration and debugging**Specific Contract**`forge test --match-contract AegisIntegrationTest -vv`Developer workstationFocused testing during development**CI Pipeline**`forge test -vvv`GitHub Actions (ubuntu-latest)Automated validation on code changes**CI Profile**Uses `FOUNDRY_PROFILE=ci`GitHub ActionsOptimized settings for CI execution
**Sources:**[contracts/README.md80-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L80-L83)[contracts/.github/workflows/test.yml8-34](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.github/workflows/test.yml#L8-L34)

---

**Testing is the foundation of a secure cross-chain system.** The Aegis test suite validates not just individual contract behavior, but the complete autonomous flow from oracle updates to swap protection, ensuring that the circuit breaker mechanism operates correctly across three blockchain networks without manual intervention.