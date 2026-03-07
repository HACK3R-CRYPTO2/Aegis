import { StatusCard } from '../components/StatusCard'
import { OracleSim } from '../components/OracleSim'
import { TradingView } from '../components/TradingView'
import { NetworkMonitor } from '../components/NetworkMonitor'
import { ConnectButton } from '../components/ConnectButton'
import { ReputationDashboard } from '../components/ReputationDashboard'
import { ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-[#050505] text-gray-300 overflow-hidden selection:bg-neon-purple/30">

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 flex-1 flex flex-col max-w-[1800px] mx-auto w-full p-4 lg:p-6 h-full">

        {/* Header - Compact */}
        <header className="flex items-center justify-between mb-4 shrink-0 border-b border-white/5 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(123,47,247,0.3)] border border-white/10">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight font-cyber bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                AEGIS
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 text-xs font-mono text-gray-500">
              <span>ETH/USD: <span className="text-neon-cyan">$2000</span></span>
              <span>GAS: <span className="text-neon-purple">12 Gwei</span></span>
            </div>
            <ConnectButton />
          </div>
        </header>

        {/* Dashboard Grid - 3 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

          {/* Left Column (3) - Controls */}
          <div className="lg:col-span-3 flex flex-col gap-3 overflow-y-auto pl-2 pr-1 scrollbar-hide">

            {/* Status */}
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_#10b981]" />
              <span className="text-[9px] font-cyber text-gray-500 uppercase tracking-widest">Sentinel</span>
            </div>
            <div className="shrink-0">
              <StatusCard />
            </div>

            {/* Oracle Control */}
            <div className="flex items-center gap-2 mb-0.5 mt-1">
              <div className="w-1.5 h-1.5 bg-neon-purple rounded-full shadow-[0_0_8px_#8b5cf6]" />
              <span className="text-[9px] font-cyber text-gray-500 uppercase tracking-widest">Simulation</span>
            </div>
            <div className="shrink-0 h-[280px]">
              <OracleSim />
            </div>

            {/* How it works (Hidden on short screens to prevent scroll) */}
            <div className="p-3 rounded-xl glass-panel border border-white/5 mt-auto hidden xl:block 2xl:block">
              <h4 className="font-bold text-gray-400 mb-2 font-cyber text-xs uppercase">Sequence</h4>
              <ul className="space-y-2 text-[10px] text-gray-500 font-mono">
                <li className="flex gap-2">
                  <span className="text-neon-purple">01.</span> OracleSim crashes Price
                </li>
                <li className="flex gap-2">
                  <span className="text-white">02.</span> Sentinel Signals L2
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-cyan">03.</span> Unichain Hook Locks Pool
                </li>
              </ul>
            </div>
          </div>

          {/* Center Column (6) - The Action */}
          <div className="lg:col-span-6 flex flex-col gap-4 overflow-y-auto px-1 scrollbar-hide">
            {/* Trading View - Centered vertically if space allows, or at top */}
            <div className="flex-1 flex flex-col justify-center">
              <TradingView />
            </div>

            {/* Reputation - Below Trading View */}
            <div>
              <ReputationDashboard />
            </div>
          </div>

          {/* Right Column (3) - The Feed */}
          <div className="lg:col-span-3 flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00d4ff] animate-pulse" />
              <span className="text-[10px] font-cyber text-gray-500 uppercase tracking-widest">Reactive Feed</span>
            </div>
            <NetworkMonitor />
          </div>

        </div>

      </div>
    </main>
  )
}

