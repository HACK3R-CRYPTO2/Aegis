# MockOracle
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)
- [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-1769586193733.json)
- [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json)

This document describes the `MockOracle` contract deployed on Ethereum Sepolia (L1), which serves as a price feed simulator for the Aegis system during testing and demonstration. For information about the cross-chain monitoring component that consumes these price updates, see [AegisSentinel](/HACK3R-CRYPTO/Aegis/2.2-aegissentinel). For details on the circuit breaker that responds to price crashes, see [AegisHook](/HACK3R-CRYPTO/Aegis/2.3-aegishook).

## Overview

The `MockOracle` contract simulates a real-world price oracle by providing a controllable price feed that can be manually updated to trigger the Aegis protection system. In production deployments, this contract would be replaced by a Chainlink price feed oracle with no changes required to the downstream `AegisSentinel` logic.

**Deployed Address**: `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`**Network**: Ethereum Sepolia (Chain ID: 11155111)**Transaction Hash**: `0x3a084a0a072d935c30754dc6b246b1869ae71c2e3b99527b4f43fe49934349ba`

The contract's primary purpose is to enable deterministic demonstration of the Aegis circuit breaker mechanism by allowing manual simulation of extreme market volatility scenarios.

**Sources**: [contracts/README.md46-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L46-L50)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L1-L46)

## Contract Location and Structure

```
contracts/
└── src/
    └── MockOracle.sol

```

The `MockOracle` contract implements a minimal price feed interface consisting of:

- **State Variables**:

- `owner`: Address authorized to update the price (set to deployer in constructor)
- `price`: Current price value stored as `uint256`
- **Functions**:

- `setPrice(uint256)`: Updates the stored price and emits a `PriceUpdate` event
- `price()`: Returns the current price value
- `owner()`: Returns the authorized owner address

**Sources**: [contracts/README.md46-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L46-L50)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

## Event Emission Architecture

The critical functionality of `MockOracle` is its emission of the `PriceUpdate` event, which serves as the trigger for the entire Aegis cross-chain protection sequence.

### PriceUpdate Event Flow

```
"AegisSentinel
(Reactive Network)"
"Ethereum
Event Logs"
"MockOracle
(Sepolia L1)"
"Owner Address"
"AegisSentinel
(Reactive Network)"
"Ethereum
Event Logs"
"MockOracle
(Sepolia L1)"
"Owner Address"
"If true, trigger
cross-chain panic mode"
"setPrice(1000)"
"price = 1000"
"emit PriceUpdate(1000, timestamp)"
"Event Subscription"
"Evaluate: price < THRESHOLD?"
```

**Event Signature**:

```
event PriceUpdate(uint256 indexed price, uint256 timestamp);
```

The event includes:

- `price`: The newly updated price value (indexed for efficient filtering)
- `timestamp`: Block timestamp when the update occurred

**Sources**: [contracts/README.md13-25](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L13-L25)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

## Contract State Lifecycle

### Initialization

```

```

The contract initializes with:

1. **Owner**: Set to the deploying address (`0xd2df53d9791e98db221842dd085f4144014bbe2a`)
2. **Initial Price**: `2000 * 10^18` (representing $2000 per ETH)

**Sources**: [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json10-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L10-L16)

## Deployment Information

### Deployment Transaction Details
PropertyValue**Contract Name**`MockOracle`**Deployed Address**`0x29f8f8d2a00330f9683e73a926f61ae7e91cba3b`**Network**Ethereum Sepolia**Chain ID**11155111**Deployer**`0xd2df53d9791e98db221842dd085f4144014bbe2a`**Block Number**10139010 (0x9ab972)**Gas Used**206101 (0x32915)**Transaction Type**CREATE (Type 2 EIP-1559)
### Deployment Script

The contract is deployed using the numbered deployment script:

```
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast
```

This script is executed first in the deployment sequence (numbered `04_`) to ensure the oracle is available before the `AegisSentinel` is deployed, which needs to subscribe to its events.

**Sources**: [contracts/README.md106-110](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L106-L110)[contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L1-L46)

## Integration with Aegis System

### Cross-Chain Communication Flow

