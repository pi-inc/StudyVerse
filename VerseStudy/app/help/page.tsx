"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  FileText,
  Video,
  BookOpen,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Searching...",
      description: `Searching for "${searchQuery}"`,
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleFeedback = (helpful: boolean) => {
    toast({
      title: helpful ? "Thank you!" : "We'll improve this",
      description: helpful
        ? "We're glad you found this helpful."
        : "Thank you for your feedback. We'll work on improving this section.",
      className: helpful
        ? "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green"
        : "bg-gradient-to-r from-study-orange/20 to-study-red/20 border-study-orange",
    })
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message sent",
      description: "We've received your message and will respond shortly.",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  const faqCategories = [
    {
      id: "general",
      title: "General",
      questions: [
        {
          id: "what-is",
          question: "What is StudyVerse?",
          answer:
            "StudyVerse is an all-in-one learning platform designed to help students study more effectively. It combines AI tutoring, course materials, revision tools, planning features, and social learning in one integrated platform.",
        },
        {
          id: "get-started",
          question: "How do I get started?",
          answer:
            "To get started with StudyVerse, simply create an account, explore the available courses, and start learning! You can use the AI Tutor for personalized help, access revision tools to strengthen your knowledge, and use the planner to organize your study schedule.",
        },
        {
          id: "free-trial",
          question: "Is there a free trial?",
          answer:
            "Yes! StudyVerse offers a 14-day free trial with access to all features. After the trial period, you can choose from our various subscription plans based on your needs.",
        },
      ],
    },
    {
      id: "courses",
      title: "Courses",
      questions: [
        {
          id: "course-types",
          question: "What types of courses are available?",
          answer:
            "StudyVerse offers a wide range of courses across various disciplines including Computer Science, Mathematics, Science, Languages, and more. Each course is designed with interactive content, quizzes, and practical exercises.",
        },
        {
          id: "course-completion",
          question: "How do I track my course progress?",
          answer:
            "Your course progress is automatically tracked in your profile. You can see completion percentages, quiz scores, and achievements earned for each course you're enrolled in.",
        },
      ],
    },
    {
      id: "ai-tutor",
      title: "AI Tutor",
      questions: [
        {
          id: "ai-capabilities",
          question: "What can the AI Tutor help me with?",
          answer:
            "Our AI Tutor can explain complex concepts, answer questions, provide practice problems, offer feedback on your solutions, and adapt to your learning style. It's available 24/7 to assist with your studies.",
        },
        {
          id: "ai-personalization",
          question: "How does the AI Tutor personalize my learning?",
          answer:
            "The AI Tutor learns from your interactions, identifying your strengths, weaknesses, and preferred learning style. It then tailors explanations, examples, and practice questions to match your needs and help you progress more effectively.",
        },
      ],
    },
    {
      id: "revision",
      title: "Revision Tools",
      questions: [
        {
          id: "revision-tools",
          question: "What revision tools are available?",
          answer:
            "StudyVerse offers various revision tools including flashcards, quizzes, concept maps, and summary notes. These tools use spaced repetition and active recall techniques to help you retain information more effectively.",
        },
        {
          id: "spaced-repetition",
          question: "How does spaced repetition work?",
          answer:
            "Spaced repetition is a learning technique that schedules review sessions at increasing intervals. StudyVerse automatically schedules your flashcards and review materials at optimal times to maximize retention while minimizing study time.",
        },
      ],
    },
  ]

  const helpResources = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn the basics of StudyVerse and how to make the most of it",
      icon: BookOpen,
      color: "text-study-purple",
      bgColor: "bg-study-purple/10",
      link: "#",
    },
    {
      id: 2,
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials on using all features",
      icon: Video,
      color: "text-study-blue",
      bgColor: "bg-study-blue/10",
      link: "#",
    },
    {
      id: 3,
      title: "User Manual",
      description: "Comprehensive documentation on all StudyVerse features",
      icon: FileText,
      color: "text-study-teal",
      bgColor: "bg-study-teal/10",
      link: "#",
    },
    {
      id: 4,
      title: "Community Forums",
      description: "Connect with other users and share tips",
      icon: MessageCircle,
      color: "text-study-green",
      bgColor: "bg-study-green/10",
      link: "#",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold gradient-text mb-6">Help Center</h1>

        {/* Search Bar */}
        <Card className="border-none shadow-md overflow-hidden mb-8">
          <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Search our help center for answers to common questions
              </p>
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-1 top-1 bg-gradient-to-r from-study-purple to-study-blue text-white h-10"
                >
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex mb-6">
          <div className="grid grid-cols-3 w-full md:w-[400px] bg-muted rounded-md p-1">
            <Button
              variant={activeTab === "faq" ? "default" : "ghost"}
              className={`flex items-center gap-2 ${activeTab === "faq" ? "bg-gradient-to-r from-study-purple/20 to-study-blue/20" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              <HelpCircle className="h-4 w-4" />
              FAQ
            </Button>
            <Button
              variant={activeTab === "resources" ? "default" : "ghost"}
              className={`flex items-center gap-2 ${activeTab === "resources" ? "bg-gradient-to-r from-study-blue/20 to-study-teal/20" : ""}`}
              onClick={() => setActiveTab("resources")}
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Button>
            <Button
              variant={activeTab === "contact" ? "default" : "ghost"}
              className={`flex items-center gap-2 ${activeTab === "contact" ? "bg-gradient-to-r from-study-teal/20 to-study-green/20" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about StudyVerse</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <h3 className="text-lg font-medium">{category.title}</h3>
                    {category.questions.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border rounded-md px-4">
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-4">
                            <p className="text-muted-foreground">{faq.answer}</p>
                            <div className="flex items-center justify-end mt-4 space-x-2">
                              <span className="text-sm text-muted-foreground mr-2">Was this helpful?</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleFeedback(true)}
                              >
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                Yes
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleFeedback(false)}
                              >
                                <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                                No
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <p className="text-sm text-muted-foreground">Can't find what you're looking for?</p>
              <Button variant="outline" className="gap-2" onClick={() => setActiveTab("contact")}>
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-study-blue to-study-teal" />
            <CardHeader>
              <CardTitle>Help Resources</CardTitle>
              <CardDescription>
                Guides, tutorials, and documentation to help you get the most out of StudyVerse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpResources.map((resource) => (
                  <Card key={resource.id} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${resource.bgColor}`}>
                          <resource.icon className={`h-6 w-6 ${resource.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <Button variant="link" className="p-0 h-auto" asChild>
                            <a href={resource.link} className="flex items-center gap-1">
                              View Resource
                              <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Popular Articles</h3>
                <ul className="space-y-3">
                  {[
                    "How to use the AI Tutor effectively",
                    "Creating a study schedule with the Planner",
                    "Mastering flashcards and spaced repetition",
                    "Connecting with study partners",
                    "Customizing your learning experience",
                  ].map((article, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-study-blue" />
                      <a href="#" className="text-sm hover:underline">
                        {article}
                      </a>
                      {index === 0 && <Badge className="ml-2 bg-study-purple/20 text-study-purple">Popular</Badge>}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-study-teal to-study-green" />
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for personalized help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-study-purple/10 mb-4">
                      <MessageCircle className="h-6 w-6 text-study-purple" />
                    </div>
                    <h3 className="font-medium mb-1">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-3">Chat with our support team in real-time</p>
                    <Badge className="bg-study-green/20 text-study-green">Available 24/7</Badge>
                    <Button className="mt-4 w-full bg-study-purple text-white">Start Chat</Button>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-study-blue/10 mb-4">
                      <Mail className="h-6 w-6 text-study-blue" />
                    </div>
                    <h3 className="font-medium mb-1">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send us an email and we'll respond within 24 hours
                    </p>
                    <a href="mailto:support@studyverse.com" className="text-study-blue hover:underline">
                      support@studyverse.com
                    </a>
                    <Button className="mt-4 w-full bg-study-blue text-white">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-study-teal/10 mb-4">
                      <HelpCircle className="h-6 w-6 text-study-teal" />
                    </div>
                    <h3 className="font-medium mb-1">Help Center</h3>
                    <p className="text-sm text-muted-foreground mb-3">Browse our knowledge base for quick answers</p>
                    <Badge className="bg-study-blue/20 text-study-blue">200+ Articles</Badge>
                    <Button className="mt-4 w-full bg-study-teal text-white">Browse Articles</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Send us a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email address" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is your question about?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Please describe your issue in detail..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    ></textarea>
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-study-teal to-study-green text-white">
                    Send Message
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

