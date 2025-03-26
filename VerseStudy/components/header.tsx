"use client"

import Link from "next/link"
import { BookOpen, RotateCcw, Calendar, Users, User } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import { UserNav } from "./user-nav"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Review", href: "/revise", icon: RotateCcw },
    { name: "Plan", href: "/plan", icon: Calendar },
    { name: "Community", href: "/social", icon: Users },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <BookOpen className="h-5 w-5 text-study-purple" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-study-teal rounded-full animate-pulse" />
          </div>
          <Link href="/" className="text-lg font-bold gradient-text">
            StudyVerse
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={`relative px-2 lg:px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-1">
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                  <span className="lg:hidden">{item.name.substring(0, 1)}</span>
                </div>
                {(pathname === item.href || pathname.startsWith(item.href + "/")) && (
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

