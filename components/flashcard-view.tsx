"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

interface FlashcardViewProps {
  topic: string
}

export function FlashcardView({ topic }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [exitX, setExitX] = useState<number>(0)

  // For swipe detection
  const swipeThreshold = 100
  const cardRef = useRef<HTMLDivElement>(null)

  // Mock flashcards for the selected topic
  const flashcards = [
    {
      id: "1",
      front: "What is an array?",
      back: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.",
      difficulty: "easy",
    },
    {
      id: "2",
      front: "What is the time complexity of accessing an element in an array?",
      back: "O(1) - Constant time. Arrays provide random access to elements using their index.",
      difficulty: "medium",
    },
    {
      id: "3",
      front: "What is the difference between an array and a linked list?",
      back: "Arrays store elements in contiguous memory locations, while linked lists store elements at scattered addresses. Arrays provide constant time access to elements, while linked lists require linear time to access elements.",
      difficulty: "medium",
    },
  ]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection("left")
      setExitX(-300)
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setIsFlipped(false)
        setDirection(null)
      }, 200)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection("right")
      setExitX(300)
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        setIsFlipped(false)
        setDirection(null)
      }, 200)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setCorrect(0)
    setIncorrect(0)
    setIsCompleted(false)
  }

  const handleKnew = () => {
    setCorrect(correct + 1)
    handleNext()
  }

  const handleDidntKnow = () => {
    setIncorrect(incorrect + 1)
    handleNext()
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        // Swiped right - go to previous card
        handlePrevious()
      } else if (info.offset.x < 0 && currentIndex < flashcards.length - 1) {
        // Swiped left - go to next card
        handleNext()
      }
    }
  }

  if (isCompleted) {
    return (
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-study-green/20 flex items-center justify-center mb-4">
            <ThumbsUp className="h-8 w-8 text-study-green" />
          </div>
          <h2 className="text-xl font-bold mb-2">Session Complete!</h2>
          <p className="text-muted-foreground mb-6 text-center">You've reviewed all the flashcards in this deck</p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-study-green mb-1">{correct}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-study-orange mb-1">{incorrect}</div>
              <div className="text-sm text-muted-foreground">To Review</div>
            </div>
          </div>

          <Progress
            value={(correct / flashcards.length) * 100}
            className="h-2 w-full mb-8"
            indicatorClassName="bg-gradient-to-r from-study-green to-study-teal"
          />

          <Button
            className="w-full bg-gradient-to-r from-study-purple to-study-blue text-white"
            onClick={handleRestart}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart Deck
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="p-3 flex justify-between items-center border-b">
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
        </div>

        <div className="relative min-h-[300px] flex items-center justify-center p-4 touch-none">
          <AnimatePresence mode="wait">
            <motion.div
              ref={cardRef}
              key={`${currentIndex}-${isFlipped ? "back" : "front"}`}
              initial={{
                opacity: 0,
                rotateY: isFlipped ? -90 : 90,
                x: direction === "left" ? 300 : direction === "right" ? -300 : 0,
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                x: 0,
              }}
              exit={{
                opacity: 0,
                rotateY: isFlipped ? 90 : -90,
                x: exitX,
              }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              onClick={handleFlip}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              whileTap={{ scale: 0.98 }}
            >
              {isFlipped ? (
                <div className="text-center">
                  <Badge className="mb-4 bg-study-blue/20 text-study-blue">Answer</Badge>
                  <p className="text-sm">{flashcards[currentIndex].back}</p>
                </div>
              ) : (
                <div className="text-center">
                  <Badge className="mb-4 bg-study-purple/20 text-study-purple">Question</Badge>
                  <p className="text-lg font-medium">{flashcards[currentIndex].front}</p>
                  <p className="text-xs text-muted-foreground mt-4">(Tap to flip, swipe to navigate)</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-3 border-t flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>

          {isFlipped ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-study-orange text-study-orange hover:bg-study-orange/10"
                onClick={handleDidntKnow}
                size="sm"
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Didn't Know
              </Button>
              <Button className="bg-study-green hover:bg-study-green/90 text-white" onClick={handleKnew} size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Knew It
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={handleNext} size="sm">
              Skip
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

