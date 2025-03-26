"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Heart, Clock, Users, BarChart, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"

// Mock data for a course
const courseData = {
  id: "1",
  title: "Introduction to Machine Learning",
  description:
    "Learn the fundamentals of machine learning, including supervised and unsupervised learning, model evaluation, and practical applications.",
  instructor: "Dr. Sarah Johnson",
  level: "Intermediate",
  duration: "8 weeks",
  enrolled: 1289,
  rating: 4.8,
  progress: 35,
  lastAccessed: "2 days ago",
  image: "/placeholder.svg?height=400&width=600",
  topics: [
    {
      id: "topic-1",
      title: "Introduction to Machine Learning Concepts",
      description: "Overview of key machine learning paradigms and applications",
      duration: "45 minutes",
      completed: true,
      content: [
        {
          id: "content-1",
          title: "What is Machine Learning?",
          type: "video",
          duration: "15 minutes",
          completed: true,
        },
        {
          id: "content-2",
          title: "Types of Machine Learning",
          type: "reading",
          duration: "20 minutes",
          completed: true,
        },
        {
          id: "content-3",
          title: "Knowledge Check",
          type: "quiz",
          duration: "10 minutes",
          completed: true,
        },
      ],
    },
    {
      id: "topic-2",
      title: "Supervised Learning Algorithms",
      description: "Deep dive into classification and regression techniques",
      duration: "1 hour 30 minutes",
      completed: true,
      content: [
        {
          id: "content-4",
          title: "Linear Regression",
          type: "video",
          duration: "25 minutes",
          completed: true,
        },
        {
          id: "content-5",
          title: "Decision Trees",
          type: "video",
          duration: "20 minutes",
          completed: true,
        },
        {
          id: "content-6",
          title: "Support Vector Machines",
          type: "reading",
          duration: "25 minutes",
          completed: true,
        },
        {
          id: "content-7",
          title: "Supervised Learning Quiz",
          type: "quiz",
          duration: "20 minutes",
          completed: true,
        },
      ],
    },
    {
      id: "topic-3",
      title: "Unsupervised Learning",
      description: "Clustering and dimensionality reduction techniques",
      duration: "1 hour 15 minutes",
      completed: false,
      content: [
        {
          id: "content-8",
          title: "K-means Clustering",
          type: "video",
          duration: "20 minutes",
          completed: true,
        },
        {
          id: "content-9",
          title: "Hierarchical Clustering",
          type: "reading",
          duration: "25 minutes",
          completed: false,
        },
        {
          id: "content-10",
          title: "Principal Component Analysis",
          type: "video",
          duration: "20 minutes",
          completed: false,
        },
        {
          id: "content-11",
          title: "Unsupervised Learning Quiz",
          type: "quiz",
          duration: "10 minutes",
          completed: false,
        },
      ],
    },
    {
      id: "topic-4",
      title: "Model Evaluation and Validation",
      description: "Techniques to assess model performance and prevent overfitting",
      duration: "1 hour",
      completed: false,
      content: [
        {
          id: "content-12",
          title: "Training and Test Sets",
          type: "video",
          duration: "15 minutes",
          completed: false,
        },
        {
          id: "content-13",
          title: "Cross-Validation",
          type: "reading",
          duration: "20 minutes",
          completed: false,
        },
        {
          id: "content-14",
          title: "Metrics for Model Evaluation",
          type: "video",
          duration: "15 minutes",
          completed: false,
        },
        {
          id: "content-15",
          title: "Evaluation Quiz",
          type: "quiz",
          duration: "10 minutes",
          completed: false,
        },
      ],
    },
    {
      id: "topic-5",
      title: "Final Project",
      description: "Apply your knowledge to a real-world machine learning problem",
      duration: "3 hours",
      completed: false,
      content: [
        {
          id: "content-16",
          title: "Project Guidelines",
          type: "reading",
          duration: "30 minutes",
          completed: false,
        },
        {
          id: "content-17",
          title: "Dataset Exploration",
          type: "exercise",
          duration: "45 minutes",
          completed: false,
        },
        {
          id: "content-18",
          title: "Model Building and Training",
          type: "exercise",
          duration: "1 hour",
          completed: false,
        },
        {
          id: "content-19",
          title: "Final Submission",
          type: "assignment",
          duration: "45 minutes",
          completed: false,
        },
      ],
    },
  ],
  resources: [
    {
      id: "resource-1",
      title: "Machine Learning Cheat Sheet",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      id: "resource-2",
      title: "Python Code Examples",
      type: "ZIP",
      size: "5.1 MB",
    },
    {
      id: "resource-3",
      title: "Recommended Reading List",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      id: "resource-4",
      title: "Dataset for Exercises",
      type: "CSV",
      size: "8.7 MB",
    },
  ],
  discussions: [
    {
      id: "discussion-1",
      title: "Trouble understanding PCA implementation",
      author: "Alex Chen",
      replies: 8,
      lastActivity: "2 hours ago",
    },
    {
      id: "discussion-2",
      title: "Best approach for the final project?",
      author: "Jamie Smith",
      replies: 12,
      lastActivity: "1 day ago",
    },
    {
      id: "discussion-3",
      title: "Additional resources for SVM",
      author: "Taylor Wong",
      replies: 5,
      lastActivity: "3 days ago",
    },
  ],
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("content")
  const { toast } = useToast()
  const router = useRouter()

  const handleLikeCourse = () => {
    toast({
      title: "Course Liked",
      description: "This course has been added to your likes",
    })
  }

  const handleEnroll = () => {
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in this course",
    })
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">▶</div>
      case "reading":
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">📖</div>
        )
      case "quiz":
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">❓</div>
        )
      case "exercise":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">💻</div>
        )
      case "assignment":
        return <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">📝</div>
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">📄</div>
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/courses" className="hover:text-primary transition-colors">
          Courses
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium truncate">{courseData.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader className="relative pb-0">
                <div className="absolute right-4 top-4 flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleLikeCourse} aria-label="Like this course">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold">{courseData.title}</CardTitle>
                    <CardDescription className="mt-2">{courseData.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">{courseData.level}</Badge>
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {courseData.duration}
                      </Badge>
                      <Badge variant="outline">
                        <Users className="mr-1 h-3 w-3" />
                        {courseData.enrolled.toLocaleString()} enrolled
                      </Badge>
                      <Badge variant="outline">
                        <BarChart className="mr-1 h-3 w-3" />
                        {courseData.rating} rating
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Your progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={courseData.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{courseData.progress}%</span>
                    </div>
                  </div>
                  <Button onClick={handleEnroll} className="w-full sm:w-auto">
                    Continue Learning
                  </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      {courseData.topics.map((topic, index) => (
                        <AccordionItem key={topic.id} value={topic.id}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-start text-left">
                              <div className="mr-4 mt-0.5">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                    topic.completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {topic.completed ? "✓" : index + 1}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium">{topic.title}</h3>
                                <p className="text-sm text-muted-foreground">{topic.description}</p>
                                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {topic.duration}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-10 space-y-3">
                              {topic.content.map((content) => (
                                <div
                                  key={content.id}
                                  className={`p-3 rounded-lg border ${
                                    content.completed ? "bg-gray-50" : "hover:bg-gray-50"
                                  } transition-colors cursor-pointer`}
                                >
                                  <div className="flex items-center">
                                    {getContentIcon(content.type)}
                                    <div className="ml-3 flex-1">
                                      <h4 className="font-medium text-sm">{content.title}</h4>
                                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                        <span className="capitalize">{content.type}</span>
                                        <span className="mx-1">•</span>
                                        <Clock className="mr-1 h-3 w-3" />
                                        {content.duration}
                                      </div>
                                    </div>
                                    {content.completed && (
                                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">
                                        ✓
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="resources">
                    <div className="space-y-3">
                      {courseData.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                              {resource.type}
                            </div>
                            <div className="ml-3 flex-1">
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">{resource.size}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="discussions">
                    <div className="space-y-3">
                      {courseData.discussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <h4 className="font-medium">{discussion.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-muted-foreground">
                              Started by {discussion.author} • {discussion.replies} replies
                            </p>
                            <p className="text-xs text-muted-foreground">Last activity: {discussion.lastActivity}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center mt-4">
                        <Button variant="outline">Start New Discussion</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => router.push("/courses")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => router.push("/revise")}>
              <BookOpen className="mr-2 h-4 w-4" />
              Review Materials
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    SJ
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{courseData.instructor}</h3>
                    <p className="text-sm text-muted-foreground">Machine Learning Professor</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Last accessed</p>
                  <p className="font-medium">{courseData.lastAccessed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time spent</p>
                  <p className="font-medium">4 hours 23 minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed items</p>
                  <p className="font-medium">8 of 19</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-green-600">✓</div>
                    <span>Understand core machine learning concepts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-green-600">✓</div>
                    <span>Implement supervised learning algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-green-600">✓</div>
                    <span>Apply clustering and dimensionality reduction</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-green-600">✓</div>
                    <span>Evaluate and validate machine learning models</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-green-600">✓</div>
                    <span>Build a complete machine learning project</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

