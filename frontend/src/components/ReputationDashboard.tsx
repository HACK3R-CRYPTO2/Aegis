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
        query: { enabled: !!hasIdentity }
    })

    const { data: feedbackCount, refetch: refetchCount } = useReadContract({
        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
        functionName: 'getFeedbackCount',
        args: [agentId || 0n],
        chainId: unichainSepolia.id,
        query: { enabled: !!hasIdentity }
    })

    const { data: tokenURI, refetch: refetchURI } = useReadContract({
        address: DEPLOYED_ADDRESSES.GUARDIAN_REGISTRY as `0x${string}`,
        abi: AEGIS_GUARDIAN_REGISTRY_ABI,
        functionName: 'tokenURI',
        args: [agentId || 0n],
        chainId: unichainSepolia.id,
        query: { enabled: !!hasIdentity }
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
        <div className="p-6 rounded-2xl bg-[#0f0f13] border border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold tracking-wider flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    GUARDIAN REPUTATION
                </h2>
                {hasIdentity && (
                    <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-900/50 text-indigo-400 border border-indigo-500/30">
                        ID: #{agentId?.toString()}
                    </div>
                )}
            </div>

            {!hasIdentity ? (
                // Registration Form
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Become a Guardian</h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                        Mint your Agent Identity (NFT) to start tracking your heroic interventions during market crashes.
                    </p>

                    <div className="flex gap-2 max-w-xs mx-auto">
                        <input
                            type="text"
                            placeholder="Agent Name (e.g. AlphaOne)"
                            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-indigo-500"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                        />
                        <button
                            onClick={handleRegister}
                            disabled={!agentName || isConfirming}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isConfirming ? 'Minting...' : 'Mint'}
                        </button>
                    </div>
                    {isConfirmed && <p className="text-green-500 mt-4 text-sm">Minted Successfully! Refreshing...</p>}
                </div>
            ) : (
                // Stats Dashboard
                <div className="grid grid-cols-2 gap-4">
                    {/* Stat Using 1 */}
                    <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold text-gray-500 uppercase">Stabilized Vol</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white">
                            {displayVolume} ETH
                        </div>
                    </div>

                    {/* Stat Using 2 */}
                    <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold text-gray-500 uppercase">Interventions</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white">
                            {feedbackCount?.toString() || '0'}
                        </div>
                    </div>

                    {/* VIP Status */}
                    <div className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-indigo-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Crown className={`w-6 h-6 ${isVIP ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                            <div>
                                <div className="text-sm font-bold text-white">{isVIP ? 'VIP GUARDIAN' : 'ROOKIE AGENT'}</div>
                                <div className="text-xs text-gray-400">Current Tax: <span className="text-white font-mono">{isVIP ? '0.01%' : '5.00%'}</span></div>
                            </div>
                        </div>
                        {isVIP ? (
                            <div className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-xs font-bold rounded-full border border-yellow-400/20">
                                ACTIVE
                            </div>
                        ) : (
                            <div className="text-xs text-gray-500">
                                Need &gt; 1000 ETH Vol
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
