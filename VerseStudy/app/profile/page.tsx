"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Briefcase, Edit, Camera, Save, Award, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  const achievements = [
    { id: 1, name: "Fast Learner", description: "Completed 5 lessons in one day", icon: "🚀", date: "Oct 15, 2023" },
    { id: 2, name: "Perfect Score", description: "Scored 100% on a quiz", icon: "🎯", date: "Oct 12, 2023" },
    { id: 3, name: "Streak Keeper", description: "Maintained a 7-day study streak", icon: "🔥", date: "Oct 5, 2023" },
  ]

  const courses = [
    { id: 1, name: "Data Structures", progress: 65, totalHours: 24, completedHours: 15.6 },
    { id: 2, name: "Algorithms", progress: 40, totalHours: 30, completedHours: 12 },
    { id: 3, name: "Web Development", progress: 80, totalHours: 40, completedHours: 32 },
  ]

  const activities = [
    { id: 1, action: "Completed quiz", subject: "Arrays and Linked Lists", time: "2 hours ago" },
    { id: 2, action: "Reviewed flashcards", subject: "Data Structures", time: "Yesterday" },
    { id: 3, action: "Started course", subject: "Advanced Algorithms", time: "3 days ago" },
    { id: 4, action: "Earned achievement", subject: "Perfect Score", time: "1 week ago" },
  ]

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold gradient-text mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="border-none shadow-md overflow-hidden lg:col-span-1">
            <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
            <CardHeader className="pb-2 relative">
              {isEditing ? (
                <Button
                  className="absolute right-4 top-4 bg-study-green text-white"
                  size="sm"
                  onClick={handleSaveProfile}
                >
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              ) : (
                <Button
                  className="absolute right-4 top-4"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              )}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl">John Doe</CardTitle>
                <CardDescription>Computer Science Student</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-study-purple/20 text-study-purple">Level 5</Badge>
                  <Badge className="bg-study-blue/20 text-study-blue">750 Points</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-study-purple" />
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-study-blue" />
                  <span className="text-sm">john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-study-teal" />
                  <span className="text-sm">Joined September 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-study-green" />
                  <span className="text-sm">New York, USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-study-yellow" />
                  <span className="text-sm">Computer Science Student</span>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Current Study Streak</h3>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-study-orange/20 flex items-center justify-center text-study-orange">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">5 day streak</div>
                    <Progress value={71} className="h-1.5" indicatorClassName="bg-study-orange" />
                  </div>
                  <div className="text-xs text-muted-foreground">5/7</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto pb-2">
              <div className="grid grid-cols-3 w-full max-w-[400px] bg-muted rounded-md p-1">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${activeTab === "overview" ? "bg-gradient-to-r from-study-purple/20 to-study-blue/20" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "courses" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${activeTab === "courses" ? "bg-gradient-to-r from-study-blue/20 to-study-teal/20" : ""}`}
                  onClick={() => setActiveTab("courses")}
                >
                  <BookOpen className="h-4 w-4" />
                  Courses
                </Button>
                <Button
                  variant={activeTab === "achievements" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${activeTab === "achievements" ? "bg-gradient-to-r from-study-teal/20 to-study-green/20" : ""}`}
                  onClick={() => setActiveTab("achievements")}
                >
                  <Award className="h-4 w-4" />
                  Achievements
                </Button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                        <div className="h-8 w-8 rounded-full bg-study-blue/20 flex items-center justify-center text-study-blue">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-blue to-study-teal" />
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Courses you're currently enrolled in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{course.name}</h3>
                          <span className="text-sm">{course.progress}% complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{course.completedHours} hours completed</span>
                          <span>{course.totalHours} total hours</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-study-blue to-study-teal text-white">
                    Browse More Courses
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-teal to-study-green" />
                <CardHeader>
                  <CardTitle>My Achievements</CardTitle>
                  <CardDescription>Badges and milestones you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id} className="border border-study-yellow/30 bg-study-yellow/5">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-study-yellow/20 flex items-center justify-center text-2xl">
                              {achievement.icon}
                            </div>
                            <div>
                              <h3 className="font-bold">{achievement.name}</h3>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">Earned on {achievement.date}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

