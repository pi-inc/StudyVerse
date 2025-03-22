"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"
import { useTheme } from "../context/ThemeContext"
import { useToast } from "../context/ToastContext"
import { Input, Button } from "../components/AntDesign"

const SignupScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const { showToast } = useToast()
  const isDark = theme === "dark"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validate = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (!name) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSignup = () => {
    if (validate()) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        showToast("Account created successfully!", "success")
        // Navigate to login
        navigation.navigate("Login")
      }, 1500)
    }
  }

  return (
    <SafeAreaView style={tw`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`p-6`}>
          <View style={tw`items-center mb-8`}>
            <Text style={tw`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Create Account</Text>
            <Text style={tw`text-lg mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Join StudyVerse today</Text>
          </View>

          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            error={errors.name}
            clear
            onClear={() => setName("")}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            clear
            onClear={() => setEmail("")}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
            clear
            onClear={() => setPassword("")}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
            clear
            onClear={() => setConfirmPassword("")}
          />

          <Button type="primary" loading={loading} style={tw`mt-6`} onPress={handleSignup}>
            Create Account
          </Button>

          <View style={tw`flex-row justify-center mt-6`}>
            <Text style={tw`${isDark ? "text-gray-300" : "text-gray-600"}`}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={tw`text-blue-500 font-medium`}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignupScreen

