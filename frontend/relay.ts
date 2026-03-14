import { createPublicClient, createWalletClient, http, defineChain, formatEther, parseAbiItem } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { DEPLOYED_ADDRESSES } from './src/lib/addresses'
import { MOCK_ORACLE_ABI, AEGIS_HOOK_ABI } from './src/lib/abis'

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

// --- Industrial-Grade Configuration ---
const POLLING_INTERVAL = 3000;
const MAX_BLOCK_RANGE = 100; // Adaptive fallback
const START_OFFSET = 50n;
let lastProcessedBlock = 0n;
let isRelaying = false;
let currentArmedState: boolean | null = null;

async function checkAndRelay() {
    if (isRelaying) return;
    isRelaying = true;

    try {
        const currentBlock = await sepoliaClient.getBlockNumber();
        if (lastProcessedBlock === 0n) {
            lastProcessedBlock = currentBlock - START_OFFSET;
        }

        // 1. Fetch Latest On-Chain Armed State (The Source of Truth)
        const onChainArmed = await unichainPublic.readContract({
            address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
            abi: AEGIS_HOOK_ABI,
            functionName: 'sentinelArmed'
        }) as boolean;

        // 2. Fetch Latest Price from Oracle
        const latestPrice = await sepoliaClient.readContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'price'
        }) as bigint;

        const ethPrice = formatEther(latestPrice);
        const ethPriceNum = Number(ethPrice);
        const targetArmed = ethPriceNum < 1950;

        console.log(`[DEBUG] Price: $${ethPriceNum} | Target: ${targetArmed ? "ARM" : "SECURE"} | On-Chain: ${onChainArmed ? "ARMED" : "STABLE"}`);

        // 3. PERSISTENT SYNC: If On-Chain state != Target State, Fix it!
        if (onChainArmed !== targetArmed) {
            console.warn(`🚨 STATE MISMATCH DETECTED: Rectifying on Unichain...`);
            const success = await _syncEquilibrium(latestPrice, targetArmed);
            if (success) {
                currentArmedState = targetArmed;
            }
        }

        // 4. Log Polling (for historical console output only)
        if (currentBlock > lastProcessedBlock) {
            const toBlock = currentBlock > lastProcessedBlock + BigInt(MAX_BLOCK_RANGE) 
                ? lastProcessedBlock + BigInt(MAX_BLOCK_RANGE) 
                : currentBlock;

            const logs = await sepoliaClient.getLogs({
                address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
                event: parseAbiItem('event PriceUpdate(uint256 indexed newPrice, uint256 timestamp, address indexed updater)'),
                fromBlock: lastProcessedBlock + 1n,
                toBlock: toBlock
            });

            if (logs.length > 0) {
                console.log(`\n📊 Polled ${logs.length} events. Market Status: ${targetArmed ? "⚠️ BREACH" : "✅ STABLE"} ($${ethPriceNum.toFixed(0)})`);
            }
            lastProcessedBlock = toBlock;
        }

    } catch (e: any) {
        process.stdout.write("⚠️");
        const msg = e.message || "";
        if (!msg.includes("429") && !msg.includes("fetch")) {
            console.error("\n❌ Relay Error:", msg);
        }
    } finally {
        isRelaying = false;
    }
}

async function _syncEquilibrium(price: bigint, status: boolean) {
    try {
        // Fetch fresh nonce to avoid "lower than current nonce" errors on Unichain Sepolia
        const nonce = await unichainPublic.getTransactionCount({ 
            address: account.address 
        });

        const hash = await unichainWallet.writeContract({
            address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
            abi: AEGIS_HOOK_ABI,
            functionName: 'setL1Price',
            args: [price, status],
            nonce // Force fresh nonce
        });
        
        console.info(`🛡️  Equilibrium Synced: $${formatEther(price)} | Armed: ${status} | Tx: ${hash}`);
        return true;
    } catch (e: any) {
        const errorMsg = e.shortMessage || e.message;
        console.error("❌ Failed to sync Equilibrium:", errorMsg);
        
        // If it's a nonce error, the next interval will retry with a fresh fetch anyway
        return false;
    }
}

// Initialization Loop
setInterval(checkAndRelay, POLLING_INTERVAL);
checkAndRelay();
