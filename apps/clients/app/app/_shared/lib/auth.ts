import type { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Discord from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth',
	},
	session: {
		strategy: 'jwt',
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			// Optional: ask consent every time during dev
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID ?? '',
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
		}),
		Discord({
			clientId: process.env.DISCORD_CLIENT_ID ?? '',
			clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Always land users on the dashboard after auth unless an absolute URL was requested
			if (url.startsWith('/')) return `${baseUrl}${url}`
			if (new URL(url).origin === baseUrl) return url
			return `${baseUrl}/dashboard`
		},
	},
}
