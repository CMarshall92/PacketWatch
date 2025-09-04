import { Activity } from 'lucide-react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/shared/lib/auth'
import { SignInCard } from '@/shared/components/custom/SigninCard'

export default async function AuthPage() {
	const session = await getServerSession(authOptions)
	if (session) {
		redirect('/dashboard')
	}

	// Detect which providers are configured so we can enable/disable buttons
	const providers = {
		google: Boolean(
			process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
		),
		github: Boolean(
			(process.env.GITHUB_CLIENT_ID || process.env.GITHUB_ID) &&
				(process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET)
		),
		discord: Boolean(
			process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET
		),
	}

	return (
		<div className="flex min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
			{/* Login Form Section - This is the main content area for the user. */}
			<div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
				<header className="flex items-center justify-center gap-3 p-6">
					<div className="flex items-center gap-2 text-emerald-700">
						<Activity className="h-5 w-5" />
						<span className="text-base font-semibold">PacketWatch</span>
					</div>
				</header>

				<div className="w-full max-w-sm">
					<div className="mb-8 text-center">
						<h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
						<p className="text-gray-500">
							Sign in to your account to continue.
						</p>
					</div>

					<SignInCard providers={providers} callbackUrl="/" />
				</div>
			</div>

			<div className="relative hidden md:block w-1/2">
				<Image
					src="https://unsplash.com/photos/Jn2EaLLYZfY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGdsb2JlfGVufDB8fHx8MTc1NTM3NzYwN3wy&force=true&w=1920"
					alt="A minimalistic view of a mountain"
					className="absolute inset-0 h-full w-full object-cover"
					width={1280}
					height={720}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-20" />
			</div>
		</div>
	)
}
