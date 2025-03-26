"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, RotateCcw, Calendar, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const navItems = [
    {
      name: "Plan",
      href: "/plan",
      icon: Calendar,
      isActive: pathname === "/plan" || pathname.startsWith("/plan/"),
    },
    {
      name: "Learn",
      href: "/learn",
      icon: BookOpen,
      isActive:
        pathname === "/learn" || pathname === "/tutor" || pathname === "/courses" || pathname.startsWith("/courses/"),
    },
    {
      name: "Review",
      href: "/revise",
      icon: RotateCcw,
      isActive: pathname === "/revise" || pathname.startsWith("/revise/"),
    },
    {
      name: "Community",
      href: "/social",
      icon: Users,
      isActive:
        pathname === "/social" ||
        pathname.startsWith("/social/") ||
        pathname === "/messages" ||
        pathname.startsWith("/messages/"),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      isActive:
        pathname === "/profile" ||
        pathname === "/settings" ||
        pathname.startsWith("/profile/") ||
        pathname.startsWith("/settings/"),
    },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If clicking on the current active page, scroll to top
    if (
      pathname === href ||
      (href === "/learn" && (pathname === "/tutor" || pathname === "/courses" || pathname.startsWith("/courses/"))) ||
      (href === "/profile" &&
        (pathname === "/settings" || pathname.startsWith("/profile/") || pathname.startsWith("/settings/")))
    ) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-sm pb-safe">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs font-medium transition-colors w-full",
              item.isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
            aria-label={item.name}
            aria-current={item.isActive ? "page" : undefined}
            prefetch={true}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <item.icon
                className={cn("h-6 w-6 mb-1.5", item.isActive ? "text-primary" : "text-muted-foreground")}
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm">{item.name}</span>
              {item.isActive && (
                <div className="absolute bottom-0 w-1/2 h-1 rounded-full bg-primary transition-all duration-200" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

