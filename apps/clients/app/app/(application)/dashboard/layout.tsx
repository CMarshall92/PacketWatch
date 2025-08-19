import type { Metadata } from "next";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { NavigationUserDropdown } from "@/shared/components/custom/UserDropdown";
import { SideNavigation } from "@/shared/components/custom/SideNavigation";
import { SiteSelector } from "@/shared/components/custom/SiteSelector";
import { SiteLocationResponse } from "@/shared/types/navigation";
import { OnboardingSteps } from "@/shared/components/custom/OnboardingSteps";

export const metadata: Metadata = {
  title: "PacketWatch - Dashboard",
  description: "",
};

const fetchSiteLocations = async (): Promise<SiteLocationResponse> => {
  return {
    prevSelectedSlug: '7328g3fbhe',
    data: [
      { slug: '7328g3fbhe', href: 'https://www.google.com', label: 'Google', isApi: false, icon: 'https://icon2.cleanpng.com/20180330/jjq/avc3ltutu.webp' },
      { slug: '3in2jnk2ff', href: 'https://www.cmarshall.io', label: 'Cmarshall', isApi: true, icon: 'https://icon2.cleanpng.com/20180330/jjq/avc3ltutu.webp'},
      { slug: 'lkifjwnjk2', href: 'https://www.packetwatch.co.uk', label: 'Packetwatch', isApi: false, icon: 'https://icon2.cleanpng.com/20180330/jjq/avc3ltutu.webp'},
    ]
    // data: []
  }
}
  
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locations = await fetchSiteLocations()

  const sections = locations.data.length !== 0 ? [
    { title: "Overview", url: "#", icon: "Home", active: true },
    { title: "Monitors", url: "#monitors", icon: "Server" },
    { title: "Incidents", url: "#incidents", icon: "Bell" },
  ] : []
  
  return (
    <SidebarProvider>
      <SideNavigation
        showNavOptions={locations.data.length > 0} 
        sections={sections} 
      />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <SiteSelector locations={locations} />
          <NavigationUserDropdown />
        </header>
  
        <main className="flex-1 p-4 md:p-6 lg:p-8 scroll-smooth space-y-6">
          {locations.data.length === 0 ? (
            <OnboardingSteps />
          ) : (
            children
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
