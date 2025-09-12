"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SudokuProblem {
  grid: number[][]
  targetSum: number
  correctAnswer: number
  options: number[]
}

const generateProblem = (): SudokuProblem => {
  // Creare una griglia 3x3 con numeri da 1 a 9
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const shuffled = [...numbers].sort(() => Math.random() - 0.5)
  
  const grid: number[][] = []
  for (let i = 0; i < 3; i++) {
    grid[i] = []
    for (let j = 0; j < 3; j++) {
      grid[i][j] = shuffled[i * 3 + j]
    }
  }
  
  // Calcolare la somma di una riga, colonna o diagonale
  const targetSum = grid[0].reduce((sum, num) => sum + num, 0)
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 10) - 5
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, targetSum + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== targetSum) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(targetSum)
  options.sort(() => Math.random() - 0.5)
  
  return { grid, targetSum, correctAnswer: targetSum, options }
}

export default function SudokuOperazioniClientIT() {
  const [currentProblem, setCurrentProblem] = useState<SudokuProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(60)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(60)
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
    if (finalScore <= 2) return { rank: 'Principiante del Sudoku', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 4) return { rank: 'Esperto del Sudoku', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 6) return { rank: 'Maestro del Sudoku', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio del Sudoku', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Sudoku delle Operazioni"
      description="Risolvi sudoku matematici con operazioni. Sfida la tua logica e capacità di risoluzione dei problemi!"
      introduction="Ti mostreremo una griglia 3x3 con numeri. Devi calcolare la somma di una riga, colonna o diagonale. Hai 60 secondi!"
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
      currentGamePath="/it/giochi-matematici/sudoku-operazioni"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sudoku delle Operazioni!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo una griglia 3x3 con numeri. 
            Devi calcolare la somma di una riga, colonna o diagonale. Hai 60 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Calcola la somma della prima riga:
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-6 max-w-xs mx-auto">
              {currentProblem.grid.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((num, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded-lg border-2 ${
                        rowIndex === 0 
                          ? 'border-blue-400 bg-blue-50 text-blue-700' 
                          : 'border-gray-300 bg-gray-50 text-gray-600'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </React.Fragment>
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
    </GameLayoutIT>
  )
}
