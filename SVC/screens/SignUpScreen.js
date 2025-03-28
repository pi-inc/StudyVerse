"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { auth } from "../services/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { createUserProfile } from "../services/user"

const SignUpScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Field validation errors
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const validateName = (name) => {
    if (!name.trim()) {
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

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password")
      return false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match")
      return false
    } else {
      setConfirmPasswordError("")
      return true
    }
  }

  const handleSignUp = async () => {
    const isNameValid = validateName(name)
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      // Create user profile in Firestore
      await createUserProfile({
        displayName: name,
        email: email,
      })

      console.log("User account created:", userCredential.user.uid)
      // Navigation will be handled by the auth state listener in App.js
    } catch (error) {
      console.error("Sign up error:", error)

      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("Email is already in use")
          break
        case "auth/invalid-email":
          setEmailError("Invalid email address format")
          break
        case "auth/weak-password":
          setPasswordError("Password is too weak")
          break
        default:
          setError("Failed to create account. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    navigation.navigate("SignIn")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#a78bfa" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join StudyVerse and start your learning journey</Text>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={[styles.input, nameError ? styles.inputError : null]}
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                onBlur={() => validateName(name)}
              />
              {nameError ? <Text style={styles.fieldErrorText}>{nameError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="your@email.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={() => validateEmail(email)}
              />
              {emailError ? <Text style={styles.fieldErrorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.passwordInputContainer, passwordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() => validatePassword(password)}
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.fieldErrorText}>{passwordError}</Text> : null}
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
                  onChangeText={setConfirmPassword}
                  onBlur={() => validateConfirmPassword(confirmPassword)}
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? <Text style={styles.fieldErrorText}>{confirmPasswordError}</Text> : null}
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, isLoading && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 24,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
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
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2d2d44",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  fieldErrorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2d2d44",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
  },
  passwordVisibilityButton: {
    paddingHorizontal: 16,
  },
  signUpButton: {
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.7,
  },
  signUpButtonText: {
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
    color: "#9ca3af",
  },
  signInLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a78bfa",
  },
})

export default SignUpScreen

