# AegisSentinel
Relevant source files
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)
- [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-1769588622425.json)
- [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json)

## Purpose and Scope

This document describes the `AegisSentinel` contract, the autonomous monitoring and orchestration layer of the Aegis system deployed on the Reactive Network. The Sentinel acts as a cross-chain bridge between Ethereum Sepolia (L1) and Unichain (L2), listening for price oracle events and triggering circuit breaker activation when market conditions breach safety thresholds.

For information about the oracle it monitors, see [MockOracle](/HACK3R-CRYPTO/Aegis/2.1-mockoracle). For the hook it controls on L2, see [AegisHook](/HACK3R-CRYPTO/Aegis/2.3-aegishook). For the reputation system it integrates with, see [AegisGuardianRegistry](/HACK3R-CRYPTO/Aegis/2.4-aegisguardianregistry).

---

## Overview

The `AegisSentinel` contract implements the "autonomous watcher" pattern using the Reactive Network infrastructure. Unlike traditional keeper-based architectures that require off-chain relayers, the Sentinel operates entirely on-chain as a reactive smart contract that automatically responds to events from other chains.

**Key Characteristics:**

- **Autonomous Operation**: No manual intervention or keeper infrastructure required
- **Cross-Chain Event Listening**: Subscribes to `PriceUpdate` events from L1 oracle
- **Threshold-Based Logic**: Automatically triggers panic mode when price drops below 1500 (50% crash from baseline 3000)
- **Reputation Integration**: Monitors guardian feedback and can boost reputation scores

**Deployment Information:**
PropertyValue**Contract Address**`0x0f764437ffBE1fcd0d0d276a164610422710B482`**Network**Reactive Network (Kopli Testnet)**Chain ID**`5318007`**Deployment Script**[script/05_DeploySentinel.s.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/script/05_DeploySentinel.s.sol)**Deployment Flag**`--legacy` (EIP-155 compatibility)
Sources: [contracts/README.md39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L50)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json1-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L1-L50)

---

## System Position

```
Unichain Sepolia (L2)

Reactive Network (Kopli)

Ethereum Sepolia (L1)

PriceUpdate(price)

NewFeedback events

setPanicMode(bool)

boostReputation(address)

Monitors: price < 1500

Subscription via REACTIVE_VM

MockOracle
0x29f8...BA3b

AegisGuardianRegistry
ERC-721 + ERC-8004

AegisSentinel
0x0f76...b482

AegisHook
0xBaa0...2C080
```

**Diagram: AegisSentinel Cross-Chain Communication Flow**

The Sentinel sits at the center of the Aegis architecture, bridging L1 event sources with L2 action targets. It maintains subscriptions to both the oracle and registry contracts on Ethereum Sepolia while executing control commands on the Unichain hook.

Sources: [contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)[contracts/README.md39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L50)

---

## Constructor Parameters

The `AegisSentinel` contract is initialized with three critical addresses that define its operational scope:
ParameterValuePurpose`REACTIVE_VM``0x0000000000000000000000000000000000fffFfF`Reactive Network system address for cross-chain subscriptions`_hookAddress``0xBaa0573e3BE4291b58083e717E9EF5051772C080`Target AegisHook contract on Unichain for panic mode control`_oracleAddress``0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`Source MockOracle contract on Sepolia for price monitoring
These parameters are immutable after deployment and establish the cross-chain communication topology. The `REACTIVE_VM` address is a system-level contract provided by the Reactive Network infrastructure.

Sources: [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json9-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L9-L13)

---

## Core Functionality

### Event Subscription Model

```
MockOracle
(Sepolia)
REACTIVE_VM
0x00...fffFfF
AegisSentinel
Deployer
MockOracle
(Sepolia)
REACTIVE_VM
0x00...fffFfF
AegisSentinel
Deployer
Event Detection Phase
"deploy(REACTIVE_VM, hook, oracle)"
"constructor() sets addresses"
"subscribe() [separate tx]"
"subscribes to PriceUpdate topic"
"monitors for PriceUpdate events"
"emit PriceUpdate(1000)"
"react() callback triggered"
"check price < THRESHOLD"
```

