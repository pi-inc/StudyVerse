"use client"

import { useState } from "react"
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import { useStore } from "../store"
import { useToast } from "../context/ToastContext"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

const CourseRequestScreen = () => {
  const navigation = useNavigation()
  const { showToast } = useToast()
  const requestCustomCourse = useStore((state) => state.requestCustomCourse)
  const isLoading = useStore((state) => state.isLoading)
  const isDarkMode = useStore((state) => state.isDarkMode)

  const [courseName, setCourseName] = useState("")
  const [topicDescription, setTopicDescription] = useState("")
  const [learningGoals, setLearningGoals] = useState("")
  const [learningStyle, setLearningStyle] = useState("visual")

  const handleSubmit = async () => {
    if (!courseName || !topicDescription || !learningGoals) {
      showToast("Please fill in all required fields", { type: "error" })
      return
    }

    try {
      await requestCustomCourse({
        courseName,
        topicDescription,
        learningGoals,
        learningStyle,
      })

      showToast("Course request submitted successfully!", { type: "success" })
      navigation.goBack()
    } catch (error) {
      showToast("Failed to submit request. Please try again.", { type: "error" })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-${isDarkMode ? "gray-900" : "white"}`}
    >
      <ScrollView contentContainerStyle={tw`p-6`}>
        <Text style={tw`text-xl font-semibold mb-6 text-${isDarkMode ? "white" : "gray-900"}`}>
          Request a Custom Course
        </Text>

        <Input
          label="Course Name *"
          value={courseName}
          onChangeText={setCourseName}
          placeholder="e.g., Advanced Machine Learning"
          style={tw`bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg p-2 mb-6`}
          placeholderTextColor={isDarkMode ? "#A1A1AA" : "#71717A"}
        />

        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-medium text-gray-700 dark:text-gray-300 mb-1`}>Topic Description *</Text>
          <Input
            value={topicDescription}
            onChangeText={setTopicDescription}
            placeholder="Describe the topics you want to learn about"
            style={tw`bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg p-2`}
            placeholderTextColor={isDarkMode ? "#A1A1AA" : "#71717A"}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-medium text-gray-700 dark:text-gray-300 mb-1`}>Learning Goals *</Text>
          <Input
            value={learningGoals}
            onChangeText={setLearningGoals}
            placeholder="What do you hope to achieve by taking this course?"
            style={tw`bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg p-2`}
            placeholderTextColor={isDarkMode ? "#A1A1AA" : "#71717A"}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={tw`mb-8`}>
          <Text style={tw`text-sm font-medium text-gray-700 dark:text-gray-300 mb-2`}>Preferred Learning Style</Text>

          {["visual", "auditory", "reading", "kinesthetic"].map((style) => (
            <TouchableOpacity
              key={style}
              style={tw`flex-row items-center py-2`}
              onPress={() => setLearningStyle(style)}
            >
              <View
                style={tw`w-5 h-5 rounded-full border-2 border-blue-600 mr-3 ${learningStyle === style ? "bg-blue-600" : "bg-transparent"}`}
              />
              <Text style={tw`text-${isDarkMode ? "white" : "gray-900"}`}>
                {style === "visual" && "Visual (diagrams, charts, videos)"}
                {style === "auditory" && "Auditory (lectures, discussions)"}
                {style === "reading" && "Reading/Writing (texts, notes)"}
                {style === "kinesthetic" && "Kinesthetic (hands-on, practice)"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title={isLoading ? "Submitting..." : "Submit Request"}
          variant="primary"
          disabled={isLoading}
          onPress={handleSubmit}
          style={tw`rounded-lg h-12`}
          loading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CourseRequestScreen

