"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, BookOpen, Brain, Calendar, Users, ArrowRight, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const { toast } = useToast()

  // These are the top critical user tasks within StudyVerse, in order of priority
  const criticalTasks = [
    {
      id: 1,
      title: "Get personalized help from AI Tutor",
      description: "Ask questions, get explanations, and receive guidance on difficult concepts",
      icon: Lightbulb,
      color: "from-study-purple to-study-blue",
      userGoal: "quickly understand difficult concepts or get answers to specific questions",
    },
    {
      id: 2,
      title: "Continue learning in your courses",
      description: "Pick up where you left off in your enrolled courses",
      icon: BookOpen,
      color: "from-study-blue to-study-teal",
      userGoal: "maintain consistent learning and complete courses",
    },
    {
      id: 3,
      title: "Review and test your knowledge",
      description: "Use flashcards, quizzes, and other revision tools to strengthen your understanding",
      icon: Brain,
      color: "from-study-teal to-study-green",
      userGoal: "strengthen memory retention and test understanding",
    },
    {
      id: 4,
      title: "Manage your study schedule",
      description: "Organize tasks, set deadlines, and track your progress",
      icon: Calendar,
      color: "from-study-green to-study-yellow",
      userGoal: "stay organized and meet academic commitments",
    },
    {
      id: 5,
      title: "Connect with study groups",
      description: "Find and join groups of students studying similar topics",
      icon: Users,
      color: "from-study-yellow to-study-orange",
      userGoal: "collaborate with peers on challenging topics",
    },
  ]

  const handleNext = () => {
    if (currentStep < criticalTasks.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowOnboarding(false)
      toast({
        title: "Onboarding complete!",
        description: "You're all set to start using StudyVerse.",
        className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
      })
    }
  }

  const handleSkip = () => {
    setShowOnboarding(false)
    toast({
      title: "Onboarding skipped",
      description: "You can always access help from the settings menu.",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  if (!showOnboarding) return null

  const task = criticalTasks[currentStep]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${task.color}`} />
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                Key Task {currentStep + 1} of {criticalTasks.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`h-20 w-20 rounded-full flex items-center justify-center bg-gradient-to-r ${task.color} text-white mb-4`}
                >
                  <task.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                <p className="text-muted-foreground mb-4">{task.description}</p>
                <div className="bg-muted/50 p-3 rounded-lg w-full">
                  <p className="text-sm font-medium">User Goal:</p>
                  <p className="text-sm">{task.userGoal}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleSkip}>
                Skip
              </Button>
              <Button className="bg-gradient-to-r from-study-purple to-study-blue text-white" onClick={handleNext}>
                {currentStep < criticalTasks.length - 1 ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Got it <Check className="ml-2 h-4 w-4" />
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

