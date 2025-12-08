import { useState } from 'react'
import { Scene } from './components/Scene'
import { GameUI } from './components/GameUI'

function App() {
  const [score, setScore] = useState(0)
  const [isAiming, setIsAiming] = useState(false)

  return (
    <div className="relative w-full h-full">
      <Scene
        setScore={setScore}
        isAiming={isAiming}
        setIsAiming={setIsAiming}
      />
      <GameUI score={score} isAiming={isAiming} />
    </div>
  )
}

export default App
