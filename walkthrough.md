# Aegis System Walkthrough

**Status**: 🟢 Deployed & Operational
**Date**: 2026-01-28

## 🏗️ Architecture & Deployments

The Aegis system is successfully deployed across 3 chains, forming a Reactive Circuit Breaker.

| Component | Network | Address | Role |
| :--- | :--- | :--- | :--- |
| **MockOracle** | **Sepolia (L1)** | `0x1392C38921A818cEdb100cC3767e8f30deC3a7D8` | Simulates ETH price. Emits `PriceUpdate`. |
| **AegisHook** | **Unichain Sepolia** | `0x1E2aE114cF3B63779A1367eD704ccA51a0218080` | Uniswap v4 Hook. Has `panicMode`. |
| **AegisGuardianRegistry** | **Unichain Sepolia** | `0xaDdf307296EFC3720D3e38E72d2A417327161cDb` | ERC-8004 Registry + ERC-721 Identity. |
| **AegisSentinel**| **Reactive Lasna** | `0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6` | Listens to Oracle (L1) -> Calls Hook (L2). |

### Configuration Status
- [x] **Subscription**: Sentinel is subscribed to `MockOracle` events on Sepolia (ID: 11155111).
- [x] **Permissions**: Hook has `setSentinel` configured to trust calls from the Reactive Sentinel.

---

## 🖥️ Frontend Dashboard

The Next.js dashboard is running at `http://localhost:3000`.

### Key Features Implemented
1.  **StatusCard**: Real-time monitoring of `AegisHook.panicMode()` on Unichain. Visualizes system state (Normal vs Panic).
2.  **OracleSim**: Allows you to act as the market.
    - **Crash**: Sets price to $1000 (< Threshold).
    - **Stabilize**: Sets price to $2000 (> Threshold).
3.  **TradingView**: A mock Swap UI that is **disabled** when the Circuit Breaker is active.

## ✅ Verification Steps (Demo Flow)

> **⚠️ Prerequisites**:
> Open a NEW terminal and run the Relayer Service (bridges Lasna -> Unichain):
> ```bash
> cd frontend
> npm run relay
> ```
> Keep this running!

Use this flow to demonstrate the project:

1.  **Initial State**:
    - Dashboard shows **"SYSTEM NORMAL"** (Green).
    - Swap UI is **Active**.
    - Oracle Price is **~$2000**.

2.  **Trigger Event**:
    - Click **"CRASH MARKET"** on `OracleSim`.
    - Confirm transaction on Sepolia.

3.  **Observation**:
    - **Watch the 'Network Monitor'**: You will see it type `"CRASH DETECTED"`.
    - **StatusCard** will flip to **"PANIC MODE ACTIVE"** (Red/Pulsing).
    - **TradingView** will show a "TRADING HALTED" overlay.

3.  **Reset**:
    - Click **"STABILIZE"** on `OracleSim`.
    - Confirm transaction.
    - System returns to **"SYSTEM NORMAL"**.

4.  **Agentic Defense (New!)**:
    - Scroll to the **Guardian Reputation** dashboard.
    - **Mint ID**: Type a name (e.g. `DefenderOne`) and click **"Mint"**.
    - **Observe**: You now have a unique Agent ID and a "ROOKIE AGENT" badge.
    - **Note**: In a real scenario, the Sentinel boosts your reputation after a successful intervention, upgrading you to **"VIP GUARDIAN"**.
