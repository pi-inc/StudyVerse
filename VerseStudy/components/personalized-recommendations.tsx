"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for recommendations
const RECOMMENDATIONS = [
  {
    id: 1,
    title: "Advanced Calculus: Derivatives",
    type: "Course",
    category: "Mathematics",
    reason: "Based on your recent activity",
    duration: "2 hours",
    difficulty: "Intermediate",
    link: "/courses/1",
  },
  {
    id: 2,
    title: "Physics Formulas Flashcards",
    type: "Revision",
    category: "Physics",
    reason: "Recommended for your upcoming exam",
    duration: "30 minutes",
    difficulty: "Various",
    link: "/revision/2",
  },
  {
    id: 3,
    title: "Programming Concepts Quiz",
    type: "Assessment",
    category: "Computer Science",
    reason: "To strengthen your knowledge",
    duration: "15 minutes",
    difficulty: "Beginner",
    link: "/learn/3",
  },
]

export function PersonalizedRecommendations() {
  return (
    <Card className="border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recommended for You</CardTitle>
            <CardDescription>Personalized content based on your learning journey</CardDescription>
          </div>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {RECOMMENDATIONS.map((item) => (
            <Card key={item.id} className="overflow-hidden border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{item.type}</Badge>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
                <CardDescription>{item.reason}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{item.duration}</span>
                  <span className="mx-2">•</span>
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{item.difficulty}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href={item.link}>
                    Start Learning
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Recommendations
        </Button>
      </CardFooter>
    </Card>
  )
}

