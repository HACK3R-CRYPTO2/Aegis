import { StatusCard } from '../components/StatusCard'
import { OracleSim } from '../components/OracleSim'
import { TradingView } from '../components/TradingView'
import { NetworkMonitor } from '../components/NetworkMonitor'
import { ConnectButton } from '../components/ConnectButton'
import { ReputationDashboard } from '../components/ReputationDashboard'
import { ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-200 selection:bg-indigo-500/30">

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1e2e 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <header className="flex items-center justify-between mb-12 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white">AEGIS</h1>
              <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Autonomous Liquidity Defense</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Hackathon</div>
              <div className="text-sm font-mono text-gray-300">Uniswap Hook Incubator 7</div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Powering</div>
              <div className="flex gap-2 text-sm font-mono text-gray-300">
                <span>Unichain</span>
                <span className="text-gray-600">/</span>
                <span>Reactive</span>
              </div>
            </div>
            <ConnectButton />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Command Center */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Status</h3>
            </div>
            <StatusCard />

            <ReputationDashboard />

            <div className="mt-8 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Oracle Simulation</h3>
            </div>
            <OracleSim />

            <div className="mt-8 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Reactive Network Feed</h3>
            </div>
            <NetworkMonitor />
          </div>

          {/* Right Column: User View */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Market View</h3>
            </div>
            <div className="sticky top-8">
              <TradingView />

              <div className="mt-8 p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <h4 className="font-bold text-white mb-2">How it works</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-indigo-500 font-bold">1.</span>
                    <span><strong>OracleSim</strong> simulates a price crash on Sepolia (L1).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500 font-bold">2.</span>
                    <span><strong>Aegis Sentinel</strong> (Reactive Network) detects the event instantly.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500 font-bold">3.</span>
                    <span>Sentinel signals the <strong>Aegis Hook</strong> on Unichain (L2) to pause.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500 font-bold">4.</span>
                    <span>The Swap UI is <strong>blocked</strong> automatically.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
