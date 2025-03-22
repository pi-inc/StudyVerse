"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import { UserNav } from "./user-nav"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Tutor", href: "/tutor" },
    { name: "Courses", href: "/courses" },
    { name: "Revise", href: "/revise" },
    { name: "Plan", href: "/plan" },
    { name: "Social", href: "/social" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SidebarTrigger className="mr-2 md:hidden" />
          <div className="relative">
            <BookOpen className="h-6 w-6 text-study-purple" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-study-teal rounded-full animate-pulse" />
          </div>
          <Link href="/" className="text-xl font-bold gradient-text">
            StudyVerse
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <UserNav />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="md:hidden"
          >
            <MobileMenu />
          </motion.div>
        </div>
      </div>
    </header>
  )
}

