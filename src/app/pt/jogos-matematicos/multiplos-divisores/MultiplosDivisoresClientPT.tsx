"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MultiplesDivisorsProblem {
  number: number
  question: string
  correctAnswer: 'múltiplo' | 'divisor' | 'nenhum'
  options: number[]
}

const generateProblem = (): MultiplesDivisorsProblem => {
  const baseNumber = Math.floor(Math.random() * 10) + 2
  const targetNumber = Math.floor(Math.random() * 50) + 1
  
  let question: string
  let correctAnswer: 'múltiplo' | 'divisor' | 'nenhum'
  
  const isMultiple = targetNumber % baseNumber === 0
  const isDivisor = baseNumber % targetNumber === 0
  
  if (isMultiple) {
    question = `${targetNumber} é múltiplo de ${baseNumber}?`
    correctAnswer = 'múltiplo'
  } else if (isDivisor) {
    question = `${targetNumber} é divisor de ${baseNumber}?`
    correctAnswer = 'divisor'
  } else {
    question = `${targetNumber} é múltiplo ou divisor de ${baseNumber}?`
    correctAnswer = 'nenhum'
  }
  
  return { number: targetNumber, question, correctAnswer, options: [] }
}

export default function MultiplosDivisoresClientPT() {
  const [currentProblem, setCurrentProblem] = useState<MultiplesDivisorsProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(30)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(30)
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

  const checkAnswer = useCallback((answer: 'múltiplo' | 'divisor' | 'nenhum') => {
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
    if (finalScore <= 3) return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Rápido', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Especialista', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Gênio', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutPT
      title="Desafio de Múltiplos e Divisores"
      description="Identifique múltiplos e divisores rapidamente. Filtre números por suas propriedades!"
      introduction="Você verá números e deve identificar se são múltiplos, divisores ou nenhum dos dois. Tem 30 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/multiplos-divisores"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Desafio de Múltiplos e Divisores!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá números e deve identificar se são múltiplos, divisores ou nenhum dos dois. 
            Tem 30 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentProblem.question}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={() => checkAnswer('múltiplo')}
                className="py-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                Múltiplo
              </Button>
              <Button
                onClick={() => checkAnswer('divisor')}
                className="py-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                Divisor
              </Button>
              <Button
                onClick={() => checkAnswer('nenhum')}
                className="py-4 text-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                Nenhum dos dois
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutPT>
  )
}