**Diagram: Sentinel Initialization and Subscription Flow**

The Sentinel requires a two-step deployment process:

1. **Contract Deployment**: Establishes addresses and initializes state
2. **Manual Subscription**: Separate transaction to register event subscription with `REACTIVE_VM`

This separation is documented in the deployment script comments, which note "Requires manual subscription call after deployment."

Sources: [contracts/README.md114-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L114-L116)

---

### Price Monitoring Logic

The Sentinel implements threshold-based monitoring with the following logic:

**Constants:**

- `PRICE_THRESHOLD`: 1500 (represents a 50% drop from baseline of 3000)
- `BASELINE_PRICE`: 3000 (theoretical normal market price)

**Monitoring Flow:**

```
"Contract Deployed"

"PriceUpdate event from L1"

"Extract price from event"

"price >= 1500"

"price < 1500"

"No action required"

"Call setPanicMode(true)"

"emit PriceThresholdBreached"

"Execute L2 transaction"

"Return to monitoring"

Listening

EventReceived

EvaluatePrice

PriceNormal

PriceCrash

TriggerPanic

EmitEvent

CrossChainCall
```

**Diagram: Price Threshold Evaluation State Machine**

When the oracle emits a `PriceUpdate` event with `price < 1500`, the Sentinel automatically initiates the cross-chain call sequence without requiring any manual intervention or external keeper infrastructure.

Sources: [contracts/README.md42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L42-L44)

---

## Contract Architecture

### Key Components

The `AegisSentinel` contract inherits from and utilizes several Reactive Network base contracts:

**Inheritance Hierarchy:**

```
«abstract»

ReactiveContract

+react(chainId, sender, topic0, data)

+vu()

«abstract»

AbstractReactive

+REACTIVE_VM address

+subscribe()

AegisSentinel

-address hookAddress

-address oracleAddress

-uint256 PRICE_THRESHOLD

+react() : override

+setPanicMode(bool)

+getHookAddress() : view

+getOracleAddress() : view

+getPriceThreshold() : view
```

**Diagram: AegisSentinel Class Structure**

The Sentinel extends the Reactive Network's base contracts to implement:

- **`react()`**: Callback triggered when subscribed events occur
- **`vu()`**: View function for VM-only calls (VM: Virtual Machine)
- **Event Subscription**: Registration with `REACTIVE_VM` for cross-chain event monitoring

Sources: [contracts/README.md39-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L44)

---

### State Variables

Based on the constructor arguments and operational requirements, the Sentinel maintains the following state:
VariableTypeVisibilityPurpose`hookAddress``address``private`Target AegisHook contract on Unichain (stored at slot 3)`oracleAddress``address``private`Source MockOracle on Sepolia (stored at slot 4)`PRICE_THRESHOLD``uint256``public constant`Crash detection threshold (1500)`owner``address``private`Deployer address for access control
The contract enforces **access control** to prevent unauthorized triggering of panic mode. Only the Reactive VM itself can call the `react()` function, ensuring that panic mode activation is strictly event-driven.

Sources: [contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)

---

## Cross-Chain Communication

### Message Passing Architecture

The Sentinel uses the Reactive Network's cross-chain messaging system to communicate with contracts on destination chains:

```
AegisHook
(Unichain L2)
AegisSentinel
(Kopli)
Reactive VM
(Kopli)
MockOracle
(Sepolia L1)
AegisHook
(Unichain L2)
AegisSentinel
(Kopli)
Reactive VM
(Kopli)
MockOracle
(Sepolia L1)
Normal Market Conditions
Market Crash Event
"emit PriceUpdate(3000)"
"react(chainId, sender, topic0, data)"
"if (3000 >= 1500) { skip }"
"emit PriceUpdate(1000)"
"react(..., 1000)"
"if (1000 < 1500) { trigger }"
"setPanicMode(true) via cross-chain call"
"panicMode = true"
"emit PriceThresholdBreached(1000)"
```

