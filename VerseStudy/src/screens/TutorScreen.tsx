"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/layout/Header"
import TutorChat from "../components/tutor/TutorChat"

const TutorScreen = () => {
  const { theme } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="AI Tutor" showBackButton />
      <View style={styles.content}>
        <TutorChat />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

export default TutorScreen

