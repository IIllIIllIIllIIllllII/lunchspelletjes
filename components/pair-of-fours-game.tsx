"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Puzzle } from "lucide-react"
import { useTheme, themes } from "./theme-provider"
import GameLayout from "./game-layout"

type WordGroup = {
  words: string[]
  category: string
  emoji: string
}

const WORD_GROUPS: WordGroup[] = [
  { words: ["Acryl", "Olieverf", "Aquarel", "Gouache"], category: "Schildertechnieken", emoji: "🎨" },
  { words: ["Dialect", "Pidgin", "Creools", "Esperanto"], category: "Taal & Linguïstiek", emoji: "🗣️" },
  { words: ["Stradivarius", "Guarneri", "Amati", "Stainer"], category: "Muziekinstrumenten", emoji: "🎻" },
  { words: ["Hyperbool", "Parabool", "Ellips", "Cirkel"], category: "Meetkunde", emoji: "📐" },
  { words: ["Maslow", "Pavlov", "Freud", "Skinner"], category: "Psychologie", emoji: "🧠" },
  { words: ["JPEG", "PNG", "GIF", "SVG"], category: "Bestandsformaten", emoji: "🖼️" },
  { words: ["Azteken", "Maya's", "Inca's", "Olmeken"], category: "Oude Beschavingen", emoji: "🌎" },
]

export default function PairOfFoursGame() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const [words, setWords] = useState<string[]>([])
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [completedGroups, setCompletedGroups] = useState<WordGroup[]>([])
  const [score, setScore] = useState(0)
  const [isWrong, setIsWrong] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledGroups = shuffleArray(WORD_GROUPS).slice(0, 4)
    const allWords = shuffledGroups.flatMap((group) => group.words)
    setWords(shuffleArray(allWords))
    setSelectedWords([])
    setCompletedGroups([])
    setScore(0)
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word))
    } else if (selectedWords.length < 4) {
      const newSelectedWords = [...selectedWords, word]
      setSelectedWords(newSelectedWords)

      if (newSelectedWords.length === 4) {
        checkSelectedWords(newSelectedWords)
      }
    }
  }

  const checkSelectedWords = (selected: string[]) => {
    const matchingGroup = WORD_GROUPS.find(
      (group) =>
        selected.every((word) => group.words.includes(word)) && group.words.every((word) => selected.includes(word)),
    )

    if (matchingGroup) {
      setCompletedGroups([...completedGroups, matchingGroup])
      setWords(words.filter((word) => !selected.includes(word)))
      setSelectedWords([])
      setScore(score + 1)
    } else {
      setIsWrong(true)
      setTimeout(() => {
        setIsWrong(false)
        setSelectedWords([])
      }, 1000)
    }
  }

  return (
    <GameLayout
      title="Pair of 4s"
      icon={<Puzzle className="w-5 h-5" style={{ color: currentTheme.accent }} />}
      score={score}
      instructions="Vind de 4 kaarten die bij dezelfde categorie horen"
    >
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-none shadow-lg bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {completedGroups.map((group, index) => (
                <div
                  key={index}
                  className="p-2 border-2 rounded"
                  style={{
                    backgroundColor: "white",
                    borderColor: currentTheme.accent,
                  }}
                >
                  <div className="text-center mb-2 font-bold text-sm text-black">
                    {group.category} {group.emoji}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {group.words.map((word, wordIndex) => (
                      <div key={wordIndex} className="p-1 text-center text-xs rounded bg-green-50 text-black">
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {words.map((word, index) => (
                <Button
                  key={index}
                  onClick={() => handleWordClick(word)}
                  className={`h-16 text-sm ${selectedWords.includes(word) ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                  style={{
                    backgroundColor: "rgb(240, 253, 244)", // bg-green-50
                    color: "black",
                    borderRadius: "0.25rem",
                  }}
                >
                  {word}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <Button
            onClick={initializeGame}
            style={{ backgroundColor: currentTheme.accent, color: currentTheme.buttonText }}
          >
            Nieuw Spel
          </Button>
        </div>
      </div>
    </GameLayout>
  )
}

