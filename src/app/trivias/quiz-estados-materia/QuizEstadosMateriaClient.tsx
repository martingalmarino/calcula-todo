"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Layers, CheckCircle, XCircle } from 'lucide-react'
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
    question: '¿Cuáles son los tres estados clásicos de la materia?',
    options: ['Plasma, sólido, gas', 'Sólido, líquido, gas', 'Líquido, plasma, energía'],
    correctAnswer: 1,
    explanation: 'Los tres estados clásicos de la materia son sólido, líquido y gas. El plasma es considerado el cuarto estado de la materia.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué estado se conoce como el "cuarto estado de la materia"?',
    options: ['Plasma', 'Cristal', 'Energía oscura'],
    correctAnswer: 0,
    explanation: 'El plasma es conocido como el cuarto estado de la materia. Es un gas ionizado que contiene partículas cargadas eléctricamente.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿Cómo se llama el paso de sólido a gas directamente?',
    options: ['Evaporación', 'Sublimación', 'Condensación'],
    correctAnswer: 1,
    explanation: 'La sublimación es el proceso por el cual una sustancia pasa directamente del estado sólido al gaseoso, sin pasar por el estado líquido.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'El agua al congelarse se expande.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. El agua es una sustancia inusual porque se expande al congelarse, lo que hace que el hielo sea menos denso que el agua líquida.',
    type: 'truefalse'
  },
  {
    id: 5,
    question: '¿Qué proceso transforma un gas en líquido?',
    options: ['Fusión', 'Condensación', 'Solidificación'],
    correctAnswer: 1,
    explanation: 'La condensación es el proceso por el cual un gas se transforma en líquido, generalmente debido a una disminución de la temperatura.',
    type: 'multiple'
  },
  {
    id: 6,
    question: '¿Qué ocurre en la fusión nuclear?',
    options: ['Un átomo se divide', 'Dos átomos se unen', 'Los átomos se enfrían'],
    correctAnswer: 1,
    explanation: 'En la fusión nuclear, dos núcleos atómicos ligeros se unen para formar un núcleo más pesado, liberando una gran cantidad de energía.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Qué caracteriza a un sólido?',
    options: ['Forma definida', 'Volumen indefinido', 'Partículas muy separadas'],
    correctAnswer: 0,
    explanation: 'Los sólidos tienen forma y volumen definidos. Sus partículas están muy juntas y organizadas en estructuras rígidas.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'El plasma es común en la Tierra.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. El plasma es raro en la Tierra en condiciones naturales, aunque se puede encontrar en relámpagos o en lámparas especiales como las de neón.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: '¿Qué cambio de estado ocurre en el hielo seco cuando se "evapora"?',
    options: ['Fusión', 'Sublimación', 'Condensación'],
    correctAnswer: 1,
    explanation: 'El hielo seco (dióxido de carbono sólido) se sublima, pasando directamente de sólido a gas sin formar líquido.',
    type: 'multiple'
  },
  {
    id: 10,
    question: '¿Qué propiedad tienen los gases?',
    options: ['Ocupan todo el volumen disponible', 'Mantienen forma fija', 'Son siempre visibles'],
    correctAnswer: 0,
    explanation: 'Los gases ocupan todo el volumen disponible del recipiente que los contiene, adaptándose a su forma y expandiéndose libremente.',
    type: 'multiple'
  }
]

export default function QuizEstadosMateriaClient() {
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
        rank: "¡Físico Experto! ⚛️",
        message: "¡Increíble! Dominas perfectamente los estados de la materia y los procesos físicos. Eres un verdadero experto en física.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Conocedor de la Materia! 🔬",
        message: "¡Muy bien! Tienes un buen conocimiento sobre los estados de la materia. Sigue explorando el fascinante mundo de la física.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "¡Aprendiz de Física! 🧪",
        message: "¡Sigue estudiando! Los estados de la materia son fundamentales para entender el mundo que nos rodea.",
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
      emoji: "⚛️"
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

  const introduction = "Sumérgete en el mundo de la física y descubre los diferentes estados de la materia. Aprende sobre sólidos, líquidos, gases, plasma y los procesos de cambio de estado."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: "Quiz sobre Estados de la Materia",
            description: introduction,
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-estados-materia',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz sobre Estados de la Materia"
        description="Sumérgete en el mundo de la física y descubre los diferentes estados de la materia. Aprende sobre sólidos, líquidos, gases, plasma y los procesos de cambio de estado."
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
        currentTriviaPath="/trivias/quiz-estados-materia"
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
