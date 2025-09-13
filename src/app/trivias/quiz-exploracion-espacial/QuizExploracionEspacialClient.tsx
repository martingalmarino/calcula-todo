"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Rocket, CheckCircle, XCircle } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple' | 'truefalse'
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿Quién fue el primer ser humano en viajar al espacio?',
    options: ['Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
    correctAnswer: 1,
    explanation: 'Yuri Gagarin fue el primer ser humano en viajar al espacio el 12 de abril de 1961, a bordo de la nave Vostok 1.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué misión llevó al primer hombre a la Luna?',
    options: ['Apollo 11', 'Apollo 13', 'Sputnik 1'],
    correctAnswer: 0,
    explanation: 'La misión Apollo 11 llevó a Neil Armstrong y Buzz Aldrin a la Luna el 20 de julio de 1969, siendo Armstrong el primer hombre en pisar la superficie lunar.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿En qué año el hombre pisó la Luna?',
    options: ['1965', '1969', '1972'],
    correctAnswer: 1,
    explanation: 'El primer alunizaje tripulado ocurrió el 20 de julio de 1969, durante la misión Apollo 11.',
    type: 'multiple'
  },
  {
    id: 4,
    question: '¿Qué telescopio espacial revolucionó la astronomía moderna?',
    options: ['James Webb', 'Hubble', 'Chandra'],
    correctAnswer: 1,
    explanation: 'El Telescopio Espacial Hubble, lanzado en 1990, revolucionó la astronomía moderna proporcionando imágenes sin precedentes del universo.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'La Estación Espacial Internacional fue lanzada en los años 80.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. La ISS comenzó a construirse en 1998. Su primer módulo, Zarya, fue lanzado el 20 de noviembre de 1998.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué sonda fue la primera en abandonar el sistema solar?',
    options: ['Voyager 1', 'Pioneer 10', 'Cassini'],
    correctAnswer: 0,
    explanation: 'La sonda Voyager 1 fue la primera nave espacial en abandonar el sistema solar, cruzando la heliopausa en 2012.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Qué planeta exploró la misión Curiosity?',
    options: ['Marte', 'Venus', 'Saturno'],
    correctAnswer: 0,
    explanation: 'El rover Curiosity de la NASA explora la superficie de Marte desde su aterrizaje en el cráter Gale en agosto de 2012.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Quién fue la primera mujer en el espacio?',
    options: ['Valentina Tereshkova', 'Sally Ride', 'Christina Koch'],
    correctAnswer: 0,
    explanation: 'Valentina Tereshkova fue la primera mujer en viajar al espacio el 16 de junio de 1963, a bordo de la nave Vostok 6.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Qué país lanzó el primer satélite artificial (Sputnik 1)?',
    options: ['EE.UU.', 'Unión Soviética', 'China'],
    correctAnswer: 1,
    explanation: 'La Unión Soviética lanzó el primer satélite artificial, Sputnik 1, el 4 de octubre de 1957, marcando el inicio de la era espacial.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'El telescopio James Webb observa principalmente en luz visible.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. El Telescopio Espacial James Webb está diseñado para observar principalmente en el espectro infrarrojo, no en luz visible.',
    type: 'truefalse'
  }
]

export default function QuizExploracionEspacialClient() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const getRankInfo = useCallback((points: number) => {
    const percentage = (points / totalQuestions) * 100
    
    if (percentage >= 80) {
      return {
        rank: "¡Astronauta Experto! 🚀",
        message: "¡Increíble! Dominas perfectamente la historia de la exploración espacial. Eres un verdadero experto en misiones espaciales.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Explorador Espacial! 🌟",
        message: "¡Muy bien! Tienes un buen conocimiento sobre la exploración espacial. Sigue descubriendo los logros de la humanidad en el espacio.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "¡Aprendiz del Espacio! 🛸",
        message: "¡Sigue estudiando! La exploración espacial es fascinante y hay muchos hitos importantes por descubrir.",
        color: "text-orange-600"
      }
    }
  }, [totalQuestions])

  const checkAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null || showFeedback) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setGameState('finished')
      }
    }, 2000)
  }, [currentQuestion.correctAnswer, currentQuestionIndex, selectedAnswer, showFeedback, totalQuestions])

  const startQuiz = useCallback(() => {
    setGameState('playing')
  }, [])

  const resetGame = useCallback(() => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setGameState('intro')
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTimeLeft(300)
  }, [])

  const quizResult = useMemo(() => {
    if (gameState !== 'finished') return null
    const rankInfo = getRankInfo(score)
    return {
      points: score,
      rank: rankInfo.rank,
      emoji: "🚀"
    }
  }, [gameState, score, getRankInfo])

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === 'playing' && timeLeft > 0 && !quizResult) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished')
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [gameState, timeLeft, quizResult])

  const introduction = "Viaja a través de la historia de la exploración espacial. Desde Yuri Gagarin hasta las misiones modernas, descubre los hitos más importantes de la conquista del espacio."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: "Quiz de Exploración Espacial",
            description: introduction,
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-exploracion-espacial',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz de Exploración Espacial"
        description="Viaja a través de la historia de la exploración espacial. Desde Yuri Gagarin hasta las misiones modernas, descubre los hitos más importantes de la conquista del espacio."
        introduction={introduction}
        onStart={startQuiz}
        onReset={resetGame}
        isActive={gameState === 'playing'}
        timeLeft={timeLeft}
        score={score}
        feedback={null}
        quizResult={quizResult}
        showIntroduction={gameState === 'intro'}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        currentTriviaPath="/trivias/quiz-exploracion-espacial"
        relatedCalculator="/salud/imc"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:bg-blue-50"
              
              if (selectedAnswer !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " bg-green-600 hover:bg-green-700 text-white border-green-600"
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  buttonClass += " bg-red-600 hover:bg-red-700 text-white border-red-600"
                } else {
                  buttonClass += " bg-gray-100 text-gray-500 border-gray-300"
                }
              } else {
                buttonClass += " border-gray-300 hover:border-blue-400"
              }

              return (
                <button
                  key={index}
                  onClick={() => checkAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  {currentQuestion.type === 'truefalse' ? (
                    <span className="font-medium">{option}</span>
                  ) : (
                    <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                  )}
                </button>
              )
            })}
          </div>

          {showFeedback && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? "¡Correcto!" : "Incorrecto"}
                  </p>
                  <p className="text-sm text-gray-700">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </QuizLayout>
    </>
  )
}
