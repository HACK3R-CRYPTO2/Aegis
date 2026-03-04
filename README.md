# Aegis 🛡️

**The First Cross-Chain Circuit Breaker for Uniswap v4 Liquidity.**

> 🏆 **Uniswap Hook Incubator (UHI) Hackathon Entry**
>
> 🎥 **Demo Video**: [Link to Video] (Add later)
> 🔗 **Live Deployment**: [Unichain Sepolia Link] (Add later)

---

## 💡 Inspiration
Liquidity Providers (LPs) on Layer 2s are bleeding money. The problem is **Loss Versus Rebalancing (LVR)**.
When Ethereum Mainnet prices crash, arbitrage bots race to L2s to trade against stale pools before they update. This "toxic flow" costs LPs hundreds of millions annually. We wanted to build a **"Shield"** that uses the speed of **Unichain** to protect LPs from this predation.

## 🚀 What it Does
Aegis is an autonomous security system for your liquidity.
1.  **Watches**: It uses **Reactive Network** to monitor volatility on Ethereum Mainnet 24/7.
2.  **Analyzes**: If it detects a crash (e.g., ETH drops >5% in 5 mins), it triggers a "Panic" signal.
3.  **Protects**: The **Unichain Hook** instantly gates the pool. Swaps are rejected. LPs are safe.
4.  **Resumes**: Once volatility settles, trading re-opens automatically.

## ⚙️ How We Built It
We combined three cutting-edge technologies to make this possible:

### 1. Uniswap v4 Hooks (The Shield)
We built a custom hook (`AegisHook.sol`) that implements a `beforeSwap` gate.
*   **Feature**: `panicMode`. When active, all trades revert.
*   **Why v4?**: Only v4 allows programmatic "pausing" of specific pools without centralization.

### 2. Reactive Network (The Eyes)
We deployed a Reactive Smart Contract (`AegisSentinel.sol`) that listens to cross-chain events.
*   **Integration**: It subscribes to Chainlink Oracle events on Sepolia and triggers a callback on Unichain.
*   **Why Reactive?**: It solves the "Inversion of Control" problem. We don't need to run a python bot server. The contract runs itself.

### 3. Unichain (The Speed)
We deployed on **Unichain Testnet** to leverage **Flashblocks**.
*   **Why Unichain?**: To beat arbitrage bots, we need sub-second 250ms block times. Unichain gives us the speed advantage to "front-run the front-runners."

---

## 🏗️ Architecture
```mermaid
sequenceDiagram
    participant Mainnet as 🔴 Ethereum Mainnet
    participant Sentinel as 🟣 Aegis Sentinel (Reactive)
    participant Hook as 🔵 Aegis Hook (Unichain)
    
    Note over Mainnet: 🚨 CRASH EVENT DETECTED
    Sentinel->>Mainnet: Reads Oracle Data
    Sentinel->>Hook: [Cross-Chain] SET_PANIC(true)
    Note over Hook: 🔒 POOL LOCKED
    participant Bot as 🤖 Arb Bot
    Bot->>Hook: Try to Sell Toxic Flow
    Hook--XBot: REVERT: "Aegis: Pool Paused"
```

## 🛠️ Challenges We Ran Into
*   **Reactive SDK Integration**: The Reactive Network SDK underwent recent changes. We had to dig into the `node_modules` to find the correct import path for `AbstractReactive`.
*   **Cross-Chain Checksums**: Foundry's deployment scripts are extremely strict about address checksums. We generated valid Deployer addresses for Unichain and Reactive, but the compiler rejected them until we applied strict EIP-55 formatting dynamically.
*   **Hook Mining**: Calculating the correct salt to get the `BEFORE_SWAP` flag (0x80...) required writing a custom `HookMiner` script.
*   **Infrastructure Gaps**: Reactive Network is an amazing technology, but public testnet relayers for **Unichain Sepolia** (Chain ID 1301) were not fully stable during the hackathon. 
    *   **The Issue**: The `Sentinel` contract on Reactive Network correctly detected events on Sepolia, but the message sometimes got "stuck" because the public relayer node wasn't forwarding it to Unichain fast enough.
    *   **The Solution**: We built a **Hybrid Relayer** (`relay.ts`) to bridge the gap. It monitors the Oracle directly as a fallback to ensure the demo works seamlessly despite testnet latency.
    *   **Deep Dive**: Read [Why We Built a Custom Relayer](RELAYER_EXPLAINED.md) for the full architectural decision.

## 🔮 What's Next for Aegis
*   **Granular Protection**: Instead of pausing the whole pool, we plan to implement "Dynamic Spreads" (widen fees during volatility).
*   **Real-World Assets**: Protecting Tokenized Real Estate pools from depeg events.

---

##  Documentation
[Contracts README](contracts/README.md): Smart contract setup, deployment, and testing details.

[Frontend README](frontend/README.md): Dashboard setup and feature documentation.

[Reactive README](reactive/README.md): Reactive Network listener usage and configuration.

---

## 💻 Quick Start
```bash
# 2. Test Contracts
git clone https://github.com/ogazboiz/aegis.git
cd aegis/contracts
forge install
forge test

# 3. Run Dashboard (Frontend)
cd ../frontend
npm install

# Start the Relayer (Background)
npm run relay &

# Start the UI
npm run dev
# Open http://localhost:3000
```

## 📜 Deployed & Verified

We proved the logic with **Integration Tests** and a **Live Demo**.

### ✅ Security Verification (Forge)
| Test Case | Scenario | Status |
| :--- | :--- | :--- |
| **Oracle Update** | Updates `MockOracle` price on L1 | ✅ PASS |
| **Access Control** | Confirms only Sentinel can call Hook | ✅ PASS |
| **Panic Trigger** | Triggers `setPanicMode(true)` on L2 | ✅ PASS |
| **Circuit Breaker** | **REVERTS** v4 swaps when Panic is active | ✅ PASS |

See our [Verification Guide](walkthrough.md) for a step-by-step reproduction of the system flow.

| Network | Contract | Address |
| :--- | :--- | :--- |
| **Ethereum Sepolia** | MockOracle | `0x29f8f8d2A00330F9683e73a926F61AE7E91cBA3b` |
| **Unichain Sepolia** | AegisHook | `0xBaa0573e3BE4291b58083e717E9EF5051772C080` |
| **Reactive Lasna** | AegisSentinel | `0x0f764437ffBE1fcd0d0d276a164610422710B482` |

## 👥 Team
*   **Ogazboiz** - Full Stack Developer

---
*Built with ❤️ for the Uniswap Hook Incubator.*
