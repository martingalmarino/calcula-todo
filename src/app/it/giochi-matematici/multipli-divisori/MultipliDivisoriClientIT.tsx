"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MultiplesDivisorsProblem {
  number: number
  question: string
  correctAnswer: boolean
  options: boolean[]
}

const generateProblem = (): MultiplesDivisorsProblem => {
  const number = Math.floor(Math.random() * 50) + 2 // 2-51
  const questionType = Math.random() < 0.5 ? 'multiple' : 'divisor'
  
  let question: string
  let correctAnswer: boolean
  
  if (questionType === 'multiple') {
    const multiple = Math.floor(Math.random() * 10) + 2 // 2-11
    const isMultiple = number % multiple === 0
    question = `${number} è multiplo di ${multiple}?`
    correctAnswer = isMultiple
  } else {
    const divisor = Math.floor(Math.random() * 10) + 2 // 2-11
    const isDivisor = divisor % number === 0
    question = `${divisor} è divisibile per ${number}?`
    correctAnswer = isDivisor
  }
  
  // Generare opzioni (sempre Vero/Falso)
  const options = [true, false]
  
  return { number, question, correctAnswer, options }
}

export default function MultipliDivisoriClientIT() {
  const [currentProblem, setCurrentProblem] = useState<MultiplesDivisorsProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(45)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(45)
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

  const checkAnswer = useCallback((answer: boolean) => {
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
    if (finalScore <= 4) return { rank: 'Principiante dei Multipli', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 8) return { rank: 'Esperto dei Multipli', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 12) return { rank: 'Maestro dei Multipli', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio dei Multipli', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Sfida Multipli e Divisori"
      description="Identifica multipli e divisori in tempo limitato. Sfida la tua comprensione dei numeri e delle loro relazioni!"
      introduction="Ti mostreremo domande sui multipli e divisori. Devi rispondere Vero o Falso. Hai 45 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/multipli-divisori"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sfida Multipli e Divisori!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo domande sui multipli e divisori. 
            Devi rispondere Vero o Falso. Hai 45 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentProblem.question}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => checkAnswer(true)}
                className="w-full py-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                ✅ Vero
              </Button>
              <Button
                onClick={() => checkAnswer(false)}
                className="w-full py-4 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                ❌ Falso
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayout>
  )
}
