"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import FAQItem from "../components/help/FAQItem"

const HelpScreen = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("faq")

  const faqCategories = [
    {
      title: "General",
      items: [
        {
          question: "What is StudyVerse?",
          answer:
            "StudyVerse is an AI-powered learning platform designed to help students master complex subjects through personalized learning paths, interactive study tools, and spaced repetition techniques.",
        },
        {
          question: "How do I get started?",
          answer:
            "After signing up, you can browse available courses, take a placement test to determine your knowledge level, and start learning. The AI will create a personalized study plan based on your goals and current knowledge.",
        },
        {
          question: "Is there a free trial?",
          answer:
            "Yes, StudyVerse offers a 14-day free trial with access to all features. After the trial period, you can choose from our various subscription plans.",
        },
      ],
    },
    {
      title: "Courses",
      items: [
        {
          question: "What types of courses are available?",
          answer:
            "StudyVerse offers courses in Computer Science, Mathematics, Data Science, Web Development, and more. New courses are added regularly based on user demand.",
        },
        {
          question: "How do I track my course progress?",
          answer:
            "Your progress is automatically tracked in each course. You can view detailed statistics, including completion percentage, time spent, and mastery level in your profile dashboard.",
        },
      ],
    },
    {
      title: "AI Tutor",
      items: [
        {
          question: "What can the AI Tutor help me with?",
          answer:
            "The AI Tutor can answer questions, explain concepts, provide practice problems, give feedback on your solutions, and adapt to your learning style and pace.",
        },
        {
          question: "How does the AI Tutor personalize my learning?",
          answer:
            "The AI Tutor analyzes your performance, identifies knowledge gaps, and adjusts the difficulty and type of content to match your learning needs. It also remembers your previous interactions to provide contextually relevant support.",
        },
      ],
    },
    {
      title: "Revision Tools",
      items: [
        {
          question: "What revision tools are available?",
          answer:
            "StudyVerse offers flashcards, quizzes, concept maps, and summary notes. These tools are automatically generated from course content and can be customized to focus on areas you need to review.",
        },
        {
          question: "How does spaced repetition work?",
          answer:
            "Spaced repetition schedules reviews at optimal intervals to maximize long-term retention. StudyVerse tracks your performance on each concept and automatically schedules reviews when you're likely to start forgetting.",
        },
      ],
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Help Center" showBack={true} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.pageTitle}>Help Center</Text>
        <View style={styles.gradientDivider} />

        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>How can we help you?</Text>
          <Text style={styles.searchSubtitle}>Search our help center for answers to common questions</Text>

          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "faq" && styles.activeTab]}
            onPress={() => setActiveTab("faq")}
          >
            <Ionicons name="help-circle-outline" size={20} color={activeTab === "faq" ? "#fff" : "#9ca3af"} />
            <Text style={[styles.tabText, activeTab === "faq" && styles.activeTabText]}>FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "resources" && styles.activeTab]}
            onPress={() => setActiveTab("resources")}
          >
            <Ionicons name="document-text-outline" size={20} color={activeTab === "resources" ? "#fff" : "#9ca3af"} />
            <Text style={[styles.tabText, activeTab === "resources" && styles.activeTabText]}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "contact" && styles.activeTab]}
            onPress={() => setActiveTab("contact")}
          >
            <Ionicons name="mail-outline" size={20} color={activeTab === "contact" ? "#fff" : "#9ca3af"} />
            <Text style={[styles.tabText, activeTab === "contact" && styles.activeTabText]}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Text style={styles.sectionSubtitle}>Find answers to common questions about StudyVerse</Text>

          {faqCategories.map((category, index) => (
            <View key={index} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              {category.items.map((item, itemIndex) => (
                <FAQItem key={itemIndex} question={item.question} answer={item.answer} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactText}>Can't find what you're looking for?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
    marginTop: 16,
    marginBottom: 8,
  },
  gradientDivider: {
    height: 4,
    backgroundColor: "#7c3aed",
    borderRadius: 2,
    marginBottom: 24,
  },
  searchSection: {
    marginBottom: 24,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  searchSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: "#fff",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#7c3aed",
  },
  tabText: {
    color: "#9ca3af",
    marginLeft: 6,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  faqSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 16,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  contactSection: {
    alignItems: "center",
    marginBottom: 40,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  contactText: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 12,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7c3aed",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
})

export default HelpScreen

