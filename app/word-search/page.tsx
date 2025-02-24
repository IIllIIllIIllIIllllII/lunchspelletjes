"use client"

import WordSearchGame from "@/components/word-search-game"
import { ThemeProvider } from "@/components/theme-provider"

export default function WordSearchPage() {
  return (
    <ThemeProvider>
      <WordSearchGame instructions="Klik om letters te selecteren die woorden vormen. Woorden kunnen horizontaal, verticaal of diagonaal zijn." />
    </ThemeProvider>
  )
}

