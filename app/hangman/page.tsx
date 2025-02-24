"use client"

import HangmanGame from "@/components/hangman-game"
import { ThemeProvider } from "@/components/theme-provider"

export default function HangmanPage() {
  return (
    <ThemeProvider>
      <HangmanGame />
    </ThemeProvider>
  )
}

