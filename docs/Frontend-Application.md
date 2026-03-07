# Frontend Application
Relevant source files
- [.gitignore](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore)
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)

## Purpose and Scope

The Frontend Application is a Next.js-based monitoring dashboard that provides real-time visibility into the Aegis cross-chain circuit breaker system. This document covers the architecture, components, and development workflow of the dashboard application located in the `frontend/` directory.

For information about the smart contracts that the frontend monitors, see [Smart Contracts](/HACK3R-CRYPTO/Aegis/2-smart-contracts). For details about the hybrid relayer component that ensures cross-chain message delivery, see [Hybrid Relayer](/HACK3R-CRYPTO/Aegis/8-hybrid-relayer).

---

## Overview

The Aegis frontend serves as the central monitoring interface for the cross-chain protection system. It displays real-time data from three blockchain networks (Ethereum Sepolia, Reactive Network, and Unichain Sepolia) and provides visibility into the circuit breaker status, oracle prices, guardian reputation, and system health.

The application is built with Next.js and runs on `localhost:3000` during development. It provides a unified view of the distributed Aegis system without requiring users to manually query multiple blockchain explorers.

**Sources:**[README.md1-149](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L1-L149)

---

## Technology Stack

The frontend application is built using the following technologies:
ComponentTechnologyPurpose**Framework**Next.jsReact-based web application framework with server-side rendering**Package Manager**npmDependency management and script execution**Build Output**`frontend/out/`Static export directory for production builds**Build Cache**`frontend/.next/`Next.js development and build cache**Runtime**Node.jsJavaScript runtime environment
The frontend is designed as a standalone application within the monorepo structure, maintaining separation from the smart contract development tooling.

**Sources:**[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)[.gitignore20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L20-L22)

---

## System Architecture

The following diagram illustrates how the frontend integrates with the broader Aegis ecosystem:

### Frontend Integration Architecture

```
Unichain Sepolia L2

Reactive Network

Ethereum Sepolia L1

Frontend Process

Browser Environment

Monitor & Display

Monitor & Display

Monitor & Display

Query Stats

Fallback Monitor

Emergency Trigger

PriceUpdate Events

Status Updates

Panic Mode Status

Reputation Data

Next.js Dashboard
(localhost:3000)

relay.ts
Hybrid Relayer

MockOracle
0x29f8...BA3b

AegisGuardianRegistry
ERC-721 + ERC-8004

AegisSentinel
0x0f76...b482

AegisHook
0xBaa0...2C080
```

The dashboard acts as a read-only monitoring interface for the deployed smart contracts, while the hybrid relayer provides fallback infrastructure for cross-chain message delivery during testnet instability.

**Sources:**[README.md56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L56-L75)[README.md81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L81-L84)

---

## Application Components

### Dashboard Interface

The Next.js dashboard provides the following monitoring capabilities:

1. **Oracle Price Feed**: Displays current price data from the `MockOracle` contract on Ethereum Sepolia (address: `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b`)
2. **Sentinel Status**: Shows the operational status of the `AegisSentinel` on Reactive Network (address: `0x0f764437ffBE1fcd0d0d276a164610422710B482`)
3. **Circuit Breaker State**: Indicates whether the `AegisHook` is in panic mode on Unichain Sepolia (address: `0xBaa0573e3BE4291b58083e717E9EF5051772C080`)
4. **Guardian Registry**: Queries reputation statistics from the `AegisGuardianRegistry` for ERC-721 NFT profiles and ERC-8004 reputation scores

**Sources:**[README.md137-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L137-L142)

### Hybrid Relayer Component

The `relay.ts` module serves as a fallback mechanism to ensure cross-chain message delivery during testnet infrastructure gaps. This component was necessitated by instability in public testnet relayers for Unichain Sepolia (Chain ID 1301).

**Key Functions:**

- Monitors the `MockOracle` contract directly on Ethereum Sepolia
- Detects price update events that may trigger panic mode
- Provides emergency fallback to trigger the `AegisHook` when the Reactive Network relayer experiences delays

The relayer runs as a background process using `npm run relay` and operates independently of the main dashboard UI.

