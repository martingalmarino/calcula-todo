"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MultiplicationProblem {
  multiplicand: number
  multiplier: number
  correctAnswer: number
  options: number[]
}

const generateProblem = (): MultiplicationProblem => {
  // Generar multiplicaciones de 2-3 dígitos
  const multiplicand = Math.floor(Math.random() * 90) + 10 // 10-99
  const multiplier = Math.floor(Math.random() * 90) + 10 // 10-99
  
  const correctAnswer = multiplicand * multiplier
  
  // Generar opciones incorrectas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10 // -10 a +9
    if (deviation === 0) deviation = 1 // Evitar duplicado exacto
    const wrongAnswer = Math.max(1, correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  // Agregar respuesta correcta y mezclar
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return {
    multiplicand,
    multiplier,
    correctAnswer,
    options
  }
}

export default function MultiplicacionesClient() {
  const [currentProblem, setCurrentProblem] = useState<MultiplicationProblem | null>(null)
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
      }, 700) // Breve pausa para mostrar feedback
    }
  }, [currentProblem, gameState])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 3) return { rank: 'Principiante Multiplicador', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 7) return { rank: 'Multiplicador Ágil', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 12) return { rank: 'Experto en Multiplicaciones', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio de las Multiplicaciones', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Calculadora Mental de Multiplicaciones"
      description="Practica multiplicaciones de 2-3 dígitos en tiempo limitado. ¡Desafía tu agilidad mental y mejora tu cálculo mental!"
      introduction="Te mostraremos multiplicaciones de 2-3 dígitos y tendrás que resolverlas mentalmente. ¡Tienes 45 segundos para resolver tantas como puedas!"
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
      currentGamePath="/juegos-matematicos/multiplicaciones"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧮</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Multiplica Mentalmente!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Te mostraremos multiplicaciones de 2-3 dígitos y tendrás que resolverlas mentalmente. 
            ¡Tienes 45 segundos para resolver tantas como puedas!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Resuelve esta multiplicación:
            </h3>
            <div className="text-4xl font-bold text-blue-600 mb-6">
              {currentProblem.multiplicand} × {currentProblem.multiplier}
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
