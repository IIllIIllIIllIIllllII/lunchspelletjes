"use client"

import SnakeGame from "@/components/snake-game"
import { ThemeProvider } from "@/components/theme-provider"

export default function SnakePage() {
  return (
    <ThemeProvider>
      <SnakeGame />
    </ThemeProvider>
  )
}

