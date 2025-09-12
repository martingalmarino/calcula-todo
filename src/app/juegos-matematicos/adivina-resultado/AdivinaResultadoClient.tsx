"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Step {
  operation: string
  result: number
  description: string
}

interface GuessProblem {
  steps: Step[]
  finalResult: number
  options: number[]
  level: number
}

const generateProblem = (level: number): GuessProblem => {
  const numSteps = Math.min(3 + Math.floor(level / 2), 5) // 3-5 pasos
  const steps: Step[] = []
  let currentValue = Math.floor(Math.random() * 20) + 1 // 1-20
  
  // Primer paso
  const firstOp = Math.floor(Math.random() * 4)
  let nextValue: number
  let operation: string
  let result: number
  let description: string
  
  switch (firstOp) {
    case 0: // Suma
      nextValue = Math.floor(Math.random() * 15) + 1
      operation = `${currentValue} + ${nextValue}`
      result = currentValue + nextValue
      description = `Sumamos ${nextValue} a ${currentValue}`
      break
    case 1: // Resta
      nextValue = Math.floor(Math.random() * Math.min(currentValue - 1, 10)) + 1
      operation = `${currentValue} - ${nextValue}`
      result = currentValue - nextValue
      description = `Restamos ${nextValue} de ${currentValue}`
      break
    case 2: // Multiplicación
      nextValue = Math.floor(Math.random() * 8) + 2
      operation = `${currentValue} × ${nextValue}`
      result = currentValue * nextValue
      description = `Multiplicamos ${currentValue} por ${nextValue}`
      break
    case 3: // División
      const divisors = []
      for (let d = 2; d <= Math.min(currentValue, 10); d++) {
        if (currentValue % d === 0) divisors.push(d)
      }
      if (divisors.length > 0) {
        nextValue = divisors[Math.floor(Math.random() * divisors.length)]
        operation = `${currentValue} ÷ ${nextValue}`
        result = Math.floor(currentValue / nextValue)
        description = `Dividimos ${currentValue} entre ${nextValue}`
      } else {
        // Si no hay divisores, usar suma
        nextValue = Math.floor(Math.random() * 10) + 1
        operation = `${currentValue} + ${nextValue}`
        result = currentValue + nextValue
        description = `Sumamos ${nextValue} a ${currentValue}`
      }
      break
    default:
      nextValue = Math.floor(Math.random() * 10) + 1
      operation = `${currentValue} + ${nextValue}`
      result = currentValue + nextValue
      description = `Sumamos ${nextValue} a ${currentValue}`
  }
  
  steps.push({ operation, result, description })
  currentValue = result
  
  // Pasos adicionales
  for (let i = 1; i < numSteps; i++) {
    const op = Math.floor(Math.random() * 4)
    
    switch (op) {
      case 0: // Suma
        nextValue = Math.floor(Math.random() * 15) + 1
        operation = `${currentValue} + ${nextValue}`
        result = currentValue + nextValue
        description = `Sumamos ${nextValue} al resultado anterior`
        break
      case 1: // Resta
        nextValue = Math.floor(Math.random() * Math.min(currentValue - 1, 15)) + 1
        operation = `${currentValue} - ${nextValue}`
        result = currentValue - nextValue
        description = `Restamos ${nextValue} del resultado anterior`
        break
      case 2: // Multiplicación
        nextValue = Math.floor(Math.random() * 6) + 2
        operation = `${currentValue} × ${nextValue}`
        result = currentValue * nextValue
        description = `Multiplicamos el resultado anterior por ${nextValue}`
        break
      case 3: // División
        const divisors = []
        for (let d = 2; d <= Math.min(currentValue, 8); d++) {
          if (currentValue % d === 0) divisors.push(d)
        }
        if (divisors.length > 0) {
          nextValue = divisors[Math.floor(Math.random() * divisors.length)]
          operation = `${currentValue} ÷ ${nextValue}`
          result = Math.floor(currentValue / nextValue)
          description = `Dividimos el resultado anterior entre ${nextValue}`
        } else {
          // Si no hay divisores, usar suma
          nextValue = Math.floor(Math.random() * 8) + 1
          operation = `${currentValue} + ${nextValue}`
          result = currentValue + nextValue
          description = `Sumamos ${nextValue} al resultado anterior`
        }
        break
      default:
        nextValue = Math.floor(Math.random() * 8) + 1
        operation = `${currentValue} + ${nextValue}`
        result = currentValue + nextValue
        description = `Sumamos ${nextValue} al resultado anterior`
    }
    
    steps.push({ operation, result, description })
    currentValue = result
  }
  
  // Generar opciones incorrectas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 30) - 15 // -15 a +14
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
    steps,
    finalResult: result,
    options,
    level
  }
}

