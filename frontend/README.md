# 🎨 Aegis Prime: Tactical Command Center (HUD)

```text
      _      _____  ____ ___ ____    ____  ____  ___ __  __ _____ 
     / \    | ____|/ ___|_ _/ ___|  |  _ \|  _ \|_ _|  \/  | ____|
    / _ \   |  _| | |  _ | |\___ \  | |_) | |_) || || |\/| |  _|  
   / ___ \  | |___| |_| || | ___) | |  __/|  _ < | || |  | | |___ 
  /_/   \_\ |_____|\____|___|____/  |_|   |_| \_\___|_|  |_|_____|
```

The Command Center is a high-performance, **Tactical Radar Interface** designed for the Aegis Prime Protocol. It provides Liquidity Providers with institutional-grade observability and immediate security intelligence.

---

## 🏗️ Technical Architecture (The HUD)

### 1. Sub-second Signal Processing
The HUD is engineered for **Zero-Latency Intelligence**. It provides a real-time window into the cross-chain battlefield:
*   **Adaptive Divergence Meter**: A high-fidelity visual radar tracking the BP (Basis Point) gap between the L1 Global Fair Price and the L2 Pool Price.
*   **Shield Status Cockpit**: Immediate visual confirmation of the **Equilibrium Shield** state (STANDBY, ARMED, or ACTIVE).
*   **Unified PriceContext**: A centralized React state engine that synchronizes the Header, Meter, and Trading Terminal, ensuring the entire HUD is a single, cohesive source of truth.

### 2. High-Fidelity Reactive Stack
*   **Engine**: Next.js 14+ (App Router) for sub-pixel rendering.
*   **Web3 Connectivity**: `wagmi` + `viem` optimized for high-frequency multicall polling from Unichain and Sepolia.
*   **Tactical Motion**: `framer-motion` for hardware-accelerated transitions during security state shifts.
*   **Aesthetics**: Senior-grade Glassmorphism. The interface is designed to feel like a premium, high-stakes military HUD.

---

## 🛰️ Dashboard Core Modules

### 📍 Reactive Components
*   **`PriceContext`**: The heart of the HUD. Manages global price truth and triggers instantaneous, synchronized updates across all UI segments.
*   **`TradingView`**: The high-stakes execution terminal. Dynamically inherits security taxes from the Aegis Hook during market stress.
*   **`NetworkMonitor`**: Low-level operational logs reflecting the autonomous strikes fired by the Reactive Network.
*   **`OracleSim`**: The on-chain simulator that allows for stress-testing the protocol's recovery and protection tiers.

### 📍 Addresses (Sync)
| Component | Chain | Address |
| :--- | :--- | :--- |
| **AegisHook** | Unichain Sepolia | `0xc9d1fed83361fa922d5d479071d2957029ca8080` |
| **MockOracle** | Ethereum Sepolia | `0xe7e31164b5b50a107dbab71de6edde5b7cb96c0d` |
| **AegisSentinel**| Reactive Network | `0x0f764437ffbe1fcd0d0d276a164610422710b482` |

---

## 📦 Deployment Commands

### 🚀 Booting the Command Center
1.  **Install Base**: `npm install`
2.  **Launch Radar**: `npm run dev`
3.  **Activate Sentinel Relayer**: `npm run relay` (Requires `PRIVATE_KEY` for autonomous sync).

---
© 2026 Aegis Prime Protocol | Hardened by Senior Engineering
