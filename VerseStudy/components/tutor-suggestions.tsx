"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface TutorSuggestionsProps {
  setInputValue: (value: string) => void
}

export function TutorSuggestions({ setInputValue }: TutorSuggestionsProps) {
  const suggestions = [
    "Can you explain arrays and linked lists?",
    "Help me understand neural networks",
    "What's the difference between HTTP and HTTPS?",
    "How do I solve this equation: 2x + 5 = 13",
  ]

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setInputValue(suggestion)}
          >
            <Card className="border-none shadow-sm cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-2 text-sm">{suggestion}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

