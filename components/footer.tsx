"use client"

import Link from "next/link"
import { useTheme, themes } from "./theme-provider"

export default function Footer() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <footer className="p-6 text-center" style={{ backgroundColor: currentTheme.primary, color: currentTheme.text }}>
      <div className="flex justify-center space-x-6">
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/privacy" className="hover:underline">
          Privacybeleid
        </Link>
        <Link href="/terms" className="hover:underline">
          Gebruiksvoorwaarden
        </Link>
      </div>
    </footer>
  )
}

