"use client"

import { Check, CreditCard, Monitor } from "lucide-react"
import { useState } from "react"

import { Button } from "../../ui/button"

export const OnboardingSteps = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    monitor: false,
    billing: false
  })

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Welcome to PacketWatch</h1>
            <p className="text-lg text-muted-foreground">Get started by completing these essential setup steps</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-300">
              <button
                onClick={() => toggleTask("monitor")}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedTasks.monitor
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-muted-foreground hover:border-primary"
                }`}
              >
                {completedTasks.monitor && <Check className="h-3 w-3" />}
              </button>
              <div className="flex-1">
                <p className={`font-medium ${completedTasks.monitor ? "line-through text-muted-foreground" : ""}`}>
                  Setup your first monitor
                </p>
              </div>
              {!completedTasks.monitor && (
                <Button size="sm" variant="outline">
                  <Monitor className="h-4 w-4 mr-2" />
                  Create
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-300">
              <button
                onClick={() => toggleTask("billing")}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedTasks.billing
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-muted-foreground hover:border-primary"
                }`}
              >
                {completedTasks.billing && <Check className="h-3 w-3" />}
              </button>
              <div className="flex-1">
                <p className={`font-medium ${completedTasks.billing ? "line-through text-muted-foreground" : ""}`}>
                  Create a billing plan
                </p>
              </div>
              {!completedTasks.billing && (
                <Button size="sm" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Choose Plan
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
