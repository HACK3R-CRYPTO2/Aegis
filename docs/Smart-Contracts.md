# Smart Contracts
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

This document provides an overview of the four core smart contracts that comprise the Aegis system. These contracts are deployed across three networks (Ethereum Sepolia, Reactive Network, and Unichain Sepolia) and work together to implement the autonomous circuit breaker mechanism. For detailed information about individual contracts, see subsections [2.1](/HACK3R-CRYPTO/Aegis/2.1-mockoracle), [2.2](/HACK3R-CRYPTO/Aegis/2.2-aegissentinel), [2.3](/HACK3R-CRYPTO/Aegis/2.3-aegishook), and [2.4](/HACK3R-CRYPTO/Aegis/2.4-aegisguardianregistry). For deployment procedures and network configuration, see [Deployment](/HACK3R-CRYPTO/Aegis/3-deployment).

## Contract Overview

The Aegis system consists of four primary smart contracts, each serving a distinct role in the cross-chain circuit breaker architecture:
ContractNetworkPrimary RoleStandard/Base`MockOracle`Ethereum Sepolia (L1)Price feed simulation and event emissionCustom oracle interface`AegisSentinel`Reactive Network (Kopli)Autonomous monitoring and cross-chain orchestrationReactive Network contracts`AegisHook`Unichain Sepolia (L2)Uniswap v4 hook implementing circuit breakerUniswap v4 `IHooks``AegisGuardianRegistry`Ethereum Sepolia (L1)Reputation tracking and guardian identityERC-721 + ERC-8004
**Sources:**[README.md1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L1-L149)[contracts/README.md1-123](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L123)

## Cross-Chain Contract Deployment

### Deployment Architecture

The following diagram illustrates how the four contracts are distributed across blockchain networks and their deployment relationships:

```
Unichain Sepolia (Chain ID: 1301)

Reactive Network Kopli (Chain ID: 5318007)

Ethereum Sepolia (Chain ID: 11155111)

PriceUpdate events

NewFeedback events

cross-chain call

recordIntervention()

hook callback

MockOracle
0x29f8...BA3b
setPrice(), PriceUpdate()

AegisGuardianRegistry
ERC-721 + ERC-8004
mintGuardian(), recordFeedback()

AegisSentinel
0x0f76...b482
react(), setPanicMode(), boostReputation()

AegisHook
0xBaa0...2C080
beforeSwap(), setPanicMode()

PoolManager
Uniswap v4 Core
```

**Sources:**[README.md56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L56-L75)[contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)[README.md138-143](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L138-L143)

### Deployed Contract Addresses

The system is currently deployed on testnet infrastructure with the following verified addresses:
NetworkContractAddressDeployment ScriptEthereum Sepolia`MockOracle``0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b``04_DeployOracle.s.sol`Reactive Kopli`AegisSentinel``0x0f764437ffBE1fcd0d0d276a164610422710B482``05_DeploySentinel.s.sol`Unichain Sepolia`AegisHook``0xBaa0573e3BE4291b58083e717E9EF5051772C080``06_DeployHook.s.sol`Ethereum Sepolia`AegisGuardianRegistry`TBD(Reputation system)
**Sources:**[README.md138-143](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L138-L143)[contracts/README.md99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L104)[contracts/README.md106-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L106-L122)

## Contract Interaction Flow

### Circuit Breaker Activation Sequence

The following diagram maps the natural language concepts of the circuit breaker mechanism to the specific smart contract functions and events that implement them:

```
"Trader"
"PoolManager
(Uniswap v4)"
"AegisHook.sol
(Unichain)"
"AegisSentinel.sol
(Reactive)"
"MockOracle.sol
(Sepolia)"
"Trader"
"PoolManager
(Uniswap v4)"
"AegisHook.sol
(Unichain)"
"AegisSentinel.sol
(Reactive)"
"MockOracle.sol
(Sepolia)"
Simulated price crash
alt
[Price below threshold]
[Price normal]
"setPrice(uint256 newPrice)"
"emit PriceUpdate(newPrice, timestamp)"
"react()"
"Check: newPrice < PANIC_THRESHOLD"
"setPanicMode(bool state)"
"panicMode = true"
"swap(params)"
"beforeSwap(sender, key, params, hookData)"
"require(!panicMode)"
"revert PoolPaused()"
"Transaction reverted"
"setPanicMode(false)"
"panicMode = false"
"swap(params)"
"beforeSwap(sender, key, params, hookData)"
"Check: panicMode == false"
"bytes4(IHooks.beforeSwap.selector)"
"Swap executed"
```

**Sources:**[README.md56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L56-L75)[contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)[contracts/README.md40-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L40-L44)

### Guardian Reputation Flow

The following diagram shows how the reputation system integrates with the circuit breaker via cross-chain event monitoring:

```
"AegisSentinel.sol
react()"
"AegisGuardianRegistry.sol
recordFeedback()"
"AegisHook.sol
beforeSwap()"
"Guardian/Agent"
"AegisSentinel.sol
react()"
"AegisGuardianRegistry.sol
recordFeedback()"
"AegisHook.sol
beforeSwap()"
"Guardian/Agent"
panicMode = true (active)
Guardian promoted to higher tier
"Heroic swap during panic"
"Check: guardian.reputation > 90"
"Apply: 0.01% fee (VIP)"
"recordIntervention(guardian, volume)"
"Increment: totalStabilizedVolume"
"emit NewFeedback(guardian, volume, impact)"
"react() triggered by NewFeedback"
"Calculate: reputationBoost"
"boostReputation(guardian, amount)"
"Update: guardian.reputation += boost"
```

**Sources:**[README.md24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L24-L33)[contracts/README.md53-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L53-L58)[README.md62-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L62-L75)

