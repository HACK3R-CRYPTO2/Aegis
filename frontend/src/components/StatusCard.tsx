'use client'

import { useReadContract } from 'wagmi'
import { AEGIS_HOOK_ABI, AEGIS_SENTINEL_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES, CHAINS } from '../lib/addresses'
import { unichainSepolia, reactiveLasna } from '../lib/config'
import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react'

export function StatusCard() {
    const { data: sentinelArmed, isError, isLoading } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'sentinelArmed',
        chainId: unichainSepolia.id,
        query: {
            refetchInterval: 1000
        }
    })

    const { data: l1Price } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'l1Price',
        chainId: unichainSepolia.id,
        query: {
            refetchInterval: 1000
        }
    })

    const { data: confirmations } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_SENTINEL as `0x${string}`,
        abi: AEGIS_SENTINEL_ABI,
        functionName: 'currentConfirmations',
        chainId: CHAINS.LASNA, // Reactive Network
        query: {
            refetchInterval: 1000
        }
    })

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    // Theme Logic
    const isArmed = sentinelArmed === true

    if (!mounted) return <div className="p-5 rounded-2xl border border-white/5 animate-pulse h-[140px] bg-white/5" />

    const formattedL1Price = l1Price ? Number(BigInt(l1Price as bigint) / 10n**18n).toFixed(0) : "2000"

    return (
        <div className={`p-5 rounded-2xl border transition-all duration-500 glass-card ${isArmed
            ? 'border-red-500/50 shadow-[0_0_50px_-10px_rgba(239,68,68,0.3)] bg-red-950/20'
            : 'border-neon-cyan/30 shadow-[0_0_30px_-10px_rgba(0,212,255,0.2)]'
            }`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-[0.2em] font-cyber text-gray-300">SENTINEL STATUS</h2>
                {isArmed ? (
                    <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                ) : (
                    <Shield className="w-5 h-5 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isArmed ? 'bg-red-500 animate-ping' : 'bg-neon-green shadow-[0_0_10px_#10b981]'}`} />
                    <span className={`text-2xl font-cyber font-bold ${isArmed ? 'text-red-500 animate-glitch' : 'text-neon-cyan'}`}>
                        {isLoading ? "INITIALIZING..." : isArmed ? "EQUILIBRIUM SHIELD ARMED" : "SYSTEM ONLINE"}
                    </span>
                </div>

                {/* Prime Metrics & Progress */}
                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-end">
                            <span className="text-[8px] text-gray-500 uppercase tracking-widest font-cyber">Sentinel Consensus</span>
                            <span className={`text-[10px] font-mono ${Number(confirmations) > 0 ? 'text-yellow-400' : 'text-gray-500'}`}>
                                {confirmations?.toString() || "0"}/2 Verified
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 border border-white/5 p-px">
                            <div className={`h-full flex-1 rounded-full transition-all duration-700 ${Number(confirmations) >= 1 ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-white/5'}`} />
                            <div className={`h-full flex-1 rounded-full transition-all duration-700 ${Number(confirmations) >= 2 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/5'}`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/40 border border-white/5 p-2 rounded-lg group hover:border-red-500/30 transition-colors">
                            <div className="text-[8px] text-gray-500 uppercase tracking-tighter mb-1 font-cyber">Global Equilibrium</div>
                            <div className={`text-sm font-mono font-bold ${isArmed ? 'text-red-400' : 'text-gray-400'}`}>
                                ${formattedL1Price}
                            </div>
                        </div>
                        <div className="bg-black/40 border border-white/5 p-2 rounded-lg group hover:border-neon-cyan/30 transition-colors">
                            <div className="text-[8px] text-gray-500 uppercase tracking-tighter mb-1 font-cyber">Shield State</div>
                            <div className="text-[10px] font-mono font-bold text-indigo-400 flex items-center gap-1">
                                <Activity className="w-2.5 h-2.5" />
                                {isArmed ? "BALANCING" : "MONITORING"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`text-[10px] font-mono border-l-2 pl-3 py-1 mt-2 ${isArmed ? 'border-red-500 text-red-400 backdrop-blur-sm' : 'border-neon-cyan/30 text-gray-400'}`}>
                    {isArmed
                        ? "EQUILIBRIUM BREACH DETECTED. NEUTRALIZING TOXIC MEV."
                        : Number(confirmations) === 1 
                            ? "L1 BREACH DETECTED. AWAITING SECONDARY VERIFICATION..."
                            : "Waiting for market outlier to trigger consensus."}
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

