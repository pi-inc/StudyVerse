"use client"

import Link from "next/link"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"
import { Header } from "@/components/header"
// import { Footer } from "@/components/footer" // Removed Footer import
import { BottomNav } from "@/components/bottom-nav"
import { ImprovedOnboarding } from "@/components/improved-onboarding"
import { RestartOnboarding } from "@/components/restart-onboarding"
import { AppInitializer } from "@/components/app-initializer"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Settings, HelpCircle } from "lucide-react"
import { SkipToContent } from "@/components/skip-to-content"
import { OfflineIndicator } from "@/components/offline-indicator"
import { useState, useEffect } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Delay showing the onboarding to ensure proper sizing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
        <SkipToContent />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppInitializer>
            <SidebarProvider>
              <div className="flex min-h-screen flex-col w-full max-w-[100vw]">
                <Header />
                <OfflineIndicator />
                <div className="flex flex-1 w-full">
                  {/* Sidebar - hidden on mobile, simplified on desktop */}
                  <div className="hidden md:block">
                    <Sidebar>
                      <SidebarHeader>
                        <div className="px-4 py-2">
                          <h2 className="text-lg font-semibold">Menu</h2>
                        </div>
                      </SidebarHeader>
                      <SidebarContent>
                        <SidebarGroup>
                          <SidebarGroupLabel>Help & Settings</SidebarGroupLabel>
                          <SidebarGroupContent>
                            <SidebarMenu>
                              <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                  <Link href="/settings">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                  <Link href="/help">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Help
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>
                      </SidebarContent>
                    </Sidebar>
                  </div>
                  <SidebarInset className="w-full">
                    <main id="main-content" className="flex-1 p-3 pb-20 md:pb-5 md:p-5 lg:p-6 w-full">
                      {children}
                    </main>
                    {/* <Footer /> */} {/* Removed Footer component */}
                  </SidebarInset>
                </div>
                {/* Bottom Nav - only visible on mobile */}
                <div className="md:hidden">
                  <BottomNav />
                </div>
              </div>
              <Toaster />
              {showOnboarding && <ImprovedOnboarding />}
              <RestartOnboarding />
            </SidebarProvider>
          </AppInitializer>
        </ThemeProvider>
      </body>
    </html>
  )
}