**Diagram: Cross-Chain Circuit Breaker Activation Sequence**

The cross-chain call is executed using the Reactive Network's native messaging infrastructure, which abstracts the complexity of multi-chain transaction routing and ensures atomic delivery.

Sources: [contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)

---

### Subscription Management

The Sentinel must subscribe to events from the L1 oracle before it can react to them. This subscription is established through the `REACTIVE_VM` system contract:

**Subscription Parameters:**

```
subscribe()

chain_id: 11155111

contract: 0x29f8...BA3b

topic: keccak256('PriceUpdate(uint256)')

future events

triggers react()

AegisSentinel

REACTIVE_VM

MockOracle
```

**Diagram: Event Subscription Registration**

The subscription specifies:

- **Source Chain**: Ethereum Sepolia (Chain ID: 11155111)
- **Contract Address**: `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`
- **Event Topic**: `PriceUpdate(uint256)` signature hash

Sources: [contracts/README.md114-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L114-L116)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json12](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L12-L12)

---

## Integration Points

### Oracle Integration

The Sentinel monitors the `MockOracle` contract deployed on Ethereum Sepolia:
PropertyValue**Oracle Address**`0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`**Monitored Event**`PriceUpdate(uint256 price)`**Chain ID**`11155111` (Sepolia)**Update Frequency**Event-driven (no polling)
In production, this would be replaced with a Chainlink oracle address. The interface remains identical—only the address changes.

Sources: [contracts/README.md61-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L61-L68)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json12](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L12-L12)

---

### Hook Integration

The Sentinel controls the `AegisHook` contract on Unichain by invoking access-controlled functions:
PropertyValue**Hook Address**`0xBaa0573e3BE4291b58083e717E9EF5051772C080`**Control Function**`setPanicMode(bool panicMode)`**Chain ID**`1301` (Unichain Sepolia)**Access Control**Only Sentinel can call
The hook verifies that calls to `setPanicMode()` originate from the Sentinel address, preventing unauthorized circuit breaker activation.

Sources: [contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)[contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L11-L11)

---

### Reputation System Integration

The Sentinel also monitors the `AegisGuardianRegistry` contract for feedback events:

**Monitored Events:**

- `NewFeedback(address guardian, uint256 interventionId)`: Emitted when guardians successfully intervene
- Used to automatically boost guardian reputation scores on L2

**Integration Flow:**

```
recordIntervention()

emit NewFeedback()

listen to feedback

boostReputation(guardian)

update VIP status

Guardian
(Human/Bot)

AegisGuardianRegistry
(Sepolia)

AegisSentinel
(Reactive)

AegisHook
(Unichain)
```

**Diagram: Reputation Feedback Loop**

This integration creates a trustless reputation system where successful interventions on L1 automatically grant benefits on L2 without requiring manual verification or centralized trust.

Sources: [contracts/README.md52-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L52-L58)

---

## Deployment Process

### Step-by-Step Deployment

The Sentinel deployment follows a two-phase process documented in the deployment script:

**Phase 1: Contract Deployment**

```
forge script script/05_DeploySentinel.s.sol \
  --rpc-url reactive \
  --broadcast \
  --legacy
```

Key flags:

- `--legacy`: Uses legacy transaction type for EIP-155 compatibility with Reactive Network
- `--broadcast`: Executes the deployment transaction

**Phase 2: Subscription Registration**

After deployment, a separate transaction must be sent to register the event subscription:

```
// Manual call required (not automated in script)
sentinel.subscribe();
```

This two-step process is necessary due to the architecture of the Reactive Network's subscription system.

