"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { BookOpen, CheckCircle, XCircle } from 'lucide-react'
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
    question: '¿Quién propuso que la Tierra gira alrededor del Sol?',
    options: ['Ptolomeo', 'Copérnico', 'Galileo'],
    correctAnswer: 1,
    explanation: 'Nicolás Copérnico propuso el modelo heliocéntrico en el siglo XVI, revolucionando la astronomía al situar el Sol en el centro del sistema solar.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué científico descubrió la ley de la gravitación universal?',
    options: ['Kepler', 'Newton', 'Descartes'],
    correctAnswer: 1,
    explanation: 'Isaac Newton formuló la ley de la gravitación universal en 1687, explicando la fuerza que mantiene a los planetas en órbita alrededor del Sol.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿Quién desarrolló la teoría de la evolución por selección natural?',
    options: ['Darwin', 'Lamarck', 'Wallace'],
    correctAnswer: 0,
    explanation: 'Charles Darwin desarrolló la teoría de la evolución por selección natural, publicada en "El origen de las especies" en 1859.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Galileo fue condenado por defender el heliocentrismo.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Galileo Galilei fue condenado por la Inquisición en 1633 por defender el modelo heliocéntrico de Copérnico, siendo obligado a retractarse.',
    type: 'truefalse'
  },
  {
    id: 5,
    question: '¿Qué científica descubrió la radiactividad junto a Pierre Curie?',
    options: ['Ada Lovelace', 'Marie Curie', 'Rosalind Franklin'],
    correctAnswer: 1,
    explanation: 'Marie Curie, junto con su esposo Pierre Curie, descubrió la radiactividad y los elementos radio y polonio, siendo la primera mujer en ganar un Premio Nobel.',
    type: 'multiple'
  },
  {
    id: 6,
    question: '¿Qué descubrimiento hizo Alexander Fleming en 1928?',
    options: ['ADN', 'Penicilina', 'Electricidad'],
    correctAnswer: 1,
    explanation: 'Alexander Fleming descubrió la penicilina en 1928, el primer antibiótico, revolucionando la medicina y salvando millones de vidas.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Qué científico formuló la teoría de la relatividad?',
    options: ['Einstein', 'Bohr', 'Planck'],
    correctAnswer: 0,
    explanation: 'Albert Einstein formuló la teoría de la relatividad, tanto la especial (1905) como la general (1915), transformando nuestra comprensión del espacio y el tiempo.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Quién diseñó la primera tabla periódica?',
    options: ['Dalton', 'Mendeleiev', 'Rutherford'],
    correctAnswer: 1,
    explanation: 'Dmitri Mendeleiev diseñó la primera tabla periódica en 1869, organizando los elementos químicos según sus propiedades y prediciendo elementos aún no descubiertos.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Qué inventó Johannes Gutenberg en el siglo XV?',
    options: ['Telescopio', 'Imprenta', 'Microscopio'],
    correctAnswer: 1,
    explanation: 'Johannes Gutenberg inventó la imprenta de tipos móviles alrededor de 1440, revolucionando la difusión del conocimiento y la cultura.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Pasteur demostró la existencia de los microbios y desarrolló vacunas.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Louis Pasteur demostró la teoría microbiana de las enfermedades, desarrolló el proceso de pasteurización y creó las primeras vacunas contra la rabia y el ántrax.',
    type: 'truefalse'
  }
]

export default function QuizHistoriaCienciaClient() {
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
        rank: "¡Historiador de la Ciencia! 📚",
        message: "¡Increíble! Dominas perfectamente la historia de la ciencia y los grandes descubrimientos. Eres un verdadero experto en la evolución del pensamiento científico.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Conocedor de Científicos! 🔬",
        message: "¡Muy bien! Tienes un buen conocimiento sobre la historia de la ciencia y los científicos que cambiaron el mundo.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "¡Aprendiz de Historia! 📖",
        message: "¡Sigue estudiando! La historia de la ciencia es fascinante y está llena de descubrimientos que cambiaron la humanidad.",
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
      emoji: "📚"
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

  const introduction = "Conoce a los grandes científicos y sus descubrimientos que cambiaron el mundo. Desde Copérnico hasta Einstein, explora la evolución del pensamiento científico."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: "Quiz de Historia de la Ciencia",
            description: introduction,
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-historia-ciencia',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz de Historia de la Ciencia"
        description="Conoce a los grandes científicos y sus descubrimientos que cambiaron el mundo. Desde Copérnico hasta Einstein, explora la evolución del pensamiento científico."
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
        currentTriviaPath="/trivias/quiz-historia-ciencia"
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
