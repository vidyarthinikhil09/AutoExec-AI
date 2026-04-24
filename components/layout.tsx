import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background transition-colors overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col min-h-screen w-full transition-all duration-300 ease-in-out bg-transparent">
          <Topbar />
          <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
