"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, X } from "lucide-react"
import confetti from "canvas-confetti"

interface MilestoneCelebrationProps {
  title: string
  description: string
  isOpen?: boolean
  onClose?: () => void
}

export function MilestoneConfetti() {
  useEffect(() => {
    const duration = 3 * 1000
    const end = Date.now() + duration

    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#8B5CF6", "#EC4899", "#3B82F6"],
      })

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#8B5CF6", "#EC4899", "#3B82F6"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti)
      }
    }

    runConfetti()
  }, [])

  return null
}

export function MilestoneCelebration({
  title,
  description,
  isOpen = false,
  onClose = () => {},
}: MilestoneCelebrationProps) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
          >
            <div className="bg-background rounded-lg shadow-lg overflow-hidden border border-primary/20">
              <div className="relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex justify-center">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <Award className="h-16 w-16 text-white" />
                  </motion.div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground mb-4">{description}</p>
                  <Button onClick={handleClose}>Continue Learning</Button>
                </div>
              </div>
            </div>
            <MilestoneConfetti />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

