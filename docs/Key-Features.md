# Key Features
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)

## Purpose and Scope

This document describes the core features of the Aegis system, including the circuit breaker mechanism, panic mode protection, reputation system (Agentic Shield), and VIP lane for trusted guardians. For details on the underlying smart contracts that implement these features, see [Smart Contracts](/HACK3R-CRYPTO/Aegis/2-smart-contracts). For information on the cross-chain architecture that enables these features, see [System Architecture](/HACK3R-CRYPTO/Aegis/1.1-system-architecture).

---

## Circuit Breaker Mechanism

The circuit breaker is Aegis's primary defense mechanism that temporarily halts trading activity in a Uniswap v4 pool when extreme market volatility is detected. This protects liquidity providers from loss versus rebalancing (LVR) caused by arbitrage bots exploiting stale prices on Layer 2.

### Implementation

The circuit breaker is implemented in the `AegisHook` contract deployed on Unichain Sepolia at address `0xBaa0573e3BE4291b58083e717E9EF5051772C080`. The hook intercepts swap operations through the `beforeSwap()` function, which is called by the Uniswap v4 `PoolManager` before every swap execution.

```
Flow: Trader Swap → PoolManager → AegisHook.beforeSwap() → Check panicMode → Allow/Revert

```

### State Machine

The circuit breaker operates as a binary state machine:

```
"setPanicMode(true)"

"setPanicMode(false)"

Normal

"beforeSwap() returns"

AllowSwaps

ExecuteSwap

Panic

"PoolPaused() error"

BlockSwaps

RevertTransaction
```

**Sources:**[README.md41-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L41-L42)[README.md132-134](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L132-L134)

---

## Panic Mode

Panic mode is the activated state of the circuit breaker. When enabled, all standard swap operations are rejected with a `PoolPaused()` revert error. Only guardians with sufficient reputation can bypass this restriction through the VIP lane.

### Trigger Conditions

Panic mode is triggered by the `AegisSentinel` contract on Reactive Network (address `0x0f764437ffBE1fcd0d0d276a164610422710B482`) when it detects price movements exceeding the configured threshold. The current demo configuration uses a >5% price drop within a 5-minute window as the trigger condition.

### Trigger Flow

```
emit PriceUpdate()

if price < THRESHOLD

setPanicMode(true)

panicMode = true

MockOracle
Sepolia L1
0x29f8...BA3b

AegisSentinel
Reactive Network
0x0f76...b482

AegisHook
Unichain L2
0xBaa0...2C080
```

### State Persistence

The `panicMode` boolean state is stored in the `AegisHook` contract storage and persists across blocks until explicitly deactivated by the `AegisSentinel`. This ensures protection remains active even if the sentinel experiences temporary downtime.

**Sources:**[README.md19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L19-L22)[README.md132-134](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L132-L134)

---

## Reputation System (Agentic Shield)

The Agentic Shield is Aegis's reputation engine that tracks and rewards guardians who provide stabilizing liquidity during market crashes. It implements both ERC-721 (identity) and ERC-8004 (trustless agent feedback) standards.

### Architecture

```
L2: Unichain

Reactive Network

L1: Ethereum Sepolia

Minted as ERC-721

recordIntervention()

emit NewFeedback()

boostReputation()

Check Rep > 90

AegisGuardianRegistry
ERC-721 + ERC-8004

Guardian NFT Profile
Unique Token ID

AegisSentinel
Event Subscriber

AegisHook
Reputation Cache

Uniswap v4 Pool
```

### ERC-721 Identity Layer

Each guardian must mint a unique NFT profile (`AegisGuardian`) from the `AegisGuardianRegistry` contract. This NFT serves as the guardian's immutable on-chain identity and stores their cumulative reputation score.

**Key Data Points:**

- `totalStabilizedVolume`: Total USD value of stabilizing swaps performed
- `responseLatency`: Average time to respond to volatility events
- `reputationScore`: Composite score (0-100 scale)

### ERC-8004 Feedback Loop

The ERC-8004 standard enables trustless feedback without centralized oracles. When a guardian performs a heroic intervention (providing liquidity during panic mode), the `AegisHook` records this action by emitting a cross-chain call to the registry.

**Feedback Flow:**

1. Guardian performs stabilizing swap during panic mode
2. `AegisHook.recordIntervention()` executes cross-chain call to L1
3. `AegisGuardianRegistry` updates reputation and emits `NewFeedback` event
4. `AegisSentinel` detects event and syncs reputation back to L2
5. `AegisHook` updates local reputation cache via `boostReputation()`

### Autonomous Synchronization

The reputation synchronization between L1 and L2 is fully autonomous. The `AegisSentinel` subscribes to `NewFeedback` events from the registry and automatically propagates reputation updates to the hook contract. No centralized servers or manual intervention required.

**Sources:**[README.md24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L24-L33)[README.md68-74](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L68-L74)

---

## VIP Lane

The VIP lane provides fee discounts to high-reputation guardians, incentivizing them to provide stabilizing liquidity during market volatility. This creates a positive feedback loop where guardians are rewarded for protecting the pool.

### Fee Structure
Reputation ScoreFee RateStatusAccess During Panic< 90Standard (0.30%)Regular Trader❌ Blocked≥ 90Reduced (0.01%)VIP Guardian✅ Allowed
### Access Control Logic

```
false

true

false

true

Swap Request

panicMode?

Allow All Swaps

Rep >= 90?

Revert: PoolPaused()

Apply 0.01% Fee
Execute Swap

Swap Complete

Transaction Failed
```

