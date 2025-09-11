"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Dice1, Heart, Diamond } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface ProbabilityProblem {
  question: string
  correctAnswer: number
  options: number[]
  type: 'dice' | 'cards' | 'coins'
  explanation: string
}

const structuredData = jsonLdCalculator({
  name: 'Juego de Probabilidad',
  description: 'Juego educativo de cálculo de probabilidades con dados y cartas',
  url: '/juegos-matematicos/probabilidad',
  category: 'Juegos de Matemáticas'
})

export default function ProbabilidadClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45) // Tiempo medio para cálculos complejos
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<ProbabilityProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 10

  // Función factorial para cálculos binomiales
  const factorial = (n: number): number => {
    if (n <= 1) return 1
    return n * factorial(n - 1)
  }

  // Generate probability problem
  const generateProblem = useCallback((): ProbabilityProblem => {
    const problemTypes: Array<'dice' | 'cards' | 'coins'> = ['dice', 'cards', 'coins']
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    
    let question: string
    let correctAnswer: number
    let explanation: string
    const options: number[] = []

    if (type === 'dice') {
      // Problemas con dados
      const diceCount = Math.random() < 0.5 ? 1 : 2 // 1 o 2 dados
      const target = Math.floor(Math.random() * 6) + 1 // 1-6
      
      if (diceCount === 1) {
        question = `¿Cuál es la probabilidad de obtener ${target} al lanzar un dado?`
        correctAnswer = 1/6
        explanation = `Un dado tiene 6 caras, solo 1 cara tiene el número ${target}. Probabilidad = 1/6 ≈ 0.167`
      } else {
        const sum = Math.floor(Math.random() * 11) + 2 // 2-12
        question = `¿Cuál es la probabilidad de obtener suma ${sum} al lanzar dos dados?`
        
        // Calcular probabilidades reales para suma de dos dados
        const probabilities: Record<number, number> = {
          2: 1/36, 3: 2/36, 4: 3/36, 5: 4/36, 6: 5/36, 7: 6/36,
          8: 5/36, 9: 4/36, 10: 3/36, 11: 2/36, 12: 1/36
        }
        correctAnswer = probabilities[sum]
        explanation = `Para suma ${sum}: ${Math.round(probabilities[sum] * 36)} formas de ${36} total = ${probabilities[sum].toFixed(3)}`
      }
    } else if (type === 'cards') {
      // Problemas con cartas
      const cardTypes = ['corazón', 'espada', 'diamante', 'trébol']
      const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)]
      
      question = `¿Cuál es la probabilidad de sacar un ${cardType} de una baraja de 52 cartas?`
      correctAnswer = 13/52 // 13 cartas de cada palo
      explanation = `Hay 13 ${cardType}s de 52 cartas total. Probabilidad = 13/52 = 1/4 = 0.25`
    } else {
      // Problemas con monedas
      const flips = Math.floor(Math.random() * 3) + 2 // 2-4 lanzamientos
      const heads = Math.floor(Math.random() * flips) + 1 // 1 a flips caras
      
      question = `¿Cuál es la probabilidad de obtener exactamente ${heads} cara${heads > 1 ? 's' : ''} en ${flips} lanzamientos de moneda?`
      
      // Calcular probabilidad binomial
      const combinations = factorial(flips) / (factorial(heads) * factorial(flips - heads))
      correctAnswer = combinations * Math.pow(0.5, flips)
      explanation = `Combinaciones: C(${flips},${heads}) = ${combinations}. Probabilidad = ${combinations} × (1/2)^${flips} = ${correctAnswer.toFixed(3)}`
    }

    // Generar opciones múltiples
    options.push(correctAnswer)
    while (options.length < 4) {
      let option: number
      if (correctAnswer < 0.1) {
        // Para probabilidades pequeñas, variar en ±50%
        option = correctAnswer * (0.5 + Math.random())
      } else {
        // Para probabilidades mayores, variar en ±20%
        option = correctAnswer * (0.8 + Math.random() * 0.4)
      }
      
      if (!options.some(opt => Math.abs(opt - option) < 0.01)) {
        options.push(option)
      }
    }
    
    options.sort(() => Math.random() - 0.5)

    return {
      question,
      correctAnswer,
      options,
      type,
      explanation
    }
  }, [factorial])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(45)
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
    setTimeLeft(45)
    setScore(0)
    setCurrentProblem(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    if (!isActive || feedback !== null) return
    setSelectedAnswer(answer)
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentProblem || !isActive || selectedAnswer === null) return

    const isCorrect = Math.abs(selectedAnswer - currentProblem.correctAnswer) < 0.01
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

  // Get icon for problem type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dice': return Dice1
      case 'cards': return Heart
      case 'coins': return Diamond
      default: return Dice1
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Juego de Probabilidad"
        description="Calcula probabilidades con dados, cartas y monedas en tiempo limitado. ¡Desafía tu comprensión estadística!"
        introduction="¡Bienvenido al Juego de Probabilidad! Resuelve problemas de probabilidad con dados, cartas y monedas. Tienes 45 segundos para resolver la mayor cantidad posible. Cada problema correcto suma 1 punto. ¿Podrás dominar la estadística como un experto? ¡Demuestra tu habilidad con las probabilidades!"
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
        currentGamePath="/juegos-matematicos/probabilidad/"
      >
        {currentProblem && (
          <div className="w-full">
            {/* Problem Type Indicator */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                {(() => {
                  const IconComponent = getTypeIcon(currentProblem.type)
                  return <IconComponent className="h-4 w-4" />
                })()}
                {currentProblem.type === 'dice' ? 'Dados' : 
                 currentProblem.type === 'cards' ? 'Cartas' : 'Monedas'}
              </div>
            </div>

            {/* Problem Question */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 text-blue-900 text-lg sm:text-xl font-semibold px-6 py-4 rounded-lg border-2 border-blue-200">
                {currentProblem.question}
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
                  {option.toFixed(3)}
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
                  <Dice1 className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Selecciona la probabilidad correcta (expresada como decimal)
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
                        ¡Correcto! {currentProblem.correctAnswer.toFixed(3)}
                      </>
                    ) : (
                      <>
                        <span>✗</span>
                        Incorrecto. La respuesta era {currentProblem.correctAnswer.toFixed(3)}
                      </>
                    )}
                  </div>
                  <div className="text-sm font-normal text-center max-w-md">
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
              <Dice1 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío probabilístico!</h3>
              <p className="text-blue-700">
                Calcula probabilidades con dados, cartas y monedas.
                <br />
                Cada problema correcto suma 1 punto.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
