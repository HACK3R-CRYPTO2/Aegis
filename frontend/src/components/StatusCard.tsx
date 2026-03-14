'use client'

import { useReadContract } from 'wagmi'
import { AEGIS_SENTINEL_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES, CHAINS } from '../lib/addresses'
import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, Activity, Database, Server } from 'lucide-react'
import { usePricePulse } from '../lib/usePricePulse'
import { motion } from 'framer-motion'

export function StatusCard() {
    const { isArmed, divergence } = usePricePulse();

    const { data: confirmations } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_SENTINEL as `0x${string}`,
        abi: AEGIS_SENTINEL_ABI,
        functionName: 'currentConfirmations',
        chainId: CHAINS.LASNA,
        query: { refetchInterval: 2000 }
    })

    const [mounted, setMounted] = useState(false)
    if (!mounted) return <div className="glass-panel p-4 rounded-xl border border-white/5 animate-pulse h-[200px]" />

    return (
        <div className={`glass-panel p-4 rounded-xl border transition-all duration-700 relative overflow-hidden flex flex-col gap-4 ${isArmed ? 'border-red-500/30 bg-red-500/2' : 'border-white/5'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isArmed ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'}`} />
                    <span className="text-[10px] font-cyber text-gray-500 uppercase tracking-widest">Protocol Core</span>
                </div>
                <div className={`text-[9px] font-mono px-2 py-0.5 rounded border ${isArmed ? 'border-red-500/30 text-red-500' : 'border-white/10 text-gray-600'}`}>
                    {isArmed ? 'DEFENSE MODE' : 'MONITORING'}
                </div>
            </div>

            {/* Main Status Display */}
            <div className="flex flex-col gap-1">
                <h3 className={`text-xl font-black font-cyber tracking-tight ${isArmed ? 'text-red-500' : 'text-white'}`}>
                    {isArmed ? 'SHIELD_ACTIVE' : 'SYSTEM_STABLE'}
                </h3>
                <p className="text-[9px] font-mono text-gray-600 uppercase">
                    {isArmed ? 'Equilibrium Breach Detected' : 'No toxic flow signatures found'}
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/2 border border-white/5 p-2.5 rounded-lg flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[8px] text-gray-600 uppercase font-cyber">
                        <Shield className="w-2.5 h-2.5" />
                        Shield Status
                    </div>
                    <div className="flex justify-between items-end">
                        <span className={`text-sm font-bold font-mono ${isArmed ? 'text-red-500' : 'text-green-500'}`}>
                            {isArmed ? 'ARMED' : 'STANDBY'}
                        </span>
                    </div>
                </div>
                <div className="bg-white/2 border border-white/5 p-2.5 rounded-lg flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[8px] text-gray-600 uppercase font-cyber">
                        <Activity className="w-2.5 h-2.5" />
                        Divergence
                    </div>
                    <span className={`text-sm font-bold font-mono ${divergence > 500 ? 'text-red-500' : 'text-neon-cyan'}`}>
                        {divergence.toFixed(0)} BP
                    </span>
                </div>
            </div>

            {/* Security Logs (Mini) */}
            <div className={`text-[9px] font-mono border-l border-white/10 pl-3 py-1 text-gray-500 leading-tight`}>
                {isArmed 
                  ? ">> Redirecting arbitrage margin to LP Pool..."
                  : Number(consensusStr) > 0 
                  ? ">> Alert: L1 Divergence found. Validating..."
                  : ">> Sentinel node polling Unichain Sepolia RPC..."
                }
            </div>

            {/* Network HUD */}
            <div className="flex items-center justify-between text-[8px] font-mono text-gray-700 uppercase pt-2 border-t border-white/5">
                <div className="flex items-center gap-1">
                    <Server className="w-2.5 h-2.5" />
                    REACTIVE-LASNA
                </div>
                <span>v4.0.1-EQUIL</span>
            </div>
        </div>
    )
}

