import { StyleSheet } from "react-native"
import type { Theme } from "@/styles/theme"

// Merge multiple style objects
export function mergeStyles(...styles: any[]) {
  return StyleSheet.flatten(styles.filter(Boolean))
}

// Helper to create themed styles
export function createThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  theme: Theme,
  stylesFn: (theme: Theme) => T,
): T {
  return StyleSheet.create(stylesFn(theme))
}

// Convert px to rem-like values (for consistent sizing)
export function rem(size: number): number {
  return (size * 16) / 10 // Approximate rem conversion
}

// Helper for responsive sizing
export function responsive(size: number, factor = 1): number {
  // You could add more complex responsive logic here
  return size * factor
}

