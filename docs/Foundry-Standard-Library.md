# Foundry Standard Library
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)
- [contracts/lib/forge-std/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md)
- [contracts/lib/forge-std/src/Base.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Base.sol)
- [contracts/lib/forge-std/src/Script.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Script.sol)

## Purpose and Scope

This document covers the Foundry Standard Library (`forge-std`), a collection of helper contracts and utilities used throughout the Aegis project for testing and deployment. The library provides essential infrastructure including test harnesses, deployment script bases, storage manipulation utilities, and console logging functionality. For information about other dependencies, see [Dependencies](/HACK3R-CRYPTO/Aegis/6-dependencies). For specific testing implementation details, see [Test Suite](/HACK3R-CRYPTO/Aegis/5.1-test-suite).

---

## Overview

The Foundry Standard Library is installed as a Git submodule at [contracts/lib/forge-std](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std) and provides the foundational testing and scripting framework for the Aegis smart contract development workflow. It leverages Forge's cheatcodes to simplify contract testing and deployment script authoring.

**Sources:**[contracts/.gitmodules1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L3)[contracts/lib/forge-std/README.md1-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L1-L6)

### Installation

The library is managed as a Git submodule and automatically initialized when cloning the repository with `--recurse-submodules`. Manual installation can be performed with:

```
forge install foundry-rs/forge-std
```

**Sources:**[contracts/.gitmodules1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L3)[contracts/lib/forge-std/README.md9-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L9-L11)

---

## Module Architecture

```
Standard Modules

Script Inheritance Path

Test Inheritance Path

extended by

includes vmSafe

extended by

includes

includes

includes

includes

includes

includes

includes

includes

includes

includes

extends

extends

CommonBase (Base.sol)

VM_ADDRESS
0x7109709ECfa91a80626fF3989D68f67F5b1DD12D

CONSOLE
0x000000000000000000636F6e736F6c652e6c6f67

DEFAULT_SENDER
0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38

CREATE2_FACTORY
0x4e59b44847b379578588920cA78FbF26c0B4956C

vm: Vm(VM_ADDRESS)

stdstore: StdStorage

TestBase
(abstract)

Test.sol
(Main Test Contract)

ScriptBase
(abstract)

vmSafe: VmSafe(VM_ADDRESS)

Script.sol
(Main Script Contract)

StdStorage
Storage Manipulation

stdError
Built-in Error Codes

StdCheats/StdCheatsSafe
Prank Wrappers

console2.sol
Logging Utilities

StdAssertions
Test Assertions

StdChains
Chain Configuration

StdUtils
Helper Functions

stdJson
JSON Parsing

stdMath
Math Utilities

StdCheatsSafe
```

**Diagram: forge-std Module Hierarchy and Inheritance Structure**

The library is organized around two primary inheritance paths: one for testing (`Test.sol`) and one for deployment scripts (`Script.sol`), both extending from `CommonBase` which provides shared constants and VM access.

