'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'

type ProviderAvailability = {
	google?: boolean
	github?: boolean
	discord?: boolean
}

export function SignInCard({
	providers = { google: true, github: true, discord: true },
	callbackUrl = '/dashboard',
}: {
	providers?: ProviderAvailability
	callbackUrl?: string
}) {
	return (
		<div className="space-y-4">
			<Button
				variant="outline"
				className="w-full justify-start gap-3 bg-white"
				disabled={!providers.google}
				onClick={() => signIn('google', { callbackUrl })}
				aria-label="Continue with Google"
			>
				<span>Continue with Google</span>
			</Button>

			<Button
				variant="outline"
				className="w-full justify-start gap-3 bg-white"
				disabled={!providers.github}
				onClick={() => signIn('github', { callbackUrl })}
				aria-label="Continue with GitHub"
			>
				<span>Continue with GitHub</span>
			</Button>

			<Button
				variant="outline"
				className="w-full justify-start gap-3 bg-white"
				disabled={!providers.discord}
				onClick={() => signIn('discord', { callbackUrl })}
				aria-label="Continue with Discord"
			>
				<span>Continue with Discord</span>
			</Button>

			<Separator className="my-4" />

			<p className="text-center text-xs text-muted-foreground">
				By continuing, you agree to the Terms and acknowledge the Privacy
				Policy.
			</p>
		</div>
	)
}
