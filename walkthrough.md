# Aegis System Walkthrough
**Status**: 🟢 Deployed & Operational
**Standards**: Senior Refactor (Production Ready)

## 🏗️ Architecture & Deployments
The Aegis system is a Reactive Circuit Breaker protecting liquidity across 3 chains.

| Component | Network | Address | Role |
| :--- | :--- | :--- | :--- |
| **MockOracle** | **Sepolia (L1)** | `0x1392C38921A818cEdb100cC3767e8f30deC3a7D8` | Price Feed Sim. |
| **AegisHook** | **Unichain** | `0x1E2aE114cF3B63779A1367eD704ccA51a0218080` | Uniswap v4 Hook. |
| **GuardianRegistry** | **Unichain** | `0xaDdf307296EFC3720D3e38E72d2A417327161cDb` | ERC-8004 Registry. |
| **AegisSentinel**| **Lasna** | `0x0B6ae13119Fc3b61d6ABb115342A1A075e14b6B6` | Event-Driven Controller. |

## 🛡️ Senior Refactor Highlights
### 1. Scalability Fix (Registry)
- **Problem**: O(n) loop over feedback history.
- **Fix**: Implemented O(1) **Incremental Volume Tracking**. Caches total volume in a mapping during each `giveFeedback` call.

### 2. Gas Optimization (Hook & Sentinel)
- **V4 Standards**: Integrated official Uniswap v4 dynamic fee flags (`0x800000`).
- **Topic Caching**: Pre-calculated event signatures stored as `constant` to save thousands in gas during cross-chain reactions.
- **Clean Architecture**: Refactored logic into internal helpers, reducing bytecode and increasing readability.

### 3. Resiliency
- **Adaptive Relayer**: Hybrid relayer now handles RPC block limits and includes robust retry logic.
- **Hardened UI**: Fixed dependency issues (`lucide-react`, `wagmi`) and optimized for Next.js 16/React 19.

## ✅ Verification Demo
1. **Crash**: Set price < $1500 on Sepolia. Sentinel triggers `panicMode` on Unichain.
2. **Halt**: Trading on Hook is instantly gated. Dashboard flips to Red.
3. **Recovery**: Set price > $1500. System restores and awards **Reputation** to the stabilizing agent.

---
© 2026 Aegis Protocol | Hardened by Senior Engineering
