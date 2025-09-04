import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { authOptions } from '@/shared/lib/auth'

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const headersList = await headers()
	const pathname = headersList.get('x-pathname')

	const session = await getServerSession(authOptions)
	if (!session && !['/'].includes(pathname ?? '')) {
		redirect('/')
	}

	return children
}
