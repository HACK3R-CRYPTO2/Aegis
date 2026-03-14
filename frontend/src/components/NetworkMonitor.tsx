'use client'

import { useReadContract } from 'wagmi'
import { MOCK_ORACLE_ABI, AEGIS_HOOK_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { sepolia, unichainSepolia } from '../lib/config'
import { formatEther } from 'viem'
import { useEffect, useState, useRef } from 'react'
import { Terminal, ShieldAlert, Zap, Globe, ShieldCheck } from 'lucide-react'

type LogType = 'info' | 'danger' | 'success' | 'warning'

interface Log {
    id: number
    timestamp: string
    message: string
    type: LogType
    chain: 'SEPOLIA' | 'REACTIVE' | 'UNICHAIN'
}

export function NetworkMonitor() {
    // 1. Watch Oracle Price (Sepolia)
    const { data: price } = useReadContract({
        address: DEPLOYED_ADDRESSES.MOCK_ORACLE as `0x${string}`,
        abi: MOCK_ORACLE_ABI,
        functionName: 'price',
        chainId: sepolia.id,
        query: { refetchInterval: 1000 }
    })

    // 2. Watch Hook Status (Unichain)
    const { data: sentinelArmed } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'sentinelArmed',
        chainId: unichainSepolia.id,
        query: { refetchInterval: 1000 }
    })

    const [logs, setLogs] = useState<Log[]>([])
    const [mounted, setMounted] = useState(false)
    const logsEndRef = useRef<HTMLDivElement>(null)
    const prevArmedRef = useRef<boolean>(false)
    const prevPriceRef = useRef<number>(2000)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Helper to add logs
    const addLog = (message: string, type: LogType, chain: 'SEPOLIA' | 'REACTIVE' | 'UNICHAIN') => {
        const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLogs(prev => [...prev.slice(-10), { id: Date.now(), timestamp: now, message, type, chain }])
    }

    // Scroll to bottom
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [logs])

    // Initial Boot-up Logs
    useEffect(() => {
        addLog("System Monitoring Initiated", "info", "UNICHAIN")
        addLog("Aegis Prime: Tracking Unichain Sepolia...", "info", "UNICHAIN")
        setTimeout(() => {
            addLog("Reactive Sentinel: Monitoring Ethereum Sepolia...", "info", "REACTIVE")
        }, 500)
    }, [])

    // Logic Observer
    useEffect(() => {
        if (!mounted || !price) return

        const currentPrice = Number(formatEther(price as bigint))
        const isArmed = sentinelArmed === true

        // Multi-Tier Detection Logic
        const isStable = currentPrice >= 1950;
        const isDrift = currentPrice < 1950 && currentPrice >= 1850;
        const isSteep = currentPrice < 1850 && currentPrice >= 1500;
        const isCrash = currentPrice < 1500;

        const prevIsStable = prevPriceRef.current >= 1950;

        // Trigger Logs on Transitions
        if (isDrift && prevIsStable) {
            addLog(`MARKET DRIFT: 500 BP Divergence Detected`, 'warning', 'SEPOLIA')
            addLog(`Shield Status: Standby [Monitoring Gap]`, 'info', 'UNICHAIN')
        }

        if (isSteep && (prevIsStable || (prevPriceRef.current >= 1850))) {
            if (prevPriceRef.current >= 1850) {
                addLog(`MARKET STRESS: 1100 BP Divergence Detected`, 'warning', 'SEPOLIA')
                addLog(`Sentinel Alert: Divergence exceeding safety threshold`, 'warning', 'REACTIVE')
            }
        }

        if (isCrash && prevPriceRef.current >= 1500) {
            addLog(`EQUILIBRIUM BREACH: Extreme Market Crash ($${currentPrice.toFixed(0)})`, 'danger', 'SEPOLIA')
            setTimeout(() => {
                addLog(`Reactive Sentinel: L1 Gap Captured. Verifying...`, 'warning', 'REACTIVE')
            }, 500)
        }

        // Detect Arming
        if (isArmed && !prevArmedRef.current) {
            addLog(`🛡️ AEGIS PRIME: Shield ARMED. Value Capture Active`, 'success', 'UNICHAIN')
            addLog(`>> Redirecting arbitrage margin to LP Pool`, 'success', 'UNICHAIN')
        }

        // Recovery
        if (isStable && !prevIsStable) {
            addLog(`EQUILIBRIUM RESTORED: Market Healthy at $${currentPrice.toFixed(0)}`, 'success', 'SEPOLIA')
            addLog(`✅ SHIELD STANDBY: System Monitoring Active`, 'success', 'UNICHAIN')
        }

        prevPriceRef.current = currentPrice
        prevArmedRef.current = isArmed

    }, [price, sentinelArmed])

    return (
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full min-h-[300px]">
            {/* Header */}
            <div className="bg-black/40 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-neon-cyan/50" />
                    <span className="text-[10px] font-cyber font-bold text-gray-400 uppercase tracking-widest">System Logs</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 scrollbar-hide bg-black/20">
                {logs.length === 0 && (
                    <div className="text-gray-600 text-center mt-20 italic font-mono text-[10px]">
                        Waiting for chain events...
                        <br />
                        <span className="text-gray-700">(Signals from Sepolia, Reactive, Unichain)</span>
                    </div>
                )}

                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300 items-start">
                        <span className="text-gray-600 shrink-0 select-none text-[10px] pt-0.5">[{log.timestamp}]</span>

                        {/* Chain Badge */}
                        <div className={`shrink-0 h-fit px-1.5 py-0.5 rounded text-[9px] font-bold border ${log.chain === 'SEPOLIA' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            log.chain === 'REACTIVE' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                'bg-pink-500/10 text-pink-400 border-pink-500/20'
                            }`}>
                            {log.chain}
                        </div>

                        <span className={`text-[11px] leading-tight ${log.type === 'danger' ? 'text-red-400 font-bold' :
                            log.type === 'success' ? 'text-emerald-400 font-bold' :
                                log.type === 'warning' ? 'text-yellow-400' :
                                    'text-gray-300'
                            }`}>
                            {log.message}
                        </span>
                    </div>
                ))}
                <div ref={logsEndRef} />
            </div>

            {/* Status Bar */}
            <div className="bg-black/60 px-4 py-1.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span className="text-blue-400/80">Sepolia</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-purple-500" />
                    <span className="text-purple-400/80">Reactive</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
                    <ShieldCheck className="w-3 h-3 text-pink-500" />
                    <span className="text-pink-400/80 font-cyber">Aegis Prime</span>
                </div>
            </div>
        </div>
    )
}
