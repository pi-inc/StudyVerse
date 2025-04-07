"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { View, StyleSheet, SafeAreaView, Animated, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Import all step components
import WelcomeStep from "../components/onboarding/WelcomeStep"
import KeyFeaturesStep from "../components/onboarding/KeyFeaturesStep"
import SignInStep from "../components/onboarding/SignInStep"
import SignUpStep from "../components/onboarding/SignUpStep"
import StudyGoalsStep from "../components/onboarding/StudyGoalsStep"
import LearningStyleStep from "../components/onboarding/LearningStyleStep"
import StudyTimeStep from "../components/onboarding/StudyTimeStep"
import SubjectInterestsStep from "../components/onboarding/SubjectInterestsStep"

// Get screen dimensions
const { width, height } = Dimensions.get("window")
const TOTAL_STEPS = 8 // Updated to 8 steps for the full onboarding process

// Update the component signature to accept setSkipAuth
const OnboardingScreen = ({ setSkipAuth, isAuthenticated, setIsAuthenticated }) => {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const scrollViewRef = useRef(null)
  const progressAnim = useRef(new Animated.Value(0)).current

  // Add state to track screen dimensions for responsiveness
  const [screenDimensions, setScreenDimensions] = useState({ width, height })

  // Add state to track if we're showing SignIn or SignUp at step 3
  const [showSignUp, setShowSignUp] = useState(false)

  // User data state with safe default values
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    studyGoal: "",
    learningStyle: "",
    studyTimeMinutes: 30,
    subjects: [],
    uid: null,
    emailVerified: false,
  })

  // Retrieve persisted step on mount or reset if not authenticated
  useEffect(() => {
    const loadPersistedStep = async () => {
      try {
        if (isAuthenticated) {
          const step = await AsyncStorage.getItem("onboardingStep")
          if (step !== null && Number.parseInt(step) > 0) {
            const parsedStep = Number.parseInt(step)
            setCurrentStep(parsedStep)
            // Also scroll to the correct step
            if (scrollViewRef.current) {
              setTimeout(() => {
                scrollViewRef.current.scrollTo({
                  x: parsedStep * screenDimensions.width,
                  animated: false,
                })
              }, 100)
            }
          }
        } else {
          // If not authenticated, reset to the beginning
          setCurrentStep(0)
          // Reset scroll position
          if (scrollViewRef.current) {
            setTimeout(() => {
              scrollViewRef.current.scrollTo({
                x: 0,
                animated: false,
              })
            }, 100)
          }
          // Clear the stored step
          await AsyncStorage.removeItem("onboardingStep")
        }
      } catch (error) {
        console.error("Error handling persisted step:", error)
        // Fallback to step 0 on error
        setCurrentStep(0)
      }
    }

    loadPersistedStep()
  }, [isAuthenticated, screenDimensions.width])

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

  // Add near the top of the component, after other useEffects
  useEffect(() => {
    // Persist current step to prevent reset on re-renders
    if (currentStep > 0) {
      try {
        // Use AsyncStorage for React Native
        AsyncStorage.setItem("onboardingStep", currentStep.toString())
      } catch (error) {
        console.error("Error saving step:", error)
      }
    }
  }, [currentStep])

  const updateUserData = (data) => {
    setUserData((prevData) => ({ ...prevData, ...data }))
  }

  const handleNext = useCallback(() => {
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)

    // Scroll to the next step
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: nextStep * width,
        animated: true,
      })
    }

    // If this is the last step, set skipAuth to true
    if (nextStep >= TOTAL_STEPS - 1) {
      setSkipAuth(true)
    }
  }, [currentStep, width, setSkipAuth])

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

  // Toggle between SignIn and SignUp at step 3
  const toggleSignInSignUp = () => {
    setShowSignUp(!showSignUp)
  }

  // Pass setSkipAuth to the child components
  // Update the ScrollView content to include all 8 steps
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
        {/* Step 1 */}
        <WelcomeStep width={screenDimensions.width} onNext={handleNext} setSkipAuth={setSkipAuth} />

        {/* Step 2 */}
        <KeyFeaturesStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          setSkipAuth={setSkipAuth}
        />

        {/* Step 3 - Authentication (SignIn or SignUp) */}
        {!showSignUp ? (
          <SignInStep
            width={screenDimensions.width}
            onNext={handleNext}
            onBack={handleBack}
            userData={userData}
            updateUserData={updateUserData}
            goToSignUp={toggleSignInSignUp}
            goToForgotPassword={() => {
              // For now, just show sign up instead of forgot password
              toggleSignInSignUp()
            }}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        ) : (
          <SignUpStep
            width={screenDimensions.width}
            onNext={handleNext}
            onBack={handleBack}
            userData={userData}
            updateUserData={updateUserData}
            goToSignIn={toggleSignInSignUp}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        {/* Step 4 */}
        <StudyGoalsStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />

        {/* Step 5 */}
        <LearningStyleStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />

        {/* Step 6 */}
        <StudyTimeStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />

        {/* Step 7 */}
        <SubjectInterestsStep
          width={screenDimensions.width}
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
          updateUserData={updateUserData}
        />

        {/* Step 8 - Final step */}
        <View style={{ width: screenDimensions.width, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.finalStepContainer}>
            <StudyGoalsStep
              width={screenDimensions.width}
              onNext={handleNext}
              onBack={handleBack}
              userData={userData}
              updateUserData={updateUserData}
              isFinalStep={true}
            />
          </View>
        </View>
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
  finalStepContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
})

export default OnboardingScreen

