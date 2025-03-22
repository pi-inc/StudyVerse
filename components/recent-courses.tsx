"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Continue Learning</h2>
        <Button variant="ghost" size="sm" asChild className="text-sm h-8 px-2">
          <Link href="/courses" className="flex items-center gap-1">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {recentCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={`/courses/${course.id}`}>
              <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-1.5 bg-gradient-to-r ${course.color}`}></div>
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r ${course.color} text-white shrink-0`}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm line-clamp-1">{course.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{course.lastAccessed}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Link href="/courses">
            <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-study-green/5 to-study-yellow/5">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-study-green to-study-yellow text-white">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Browse All Courses</h3>
                    <p className="text-xs text-muted-foreground">Find your next learning adventure</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