export default function AdivinaResultadoClient() {
  const [currentProblem, setCurrentProblem] = useState<GuessProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(40)
  const [gameState, setGameState] = useState<'waiting' | 'showing' | 'guessing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showSteps, setShowSteps] = useState(false)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(40)
    setGameState('showing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentStep(0)
    setShowSteps(false)
    setCurrentProblem(generateProblem(0))
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(40)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(null)
    setCurrentStep(0)
    setShowSteps(false)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (gameState === 'guessing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'guessing') {
      setGameState('finished')
      if (timer) clearInterval(timer)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeLeft, gameState])

  useEffect(() => {
    let stepTimer: NodeJS.Timeout | undefined
    if (gameState === 'showing' && currentProblem) {
      stepTimer = setTimeout(() => {
        setShowSteps(true)
        // Mostrar pasos uno por uno
        const stepInterval = setInterval(() => {
          setCurrentStep((prev) => {
            if (prev < currentProblem.steps.length - 1) {
              return prev + 1
            } else {
              clearInterval(stepInterval)
              setGameState('guessing')
              return prev
            }
          })
        }, 1500) // 1.5 segundos por paso
      }, 1000) // Esperar 1 segundo antes de empezar
    }
    return () => {
      if (stepTimer) clearTimeout(stepTimer)
    }
  }, [gameState, currentProblem])

  const checkAnswer = useCallback((answer: number) => {
    if (currentProblem && gameState === 'guessing') {
      if (answer === currentProblem.finalResult) {
        setScore((prevScore) => prevScore + 1)
        setFeedback('correct')
      } else {
        setFeedback('incorrect')
      }
      setProblemsSolved((prev) => prev + 1)
      setTimeout(() => {
        setCurrentProblem(generateProblem(score + 1)) // Aumentar dificultad
        setCurrentStep(0)
        setShowSteps(false)
        setFeedback(null)
        setGameState('showing') // Volver a mostrar pasos
      }, 700) // Breve pausa para mostrar feedback
    }
  }, [currentProblem, gameState, score])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 2) return { rank: 'Principiante Adivinador', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 4) return { rank: 'Adivinador Ágil', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 7) return { rank: 'Experto en Seguimiento', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio de la Adivinación', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Adivina el Resultado"
      description="Observa operaciones paso a paso y adivina el resultado final. ¡Desafía tu capacidad de seguimiento matemático!"
      introduction="Te mostraremos una serie de operaciones matemáticas paso a paso. Observa cada paso y luego adivina cuál será el resultado final. ¡Tienes 40 segundos!"
      timeLeft={timeLeft}
      score={score}
      onStart={startGame}
      onReset={resetGame}
      isActive={gameState === 'guessing'}
      feedback={feedback}
      gameResult={gameState === 'finished' ? {
        points: score,
        rank: rankInfo.rank,
        emoji: rankInfo.emoji
      } : null}
      showIntroduction={gameState === 'waiting'}
      currentQuestion={problemsSolved + 1}
      totalQuestions={problemsSolved + 1}
      currentGamePath="/juegos-matematicos/adivina-resultado"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Adivina el Resultado!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Te mostraremos una serie de operaciones matemáticas paso a paso. Observa cada paso y luego adivina cuál será el resultado final. ¡Tienes 40 segundos para resolver tantos como puedas!
          </p>
        </div>
      )}

      {(gameState === 'showing' || gameState === 'guessing') && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {gameState === 'showing' ? 'Observa los pasos:' : '¿Cuál es el resultado final?'}
            </h3>
            
            <div className="space-y-3 mb-6">
              {currentProblem.steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                    showSteps && index <= currentStep
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-mono text-blue-700 mb-1">
                    {step.operation} = {step.result}
                  </div>
                  <div className="text-sm text-gray-600">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
            
            {gameState === 'showing' && (
              <div className="text-center">
                <div className="animate-pulse text-blue-600 font-semibold">
                  {currentStep < currentProblem.steps.length - 1 ? 'Siguiente paso...' : '¡Ahora adivina!'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {gameState === 'guessing' && currentProblem && (
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
