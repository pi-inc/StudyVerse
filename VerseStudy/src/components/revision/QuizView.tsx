"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"
import Button from "../ui/Button"
import { Feather } from "@expo/vector-icons"

// Mock data
const quizQuestions = [
  {
    id: "1",
    question: "Which of the following is NOT a core component in React Native?",
    options: [
      { id: "a", text: "View" },
      { id: "b", text: "Text" },
      { id: "c", text: "Div" },
      { id: "d", text: "Image" },
    ],
    correctAnswer: "c",
  },
  {
    id: "2",
    question: "What is the purpose of the useEffect hook in React?",
    options: [
      { id: "a", text: "To handle state in functional components" },
      { id: "b", text: "To perform side effects in functional components" },
      { id: "c", text: "To create custom hooks" },
      { id: "d", text: "To optimize rendering performance" },
    ],
    correctAnswer: "b",
  },
  {
    id: "3",
    question:
      "Which navigator in React Navigation allows you to switch between screens using tabs at the bottom of the screen?",
    options: [
      { id: "a", text: "Stack Navigator" },
      { id: "b", text: "Drawer Navigator" },
      { id: "c", text: "Bottom Tab Navigator" },
      { id: "d", text: "Material Top Tab Navigator" },
    ],
    correctAnswer: "c",
  },
]

const QuizView = () => {
  const { theme } = useTheme()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleOptionSelect = (optionId) => {
    if (!showAnswer) {
      setSelectedOption(optionId)
    }
  }

  const handleCheckAnswer = () => {
    if (selectedOption) {
      setShowAnswer(true)
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setShowAnswer(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const renderQuizContent = () => {
    if (quizCompleted) {
      return (
        <Card style={styles.resultCard}>
          <Text style={[styles.resultTitle, { color: theme.foreground }]}>Quiz Completed!</Text>

          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: theme.foreground }]}>Your Score:</Text>
            <Text style={[styles.scoreValue, { color: theme.primary }]}>
              {score} / {quizQuestions.length}
            </Text>
            <Text style={[styles.scorePercentage, { color: theme.mutedForeground }]}>
              ({Math.round((score / quizQuestions.length) * 100)}%)
            </Text>
          </View>

          <View style={styles.resultFeedback}>
            {score === quizQuestions.length ? (
              <View style={styles.feedbackContainer}>
                <Feather name="award" size={40} color={theme.study.yellow} style={styles.feedbackIcon} />
                <Text style={[styles.feedbackText, { color: theme.foreground }]}>Perfect Score! Excellent work!</Text>
              </View>
            ) : score >= quizQuestions.length / 2 ? (
              <View style={styles.feedbackContainer}>
                <Feather name="thumbs-up" size={40} color={theme.study.green} style={styles.feedbackIcon} />
                <Text style={[styles.feedbackText, { color: theme.foreground }]}>
                  Good job! Keep practicing to improve.
                </Text>
              </View>
            ) : (
              <View style={styles.feedbackContainer}>
                <Feather name="book-open" size={40} color={theme.study.orange} style={styles.feedbackIcon} />
                <Text style={[styles.feedbackText, { color: theme.foreground }]}>
                  You might need to review this material again.
                </Text>
              </View>
            )}
          </View>

          <Button gradient onPress={handleRestartQuiz} style={styles.restartButton}>
            Restart Quiz
          </Button>
        </Card>
      )
    }

    return (
      <>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.muted }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.primary,
                  width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.mutedForeground }]}>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </Text>
        </View>

        <Card style={styles.questionCard}>
          <Text style={[styles.questionText, { color: theme.foreground }]}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleOptionSelect(option.id)}
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: showAnswer
                      ? option.id === currentQuestion.correctAnswer
                        ? theme.study.green + "20"
                        : option.id === selectedOption
                          ? theme.study.red + "20"
                          : theme.muted
                      : selectedOption === option.id
                        ? theme.primary + "20"
                        : theme.muted,
                    borderColor: showAnswer
                      ? option.id === currentQuestion.correctAnswer
                        ? theme.study.green
                        : option.id === selectedOption
                          ? theme.study.red
                          : theme.border
                      : selectedOption === option.id
                        ? theme.primary
                        : theme.border,
                  },
                ]}
              >
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.optionIndicator,
                      {
                        backgroundColor: showAnswer
                          ? option.id === currentQuestion.correctAnswer
                            ? theme.study.green
                            : option.id === selectedOption
                              ? theme.study.red
                              : "transparent"
                          : selectedOption === option.id
                            ? theme.primary
                            : "transparent",
                        borderColor: showAnswer
                          ? option.id === currentQuestion.correctAnswer
                            ? theme.study.green
                            : option.id === selectedOption
                              ? theme.study.red
                              : theme.border
                          : selectedOption === option.id
                            ? theme.primary
                            : theme.border,
                      },
                    ]}
                  >
                    {showAnswer && option.id === currentQuestion.correctAnswer && (
                      <Feather name="check" size={14} color="white" />
                    )}
                    {showAnswer && option.id === selectedOption && option.id !== currentQuestion.correctAnswer && (
                      <Feather name="x" size={14} color="white" />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: showAnswer
                          ? option.id === currentQuestion.correctAnswer
                            ? theme.study.green
                            : option.id === selectedOption
                              ? theme.study.red
                              : theme.foreground
                          : theme.foreground,
                        fontFamily:
                          showAnswer && (option.id === currentQuestion.correctAnswer || option.id === selectedOption)
                            ? "Inter_600SemiBold"
                            : "Inter_400Regular",
                      },
                    ]}
                  >
                    {option.text}
                  </Text>
                </View>

                {showAnswer && option.id === currentQuestion.correctAnswer && (
                  <Text style={[styles.correctAnswerText, { color: theme.study.green }]}>Correct Answer</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={styles.actionButtons}>
          {!showAnswer ? (
            <Button
              gradient
              onPress={handleCheckAnswer}
              disabled={!selectedOption}
              style={[styles.actionButton, { opacity: !selectedOption ? 0.5 : 1 }]}
            >
              Check Answer
            </Button>
          ) : (
            <Button gradient onPress={handleNextQuestion} style={styles.actionButton}>
              {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </View>
      </>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {renderQuizContent()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "right",
  },
  questionCard: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionItem: {
    borderRadius: 8,
    borderWidth: 2,
    padding: 16,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  correctAnswerText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    marginTop: 8,
    marginLeft: 36,
  },
  actionButtons: {
    marginTop: 8,
  },
  actionButton: {
    width: "100%",
  },
  resultCard: {
    padding: 24,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: "Inter_700Bold",
  },
  scorePercentage: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  resultFeedback: {
    marginBottom: 24,
  },
  feedbackContainer: {
    alignItems: "center",
  },
  feedbackIcon: {
    marginBottom: 16,
  },
  feedbackText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  restartButton: {
    width: "100%",
  },
})

export default QuizView

