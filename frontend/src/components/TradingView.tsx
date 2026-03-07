'use client'

import { useReadContract } from 'wagmi'
import { AEGIS_HOOK_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { unichainSepolia } from '../lib/config'
import { ArrowDown, Wallet, Settings, AlertOctagon } from 'lucide-react'
import { useState } from 'react'

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
        <div className="glass-card p-5 rounded-3xl max-w-sm mx-auto shadow-2xl relative overflow-hidden border border-white/10 w-full">
            {/* Overlay for Panic Mode */}
            {isPanic && (
                <div className="absolute inset-0 z-50 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                        <AlertOctagon className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-black font-cyber text-red-500 mb-2 tracking-wider">HALTED</h3>
                    <div className="text-red-200 font-mono text-[10px] leading-relaxed border-t border-b border-red-500/30 py-2 uppercase tracking-widest">
                        Aegis Active.<br />
                        Pool Paused.
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-4 text-gray-400">
                <span className="font-cyber font-bold text-xs tracking-widest text-white">SWAP INTERFACE</span>
                <Settings className="w-4 h-4 hover:text-neon-cyan cursor-pointer transition-colors" />
            </div>

            {/* Input 1 */}
            <div className="bg-black/30 p-3 rounded-2xl mb-1 border border-white/5 hover:border-neon-purple/50 transition-colors group">
                <label className="text-[9px] font-mono text-gray-500 mb-1 block uppercase">You pay</label>
                <div className="flex justify-between items-center">
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent text-3xl font-bold outline-none placeholder-gray-700 w-full font-cyber text-white group-hover:text-neon-purple transition-colors"
                        disabled={isPanic || isSwapping}
                    />
                    <div className="bg-gray-800/50 flex items-center gap-2 px-2 py-1 rounded-full border border-white/10">
                        <div className="w-4 h-4 rounded-full bg-linear-to-br from-blue-500 to-blue-700"></div>
                        <span className="font-bold text-xs">ETH</span>
                    </div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-mono text-gray-600">
                    <span>$0.00</span>
                    <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        <span>Balance: 0.00</span>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-[#0a0a0f] border border-white/10 p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors">
                    <ArrowDown className="w-3 h-3" />
                </div>
            </div>

            {/* Input 2 */}
            <div className="bg-black/30 p-3 rounded-2xl mt-1 border border-white/5 hover:border-neon-cyan/50 transition-colors group">
                <label className="text-[9px] font-mono text-gray-500 mb-1 block uppercase">You receive</label>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="0"
                        value={amount ? (Number(amount) * 2000).toFixed(2) : ""}
                        readOnly
                        className="bg-transparent text-3xl font-bold outline-none placeholder-gray-700 w-full font-cyber text-gray-400 group-hover:text-neon-cyan transition-colors cursor-default"
                        disabled={isPanic}
                    />
                    <div className="bg-gray-800/50 flex items-center gap-2 px-2 py-1 rounded-full border border-white/10">
                        <div className="w-4 h-4 rounded-full bg-linear-to-br from-green-400 to-emerald-600"></div>
                        <span className="font-bold text-xs">USDC</span>
                    </div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-mono text-gray-600">
                    <span>$0.00</span>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={handleSwap}
                disabled={isPanic || !amount || isSwapping}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center btn-cyber tracking-widest ${isPanic
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-white/5'
                    : txStatus === 'success'
                        ? 'bg-neon-green text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-neon-purple hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    }`}
            >
                {isPanic ? "CIRCUIT BREAKER ACTIVE" :
                    isSwapping ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) :
                        txStatus === 'success' ? "SWAP SUCCESS" : "SWAP TOKENS"}
            </button>
        </div>
    )
}

