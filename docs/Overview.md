# Overview
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore)
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

## Purpose and Scope

This document provides a high-level introduction to the Aegis system, a cross-chain circuit breaker designed to protect Uniswap v4 liquidity pools from Loss Versus Rebalancing (LVR) during market volatility. Aegis operates across three blockchain networks—Ethereum Sepolia (L1), Reactive Network, and Unichain Sepolia (L2)—using autonomous smart contracts to detect price crashes and temporarily gate pool access.

This overview covers the system's architecture, core components, data flow, and repository structure. For detailed documentation of individual smart contracts, see [Smart Contracts](/HACK3R-CRYPTO/Aegis/2-smart-contracts). For deployment procedures and network configurations, see [Deployment](/HACK3R-CRYPTO/Aegis/3-deployment). For local development setup, see [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup).

Sources: [README.md1-148](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L1-L148)[contracts/README.md1-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L122)

---

## Problem Statement: Loss Versus Rebalancing (LVR)

Liquidity providers on Layer 2 networks experience systematic losses when mainnet price movements create arbitrage opportunities. When Ethereum mainnet prices crash, arbitrage bots exploit stale L2 pool prices before they update, extracting value from LPs. This "toxic flow" costs LPs hundreds of millions of dollars annually.

Aegis addresses this by monitoring L1 price feeds and automatically pausing L2 pool swaps during extreme volatility, preventing arbitrage bots from trading against stale prices.

Sources: [README.md13-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L13-L15)

---

## Solution Overview

Aegis implements an autonomous, event-driven circuit breaker that operates without manual intervention. The system consists of four primary smart contracts deployed across three networks:
ContractNetworkPurpose`MockOracle`Ethereum Sepolia (L1)Emits price update events (simulates Chainlink feed)`AegisGuardianRegistry`Ethereum Sepolia (L1)Manages guardian identities (ERC-721) and reputation (ERC-8004)`AegisSentinel`Reactive NetworkMonitors L1 events and triggers cross-chain actions`AegisHook`Unichain Sepolia (L2)Implements Uniswap v4 hook with circuit breaker logic
The system operates autonomously: price crashes on L1 trigger the `AegisSentinel` to activate panic mode on the `AegisHook`, which then reverts all swap attempts until volatility stabilizes.

Sources: [README.md17-23](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L17-L23)[contracts/README.md8-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L8-L26)[README.md138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L138-L142)

---

## System Architecture

The following diagram shows the cross-chain architecture and how contracts interact across networks:

**Aegis Cross-Chain Circuit Breaker Architecture**

```
Unichain Sepolia (Chain: 1301)

Reactive Network (Chain: 5318007)

Ethereum Sepolia (Chain: 11155111)

PriceUpdate event

NewFeedback event

cross-chain call

cross-chain call

beforeSwap() hook

MockOracle
0x29f8...BA3b

setPrice()
emit PriceUpdate

AegisGuardianRegistry

mintGuardian()
recordFeedback()
emit NewFeedback

AegisSentinel
0x0f76...b482

react() callback
setPanicMode() call
boostReputation() call

AegisHook
0xBaa0...2C080

beforeSwap() gate
setPanicMode() setter
recordIntervention()

Uniswap v4 PoolManager

swap() entry point
```

Sources: [README.md55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L55-L75)[contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)

---

## Core Components

### MockOracle

**File**: [src/MockOracle.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/MockOracle.sol)**Network**: Ethereum Sepolia**Address**: `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`

Simulates a Chainlink price feed for demonstration purposes. Emits `PriceUpdate` events that the `AegisSentinel` subscribes to. In production, this would be replaced with actual Chainlink oracle contracts without requiring changes to the Sentinel logic.

**Key Functions**:

- `setPrice(uint256 newPrice)`: Updates the price and emits `PriceUpdate` event

Sources: [contracts/README.md46-50](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L46-L50)[contracts/README.md61-68](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L61-L68)

### AegisSentinel

**File**: [src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisSentinel.sol)**Network**: Reactive Network**Address**: `0x0f764437ffBE1fcd0d0d276a164610422710B482`

