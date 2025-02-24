import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SnowflakeIcon as Confetti } from "lucide-react"
import { useTheme, themes } from "./theme-provider"

interface CongratulationsPopupProps {
  score: number
  onNewGame: () => void
  onClose: () => void
}

const CongratulationsPopup: React.FC<CongratulationsPopupProps> = ({ score, onNewGame, onClose }) => {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className={`w-96 ${currentTheme.cardBackground}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Confetti className="w-6 h-6 mr-2" style={{ color: currentTheme.accent }} />
            <span style={{ color: currentTheme.text }}>Gefeliciteerd!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4" style={{ color: currentTheme.primary }}>
            Je hebt alle woorden gevonden! Geweldig gedaan!
          </p>
          <p className="text-center text-xl font-bold" style={{ color: currentTheme.accent }}>
            Jouw score: {score}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={onNewGame} style={{ backgroundColor: currentTheme.accent, color: currentTheme.buttonText }}>
            Nieuw Spel
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            style={{ borderColor: currentTheme.accent, color: currentTheme.text }}
          >
            Sluiten
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CongratulationsPopup

