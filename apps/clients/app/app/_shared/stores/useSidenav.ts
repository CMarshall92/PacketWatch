import { create } from 'zustand'

interface SidenavState {
	isOpen: boolean
	toggleIsOpen: (newState: boolean) => void
}

export const useSidenav = create<SidenavState>((set) => ({
	isOpen: true,
	toggleIsOpen: (newState: boolean) => {
		set(() => ({ isOpen: newState }))
	},
}))
