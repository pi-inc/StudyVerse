"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Brain, Calendar, Users, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

export function MainNavigation() {
  const features = [
    {
      title: "AI Tutor",
      description: "Get personalized help from our AI tutor",
      icon: Lightbulb,
      href: "/tutor",
      color: "from-study-purple to-study-blue",
      emoji: "💡",
    },
    {
      title: "Courses",
      description: "Browse and enroll in various courses",
      icon: BookOpen,
      href: "/courses",
      color: "from-study-blue to-study-teal",
      emoji: "📚",
    },
    {
      title: "Revise",
      description: "Review and test your knowledge",
      icon: Brain,
      href: "/revise",
      color: "from-study-teal to-study-green",
      emoji: "🧠",
    },
    {
      title: "Plan",
      description: "Organize your study schedule",
      icon: Calendar,
      href: "/plan",
      color: "from-study-green to-study-yellow",
      emoji: "📅",
    },
    {
      title: "Social",
      description: "Connect with other students",
      icon: Users,
      href: "/social",
      color: "from-study-yellow to-study-orange",
      emoji: "👥",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature, index) => (
        <motion.div key={feature.href} variants={item}>
          <Link href={feature.href} className="block">
            <Card className="h-full overflow-hidden card-hover border-none shadow-md">
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <CardHeader className="relative">
                <div
                  className="absolute top-0 right-0 p-4 text-2xl animate-bounce-light"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {feature.emoji}
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-r ${feature.color} text-white`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-primary font-medium">
                  <span>Explore {feature.title.toLowerCase()}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

