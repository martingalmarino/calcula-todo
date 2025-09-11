"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Map, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Target, Calculator } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface MazeCell {
  x: number
  y: number
  type: 'empty' | 'wall' | 'start' | 'end' | 'algebra'
  equation?: string
  answer?: number
  options?: number[]
  isVisited?: boolean
}

interface MazeProblem {
  maze: MazeCell[][]
  playerPosition: { x: number; y: number }
  currentEquation?: string
  currentAnswer?: number
  currentOptions?: number[]
  moves: number
  maxMoves: number
}

const structuredData = jsonLdCalculator({
  name: 'El Laberinto Algebraico',
  description: 'Juego educativo de navegación por laberinto con operaciones algebraicas',
  url: '/juegos-matematicos/laberinto-algebraico',
  category: 'Juegos de Matemáticas'
})

export default function LaberintoAlgebraicoClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(50) // Tiempo generoso para navegación
  const [score, setScore] = useState(0)
  const [currentMaze, setCurrentMaze] = useState<MazeProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 5 // 5 laberintos por partida
  const [showEquation, setShowEquation] = useState(false)

  // Generate algebraic equation
  const generateEquation = useCallback((): { equation: string; answer: number; options: number[] } => {
    const equationTypes = [
      // Ecuaciones simples
      () => {
        const a = Math.floor(Math.random() * 10) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const result = a + b
        return { equation: `${a} + ${b} = ?`, answer: result, type: 'suma' }
      },
      () => {
        const a = Math.floor(Math.random() * 10) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const result = a - b
        return { equation: `${a} - ${b} = ?`, answer: result, type: 'resta' }
      },
      () => {
        const a = Math.floor(Math.random() * 5) + 1
        const b = Math.floor(Math.random() * 5) + 1
        const result = a * b
        return { equation: `${a} × ${b} = ?`, answer: result, type: 'multiplicacion' }
      },
      // Ecuaciones con variables
      () => {
        const x = Math.floor(Math.random() * 10) + 1
        const a = Math.floor(Math.random() * 5) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const result = a * x + b
        return { equation: `${a}x + ${b} = ${result}`, answer: x, type: 'ecuacion' }
      },
      () => {
        const x = Math.floor(Math.random() * 10) + 1
        const a = Math.floor(Math.random() * 5) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const result = a * x - b
        return { equation: `${a}x - ${b} = ${result}`, answer: x, type: 'ecuacion' }
      }
    ]

    const selectedType = equationTypes[Math.floor(Math.random() * equationTypes.length)]
    const { equation, answer, type } = selectedType()

    // Generate options
    const options: number[] = [answer]
    while (options.length < 4) {
      let option: number
      if (type === 'ecuacion') {
        // Para ecuaciones, variar la variable
        option = answer + (Math.floor(Math.random() * 6) - 3) // ±3
      } else {
        // Para operaciones básicas, variar el resultado
        option = answer + (Math.floor(Math.random() * 10) - 5) // ±5
      }
      
      if (option > 0 && !options.includes(option)) {
        options.push(option)
      }
    }

    return {
      equation,
      answer,
      options: options.sort(() => Math.random() - 0.5)
    }
  }, [])

  // Generate maze
  const generateMaze = useCallback((): MazeProblem => {
    const size = 5 // 5x5 maze
    const maze: MazeCell[][] = []
    
    // Initialize empty maze
    for (let y = 0; y < size; y++) {
      maze[y] = []
      for (let x = 0; x < size; x++) {
        maze[y][x] = { x, y, type: 'empty' }
      }
    }

    // Add walls (random pattern)
    const wallPositions = [
      [1, 1], [1, 3], [2, 1], [2, 3], [3, 0], [3, 2], [3, 4]
    ]
    
    wallPositions.forEach(([x, y]) => {
      maze[y][x].type = 'wall'
    })

    // Set start position (top-left)
    maze[0][0].type = 'start'
    
    // Set end position (bottom-right)
    maze[size - 1][size - 1].type = 'end'

    // Add algebraic equations to some cells
    const equationPositions = [
      [1, 0], [2, 0], [3, 1], [4, 1], [0, 2], [1, 2], [2, 2], [4, 2], [0, 3], [1, 4], [2, 4]
    ]
    
    equationPositions.forEach(([x, y]) => {
      if (maze[y][x].type === 'empty') {
        const { equation, answer, options } = generateEquation()
        maze[y][x].type = 'algebra'
        maze[y][x].equation = equation
        maze[y][x].answer = answer
        maze[y][x].options = options
      }
    })

    return {
      maze,
      playerPosition: { x: 0, y: 0 },
      moves: 0,
      maxMoves: 20
    }
  }, [generateEquation])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(50)
    setScore(0)
    setGameResult(null)
    setFeedback(null)
    setCurrentQuestion(1)
    setCurrentMaze(generateMaze())
    setSelectedAnswer(null)
    setShowEquation(false)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(50)
    setScore(0)
    setCurrentMaze(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
    setShowEquation(false)
  }

  // Handle movement
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!currentMaze || !isActive || showEquation) return

    const { x, y } = currentMaze.playerPosition
    let newX = x
    let newY = y

    switch (direction) {
      case 'up':
        newY = Math.max(0, y - 1)
        break
      case 'down':
        newY = Math.min(4, y + 1)
        break
      case 'left':
        newX = Math.max(0, x - 1)
        break
      case 'right':
        newX = Math.min(4, x + 1)
        break
    }

    // Check if new position is valid
    const newCell = currentMaze.maze[newY][newX]
    if (newCell.type === 'wall') return

    // Update position
    const newMaze = { ...currentMaze }
    newMaze.playerPosition = { x: newX, y: newY }
    newMaze.moves += 1

    // Check if reached end
    if (newCell.type === 'end') {
      setScore(prev => prev + 10) // Bonus for reaching end
      setCurrentMaze(newMaze)
      
      // Move to next maze
      setTimeout(() => {
        setCurrentQuestion(prev => {
          const nextQuestion = prev + 1
          if (nextQuestion > totalQuestions) {
            setIsActive(false)
            return prev
          }
          return nextQuestion
        })
        setCurrentMaze(generateMaze())
      }, 2000)
      return
    }

    // Check if landed on algebra cell
    if (newCell.type === 'algebra' && !newCell.isVisited) {
      newMaze.currentEquation = newCell.equation
      newMaze.currentAnswer = newCell.answer
      newMaze.currentOptions = newCell.options
      newMaze.maze[newY][newX].isVisited = true
      setShowEquation(true)
    }

    setCurrentMaze(newMaze)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    if (!isActive || !showEquation) return
    setSelectedAnswer(answer)
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentMaze || !isActive || selectedAnswer === null || !showEquation) return

    const isCorrect = selectedAnswer === currentMaze.currentAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear equation and continue
    setTimeout(() => {
      setFeedback(null)
      setSelectedAnswer(null)
      setShowEquation(false)
      setCurrentMaze(prev => prev ? { ...prev, currentEquation: undefined, currentAnswer: undefined, currentOptions: undefined } : null)
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

  // Render maze cell
  const renderCell = (cell: MazeCell, x: number, y: number) => {
    const isPlayer = currentMaze?.playerPosition.x === x && currentMaze?.playerPosition.y === y
    const isCurrent = showEquation && currentMaze?.currentEquation && 
                     currentMaze.playerPosition.x === x && currentMaze.playerPosition.y === y

    let cellClass = "w-12 h-12 border border-gray-300 flex items-center justify-center text-xs font-bold"
    
    if (cell.type === 'wall') {
      cellClass += " bg-gray-800 text-white"
    } else if (cell.type === 'start') {
      cellClass += " bg-green-100 text-green-800"
    } else if (cell.type === 'end') {
      cellClass += " bg-red-100 text-red-800"
    } else if (cell.type === 'algebra') {
      cellClass += " bg-blue-100 text-blue-800"
    } else {
      cellClass += " bg-white text-gray-600"
    }

    if (isPlayer) {
      cellClass += " bg-yellow-200 border-yellow-400"
    }

    if (isCurrent) {
      cellClass += " ring-2 ring-blue-500"
    }

    return (
      <div key={`${x}-${y}`} className={cellClass}>
        {isPlayer ? '👤' : 
         cell.type === 'start' ? '🚀' :
         cell.type === 'end' ? '🏁' :
         cell.type === 'algebra' ? '🧮' :
         cell.type === 'wall' ? '⬛' : '⬜'}
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="El Laberinto Algebraico"
        description="Navega por un laberinto resolviendo operaciones algebraicas en cada paso. ¡Desafía tu agilidad matemática y pensamiento estratégico!"
        introduction="¡Bienvenido al Laberinto Algebraico! Navega por el laberinto usando las flechas y resuelve las ecuaciones algebraicas que encuentres en el camino. Cada ecuación correcta suma 1 punto y llegar a la meta suma 10 puntos. Tienes 50 segundos y 20 movimientos máximo por laberinto. ¿Podrás resolver 5 laberintos completos? ¡Demuestra tu habilidad matemática y estratégica!"
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
        currentGamePath="/juegos-matematicos/laberinto-algebraico/"
      >
        {currentMaze && (
          <div className="w-full">
            {/* Maze Info */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Map className="h-4 w-4" />
                Laberinto {currentQuestion}/5
                <span className="text-xs">Movimientos: {currentMaze.moves}/{currentMaze.maxMoves}</span>
              </div>
            </div>

            {/* Maze Grid */}
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-5 gap-1 p-4 bg-gray-100 rounded-lg">
                {currentMaze.maze.map((row, y) =>
                  row.map((cell, x) => renderCell(cell, x, y))
                )}
              </div>
            </div>

            {/* Movement Controls */}
            {!showEquation && (
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-3">Usa las flechas para moverte</div>
                <div className="grid grid-cols-3 gap-2 max-w-32 mx-auto">
                  <div></div>
                  <Button
                    onClick={() => handleMove('up')}
                    size="sm"
                    variant="outline"
                    disabled={!isActive || currentMaze.moves >= currentMaze.maxMoves}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button
                    onClick={() => handleMove('left')}
                    size="sm"
                    variant="outline"
                    disabled={!isActive || currentMaze.moves >= currentMaze.maxMoves}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-center flex items-center justify-center">👤</div>
                  <Button
                    onClick={() => handleMove('right')}
                    size="sm"
                    variant="outline"
                    disabled={!isActive || currentMaze.moves >= currentMaze.maxMoves}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button
                    onClick={() => handleMove('down')}
                    size="sm"
                    variant="outline"
                    disabled={!isActive || currentMaze.moves >= currentMaze.maxMoves}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <div></div>
                </div>
              </div>
            )}

            {/* Algebra Equation */}
            {showEquation && currentMaze.currentEquation && (
              <div className="text-center mb-6">
                <div className="bg-blue-50 text-blue-900 px-6 py-4 rounded-lg border-2 border-blue-200">
                  <div className="text-sm font-medium mb-3">¡Ecuación encontrada!</div>
                  <div className="text-xl font-bold mb-4">{currentMaze.currentEquation}</div>
                  
                  {/* Answer Options */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {currentMaze.currentOptions?.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        size="lg"
                        className={`h-12 text-lg font-bold ${
                          selectedAnswer === option
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-900 border-2 border-blue-200 hover:bg-blue-50'
                        }`}
                        disabled={!isActive || feedback !== null}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {/* Check Answer Button */}
                  {selectedAnswer !== null && (
                    <Button 
                      onClick={checkAnswer}
                      size="lg"
                      className="calculator-button"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Verificar
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            {!showEquation && (
              <div className="text-center text-sm text-gray-600">
                <div className="mb-2">🚀 Inicio → 🏁 Meta</div>
                <div>🧮 Resuelve ecuaciones para avanzar</div>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div className="text-center mt-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-bold ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {feedback === 'correct' ? (
                    <>
                      <span>✓</span>
                      ¡Correcto! +1 punto
                    </>
                  ) : (
                    <>
                      <span>✗</span>
                      Incorrecto
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!currentMaze && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Map className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el laberinto!</h3>
              <p className="text-blue-700">
                Navega por el laberinto y resuelve ecuaciones algebraicas.
                <br />
                Cada ecuación correcta suma 1 punto, llegar a la meta suma 10 puntos.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
