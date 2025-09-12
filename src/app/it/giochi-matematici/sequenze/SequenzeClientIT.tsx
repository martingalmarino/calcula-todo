"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SequenceProblem {
  sequence: number[]
  missingIndex: number
  correctAnswer: number
  options: number[]
  pattern: string
}

const generateProblem = (): SequenceProblem => {
  const patterns = [
    'arithmetic', // Sequenza aritmetica
    'geometric',  // Sequenza geometrica
    'square',     // Numeri quadrati
    'fibonacci'   // Sequenza di Fibonacci
  ]
  
  const pattern = patterns[Math.floor(Math.random() * patterns.length)]
  let sequence: number[] = []
  let correctAnswer: number = 0
  
  switch (pattern) {
    case 'arithmetic':
      const start = Math.floor(Math.random() * 10) + 1
      const diff = Math.floor(Math.random() * 5) + 1
      sequence = [start, start + diff, start + 2*diff, start + 3*diff, start + 4*diff]
      correctAnswer = start + 5*diff
      break
      
    case 'geometric':
      const startGeo = Math.floor(Math.random() * 5) + 1
      const ratio = Math.floor(Math.random() * 3) + 2
      sequence = [startGeo, startGeo * ratio, startGeo * ratio * ratio, startGeo * ratio * ratio * ratio]
      correctAnswer = startGeo * ratio * ratio * ratio * ratio
      break
      
    case 'square':
      const startSquare = Math.floor(Math.random() * 5) + 1
      sequence = [startSquare*startSquare, (startSquare+1)*(startSquare+1), (startSquare+2)*(startSquare+2), (startSquare+3)*(startSquare+3)]
      correctAnswer = (startSquare+4)*(startSquare+4)
      break
      
    case 'fibonacci':
      sequence = [1, 1, 2, 3, 5]
      correctAnswer = 8
      break
  }
  
  // Scegliere una posizione casuale per il numero mancante
  const missingIndex = Math.floor(Math.random() * sequence.length)
  const missingNumber = sequence[missingIndex]
  sequence[missingIndex] = 0 // Sostituire con 0 per indicare il numero mancante
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, missingNumber + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== missingNumber) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(missingNumber)
  options.sort(() => Math.random() - 0.5)
  
  return {
    sequence,
    missingIndex,
    correctAnswer: missingNumber,
    options,
    pattern
  }
}

export default function SequenzeClientIT() {
  const [currentProblem, setCurrentProblem] = useState<SequenceProblem | null>(null)
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
      }, 700)
    }
  }, [currentProblem, gameState])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 3) return { rank: 'Principiante delle Sequenze', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Esperto delle Sequenze', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Maestro delle Sequenze', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio delle Sequenze', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Sequenze Numeriche"
      description="Completa sequenze numeriche e trova il pattern. Sfida la tua logica e capacità di riconoscimento dei pattern!"
      introduction="Ti mostreremo una sequenza di numeri con un numero mancante. Trova il pattern e indovina il numero mancante. Hai 45 secondi!"
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
      currentGamePath="/it/giochi-matematici/sequenze"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sequenze Numeriche!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo una sequenza di numeri con un numero mancante. 
            Trova il pattern e indovina il numero mancante. Hai 45 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Trova il numero mancante:
            </h3>
            <div className="flex justify-center items-center gap-4 mb-6">
              {currentProblem.sequence.map((num, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${
                    num === 0 
                      ? 'border-dashed border-red-400 bg-red-50 text-red-500' 
                      : 'border-blue-400 bg-blue-50 text-blue-700'
                  }`}
                >
                  {num === 0 ? '?' : num}
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
    </GameLayout>
  )
}
