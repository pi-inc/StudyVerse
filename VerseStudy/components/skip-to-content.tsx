"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <a
      href="#main-content"
      className={cn(
        "fixed top-2 left-2 z-50 bg-background border border-input px-4 py-2 rounded-md shadow-md transition-opacity",
        isFocused ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to content
    </a>
  )
}

