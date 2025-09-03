"use client"

import React, { useState } from "react"
import Image from 'next/image'
import { ChevronDown, ChevronsLeftRightEllipsis, Network, Plus, X } from "lucide-react"
import { clientFetcher } from '@packetwatch/ui/client';
import { SiteLocation, SiteLocationResponse } from "@/shared/types/navigation"

import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter as DialogFooterBase } from "../../ui/dialog"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Checkbox } from "../../ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { getDomainWithProtocol } from "../../../lib/utils/client"

export const SiteSelector = ({ locations }: { locations: SiteLocationResponse }) => {
  const [createOpen, setCreateOpen] = useState(false)
  const [serviceUrl, setServiceUrl] = useState("")
  const [isApi, setIsApi] = useState(false)
  const [endpoints, setEndpoints] = useState<string[]>([])

  function addEndpoint() {
    setEndpoints((prev) => ["", ...prev])
  }
  function updateEndpoint(idx: number, value: string) {
    setEndpoints((prev) => prev.map((v, i) => (i === idx ? value : v)))
  }
  function removeEndpoint(idx: number) {
    setEndpoints((prev) => prev.filter((_, i) => i !== idx))
  }
  function resetForm() {
    setServiceUrl("")
    setIsApi(false)
    setEndpoints([])
  }
  
  const handleCreate = async () => {
    const response = await clientFetcher(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/monitor`,
      {
        method: 'POST',
        body: {
          serviceUrl: getDomainWithProtocol(serviceUrl),
          ...isApi ? { endpoints: endpoints.filter(Boolean) } : {},
          isApi,
        },
      },
      () => {
        setCreateOpen(false)
        resetForm()
      }
    )
  }

  const selectedSite = locations.data.find(
      (location: SiteLocation) => location.slug === locations.prevSelectedSlug
    )
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 w-[200px] justify-start">
            {selectedSite && (
              <Image src={selectedSite.icon} alt="Workspace" width={20} height={20} className="rounded" />
            )}
            <span className="truncate">{selectedSite?.label || 'Create A Site Monitor'}</span>
            <ChevronDown className="h-4 w-4 ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {locations.data.map((location: SiteLocation) => (
            <DropdownMenuItem key={location.slug}>
              <React.Fragment>
                {location.isApi ? <Network /> : <ChevronsLeftRightEllipsis />}
                <span>{location.label}</span>
              </React.Fragment>
            </DropdownMenuItem>
          ))}

          {locations.data.length !== 0 && (
            <DropdownMenuSeparator />
          )}
          
          <DropdownMenuItem onSelect={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add new tracker</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add new tracker</DialogTitle>
            <DialogDescription>
              Track uptime for a website or API. Provide the base URL and optional API endpoints.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-url">Service Base URL</Label>
              <Input
                id="service-url"
                placeholder="https://api.example.com"
                value={serviceUrl}
                onChange={(e) => {
                  setServiceUrl(e.target.value)
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="is-api" checked={isApi} onCheckedChange={(v) => setIsApi(Boolean(v))} />
              <Label htmlFor="is-api" className="cursor-pointer">
                Is API
              </Label>
            </div>

            {isApi && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>API Endpoints</Label>
                  <div className="space-y-2">
                    {endpoints.map((ep, idx) => (
                      <div key={ep} className="flex items-center gap-2">
                        <Input
                          placeholder="/v1/health or /api/checkout"
                          value={ep}
                          onChange={(e) => updateEndpoint(idx, e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Remove endpoint"
                          onClick={() => removeEndpoint(idx)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={addEndpoint}
                >
                  <Plus className="h-4 w-4" />
                  Add new endpoint
                </Button>
              </div>
            )}
          </div>

          <DialogFooterBase className="gap-2">
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!serviceUrl.trim()}>
              Add tracker
            </Button>
          </DialogFooterBase>
        </DialogContent>
      </Dialog>
    </>
  )
}