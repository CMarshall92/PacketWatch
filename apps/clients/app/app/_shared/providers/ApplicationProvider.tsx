'use client'

import { SiteLocationResponse } from '@packetwatch/shared-types'
import { clientFetcher } from '@packetwatch/ui/client'
import { Session } from 'next-auth'
import { ReactNode, useEffect } from 'react'
import { useSiteSelector } from '../stores/useSiteSelector'

interface ApplicationProviderProps {
	children: ReactNode
	session: Session | null
}

const fetchSiteLocations = async (
	session: Session | null
): Promise<SiteLocationResponse | undefined> => {
	const response = await clientFetcher<SiteLocationResponse>(
		`${process.env.NEXT_PUBLIC_API_BASEURL}/monitors/all?userId=${session?.user?.id}`
	)

	return response.data
}

export const ApplicationProvider = ({
	children,
	session,
}: ApplicationProviderProps) => {
	const { addLocations, setSelectedLocation, toggleIsFetched } =
		useSiteSelector()

	useEffect(() => {
		const fetch = async () => {
			const locations = await fetchSiteLocations(session)
			toggleIsFetched()
			setSelectedLocation(locations?.selected)
			addLocations(locations?.locations)
		}
		fetch()
	}, [])

	return children
}