Sources: [contracts/README.md112-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L112-L116)

---

### Transaction Receipt

The deployment transaction details:
FieldValue**Transaction Hash**`0x98d0ea4fda0f82a98d840f2df750a61cdcb3265acf6f54e9653a59aa76d8fa89`**Gas Used**`0x10e4f0` (1,107,184 gas)**Block Number**`0x213d06` (2,178,310)**Status**`0x1` (Success)**Contract Address**`0x0f764437ffbe1fcd0d0d276a164610422710b482`**Deployer**`0xd2df53d9791e98db221842dd085f4144014bbe2a`
Sources: [contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json27-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/broadcast/05_DeploySentinel.s.sol/5318007/run-latest.json#L27-L42)

---

## Access Control

The Sentinel implements multiple layers of access control to ensure secure operation:

### VM-Only Functions

Certain functions can only be called by the Reactive VM:

```
react() - REVERTS

react() - ALLOWED

require(msg.sender == REACTIVE_VM)

External Caller

AegisSentinel

REACTIVE_VM
0x00...fffFfF
```

**Diagram: VM-Only Access Control**

This prevents attackers from manually triggering the `react()` function to falsely activate panic mode.

### Owner-Only Functions

Administrative functions are restricted to the contract owner (deployer):

- Configuration updates
- Emergency pause functionality
- Subscription management

The owner address is set during construction to `msg.sender` of the deployment transaction.

Sources: [contracts/README.md39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L50)

---

## Event Emissions

The Sentinel emits events to provide transparency into its operations:
EventParametersPurpose`PriceThresholdBreached``uint256 price`Logged when oracle price drops below threshold`PanicModeTriggered``address hook, bool status`Logged when cross-chain call to hook succeeds`SubscriptionCreated``uint256 chainId, address target`Logged when event subscription is registered
These events enable off-chain monitoring systems and frontends to track the Sentinel's activity without direct chain interaction.

Sources: [contracts/README.md42-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L42-L44)

---

## Gas Considerations

The Sentinel's cross-chain operations involve gas costs on multiple chains:
OperationChainApproximate Gas`react()` callbackReactive Network~50,000 gasCross-chain messageReactive Network~100,000 gas`setPanicMode()` executionUnichain~30,000 gas
The contract is deployed with sufficient funding (minimum 0.5 ETH equivalent on Reactive Network) to ensure reliable cross-chain message delivery. Insufficient balance would cause cross-chain calls to fail.

Sources: [contracts/README.md114-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L114-L116)

---

## Security Considerations

### Threat Model

The Sentinel is designed to resist the following attack vectors:

1. **Unauthorized Panic Activation**: Prevented by VM-only access control on `react()`
2. **Subscription Hijacking**: Subscription registration restricted to owner
3. **Oracle Manipulation**: Trusts oracle contract (acceptable for MVP; production would use Chainlink)
4. **Cross-Chain Message Replay**: Handled by Reactive Network infrastructure

### Trust Assumptions

The system makes the following trust assumptions:

- **Reactive Network Security**: Assumes the Reactive VM correctly routes events and enforces access control
- **Oracle Integrity**: Trusts the oracle contract to emit accurate price data
- **Cross-Chain Finality**: Assumes Reactive Network waits for sufficient L1 confirmations before triggering reactions

Sources: [contracts/README.md39-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L50)

---

## Testing

Integration tests verify the Sentinel's behavior across multiple scenarios:
Test CaseExpected ResultStatus**Oracle Update**Sentinel receives PriceUpdate event✅ PASS**Access Control**Only Sentinel can trigger hook✅ PASS**Panic Trigger**setPanicMode(true) called when price < 1500✅ PASS**Circuit Breaker**Hook reverts swaps when panic active✅ PASS
Test execution:

```
forge test --match-contract AegisIntegrationTest -vv
```

Sources: [contracts/README.md85-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L85-L94)