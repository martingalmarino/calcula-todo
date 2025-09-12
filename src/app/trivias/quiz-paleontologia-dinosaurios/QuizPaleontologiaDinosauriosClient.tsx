"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { TreePine, CheckCircle, XCircle } from 'lucide-react'
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
    question: "¿En qué periodo vivió el Tyrannosaurus rex?",
    options: ["Jurásico", "Cretácico", "Triásico"],
    correctAnswer: 1,
    explanation: "El Tyrannosaurus rex vivió durante el período Cretácico, específicamente hace entre 68 y 66 millones de años, justo antes de la extinción masiva.",
    type: 'multiple'
  },
  {
    id: 2,
    question: "¿Qué dinosaurio tenía un collar óseo y tres cuernos?",
    options: ["Stegosaurus", "Triceratops", "Velociraptor"],
    correctAnswer: 1,
    explanation: "El Triceratops tenía un gran collar óseo (gola) y tres cuernos: dos largos en la frente y uno más corto en el hocico. Era un herbívoro del Cretácico.",
    type: 'multiple'
  },
  {
    id: 3,
    question: "¿Qué significa la palabra 'dinosaurio'?",
    options: ["Lagarto terrible", "Reptil gigante", "Bestia antigua"],
    correctAnswer: 0,
    explanation: "La palabra 'dinosaurio' proviene del griego 'deinos' (terrible) y 'sauros' (lagarto), por lo que significa 'lagarto terrible'.",
    type: 'multiple'
  },
  {
    id: 4,
    question: "Verdadero/Falso: Los dinosaurios y los humanos coexistieron.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 1,
    explanation: "Falso. Los dinosaurios se extinguieron hace 66 millones de años, mientras que los humanos aparecieron hace solo unos pocos millones de años.",
    type: 'truefalse'
  },
  {
    id: 5,
    question: "¿Cuál es el dinosaurio más grande descubierto hasta ahora?",
    options: ["Brachiosaurus", "Argentinosaurus", "Diplodocus"],
    correctAnswer: 1,
    explanation: "El Argentinosaurus es considerado el dinosaurio más grande conocido, con una longitud estimada de 30-35 metros y un peso de 70-100 toneladas.",
    type: 'multiple'
  },
  {
    id: 6,
    question: "¿Cómo se forman los fósiles?",
    options: ["Por congelación", "Por petrificación", "Por evaporación"],
    correctAnswer: 1,
    explanation: "Los fósiles se forman principalmente por petrificación, un proceso donde los restos orgánicos se reemplazan gradualmente por minerales, preservando la estructura original.",
    type: 'multiple'
  },
  {
    id: 7,
    question: "¿Qué animal actual está más relacionado con los dinosaurios?",
    options: ["Cocodrilo", "Aves", "Lagarto"],
    correctAnswer: 1,
    explanation: "Las aves son los descendientes directos de los dinosaurios terópodos. De hecho, las aves son consideradas dinosaurios que sobrevivieron a la extinción.",
    type: 'multiple'
  },
  {
    id: 8,
    question: "¿En qué periodo apareció el primer dinosaurio?",
    options: ["Triásico", "Jurásico", "Cretácico"],
    correctAnswer: 0,
    explanation: "Los primeros dinosaurios aparecieron durante el período Triásico, hace aproximadamente 230 millones de años, evolucionando a partir de reptiles arcosaurios.",
    type: 'multiple'
  },
  {
    id: 9,
    question: "¿Qué teoría explica mejor la extinción de los dinosaurios?",
    options: ["Impacto de asteroide", "Ola de frío repentina", "Epidemia"],
    correctAnswer: 0,
    explanation: "La teoría del impacto de asteroide es la más aceptada. Un asteroide de 10-15 km golpeó la Tierra hace 66 millones de años, causando cambios climáticos masivos.",
    type: 'multiple'
  },
  {
    id: 10,
    question: "Verdadero/Falso: El Stegosaurus vivió en el mismo periodo que el T-Rex.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 1,
    explanation: "Falso. El Stegosaurus vivió durante el período Jurásico (hace 155-150 millones de años), mientras que el T-Rex vivió en el Cretácico (hace 68-66 millones de años).",
    type: 'truefalse'
  }
]

export default function QuizPaleontologiaDinosauriosClient() {
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
        rank: "¡Paleontólogo Experto! 🦕",
        message: "¡Increíble! Dominas perfectamente el mundo de los dinosaurios y la paleontología. Eres un verdadero experto en la materia.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "¡Conocedor de Dinosaurios! 🦴",
        message: "¡Muy bien! Tienes un buen conocimiento sobre dinosaurios y eras geológicas. Sigue explorando la paleontología.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "¡Aprendiz de Paleontología! 🦖",
        message: "¡Sigue estudiando! Los dinosaurios son fascinantes y hay mucho más por descubrir sobre estas criaturas prehistóricas.",
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
      emoji: "🦕"
    }
  }, [gameState, score, getRankInfo])

  const introduction = "Explora el fascinante mundo de los dinosaurios y la paleontología. Aprende sobre las eras geológicas, fósiles y las criaturas que dominaron la Tierra durante millones de años."

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Quiz de Paleontología y Dinosaurios',
            description: 'Explora el fascinante mundo de los dinosaurios y la paleontología. Aprende sobre las eras geológicas, fósiles y las criaturas que dominaron la Tierra durante millones de años.',
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/trivias/quiz-paleontologia-dinosaurios',
            category: 'Ciencia'
          }))
        }}
      />
      <QuizLayout
        title="Quiz de Paleontología y Dinosaurios"
        description="Explora el fascinante mundo de los dinosaurios y la paleontología. Aprende sobre las eras geológicas, fósiles y las criaturas que dominaron la Tierra durante millones de años."
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
        currentTriviaPath="/trivias/quiz-paleontologia-dinosaurios"
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
