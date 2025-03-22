"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Brain, Calendar, Users, Lightbulb, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Tutor", href: "/tutor", icon: Lightbulb },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Revise", href: "/revise", icon: Brain },
    { name: "Plan", href: "/plan", icon: Calendar },
    { name: "Social", href: "/social", icon: Users },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full grid-cols-6">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-primary" : "text-muted-foreground")} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

