"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MazeProblem {
  equation: string
  correctAnswer: number
  options: number[]
  direction: string
}

const generateProblem = (): MazeProblem => {
  const directions = ['Nord', 'Sud', 'Est', 'Ovest']
  const direction = directions[Math.floor(Math.random() * directions.length)]
  
  const equations = [
    { equation: '2x + 3 = 7', answer: 2 },
    { equation: '3x - 1 = 8', answer: 3 },
    { equation: 'x + 5 = 9', answer: 4 },
    { equation: '4x = 12', answer: 3 },
    { equation: 'x - 2 = 3', answer: 5 },
    { equation: '2x = 10', answer: 5 },
    { equation: 'x + 3 = 8', answer: 5 },
    { equation: '3x + 2 = 11', answer: 3 }
  ]
  
  const selectedEquation = equations[Math.floor(Math.random() * equations.length)]
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 6) - 3
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, selectedEquation.answer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== selectedEquation.answer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(selectedEquation.answer)
  options.sort(() => Math.random() - 0.5)
  
  return {
    equation: selectedEquation.equation,
    correctAnswer: selectedEquation.answer,
    options,
    direction
  }
}

export default function LabirintoAlgebricoClientIT() {
  const [currentProblem, setCurrentProblem] = useState<MazeProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(60)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(60)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(null)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished')
      if (timer) clearInterval(timer)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeLeft, gameState])

  const checkAnswer = useCallback((answer: number) => {
    if (currentProblem && gameState === 'playing') {
      if (answer === currentProblem.correctAnswer) {
        setScore((prevScore) => prevScore + 1)
        setFeedback('correct')
      } else {
        setFeedback('incorrect')
      }
      setProblemsSolved((prev) => prev + 1)
      setTimeout(() => {
        setCurrentProblem(generateProblem())
        setFeedback(null)
      }, 700)
    }
  }, [currentProblem, gameState])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 2) return { rank: 'Principiante del Labirinto', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 4) return { rank: 'Esperto del Labirinto', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 6) return { rank: 'Maestro del Labirinto', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio del Labirinto', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Il Labirinto Algebrico"
      description="Naviga attraverso un labirinto risolvendo equazioni algebriche. Sfida la tua comprensione dell'algebra!"
      introduction="Risolvi equazioni algebriche per navigare attraverso il labirinto. Ogni equazione corretta ti porta in una nuova direzione. Hai 60 secondi!"
      timeLeft={timeLeft}
      score={score}
      onStart={startGame}
      onReset={resetGame}
      isActive={gameState === 'playing'}
      feedback={feedback}
      gameResult={gameState === 'finished' ? {
        points: score,
        rank: rankInfo.rank,
        emoji: rankInfo.emoji
      } : null}
      showIntroduction={gameState === 'waiting'}
      currentQuestion={problemsSolved + 1}
      totalQuestions={problemsSolved + 1}
      currentGamePath="/it/giochi-matematici/labirinto-algebrico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧭</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Il Labirinto Algebrico!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Risolvi equazioni algebriche per navigare attraverso il labirinto. 
            Ogni equazione corretta ti porta in una nuova direzione. Hai 60 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Direzione: {currentProblem.direction}
            </h3>
            <h4 className="text-lg font-medium text-blue-700 mb-6">
              Risolvi: {currentProblem.equation}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
                  disabled={feedback !== null}
                >
                  x = {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutIT>
  )
}
