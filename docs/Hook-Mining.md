# Hook Mining
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

This document describes the salt mining process used to deploy the `AegisHook` contract with a valid Uniswap v4 hook address. Hook mining is necessary because Uniswap v4 enforces address-based permission checks where specific bits in the contract address encode which hook functions the contract is allowed to implement.

For information about the actual deployment of the hook contract, see [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts). For details about the hook's functionality, see [AegisHook](/HACK3R-CRYPTO/Aegis/2.3-aegishook).

## Purpose and Scope

Uniswap v4 hooks must be deployed at addresses with specific prefixes that correspond to the hook permissions they implement. The `AegisHook` implements the `beforeSwap` function, which requires the contract address to have the `BEFORE_SWAP` flag encoded in its most significant bits. This document explains:

- Why address-based permissions are required for Uniswap v4 hooks
- How CREATE2 deployment enables deterministic address generation
- The salt mining algorithm used to find valid addresses
- The EIP-55 checksum validation applied to ensure cross-network compatibility

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md120-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L120-L122)

## Uniswap v4 Hook Address Requirements

Uniswap v4 uses a permission system encoded in the hook contract's address. The protocol reads specific bits from the address to determine which hook functions the contract is authorized to call. This prevents hooks from unexpectedly executing callbacks they haven't declared.

### Permission Flags

The permission system maps address bits to hook functions:
FlagHex PrefixHook FunctionDescription`BEFORE_INITIALIZE``0x80...``beforeInitialize()`Called before pool initialization`AFTER_INITIALIZE``0x40...``afterInitialize()`Called after pool initialization`BEFORE_SWAP``0x20...``beforeSwap()`Called before each swap`AFTER_SWAP``0x10...``afterSwap()`Called after each swap`BEFORE_ADD_LIQUIDITY``0x08...``beforeAddLiquidity()`Called before adding liquidity`AFTER_ADD_LIQUIDITY``0x04...``afterAddLiquidity()`Called after adding liquidity`BEFORE_REMOVE_LIQUIDITY``0x02...``beforeRemoveLiquidity()`Called before removing liquidity`AFTER_REMOVE_LIQUIDITY``0x01...``afterRemoveLiquidity()`Called after removing liquidity
The `AegisHook` implements `beforeSwap()` to enable the circuit breaker mechanism, requiring an address that starts with specific bits corresponding to the `BEFORE_SWAP` permission.

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)

### Address Structure Diagram

```
Ethereum Address (20 bytes)

AegisHook Requirements

Target: 0x80... or higher
Must have Bit 7 set

Bit Mapping (Byte 0)

Bit 7: BEFORE_INITIALIZE

Bit 6: AFTER_INITIALIZE

Bit 5: BEFORE_SWAP

Bit 4: AFTER_SWAP

Bit 3: BEFORE_ADD_LIQ

Bit 2: AFTER_ADD_LIQ

Bit 1: BEFORE_REMOVE_LIQ

Bit 0: AFTER_REMOVE_LIQ

Byte 0
Permission Flags

Byte 1

...

Byte 19
```

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)

## CREATE2 Deployment Mechanics

CREATE2 is an Ethereum opcode (EIP-1014) that enables deterministic contract address generation. Unlike the standard CREATE opcode which uses the deployer's nonce, CREATE2 computes addresses using:

```
address = keccak256(0xff ++ deployerAddress ++ salt ++ keccak256(initCode))[12:]

```

Where:

- `0xff` is a constant prefix
- `deployerAddress` is the address calling CREATE2
- `salt` is a 32-byte value controlled by the deployer
- `initCode` is the contract's creation bytecode
- `[12:]` takes the last 20 bytes of the hash

By varying the `salt` parameter while keeping other inputs constant, different addresses can be generated until one meets the required permission flags.

### CREATE2 Address Generation Flow

