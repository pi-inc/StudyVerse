"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Clock, BarChart2, BookOpen, CheckCircle, Circle, ArrowRight } from "lucide-react"

export function LearningPathMap() {
  const [activeView, setActiveView] = useState("map")

  const topics = [
    {
      id: 1,
      title: "Introduction to Data Structures",
      progress: 100,
      status: "completed",
      subtopics: [
        { id: 101, title: "What are Data Structures?", status: "completed" },
        { id: 102, title: "Importance in Computer Science", status: "completed" },
        { id: 103, title: "Types of Data Structures", status: "completed" },
      ],
    },
    {
      id: 2,
      title: "Arrays and Linked Lists",
      progress: 75,
      status: "in-progress",
      subtopics: [
        { id: 201, title: "Arrays: Basics and Operations", status: "completed" },
        { id: 202, title: "Linked Lists: Concepts", status: "completed" },
        { id: 203, title: "Linked Lists: Implementation", status: "in-progress" },
        { id: 204, title: "Comparing Arrays and Linked Lists", status: "not-started" },
      ],
    },
    {
      id: 3,
      title: "Stacks and Queues",
      progress: 0,
      status: "not-started",
      subtopics: [
        { id: 301, title: "Stack: LIFO Principle", status: "not-started" },
        { id: 302, title: "Stack: Implementation", status: "not-started" },
        { id: 303, title: "Queue: FIFO Principle", status: "not-started" },
        { id: 304, title: "Queue: Implementation", status: "not-started" },
      ],
    },
    {
      id: 4,
      title: "Trees and Graphs",
      progress: 0,
      status: "not-started",
      subtopics: [
        { id: 401, title: "Tree: Concepts and Terminology", status: "not-started" },
        { id: 402, title: "Binary Trees", status: "not-started" },
        { id: 403, title: "Tree Traversal", status: "not-started" },
        { id: 404, title: "Graphs: Concepts", status: "not-started" },
        { id: 405, title: "Graph Traversal", status: "not-started" },
      ],
    },
    {
      id: 5,
      title: "Hash Tables",
      progress: 0,
      status: "not-started",
      subtopics: [
        { id: 501, title: "Hash Functions", status: "not-started" },
        { id: 502, title: "Collision Resolution", status: "not-started" },
        { id: 503, title: "Hash Table Implementation", status: "not-started" },
      ],
    },
  ]

  const stats = [
    { id: 1, title: "Topics Completed", value: "1/5", icon: CheckCircle, color: "text-study-green" },
    { id: 2, title: "Overall Progress", value: "35%", icon: BarChart2, color: "text-study-blue" },
    { id: 3, title: "Study Time", value: "4.5 hrs", icon: Clock, color: "text-study-purple" },
    { id: 4, title: "Study Streak", value: "3 days", icon: Calendar, color: "text-study-orange" },
  ]

  const achievements = [
    { id: 1, title: "Fast Learner", description: "Completed 5 lessons in one day", date: "Oct 15, 2023", icon: "🚀" },
    { id: 2, title: "Perfect Score", description: "Scored 100% on a quiz", date: "Oct 12, 2023", icon: "🎯" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-study-green text-white"
      case "in-progress":
        return "bg-study-blue text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Circle className="h-4 w-4 animate-pulse" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
          >
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Tabs */}
      <Tabs defaultValue="map" value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-purple/20 data-[state=active]:to-study-blue/20"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learning Path
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-yellow/20 data-[state=active]:to-study-orange/20"
          >
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        {/* Learning Path Map */}
        <TabsContent value="map" className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
            <CardHeader className="pb-2">
              <CardTitle>Data Structures Learning Path</CardTitle>
              <CardDescription>Track your progress through the complete data structures curriculum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(topic.status)}`}>{getStatusIcon(topic.status)}</Badge>
                        <h3 className="font-medium">{topic.title}</h3>
                      </div>
                      <span className="text-sm font-medium">{topic.progress}%</span>
                    </div>

                    <Progress
                      value={topic.progress}
                      className="h-2"
                      indicatorClassName={`${
                        topic.status === "completed"
                          ? "bg-study-green"
                          : topic.status === "in-progress"
                            ? "bg-study-blue"
                            : "bg-muted"
                      }`}
                    />

                    <div className="pl-6 space-y-2 mt-2">
                      {topic.subtopics.map((subtopic) => (
                        <div
                          key={subtopic.id}
                          className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <Badge
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${getStatusColor(subtopic.status)}`}
                          >
                            {getStatusIcon(subtopic.status)}
                          </Badge>
                          <span className={subtopic.status === "completed" ? "line-through text-muted-foreground" : ""}>
                            {subtopic.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {index < topics.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-study-yellow to-study-orange" />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-study-yellow" />
                Your Achievements
              </CardTitle>
              <CardDescription>Badges and milestones you've earned on your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border border-study-yellow/30 bg-study-yellow/5">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-study-yellow/20 flex items-center justify-center text-3xl">
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">Earned on {achievement.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Locked Achievements */}
                {[1, 2].map((_, index) => (
                  <motion.div
                    key={`locked-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
                  >
                    <Card className="border border-muted bg-muted/5 opacity-60">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center text-3xl">
                            🔒
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">Achievement Locked</h3>
                            <p className="text-sm text-muted-foreground">
                              Continue learning to unlock this achievement
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

