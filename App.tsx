import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import tw from "twrnc"
import { ThemeProvider } from "./src/context/ThemeContext"
import { ToastProvider } from "./src/context/ToastContext"
import AppNavigator from "./src/navigation"
import { useStore } from "./src/store"

export default function App() {
  const isDarkMode = useStore((state) => state.isDarkMode)

  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <NavigationContainer>
              <StatusBar style={isDarkMode ? "light" : "dark"} />
              <AppNavigator />
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

