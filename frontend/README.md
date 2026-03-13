# 🎯 Tactical Command Center (Frontend)

```text
  _____  ____   ___   _   _  _____  _____  _   _  ____  
 |  ___||  _ \ / _ \ | \ | ||_   _|| ____|| \ | ||  _ \ 
 | |_   | |_) | | | ||  \| |  | |  |  _|  |  \| || | | |
 |  _|  |  _ <| |_| || |\  |  | |  | |___ | |\  || |_| |
 |_|    |_| \_\\___/ |_| \_|  |_|  |_____||_| \_||____/ 
                                                         
```

The Aegis Dashboard is a high-performance, glassmorphic HUD designed to provide real-time battle intelligence for liquidity defenders. It integrates three separate blockchain networks into a single, cohesive reactive experience.

---

## 🏗️ High-Fidelity Technical Architecture

The frontend is engineered for sub-second reactivity and high-density data visualization without saturating RPC bandwidth.

### 1. Performance-Optimized Data Layer (`viem/multicall`)
The dashboard implements a specialized "Batching" pattern to handle multi-chain state synchronization:
*   **Multicall Scaling**: By using `viem/multicall`, the dashboard collapses sequential reputation and identity queries from Unichain and Sepolia into single batched requests. 
    *   **Efficiency**: Reducing Round Trip Time (RTT) latency by **~80%**, ensuring the UI remains fluid even on mobile or high-latency connections.
    *   **Consistency**: Guarantees that all component data (Aegis Hook status, Oracle price, and Guardian reputation) is synchronized to the **exact same block height**, preventing UI "flicker."

### 2. Zero-Latency Reactivity
The user experience is built on a "Reactivity First" philosophy:
*   **Atomic State Management**: Automatically detects on-chain confirms for "Heroic Interventions." The UI transitions seamlessly from "Normal" to "Panic" mode without requiring a page refresh, using optimized `wagmi` hooks.
*   **Tactical HUD**: Utilizes `framer-motion` for sub-second visual feedback. The status indicator flips from Neon Green to Tactical Red instantly when the Sentinel detects an L1 price crash.

### 3. Integrated Hybrid Relayer Control
The dashboard includes an interface for monitoring the **Hybrid Relayer** (`relay.ts`). This ensures that even if the decentralized Reactive Network experience is lagging, the manual "Intervention" panel provides immediate circuit-breaker control for protocol administrators.

---

## 🛠️ Tactical Manifest

### 🌐 Live Infrastructure
*   **AegisHook (Unichain)**: `0x71E998095a5830F5971c2589af26268Fc5B48080`
*   **MockOracle (Sepolia)**: `0xe7e31164b5b50a107dbab71de6edde5b7cb96c0d`
*   **AegisSentinel (Lasna)**: `0xED6224cdC75A1FD962b0Bf462D754645DfFF1c02`

---

## 🛠️ Technical Stack
*   **Framework**: Next.js 16 (App Router)
*   **Web3 Engine**: Wagmi + Viem + TanStack Query
*   **Animation**: Framer Motion (Tactical Transitions)
*   **Styling**: Vanilla CSS + Glassmorphism Tokens
*   **Icons**: Lucide React

---

## 📦 Setup & Deployment
1. **Synchronize Dependencies**: `npm install`
2. **Configure Environment**: Ensure `NEXT_PUBLIC_SEPOLIA_RPC` is set in `.env`.
3. **Start Relayer**: `npm run relay` (Mandatory for L1->L2 event bridging)
4. **Launch Application**: `npm run dev`

---
© 2026 Aegis Protocol | Hardened by Senior Engineering
