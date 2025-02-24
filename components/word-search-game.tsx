"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Pause, Play, Search } from "lucide-react"
import { useTheme, themes } from "./theme-provider"
import CongratulationsPopup from "./congratulations-popup"
import GameLayout from "./game-layout"

const ALL_WORDS = [
  "Nederland",
  "België",
  "Frankrijk",
  "Duitsland",
  "Spanje",
  "Italië",
  "Portugal",
  "Zweden",
  "Noorwegen",
  "Denemarken",
  "Finland",
  "Rusland",
  "Polen",
  "Canada",
  "Brazilië",
  "Australië",
  "China",
  "India",
  "Japan",
  "Mexico",
  "Voetbal",
  "Tennis",
  "Basketbal",
  "Hockey",
  "Hardlopen",
  "Wielrennen",
  "Zwemmen",
  "Volleybal",
  "Handbal",
  "Golf",
  "Schaatsen",
  "Skiën",
  "Snowboarden",
  "Boksen",
  "Karate",
  "Judo",
  "Roeien",
  "Turnen",
  "Badminton",
  "Squash",
  "Hond",
  "Kat",
  "Olifant",
  "Leeuw",
  "Tijger",
  "Giraffe",
  "Aap",
  "Zebra",
  "Paard",
  "Koe",
  "Schaap",
  "Kangoeroe",
  "Krokodil",
  "Slang",
  "Dolfijn",
  "Haai",
  "Pinguïn",
  "Uil",
  "Muis",
  "Vleermuis",
  "Avatar",
  "Titanic",
  "Inception",
  "Gladiator",
  "Frozen",
  "Shrek",
  "Jaws",
  "Batman",
  "Superman",
  "Spiderman",
  "Aladdin",
  "Mulan",
  "Harry Potter",
  "Hobbit",
  "Joker",
  "Up",
  "Nemo",
  "Tarzan",
  "Mad Max",
  "Matrix",
  "Pizza",
  "Pasta",
  "Sushi",
  "Hamburger",
  "Friet",
  "Brood",
  "Boterham",
  "Aardbei",
  "Banaan",
  "Appel",
  "Druiven",
  "Sinaasappel",
  "Chocolade",
  "Koekje",
  "Taart",
  "Koffie",
  "Thee",
  "Melk",
  "Water",
  "Cola",
  "Tafel",
  "Stoel",
  "Bank",
  "Bed",
  "Kast",
  "Lamp",
  "Deur",
  "Raam",
  "Muur",
  "Plafond",
  "Vloer",
  "Spiegel",
  "Tapijt",
  "Gordijn",
  "Televisie",
  "Computer",
  "Laptop",
  "Telefoon",
  "Boek",
  "Schrijver",
  "Zon",
  "Maan",
  "Ster",
  "Planeet",
  "Aarde",
  "Mars",
  "Venus",
  "Saturnus",
  "Jupiter",
  "Uranus",
  "Neptunus",
  "Melkweg",
  "Zwart gat",
  "Comet",
  "Asteroïde",
  "Ruimte",
  "Raket",
  "Astronaut",
  "Zwaartekracht",
  "Telescoop",
  "Lente",
  "Zomer",
  "Herfst",
  "Winter",
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December",
  "Regen",
  "Sneeuw",
  "Wind",
  "Storm",
]

const GAME_TIME = 600 // 10 minutes

type Difficulty = "medium" | "hard"
type Theme = "neonNights" | "forestDream" // Update this to match the themes in ThemeProvider

type CellState = {
  letter: string
  foundInWord: string | null
}

type GameSettings = {
  timerEnabled: boolean
}

