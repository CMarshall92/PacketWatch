import type { Metadata } from 'next'

import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar'
import { SideNavigation } from '@/shared/components/custom/SideNavigation'
import { PageHeader } from '@/shared/components/custom/PageHeader'
import { TopNavigationContainer } from '@/shared/components/custom/TopNavigationContainer'

export const metadata: Metadata = {
	title: 'PacketWatch - Profile',
	description: '',
}

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const sections = [
		{ id: 'account', title: 'Account', icon: 'User', useScrollTo: true },
		{ id: 'security', title: 'Security', icon: 'Shield', useScrollTo: true },
		{
			id: 'preferences',
			title: 'Preferences',
			icon: 'SlidersHorizontal',
			useScrollTo: true,
		},
	]

	return (
		<SidebarProvider>
			<SideNavigation sections={sections} />
			<SidebarInset>
				<TopNavigationContainer
					navigationChildren={<PageHeader title="Profile" />}
				>
					{children}
				</TopNavigationContainer>
			</SidebarInset>
		</SidebarProvider>
	)
}
