"use client"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../context/ThemeContext"
import Header from "../components/layout/Header"
import PageTransition from "../components/navigation/PageTransition"

const HelpScreen = () => {
  const { theme } = useTheme()

  return (
    <PageTransition>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Help & Support" showBackButton />
        <View style={styles.content}>
          <Text style={[styles.text, { color: theme.foreground }]}>Help and support content will go here</Text>
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
  text: {
    fontSize: 16,
    textAlign: "center",
  },
})

export default HelpScreen

