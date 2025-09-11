"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Gamepad2 } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Fraction {
  numerator: number
  denominator: number
  correctPizza: number
  pizzas: Array<{
    slices: number
    filled: number
  }>
}

const structuredData = jsonLdCalculator({
  name: 'Rompecabezas de Fracciones Visuales',
  description: 'Juego educativo para aprender fracciones visualmente con pizzas',
  url: '/juegos-matematicos/fracciones',
  category: 'Juegos de Matemáticas'
})

// Pizza SVG Component
const PizzaSVG = ({ slices, filled, isSelected, onClick, isCorrect }: {
  slices: number
  filled: number
  isSelected: boolean
  onClick: () => void
  isCorrect?: boolean
}) => {
  const radius = 40
  const centerX = 50
  const centerY = 50
  const sliceAngle = 360 / slices

  const createSlice = (index: number) => {
    const startAngle = index * sliceAngle
    const endAngle = (index + 1) * sliceAngle
    const isFilled = index < filled

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)

    const largeArcFlag = sliceAngle > 180 ? 1 : 0

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')

    return (
      <path
        key={index}
        d={pathData}
        fill={isFilled ? '#f59e0b' : '#e5e7eb'}
        stroke="#374151"
        strokeWidth="1"
      />
    )
  }

  return (
    <div
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? isCorrect 
            ? 'scale-110 ring-4 ring-green-500' 
            : 'scale-110 ring-4 ring-red-500'
          : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
        {Array.from({ length: slices }, (_, i) => createSlice(i))}
      </svg>
    </div>
  )
}

export default function FraccionesClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentFraction, setCurrentFraction] = useState<Fraction | null>(null)
  const [selectedPizza, setSelectedPizza] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate fraction with pizza options
  const generateFraction = useCallback((): Fraction => {
    // Generate simple fractions (denominators 2-8)
    const denominators = [2, 3, 4, 5, 6, 8]
    const denominator = denominators[Math.floor(Math.random() * denominators.length)]
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1

    // Create 3 pizza options
    const pizzas = []
    const correctPizza = Math.floor(Math.random() * 3)
    
    for (let i = 0; i < 3; i++) {
      if (i === correctPizza) {
        // Correct pizza
        pizzas.push({
          slices: denominator,
          filled: numerator
        })
      } else {
        // Incorrect pizza - different denominator or different filled amount
        const wrongDenominator = denominators[Math.floor(Math.random() * denominators.length)]
        const wrongFilled = Math.floor(Math.random() * wrongDenominator) + 1
        pizzas.push({
          slices: wrongDenominator,
          filled: wrongFilled
        })
      }
    }

    return {
      numerator,
      denominator,
      correctPizza,
      pizzas
    }
  }, [])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(30)
    setScore(0)
    setGameResult(null)
    setFeedback(null)
    setCurrentQuestion(1)
    setCurrentFraction(generateFraction())
    setSelectedPizza(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentFraction(null)
    setSelectedPizza(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Check answer
  const checkAnswer = (pizzaIndex: number) => {
    if (!currentFraction || !isActive) return

    setSelectedPizza(pizzaIndex)
    const isCorrect = pizzaIndex === currentFraction.correctPizza
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 1.5 seconds and generate new fraction
    setTimeout(() => {
      setFeedback(null)
      setSelectedPizza(null)
      
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
      
      setCurrentFraction(generateFraction())
    }, 1500)
  }

  // Handle key press
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isActive || !currentFraction) return
    
    const key = e.key
    if (key >= '1' && key <= '3') {
      const pizzaIndex = parseInt(key) - 1
      checkAnswer(pizzaIndex)
    }
  }, [isActive, currentFraction, checkAnswer])

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
        if (points >= 15) return { rank: 'Genio', emoji: '🤯' }
        if (points >= 8) return { rank: 'Rápido', emoji: '⚡' }
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

  // Key press effect
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Rompecabezas de Fracciones Visuales"
        description="Selecciona la pizza que representa la fracción correcta. ¡Aprende fracciones de forma visual!"
        introduction="¡Bienvenido al mundo de las fracciones visuales! Selecciona la pizza que representa la fracción mostrada. Las pizzas están divididas en rebanadas y algunas están coloreadas. Tienes 30 segundos para resolver la mayor cantidad posible. Cada respuesta correcta suma 1 punto. ¿Podrás alcanzar el nivel de Genio? ¡Demuestra tu comprensión visual de las fracciones!"
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
        currentGamePath="/juegos-matematicos/fracciones/"
      >
        {currentFraction && (
          <div className="w-full">
            {/* Fraction Display */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 text-blue-900 text-4xl sm:text-5xl font-bold px-6 py-4 rounded-lg border-2 border-blue-200 inline-block">
                {currentFraction.numerator}/{currentFraction.denominator}
              </div>
              <p className="text-lg text-gray-600 mt-4">
                Selecciona la pizza que representa esta fracción
              </p>
            </div>

            {/* Pizza Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {currentFraction.pizzas.map((pizza, index) => (
                <div key={index} className="text-center">
                  <PizzaSVG
                    slices={pizza.slices}
                    filled={pizza.filled}
                    isSelected={selectedPizza === index}
                    onClick={() => checkAnswer(index)}
                    isCorrect={selectedPizza === index ? index === currentFraction.correctPizza : undefined}
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    Pizza {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600">
                Presiona 1, 2 o 3 para seleccionar tu respuesta
              </div>
            )}
          </div>
        )}

        {!currentFraction && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Gamepad2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Selecciona la pizza que representa la fracción mostrada.
                <br />
                Cada respuesta correcta suma 1 punto.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
