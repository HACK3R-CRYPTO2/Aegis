# Reactive Network
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

## Purpose and Scope

This document describes the Reactive Network dependencies used in the Aegis system, specifically the `system-smart-contracts` library and related infrastructure that enables autonomous cross-chain event monitoring. This page focuses on the third-party libraries and integration patterns that allow `AegisSentinel` to operate as an autonomous watcher on the Reactive Network.

For information about the AegisSentinel contract itself, see [AegisSentinel](/HACK3R-CRYPTO/Aegis/2.2-aegissentinel). For deployment procedures, see [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts). For other dependencies, see [Foundry Standard Library](/HACK3R-CRYPTO/Aegis/6.1-foundry-standard-library) and [Uniswap V4 Integration](/HACK3R-CRYPTO/Aegis/6.2-uniswap-v4-integration).

---

## Overview

The Reactive Network provides the middleware infrastructure that enables Aegis to operate autonomously without traditional keeper bots. The system uses two primary components from the Reactive ecosystem:

1. **system-smart-contracts**: Core reactive contract infrastructure
2. **reactive-lib**: Event subscription and cross-chain messaging utilities

These dependencies are managed as Git submodules and provide the foundational abstractions for building contracts that can listen to events on one chain and trigger actions on another.

**Sources:**[contracts/.gitmodules10-12](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L10-L12)[contracts/README.md39-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L44)

---

## Dependency Structure

The Reactive Network libraries are included as Git submodules in the project structure:

```
Aegis Contracts

Reactive Network Dependencies

Aegis Repository

defines submodule

installed in

inherits from

.gitmodules

lib/

system-smart-contracts
GitHub: Reactive-Network/
system-smart-contracts

AegisSentinel.sol

Submodule Path:
lib/system-smart-contracts

Provides:
- AbstractReactive base
- IReactive interface
- Subscription management
```

**Sources:**[contracts/.gitmodules10-12](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L10-L12)

---

## System Smart Contracts Library

### Purpose

The `system-smart-contracts` library provides the base contract abstractions required for building reactive contracts that can:

- Subscribe to events emitted on origin chains (e.g., Ethereum Sepolia)
- Automatically receive event notifications via the Reactive Network protocol
- Execute cross-chain calls to destination chains (e.g., Unichain)
- Manage subscription lifecycles and permissions

### Integration Pattern

The `AegisSentinel` contract extends the reactive base contracts to implement the autonomous monitoring logic. The typical integration pattern follows this structure:

```
Aegis Implementation

Reactive Network Base Layer

defines interface

inherited by

implements

executes

AbstractReactive
(from system-smart-contracts)

IReactive Interface

AegisSentinel

react() function
Event handler

Cross-chain call logic
```

**Sources:**[contracts/README.md39-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L44)

---

## Event Subscription Mechanism

### Subscription Architecture

The Reactive Network uses a publish-subscribe model where reactive contracts register interest in specific events from origin chains. The subscription process involves two steps:

1. **Deployment**: The reactive contract is deployed to the Reactive Network
2. **Subscription**: A separate transaction registers the contract to listen for specific event signatures from specific source contract addresses

```
"MockOracle
(Sepolia)"
"AegisSentinel"
"Reactive Network
(Kopli Testnet)"
"Developer"
"MockOracle
(Sepolia)"
"AegisSentinel"
"Reactive Network
(Kopli Testnet)"
"Developer"
"Register interest in:
PriceUpdate events
from 0x29f8...BA3b"
"Process event data
Execute response logic"
"1. Deploy AegisSentinel"
"Contract Address:
0x0f76...b482"
"2. subscribe() call"
"Subscription confirmed"
"3. emit PriceUpdate(1000)"
"4. react(payload) callback"
```

### Manual Subscription Requirement

The deployment process requires a two-step procedure as noted in the deployment documentation. After the initial contract deployment, a manual subscription call must be made to activate event listening:
StepActionPurpose1Deploy contract with `--legacy` flagCreate reactive contract instance on Reactive Network2Call subscription functionRegister event filters and activate listener
**Sources:**[contracts/README.md114](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L114-L114)[contracts/README.md112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L112-L116)

---

## Cross-Chain Message Delivery

### Message Flow Architecture

The Reactive Network acts as a message broker between the origin chain (Sepolia) and destination chain (Unichain). When an event is detected, the reactive contract can trigger cross-chain calls:

