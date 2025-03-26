"use client"

import { useState, useEffect } from "react"
import { Flame, Award, Trophy, Star, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data - in a real app, this would come from an API or state management
const mockAchievements = [
  {
    id: 1,
    title: "First Quiz Completed",
    date: "2 days ago",
    icon: "Star",
    color: "text-yellow-500",
  },
  {
    id: 2,
    title: "Study Group Joined",
    date: "Yesterday",
    icon: "Users",
    color: "text-blue-500",
  },
  {
    id: 3,
    title: "5 Flashcards Mastered",
    date: "Today",
    icon: "Award",
    color: "text-purple-500",
  },
]

export function StreakAchievements() {
  const [streak, setStreak] = useState(7)
  const [nextMilestone, setNextMilestone] = useState(10)
  const [achievements, setAchievements] = useState(mockAchievements)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate progress towards next milestone
    const calculatedProgress = (streak / nextMilestone) * 100
    setProgress(calculatedProgress)
  }, [streak, nextMilestone])

  // Function to render the appropriate icon
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "Star":
        return <Star className={cn("h-4 w-4", className)} />
      case "Award":
        return <Award className={cn("h-4 w-4", className)} />
      case "Users":
        return <Trophy className={cn("h-4 w-4", className)} />
      default:
        return <Award className={cn("h-4 w-4", className)} />
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Study Streak
          </CardTitle>
          <CardDescription>Keep up your daily study habit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{streak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Next milestone: {nextMilestone} days</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="mt-4 pt-3 border-t">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Recent Achievements
            </h4>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {renderIcon(achievement.icon, achievement.color)}
                    <span className="text-sm">{achievement.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

