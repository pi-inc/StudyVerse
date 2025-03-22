"use client"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card"
import { rem } from "@/lib/utils"

export default function ThemeShowcaseScreen() {
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.foreground }]}>Theme Showcase</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>
            Current Theme: {isDark ? "Dark" : "Light"}
          </Text>
          <Button onPress={toggleTheme}>Toggle Theme</Button>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Button Variants</Text>
          <View style={styles.row}>
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
          </View>
          <View style={styles.row}>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
          </View>
          <View style={styles.row}>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Button Sizes</Text>
          <View style={styles.row}>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Cards</Text>

          <Card style={styles.card}>
            <CardHeader title="Default Card" description="This is a default card component" />
            <CardContent>
              <Text style={{ color: theme.cardForeground }}>
                Card content goes here. This is a basic card with header, content, and footer.
              </Text>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Submit</Button>
            </CardFooter>
          </Card>

          <Card variant="outline" style={styles.card}>
            <CardHeader title="Outline Card" description="This is an outline card variant" />
            <CardContent>
              <Text style={{ color: theme.cardForeground }}>
                This card has an outline variant which shows a border instead of a shadow.
              </Text>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Submit</Button>
            </CardFooter>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Theme Colors</Text>

          <View style={styles.colorGrid}>
            {Object.entries(theme).map(([key, value]) => {
              if (typeof value === "string" && value.startsWith("#")) {
                return (
                  <View key={key} style={styles.colorItem}>
                    <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                    <Text style={[styles.colorName, { color: theme.foreground }]}>{key}</Text>
                    <Text style={[styles.colorValue, { color: theme.mutedForeground }]}>{value}</Text>
                  </View>
                )
              }
              return null
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: rem(1),
    gap: rem(2),
  },
  title: {
    fontSize: rem(1.5),
    fontWeight: "bold",
    marginBottom: rem(1),
  },
  section: {
    marginBottom: rem(2),
    gap: rem(1),
  },
  sectionTitle: {
    fontSize: rem(1.25),
    fontWeight: "600",
    marginBottom: rem(0.5),
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rem(0.5),
    marginBottom: rem(0.5),
  },
  card: {
    marginBottom: rem(1),
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rem(1),
  },
  colorItem: {
    width: rem(7),
    marginBottom: rem(1),
  },
  colorSwatch: {
    width: rem(7),
    height: rem(7),
    borderRadius: rem(0.5),
    marginBottom: rem(0.25),
  },
  colorName: {
    fontSize: rem(0.75),
    fontWeight: "500",
  },
  colorValue: {
    fontSize: rem(0.625),
  },
})

