import { createPublicClient, createWalletClient, http, defineChain, formatEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { DEPLOYED_ADDRESSES } from './src/lib/addresses'
import { MOCK_ORACLE_ABI, AEGIS_HOOK_ABI } from './src/lib/abis'

// Chain Configs
const sepolia = defineChain({
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://ethereum-sepolia.publicnode.com'] } },
})

const unichainSepolia = defineChain({
    id: 1301,
    name: 'Unichain Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://unichain-sepolia-rpc.publicnode.com'] } },
})

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}` || "0x29332143cd080547332727a8f7b2110c16dda3b9a74653b8084e54a24c076478"
const account = privateKeyToAccount(PRIVATE_KEY)

// Clients
const sepoliaClient = createPublicClient({
    chain: sepolia,
    transport: http()
})

const unichainWallet = createWalletClient({
    account,
    chain: unichainSepolia,
    transport: http()
})

const unichainPublic = createPublicClient({
    chain: unichainSepolia,
    transport: http()
})

console.log("🚀 Aegis Hybrid Relayer Service Started")
console.log(`� Watching Oracle at ${DEPLOYED_ADDRESSES.MOCK_ORACLE} on Sepolia...`)
console.log(`🛡️  Guarding Hook at ${DEPLOYED_ADDRESSES.AEGIS_HOOK} on Unichain...`)

/**
 * ARCHITECTURAL NOTE:
 * This 'Hybrid Relayer' is a fallback mechanism for the Hackathon Demo.
 * 
 * Ideally, the Reactive Network (Lasna) would emit cross-chain messages to Unichain directly.
 * However, due to testnet latency/instability, we implemented this direct poller to ensure
 * the circuit breaker logic (Oracle -> Unichain Hook) can be demonstrated reliably.
 * 
 * Logic:
 * 1. Read Price from Sepolia (L1)
 * 2. If Price < Threshold -> Trigger Panic Mode on Unichain (L2)
 */
async function checkAndRelay() {
    try {
        // 1. Check Oracle Price
        const price = await sepoliaClient.readContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'price'
        }) as bigint

        const ethPrice = Number(formatEther(price)).toFixed(0)

        // 2. Check Hook Status
        const currentPanic = await unichainPublic.readContract({
            address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
            abi: AEGIS_HOOK_ABI,
            functionName: 'panicMode'
        }) as boolean

        console.log(`\n📊 Status Update: Price $${ethPrice} | Panic Mode: ${currentPanic ? 'ON' : 'OFF'}`)

        // 3. Logic
        if (Number(ethPrice) < 1500 && !currentPanic) {
            console.log("� CRASH DETECTED! Price < $1500. Enabling Panic Mode...")
            const hash = await unichainWallet.writeContract({
                address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
                abi: AEGIS_HOOK_ABI,
                functionName: 'setPanicMode',
                args: [true]
            })
            console.log(`✅ Panic Mode ENABLED! Tx: ${hash}`)
        }
        else if (Number(ethPrice) >= 1500 && currentPanic) {
            console.log("✅ Market Stabilized. Price > $1500. Disabling Panic Mode...")
            const hash = await unichainWallet.writeContract({
                address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
                abi: AEGIS_HOOK_ABI,
                functionName: 'setPanicMode',
                args: [false]
            })
            console.log(`🟢 Panic Mode DISABLED! Tx: ${hash}`)
        } else {
            console.log("✨ Component Synced. No action needed.")
        }

    } catch (e) {
        console.error("⚠️ polling error:", e)
    }
}

// Poll every 3 seconds
setInterval(checkAndRelay, 3000)
checkAndRelay()
