"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface StepByStepProblem {
  steps: string[]
  correctAnswer: number
  options: number[]
}

const generateProblem = (): StepByStepProblem => {
  const operations = ['+', '-', '×', '÷']
  const numSteps = Math.floor(Math.random() * 3) + 2 // 2-4 steps
  
  let currentValue = Math.floor(Math.random() * 20) + 1
  const steps: string[] = [`Começamos com: ${currentValue}`]
  
  for (let i = 0; i < numSteps; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)]
    let operand: number
    let newValue: number
    
    if (operation === '+') {
      operand = Math.floor(Math.random() * 15) + 1
      newValue = currentValue + operand
      steps.push(`${currentValue} + ${operand} = ${newValue}`)
    } else if (operation === '-') {
      operand = Math.floor(Math.random() * Math.min(currentValue - 1, 10)) + 1
      newValue = currentValue - operand
      steps.push(`${currentValue} - ${operand} = ${newValue}`)
    } else if (operation === '×') {
      operand = Math.floor(Math.random() * 5) + 2
      newValue = currentValue * operand
      steps.push(`${currentValue} × ${operand} = ${newValue}`)
    } else {
      operand = Math.floor(Math.random() * 3) + 2
      newValue = Math.round(currentValue / operand)
      steps.push(`${currentValue} ÷ ${operand} = ${newValue}`)
    }
    
    currentValue = newValue
  }
  
  // Gerar opções erradas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, currentValue + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== currentValue) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(currentValue)
  options.sort(() => Math.random() - 0.5)
  
  return { steps, correctAnswer: currentValue, options }
}

export default function AdivinhaResultadoClientPT() {
  const [currentProblem, setCurrentProblem] = useState<StepByStepProblem | null>(null)
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
    if (finalScore <= 3) return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Rápido', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Especialista', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Gênio', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutPT
      title="Adivinhe o Resultado"
      description="Observe operações passo a passo e adivinhe o resultado final. Desafie sua capacidade de acompanhamento matemático!"
      introduction="Você verá operações matemáticas passo a passo e deve acompanhar o resultado final. Tem 40 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/adivinha-resultado"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Adivinhe o Resultado!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá operações matemáticas passo a passo e deve acompanhar o resultado final. 
            Tem 40 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Acompanhe as operações:
            </h3>
            <div className="space-y-2 mb-6 text-left">
              {currentProblem.steps.map((step, index) => (
                <div key={index} className="text-lg text-gray-700 bg-gray-50 p-2 rounded">
                  {step}
                </div>
              ))}
            </div>
            <div className="text-xl font-bold text-blue-700 mb-4">
              Qual é o resultado final?
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
