"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, Hash, Calculator } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface ComparisonProblem {
  number1: number
  number2: number
  type: 'integers' | 'decimals' | 'fractions'
  correctAnswer: 'mayor' | 'menor'
  display1: string
  display2: string
}

const structuredData = jsonLdCalculator({
  name: 'Mayor o Menor',
  description: 'Juego educativo de comparación de números',
  url: '/juegos-matematicos/mayor-menor',
  category: 'Juegos de Matemáticas'
})

export default function MayorMenorClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // Tiempo corto para agilidad
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<ComparisonProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<'mayor' | 'menor' | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate comparison problem
  const generateProblem = useCallback((): ComparisonProblem => {
    const problemTypes: Array<'integers' | 'decimals' | 'fractions'> = ['integers', 'decimals', 'fractions']
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    
    let number1: number
    let number2: number
    let display1: string
    let display2: string

    if (type === 'integers') {
      // Números enteros
      number1 = Math.floor(Math.random() * 100) + 1
      number2 = Math.floor(Math.random() * 100) + 1
      display1 = number1.toString()
      display2 = number2.toString()
    } else if (type === 'decimals') {
      // Números decimales
      number1 = Math.round((Math.random() * 100 + Math.random()) * 100) / 100
      number2 = Math.round((Math.random() * 100 + Math.random()) * 100) / 100
      display1 = number1.toFixed(2)
      display2 = number2.toFixed(2)
    } else {
      // Fracciones simples
      const denominators = [2, 3, 4, 5, 6, 8, 10]
      const denom1 = denominators[Math.floor(Math.random() * denominators.length)]
      const denom2 = denominators[Math.floor(Math.random() * denominators.length)]
      
      const num1 = Math.floor(Math.random() * (denom1 - 1)) + 1
      const num2 = Math.floor(Math.random() * (denom2 - 1)) + 1
      
      number1 = num1 / denom1
      number2 = num2 / denom2
      display1 = `${num1}/${denom1}`
      display2 = `${num2}/${denom2}`
    }

    // Asegurar que los números sean diferentes
    if (number1 === number2) {
      number1 += 1
      if (type === 'integers') {
        display1 = number1.toString()
      } else if (type === 'decimals') {
        display1 = number1.toFixed(2)
      }
    }

    const correctAnswer = number1 > number2 ? 'mayor' : 'menor'

    return {
      number1,
      number2,
      type,
      correctAnswer,
      display1,
      display2
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
    setCurrentProblem(generateProblem())
    setSelectedAnswer(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentProblem(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: 'mayor' | 'menor') => {
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

    // Clear feedback after 2 seconds and generate new problem
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
        if (points >= 12) return { rank: 'Genio', emoji: '🤯' }
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

  // Get type display name
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'integers': return 'Números Enteros'
      case 'decimals': return 'Decimales'
      case 'fractions': return 'Fracciones'
      default: return 'Comparación'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Mayor o Menor"
        description="Compara números rápidamente y elige cuál es mayor o menor. ¡Desafía tu agilidad mental y sentido numérico!"
        introduction="¡Bienvenido a Mayor o Menor! Compara números enteros, decimales y fracciones en tiempo récord. Tienes 30 segundos para resolver la mayor cantidad posible. Cada comparación correcta suma 1 punto. ¿Podrás identificar rápidamente cuál número es mayor? ¡Demuestra tu agilidad mental y sentido numérico!"
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
        currentGamePath="/juegos-matematicos/mayor-menor/"
      >
        {currentProblem && (
          <div className="w-full">
            {/* Problem Type Indicator */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <Hash className="h-4 w-4" />
                {getTypeDisplayName(currentProblem.type)}
              </div>
            </div>

            {/* Numbers Comparison */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 text-blue-900 px-6 py-8 rounded-lg border-2 border-blue-200">
                <div className="text-sm font-medium mb-4">¿Cuál número es mayor?</div>
                
                <div className="flex items-center justify-center gap-8 mb-6">
                  {/* First Number */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-blue-900 text-4xl font-bold px-6 py-4 rounded-lg border-2 border-blue-300 min-w-[120px]">
                      {currentProblem.display1}
                    </div>
                    <div className="text-xs text-blue-600 mt-2">Número A</div>
                  </div>

                  {/* VS */}
                  <div className="text-2xl font-bold text-blue-600">VS</div>

                  {/* Second Number */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-blue-900 text-4xl font-bold px-6 py-4 rounded-lg border-2 border-blue-300 min-w-[120px]">
                      {currentProblem.display2}
                    </div>
                    <div className="text-xs text-blue-600 mt-2">Número B</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button
                onClick={() => handleAnswerSelect('mayor')}
                variant={selectedAnswer === 'mayor' ? "default" : "outline"}
                size="lg"
                className={`h-16 text-lg font-bold transition-all duration-200 ${
                  selectedAnswer === 'mayor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-900 border-2 border-blue-200 hover:bg-blue-50'
                }`}
                disabled={!isActive || feedback !== null}
              >
                <ArrowUp className="h-5 w-5 mr-2" />
                A es Mayor
              </Button>
              
              <Button
                onClick={() => handleAnswerSelect('menor')}
                variant={selectedAnswer === 'menor' ? "default" : "outline"}
                size="lg"
                className={`h-16 text-lg font-bold transition-all duration-200 ${
                  selectedAnswer === 'menor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-900 border-2 border-blue-200 hover:bg-blue-50'
                }`}
                disabled={!isActive || feedback !== null}
              >
                <ArrowDown className="h-5 w-5 mr-2" />
                B es Mayor
              </Button>
            </div>

            {/* Check Answer Button */}
            {isActive && selectedAnswer !== null && (
              <div className="text-center">
                <Button 
                  onClick={checkAnswer}
                  size="lg"
                  className="calculator-button text-lg py-4"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Selecciona cuál número es mayor
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
                        ¡Correcto! +1 punto
                      </>
                    ) : (
                      <>
                        <span>✗</span>
                        Incorrecto
                      </>
                    )}
                  </div>
                  <div className="text-sm font-normal text-center">
                    {feedback === 'correct' ? (
                      `${currentProblem.display1} ${currentProblem.number1 > currentProblem.number2 ? '>' : '<'} ${currentProblem.display2}`
                    ) : (
                      `La respuesta correcta era: ${currentProblem.display1} ${currentProblem.number1 > currentProblem.number2 ? '>' : '<'} ${currentProblem.display2}`
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!currentProblem && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Hash className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para comparar!</h3>
              <p className="text-blue-700">
                Compara números enteros, decimales y fracciones.
                <br />
                Cada comparación correcta suma 1 punto.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