Autonomous monitoring contract that subscribes to L1 events and triggers cross-chain actions. Eliminates the "Inversion of Control" problem by running as a self-executing smart contract rather than requiring external keeper infrastructure.

**Key Functions**:

- `react()`: Callback triggered by subscribed events, evaluates threshold and triggers cross-chain calls
- Cross-chain calls to `setPanicMode()` on `AegisHook`
- Cross-chain calls to `boostReputation()` on `AegisHook`

Sources: [contracts/README.md39-44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L39-L44)[README.md44-47](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L44-L47)

### AegisHook

**File**: [src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisHook.sol)**Network**: Unichain Sepolia**Address**: `0xBaa0573e3BE4291b58083e717E9EF5051772C080`

Uniswap v4 hook that implements the circuit breaker mechanism. The address starts with `0x80` (obtained via CREATE2 salt mining) to indicate `BEFORE_SWAP` flag compatibility.

**Key Functions**:

- `beforeSwap()`: Hook callback that reverts with `PoolPaused()` when `panicMode == true`
- `setPanicMode(bool _panic)`: Updates circuit breaker state (only callable by `AegisSentinel`)
- `recordIntervention()`: Logs guardian interventions during panic mode

Sources: [contracts/README.md32-37](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L32-L37)[README.md40-42](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L40-L42)

### AegisGuardianRegistry

**File**: [src/AegisGuardianRegistry.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/src/AegisGuardianRegistry.sol)**Network**: Ethereum Sepolia

Implements ERC-721 (NFT identities) and ERC-8004 (trustless agent feedback) for on-chain reputation management. Guardians who provide liquidity during crashes earn reputation boosts, granting them VIP trading privileges (0.01% fees during panic mode for reputation > 90).

**Key Functions**:

- `mintGuardian()`: Issues unique NFT identity to guardians
- `recordFeedback()`: Stores intervention records with immutable feedback
- Emits `NewFeedback` events that `AegisSentinel` subscribes to for reputation synchronization

Sources: [README.md24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L24-L33)[contracts/README.md52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L52-L57)

---

## Operational Data Flow

The following sequence diagram illustrates the circuit breaker activation flow when a price crash occurs:

**Circuit Breaker Activation Sequence**

```
Trader
PoolManager
(Unichain)
AegisHook
(Unichain)
AegisSentinel
(Reactive)
MockOracle
(Sepolia)
Trader
PoolManager
(Unichain)
AegisHook
(Unichain)
AegisSentinel
(Reactive)
MockOracle
(Sepolia)
Market crash occurs
panicMode = true
setPrice(1000)
emit PriceUpdate(1000)
react() callback
if price < THRESHOLD
setPanicMode(true)
[cross-chain call]
swap()
beforeSwap()
require(!panicMode)
revert PoolPaused()
Transaction reverted
```

Sources: [README.md55-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L55-L75)[contracts/README.md11-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L11-L26)

---

## Repository Structure

Aegis uses a monorepo architecture with clear separation between smart contracts and frontend:

```
aegis/
├── contracts/              # Foundry-based smart contract development
│   ├── src/               # Solidity source files
│   │   ├── AegisHook.sol
│   │   ├── AegisSentinel.sol
│   │   ├── MockOracle.sol
│   │   └── AegisGuardianRegistry.sol
│   ├── script/            # Deployment scripts
│   │   ├── 04_DeployOracle.s.sol
│   │   ├── 05_DeploySentinel.s.sol
│   │   └── 06_DeployHook.s.sol
│   ├── test/              # Integration tests
│   ├── broadcast/         # Deployment logs (chain-specific)
│   ├── out/               # Compiled artifacts
│   ├── lib/               # Git submodules (dependencies)
│   └── foundry.toml       # Foundry configuration
├── frontend/              # Next.js dashboard
│   ├── pages/
│   ├── out/               # Static build output
│   └── package.json
└── README.md

```

