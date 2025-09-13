"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Globe, CheckCircle, XCircle } from 'lucide-react'
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
    question: '¿Qué teoría explica el origen del universo?',
    options: ['Big Bang', 'Teoría del Caos', 'Teoría Estática'],
    correctAnswer: 0,
    explanation: 'El Big Bang es la teoría científica más aceptada que explica el origen del universo hace aproximadamente 13.800 millones de años.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Cuál es la galaxia en la que vivimos?',
    options: ['Andrómeda', 'Vía Láctea', 'Sagitario A'],
    correctAnswer: 1,
    explanation: 'Vivimos en la galaxia Vía Láctea, una galaxia espiral que contiene miles de millones de estrellas, incluyendo nuestro Sol.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿Qué tipo de galaxia es la Vía Láctea?',
    options: ['Elíptica', 'Espiral', 'Irregular'],
    correctAnswer: 1,
    explanation: 'La Vía Láctea es una galaxia espiral, caracterizada por sus brazos espirales que se extienden desde el centro galáctico.',
    type: 'multiple'
  },
  {
    id: 4,
    question: '¿Qué se encuentra en el centro de la Vía Láctea?',
    options: ['Un cúmulo estelar', 'Un agujero negro supermasivo', 'Una supernova'],
    correctAnswer: 1,
    explanation: 'En el centro de la Vía Láctea se encuentra Sagitario A*, un agujero negro supermasivo con una masa de aproximadamente 4 millones de soles.',
    type: 'multiple'
  },
  {
    id: 5,
    question: '¿Cuál es la galaxia más cercana a la Vía Láctea?',
    options: ['Triángulo', 'Andrómeda', 'Magallanes'],
    correctAnswer: 1,
    explanation: 'La galaxia de Andrómeda es la galaxia espiral más cercana a la Vía Láctea, ubicada a aproximadamente 2.5 millones de años luz.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Los agujeros negros "aspiran" todo lo que está cerca.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. Los agujeros negros no "aspiran" como una aspiradora. Su atracción gravitacional es como cualquier masa, pero mucho más intensa debido a su concentración extrema.',
    type: 'truefalse'
  },
  {
    id: 7,
    question: '¿Qué mide un año luz?',
    options: ['Tiempo', 'Distancia', 'Masa'],
    correctAnswer: 1,
    explanation: 'Un año luz es una unidad de distancia que representa la distancia que recorre la luz en un año, aproximadamente 9.46 billones de kilómetros.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Qué porcentaje de la materia del universo es materia oscura?',
    options: ['5%', '27%', '75%'],
    correctAnswer: 1,
    explanation: 'La materia oscura constituye aproximadamente el 27% de la masa-energía total del universo, mientras que la materia ordinaria solo representa el 5%.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Qué científico descubrió la expansión del universo?',
    options: ['Galileo', 'Hubble', 'Einstein'],
    correctAnswer: 1,
    explanation: 'Edwin Hubble descubrió la expansión del universo en 1929, observando que las galaxias se alejan de nosotros a velocidades proporcionales a su distancia.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'El Big Bang fue una explosión en un lugar específico del espacio.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. El Big Bang no fue una explosión en el espacio, sino la expansión del espacio mismo. Todo el universo se expandió desde un estado extremadamente denso y caliente.',
    type: 'truefalse'
  }
]

export default function QuizUniversoGalaxiasClient() {
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
        rank: "¡Astrónomo Experto! 🌌",
        message: "¡Increíble! Dominas perfectamente los misterios del universo y las galaxias. Eres un verdadero experto en astronomía.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Explorador Espacial! 🚀",
        message: "¡Muy bien! Tienes un buen conocimiento sobre el universo y las galaxias. Sigue explorando los misterios del cosmos.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "¡Aprendiz del Cosmos! ⭐",
        message: "¡Sigue estudiando! El universo es fascinante y hay mucho más por descubrir sobre galaxias y fenómenos astronómicos.",
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
      emoji: "🌌"
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

  const introduction = "Explora los misterios del cosmos, desde el Big Bang hasta las galaxias distantes. Descubre los secretos del universo, la Vía Láctea y los fenómenos astronómicos más fascinantes."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: "Quiz del Universo y Galaxias",
            description: introduction,
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-universo-galaxias',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz del Universo y Galaxias"
        description="Explora los misterios del cosmos, desde el Big Bang hasta las galaxias distantes. Descubre los secretos del universo, la Vía Láctea y los fenómenos astronómicos más fascinantes."
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
        currentTriviaPath="/trivias/quiz-universo-galaxias"
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
