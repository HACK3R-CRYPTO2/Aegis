'use client'

import { useReadContract } from 'wagmi'
import { AEGIS_HOOK_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { unichainSepolia } from '../lib/config'
import { ArrowDown, Wallet, Settings } from 'lucide-react'
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
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-3xl max-w-sm mx-auto shadow-2xl relative overflow-hidden">
            {/* Overlay for Panic Mode */}
            {isPanic && (
                <div className="absolute inset-0 z-50 bg-red-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center border-4 border-red-500 rounded-3xl animate-pulse">
                    <div className="bg-black/50 p-4 rounded-full mb-4 border border-red-500">
                        <div className="w-12 h-12 text-4xl">🛑</div>
                    </div>
                    <h3 className="text-2xl font-black text-red-500 mb-2">TRADING HALTED</h3>
                    <p className="text-red-200 font-mono text-sm leading-relaxed">
                        Aegis Circuit Breaker has paused this pool due to detected market instability.
                    </p>
                </div>
            )}

            <div className="flex justify-between items-center mb-4 text-gray-400">
                <span className="font-medium">Swap</span>
                <Settings className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>

            <div className="bg-black/40 p-4 rounded-2xl mb-2 border border-transparent hover:border-gray-700 transition-colors">
                <label className="text-xs text-gray-400 mb-1 block">You pay</label>
                <div className="flex justify-between items-center">
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent text-3xl font-medium outline-none placeholder-gray-600 w-full"
                        disabled={isPanic || isSwapping}
                    />
                    <div className="bg-gray-800 flex items-center gap-2 px-2 py-1 rounded-full border border-gray-700">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span className="font-bold text-sm">ETH</span>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>$0.00</span>
                    <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        <span>Balance: 0.00</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-gray-900 border border-gray-800 p-2 rounded-xl">
                    <ArrowDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl mt-2 border border-transparent hover:border-gray-700 transition-colors">
                <label className="text-xs text-gray-400 mb-1 block">You receive</label>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="0"
                        value={amount ? (Number(amount) * 2000).toFixed(2) : ""}
                        readOnly
                        className="bg-transparent text-3xl font-medium outline-none placeholder-gray-600 w-full cursor-default"
                        disabled={isPanic}
                    />
                    <div className="bg-gray-800 flex items-center gap-2 px-2 py-1 rounded-full border border-gray-700">
                        <div className="w-6 h-6 rounded-full bg-green-500"></div>
                        <span className="font-bold text-sm">USDC</span>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>$0.00</span>
                </div>
            </div>

            <button
                onClick={handleSwap}
                disabled={isPanic || !amount || isSwapping}
                className={`w-full mt-4 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center ${isPanic
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : txStatus === 'success'
                        ? 'bg-green-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    }`}
            >
                {isPanic ? "CIRCUIT BREAKER ACTIVE" :
                    isSwapping ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) :
                        txStatus === 'success' ? "Swap Successful! 🎉" : "Swap"}
            </button>
        </div>
    )
}
