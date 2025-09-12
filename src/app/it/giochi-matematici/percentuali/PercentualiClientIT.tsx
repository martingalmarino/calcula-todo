"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PercentageProblem {
  originalValue: number
  percentage: number
  operation: 'increase' | 'decrease'
  correctAnswer: number
  options: number[]
}

const generateProblem = (): PercentageProblem => {
  const originalValue = Math.floor(Math.random() * 100) + 10 // 10-109
  const percentage = Math.floor(Math.random() * 40) + 10 // 10-49
  const operation: 'increase' | 'decrease' = Math.random() < 0.5 ? 'increase' : 'decrease'
  
  let correctAnswer: number
  if (operation === 'increase') {
    correctAnswer = Math.round(originalValue * (1 + percentage / 100))
  } else {
    correctAnswer = Math.round(originalValue * (1 - percentage / 100))
  }
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { originalValue, percentage, operation, correctAnswer, options }
}

export default function PercentualiClientIT() {
  const [currentProblem, setCurrentProblem] = useState<PercentageProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(40)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(40)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(40)
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
    if (finalScore <= 4) return { rank: 'Principiante delle Percentuali', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 8) return { rank: 'Esperto delle Percentuali', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 12) return { rank: 'Maestro delle Percentuali', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio delle Percentuali', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Puzzle delle Percentuali"
      description="Risolvi puzzle con percentuali e calcoli percentuali. Sfida la tua comprensione delle percentuali!"
      introduction="Ti mostreremo calcoli con percentuali. Devi calcolare aumenti o diminuzioni percentuali. Hai 40 secondi!"
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
      currentGamePath="/it/giochi-matematici/percentuali"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Puzzle delle Percentuali!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo calcoli con percentuali. 
            Devi calcolare aumenti o diminuzioni percentuali. Hai 40 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentProblem.operation === 'increase' 
                ? `${currentProblem.originalValue} + ${currentProblem.percentage}% = ?`
                : `${currentProblem.originalValue} - ${currentProblem.percentage}% = ?`
              }
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
                  disabled={feedback !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutIT>
  )
}
