"use client"

import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"

export default function IncidentsTable({ range = "30d" }: { range?: string }) {
  const rows = [
    {
      id: "INC-2317",
      title: "Elevated errors on /api/checkout",
      severity: "major" as const,
      monitors: 2,
      started: "2025-08-02 14:22",
      duration: "32m",
      status: "resolved" as const,
    },
  ]
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Incidents ({range})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Monitors</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      r.severity === "major"
                        ? "bg-red-100 text-red-900"
                        : r.severity === "minor"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-emerald-100 text-emerald-900"
                    }
                  >
                    {r.severity}
                  </Badge>
                </TableCell>
                <TableCell>{r.monitors}</TableCell>
                <TableCell className="text-muted-foreground">{r.started}</TableCell>
                <TableCell className="text-muted-foreground">{r.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      r.status === "resolved"
                        ? "border-emerald-300 text-emerald-700"
                        : "border-amber-300 text-amber-700"
                    }
                  >
                    {r.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No incidents in range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
