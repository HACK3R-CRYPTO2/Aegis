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
    const [l1Price, setL1Price] = useState<number>(2000);
    const [l2Price, setL2Price] = useState<number>(0);
    const [isArmed, setIsArmed] = useState<boolean>(false);
    const [divergence, setDivergence] = useState<number>(0);

    // ... (keep poolId logic same) ...
    // [Keep lines 22-75 as they are, but I'll replace the block for clarity]
    const poolIdHooked = keccak256(
        encodeAbiParameters(
            parseAbiParameters('address, address, uint24, int24, address'),
            [POOL_CONFIG.currency0, POOL_CONFIG.currency1, POOL_CONFIG.fee, POOL_CONFIG.tickSpacing, POOL_CONFIG.hooks]
        )
    );

    const poolIdUnhooked = keccak256(
        encodeAbiParameters(
            parseAbiParameters('address, address, uint24, int24, address'),
            [POOL_CONFIG.currency0, POOL_CONFIG.currency1, POOL_CONFIG.fee, POOL_CONFIG.tickSpacing, "0x0000000000000000000000000000000000000000"]
        )
    );

    const { data: oraclePrice } = useReadContract({
        address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
        abi: MOCK_ORACLE_ABI,
        functionName: 'price',
        chainId: CHAINS.SEPOLIA,
        query: { refetchInterval: 3000 }
    });

    const { data: poolDataHooked } = useReadContract({
        address: DEPLOYED_ADDRESSES.POOL_MANAGER as `0x${string}`,
        abi: POOL_MANAGER_ABI,
        functionName: 'getSlot0',
        args: [poolIdHooked as `0x${string}`],
        chainId: CHAINS.UNICHAIN,
        query: { refetchInterval: 2000 }
    });

    const { data: poolDataUnhooked } = useReadContract({
        address: DEPLOYED_ADDRESSES.POOL_MANAGER as `0x${string}`,
        abi: POOL_MANAGER_ABI,
        functionName: 'getSlot0',
        args: [poolIdUnhooked as `0x${string}`],
        chainId: CHAINS.UNICHAIN,
        query: { refetchInterval: 2000 }
    });

    const { data: armedState } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'sentinelArmed',
        chainId: CHAINS.UNICHAIN,
        query: { refetchInterval: 3000 }
    });

    useEffect(() => {
        // Only update from contract if we don't have a fresher local change
        // Or better: update price then allow simulator to override
        if (oraclePrice) {
            const contractPrice = Number(formatEther(oraclePrice));
            // Keep local state if it's already reflecting a change, but sync if contract catches up
            setL1Price(prev => {
                const diff = Math.abs(prev - contractPrice);
                return diff < 1 ? contractPrice : prev;
            });
        }

        const poolData = poolDataHooked || poolDataUnhooked;
        if (poolData && poolData[0] > 0n) {
            const [sqrtPriceX96] = poolData;
            const q96 = 2n ** 96n;
            const priceFactor = Number((sqrtPriceX96 * 1000000n) / q96) / 1000000;
            const calculatedPrice = priceFactor * priceFactor;
            setL2Price(calculatedPrice === 1 ? 2000 : calculatedPrice);
        } else {
            setL2Price(2000);
        }

        if (armedState !== undefined) {
            setIsArmed(armedState as boolean);
        }

        const currentL2 = l2Price || 2000;
        if (l1Price > 0 && currentL2 > 0) {
            // BP Calculation: (abs(L1 - L2) / L1) * 10000
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
        poolId: poolIdHooked,
        setL1Price // Allow simulator to set optimistic price
    };
}
