import { StyleSheet } from "react-native"

// Merge multiple style objects
export function mergeStyles(...styles: any[]) {
  return StyleSheet.flatten(styles.filter(Boolean))
}

// Convert px to rem-like values (for consistent sizing)
export function rem(size: number): number {
  return (size * 16) / 10 // Approximate rem conversion
}

// Placeholder for cn function - replace with actual implementation if needed
export function cn(...inputs: any[]): string {
  return inputs.filter(Boolean).join(" ")
}

