'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User, CreditCard, LogOut, LayoutDashboard } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'

export const NavigationUserDropdown = () => {
	const { data: session } = useSession()

	return (
		<div className="ml-auto flex items-center gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full"
						aria-label="Open user menu"
					>
						<Image
							src={session?.user?.image ?? ''}
							alt="User avatar"
							width={28}
							height={28}
							className="rounded-full border"
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{session?.user?.name}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{session?.user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Link href="/dashboard" className="flex flex-row align-center">
							<LayoutDashboard className="mr-2 h-4 w-4" />
							<span>Dashboard</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/profile" className="flex flex-row align-center">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/billing" className="flex flex-row align-center">
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => signOut()}
						className="text-red-600 focus:text-red-600"
					>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
