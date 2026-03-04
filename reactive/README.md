# Aegis Reactive Sentinel 🧠

The **Reactive Sentinel** is the "brain" of the Aegis system. It utilizes **Reactive Network** to bridge the gap between Ethereum Mainnet (L1) and Unichain (L2) with sub-second latency.

## Architecture

The Sentinel is a "Reactive Smart Contract" (RSC) that lives on the Reactive Network.

1.  **Listen**: It subscribes to the `PriceUpdate` event from our Oracle contract on **Sepolia**.
2.  **React**: When it detects a price drop > 5% (the "Crash Threshold"), it executes logic off-chain in the ReactVM.
3.  **Act**: It sends a cross-chain transaction to **Unichain** to call `setPanicMode(true)` on the Aegis Hook.

## Implementation

For easier development and testing within a single Foundry workspace, the Solidity code for the Sentinel is located in the `contracts` directory:

👉 **[Contract Source](../contracts/src/AegisSentinel.sol)**

## Configuration

The Sentinel is configured to listen to specific Chain IDs:
*   **Origin**: Sepolia (Chain ID `11155111`)
*   **Destination**: Unichain (Chain ID `1301`)

These can be modified in `contracts/src/AegisSentinel.sol` before deployment.
