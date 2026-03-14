'use client'

import { Zap, Wallet, Settings, ShieldAlert, ArrowDown, Info } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePricePulse } from '../lib/usePricePulse'
import { motion, AnimatePresence } from 'framer-motion'

export function TradingView() {
    const { l1Price, l2Price, isArmed, divergence } = usePricePulse();

    const [amount, setAmount] = useState<string>("")
    const [isSwapping, setIsSwapping] = useState(false)
    const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="glass-card p-5 rounded-3xl h-[400px] animate-pulse bg-white/5 w-full" />

    // Equilibrium Math
    const rawSecurityFee = isArmed ? (divergence / 100 + 0.05) : 0.3;
    const securityFee = Math.min(rawSecurityFee, 99.9); // Cap at 99.9% for UI consistency
    const priceDivergencePercent = ((l2Price - l1Price) / l1Price) * 100;

    const handleSwap = () => {
        setIsSwapping(true)
        setTxStatus('idle')

        setTimeout(() => {
            setIsSwapping(false)
            setTxStatus('success')
            setTimeout(() => setTxStatus('idle'), 3000)
        }, 2000)
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <div className={`glass-card p-5 rounded-3xl shadow-2xl relative overflow-hidden border transition-all duration-500 w-full max-w-sm mx-auto ${isArmed ? 'border-red-500/30 bg-red-500/2' : 'border-white/10'}`}>
                
                {/* HUD Overlay */}
                <AnimatePresence>
                    {isArmed && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-0 left-0 right-0 bg-red-600/90 backdrop-blur-sm text-[8px] font-cyber font-bold text-center py-1.5 tracking-[0.3em] z-50 flex items-center justify-center gap-2"
                        >
                            <ShieldAlert className="w-3 h-3" />
                            EQUILIBRIUM BREACH DETECTED: PROTECTION LOGIC ACTIVE
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mb-6 text-gray-400 mt-4 px-1">
                    <span className="font-cyber font-bold text-[10px] tracking-widest text-white/60">PRIME EXECUTION TERMINAL</span>
                    <div className="flex gap-3">
                        <Settings className="w-3.5 h-3.5 hover:text-neon-cyan cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Input Panel 01 */}
                <div className={`bg-white/2 p-4 rounded-2xl mb-1 border transition-all group ${isArmed ? 'border-red-500/10' : 'border-white/5 hover:border-neon-purple/30'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Sell ETH</span>
                        <div className="flex items-center gap-1 text-[9px] font-mono text-gray-600">
                            <Wallet className="w-2.5 h-2.5" />
                            12.45 ETH
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={`bg-transparent text-4xl font-bold outline-none placeholder-white/10 w-full font-cyber transition-colors ${isArmed ? 'text-red-400' : 'text-white'}`}
                            disabled={isSwapping}
                        />
                        <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 shrink-0">
                            <div className="w-5 h-5 rounded-full bg-linear-to-br from-indigo-500 to-blue-600" />
                            <span className="font-black text-xs font-cyber">ETH</span>
                        </div>
                    </div>
                </div>

                {/* Switch Button */}
                <div className="flex justify-center -my-3.5 relative z-10">
                    <button className="bg-[#020204] border border-white/10 p-2 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all shadow-xl group">
                        <ArrowDown className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isArmed ? 'text-red-500' : ''}`} />
                    </button>
                </div>

                {/* Input Panel 02 */}
                <div className={`bg-white/2 p-4 rounded-2xl mt-1 border transition-all group ${isArmed ? 'border-red-500/10' : 'border-white/5 hover:border-neon-cyan/30'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Buy USDC (Est.)</span>
                        <span className="text-[9px] font-mono text-gray-600">Rate: 1 ETH = ${l2Price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="0.00"
                                value={amount ? (Number(amount) * l2Price * (1 - securityFee/100)).toFixed(2) : ""}
                                readOnly
                                className={`bg-transparent text-4xl font-bold outline-none placeholder-white/10 w-full font-cyber transition-colors cursor-default ${isArmed ? 'text-red-500' : 'text-white/60'}`}
                            />
                            {isArmed && amount && (
                                <motion.span 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className="text-[10px] text-gray-600 line-through font-mono"
                                >
                                    ${(Number(amount) * l2Price).toLocaleString()}
                                </motion.span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 shrink-0">
                            <div className="w-5 h-5 rounded-full bg-linear-to-br from-green-400 to-teal-600" />
                            <span className="font-black text-xs font-cyber">USDC</span>
                        </div>
                    </div>
                </div>

                {/* Security Breakdown Layout (Senior UX) */}
                <section className="mt-4 bg-white/2 border border-white/5 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-2 text-[9px] font-cyber text-gray-500 tracking-widest px-1">
                        <Info className="w-3 h-3" />
                        EQUILIBRIUM PARAMETERS
                    </div>
                    
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-gray-600">Market Fair Price</span>
                            <span className="text-white">${l1Price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-gray-600">Unichain Pool Price</span>
                            <span className="text-neon-cyan">${l2Price.toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-white/5 my-1" />
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-gray-600">Price Deviation</span>
                            <span className={isArmed ? 'text-red-500 font-bold' : 'text-green-500'}>{priceDivergencePercent.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-gray-600">Total Security Tax</span>
                            <span className={`font-bold ${isArmed ? 'text-red-500' : 'text-neon-purple'}`}>{securityFee.toFixed(2)}%</span>
                        </div>
                    </div>
                </section>

                {/* Primary Action */}
                <button
                    onClick={handleSwap}
                    disabled={!amount || isSwapping}
                    className={`w-full mt-4 py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center tracking-[0.2em] relative overflow-hidden font-cyber ${isArmed
                        ? 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:brightness-110 active:scale-95'
                        : txStatus === 'success'
                            ? 'bg-neon-green text-black'
                            : 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                        }`}
                >
                    {isSwapping ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : txStatus === 'success' ? (
                        "EXECUTION SUCCESSFUL"
                    ) : isArmed ? (
                        "EXECUTE ARBITRAGE TAX SWAP"
                    ) : (
                        "SWAP TOKENS"
                    )}
                </button>
            </div>

            {/* Protocol Notice */}
            <AnimatePresence>
                {isArmed && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex gap-4 items-start max-w-sm mx-auto"
                    >
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <h5 className="text-[10px] font-black font-cyber text-red-400">MEV PROTECTION ACTIVE</h5>
                            <p className="text-[9px] font-mono text-gray-500 leading-relaxed uppercase">
                                Toxic Flow detected. Divergence Fee captures arbitrage margin and distributes it back to LPs. Standard swaps are active but discouraged until equilibrium is restored.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