```
Unichain Sepolia (L2)

Reactive Network

Ethereum Sepolia (L1)

Reactive Network
Event Bridge

If price < 1500

MockOracle
0x29f8...BA3b

State: price

Function: setPrice()

Event: PriceUpdate

AegisSentinel
0x0f76...b482

Event Subscription

Threshold Logic
(price < 1500?)

AegisHook
0xBaa0...2C080

panicMode Flag

Note: Price threshold
configurable in Sentinel
```

The `MockOracle` serves as the entry point for the entire Aegis protection sequence:

1. **Price Update**: Owner calls `setPrice(uint256)` with a new price value
2. **Event Emission**: Contract emits `PriceUpdate(price, timestamp)` event on Sepolia
3. **Event Monitoring**: `AegisSentinel` on Reactive Network subscribes to these events via the Reactive Network's event bridge
4. **Threshold Evaluation**: Sentinel compares price against configured threshold (default: 1500)
5. **Cross-Chain Action**: If threshold breached, Sentinel triggers `setPanicMode(true)` on `AegisHook` on Unichain

**Sources**: [contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)[contracts/README.md99-103](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L103)

## Testing vs. Production Design

### Simulation Use Case

The `MockOracle` contract is specifically designed for demonstration purposes to enable:

**Deterministic Testing**: Judges and developers can trigger "Black Swan" market crash events on command by calling `setPrice(1000)` to simulate a 50% price drop from the initial $2000 value.

**Example Simulation Sequence**:

```
# Simulate market crash
cast send 0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b \
  "setPrice(uint256)" 1000000000000000000000 \
  --rpc-url sepolia \
  --private-key $PRIVATE_KEY
```

This immediately emits a `PriceUpdate` event that triggers the Sentinel, demonstrating the full cross-chain circuit breaker activation within seconds.

### Production Replacement Strategy

```
Deployment Transition

Mainnet Deployment

PriceUpdate Event
(same signature)

Chainlink Oracle
(Automated Updates)

AegisSentinel
(Listens to PriceUpdate)

Demo/Testnet

PriceUpdate Event

MockOracle
(Manual Updates)

AegisSentinel
(Listens to PriceUpdate)

Configuration Change:
Update oracle address only
No code changes to Sentinel
```

**Interface Compatibility**: The `AegisSentinel` logic is interface-agnostic and listens for the standard `PriceUpdate` event signature. To transition to production:

1. Deploy official Chainlink price feed contract on mainnet
2. Update the `oracleAddress` configuration in `AegisSentinel` deployment script
3. No changes required to Sentinel logic or event subscription code

The event signature and data structure remain identical whether emitted by `MockOracle` or Chainlink, ensuring seamless transition from testnet to production.

**Sources**: [contracts/README.md59-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L59-L68)

## Function Reference

### `setPrice(uint256 newPrice)`

Updates the stored price value and emits the `PriceUpdate` event.

**Access Control**: Only callable by the contract `owner` (though the provided bytecode doesn't show explicit access control enforcement in this simplified demo version).

**Parameters**:

- `newPrice`: New price value in wei (e.g., `1000 * 10^18` for $1000)

**Effects**:

- Updates the `price` state variable
- Emits `PriceUpdate(newPrice, block.timestamp)` event

**Gas Cost**: Approximately 43,000-50,000 gas (storage write + event emission)

### `price() returns (uint256)`

Returns the current stored price value.

**Returns**: Current price as `uint256` in wei

**Gas Cost**: ~2,100 gas (storage read)

### `owner() returns (address)`

Returns the address authorized to update prices.

**Returns**: Owner address

**Gas Cost**: ~2,100 gas (storage read)

**Sources**: [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L14-L14)

## Deployment Logs and Artifacts

The deployment produces immutable audit logs stored in:

```
contracts/broadcast/04_DeployOracle.s.sol/11155111/
├── run-1769586193733.json    # Timestamped deployment
└── run-latest.json             # Symlink to latest

```

Each log contains:

- Full transaction data including bytecode
- Receipt with contract address and gas used
- Chain ID and deployer address
- Git commit hash for version tracking (`08ea552`)

These logs enable:

- **Verification**: Independent parties can verify the deployed bytecode matches the source
- **Reproducibility**: Deployment can be replicated using the same parameters
- **Auditability**: Immutable record of when and how the contract was deployed

**Sources**: [contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json1-46](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/04_DeployOracle.s.sol/11155111/run-latest.json#L1-L46)