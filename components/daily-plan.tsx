"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DailyPlan() {
  const todaysTasks = [
    {
      id: 1,
      title: "Review Arrays and Linked Lists",
      time: "9:00 AM - 10:30 AM",
      completed: true,
      course: "Data Structures",
    },
    {
      id: 2,
      title: "Complete Quiz on Sorting Algorithms",
      time: "11:00 AM - 12:00 PM",
      completed: false,
      course: "Algorithms",
    },
    {
      id: 3,
      title: "Watch Lecture on Neural Networks",
      time: "2:00 PM - 3:30 PM",
      completed: false,
      course: "Machine Learning",
    },
  ]

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Today's Plan</h2>
        <Button variant="ghost" size="sm" asChild className="text-sm h-8 px-2">
          <Link href="/plan" className="flex items-center gap-1">
            View all <Calendar className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{today}</span>
          </div>
        </CardHeader>
        <CardContent className="p-3 space-y-3">
          {todaysTasks.length > 0 ? (
            todaysTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${task.completed ? "bg-muted/50 border-muted" : "bg-card border-border"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <Checkbox checked={task.completed} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-sm font-medium line-clamp-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        {task.course}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.time}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-6 text-center">
              <CheckCircle className="h-8 w-8 text-study-green mx-auto mb-2" />
              <p className="text-muted-foreground">All tasks completed for today!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

