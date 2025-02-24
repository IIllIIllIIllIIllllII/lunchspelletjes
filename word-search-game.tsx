"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const GRID_SIZE = 10
const WORDS = ["REACT", "NEXT", "VERCEL", "TAILWIND"]

export default function WordSearchGame() {
  const [grid, setGrid] = useState<string[][]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(""))

    WORDS.forEach((word) => {
      placeWord(newGrid, word)
    })

    fillEmptySpaces(newGrid)
    setGrid(newGrid)
    setFoundWords([])
  }

  const placeWord = (grid: string[][], word: string) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
    ]
    let placed = false

    while (!placed) {
      const startX = Math.floor(Math.random() * GRID_SIZE)
      const startY = Math.floor(Math.random() * GRID_SIZE)
      const direction = directions[Math.floor(Math.random() * directions.length)]

      if (canPlaceWord(grid, word, startX, startY, direction)) {
        for (let i = 0; i < word.length; i++) {
          grid[startY + i * direction[1]][startX + i * direction[0]] = word[i]
        }
        placed = true
      }
    }
  }

  const canPlaceWord = (grid: string[][], word: string, startX: number, startY: number, direction: number[]) => {
    if (startX + word.length * direction[0] > GRID_SIZE || startY + word.length * direction[1] > GRID_SIZE) {
      return false
    }

    for (let i = 0; i < word.length; i++) {
      const cell = grid[startY + i * direction[1]][startX + i * direction[0]]
      if (cell !== "" && cell !== word[i]) {
        return false
      }
    }

    return true
  }

  const fillEmptySpaces = (grid: string[][]) => {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (grid[y][x] === "") {
          grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
        }
      }
    }
  }

  const handleCellClick = (x: number, y: number) => {
    const selectedLetter = grid[y][x]
    const updatedGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (rowIndex === y && colIndex === x ? cell.toLowerCase() : cell)),
    )
    setGrid(updatedGrid)

    checkForWords(updatedGrid)
  }

  const checkForWords = (updatedGrid: string[][]) => {
    const flatGrid = updatedGrid.flat().join("")
    const newFoundWords = WORDS.filter((word) => flatGrid.includes(word.toLowerCase()) && !foundWords.includes(word))

    if (newFoundWords.length > 0) {
      setFoundWords((prev) => [...prev, ...newFoundWords])
    }
  }

  const isGameOver = foundWords.length === WORDS.length

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-10 gap-1 mb-4">
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <Button
              key={`${x}-${y}`}
              onClick={() => handleCellClick(x, y)}
              className="w-8 h-8 p-0 text-sm"
              variant={cell === cell.toLowerCase() ? "default" : "outline"}
            >
              {cell.toUpperCase()}
            </Button>
          )),
        )}
      </div>
      <div className="mb-4">
        <p className="font-bold">Words to find:</p>
        <ul>
          {WORDS.map((word) => (
            <li key={word} className={foundWords.includes(word) ? "line-through" : ""}>
              {word}
            </li>
          ))}
        </ul>
      </div>
      {isGameOver && <p className="text-green-500 font-bold mb-2">Congratulations! You found all the words!</p>}
      <Button onClick={initializeGame}>New Game</Button>
    </div>
  )
}

