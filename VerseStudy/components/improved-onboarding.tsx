"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, BookOpen, Brain, ArrowRight, Check, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function ImprovedOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const { toast } = useToast()

  // Check if user has seen onboarding before and if it's their first time signing in
  useEffect(() => {
    const onboardingSeen = localStorage.getItem("onboardingSeen")
    const isFirstTimeSignIn = localStorage.getItem("firstTimeSignIn") === "true"

    if (onboardingSeen) {
      setHasSeenOnboarding(true)
      setShowOnboarding(false)
    } else if (!isFirstTimeSignIn) {
      // Don't show onboarding if it's not the first time signing in
      setShowOnboarding(false)
    }

    // Clear the first-time sign-in flag after showing onboarding
    if (isFirstTimeSignIn) {
      localStorage.removeItem("firstTimeSignIn")
    }
  }, [])

  // These are the top critical user tasks within StudyVerse, in order of priority
  const criticalTasks = [
    {
      id: 1,
      title: "Ask the AI Tutor",
      description: "Get instant help with any topic or question",
      icon: Lightbulb,
      color: "from-study-purple to-study-blue",
      bgColor: "bg-gradient-to-r from-study-purple to-study-blue",
      tip: "Tap the lightbulb icon at the bottom of the screen or use the quick action on the home page.",
    },
    {
      id: 2,
      title: "Continue Your Courses",
      description: "Pick up where you left off in your learning journey",
      icon: BookOpen,
      color: "from-study-blue to-study-teal",
      bgColor: "bg-gradient-to-r from-study-blue to-study-teal",
      tip: "Your current courses appear on the home page for easy access.",
    },
    {
      id: 3,
      title: "Review with Flashcards",
      description: "Test your knowledge and strengthen your memory",
      icon: Brain,
      color: "from-study-teal to-study-green",
      bgColor: "bg-gradient-to-r from-study-teal to-study-green",
      tip: "Topics due for review are highlighted to help you prioritize.",
    },
  ]

  const handleNext = () => {
    if (currentStep < criticalTasks.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("onboardingSeen", "true")
    toast({
      title: "You're all set!",
      description: "You can access help anytime from the settings menu.",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  if (!showOnboarding) return null

  const task = criticalTasks[currentStep]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleSkip}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6 pb-3 sm:pb-4">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`h-16 w-16 rounded-full ${task.bgColor} text-white flex items-center justify-center mb-4`}
                >
                  <task.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                <p className="text-base text-muted-foreground mb-4">{task.description}</p>

                <div className="bg-muted/50 p-3 rounded-lg w-full mb-4 text-left">
                  <p className="text-sm font-medium">Quick Tip:</p>
                  <p className="text-sm">{task.tip}</p>
                </div>

                <div className="w-full flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Step {currentStep + 1} of {criticalTasks.length}
                  </div>
                  <Progress
                    value={((currentStep + 1) / criticalTasks.length) * 100}
                    className="w-24 h-1.5"
                    indicatorClassName="bg-gradient-to-r from-study-purple to-study-blue"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-3 sm:p-4 pt-0 flex justify-end">
              <Button className="bg-gradient-to-r from-study-purple to-study-blue text-white" onClick={handleNext}>
                {currentStep < criticalTasks.length - 1 ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Get Started <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

