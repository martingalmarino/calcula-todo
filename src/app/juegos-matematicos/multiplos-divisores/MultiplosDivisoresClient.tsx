"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Hash } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Challenge {
  type: 'multiple' | 'divisor'
  number: number
  numbers: number[]
  correctAnswers: number[]
  question: string
}

const structuredData = jsonLdCalculator({
  name: 'Desafío de Múltiplos y Divisores',
  description: 'Juego educativo para identificar rápidamente múltiplos y divisores',
  url: '/juegos-matematicos/multiplos-divisores',
  category: 'Juegos de Matemáticas'
})

export default function MultiplosDivisoresClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate challenge
  const generateChallenge = useCallback((): Challenge => {
    const challengeTypes: Array<'multiple' | 'divisor'> = ['multiple', 'divisor']
    const type = challengeTypes[Math.floor(Math.random() * challengeTypes.length)]
    
    let number: number
    let question: string
    let correctAnswers: number[]
    let numbers: number[]
    
    if (type === 'multiple') {
      // Múltiplos: generar números del 2 al 9
      number = Math.floor(Math.random() * 8) + 2 // 2-9
      question = `Selecciona los múltiplos de ${number}`
      
      // Generar números del 1 al 50
      const allNumbers = Array.from({ length: 50 }, (_, i) => i + 1)
      numbers = allNumbers.sort(() => Math.random() - 0.5).slice(0, 20) // 20 números aleatorios
      
      // Encontrar múltiplos
      correctAnswers = numbers.filter(n => n % number === 0)
    } else {
      // Divisores: generar números del 2 al 12
      number = Math.floor(Math.random() * 11) + 2 // 2-12
      question = `Selecciona los números divisibles por ${number}`
      
      // Generar números del 1 al 50
      const allNumbers = Array.from({ length: 50 }, (_, i) => i + 1)
      numbers = allNumbers.sort(() => Math.random() - 0.5).slice(0, 20) // 20 números aleatorios
      
      // Encontrar divisibles
      correctAnswers = numbers.filter(n => n % number === 0)
    }

    return {
      type,
      number,
      numbers,
      correctAnswers,
      question
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
    setCurrentChallenge(generateChallenge())
    setSelectedNumbers([])
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentChallenge(null)
    setSelectedNumbers([])
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Handle number selection
  const handleNumberClick = (number: number) => {
    if (!isActive || !currentChallenge) return

    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number)
      } else {
        return [...prev, number]
      }
    })
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentChallenge || !isActive) return

    // Verificar si todas las respuestas correctas están seleccionadas
    // y no hay respuestas incorrectas seleccionadas
    const allCorrectSelected = currentChallenge.correctAnswers.every(answer => 
      selectedNumbers.includes(answer)
    )
    const noIncorrectSelected = selectedNumbers.every(selected => 
      currentChallenge.correctAnswers.includes(selected)
    )
    
    const isCorrect = allCorrectSelected && noIncorrectSelected && selectedNumbers.length > 0
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 1.5 seconds and generate new challenge
    setTimeout(() => {
      setFeedback(null)
      setSelectedNumbers([])
      
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
      
      setCurrentChallenge(generateChallenge())
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
        title="Desafío de Múltiplos y Divisores"
        description="Identifica rápidamente múltiplos y divisores. ¡Mejora tu agilidad mental con números!"
        introduction="¡Bienvenido al desafío de múltiplos y divisores! Selecciona rápidamente los números que cumplan la condición mostrada. Tienes 30 segundos para resolver la mayor cantidad posible. Cada respuesta correcta suma 1 punto. ¿Podrás alcanzar el nivel de Genio? ¡Demuestra tu agilidad mental con números!"
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
        currentGamePath="/juegos-matematicos/multiplos-divisores/"
      >
        {currentChallenge && (
          <div className="w-full">
            {/* Challenge Question */}
            <div className="text-center mb-6">
              <div className="bg-blue-50 text-blue-900 text-xl sm:text-2xl font-bold px-6 py-4 rounded-lg border-2 border-blue-200 inline-block">
                {currentChallenge.question}
              </div>
            </div>

            {/* Numbers Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-6">
              {currentChallenge.numbers.map((number) => {
                const isSelected = selectedNumbers.includes(number)
                const isCorrect = currentChallenge.correctAnswers.includes(number)
                
                return (
                  <Button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                    variant={isSelected ? 'default' : 'outline'}
                    size="lg"
                    className={`text-lg font-bold py-4 h-auto transition-all duration-200 ${
                      isSelected 
                        ? isCorrect 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                    disabled={!isActive}
                  >
                    {number}
                  </Button>
                )
              })}
            </div>

            {/* Check Answer Button */}
            {isActive && selectedNumbers.length > 0 && (
              <div className="text-center">
                <Button 
                  onClick={checkAnswer}
                  size="lg"
                  className="calculator-button text-lg py-4"
                >
                  <Hash className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Haz clic en los números que cumplan la condición
              </div>
            )}
          </div>
        )}

        {!currentChallenge && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Hash className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Selecciona los números que cumplan la condición mostrada.
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
