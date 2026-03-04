# Aegis System Walkthrough

**Status**: 🟢 Deployed & Operational
**Date**: 2026-01-28

## 🏗️ Architecture & Deployments

The Aegis system is successfully deployed across 3 chains, forming a Reactive Circuit Breaker.

| Component | Network | Address | Role |
| :--- | :--- | :--- | :--- |
| **MockOracle** | **Sepolia (L1)** | `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b` | Simulates ETH price. Emits `PriceUpdate`. |
| **AegisHook** | **Unichain Sepolia** | `0xBaa0573e3BE4291b58083e717E9EF5051772C080` | Uniswap v4 Hook. Has `panicMode`. |
| **AegisSentinel**| **Reactive Lasna** | `0x0f764437ffBE1fcd0d0d276a164610422710B482` | Listens to Oracle (L1) -> Calls Hook (L2). |

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

4.  **Reset**:
    - Click **"STABILIZE"** on `OracleSim`.
    - Confirm transaction.
    - System returns to **"SYSTEM NORMAL"**.
