"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MixedOperationProblem {
  expression: string
  correctAnswer: number
  options: number[]
  level: number
}

const generateProblem = (level: number): MixedOperationProblem => {
  const operations = ['+', '-', '*', '/']
  const numOperations = Math.min(2 + Math.floor(level / 3), 4) // 2-4 operaciones
  
  let expression = ''
  let result = 0
  const currentValue = Math.floor(Math.random() * 20) + 1 // 1-20
  
  expression += currentValue.toString()
  result = currentValue
  
  for (let i = 0; i < numOperations; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)]
    let nextValue: number
    
    switch (operation) {
      case '+':
        nextValue = Math.floor(Math.random() * 15) + 1 // 1-15
        expression += ` + ${nextValue}`
        result += nextValue
        break
      case '-':
        nextValue = Math.floor(Math.random() * Math.min(result, 15)) + 1 // Asegurar resultado positivo
        expression += ` - ${nextValue}`
        result -= nextValue
        break
      case '*':
        nextValue = Math.floor(Math.random() * 8) + 2 // 2-9
        expression += ` × ${nextValue}`
        result *= nextValue
        break
      case '/':
        // Buscar un divisor que dé resultado entero
        const divisors = []
        for (let d = 2; d <= Math.min(result, 10); d++) {
          if (result % d === 0) divisors.push(d)
        }
        if (divisors.length > 0) {
          nextValue = divisors[Math.floor(Math.random() * divisors.length)]
          expression += ` ÷ ${nextValue}`
          result = Math.floor(result / nextValue)
        } else {
          // Si no hay divisores, usar suma
          nextValue = Math.floor(Math.random() * 10) + 1
          expression += ` + ${nextValue}`
          result += nextValue
        }
        break
    }
  }
  
  // Generar opciones incorrectas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10 // -10 a +9
    if (deviation === 0) deviation = 1 // Evitar duplicado exacto
    const wrongAnswer = Math.max(1, result + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== result) {
      options.push(wrongAnswer)
    }
  }
  
  // Agregar respuesta correcta y mezclar
  options.push(result)
  options.sort(() => Math.random() - 0.5)
  
  return {
    expression,
    correctAnswer: result,
    options,
    level
  }
}

export default function OperacionesMixtasClient() {
  const [currentProblem, setCurrentProblem] = useState<MixedOperationProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(35)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(35)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem(0))
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(35)
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
        setCurrentProblem(generateProblem(score + 1)) // Aumentar dificultad
        setFeedback(null)
      }, 700) // Breve pausa para mostrar feedback
    }
  }, [currentProblem, gameState, score])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 3) return { rank: 'Principiante de Operaciones', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Calculador Ágil', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 10) return { rank: 'Experto en Operaciones', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio de las Operaciones', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Operaciones Mixtas Rápidas"
      description="Resuelve operaciones mixtas de suma, resta, multiplicación y división en tiempo limitado. ¡Desafía tu agilidad mental!"
      introduction="Te mostraremos expresiones matemáticas con múltiples operaciones y tendrás que resolverlas mentalmente. ¡Tienes 35 segundos para resolver tantas como puedas!"
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
      currentGamePath="/juegos-matematicos/operaciones-mixtas"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Operaciones Mixtas Rápidas!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Te mostraremos expresiones matemáticas con múltiples operaciones (suma, resta, multiplicación y división) 
            y tendrás que resolverlas mentalmente. ¡Tienes 35 segundos para resolver tantas como puedas!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Resuelve esta expresión:
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-6 font-mono">
              {currentProblem.expression}
            </div>
            <p className="text-gray-600 mb-4">
              ¿Cuál es el resultado?
            </p>
          </CardContent>
        </Card>
      )}

      {gameState === 'playing' && currentProblem && (
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {currentProblem.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => checkAnswer(option)}
              className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
              disabled={feedback !== null}
            >
              {option.toLocaleString()}
            </Button>
          ))}
        </div>
      )}
    </GameLayout>
  )
}
