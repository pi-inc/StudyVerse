"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Dimensions, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Add these imports at the top of the file
import { auth } from "../../services/firebase"
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithCredential 
} from "firebase/auth"

const { height } = Dimensions.get("window")

const SignInStep = ({ width, onNext, onBack, userData, updateUserData, goToSignUp, goToForgotPassword }) => {
  // Add these state variables at the top of the component
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError("Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    } else {
      setEmailError("")
      return true
    }
  }

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    } else {
      setPasswordError("")
      return true
    }
  }

  useEffect(() => {
    // Validate form whenever userData changes
    const isEmailValid = validateEmail(userData.email)
    const isPasswordValid = validatePassword(userData.password)
    setIsFormValid(isEmailValid && isPasswordValid)
  }, [userData.email, userData.password])

  const handleEmailChange = (text) => {
    updateUserData({ email: text })
  }

  const handlePasswordChange = (text) => {
    updateUserData({ password: text })
  }

  const toggleRememberMe = () => {
    updateUserData({ rememberMe: !userData.rememberMe })
  }

  // Replace the handleSignIn function with this implementation
  const handleSignIn = async () => {
    if (!isFormValid) return

    try {
      // Show loading state
      setIsLoading(true)
      setAuthError(null)

      // Attempt to sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)

      // Success - update user data with Firebase user info
      updateUserData({
        uid: userCredential.user.uid,
        emailVerified: userCredential.user.emailVerified,
      })

      // Set authenticated state
      setIsAuthenticated(true)

      // Proceed to next step
      onNext()
    } catch (error) {
      // Handle specific Firebase auth errors
      let errorMessage = "Sign in failed. Please try again."

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address format."
          setEmailError(errorMessage)
          break
        case "auth/user-disabled":
          errorMessage = "This account has been disabled."
          break
        case "auth/user-not-found":
          errorMessage = "No account found with this email."
          setEmailError(errorMessage)
          break
        case "auth/wrong-password":
          errorMessage = "Incorrect password."
          setPasswordError(errorMessage)
          break
        default:
          console.error("Firebase auth error:", error)
      }

      // Show error message
      setAuthError(errorMessage)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setAuthError(null)

      // Note: In a real app, you would use Expo's Google authentication
      // For this example, we'll just show a placeholder
      alert("Google Sign-In would be implemented here using Expo Google Auth")
      
      // Simulating a successful Google sign-in
      // In a real implementation, you would get a credential from Google
      // and use it to sign in with Firebase
      
      // const credential = GoogleAuthProvider.credential(idToken);
      // const userCredential = await signInWithCredential(auth, credential);
      
      // For now, we'll just set authenticated to true for demonstration
      setIsAuthenticated(true)
      
      // Update user data
      updateUserData({
        uid: "google-user-id", // This would come from the actual Google sign-in
        emailVerified: true,
      })
      
      // Proceed to next step
      onNext()
    } catch (error) {
      console.error("Google sign-in error:", error)
      setAuthError("Google sign-in failed. Please try again.")
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Only allow proceeding if authenticated
  const handleNext = () => {
    if (isAuthenticated) {
      onNext()
    } else {
      setAuthError("Please sign in to continue")
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#10b981" }]}>
            <Ionicons name="log-in" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Access your personalized learning experience</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="your@email.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={userData.email}
                onChangeText={handleEmailChange}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity onPress={goToForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.passwordInputContainer, passwordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={userData.password}
                  onChangeText={handlePasswordChange}
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <View style={styles.rememberMeContainer}>
              <Switch
                value={userData.rememberMe}
                onValueChange={toggleRememberMe}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor="#fff"
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>

            <TouchableOpacity
              style={[styles.signInButton, { backgroundColor: "#10b981" }, (!isFormValid || isLoading) && styles.disabledButton]}
              onPress={handleSignIn}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.signInButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.disabledButton]}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={20} color="#fff" style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={goToSignUp}>
                <Text style={[styles.signUpLink, { color: "#10b981" }]}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
          {authError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>{authError}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>3 of 8</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: "#10b981" }, (!isAuthenticated || isLoading) && styles.disabledButton]}
            onPress={handleNext}
            disabled={!isAuthenticated || isLoading}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 120, // Increased padding at bottom for error messages
  },
  content: {
    alignItems: "center",
    minHeight: height * 0.7, // Ensure content takes up at least 70% of screen height
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 32,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
  passwordLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  passwordVisibilityButton: {
    paddingHorizontal: 16,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberMeText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 8,
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6b7280",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    color: "#6b7280",
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  stepIndicator: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    width: "100%",
  },
})

export default SignInStep
