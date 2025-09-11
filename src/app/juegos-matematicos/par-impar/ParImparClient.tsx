"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Hash, Calculator, Zap } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface NumberProblem {
  number: number
  correctAnswer: 'par' | 'impar'
  difficulty: 'easy' | 'medium' | 'hard'
}

const structuredData = jsonLdCalculator({
  name: 'Par o Impar Exprés',
  description: 'Juego educativo de clasificación rápida de números pares e impares',
  url: '/juegos-matematicos/par-impar',
  category: 'Juegos de Matemáticas'
})

export default function ParImparClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<NumberProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<'par' | 'impar' | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const totalQuestions = 20

  // Generate number problem
  const generateProblem = useCallback((): NumberProblem => {
    const difficulties = ['easy', 'medium', 'hard'] as const
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
    
    let min: number
    let max: number

    switch (difficulty) {
      case 'easy':
        min = 1
        max = 50
        break
      case 'medium':
        min = 51
        max = 200
        break
      case 'hard':
        min = 201
        max = 1000
        break
    }

    const number = Math.floor(Math.random() * (max - min + 1)) + min
    const correctAnswer = number % 2 === 0 ? 'par' : 'impar'

    return {
      number,
      correctAnswer,
      difficulty
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
    setStreak(0)
    setMaxStreak(0)
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
    setStreak(0)
    setMaxStreak(0)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: 'par' | 'impar') => {
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
      setStreak(prev => {
        const newStreak = prev + 1
        setMaxStreak(prevMax => Math.max(prevMax, newStreak))
        return newStreak
      })
    } else {
      setStreak(0)
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
        if (points >= 16) return { rank: 'Genio', emoji: '🤯' }
        if (points >= 12) return { rank: 'Rápido', emoji: '⚡' }
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

  // Get difficulty display name and color
  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { name: 'Fácil', color: 'bg-green-100 text-green-800', range: '1-50' }
      case 'medium':
        return { name: 'Medio', color: 'bg-yellow-100 text-yellow-800', range: '51-200' }
      case 'hard':
        return { name: 'Difícil', color: 'bg-red-100 text-red-800', range: '201-1000' }
      default:
        return { name: 'Nivel', color: 'bg-blue-100 text-blue-800', range: '' }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayout
        title="Par o Impar Exprés"
        description="Clasifica números como pares o impares antes de que termine el tiempo. ¡Desafía tu agilidad mental y reconocimiento numérico!"
        introduction="¡Bienvenido a Par o Impar Exprés! Clasifica números rápidamente como pares o impares. Tienes 30 segundos para resolver la mayor cantidad posible. Cada clasificación correcta suma 1 punto. ¡Demuestra tu agilidad mental y reconocimiento numérico instantáneo!"
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
        currentGamePath="/juegos-matematicos/par-impar/"
      >
        {currentProblem && (
          <div className="w-full">
            {/* Difficulty and Streak Indicators */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${getDifficultyInfo(currentProblem.difficulty).color}`}>
                  <Hash className="h-4 w-4" />
                  {getDifficultyInfo(currentProblem.difficulty).name} ({getDifficultyInfo(currentProblem.difficulty).range})
                </div>
              </div>
              
              {streak > 0 && (
                <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm font-semibold">
                  <Zap className="h-4 w-4" />
                  Racha: {streak}
                </div>
              )}
            </div>

            {/* Number Display */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 text-blue-900 px-6 py-12 rounded-lg border-2 border-blue-200">
                <div className="text-sm font-medium mb-4">¿Este número es par o impar?</div>
                
                <div className="bg-white text-blue-900 text-6xl font-bold px-8 py-6 rounded-lg border-2 border-blue-300 min-w-[200px] inline-block">
                  {currentProblem.number}
                </div>
                
                <div className="text-xs text-blue-600 mt-4">
                  Número {currentProblem.number}
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button
                onClick={() => handleAnswerSelect('par')}
                variant={selectedAnswer === 'par' ? "default" : "outline"}
                size="lg"
                className={`h-16 text-lg font-bold transition-all duration-200 ${
                  selectedAnswer === 'par'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-green-900 border-2 border-green-200 hover:bg-green-50'
                }`}
                disabled={!isActive || feedback !== null}
              >
                <Hash className="h-5 w-5 mr-2" />
                PAR
              </Button>
              
              <Button
                onClick={() => handleAnswerSelect('impar')}
                variant={selectedAnswer === 'impar' ? "default" : "outline"}
                size="lg"
                className={`h-16 text-lg font-bold transition-all duration-200 ${
                  selectedAnswer === 'impar'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-900 border-2 border-purple-200 hover:bg-purple-50'
                }`}
                disabled={!isActive || feedback !== null}
              >
                <Hash className="h-5 w-5 mr-2" />
                IMPAR
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
                Selecciona si el número es par o impar
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
                        {streak > 1 && <span className="text-orange-600">(+{streak} racha)</span>}
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
                      `${currentProblem.number} es ${currentProblem.correctAnswer}`
                    ) : (
                      `${currentProblem.number} es ${currentProblem.correctAnswer}, no ${selectedAnswer}`
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Stats Display */}
            {isActive && (
              <div className="mt-6 text-center">
                <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm">
                  <div className="flex justify-center gap-4">
                    <span>Puntos: {score}</span>
                    <span>•</span>
                    <span>Racha: {streak}</span>
                    <span>•</span>
                    <span>Máx: {maxStreak}</span>
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
              <h3 className="text-xl font-bold mb-3">¡Preparado para clasificar!</h3>
              <p className="text-blue-700">
                Clasifica números como pares o impares.
                <br />
                Cada clasificación correcta suma 1 punto.
                <br />
                ¡Mantén la racha para más emoción!
              </p>
            </div>
          </div>
        )}
      </GameLayout>
    </>
  )
}
