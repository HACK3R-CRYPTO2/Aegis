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
        <div className={`p-5 rounded-2xl border transition-all duration-500 glass-card ${isPanic
            ? 'border-red-500/50 shadow-[0_0_50px_-10px_rgba(239,68,68,0.3)] bg-red-950/20'
            : 'border-neon-cyan/30 shadow-[0_0_30px_-10px_rgba(0,212,255,0.2)]'
            }`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-[0.2em] font-cyber text-gray-300">SENTINEL STATUS</h2>
                {isPanic ? (
                    <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                ) : (
                    <Shield className="w-5 h-5 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isPanic ? 'bg-red-500 animate-ping' : 'bg-neon-green shadow-[0_0_10px_#10b981]'}`} />
                    <span className={`text-2xl font-cyber font-bold ${isPanic ? 'text-red-500 animate-glitch' : 'text-neon-cyan'}`}>
                        {isLoading ? "INITIALIZING..." : isPanic ? "PANIC ACTIVE" : "SYSTEM ONLINE"}
                    </span>
                </div>

                <div className={`text-xs font-mono border-l-2 pl-3 py-1 ${isPanic ? 'border-red-500 text-red-400' : 'border-neon-cyan/30 text-gray-400'}`}>
                    {isPanic
                        ? "CRITICAL THREAT. POOLS LOCKED."
                        : "No active threats. Reactive Listeners standing by."}
                </div>
            </div>

            {/* Contract Info Footer */}
            <div className="mt-4 pt-3 border-t border-white/5 text-[9px] font-mono text-gray-600 flex justify-between uppercase tracking-widest">
                <span>Hook: {DEPLOYED_ADDRESSES.AEGIS_HOOK.slice(0, 6)}...</span>
                <span>Net: Unichain Sepolia</span>
            </div>
        </div>
    )
}

