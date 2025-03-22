"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Brain, Layers, BookOpen, Zap, ArrowLeft, Filter, ChevronDown } from "lucide-react"
import { FlashcardView } from "@/components/flashcard-view"
import { QuizView } from "@/components/quiz-view"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function RevisePage() {
  const [activeTab, setActiveTab] = useState("flashcards")
  const [selectedTopic, setSelectedTopic] = useState("arrays")
  const [selectedCourse, setSelectedCourse] = useState("data-structures")

  const courses = [
    { id: "data-structures", name: "Data Structures", icon: "🔍" },
    { id: "algorithms", name: "Algorithms", icon: "⚙️" },
    { id: "web-development", name: "Web Development", icon: "🌐" },
  ]

  const topics = {
    "data-structures": [
      { id: "arrays", name: "Arrays", mastery: 85, dueReview: false },
      { id: "linked-lists", name: "Linked Lists", mastery: 70, dueReview: true },
      { id: "stacks", name: "Stacks", mastery: 60, dueReview: false },
      { id: "queues", name: "Queues", mastery: 55, dueReview: true },
      { id: "trees", name: "Trees", mastery: 40, dueReview: false },
    ],
    algorithms: [
      { id: "sorting", name: "Sorting Algorithms", mastery: 75, dueReview: false },
      { id: "searching", name: "Searching Algorithms", mastery: 65, dueReview: true },
      { id: "recursion", name: "Recursion", mastery: 50, dueReview: false },
    ],
    "web-development": [
      { id: "html", name: "HTML", mastery: 90, dueReview: false },
      { id: "css", name: "CSS", mastery: 85, dueReview: false },
      { id: "javascript", name: "JavaScript", mastery: 80, dueReview: true },
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
                    setSelectedTopic(topics[course.id as keyof typeof topics][0].id)
                  }}
                >
                  <span className="mr-2">{course.icon}</span> {course.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Topic selection - Grid view instead of horizontal scroll */}
        <Card className="border-none shadow-sm">
          <CardHeader className="p-3 pb-0 flex flex-row justify-between items-center">
            <CardTitle className="text-base">Topics</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Filter className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {currentTopics.map((topic) => (
                <div
                  key={topic.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTopic === topic.id ? "border-primary bg-primary/5" : "border-muted hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm">{topic.name}</h3>
                      {topic.dueReview && (
                        <Badge className="ml-1 text-[10px] h-5 bg-study-orange/20 text-study-orange">Due</Badge>
                      )}
                    </div>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected topic info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{currentTopic?.name}</h2>
            <div className="flex items-center gap-2">
              <Badge className={`${getMasteryColor(currentTopic?.mastery || 0)}`}>
                {getMasteryLabel(currentTopic?.mastery || 0)}
              </Badge>
              <span className="text-xs text-muted-foreground">Last revised: 2 days ago</span>
            </div>
          </div>
        </div>

        {/* Revision methods */}
        <Tabs defaultValue="flashcards" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full h-12">
            <TabsTrigger
              value="flashcards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-purple/20 data-[state=active]:to-study-blue/20"
            >
              <div className="flex flex-col items-center">
                <Layers className="h-4 w-4 mb-1" />
                <span className="text-xs">Cards</span>
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
            <TabsTrigger
              value="summaries"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-teal/20 data-[state=active]:to-study-green/20"
            >
              <div className="flex flex-col items-center">
                <BookOpen className="h-4 w-4 mb-1" />
                <span className="text-xs">Notes</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="concept-maps"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-study-green/20 data-[state=active]:to-study-yellow/20"
            >
              <div className="flex flex-col items-center">
                <Zap className="h-4 w-4 mb-1" />
                <span className="text-xs">Maps</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards">
            <FlashcardView topic={selectedTopic} />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizView topic={selectedTopic} />
          </TabsContent>

          <TabsContent value="summaries">
            <Card className="border-none shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-study-teal" />
                  Summary Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm">
                  Summary notes for {currentTopic?.name} would appear here, with concise explanations of key concepts.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concept-maps">
            <Card className="border-none shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-study-green" />
                  Concept Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm">
                  A visual concept map for {currentTopic?.name} would appear here, showing relationships between
                  concepts.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

