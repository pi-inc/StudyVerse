"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, MessageSquare, UserPlus } from "lucide-react"

// Mock data for study buddies
const MOCK_BUDDIES = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    subjects: ["Mathematics", "Physics"],
    availability: "Evenings",
    bio: "Physics major looking for study partners for advanced calculus.",
  },
  {
    id: 2,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    subjects: ["Computer Science", "Data Science"],
    availability: "Weekends",
    bio: "CS student interested in machine learning and algorithms.",
  },
  {
    id: 3,
    name: "Taylor Wong",
    avatar: "/placeholder.svg?height=40&width=40",
    subjects: ["Biology", "Chemistry"],
    availability: "Mornings",
    bio: "Pre-med student preparing for MCAT, looking for science study groups.",
  },
]

export function StudyBuddyFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [buddies, setBuddies] = useState(MOCK_BUDDIES)

  const filteredBuddies = buddies.filter(
    (buddy) =>
      buddy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buddy.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or subject..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBuddies.map((buddy) => (
          <Card key={buddy.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={buddy.avatar} alt={buddy.name} />
                  <AvatarFallback>{buddy.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <Badge variant="outline">{buddy.availability}</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{buddy.name}</CardTitle>
              <CardDescription className="line-clamp-2">{buddy.bio}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-1">
                {buddy.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredBuddies.length === 0 && (
        <div className="text-center py-8">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No study buddies found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  )
}

