"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ComparisonProblem {
  number1: number
  number2: number
  correctAnswer: 'maior' | 'menor' | 'igual'
  question: string
}

const generateProblem = (): ComparisonProblem => {
  const number1 = Math.floor(Math.random() * 100) + 1
  const number2 = Math.floor(Math.random() * 100) + 1
  
  let correctAnswer: 'maior' | 'menor' | 'igual'
  let question: string
  
  if (number1 > number2) {
    correctAnswer = 'maior'
    question = `${number1} é ___ que ${number2}`
  } else if (number1 < number2) {
    correctAnswer = 'menor'
    question = `${number1} é ___ que ${number2}`
  } else {
    correctAnswer = 'igual'
    question = `${number1} é ___ que ${number2}`
  }
  
  return { number1, number2, correctAnswer, question }
}

export default function ComparacaoNumerosClientPT() {
  const [currentProblem, setCurrentProblem] = useState<ComparisonProblem | null>(null)
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

  const checkAnswer = useCallback((answer: 'maior' | 'menor' | 'igual') => {
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
      title="Comparação de Números"
      description="Compare números e determine qual é maior, menor ou igual. Desafie seu senso numérico e agilidade mental!"
      introduction="Você verá dois números e deve compará-los rapidamente. Escolha se o primeiro é maior, menor ou igual ao segundo! Tem 45 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/comparacao-numeros"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚖️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Comparação de Números!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá dois números e deve compará-los rapidamente. Escolha se o primeiro é maior, menor ou igual ao segundo! 
            Tem 45 segundos!
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
                onClick={() => checkAnswer('maior')}
                className="py-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                Maior
              </Button>
              <Button
                onClick={() => checkAnswer('menor')}
                className="py-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                Menor
              </Button>
              <Button
                onClick={() => checkAnswer('igual')}
                className="py-4 text-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-200"
                disabled={feedback !== null}
              >
                Igual
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutPT>
  )
}
