"use client"

import Link from "next/link"
import { GamepadIcon, Menu } from "lucide-react"
import { useTheme, themes } from "./theme-provider"
import { useState } from "react"
import { Button } from "./ui/button"

export default function Header() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center ${currentTheme.background}`}
    >
      <Link href="/" className="flex items-center gap-2 md:gap-4">
        <div className={`p-2 md:p-3 rounded-xl shadow-lg ${currentTheme.cardBackground}`}>
          <GamepadIcon className="w-6 h-6 md:w-8 md:h-8" style={{ color: currentTheme.accent }} />
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: currentTheme.text }}>
            Lunchspelletjes.nl
          </h1>
          <p className="text-sm" style={{ color: currentTheme.primary }}>
            Leuke spelletjes voor iedereen!
          </p>
        </div>
      </Link>
      <div className="md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <nav
        className={`${isMenuOpen ? "block" : "hidden"} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50 md:z-auto`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
          <li>
            <Link href="/memory" className="block py-2 md:py-0 hover:text-blue-500">
              Memory
            </Link>
          </li>
          <li>
            <Link href="/word-search" className="block py-2 md:py-0 hover:text-blue-500">
              Woordzoeker
            </Link>
          </li>
          <li>
            <Link href="/pair-of-fours" className="block py-2 md:py-0 hover:text-blue-500">
              Pair of 4s
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

