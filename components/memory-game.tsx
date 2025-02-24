"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import GameLayout from "./game-layout"
import { Brain } from "lucide-react"
import { useTheme, themes } from "./theme-provider"

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

export default function MemoryGame({ instructions }: { instructions: string }) {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [solved, setSolved] = useState<boolean[]>([])
  const [disabled, setDisabled] = useState(false)
  const [moves, setMoves] = useState(0)
  const [pairsFound, setPairsFound] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlipped(new Array(shuffledCards.length).fill(false))
    setSolved(new Array(shuffledCards.length).fill(false))
    setMoves(0)
    setPairsFound(0)
  }

  const handleCardClick = (index: number) => {
    if (disabled || flipped[index] || solved[index]) return

    const newFlipped = [...flipped]
    newFlipped[index] = true
    setFlipped(newFlipped)

    const flippedCards = newFlipped.reduce((acc, curr, idx) => (curr && !solved[idx] ? [...acc, idx] : acc), [])

    if (flippedCards.length === 2) {
      setDisabled(true)
      setMoves((prev) => prev + 1)

      if (cards[flippedCards[0]] === cards[flippedCards[1]]) {
        setSolved((prev) => {
          const newSolved = [...prev]
          newSolved[flippedCards[0]] = true
          newSolved[flippedCards[1]] = true
          return newSolved
        })
        setPairsFound((prev) => prev + 1)
        setDisabled(false)
      } else {
        setTimeout(() => {
          setFlipped((prev) => {
            const newFlipped = [...prev]
            newFlipped[flippedCards[0]] = false
            newFlipped[flippedCards[1]] = false
            return newFlipped
          })
          setDisabled(false)
        }, 1000)
      }
    }
  }

  const isGameOver = solved.every(Boolean)

  return (
    <GameLayout title="Memory" icon={<Brain className="w-5 h-5 text-pink-500" />} instructions={instructions}>
      <div className="flex flex-col items-center">
        <div className="mb-4 flex justify-between w-full">
          <p className="text-lg font-semibold" style={{ color: currentTheme.primary }}>
            Moves: {moves}
          </p>
          <p className="text-lg font-semibold" style={{ color: currentTheme.accent }}>
            Pairs Found: {pairsFound}/{EMOJIS.length}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4 w-full max-w-md">
          {cards.map((card, index) => (
            <Button
              key={index}
              onClick={() => handleCardClick(index)}
              className="w-full h-16 md:h-20 text-2xl md:text-3xl"
              variant={flipped[index] || solved[index] ? "default" : "outline"}
              disabled={disabled || solved[index]}
              style={{
                backgroundColor: flipped[index] || solved[index] ? currentTheme.accent : currentTheme.cardBackground,
                color: flipped[index] || solved[index] ? currentTheme.buttonText : currentTheme.text,
              }}
            >
              {flipped[index] || solved[index] ? card : ""}
            </Button>
          ))}
        </div>
        {isGameOver && (
          <p className="text-green-500 font-bold mb-2">Gefeliciteerd! Je hebt gewonnen in {moves} zetten!</p>
        )}
        <Button
          onClick={initializeGame}
          style={{ backgroundColor: currentTheme.accent, color: currentTheme.buttonText }}
        >
          Nieuw spel
        </Button>
      </div>
    </GameLayout>
  )
}

