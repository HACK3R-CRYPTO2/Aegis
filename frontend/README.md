# Aegis Dashboard 🖥️

The mission control center for the Aegis Liquidity Defense system.

> **Status**: Connected to Unichain Sepolia, Ethereum Sepolia, and Reactive Lasna.

## 🌟 Key Features

### 1. StatusCard (System Monitor)
Real-time visualization of the Aegis Hook state on Unichain.
-   **Green ("System Normal")**: `panicMode` is `false`. Swaps allowed.
-   **Red ("PANIC MODE")**: `panicMode` is `true`. Swaps paused.

### 2. OracleSim (The Trigger)
A "God Mode" panel to simulate market conditions on Ethereum Sepolia.
-   **CRASH MARKET**: Calls `MockOracle.setPrice(1000)` (Below $1500 threshold). Triggers Reactive event.
-   **STABILIZE**: Calls `MockOracle.setPrice(2000)`. Resets system.

### 3. TradingView (The Mock Swap)
A swap interface for testing protections.
-   **Normal**: Simulates processing.
-   **Panic**: Automatically disabled by the "Circuit Breaker" overlay.

## 🛠️ Configuration

### Contracts
Deployed addresses are managed in `src/lib/addresses.ts`.
-   **AegisHook**: Unichain L2
-   **MockOracle**: Sepolia L1
-   **AegisSentinel**: Reactive Lasna

### Networks
Custom chain definitions (Unichain, Lasna) are in `src/lib/config.ts` using `viem` and `wagmi`.

## 🚀 Running Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start Relayer Service**:
    This bridges the Reactive Network events to Unichain.
    ```bash
    npm run relay
    ```

3.  **Start Dashboard**:
    Open a new terminal:
    ```bash
    npm run dev
    ```

5.  **Open Dashboard**:
    Navigate to [http://localhost:3000](http://localhost:3000).
