"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ArrowRight } from "lucide-react"

export function QuickAccess() {
  const recentCourses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      progress: 45,
      color: "from-study-purple to-study-blue",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      progress: 30,
      color: "from-study-blue to-study-teal",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Quick Access</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/courses" className="flex items-center">
            All Courses <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden border-none shadow-md">
            <CardContent className="p-0">
              <Link href={`/courses/${course.id}`} className="block">
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <div className="p-4 flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r ${course.color} text-white`}
                  >
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">{course.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{course.progress}% complete</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}

        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-study-green/10 to-study-yellow/10">
          <CardContent className="p-0">
            <Link href="/courses" className="block">
              <div className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-study-green to-study-yellow text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Browse All Courses</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Find your next learning adventure</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

