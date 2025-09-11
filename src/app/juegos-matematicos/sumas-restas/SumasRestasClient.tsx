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

  // Next question
  const nextQuestion = () => {
    if (!isActive) return
    checkAnswer()
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
        onStart={startGame}
        onReset={resetGame}
        onNext={nextQuestion}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        gameResult={gameResult}
      >
        {currentOperation && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-4 text-4xl font-bold">
                  <span>{currentOperation.num1}</span>
                  <span className="text-blue-600">{currentOperation.operator}</span>
                  <span>{currentOperation.num2}</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-600">?</span>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tu respuesta"
                    className="text-center text-2xl w-32 h-12"
                    disabled={!isActive}
                    autoFocus
                  />
                </div>

                {isActive && (
                  <Button 
                    onClick={checkAnswer}
                    className="w-full max-w-xs"
                    disabled={!userAnswer}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Verificar Respuesta
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {!currentOperation && !isActive && timeLeft === 30 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <Calculator className="h-16 w-16 mx-auto text-blue-600" />
                <h3 className="text-xl font-semibold">¡Preparado para el desafío!</h3>
                <p className="text-muted-foreground">
                  Resuelve la mayor cantidad de sumas y restas en 30 segundos.
                  <br />
                  Cada respuesta correcta suma 1 punto.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </GameLayout>
    </>
  )
}
