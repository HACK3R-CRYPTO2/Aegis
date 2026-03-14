# 🎨 Tactical Command Center (Frontend)

```text
      _      _____  ____ ___ ____    ____  ____  ___ __  __ _____ 
     / \    | ____|/ ___|_ _/ ___|  |  _ \|  _ \|_ _|  \/  | ____|
    / _ \   |  _| | |  _ | |\___ \  | |_) | |_) || || |\/| |  _|  
   / ___ \  | |___| |_| || | ___) | |  __/|  _ < | || |  | | |___ 
  /_/   \_\ |_____|\____|___|____/  |_|   |_| \_\___|_|  |_|_____|
```

The Command Center is a high-performance, glassmorphic dashboard designed for Aegis Prime. It provides liquidity providers with real-time **Tactical Intelligence** and an autonomous interface for pool defense.

---

## 🏗️ Technical Architecture

### 1. High-Density Observability
The HUD is engineered to surface critical security metrics with sub-second latency:
*   **Adaptive Divergence Meter**: Real-time visual tracking of the Basis Point (BP) gap between L1 Global Fair Price and L2 Pool Price.
*   **Shield Status HUD**: Live feed showing the real-time protection state of the Equilibrium Shield.
*   **Equilibrium Terminal**: A specialized swap engine that dynamically overrides swap estimates with the protocol's **Security Tax** during armed states.

### 2. High-Performance Web3 Stack
*   **Framework**: Next.js 14+ (App Router).
*   **State & Data**: `wagmi` + `viem` for robust contract interactions and multicall-optimized polling.
*   **Motion**: `framer-motion` for fluid, high-frame-rate transitions between security states.
*   **Styling**: Custom CSS tokens with sub-pixel glassmorphic effects for a premium, institutional feel.

---

## 🛰️ Component Manifest

### 📍 Core Modules
*   **`usePricePulse`**: The real-time data engine that aggregates cross-chain prices and security states.
*   **`TradingView`**: The swap interface that dynamically responds to the Equilibrium Shield's tax logic.
*   **`NetworkMonitor`**: A low-level system log reflecting raw events from Sepolia, Reactive, and Unichain.

### 📍 Addresses (Sync)
| Component | Chain | Address |
| :--- | :--- | :--- |
| **AegisHook** | Unichain Sepolia | `0xc9d1fed83361fa922d5d479071d2957029ca8080` |
| **MockOracle** | Ethereum Sepolia | `0xe7e31164b5b50a107dbab71de6edde5b7cb96c0d` |
| **AegisSentinel**| Reactive Network | `0x0f764437ffbe1fcd0d0d276a164610422710b482` |

---

## 📦 Getting Started

### 🏁 Prerequisites
*   Node.js 18+
*   NPM or PNPM

### 🚀 Running the HUD
1.  **Install**: `npm install`
2.  **Start Dev Server**: `npm run dev`
3.  **Deploy Sentinel Relayer**: `npm run relay` (Ensure `PRIVATE_KEY` is set in `.env.local`).

---
© 2026 Aegis Protocol | Hardened by Senior Engineering
