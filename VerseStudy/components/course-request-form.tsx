"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { BookOpen, Clock, Target, Palette } from "lucide-react"

export function CourseRequestForm() {
  const [courseName, setCourseName] = useState("")
  const [topicDescription, setTopicDescription] = useState("")
  const [learningGoals, setLearningGoals] = useState("")
  const [learningStyle, setLearningStyle] = useState("visual")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Request Submitted",
        description: "Your custom course request has been submitted successfully.",
        className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
      })
      router.push("/courses")
    }, 1500)
  }

  const formSections = [
    {
      id: "course-name",
      label: "Course Name",
      icon: BookOpen,
      component: (
        <Input
          id="course-name"
          placeholder="e.g., Advanced Machine Learning"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          className="transition-all focus:ring-2 focus:ring-study-purple focus:border-study-purple"
        />
      ),
    },
    {
      id: "topic-description",
      label: "Topic Description",
      icon: Clock,
      component: (
        <Textarea
          id="topic-description"
          placeholder="Describe the topics you want to learn about"
          rows={4}
          value={topicDescription}
          onChange={(e) => setTopicDescription(e.target.value)}
          required
          className="transition-all focus:ring-2 focus:ring-study-blue focus:border-study-blue"
        />
      ),
    },
    {
      id: "learning-goals",
      label: "Learning Goals",
      icon: Target,
      component: (
        <Textarea
          id="learning-goals"
          placeholder="What do you hope to achieve by taking this course?"
          rows={4}
          value={learningGoals}
          onChange={(e) => setLearningGoals(e.target.value)}
          required
          className="transition-all focus:ring-2 focus:ring-study-teal focus:border-study-teal"
        />
      ),
    },
    {
      id: "learning-style",
      label: "Preferred Learning Style",
      icon: Palette,
      component: (
        <RadioGroup value={learningStyle} onValueChange={setLearningStyle} className="space-y-3">
          {[
            {
              value: "visual",
              label: "Visual (images, diagrams, videos)",
              color: "bg-study-purple/20 border-study-purple/50",
            },
            {
              value: "auditory",
              label: "Auditory (lectures, discussions)",
              color: "bg-study-blue/20 border-study-blue/50",
            },
            {
              value: "reading",
              label: "Reading/Writing (texts, notes)",
              color: "bg-study-teal/20 border-study-teal/50",
            },
            {
              value: "kinesthetic",
              label: "Kinesthetic (hands-on activities)",
              color: "bg-study-green/20 border-study-green/50",
            },
          ].map((style) => (
            <div
              key={style.value}
              className={`flex items-center space-x-2 p-3 rounded-md transition-colors ${learningStyle === style.value ? style.color : "hover:bg-muted"}`}
            >
              <RadioGroupItem value={style.value} id={style.value} />
              <Label htmlFor={style.value} className="flex-1 cursor-pointer">
                {style.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-study-purple via-study-blue to-study-teal" />
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">Custom Course Request</CardTitle>
          <CardDescription>Fill out this form to request a custom course tailored to your needs</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {formSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Label htmlFor={section.id} className="flex items-center gap-2">
                  <section.icon className="h-4 w-4 text-primary" />
                  {section.label}
                </Label>
                {section.component}
              </motion.div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-study-purple to-study-blue hover:from-study-purple/90 hover:to-study-blue/90 text-white button-pop"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Request"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}

