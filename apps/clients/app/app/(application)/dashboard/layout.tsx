import type { Metadata } from 'next'

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/shared/components/ui/sidebar'
import { NavigationUserDropdown } from '@/shared/components/custom/UserDropdown'
import { SideNavigation } from '@/shared/components/custom/SideNavigation'
import { SiteSelector } from '@/shared/components/custom/SiteSelector'
import { TopNavigationContainer } from '@/shared/components/custom/TopNavigationContainer'

export const metadata: Metadata = {
	title: 'PacketWatch - Dashboard',
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
					navigationChildren={
						<>
							<SidebarTrigger />
							<SiteSelector />
							<NavigationUserDropdown />
						</>
					}
				>
					{children}
				</TopNavigationContainer>
			</SidebarInset>
		</SidebarProvider>
	)
}
