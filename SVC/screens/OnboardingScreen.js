"use client"

import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, SafeAreaView, Animated, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import WelcomeStep from "../components/onboarding/WelcomeStep"
import KeyFeaturesStep from "../components/onboarding/KeyFeaturesStep"
import SignInStep from "../components/onboarding/SignInStep"
import SignUpStep from "../components/onboarding/SignUpStep"
import StudyGoalsStep from "../components/onboarding/StudyGoalsStep"
import LearningStyleStep from "../components/onboarding/LearningStyleStep"
import StudyTimeStep from "../components/onboarding/StudyTimeStep"
import SubjectInterestsStep from "../components/onboarding/SubjectInterestsStep"

// Add this import at the top of the file
import { auth } from "../services/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { createUserProfile } from "../services/user" // Import createUserProfile

const { width, height } = Dimensions.get("window")
const TOTAL_STEPS = 8 // Adjusted to match actual number of steps

const OnboardingScreen = () => {
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
      // Complete onboarding
      completeOnboarding()
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

  const completeOnboarding = async () => {
    try {
      // If user is already authenticated (from SignInStep or SignUpStep)
      if (userData.uid) {
        // Save additional user profile data to Firestore
        await createUserProfile({
          displayName: userData.name,
          studyGoal: userData.studyGoal,
          learningStyle: userData.learningStyle,
          studyTimeMinutes: userData.studyTimeMinutes,
          subjects: userData.subjects,
        })
      }

      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      })
    } catch (error) {
      console.error("Error completing onboarding:", error)
      // Handle error (could show an alert or error message)
    }
  }

  const updateProgressBar = (step) => {
    Animated.timing(progressAnim, {
      toValue: step / (TOTAL_STEPS - 1),
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  // Add this function inside the OnboardingScreen component
  const testFirebaseAuth = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Firebase Auth Success:", userCredential.user)
      return userCredential.user
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message)
      throw error
    }
  }

  const renderProgressBar = () => {
    const progressBarColors = [
      "#8a70ff", // Purple
      "#3b82f6", // Blue
      "#10b981", // Green
      "#8a70ff", // Purple
      "#ec4899", // Pink
      "#f59e0b", // Orange
      "#10b981", // Green
    ]

    const interpolatedColor = progressAnim.interpolate({
      inputRange: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
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
        <WelcomeStep width={screenDimensions.width} onNext={handleNext} />
        <KeyFeaturesStep width={screenDimensions.width} onNext={handleNext} onBack={handleBack} />
        <SignInStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />
        <SignUpStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />
        <StudyGoalsStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />
        <LearningStyleStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />
        <StudyTimeStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />
        <SubjectInterestsStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
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

