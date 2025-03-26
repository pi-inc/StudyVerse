"use client"

import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 400)

    // Complete loading after a minimum time (for UX purposes)
    const minLoadingTime = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)

      // Add a small delay before calling onComplete for visual polish
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(minLoadingTime)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      style={{
        opacity: 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div
          className="relative"
          style={{
            transform: "scale(1)",
            opacity: 1,
            transition: "transform 0.8s ease, opacity 0.8s ease",
          }}
        >
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "rgba(139, 92, 246, 1)",
              animation: "spin 2s linear infinite",
            }}
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text">StudyVerse</h1>
          <p className="text-muted-foreground">Your ultimate study companion</p>
        </div>

        <div className="w-full max-w-xs">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary"
              style={{
                width: `${progress}%`,
                transition: "width 0.3s ease-in-out",
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{progress < 100 ? "Loading resources..." : "Ready!"}</p>
        </div>
      </div>
    </div>
  )
}

