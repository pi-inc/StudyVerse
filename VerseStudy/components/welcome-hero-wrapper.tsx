"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import WelcomeHero with SSR disabled
const WelcomeHero = dynamic(() => import("./welcome-hero"), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center">Loading...</div>,
})

export function WelcomeHeroWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">Loading...</div>}>
      <WelcomeHero />
    </Suspense>
  )
}

