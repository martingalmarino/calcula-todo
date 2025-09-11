"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Sequence {
  type: 'arithmetic' | 'geometric' | 'square' | 'fibonacci' | 'prime' | 'even_odd'
  sequence: number[]
  missingIndex: number
  correctAnswer: number
  question: string
  options: number[]
}

const structuredData = jsonLdCalculator({
  name: 'Secuencias Numéricas',
  description: 'Juego educativo para completar secuencias numéricas y patrones matemáticos',
  url: '/juegos-matematicos/secuencias',
  category: 'Juegos de Matemáticas'
})

export default function SecuenciasClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate sequence
  const generateSequence = useCallback((): Sequence => {
    const sequenceTypes: Array<'arithmetic' | 'geometric' | 'square' | 'fibonacci' | 'prime' | 'even_odd'> = [
      'arithmetic', 'geometric', 'square', 'fibonacci', 'prime', 'even_odd'
    ]
    const type = sequenceTypes[Math.floor(Math.random() * sequenceTypes.length)]
    
    let sequence: number[]
    let missingIndex: number
    let correctAnswer: number
    let question: string
    
    switch (type) {
      case 'arithmetic':
        // Progresión aritmética: a, a+d, a+2d, a+3d, ...
        const start = Math.floor(Math.random() * 10) + 1
        const difference = Math.floor(Math.random() * 5) + 1
        sequence = [start, start + difference, start + 2 * difference, start + 3 * difference, start + 4 * difference]
        missingIndex = Math.floor(Math.random() * 3) + 1 // No el primero ni el último
        correctAnswer = sequence[missingIndex]
        sequence[missingIndex] = 0 // Marcar como faltante
        question = 'Completa la secuencia aritmética'
        break
        
      case 'geometric':
        // Progresión geométrica: a, a*r, a*r², a*r³, ...
        const base = Math.floor(Math.random() * 5) + 2
        const ratio = Math.floor(Math.random() * 3) + 2
        sequence = [base, base * ratio, base * ratio * ratio, base * ratio * ratio * ratio]
        missingIndex = Math.floor(Math.random() * 2) + 1
        correctAnswer = sequence[missingIndex]
        sequence[missingIndex] = 0
        question = 'Completa la secuencia geométrica'
        break
        
      case 'square':
        // Números cuadrados: 1², 2², 3², 4², ...
        const squareStart = Math.floor(Math.random() * 5) + 1
        sequence = [
          squareStart * squareStart,
          (squareStart + 1) * (squareStart + 1),
          (squareStart + 2) * (squareStart + 2),
          (squareStart + 3) * (squareStart + 3),
          (squareStart + 4) * (squareStart + 4)
        ]
        missingIndex = Math.floor(Math.random() * 3) + 1
        correctAnswer = sequence[missingIndex]
        sequence[missingIndex] = 0
        question = 'Completa la secuencia de cuadrados'
        break
        
      case 'fibonacci':
        // Secuencia de Fibonacci: 1, 1, 2, 3, 5, 8, ...
        sequence = [1, 1, 2, 3, 5, 8, 13, 21]
        missingIndex = Math.floor(Math.random() * 4) + 2 // No los primeros dos
        correctAnswer = sequence[missingIndex]
        sequence[missingIndex] = 0
        question = 'Completa la secuencia de Fibonacci'
        break
        
      case 'prime':
        // Números primos: 2, 3, 5, 7, 11, 13, ...
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        const startIndex = Math.floor(Math.random() * 4)
        sequence = primes.slice(startIndex, startIndex + 5)
        missingIndex = Math.floor(Math.random() * 3) + 1
        correctAnswer = sequence[missingIndex]
        sequence[missingIndex] = 0
        question = 'Completa la secuencia de números primos'
        break
        
      case 'even_odd':
        // Números pares o impares
        const isEven = Math.random() > 0.5
        const evenStart = Math.floor(Math.random() * 10) + 1
        const oddStart = Math.floor(Math.random() * 10) + 1
        if (isEven) {
          sequence = [evenStart * 2, evenStart * 2 + 2, evenStart * 2 + 4, evenStart * 2 + 6, evenStart * 2 + 8]
          question = 'Completa la secuencia de números pares'
        } else {
          sequence = [oddStart * 2 + 1, oddStart * 2 + 3, oddStart * 2 + 5, oddStart * 2 + 7, oddStart * 2 + 9]
          question = 'Completa la secuencia de números impares'
        }
        missingIndex = Math.floor(Math.random() * 3) + 1
        correctAnswer = sequence[missingIndex]
        sequence[missingIndex] = 0
        break
    }
    
    // Generate 4 options (1 correct + 3 incorrect)
    const options: number[] = [correctAnswer]
    
    // Add incorrect options with variations
    while (options.length < 4) {
      let wrongAnswer: number
      
      // Generate wrong answers based on sequence type
      if (type === 'arithmetic') {
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5)
      } else if (type === 'geometric') {
        wrongAnswer = Math.floor(correctAnswer * (0.5 + Math.random()))
      } else if (type === 'square') {
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 20) - 10)
      } else if (type === 'fibonacci') {
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5)
      } else if (type === 'prime') {
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 6) - 3)
      } else {
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 8) - 4)
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
      sequence,
      missingIndex,
      correctAnswer,
      question,
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
    setCurrentSequence(generateSequence())
    setSelectedAnswer(null)
  }

  // Reset game
  const resetGame = () => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentSequence(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setGameResult(null)
    setCurrentQuestion(1)
  }

  // Handle answer selection
  const handleAnswerClick = (answer: number) => {
    if (!isActive || !currentSequence) return
    setSelectedAnswer(answer)
  }

  // Check answer
  const checkAnswer = () => {
    if (!currentSequence || !isActive || selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentSequence.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Clear feedback after 1.5 seconds and generate new sequence
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
      
      setCurrentSequence(generateSequence())
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
        title="Secuencias Numéricas"
        description="Completa secuencias numéricas y patrones matemáticos. ¡Mejora tu lógica y razonamiento!"
        introduction="¡Bienvenido al desafío de secuencias numéricas! Identifica patrones matemáticos y completa las secuencias faltantes. Tienes 30 segundos para resolver la mayor cantidad posible. Cada respuesta correcta suma 1 punto. ¿Podrás reconocer todos los patrones como un experto? ¡Demuestra tu lógica matemática!"
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
        currentGamePath="/juegos-matematicos/secuencias/"
      >
        {currentSequence && (
          <div className="w-full">
            {/* Sequence Question */}
            <div className="text-center mb-6">
              <div className="bg-blue-50 text-blue-900 text-lg sm:text-xl font-semibold px-6 py-4 rounded-lg border-2 border-blue-200">
                {currentSequence.question}
              </div>
            </div>

            {/* Sequence Display */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              {currentSequence.sequence.map((number, index) => (
                <div key={index} className="flex items-center">
                  {number === 0 ? (
                    <div className="w-16 h-16 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-lg font-bold">?</span>
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center">
                      <span className="text-blue-900 text-lg font-bold">{number}</span>
                    </div>
                  )}
                  {index < currentSequence.sequence.length - 1 && (
                    <span className="text-gray-400 text-xl mx-2">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentSequence.options.map((option, index) => {
                const isSelected = selectedAnswer === option
                const isCorrect = option === currentSequence.correctAnswer
                
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
                    {option}
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
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Verificar Respuesta
                </Button>
              </div>
            )}

            {/* Instructions */}
            {isActive && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Selecciona el número que completa la secuencia
              </div>
            )}
          </div>
        )}

        {!currentSequence && !isActive && !showIntroduction && (
          <div className="text-center">
            <div className="bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-200">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3">¡Preparado para el desafío!</h3>
              <p className="text-blue-700">
                Identifica patrones matemáticos y completa las secuencias.
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
