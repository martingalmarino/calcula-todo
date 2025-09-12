"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface OrderProblem {
  numbers: number[]
  order: 'ascending' | 'descending'
  correctAnswer: number[]
  options: number[][]
}

const generateProblem = (): OrderProblem => {
  const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1)
  const order: 'ascending' | 'descending' = Math.random() < 0.5 ? 'ascending' : 'descending'
  
  let correctAnswer: number[]
  if (order === 'ascending') {
    correctAnswer = [...numbers].sort((a, b) => a - b)
  } else {
    correctAnswer = [...numbers].sort((a, b) => b - a)
  }
  
  // Generare opzioni errate
  const options: number[][] = []
  while (options.length < 3) {
    const shuffled = [...numbers].sort(() => Math.random() - 0.5)
    if (!options.some(opt => JSON.stringify(opt) === JSON.stringify(shuffled)) && 
        JSON.stringify(shuffled) !== JSON.stringify(correctAnswer)) {
      options.push(shuffled)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { numbers, order, correctAnswer, options }
}

export default function OrdinaNumeriClientIT() {
  const [currentProblem, setCurrentProblem] = useState<OrderProblem | null>(null)
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

  const checkAnswer = useCallback((answer: number[]) => {
    if (currentProblem && gameState === 'playing') {
      if (JSON.stringify(answer) === JSON.stringify(currentProblem.correctAnswer)) {
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
    if (finalScore <= 4) return { rank: 'Principiante dell&apos;Ordinamento', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 8) return { rank: 'Esperto dell&apos;Ordinamento', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 12) return { rank: 'Maestro dell&apos;Ordinamento', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio dell&apos;Ordinamento', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Ordina i Numeri"
      description="Ordina numeri in sequenza crescente o decrescente in tempo limitato. Sfida la tua agilità mentale e senso numerico!"
      introduction="Ti mostreremo numeri disordinati e dovrai scegliere l'ordinamento corretto. Hai 40 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/ordina-numeri"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ordina i Numeri!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo numeri disordinati e dovrai scegliere l&apos;ordinamento corretto. 
            Hai 40 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Ordina in modo {currentProblem.order === 'ascending' ? 'crescente' : 'decrescente'}:
            </h3>
            <div className="flex justify-center items-center gap-2 mb-6">
              {currentProblem.numbers.map((num, index) => (
                <div
                  key={index}
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-lg border-2 border-blue-400 bg-blue-50 text-blue-700"
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={feedback !== null}
                >
                  {option.join(' - ')}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutIT>
  )
}
