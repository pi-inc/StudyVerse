// Theme configuration for React Native
// Adapted from the web CSS variables

export const lightTheme = {
  background: "#ffffff", // oklch(1 0 0)
  foreground: "#252525", // oklch(0.145 0 0)
  card: "#ffffff", // oklch(1 0 0)
  cardForeground: "#252525", // oklch(0.145 0 0)
  popover: "#ffffff", // oklch(1 0 0)
  popoverForeground: "#252525", // oklch(0.145 0 0)
  primary: "#353535", // oklch(0.205 0 0)
  primaryForeground: "#fbfbfb", // oklch(0.985 0 0)
  secondary: "#f7f7f7", // oklch(0.97 0 0)
  secondaryForeground: "#353535", // oklch(0.205 0 0)
  muted: "#f7f7f7", // oklch(0.97 0 0)
  mutedForeground: "#8e8e8e", // oklch(0.556 0 0)
  accent: "#f7f7f7", // oklch(0.97 0 0)
  accentForeground: "#353535", // oklch(0.205 0 0)
  destructive: "#e53935", // oklch(0.577 0.245 27.325)
  destructiveForeground: "#e53935", // oklch(0.577 0.245 27.325)
  border: "#ebebeb", // oklch(0.922 0 0)
  input: "#ebebeb", // oklch(0.922 0 0)
  ring: "#b4b4b4", // oklch(0.708 0 0)
  chart1: "#4f86c6", // oklch(0.646 0.222 41.116)
  chart2: "#5fb0d6", // oklch(0.6 0.118 184.704)
  chart3: "#3a5b9f", // oklch(0.398 0.07 227.392)
  chart4: "#e3a03e", // oklch(0.828 0.189 84.429)
  chart5: "#d97c3b", // oklch(0.769 0.188 70.08)
  radius: 10, // 0.625rem
  sidebar: "#fbfbfb", // oklch(0.985 0 0)
  sidebarForeground: "#252525", // oklch(0.145 0 0)
  sidebarPrimary: "#353535", // oklch(0.205 0 0)
  sidebarPrimaryForeground: "#fbfbfb", // oklch(0.985 0 0)
  sidebarAccent: "#f7f7f7", // oklch(0.97 0 0)
  sidebarAccentForeground: "#353535", // oklch(0.205 0 0)
  sidebarBorder: "#ebebeb", // oklch(0.922 0 0)
  sidebarRing: "#b4b4b4", // oklch(0.708 0 0)
}

export const darkTheme = {
  background: "#252525", // oklch(0.145 0 0)
  foreground: "#fbfbfb", // oklch(0.985 0 0)
  card: "#252525", // oklch(0.145 0 0)
  cardForeground: "#fbfbfb", // oklch(0.985 0 0)
  popover: "#252525", // oklch(0.145 0 0)
  popoverForeground: "#fbfbfb", // oklch(0.985 0 0)
  primary: "#fbfbfb", // oklch(0.985 0 0)
  primaryForeground: "#353535", // oklch(0.205 0 0)
  secondary: "#444444", // oklch(0.269 0 0)
  secondaryForeground: "#fbfbfb", // oklch(0.985 0 0)
  muted: "#444444", // oklch(0.269 0 0)
  mutedForeground: "#b4b4b4", // oklch(0.708 0 0)
  accent: "#444444", // oklch(0.269 0 0)
  accentForeground: "#fbfbfb", // oklch(0.985 0 0)
  destructive: "#9e2a27", // oklch(0.396 0.141 25.723)
  destructiveForeground: "#e74c3c", // oklch(0.637 0.237 25.331)
  border: "#444444", // oklch(0.269 0 0)
  input: "#444444", // oklch(0.269 0 0)
  ring: "#707070", // oklch(0.439 0 0)
  chart1: "#7c4dff", // oklch(0.488 0.243 264.376)
  chart2: "#4fc3f7", // oklch(0.696 0.17 162.48)
  chart3: "#d97c3b", // oklch(0.769 0.188 70.08)
  chart4: "#ba68c8", // oklch(0.627 0.265 303.9)
  chart5: "#ff7043", // oklch(0.645 0.246 16.439)
  radius: 10, // 0.625rem
  sidebar: "#353535", // oklch(0.205 0 0)
  sidebarForeground: "#fbfbfb", // oklch(0.985 0 0)
  sidebarPrimary: "#7c4dff", // oklch(0.488 0.243 264.376)
  sidebarPrimaryForeground: "#fbfbfb", // oklch(0.985 0 0)
  sidebarAccent: "#444444", // oklch(0.269 0 0)
  sidebarAccentForeground: "#fbfbfb", // oklch(0.985 0 0)
  sidebarBorder: "#444444", // oklch(0.269 0 0)
  sidebarRing: "#707070", // oklch(0.439 0 0)
}

// Type definition for the theme
export type Theme = typeof lightTheme

// Helper function to get theme value with proper typing
export const getThemeValue = (theme: Theme, key: keyof Theme) => theme[key]

