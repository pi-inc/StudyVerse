"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Brain,
  Calendar,
  Users,
  Lightbulb,
  Award,
  Heart,
  Globe,
  Zap,
  Shield,
  Code,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const features = [
    {
      title: "AI Tutor",
      description: "Get personalized help from our AI tutor that adapts to your learning style",
      icon: Lightbulb,
      color: "from-study-purple to-study-blue",
      emoji: "💡",
    },
    {
      title: "Courses",
      description: "Access a wide range of courses with interactive content and exercises",
      icon: BookOpen,
      color: "from-study-blue to-study-teal",
      emoji: "📚",
    },
    {
      title: "Reviser",
      description: "Use spaced repetition and active recall to strengthen your knowledge",
      icon: Brain,
      color: "from-study-teal to-study-green",
      emoji: "🧠",
    },
    {
      title: "Planner",
      description: "Organize your study schedule and track your progress",
      icon: Calendar,
      color: "from-study-green to-study-yellow",
      emoji: "📅",
    },
    {
      title: "Social",
      description: "Connect with other students and form study groups",
      icon: Users,
      color: "from-study-yellow to-study-orange",
      emoji: "👥",
    },
    {
      title: "Achievements",
      description: "Earn badges and rewards as you progress in your learning journey",
      icon: Award,
      color: "from-study-orange to-study-red",
      emoji: "🏆",
    },
  ]

  const values = [
    {
      title: "Accessible Learning",
      description: "We believe education should be accessible to everyone, regardless of background or circumstances.",
      icon: Globe,
      color: "bg-study-purple/10 text-study-purple",
    },
    {
      title: "Personalized Experience",
      description: "Every student learns differently. Our platform adapts to your unique learning style and pace.",
      icon: Sparkles,
      color: "bg-study-blue/10 text-study-blue",
    },
    {
      title: "Continuous Innovation",
      description: "We're constantly improving our platform with the latest educational research and technology.",
      icon: Zap,
      color: "bg-study-teal/10 text-study-teal",
    },
    {
      title: "Community Focus",
      description: "Learning is better together. We foster a supportive community of students and educators.",
      icon: Heart,
      color: "bg-study-green/10 text-study-green",
    },
    {
      title: "Privacy & Security",
      description: "Your data and privacy are paramount. We maintain the highest standards of security.",
      icon: Shield,
      color: "bg-study-yellow/10 text-study-yellow",
    },
    {
      title: "Open Source",
      description: "We believe in transparency and collaboration. Many of our tools are open source.",
      icon: Code,
      color: "bg-study-orange/10 text-study-orange",
    },
  ]

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former educator with a passion for making learning accessible to everyone.",
      image: "/placeholder.svg?height=100&width=100",
      initial: "AJ",
    },
    {
      name: "Sarah Chen",
      role: "Chief Learning Officer",
      bio: "PhD in Educational Psychology with expertise in cognitive science and learning methods.",
      image: "/placeholder.svg?height=100&width=100",
      initial: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "AI researcher and engineer focused on building adaptive learning systems.",
      image: "/placeholder.svg?height=100&width=100",
      initial: "MR",
    },
    {
      name: "Priya Patel",
      role: "Head of Content",
      bio: "Curriculum developer with experience creating engaging educational materials.",
      image: "/placeholder.svg?height=100&width=100",
      initial: "PP",
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
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About StudyVerse</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing education through personalized, AI-powered learning experiences
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At StudyVerse, we're on a mission to transform how people learn by combining the best of educational
                science with cutting-edge technology. We believe that learning should be personalized, engaging, and
                effective.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform uses artificial intelligence to adapt to each student's unique learning style, providing
                customized guidance, resources, and feedback to help them achieve their educational goals.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a student, professional, or lifelong learner, StudyVerse is designed to help you learn
                more effectively and enjoy the process along the way.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-study-purple/20 via-study-blue/10 to-study-teal/20 rounded-2xl transform rotate-3"></div>
              <Card className="border-none shadow-lg relative z-10">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-study-purple to-study-blue flex items-center justify-center mb-6">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Founded in 2023</h3>
                    <p className="text-muted-foreground mb-4">
                      StudyVerse was created by a team of educators, researchers, and technologists who saw the
                      potential for AI to revolutionize education.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-study-purple/20 text-study-purple">10,000+ Students</Badge>
                      <Badge className="bg-study-blue/20 text-study-blue">500+ Courses</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines multiple tools to create a complete learning ecosystem
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={item}>
                <Card className="h-full overflow-hidden card-hover border-none shadow-md">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-2xl">{feature.emoji}</span>
                          {feature.title}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`h-10 w-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at StudyVerse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${value.color.split(" ")[0]} ${value.color.split(" ")[1]}`}>
                        <value.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind StudyVerse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-md overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-xl">{member.initial}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-study-purple via-study-blue to-study-teal" />
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to transform your learning?</h2>
                  <p className="text-lg text-muted-foreground">
                    Join thousands of students already using StudyVerse to achieve their goals.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-study-purple to-study-blue text-white">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="gradient-border">
                    Take a Tour
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  )
}

