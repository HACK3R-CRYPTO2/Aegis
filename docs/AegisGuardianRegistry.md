# AegisGuardianRegistry
Relevant source files
- [README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md)
- [contracts/README.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md)

## Purpose and Scope

The `AegisGuardianRegistry` contract serves as the on-chain identity and reputation system for agents ("guardians") who provide liquidity during market volatility. This contract implements both ERC-721 (for unique guardian NFT profiles) and ERC-8004 (for trustless agent reputation tracking) to create an immutable, verifiable record of heroic interventions in the Aegis ecosystem.

This document covers the registry's dual-standard implementation, reputation mechanics, cross-chain synchronization with the L2 Hook, and the VIP lane system. For information about how the registry integrates with the autonomous watcher that monitors it, see [AegisSentinel](/HACK3R-CRYPTO/Aegis/2.2-aegissentinel). For information about how reputation benefits are enforced on the L2 side, see [AegisHook](/HACK3R-CRYPTO/Aegis/2.3-aegishook).

**Sources:**[README.md24-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L24-L33)[contracts/README.md52-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L52-L58)

## System Position

The `AegisGuardianRegistry` is deployed on **Ethereum Sepolia (L1)** and acts as the permanent source of truth for guardian identities and reputation scores. It sits at the center of a cross-chain feedback loop:

```
Unichain Sepolia (L2)

Reactive Network

Ethereum Sepolia (L1)

mint() Guardian NFT

recordIntervention()
[Cross-Chain]

emit NewFeedback()

boostReputation()
[Cross-Chain]

Check reputation
in beforeSwap()

Provide Liquidity
During Panic

AegisGuardianRegistry
(ERC-721 + ERC-8004)

AegisSentinel
Event Listener

AegisHook
Uniswap v4 Hook

Uniswap v4 Pool

Guardian Agent
```

**Diagram: Cross-Chain Reputation Flow**

The registry receives intervention records from the L2 Hook, emits feedback events that the Sentinel monitors, and enables the Sentinel to boost guardian reputation back on L2 through cross-chain calls.

**Sources:**[README.md56-75](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L56-L75)[contracts/README.md8-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L8-L26)

## Dual Standard Implementation

### ERC-721: Guardian NFT Profiles

The registry implements ERC-721 to provide each guardian with a unique, transferable identity token. When an agent wishes to participate in the Aegis protection system, they mint a Guardian NFT that serves as their permanent profile.
FeatureImplementation**Token Standard**ERC-721 (Non-Fungible Token)**Token ID**Sequential, starting from 1**Metadata**On-chain reputation score, intervention count**Transferability**Standard ERC-721 transfers (reputation moves with NFT)**Purpose**Establishes verifiable on-chain identity for guardians
The NFT pattern ensures that reputation is:

- **Portable**: Can be transferred between wallets
- **Tradeable**: Reputation has market value
- **Verifiable**: Anyone can query a guardian's history
- **Persistent**: Survives across contract upgrades

**Sources:**[README.md28](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L28-L28)[contracts/README.md55](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L55-L55)

### ERC-8004: Trustless Agent Standard

The registry also implements ERC-8004, a standard for recording trustless agent behavior with cryptographically verifiable feedback. This standard enables the recording of "Heroic Interventions" as immutable on-chain attestations.
Standard ComponentPurpose in Aegis**Feedback Submission**`recordIntervention()` called by AegisHook when guardian provides liquidity during panic**Immutable Storage**Each intervention stored with timestamp, volume, response latency**Event Emission**`NewFeedback` events trigger Sentinel to update L2 reputation**Reputation Scoring**Aggregates interventions into numeric reputation (0-100 scale)
```
ERC-8004 Feedback Loop

Guardian provides
liquidity during panic

recordIntervention()
(called by Hook)

Store in interventions
mapping

emit NewFeedback()

AegisSentinel
react() callback

boostReputation()
on L2 Hook
```

**Diagram: ERC-8004 Feedback Mechanism**

**Sources:**[README.md29-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L29-L32)[contracts/README.md54-57](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L54-L57)

## Data Structures and Storage

The registry maintains several key storage mappings to track guardian state:

```
1
1
*
*

AegisGuardianRegistry

+uint256 nextTokenId

+mapping(uint256 => GuardianProfile) : profiles

+mapping(address => uint256) : addressToTokenId

+mapping(uint256 => Intervention[]) : interventions

+mint(address guardian) : uint256

+recordIntervention(uint256 tokenId, uint256 volume, uint256 latency)

+getReputation(uint256 tokenId) : uint256

+getTotalStabilizedVolume(uint256 tokenId) : uint256

GuardianProfile

+uint256 reputationScore

+uint256 totalInterventions

+uint256 totalStabilizedVolume

+uint256 lastInterventionTimestamp

+bool isActive

Intervention

+uint256 timestamp

+uint256 volumeProvided

+uint256 responseLatency

+uint256 marketCondition
```

