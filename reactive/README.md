# Aegis Prime: Reactive Surveillance Sentinel 🧠

The **Reactive Sentinel** is the autonomous nervous system of the Aegis protocol. It utilizes the **Reactive Network** to bridge the gap between Ethereum Mainnet (L1) and the Unichain Hook Fortress (L2) with sub-second, bridge-less latency.

## Architecture: The Kinetic Strike

The Sentinel operates as a **Reactive Smart Contract (RSC)**, providing continuous surveillance over market volatility:

1.  **Direct Surveillance**: Subscribes to the `PriceUpdate` event from the **Aegis Mock Oracle** on Sepolia (L1).
2.  **Autonomous Analysis**: High-fidelity monitoring of price divergence. When a breach threshold is crossed, the Reactive VM triggers a kinetic response.
3.  **Defensive Strike**: Fires an autonomous, cross-chain transaction to Unichain to arm the **Equilibrium Shield**, instantly overriding pool fees to protect LPs.

## Implementation: Hardened Logic

The core Sentinel logic is decoupled for maximum performance. The source is located within the protocol's hardened contract workspace:

👉 **[Sentinel Source](../contracts/src/AegisSentinel.sol)**

## Operational Configuration

The Sentinel is tuned for high-frequency responsiveness across the following vectors:
*   **Origin Pulse**: Sepolia (Chain ID `11155111`)
*   **Tactical Destination**: Unichain (Chain ID `1301`)

---
© 2026 Aegis Prime Protocol | Hardened for Performance
