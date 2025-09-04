import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'

import SessionProvider from '@/shared/providers/SessionProvider'
import { authOptions } from '@/shared/lib/auth'
import './globals.css'

const geistSans = Inter({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'PacketWatch',
	description: '',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en">
			<body className={`${geistSans.variable} antialiased`}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	)
}
