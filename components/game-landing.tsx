"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Brain, Search, Puzzle } from "lucide-react"
import { useTheme, themes } from "./theme-provider"
import Header from "./header"

const games = [
  {
    title: "Woordzoeker",
    description:
      "Zoek verborgen woorden in een raster van letters! Perfect voor het oefenen van woordherkenning en concentratie.",
    icon: Search,
    link: "/word-search",
    iconColor: "text-pink-500",
    iconBg: "bg-pink-100",
  },
  {
    title: "Memory",
    description:
      "Test je geheugen door paren van overeenkomende kaarten te vinden. Een klassiek spel dat je hersenen scherp houdt!",
    icon: Brain,
    link: "/memory",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
  {
    title: "Pair of 4s",
    description: "Groepeer vier gerelateerde woorden! Test je kennis van verschillende categorieën.",
    icon: Puzzle,
    link: "/pair-of-fours",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
  },
]

export default function GameLanding() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.background}`}>
      <Header />
      <main className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3"
              style={{ color: currentTheme.text }}
            >
              Kies een Spel!
            </h2>
            <p className="text-lg" style={{ color: currentTheme.primary }}>
              Selecteer een spel en begin met spelen! ⭐
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {games.map((game) => (
              <Link key={game.title} href={game.link} className="block transition-transform hover:scale-105">
                <Card
                  className={`h-full backdrop-blur border-none shadow-lg ${currentTheme.cardBackground} ${currentTheme.border}`}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-2 rounded-lg ${game.iconBg}`}>
                      <game.icon className={`w-6 h-6 ${game.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: currentTheme.text }}>
                      {game.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p style={{ color: currentTheme.primary }}>{game.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

