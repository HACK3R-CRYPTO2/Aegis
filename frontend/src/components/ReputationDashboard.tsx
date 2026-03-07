'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { AEGIS_GUARDIAN_REGISTRY_ABI } from '../lib/abis'
import { DEPLOYED_ADDRESSES } from '../lib/addresses'
import { unichainSepolia } from '../lib/config'
import { Crown, Shield, Activity, UserPlus, Trophy } from 'lucide-react'
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { formatEther } from 'viem'

declare global {
    interface Window {
        ethereum?: any;
    }
}

export function ReputationDashboard() {
    const { address, isConnected } = useAccount()
    const { writeContract, data: hash } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
    const [agentName, setAgentName] = useState('')

    // 1. Get Agent ID
    const { data: agentId, refetch: refetchId } = useReadContract({
        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
        functionName: 'getAgentId',
        args: [address as `0x${string}`],
        chainId: unichainSepolia.id,
        query: { enabled: !!address }
    })

    const hasIdentity = agentId && Number(agentId) > 0

    // 2. Get Agent Stats (if registered)
    const { data: totalVolume, refetch: refetchVol } = useReadContract({
        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
        functionName: 'getTotalStabilizedVolume',
        args: [agentId || 0n],
        chainId: unichainSepolia.id,
        query: { enabled: !!hasIdentity, refetchInterval: 2000 }
    })

    const { data: feedbackCount, refetch: refetchCount } = useReadContract({
        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
        functionName: 'getFeedbackCount',
        args: [agentId || 0n],
        chainId: unichainSepolia.id,
        query: { enabled: !!hasIdentity, refetchInterval: 2000 }
    })

    const { data: tokenURI, refetch: refetchURI } = useReadContract({
        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
        functionName: 'tokenURI',
        args: [agentId || 0n],
        chainId: unichainSepolia.id,
        query: { enabled: !!hasIdentity, refetchInterval: 2000 }
    })

    // Confetti & Refetch Effect
    useEffect(() => {
        if (isConfirmed) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#ec4899']
            })
            // Refetch after 2s to allow indexing
            setTimeout(() => {
                refetchId()
                refetchVol()
                refetchCount()
                refetchURI()
            }, 2000)
        }
    }, [isConfirmed, refetchId, refetchVol, refetchCount, refetchURI])

    // Parse Volume (int128 -> string)
    const displayVolume = totalVolume ? formatEther(BigInt(totalVolume)) : "0"
    const isVIP = Number(displayVolume) > 1000 // Mock VIP Threshold

    const handleRegister = async () => {
        if (!agentName) return

        try {
            // Force switch to Unichain Sepolia if needed
            await window.ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x515' }], // 1301 in hex
            }).catch(async (switchError: any) => {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await window.ethereum?.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x515',
                                chainName: 'Unichain Sepolia',
                                rpcUrls: ['https://unichain-sepolia-rpc.publicnode.com'],
                                nativeCurrency: {
                                    name: 'Ether',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://sepolia.uniscan.xyz']
                            },
                        ],
                    });
                }
            });

            writeContract({
                address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
                abi: AEGIS_GUARDIAN_REGISTRY_ABI,
                functionName: 'register',
                args: [`ipfs://${agentName}`],
                chainId: unichainSepolia.id
            })
        } catch (error) {
            console.error("Minting failed:", error)
            alert("Failed to switch network or mint. Please switch to Unichain Sepolia manually.")
        }
    }

    if (!isConnected) return null

    return (
        <div className="glass-card p-5 rounded-2xl border border-white/5 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <h2 className="text-sm font-cyber font-bold tracking-widest flex items-center gap-2 text-white">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-200 to-yellow-500">
                        GUARDIAN REPUTATION
                    </span>
                </h2>
                {hasIdentity && (
                    <div className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-mono">
                        ID: #{agentId?.toString()}
                    </div>
                )}
            </div>

            {!hasIdentity ? (
                // Registration Form
                <div className="text-center py-4">
                    <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <UserPlus className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 font-cyber">Enlist in Aegis</h3>
                    <p className="text-gray-400 text-xs mb-6 max-w-md mx-auto leading-relaxed">
                        Mint your Agent Identity (NFT) to start tracking intervention stats.
                    </p>

                    <div className="flex gap-2 max-w-xs mx-auto">
                        <input
                            type="text"
                            placeholder="CODENAME"
                            className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white w-full focus:outline-none focus:border-indigo-500 font-mono text-xs placeholder-gray-600 transition-colors"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                        />
                        <button
                            onClick={handleRegister}
                            disabled={!agentName || isConfirming}
                            className="btn-cyber bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg border border-indigo-400/30 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                        >
                            {isConfirming ? '...' : 'Mint'}
                        </button>
                    </div>
                    {isConfirmed && <p className="text-neon-green mt-2 text-[10px] font-mono">Identity Verified.</p>}
                </div>
            ) : (
                // Stats Dashboard
                <div className="grid grid-cols-2 gap-3">
                    {/* Stat Using 1 */}
                    <div className="p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-3 h-3 text-emerald-500" />
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-cyber">Stabilized Vol</span>
                        </div>
                        <div className="text-lg font-mono font-bold text-white">
                            {displayVolume} <span className="text-xs text-gray-600">ETH</span>
                        </div>
                    </div>

                    {/* Stat Using 2 */}
                    <div className="p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-3 h-3 text-blue-500" />
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-cyber">Interventions</span>
                        </div>
                        <div className="text-lg font-mono font-bold text-white">
                            {feedbackCount?.toString() || '0'}
                        </div>
                    </div>

                    {/* VIP Status */}
                    <div className="col-span-2 p-3 rounded-xl bg-linear-to-br from-[#1a1a2e]/50 to-[#16213e]/50 border border-indigo-500/20 flex items-center justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-3 relative z-10">
                            <div className={`p-2 rounded-full border ${isVIP ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-gray-800/50 border-gray-700/50'}`}>
                                <Crown className={`w-4 h-4 ${isVIP ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-gray-500'}`} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white font-cyber tracking-wide">{isVIP ? 'ELITE GUARDIAN' : 'ROOKIE OPERATOR'}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">Fee Override: <span className={`font-mono font-bold ${isVIP ? 'text-neon-green' : 'text-gray-300'}`}>{isVIP ? '0.01%' : '5.0%'}</span></div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            {isVIP ? (
                                <div className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-[9px] font-bold rounded-full border border-yellow-400/20 uppercase tracking-widest shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                                    Verified
                                </div>
                            ) : (
                                <div className="text-[9px] text-gray-600 font-mono border border-gray-800 px-2 py-0.5 rounded-full bg-black/20">
                                    Next: &gt; 1k ETH
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
