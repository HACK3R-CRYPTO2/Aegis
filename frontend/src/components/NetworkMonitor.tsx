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
    const { data: panicMode } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'panicMode',
        chainId: unichainSepolia.id,
        query: { refetchInterval: 1000 }
    })

    const [logs, setLogs] = useState<Log[]>([])
    const logsEndRef = useRef<HTMLDivElement>(null)
    const prevPanicRef = useRef<boolean>(false)
    const prevPriceRef = useRef<number>(2000)

    // Helper to add logs
    const addLog = (message: string, type: LogType, chain: 'SEPOLIA' | 'REACTIVE' | 'UNICHAIN') => {
        const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLogs(prev => [...prev.slice(-10), { id: Date.now(), timestamp: now, message, type, chain }])
    }

    // Scroll to bottom
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [logs])

    // Logic Observer
    useEffect(() => {
        if (!price) return

        const currentPrice = Number(formatEther(price as bigint))
        const isPanic = panicMode === true

        // Detect Crash Start
        if (currentPrice < 1500 && prevPriceRef.current >= 1500) {
            addLog(`CRASH DETECTED ETH Price $${currentPrice.toFixed(0)} < Threshold`, 'danger', 'SEPOLIA')
            setTimeout(() => {
                addLog(`Orale Event Emitted: PriceUpdate(${currentPrice.toFixed(0)})`, 'warning', 'SEPOLIA')
            }, 500)
            setTimeout(() => {
                addLog(`Reactive Sentinel: Event Captured. Processing...`, 'info', 'REACTIVE')
            }, 1000)
            setTimeout(() => {
                addLog(`Reactive Relayer: Bridging 'Panic' Signal -> Unichain`, 'info', 'REACTIVE')
            }, 1500)
        }

        // Detect Panic Activation
        if (isPanic && !prevPanicRef.current) {
            addLog(`Callback Received: setPanicMode(true) executed`, 'danger', 'UNICHAIN')
            addLog(`🛡️ SHIELD ACTIVATED: Pool Halted`, 'danger', 'UNICHAIN')
        }

        // Detect Recovery
        if (currentPrice >= 1500 && prevPriceRef.current < 1500) {
            addLog(`Market Stabilized: ETH Price $${currentPrice.toFixed(0)}`, 'success', 'SEPOLIA')
            setTimeout(() => {
                addLog(`Reactive Sentinel: Emitting 'Normal' Signal`, 'info', 'REACTIVE')
            }, 500)
        }

        // Detect Panic Deactivation
        if (!isPanic && prevPanicRef.current) {
            addLog(`Callback Received: setPanicMode(false)`, 'success', 'UNICHAIN')
            addLog(`✅ SHIELD DISABLED: Trading Resumed`, 'success', 'UNICHAIN')
        }

        prevPriceRef.current = currentPrice
        prevPanicRef.current = isPanic

    }, [price, panicMode])

    return (
        <div className="bg-[#0f0f13] rounded-2xl border border-gray-800 overflow-hidden flex flex-col h-[300px]">
            {/* Header */}
            <div className="bg-[#1a1a20] px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Live Network Activity</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 scrollbar-hide">
                {logs.length === 0 && (
                    <div className="text-gray-600 text-center mt-20 italic">
                        Waiting for chain events...
                        <br />
                        <span className="text-[10px] not-italic text-gray-700">(Signals from Sepolia, Reactive, Unichain)</span>
                    </div>
                )}

                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-gray-600 shrink-0 select-none">[{log.timestamp}]</span>

                        {/* Chain Badge */}
                        <div className={`shrink-0 h-fit px-1.5 rounded text-[10px] font-bold border ${log.chain === 'SEPOLIA' ? 'bg-blue-900/20 text-blue-400 border-blue-900/50' :
                                log.chain === 'REACTIVE' ? 'bg-purple-900/20 text-purple-400 border-purple-900/50' :
                                    'bg-pink-900/20 text-pink-400 border-pink-900/50'
                            }`}>
                            {log.chain}
                        </div>

                        <span className={`${log.type === 'danger' ? 'text-red-400 font-bold' :
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
            <div className="bg-[#131318] px-4 py-1.5 border-t border-gray-800 flex items-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span className="text-blue-500/80">Sepolia: Connected</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-purple-500" />
                    <span className="text-purple-500/80">Reactive: Listening</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-pink-500" />
                    <span className="text-pink-500/80">Unichain: Active</span>
                </div>
            </div>
        </div>
    )
}
