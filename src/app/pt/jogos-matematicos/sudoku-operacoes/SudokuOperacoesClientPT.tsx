"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SudokuProblem {
  grid: (number | null)[][]
  targetSum: number
  correctAnswer: number
  options: number[]
  position: { row: number; col: number }
}

const generateProblem = (): SudokuProblem => {
  // Criar uma grade 3x3 com números
  const grid: (number | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  
  // Preencher algumas posições
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const usedNumbers: number[] = []
  
  // Adicionar alguns números aleatórios
  for (let i = 0; i < 4; i++) {
    const row = Math.floor(Math.random() * 3)
    const col = Math.floor(Math.random() * 3)
    if (grid[row][col] === null) {
      const num = numbers[Math.floor(Math.random() * numbers.length)]
      if (!usedNumbers.includes(num)) {
        grid[row][col] = num
        usedNumbers.push(num)
      }
    }
  }
  
  // Encontrar uma posição vazia
  let emptyRow = -1
  let emptyCol = -1
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === null) {
        emptyRow = row
        emptyCol = col
        break
      }
    }
    if (emptyRow !== -1) break
  }
  
  // Calcular a soma da linha
  const rowSum = grid[emptyRow].reduce((sum: number, num) => sum + (num || 0), 0)
  const targetSum = 15 // Soma mágica para 3x3
  const correctAnswer = targetSum - rowSum
  
  // Gerar opções erradas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 6) - 3
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, Math.min(9, correctAnswer + deviation))
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { grid, targetSum, correctAnswer, options, position: { row: emptyRow, col: emptyCol } }
}

export default function SudokuOperacoesClientPT() {
  const [currentProblem, setCurrentProblem] = useState<SudokuProblem | null>(null)
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
    if (finalScore <= 3) return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Rápido', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Especialista', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Gênio', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutPT
      title="Sudoku de Operações Matemáticas"
      description="Resolva grades onde cada linha e coluna deve somar o mesmo resultado. Desafie sua lógica matemática!"
      introduction="Você verá uma grade 3x3 onde cada linha deve somar 15. Encontre o número que falta! Tem 45 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/sudoku-operacoes"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sudoku de Operações Matemáticas!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá uma grade 3x3 onde cada linha deve somar 15. Encontre o número que falta! 
            Tem 45 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Complete a grade (soma = 15):
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-6 max-w-xs mx-auto">
              {currentProblem.grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-12 h-12 flex items-center justify-center text-lg font-bold border-2 rounded ${
                      rowIndex === currentProblem.position.row && colIndex === currentProblem.position.col
                        ? 'border-blue-500 bg-blue-100 text-blue-700'
                        : 'border-gray-300 bg-gray-50 text-gray-700'
                    }`}
                  >
                    {cell || '?'}
                  </div>
                ))
              )}
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
    </GameLayoutPT>
  )
}
