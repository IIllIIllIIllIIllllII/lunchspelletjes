import type React from "react"
import { ThemeProvider, useTheme, themes } from "./theme-provider"
import Header from "./header"
import Footer from "./footer"

const ThemedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: currentTheme.background, color: currentTheme.text }}
    >
      <Header />
      <main className="flex-grow p-6">{children}</main>
      <Footer />
    </div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemedLayout>{children}</ThemedLayout>
    </ThemeProvider>
  )
}

