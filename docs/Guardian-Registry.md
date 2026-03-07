# Guardian Registry

## Purpose and Scope

The **Guardian Registry** is a smart contract on **Ethereum Sepolia** (L1) that manages the identities and reputation of "Guardians" — specialized liquidity providers who step in during market crises. It combines **ERC-721** (NFTs) for identity and **ERC-8004** (Trustless Agents) for verifiable reputation tracking.

## Contract Overview

The Registry serves as the source of truth for Guardian reputation.

*   **Identity**: Each Guardian holds a unique NFT (ERC-721).
*   **Reputation**: Actions (interventions) are recorded as immutable "Feedback" events (ERC-8004).
*   **Sync**: Reputation scores are calculated on L1 and synced to L2 to enable VIP access.

## System Integration

The Registry is the destination for cross-chain feedback from L2 and the source for reputation updates.

```mermaid
graph TD
    Hook[AegisHook (L2)] -- "Record Intervention" --> Registry[Guardian Registry (L1)]
    Registry -- "NewFeedback Event" --> Sentinel[AegisSentinel (Reactive)]
    Sentinel -- "Boost Reputation" --> Hook
```

## Core Data Structures

### Guardian Profile (ERC-721)
Minting a Guardian NFT creates a profile. The token ID maps to the Guardian's wallet address.

### Intervention Record (ERC-8004)
When a Guardian saves the day on L2 (Unichain), the `AegisHook` emits a log that is bridged to L1 and recorded in the Registry as **Feedback**.

**Feedback Data:**
*   `guardian`: Address of the helper.
*   `volumeProvided`: Amount of liquidity supplied.
*   `timestamp`: When it happened.
*   `marketCondition`: Crash severity.

## Reputation Logic

Reputation is not just a number; it's a derived metric based on on-chain behavior.

**Scoring Factors:**
1.  **Volume**: More liquidity = higher score.
2.  **Latency**: Faster response during panic = higher score.
3.  **Consistency**: Repeated interventions build trust.

**Tiers:**
*   **VIP (>90)**: Can trade during Panic Mode with minimal fees.
*   **Trusted (70-90)**: Reduced fees.
*   **Standard (<70)**: Standard access.

## Events

### `NewFeedback`
Emitted when a new intervention is recorded.

```solidity
event NewFeedback(address indexed guardian, uint256 volume, uint256 newScore);
```

This event is crucial because the **AegisSentinel** listens for it. When the Sentinel sees `NewFeedback`, it calculates the new reputation score and sends a `boostReputation` message to the `AegisHook` on L2, closing the loop.

## Security

*   **Minting**: Open to all (one profile per address).
*   **Recording**: Restricted. Only authorized bridges or relayer contracts can submit intervention records to prevent reputation farming.
*   **Feedback**: Immutable. Once recorded, an intervention cannot be deleted, ensuring a permanent history of Guardian behavior.