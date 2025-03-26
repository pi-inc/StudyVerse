"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export function DailyPlan() {
  const [todaysTasks, setTodaysTasks] = useState([
    {
      id: 1,
      title: "Review Arrays and Linked Lists",
      time: "9:00 AM - 10:30 AM",
      completed: false,
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
  ])

  const { toast } = useToast()
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

  const handleTaskToggle = (taskId: number) => {
    setTodaysTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )

    const task = todaysTasks.find((t) => t.id === taskId)
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed!",
        description: task.title,
        className: task.completed
          ? "bg-muted"
          : "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
      })
    }
  }

  return (
    <section>
      <Card className="card overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-study-blue to-study-teal"></div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-study-blue" />
              Today's Plan
            </div>
            <span className="text-sm font-normal text-muted-foreground">{today}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {todaysTasks.length > 0 ? (
            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0 lg:grid-cols-3">
              {todaysTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${task.completed ? "bg-muted/50 border-muted" : "bg-card border-border"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="h-5 w-5"
                      />
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
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <CheckCircle className="h-8 w-8 text-study-green mx-auto mb-2" />
              <p className="text-muted-foreground">All tasks completed for today!</p>
            </div>
          )}

          <Button variant="outline" className="w-full mt-2 h-10" asChild>
            <Link href="/plan" className="flex items-center justify-center">
              View Full Schedule
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

