import { useState } from 'react'
import { Scene } from './components/Scene'
import { GameUI } from './components/GameUI'

function App() {
  const [score, setScore] = useState(0)
  const [isAiming, setIsAiming] = useState(false)
  const [currentPower, setCurrentPower] = useState(0)
  const [lastSpeed, setLastSpeed] = useState<number | null>(null)
  const [gameKey, setGameKey] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleRestart = () => {
    setGameKey(prev => prev + 1)
    setScore(0)
    setLastSpeed(null)
    setCurrentPower(0)
    setIsAiming(false)
    setIsPaused(false)
  }

  const handleTogglePause = () => {
    setIsPaused(prev => !prev)
  }

  return (
    <div className="relative w-full h-full">
      <Scene
        key={gameKey}
        setScore={setScore}
        isAiming={isAiming}
        setIsAiming={setIsAiming}
        setCurrentPower={setCurrentPower}
        setLastSpeed={setLastSpeed}
        isPaused={isPaused}
      />
      <GameUI
        score={score}
        isAiming={isAiming}
        currentPower={currentPower}
        lastSpeed={lastSpeed}
        onRestart={handleRestart}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
      />
    </div>
  )
}

export default App