For detailed project structure documentation, see [Project Structure](/HACK3R-CRYPTO/Aegis/4.2-project-structure). For dependency management via Git submodules, see [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules).

Sources: [.gitignore1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L1-L26)[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)[contracts/README.md1-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L6)

---

## Deployment Networks

Aegis operates across three distinct blockchain networks:
NetworkChain IDRPC EndpointPurposeEthereum Sepolia11155111Standard Sepolia RPCPrice oracle and guardian registry (L1)Reactive Kopli5318007Reactive Network RPCEvent monitoring and cross-chain orchestrationUnichain Sepolia1301Unichain testnet RPCUniswap v4 pool protection (L2)
Deployment requires sequential execution: L1 contracts first (oracle), then Reactive Network (sentinel), and finally L2 (hook). For detailed deployment instructions, see [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts).

Sources: [README.md138-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L138-L142)[contracts/README.md99-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L122)

---

## Key Technologies

### Uniswap v4 Hooks

Aegis implements the `IHooks` interface from `v4-core`, specifically utilizing the `beforeSwap()` callback to inspect and potentially revert transactions. The hook address must start with `0x80` to indicate `BEFORE_SWAP` permissions, requiring CREATE2 salt mining during deployment. See [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining) for technical details.

### Reactive Network

The `AegisSentinel` contract extends reactive network base contracts to enable cross-chain event subscriptions. This eliminates the need for off-chain keeper infrastructure—the contract itself is the autonomous agent. However, testnet infrastructure limitations required building a hybrid relayer (`relay.ts`) as a fallback mechanism. See [Hybrid Relayer](/HACK3R-CRYPTO/Aegis/8-hybrid-relayer) for details.

### ERC-8004 Trustless Agents

The `AegisGuardianRegistry` implements the ERC-8004 standard for recording immutable feedback about agent interventions. This enables reputation-based access control where high-reputation guardians (score > 90) receive preferential fee rates (0.01% vs standard fees) during panic mode.

Sources: [README.md24-52](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L24-L52)[contracts/README.md52-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L52-L57)[README.md77-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L77-L84)

---

## Testing and Verification

Aegis includes comprehensive integration tests covering:
Test CaseValidatesStatusOracle Update`MockOracle.setPrice()` emits events✅ PASSAccess ControlOnly `AegisSentinel` can call `AegisHook.setPanicMode()`✅ PASSPanic TriggerCross-chain `setPanicMode(true)` call succeeds✅ PASSCircuit Breaker`AegisHook.beforeSwap()` reverts with `PoolPaused()` during panic✅ PASS
Tests use Foundry's testing framework and are executed via GitHub Actions CI/CD pipeline. For detailed test documentation, see [Test Suite](/HACK3R-CRYPTO/Aegis/5.1-test-suite).

Sources: [README.md127-134](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L127-L134)[contracts/README.md85-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L85-L94)

---

## Related Documentation

- **System Architecture**: [System Architecture](/HACK3R-CRYPTO/Aegis/1.1-system-architecture) - Detailed architectural patterns and component interactions
- **Key Features**: [Key Features](/HACK3R-CRYPTO/Aegis/1.2-key-features) - Circuit breaker mechanism, panic mode, and reputation system
- **Smart Contracts**: [Smart Contracts](/HACK3R-CRYPTO/Aegis/2-smart-contracts) - Individual contract documentation
- **Deployment**: [Deployment](/HACK3R-CRYPTO/Aegis/3-deployment) - Multi-network deployment strategy and scripts
- **Development Setup**: [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup) - Local development environment configuration
- **Testing**: [Testing](/HACK3R-CRYPTO/Aegis/5-testing) - Test suite and CI/CD pipeline
- **Frontend Application**: [Frontend Application](/HACK3R-CRYPTO/Aegis/7-frontend-application) - Next.js dashboard documentation
- **Hybrid Relayer**: [Hybrid Relayer](/HACK3R-CRYPTO/Aegis/8-hybrid-relayer) - Fallback relayer mechanism

Sources: [README.md1-148](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L1-L148)[contracts/README.md1-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L1-L122)