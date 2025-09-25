import { useState } from 'react'
import Header from './components/header'
import CardGrid from './components/cardGrid'
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);


  const updateScore = (newScore) => {
    setScore(newScore);
    if(newScore > highScore) {
      setHighScore(newScore);
    }
  }

  const resetScore = () => {
    setScore(0);
  }

  return (
    <>
      <div>
        <Header 
          score={score}
          highScore={highScore}
        />

        <CardGrid 
          onScoreUpdate={updateScore}
          onScoreReset={resetScore}
          currentScore={score}
        />
      </div>
    </>
  )
}

export default App
