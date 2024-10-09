"use client";
import Sidebar from '@/app/components/Sidebar';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'

const Auth = ({ children }: any) => {
	return (
		<>
			<SessionProvider>
				<Sidebar>
					{
						children
					}
				</Sidebar>
			</SessionProvider>
		</>
	)
}

export default Auth