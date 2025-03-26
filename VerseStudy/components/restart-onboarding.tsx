"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  X,
  ArrowRight,
  BookOpen,
  Brain,
  Users,
  Calendar,
  Lightbulb,
  CheckCircle,
  Lock,
  CreditCard,
  LogIn,
  Target,
  Clock,
  Book,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export function RestartOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [rememberMe, setRememberMe] = useState(false)

  // Personalization questions state
  const [studyGoal, setStudyGoal] = useState("")
  const [learningStyle, setLearningStyle] = useState("")
  const [studyTime, setStudyTime] = useState(30)
  const [subjects, setSubjects] = useState<string[]>([])
  const [educationLevel, setEducationLevel] = useState("")

  // Check if this is a new session
  useEffect(() => {
    try {
      const hasSeenRestartOnboarding = sessionStorage.getItem("hasSeenRestartOnboarding")

      if (!hasSeenRestartOnboarding) {
        // Show onboarding after a short delay to let the app load first
        const timer = setTimeout(() => {
          setShowOnboarding(true)
          // Mark as seen for this session
          sessionStorage.setItem("hasSeenRestartOnboarding", "true")
        }, 1500)

        return () => clearTimeout(timer)
      }
    } catch (error) {
      console.error("Error accessing sessionStorage:", error)
    }
  }, [])

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    handleNext()
  }

  const toggleSubject = (subject: string) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject))
    } else {
      setSubjects([...subjects, subject])
    }
  }

  const onboardingSteps = [
    {
      id: 1,
      title: "Welcome to StudyVerse",
      description: "Your ultimate study companion",
      icon: BookOpen,
      color: "bg-gradient-to-r from-purple-500 to-blue-500",
      content: (
        <div className="space-y-4">
          <p className="text-center">
            StudyVerse helps you learn more effectively with AI-powered tools and a structured approach to studying.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Brain className="h-8 w-8 text-purple-500 mb-2" />
              <h4 className="text-sm font-medium">Smart Learning</h4>
              <p className="text-xs text-muted-foreground text-center">AI-powered study assistance</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-500 mb-2" />
              <h4 className="text-sm font-medium">Study Planning</h4>
              <p className="text-xs text-muted-foreground text-center">Organize your learning journey</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Users className="h-8 w-8 text-teal-500 mb-2" />
              <h4 className="text-sm font-medium">Social Learning</h4>
              <p className="text-xs text-muted-foreground text-center">Connect with fellow students</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <h4 className="text-sm font-medium">Track Progress</h4>
              <p className="text-xs text-muted-foreground text-center">Monitor your improvement</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Key Features",
      description: "Everything you need to excel in your studies",
      icon: Lightbulb,
      color: "bg-gradient-to-r from-blue-500 to-teal-500",
      content: (
        <div className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="bg-purple-500/10 p-2 rounded-full">
                <Brain className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium">AI Tutor</h4>
                <p className="text-xs text-muted-foreground">
                  Get instant help with any topic or question from our advanced AI tutor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="bg-blue-500/10 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Structured Courses</h4>
                <p className="text-xs text-muted-foreground">
                  Access comprehensive courses with interactive lessons and quizzes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="bg-teal-500/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Spaced Repetition</h4>
                <p className="text-xs text-muted-foreground">
                  Review material at optimal intervals to maximize long-term retention.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Sign In",
      description: "Access your personalized learning experience",
      icon: LogIn,
      color: "bg-gradient-to-r from-teal-500 to-green-500",
      content: (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white">
            Sign In
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </div>
        </form>
      ),
    },
    {
      id: 4,
      title: "Your Study Goals",
      description: "Let's personalize your experience",
      icon: Target,
      color: "bg-gradient-to-r from-indigo-500 to-purple-500",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-center">What's your primary goal for using StudyVerse?</p>

          <RadioGroup value={studyGoal} onValueChange={setStudyGoal} className="gap-3">
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="academic" id="goal-academic" />
              <Label htmlFor="goal-academic" className="flex-1 cursor-pointer">
                <div className="font-medium">Academic Success</div>
                <div className="text-xs text-muted-foreground">Improve grades and excel in coursework</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="professional" id="goal-professional" />
              <Label htmlFor="goal-professional" className="flex-1 cursor-pointer">
                <div className="font-medium">Professional Development</div>
                <div className="text-xs text-muted-foreground">Learn new skills for career advancement</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="certification" id="goal-certification" />
              <Label htmlFor="goal-certification" className="flex-1 cursor-pointer">
                <div className="font-medium">Certification Preparation</div>
                <div className="text-xs text-muted-foreground">Study for specific certifications or exams</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="personal" id="goal-personal" />
              <Label htmlFor="goal-personal" className="flex-1 cursor-pointer">
                <div className="font-medium">Personal Interest</div>
                <div className="text-xs text-muted-foreground">Learn for curiosity and personal growth</div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      ),
    },
    {
      id: 5,
      title: "Learning Style",
      description: "How do you learn best?",
      icon: Brain,
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-center">Understanding your learning style helps us tailor content delivery.</p>

          <RadioGroup value={learningStyle} onValueChange={setLearningStyle} className="gap-3">
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="visual" id="style-visual" />
              <Label htmlFor="style-visual" className="flex-1 cursor-pointer">
                <div className="font-medium">Visual Learner</div>
                <div className="text-xs text-muted-foreground">Prefer diagrams, charts, and visual explanations</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="auditory" id="style-auditory" />
              <Label htmlFor="style-auditory" className="flex-1 cursor-pointer">
                <div className="font-medium">Auditory Learner</div>
                <div className="text-xs text-muted-foreground">Learn best through listening and discussion</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="reading" id="style-reading" />
              <Label htmlFor="style-reading" className="flex-1 cursor-pointer">
                <div className="font-medium">Reading/Writing Learner</div>
                <div className="text-xs text-muted-foreground">Prefer text-based information and note-taking</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="kinesthetic" id="style-kinesthetic" />
              <Label htmlFor="style-kinesthetic" className="flex-1 cursor-pointer">
                <div className="font-medium">Kinesthetic Learner</div>
                <div className="text-xs text-muted-foreground">Learn by doing and hands-on practice</div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      ),
    },
    {
      id: 6,
      title: "Study Time",
      description: "How much time can you dedicate?",
      icon: Clock,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      content: (
        <div className="space-y-6">
          <p className="text-sm text-center">
            We'll help you create a realistic study schedule based on your availability.
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Minutes per day for studying</Label>
                <span className="text-sm font-medium">{studyTime} min</span>
              </div>
              <Slider
                value={[studyTime]}
                min={5}
                max={120}
                step={5}
                onValueChange={(value) => setStudyTime(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 min</span>
                <span>30 min</span>
                <span>60 min</span>
                <span>120 min</span>
              </div>
            </div>

            <div className="bg-muted/30 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Recommended Schedule</h4>
              {studyTime < 15 && (
                <p className="text-xs">Quick daily micro-sessions focused on key concepts and flashcards.</p>
              )}
              {studyTime >= 15 && studyTime < 45 && (
                <p className="text-xs">Balanced daily sessions with concept review and practice exercises.</p>
              )}
              {studyTime >= 45 && studyTime < 90 && (
                <p className="text-xs">Comprehensive daily learning with in-depth content and interactive exercises.</p>
              )}
              {studyTime >= 90 && (
                <p className="text-xs">Intensive study blocks with deep learning, practice, and review sessions.</p>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "Subject Interests",
      description: "What would you like to learn?",
      icon: Book,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-center">Select subjects you're interested in studying (choose all that apply).</p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "math", label: "Mathematics" },
              { id: "science", label: "Science" },
              { id: "programming", label: "Programming" },
              { id: "language", label: "Languages" },
              { id: "history", label: "History" },
              { id: "business", label: "Business" },
              { id: "arts", label: "Arts & Humanities" },
              { id: "health", label: "Health & Medicine" },
            ].map((subject) => (
              <div
                key={subject.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  subjects.includes(subject.id) ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                }`}
                onClick={() => toggleSubject(subject.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subject.label}</span>
                  {subjects.includes(subject.id) && <CheckCircle className="h-4 w-4 text-primary" />}
                </div>
              </div>
            ))}
          </div>

          {subjects.length === 0 && (
            <p className="text-xs text-muted-foreground text-center italic">
              Please select at least one subject to continue
            </p>
          )}
        </div>
      ),
    },
    {
      id: 8,
      title: "Education Level",
      description: "Help us tailor content to your level",
      icon: Sparkles,
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-center">What is your current education level?</p>

          <RadioGroup value={educationLevel} onValueChange={setEducationLevel} className="gap-3">
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="high-school" id="level-high-school" />
              <Label htmlFor="level-high-school" className="flex-1 cursor-pointer">
                <div className="font-medium">High School</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="undergraduate" id="level-undergraduate" />
              <Label htmlFor="level-undergraduate" className="flex-1 cursor-pointer">
                <div className="font-medium">Undergraduate</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="graduate" id="level-graduate" />
              <Label htmlFor="level-graduate" className="flex-1 cursor-pointer">
                <div className="font-medium">Graduate</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="professional" id="level-professional" />
              <Label htmlFor="level-professional" className="flex-1 cursor-pointer">
                <div className="font-medium">Professional</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="self-taught" id="level-self-taught" />
              <Label htmlFor="level-self-taught" className="flex-1 cursor-pointer">
                <div className="font-medium">Self-taught</div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      ),
    },
    {
      id: 9,
      title: "Choose Your Plan",
      description: "Find the perfect plan for your needs",
      icon: CreditCard,
      color: "bg-gradient-to-r from-green-500 to-yellow-500",
      content: (
        <div className="space-y-4">
          <Tabs defaultValue="monthly" className="w-full" onValueChange={setSelectedPlan}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="space-y-3 pt-2">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Free</h4>
                    <p className="text-sm text-muted-foreground">Basic features</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$0</div>
                    <div className="text-xs text-muted-foreground">forever</div>
                  </div>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Limited AI tutor questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Access to basic courses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Study planning tools</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Current Plan
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-3 border-purple-500/50 bg-purple-500/5">
                <Badge className="bg-purple-500 text-white">POPULAR</Badge>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Pro</h4>
                    <p className="text-sm text-muted-foreground">Advanced features</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$9.99</div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </div>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Unlimited AI tutor questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Access to all premium courses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Advanced study analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  Upgrade to Pro
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="annual" className="space-y-3 pt-2">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Free</h4>
                    <p className="text-sm text-muted-foreground">Basic features</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$0</div>
                    <div className="text-xs text-muted-foreground">forever</div>
                  </div>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Limited AI tutor questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Access to basic courses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Study planning tools</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Current Plan
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-3 border-purple-500/50 bg-purple-500/5">
                <Badge className="bg-purple-500 text-white">BEST VALUE</Badge>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Pro Annual</h4>
                    <p className="text-sm text-muted-foreground">Advanced features</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$7.99</div>
                    <div className="text-xs text-muted-foreground">per month, billed annually</div>
                  </div>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Unlimited AI tutor questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Access to all premium courses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Advanced study analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    <span>2 months free</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  Upgrade to Pro Annual
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            <span>Secure payment processing</span>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "You're All Set!",
      description: "Start your learning journey today",
      icon: CheckCircle,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      content: (
        <div className="space-y-4 text-center">
          <p>Thank you for choosing StudyVerse! You're now ready to start learning more effectively.</p>

          <div className="bg-muted/30 p-4 rounded-lg text-left">
            <h4 className="text-sm font-medium mb-2">Your Personalized Study Plan</h4>
            <p className="text-xs mb-3">Based on your preferences, we've created a tailored experience:</p>

            <ul className="text-xs space-y-2">
              {studyGoal && (
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Goal:{" "}
                    <strong>
                      {studyGoal === "academic"
                        ? "Academic Success"
                        : studyGoal === "professional"
                          ? "Professional Development"
                          : studyGoal === "certification"
                            ? "Certification Preparation"
                            : studyGoal === "personal"
                              ? "Personal Interest"
                              : ""}
                    </strong>
                  </span>
                </li>
              )}

              {learningStyle && (
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Learning style:{" "}
                    <strong>
                      {learningStyle === "visual"
                        ? "Visual"
                        : learningStyle === "auditory"
                          ? "Auditory"
                          : learningStyle === "reading"
                            ? "Reading/Writing"
                            : learningStyle === "kinesthetic"
                              ? "Kinesthetic"
                              : ""}
                    </strong>{" "}
                    content prioritized
                  </span>
                </li>
              )}

              {studyTime > 0 && (
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Daily study sessions: <strong>{studyTime} minutes</strong> per day
                  </span>
                </li>
              )}

              {subjects.length > 0 && (
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Focus areas:{" "}
                    <strong>
                      {subjects
                        .map((s) =>
                          s === "math"
                            ? "Mathematics"
                            : s === "science"
                              ? "Science"
                              : s === "programming"
                                ? "Programming"
                                : s === "language"
                                  ? "Languages"
                                  : s === "history"
                                    ? "History"
                                    : s === "business"
                                      ? "Business"
                                      : s === "arts"
                                        ? "Arts & Humanities"
                                        : s === "health"
                                          ? "Health & Medicine"
                                          : "",
                        )
                        .join(", ")}
                    </strong>
                  </span>
                </li>
              )}

              {educationLevel && (
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Content level:{" "}
                    <strong>
                      {educationLevel === "high-school"
                        ? "High School"
                        : educationLevel === "undergraduate"
                          ? "Undergraduate"
                          : educationLevel === "graduate"
                            ? "Graduate"
                            : educationLevel === "professional"
                              ? "Professional"
                              : educationLevel === "self-taught"
                                ? "Self-taught"
                                : ""}
                    </strong>
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-4">
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium">Next Steps</h4>
              <ul className="text-sm text-left w-full space-y-2 mt-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Explore your personalized dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Enroll in your first course</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Ask the AI tutor a question</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Set up your study plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 6 && subjects.length === 0) {
      // Don't proceed if no subjects are selected
      return
    }

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    // In a real app, you would save the user preferences here
    setShowOnboarding(false)
  }

  if (!showOnboarding) return null

  const step = onboardingSteps[currentStep]
  const isSignInStep = currentStep === 2
  const isSubjectStep = currentStep === 6
  const canProceed = currentStep !== 6 || (currentStep === 6 && subjects.length > 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md opacity-100 scale-100 transition-all duration-200">
        <Card className="border-none shadow-xl overflow-hidden">
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleClose}
              aria-label="Close onboarding"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className={`h-2 ${step.color}`} />

          <CardContent className="pt-8 px-6 pb-4">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`h-16 w-16 rounded-full ${step.color} text-white flex items-center justify-center mb-4`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-1">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>

            <div className="mb-6">{step.content}</div>

            <div className="w-full flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {currentStep + 1} of {onboardingSteps.length}
              </div>
              <Progress value={((currentStep + 1) / onboardingSteps.length) * 100} className="w-24 h-1.5" />
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex justify-between">
            {!isSignInStep && (
              <Button variant="ghost" onClick={handleClose} className="text-muted-foreground">
                Skip
              </Button>
            )}

            {isSignInStep && (
              <div></div> // Empty div to maintain layout when sign-in form has its own button
            )}

            {!isSignInStep && (
              <Button className={`${step.color} text-white`} onClick={handleNext} disabled={!canProceed}>
                {currentStep < onboardingSteps.length - 1 ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

