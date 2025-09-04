'use client'

import { useMemo, useState } from 'react'
import {
	MoreHorizontal,
	Plus,
	ArrowUp,
	ArrowDown,
	ArrowUpDown,
} from 'lucide-react'

import { Badge } from '@/shared/components/ui/badge'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/components/ui/dialog'

type Status = 'up' | 'degraded' | 'down'

type Monitor = {
	id: string
	name: string
	endpoint: string
	status: Status
	uptime: number
	p95: number
	lastCheck: string // e.g. "2m ago"
}

const data: Monitor[] = [
	{
		id: 'mon-1',
		name: 'API - Health',
		endpoint: 'https://api.example.com/health',
		status: 'up',
		uptime: 99.99,
		p95: 402,
		lastCheck: '2m ago',
	},
	{
		id: 'mon-2',
		name: 'Checkout - POST /api/checkout',
		endpoint: 'https://api.example.com/checkout',
		status: 'degraded',
		uptime: 99.78,
		p95: 782,
		lastCheck: '1m ago',
	},
	{
		id: 'mon-3',
		name: 'Marketing - /',
		endpoint: 'https://www.example.com/',
		status: 'up',
		uptime: 99.97,
		p95: 268,
		lastCheck: '1m ago',
	},
]

type SortKey = 'name' | 'endpoint' | 'status' | 'uptime' | 'p95' | 'lastCheck'
type SortDir = 'asc' | 'desc'

function statusRank(s: Status) {
	// Higher is better (up > degraded > down)
	return s === 'up' ? 2 : s === 'degraded' ? 1 : 0
}

function parseLastCheckToMinutes(v: string) {
	// Supports "Xs ago", "Xm ago", "Xh ago", "Xd ago"
	const m = v.trim().match(/^(\d+)\s*([smhd])\s*ago$/i)
	if (!m) return Number.POSITIVE_INFINITY
	const n = Number(m[1])
	const unit = m[2].toLowerCase()
	if (unit === 's') return n / 60
	if (unit === 'm') return n
	if (unit === 'h') return n * 60
	if (unit === 'd') return n * 60 * 24
	return Number.POSITIVE_INFINITY
}

