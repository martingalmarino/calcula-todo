"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Percent } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface PercentageProblem {
  type: 'descuento' | 'aumento' | 'porcentaje' | 'precio_original'
  baseAmount: number
  percentage: number
  question: string
  correctAnswer: number
  options: number[]
}

const structuredData = jsonLdCalculator({
  name: 'Rompecabezas de Porcentajes',
  description: 'Juego educativo para calcular porcentajes, descuentos y aumentos',
  url: '/juegos-matematicos/porcentajes',
  category: 'Juegos de Matemáticas'
})

export default function PorcentajesClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<PercentageProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate percentage problem
  const generateProblem = useCallback((): PercentageProblem => {
    const problemTypes: Array<'descuento' | 'aumento' | 'porcentaje' | 'precio_original'> = [
      'descuento', 'aumento', 'porcentaje', 'precio_original'
    ]
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    
    let question: string
    let correctAnswer: number
    
    // Generate realistic amounts
    const amounts = [50, 100, 150, 200, 250, 300, 400, 500, 750, 1000, 1200, 1500, 2000]
    const baseAmount = amounts[Math.floor(Math.random() * amounts.length)]
    
    // Generate realistic percentages
    const percentages = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 90, 100, 120, 150, 200]
    const percentage = percentages[Math.floor(Math.random() * percentages.length)]
    
    switch (type) {
      case 'descuento':
        question = `Un producto cuesta $${baseAmount.toLocaleString()}. Si tiene un ${percentage}% de descuento, ¿cuánto vale?`
        correctAnswer = Math.round(baseAmount * (1 - percentage / 100))
        break
        
      case 'aumento':
        question = `Un producto cuesta $${baseAmount.toLocaleString()}. Si aumenta un ${percentage}%, ¿cuánto vale?`
        correctAnswer = Math.round(baseAmount * (1 + percentage / 100))
        break
        
      case 'porcentaje':
        const discountAmount = Math.round(baseAmount * (percentage / 100))
        question = `Un producto cuesta $${baseAmount.toLocaleString()} y tiene un descuento de $${discountAmount.toLocaleString()}. ¿Qué porcentaje de descuento es?`
        correctAnswer = percentage
        break
        
      case 'precio_original':
        const finalPrice = Math.round(baseAmount * (1 - percentage / 100))
        question = `Un producto tiene un ${percentage}% de descuento y cuesta $${finalPrice.toLocaleString()}. ¿Cuál era su precio original?`
        correctAnswer = baseAmount
        break
    }
    
    // Generate 4 options (1 correct + 3 incorrect)
    const options: number[] = [correctAnswer]
    
    // Add incorrect options with variations
    while (options.length < 4) {
      let wrongAnswer: number
      
      if (type === 'descuento' || type === 'aumento') {
        // For price calculations, add variations
        const variation = Math.floor(Math.random() * 3) + 1
        const multiplier = Math.random() > 0.5 ? 1 + (variation * 0.1) : 1 - (variation * 0.1)
        wrongAnswer = Math.round(correctAnswer * multiplier)
      } else {
        // For percentage or original price, add variations
        const variation = Math.floor(Math.random() * 20) + 5
        wrongAnswer = Math.random() > 0.5 ? correctAnswer + variation : correctAnswer - variation
      }
      
      // Ensure positive numbers and no duplicates
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer)
      }
    }
    
    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5)
    
    return {
      type,
      baseAmount,
      percentage,
      question,
      correctAnswer,
      options: shuffledOptions
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
  const handleAnswerClick = (answer: number) => {
    if (!isActive || !currentProblem) return
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

    // Clear feedback after 1.5 seconds and generate new problem
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
    }, 1500)
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Rompecabezas de Porcentajes"
        description="Calcula porcentajes, descuentos y aumentos. ¡Mejora tu agilidad mental con cálculos reales!"
        introduction="¡Bienvenido al rompecabezas de porcentajes! Resuelve problemas de descuentos, aumentos y cálculos de porcentajes en situaciones reales. Tienes 30 segundos para resolver la mayor cantidad posible. Cada respuesta correcta suma 1 punto. ¿Podrás dominar los porcentajes como un experto? ¡Demuestra tu habilidad con los números!"
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
      >
        {currentProblem && (
          <div className="w-full">
            {/* Problem Question */}
            <div className="text-center mb-6">
              <div className="bg-blue-50 text-blue-900 text-lg sm:text-xl font-semibold px-6 py-4 rounded-lg border-2 border-blue-200">
                {currentProblem.question}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentProblem.options.map((option, index) => {
                const isSelected = selectedAnswer === option
                const isCorrect = option === currentProblem.correctAnswer
                
                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    variant={isSelected ? 'default' : 'outline'}
                    size="lg"
                    className={`text-lg font-bold py-6 h-auto transition-all duration-200 ${
                      isSelected 
                        ? isCorrect 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                    disabled={!isActive}
                  >
                    ${option.toLocaleString()}
                  </Button>
                )
              })}
            </div>

            {/* Check Answer Button */}
            {isActive && selectedAnswer !== null && (
              <div className="text-center">
                <Button 
                  onClick={checkAnswer}
                  size="lg"
                  className="calculator-button text-lg py-4"
                >
                  <Percent className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Selecciona la respuesta correcta
              </div>
            )}
          </div>
        )}

        {!currentProblem && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Percent className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Resuelve problemas de porcentajes en situaciones reales.
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
