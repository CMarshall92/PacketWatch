import type { Metadata } from "next";
import { Separator } from "@radix-ui/react-separator";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { NavigationUserDropdown } from "@/shared/components/custom/UserDropdown";
import { SideNavigation } from "@/shared/components/custom/SideNavigation";

export const metadata: Metadata = {
  title: "PacketWatch - Profile",
  description: "",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = [
    { id: "account", title: "Account", icon: "User", useScrollTo: true},
    { id: "security", title: "Security", icon: "Shield", useScrollTo: true},
    { id: "preferences", title: "Preferences", icon: "SlidersHorizontal", useScrollTo: true },
  ]
  
  return (
    <SidebarProvider>
      <SideNavigation sections={sections} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <h1 className="text-sm font-medium">Profile</h1>
          <NavigationUserDropdown />
        </header>
  
        <main className="flex-1 p-4 md:p-6 lg:p-8 scroll-smooth space-y-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
