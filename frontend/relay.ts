import { createPublicClient, createWalletClient, http, defineChain, formatEther, parseAbiItem } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { DEPLOYED_ADDRESSES } from './src/lib/addresses'
import { MOCK_ORACLE_ABI, AEGIS_HOOK_ABI, AEGIS_GUARDIAN_REGISTRY_ABI } from './src/lib/abis'

// Chain Configs
const sepolia = defineChain({
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_SEPOLIA_RPC || 'https://ethereum-sepolia-rpc.publicnode.com'] } },
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

// --- Senior Production Configuration ---
const POLLING_INTERVAL = 3000;
const MAX_BLOCK_RANGE = 100; // Adaptive fallback
const START_OFFSET = 50n;
let lastProcessedBlock = 0n;
let isRelaying = false;
let currentPanicState: boolean | null = null;

async function checkAndRelay() {
    if (isRelaying) return;
    isRelaying = true;

    try {
        const currentBlock = await sepoliaClient.getBlockNumber();
        if (lastProcessedBlock === 0n) {
            lastProcessedBlock = currentBlock - START_OFFSET;
        }

        if (currentBlock <= lastProcessedBlock) return;

        const toBlock = currentBlock > lastProcessedBlock + BigInt(MAX_BLOCK_RANGE) 
            ? lastProcessedBlock + BigInt(MAX_BLOCK_RANGE) 
            : currentBlock;

        console.log(`🔍 Polling Sepolia range: [${lastProcessedBlock + 1n} - ${toBlock}]`);

        const logs = await sepoliaClient.getLogs({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            event: parseAbiItem('event PriceUpdate(uint256 indexed newPrice, uint256 timestamp, address indexed updater)'),
            fromBlock: lastProcessedBlock + 1n,
            toBlock: toBlock
        });

        if (logs.length > 0) {
            console.log(`\n📨 Found ${logs.length} new Price Updates!`);
            
            if (currentPanicState === null) {
                currentPanicState = await unichainPublic.readContract({
                    address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
                    abi: AEGIS_HOOK_ABI,
                    functionName: 'panicMode'
                });
            }

            for (const log of logs) {
                const { newPrice, updater } = (log as any).args;
                const ethPrice = formatEther(newPrice);
                const ethPriceFixed = Number(ethPrice).toFixed(0);

                console.log(`   -> Signal: $${ethPriceFixed} | Source: ${updater}`);

                if (Number(ethPriceFixed) < 1500 && !currentPanicState) {
                    console.warn("🚨 THRESHOLD BREACHED: Activating Aegis Circuit Breaker...");
                    currentPanicState = true; 
                    await _triggerPanic(true);
                } 
                else if (Number(ethPriceFixed) >= 1500 && currentPanicState) {
                    console.info("✅ MARKET STABILIZED: Restoring Liquidity Flows...");
                    currentPanicState = false;
                    await _triggerPanic(false);
                    await _awardReputation(updater as `0x${string}`);
                }
            }
        }

        lastProcessedBlock = toBlock;

    } catch (e: any) {
        process.stdout.write("⚠️");
        if (e.message.includes("429") || e.message.includes("fetch")) {
            // Transient error
        } else {
            console.error("\n❌ Critical Relay Error:", e.message);
        }
    } finally {
        isRelaying = false;
    }
}

// --- Internal Workflows ---

async function _triggerPanic(status: boolean) {
    try {
        const hash = await unichainWallet.writeContract({
            address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
            abi: AEGIS_HOOK_ABI,
            functionName: 'setPanicMode',
            args: [status]
        });
        console.log(`🛡️  Action Confirmed: ${status ? 'PANIC' : 'NORMAL'} | Tx: ${hash}`);
    } catch (e: any) {
        console.error("❌ Failed to update Hook status:", e.shortMessage || e.message);
    }
}

async function _awardReputation(agent: `0x${string}`) {
    try {
        const agentId = await unichainPublic.readContract({
            address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
            abi: AEGIS_GUARDIAN_REGISTRY_ABI,
            functionName: 'getAgentId',
            args: [agent]
        });

        if (agentId > 0n) {
            console.info(`🏆 Reward: Boosting Reputation for Agent #${agentId}`);
            const hash = await unichainWallet.writeContract({
                address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
                abi: AEGIS_GUARDIAN_REGISTRY_ABI,
                functionName: 'giveFeedback',
                args: [agentId, 1000n * 10n**18n, 18, "stabilized_volume", "heroic_save", "", "", "0x0000000000000000000000000000000000000000000000000000000000000000"]
            });
            console.log(`🌟 Rewards Dispatched: ${hash}`);
        }
    } catch (e: any) {
        console.error("⚠️ Reputation award failed:", e.message);
    }
}

// Initialization Loop
setInterval(checkAndRelay, POLLING_INTERVAL);
checkAndRelay();
