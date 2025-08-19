"use client"

import Link from "next/link"
import { Activity, Bell, Home, Server } from "lucide-react"
import { useCallback } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import { useSidenav } from "@/shared/stores/useSidenav"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Server,
  Bell,
};

interface SideNavItem { 
  title: string, 
  icon: string, 
  url?: string, 
  id?: string,
  useScrollTo?: boolean,
  active?: boolean 
}

export const SideNavigation = ({ 
  showNavOptions,
  sections = []
}: { 
  showNavOptions?: boolean
  sideBarState?: boolean
  sections?: SideNavItem[]
}) => {
  const navOpen = useSidenav((state) => state.isOpen)
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      // Update hash without triggering reload
      window.history.replaceState(null, "", `#${id}`)
    }
  }, [])

  const renderLink = (item: SideNavItem) => {
    const Icon = iconMap[item.icon];

    return item.useScrollTo && item.id ? (
      <a
        href={`#${item.id}`}
        aria-label={`Jump to ${item.title}`}
        onClick={(e) => {
          e.preventDefault()
          scrollToSection(item.id || "")
        }}
      >
        {Icon && <Icon className="mr-2" />}
        <span>{item.title}</span>
      </a>
    ) : (
      <Link href={item.url || ""}>
        {Icon && <Icon className="mr-2" />}
        <span>{item.title}</span>
      </Link>
    )
  }
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="group-data-[collapsible=icon]:justify-center">
              <a href="#" aria-label="PacketWatch">
                <Activity />
                {navOpen && (
                  <span
                    className="font-semibold transition-all duration-200 ease-linear
                              group-data-[collapsible=icon]:opacity-0
                              group-data-[collapsible=icon]:-translate-x-1
                              group-data-[collapsible=icon]:pointer-events-none"
                  >
                    PacketWatch
                  </span>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {showNavOptions && (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.active}>
                      {renderLink(item)}
                    </SidebarMenuButton>
                    {item.title === "Incidents" ? <SidebarMenuBadge>1</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}

      <SidebarRail />
    </Sidebar>
  )
}
