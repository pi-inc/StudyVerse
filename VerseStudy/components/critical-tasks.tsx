"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lightbulb, BookOpen, Brain, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CriticalTasks() {
  const [expanded, setExpanded] = useState(false)

  // These are the top critical user tasks within StudyVerse, in order of priority
  const criticalTasks = [
    {
      id: 1,
      title: "Get personalized help from AI Tutor",
      description: "Ask questions, get explanations, and receive guidance on difficult concepts",
      icon: Lightbulb,
      color: "from-study-purple to-study-blue",
      href: "/tutor",
      userGoal: "quickly understand difficult concepts or get answers to specific questions",
    },
    {
      id: 2,
      title: "Continue learning in your courses",
      description: "Pick up where you left off in your enrolled courses",
      icon: BookOpen,
      color: "from-study-blue to-study-teal",
      href: "/courses",
      userGoal: "maintain consistent learning and complete courses",
    },
    {
      id: 3,
      title: "Review and test your knowledge",
      description: "Use flashcards, quizzes, and other revision tools to strengthen your understanding",
      icon: Brain,
      color: "from-study-teal to-study-green",
      href: "/revise",
      userGoal: "strengthen memory retention and test understanding",
    },
    {
      id: 4,
      title: "Manage your study schedule",
      description: "Organize tasks, set deadlines, and track your progress",
      icon: Calendar,
      color: "from-study-green to-study-yellow",
      href: "/plan",
      userGoal: "stay organized and meet academic commitments",
    },
    {
      id: 5,
      title: "Connect with study groups",
      description: "Find and join groups of students studying similar topics",
      icon: Users,
      color: "from-study-yellow to-study-orange",
      href: "/social",
      userGoal: "collaborate with peers on challenging topics",
    },
  ]

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-study-purple via-study-blue to-study-teal" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Key Tasks in StudyVerse</span>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-xs">
            {expanded ? "Show Less" : "Show All"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {criticalTasks.slice(0, expanded ? 5 : 3).map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={task.href}>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r ${task.color} text-white shrink-0`}
                  >
                    <task.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <p className="text-xs text-primary mt-1">Goal: {task.userGoal}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

