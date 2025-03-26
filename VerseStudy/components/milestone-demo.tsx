"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MilestoneCelebration } from "@/components/milestone-celebration"
import { Trophy, Star, Zap, BookOpen } from "lucide-react"

const MILESTONES = [
  {
    id: 1,
    title: "First Course Completed",
    description: "You've completed your first course! Keep up the great work.",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "7-Day Streak",
    description: "You've studied for 7 days in a row! Your consistency is paying off.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "You've scored 100% on 5 quizzes! Your knowledge is impressive.",
    icon: Star,
  },
  {
    id: 4,
    title: "Subject Expert",
    description: "You've mastered all topics in Mathematics! You're becoming an expert.",
    icon: Trophy,
  },
]

export function MilestoneDemo() {
  const [activeMilestone, setActiveMilestone] = useState<(typeof MILESTONES)[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((milestone) => (
          <Card key={milestone.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="mb-2 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <milestone.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center text-lg">{milestone.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-2">
              <CardDescription>{milestone.description}</CardDescription>
            </CardContent>
            <CardFooter className="pt-2 flex justify-center">
              <Button onClick={() => setActiveMilestone(milestone)} variant="outline">
                Preview Celebration
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {activeMilestone && (
        <MilestoneCelebration
          title={activeMilestone.title}
          description={activeMilestone.description}
          isOpen={true}
          onClose={() => setActiveMilestone(null)}
        />
      )}
    </div>
  )
}