**Sources:**[contracts/lib/forge-std/src/Base.sol7-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Base.sol#L7-L42)[contracts/lib/forge-std/src/Script.sol1-28](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Script.sol#L1-L28)

---

## Core Base Contracts

### CommonBase

The `CommonBase` abstract contract provides shared constants and VM interface access used by both test and script contexts.

**Key Constants:**
ConstantAddressDescription`VM_ADDRESS``0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`Cheat code address (keccak256("hevm cheat code"))`CONSOLE``0x000000000000000000636F6e736F6c652e6c6f67`Console logging staticcall target`CREATE2_FACTORY``0x4e59b44847b379578588920cA78FbF26c0B4956C`Deterministic deployment proxy`DEFAULT_SENDER``0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38`Default tx.origin and msg.sender`DEFAULT_TEST_CONTRACT``0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f`First contract created by test`MULTICALL3_ADDRESS``0xcA11bde05977b3631167028862bE2a173976CA11`Multicall3 deployment address`SECP256K1_ORDER``115792089237316195423570985008687907852837564279074904382605163141518161494337`Secp256k1 curve order
**Sources:**[contracts/lib/forge-std/src/Base.sol7-36](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Base.sol#L7-L36)

### TestBase and ScriptBase

Two abstract contracts extend `CommonBase` to provide specialized functionality:

- **TestBase**: Base for test contracts, provides `vm` cheatcode interface
- **ScriptBase**: Base for deployment scripts, provides `vmSafe` interface (restricted cheatcode access)

**Sources:**[contracts/lib/forge-std/src/Base.sol38-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Base.sol#L38-L42)

### Script Contract

The `Script` abstract contract is the primary base for all deployment scripts in Aegis. It inherits from `ScriptBase` and includes multiple standard modules.

**Included Modules:**

- `StdChains`: Network configuration management
- `StdCheatsSafe`: Safe cheatcode wrappers (hoax, deal, etc.)
- `StdUtils`: Utility functions
- `console2`: Logging functionality
- `stdJson`: JSON file parsing for configuration
- `stdMath`: Mathematical operations
- `StdStorage`: Storage slot manipulation

The `IS_SCRIPT` boolean flag identifies the contract as a script context.

**Sources:**[contracts/lib/forge-std/src/Script.sol1-28](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Script.sol#L1-L28)

---

## Standard Utility Libraries

### stdError

Provides built-in compiler error codes for use with `vm.expectRevert()` in tests. This enables precise error matching without hardcoding error signatures.

**Common Error Codes:**

- `arithmeticError`: Overflow/underflow
- `assertionError`: Failed assertion
- `divisionError`: Division by zero
- `enumConversionError`: Invalid enum conversion
- `indexOOBError`: Array index out of bounds
- `memOverflowError`: Memory overflow
- `popError`: Pop from empty array
- `zeroVarError`: Uninitialized storage variable

**Example Usage Pattern:**

```
vm.expectRevert(stdError.arithmeticError);
contract.functionThatOverflows();
```

**Sources:**[contracts/lib/forge-std/README.md14-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L14-L44)

---

### stdStorage

A powerful utility for finding and manipulating storage slots without knowing the storage layout. It wraps the `record` and `accesses` cheatcodes to automatically discover variable locations.

**Core API:**

- `.target(address)`: Specify target contract
- `.sig(string)` or `.sig(bytes4)`: Specify function selector
- `.with_key(...)`: For mapping keys
- `.depth(uint256)`: For struct field depth
- `.find()`: Returns storage slot
- `.checked_write(...)`: Write to slot with safety checks

**Usage Example:**

```
using stdStorage for StdStorage;

// Find slot for public variable
uint256 slot = stdstore
    .target(address(contract))
    .sig("variableName()")
    .find();

// Write to slot
stdstore
    .target(address(contract))
    .sig("variableName()")
    .checked_write(newValue);
```

**Struct Field Access:**
The `.depth()` parameter specifies which field of a struct to access (0-indexed).

**Caveat:** Cannot safely write to packed storage slots unless they are uninitialized (`bytes32(0)`).

**Sources:**[contracts/lib/forge-std/README.md46-164](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L46-L164)

---

### stdCheats

Provides developer-friendly wrappers around common cheatcodes, particularly for address manipulation with ETH balances.

**Key Functions:**

- `hoax(address)`: Sets msg.sender and gives default ETH (1 ether)
- `hoax(address, uint256)`: Sets msg.sender and gives specified ETH
- `startHoax(address)`: Like hoax but uses startPrank for persistent pranking
- `deal(address, uint256)`: Sets ETH balance directly

**Usage Pattern:**

```
// Single transaction prank with ETH
hoax(address(0x1337));
contract.functionRequiringETH{value: 100}();

// Multiple transaction prank with ETH
startHoax(address(0x1337), 5 ether);
contract.call1{value: 1 ether}();
contract.call2{value: 1 ether}();
vm.stopPrank();
```

**Sources:**[contracts/lib/forge-std/README.md166-216](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L166-L216)

---

### Console Logging

Two console logging implementations are available:

**console2.sol (Recommended):**

- Shows decoded logs in Forge traces
- Compatible with all Solidity types
- Used by Aegis contracts

**console.sol (Legacy):**

- Hardhat-compatible
- Has decoding issues with `uint256` and `int256` types

**Import Methods:**

```
// Via Test.sol (includes console2)
import "forge-std/Test.sol";

// Direct import
import "forge-std/console2.sol";
```

**Usage:**

```
console2.log("Price updated:", newPrice);
console2.log("Address:", userAddress);
console2.logBytes32(dataHash);
```

**Sources:**[contracts/lib/forge-std/README.md218-246](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L218-L246)

---

## Usage in Aegis Project

```
forge-std Components

Aegis Test Contracts

Aegis Deployment Scripts

Test Utilities

Script Utilities

inherits

inherits

inherits

uses

uses

uses

uses

inherits

inherits

inherits

inherits

uses

uses

uses

uses

uses

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol

Oracle Update Tests

Access Control Tests

Panic Trigger Tests

Circuit Breaker Tests

Script.sol

Test.sol

vmSafe.broadcast()

vm.computeCreateAddress()

console2.log()

vm.expectRevert()

vm.prank()

assertEq/assertTrue

stdError
```

**Diagram: forge-std Usage in Aegis Codebase**

**Sources:**[contracts/.gitmodules1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L3)[contracts/lib/forge-std/src/Script.sol1-28](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Script.sol#L1-L28)

---

### Deployment Script Integration

All Aegis deployment scripts inherit from `Script.sol` to access deployment utilities:

**Key Capabilities:**

1. **Transaction Broadcasting**: `vm.startBroadcast()` / `vm.stopBroadcast()` for on-chain transactions
2. **Address Computation**: `vm.computeCreateAddress()` for predicting deployment addresses
3. **Environment Variables**: `vm.envAddress()`, `vm.envUint()` for configuration
4. **Console Logging**: `console2.log()` for deployment status output
5. **Chain Configuration**: Access to network-specific settings via `StdChains`

**Typical Script Structure:**

```
import "forge-std/Script.sol";

contract DeployContract is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deployment logic
        MyContract deployed = new MyContract();
        console2.log("Deployed to:", address(deployed));
        
        vm.stopBroadcast();
    }
}
```

**Sources:**[contracts/lib/forge-std/src/Script.sol1-28](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/src/Script.sol#L1-L28)

---

### Test Infrastructure Integration

Aegis test contracts inherit from `Test.sol` (which extends `TestBase`) to access comprehensive testing utilities:

**Testing Capabilities:**

1. **Cheatcodes**: Full access to `vm` interface for state manipulation
2. **Assertions**: `assertEq()`, `assertTrue()`, `assertGt()`, etc.
3. **Expect Patterns**: `vm.expectRevert()`, `vm.expectEmit()` for event/error testing
4. **Storage Access**: `stdStorage` for manipulating contract state
5. **Time Travel**: `vm.warp()`, `vm.roll()` for block manipulation
6. **Pranking**: `vm.prank()`, `hoax()` for caller simulation

**Standard Test Pattern:**

```
import "forge-std/Test.sol";

contract MyContractTest is Test {
    MyContract public testContract;
    
    function setUp() public {
        testContract = new MyContract();
    }
    
    function testFunctionality() public {
        vm.expectEmit(true, true, false, true);
        emit ExpectedEvent(param1, param2);
        
        testContract.function();
        
        assertEq(testContract.state(), expectedValue);
    }
}
```

**Sources:**[contracts/lib/forge-std/README.md1-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L1-L6)

---

## Key Features for Development

### Storage Manipulation

The `stdStorage` library enables powerful test scenarios by directly manipulating contract state:

```
// Force contract balance
stdstore
    .target(address(contract))
    .sig("balanceOf(address)")
    .with_key(userAddress)
    .checked_write(1000 ether);

// Manipulate mapping
stdstore
    .target(address(registry))
    .sig("guardianReputation(address)")
    .with_key(guardianAddress)
    .checked_write(100);
```

**Sources:**[contracts/lib/forge-std/README.md46-164](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L46-L164)

---

### Error Testing

Precise error matching using `stdError` for built-in errors:

```
// Expect arithmetic overflow
vm.expectRevert(stdError.arithmeticError);
contract.functionThatOverflows();

// Expect custom error
vm.expectRevert(CustomError.selector);
contract.functionWithCustomError();
```

**Sources:**[contracts/lib/forge-std/README.md14-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L14-L44)

---

### Address Seeding

The `hoax()` function simplifies tests requiring funded addresses:

```
// Fund and prank in one call
hoax(address(0x123), 10 ether);
contract.payableFunction{value: 1 ether}();

// For multiple transactions
startHoax(guardian, 100 ether);
hook.recordIntervention();
hook.boostReputation();
vm.stopPrank();
```

**Sources:**[contracts/lib/forge-std/README.md166-216](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L166-L216)

---

## Licensing

The Foundry Standard Library is dual-licensed under MIT and Apache 2.0, allowing flexible integration into projects with different licensing requirements.

**Sources:**[contracts/lib/forge-std/README.md264-266](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/README.md#L264-L266)