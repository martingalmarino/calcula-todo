"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Ruler } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuántos centímetros tiene un metro?",
    options: ["10", "100", "1000"],
    correctAnswer: 1,
    explanation: "Un metro tiene 100 centímetros. Esta es una conversión básica del Sistema Internacional de Unidades (SI)."
  },
  {
    id: 2,
    question: "¿Cuál es la unidad básica de masa en el Sistema Internacional?",
    options: ["Gramo", "Kilogramo", "Libra"],
    correctAnswer: 1,
    explanation: "El kilogramo (kg) es la unidad básica de masa en el Sistema Internacional de Unidades (SI)."
  },
  {
    id: 3,
    question: "¿Cuántos mililitros hay en un litro?",
    options: ["10", "100", "1000"],
    correctAnswer: 2,
    explanation: "Un litro contiene 1000 mililitros. El litro es una unidad de volumen del Sistema Internacional."
  },
  {
    id: 4,
    question: "¿Qué mide un termómetro?",
    options: ["Presión", "Temperatura", "Velocidad"],
    correctAnswer: 1,
    explanation: "Un termómetro mide la temperatura. La unidad básica de temperatura en el SI es el kelvin (K)."
  },
  {
    id: 5,
    question: "¿Qué instrumento mide la presión atmosférica?",
    options: ["Barómetro", "Micrómetro", "Telescopio"],
    correctAnswer: 0,
    explanation: "Un barómetro mide la presión atmosférica. La unidad de presión en el SI es el pascal (Pa)."
  },
  {
    id: 6,
    question: "¿Cuánto equivale 1 tonelada?",
    options: ["100 kg", "1000 kg", "10.000 kg"],
    correctAnswer: 1,
    explanation: "Una tonelada equivale a 1000 kilogramos. Es una unidad de masa múltiplo del kilogramo."
  },
  {
    id: 7,
    question: "¿Qué mide un amperímetro?",
    options: ["Corriente eléctrica", "Resistencia", "Voltaje"],
    correctAnswer: 0,
    explanation: "Un amperímetro mide la corriente eléctrica. La unidad de corriente en el SI es el amperio (A)."
  },
  {
    id: 8,
    question: "¿Cuál es la unidad de energía en el SI?",
    options: ["Joule", "Watt", "Newton"],
    correctAnswer: 0,
    explanation: "El joule (J) es la unidad de energía en el Sistema Internacional. Un joule equivale a un newton por metro."
  },
  {
    id: 9,
    question: "¿Qué mide un anemómetro?",
    options: ["Velocidad del viento", "Intensidad de la luz", "Humedad"],
    correctAnswer: 0,
    explanation: "Un anemómetro mide la velocidad del viento. Se expresa comúnmente en metros por segundo (m/s) o kilómetros por hora (km/h)."
  },
  {
    id: 10,
    question: "¿Qué mide la escala Richter?",
    options: ["Intensidad de terremotos", "Fuerza del viento", "Radiación solar"],
    correctAnswer: 0,
    explanation: "La escala Richter mide la magnitud de los terremotos. Es una escala logarítmica que va de 0 a 10."
  }
]

export default function QuizUnidadesMedidaClient() {
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
        rank: "Experto en Unidades de Medida 📏",
        message: "¡Excelente! Dominas perfectamente el Sistema Internacional de Unidades y los instrumentos de medición.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "Conocedor de Medidas 📐",
        message: "¡Muy bien! Tienes un buen conocimiento sobre unidades de medida e instrumentos científicos.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "Aprendiz de Medidas 📊",
        message: "¡Sigue estudiando! Las unidades de medida son fundamentales en la ciencia y la vida cotidiana.",
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
  }, [selectedAnswer, showFeedback, currentQuestion.correctAnswer, currentQuestion.id, currentQuestionIndex, totalQuestions])

  const startQuiz = useCallback(() => {
    setGameState('playing')
  }, [])

  const resetGame = useCallback(() => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(300)
    setGameState('intro')
    setSelectedAnswer(null)
    setShowFeedback(false)
  }, [])

  const shareResult = useCallback(async () => {
    const rankInfo = getRankInfo(score)
    const message = `📏 Acabo de completar el Quiz sobre Unidades de Medida y obtuve ${score}/${totalQuestions} puntos. ${rankInfo.rank}\n\n¡Pon a prueba tus conocimientos sobre el Sistema Internacional de Unidades! 🚀`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz sobre Unidades de Medida',
          text: message,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${message}\n${window.location.href}`)
        alert('¡Resultado copiado al portapapeles!')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }, [score, totalQuestions, getRankInfo])

  const rankInfo = useMemo(() => getRankInfo(score), [score, getRankInfo])

  const introduction = "Aprende sobre el Sistema Internacional de Unidades y los instrumentos de medición. Este quiz te permitirá conocer las unidades básicas de longitud, masa, volumen, temperatura y más, así como los instrumentos científicos que las miden."

  const quizResult = gameState === 'finished' ? {
    points: score,
    rank: rankInfo.rank,
    emoji: score >= totalQuestions * 0.8 ? "📏" : score >= totalQuestions * 0.6 ? "📐" : "📊"
  } : null

  return (
    <QuizLayout
      title="Quiz sobre unidades de medida"
      description="Aprende sobre el Sistema Internacional de Unidades y los instrumentos de medición. Descubre las unidades básicas de longitud, masa, volumen y más."
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
      currentTriviaPath="/trivias/quiz-unidades-medida"
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
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            )
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✗</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Explicación:</strong> {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuizLayout>
  )
}
