"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Clock,
  Calendar,
  Settings,
  ChevronDown,
  Zap,
  Award,
  Brain,
  Layers,
  Flame,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { FlashcardDeck } from "@/components/flashcard-deck"
import { QuizComponent } from "@/components/quiz-component"
import { ConceptMap } from "@/components/concept-map"
import { SummaryNotes } from "@/components/summary-notes"

export default function RevisionPage() {
  const [activeTab, setActiveTab] = useState("flashcards")
  const [selectedCourse, setSelectedCourse] = useState("data-structures")
  const [selectedTopic, setSelectedTopic] = useState("arrays")
  const [showSettings, setShowSettings] = useState(false)
  const [difficulty, setDifficulty] = useState(50)
  const [spacedRepetition, setSpacedRepetition] = useState(true)
  const [gamification, setGamification] = useState(true)
  const [dailyGoal, setDailyGoal] = useState(20)
  const [streakDays, setStreakDays] = useState(5)
  const [revisionPoints, setRevisionPoints] = useState(750)
  const { toast } = useToast()

  const courses = [
    { id: "data-structures", name: "Data Structures", icon: "🔍", progress: 65 },
    { id: "algorithms", name: "Algorithms", icon: "⚙️", progress: 40 },
    { id: "web-development", name: "Web Development", icon: "🌐", progress: 80 },
    { id: "machine-learning", name: "Machine Learning", icon: "🤖", progress: 25 },
  ]

  const topics = {
    "data-structures": [
      { id: "arrays", name: "Arrays", mastery: 85, dueReview: false },
      { id: "linked-lists", name: "Linked Lists", mastery: 70, dueReview: true },
      { id: "stacks", name: "Stacks", mastery: 60, dueReview: false },
      { id: "queues", name: "Queues", mastery: 55, dueReview: true },
      { id: "trees", name: "Trees", mastery: 40, dueReview: false },
      { id: "graphs", name: "Graphs", mastery: 30, dueReview: false },
      { id: "hash-tables", name: "Hash Tables", mastery: 20, dueReview: true },
    ],
    algorithms: [
      { id: "sorting", name: "Sorting Algorithms", mastery: 75, dueReview: false },
      { id: "searching", name: "Searching Algorithms", mastery: 65, dueReview: true },
      { id: "recursion", name: "Recursion", mastery: 50, dueReview: false },
      { id: "dynamic-programming", name: "Dynamic Programming", mastery: 30, dueReview: true },
    ],
    "web-development": [
      { id: "html", name: "HTML", mastery: 90, dueReview: false },
      { id: "css", name: "CSS", mastery: 85, dueReview: false },
      { id: "javascript", name: "JavaScript", mastery: 80, dueReview: true },
      { id: "react", name: "React", mastery: 75, dueReview: false },
      { id: "next-js", name: "Next.js", mastery: 60, dueReview: true },
    ],
    "machine-learning": [
      { id: "supervised", name: "Supervised Learning", mastery: 40, dueReview: true },
      { id: "unsupervised", name: "Unsupervised Learning", mastery: 35, dueReview: false },
      { id: "neural-networks", name: "Neural Networks", mastery: 25, dueReview: true },
      { id: "deep-learning", name: "Deep Learning", mastery: 20, dueReview: false },
    ],
  }

  const revisionMethods = [
    { id: "flashcards", name: "Flashcards", icon: Layers, color: "text-study-purple", bgColor: "bg-study-purple/20" },
    { id: "quizzes", name: "Quizzes", icon: Brain, color: "text-study-blue", bgColor: "bg-study-blue/20" },
    { id: "summaries", name: "Summaries", icon: BookOpen, color: "text-study-teal", bgColor: "bg-study-teal/20" },
    { id: "concept-maps", name: "Concept Maps", icon: Zap, color: "text-study-green", bgColor: "bg-study-green/20" },
  ]

  const achievements = [
    { id: 1, name: "Memory Master", description: "Review 100 flashcards in a day", icon: "🧠", progress: 65 },
    { id: 2, name: "Quiz Whiz", description: "Score 100% on 5 quizzes in a row", icon: "🎯", progress: 40 },
    { id: 3, name: "Streak Keeper", description: "Maintain a 7-day study streak", icon: "🔥", progress: 71 },
  ]

  const handleDifficultyChange = (value: number[]) => {
    setDifficulty(value[0])
    toast({
      title: "Difficulty updated",
      description: `Revision difficulty set to ${value[0] < 33 ? "Easy" : value[0] < 66 ? "Medium" : "Hard"}`,
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleDailyGoalChange = (value: number[]) => {
    setDailyGoal(value[0])
    toast({
      title: "Daily goal updated",
      description: `You've set a goal to review ${value[0]} items per day`,
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId)

    // Add some points when selecting a topic
    if (gamification) {
      setRevisionPoints((prev) => prev + 5)
    }

    toast({
      title: "Topic selected",
      description: `Now reviewing: ${topics[selectedCourse as keyof typeof topics].find((t) => t.id === topicId)?.name}`,
      className: "bg-gradient-to-r from-study-purple/20 to-study-blue/20 border-study-purple",
    })
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    setSelectedTopic(topics[courseId as keyof typeof topics][0].id)

    toast({
      title: "Course changed",
      description: `Switched to ${courses.find((c) => c.id === courseId)?.name}`,
      className: "bg-gradient-to-r from-study-teal/20 to-study-green/20 border-study-teal",
    })
  }

  const handleRevisionComplete = (correct: number, total: number) => {
    const percentage = Math.round((correct / total) * 100)

    // Add points based on performance
    if (gamification) {
      const pointsEarned = correct * 10
      setRevisionPoints((prev) => prev + pointsEarned)

      toast({
        title: `+${pointsEarned} points earned!`,
        description: `You answered ${correct} out of ${total} correctly`,
        className: "bg-gradient-to-r from-study-yellow/20 to-study-orange/20 border-study-yellow",
      })
    } else {
      toast({
        title: "Revision session complete",
        description: `You answered ${correct} out of ${total} correctly (${percentage}%)`,
        className: "bg-gradient-to-r from-study-blue/20 to-study-teal/20 border-study-blue",
      })
    }
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

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Revision Center</h1>
          <p className="text-muted-foreground mt-1">Strengthen your knowledge through active recall</p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="gradient-border"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Revision Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-study-purple to-study-blue text-white">
                {courses.find((c) => c.id === selectedCourse)?.icon}{" "}
                {courses.find((c) => c.id === selectedCourse)?.name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Course</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {courses.map((course) => (
                <DropdownMenuItem
                  key={course.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => handleCourseSelect(course.id)}
                >
                  <span className="mr-2">{course.icon}</span>
                  <span>{course.name}</span>
                  {course.id === selectedCourse && (
                    <Badge className="ml-auto bg-study-purple/20 text-study-purple">Selected</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Daily Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-study-purple" />
            <span className="font-medium">Daily Goal Progress</span>
          </div>
          <span className="text-sm font-medium">
            {Math.min(15, dailyGoal)} / {dailyGoal} items
          </span>
        </div>
        <Progress
          value={(15 / dailyGoal) * 100}
          className="h-2 bg-primary/20"
          indicatorClassName="bg-gradient-to-r from-study-purple to-study-blue"
        />
      </motion.div>

      {/* Settings Panel (Conditional) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mb-6 border-none shadow-md overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-study-purple via-study-blue to-study-teal" />
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Revision Settings</CardTitle>
                <CardDescription>Customize your revision experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Difficulty Level</Label>
                    <span className="text-sm font-medium">
                      {difficulty < 33 ? "Easy" : difficulty < 66 ? "Medium" : "Hard"}
                    </span>
                  </div>
                  <Slider
                    value={[difficulty]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleDifficultyChange}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Daily Goal (items to review)</Label>
                    <span className="text-sm font-medium">{dailyGoal} items</span>
                  </div>
                  <Slider
                    value={[dailyGoal]}
                    min={5}
                    max={50}
                    step={5}
                    onValueChange={handleDailyGoalChange}
                    className="py-4"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="spaced-repetition">Use spaced repetition</Label>
                    <Switch id="spaced-repetition" checked={spacedRepetition} onCheckedChange={setSpacedRepetition} />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="gamification">Enable gamification</Label>
                    <Switch id="gamification" checked={gamification} onCheckedChange={setGamification} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gamification Stats (Conditional) */}
      {gamification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <Card className="border-none shadow-sm bg-gradient-to-br from-study-purple/10 to-study-blue/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-study-purple/20 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-study-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">{streakDays} days</p>
                </div>
              </div>
              <Badge className="bg-study-purple/20 text-study-purple">Keep it up!</Badge>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-gradient-to-br from-study-blue/10 to-study-teal/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-study-blue/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-study-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revision Points</p>
                  <p className="text-2xl font-bold">{revisionPoints}</p>
                </div>
              </div>
              <Badge className="bg-study-blue/20 text-study-blue">Level 5</Badge>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-gradient-to-br from-study-teal/10 to-study-green/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-study-teal/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-study-teal" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">7 / 15</p>
                </div>
              </div>
              <Badge className="bg-study-teal/20 text-study-teal">2 New</Badge>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Topic Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Topics to Review</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search topics..." className="h-8 w-[150px] md:w-[200px] pl-8" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {topics[selectedCourse as keyof typeof topics].map((topic) => (
            <Card
              key={topic.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTopic === topic.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => handleTopicSelect(topic.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{topic.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-xs ${getMasteryColor(topic.mastery)}`}>
                        {getMasteryLabel(topic.mastery)}
                      </span>
                      <Progress
                        value={topic.mastery}
                        className="h-1.5 w-16 bg-muted"
                        indicatorClassName={getMasteryBgColor(topic.mastery)}
                      />
                    </div>
                  </div>
                  {topic.dueReview && spacedRepetition && (
                    <Badge className="bg-study-orange/20 text-study-orange">
                      <Clock className="h-3 w-3 mr-1" />
                      Due
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Revision Methods Tabs */}
      <Tabs defaultValue="flashcards" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full md:w-[600px] h-12">
          {revisionMethods.map((method) => (
            <TabsTrigger
              key={method.id}
              value={method.id}
              className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-${method.color.split("-")[1]}/20 data-[state=active]:to-${method.color.split("-")[1]}/10`}
            >
              <method.icon className={`h-4 w-4 mr-2 ${method.color}`} />
              {method.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Flashcards Tab Content */}
        <TabsContent value="flashcards">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <FlashcardDeck
              courseId={selectedCourse}
              topicId={selectedTopic}
              difficulty={difficulty}
              onComplete={handleRevisionComplete}
            />
          </motion.div>
        </TabsContent>

        {/* Quizzes Tab Content */}
        <TabsContent value="quizzes">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <QuizComponent
              courseId={selectedCourse}
              topicId={selectedTopic}
              difficulty={difficulty}
              onComplete={handleRevisionComplete}
            />
          </motion.div>
        </TabsContent>

        {/* Summaries Tab Content */}
        <TabsContent value="summaries">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SummaryNotes courseId={selectedCourse} topicId={selectedTopic} />
          </motion.div>
        </TabsContent>

        {/* Concept Maps Tab Content */}
        <TabsContent value="concept-maps">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ConceptMap courseId={selectedCourse} topicId={selectedTopic} />
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Achievements Section */}
      {gamification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-study-yellow to-study-orange" />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-study-yellow" />
                Revision Achievements
              </CardTitle>
              <CardDescription>Complete these challenges to earn badges and points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="border border-study-yellow/30 bg-study-yellow/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-full bg-study-yellow/20 flex items-center justify-center text-2xl">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{achievement.name}</h3>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1.5" indicatorClassName="bg-study-yellow" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

