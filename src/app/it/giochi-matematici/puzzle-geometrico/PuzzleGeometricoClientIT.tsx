"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface GeometryProblem {
  question: string
  correctAnswer: number
  options: number[]
  shape: string
}

const generateProblem = (): GeometryProblem => {
  const problems = [
    {
      question: 'Qual è l\'area di un quadrato con lato 5?',
      correctAnswer: 25,
      shape: '⬜'
    },
    {
      question: 'Qual è il perimetro di un quadrato con lato 4?',
      correctAnswer: 16,
      shape: '⬜'
    },
    {
      question: 'Qual è l\'area di un rettangolo 6×3?',
      correctAnswer: 18,
      shape: '▭'
    },
    {
      question: 'Qual è il perimetro di un rettangolo 5×2?',
      correctAnswer: 14,
      shape: '▭'
    },
    {
      question: 'Qual è l\'area di un triangolo con base 8 e altezza 3?',
      correctAnswer: 12,
      shape: '🔺'
    },
    {
      question: 'Qual è l\'area di un cerchio con raggio 3? (π≈3.14)',
      correctAnswer: 28,
      shape: '⭕'
    }
  ]
  
  const selectedProblem = problems[Math.floor(Math.random() * problems.length)]
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, selectedProblem.correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== selectedProblem.correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(selectedProblem.correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return {
    question: selectedProblem.question,
    correctAnswer: selectedProblem.correctAnswer,
    options,
    shape: selectedProblem.shape
  }
}

export default function PuzzleGeometricoClientIT() {
  const [currentProblem, setCurrentProblem] = useState<GeometryProblem | null>(null)
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
    if (finalScore <= 3) return { rank: 'Principiante della Geometria', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Esperto della Geometria', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Maestro della Geometria', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio della Geometria', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Puzzle Geometrico"
      description="Risolvi puzzle geometrici e problemi di forme. Sfida la tua comprensione della geometria!"
      introduction="Ti mostreremo problemi di geometria e dovrai calcolare aree, perimetri e altre proprietà. Hai 45 secondi!"
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
      currentGamePath="/it/giochi-matematici/puzzle-geometrico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔷</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Puzzle Geometrico!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo problemi di geometria e dovrai calcolare aree, perimetri e altre proprietà. 
            Hai 45 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <div className="text-4xl mb-4">{currentProblem.shape}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentProblem.question}
            </h3>
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
    </GameLayoutIT>
  )
}
