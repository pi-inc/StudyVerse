"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Circle,
  BookOpen,
  Brain,
  Layers,
  Zap,
  AlertCircle,
  Filter,
  ArrowUpRight,
  ArrowLeft,
  CalendarPlus2Icon as CalendarIcon2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { MobileLayout } from "@/components/mobile-layout"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function PlanPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedView, setSelectedView] = useState<"day" | "week" | "month">("day")
  const [showCompleted, setShowCompleted] = useState(true)
  const { toast } = useToast()

  const handleAddTask = () => {
    toast({
      title: "Add new task",
      description: "Task creation modal would open here",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleDateChange = (increment: number) => {
    const newDate = new Date(selectedDate)
    if (selectedView === "day") {
      newDate.setDate(newDate.getDate() + increment)
    } else if (selectedView === "week") {
      newDate.setDate(newDate.getDate() + increment * 7)
    } else {
      newDate.setMonth(newDate.getMonth() + increment)
    }
    setSelectedDate(newDate)
  }

  const handleTaskComplete = (taskId: number) => {
    // In a real app, this would update the task in the database
    toast({
      title: "Task completed",
      description: "Great job! Keep up the good work.",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  // Sample data
  const tasks = [
    {
      id: 1,
      title: "Review Arrays and Linked Lists",
      course: "Data Structures",
      time: "9:00 AM - 10:30 AM",
      completed: true,
      priority: "high",
      type: "revision",
    },
    {
      id: 2,
      title: "Complete Quiz on Sorting Algorithms",
      course: "Algorithms",
      time: "11:00 AM - 12:00 PM",
      completed: false,
      priority: "medium",
      type: "quiz",
    },
    {
      id: 3,
      title: "Watch Lecture on Neural Networks",
      course: "Machine Learning",
      time: "2:00 PM - 3:30 PM",
      completed: false,
      priority: "medium",
      type: "lecture",
    },
    {
      id: 4,
      title: "Practice React Hooks",
      course: "Web Development",
      time: "4:00 PM - 5:30 PM",
      completed: false,
      priority: "low",
      type: "practice",
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Data Structures Assignment",
      course: "Data Structures",
      dueDate: "Tomorrow, 11:59 PM",
      progress: 75,
    },
    {
      id: 2,
      title: "Machine Learning Project",
      course: "Machine Learning",
      dueDate: "In 3 days",
      progress: 30,
    },
  ]

  const studyStats = [
    {
      title: "Study Hours",
      value: "4.5",
      unit: "hours",
      change: "+0.5",
      trend: "up",
    },
    {
      title: "Focus Score",
      value: "8.2",
      unit: "/10",
      change: "+1.3",
      trend: "up",
    },
    {
      title: "Tasks Completed",
      value: "12",
      unit: "/15",
      change: "-2",
      trend: "down",
    },
  ]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/30"
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
    }
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "revision":
        return <Brain className="h-4 w-4 text-study-purple" />
      case "quiz":
        return <Layers className="h-4 w-4 text-study-blue" />
      case "lecture":
        return <BookOpen className="h-4 w-4 text-study-teal" />
      case "practice":
        return <Zap className="h-4 w-4 text-study-green" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const filteredTasks = showCompleted ? tasks : tasks.filter((task) => !task.completed)

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold gradient-text">Planner</h1>
          </div>

          <Button
            className="h-8 w-8 p-0 bg-gradient-to-r from-study-purple to-study-blue text-white rounded-full shadow-sm"
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Navigation */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDateChange(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-study-purple" />
                <span className="font-medium text-sm">{formatDate(selectedDate)}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDateChange(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <Button
                variant={selectedView === "day" ? "default" : "outline"}
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={() => setSelectedView("day")}
              >
                Day
              </Button>
              <Button
                variant={selectedView === "week" ? "default" : "outline"}
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={() => setSelectedView("week")}
              >
                Week
              </Button>
              <Button
                variant={selectedView === "month" ? "default" : "outline"}
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={() => setSelectedView("month")}
              >
                Month
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Stats */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {studyStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm min-w-[140px] flex-shrink-0">
              <CardContent className="p-3">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-bold">
                      {stat.value}
                      <span className="text-xs font-normal text-muted-foreground">{stat.unit}</span>
                    </p>
                    <div
                      className={`flex items-center ${stat.trend === "up" ? "text-study-green" : "text-study-orange"}`}
                    >
                      <span className="text-xs font-medium">{stat.change}</span>
                      <ArrowUpRight className={`h-3 w-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tasks for Today */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Today's Tasks</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {showCompleted ? "Hide completed" : "Show completed"}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Filter className="h-3.5 w-3.5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:max-w-md">
                <div className="py-4">
                  <h3 className="text-lg font-medium mb-4">Filter Tasks</h3>
                  {/* Filter options would go here */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg border ${
                  task.completed ? "bg-muted/50 border-muted" : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <Checkbox checked={task.completed} onCheckedChange={() => handleTaskComplete(task.id)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3
                        className={`text-sm font-medium line-clamp-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        {task.course}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-muted">
                        {getTaskTypeIcon(task.type)}
                        <span className="ml-1">{task.type.charAt(0).toUpperCase() + task.type.slice(1)}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-8 text-center">
              <CalendarIcon2 className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-20" />
              <h3 className="text-base font-medium">No tasks for today</h3>
              <p className="text-sm text-muted-foreground mt-1">Add a task to get started</p>
              <Button className="mt-4" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          )}
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <h2 className="text-base font-semibold mb-3">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-none shadow-sm">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm">{deadline.title}</h3>
                          <p className="text-xs text-muted-foreground">{deadline.course}</p>
                        </div>
                        <Badge
                          className={
                            deadline.dueDate.includes("Tomorrow")
                              ? "bg-red-500/10 text-red-500"
                              : "bg-amber-500/10 text-amber-500"
                          }
                        >
                          {deadline.dueDate}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{deadline.progress}%</span>
                        </div>
                        <Progress
                          value={deadline.progress}
                          className="h-1.5"
                          indicatorClassName={
                            deadline.progress < 30
                              ? "bg-study-orange"
                              : deadline.progress < 70
                                ? "bg-study-blue"
                                : "bg-study-green"
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Study Tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex gap-3">
              <div className="shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium text-amber-600 dark:text-amber-400 text-sm">Pomodoro Technique</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Try studying in 25-minute focused sessions with 5-minute breaks in between. This can help maintain
                  concentration and prevent burnout.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  )
}

