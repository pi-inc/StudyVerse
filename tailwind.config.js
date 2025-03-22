/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#8B5CF6", // study-purple
        secondary: "#F4F4F5",
        accent: "#3B82F6", // study-blue
        success: "#22C55E", // study-green
        warning: "#EAB308", // study-yellow
        danger: "#EF4444", // study-red
        info: "#14B8A6", // study-teal
        "study-purple": "#8B5CF6",
        "study-blue": "#3B82F6",
        "study-teal": "#14B8A6",
        "study-green": "#22C55E",
        "study-yellow": "#EAB308",
        "study-orange": "#F97316",
        "study-red": "#EF4444",
        "study-pink": "#EC4899",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter-Regular"],
        medium: ["Inter-Medium"],
        semibold: ["Inter-SemiBold"],
        bold: ["Inter-Bold"],
      },
    },
  },
  plugins: [],
}

