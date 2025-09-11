"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Operation {
  num1: number
  num2: number
  operator: '+' | '-'
  answer: number
}

export default function SumasRestasClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)

  // Generate random operation
  const generateOperation = useCallback((): Operation => {
    const operator = Math.random() < 0.5 ? '+' : '-'
    let num1, num2, answer

    if (operator === '+') {
      num1 = Math.floor(Math.random() * 21) // 0-20
      num2 = Math.floor(Math.random() * 21) // 0-20
      answer = num1 + num2
    } else {
      num1 = Math.floor(Math.random() * 21) // 0-20
      num2 = Math.floor(Math.random() * 21) // 0-20
      // Ensure result is positive
      if (num1 < num2) {
        [num1, num2] = [num2, num1]
      }
      answer = num1 - num2
    }

    return { num1, num2, operator, answer }
  }, [])

  // Start game
  const startGame = () => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(30)
    setScore(0)
    setGameResult(null)
    setFeedback(null)
    setCurrentOperation(generateOperation())
    setUserAnswer('')
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentOperation(null)
    setUserAnswer('')
    setFeedback(null)
    setGameResult(null)
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentOperation || !userAnswer) return

    const userNum = parseInt(userAnswer)
    const isCorrect = userNum === currentOperation.answer

    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 1 second and generate new operation
    setTimeout(() => {
      setFeedback(null)
      setUserAnswer('')
      setCurrentOperation(generateOperation())
    }, 1000)
  }


  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isActive) {
      checkAnswer()
    }
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false)
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      // Game ended
      setIsActive(false)
      const rankInfo = getRankInfo(score)
      setGameResult({
        points: score,
        rank: rankInfo.rank,
        emoji: rankInfo.emoji
      })
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, score])

  // Get rank info
  const getRankInfo = (points: number) => {
    if (points >= 15) return { rank: 'Genio', emoji: '🤯' }
    if (points >= 8) return { rank: 'Rápido', emoji: '⚡' }
    return { rank: 'Principiante', emoji: '🌱' }
  }

  const structuredData = jsonLdCalculator({
    name: 'Sumas y Restas contra Reloj',
    description: 'Juego de sumas y restas contra reloj para mejorar la agilidad mental',
    category: 'Juegos Matemáticos',
    url: '/juegos-matematicos/sumas-restas'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Sumas y Restas contra Reloj"
        description="Resuelve operaciones de suma y resta en 30 segundos. ¡Demuestra tu velocidad mental!"
        introduction="¡Bienvenido al desafío de velocidad mental! Resuelve la mayor cantidad de sumas y restas en solo 30 segundos. Cada respuesta correcta suma 1 punto. ¿Podrás alcanzar el nivel de Genio? ¡Demuestra tu agilidad mental!"
        onStart={startGame}
        onReset={resetGame}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        gameResult={gameResult}
        showIntroduction={showIntroduction}
      >
                {currentOperation && (
                  <div className="w-full">
                    {/* Math Equation - Mobile-first design */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                      {/* Mobile: Stack vertical, Desktop: Horizontal */}
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                          {currentOperation.num1}
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                          {currentOperation.operator}
                        </div>
                        <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                          {currentOperation.num2}
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                          =
                        </div>
                      </div>
                      
                      {/* Answer Input - Touch optimized */}
                      <Input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="?"
                        className="calculator-input text-3xl sm:text-4xl font-bold text-center min-h-[60px] border-2 border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        disabled={!isActive}
                        autoFocus
                      />
                    </div>

                    {/* Validate Button - Mobile optimized */}
                    {isActive && (
                      <Button 
                        onClick={checkAnswer}
                        size="lg"
                        className="calculator-button w-full text-lg py-4"
                        disabled={!userAnswer}
                      >
                        <Calculator className="h-5 w-5 mr-2" />
                        Verificar Respuesta
                      </Button>
                    )}
                  </div>
                )}

        {!currentOperation && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Resuelve la mayor cantidad de sumas y restas en 30 segundos.
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
