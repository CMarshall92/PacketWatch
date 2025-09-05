import type { Metadata } from 'next'

import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar'
import { SideNavigation } from '@/shared/components/custom/SideNavigation'
import { PageHeader } from '@/shared/components/custom/PageHeader'
import { TopNavigationContainer } from '@/shared/components/custom/TopNavigationContainer'

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
				<TopNavigationContainer
					navigationChildren={<PageHeader title="Billing" />}
				>
					{children}
				</TopNavigationContainer>
			</SidebarInset>
		</SidebarProvider>
	)
}