```
Yes

No

Deployer Address
0x1234...

Contract Init Code
(AegisHook bytecode)

Salt Value
(32 bytes)

Constant Prefix
0xff

Concatenate:
0xff ++ deployer ++ salt ++ keccak256(initCode)

keccak256()

Take last 20 bytes

Resulting Address
0xabcd...

Address starts
with 0x80...?

Valid Hook Address

Invalid - Try Next Salt
```

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)

## The BEFORE_SWAP Flag

The `AegisHook` contract implements a circuit breaker mechanism that executes in the `beforeSwap()` hook function. This function is called by the Uniswap v4 `PoolManager` before each swap operation to check if the pool should be gated.

To be authorized to implement `beforeSwap()`, the hook contract's address must have specific bits set in its first byte. The README indicates that Aegis requires the "0x80..." prefix, though the exact bit pattern depends on Uniswap v4's permission encoding.

### Hook Permission Validation

```
"AegisHook
0xBaa0...2C080"
"PoolManager"
"User/Trader"
"AegisHook
0xBaa0...2C080"
"PoolManager"
"User/Trader"
alt
[Panic Active]
[Normal Mode]
alt
[Permission Valid]
[Permission Invalid]
"swap(params)"
"Extract address prefix"
"Check permission bits
address & 0x80 == 0x80?"
"beforeSwap(params)"
"Check panicMode"
"Revert: PoolPaused()"
"Transaction Reverted"
"Return success"
"Execute swap"
"Swap completed"
"Revert: HookNotAuthorized()"
```

Sources: [contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)[README.md141](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L141-L141)

## Salt Mining Process

Salt mining is an iterative brute-force search process that increments a salt value until CREATE2 produces an address with the required prefix. The deployed `AegisHook` address is `0xBaa0573e3BE4291b58083e717E9EF5051772C080`, which demonstrates successful salt mining.

### Mining Algorithm

The basic algorithm:

1. Initialize salt counter (typically starting at 0)
2. Compute CREATE2 address using current salt
3. Check if address has required permission bits
4. If valid, use this salt for deployment
5. If invalid, increment salt and repeat from step 2

The search space is probabilistic. For a single-bit requirement (like `BEFORE_SWAP`), approximately 1 in 256 addresses will match, requiring an average of 128 iterations to find a valid salt.

### Salt Mining Workflow

```
No

Yes

Start Mining

Initialize:
salt = 0
deployer = msg.sender
initCodeHash = keccak256(creationCode)

Compute Address:
address = CREATE2(deployer, salt, initCodeHash)

Extract first byte:
prefix = address[0]

Meets requirements?
(e.g., prefix >= 0x80)

Increment:
salt += 1

Salt Found!
Store salt value

Deploy with:
new AegisHook{salt: foundSalt}()
```

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md120-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L120-L122)

## HookMiner Script Implementation

The deployment process references a custom `HookMiner` script that performs the salt calculation. While the exact implementation is not visible in the provided files, the deployment script at [script/06_DeployHook.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/script/06_DeployHook.s.sol) would import and utilize this mining logic.

### Expected Mining Script Structure

A typical HookMiner implementation would include:

**Key Components:**

- `computeAddress(deployer, salt, initCodeHash)`: Implements CREATE2 address calculation
- `hasPermissions(address, flags)`: Validates address against required permission bits
- `findSalt(deployer, initCodeHash, requiredFlags)`: Main mining loop
- `BEFORE_SWAP_FLAG`: Constant defining the permission requirement

**Mining Parameters:**

- Deployer address (the account deploying the hook)
- Contract creation bytecode
- Target permission flags
- Maximum iterations (optional timeout)

The script likely outputs both the salt value and the resulting address for verification before deployment.

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md120-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L120-L122)

### Integration with Deployment Script

