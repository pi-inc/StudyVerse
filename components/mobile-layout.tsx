"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [showAIButton, setShowAIButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Hide AI button when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowAIButton(currentScrollY <= lastScrollY || currentScrollY < 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <main>{children}</main>

      {/* Floating AI Tutor button */}
      <AnimatePresence>
        {showAIButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 z-40"
          >
            <Link href="/tutor">
              <Button
                size="lg"
                className="h-14 w-14 rounded-full bg-gradient-to-r from-study-purple to-study-blue shadow-lg"
                aria-label="AI Tutor"
              >
                <Lightbulb className="h-6 w-6 text-white" />
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