**Sources:**[README.md81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L81-L84)[README.md116-117](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L116-L117)

---

## Development Workflow

### Local Development Setup

The frontend application follows a standard Next.js development workflow:

```
git clone
repository

npm install
(frontend/)

npm run relay
(Background)

npm run dev

Open localhost:3000
```

**Setup Steps:**

1. Navigate to the frontend directory:

```
cd frontend
```
2. Install dependencies:

```
npm install
```
3. Start the hybrid relayer (background process):

```
npm run relay &
```
4. Start the development server:

```
npm run dev
```
5. Access the dashboard at `http://localhost:3000`

**Sources:**[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)

### Build Process

The Next.js build process generates static assets and optimized bundles:

```
Frontend Source
Code

next build

.next/
Build Cache

out/
Static Export

.gitignore
```

Both the `.next/` cache directory and the `out/` static export directory are excluded from version control to keep the repository clean.

**Sources:**[.gitignore20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L20-L22)

---

## File Structure

The frontend application is organized in the monorepo as follows:
PathPurpose`frontend/`Root directory for the Next.js application`frontend/.next/`Next.js build cache (git-ignored)`frontend/out/`Static export output (git-ignored)`frontend/README.md`Frontend-specific documentation`relay.ts`Hybrid relayer module for cross-chain fallback
**Sources:**[README.md98](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L98-L98)[.gitignore20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L20-L22)

---

## Network Integration

The frontend interacts with three distinct blockchain networks simultaneously:

### Multi-Network Monitoring

```
Smart Contracts

RPC Connections

Frontend Dashboard

User Interface
(React Components)

Sepolia RPC
Chain: 11155111

Reactive RPC
Chain: 5318007

Unichain RPC
Chain: 1301

MockOracle
0x29f8...BA3b

AegisGuardianRegistry
(Sepolia)

AegisSentinel
0x0f76...b482

AegisHook
0xBaa0...2C080
```

The dashboard must maintain simultaneous connections to all three networks to provide a unified view of the cross-chain system state.

**Sources:**[README.md137-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L137-L142)

---

## Key Features

### Real-Time Monitoring

The dashboard provides live updates of the following system metrics:

1. **Price Feed Status**: Current oracle price from `MockOracle.setPrice()` events
2. **Volatility Detection**: Visual indicators when price changes exceed thresholds
3. **Panic Mode Status**: Boolean state of `AegisHook.panicMode`
4. **Guardian Activity**: Recent interventions recorded via `AegisHook.recordIntervention()`
5. **Reputation Tracking**: Current reputation scores from `AegisGuardianRegistry`

**Sources:**[README.md18-23](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L18-L23)[README.md27-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L27-L32)

### Circuit Breaker Visualization

The interface displays the circuit breaker lifecycle:

```
"AegisHook (L2)"
"MockOracle (L1)"
"Frontend UI"
"Dashboard User"
"AegisHook (L2)"
"MockOracle (L1)"
"Frontend UI"
"Dashboard User"
"Price Crash Event"
"Load Dashboard"
"Query Current Price"
"Price Data"
"Query panicMode"
"Boolean Status"
"Display Circuit Breaker State"
"PriceUpdate Event"
"Re-query panicMode"
"panicMode = true"
"🔒 POOL LOCKED Alert"
```

This visualization helps users understand the system's protective actions in real-time.

**Sources:**[README.md18-23](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L18-L23)

---

## Development Scripts

The `package.json` in the frontend directory defines the following npm scripts:
CommandPurpose`npm run dev`Start the Next.js development server with hot reload`npm run build`Create production build in `out/` directory`npm run relay`Start the hybrid relayer background process
**Sources:**[README.md116-121](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L116-L121)

---

## Integration with Smart Contracts

### Contract Address Configuration

The frontend must be configured with the deployed contract addresses from the deployment logs:

```
Frontend Config

broadcast/ Logs

Extract Oracle Address

Extract Registry Address

Extract Sentinel Address

Extract Hook Address

Used by

Sepolia Deployment
run-*.json

Reactive Deployment
run-*.json

Unichain Deployment
run-*.json

Contract Addresses
Configuration

Dashboard Components
```

The addresses shown in the README are the current deployed instances:

