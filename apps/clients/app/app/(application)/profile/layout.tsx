import type { Metadata } from "next";

import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { SideNavigation } from "@/shared/components/custom/SideNavigation";
import { PageHeader } from "@/shared/components/custom/PageHeader";

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
        <PageHeader title="Profile" />
  
        <main className="flex-1 p-4 md:p-6 lg:p-8 scroll-smooth space-y-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