### Economic Incentive

The VIP lane creates a multi-sided incentive structure:

**For Guardians:**

- 97% fee reduction (0.30% → 0.01%) on all trades during panic mode
- Exclusive market access during high-volatility periods
- Opportunity to profit from stabilizing arbitrage

**For Liquidity Providers:**

- Guardians are incentivized to provide stabilizing liquidity
- Reduced LVR during volatility events
- Improved pool health metrics

**For the Protocol:**

- Self-sustaining guardian network without token emissions
- Market-driven reputation building
- Alignment of profit motive with pool protection

**Sources:**[README.md31](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L31-L31)[README.md68-74](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L68-L74)

---

## Autonomous Operation

Aegis operates autonomously without requiring manual intervention or centralized keeper infrastructure. This eliminates the "Inversion of Control" problem typical of traditional circuit breaker systems.

### Event-Driven Architecture

```
"AegisHook
(Unichain)"
"AegisSentinel
(Reactive)"
"MockOracle
(Sepolia)"
"AegisHook
(Unichain)"
"AegisSentinel
(Reactive)"
"MockOracle
(Sepolia)"
Autonomous Trigger Flow
Autonomous Recovery Flow
"setPrice(newPrice)"
"emit PriceUpdate()"
"react() callback"
"setPanicMode(true)"
"setPrice(normalPrice)"
"emit PriceUpdate()"
"react() callback"
"setPanicMode(false)"
```

### Reactive Network Integration

The `AegisSentinel` contract inherits from the Reactive Network's `AbstractReactive` base contract, enabling it to subscribe to events on Ethereum Sepolia and automatically execute callbacks. This subscription mechanism operates at the protocol level without requiring off-chain infrastructure.

**Key Capabilities:**

- Cross-chain event monitoring without oracles
- Automatic callback execution on destination chain
- Protocol-level message delivery guarantees
- No reliance on centralized keeper networks

### Fallback Mechanism

During the hackathon, testnet infrastructure limitations required a hybrid approach. The `relay.ts` script provides fallback coverage to ensure demo reliability, but the production system is designed to operate purely on-chain.

**Hybrid Architecture:**

- Primary: Reactive Network protocol-level relayers
- Fallback: Custom `relay.ts` monitoring script (testnet only)
- Production: Pure Reactive Network operation without fallback

**Sources:**[README.md46-48](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L46-L48)[README.md81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L81-L84)

---

## Cross-Chain Coordination

Aegis spans three blockchain networks, each serving a specific purpose in the protection architecture. This multi-chain design enables optimal placement of each system component.

### Network Distribution

```
Unichain Sepolia
Chain ID: 1301

Reactive Network Kopli
Chain ID: 5318007

Ethereum Sepolia
Chain ID: 11155111

PriceUpdate events

NewFeedback events

setPanicMode()

boostReputation()

recordIntervention()

beforeSwap() gate

MockOracle
0x29f8...BA3b
Price Feed

AegisGuardianRegistry
ERC-721 + ERC-8004
Reputation Storage

AegisSentinel
0x0f76...b482
Event Monitor

AegisHook
0xBaa0...2C080
Circuit Breaker

Uniswap v4 Pool
Protected Liquidity
```

### Network-Specific Features
NetworkComponentPurposeCritical FeatureEthereum Sepolia`MockOracle`Price feed sourceProduction: Chainlink oraclesEthereum Sepolia`AegisGuardianRegistry`Reputation storageERC-8004 feedback standardReactive Network`AegisSentinel`Cross-chain orchestratorEvent subscription + callbacksUnichain Sepolia`AegisHook`Pool protection250ms block times (Flashblocks)Unichain SepoliaUniswap v4 PoolLiquidity venuev4 hook integration
### Message Flow Types

**Type 1: Volatility Detection**

```
Oracle (L1) → PriceUpdate → Sentinel (Reactive) → setPanicMode() → Hook (L2)

```

**Type 2: Guardian Intervention Recording**

```
Hook (L2) → recordIntervention() → Registry (L1)

```

**Type 3: Reputation Synchronization**

```
Registry (L1) → NewFeedback → Sentinel (Reactive) → boostReputation() → Hook (L2)

```

### Performance Characteristics

The cross-chain architecture achieves low-latency protection through strategic component placement:

- **Detection Speed**: Reactive Network monitors L1 events with minimal latency
- **Execution Speed**: Unichain's 250ms block times enable rapid circuit breaker activation
- **Arbitrage Defense**: Combined detection + execution speed creates a defensive time advantage

**Why This Matters**: Arbitrage bots exploiting LVR typically have 1-2 second windows on traditional L2s. The Aegis stack reduces this window to sub-500ms, making arbitrage economically unviable.

**Sources:**[README.md49-52](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L49-L52)[README.md139-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L139-L142)

---

## Security Verification

All key features have been validated through integration tests executed via Foundry's test framework.
Test CaseFeature ValidatedTest FileStatusOracle UpdatePrice feed mechanismTest suite✅ PASSAccess ControlOnly Sentinel can trigger panicTest suite✅ PASSPanic TriggerCross-chain panic activationTest suite✅ PASSCircuit BreakerSwap rejection during panicTest suite✅ PASS
The test suite validates the complete feature pipeline from price feed updates through circuit breaker activation and guardian reputation tracking.

**Sources:**[README.md128-135](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L128-L135)