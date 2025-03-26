"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../context/ThemeContext"
import Header from "../components/layout/Header"
import FlashcardView from "../components/revision/FlashcardView"
import QuizView from "../components/revision/QuizView"
import SummaryView from "../components/revision/SummaryView"
import ConceptMapView from "../components/revision/ConceptMapView"
import LearningPathMap from "../components/learning/LearningPathMap"
import FeatureTourButton from "../components/improved-onboarding/FeatureTourButton"
import PageTransition from "../components/navigation/PageTransition"

const ReviseScreen = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("flashcards")

  const tabs = [
    { id: "flashcards", label: "Flashcards" },
    { id: "quizzes", label: "Quizzes" },
    { id: "summaries", label: "Summaries" },
    { id: "concept-maps", label: "Concept Maps" },
    { id: "learning-paths", label: "Learning Paths" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "flashcards":
        return <FlashcardView />
      case "quizzes":
        return <QuizView />
      case "summaries":
        return <SummaryView />
      case "concept-maps":
        return <ConceptMapView />
      case "learning-paths":
        return <LearningPathMap />
      default:
        return <FlashcardView />
    }
  }

  return (
    <PageTransition type="fade">
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Revision Tools" />

        <View style={styles.tourButtonContainer}>
          <FeatureTourButton tourId="revise-tour" label="Take Revision Tour" />
        </View>

        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && { backgroundColor: theme.primary }]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  style={[styles.tabText, { color: activeTab === tab.id ? theme.primaryForeground : theme.foreground }]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>{renderTabContent()}</View>
      </SafeAreaView>
    </PageTransition>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tourButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  tabsContainer: {
    paddingVertical: 8,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  content: {
    flex: 1,
    padding: 16,
  },
})

export default ReviseScreen

