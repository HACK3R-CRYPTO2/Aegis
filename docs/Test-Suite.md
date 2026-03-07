# Test Suite
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

## Purpose and Scope

This document describes the integration test suite for the Aegis circuit breaker system. The test suite validates the core cross-chain protection mechanism, including oracle updates, access control, panic mode activation, and the circuit breaker functionality that prevents swaps during volatile market conditions.

For information about the automated CI/CD execution of these tests, see [CI/CD Pipeline](/HACK3R-CRYPTO/Aegis/5.2-cicd-pipeline). For details on the individual smart contracts being tested, see [Smart Contracts](/HACK3R-CRYPTO/Aegis/2-smart-contracts).

**Sources:**[README.md125-136](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L125-L136)[contracts/README.md85-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L85-L94)

---

## Overview

The Aegis test suite consists of four primary integration tests that validate the end-to-end functionality of the cross-chain circuit breaker system. These tests are implemented using the Foundry testing framework and are executed via the `AegisIntegrationTest` contract.
Test NameContract Under TestValidation TargetExpected Outcome**Oracle Update**`MockOracle`Price feed updates on L1Price value changes and event emission**Access Control**`AegisHook`Permission boundariesOnly `AegisSentinel` can trigger panic mode**Panic Trigger**`AegisSentinel`Cross-chain message delivery`setPanicMode(true)` executes on L2**Circuit Breaker**`AegisHook`Swap rejection during panic`beforeSwap()` reverts with `PoolPaused()`
**Sources:**[README.md129-134](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L129-L134)[contracts/README.md88-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L88-L94)

---

## Test Execution

The test suite is executed using Foundry's `forge test` command with specific flags for verbosity and contract targeting.

### Basic Execution

```
forge test --match-contract AegisIntegrationTest -vv
```

This command runs all tests in the `AegisIntegrationTest` contract with moderate verbosity (`-vv`), displaying test names and assertion failures.

### Verbose Execution

```
forge test --match-contract AegisIntegrationTest -vvv
```

The `-vvv` flag provides detailed stack traces and gas reports, useful for debugging test failures or analyzing execution paths.

**Sources:**[contracts/README.md79-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L79-L83)[README.md106-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L106-L110)

---

## Test Architecture

The test suite follows a modular architecture that mirrors the multi-chain deployment structure of Aegis. Each test simulates interactions across the three-network topology.

```
Simulated Unichain

Simulated Reactive Network

Simulated Ethereum Sepolia

Test Environment (Foundry)

setPrice()

setPanicMode()

assert access control

PriceUpdate event

cross-chain call

beforeSwap()

recordIntervention()

AegisIntegrationTest
(forge-std/Test.sol)

MockOracle

AegisGuardianRegistry

AegisSentinel

AegisHook

Uniswap v4 PoolManager
```

**Test Contract Structure:** The `AegisIntegrationTest` inherits from `forge-std/Test.sol`, providing access to assertion helpers (`assertEq`, `assertTrue`), cheatcodes (`vm.prank`, `vm.expectRevert`), and deployment utilities.

**Sources:**[contracts/README.md7-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L7-L26)[README.md56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L56-L75)

---

## Test Case Details

### 1. Oracle Update Test

**Objective:** Verify that the `MockOracle` contract correctly updates price values and emits the required `PriceUpdate` event.

**Test Flow:**

```
"MockOracle"
"AegisIntegrationTest"
"MockOracle"
"AegisIntegrationTest"
"setPrice(1000)"
"Update latestPrice = 1000"
"emit PriceUpdate(1000, timestamp)"
"getLatestPrice()"
"Returns 1000"
"assertEq(price, 1000)"
```

**Validation Points:**

- Price value is stored correctly in contract state
- `PriceUpdate` event is emitted with correct parameters
- Event can be captured by off-chain listeners (simulating Reactive Network subscription)

**Contract Reference:**[src/MockOracle.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/MockOracle.sol)

**Sources:**[README.md131](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L131-L131)[contracts/README.md89](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L89-L89)

---

### 2. Access Control Test

**Objective:** Ensure that only the authorized `AegisSentinel` address can invoke privileged functions on the `AegisHook` contract.

**Test Flow:**

```
"vm.prank(attacker)"
"AegisHook"
"AegisIntegrationTest"
"vm.prank(attacker)"
"AegisHook"
"AegisIntegrationTest"
"vm.prank(attackerAddress)"
"setPanicMode(true)"
"require(msg.sender == sentinel)"
"❌ REVERT: Unauthorized()"
"vm.expectRevert(Unauthorized.selector)"
"vm.prank(sentinelAddress)"
"setPanicMode(true)"
"require(msg.sender == sentinel)"
"panicMode = true"
"✅ SUCCESS"
```

**Validation Points:**

