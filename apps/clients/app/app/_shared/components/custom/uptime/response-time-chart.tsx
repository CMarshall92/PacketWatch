"use client"

type Point = { label: string; avg: number; p95: number }

function toPath(points: number[], width: number, height: number, maxY: number) {
  if (!points.length) return ""
  const n = points.length
  const stepX = n > 1 ? width / (n - 1) : 0
  return points
    .map((y, i) => {
      const xPos = i * stepX
      const yNorm = maxY === 0 ? 0 : Math.min(1, Math.max(0, y / maxY))
      const yPos = height - yNorm * height
      return `${i === 0 ? "M" : "L"} ${xPos.toFixed(2)} ${yPos.toFixed(2)}`
    })
    .join(" ")
}

export default function ResponseTimeChart({
  data = [],
  height = 260,
}: {
  data?: Point[]
  height?: number
}) {
  const width = 800 // viewBox width; SVG is responsive and scales to its container
  const maxY = Math.max(1, ...data.map((d) => Math.max(d.avg, d.p95)))
  const avgPath = toPath(
    data.map((d) => d.avg),
    width,
    height,
    maxY,
  )
  const p95Path = toPath(
    data.map((d) => d.p95),
    width,
    height,
    maxY,
  )

  // Build subtle vertical grid lines
  const gridCount = 6
  const gridXs = Array.from({ length: gridCount }, (_, i) => (i / (gridCount - 1)) * width)

  return (
    <div className="w-full overflow-hidden rounded-md border bg-background">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Response time chart" className="w-full h-[260px]">
        <defs>
          <linearGradient id="avgFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="p95Fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity="0.20" />
            <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        <g>
          {gridXs.map((x) => (
            <line key={x} x1={x} y1={0} x2={x} y2={height} stroke="hsl(0 0% 90%)" strokeDasharray="3 3" />
          ))}
        </g>

        {/* p95 area */}
        {p95Path && (
          <>
            <path d={`${p95Path} L ${width} ${height} L 0 ${height} Z`} fill="url(#p95Fill)" />
            <path d={p95Path} stroke="hsl(24 95% 53%)" strokeWidth={2} fill="none" />
          </>
        )}

        {/* avg area */}
        {avgPath && (
          <>
            <path d={`${avgPath} L ${width} ${height} L 0 ${height} Z`} fill="url(#avgFill)" />
            <path d={avgPath} stroke="hsl(142 71% 45%)" strokeWidth={2} fill="none" />
          </>
        )}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
          Avg
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(24 95% 53%)" }} />
          p95
        </div>
        <div className="ml-auto">max {Math.round(maxY)} ms</div>
      </div>
    </div>
  )
}
