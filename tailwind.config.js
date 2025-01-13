/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5BBE6C", // Primary color for main actions and highlights
        secondary: "#E3F0E9", // Secondary color for backgrounds and secondary elements
        accent: "#FD7127", // Accent color for important highlights and accents
        dark: "#1f2937", // Dark color for text, navbar, and footer backgrounds
        light: "#ECEAEA", // Light color for backgrounds and light elements
        neutral: "#7A7A7A", // Neutral color for secondary text and icons
        success: "#22c55e", // Success color for success messages and indicators
        warning: "#f59e0b", // Warning color for warning messages and indicators
        danger: "#ef4444", // Danger color for error messages and indicators
        info: "#3b82f6", // Info color for information messages and indicators
      },
      whiteSpace: {
        "pre-line": "pre-line",
      },
    },
  },
  plugins: [],
};
