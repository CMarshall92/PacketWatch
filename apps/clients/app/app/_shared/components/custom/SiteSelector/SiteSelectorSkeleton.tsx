import { Skeleton, SVGSkeleton } from '../Skeleton'

export const SiteSelectorSkeleton = () => {
	return (
		<>
			<div className="inline-flex items-center [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive h-9 px-4 py-2 has-[&gt;svg]:px-3 gap-2 w-[200px] justify-start">
				<SVGSkeleton className="rounded w-[20px] h-[20px]" />
				<span>
					<Skeleton className="w-[128px] max-w-full" />
				</span>
				<SVGSkeleton className="ml-auto w-[24px] h-[24px]" />
			</div>
		</>
	)
}
