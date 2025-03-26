"use client"

import { Onboarding } from "@/components/onboarding"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/settings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold gradient-text">StudyVerse Onboarding</h1>
      </div>

      <Onboarding />

      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">
          If the onboarding doesn't appear, you may have completed it already.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}