```
Destination Chain
(Unichain Sepolia)

Reactive Network
(Kopli - Chain 5318007)

Origin Chain
(Ethereum Sepolia)

emit PriceUpdate

react() callback

if price < threshold

setPanicMode(true)

MockOracle
0x29f8...BA3b

Event Listener
(Protocol Layer)

AegisSentinel
0x0f76...b482

Cross-Chain Relay
(Protocol Layer)

AegisHook
0xBaa0...2C080
```

### Autonomous Operation

The key architectural benefit of using Reactive Network is the elimination of centralized infrastructure:
Traditional ArchitectureReactive ArchitectureOff-chain keeper bot monitors eventsOn-chain contract receives events automaticallyBot requires hosting infrastructureContract is self-containedBot needs private key managementContract uses protocol-level permissionsSingle point of failureDecentralized protocol ensures deliveryLatency depends on bot polling intervalEvent-driven with minimal latency
**Sources:**[contracts/README.md39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L50)

---

## Integration in AegisSentinel

### Contract Structure

The `AegisSentinel` contract implements the reactive pattern by:

1. **Extending** base reactive contract classes from `system-smart-contracts`
2. **Implementing** the `react()` callback function to process incoming events
3. **Executing** cross-chain calls to the `AegisHook` contract when thresholds are breached

```
AegisSentinel Logic Flow

Yes

No

Inherit from
AbstractReactive

react() function

price < THRESHOLD?

Execute cross-chain call:
hook.setPanicMode(true)

No action
```

### Event Processing

The sentinel processes `PriceUpdate` events from the mock oracle:
Event FieldTypePurposeEvent Signature`PriceUpdate(uint256)`Identifies the event typePrice Value`uint256`Current price reported by oracleSource Contract`address`Oracle contract address (0x29f8...BA3b)Block Number`uint256`When the event was emitted
The Reactive Network protocol delivers these events to the `react()` callback function, which implements the circuit breaker logic.

**Sources:**[contracts/README.md14-25](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L14-L25)[contracts/README.md39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L50)

---

## Deployment Considerations

### Network Configuration

The Reactive Network testnet (Kopli) requires specific deployment parameters:
ParameterValueReasonRPC URLConfigured in `foundry.toml`Network endpointChain ID5318007Reactive Kopli testnet identifierTransaction TypeLegacy (EIP-155)Required by `--legacy` flagGas ConfigurationStandardNo special requirements
### Deployment Command

The deployment script for the Sentinel uses the legacy transaction format:

```
forge script script/05_DeploySentinel.s.sol --rpc-url reactive --broadcast --legacy

```

The `--legacy` flag is required for compatibility with the Reactive Network's EIP-155 transaction format requirements.

**Sources:**[contracts/README.md112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L112-L116)

---

## Production Readiness

### Oracle Interface Agnosticism

The Reactive Network integration is designed to be oracle-agnostic. The `AegisSentinel` listens for standard event signatures:

```
event PriceUpdate(uint256 price)

```

This design allows seamless migration from the demonstration `MockOracle` to production Chainlink oracles without modifying the Sentinel logic. Only the source contract address in the subscription needs to be updated.

### Scalability Considerations

The Reactive Network architecture provides several scalability benefits:

1. **Multi-Chain Monitoring**: A single reactive contract can subscribe to events from multiple origin chains
2. **Fan-Out Patterns**: One event can trigger multiple destination chain actions
3. **Protocol-Level Reliability**: The Reactive Network protocol handles message delivery guarantees
4. **No Off-Chain Dependencies**: Eliminates the operational overhead of keeper infrastructure

**Sources:**[contracts/README.md61-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L61-L68)

---

## Summary

The Reactive Network dependencies provide the core infrastructure for Aegis's autonomous operation model. By leveraging `system-smart-contracts`, the `AegisSentinel` can:

- Monitor Ethereum Sepolia for price events
- Execute autonomous decision logic
- Trigger cross-chain circuit breaker activation
- Operate without centralized keeper infrastructure

This architecture eliminates the "Inversion of Control" problem inherent in traditional keeper-based systems, where external parties must be trusted to execute protocol logic correctly.

**Sources:**[contracts/.gitmodules10-12](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L10-L12)[contracts/README.md1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L123)