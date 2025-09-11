"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Target } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Equation {
  num1: number
  num2: number
  operator: '+' | '-'
  missingPosition: 'first' | 'second' | 'result'
  correctAnswer: number
  options: number[]
}

const structuredData = jsonLdCalculator({
  name: 'Encuentra el Número Faltante',
  description: 'Juego educativo para encontrar el número que falta en ecuaciones matemáticas',
  url: '/juegos-matematicos/numero-faltante',
  category: 'Juegos de Matemáticas'
})

export default function NumeroFaltanteClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate equation with missing number
  const generateEquation = useCallback((): Equation => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operator = Math.random() > 0.5 ? '+' : '-'
    
    let result: number
    if (operator === '+') {
      result = num1 + num2
    } else {
      // Ensure positive result for subtraction
      const maxNum = Math.max(num1, num2)
      const minNum = Math.min(num1, num2)
      result = maxNum - minNum
    }

    // Randomly choose which position to hide
    const positions: Array<'first' | 'second' | 'result'> = ['first', 'second', 'result']
    const missingPosition = positions[Math.floor(Math.random() * positions.length)]

    // Generate correct answer based on missing position
    let correctAnswer: number
    if (missingPosition === 'first') {
      correctAnswer = operator === '+' ? result - num2 : result + num2
    } else if (missingPosition === 'second') {
      correctAnswer = operator === '+' ? result - num1 : num1 - result
    } else {
      correctAnswer = result
    }

    // Generate 4 options including correct answer
    const options = [correctAnswer]
    while (options.length < 4) {
      const randomOption = correctAnswer + Math.floor(Math.random() * 10) - 5
      if (randomOption > 0 && !options.includes(randomOption)) {
        options.push(randomOption)
      }
    }

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    return {
      num1: missingPosition === 'first' ? 0 : num1,
      num2: missingPosition === 'second' ? 0 : num2,
      operator,
      missingPosition,
      correctAnswer,
      options
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
    setCurrentEquation(generateEquation())
    setSelectedAnswer(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentEquation(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Check answer
  const checkAnswer = (answer: number) => {
    if (!currentEquation || !isActive) return

    setSelectedAnswer(answer)
    const isCorrect = answer === currentEquation.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 1 second and generate new equation
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
    }, 1000)
  }

  // Handle key press
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isActive || !currentEquation) return
    
    const key = e.key
    if (key >= '1' && key <= '4') {
      const optionIndex = parseInt(key) - 1
      if (optionIndex < currentEquation.options.length) {
        checkAnswer(currentEquation.options[optionIndex])
      }
    }
  }, [isActive, currentEquation, checkAnswer])

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
        title="Encuentra el Número Faltante"
        description="Encuentra el número que falta en las ecuaciones. ¡Demuestra tu agilidad mental!"
        introduction="¡Bienvenido al desafío de números faltantes! Encuentra el número que falta en cada ecuación matemática. Tienes 30 segundos para resolver la mayor cantidad posible. Cada respuesta correcta suma 1 punto. ¿Podrás alcanzar el nivel de Genio? ¡Demuestra tu agilidad mental!"
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
        currentGamePath="/juegos-matematicos/numero-faltante/"
      >
        {currentEquation && (
          <div className="w-full">
            {/* Math Equation - Mobile-first design */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                  {currentEquation.missingPosition === 'first' ? '?' : currentEquation.num1}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {currentEquation.operator}
                </div>
                <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                  {currentEquation.missingPosition === 'second' ? '?' : currentEquation.num2}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                  =
                </div>
                <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                  {currentEquation.missingPosition === 'result' ? '?' : (currentEquation.operator === '+' ? currentEquation.num1 + currentEquation.num2 : Math.abs(currentEquation.num1 - currentEquation.num2))}
                </div>
              </div>
            </div>

            {/* Answer Options - Mobile optimized */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentEquation.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  variant={selectedAnswer === option ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                  size="lg"
                  className={`text-2xl font-bold py-4 h-auto ${
                    selectedAnswer === option 
                      ? feedback === 'correct' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                      : 'hover:bg-blue-50'
                  }`}
                  disabled={!isActive || selectedAnswer !== null}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600">
                Presiona 1, 2, 3 o 4 para seleccionar tu respuesta
              </div>
            )}
          </div>
        )}

        {!currentEquation && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Target className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Encuentra el número que falta en cada ecuación.
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
