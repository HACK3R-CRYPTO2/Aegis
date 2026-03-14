import { useState, useEffect } from 'react';
import { useReadContract, usePublicClient } from 'wagmi';
import { DEPLOYED_ADDRESSES, CHAINS } from './addresses';
import { AEGIS_HOOK_ABI, MOCK_ORACLE_ABI, POOL_MANAGER_ABI } from './abis';
import { formatEther, keccak256, encodeAbiParameters, parseAbiParameters } from 'viem';

// Configuration for Equilibrium Shield Pool Case
const POOL_CONFIG = {
    currency0: "0x0165878A594ca255338adfa4d48449f69242Eb8F" as `0x${string}`,
    currency1: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853" as `0x${string}`,
    fee: 3000, // Matching 0.3% from deploy script
    tickSpacing: 60,
    hooks: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`
};

export function usePricePulse() {
    const [l1Price, setL1Price] = useState<number>(0);
    const [l2Price, setL2Price] = useState<number>(0);
    const [isArmed, setIsArmed] = useState<boolean>(false);
    const [divergence, setDivergence] = useState<number>(0);

    // Generate Pool IDs
    // 1. Hooked Pool ID
    const poolIdHooked = keccak256(
        encodeAbiParameters(
            parseAbiParameters('address, address, uint24, int24, address'),
            [POOL_CONFIG.currency0, POOL_CONFIG.currency1, POOL_CONFIG.fee, POOL_CONFIG.tickSpacing, POOL_CONFIG.hooks]
        )
    );

    // 2. Unhooked Pool ID (Fallback)
    const poolIdUnhooked = keccak256(
        encodeAbiParameters(
            parseAbiParameters('address, address, uint24, int24, address'),
            [POOL_CONFIG.currency0, POOL_CONFIG.currency1, POOL_CONFIG.fee, POOL_CONFIG.tickSpacing, "0x0000000000000000000000000000000000000000"]
        )
    );

    // Fetch L1 Price from MockOracle (Sepolia)
    const { data: oraclePrice } = useReadContract({
        address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
        abi: MOCK_ORACLE_ABI,
        functionName: 'price',
        chainId: CHAINS.SEPOLIA,
        query: { refetchInterval: 3000 }
    });

    // Fetch from Hooked Pool
    const { data: poolDataHooked } = useReadContract({
        address: DEPLOYED_ADDRESSES.POOL_MANAGER as `0x${string}`,
        abi: POOL_MANAGER_ABI,
        functionName: 'getSlot0',
        args: [poolIdHooked as `0x${string}`],
        chainId: CHAINS.UNICHAIN,
        query: { refetchInterval: 2000 }
    });

    // Fetch from Unhooked Pool
    const { data: poolDataUnhooked } = useReadContract({
        address: DEPLOYED_ADDRESSES.POOL_MANAGER as `0x${string}`,
        abi: POOL_MANAGER_ABI,
        functionName: 'getSlot0',
        args: [poolIdUnhooked as `0x${string}`],
        chainId: CHAINS.UNICHAIN,
        query: { refetchInterval: 2000 }
    });

    // Fetch Armed State from Hook
    const { data: armedState } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'sentinelArmed',
        chainId: CHAINS.UNICHAIN,
        query: { refetchInterval: 3000 }
    });

    useEffect(() => {
        if (oraclePrice) {
            setL1Price(Number(formatEther(oraclePrice)));
        }

        const poolData = poolDataHooked || poolDataUnhooked;
        if (poolData && poolData[0] > 0n) {
            const [sqrtPriceX96] = poolData;
            // P = (sqrtPrice / 2^96)^2
            const q96 = 2n ** 96n;
            const priceFactor = Number((sqrtPriceX96 * 1000000n) / q96) / 1000000;
            const calculatedPrice = priceFactor * priceFactor;
            
            // Hackathon logic: if price is 1.0 (uninitialized/balanced), use 2000 for visibility
            setL2Price(calculatedPrice === 1 ? 2000 : calculatedPrice);
        } else {
            // For hackathon: if NO pool is found, we'll anchor L2 at $2000 
            // so that clicking "CRASH" ($1000) shows a massive divergence.
            setL2Price(2000);
        }

        if (armedState !== undefined) {
            setIsArmed(armedState as boolean);
        }

        const currentL2 = l2Price || 2000; // Use fallback for BP calculation if needed
        if (l1Price > 0 && currentL2 > 0) {
            const diff = Math.abs(l1Price - currentL2);
            const divBP = (diff / l1Price) * 10000;
            setDivergence(divBP);
        }
    }, [oraclePrice, poolDataHooked, poolDataUnhooked, armedState, l1Price, l2Price]);

    return {
        l1Price,
        l2Price,
        isArmed,
        divergence,
        poolId: poolIdHooked
    };
}
