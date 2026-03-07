'use client'

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { Wallet, LogOut, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ConnectButton() {
    const { address, isConnected } = useAccount()
    const { connect, connectors, isPending } = useConnect()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-32 h-10 bg-gray-900 rounded-full animate-pulse" />

    if (isConnected && address) {
        return (
            <button
                onClick={() => disconnect()}
                className="group flex items-center gap-3 bg-black/40 hover:bg-red-950/40 text-neon-cyan hover:text-red-400 font-mono text-xs py-2 px-4 rounded-xl border border-neon-cyan/30 hover:border-red-500/50 transition-all font-bold tracking-wider"
                title="Disconnect"
            >
                <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#10b981] group-hover:bg-red-500 group-hover:shadow-[0_0_8px_#ef4444] transition-colors" />
                <span>{ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                <LogOut className="w-3 h-3 text-white/50 ml-1 group-hover:text-red-400" />
            </button>
        )
    }

    return (
        <div className="flex gap-2">
            {connectors.filter(c => c.type === 'injected' || c.id === 'metaMask').slice(0, 1).map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                    className="flex items-center gap-2 btn-cyber bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2.5 px-6 rounded-xl border border-indigo-400/30 shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Wallet className="w-4 h-4" />
                    )}
                    {isPending ? "CONNECTING..." : "CONNECT WALLET"}
                </button>
            ))}
        </div>
    )
}

