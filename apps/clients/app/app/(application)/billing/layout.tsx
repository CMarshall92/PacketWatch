import type { Metadata } from 'next'

import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar'
import { SideNavigation } from '@/shared/components/custom/SideNavigation'
import { PageHeader } from '@/shared/components/custom/PageHeader'

export const metadata: Metadata = {
	title: 'PacketWatch - Billing',
	description: '',
}

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider>
			<SideNavigation />
			<SidebarInset>
				<PageHeader title="Billing" />

				<main className="flex-1 p-4 md:p-6 lg:p-8 scroll-smooth space-y-6">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
