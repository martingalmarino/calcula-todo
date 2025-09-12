"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface OrderingProblem {
  numbers: number[]
  correctOrder: number[]
  options: number[][]
  orderType: 'crescente' | 'decrescente'
}

const generateProblem = (): OrderingProblem => {
  // Gerar 4 números aleatórios
  const numbers: number[] = []
  while (numbers.length < 4) {
    const num = Math.floor(Math.random() * 50) + 1
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  
  const orderType = Math.random() < 0.5 ? 'crescente' : 'decrescente'
  const correctOrder = [...numbers].sort((a, b) => 
    orderType === 'crescente' ? a - b : b - a
  )
  
  // Gerar opções erradas
  const options: number[][] = []
  while (options.length < 3) {
    const wrongOrder = [...numbers].sort(() => Math.random() - 0.5)
    if (!options.some(opt => JSON.stringify(opt) === JSON.stringify(wrongOrder)) && 
        JSON.stringify(wrongOrder) !== JSON.stringify(correctOrder)) {
      options.push(wrongOrder)
    }
  }
  
  options.push(correctOrder)
  options.sort(() => Math.random() - 0.5)
  
  return { numbers, correctOrder, options, orderType }
}

export default function OrdenaNumerosClientPT() {
  const [currentProblem, setCurrentProblem] = useState<OrderingProblem | null>(null)
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
      if (JSON.stringify(answer) === JSON.stringify(currentProblem.correctOrder)) {
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
      title="Ordene os Números"
      description="Ordene números em sequência crescente ou decrescente rapidamente. Desafie sua agilidade mental e senso numérico!"
      introduction="Você verá números desordenados e deve escolher a sequência correta (crescente ou decrescente). Tem 40 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/ordena-numeros"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ordene os Números!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá números desordenados e deve escolher a sequência correta (crescente ou decrescente). 
            Tem 40 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Ordene em sequência {currentProblem.orderType}:
            </h3>
            <div className="flex justify-center items-center gap-2 mb-6">
              {currentProblem.numbers.map((num, index) => (
                <div key={index} className="text-2xl font-bold text-blue-700 bg-blue-100 px-3 py-2 rounded">
                  {num}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200 flex justify-center items-center gap-2"
                  disabled={feedback !== null}
                >
                  {option.map((num, i) => (
                    <span key={i} className="bg-white text-blue-600 px-2 py-1 rounded">
                      {num}
                    </span>
                  ))}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutPT>
  )
}
