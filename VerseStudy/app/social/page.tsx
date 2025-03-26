"use client"

import { useState } from "react"
import {
  Users,
  MessageSquare,
  Search,
  Plus,
  UserPlus,
  Calendar,
  MessageCircle,
  ArrowLeft,
  X,
  BookOpen,
  Video,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { MobileLayout } from "@/components/mobile-layout"
import Link from "next/link"

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("active-users")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleStartChat = (userName: string) => {
    toast({
      title: "Chat Started",
      description: `You've started a conversation with ${userName}`,
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleInviteToStudy = (userName: string) => {
    toast({
      title: "Study Invitation Sent",
      description: `You've invited ${userName} to study together`,
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group Joined",
      description: `You've successfully joined the ${groupName} group`,
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  // User's enrolled courses and interests
  const userCourses = ["Data Structures", "Algorithms", "Web Development"]
  const userInterests = ["Computer Science", "Programming", "Mathematics"]

  // Active users studying similar topics
  const activeUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      status: "online",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SC",
      studyingNow: "Data Structures",
      lastActive: "Just now",
      commonInterests: ["Computer Science", "Data Structures"],
      matchScore: 85,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      status: "online",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MR",
      studyingNow: "Algorithms",
      lastActive: "5 min ago",
      commonInterests: ["Algorithms", "Programming"],
      matchScore: 78,
    },
    {
      id: 3,
      name: "Alex Johnson",
      status: "online",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
      studyingNow: "Web Development",
      lastActive: "10 min ago",
      commonInterests: ["Web Development", "Programming"],
      matchScore: 72,
    },
  ]

  // Suggested study groups based on user's courses and interests
  const suggestedGroups = [
    {
      id: 1,
      name: "Algorithm Masters",
      members: 128,
      description: "A group dedicated to mastering algorithms and problem-solving techniques",
      tags: ["Algorithms", "Problem Solving"],
      activity: "Very Active",
      matchReason: "Based on your Algorithms course",
      matchScore: 95,
    },
    {
      id: 2,
      name: "Web Dev Wizards",
      members: 256,
      description: "Discuss the latest web development technologies and best practices",
      tags: ["Web Development", "JavaScript"],
      activity: "Active",
      matchReason: "Based on your Web Development course",
      matchScore: 90,
    },
  ]

  // Upcoming study sessions
  const upcomingStudySessions = [
    {
      id: 1,
      title: "Algorithm Problem Solving",
      date: "Today, 7:00 PM",
      attendees: 5,
      organizer: "Sarah Chen",
      topic: "Algorithms",
      matchScore: 90,
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "Tomorrow, 2:00 PM",
      attendees: 8,
      organizer: "Alex Johnson",
      topic: "Web Development",
      matchScore: 85,
    },
  ]

  // Filter active users based on search term
  const filteredUsers = searchTerm
    ? activeUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.studyingNow && user.studyingNow.toLowerCase().includes(searchTerm.toLowerCase())) ||
          user.commonInterests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : activeUsers

  return (
    <MobileLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold gradient-text">Study Community</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 relative" asChild>
              <Link href="/messages">
                <MessageCircle className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-study-red rounded-full"></span>
              </Link>
            </Button>
            <Button
              className="h-8 w-8 p-0 bg-gradient-to-r from-study-purple to-study-blue text-white rounded-full shadow-sm"
              asChild
            >
              <Link href="/social/create-group">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, groups, topics..."
            className="pl-9 h-9 pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="active-users" value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger
              value="active-users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-purple/20 data-[state=active]:to-study-blue/20"
            >
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs">Active Users</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="study-groups"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-blue/20 data-[state=active]:to-study-teal/20"
            >
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-xs">Study Groups</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="study-sessions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-teal/20 data-[state=active]:to-study-green/20"
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">Study Sessions</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Active Users Tab */}
          <TabsContent value="active-users" className="space-y-5">
            <Card className="border-none shadow-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-study-purple" />
                  Studying Similar Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {filteredUsers
                    .filter((user) => user.status === "online" && user.studyingNow)
                    .map((user) => (
                      <Card key={user.id} className="overflow-hidden border shadow-sm">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="relative">
                              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-background">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.initials}</AvatarFallback>
                              </Avatar>
                              <span
                                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                                  user.status === "online"
                                    ? "bg-study-green"
                                    : user.status === "away"
                                      ? "bg-study-orange"
                                      : "bg-muted"
                                }`}
                              ></span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-sm">{user.name}</h3>
                                  <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                                    {user.studyingNow && (
                                      <Badge className="bg-study-purple/20 text-study-purple text-[10px] sm:text-xs px-1.5 sm:px-2">
                                        <BookOpen className="h-2.5 sm:h-3 w-2.5 sm:w-3 mr-0.5 sm:mr-1" />
                                        {user.studyingNow}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <Badge className="bg-study-blue/20 text-study-blue text-[10px] sm:text-xs px-1.5 sm:px-2">
                                  {user.matchScore}%
                                </Badge>
                              </div>

                              <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 sm:h-8 text-[10px] sm:text-xs flex-1 px-1 sm:px-2"
                                  onClick={() => handleStartChat(user.name)}
                                >
                                  <MessageCircle className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-0.5 sm:mr-1" />
                                  Message
                                </Button>
                                <Button
                                  size="sm"
                                  className="h-7 sm:h-8 text-[10px] sm:text-xs bg-gradient-to-r from-study-purple to-study-blue text-white flex-1 px-1 sm:px-2"
                                  onClick={() => handleInviteToStudy(user.name)}
                                >
                                  <Video className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-0.5 sm:mr-1" />
                                  Study
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="study-groups" className="space-y-5">
            <Card className="border-none shadow-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-study-blue" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {suggestedGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-sm">{group.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                className={
                                  group.activity === "Very Active"
                                    ? "bg-study-green/20 text-study-green text-xs"
                                    : "bg-study-blue/20 text-study-blue text-xs"
                                }
                              >
                                {group.activity}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{group.members} members</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="h-8 bg-gradient-to-r from-study-blue to-study-teal text-white"
                            onClick={() => handleJoinGroup(group.name)}
                          >
                            <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                            Join
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground mb-2">{group.description}</p>

                        <div className="text-xs text-study-purple mb-2">
                          <Sparkles className="h-3 w-3 inline mr-1" />
                          {group.matchReason}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {group.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-muted/50 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium">Browse Categories</h3>
              <Button variant="ghost" size="sm" asChild className="h-8 text-xs">
                <Link href="/social/groups" className="flex items-center gap-1">
                  See all <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["Computer Science", "Mathematics", "Physics", "Languages"].map((category, index) => (
                <Link href={`/social/groups?category=${category}`} key={index}>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-3 flex items-center justify-between h-full">
                      <span className="font-medium text-sm">{category}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Study Sessions Tab */}
          <TabsContent value="study-sessions" className="space-y-5">
            <Card className="border-none shadow-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-study-teal" />
                  Recommended Study Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {upcomingStudySessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="h-12 w-12 rounded-md bg-study-teal/10 flex flex-col items-center justify-center text-study-teal border border-study-teal/30">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-sm line-clamp-1">{session.title}</h3>
                                <p className="text-xs text-muted-foreground">Organized by {session.organizer}</p>
                              </div>
                              <Badge
                                className={
                                  session.date.includes("Today")
                                    ? "bg-study-orange/20 text-study-orange text-xs"
                                    : "bg-study-blue/20 text-study-blue text-xs"
                                }
                              >
                                {session.date}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-muted/50">
                                {session.topic}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{session.attendees} attending</span>
                            </div>
                            <div className="flex justify-end mt-3">
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-gradient-to-r from-study-teal to-study-green text-white"
                              >
                                Join Session
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-study-purple to-study-blue text-white" asChild>
                <Link href="/social/create-session">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Study Session
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Find Study Partners</h2>
          <Link href="/social/buddies">
            <Button className="w-full flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              Find Study Buddies
            </Button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}

