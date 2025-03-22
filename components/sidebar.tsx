"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Settings, HelpCircle, Info } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      label: "Help",
      icon: HelpCircle,
      href: "/help",
    },
    {
      label: "About",
      icon: Info,
      href: "/about",
    },
  ]

  return (
    <div className="hidden border-r bg-background md:block w-[240px] h-[calc(100vh-4rem)]">
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

