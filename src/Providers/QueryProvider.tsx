'use client';

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const QueryProvider = ({ children }: any) => {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{
					children
				}
			</QueryClientProvider>
		</>
	)
}
