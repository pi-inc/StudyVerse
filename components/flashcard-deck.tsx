"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, RotateCcw, Shuffle, CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface FlashcardDeckProps {
  courseId: string
  topicId: string
  difficulty: number
  onComplete: (correct: number, total: number) => void
}

type Flashcard = {
  id: string
  front: string
  back: string
  difficulty: "easy" | "medium" | "hard"
  lastReviewed?: Date
  nextReview?: Date
  confidence?: number
}

export function FlashcardDeck({ courseId, topicId, difficulty, onComplete }: FlashcardDeckProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const { toast } = useToast()

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API call to get flashcards for the selected topic
    const mockFlashcards: Flashcard[] = [
      {
        id: "1",
        front: "What is an array?",
        back: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.",
        difficulty: "easy",
        confidence: 0.8,
      },
      {
        id: "2",
        front: "What is the time complexity of accessing an element in an array?",
        back: "O(1) - Constant time. Arrays provide random access to elements using their index.",
        difficulty: "medium",
        confidence: 0.6,
      },
      {
        id: "3",
        front: "What is the difference between an array and a linked list?",
        back: "Arrays store elements in contiguous memory locations, while linked lists store elements at scattered addresses. Arrays provide constant time access to elements, while linked lists require linear time to access elements.",
        difficulty: "medium",
        confidence: 0.5,
      },
      {
        id: "4",
        front: "What is a dynamic array?",
        back: "A dynamic array is an array that can resize itself when needed. It automatically grows when elements are added and shrinks when elements are removed.",
        difficulty: "medium",
        confidence: 0.7,
      },
      {
        id: "5",
        front: "What is the time complexity of inserting an element at the end of an array?",
        back: "O(1) amortized time - Usually constant time, but occasionally O(n) when the array needs to be resized.",
        difficulty: "hard",
        confidence: 0.4,
      },
    ]

    // Filter based on difficulty
    let filteredCards = mockFlashcards
    if (difficulty < 33) {
      filteredCards = mockFlashcards.filter((card) => card.difficulty === "easy")
    } else if (difficulty < 66) {
      filteredCards = mockFlashcards.filter((card) => card.difficulty === "easy" || card.difficulty === "medium")
    }

    // Shuffle the cards
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5)

    setFlashcards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
    setCorrect(0)
    setIncorrect(0)
    setIsCompleted(false)
  }, [courseId, topicId, difficulty])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      setIsCompleted(true)
      onComplete(correct, flashcards.length)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)

    toast({
      title: "Cards shuffled",
      description: "The flashcards have been randomly reordered",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setCorrect(0)
    setIncorrect(0)
    setIsCompleted(false)

    toast({
      title: "Restarted",
      description: "Starting the flashcard deck from the beginning",
      className: "bg-gradient-to-r from-study-teal/20 to-study-green/20 border-study-teal",
    })
  }

  const handleKnew = () => {
    setCorrect(correct + 1)
    handleNext()

    toast({
      title: "Marked as known",
      description: "Great job! Moving to the next card",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  const handleDidntKnow = () => {
    setIncorrect(incorrect + 1)
    handleNext()

    toast({
      title: "Marked for review",
      description: "This card will appear again later",
      className: "bg-gradient-to-r from-study-orange/20 to-study-red/20 border-study-orange",
    })
  }

  if (flashcards.length === 0) {
    return (
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading flashcards...</p>
        </CardContent>
      </Card>
    )
  }

  if (isCompleted) {
    return (
      <Card className="border-none shadow-md overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-study-green to-study-teal" />
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="h-20 w-20 rounded-full bg-study-green/20 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-study-green" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
          <p className="text-muted-foreground mb-6">You've reviewed all the flashcards in this deck</p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-study-green mb-1">{correct}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-study-orange mb-1">{incorrect}</div>
              <div className="text-sm text-muted-foreground">To Review</div>
            </div>
          </div>

          <Progress
            value={(correct / flashcards.length) * 100}
            className="h-2 w-64 mb-8"
            indicatorClassName="bg-gradient-to-r from-study-green to-study-teal"
          />

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleRestart} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Restart Deck
            </Button>
            <Button
              className="bg-gradient-to-r from-study-purple to-study-blue text-white gap-2"
              onClick={handleShuffle}
            >
              <Shuffle className="h-4 w-4" />
              Shuffle & Restart
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
      <CardContent className="p-0">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <Badge className="bg-study-purple/20 text-study-purple">
              Card {currentIndex + 1} of {flashcards.length}
            </Badge>
            <Badge
              className={`
              ${
                flashcards[currentIndex].difficulty === "easy"
                  ? "bg-study-green/20 text-study-green"
                  : flashcards[currentIndex].difficulty === "medium"
                    ? "bg-study-blue/20 text-study-blue"
                    : "bg-study-purple/20 text-study-purple"
              }
            `}
            >
              {flashcards[currentIndex].difficulty.charAt(0).toUpperCase() +
                flashcards[currentIndex].difficulty.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShuffle}>
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRestart}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative min-h-[400px] flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${isFlipped ? "back" : "front"}`}
              initial={{ opacity: 0, rotateY: isFlipped ? -90 : 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: isFlipped ? 90 : -90 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              onClick={handleFlip}
            >
              {isFlipped ? (
                <div className="text-center max-w-2xl">
                  <Badge className="mb-4 bg-study-blue/20 text-study-blue">Answer</Badge>
                  <p className="text-lg">{flashcards[currentIndex].back}</p>
                </div>
              ) : (
                <div className="text-center max-w-2xl">
                  <Badge className="mb-4 bg-study-purple/20 text-study-purple">Question</Badge>
                  <p className="text-xl font-medium">{flashcards[currentIndex].front}</p>
                  <p className="text-sm text-muted-foreground mt-4">(Click to reveal answer)</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-4 border-t flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {isFlipped ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2 border-study-orange text-study-orange hover:bg-study-orange/10"
                onClick={handleDidntKnow}
              >
                <ThumbsDown className="h-4 w-4" />
                Didn't Know
              </Button>
              <Button className="gap-2 bg-study-green hover:bg-study-green/90 text-white" onClick={handleKnew}>
                <ThumbsUp className="h-4 w-4" />
                Knew It
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={handleNext} className="gap-2">
              Skip
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

