'use client'

import { Separator } from '@/shared/components/ui/separator'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { NavigationUserDropdown } from '@/shared/components/custom/UserDropdown'

interface PageHeaderProps {
	title: string
}

export function PageHeader({ title }: PageHeaderProps) {
	return (
		<>
			<SidebarTrigger />
			<Separator orientation="vertical" className="mx-1 h-6" />
			<h1 className="text-sm font-medium">{title}</h1>
			<NavigationUserDropdown />
		</>
	)
}
