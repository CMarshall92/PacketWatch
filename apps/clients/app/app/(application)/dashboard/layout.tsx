import type { Metadata } from 'next'

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/shared/components/ui/sidebar'
import { NavigationUserDropdown } from '@/shared/components/custom/UserDropdown'
import { SideNavigation } from '@/shared/components/custom/SideNavigation'
import { SiteSelector } from '@/shared/components/custom/SiteSelector'

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
				<header className="flex h-14 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					<SiteSelector />
					<NavigationUserDropdown />
				</header>

				<main className="flex-1 p-4 md:p-6 lg:p-8 scroll-smooth space-y-6">
					{/* {locations.length === 0 ? <OnboardingSteps /> : children} */}
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
