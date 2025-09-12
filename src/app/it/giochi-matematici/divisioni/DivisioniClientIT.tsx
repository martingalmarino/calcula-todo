"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface DivisionProblem {
  dividend: number
  divisor: number
  correctAnswer: number
  options: number[]
}

const generateProblem = (): DivisionProblem => {
  const divisor = Math.floor(Math.random() * 10) + 2 // 2-11
  const quotient = Math.floor(Math.random() * 20) + 1 // 1-20
  const dividend = divisor * quotient
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 10) - 5
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, quotient + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== quotient) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(quotient)
  options.sort(() => Math.random() - 0.5)
  
  return { dividend, divisor, correctAnswer: quotient, options }
}

export default function DivisioniClientIT() {
  const [currentProblem, setCurrentProblem] = useState<DivisionProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(50)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(50)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(50)
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
    if (finalScore <= 3) return { rank: 'Principiante delle Divisioni', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Esperto delle Divisioni', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Maestro delle Divisioni', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio delle Divisioni', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Calcolatrice Mentale delle Divisioni"
      description="Pratica divisioni mentali in tempo limitato. Sfida la tua agilità mentale e migliora il calcolo mentale!"
      introduction="Ti mostreremo divisioni e dovrai risolverle mentalmente. Hai 50 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/divisioni"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">➗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Calcolatrice Mentale delle Divisioni!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo divisioni e dovrai risolverle mentalmente. 
            Hai 50 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">
              {currentProblem.dividend} ÷ {currentProblem.divisor} = ?
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
