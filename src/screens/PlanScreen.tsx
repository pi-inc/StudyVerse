"use client"
import { StyleSheet, View, Text, SafeAreaView } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { Button } from "../components/Button"

const PlanScreen = () => {
  const { theme } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.foreground }]}>Study Planner</Text>
        <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
          This screen would contain your study schedule, tasks, and planning tools.
        </Text>
        <Button title="Coming Soon" variant="gradient" style={styles.button} />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    width: 200,
  },
})

export default PlanScreen

