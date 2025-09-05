import { SiteLocation } from '@packetwatch/shared-types'
import { create } from 'zustand'

interface SiteSelectorState {
	locations: SiteLocation[]
	addLocations: (newLocations?: SiteLocation[]) => void
	addLocation: (newLocation?: SiteLocation) => void
	selected: string
	setSelectedLocation: (locationSlug?: string) => void
	isFetched: boolean
	toggleIsFetched: () => void
}

export const useSiteSelector = create<SiteSelectorState>((set) => ({
	locations: [],
	selected: '',
	isFetched: false,
	toggleIsFetched: () => {
		set((state) => ({ isFetched: !state.isFetched }))
	},
	setSelectedLocation: (locationSlug?: string) => {
		if (!locationSlug) return
		set(() => ({ selected: locationSlug }))
	},
	addLocations: (newLocations?: SiteLocation[]) => {
		if (!newLocations) return
		set(({ locations }) => ({ locations: [...locations, ...newLocations] }))
	},
	addLocation: (newLocation?: SiteLocation) => {
		if (!newLocation) return
		set(({ locations }) => ({ locations: [...locations, newLocation] }))
	},
}))