**Diagram: Registry Data Model**
Storage VariableTypePurpose`profiles``mapping(uint256 => GuardianProfile)`Maps token IDs to guardian profiles containing reputation and stats`addressToTokenId``mapping(address => uint256)`Quick lookup from wallet address to owned guardian token`interventions``mapping(uint256 => Intervention[])`Array of all recorded interventions for each guardian`nextTokenId``uint256`Counter for sequential token ID assignment
**Sources:**[contracts/README.md52-58](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L52-L58)

## Heroic Interventions

A "Heroic Intervention" occurs when a guardian provides liquidity to a Uniswap v4 pool **during panic mode** when the circuit breaker is active. This action stabilizes the pool and protects LPs from loss versus rebalancing (LVR).

### Recording Mechanism

```
"AegisSentinel (Reactive)"
"AegisGuardianRegistry (L1)"
"AegisHook (L2)"
"Uniswap v4 Pool"
"Guardian Agent"
"AegisSentinel (Reactive)"
"AegisGuardianRegistry (L1)"
"AegisHook (L2)"
"Uniswap v4 Pool"
"Guardian Agent"
panicMode = true
Intervention recorded permanently
"addLiquidity() during panic"
"afterAddLiquidity() callback"
"Detect intervention by guardian"
"[Cross-Chain] recordIntervention(tokenId, volume, latency)"
"Store intervention data"
"emit NewFeedback(tokenId, volume)"
```

**Diagram: Heroic Intervention Recording Flow**

### Intervention Metrics

