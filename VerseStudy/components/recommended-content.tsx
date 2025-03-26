"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Brain, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function RecommendedContent() {
  const recommendations = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      type: "course",
      reason: "Based on your interests",
      icon: BookOpen,
      color: "from-study-purple to-study-blue",
      href: "/courses/3",
    },
    {
      id: 2,
      title: "Arrays and Linked Lists",
      type: "revision",
      reason: "Due for review",
      icon: Brain,
      color: "from-study-blue to-study-teal",
      href: "/revise?topic=arrays",
    },
    {
      id: 3,
      title: "Need help with a concept?",
      type: "ai-tutor",
      reason: "Ask the AI Tutor",
      icon: Lightbulb,
      color: "from-study-teal to-study-green",
      href: "/tutor",
    },
  ]

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Recommended for You</h2>

      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <Card className="card card-hover overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${item.color}`}></div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r ${item.color} text-white`}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type === "course" && "Course"}
                          {item.type === "revision" && "Revision"}
                          {item.type === "ai-tutor" && "AI Tutor"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.reason}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

