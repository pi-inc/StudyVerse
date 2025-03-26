"use client"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"

const SummaryView = () => {
  const { theme } = useTheme()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.summaryCard}>
        <Text style={[styles.title, { color: theme.foreground }]}>React Native Fundamentals</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>What is React Native?</Text>
          <Text style={[styles.sectionContent, { color: theme.mutedForeground }]}>
            React Native is a framework for building native mobile applications using JavaScript and React. It allows
            developers to use a single codebase for both iOS and Android platforms, while still achieving native
            performance and look-and-feel.
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Key Concepts</Text>
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <Text style={[styles.bulletText, { color: theme.mutedForeground }]}>
                <Text style={[styles.bulletHighlight, { color: theme.foreground }]}>Components:</Text> The building
                blocks of React Native apps. They can be either class components or functional components.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <Text style={[styles.bulletText, { color: theme.mutedForeground }]}>
                <Text style={[styles.bulletHighlight, { color: theme.foreground }]}>Props:</Text> Short for properties,
                they allow you to pass data from parent to child components.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <Text style={[styles.bulletText, { color: theme.mutedForeground }]}>
                <Text style={[styles.bulletHighlight, { color: theme.foreground }]}>State:</Text> Allows components to
                create and manage their own data. When state changes, the component re-renders.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <Text style={[styles.bulletText, { color: theme.mutedForeground }]}>
                <Text style={[styles.bulletHighlight, { color: theme.foreground }]}>Hooks:</Text> Functions that let you
                use state and other React features in functional components.
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Core Components</Text>
          <View style={styles.coreComponents}>
            <View style={styles.componentItem}>
              <Text style={[styles.componentName, { color: theme.foreground }]}>View</Text>
              <Text style={[styles.componentDescription, { color: theme.mutedForeground }]}>
                A container that supports layout with flexbox, style, touch handling, and accessibility controls.
              </Text>
            </View>

            <View style={styles.componentItem}>
              <Text style={[styles.componentName, { color: theme.foreground }]}>Text</Text>
              <Text style={[styles.componentDescription, { color: theme.mutedForeground }]}>
                A component for displaying text, which supports nesting, styling, and touch handling.
              </Text>
            </View>

            <View style={styles.componentItem}>
              <Text style={[styles.componentName, { color: theme.foreground }]}>Image</Text>
              <Text style={[styles.componentDescription, { color: theme.mutedForeground }]}>
                A component for displaying different types of images, including network images, static resources, and
                local images.
              </Text>
            </View>

            <View style={styles.componentItem}>
              <Text style={[styles.componentName, { color: theme.foreground }]}>ScrollView</Text>
              <Text style={[styles.componentDescription, { color: theme.mutedForeground }]}>
                A scrollable container that can host multiple components and views.
              </Text>
            </View>

            <View style={styles.componentItem}>
              <Text style={[styles.componentName, { color: theme.foreground }]}>TextInput</Text>
              <Text style={[styles.componentDescription, { color: theme.mutedForeground }]}>
                A component that allows the user to enter text.
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Styling in React Native</Text>
          <Text style={[styles.sectionContent, { color: theme.mutedForeground }]}>
            React Native uses JavaScript for styling. Styles are written as JavaScript objects, similar to CSS but using
            camelCase property names. The StyleSheet API is used to define multiple styles in one place.
          </Text>
          <Text style={[styles.sectionContent, { color: theme.mutedForeground, marginTop: 8 }]}>
            React Native uses Flexbox for layout, which works similarly to CSS Flexbox but with some differences. The
            default flex direction is column instead of row.
          </Text>
        </View>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  summaryCard: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
  },
  divider: {
    height: 1,
    marginVertical: 20,
  },
  bulletPoints: {
    gap: 12,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  bulletHighlight: {
    fontFamily: "Inter_600SemiBold",
  },
  coreComponents: {
    gap: 16,
  },
  componentItem: {
    marginBottom: 8,
  },
  componentName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  componentDescription: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
})

export default SummaryView

