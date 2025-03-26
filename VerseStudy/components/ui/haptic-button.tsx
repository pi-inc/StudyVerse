"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface HapticButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  hapticFeedback?: boolean
}

export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
  ({ onClick, hapticFeedback = true, className, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hapticFeedback && navigator.vibrate) {
        navigator.vibrate(10) // 10ms vibration
      }

      if (onClick) {
        onClick(e)
      }
    }

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        className={cn("transition-transform active:scale-95", className)}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

HapticButton.displayName = "HapticButton"

