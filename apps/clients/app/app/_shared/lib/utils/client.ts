'use client'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getDomainWithProtocol = (value: string) => {
	// Trim leading/trailing spaces
	const trimmed = value.trim()

	// Only match domains (with optional subdomains, no path/query/hash)
	const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/

	// Remove http(s):// if present for validation
	const withoutProtocol = trimmed.replace(/^https?:\/\//, '')

	if (domainRegex.test(withoutProtocol)) {
		// Add http:// only if missing
		return /^https?:\/\//.test(trimmed) ? trimmed : `http://${withoutProtocol}`
	}

	return trimmed // Return as-is if not just a domain
}
