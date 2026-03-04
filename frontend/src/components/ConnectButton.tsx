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
                className="group flex items-center gap-2 bg-gray-900/50 hover:bg-red-950/30 text-gray-300 hover:text-red-400 font-mono text-xs py-2 px-4 rounded-full border border-gray-700 hover:border-red-500/50 transition-all"
                title="Disconnect"
            >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse group-hover:bg-red-500" />
                <span>{ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                <LogOut className="w-3 h-3 text-gray-500 ml-1 group-hover:text-red-400" />
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
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-2 px-6 rounded-full shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Wallet className="w-4 h-4" />
                    )}
                    {isPending ? "Connecting..." : "Connect Wallet"}
                </button>
            ))}
        </div>
    )
}