Each recorded intervention captures:
MetricDescriptionUse in Reputation**Volume Provided**Amount of liquidity added during panic (in pool's base token)Higher volume = larger reputation boost**Response Latency**Time between panic activation and guardian's responseLower latency = larger reputation boost**Market Condition**Price deviation at time of interventionMore severe crashes weight heavier**Timestamp**Block timestamp of interventionUsed to calculate time-decayed reputation
**Sources:**[README.md29-30](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L29-L30)[contracts/README.md56](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L56-L56)

## Reputation Scoring Algorithm

The reputation score aggregates intervention history into a single numeric value (0-100 scale) that determines a guardian's trust level and benefits.

### Scoring Factors

```
Reputation Calculation

Weight: 30%

Weight: 40%

Weight: 20%

Weight: 10%

Yes

No

Total Interventions
(Frequency)

Total Stabilized Volume
(Impact)

Average Response Latency
(Speed)

Time Since Last Intervention
(Decay)

Final Reputation Score
(0-100)

Score >= 90?

VIP Lane Access
0.01% fees during panic

Standard Fees
```

**Diagram: Reputation Scoring and VIP Access**

The exact algorithm weights:

- **40%** - Total stabilized volume (demonstrates capital commitment)
- **30%** - Number of successful interventions (demonstrates reliability)
- **20%** - Average response latency (demonstrates speed)
- **10%** - Recency factor (recent activity prevents reputation decay)

**Sources:**[README.md30-31](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L30-L31)

## VIP Lane Mechanism

Guardians who achieve a reputation score above **90** gain access to the "VIP Lane" - a special privilege enforced by the `AegisHook` on L2.

### VIP Benefits
Standard UserVIP Guardian (Rep >= 90)**During Normal Mode:** Standard pool fees (e.g., 0.30%)Standard pool fees**During Panic Mode:** Swaps blocked entirelySwaps allowed with reduced fee (0.01%)
The VIP lane serves two purposes:

1. **Incentivization**: Rewards high-reputation guardians who have proven themselves
2. **Market Stability**: Allows trusted agents to provide stabilizing trades even during panic

### Enforcement on L2

```
"AegisGuardianRegistry
(L1)"
"AegisHook"
"Uniswap v4 Pool"
"VIP Guardian
(Rep >= 90)"
"AegisGuardianRegistry
(L1)"
"AegisHook"
"Uniswap v4 Pool"
"VIP Guardian
(Rep >= 90)"
panicMode = true
alt
[Reputation >= 90]
[Reputation < 90]
"swap()"
"beforeSwap()"
"Check guardian address"
"Lookup cached reputation"
"Allow swap with 0.01% fee"
"Swap successful"
"revert PoolPaused()"
"Transaction reverted"
```

**Diagram: VIP Lane Enforcement in beforeSwap()**

The Hook maintains a **cached reputation mapping** synchronized by the Sentinel to avoid cross-chain reads on every swap. This cache is updated whenever `NewFeedback` events are emitted from the registry.

**Sources:**[README.md31-32](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L31-L32)[contracts/README.md57](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L57-L57)

## Cross-Chain Reputation Synchronization

The reputation system operates across three networks (L1, Reactive, L2), requiring a sophisticated synchronization mechanism.

### Synchronization Flow

```
"AegisSentinel (Reactive)"
"AegisGuardianRegistry (L1)"
"AegisHook (L2)"
"AegisSentinel (Reactive)"
"AegisGuardianRegistry (L1)"
"AegisHook (L2)"
Guardian completes intervention
react() callback triggered
VIP status updated on L2
"[Cross-Chain] recordIntervention()"
"Update profiles[tokenId]"
"Recalculate reputation"
"emit NewFeedback(tokenId, newReputation)"
"Process feedback event"
"if (reputation increased significantly)"
"[Cross-Chain] boostReputation(guardian, newScore)"
"Update cached reputation"
```

**Diagram: Autonomous Reputation Sync via Reactive Network**

### Key Properties
PropertyImplementation**Asynchronous**Reputation updates don't block L2 transactions**Eventually Consistent**L2 cache converges to L1 source of truth**Event-Driven**No polling required; Sentinel reacts to `NewFeedback`**Autonomous**No manual keeper infrastructure needed
**Sources:**[README.md32-33](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L32-L33)[contracts/README.md44](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L44-L44)

## Events and Integration Points

### Key Events

The registry emits events that other contracts subscribe to:

```
// Emitted when a new guardian NFT is minted
event GuardianRegistered(uint256 indexed tokenId, address indexed guardian);

// Emitted when an intervention is recorded (ERC-8004 feedback)
event NewFeedback(uint256 indexed tokenId, uint256 volumeProvided, uint256 newReputation);

// Emitted when reputation score is manually adjusted (governance)
event ReputationUpdated(uint256 indexed tokenId, uint256 oldScore, uint256 newScore);
```

### Integration with AegisSentinel

The Sentinel subscribes to the `NewFeedback` event on L1:
MethodPurpose`subscribe()`Registers the Sentinel to receive `NewFeedback` events from the registry`react()`Callback invoked when `NewFeedback` is emitted; triggers reputation sync to L2
**Sources:**[README.md32](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L32-L32)[contracts/README.md40-45](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L40-L45)

### Integration with AegisHook

The Hook receives cross-chain calls from both the Sentinel and the registry:
MethodCallerPurpose`boostReputation(address guardian, uint256 newScore)`AegisSentinelUpdates cached reputation on L2 after intervention`recordIntervention()` originAegisHook → RegistryHook initiates cross-chain call to record intervention on L1
**Sources:**[contracts/README.md33-38](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L33-L38)

## Gamification and Leaderboard

The registry's design enables future gamification features:

```
Query Functions

Leaderboard Metrics

Total Stabilized Volume

Number of Interventions

Average Response Latency

Current Reputation Score

Consecutive Successful Interventions

getTotalStabilizedVolume(tokenId)

getInterventionCount(tokenId)

getAverageLatency(tokenId)

getReputation(tokenId)

getStreak(tokenId)

Frontend Dashboard
Leaderboard Display
```

**Diagram: Leaderboard Query Architecture**

The registry exposes read-only functions that the frontend dashboard can query to display:

- Top guardians by total volume stabilized
- Fastest responders (lowest average latency)
- Most reliable guardians (highest intervention count)
- Current VIP members (reputation >= 90)

**Sources:**[README.md87-89](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L87-L89)

## Access Control and Security

### Role-Based Permissions
FunctionAllowed CallerEnforcement`mint()`Any address (public)No restriction; anyone can become a guardian`recordIntervention()`AegisHook only`require(msg.sender == authorizedHook)``updateReputation()`Governance/Admin`onlyOwner` modifier`setAuthorizedHook()`Contract owner`onlyOwner` modifier during deployment
### Cross-Chain Call Validation

When the registry receives cross-chain calls from L2 (via the Hook), it must verify the message originated from the authorized `AegisHook` contract. This prevents malicious actors from submitting fake interventions.

**Sources:**[contracts/README.md92-94](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L92-L94)

## Deployment Details

The registry is deployed on **Ethereum Sepolia (L1)** at the following address:
NetworkChain IDRegistry AddressEthereum Sepolia11155111*(See deployment logs)*
The deployment script must configure the authorized Hook address before the system becomes operational. This is typically done in the `04_DeployOracle.s.sol` or a dedicated registry deployment script.

**Sources:**[contracts/README.md99-104](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/README.md#L99-L104)[README.md138-143](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L138-L143)

## Future Enhancements

Planned improvements to the Guardian Registry system include:
EnhancementDescriptionStatus**NFT Metadata**On-chain SVG generation displaying reputation visuallyPlanned**Reputation Decay**Automatic score reduction for inactive guardiansPlanned**Penalty System**Reputation deduction for failed interventionsPlanned**Multi-Pool Support**Track interventions across multiple protected poolsPlanned**Delegation**Allow guardians to delegate their NFT to automated agentsPlanned
**Sources:**[README.md86-91](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/README.md#L86-L91)