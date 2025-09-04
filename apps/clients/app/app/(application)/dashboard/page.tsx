'use client'

import { useMemo, useState } from 'react'
import {
	Activity,
	Bell,
	CheckCircle2,
	Clock,
	Globe,
	Server,
} from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'
import UptimeSparkbar from '@/shared/components/custom/uptime/uptime-sparkbar'
import IncidentsTable from '@/shared/components/custom/uptime/incidents-table'
import MonitorsTable from '@/shared/components/custom/uptime/monitors-table'
import { formatMs, formatPct } from '@/shared/lib/format'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter as DialogFooterBase,
	DialogHeader,
	DialogTitle,
} from '@/shared/components/ui/dialog'
import { Checkbox } from '@/shared/components/ui/checkbox'

type RangeKey = '24h' | '7d' | '30d' | '90d'
type Status = 'operational' | 'degraded' | 'outage'

export default function Page() {
	const [range] = useState<RangeKey>('30d')
	const [regionsOpen, setRegionsOpen] = useState(false)
	const [selectedRegions, setSelectedRegions] = useState<string[]>([])
	const [confirmedRegionRows, setConfirmedRegionRows] = useState<
		{ code: string; latency: number; status: Status }[]
	>(() => {
		const code = 'eu-west'
		const lat = seededLatency(code)
		return [{ code, latency: lat, status: deriveStatus(lat) as Status }]
	})

	const overview = useMemo(
		() => ({
			status: 'operational' as Status,
			uptimePct: 99.9823,
			avgRespMs: 184,
			incidents: 1,
		}),
		[]
	)

	const uptimeSeries = useMemo(() => makeUptimeSeries(range), [range])

	const regionOptions = useMemo(
		() => [
			{ code: 'us-east', name: 'US-East', flag: '🇺🇸' },
			{ code: 'us-west', name: 'US-West', flag: '🇺🇸' },
			{ code: 'eu-west', name: 'EU-West', flag: '🇪🇺' },
			{ code: 'eu-central', name: 'EU-Central', flag: '🇪🇺' },
			{ code: 'ap-south', name: 'AP-South', flag: '🇮🇳' },
			{ code: 'ap-northeast', name: 'AP-Northeast', flag: '🇯🇵' },
			{ code: 'sa-east', name: 'SA-East', flag: '🇧🇷' },
			{ code: 'au-east', name: 'AU-East', flag: '🇦🇺' },
		],
		[]
	)

	function toggleRegion(code: string, checked: boolean) {
		setSelectedRegions((prev) =>
			checked
				? Array.from(new Set([...prev, code]))
				: prev.filter((c) => c !== code)
		)
	}

	function openRegionsModal() {
		setSelectedRegions(confirmedRegionRows.map((r) => r.code))
		setRegionsOpen(true)
	}

	function confirmRegions() {
		const rows = selectedRegions.map((code) => {
			const lat = seededLatency(code)
			return { code, latency: lat, status: deriveStatus(lat) as Status }
		})
		setConfirmedRegionRows(rows)
		setRegionsOpen(false)
	}

	return (
		<>
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="lg:col-span-2">
					<CardHeader className="pb-2">
						<CardTitle className="text-base flex items-center gap-2">
							<Activity className="h-4 w-4" />
							PacketWatch
						</CardTitle>
						<CardDescription>Last {range}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="text-2xl font-semibold">
							{formatPct(overview.uptimePct)}
						</div>
						<div className="text-sm text-muted-foreground">
							Target 99.95% SLO
						</div>
						<div className="mt-2">
							<UptimeSparkbar data={uptimeSeries} />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-base flex items-center gap-2">
							<CheckCircle2 className="h-4 w-4 text-emerald-600" />
							Current Status
						</CardTitle>
						<CardDescription>Live overview</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-lg font-medium">
							{overview.status === 'operational' && (
								<span className="text-emerald-700">
									All systems operational
								</span>
							)}
							{overview.status === 'degraded' && (
								<span className="text-amber-700">Degraded performance</span>
							)}
							{overview.status === 'outage' && (
								<span className="text-red-700">Major outage</span>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-base flex items-center gap-2">
							<Clock className="h-4 w-4" />
							Avg Response
						</CardTitle>
						<CardDescription>Last {range}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-semibold">
							{formatMs(overview.avgRespMs)}
						</div>
						<div className="text-sm text-muted-foreground">
							p95 typically ~420ms
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="mt-6 grid gap-6 lg:grid-cols-4">
				<Card className="lg:col-span-4 flex flex-col h-full">
					<CardHeader className="pb-2">
						<CardTitle className="text-base flex items-center gap-2">
							<Globe className="h-4 w-4" />
							Regions
						</CardTitle>
						<CardDescription>Today</CardDescription>
					</CardHeader>

					<CardContent className="space-y-3 flex-1">
						{confirmedRegionRows.length > 0 ? (
							confirmedRegionRows.map((r) => {
								const meta = regionOptions.find((o) => o.code === r.code)
								const name = meta?.name ?? r.code
								return (
									<div
										key={r.code}
										className="flex items-center justify-between rounded-md border p-3"
									>
										<div className="flex items-center gap-2">
											<span
												className={
													r.status === 'operational'
														? 'h-2.5 w-2.5 rounded-full bg-emerald-500'
														: r.status === 'degraded'
															? 'h-2.5 w-2.5 rounded-full bg-amber-500'
															: 'h-2.5 w-2.5 rounded-full bg-red-500'
												}
												aria-hidden
											/>
											<div className="font-medium">{name}</div>
										</div>
										<div className="text-sm text-muted-foreground">
											{formatMs(r.latency)}
										</div>
									</div>
								)
							})
						) : (
							<div className="text-xs text-muted-foreground">
								No regions selected.
							</div>
						)}
					</CardContent>

					<CardFooter className="pt-2 mt-auto">
						<Button
							className="w-full bg-transparent"
							variant="outline"
							onClick={openRegionsModal}
						>
							{confirmedRegionRows.length > 0
								? 'Manage regions'
								: 'Select regions'}
						</Button>
					</CardFooter>
				</Card>
			</section>

			<section className="mt-6">
				<Tabs defaultValue="monitors" className="w-full">
					<TabsList>
						<TabsTrigger value="monitors" className="gap-2">
							<Server className="h-4 w-4" />
							Monitors
						</TabsTrigger>
						<TabsTrigger value="incidents" className="gap-2">
							<Bell className="h-4 w-4" />
							Incidents
						</TabsTrigger>
					</TabsList>
					<TabsContent value="monitors">
						<MonitorsTable />
					</TabsContent>
					<TabsContent value="incidents">
						<IncidentsTable range={range} />
					</TabsContent>
				</Tabs>
			</section>

			<Dialog open={regionsOpen} onOpenChange={setRegionsOpen}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Select regions for pings</DialogTitle>
						<DialogDescription>
							Choose one or more regions to run pings from.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-3 max-h-[50vh] overflow-auto pr-1">
						{regionOptions.map((r) => {
							const checked = selectedRegions.includes(r.code)
							const isOnlySelected = checked && selectedRegions.length === 1
							return (
								<label
									key={r.code}
									className="flex items-center justify-between rounded-md border p-3 gap-3 cursor-pointer"
									htmlFor={`reg-${r.code}`}
								>
									<div className="flex items-center gap-3">
										<span className="text-lg leading-none" aria-hidden>
											{r.flag}
										</span>
										<div className="font-medium">{r.name}</div>
									</div>
									<Checkbox
										id={`reg-${r.code}`}
										checked={checked}
										disabled={isOnlySelected}
										aria-disabled={isOnlySelected}
										onCheckedChange={(v) => {
											const next = Boolean(v)
											if (!next && isOnlySelected) return
											toggleRegion(r.code, next)
										}}
										aria-label={`Select ${r.name}`}
									/>
								</label>
							)
						})}
					</div>

					<p className="text-xs text-muted-foreground">
						At least one region must remain selected.
					</p>

					<DialogFooterBase className="gap-2">
						<Button variant="ghost" onClick={() => setRegionsOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={confirmRegions}
							disabled={selectedRegions.length === 0}
						>
							Confirm pings from{' '}
							{selectedRegions.length > 0
								? `${selectedRegions.length} selected`
								: 'regions'}
						</Button>
					</DialogFooterBase>
				</DialogContent>
			</Dialog>
		</>
	)
}

// Deterministic latency per region code for consistent UI
function seededLatency(code: string) {
	let h = 0
	for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0
	const base = 140 // base ms
	const span = 220 // max additional ms
	return Math.round(base + (h % span)) // 140..360ms
}

function deriveStatus(lat: number): Status {
	if (lat < 220) return 'operational'
	if (lat < 280) return 'degraded'
	return 'outage'
}

// Deterministic seeded PRNG helpers to avoid SSR/client mismatch
function xmur3(str: string) {
	let h = 1779033703 ^ str.length
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
		h = (h << 13) | (h >>> 19)
	}
	return () => {
		h = Math.imul(h ^ (h >>> 16), 2246822507)
		h = Math.imul(h ^ (h >>> 13), 3266489909)
		return (h ^= h >>> 16) >>> 0
	}
}

function mulberry32(a: number) {
	return () => {
		let t = (a += 0x6d2b79f5)
		t = Math.imul(t ^ (t >>> 15), t | 1)
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

// Helpers to synthesize demo series (deterministic)
function makeUptimeSeries(range: RangeKey) {
	const n =
		range === '24h' ? 24 : range === '7d' ? 7 : range === '30d' ? 30 : 30
	// Seed based on range so SSR and client match
	const seed = xmur3(`uptime-${range}`)()
	const rand = mulberry32(seed)

	return Array.from({ length: n }).map((_, i) => {
		const dip = rand() < 0.08
		const pct = dip ? 98.5 + rand() * 1.2 : 99.9 - rand() * 0.08
		return {
			label: range === '24h' ? `${i}:00` : `D${i + 1}`,
			uptime: +pct.toFixed(3),
		}
	})
}
