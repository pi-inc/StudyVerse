"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Brain, Layers, ArrowLeft, ChevronDown, Clock, MoreHorizontal, BookOpen, Zap } from "lucide-react"
import { FlashcardView } from "@/components/flashcard-view"
import { QuizView } from "@/components/quiz-view"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function RevisePage() {
  const [activeTab, setActiveTab] = useState("flashcards")
  const [selectedTopic, setSelectedTopic] = useState("linked-lists") // Default to a due topic
  const [selectedCourse, setSelectedCourse] = useState("data-structures")
  const [showAllTopics, setShowAllTopics] = useState(false)

  const courses = [
    { id: "data-structures", name: "Data Structures", icon: "🔍" },
    { id: "algorithms", name: "Algorithms", icon: "⚙️" },
    { id: "web-development", name: "Web Development", icon: "🌐" },
  ]

  const topics = {
    "data-structures": [
      { id: "arrays", name: "Arrays", mastery: 85, dueReview: false, lastReviewed: "2 days ago", nextReview: null },
      {
        id: "linked-lists",
        name: "Linked Lists",
        mastery: 70,
        dueReview: true,
        lastReviewed: "5 days ago",
        nextReview: "Today",
      },
      {
        id: "stacks",
        name: "Stacks",
        mastery: 60,
        dueReview: false,
        lastReviewed: "1 day ago",
        nextReview: "In 3 days",
      },
      { id: "queues", name: "Queues", mastery: 55, dueReview: true, lastReviewed: "7 days ago", nextReview: "Today" },
      { id: "trees", name: "Trees", mastery: 40, dueReview: false, lastReviewed: "2 days ago", nextReview: "Tomorrow" },
    ],
    algorithms: [
      {
        id: "sorting",
        name: "Sorting Algorithms",
        mastery: 75,
        dueReview: false,
        lastReviewed: "3 days ago",
        nextReview: "Tomorrow",
      },
      {
        id: "searching",
        name: "Searching Algorithms",
        mastery: 65,
        dueReview: true,
        lastReviewed: "6 days ago",
        nextReview: "Today",
      },
      {
        id: "recursion",
        name: "Recursion",
        mastery: 50,
        dueReview: false,
        lastReviewed: "2 days ago",
        nextReview: "In 2 days",
      },
    ],
    "web-development": [
      { id: "html", name: "HTML", mastery: 90, dueReview: false, lastReviewed: "1 day ago", nextReview: "In 5 days" },
      { id: "css", name: "CSS", mastery: 85, dueReview: false, lastReviewed: "2 days ago", nextReview: "In 4 days" },
      {
        id: "javascript",
        name: "JavaScript",
        mastery: 80,
        dueReview: true,
        lastReviewed: "8 days ago",
        nextReview: "Today",
      },
    ],
  }

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "text-study-green"
    if (mastery >= 60) return "text-study-teal"
    if (mastery >= 40) return "text-study-blue"
    return "text-study-purple"
  }

  const getMasteryBgColor = (mastery: number) => {
    if (mastery >= 80) return "bg-study-green"
    if (mastery >= 60) return "bg-study-teal"
    if (mastery >= 40) return "bg-study-blue"
    return "bg-study-purple"
  }

  const getMasteryLabel = (mastery: number) => {
    if (mastery >= 80) return "Expert"
    if (mastery >= 60) return "Proficient"
    if (mastery >= 40) return "Intermediate"
    if (mastery >= 20) return "Basic"
    return "Novice"
  }

  const currentTopics = topics[selectedCourse as keyof typeof topics] || []
  const currentTopic = currentTopics.find((t) => t.id === selectedTopic) || currentTopics[0]

  // Find topics due for review
  const dueTopics = currentTopics.filter((topic) => topic.dueReview)

  // Determine which topics to show based on the toggle
  const topicsToShow = showAllTopics ? currentTopics : dueTopics.length > 0 ? dueTopics : currentTopics

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
            <h1 className="text-xl font-bold gradient-text">Revision</h1>
          </div>

          {/* Course selector dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-9">
                {courses.find((c) => c.id === selectedCourse)?.icon}{" "}
                {courses.find((c) => c.id === selectedCourse)?.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {courses.map((course) => (
                <DropdownMenuItem
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course.id)
                    // Select the first due topic if available, otherwise the first topic
                    const courseDueTopics = topics[course.id as keyof typeof topics].filter((t) => t.dueReview)
                    setSelectedTopic(
                      courseDueTopics.length > 0
                        ? courseDueTopics[0].id
                        : topics[course.id as keyof typeof topics][0].id,
                    )
                  }}
                >
                  <span className="mr-2">{course.icon}</span> {course.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Due for review section - Prominently displayed */}
        {dueTopics.length > 0 && (
          <Card className="border-none shadow-sm bg-amber-500/10 border border-amber-500/30">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-sm text-amber-600 dark:text-amber-400">Due for Review</h3>
                  <p className="text-xs text-muted-foreground">
                    {dueTopics.length} topic{dueTopics.length > 1 ? "s" : ""} need your attention based on spaced
                    repetition
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-amber-500/30 text-amber-600 dark:text-amber-400"
                  onClick={() => {
                    setSelectedTopic(dueTopics[0].id)
                    setActiveTab("flashcards") // Default to flashcards for review
                  }}
                >
                  Review Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Topic selection - Focus on due topics */}
        <Card className="border-none shadow-sm">
          <CardHeader className="p-3 pb-0 flex flex-row justify-between items-center">
            <CardTitle className="text-base">{showAllTopics ? "All Topics" : "Topics Due for Review"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowAllTopics(!showAllTopics)} className="h-8 text-xs">
              {showAllTopics ? "Show Due Only" : "Show All"}
            </Button>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-1 gap-2">
              {topicsToShow.map((topic) => (
                <div
                  key={topic.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTopic === topic.id ? "border-primary bg-primary/5" : "border-muted hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{topic.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-xs ${getMasteryColor(topic.mastery)}`}>
                          {getMasteryLabel(topic.mastery)}
                        </span>
                        <Progress
                          value={topic.mastery}
                          className="h-1.5 w-12 ml-1"
                          indicatorClassName={getMasteryBgColor(topic.mastery)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {topic.dueReview ? (
                        <Badge className="bg-study-orange/20 text-study-orange">
                          <Clock className="h-3 w-3 mr-1" />
                          Due Now
                        </Badge>
                      ) : topic.nextReview ? (
                        <span className="text-xs text-muted-foreground">Next: {topic.nextReview}</span>
                      ) : null}
                      <span className="text-xs text-muted-foreground mt-1">Last: {topic.lastReviewed}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show message if no due topics and showing only due topics */}
              {!showAllTopics && dueTopics.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No topics due for review</p>
                  <Button variant="link" size="sm" onClick={() => setShowAllTopics(true)} className="mt-1">
                    Show all topics
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Revision methods - Simplified tabs with more options in dropdown */}
        <Tabs defaultValue="flashcards" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-2 h-12">
              <TabsTrigger
                value="flashcards"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-purple/20 data-[state=active]:to-study-blue/20"
              >
                <div className="flex flex-col items-center">
                  <Layers className="h-4 w-4 mb-1" />
                  <span className="text-xs">Flashcards</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-blue/20 data-[state=active]:to-study-teal/20"
              >
                <div className="flex flex-col items-center">
                  <Brain className="h-4 w-4 mb-1" />
                  <span className="text-xs">Quiz</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* More options dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("concept-maps")}>
                  <Zap className="h-4 w-4 mr-2 text-study-green" />
                  Concept Maps
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("summaries")}>
                  <BookOpen className="h-4 w-4 mr-2 text-study-teal" />
                  Summary Notes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="flashcards">
            <FlashcardView topic={selectedTopic} />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizView topic={selectedTopic} />
          </TabsContent>

          <TabsContent value="concept-maps">
            <Card className="border-none shadow-md overflow-hidden">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-study-green mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium">Concept Maps</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Visualize relationships between concepts to deepen your understanding
                </p>
                <Button>Open Concept Map</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summaries">
            <Card className="border-none shadow-md overflow-hidden">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-study-teal mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium">Summary Notes</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Review comprehensive notes on this topic</p>
                <Button>View Summary Notes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

