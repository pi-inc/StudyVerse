"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define types for our context
type OnboardingStep = {
  id: string
  title: string
  description: string
  position: "top" | "bottom" | "left" | "right" | "center"
  order: number
}

type OnboardingTour = {
  id: string
  name: string
  steps: OnboardingStep[]
}

type OnboardingContextType = {
  isFirstLaunch: boolean
  setIsFirstLaunch: (value: boolean) => void
  currentTour: OnboardingTour | null
  currentStep: OnboardingStep | null
  isTooltipVisible: boolean
  startTour: (tourId: string) => void
  nextStep: () => void
  endTour: () => void
  resetOnboarding: () => Promise<void>
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

// Define available tours
const TOURS: Record<string, OnboardingTour> = {
  "home-tour": {
    id: "home-tour",
    name: "Home Screen Tour",
    steps: [
      {
        id: "welcome",
        title: "Welcome to StudyVerse",
        description: "This is your learning dashboard. Let's explore the features available to you.",
        position: "center",
        order: 0,
      },
      {
        id: "streak",
        title: "Track Your Progress",
        description: "See your current streak and achievements to stay motivated.",
        position: "top",
        order: 1,
      },
      {
        id: "courses",
        title: "Recent Courses",
        description: "Quickly access your most recent courses to continue learning.",
        position: "bottom",
        order: 2,
      },
      {
        id: "plan",
        title: "Daily Plan",
        description: "View your study plan for today and stay on track with your goals.",
        position: "bottom",
        order: 3,
      },
    ],
  },
  "courses-tour": {
    id: "courses-tour",
    name: "Courses Tour",
    steps: [
      {
        id: "courses-intro",
        title: "Your Courses",
        description: "Here you can find all your enrolled courses and explore new ones.",
        position: "center",
        order: 0,
      },
      {
        id: "course-progress",
        title: "Course Progress",
        description: "Track your progress in each course with these progress bars.",
        position: "bottom",
        order: 1,
      },
      {
        id: "explore-courses",
        title: "Explore More",
        description: "Discover new courses to expand your knowledge.",
        position: "bottom",
        order: 2,
      },
    ],
  },
  "revise-tour": {
    id: "revise-tour",
    name: "Revision Tools Tour",
    steps: [
      {
        id: "revise-intro",
        title: "Revision Tools",
        description: "These tools will help you review and reinforce what you've learned.",
        position: "center",
        order: 0,
      },
      {
        id: "flashcards",
        title: "Flashcards",
        description: "Use flashcards for quick and effective memorization.",
        position: "top",
        order: 1,
      },
      {
        id: "quizzes",
        title: "Quizzes",
        description: "Test your knowledge with interactive quizzes.",
        position: "top",
        order: 2,
      },
      {
        id: "concept-maps",
        title: "Concept Maps",
        description: "Visualize connections between concepts for better understanding.",
        position: "bottom",
        order: 3,
      },
    ],
  },
}

// Create the provider
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true)
  const [currentTour, setCurrentTour] = useState<OnboardingTour | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

  // Check if it's the first launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("@studyverse_first_launch")
        if (value !== null) {
          setIsFirstLaunch(false)
        } else {
          setIsFirstLaunch(true)
          await AsyncStorage.setItem("@studyverse_first_launch", "false")
        }
      } catch (error) {
        console.error("Error checking first launch:", error)
      }
    }

    checkFirstLaunch()
  }, [])

  // Start a tour
  const startTour = (tourId: string) => {
    const tour = TOURS[tourId]
    if (tour) {
      setCurrentTour(tour)
      setCurrentStepIndex(0)
      setIsTooltipVisible(true)
    }
  }

  // Move to the next step
  const nextStep = () => {
    if (!currentTour) return

    if (currentStepIndex < currentTour.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      endTour()
    }
  }

  // End the current tour
  const endTour = () => {
    setCurrentTour(null)
    setCurrentStepIndex(0)
    setIsTooltipVisible(false)
  }

  // Reset onboarding
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@studyverse_first_launch")
      setIsFirstLaunch(true)
      return Promise.resolve()
    } catch (error) {
      console.error("Error resetting onboarding:", error)
      return Promise.reject(error)
    }
  }

  // Get the current step
  const currentStep = currentTour ? currentTour.steps[currentStepIndex] : null

  return (
    <OnboardingContext.Provider
      value={{
        isFirstLaunch,
        setIsFirstLaunch,
        currentTour,
        currentStep,
        isTooltipVisible,
        startTour,
        nextStep,
        endTour,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

// Create a hook to use the context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}

