import { SiteLocation } from '@packetwatch/shared-types'
import { create } from 'zustand'

interface SiteSelectorState {
	locations: SiteLocation[]
	selected: string
	addLocations: (newLocations?: SiteLocation[]) => void
	addLocation: (newLocation?: SiteLocation) => void
}

export const useSiteSelector = create<SiteSelectorState>((set) => ({
	locations: [],
	selected: '',
	addLocations: (newLocations?: SiteLocation[]) => {
		if (!newLocations) return
		set(({ locations }) => ({ locations: [...locations, ...newLocations] }))
	},
	addLocation: (newLocation?: SiteLocation) => {
		if (!newLocation) return
		set(({ locations }) => ({ locations: [...locations, newLocation] }))
	},
}))
