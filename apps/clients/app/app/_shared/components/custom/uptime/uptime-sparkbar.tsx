'use client'

type Point = { label: string; uptime: number }

export default function UptimeSparkbar({
	data = [],
	height = 80,
}: {
	data?: Point[]
	height?: number
}) {
	// Normalize by the range so small changes are visible
	const width = 600 // viewBox width; SVG scales responsively
	const vals = data.map((d) => d.uptime)
	const min = Math.min(99, Math.min(...vals, 100))
	const max = Math.max(min + 0.01, Math.max(...vals, 100))

	const n = Math.max(1, data.length)
	const gap = 2
	const barWidth = Math.max(1, (width - gap * (n - 1)) / n)

	return (
		<div className="w-full">
			<svg
				viewBox={`0 0 ${width} ${height}`}
				className="w-full h-[80px]"
				role="img"
				aria-label="Uptime spark bars"
			>
				{/* Baseline at 100% */}
				<line x1={0} y1={0.5} x2={width} y2={0.5} stroke="hsl(0 0% 90%)" />

				{data.map((d, i) => {
					const x = i * (barWidth + gap)
					// Normalize to [0..1], then invert to SVG Y
					const t = (d.uptime - min) / (max - min || 1)
					const h = Math.max(2, t * (height - 6))
					const y = height - h
					const color =
						d.uptime >= 99.9
							? 'hsl(142 71% 45%)'
							: d.uptime >= 99.5
								? 'hsl(38 92% 50%)'
								: 'hsl(0 84% 60%)'
					return (
						<rect
							key={d.label}
							x={x}
							y={y}
							width={barWidth}
							height={h}
							rx={2}
							ry={2}
							fill={color}
						/>
					)
				})}
			</svg>
		</div>
	)
}
