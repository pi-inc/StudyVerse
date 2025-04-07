"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { auth } from "../../services/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { createUserProfile } from "../../services/user"

const { height } = Dimensions.get("window")

// Update the component signature to accept auth state props
const SignUpStep = ({
  width,
  onNext,
  onBack,
  userData = { name: "", email: "", password: "" },
  updateUserData = () => {},
  goToSignIn,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  // Remove local isAuthenticated state since we're using the prop

  // Ensure safe default values for userData
  const [localUserData, setLocalUserData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    password: userData?.password || "",
  })

  // Initialize local state with userData values when component mounts or userData changes
  useEffect(() => {
    setLocalUserData({
      name: userData?.name || "",
      email: userData?.email || "",
      password: userData?.password || "",
    })
  }, [userData])

  const validateName = (name) => {
    if (!name) {
      setNameError("Name is required")
      return false
    } else {
      setNameError("")
      return true
    }
  }

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

  const validateConfirmPassword = (confirmPwd) => {
    if (!confirmPwd) {
      setConfirmPasswordError("Please confirm your password")
      return false
    } else if (confirmPwd !== localUserData.password) {
      setConfirmPasswordError("Passwords do not match")
      return false
    } else {
      setConfirmPasswordError("")
      return true
    }
  }

  useEffect(() => {
    // Validate form whenever userData changes
    const isNameValid = validateName(localUserData.name)
    const isEmailValid = validateEmail(localUserData.email)
    const isPasswordValid = validatePassword(localUserData.password)
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)
    setIsFormValid(isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid)
  }, [localUserData, confirmPassword])

  const handleNameChange = (text) => {
    setLocalUserData((prev) => ({ ...prev, name: text }))
    if (updateUserData) {
      updateUserData({ ...userData, name: text })
    }
  }

  const handleEmailChange = (text) => {
    setLocalUserData((prev) => ({ ...prev, email: text }))
    if (updateUserData) {
      updateUserData({ ...userData, email: text })
    }
  }

  const handlePasswordChange = (text) => {
    setLocalUserData((prev) => ({ ...prev, password: text }))
    if (updateUserData) {
      updateUserData({ ...userData, password: text })
    }
  }

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text)
  }

  const handleSignUp = async () => {
    if (!isFormValid) return

    try {
      // Show loading state
      setIsLoading(true)
      setAuthError(null)

      // Ensure values are strings
      const email = String(localUserData.email || "")
      const password = String(localUserData.password || "")
      const name = String(localUserData.name || "")

      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("Sign-up successful, user:", userCredential.user.uid)

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      // Create user profile in Firestore
      await createUserProfile({
        displayName: name,
        email: email,
      })

      // Update user data with Firebase user info
      if (updateUserData) {
        updateUserData({
          ...localUserData,
          uid: userCredential.user.uid,
          emailVerified: userCredential.user.emailVerified,
        })
      }

      // Set authenticated state using the prop
      setIsAuthenticated(true)

      // REMOVE THIS LINE - don't call onNext() directly
      // onNext()
    } catch (error) {
      console.error("Sign up error:", error)

      // Handle specific Firebase auth errors
      let errorMessage = "Sign up failed. Please try again."

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use."
          setEmailError(errorMessage)
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address format."
          setEmailError(errorMessage)
          break
        case "auth/weak-password":
          errorMessage = "Password is too weak."
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

  // Update the handleGoogleSignUp function to use the prop's setIsAuthenticated
  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true)
      setAuthError(null)

      // Note: In a real app, you would use Expo's Google authentication
      // For this example, we'll just show a placeholder
      alert("Google Sign-Up would be implemented here using Expo Google Auth")

      // Simulating a successful Google sign-up
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
        name: "Google User", // This would come from Google profile
      })

      // Important: Call onNext directly to advance to the next step
      onNext()
    } catch (error) {
      console.error("Google sign-up error:", error)
      setAuthError("Google sign-up failed. Please try again.")
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Update the handleNext function to use the prop's isAuthenticated
  const handleNext = () => {
    if (isAuthenticated) {
      onNext()
    } else {
      setAuthError("Please create an account to continue")
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#ec4899" }]}>
            <Ionicons name="person-add" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join StudyVerse and start your learning journey</Text>

          {authError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>{authError}</Text>
            </View>
          )}

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={[styles.input, nameError ? styles.inputError : null]}
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                value={localUserData.name}
                onChangeText={handleNameChange}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="your@email.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={localUserData.email}
                onChangeText={handleEmailChange}
                onBlur={() => validateEmail(localUserData.email)}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.passwordInputContainer, passwordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={localUserData.password}
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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={[styles.passwordInputContainer, confirmPasswordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            </View>

            <TouchableOpacity
              style={[
                styles.signUpButton,
                { backgroundColor: "#ec4899" },
                (!isFormValid || isLoading) && styles.disabledButton,
              ]}
              onPress={handleSignUp}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.disabledButton]}
              onPress={handleGoogleSignUp}
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={20} color="#fff" style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={goToSignIn}>
                <Text style={[styles.signInLink, { color: "#ec4899" }]}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>3 of 8</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Update the Next button to use the prop's isAuthenticated */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: "#ec4899" },
              (!isAuthenticated || isLoading) && styles.disabledButton,
            ]}
            onPress={onNext}
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
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  errorText: {
    color: "#ef4444",
    marginLeft: 8,
    fontSize: 14,
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
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  signUpButtonText: {
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
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    color: "#6b7280",
  },
  signInLink: {
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
})

export default SignUpStep

