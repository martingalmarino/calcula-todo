"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Brain, Circle, Square, Triangle, Diamond, Star, Heart } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface PatternProblem {
  sequence: string[]
  correctAnswer: string
  options: string[]
  type: 'numeric' | 'geometric' | 'symbolic' | 'color'
  explanation: string
  pattern: string
}

const structuredData = jsonLdCalculator({
  name: 'Razonamiento Lógico con Patrones',
  description: 'Juego educativo de identificación de patrones lógicos y matemáticos',
  url: '/juegos-matematicos/patrones-logicos',
  category: 'Juegos de Matemáticas'
})

// Iconos para símbolos
const symbolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '●': Circle,
  '■': Square,
  '▲': Triangle,
  '♦': Diamond,
  '★': Star,
  '♥': Heart,
  '○': Circle,
  '□': Square,
  '△': Triangle
}

export default function PatronesLogicosClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(40) // Tiempo medio para análisis de patrones
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<PatternProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 10

  // Generate pattern problem
  const generateProblem = useCallback((): PatternProblem => {
    const problemTypes: Array<'numeric' | 'geometric' | 'symbolic' | 'color'> = ['numeric', 'geometric', 'symbolic', 'color']
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    
    let sequence: string[]
    let correctAnswer: string
    let explanation: string
    let pattern: string
    const options: string[] = []

    if (type === 'numeric') {
      // Patrones numéricos
      const patterns = [
        {
          sequence: ['2', '4', '8', '16', '?'],
          answer: '32',
          explanation: 'Cada número se multiplica por 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
          pattern: 'Multiplicación por 2'
        },
        {
          sequence: ['1', '4', '9', '16', '?'],
          answer: '25',
          explanation: 'Cuadrados perfectos: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25',
          pattern: 'Cuadrados perfectos'
        },
        {
          sequence: ['1', '1', '2', '3', '5', '?'],
          answer: '8',
          explanation: 'Secuencia de Fibonacci: cada número es la suma de los dos anteriores',
          pattern: 'Secuencia de Fibonacci'
        },
        {
          sequence: ['3', '6', '12', '24', '?'],
          answer: '48',
          explanation: 'Cada número se multiplica por 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48',
          pattern: 'Multiplicación por 2'
        },
        {
          sequence: ['2', '6', '18', '54', '?'],
          answer: '162',
          explanation: 'Cada número se multiplica por 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162',
          pattern: 'Multiplicación por 3'
        }
      ]
      
      const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
      sequence = selectedPattern.sequence
      correctAnswer = selectedPattern.answer
      explanation = selectedPattern.explanation
      pattern = selectedPattern.pattern
      
    } else if (type === 'geometric') {
      // Patrones geométricos
      const patterns = [
        {
          sequence: ['●', '■', '●', '■', '?'],
          answer: '●',
          explanation: 'Alternancia entre círculo y cuadrado: círculo, cuadrado, círculo, cuadrado, círculo',
          pattern: 'Alternancia de formas'
        },
        {
          sequence: ['●', '●', '■', '●', '●', '■', '?'],
          answer: '●',
          explanation: 'Patrón: 2 círculos, 1 cuadrado, 2 círculos, 1 cuadrado, 2 círculos',
          pattern: 'Repetición 2-1'
        },
        {
          sequence: ['●', '■', '▲', '●', '■', '?'],
          answer: '▲',
          explanation: 'Ciclo de 3 formas: círculo, cuadrado, triángulo, círculo, cuadrado, triángulo',
          pattern: 'Ciclo de 3 formas'
        },
        {
          sequence: ['●', '■', '■', '●', '■', '■', '?'],
          answer: '●',
          explanation: 'Patrón: 1 círculo, 2 cuadrados, 1 círculo, 2 cuadrados, 1 círculo',
          pattern: 'Repetición 1-2'
        }
      ]
      
      const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
      sequence = selectedPattern.sequence
      correctAnswer = selectedPattern.answer
      explanation = selectedPattern.explanation
      pattern = selectedPattern.pattern
      
    } else if (type === 'symbolic') {
      // Patrones simbólicos
      const patterns = [
        {
          sequence: ['A', 'B', 'C', 'D', '?'],
          answer: 'E',
          explanation: 'Alfabeto en orden: A, B, C, D, E',
          pattern: 'Alfabeto secuencial'
        },
        {
          sequence: ['A', 'C', 'E', 'G', '?'],
          answer: 'I',
          explanation: 'Letras impares del alfabeto: A(1), C(3), E(5), G(7), I(9)',
          pattern: 'Letras impares'
        },
        {
          sequence: ['Z', 'Y', 'X', 'W', '?'],
          answer: 'V',
          explanation: 'Alfabeto en orden inverso: Z, Y, X, W, V',
          pattern: 'Alfabeto inverso'
        },
        {
          sequence: ['A', 'B', 'A', 'B', '?'],
          answer: 'A',
          explanation: 'Alternancia entre A y B: A, B, A, B, A',
          pattern: 'Alternancia A-B'
        }
      ]
      
      const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
      sequence = selectedPattern.sequence
      correctAnswer = selectedPattern.answer
      explanation = selectedPattern.explanation
      pattern = selectedPattern.pattern
      
    } else {
      // Patrones de color (usando emojis)
      const patterns = [
        {
          sequence: ['🔴', '🟡', '🔴', '🟡', '?'],
          answer: '🔴',
          explanation: 'Alternancia entre rojo y amarillo: rojo, amarillo, rojo, amarillo, rojo',
          pattern: 'Alternancia rojo-amarillo'
        },
        {
          sequence: ['🔴', '🟡', '🟢', '🔴', '🟡', '?'],
          answer: '🟢',
          explanation: 'Ciclo de 3 colores: rojo, amarillo, verde, rojo, amarillo, verde',
          pattern: 'Ciclo de 3 colores'
        },
        {
          sequence: ['🔴', '🔴', '🟡', '🔴', '🔴', '?'],
          answer: '🟡',
          explanation: 'Patrón: 2 rojos, 1 amarillo, 2 rojos, 1 amarillo',
          pattern: 'Repetición 2-1'
        }
      ]
      
      const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
      sequence = selectedPattern.sequence
      correctAnswer = selectedPattern.answer
      explanation = selectedPattern.explanation
      pattern = selectedPattern.pattern
    }

    // Generar opciones múltiples
    options.push(correctAnswer)
    while (options.length < 4) {
      let option: string
      if (type === 'numeric') {
        // Para números, generar opciones cercanas
        const num = parseInt(correctAnswer)
        const variations = [num + 1, num - 1, num * 2, num / 2, num + 10, num - 10]
        option = variations[Math.floor(Math.random() * variations.length)].toString()
      } else if (type === 'geometric') {
        // Para formas, usar otras formas
        const shapes = ['●', '■', '▲', '♦', '★', '♥', '○', '□', '△']
        option = shapes[Math.floor(Math.random() * shapes.length)]
      } else if (type === 'symbolic') {
        // Para letras, usar letras cercanas
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const currentIndex = alphabet.indexOf(correctAnswer)
        const variations = [
          alphabet[currentIndex + 1] || 'A',
          alphabet[currentIndex - 1] || 'Z',
          alphabet[currentIndex + 2] || 'B',
          alphabet[currentIndex - 2] || 'Y'
        ]
        option = variations[Math.floor(Math.random() * variations.length)]
      } else {
        // Para colores, usar otros colores
        const colors = ['🔴', '🟡', '🟢', '🔵', '🟣', '🟠', '⚫', '⚪']
        option = colors[Math.floor(Math.random() * colors.length)]
      }
      
      if (!options.includes(option)) {
        options.push(option)
      }
    }
    
    options.sort(() => Math.random() - 0.5)

    return {
      sequence,
      correctAnswer,
      options,
      type,
      explanation,
      pattern
    }
  }, [])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(40)
    setScore(0)
    setGameResult(null)
    setFeedback(null)
    setCurrentQuestion(1)
    setCurrentProblem(generateProblem())
    setSelectedAnswer(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(40)
    setScore(0)
    setCurrentProblem(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (!isActive || feedback !== null) return
    setSelectedAnswer(answer)
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentProblem || !isActive || selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentProblem.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 3 seconds and generate new problem
    setTimeout(() => {
      setFeedback(null)
      setSelectedAnswer(null)
      
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
      
      setCurrentProblem(generateProblem())
    }, 3000)
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

  // Get type display name
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'numeric': return 'Numérico'
      case 'geometric': return 'Geométrico'
      case 'symbolic': return 'Simbólico'
      case 'color': return 'Color'
      default: return 'Patrón'
    }
  }

  // Render sequence item
  const renderSequenceItem = (item: string, index: number) => {
    if (currentProblem?.type === 'geometric' && symbolIcons[item]) {
      const IconComponent = symbolIcons[item]
      return (
        <div key={index} className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg border-2 border-blue-200">
          <IconComponent className="h-6 w-6 text-blue-600" />
        </div>
      )
    }
    
    return (
      <div key={index} className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg border-2 border-blue-200 text-xl font-bold text-blue-900">
        {item}
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
        title="Razonamiento Lógico con Patrones"
        description="Descubre patrones matemáticos en secuencias de símbolos y números. ¡Desafía tu pensamiento lógico y razonamiento abstracto!"
        introduction="¡Bienvenido al Razonamiento Lógico con Patrones! Analiza secuencias de números, formas, letras y colores para descubrir el patrón oculto. Tienes 40 segundos para resolver la mayor cantidad posible. Cada patrón correcto suma 1 punto. ¿Podrás identificar las reglas matemáticas y lógicas que gobiernan estas secuencias? ¡Demuestra tu capacidad de razonamiento abstracto!"
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
        currentGamePath="/juegos-matematicos/patrones-logicos/"
      >
        {currentProblem && (
          <div className="w-full">
            {/* Problem Type Indicator */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Brain className="h-4 w-4" />
                {getTypeDisplayName(currentProblem.type)}
              </div>
            </div>

            {/* Pattern Sequence */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 text-blue-900 px-6 py-4 rounded-lg border-2 border-blue-200">
                <div className="text-sm font-medium mb-3">¿Cuál es el siguiente elemento?</div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {currentProblem.sequence.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {renderSequenceItem(item, index)}
                      {index < currentProblem.sequence.length - 1 && (
                        <span className="text-blue-600 font-bold">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  size="lg"
                  className={`h-16 text-lg font-bold transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-900 border-2 border-blue-200 hover:bg-blue-50'
                  }`}
                  disabled={!isActive || feedback !== null}
                >
                  {currentProblem.type === 'geometric' && symbolIcons[option] ? (
                    <div className="flex items-center gap-2">
                      {(() => {
                        const IconComponent = symbolIcons[option]
                        return <IconComponent className="h-5 w-5" />
                      })()}
                    </div>
                  ) : (
                    option
                  )}
                </Button>
              ))}
            </div>

            {/* Check Answer Button */}
            {isActive && selectedAnswer !== null && (
              <div className="text-center">
                <Button 
                  onClick={checkAnswer}
                  size="lg"
                  className="calculator-button text-lg py-4"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Identifica el patrón y selecciona el siguiente elemento
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div className="text-center mt-6">
                <div className={`inline-flex flex-col items-center gap-3 px-6 py-4 rounded-lg text-lg font-bold ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {feedback === 'correct' ? (
                      <>
                        <span>✓</span>
                        ¡Correcto! {currentProblem.correctAnswer}
                      </>
                    ) : (
                      <>
                        <span>✗</span>
                        Incorrecto. La respuesta era {currentProblem.correctAnswer}
                      </>
                    )}
                  </div>
                  <div className="text-sm font-normal text-center max-w-md">
                    <div className="font-semibold mb-1">Patrón: {currentProblem.pattern}</div>
                    {currentProblem.explanation}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!currentProblem && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío lógico!</h3>
              <p className="text-blue-700">
                Analiza patrones en números, formas, letras y colores.
                <br />
                Cada patrón correcto suma 1 punto.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
