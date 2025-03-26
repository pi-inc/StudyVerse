"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after a delay
    const timeout = setTimeout(() => {
      router.push("/")
    }, 2000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div className="relative">
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
            <div className="h-full bg-primary loading-bar" style={{ width: "0%" }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Loading resources...</p>
        </div>
      </div>
    </div>
  )
}

