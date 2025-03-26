"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Clock, HelpCircle, AlertCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface QuizComponentProps {
  courseId: string
  topicId: string
  difficulty: number
  onComplete: (correct: number, total: number) => void
}

type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

export function QuizComponent({ courseId, topicId, difficulty, onComplete }: QuizComponentProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(true)
  const { toast } = useToast()

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API call to get quiz questions for the selected topic
    const mockQuestions: QuizQuestion[] = [
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
      {
        id: "4",
        question:
          "What happens when you try to access an array element outside its bounds in most programming languages?",
        options: [
          "The program returns null",
          "The program throws an exception or crashes",
          "The program automatically resizes the array",
          "The program returns the closest valid element",
        ],
        correctAnswer: 1,
        explanation:
          'Most programming languages will throw an exception or crash when you try to access an array element outside its bounds. This is known as an "array index out of bounds" error.',
        difficulty: "medium",
      },
      {
        id: "5",
        question: "In a multi-dimensional array, what does arr[i][j] represent?",
        options: [
          "The element at the i-th row and j-th column",
          "The element at the j-th row and i-th column",
          "The sum of elements in the i-th row and j-th column",
          "The product of elements in the i-th row and j-th column",
        ],
        correctAnswer: 0,
        explanation: "In a multi-dimensional array, arr[i][j] represents the element at the i-th row and j-th column.",
        difficulty: "hard",
      },
    ]

    // Filter based on difficulty
    let filteredQuestions = mockQuestions
    if (difficulty < 33) {
      filteredQuestions = mockQuestions.filter((q) => q.difficulty === "easy")
    } else if (difficulty < 66) {
      filteredQuestions = mockQuestions.filter((q) => q.difficulty === "easy" || q.difficulty === "medium")
    }

    // Shuffle the questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)

    setQuestions(shuffled)
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setScore(0)
    setIsCompleted(false)
    setTimeLeft(30)
    setTimerActive(true)
  }, [courseId, topicId, difficulty])

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
      toast({
        title: "Correct!",
        description: currentQuestion.explanation,
        className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
      })
    } else {
      toast({
        title: optionIndex === -1 ? "Time's up!" : "Incorrect",
        description: currentQuestion.explanation,
        className: "bg-gradient-to-r from-study-orange/20 to-study-red/20 border-study-orange",
      })
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setIsCorrect(false)
    } else {
      setIsCompleted(true)
      onComplete(score, questions.length)
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

    toast({
      title: "Quiz restarted",
      description: "Starting the quiz from the beginning",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  if (questions.length === 0) {
    return (
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading quiz questions...</p>
        </CardContent>
      </Card>
    )
  }

  if (isCompleted) {
    return (
      <Card className="border-none shadow-md overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-study-green to-study-teal" />
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="h-20 w-20 rounded-full bg-study-blue/20 flex items-center justify-center mb-4">
            <Award className="h-10 w-10 text-study-blue" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground mb-6">You've completed the quiz</p>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-1">
              {score} / {questions.length}
            </div>
            <div className="text-sm text-muted-foreground">{Math.round((score / questions.length) * 100)}% Correct</div>
          </div>

          <Progress
            value={(score / questions.length) * 100}
            className="h-2 w-64 mb-8"
            indicatorClassName="bg-gradient-to-r from-study-blue to-study-teal"
          />

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleRestart} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Restart Quiz
            </Button>
            <Button className="bg-gradient-to-r from-study-purple to-study-blue text-white">Review Answers</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-study-blue to-study-teal" />
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle>
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
        <div className="flex items-center gap-2">
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
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>

          <RadioGroup value={selectedOption?.toString() || ""} disabled={isAnswered} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
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
                <RadioGroupItem value={index.toString()} id={`option-${index}`} className="sr-only" />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer flex justify-between items-center">
                  <span>{option}</span>
                  {isAnswered &&
                    (index === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-study-green" />
                    ) : index === selectedOption ? (
                      <XCircle className="h-5 w-5 text-study-orange" />
                    ) : null)}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
                <p className="font-medium mb-1">
                  {isCorrect ? "Correct!" : selectedOption === null ? "Time's up!" : "Incorrect"}
                </p>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-study-blue/20 text-study-blue">
            Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
          </Badge>
        </div>

        {isAnswered ? (
          <Button className="bg-gradient-to-r from-study-blue to-study-teal text-white gap-2" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="gap-2" onClick={() => handleAnswer(-1)}>
            <HelpCircle className="h-4 w-4" />
            Skip Question
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

