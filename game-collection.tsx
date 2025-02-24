import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import SnakeGame from "./snake-game"
import MemoryGame from "./memory-game"
import HangmanGame from "./hangman-game"
import WordSearchGame from "./word-search-game"

export default function GameCollection() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Classic Games Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Snake</CardTitle>
          </CardHeader>
          <CardContent>
            <SnakeGame />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <MemoryGame />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hangman</CardTitle>
          </CardHeader>
          <CardContent>
            <HangmanGame />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Word Search</CardTitle>
          </CardHeader>
          <CardContent>
            <WordSearchGame />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

