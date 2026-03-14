# 🛡️ Aegis Prime Protocol Architecture (Contracts)

```text
    ____  ____   ___ __  __ _____ 
   |  _ \|  _ \ |_ _|  \/  | ____|
   | |_) | |_) | | || |\/| |  _|  
   |  __/|  _ <  | || |  | | |___ 
   |_|   |_| \_\___|_|  |_|_____|
```

The Aegis Prime protocol is a production-hardened suite of smart contracts designed for secure, autonomous liquidity protection on **Unichain Sepolia**. At its heart lies the **AegisHook**, a specialized Uniswap v4 extension that manages the safety lifecycle of the pool.

---

## 🏛️ Integrated Architecture

### 1. The Shield: Uniswap v4 Execution Layer (`AegisHook.sol`)
The `AegisHook` is an advanced Uniswap v4 extension that manages the safety lifecycle of a liquidity pool.
*   **Dynamic Economic Defense**: Instead of halting trading, the hook applies a **99.9% Dynamic Security Tax** during price divergence. This redirects toxic arbitrage value back into the protocol, protecting LPs without breaking AMM functionality.
*   **Hook Lifecycle**: It registers for `beforeSwap`. When a user initiates a swap, the hook checks the **Reactive Sentinel** status to determine the dynamic fee tier.
*   **Transient Storage & Locks**: The protocol leverages Uniswap v4’s **Lock/Unlock mechanism**, ensuring all asset transfers are validated within a single atomic transaction.

### 2. The Brain: Reactive Sentinel (`AegisSentinel.sol`)
The Sentinel is the **Decentralized Watchman** of the protocol, residing on the **Reactive Network**.
*   **Decentralized Truth**: It monitors the L1 `MockOracle` on Ethereum Sepolia.
*   **Cross-Chain Autonomy**: The Sentinel fires a bridge-less, autonomous callback directly to the Unichain Hook using the Reactive Network's event-driven automation.

---

## 🛠️ Engineering Decision Log
*   **Decision**: Use **Custom Errors** instead of string reverts.
*   **Rationale**: Reduces contract byte-code size and gas consumption, while providing clearer debugging paths for frontend integrators.
*   **Decision**: Implement **Internal Gap Calculation**.
*   **Rationale**: The hook calculates the divergence locally between the L1 state and L2 pool price to ensure the tax is always proportional to the real-world arbitrage opportunity.

---

## 📍 Protocol Manifest

### 🌐 Unichain Sepolia (Chain ID: 1301)
| Component | Address |
| :--- | :--- |
| **AegisHook (V4)** | `0xc9d1fed83361fa922d5d479071d2957029ca8080` |
| **PoolManager (v4)** | `0x00B036B58a818B1BC34d502D3fE730Db729e62AC` |

### 🌐 Ethereum Sepolia (L1 Reference)
| Component | Address |
| :--- | :--- |
| **MockOracle** | `0xe7e31164b5b50a107dbab71de6edde5b7cb96c0d` |

### 🌐 Reactive Network (Lasna) (Chain ID: 5318007)
| Component | Address |
| :--- | :--- |
| **AegisSentinel** | `0x0f764437ffbe1fcd0d0d276a164610422710b482` |

---
© 2026 Aegis Protocol | Hardened by Senior Engineering
