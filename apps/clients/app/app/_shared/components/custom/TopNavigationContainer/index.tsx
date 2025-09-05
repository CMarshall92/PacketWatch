export const TopNavigationContainer = ({
	children,
	navigationChildren,
}: {
	navigationChildren: React.ReactNode
	children: React.ReactNode
}) => {
	return (
		<div className="flex flex-col h-screen">
			<div className="z-50 sticky top-0 flex flex-row bg-white p-2 border-b items-center">
				{navigationChildren}
			</div>

			<main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 pb-24">
				{children}
			</main>
		</div>
	)
}
