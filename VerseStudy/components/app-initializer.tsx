"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SplashScreen } from "./splash-screen"

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    try {
      const visited = localStorage.getItem("hasVisitedBefore")
      setHasVisitedBefore(!!visited)

      // Set visited flag for future visits
      if (!visited) {
        localStorage.setItem("hasVisitedBefore", "true")
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Always render children, but conditionally render splash screen on top
  return (
    <>
      {children}
      {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}
    </>
  )
}

