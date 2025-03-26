"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Home, BookOpen, RotateCcw, Calendar, Users, Settings, HelpCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/learn",
      label: "Learn",
      icon: BookOpen,
      active: pathname === "/learn" || pathname === "/courses" || pathname.startsWith("/courses/"),
    },
    {
      href: "/revise",
      label: "Revise",
      icon: RotateCcw,
      active: pathname === "/revise" || pathname.startsWith("/revise/"),
    },
    {
      href: "/plan",
      label: "Plan",
      icon: Calendar,
      active: pathname === "/plan" || pathname.startsWith("/plan/"),
    },
    {
      href: "/social",
      label: "Social",
      icon: Users,
      active: pathname === "/social" || pathname.startsWith("/social/"),
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings" || pathname.startsWith("/settings/"),
    },
    {
      href: "/help",
      label: "Help",
      icon: HelpCircle,
      active: pathname === "/help" || pathname.startsWith("/help/"),
    },
    {
      href: "/about",
      label: "About",
      icon: Info,
      active: pathname === "/about" || pathname.startsWith("/about/"),
    },
  ]

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open main menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent",
                route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active ? "text-primary" : "text-muted-foreground")} />
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

