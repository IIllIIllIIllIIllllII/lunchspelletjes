"use client"

import PairOfFoursGame from "@/components/pair-of-fours-game"
import { ThemeProvider } from "@/components/theme-provider"

export default function PairOfFoursPage() {
  return (
    <ThemeProvider>
      <PairOfFoursGame instructions="Vind de 4 kaarten die bij dezelfde categorie horen" />
    </ThemeProvider>
  )
}

