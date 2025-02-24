"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Theme = "light"

interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const themes = {
  light: {
    background: "bg-gradient-to-br from-green-50 to-emerald-50",
    cardBackground: "bg-white",
    primary: "#2c4a52",
    secondary: "#537072",
    accent: "#f9c784",
    text: "#2c4a52",
    buttonText: "#ffffff",
    border: "border-gray-200",
  },
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<Theme>("light")

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

