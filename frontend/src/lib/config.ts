import { http, createConfig } from 'wagmi'
export { sepolia } from 'wagmi/chains'
import { sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'

export const unichainSepolia = defineChain({
    id: 1301,
    name: 'Unichain Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://unichain-sepolia-rpc.publicnode.com'] },
    },
    blockExplorers: {
        default: { name: 'Uniscan', url: 'https://sepolia.uniscan.xyz' },
    },
    testnet: true,
})

export const reactiveLasna = defineChain({
    id: 5318007,
    name: 'Reactive Lasna',
    nativeCurrency: {
        decimals: 18,
        name: 'Reactive',
        symbol: 'REACT',
    },
    rpcUrls: {
        default: { http: ['https://lasna-rpc.rnk.dev/'] },
    },
    testnet: true,
})

export const config = createConfig({
    chains: [sepolia, unichainSepolia, reactiveLasna],
    transports: {
        [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX"),
        [unichainSepolia.id]: http("https://unichain-sepolia-rpc.publicnode.com"),
        [reactiveLasna.id]: http("https://lasna-rpc.rnk.dev/"),
    },
    ssr: true,
})
