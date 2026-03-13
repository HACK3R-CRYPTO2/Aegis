'use client'

import { useReadContract } from 'wagmi'
import { AEGIS_HOOK_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { unichainSepolia } from '../lib/config'
import { ArrowDown, Wallet, Settings, AlertOctagon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function TradingView() {
    const { data: panicMode } = useReadContract({
        address: DEPLOYED_ADDRESSES.AEGIS_HOOK as `0x${string}`,
        abi: AEGIS_HOOK_ABI,
        functionName: 'panicMode',
        chainId: unichainSepolia.id,
        query: { refetchInterval: 2000 }
    })

    // Theme Logic
    const isPanic = panicMode === true
    const [amount, setAmount] = useState<string>("")
    const [isSwapping, setIsSwapping] = useState(false)
    const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="glass-card p-5 rounded-3xl h-[400px] animate-pulse bg-white/5 w-full" />

    const handleSwap = () => {
        setIsSwapping(true)
        setTxStatus('idle')

        // Simulate network delay
        setTimeout(() => {
            setIsSwapping(false)
            setTxStatus('success')
            setTimeout(() => setTxStatus('idle'), 3000)
        }, 2000)
    }

    return (
        <div className={`glass-card p-5 rounded-3xl max-w-sm mx-auto shadow-2xl relative overflow-hidden border transition-all duration-500 w-full ${isPanic ? 'border-red-500/30' : 'border-white/10'}`}>
            {/* Aegis Prime Indicator (When Active) */}
            {isPanic && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-[8px] font-cyber font-bold text-center py-1 tracking-[0.3em] animate-pulse z-50">
                    PROTECTION ACTIVE: 99.0% SECURITY TAX
                </div>
            )}

            <div className="flex justify-between items-center mb-4 text-gray-400 mt-2">
                <span className="font-cyber font-bold text-xs tracking-widest text-white">SWAP INTERFACE</span>
                <Settings className="w-4 h-4 hover:text-neon-cyan cursor-pointer transition-colors" />
            </div>

            {/* Input 1 */}
            <div className={`bg-black/30 p-3 rounded-2xl mb-1 border transition-colors group ${isPanic ? 'border-red-500/20' : 'border-white/5 hover:border-neon-purple/50'}`}>
                <label className="text-[9px] font-mono text-gray-500 mb-1 block uppercase">You pay</label>
                <div className="flex justify-between items-center">
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`bg-transparent text-3xl font-bold outline-none placeholder-gray-700 w-full font-cyber transition-colors ${isPanic ? 'text-red-400 select-none' : 'text-white group-hover:text-neon-purple'}`}
                        disabled={isSwapping}
                    />
                    <div className="bg-gray-800/50 flex items-center gap-2 px-2 py-1 rounded-full border border-white/10">
                        <div className="w-4 h-4 rounded-full bg-linear-to-br from-blue-500 to-blue-700"></div>
                        <span className="font-bold text-xs">ETH</span>
                    </div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-mono text-gray-600">
                    <span>${amount ? (Number(amount) * 2000).toLocaleString() : "0.00"}</span>
                    <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        <span>Balance: 12.45</span>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-[#0a0a0f] border border-white/10 p-1.5 rounded-lg text-gray-500">
                    <ArrowDown className={`w-3 h-3 ${isPanic ? 'text-red-500 animate-bounce' : 'text-gray-500'}`} />
                </div>
            </div>

            {/* Input 2 */}
            <div className={`bg-black/30 p-3 rounded-2xl mt-1 border transition-colors group ${isPanic ? 'border-red-500/20' : 'border-white/5 hover:border-neon-cyan/50'}`}>
                <div className="flex justify-between items-center">
                    <label className="text-[9px] font-mono text-gray-500 mb-1 block uppercase">You receive</label>
                    {isPanic && (
                        <div className="text-[8px] font-bold text-red-500 font-mono animate-pulse">
                            -99% SECURITY TAX
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="0"
                            value={amount ? (isPanic ? (Number(amount) * 2000 * 0.01).toFixed(2) : (Number(amount) * 2000).toFixed(2)) : ""}
                            readOnly
                            className={`bg-transparent text-3xl font-bold outline-none placeholder-gray-700 w-full font-cyber transition-colors cursor-default ${isPanic ? 'text-red-500' : 'text-gray-400 group-hover:text-neon-cyan'}`}
                        />
                        {isPanic && amount && (
                           <div className="text-[10px] text-gray-500 line-through font-mono">
                                ${(Number(amount) * 2000).toLocaleString()}
                           </div>
                        )}
                    </div>
                    <div className="bg-gray-800/50 flex items-center gap-2 px-2 py-1 rounded-full border border-white/10 shrink-0">
                        <div className="w-4 h-4 rounded-full bg-linear-to-br from-green-400 to-emerald-600"></div>
                        <span className="font-bold text-xs">USDC</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={handleSwap}
                disabled={!amount || isSwapping}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center btn-cyber tracking-widest ${isPanic
                    ? 'bg-red-950/40 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                    : txStatus === 'success'
                        ? 'bg-neon-green text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-neon-purple hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    }`}
            >
                {isPanic ? "EXECUTE TAXED SWAP" :
                    isSwapping ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) :
                        txStatus === 'success' ? "SWAP SUCCESS" : "SWAP TOKENS"}
            </button>

            {isPanic && (
                <div className="mt-3 flex items-start gap-2 bg-red-500/5 p-2 rounded-lg border border-red-500/10">
                    <AlertOctagon className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[8px] font-mono text-red-400 leading-tight uppercase">
                        Aegis Prime Consensus Verified. Arbitrage value redirected to pool defense via 99% Dynamic Tax.
                    </p>
                </div>
            )}
        </div>
    )
}

