import { Skeleton, SVGSkeleton } from '../Skeleton'

export const SideNavigationSkeleton = () => {
	return (
		<>
			<div className="relative flex w-full min-w-0 flex-col p-2">
				<div className="flex h-8 shrink-0 items-center px-2 outline-hidden [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0">
					<Skeleton className="w-[72px] max-w-full" />
				</div>
				<div className="w-full">
					<ul className="flex w-full min-w-0 flex-col gap-1">
						<li className="relative">
							<a className="flex w-full items-center gap-2 p-2 text-left outline-hidden [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 h-8">
								<SVGSkeleton className="mr-2 w-[24px] h-[24px]" />
								<span>
									<Skeleton className="w-[64px] max-w-full" />
								</span>
							</a>
						</li>
						<li className="relative">
							<a className="flex w-full items-center gap-2 p-2 text-left outline-hidden [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 h-8">
								<SVGSkeleton className="mr-2 w-[24px] h-[24px]" />
								<span>
									<Skeleton className="w-[64px] max-w-full" />
								</span>
							</a>
						</li>
						<li className="relative">
							<a className="flex w-full items-center gap-2 p-2 text-left outline-hidden [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 h-8">
								<SVGSkeleton className="mr-2 w-[24px] h-[24px]" />
								<span>
									<Skeleton className="w-[72px] max-w-full" />
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}
