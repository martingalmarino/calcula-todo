"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MemorySequence {
  operations: string[]
  correctSequence: string[]
  level: number
}

const generateSequence = (level: number): MemorySequence => {
  const operations: string[] = []
  const correctSequence: string[] = []
  
  // Generar secuencia basada en el nivel
  const sequenceLength = Math.min(3 + level, 6) // 3-6 operaciones
  
  for (let i = 0; i < sequenceLength; i++) {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operation = Math.random() < 0.5 ? '+' : '-'
    
    let result: number
    let operationText: string
    
    if (operation === '+') {
      result = num1 + num2
      operationText = `${num1} + ${num2} = ${result}`
    } else {
      // Asegurar que el resultado sea positivo
      const maxNum = Math.max(num1, num2)
      const minNum = Math.min(num1, num2)
      result = maxNum - minNum
      operationText = `${maxNum} - ${minNum} = ${result}`
    }
    
    operations.push(operationText)
    correctSequence.push(operationText)
  }
  
  return {
    operations,
    correctSequence,
    level
  }
}

export default function MemoriaMatematicaClient() {
  const [currentSequence, setCurrentSequence] = useState<MemorySequence | null>(null)
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [availableOperations, setAvailableOperations] = useState<string[]>([])
  const [gamePhase, setGamePhase] = useState<'showing' | 'memorizing' | 'recalling'>('showing')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(50)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)
  const [showTimer, setShowTimer] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(50)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setUserSequence([])
    setAvailableOperations([])
    setGamePhase('showing')
    setShowTimer(0)
    const newSequence = generateSequence(0)
    setCurrentSequence(newSequence)
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(50)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentSequence(null)
    setUserSequence([])
    setAvailableOperations([])
    setGamePhase('showing')
    setShowTimer(0)
  }, [])

  // Timer principal del juego
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

  // Timer para mostrar secuencia
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (gamePhase === 'showing' && showTimer < 3) {
      timer = setInterval(() => {
        setShowTimer(prev => prev + 1)
      }, 1000)
    } else if (showTimer >= 3 && gamePhase === 'showing') {
      setGamePhase('memorizing')
      setShowTimer(0)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [gamePhase, showTimer])

  // Timer para memorizar
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (gamePhase === 'memorizing' && showTimer < 2) {
      timer = setInterval(() => {
        setShowTimer(prev => prev + 1)
      }, 1000)
    } else if (showTimer >= 2 && gamePhase === 'memorizing') {
      setGamePhase('recalling')
      setShowTimer(0)
      // Mezclar las operaciones para que el usuario las ordene
      if (currentSequence) {
        const shuffled = [...currentSequence.operations].sort(() => Math.random() - 0.5)
        setAvailableOperations(shuffled)
      }
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [gamePhase, showTimer, currentSequence])

  const selectOperation = useCallback((operation: string) => {
    if (gamePhase !== 'recalling' || feedback !== null) return
    
    setUserSequence(prev => [...prev, operation])
    setAvailableOperations(prev => prev.filter(op => op !== operation))
  }, [gamePhase, feedback])

  const removeOperation = useCallback((operation: string) => {
    if (gamePhase !== 'recalling' || feedback !== null) return
    
    setUserSequence(prev => prev.filter(op => op !== operation))
    setAvailableOperations(prev => [...prev, operation])
  }, [gamePhase, feedback])

  const checkAnswer = useCallback(() => {
    if (!currentSequence || gamePhase !== 'recalling' || feedback !== null) return
    
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(currentSequence.correctSequence)
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }
    
    setProblemsSolved(prev => prev + 1)
    
    setTimeout(() => {
      const newSequence = generateSequence(score + 1) // Aumentar dificultad
      setCurrentSequence(newSequence)
      setUserSequence([])
      setAvailableOperations([])
      setGamePhase('showing')
      setShowTimer(0)
      setFeedback(null)
    }, 1500)
  }, [currentSequence, gamePhase, feedback, userSequence, score])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 2) return { rank: 'Principiante de Memoria', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 4) return { rank: 'Memoria Ágil', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 7) return { rank: 'Experto en Secuencias', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio de la Memoria', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Memoria Matemática"
      description="Recuerda secuencias de operaciones matemáticas y repítelas correctamente. ¡Desafía tu memoria y concentración!"
      introduction="Te mostraremos una secuencia de operaciones matemáticas por 3 segundos, luego tendrás que recordarlas y repetirlas en el orden correcto. ¡Tienes 50 segundos!"
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
      currentGamePath="/juegos-matematicos/memoria-matematica"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Entrena tu Memoria Matemática!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Te mostraremos una secuencia de operaciones matemáticas por 3 segundos, 
            luego tendrás que recordarlas y repetirlas en el orden correcto. 
            ¡Tienes 50 segundos para resolver tantos como puedas!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentSequence && (
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              {gamePhase === 'showing' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Observa la secuencia ({3 - showTimer}s)
                  </h3>
                  <div className="space-y-2">
                    {currentSequence.operations.map((operation, index) => (
                      <div key={index} className="text-lg font-mono bg-blue-100 p-2 rounded">
                        {operation}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gamePhase === 'memorizing' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Memoriza... ({2 - showTimer}s)
                  </h3>
                  <div className="text-4xl text-gray-400">🤔</div>
                </div>
              )}

              {gamePhase === 'recalling' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Repite la secuencia en orden:
                  </h3>
                  
                  {/* Secuencia del usuario */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Tu secuencia:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {userSequence.map((operation, index) => (
                        <Button
                          key={`selected-${index}`}
                          onClick={() => removeOperation(operation)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm px-3 py-2 rounded-lg shadow-md transition-all duration-200"
                        >
                          {operation}
                        </Button>
                      ))}
                      {userSequence.length === 0 && (
                        <div className="text-gray-400 text-sm py-2">
                          Haz clic en las operaciones para ordenarlas
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Operaciones disponibles */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Operaciones disponibles:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {availableOperations.map((operation, index) => (
                        <Button
                          key={`available-${index}`}
                          onClick={() => selectOperation(operation)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-mono text-sm px-3 py-2 rounded-lg shadow-md transition-all duration-200"
                        >
                          {operation}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Botón de verificar */}
                  {userSequence.length === currentSequence.operations.length && (
                    <div className="mt-6">
                      <Button
                        onClick={checkAnswer}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-md transition-all duration-200"
                        disabled={feedback !== null}
                      >
                        Verificar Secuencia
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </GameLayout>
  )
}
