"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const WORDS = ["REACT", "JAVASCRIPT", "TYPESCRIPT", "NEXTJS", "VERCEL"]

export default function HangmanGame() {
  const [word, setWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [remainingGuesses, setRemainingGuesses] = useState(6)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setWord(randomWord)
    setGuessedLetters([])
    setRemainingGuesses(6)
  }

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters((prev) => [...prev, letter])

    if (!word.includes(letter)) {
      setRemainingGuesses((prev) => prev - 1)
    }
  }

  const maskedWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ")

  const isGameOver = remainingGuesses === 0
  const isGameWon = word.split("").every((letter) => guessedLetters.includes(letter))

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl mb-4">{maskedWord}</p>
      <p className="mb-4">Remaining guesses: {remainingGuesses}</p>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
          <Button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isGameOver || isGameWon}
            className="w-8 h-8 p-0"
          >
            {letter}
          </Button>
        ))}
      </div>
      {isGameOver && <p className="text-red-500 font-bold mb-2">Game Over! The word was: {word}</p>}
      {isGameWon && <p className="text-green-500 font-bold mb-2">Congratulations! You guessed the word!</p>}
      <Button onClick={startNewGame}>New Game</Button>
    </div>
  )
}

