'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { MOCK_ORACLE_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { sepolia } from '../lib/config'
import { TrendingDown, TrendingUp, Activity } from 'lucide-react'
import { formatEther } from 'viem'
import { useEffect } from 'react'

export function OracleSim() {
    const { data: price, refetch } = useReadContract({
        address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
        abi: MOCK_ORACLE_ABI,
        functionName: 'price',
        chainId: sepolia.id,
        query: { refetchInterval: 2000 }
    })

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    useEffect(() => {
        if (isSuccess) refetch()
    }, [isSuccess, refetch])

    const handleCrash = () => {
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            args: [1000n * 10n ** 18n], // 1000 ETH price (Crash)
            chainId: sepolia.id
        })
    }

    const handleStabilize = () => {
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            args: [2000n * 10n ** 18n], // 2000 ETH price (Normal)
            chainId: sepolia.id
        })
    }

    const currentPrice = price ? Number(formatEther(price)).toFixed(0) : "..."

    return (
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-purple-400">
                <Activity className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase tracking-wider">Oracle Simulation (L1 Sepolia)</h3>
            </div>

            <div className="text-center mb-8">
                <div className="text-gray-400 text-sm mb-1">Current ETH Price</div>
                <div className={`text-5xl font-black font-mono ${Number(currentPrice) < 1500 ? 'text-red-500' : 'text-white'}`}>
                    ${currentPrice}
                </div>
                <div className="text-xs text-gray-500 mt-2">Threshold: $1,500</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleCrash}
                    disabled={isPending || isConfirming}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 group"
                >
                    <TrendingDown className="w-8 h-8 text-red-500 mb-2 group-hover:animate-bounce" />
                    <span className="font-bold text-red-400">CRASH MARKET</span>
                    <span className="text-xs text-red-500/70 mt-1">Set Price $1,000</span>
                </button>

                <button
                    onClick={handleStabilize}
                    disabled={isPending || isConfirming}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 group"
                >
                    <TrendingUp className="w-8 h-8 text-emerald-500 mb-2 group-hover:animate-bounce" />
                    <span className="font-bold text-emerald-400">STABILIZE</span>
                    <span className="text-xs text-emerald-500/70 mt-1">Set Price $2,000</span>
                </button>
            </div>

            {(isPending || isConfirming) && (
                <div className="mt-4 text-center text-xs text-yellow-500 font-mono animate-pulse">
                    Transaction Processing...
                </div>
            )}
        </div>
    )
}