export default function WordSearchGame() {
  // ... (state and other functions remain the same)

  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const [grid, setGrid] = useState<CellState[][]>([])
  const [words, setWords] = useState<string[]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [gameStarted, setGameStarted] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [settings, setSettings] = useState<GameSettings>({
    timerEnabled: true,
  })
  const [error, setError] = useState<string | null>(null)
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([])
  const isSelectingRef = useRef(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)

  const getGridSize = useCallback(() => 15, [])

  const selectRandomWords = useCallback(() => {
    const shuffled = [...ALL_WORDS].sort(() => 0.5 - Math.random()).map((word) => word.toLowerCase())
    return shuffled.slice(0, 20)
  }, [])

  const initializeGame = useCallback(() => {
    console.log("Initializing game...")
    setIsInitializing(true)
    const gridSize = getGridSize()
    const selectedWords = selectRandomWords()
    console.log("Selected words:", selectedWords)

    // Create a blob URL for the worker
    const workerCode = `
    function placeWord(grid, word, allowDiagonal, allowReverse) {
      const gridSize = grid.length;
      const directions = [
        [0, 1], [1, 0], [1, 1], [-1, 1],
        [0, -1], [-1, 0], [-1, -1], [1, -1]
      ];
      
      for (let attempts = 0; attempts < 100; attempts++) {
        const startX = Math.floor(Math.random() * gridSize);
        const startY = Math.floor(Math.random() * gridSize);
        const direction = directions[Math.floor(Math.random() * (allowDiagonal ? 8 : 4))];
        const reverse = allowReverse && Math.random() < 0.5;

        if (canPlaceWord(grid, word, startX, startY, direction, reverse)) {
          for (let i = 0; i < word.length; i++) {
            const x = startX + i * direction[0];
            const y = startY + i * direction[1];
            const letter = reverse ? word[word.length - 1 - i] : word[i];
            grid[y][x] = letter;
          }
          return true;
        }
      }
      return false;
    }

    function canPlaceWord(grid, word, startX, startY, direction, reverse) {
      const gridSize = grid.length;
      const endX = startX + (word.length - 1) * direction[0];
      const endY = startY + (word.length - 1) * direction[1];

      if (endX < 0 || endX >= gridSize || endY < 0 || endY >= gridSize) {
        return false;
      }

      for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction[0];
        const y = startY + i * direction[1];
        const letter = reverse ? word[word.length - 1 - i] : word[i];
        if (grid[y][x] !== '' && grid[y][x] !== letter) {
          return false;
        }
      }

      return true;
    }

    function fillEmptySpaces(grid) {
      const gridSize = grid.length;
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y][x] === '') {
            grid[y][x] = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // 97 is de ASCII code voor 'a'
          }
        }
      }
    }

    self.onmessage = (event) => {
      try {
        const { gridSize, words, settings } = event.data;
        console.log("Worker received message:", { gridSize, wordsCount: words.length, settings });
        
        const grid = Array(gridSize).fill('').map(() => Array(gridSize).fill(''));
        const placedWords = [];

        for (const word of words) {
          if (placeWord(grid, word, true, true)) {  // Altijd diagonaal en achterstevoren toestaan
            placedWords.push(word);
          }
        }

        fillEmptySpaces(grid);

        const cellStateGrid = grid.map(row => 
          row.map(letter => ({ letter, foundInWord: null }))
        );

        console.log("Worker finished generating grid");
        self.postMessage({ grid: cellStateGrid, placedWords });
      } catch (error) {
        console.error("Worker error:", error);
        self.postMessage({ error: error.message });
      }
    }
    `
    const blob = new Blob([workerCode], { type: "application/javascript" })
    const worker = new Worker(URL.createObjectURL(blob))

    worker.onmessage = (event) => {
      console.log("Received message from worker")
      if (event.data.error) {
        console.error("Worker error:", event.data.error)
        setError(event.data.error)
        setIsInitializing(false)
      } else {
        const { grid, placedWords } = event.data
        setGrid(grid)
        setWords(placedWords)
        setFoundWords([])
        setScore(0)
        setTimeLeft(GAME_TIME)
        setGameStarted(true)
        setIsInitializing(false)
        setError(null)
      }
      worker.terminate() // Terminate the worker after it's done
      console.log("Game initialized")
    }

    worker.onerror = (error) => {
      console.error("Worker error:", error)
      setIsInitializing(false)
    }

    console.log("Posting message to worker")
    worker.postMessage({
      gridSize,
      words: selectedWords,
      settings: {
        timerEnabled: settings.timerEnabled,
      },
    })
  }, [getGridSize, selectRandomWords, settings])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isInitializing) {
      timeoutId = setTimeout(() => {
        console.error("Game initialization timed out")
        setIsInitializing(false)
      }, 10000) // 10 seconds timeout
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isInitializing])

  useEffect(() => {
    if (gameStarted && settings.timerEnabled) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameStarted, settings.timerEnabled])

  const handleCellMouseDown = (x: number, y: number) => {
    isSelectingRef.current = true
    setSelectedCells([[x, y]])
  }

  const handleCellMouseEnter = (x: number, y: number) => {
    if (isSelectingRef.current) {
      setSelectedCells((prev) => {
        if (prev.length === 0) return [[x, y]]
        const [startX, startY] = prev[0]
        const dx = x - startX
        const dy = y - startY
        const steps = Math.max(Math.abs(dx), Math.abs(dy))
        if (steps === 0) return prev

        const stepX = dx / steps
        const stepY = dy / steps

        const newSelection = []
        for (let i = 0; i <= steps; i++) {
          const cellX = Math.round(startX + i * stepX)
          const cellY = Math.round(startY + i * stepY)
          newSelection.push([cellX, cellY])
        }

        return newSelection
      })
    }
  }

  const handleCellMouseUp = () => {
    isSelectingRef.current = false
    const selectedWord = selectedCells.map(([x, y]) => grid[y][x].letter).join("")
    checkWord(selectedWord)
    setSelectedCells([])
  }

  const checkWord = (word: string) => {
    const forwardWord = word
    const backwardWord = word.split("").reverse().join("")

    if (words.includes(forwardWord) || words.includes(backwardWord)) {
      const foundWord = words.find((w) => w === forwardWord || w === backwardWord) as string
      if (!foundWords.includes(foundWord)) {
        setFoundWords((prev) => [...prev, foundWord])
        setScore((prev) => prev + foundWord.length * 10)
        markWordAsFound(foundWord)

        if (foundWords.length === words.length - 1) {
          setShowCongratulations(true)
        }
      }
    }
  }

  const markWordAsFound = (word: string) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, y) =>
        row.map((cell, x) => {
          if (selectedCells.some(([sx, sy]) => sx === x && sy === y)) {
            return { ...cell, foundInWord: word }
          }
          return cell
        }),
      ),
    )
  }

  const toggleSetting = (setting: keyof GameSettings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const changeTheme = (theme: Theme) => {
    setSettings((prev) => ({ ...prev, theme }))
  }

  const gridSize = getGridSize()

  const getColumnCount = useCallback(() => {
    if (words.length <= 20) return 2
    if (words.length <= 30) return 3
    return 4
  }, [words.length])

  const handleNewGame = () => {
    setShowCongratulations(false)
    initializeGame()
  }

  const handleClosePopup = () => {
    setShowCongratulations(false)
  }

  return (
    <GameLayout
      title="Woordzoeker"
      icon={<Search className="w-5 h-5" style={{ color: currentTheme.accent }} />}
      score={score}
      timer={settings.timerEnabled ? formatTime(timeLeft) : undefined}
    >
      {!gameStarted ? (
        <div className="w-full max-w-md mx-auto">
          <Card className={`border-none shadow-lg ${currentTheme.cardBackground} ${currentTheme.border}`}>
            <CardContent className="space-y-6">
              {error && (
                <p className="text-red-500 bg-white p-2 rounded" role="alert">
                  Error: {error}
                </p>
              )}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="timer" style={{ color: currentTheme.text }}>
                    Timer inschakelen (10 minuten)
                  </Label>
                  <Switch
                    id="timer"
                    checked={settings.timerEnabled}
                    onCheckedChange={() => toggleSetting("timerEnabled")}
                  />
                </div>
              </div>
              <Button
                onClick={initializeGame}
                disabled={isInitializing}
                className={`w-full rounded-full py-6 text-lg font-bold transition-all hover:scale-105`}
                style={{ backgroundColor: currentTheme.accent, color: currentTheme.buttonText }}
              >
                {isInitializing ? "Initialiseren..." : "Start Spel"}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto relative">
          <Card className={`border-none shadow-lg ${currentTheme.cardBackground} ${currentTheme.border}`}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 flex items-center justify-center">
                  <div
                    ref={gridRef}
                    className={`grid ${isPaused ? "opacity-50" : ""} w-full max-w-[500px] aspect-square`}
                    style={{
                      gridTemplateColumns: `repeat(${getGridSize()}, 1fr)`,
                      gap: "1px",
                      backgroundColor: currentTheme.secondary,
                      padding: "1px",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {grid.map((row, y) =>
                      row.map((cell, x) => (
                        <button
                          key={`${x}-${y}`}
                          onMouseDown={() => !isPaused && handleCellMouseDown(x, y)}
                          onMouseEnter={() => !isPaused && handleCellMouseEnter(x, y)}
                          onMouseUp={() => !isPaused && handleCellMouseUp()}
                          onTouchStart={() => !isPaused && handleCellMouseDown(x, y)}
                          onTouchMove={(e) => {
                            if (!isPaused) {
                              const touch = e.touches[0]
                              const element = document.elementFromPoint(touch.clientX, touch.clientY)
                              if (element && element.tagName === "BUTTON") {
                                const [cellX, cellY] = element.getAttribute("data-coord")!.split(",").map(Number)
                                handleCellMouseEnter(cellX, cellY)
                              }
                            }
                          }}
                          onTouchEnd={() => !isPaused && handleCellMouseUp()}
                          className={`aspect-square flex items-center justify-center text-base font-semibold transition-all
                            ${cell.foundInWord ? "bg-green-200 text-green-800" : currentTheme.cardBackground}
                            ${selectedCells.some(([sx, sy]) => sx === x && sy === y) ? "ring-2 ring-[#55ccff] ring-offset-2" : ""}
                          `}
                          style={{
                            color: cell.foundInWord ? "rgb(22, 101, 52)" : currentTheme.text,
                          }}
                          disabled={isPaused}
                          data-coord={`${x},${y}`}
                        >
                          {cell.letter.toLowerCase()}
                        </button>
                      )),
                    )}
                  </div>
                </div>

                <div className="lg:w-64 shrink-0 flex flex-col">
                  <div className={`rounded-lg p-4 mb-4 flex-grow ${currentTheme.background}`}>
                    <h3 className="font-bold text-lg mb-3" style={{ color: currentTheme.text }}>
                      Woordenlijst
                    </h3>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {words.map((word) => (
                        <div
                          key={word}
                          className={`px-2 py-1 rounded text-sm transition-all truncate
                            ${
                              foundWords.includes(word)
                                ? "bg-green-200 text-green-800 line-through"
                                : `${currentTheme.cardBackground}`
                            }
                          `}
                          style={{ color: foundWords.includes(word) ? "rgb(22, 101, 52)" : currentTheme.text }}
                        >
                          {word.toLowerCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      onClick={initializeGame}
                      className="flex-1 rounded-full"
                      style={{ backgroundColor: currentTheme.accent, color: currentTheme.buttonText }}
                    >
                      Nieuw spel
                    </Button>
                    <Button
                      onClick={togglePause}
                      className="aspect-square rounded-full"
                      variant="outline"
                      aria-label={isPaused ? "Hervat spel" : "Pauzeer spel"}
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showCongratulations && (
        <CongratulationsPopup score={score} onNewGame={handleNewGame} onClose={handleClosePopup} />
      )}
    </GameLayout>
  )
}

