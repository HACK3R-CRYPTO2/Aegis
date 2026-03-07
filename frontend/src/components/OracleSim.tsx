'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { MOCK_ORACLE_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { sepolia } from '../lib/config'
import { TrendingDown, TrendingUp, Activity } from 'lucide-react'
import { formatEther } from 'viem'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

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
    const [lastAction, setLastAction] = useState<'crash' | 'stabilize' | null>(null)

    useEffect(() => {
        if (isSuccess) {
            refetch()
            if (lastAction === 'stabilize') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#34d399', '#059669'] // Green theme
                })
            }
        }
    }, [isSuccess, refetch, lastAction])

    const handleCrash = () => {
        setLastAction('crash')
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            args: [1000n * 10n ** 18n], // 1000 ETH price (Crash)
            chainId: sepolia.id
        })
    }

    const handleStabilize = () => {
        setLastAction('stabilize')
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            chainId: sepolia.id,
            args: [2000n * 10n ** 18n] // 2000 ETH price (Normal)
        })
    }

    const currentPrice = price ? Number(formatEther(price)).toFixed(0) : "..."

    return (
        <div className="glass-card p-5 rounded-2xl border border-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3 text-neon-purple/80 border-b border-white/5 pb-2">
                <Activity className="w-4 h-4" />
                <h3 className="font-cyber text-[10px] uppercase tracking-widest">L1 Sepolia Feed</h3>
            </div>

            <div className="text-center mb-4 flex-1 flex flex-col justify-center">
                <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">ETH / USD</div>
                <div className={`text-5xl font-black font-cyber tracking-tighter ${Number(currentPrice) < 1500 ? 'text-red-500 animate-glitch' : 'text-white'}`}>
                    ${currentPrice}
                </div>
                <div className="text-[9px] font-mono text-gray-600 mt-2 border-t border-white/5 pt-1 w-24 mx-auto">
                    Threshold: $1,500
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={handleCrash}
                    disabled={isPending || isConfirming}
                    className="btn-cyber flex flex-col items-center justify-center p-3 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 group"
                >
                    <TrendingDown className="w-5 h-5 text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-red-400">CRASH</span>
                </button>

                <button
                    onClick={handleStabilize}
                    disabled={isPending || isConfirming}
                    className="btn-cyber flex flex-col items-center justify-center p-3 rounded-xl bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green/20 hover:border-neon-green hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 group"
                >
                    <TrendingUp className="w-5 h-5 text-neon-green mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-neon-green">STABILIZE</span>
                </button>
            </div>

            {(isPending || isConfirming) && (
                <div className="mt-4 text-center text-[10px] text-yellow-500 font-mono animate-pulse uppercase tracking-widest">
                    &gt; Processing Transaction...
                </div>
            )}
        </div>
    )
}

