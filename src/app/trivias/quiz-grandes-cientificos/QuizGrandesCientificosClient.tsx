"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { getRelatedTrivias } from '@/lib/trivias-config'
import { Microscope } from 'lucide-react'

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
    question: "¿Quién propuso la teoría de la relatividad?",
    options: ["Newton", "Einstein", "Galileo"],
    correctAnswer: 1,
    explanation: "Albert Einstein propuso la teoría de la relatividad especial en 1905 y la teoría de la relatividad general en 1915, revolucionando nuestra comprensión del espacio, tiempo y gravedad."
  },
  {
    id: 2,
    question: "¿Quién es considerado el padre de la física moderna?",
    options: ["Galileo Galilei", "Newton", "Maxwell"],
    correctAnswer: 0,
    explanation: "Galileo Galilei es considerado el padre de la física moderna por sus contribuciones fundamentales al método científico y sus observaciones astronómicas con el telescopio."
  },
  {
    id: 3,
    question: "¿Quién descubrió la penicilina?",
    options: ["Fleming", "Pasteur", "Koch"],
    correctAnswer: 0,
    explanation: "Alexander Fleming descubrió la penicilina en 1928, el primer antibiótico que revolucionó la medicina y salvó millones de vidas."
  },
  {
    id: 4,
    question: "¿Quién formuló la ley de la gravitación universal?",
    options: ["Newton", "Einstein", "Copérnico"],
    correctAnswer: 0,
    explanation: "Isaac Newton formuló la ley de la gravitación universal en 1687, explicando cómo los objetos se atraen entre sí en función de su masa y distancia."
  },
  {
    id: 5,
    question: "¿Quién es conocido como el padre de la genética?",
    options: ["Mendel", "Darwin", "Watson"],
    correctAnswer: 0,
    explanation: "Gregor Mendel es conocido como el padre de la genética por sus experimentos con guisantes que establecieron las leyes fundamentales de la herencia."
  },
  {
    id: 6,
    question: "¿Quién fue la primera mujer en ganar un Premio Nobel?",
    options: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace"],
    correctAnswer: 1,
    explanation: "Marie Curie fue la primera mujer en ganar un Premio Nobel (Física en 1903) y la primera persona en ganar dos Premios Nobel en diferentes disciplinas."
  },
  {
    id: 7,
    question: "¿Quién propuso la teoría de la evolución por selección natural?",
    options: ["Darwin", "Lamarck", "Wallace"],
    correctAnswer: 0,
    explanation: "Charles Darwin propuso la teoría de la evolución por selección natural en 'El origen de las especies' (1859), revolucionando la biología."
  },
  {
    id: 8,
    question: "¿Quién desarrolló la tabla periódica?",
    options: ["Mendeleiev", "Lavoisier", "Dalton"],
    correctAnswer: 0,
    explanation: "Dmitri Mendeleiev desarrolló la tabla periódica de los elementos en 1869, organizando los elementos químicos según sus propiedades atómicas."
  },
  {
    id: 9,
    question: "¿Quién fue el primero en usar un telescopio para estudiar el cielo?",
    options: ["Galileo", "Copérnico", "Kepler"],
    correctAnswer: 0,
    explanation: "Galileo Galilei fue el primero en usar un telescopio para observaciones astronómicas sistemáticas, descubriendo las lunas de Júpiter y las fases de Venus."
  },
  {
    id: 10,
    question: "¿Quién descifró la estructura del ADN en 1953?",
    options: ["Watson y Crick", "Mendel", "Pasteur"],
    correctAnswer: 0,
    explanation: "James Watson y Francis Crick descifraron la estructura de doble hélice del ADN en 1953, uno de los descubrimientos más importantes de la biología molecular."
  }
]

export default function QuizGrandesCientificosClient() {
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
        rank: "Experto en Historia Científica 🧪",
        message: "¡Increíble! Conoces muy bien a los grandes científicos de la historia.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "Conocedor de Ciencia 📚",
        message: "¡Muy bien! Tienes un buen conocimiento sobre los científicos más importantes.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "Aprendiz de Ciencia 🔬",
        message: "¡Sigue estudiando! La historia de la ciencia es fascinante y hay mucho por descubrir.",
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
    const message = `🧪 Acabo de completar el Quiz de Grandes Científicos y obtuve ${score}/${totalQuestions} puntos. ${rankInfo.rank}\n\n¡Pon a prueba tus conocimientos sobre la historia de la ciencia! 🚀`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz de Grandes Científicos',
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

  const introduction = "Descubre los científicos más importantes de la historia y sus contribuciones que cambiaron el mundo de la ciencia. Este quiz te permitirá aprender sobre los descubrimientos y teorías que cambiaron nuestra comprensión del universo."

  const quizResult = gameState === 'finished' ? {
    points: score,
    rank: rankInfo.rank,
    emoji: score >= totalQuestions * 0.8 ? "🧪" : score >= totalQuestions * 0.6 ? "📚" : "🔬"
  } : null

  return (
    <QuizLayout
      title="Quiz de grandes científicos"
      description="Descubre los científicos más importantes de la historia y sus contribuciones que cambiaron el mundo de la ciencia."
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
      currentTriviaPath="/trivias/quiz-grandes-cientificos"
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
