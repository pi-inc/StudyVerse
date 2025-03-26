"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BookOpen, Star, Sparkles, History, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MobileLayout } from "@/components/mobile-layout"

export default function CoursesPage() {
  // Simulated user data - in a real app, this would come from a user profile or API
  const userInterests = ["Computer Science", "Data Science"]
  const userSkillLevel = "Intermediate"

  // Curated course collections based on user data
  const courseCollections = [
    {
      id: "recommended",
      title: "Recommended for You",
      description: "Based on your interests and skill level",
      icon: Sparkles,
      color: "text-study-purple",
      bgColor: "bg-study-purple/10",
    },
    {
      id: "continue",
      title: "Continue Learning",
      description: "Pick up where you left off",
      icon: History,
      color: "text-study-blue",
      bgColor: "bg-study-blue/10",
    },
    {
      id: "goals",
      title: "Learning Path: Data Science",
      description: "Courses to help you reach your goals",
      icon: Target,
      color: "text-study-teal",
      bgColor: "bg-study-teal/10",
    },
  ]

  // Sample courses data - organized by collection
  const courses = {
    recommended: [
      {
        id: 3,
        title: "Machine Learning Fundamentals",
        description: "Understand the core concepts of machine learning",
        level: "Intermediate",
        category: "Data Science",
        color: "from-study-teal to-study-green",
        icon: "🤖",
        rating: 4.9,
        students: 1540,
      },
      {
        id: 2,
        title: "Data Structures and Algorithms",
        description: "Master essential data structures and algorithms",
        level: "Intermediate",
        category: "Computer Science",
        color: "from-study-blue to-study-teal",
        icon: "🧮",
        rating: 4.7,
        students: 980,
      },
    ],
    continue: [
      {
        id: 1,
        title: "Introduction to Computer Science",
        description: "Learn the basics of computer science and programming",
        level: "Beginner",
        progress: 45,
        category: "Computer Science",
        color: "from-study-purple to-study-blue",
        icon: "💻",
        rating: 4.8,
        students: 1250,
      },
    ],
    goals: [
      {
        id: 3,
        title: "Machine Learning Fundamentals",
        description: "Understand the core concepts of machine learning",
        level: "Intermediate",
        category: "Data Science",
        color: "from-study-teal to-study-green",
        icon: "🤖",
        rating: 4.9,
        students: 1540,
      },
      {
        id: 5,
        title: "Data Visualization with Python",
        description: "Learn to create compelling visualizations with Python",
        level: "Intermediate",
        category: "Data Science",
        color: "from-study-yellow to-study-orange",
        icon: "📊",
        rating: 4.6,
        students: 1120,
      },
    ],
  }

  return (
    <MobileLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold gradient-text">Courses</h1>
          </div>

          <Button
            asChild
            size="sm"
            className="h-8 px-3 bg-gradient-to-r from-study-purple to-study-blue text-white shadow-sm"
          >
            <Link href="/courses/request">Request Course</Link>
          </Button>
        </div>

        {/* Course Collections */}
        <div className="space-y-6">
          {courseCollections.map((collection, collectionIndex) => (
            <section key={collection.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${collection.bgColor}`}>
                    <collection.icon className={`h-4 w-4 ${collection.color}`} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">{collection.title}</h2>
                    <p className="text-xs text-muted-foreground">{collection.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {courses[collection.id as keyof typeof courses].map((course, courseIndex) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: courseIndex * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={`/courses/${course.id}`}>
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className={`h-1.5 bg-gradient-to-r ${course.color}`}></div>
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="text-2xl">{course.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-base line-clamp-1">{course.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{course.description}</p>

                              {"progress" in course && (
                                <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                                  <div
                                    className={`h-full bg-gradient-to-r ${course.color}`}
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {course.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {course.level}
                                </Badge>
                                <div className="flex items-center text-xs">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                                  <span>{course.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View All link for each collection */}
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" asChild className="text-xs h-8 px-2">
                  <Link href={`/courses/explore?collection=${collection.id}`} className="flex items-center gap-1">
                    View all <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </section>
          ))}
        </div>

        {/* Explore More Courses Button */}
        <div className="pt-4">
          <Link href="/courses/explore">
            <Button className="w-full bg-gradient-to-r from-study-purple to-study-blue text-white shadow-md h-12">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore All Courses
            </Button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}

