"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface NumberOrderProblem {
  numbers: number[]
  correctOrder: number[]
  orderType: 'ascendente' | 'descendente'
}

const generateProblem = (): NumberOrderProblem => {
  // Generar 5 números aleatorios entre 1 y 100
  const numbers: number[] = []
  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 100) + 1
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  
  // Decidir si ordenar ascendente o descendente
  const orderType = Math.random() < 0.5 ? 'ascendente' : 'descendente'
  
  // Crear el orden correcto
  const correctOrder = [...numbers].sort((a, b) => 
    orderType === 'ascendente' ? a - b : b - a
  )
  
  return {
    numbers: [...numbers], // Copia desordenada
    correctOrder,
    orderType
  }
}

export default function OrdenaNumerosClient() {
  const [currentProblem, setCurrentProblem] = useState<NumberOrderProblem | null>(null)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([])
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
    const newProblem = generateProblem()
    setCurrentProblem(newProblem)
    setAvailableNumbers([...newProblem.numbers])
    setSelectedNumbers([])
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(40)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(null)
    setSelectedNumbers([])
    setAvailableNumbers([])
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

  const selectNumber = useCallback((number: number) => {
    if (gameState !== 'playing' || feedback !== null) return
    
    setSelectedNumbers(prev => [...prev, number])
    setAvailableNumbers(prev => prev.filter(n => n !== number))
  }, [gameState, feedback])

  const removeNumber = useCallback((number: number) => {
    if (gameState !== 'playing' || feedback !== null) return
    
    setSelectedNumbers(prev => prev.filter(n => n !== number))
    setAvailableNumbers(prev => [...prev, number])
  }, [gameState, feedback])

  const checkAnswer = useCallback(() => {
    if (!currentProblem || gameState !== 'playing' || feedback !== null) return
    
    const isCorrect = JSON.stringify(selectedNumbers) === JSON.stringify(currentProblem.correctOrder)
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }
    
    setProblemsSolved(prev => prev + 1)
    
    setTimeout(() => {
      const newProblem = generateProblem()
      setCurrentProblem(newProblem)
      setAvailableNumbers([...newProblem.numbers])
      setSelectedNumbers([])
      setFeedback(null)
    }, 1000)
  }, [currentProblem, gameState, feedback, selectedNumbers])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 2) return { rank: 'Principiante Ordenador', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 5) return { rank: 'Ordenador Ágil', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 8) return { rank: 'Experto en Secuencias', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio del Ordenamiento', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Ordena los Números"
      description="Ordena números en secuencia ascendente o descendente en tiempo limitado. ¡Desafía tu agilidad mental y sentido numérico!"
      introduction="Te mostraremos números desordenados y tendrás que ordenarlos en secuencia ascendente o descendente. ¡Tienes 40 segundos!"
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
      currentGamePath="/juegos-matematicos/ordena-numeros"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Ordena los Números!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Te mostraremos números desordenados y tendrás que ordenarlos en secuencia ascendente o descendente. 
            ¡Tienes 40 segundos para resolver tantos como puedas!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Ordena los números en secuencia{' '}
                <span className={`font-bold ${currentProblem.orderType === 'ascendente' ? 'text-green-600' : 'text-red-600'}`}>
                  {currentProblem.orderType}
                </span>
              </h3>
              
              {/* Números seleccionados (orden actual) */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Tu orden actual:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {selectedNumbers.map((number, index) => (
                    <Button
                      key={`selected-${number}-${index}`}
                      onClick={() => removeNumber(number)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                    >
                      {number}
                    </Button>
                  ))}
                  {selectedNumbers.length === 0 && (
                    <div className="text-gray-400 text-sm py-2">
                      Haz clic en los números para ordenarlos
                    </div>
                  )}
                </div>
              </div>

              {/* Números disponibles */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Números disponibles:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {availableNumbers.map((number, index) => (
                    <Button
                      key={`available-${number}-${index}`}
                      onClick={() => selectNumber(number)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-lg px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                    >
                      {number}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Botón de verificar */}
              {selectedNumbers.length === 5 && (
                <div className="mt-6">
                  <Button
                    onClick={checkAnswer}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-md transition-all duration-200"
                    disabled={feedback !== null}
                  >
                    Verificar Orden
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </GameLayout>
  )
}