```
Unichain Sepolia

06_DeployHook.s.sol

HookMiner Script

Input:
- Deployer address
- AegisHook bytecode
- BEFORE_SWAP flag

Salt Mining
Algorithm

Output:
- Valid salt
- Target address

Load mining results

Verify address format

Deploy via CREATE2
with computed salt

Confirm deployment
at expected address

AegisHook
0xBaa0573e3BE4291b58083e717E9EF5051772C080
```

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L118-L122)

## EIP-55 Checksum Validation

EIP-55 defines mixed-case checksumming for Ethereum addresses to prevent typos. The checksum encodes case information in the hexadecimal representation: uppercase letters indicate that the corresponding nibble should be checksummed.

The README mentions challenges with address checksum validation: "Cross-Chain Checksums: Foundry's deployment scripts are extremely strict about address checksums. We generated valid Deployer addresses for Unichain and Reactive, but the compiler rejected them until we applied strict EIP-55 formatting dynamically."

### EIP-55 Checksum Algorithm

```
1. Take lowercase address (no 0x prefix)
2. Compute keccak256 hash of the lowercase address
3. For each character in the address:
   - If character is a-f (not 0-9):
     - Check corresponding nibble in hash
     - If hash nibble >= 8, make character uppercase
     - Otherwise, keep lowercase
4. Result is checksummed address

```

### Checksum Validation Flow

```
Yes

No

Mined Address
(from CREATE2)

Convert to lowercase
0xbaa0573e3be4291b58083e717e9ef5051772c080

Compute keccak256
of lowercase string

Process each hex character:
If a-f and hash nibble >= 8:
  Make uppercase
Else:
  Keep as-is

Checksummed Address
0xBaa0573e3BE4291b58083e717E9EF5051772C080

Foundry validation:
Format matches
EIP-55?

Accept for deployment

Reject - Reformat required
```

Sources: [README.md79](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L79-L79)

### Cross-Network Compatibility

The checksum is particularly important for cross-chain deployments where addresses must be consistent across multiple networks. The Aegis system deploys contracts on three different networks:
NetworkChain IDDeploymentEthereum Sepolia11155111MockOracleReactive Kopli5318007AegisSentinelUnichain Sepolia1301AegisHook
Each network requires properly checksummed addresses for contract interactions. The deployed `AegisHook` at `0xBaa0573e3BE4291b58083e717E9EF5051772C080` demonstrates proper EIP-55 formatting with mixed case.

Sources: [README.md79](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L79-L79)[README.md140-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L140-L142)

## Integration with Deployment Pipeline

The hook mining process is integrated into the broader deployment pipeline as a prerequisite step before deploying to Unichain. The deployment sequence follows a specific order to establish dependencies across networks.

### Deployment Sequence

```
Broadcast Logs

Phase 3: Unichain Sepolia

Phase 2: Reactive Network

Phase 1: Ethereum Sepolia

Pre-Deployment Phase

forge build
Compile AegisHook.sol

Run HookMiner
Calculate salt for 0x80...

Apply EIP-55
Checksum validation

Deploy MockOracle
04_DeployOracle.s.sol

Deploy AegisSentinel
05_DeploySentinel.s.sol
--legacy flag

Deploy AegisHook
06_DeployHook.s.sol
with mined salt

Verify address:
0xBaa0573e3BE4291b58083e717E9EF5051772C080

broadcast/DeployOracle.s.sol/11155111/

broadcast/DeploySentinel.s.sol/5318007/

broadcast/DeployHook.s.sol/1301/
```

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L105-L122)

### Broadcast Log Structure

The deployment process generates broadcast logs that record the mining and deployment details. For the AegisHook deployment, the broadcast log at [broadcast/DeployHook.s.sol/1301/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/broadcast/DeployHook.s.sol/1301/) would contain:

- Transaction hash of the deployment
- Salt value used for CREATE2
- Resulting contract address
- Gas used for deployment
- Deployer account address

These logs create an immutable audit trail of the salt mining and deployment process, allowing reproduction of the exact deployment conditions.

Sources: [README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md105-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L105-L122)