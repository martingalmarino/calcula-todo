"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Equation {
  equation: string
  answer: number
  type: 'first_degree' | 'second_degree'
  options: number[]
}

const structuredData = jsonLdCalculator({
  name: 'Ecuaciones Exprés',
  description: 'Juego educativo de ecuaciones de primer y segundo grado',
  url: '/juegos-matematicos/ecuaciones-expres',
  category: 'Juegos de Matemáticas'
})

export default function EcuacionesExpresClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // Más tiempo para ecuaciones complejas
  const [score, setScore] = useState(0)
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 12 // Más preguntas por ser más complejo

  // Generate equation
  const generateEquation = useCallback((): Equation => {
    const equationTypes: Array<'first_degree' | 'second_degree'> = ['first_degree', 'second_degree']
    const type = equationTypes[Math.floor(Math.random() * equationTypes.length)]
    
    let equation: string
    let answer: number
    let options: number[]

    if (type === 'first_degree') {
      // Ecuaciones de primer grado: ax + b = c
      const a = Math.floor(Math.random() * 5) + 1 // 1-5
      const b = Math.floor(Math.random() * 20) - 10 // -10 a 10
      const x = Math.floor(Math.random() * 20) - 10 // -10 a 10
      const c = a * x + b
      
      equation = `${a}x ${b >= 0 ? '+' : ''}${b} = ${c}`
      answer = x
      
      // Generar opciones múltiples
      const baseOptions = [answer]
      while (baseOptions.length < 4) {
        const option = answer + Math.floor(Math.random() * 10) - 5
        if (!baseOptions.includes(option) && option !== answer) {
          baseOptions.push(option)
        }
      }
      options = baseOptions.sort(() => Math.random() - 0.5)
    } else {
      // Ecuaciones de segundo grado: x² + bx + c = 0
      const x1 = Math.floor(Math.random() * 10) - 5 // -5 a 5
      const x2 = Math.floor(Math.random() * 10) - 5 // -5 a 5
      const b = -(x1 + x2)
      const c = x1 * x2
      
      // Mostrar solo una de las soluciones
      const solutions = [x1, x2].filter(x => x !== 0)
      answer = solutions[Math.floor(Math.random() * solutions.length)]
      
      equation = `x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`
      
      // Generar opciones múltiples
      const baseOptions = [answer]
      while (baseOptions.length < 4) {
        const option = answer + Math.floor(Math.random() * 8) - 4
        if (!baseOptions.includes(option) && option !== answer) {
          baseOptions.push(option)
        }
      }
      options = baseOptions.sort(() => Math.random() - 0.5)
    }

    return {
      equation,
      answer,
      type,
      options
    }
  }, [])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(60)
    setScore(0)
    setGameResult(null)
    setFeedback(null)
    setCurrentQuestion(1)
    setCurrentEquation(generateEquation())
    setSelectedAnswer(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(60)
    setScore(0)
    setCurrentEquation(null)
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
    if (!currentEquation || !isActive || selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentEquation.answer
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 2 seconds and generate new equation
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
      
      setCurrentEquation(generateEquation())
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
        if (points >= 10) return { rank: 'Genio', emoji: '🤯' }
        if (points >= 7) return { rank: 'Rápido', emoji: '⚡' }
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
        title="Ecuaciones Exprés"
        description="Resuelve ecuaciones de primer y segundo grado en tiempo limitado. ¡Desafía tu agilidad algebraica!"
        introduction="¡Bienvenido a Ecuaciones Exprés! Resuelve ecuaciones de primer grado (ax + b = c) y segundo grado (x² + bx + c = 0) en tiempo limitado. Tienes 60 segundos para resolver la mayor cantidad posible. Cada ecuación correcta suma 1 punto. ¿Podrás dominar el álgebra como un experto? ¡Demuestra tu habilidad con las ecuaciones!"
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
        currentGamePath="/juegos-matematicos/ecuaciones-expres/"
      >
        {currentEquation && (
          <div className="w-full">
            {/* Equation Display */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 text-blue-900 text-2xl sm:text-3xl font-bold px-8 py-6 rounded-lg border-2 border-blue-200 mb-4">
                {currentEquation.equation}
              </div>
              <div className="text-sm text-blue-700 font-medium">
                {currentEquation.type === 'first_degree' ? 'Ecuación de Primer Grado' : 'Ecuación de Segundo Grado'}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentEquation.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  size="lg"
                  className={`h-16 text-xl font-bold transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-900 border-2 border-blue-200 hover:bg-blue-50'
                  }`}
                  disabled={!isActive || feedback !== null}
                >
                  x = {option}
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
                  <Calculator className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Selecciona el valor de x que resuelve la ecuación
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div className="text-center mt-6">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-bold ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {feedback === 'correct' ? (
                    <>
                      <span>✓</span>
                      ¡Correcto! x = {currentEquation.answer}
                    </>
                  ) : (
                    <>
                      <span>✗</span>
                      Incorrecto. La respuesta era x = {currentEquation.answer}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!currentEquation && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío algebraico!</h3>
              <p className="text-blue-700">
                Resuelve ecuaciones de primer y segundo grado.
                <br />
                Cada ecuación correcta suma 1 punto.
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