- Unauthorized addresses cannot call `setPanicMode()`
- The `AegisSentinel` address (configured at deployment) has exclusive access
- Custom error `Unauthorized()` is thrown on access violation

**Contract Reference:**[src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisHook.sol)

**Sources:**[README.md132](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L132-L132)[contracts/README.md90](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L90-L90)

---

### 3. Panic Trigger Test

**Objective:** Validate that the `AegisSentinel` can successfully trigger panic mode on the L2 `AegisHook` through a cross-chain call.

**Test Flow:**

```
"AegisHook"
"AegisSentinel"
"AegisIntegrationTest"
"AegisHook"
"AegisSentinel"
"AegisIntegrationTest"
"Price detected below THRESHOLD"
"panicMode == false"
"Simulate react() callback"
"setPanicMode(true)"
"panicMode = true"
"emit PanicModeChanged(true)"
"panicMode == true"
"assertTrue(panicMode)"
```

**Validation Points:**

- Initial state shows `panicMode == false`
- Cross-chain message successfully toggles `panicMode` to `true`
- `PanicModeChanged` event is emitted
- State change persists in contract storage

**Contract References:**[src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisSentinel.sol)[src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisHook.sol)

**Sources:**[README.md133](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L133-L133)[contracts/README.md91](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L91-L91)

---

### 4. Circuit Breaker Test

**Objective:** Confirm that the `AegisHook.beforeSwap()` function correctly blocks swap operations when `panicMode` is active.

**Test Flow:**

```
"PoolManager"
"AegisHook"
"Simulated Trader"
"AegisIntegrationTest"
"PoolManager"
"AegisHook"
"Simulated Trader"
"AegisIntegrationTest"
"setPanicMode(true)"
"panicMode = true"
"vm.prank(traderAddress)"
"swap(params)"
"beforeSwap(sender, key, params)"
"if (panicMode) revert"
"❌ REVERT: PoolPaused()"
"❌ REVERT"
"vm.expectRevert(PoolPaused.selector)"
```

**Validation Points:**

- `beforeSwap()` hook is invoked by Uniswap v4 PoolManager before swap execution
- When `panicMode == true`, the custom error `PoolPaused()` is thrown
- Swap transaction reverts, preventing execution during volatile conditions
- When `panicMode == false`, swaps proceed normally (regression test)

**Contract Reference:**[src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisHook.sol)

**Sources:**[README.md134](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L134-L134)[contracts/README.md92](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L92-L92)

---

## Test Execution Flow

The following diagram illustrates the complete test execution pipeline from command invocation to result reporting.

```
Test Results

Foundry Test Runner

forge test --match-contract
AegisIntegrationTest -vv

Load Contract Bytecode
from out/

Execute setUp()
Initialize Contracts

Run testOracleUpdate()

Run testAccessControl()

Run testPanicTrigger()

Run testCircuitBreaker()

✅ All Tests Passed

❌ Test Failed
Stack Trace Displayed

Generate Gas Report
Display Summary
```

**Execution Characteristics:**

- Tests run in isolation with fresh contract deployments via `setUp()`
- Each test uses Foundry cheatcodes (`vm.prank`, `vm.expectRevert`) for precise control
- Gas reporting is automatically generated with the `-vv` verbosity level
- Test failures display detailed stack traces for debugging

**Sources:**[contracts/README.md79-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L79-L94)[README.md106-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L106-L110)

---

## Test Dependencies

The test suite relies on the following dependencies from the Foundry Standard Library:
DependencySourcePurpose`Test.sol``forge-std/Test.sol`Base test contract with assertion helpers`Vm.sol``forge-std/Vm.sol`Cheatcode interface for state manipulation`console.sol``forge-std/console.sol`Logging utilities for debugging`Script.sol``forge-std/Script.sol`Deployment script utilities (used in test setup)
**Contract Imports:**

- `MockOracle` from [src/MockOracle.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/MockOracle.sol)
- `AegisSentinel` from [src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisSentinel.sol)
- `AegisHook` from [src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisHook.sol)
- `AegisGuardianRegistry` from [src/AegisGuardianRegistry.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisGuardianRegistry.sol)

**Sources:**[contracts/README.md1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L27)[README.md95-101](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L95-L101)

---

## Integration with CI/CD

The test suite is automatically executed by the GitHub Actions workflow on every push and pull request. For details on the automated testing pipeline, including build steps, test execution, and quality gates, see [CI/CD Pipeline](/HACK3R-CRYPTO/Aegis/5.2-cicd-pipeline).

**Manual Execution:**

```
# Navigate to contracts directory
cd aegis/contracts

# Install dependencies (if not already done)
forge install

# Run complete test suite
forge test

# Run with increased verbosity
forge test -vvv

# Run only integration tests
forge test --match-contract AegisIntegrationTest -vv
```

**Sources:**[README.md104-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L110)[contracts/README.md72-83](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L72-L83)