## Contract Roles and Responsibilities

### 1. MockOracle (`src/MockOracle.sol`)

**Purpose:** Simulates a price feed oracle on Ethereum Sepolia for demonstration purposes. In production, this would be replaced by a Chainlink Oracle contract with no changes to downstream logic.

**Key Functions:**

- `setPrice(uint256 newPrice)` - Manually updates the price and emits `PriceUpdate` event
- Event: `PriceUpdate(uint256 indexed price, uint256 timestamp)` - Monitored by `AegisSentinel`

**Design Rationale:** Using a mock oracle allows deterministic triggering of "black swan" events for demonstration purposes without waiting for real market volatility.

**Sources:**[contracts/README.md46-51](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L46-L51)[contracts/README.md61-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L61-L68)

### 2. AegisSentinel (`src/AegisSentinel.sol`)

**Purpose:** Autonomous monitoring contract deployed on Reactive Network that subscribes to L1 events and triggers cross-chain actions on L2.

**Key Functions:**

- `react()` - Callback invoked when subscribed events are detected
- `setPanicMode(bool state)` - Sends cross-chain message to `AegisHook`
- `boostReputation(address guardian, uint256 amount)` - Updates guardian reputation on L2

**Integration:** Subscribes to `PriceUpdate` events from `MockOracle` and `NewFeedback` events from `AegisGuardianRegistry`.

**Deployment Note:** Requires `--legacy` flag due to Reactive Network's EIP-155 compatibility requirements.

**Sources:**[contracts/README.md40-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L40-L44)[README.md46-47](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L46-L47)[contracts/README.md113-116](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L113-L116)

### 3. AegisHook (`src/AegisHook.sol`)

**Purpose:** Uniswap v4 hook contract on Unichain that implements the circuit breaker mechanism by gating swap transactions based on `panicMode` state.

**Key Functions:**

- `beforeSwap(address sender, PoolKey calldata key, IPoolManager.SwapParams calldata params, bytes calldata hookData)` - Hook callback that checks `panicMode`
- `setPanicMode(bool state)` - Called by `AegisSentinel` to activate/deactivate circuit breaker
- `recordIntervention(address guardian, uint256 volume)` - Logs guardian actions during panic

**State Variables:**

- `bool public panicMode` - Circuit breaker state
- `mapping(address => Guardian) public guardians` - Reputation data

**Address Requirements:** Must be deployed with `BEFORE_SWAP` flag (`0x80...`) using CREATE2 salt mining (see [3.4](/HACK3R-CRYPTO/Aegis/3.4-hook-mining)).

**Sources:**[contracts/README.md33-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L37)[README.md77-80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L77-L80)[contracts/README.md118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L118-L122)

### 4. AegisGuardianRegistry (`src/AegisGuardianRegistry.sol`)

**Purpose:** Implements ERC-721 (NFT identity) and ERC-8004 (Trustless Agents) standards to track guardian reputation and heroic interventions on L1.

**Key Functions:**

- `mintGuardian()` - Creates unique Guardian NFT identity
- `recordFeedback(address guardian, uint256 volume, uint256 impact)` - Logs intervention data
- Event: `NewFeedback(address indexed guardian, uint256 volume, uint256 impact)` - Monitored by `AegisSentinel`

**Standards:**

- **ERC-721**: Unique non-transferable identity for each guardian
- **ERC-8004**: On-chain feedback and reputation accumulation

**Cross-Chain Sync:**`AegisSentinel` automatically propagates reputation updates to `AegisHook` on L2.

**Sources:**[contracts/README.md53-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L53-L58)[README.md27-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L27-L32)

## Access Control and Security

The system implements strict access control to prevent unauthorized manipulation of the circuit breaker:
FunctionContractAuthorized Caller`setPanicMode(bool)``AegisHook`Only `AegisSentinel` address`setPrice(uint256)``MockOracle`Owner only (testnet demo)`react()``AegisSentinel`Reactive Network system (automatic)`recordIntervention()``AegisGuardianRegistry`Only `AegisHook` address
Access control violations revert with appropriate error messages. The integration test suite verifies these constraints (see [5.1](/HACK3R-CRYPTO/Aegis/5.1-test-suite)).

**Sources:**[contracts/README.md89-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L89-L94)[README.md129-134](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L129-L134)

## Development Considerations

### Hook Address Mining

The `AegisHook` contract requires a specific address prefix (`0x80...`) to signal the `BEFORE_SWAP` permission to the Uniswap v4 `PoolManager`. This is achieved through CREATE2 salt mining before deployment.

**Process:**

1. Calculate bytecode hash of `AegisHook` contract
2. Iterate through salt values until resulting CREATE2 address has `0x80` prefix
3. Deploy with computed salt

See [3.4 Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining) for implementation details.

**Sources:**[README.md80](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L80-L80)[contracts/README.md118-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L118-L122)

### Mock vs. Production Oracle

The `MockOracle` contract is intentionally used for testnet demonstrations to enable deterministic event triggering. For mainnet deployment:

1. Replace `MockOracle` address in `AegisSentinel` constructor with Chainlink Oracle address
2. Ensure event signature compatibility: `PriceUpdate(uint256 indexed price, uint256 timestamp)`
3. No other code changes required in `AegisSentinel.sol`

**Sources:**[contracts/README.md61-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L61-L68)

### Cross-Chain Message Reliability

The Reactive Network infrastructure on testnet may experience latency issues with cross-chain message delivery to Unichain Sepolia (Chain ID 1301). A hybrid relayer (`relay.ts`) provides fallback functionality to ensure message delivery during testnet infrastructure gaps. See [8 Hybrid Relayer](/HACK3R-CRYPTO/Aegis/8-hybrid-relayer) for details.

**Sources:**[README.md81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L81-L84)