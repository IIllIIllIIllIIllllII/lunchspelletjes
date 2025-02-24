"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Info } from "lucide-react"
import { useTheme, themes } from "./theme-provider"
import Header from "./header"

interface GameLayoutProps {
  children: React.ReactNode
  title: string
  icon: React.ReactNode
  score?: number
  timer?: string
  instructions: string
}

export default function GameLayout({ children, title, icon, score, timer, instructions }: GameLayoutProps) {
  const { theme } = useTheme()
  const currentTheme = themes[theme]
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.background}`}>
      <Header />
      <main className="flex-grow p-4 md:p-6 overflow-auto pt-20">
        <div className="w-full max-w-6xl mx-auto relative">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Ga terug
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${currentTheme.background}`}>{icon}</div>
              <h2 className="text-xl font-bold" style={{ color: currentTheme.text }}>
                {title}
              </h2>
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowInstructions(!showInstructions)}>
              <Info className="w-4 h-4" />
            </Button>
          </div>
          {showInstructions && (
            <div className="mb-4 bg-white p-4 rounded shadow-lg">
              <p>{instructions}</p>
            </div>
          )}
          <Card className={`border-none shadow-lg ${currentTheme.cardBackground} ${currentTheme.border}`}>
            <CardContent className="p-4 md:p-6">
              {(score !== undefined || timer) && (
                <div className="flex justify-between items-center mb-4">
                  {score !== undefined && (
                    <p className="text-lg font-semibold" style={{ color: currentTheme.accent }}>
                      Score: {score}
                    </p>
                  )}
                  {timer && (
                    <p className="text-lg font-semibold" style={{ color: currentTheme.primary }}>
                      {timer}
                    </p>
                  )}
                </div>
              )}
              {children}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

