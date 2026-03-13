# Aegis Prime System Walkthrough
**Status**: 🟢 Deployed & Operational (Production Standard)

## 🏗️ Aegis Prime Architecture
Aegis Prime is an autonomous security engine protecting Unichain pools via the Reactive Network.

| Component | Network | Address | Role |
| :--- | :--- | :--- | :--- |
| **MockOracle** | **Sepolia (L1)** | `0xE7e31164b5B50a107dbaB71de6EDde5B7Cb96c0d` | Price Trigger. |
| **AegisHook** | **Unichain** | `0xc132ff984a4e15b1e2c885092ae73f6a5ad54080` | 99% Dynamic Tax. |
| **AegisSentinel**| **Lasna** | `0xBdE05919CE1ee2E20502327fF74101A8047c37be` | 2-Step Consensus. |

---

## ✅ The "Wow" Verification Test

Follow these steps on the [Aegis Prime Dashboard](http://localhost:3000) to see the autonomous defense in action:

### 1. Market Monitoring
*   **Status**: `SYSTEM ONLINE`.
*   **Consensus**: `0/2 Verified`.
*   **TradingView**: Normal Swaps ($1000 ETH -> $2,000,000 USDC).

### 2. Initial Breach (Simulation)
*   **Action**: Click **"CRASH PRICE"** in the OracleSim.
*   **Observation**: The `StatusCard` flips to **YELLOW**. 
*   **Logic**: The Reactive Sentinel has captured the breach but is awaiting **Secondary Verification** (Consensus: 1/2). Protocol is not yet armed.

### 3. Autonomous Consensus (Verifying)
*   **Action**: Click **"CRASH PRICE"** again or wait for the next feed update.
*   **Observation**: The `StatusCard` turns **Tactical RED**.
*   **Signal**: `AEGIS PRIME ACTIVE`. Consensus is `2/2 Verified`.
*   **NetworkMonitor**: Logs will show "🛡️ Aegis Prime: Consensus verified. Shielding Unichain LPs."

### 4. Dynamic Economic Defense
*   **Action**: Check the `TradingView` now.
*   **HUD**: A red banner appears: **PROTECTION ACTIVE: 99.0% SECURITY TAX**.
*   **Result**: Inputting `1 ETH` now shows a return of only **$20,000 USDC** instead of $2M. 
*   **Proof**: The arbitrage value is being autonomously taxed and redirected. The AMM stays live, but the attacker is disarmed.

### 5. Stabilization & Recovery
*   **Action**: Click **"STABILIZE PRICE"**.
*   **Logic**: Once the Sentinel sees price > $1500 for two cycles, it autonomously clears the tax.
*   **Observe**: The Dashboard returns to Neon Green. flow is restored.

---
© 2026 Aegis Protocol | Hardened by Senior Engineering
