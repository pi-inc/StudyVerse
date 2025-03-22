import Link from "next/link"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
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
import { Settings, HelpCircle, Info, User } from "lucide-react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>StudyVerse</title>
        <meta name="description" content="Your ultimate study companion" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                {/* Sidebar - hidden on mobile */}
                <div className="hidden md:block">
                  <Sidebar>
                    <SidebarHeader>
                      <div className="px-4 py-2">
                        <h2 className="text-lg font-semibold">Menu</h2>
                      </div>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/profile">
                                  <User className="mr-2 h-4 w-4" />
                                  Profile
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
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
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/about">
                                  <Info className="mr-2 h-4 w-4" />
                                  About
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                  </Sidebar>
                </div>
                <SidebarInset>
                  <main className="flex-1 p-4 pb-20 md:pb-6">{children}</main>
                  <Footer />
                </SidebarInset>
              </div>
              {/* Bottom Nav - only visible on mobile */}
              <div className="md:hidden">
                <BottomNav />
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

