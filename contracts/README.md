# 🎯 The Aegis Fortress: Core Protocol Artifacts

```text
    ____  ____   ___ __  __ _____ 
   |  _ \|  _ \ |_ _|  \/  | ____|
   | |_) | |_) | | || |\/| |  _|  
   |  __/|  _ <  | || |  | | |___ 
   |_|   |_| \_\___|_|  |_|_____|
```

The Aegis Prime protocol is a suite of **High-Fidelity Smart Contracts** engineered specifically for the Uniswap v4 ecosystem. It isn't just a liquidity pool; it's a **Hardened Logic Layer** that autonomously defends capital against toxic arbitrage flow.

---

## 🏛️ Tactical Core Architecture

### 1. The Kinetic Shield (`AegisHook.sol`)
The `AegisHook` is an advanced Uniswap v4 extension that serves as the pool's execution-layer security. 
*   **Dynamic Security Tiers**: The hook detects market divergence between the Global Fair Price (Ref) and the Unichain Pool Price. It applies a **99.9% Dynamic Security Tax** instantly during armed states.
*   **Margin Redirection**: We don't settle for "Pausing" trades. Instead, we capture the arbitrageur's potential profit and redirect it back to the LPs, economically disincentivizing toxic flow while maintaining AMM uptime.
*   **Atomic Safety Locks**: Leveraging Uniswap v4’s transient storage and lock/unlock mechanism to ensure all security overrides are enforced with sub-gas unit efficiency.

### 2. The Autonomous Sentinel (`AegisSentinel.sol`)
The Sentinel is the **Cross-Chain Nervous System** of the protocol, residing on the **Reactive Network**.
*   **Surveillance Logic**: It subscribes to the sub-second event pulse of the Ethereum Sepolia `MockOracle`.
*   **Strike Logic**: Upon detecting a high-volatility event (Drift, Steep, or Crash), it fires a bridge-less cross-chain callback directly to the Unichain `AegisHook`.

---

## 🛠️ Senior Engineering Decisions

*   **Decision**: Dynamic Fee Overrides (99.9%) instead of Reverts.
    *   **Rationale**: Protecting LVR (Loss Versus Rebalancing) requires capturing the margin, not just blocking it. By using a tax, we force toxic flow to sponsor the LP's safety.
*   **Decision**: Local Divergence Logic.
    *   **Rationale**: The hook calculates the BP (Basis Point) gap internally between the L1 pulse and the L2 reality, ensuring the protection is always proportional to the real-world threat level.
*   **Decision**: High-Performance Transient Storage.
    *   **Rationale**: We minimize state-bloat by utilizing Uniswap v4's execution hooks effectively, ensuring the "Shield" is light but indestructible.

---

## 🛰️ Tactical Manifest (Operational)

### 🌐 Unichain Sepolia
*   **AegisHook (Uniswap v4)**: `0xc9d1fed83361fa922d5d479071d2957029ca8080`
*   **PoolManager**: `0x00B036B58a818B1BC34d502D3fE730Db729e62AC`

### 🌐 Ethereum Sepolia
*   **MockOracle (Price Source)**: `0xe7e31164b5b50a107dbab71de6edde5b7cb96c0d`

### 🌐 Reactive Network (Lasna)
*   **AegisSentinel (Oracle Target)**: `0x0f764437ffbe1fcd0d0d276a164610422710b482`

---
© 2026 Aegis Prime Protocol | Engineered for the Combat Horizon
