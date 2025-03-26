"use client"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../context/ThemeContext"
import Header from "../components/layout/Header"
import PageTransition from "../components/navigation/PageTransition"

const AboutScreen = () => {
  const { theme } = useTheme()

  return (
    <PageTransition>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="About StudyVerse" showBackButton />
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.foreground }]}>StudyVerse v1.0.0</Text>
          <Text style={[styles.text, { color: theme.mutedForeground }]}>
            A comprehensive learning platform designed to help students organize their studies, revise effectively, and
            connect with peers.
          </Text>
        </View>
      </SafeAreaView>
    </PageTransition>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
})

export default AboutScreen

