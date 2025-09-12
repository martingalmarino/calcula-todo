"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface FractionProblem {
  pizza: string[]
  correctAnswer: string
  options: string[]
}

const generateProblem = (): FractionProblem => {
  const fractions = [
    { pizza: ['🍕', '🍕', '🍕', '🍕'], answer: '1/4' },
    { pizza: ['🍕', '🍕', '🍕', '🍕'], answer: '2/4' },
    { pizza: ['🍕', '🍕', '🍕', '🍕'], answer: '3/4' },
    { pizza: ['🍕', '🍕', '🍕', '🍕'], answer: '4/4' },
    { pizza: ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'], answer: '1/6' },
    { pizza: ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'], answer: '2/6' },
    { pizza: ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'], answer: '3/6' },
    { pizza: ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'], answer: '4/6' },
    { pizza: ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'], answer: '5/6' },
    { pizza: ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'], answer: '6/6' }
  ]
  
  const selectedFraction = fractions[Math.floor(Math.random() * fractions.length)]
  
  // Criar pizza visual
  const pizza: string[] = []
  const totalSlices = selectedFraction.pizza.length
  const numerator = parseInt(selectedFraction.answer.split('/')[0])
  
  for (let i = 0; i < totalSlices; i++) {
    if (i < numerator) {
      pizza.push('🍕')
    } else {
      pizza.push('⚪')
    }
  }
  
  // Gerar opções erradas
  const options: string[] = []
  const wrongOptions = ['1/4', '2/4', '3/4', '4/4', '1/6', '2/6', '3/6', '4/6', '5/6', '6/6']
  
  while (options.length < 3) {
    const randomOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
    if (!options.includes(randomOption) && randomOption !== selectedFraction.answer) {
      options.push(randomOption)
    }
  }
  
  options.push(selectedFraction.answer)
  options.sort(() => Math.random() - 0.5)
  
  return {
    pizza,
    correctAnswer: selectedFraction.answer,
    options
  }
}

export default function FracoesClientPT() {
  const [currentProblem, setCurrentProblem] = useState<FractionProblem | null>(null)
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

  const checkAnswer = useCallback((answer: string) => {
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
      title="Quebra-cabeça de Frações"
      description="Identifique frações visuais com pizzas divididas. Aprenda frações de forma visual!"
      introduction="Você verá pizzas divididas e deve identificar qual fração representa a parte colorida. Tem 30 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/fracoes"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🍕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quebra-cabeça de Frações!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá pizzas divididas e deve identificar qual fração representa a parte colorida. 
            Tem 30 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Qual fração representa a parte colorida?
            </h3>
            <div className="flex justify-center items-center gap-2 mb-6">
              {currentProblem.pizza.map((slice, index) => (
                <div
                  key={index}
                  className="text-3xl"
                >
                  {slice}
                </div>
              ))}
            </div>
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
    </GameLayoutPT>
  )
}
