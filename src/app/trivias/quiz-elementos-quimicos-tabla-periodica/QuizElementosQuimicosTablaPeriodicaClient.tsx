"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Atom, CheckCircle, XCircle } from 'lucide-react'
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
    question: "¿Cuál es el elemento con número atómico 1?",
    options: ["Helio", "Hidrógeno", "Litio"],
    correctAnswer: 1,
    explanation: "El hidrógeno es el elemento con número atómico 1, siendo el elemento más simple y abundante en el universo. Su símbolo químico es H.",
    type: 'multiple'
  },
  {
    id: 2,
    question: "¿Cuál es el símbolo químico del oro?",
    options: ["Go", "Or", "Au"],
    correctAnswer: 2,
    explanation: "El símbolo químico del oro es Au, que proviene del latín 'aurum'. Es un metal precioso de color amarillo brillante.",
    type: 'multiple'
  },
  {
    id: 3,
    question: "¿Qué gas se usa en los globos aerostáticos?",
    options: ["Hidrógeno", "Helio", "Oxígeno"],
    correctAnswer: 1,
    explanation: "El helio se usa en los globos aerostáticos porque es más ligero que el aire y no es inflamable, a diferencia del hidrógeno que es peligroso.",
    type: 'multiple'
  },
  {
    id: 4,
    question: "Verdadero/Falso: El oxígeno pertenece a la familia de los halógenos.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 1,
    explanation: "Falso. El oxígeno pertenece a la familia de los calcógenos (grupo 16), no a los halógenos (grupo 17). Los halógenos incluyen flúor, cloro, bromo, etc.",
    type: 'truefalse'
  },
  {
    id: 5,
    question: "¿Cuál es el elemento más abundante en la corteza terrestre?",
    options: ["Silicio", "Oxígeno", "Aluminio"],
    correctAnswer: 1,
    explanation: "El oxígeno es el elemento más abundante en la corteza terrestre, representando aproximadamente el 46% de su masa. El silicio es el segundo más abundante.",
    type: 'multiple'
  },
  {
    id: 6,
    question: "¿Qué familia se conoce como 'gases nobles'?",
    options: ["Grupo 18", "Grupo 1", "Grupo 7"],
    correctAnswer: 0,
    explanation: "Los gases nobles son el grupo 18 de la tabla periódica, incluyendo helio, neón, argón, kriptón, xenón y radón. Son muy estables y poco reactivos.",
    type: 'multiple'
  },
  {
    id: 7,
    question: "¿Cuál es el símbolo químico del sodio?",
    options: ["So", "Na", "Sd"],
    correctAnswer: 1,
    explanation: "El símbolo químico del sodio es Na, que proviene del latín 'natrium'. Es un metal alcalino muy reactivo del grupo 1.",
    type: 'multiple'
  },
  {
    id: 8,
    question: "¿Qué elemento es líquido a temperatura ambiente?",
    options: ["Mercurio", "Hierro", "Litio"],
    correctAnswer: 0,
    explanation: "El mercurio es el único metal que es líquido a temperatura ambiente. Su punto de fusión es de -38.87°C, por lo que permanece líquido en condiciones normales.",
    type: 'multiple'
  },
  {
    id: 9,
    question: "¿Qué elemento se conoce como el 'ladrillo de la vida'?",
    options: ["Carbono", "Oxígeno", "Nitrógeno"],
    correctAnswer: 0,
    explanation: "El carbono se conoce como el 'ladrillo de la vida' porque forma la base de todas las moléculas orgánicas y es esencial para la vida tal como la conocemos.",
    type: 'multiple'
  },
  {
    id: 10,
    question: "¿Qué científico creó la primera versión de la tabla periódica?",
    options: ["Mendel", "Mendeleiev", "Rutherford"],
    correctAnswer: 1,
    explanation: "Dmitri Mendeleiev creó la primera versión de la tabla periódica en 1869, organizando los elementos por peso atómico y prediciendo propiedades de elementos aún no descubiertos.",
    type: 'multiple'
  }
]

export default function QuizElementosQuimicosTablaPeriodicaClient() {
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
        rank: "¡Químico Experto! ⚗️",
        message: "¡Increíble! Dominas perfectamente la tabla periódica y los elementos químicos. Eres un verdadero experto en química.",
        color: "text-blue-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Conocedor de Elementos! 🧪",
        message: "¡Muy bien! Tienes un buen conocimiento sobre elementos químicos y la tabla periódica. Sigue explorando la química.",
        color: "text-green-600"
      }
    } else {
      return {
        rank: "¡Aprendiz de Química! 🔬",
        message: "¡Sigue estudiando! La química es fascinante y hay mucho más por descubrir sobre los elementos y sus propiedades.",
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
      emoji: "⚗️"
    }
  }, [gameState, score, getRankInfo])

  const introduction = "Sumérgete en el mundo de la química y la tabla periódica. Descubre los elementos, sus símbolos, propiedades y la organización de la tabla periódica moderna."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Quiz de Elementos Químicos y Tabla Periódica',
            description: 'Sumérgete en el mundo de la química y la tabla periódica. Descubre los elementos, sus símbolos, propiedades y la organización de la tabla periódica moderna.',
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-elementos-quimicos-tabla-periodica',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz de Elementos Químicos y Tabla Periódica"
        description="Sumérgete en el mundo de la química y la tabla periódica. Descubre los elementos, sus símbolos, propiedades y la organización de la tabla periódica moderna."
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
        currentTriviaPath="/trivias/quiz-elementos-quimicos-tabla-periodica"
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
