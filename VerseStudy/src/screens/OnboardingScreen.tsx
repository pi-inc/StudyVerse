"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { useOnboarding } from "../context/OnboardingContext"
import { LinearGradient } from "expo-linear-gradient"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"

const { width, height } = Dimensions.get("window")

interface OnboardingItem {
  id: string
  title: string
  description: string
  icon: keyof typeof Feather.glyphMap
  color: string[]
}

const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Welcome to StudyVerse",
    description: "Your all-in-one learning platform designed to help you study smarter, not harder.",
    icon: "book-open",
    color: ["#6366F1", "#8B5CF6"],
  },
  {
    id: "2",
    title: "Organize Your Courses",
    description: "Keep all your courses in one place and track your progress with ease.",
    icon: "layers",
    color: ["#3B82F6", "#2DD4BF"],
  },
  {
    id: "3",
    title: "Effective Revision",
    description: "Use flashcards, quizzes, and summaries to revise effectively and retain information.",
    icon: "repeat",
    color: ["#10B981", "#34D399"],
  },
  {
    id: "4",
    title: "Plan Your Studies",
    description: "Create study plans and set goals to stay on track with your learning journey.",
    icon: "calendar",
    color: ["#F59E0B", "#FBBF24"],
  },
  {
    id: "5",
    title: "Connect with Peers",
    description: "Join study groups and connect with peers to enhance your learning experience.",
    icon: "users",
    color: ["#EC4899", "#F472B6"],
  },
]

const OnboardingScreen = () => {
  const { theme } = useTheme()
  const { setIsFirstLaunch } = useOnboarding()
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={styles.slide}>
        <LinearGradient colors={item.color} style={styles.iconContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Feather name={item.icon} size={40} color="#FFFFFF" />
        </LinearGradient>
        <Text style={[styles.title, { color: theme.foreground }]}>{item.title}</Text>
        <Text style={[styles.description, { color: theme.mutedForeground }]}>{item.description}</Text>
      </View>
    )
  }

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
      setCurrentIndex(currentIndex + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    setIsFirstLaunch(false)
    // @ts-ignore - Navigation typing issue
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="auto" />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
      />

      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? theme.primary : theme.muted,
                width: index === currentIndex ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={handleSkip}>
          <Text style={[styles.buttonText, { color: theme.mutedForeground }]}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton, { backgroundColor: theme.primary }]}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>
            {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "transparent",
  },
  nextButton: {
    minWidth: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
})

export default OnboardingScreen

