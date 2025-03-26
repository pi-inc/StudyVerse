"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function WelcomeHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateTransform = (index: number) => {
    if (typeof window === "undefined") return "translate(0px, 0px)"

    const factor = index * 0.02
    const x = (mousePosition.x / window.innerWidth - 0.5) * 20 * factor
    const y = (mousePosition.y / window.innerHeight - 0.5) * 20 * factor
    return `translate(${x}px, ${y}px)`
  }

  return (
    <div className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-study-purple/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-study-blue/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-40 right-20 w-40 h-40 bg-study-teal/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter gradient-text">
            Welcome to StudyVerse
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-[800px] mx-auto">
            Your ultimate study companion. Learn, revise, plan, and connect with other students.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-study-purple to-study-blue text-white shadow-lg button-pop w-full sm:w-auto"
          >
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="gradient-border button-pop w-full sm:w-auto">
            <Link href="/tutor">Get Started with AI Tutor</Link>
          </Button>
        </motion.div>

        {/* Floating elements */}
        <div className="relative h-40 md:h-60 mt-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${i * 15 + 10}%`,
                top: `${(i % 3) * 20 + 10}%`,
                transform: calculateTransform(i),
                transition: "transform 0.1s ease-out",
              }}
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl animate-float`}
                style={{
                  backgroundColor: ["#8B5CF6", "#3B82F6", "#14B8A6", "#22C55E", "#EAB308"][i - 1],
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {["📚", "🧠", "📝", "📅", "👥"][i - 1]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

