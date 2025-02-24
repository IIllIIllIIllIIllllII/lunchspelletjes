import GameLanding from "@/components/game-landing"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <GameLanding />
    </ThemeProvider>
  )
}

