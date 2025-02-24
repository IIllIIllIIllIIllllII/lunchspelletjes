"use client"

import MemoryGame from "@/components/memory-game"
import { ThemeProvider } from "@/components/theme-provider"

export default function MemoryPage() {
  return (
    <ThemeProvider>
      <MemoryGame instructions="Klik op een kaart en zoek de andere met hetzelfde symbool!" />
    </ThemeProvider>
  )
}

