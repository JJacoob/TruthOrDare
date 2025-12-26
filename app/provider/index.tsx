"use client";

import { ProviderProps } from '@/typings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function QueryProvider({ children }: ProviderProps) {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}