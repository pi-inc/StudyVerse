// Theme configuration

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

// Font sizes
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
}

// Typography
export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    bold: "System",
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
}

// Base colors (shared between themes)
export const colors = {
  primary: "#6366f1", // Indigo
  primaryLight: "#a5b4fc",
  primaryDark: "#4338ca",
  secondary: "#ec4899", // Pink
  secondaryLight: "#f9a8d4",
  secondaryDark: "#be185d",
  success: "#10b981", // Emerald
  warning: "#f59e0b", // Amber
  danger: "#ef4444", // Red
  info: "#3b82f6", // Blue
  border: {
    light: "#E1E1E1",
    dark: "#2C2C2C",
    primary: "#007AFF",
    secondary: "#8E8E93",
  },

  // Background colors
  background: {
    dark: "#0f172a", // Slate 900
    light: "#f8fafc", // Slate 50
    card: "#1e293b", // Slate 800
    accent: "#334155", // Slate 700
  },

  // Text colors
  text: {
    primary: "#f8fafc", // Slate 50
    secondary: "#94a3b8", // Slate 400
    tertiary: "#64748b", // Slate 500
    primaryDark: "#0f172a", // Slate 900
    secondaryDark: "#334155", // Slate 700
  },
}

// Light theme
export const lightTheme = {
  colors: {
    ...colors,
    background: {
      primary: "#f8fafc", // Slate 50
      secondary: "#f1f5f9", // Slate 100
      card: "#ffffff",
      accent: "#e2e8f0", // Slate 200
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#334155", // Slate 700
      tertiary: "#64748b", // Slate 500
    },
  },
  spacing,
  fontSizes,
  typography,
}

// Dark theme
export const darkTheme = {
  colors: {
    ...colors,
    background: {
      primary: "#0f172a", // Slate 900
      secondary: "#1e293b", // Slate 800
      card: "#1e293b", // Slate 800
      accent: "#334155", // Slate 700
    },
    text: {
      primary: "#f8fafc", // Slate 50
      secondary: "#94a3b8", // Slate 400
      tertiary: "#64748b", // Slate 500
    },
  },
  spacing,
  fontSizes,
  typography,
}

