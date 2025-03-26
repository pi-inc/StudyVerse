"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  const controls = useAnimation()

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable pull to refresh at the top of the page
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return

    currentY.current = e.touches[0].clientY
    const pullDistance = Math.max(0, currentY.current - startY.current)

    // Resistance factor - makes it harder to pull down
    const resistance = 0.4
    const pullHeight = pullDistance * resistance

    if (pullHeight > 0) {
      controls.set({
        height: pullHeight,
        opacity: Math.min(1, pullHeight / 70),
      })
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    const pullDistance = Math.max(0, currentY.current - startY.current)
    const resistance = 0.4
    const pullHeight = pullDistance * resistance

    if (pullHeight > 60) {
      // Trigger refresh
      setRefreshing(true)
      controls.start({ height: 60, opacity: 1 })

      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      }

      // Animation after refresh completes
      controls.start({ height: 0, opacity: 0 })
      setRefreshing(false)
    } else {
      // Not pulled enough, reset
      controls.start({ height: 0, opacity: 0 })
    }

    setIsPulling(false)
  }

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <motion.div
        className="flex items-center justify-center overflow-hidden bg-muted/20"
        animate={controls}
        initial={{ height: 0, opacity: 0 }}
      >
        <div className={`flex items-center justify-center ${refreshing ? "animate-spin" : ""}`}>
          <RefreshCw className="h-6 w-6 text-primary" />
        </div>
      </motion.div>
      {children}
    </div>
  )
}

