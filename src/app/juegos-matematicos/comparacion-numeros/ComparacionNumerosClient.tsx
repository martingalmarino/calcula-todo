"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ComparisonProblem {
  num1: number
  num2: number
  correctAnswer: 'mayor' | 'menor' | 'igual'
  options: ('mayor' | 'menor' | 'igual')[]
}

const generateProblem = (): ComparisonProblem => {
  const num1 = Math.floor(Math.random() * 200) + 1 // 1-200
  const num2 = Math.floor(Math.random() * 200) + 1 // 1-200
  
  let correctAnswer: 'mayor' | 'menor' | 'igual'
  if (num1 > num2) {
    correctAnswer = 'mayor'
  } else if (num1 < num2) {
    correctAnswer = 'menor'
  } else {
    correctAnswer = 'igual'
  }
  
  // Generar opciones (siempre incluir la correcta)
  const options: ('mayor' | 'menor' | 'igual')[] = [correctAnswer]
  
  // Agregar opciones incorrectas
  const allOptions: ('mayor' | 'menor' | 'igual')[] = ['mayor', 'menor', 'igual']
  const incorrectOptions = allOptions.filter(opt => opt !== correctAnswer)
  
  // Agregar 2 opciones incorrectas aleatorias
  while (options.length < 3) {
    const randomOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)]
    if (!options.includes(randomOption)) {
      options.push(randomOption)
    }
  }
  
  options.sort(() => Math.random() - 0.5) // Mezclar
  
  return { num1, num2, correctAnswer, options }
}

export default function ComparacionNumerosClient() {
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

  const checkAnswer = useCallback((answer: 'mayor' | 'menor' | 'igual') => {
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
    if (finalScore <= 4) return { rank: 'Principiante Comparador', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 8) return { rank: 'Comparador Ágil', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 12) return { rank: 'Experto en Comparaciones', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio de las Comparaciones', emoji: '🧠', color: 'text-red-600' }
  }

  const getAnswerText = (answer: 'mayor' | 'menor' | 'igual') => {
    switch (answer) {
      case 'mayor': return 'Mayor que'
      case 'menor': return 'Menor que'
      case 'igual': return 'Igual que'
    }
  }

  const getAnswerEmoji = (answer: 'mayor' | 'menor' | 'igual') => {
    switch (answer) {
      case 'mayor': return '>'
      case 'menor': return '<'
      case 'igual': return '='
    }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Comparación de Números"
      description="Compara números y determina cuál es mayor, menor o igual. ¡Desafía tu sentido numérico y agilidad mental!"
      introduction="Te mostraremos dos números y tendrás que determinar la relación entre ellos. ¡Tienes 45 segundos para resolver tantos como puedas!"
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
      currentGamePath="/juegos-matematicos/comparacion-numeros"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚖️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Comparación de Números!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Te mostraremos dos números y tendrás que determinar la relación entre ellos. ¡Tienes 45 segundos para resolver tantos como puedas!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Compara estos números:
            </h3>
            <div className="text-4xl font-bold text-blue-700 mb-6">
              {currentProblem.num1} ? {currentProblem.num2}
            </div>
            <p className="text-gray-600 mb-6">
              ¿Cuál es la relación entre {currentProblem.num1} y {currentProblem.num2}?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={feedback !== null}
                >
                  <span className="text-xl">{getAnswerEmoji(option)}</span>
                  {getAnswerText(option)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayout>
  )
}
