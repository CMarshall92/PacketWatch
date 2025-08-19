export function formatMs(v: number) {
  if (v < 1000) return `${v}ms`
  const s = v / 1000
  return `${s.toFixed(1)}s`
}

export function formatPct(v: number) {
  return `${v.toFixed(2)}%`
}
