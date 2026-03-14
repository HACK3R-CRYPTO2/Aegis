"use client"

import { StatusCard } from '../components/StatusCard'
import { OracleSim } from '../components/OracleSim'
import { TradingView } from '../components/TradingView'
import { NetworkMonitor } from '../components/NetworkMonitor'
import { ConnectButton } from '../components/ConnectButton'
import { ShieldCheck, Zap, Activity, Info } from 'lucide-react'
import { usePriceContext } from '../lib/PriceContext'
import { motion } from 'framer-motion'

export default function Home() {
  const { l1Price, l2Price, isArmed, divergence } = usePriceContext();

  return (
    <main className="h-screen flex flex-col bg-[#020204] text-gray-300 overflow-hidden selection:bg-neon-purple/30">

      {/* Background Data Stream (Subtle) */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-cyan-500 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-purple-500 to-transparent animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-[1800px] mx-auto w-full p-3 lg:p-4 h-full">

        {/* Global HUD Header */}
        <header className="flex items-center justify-between mb-4 shrink-0 glass-panel p-3 rounded-xl border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isArmed ? 'bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-indigo-600/10 text-indigo-400 border border-white/10'}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tighter font-cyber flex items-center gap-2">
                  AEGIS <span className={isArmed ? 'text-red-500' : 'text-neon-purple'}>PRIME</span>
                </h1>
                <span className="text-[10px] uppercase tracking-tighter text-gray-500 font-mono">Autonomous Liquidity Protection</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden md:block" />

            <div className="hidden md:flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-gray-500 font-mono">Global Fair Price</span>
                <span className="text-sm font-bold text-white font-cyber">${l1Price.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-gray-500 font-mono">L2 Pool Price</span>
                <span className="text-sm font-bold text-neon-cyan font-cyber">${l2Price.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-gray-500 font-mono">Market Gap</span>
                <span className={`text-sm font-bold font-cyber ${divergence > 500 ? 'text-red-500' : 'text-green-500'}`}>
                  {divergence.toFixed(2)} BP
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full border text-[10px] font-bold font-cyber ${isArmed ? 'bg-red-500/10 border-red-500/30 text-red-500 pulse' : 'bg-green-500/10 border-green-500/30 text-green-500'}`}>
              {isArmed ? 'SHIELD ARMED' : 'PROTOCOL SECURE'}
            </div>
            <ConnectButton />
          </div>
        </header>

        {/* Tactical Command Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">

          {/* Left Sidebar: Monitoring & Consensus (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto">
            <section className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-cyber text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3 text-neon-purple" />
                  Security Engine
                </span>
              </div>
              <StatusCard />
            </section>

            <section className="flex flex-col gap-2 flex-1 min-h-0">
               <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-cyber text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 text-neon-cyan" />
                  Consensus Feed
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <NetworkMonitor />
              </div>
            </section>
          </div>

          {/* Main Terminal: Trading & Divergence (Col 6) */}
          <div className="lg:col-span-6 flex flex-col gap-4 min-h-0">
            {/* Divergence Meter (NEW UX) */}
            <div className="glass-panel rounded-2xl p-6 border-white/5 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 to-transparent pointer-events-none" />
               <div className="text-[10px] font-cyber text-gray-500 uppercase tracking-[0.2em] mb-4">Equilibrium Divergence Meter</div>
               
               <div className="w-full h-12 bg-white/5 rounded-full relative overflow-hidden border border-white/10 p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((divergence / 2500) * 100, 100)}%` }}
                    className={`h-full rounded-full transition-colors duration-500 ${divergence > 500 ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-neon-cyan shadow-[0_0_20px_rgba(0,212,255,0.5)]'}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-[10px] font-mono text-white/40 pointer-events-none">
                    <span>0 BP</span>
                    <span>500 BP (DRIFT)</span>
                    <span>1000 BP (STEEP)</span>
                    <span>2500 BP + (CRASH)</span>
                  </div>
               </div>

               <div className="mt-4 flex gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-black text-white font-cyber">{divergence.toFixed(0)}</div>
                    <div className="text-[8px] text-gray-500 uppercase font-mono">Pips Offset</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-black font-cyber ${isArmed ? 'text-red-500 animate-pulse' : 'text-neon-purple'}`}>
                      {isArmed ? `${Math.min(divergence / 100 + 0.05, 99.9).toFixed(2)}%` : '0.3%'}
                    </div>
                    <div className="text-[8px] text-gray-500 uppercase font-mono">Dynamic Fee</div>
                  </div>
               </div>
            </div>

            {/* Trading HUD */}
            <div className="flex-1 glass-panel rounded-2xl p-4 border-white/5 min-h-0 flex flex-col">
              <TradingView />
            </div>
          </div>

          {/* Right Sidebar: Simulation (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
             <section className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-cyber text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3 h-3 text-neon-purple" />
                    Market Simulator
                  </span>
                  <Info className="w-3 h-3 text-gray-600" />
                </div>
                <div className="h-[320px]">
                  <OracleSim />
                </div>
              </section>

              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex-1">
                <h4 className="text-[10px] font-cyber text-indigo-400 uppercase mb-3 tracking-widest">Protocol Intelligence</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">Shield Status</span>
                    <span className={isArmed ? 'text-red-500' : 'text-green-500'}>{isArmed ? 'ARMED' : 'STANDBY'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">Hook Version</span>
                    <span className="text-white">v4.0.1-EQUIL</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">Anti-MEV Mode</span>
                    <span className="text-neon-cyan">DYNAMIC TAX</span>
                  </div>
                </div>
              </div>
          </div>

        </div>

      </div>
    </main>
  )
}

