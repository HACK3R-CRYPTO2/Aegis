'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './lib/config'
import { useState } from 'react'
import { PriceProvider } from './lib/PriceContext'

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <PriceProvider>
                    {children}
                </PriceProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