export default function MonitorsTable() {
	const [addOpen, setAddOpen] = useState(false)
	const [sortKey, setSortKey] = useState<SortKey>('name')
	const [sortDir, setSortDir] = useState<SortDir>('asc')
	const [query, setQuery] = useState('')

	function requestSort(key: SortKey) {
		if (key === sortKey) {
			setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
		} else {
			setSortKey(key)
			setSortDir('asc')
		}
	}

	const sorted = useMemo(() => {
		const q = query.trim().toLowerCase()
		const arr = data
			.filter((m) => {
				if (!q) return true
				return (
					m.name.toLowerCase().includes(q) ||
					m.endpoint.toLowerCase().includes(q)
				)
			})
			.slice()

		arr.sort((a, b) => {
			let cmp = 0
			switch (sortKey) {
				case 'name':
					cmp = a.name.localeCompare(b.name)
					break
				case 'endpoint':
					cmp = a.endpoint.localeCompare(b.endpoint)
					break
				case 'status':
					cmp = statusRank(a.status) - statusRank(b.status)
					break
				case 'uptime':
					cmp = a.uptime - b.uptime
					break
				case 'p95':
					cmp = a.p95 - b.p95
					break
				case 'lastCheck':
					cmp =
						parseLastCheckToMinutes(a.lastCheck) -
						parseLastCheckToMinutes(b.lastCheck)
					break
			}
			return sortDir === 'asc' ? cmp : -cmp
		})

		return arr
	}, [query, sortKey, sortDir])

	// eslint-disable-next-line react/no-unstable-nested-components
	const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) =>
		active ? (
			dir === 'asc' ? (
				<ArrowUp className="h-3.5 w-3.5" />
			) : (
				<ArrowDown className="h-3.5 w-3.5" />
			)
		) : (
			<ArrowUpDown className="h-3.5 w-3.5 opacity-60" />
		)

	// eslint-disable-next-line react/no-unstable-nested-components
	function HeaderSortButton({
		label,
		column,
	}: {
		label: string
		column: SortKey
	}) {
		const active = sortKey === column
		return (
			<div className="inline-flex items-center">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="h-8 -mx-2 px-2 gap-1"
					onClick={() => requestSort(column)}
					aria-label={`Sort by ${label}`}
					aria-pressed={active}
				>
					<span>{label}</span>
					<SortIcon active={active} dir={sortDir} />
				</Button>
				<span className="sr-only" aria-live="polite">
					{active ? `Sorted by ${label} ${sortDir}` : ''}
				</span>
			</div>
		)
	}

	return (
		<Card className="mt-4">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between gap-2">
					<CardTitle className="text-base">Monitors</CardTitle>
					<div className="flex items-center gap-2">
						<Input
							placeholder="Search monitors..."
							aria-label="Search monitors"
							className="w-[200px] hidden md:block"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<Button
							className="gap-2"
							variant="default"
							onClick={() => setAddOpen(true)}
						>
							<Plus className="h-4 w-4" />
							Add Monitor
						</Button>
					</div>
				</div>
			</CardHeader>

			{/* Empty Add Monitor modal */}
			<Dialog open={addOpen} onOpenChange={setAddOpen}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Add monitor</DialogTitle>
						<DialogDescription>{''}</DialogDescription>
					</DialogHeader>
					{/* Intentionally empty for now */}
				</DialogContent>
			</Dialog>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								aria-sort={
									sortKey === 'name'
										? sortDir === 'asc'
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<HeaderSortButton label="Name" column="name" />
							</TableHead>
							<TableHead
								className="hidden md:table-cell"
								aria-sort={
									sortKey === 'endpoint'
										? sortDir === 'asc'
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<HeaderSortButton label="Endpoint" column="endpoint" />
							</TableHead>
							<TableHead
								aria-sort={
									sortKey === 'status'
										? sortDir === 'asc'
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<HeaderSortButton label="Status" column="status" />
							</TableHead>
							<TableHead
								aria-sort={
									sortKey === 'uptime'
										? sortDir === 'asc'
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<HeaderSortButton label="Uptime" column="uptime" />
							</TableHead>
							<TableHead
								aria-sort={
									sortKey === 'p95'
										? sortDir === 'asc'
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<HeaderSortButton label="p95" column="p95" />
							</TableHead>
							<TableHead
								className="hidden md:table-cell"
								aria-sort={
									sortKey === 'lastCheck'
										? sortDir === 'asc'
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<HeaderSortButton label="Last check" column="lastCheck" />
							</TableHead>
							<TableHead className="w-10"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sorted.map((m) => (
							<TableRow key={m.id}>
								<TableCell className="font-medium">{m.name}</TableCell>
								<TableCell className="hidden md:table-cell text-muted-foreground">
									{m.endpoint}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span
											className={
												m.status === 'up'
													? 'h-2.5 w-2.5 rounded-full bg-emerald-500'
													: m.status === 'degraded'
														? 'h-2.5 w-2.5 rounded-full bg-amber-500'
														: 'h-2.5 w-2.5 rounded-full bg-red-500'
											}
										/>
										<span className="capitalize">{m.status}</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="secondary">{m.uptime.toFixed(2)}%</Badge>
								</TableCell>
								<TableCell>{m.p95}ms</TableCell>
								<TableCell className="hidden md:table-cell text-muted-foreground">
									{m.lastCheck}
								</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												aria-label="Open menu"
											>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>View details</DropdownMenuItem>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem className="text-red-600">
												Disable
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
						{sorted.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center text-muted-foreground"
								>
									No monitors match your search.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
