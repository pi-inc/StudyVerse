"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, BookOpen, Star, ArrowRight, Search, Filter, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RecommendedContent } from "@/components/recommended-content"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample courses data
  const courses = [
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
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master essential data structures and algorithms",
      level: "Intermediate",
      progress: 30,
      category: "Computer Science",
      color: "from-study-blue to-study-teal",
      icon: "🧮",
      rating: 4.7,
      students: 980,
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      description: "Understand the core concepts of machine learning",
      level: "Advanced",
      category: "Data Science",
      color: "from-study-teal to-study-green",
      icon: "🤖",
      rating: 4.9,
      students: 1540,
    },
  ]

  // Recent AI tutor questions
  const recentQuestions = [
    "How do binary trees work?",
    "Explain the difference between arrays and linked lists",
    "What is the time complexity of quicksort?",
    "How does machine learning work?",
  ]

  return (
    <MobileLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold gradient-text">Learn</h1>

        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 h-14 w-full max-w-md mx-auto">
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-purple/20 data-[state=active]:to-study-blue/20"
            >
              <div className="flex flex-col items-center">
                <BookOpen className="h-4 w-4 mb-1" />
                <span className="text-xs">Courses</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="ai-tutor"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-blue/20 data-[state=active]:to-study-teal/20"
            >
              <div className="flex flex-col items-center">
                <Lightbulb className="h-4 w-4 mb-1" />
                <span className="text-xs">AI Tutor</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Continue Learning</h2>
              <Button variant="ghost" size="sm" asChild className="text-sm h-8 px-2">
                <Link href="/courses" className="flex items-center gap-1">
                  See all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0 lg:grid-cols-3">
              {courses.slice(0, 2).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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

            {/* Added Recommended Content Section */}
            <div className="mt-6">
              <RecommendedContent />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h2 className="text-lg font-semibold">Explore Courses</h2>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-9 h-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 gap-1 whitespace-nowrap">
                      <Filter className="h-4 w-4" />
                      <span className="text-sm">Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Courses</DropdownMenuItem>
                    <DropdownMenuItem>Computer Science</DropdownMenuItem>
                    <DropdownMenuItem>Data Science</DropdownMenuItem>
                    <DropdownMenuItem>Web Development</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0 lg:grid-cols-3">
              {courses.slice(2, 3).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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

            <div className="pt-2">
              <Button className="w-full bg-gradient-to-r from-study-purple to-study-blue text-white" asChild>
                <Link href="/courses/explore">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Courses
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* AI Tutor Tab */}
          <TabsContent value="ai-tutor" className="space-y-4">
            <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
              <div className="flex-1 overflow-y-auto">
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">AI Tutor</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Get personalized help with any topic or question. Your AI tutor is available 24/7.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-study-purple to-study-blue text-white mb-4" asChild>
                      <Link href="/tutor">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Ask AI Tutor
                      </Link>
                    </Button>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Recent Questions</h3>
                      <div className="space-y-2">
                        {recentQuestions.map((question, index) => (
                          <Link href={`/tutor?q=${encodeURIComponent(question)}`} key={index}>
                            <div className="p-2 rounded-md border hover:bg-muted/50 transition-colors text-sm flex items-center">
                              <Lightbulb className="h-4 w-4 text-study-purple mr-2" />
                              {question}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-study-blue to-study-teal" />
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">Learning Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Link href="/resources/videos">
                        <div className="p-3 rounded-md border hover:bg-muted/50 transition-colors flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-study-blue/20 flex items-center justify-center text-study-blue mr-3">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">Video Tutorials</h3>
                              <p className="text-xs text-muted-foreground">Learn through visual explanations</p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>

                      <Link href="/resources/articles">
                        <div className="p-3 rounded-md border hover:bg-muted/50 transition-colors flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-study-teal/20 flex items-center justify-center text-study-teal mr-3">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">Articles & Guides</h3>
                              <p className="text-xs text-muted-foreground">In-depth written explanations</p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

