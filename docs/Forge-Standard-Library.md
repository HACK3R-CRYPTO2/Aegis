# Forge Standard Library

## Purpose and Scope

This page documents the Forge Standard Library (`forge-std`), a collection of helper contracts and utilities used throughout the Aegis project for testing, deployment scripting, and development. The library provides wrappers around Foundry's cheatcodes, standardized testing utilities, and enhanced developer experience features.

---

## Library Structure

The Forge Standard Library is organized into several core modules. Aegis leverages these modules primarily through the `Test.sol` and `Script.sol` base contracts.

### Core Modules

*   **Test.sol**: The base contract for all tests. Aggregates all testing utilities.
*   **Script.sol**: The base contract for deployment scripts. Includes safe cheatcodes.
*   **Vm.sol**: Interface for Foundry's cheatcodes (e.g., `vm.prank`, `vm.deal`).
*   **console.sol / console2.sol**: Utilities for logging to stdout.
*   **StdCheats.sol**: Wrappers for common cheatcode patterns (e.g., `hoax`).
*   **StdUtils.sol**: Utilities for math, addressing, and more.

---

## Usage in Aegis

### Test Contracts
All test contracts in `contracts/test/` inherit from `Test`:

```solidity
import {Test, console2} from "forge-std/Test.sol";

contract MyTest is Test {
    function testExample() public {
        // Use cheatcodes
        vm.roll(100);
        
        // Use assertions
        assertEq(1, 1);
        
        // Use console logging
        console2.log("Test passed");
    }
}
```

### Deployment Scripts
All deployment scripts in `contracts/script/` inherit from `Script`:

```solidity
import {Script, console2} from "forge-std/Script.sol";

contract DeployScript is Script {
    function run() public {
        // Load private key
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        
        // Broadcast transactions
        vm.startBroadcast(deployerKey);
        new MyContract();
        vm.stopBroadcast();
    }
}
```

---

## Key Utilities

### Helper Functions (`StdCheats`)

| Function | Description |
| :--- | :--- |
| `hoax(address)` | Pranks the next call and deals ETH to the address. |
| `startHoax(address)` | Starts a persistent prank and deals ETH. |
| `deal(address, uint256)` | Sets the balance of an address. |

### Error Handling (`StdError`)

Used to test specific revert reasons:

```solidity
vm.expectRevert(stdError.arithmeticError);
// triggers overflow/underflow
```

### Storage Manipulation (`StdStorage`)

Locates and modifies storage slots without manual calculation:

```solidity
using stdStorage for StdStorage;

stdstore
    .target(address(token))
    .sig("balanceOf(address)")
    .with_key(user)
    .checked_write(100 ether);
```

---

## Console Logging

Aegis uses `console2.sol` for strictly-typed logging.

```solidity
import {console2} from "forge-std/Test.sol";

console2.log("String:", "Hello");
console2.log("Uint:", 123);
console2.log("Address:", address(this));
```

**Note**: Logs are only visible when running tests with verbosity 2 or higher (`forge test -vv`).

---

## Installation

`forge-std` is installed as a git submodule at `contracts/lib/forge-std`.

To update it:
```bash
forge update lib/forge-std
```