"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Leaf, CheckCircle, XCircle } from 'lucide-react'
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
    question: "¿Qué nombre recibe el primer nivel de la cadena alimenticia?",
    options: ["Consumidores", "Productores", "Descomponedores"],
    correctAnswer: 1,
    explanation: "Los productores (plantas, algas) son el primer nivel de la cadena alimenticia. Convierten la energía solar en energía química a través de la fotosíntesis.",
    type: 'multiple'
  },
  {
    id: 2,
    question: "¿Qué bioma se caracteriza por lluvias abundantes y alta biodiversidad?",
    options: ["Desierto", "Selva tropical", "Tundra"],
    correctAnswer: 1,
    explanation: "La selva tropical se caracteriza por lluvias abundantes (más de 2000 mm anuales) y la mayor biodiversidad del planeta, con millones de especies.",
    type: 'multiple'
  },
  {
    id: 3,
    question: "¿Qué organismo descompone la materia orgánica?",
    options: ["Hongos", "Plantas", "Mamíferos"],
    correctAnswer: 0,
    explanation: "Los hongos son los principales descomponedores de materia orgánica, junto con bacterias. Descomponen restos de plantas y animales, reciclando nutrientes.",
    type: 'multiple'
  },
  {
    id: 4,
    question: "Verdadero/Falso: Un herbívoro es un consumidor primario.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
    explanation: "Verdadero. Los herbívoros son consumidores primarios porque se alimentan directamente de los productores (plantas), ocupando el segundo nivel trófico.",
    type: 'truefalse'
  },
  {
    id: 5,
    question: "¿Qué gas emiten en exceso los combustibles fósiles?",
    options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno"],
    correctAnswer: 1,
    explanation: "Los combustibles fósiles emiten principalmente dióxido de carbono (CO₂) en exceso, contribuyendo al efecto invernadero y al cambio climático.",
    type: 'multiple'
  },
  {
    id: 6,
    question: "¿Qué bioma es característico de África, con hierbas altas y pocos árboles?",
    options: ["Sabana", "Selva", "Desierto"],
    correctAnswer: 0,
    explanation: "La sabana es un bioma característico de África con hierbas altas, pocos árboles dispersos y una estación seca y otra húmeda bien definidas.",
    type: 'multiple'
  },
  {
    id: 7,
    question: "¿Qué significa biodiversidad?",
    options: ["Cantidad de biomasa", "Variedad de especies", "Número de depredadores"],
    correctAnswer: 1,
    explanation: "La biodiversidad se refiere a la variedad de especies vivas en un ecosistema, incluyendo diversidad genética, de especies y de ecosistemas.",
    type: 'multiple'
  },
  {
    id: 8,
    question: "¿Qué ocurre si se elimina un depredador de un ecosistema?",
    options: ["Nada cambia", "Aumentan los herbívoros", "Disminuye la vegetación"],
    correctAnswer: 1,
    explanation: "Si se elimina un depredador, los herbívoros aumentan descontroladamente, lo que puede llevar a la sobrepoblación y agotamiento de recursos vegetales.",
    type: 'multiple'
  },
  {
    id: 9,
    question: "¿Qué capa protege la vida en la Tierra de los rayos UV?",
    options: ["Estratósfera", "Capa de ozono", "Troposfera"],
    correctAnswer: 1,
    explanation: "La capa de ozono, ubicada en la estratósfera, absorbe la mayor parte de la radiación ultravioleta del Sol, protegiendo la vida en la Tierra.",
    type: 'multiple'
  },
  {
    id: 10,
    question: "Verdadero/Falso: Todos los ecosistemas terrestres dependen en última instancia de la energía solar.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
    explanation: "Verdadero. Todos los ecosistemas terrestres dependen de la energía solar, que es capturada por los productores a través de la fotosíntesis y fluye por toda la cadena alimentaria.",
    type: 'truefalse'
  }
]

export default function QuizEcologiaEcosistemasClient() {
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
        rank: "¡Ecólogo Experto! 🌱",
        message: "¡Increíble! Dominas perfectamente los ecosistemas y la ecología. Eres un verdadero experto en ciencias ambientales.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Conocedor de Ecosistemas! 🌿",
        message: "¡Muy bien! Tienes un buen conocimiento sobre ecología y ecosistemas. Sigue explorando las ciencias ambientales.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "¡Aprendiz de Ecología! 🌳",
        message: "¡Sigue estudiando! La ecología es fascinante y hay mucho más por descubrir sobre los ecosistemas y la biodiversidad.",
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
      emoji: "🌱"
    }
  }, [gameState, score, getRankInfo])

  const introduction = "Aprende sobre los ecosistemas, cadenas alimentarias, biodiversidad y el equilibrio ecológico. Descubre cómo interactúan los seres vivos con su entorno."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Quiz de Ecología y Ecosistemas',
            description: 'Aprende sobre los ecosistemas, cadenas alimentarias, biodiversidad y el equilibrio ecológico. Descubre cómo interactúan los seres vivos con su entorno.',
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-ecologia-ecosistemas',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz de Ecología y Ecosistemas"
        description="Aprende sobre los ecosistemas, cadenas alimentarias, biodiversidad y el equilibrio ecológico. Descubre cómo interactúan los seres vivos con su entorno."
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
        currentTriviaPath="/trivias/quiz-ecologia-ecosistemas"
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
