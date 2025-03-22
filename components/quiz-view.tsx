"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, ArrowRight, Award, Clock, AlertCircle } from "lucide-react"

interface QuizViewProps {
  topic: string
}

export function QuizView({ topic }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(true)

  // Mock quiz questions for the selected topic
  const questions = [
    {
      id: "1",
      question: "Which of the following is NOT a characteristic of arrays?",
      options: [
        "Elements are stored in contiguous memory locations",
        "Random access is possible",
        "Dynamic size allocation",
        "Homogeneous elements",
      ],
      correctAnswer: 2,
      explanation:
        "Arrays have a fixed size that is determined at the time of creation. Dynamic size allocation is a characteristic of dynamic arrays or other data structures like linked lists.",
      difficulty: "medium",
    },
    {
      id: "2",
      question: "What is the time complexity of searching for an element in an unsorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "In an unsorted array, you need to check each element one by one until you find the target element, which takes O(n) time in the worst case.",
      difficulty: "easy",
    },
    {
      id: "3",
      question: "Which of the following operations is most efficient in an array?",
      options: [
        "Insertion at the beginning",
        "Deletion from the middle",
        "Access by index",
        "Insertion at an arbitrary position",
      ],
      correctAnswer: 2,
      explanation:
        "Accessing an element by its index in an array is an O(1) operation, making it the most efficient among the given options.",
      difficulty: "easy",
    },
  ]

  // Timer effect
  useEffect(() => {
    if (!timerActive || questions.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!isAnswered) {
            handleAnswer(-1) // Time's up, no answer selected
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, isAnswered, questions])

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(30)
    setTimerActive(true)
  }, [currentIndex])

  const handleAnswer = (optionIndex: number) => {
    setTimerActive(false)
    setSelectedOption(optionIndex)
    setIsAnswered(true)

    const currentQuestion = questions[currentIndex]
    const isAnswerCorrect = optionIndex === currentQuestion.correctAnswer
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setIsCorrect(false)
      setTimeLeft(30)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setScore(0)
    setIsCompleted(false)
    setTimeLeft(30)
    setTimerActive(true)
  }

  if (isCompleted) {
    return (
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-study-blue/20 flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-study-blue" />
          </div>
          <h2 className="text-xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground mb-6 text-center">You've completed the quiz</p>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold mb-1">
              {score} / {questions.length}
            </div>
            <div className="text-sm text-muted-foreground">{Math.round((score / questions.length) * 100)}% Correct</div>
          </div>

          <Progress
            value={(score / questions.length) * 100}
            className="h-2 w-full mb-8"
            indicatorClassName="bg-gradient-to-r from-study-blue to-study-teal"
          />

          <div className="flex gap-3 w-full">
            <Button variant="outline" className="flex-1" onClick={handleRestart}>
              Try Again
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-study-purple to-study-blue text-white">
              Review Answers
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg">
            Question {currentIndex + 1} of {questions.length}
          </CardTitle>
          <Badge
            className={`mt-1 ${
              currentQuestion.difficulty === "easy"
                ? "bg-study-green/20 text-study-green"
                : currentQuestion.difficulty === "medium"
                  ? "bg-study-blue/20 text-study-blue"
                  : "bg-study-purple/20 text-study-purple"
            }`}
          >
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </Badge>
        </div>
        <Badge
          className={`
          ${
            timeLeft > 20
              ? "bg-study-green/20 text-study-green"
              : timeLeft > 10
                ? "bg-study-yellow/20 text-study-yellow"
                : "bg-study-orange/20 text-study-orange animate-pulse"
          }
        `}
        >
          <Clock className="h-3 w-3 mr-1" />
          {timeLeft}s
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-4">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 rounded-md border p-3 transition-colors ${
                  isAnswered
                    ? index === currentQuestion.correctAnswer
                      ? "border-study-green bg-study-green/10"
                      : index === selectedOption
                        ? "border-study-orange bg-study-orange/10"
                        : "border-muted"
                    : "hover:bg-muted/50 cursor-pointer"
                }`}
                onClick={() => !isAnswered && handleAnswer(index)}
              >
                <div className="flex-1 text-sm">{option}</div>
                {isAnswered &&
                  (index === currentQuestion.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-study-green" />
                  ) : index === selectedOption ? (
                    <XCircle className="h-5 w-5 text-study-orange" />
                  ) : null)}
              </motion.div>
            ))}
          </div>
        </div>

        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-md ${
              isCorrect
                ? "bg-study-green/10 border border-study-green/30"
                : "bg-study-orange/10 border border-study-orange/30"
            }`}
          >
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-study-green mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-study-orange mt-0.5" />
              )}
              <div>
                <p className="font-medium mb-1 text-sm">{isCorrect ? "Correct!" : "Incorrect"}</p>
                <p className="text-xs">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Badge className="bg-study-blue/20 text-study-blue">
          Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
        </Badge>

        {isAnswered ? (
          <Button className="bg-gradient-to-r from-study-blue to-study-teal text-white" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button variant="outline" className="text-sm" onClick={() => handleAnswer(-1)}>
            Skip Question
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

