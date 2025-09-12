"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MemoryProblem {
  sequence: string[]
  correctAnswer: string[]
  options: string[][]
}

const generateProblem = (): MemoryProblem => {
  const operations = ['+', '-', '×', '÷']
  const sequence: string[] = []
  
  // Generare sequenza di 4 operazioni
  for (let i = 0; i < 4; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)]
    sequence.push(operation)
  }
  
  // Generare opzioni errate
  const options: string[][] = []
  while (options.length < 3) {
    const shuffled = [...sequence].sort(() => Math.random() - 0.5)
    if (!options.some(opt => JSON.stringify(opt) === JSON.stringify(shuffled)) && 
        JSON.stringify(shuffled) !== JSON.stringify(sequence)) {
      options.push(shuffled)
    }
  }
  
  options.push(sequence)
  options.sort(() => Math.random() - 0.5)
  
  return { sequence, correctAnswer: sequence, options }
}

export default function MemoriaMatematicaClientIT() {
  const [currentProblem, setCurrentProblem] = useState<MemoryProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(50)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)
  const [showSequence, setShowSequence] = useState(false)
  const [sequenceTimer, setSequenceTimer] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(50)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
    setShowSequence(true)
    setSequenceTimer(3)
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(50)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(null)
    setShowSequence(false)
    setSequenceTimer(0)
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

  useEffect(() => {
    let sequenceTimerInterval: NodeJS.Timeout | undefined
    if (showSequence && sequenceTimer > 0) {
      sequenceTimerInterval = setInterval(() => {
        setSequenceTimer((prev) => prev - 1)
      }, 1000)
    } else if (sequenceTimer === 0 && showSequence) {
      setShowSequence(false)
    }
    return () => {
      if (sequenceTimerInterval) clearInterval(sequenceTimerInterval)
    }
  }, [showSequence, sequenceTimer])

  const checkAnswer = useCallback((answer: string[]) => {
    if (currentProblem && gameState === 'playing' && !showSequence) {
      if (JSON.stringify(answer) === JSON.stringify(currentProblem.correctAnswer)) {
        setScore((prevScore) => prevScore + 1)
        setFeedback('correct')
      } else {
        setFeedback('incorrect')
      }
      setProblemsSolved((prev) => prev + 1)
      setTimeout(() => {
        setCurrentProblem(generateProblem())
        setFeedback(null)
        setShowSequence(true)
        setSequenceTimer(3)
      }, 700)
    }
  }, [currentProblem, gameState, showSequence])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 3) return { rank: 'Principiante della Memoria', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Esperto della Memoria', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Maestro della Memoria', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio della Memoria', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Memoria Matematica"
      description="Ricorda sequenze di operazioni matematiche e ripetile correttamente. Sfida la tua memoria e concentrazione!"
      introduction="Ti mostreremo una sequenza di operazioni matematiche per 3 secondi. Devi ricordarla e scegliere l'ordine corretto. Hai 50 secondi!"
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
      currentGamePath="/it/giochi-matematici/memoria-matematica"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Memoria Matematica!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo una sequenza di operazioni matematiche per 3 secondi. 
            Devi ricordarla e scegliere l&apos;ordine corretto. Hai 50 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            {showSequence ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Ricorda questa sequenza:
                </h3>
                <div className="flex justify-center items-center gap-4 mb-6">
                  {currentProblem.sequence.map((op, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-blue-400 bg-blue-50 text-blue-700"
                    >
                      {op}
                    </div>
                  ))}
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {sequenceTimer}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Scegli l&apos;ordine corretto:
                </h3>
                <div className="space-y-3">
                  {currentProblem.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => checkAnswer(option)}
                      className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                      disabled={feedback !== null}
                    >
                      {option.join(' - ')}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </GameLayout>
  )
}
