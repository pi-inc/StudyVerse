"use client"

import { motion } from "framer-motion"
import { Brain, Calendar, Users, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  // These are the top critical user tasks within StudyVerse, in order of priority
  const quickActions = [
    {
      id: 1,
      title: "Ask AI Tutor",
      icon: Lightbulb,
      color: "from-study-purple to-study-blue",
      bgColor: "bg-gradient-to-r from-study-purple to-study-blue",
      href: "/tutor",
    },
    {
      id: 2,
      title: "Review",
      icon: Brain,
      color: "from-study-blue to-study-teal",
      bgColor: "bg-gradient-to-r from-study-blue to-study-teal",
      href: "/revise",
    },
    {
      id: 3,
      title: "Schedule",
      icon: Calendar,
      color: "from-study-teal to-study-green",
      bgColor: "bg-gradient-to-r from-study-teal to-study-green",
      href: "/plan",
    },
    {
      id: 4,
      title: "Community",
      icon: Users,
      color: "from-study-green to-study-yellow",
      bgColor: "bg-gradient-to-r from-study-green to-study-yellow",
      href: "/social",
    },
  ]

  return (
    <section>
      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
                onClick={() => router.push(action.href)}
              >
                <div
                  className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full ${action.bgColor} text-white flex items-center justify-center shadow-sm mb-1 sm:mb-2`}
                >
                  <action.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center">{action.title}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

