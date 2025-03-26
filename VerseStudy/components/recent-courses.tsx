"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentCourses() {
  const recentCourses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      progress: 45,
      lastAccessed: "2 hours ago",
      color: "from-study-purple to-study-blue",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      progress: 30,
      lastAccessed: "Yesterday",
      color: "from-study-blue to-study-teal",
    },
  ]

  return (
    <section>
      <Card className="border-none shadow-md overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-study-purple to-study-blue"></div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-study-purple" />
            Continue Learning
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
            {recentCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/courses/${course.id}`}>
                  <Card className="card card-hover overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-base line-clamp-1">{course.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground ml-2 shrink-0">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{course.lastAccessed}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${course.color}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1 bg-gradient-to-r from-study-purple to-study-blue text-white h-10" asChild>
              <Link href="/learn">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Courses
              </Link>
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-study-blue to-study-teal text-white h-10" asChild>
              <Link href="/tutor">
                <Lightbulb className="h-4 w-4 mr-2" />
                Ask AI Tutor
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

