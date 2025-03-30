"use client"

import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, SafeAreaView, Animated, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import WelcomeStep from "../components/onboarding/WelcomeStep"
import KeyFeaturesStep from "../components/onboarding/KeyFeaturesStep"

// Get screen dimensions
const { width, height } = Dimensions.get("window")
const TOTAL_STEPS = 2 // Just the first two steps for now

// Update the component signature to accept setSkipAuth
const OnboardingScreen = ({ setSkipAuth }) => {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const scrollViewRef = useRef(null)
  const progressAnim = useRef(new Animated.Value(0)).current

  // Add state to track screen dimensions for responsiveness
  const [screenDimensions, setScreenDimensions] = useState({ width, height })

  // User data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    studyGoal: "",
    learningStyle: "",
    studyTimeMinutes: 30,
    subjects: [],
  })

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenDimensions({ width: window.width, height: window.height })
      // If dimensions change, make sure the scroll view is at the correct position
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: currentStep * window.width, animated: false })
      }
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)
    return () => subscription.remove()
  }, [currentStep])

  const updateUserData = (data) => {
    setUserData({ ...userData, ...data })
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      scrollViewRef.current?.scrollTo({ x: nextStep * screenDimensions.width, animated: true })
      updateProgressBar(nextStep)
    } else {
      // Navigate to sign in after completing the onboarding steps
      navigation.navigate("SignIn")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      scrollViewRef.current?.scrollTo({ x: prevStep * screenDimensions.width, animated: true })
      updateProgressBar(prevStep)
    }
  }

  const updateProgressBar = (step) => {
    Animated.timing(progressAnim, {
      toValue: step / (TOTAL_STEPS - 1),
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const renderProgressBar = () => {
    const progressBarColors = [
      "#8a70ff", // Purple
      "#3b82f6", // Blue
    ]

    const interpolatedColor = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: progressBarColors,
    })

    return (
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: interpolatedColor,
            },
          ]}
        />
      </View>
    )
  }

  // Pass setSkipAuth to the child components
  // Update the ScrollView content to pass setSkipAuth to the child components
  return (
    <SafeAreaView style={styles.container}>
      {renderProgressBar()}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        <WelcomeStep width={screenDimensions.width} onNext={handleNext} setSkipAuth={setSkipAuth} />
        <KeyFeaturesStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          setSkipAuth={setSkipAuth}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "#e5e7eb",
  },
  progressBar: {
    height: "100%",
  },
})

export default OnboardingScreen

