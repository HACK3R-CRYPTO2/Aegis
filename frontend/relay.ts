import { createPublicClient, createWalletClient, http, defineChain, formatEther, parseAbiItem } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { DEPLOYED_ADDRESSES } from './src/lib/addresses'
import { MOCK_ORACLE_ABI, AEGIS_HOOK_ABI, AEGIS_GUARDIAN_REGISTRY_ABI } from './src/lib/abis'

// Chain Configs
const sepolia = defineChain({
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_SEPOLIA_RPC || 'https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX'] } },
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

console.log("🚀 Aegis Hybrid Relayer Service Started (Agentic Mode)")
console.log(`👁️ Watching Oracle at ${DEPLOYED_ADDRESSES.MOCK_ORACLE} on Sepolia...`)
console.log(`🛡️  Guarding Hook at ${DEPLOYED_ADDRESSES.AEGIS_HOOK} on Unichain...`)

// State to avoid duplicate processing
let lastProcessedBlock = 0n

async function checkAndRelay() {
    try {
        const currentBlock = await sepoliaClient.getBlockNumber()
        if (lastProcessedBlock === 0n) lastProcessedBlock = currentBlock - 100n // Start slightly back

        if (currentBlock <= lastProcessedBlock) return

        // 1. Get Price Updates
        const logs = await sepoliaClient.getLogs({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            event: parseAbiItem('event PriceUpdate(uint256 indexed newPrice, uint256 timestamp, address indexed updater)'),
            fromBlock: lastProcessedBlock + 1n,
            toBlock: currentBlock
        })

        if (logs.length > 0) {
            console.log(`\n📨 Found ${logs.length} new Price Updates!`)
            lastProcessedBlock = currentBlock
        }

        // Process recent logs
        for (const log of logs) {
            const price = log.args.newPrice!
            const updater = log.args.updater!
            const ethPrice = Number(formatEther(price)).toFixed(0)

            console.log(`   -> Price: $${ethPrice} | Updater: ${updater}`)

            // Check Panic Mode
            const currentPanic = await unichainPublic.readContract({
                address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
                abi: AEGIS_HOOK_ABI,
                functionName: 'panicMode'
            })

            // CRASH LOGIC
            if (Number(ethPrice) < 1500 && !currentPanic) {
                console.log("🚨 CRASH DETECTED! Enabling Panic Mode...")
                const hash = await unichainWallet.writeContract({
                    address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
                    abi: AEGIS_HOOK_ABI,
                    functionName: 'setPanicMode',
                    args: [true]
                })
                console.log(`✅ Panic Mode ENABLED! Tx: ${hash}`)
            }
            // STABILIZE LOGIC (The Agentic Part)
            else if (Number(ethPrice) >= 1500 && currentPanic) {
                console.log(`✅ Market Stabilized by ${updater}. Disabling Panic Mode...`)

                // 1. Disable Panic
                const hash1 = await unichainWallet.writeContract({
                    address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
                    abi: AEGIS_HOOK_ABI,
                    functionName: 'setPanicMode',
                    args: [false]
                })
                console.log(`🟢 Panic Mode DISABLED! Tx: ${hash1}`)

                console.log("⏳ Waiting for confirmation...")
                await unichainPublic.waitForTransactionReceipt({ hash: hash1 })

                // 2. Award Reputation (If Agent Registered)
                const agentId = await unichainPublic.readContract({
                    address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
                    abi: AEGIS_GUARDIAN_REGISTRY_ABI,
                    functionName: 'getAgentId',
                    args: [updater]
                })

                if (agentId > 0n) {
                    console.log(`🏆 Awarding Reputation to Agent #${agentId}...`)
                    const hash2 = await unichainWallet.writeContract({
                        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
                        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
                        functionName: 'giveFeedback',
                        args: [
                            agentId,
                            2000n * 10n ** 18n, // Value (Stabilized Volume Mock)
                            18,
                            "stabilized_volume",
                            "heroic_save",
                            "sepolia_oracle",
                            "ipfs://proof",
                            "0x0000000000000000000000000000000000000000000000000000000000000000"
                        ]
                    })
                    console.log(`🌟 Reputation Awarded! Tx: ${hash2}`)
                } else {
                    console.log("⚠️ Updater is not a registered Guardian. No reputation awarded.")
                }
            }
        }

    } catch (e) {
        console.error("⚠️ polling error:", e)
    }
}

// Poll every 3 seconds
setInterval(checkAndRelay, 3000)
checkAndRelay()
