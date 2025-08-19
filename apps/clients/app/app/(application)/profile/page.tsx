"use client"

import type React from "react"
import { useState } from "react"
import { useSession } from "next-auth/react"

import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Checkbox } from "@/shared/components/ui/checkbox"

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState<string|null|undefined>(session?.user?.name)
  const [email] = useState<string|null|undefined>(session?.user?.email)
  const [image] = useState<string|null|undefined>(session?.user?.image)
  const [role] = useState("Owner")

  const [prefs, setPrefs] = useState({
    productUpdates: true,
    newsletter: true,
    eventInvites: false,
    promotions: false,
  })

  function onSaveAccount(e: React.FormEvent) {
    e.preventDefault()
  }

  function onSavePreferences(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <section id="account" className="scroll-mt-24">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSaveAccount} className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={image || ''} alt="User avatar" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="text-sm font-medium leading-none">Profile picture</div>
                  <div className="text-xs text-muted-foreground">
                    PNG or JPG. Max 2MB. (Not functional in demo)
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email || ''} disabled />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={role} disabled />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button type="submit">Save changes</Button>
                <Button type="button" variant="ghost" onClick={() => setName("Alex Johnson")}>
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section id="security" className="scroll-mt-24">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage security-related preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Password changes and 2FA settings will be available here.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="bg-transparent" disabled>
              Coming soon
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section id="preferences" className="scroll-mt-24">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Choose which marketing updates you want to receive.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSavePreferences} className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="productUpdates"
                  checked={prefs.productUpdates}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, productUpdates: Boolean(v) }))}
                />
                <div className="grid gap-1">
                  <Label htmlFor="productUpdates">Product updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Major feature releases, performance improvements, and changelogs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="newsletter"
                  checked={prefs.newsletter}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, newsletter: Boolean(v) }))}
                />
                <div className="grid gap-1">
                  <Label htmlFor="newsletter">Monthly newsletter</Label>
                  <p className="text-xs text-muted-foreground">
                    Tips, best practices, and curated content from our team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="eventInvites"
                  checked={prefs.eventInvites}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, eventInvites: Boolean(v) }))}
                />
                <div className="grid gap-1">
                  <Label htmlFor="eventInvites">Event invitations</Label>
                  <p className="text-xs text-muted-foreground">
                    Be the first to hear about upcoming webinars and events.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="promotions"
                  checked={prefs.promotions}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, promotions: Boolean(v) }))}
                />
                <div className="grid gap-1">
                  <Label htmlFor="promotions">Promotions and offers</Label>
                  <p className="text-xs text-muted-foreground">Special discounts and early access offers.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button type="submit">Save preferences</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setPrefs({ productUpdates: true, newsletter: true, eventInvites: false, promotions: false })}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
