import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SnailIcon as Snake, Brain, Puzzle, Search } from "lucide-react"

export default function GameLanding() {
  const games = [
    {
      title: "Snake",
      description: "Bestuur een slang, eet voedsel en groei zonder jezelf te raken!",
      icon: <Snake className="w-12 h-12 mb-4" />,
      link: "/snake",
    },
    {
      title: "Memory",
      description: "Test je geheugen door paren van overeenkomende kaarten te vinden.",
      icon: <Brain className="w-12 h-12 mb-4" />,
      link: "/memory",
    },
    {
      title: "Hangman",
      description: "Raad het woord letter voor letter voordat de hangman compleet is.",
      icon: <Puzzle className="w-12 h-12 mb-4" />,
      link: "/hangman",
    },
    {
      title: "Woordzoeker",
      description: "Zoek verborgen woorden in een raster van letters.",
      icon: <Search className="w-12 h-12 mb-4" />,
      link: "/word-search",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Welkom bij onze Spelletjesverzameling</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card key={game.title} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-center">{game.icon}</div>
              <CardTitle className="text-2xl text-center">{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">{game.description}</CardDescription>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={game.link} className="w-full">
                <Button className="w-full">Speel {game.title}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

