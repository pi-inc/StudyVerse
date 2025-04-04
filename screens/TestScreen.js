import { Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import Header from "../components/shared/Header"
import FirestoreTest from "../components/test/FirestoreTest"
import GraphQLTest from "../components/test/GraphQLTest"
import GeminiTest from "../components/test/GeminiTest"

const TestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Integration Tests" showBack={true} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.pageTitle}>Integration Tests</Text>
        <Text style={styles.description}>Use these tools to test the various integrations in your app.</Text>

        <FirestoreTest />
        <GraphQLTest />
        <GeminiTest />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 24,
  },
})

export default TestScreen

