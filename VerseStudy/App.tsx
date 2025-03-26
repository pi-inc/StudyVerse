"use client"

import { useCallback, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter"
import { ThemeProvider } from "./src/context/ThemeContext"
import { OnboardingProvider } from "./src/context/OnboardingContext"
import AppNavigator from "./src/navigation/AppNavigator"
import SplashScreenComponent from "./src/screens/SplashScreen"
import OfflineIndicator from "./src/components/ui/OfflineIndicator"
import ImprovedOnboarding from "./src/components/improved-onboarding/ImprovedOnboarding"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "react-native"
import * as Linking from "expo-linking"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
        })

        // Artificially delay for a smoother splash screen experience
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return <SplashScreenComponent />
  }

  // Configure linking
  const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
      screens: {
        Home: "home",
        Courses: "courses",
        CourseDetail: {
          path: "course/:id",
          parse: {
            id: (id: string) => id,
          },
        },
        Revise: "revise",
        Plan: "plan",
        Social: "social",
        Settings: "settings",
        Login: "login",
        Signup: "signup",
        Onboarding: "onboarding",
      },
    },
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaProvider>
          <ThemeProvider>
            <OnboardingProvider>
              <NavigationContainer linking={linking}>
                <StatusBar style="auto" />
                <OfflineIndicator />
                <ImprovedOnboarding />
                <AppNavigator />
              </NavigationContainer>
            </OnboardingProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </View>
    </GestureHandlerRootView>
  )
}