- Ethereum Sepolia: `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b` (MockOracle)
- Reactive Lasna: `0x0f764437ffBE1fcd0d0d276a164610422710B482` (AegisSentinel)
- Unichain Sepolia: `0xBaa0573e3BE4291b58083e717E9EF5051772C080` (AegisHook)

**Sources:**[README.md137-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L137-L142)

---

## Guardian Dashboard Features

The Aegis dashboard includes specialized views for the Guardian Registry system:

### Reputation Visualization

```
Frontend Display

AegisGuardianRegistry (L1)

NewFeedback Events

ERC-721 NFT
Guardian Profile

ERC-8004
Reputation Score

Guardian Profile View
(NFT Metadata)

Reputation Score
(0-100)

Intervention History
(On-chain Events)

VIP Status Indicator
(Rep > 90)
```

The dashboard queries the `AegisGuardianRegistry` to display:

- Guardian NFT profiles (ERC-721)
- Current reputation scores (ERC-8004)
- Historical interventions during volatility
- VIP lane eligibility (reputation > 90 for reduced fees)

**Sources:**[README.md27-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L27-L32)

---

## Testnet Infrastructure

The frontend is designed to work with testnet deployments across three networks:
NetworkChain IDRPC EndpointPurpose**Ethereum Sepolia**11155111Sepolia RPCOracle and Registry monitoring**Reactive Kopli**5318007Reactive RPCSentinel status tracking**Unichain Sepolia**1301Unichain RPCHook and pool state monitoring
For detailed network configuration, see [Network Configuration](/HACK3R-CRYPTO/Aegis/3.2-network-configuration).

**Sources:**[README.md137-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L137-L142)

---

## Build Artifacts

The Next.js build process generates several artifact directories:

```
Version Control

Generated Artifacts

Build Process

Frontend Source

next build

.next/
Development Cache
Production Build

out/
Static HTML Export
Asset Files

.gitignore
Excludes Build Artifacts
```

Both directories are excluded from Git to maintain repository cleanliness and avoid committing generated files.

**Sources:**[.gitignore20-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitignore#L20-L22)

---

## Relayer Architecture

The hybrid relayer provides critical fallback functionality:

### Relayer Operation Flow

```
"AegisHook
(Unichain)"
"AegisSentinel
(Reactive)"
"MockOracle
(Sepolia)"
"relay.ts
(Fallback)"
"AegisHook
(Unichain)"
"AegisSentinel
(Reactive)"
"MockOracle
(Sepolia)"
"relay.ts
(Fallback)"
"Monitors Oracle Events"
"No Action Needed"
"Message Stuck in Relayer"
alt
[Reactive Network Stable]
[Reactive Network Delayed]
"PriceUpdate Event"
"PriceUpdate Event
(Direct Monitor)"
"setPanicMode(true)"
"Emergency setPanicMode(true)
(Fallback Trigger)"
```

The relayer was implemented to address public testnet relayer instability for Unichain Sepolia during the hackathon. It ensures the demo works seamlessly despite infrastructure limitations.

**Sources:**[README.md81-84](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L81-L84)

---

## Future Enhancements

The frontend roadmap includes:

1. **Gamified Leaderboard**: Display `totalStabilizedVolume` and `responseLatency` metrics for guardians
2. **Competition View**: Show rankings of the most effective defenders
3. **Historical Charts**: Visualize price volatility and circuit breaker activations over time
4. **Real-Time Notifications**: Browser alerts when panic mode activates

**Sources:**[README.md86-91](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L86-L91)

---

## Quick Reference

### Starting the Application

```
# Install dependencies
cd frontend
npm install

# Start relayer (background)
npm run relay &

# Start dashboard
npm run dev

# Access at http://localhost:3000
```

### Monitoring Checklist

When the dashboard loads, verify connections to:

- ✅ MockOracle on Sepolia (price feed active)
- ✅ AegisSentinel on Reactive (listening for events)
- ✅ AegisHook on Unichain (circuit breaker responsive)
- ✅ AegisGuardianRegistry on Sepolia (reputation data available)

**Sources:**[README.md104-122](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L104-L122)[README.md137-142](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L137-L142)