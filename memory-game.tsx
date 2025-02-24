"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [solved, setSolved] = useState<boolean[]>([])
  const [disabled, setDisabled] = useState(false)
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlipped(new Array(shuffledCards.length).fill(false))
    setSolved(new Array(shuffledCards.length).fill(false))
    setMoves(0)
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
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <Button
            key={index}
            onClick={() => handleCardClick(index)}
            className="w-16 h-16 text-2xl"
            variant={flipped[index] || solved[index] ? "default" : "outline"}
            disabled={disabled || solved[index]}
          >
            {flipped[index] || solved[index] ? card : ""}
          </Button>
        ))}
      </div>
      <p className="mb-2">Moves: {moves}</p>
      {isGameOver && <p className="text-green-500 font-bold mb-2">Congratulations! You won!</p>}
      <Button onClick={initializeGame}>Restart</Button>
    </div>
  )
}

