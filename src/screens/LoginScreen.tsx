"use client"

import { useState } from "react"
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"

import { Button, Input, Card } from "../components/ui"
import { useToast } from "../context/ToastContext"

export const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const navigation = useNavigation()
  const { showToast } = useToast()

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validate()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      showToast("Login successful!", "success")
      // Navigate to home screen
    }, 1500)
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50 dark:bg-gray-900`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow justify-center p-4`}>
          <View style={tw`max-w-md w-full mx-auto`}>
            <View style={tw`mb-8 items-center`}>
              <Text style={tw`text-3xl font-bold text-gray-900 dark:text-white mb-2`}>StudyVerse</Text>
              <Text style={tw`text-gray-600 dark:text-gray-400 text-center`}>Sign in to your account to continue</Text>
            </View>

            <Card style={tw`mb-4`}>
              <Input
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                error={errors.password}
              />

              <Button title="Sign In" loading={loading} fullWidth onPress={handleLogin} style={tw`mt-4`} />
            </Card>

            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-gray-600 dark:text-gray-400`}>Don't have an account? </Text>
              <Text onPress={() => navigation.navigate("Signup" as never)} style={tw`text-blue-600 font-medium`}>
                Sign up
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

