'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { MOCK_ORACLE_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { sepolia } from '../lib/config'
import { TrendingDown, TrendingUp, Activity } from 'lucide-react'
import { formatEther } from 'viem'
import { useEffect, useState } from 'react'
import { usePriceContext } from '../lib/PriceContext'
import confetti from 'canvas-confetti'

export function OracleSim() {
    const { address, isConnected } = useAccount()
    const { l1Price, setL1Price } = usePriceContext() // Added hydration from hook
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
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isSuccess) {
            // refetch() // No longer needed as we use optimistic updates and usePricePulse handles actual price sync
            if (lastAction === 'stabilize') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#34d399', '#059669'] // Green theme
                })
            }
        }
    }, [isSuccess, lastAction])

    useEffect(() => {
        if (price !== undefined) {
            setL1Price(Number(formatEther(price as bigint)))
        }
    }, [price, setL1Price])

    const handleCrash = () => {
        setLastAction('crash')
        setL1Price(1000) // Optimistic update
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            args: [1000n * 10n ** 18n],
            chainId: sepolia.id
        })
    }

    const handleDrift = () => {
        setLastAction('crash')
        setL1Price(1900) // Optimistic update
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            args: [1900n * 10n ** 18n], // 1900 ETH price (526 BP)
            chainId: sepolia.id
        })
    }

    const handleSteep = () => {
        setLastAction('crash')
        setL1Price(1600) // Optimistic update ($1600 = 2500 BP)
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            args: [1600n * 10n ** 18n], // 1600 ETH price (2500 BP)
            chainId: sepolia.id
        })
    }

    const handleStabilize = () => {
        setLastAction('stabilize')
        setL1Price(2000) // Optimistic update
        writeContract({
            address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
            abi: MOCK_ORACLE_ABI,
            functionName: 'setPrice',
            chainId: sepolia.id,
            args: [2000n * 10n ** 18n] // 2000 ETH price (Normal)
        })
    }

    if (!mounted) return <div className="glass-card p-5 rounded-2xl animate-pulse bg-white/5 h-full" />

    const currentPrice = l1Price.toFixed(0) // Use optimistic price for UI

    return (
        <div className="glass-card p-5 rounded-2xl border border-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3 text-neon-purple/80 border-b border-white/5 pb-2">
                <Activity className="w-4 h-4" />
                <h3 className="font-cyber text-[10px] uppercase tracking-widest">L1 Sepolia Feed</h3>
            </div>

            <div className="text-center mb-4 flex-1 flex flex-col justify-center">
                <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">ETH / USD</div>
                <div className={`text-5xl font-black font-cyber tracking-tighter ${Number(currentPrice) < 1950 ? 'text-red-500 animate-glitch' : 'text-white'}`}>
                    ${currentPrice}
                </div>
                <div className="flex flex-col gap-1 mt-3 items-center">
                    <div className="text-[9px] font-mono text-gray-600 border-t border-white/5 pt-1 w-24">
                        Threshold: $1,950
                    </div>
                    <div className="text-[8px] font-mono text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 uppercase tracking-widest">
                        Aegis Prime: Direct Detection
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={handleStabilize}
                    disabled={!isConnected || isPending || isConfirming}
                    className="btn-cyber flex flex-col items-center justify-center py-2 rounded-lg bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green/20 hover:border-neon-green disabled:opacity-50"
                >
                    <span className="text-[8px] font-bold text-neon-green uppercase mb-0.5">Restore</span>
                    <span className="text-[7px] font-mono opacity-60 text-neon-green">$2000</span>
                </button>

                <button
                    onClick={handleDrift}
                    disabled={!isConnected || isPending || isConfirming}
                    className="btn-cyber flex flex-col items-center justify-center py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500 disabled:opacity-50"
                >
                    <span className="text-[8px] font-bold text-orange-400 uppercase mb-0.5">Drift</span>
                    <span className="text-[7px] font-mono opacity-60 text-orange-400">500 BP</span>
                </button>

                <button
                    onClick={handleSteep}
                    disabled={!isConnected || isPending || isConfirming}
                    className="btn-cyber flex flex-col items-center justify-center py-2 rounded-lg bg-red-400/10 border border-red-400/30 hover:bg-red-400/20 hover:border-red-400 disabled:opacity-50"
                >
                    <span className="text-[8px] font-bold text-red-400 uppercase mb-0.5">Steep</span>
                    <span className="text-[7px] font-mono opacity-60 text-red-400">2500 BP</span>
                </button>

                <button
                    onClick={handleCrash}
                    disabled={!isConnected || isPending || isConfirming}
                    className="btn-cyber flex flex-col items-center justify-center py-2 rounded-lg bg-red-600/20 border border-red-600/40 hover:bg-red-600/30 hover:border-red-600 disabled:opacity-50"
                >
                    <span className="text-[8px] font-bold text-red-600 uppercase mb-0.5">Crash</span>
                    <span className="text-[7px] font-mono opacity-60 text-red-600">LIMIT</span>
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

