'use client'

import { useReadContract } from 'wagmi'
import { AEGIS_HOOK_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { unichainSepolia } from '../lib/config'
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export function StatusCard() {
    const { data: panicMode, isError, isLoading } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'panicMode',
        chainId: unichainSepolia.id,
        query: {
            refetchInterval: 2000 // Poll every 2 seconds
        }
    })

    // Theme Logic
    const isPanic = panicMode === true

    return (
        <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${isPanic
            ? 'bg-red-950/30 border-red-500 shadow-[0_0_50px_-12px_rgba(239,68,68,0.5)]'
            : 'bg-emerald-950/30 border-emerald-500 shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]'
            }`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-wider">AEGIS SENTINEL STATUS</h2>
                {isPanic ? (
                    <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                ) : (
                    <Shield className="w-8 h-8 text-emerald-500" />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${isPanic ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                    <span className={`text-3xl font-mono font-black ${isPanic ? 'text-red-500 animate-glitch' : 'text-emerald-500'}`}>
                        {isLoading ? "INITIALIZING..." : isPanic ? "PANIC MODE ACTIVE" : "SYSTEM NORMAL"}
                    </span>
                </div>

                <p className="text-gray-400 font-mono text-sm mt-2">
                    {isPanic
                        ? "CRITICAL THREAT DETECTED. ALL SWAPS HALTED ON UNICHAIN."
                        : "Liquidity Pools Secure. Reactive Listeners Active."}
                </p>
            </div>

            {/* Contract Info Footer */}
            <div className="mt-6 pt-4 border-t border-gray-800 text-xs font-mono text-gray-500 flex justify-between">
                <span>Hook: {DEPLOYED_ADDRESSES.AEGIS_HOOK.slice(0, 6)}...{DEPLOYED_ADDRESSES.AEGIS_HOOK.slice(-4)}</span>
                <span>Chain: Unichain Sepolia</span>
            </div>
        </div>
    )
}
