"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  MessageSquare,
  Search,
  Plus,
  UserPlus,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Filter,
  ArrowLeft,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { MobileLayout } from "@/components/mobile-layout"
import Link from "next/link"

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleCreatePost = () => {
    toast({
      title: "Create Post",
      description: "Post creation modal would open here",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group Joined",
      description: `You've successfully joined the ${groupName} group`,
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  const handleLike = (postId: number) => {
    toast({
      title: "Post Liked",
      description: "You've liked this post",
      className: "bg-gradient-to-r from-study-purple/20 to-study-blue/20 border-study-purple",
    })
  }

  const handleComment = (postId: number) => {
    toast({
      title: "Add Comment",
      description: "Comment modal would open here",
      className: "bg-gradient-to-r from-study-blue/20 to-study-teal/20 border-study-blue",
    })
  }

  // Sample data
  const posts = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
        role: "Computer Science Student",
      },
      content:
        "Just finished my Data Structures assignment on implementing a balanced binary search tree. Anyone else working on this? Would love to compare approaches!",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["Data Structures", "Algorithms", "Programming"],
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MR",
        role: "Machine Learning Enthusiast",
      },
      content:
        "I found this amazing resource for learning neural networks! It breaks down complex concepts into simple explanations with great visualizations. Highly recommend checking it out: https://example.com/neural-networks",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 12,
      shares: 15,
      tags: ["Machine Learning", "Neural Networks", "Resources"],
      isLiked: true,
    },
    {
      id: 3,
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
        role: "Web Development Student",
      },
      content:
        "Just deployed my first React application! It's a simple todo app but I'm really proud of it. Used context API for state management and implemented dark mode. Let me know what you think!",
      timestamp: "Yesterday",
      likes: 36,
      comments: 14,
      shares: 5,
      tags: ["Web Development", "React", "JavaScript"],
      isLiked: false,
    },
  ]

  const studyGroups = [
    {
      id: 1,
      name: "Algorithm Masters",
      members: 128,
      description: "A group dedicated to mastering algorithms and problem-solving techniques",
      tags: ["Algorithms", "Problem Solving", "Competitive Programming"],
      activity: "Very Active",
    },
    {
      id: 2,
      name: "Web Dev Wizards",
      members: 256,
      description: "Discuss the latest web development technologies and best practices",
      tags: ["Web Development", "JavaScript", "React", "Node.js"],
      activity: "Active",
    },
    {
      id: 3,
      name: "Machine Learning Hub",
      members: 192,
      description: "Explore machine learning concepts, share resources, and collaborate on projects",
      tags: ["Machine Learning", "AI", "Data Science", "Python"],
      activity: "Very Active",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Algorithm Study Session",
      date: "Tomorrow, 7:00 PM",
      attendees: 12,
      organizer: "Algorithm Masters",
      description: "Group study session focusing on dynamic programming problems",
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "Saturday, 2:00 PM",
      attendees: 24,
      organizer: "Web Dev Wizards",
      description: "Learn how to build responsive UIs with React and Tailwind CSS",
    },
    {
      id: 3,
      title: "Machine Learning Seminar",
      date: "Next Monday, 6:00 PM",
      attendees: 18,
      organizer: "Machine Learning Hub",
      description: "Introduction to neural networks and deep learning fundamentals",
    },
  ]

  const activeUsers = [
    { name: "Sarah Chen", status: "online", avatar: "/placeholder.svg?height=32&width=32", initials: "SC" },
    { name: "Michael Rodriguez", status: "online", avatar: "/placeholder.svg?height=32&width=32", initials: "MR" },
    { name: "Alex Johnson", status: "online", avatar: "/placeholder.svg?height=32&width=32", initials: "AJ" },
    { name: "Emily Wong", status: "online", avatar: "/placeholder.svg?height=32&width=32", initials: "EW" },
    { name: "David Kim", status: "away", avatar: "/placeholder.svg?height=32&width=32", initials: "DK" },
  ]

  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : posts

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
            <h1 className="text-xl font-bold gradient-text">Community</h1>
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
              onClick={handleCreatePost}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, groups, events..."
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

        {/* Online Friends */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {activeUsers.map((user) => (
            <div key={user.name} className="flex flex-col items-center gap-1 w-16">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                    user.status === "online" ? "bg-study-green" : "bg-study-orange"
                  }`}
                ></span>
              </div>
              <span className="text-xs truncate w-full text-center">{user.name.split(" ")[0]}</span>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center gap-1 w-16">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <UserPlus className="h-5 w-5" />
            </Button>
            <span className="text-xs">Add</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger
              value="feed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-purple/20 data-[state=active]:to-study-blue/20"
            >
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-xs">Feed</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-blue/20 data-[state=active]:to-study-teal/20"
            >
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs">Groups</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-teal/20 data-[state=active]:to-study-green/20"
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">Events</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-4">
            {/* Create Post Card */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div
                    className="flex-1 rounded-full border bg-muted/50 px-4 py-2 text-muted-foreground cursor-pointer hover:bg-muted transition-colors text-sm"
                    onClick={handleCreatePost}
                  >
                    What are you studying today?
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm">{post.author.name}</h3>
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 -mr-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm break-words">{post.content}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-muted/50 text-xs">
                            #{tag.replace(/\s+/g, "")}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <Button variant="ghost" size="sm" className="gap-1.5 h-8" onClick={() => handleLike(post.id)}>
                          <Heart
                            className={`h-4 w-4 ${post.isLiked ? "fill-study-red text-study-red" : "text-muted-foreground"}`}
                          />
                          <span className="text-xs">{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 h-8"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                          <Share2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{post.shares}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
                {searchTerm && (
                  <Button className="mt-4" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">Study Groups</h2>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                <span className="text-xs">Filter</span>
              </Button>
            </div>

            <div className="space-y-3">
              {studyGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-sm">{group.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
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

                      <div className="flex flex-wrap gap-1.5">
                        {group.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-muted/50 text-xs">
                            #{tag.replace(/\s+/g, "")}
                          </Badge>
                        ))}
                        {group.tags.length > 3 && (
                          <Badge variant="outline" className="bg-muted/50 text-xs">
                            +{group.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">Upcoming Events</h2>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Calendar</span>
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="h-12 w-12 rounded-md bg-study-teal/10 flex flex-col items-center justify-center text-study-teal border border-study-teal/30">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                              <p className="text-xs text-muted-foreground">{event.organizer}</p>
                            </div>
                            <Badge
                              className={
                                event.date.includes("Tomorrow")
                                  ? "bg-study-orange/20 text-study-orange text-xs"
                                  : "bg-study-blue/20 text-study-blue text-xs"
                              }
                            >
                              {event.date}
                            </Badge>
                          </div>
                          <p className="text-xs mt-1 line-clamp-1">{event.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

