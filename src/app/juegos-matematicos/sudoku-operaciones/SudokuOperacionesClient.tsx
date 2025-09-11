"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Grid3X3 } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface SudokuCell {
  value: number | null
  isFixed: boolean
  isCorrect: boolean | null
}

interface SudokuPuzzle {
  grid: SudokuCell[][]
  targetSum: number
  question: string
  correctAnswers: number
  correctValues?: { row: number; col: number; correctValue: number }[]
}

const structuredData = jsonLdCalculator({
  name: 'Sudoku de Operaciones Matemáticas',
  description: 'Juego educativo de sudoku con operaciones matemáticas',
  url: '/juegos-matematicos/sudoku-operaciones',
  category: 'Juegos de Matemáticas'
})

export default function SudokuOperacionesClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45) // Más tiempo para sudoku
  const [score, setScore] = useState(0)
  const [currentPuzzle, setCurrentPuzzle] = useState<SudokuPuzzle | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 10 // Menos puzzles por ser más complejos

  // Generate sudoku puzzle
  const generatePuzzle = useCallback((): SudokuPuzzle => {
    const size = 3 // 3x3 grid para empezar
    const grid: SudokuCell[][] = []
    
    // Initialize empty grid
    for (let i = 0; i < size; i++) {
      grid[i] = []
      for (let j = 0; j < size; j++) {
        grid[i][j] = { value: null, isFixed: false, isCorrect: null }
      }
    }
    
    // Generate a valid sudoku with operations
    const targetSum = Math.floor(Math.random() * 15) + 10 // 10-24
    let correctAnswers = 0
    
    // Fill some cells with fixed values
    const fixedPositions = [
      [0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]
    ]
    
    // Generate numbers that will work for the target sum
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5)
    
    // Place some fixed numbers
    fixedPositions.forEach(([row, col], index) => {
      if (index < shuffledNumbers.length) {
        grid[row][col] = {
          value: shuffledNumbers[index],
          isFixed: true,
          isCorrect: true
        }
      }
    })
    
    // Calculate what the missing numbers should be
    const calculateMissingNumbers = () => {
      const missingCells: { row: number; col: number; correctValue: number }[] = []
      
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (!grid[i][j].isFixed) {
            // Calculate what this cell should be based on row/column sum
            const rowSum = grid[i].reduce((sum, cell) => sum + (cell.value || 0), 0)
            const colSum = grid.reduce((sum, row) => sum + (row[j].value || 0), 0)
            
            // For simplicity, make it so each row and column sums to targetSum
            const remainingRowSum = targetSum - rowSum
            const remainingColSum = targetSum - colSum
            
            // Use the smaller remaining sum (more likely to be valid)
            const correctValue = Math.min(remainingRowSum, remainingColSum, 9)
            
            if (correctValue > 0 && correctValue <= 9) {
              missingCells.push({ row: i, col: j, correctValue })
            }
          }
        }
      }
      
      return missingCells
    }
    
    const missingCells = calculateMissingNumbers()
    correctAnswers = missingCells.length
    
    // Store correct answers for validation
    const puzzle: SudokuPuzzle = {
      grid,
      targetSum,
      question: `Completa la grilla para que cada fila y columna sume ${targetSum}`,
      correctAnswers
    }
    
    // Store correct values for validation (we'll use this in checkAnswer)
    puzzle.correctValues = missingCells
    
    return puzzle
  }, [])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(45)
    setScore(0)
    setGameResult(null)
    setFeedback(null)
    setCurrentQuestion(1)
    setCurrentPuzzle(generatePuzzle())
    setSelectedCell(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(45)
    setScore(0)
    setCurrentPuzzle(null)
    setSelectedCell(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (!isActive || !currentPuzzle || currentPuzzle.grid[row][col].isFixed) return
    setSelectedCell({ row, col })
  }

  // Handle number input
  const handleNumberInput = (number: number) => {
    if (!isActive || !currentPuzzle || !selectedCell) return
    
    const newGrid = currentPuzzle.grid.map(row => 
      row.map(cell => ({ ...cell }))
    )
    
    newGrid[selectedCell.row][selectedCell.col].value = number
    newGrid[selectedCell.row][selectedCell.col].isCorrect = null
    
    setCurrentPuzzle({
      ...currentPuzzle,
      grid: newGrid
    })
    
    setSelectedCell(null)
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentPuzzle || !isActive) return

    const correctValues = currentPuzzle.correctValues || []
    let correctCount = 0
    let totalCells = 0
    
    // Check each missing cell
    correctValues.forEach(({ row, col, correctValue }) => {
      totalCells++
      if (currentPuzzle.grid[row][col].value === correctValue) {
        correctCount++
        currentPuzzle.grid[row][col].isCorrect = true
      } else {
        currentPuzzle.grid[row][col].isCorrect = false
      }
    })
    
    const isCorrect = correctCount === totalCells && totalCells > 0
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 2 seconds and generate new puzzle
    setTimeout(() => {
      setFeedback(null)
      setSelectedCell(null)
      
      // Increment question number
      setCurrentQuestion(prev => {
        const nextQuestion = prev + 1
        if (nextQuestion > totalQuestions) {
          // Game finished
          setIsActive(false)
          return prev
        }
        return nextQuestion
      })
      
      setCurrentPuzzle(generatePuzzle())
    }, 2000)
  }

  // Timer effect
  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive])

  // Game result effect
  useEffect(() => {
    if (!isActive && currentQuestion > 1 && !showIntroduction) {
      const getRankInfo = (points: number) => {
        if (points >= 8) return { rank: 'Genio', emoji: '🤯' }
        if (points >= 5) return { rank: 'Rápido', emoji: '⚡' }
        return { rank: 'Principiante', emoji: '🌱' }
      }

      const rankInfo = getRankInfo(score)
      setGameResult({
        points: score,
        rank: rankInfo.rank,
        emoji: rankInfo.emoji
      })
    }
  }, [isActive, currentQuestion, score, showIntroduction])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Sudoku de Operaciones Matemáticas"
        description="Resuelve grillas donde cada fila y columna debe sumar el mismo resultado. ¡Desafía tu lógica matemática!"
        introduction="¡Bienvenido al sudoku de operaciones matemáticas! Completa la grilla para que cada fila y columna sume el mismo número objetivo. Tienes 45 segundos para resolver la mayor cantidad posible. Cada puzzle correcto suma 1 punto. ¿Podrás dominar la lógica matemática como un experto? ¡Demuestra tu habilidad con los números!"
        onStart={startGame}
        onReset={resetGame}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        gameResult={gameResult}
        showIntroduction={showIntroduction}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        currentGamePath="/juegos-matematicos/sudoku-operaciones/"
      >
        {currentPuzzle && (
          <div className="w-full">
            {/* Puzzle Question */}
            <div className="text-center mb-6">
              <div className="bg-blue-50 text-blue-900 text-lg sm:text-xl font-semibold px-6 py-4 rounded-lg border-2 border-blue-200">
                {currentPuzzle.question}
              </div>
            </div>

            {/* Sudoku Grid */}
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-1 border-2 border-gray-300 p-2 bg-white rounded-lg">
                {currentPuzzle.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`w-12 h-12 border border-gray-300 flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                        cell.isFixed
                          ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                          : selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                          ? 'bg-blue-200 text-blue-900 border-blue-500'
                          : cell.isCorrect === true
                          ? 'bg-green-100 text-green-800'
                          : cell.isCorrect === false
                          ? 'bg-red-100 text-red-800'
                          : 'bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                      disabled={!isActive || cell.isFixed}
                    >
                      {cell.value || ''}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Number Input */}
            {selectedCell && (
              <div className="text-center mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-900 font-semibold mb-3">Selecciona un número:</p>
                  <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                      <Button
                        key={number}
                        onClick={() => handleNumberInput(number)}
                        variant="outline"
                        size="sm"
                        className="w-12 h-12 text-lg font-bold"
                      >
                        {number}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Check Answer Button */}
            {isActive && (
              <div className="text-center">
                <Button 
                  onClick={checkAnswer}
                  size="lg"
                  className="calculator-button text-lg py-4"
                >
                  <Grid3X3 className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Haz clic en una celda vacía y selecciona un número
              </div>
            )}
          </div>
        )}

        {!currentPuzzle && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Grid3X3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Completa la grilla para que cada fila y columna sume el mismo número.
                <br />
                Cada puzzle correcto suma 1 punto.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
