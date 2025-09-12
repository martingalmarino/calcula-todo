"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Sun } from 'lucide-react'

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
    question: "¿Qué tipo de estrella es el Sol?",
    options: ["Gigante roja", "Enana amarilla", "Supernova"],
    correctAnswer: 1,
    explanation: "El Sol es una estrella enana amarilla de tipo G2V. Es una estrella de secuencia principal que convierte hidrógeno en helio mediante fusión nuclear.",
    type: 'multiple'
  },
  {
    id: 2,
    question: "¿Cuál es la temperatura aproximada de la superficie del Sol?",
    options: ["1500 °C", "5500 °C", "10.000 °C"],
    correctAnswer: 1,
    explanation: "La temperatura de la superficie del Sol (fotosfera) es de aproximadamente 5500 °C. El núcleo solar alcanza temperaturas mucho más altas, alrededor de 15 millones de grados.",
    type: 'multiple'
  },
  {
    id: 3,
    question: "¿Cuánto tarda la luz del Sol en llegar a la Tierra?",
    options: ["1 minuto", "8 minutos", "1 hora"],
    correctAnswer: 1,
    explanation: "La luz del Sol tarda aproximadamente 8 minutos y 20 segundos en llegar a la Tierra, viajando a la velocidad de la luz (300.000 km/s).",
    type: 'multiple'
  },
  {
    id: 4,
    question: "Verdadero/Falso: El Sol gira sobre su propio eje.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
    explanation: "Verdadero. El Sol rota sobre su propio eje, pero no como un cuerpo sólido. El ecuador solar rota más rápido (25 días) que los polos (35 días).",
    type: 'truefalse'
  },
  {
    id: 5,
    question: "¿Cuál es el elemento más abundante en el Sol?",
    options: ["Oxígeno", "Hidrógeno", "Helio"],
    correctAnswer: 1,
    explanation: "El hidrógeno es el elemento más abundante en el Sol, representando aproximadamente el 73% de su masa. El helio constituye alrededor del 25%.",
    type: 'multiple'
  },
  {
    id: 6,
    question: "¿Qué fenómeno solar afecta las telecomunicaciones en la Tierra?",
    options: ["Lluvia de meteoritos", "Tormentas solares", "Eclipses"],
    correctAnswer: 1,
    explanation: "Las tormentas solares, especialmente las eyecciones de masa coronal, pueden afectar las telecomunicaciones, sistemas GPS y redes eléctricas en la Tierra.",
    type: 'multiple'
  },
  {
    id: 7,
    question: "¿Qué fracción de la masa total del sistema solar representa el Sol?",
    options: ["50%", "99%", "75%"],
    correctAnswer: 1,
    explanation: "El Sol representa aproximadamente el 99.86% de la masa total del sistema solar. Todos los planetas, asteroides y cometas juntos representan solo el 0.14% restante.",
    type: 'multiple'
  },
  {
    id: 8,
    question: "¿Cuál es el ciclo de actividad solar aproximado?",
    options: ["3 años", "11 años", "20 años"],
    correctAnswer: 1,
    explanation: "El ciclo solar tiene una duración promedio de 11 años, durante el cual la actividad solar (manchas solares, llamaradas) aumenta y disminuye cíclicamente.",
    type: 'multiple'
  },
  {
    id: 9,
    question: "Verdadero/Falso: El Sol se apagará en unos pocos millones de años.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 1,
    explanation: "Falso. El Sol tiene aproximadamente 4.600 millones de años y se estima que le quedan otros 5.000 millones de años antes de convertirse en una gigante roja.",
    type: 'truefalse'
  },
  {
    id: 10,
    question: "¿Qué energía produce el Sol a través de fusión nuclear?",
    options: ["Energía química", "Energía térmica y lumínica", "Energía eléctrica"],
    correctAnswer: 1,
    explanation: "El Sol produce principalmente energía térmica y lumínica a través de la fusión nuclear del hidrógeno en helio. Esta energía se irradia al espacio en forma de luz y calor.",
    type: 'multiple'
  }
]

export default function QuizSobreElSolClient() {
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
        rank: "Astrofísico Solar ☀️",
        message: "¡Increíble! Dominas perfectamente los secretos del Sol y la física solar. Eres un verdadero experto en astronomía.",
        color: "text-yellow-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "Observador del Sol 🌞",
        message: "¡Muy bien! Tienes un buen conocimiento sobre nuestra estrella y sus fenómenos. Sigue explorando el cosmos.",
        color: "text-orange-600"
      }
    } else {
      return {
        rank: "Aprendiz Solar 🌅",
        message: "¡Sigue estudiando! El Sol es fascinante y hay mucho más por descubrir sobre nuestra estrella más cercana.",
        color: "text-red-600"
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
    const message = `☀️ Acabo de completar la Trivia sobre el Sol y obtuve ${score}/${totalQuestions} puntos. ${rankInfo.rank}\n\n¡Descubre los secretos de nuestra estrella más cercana! 🌟`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Trivia sobre el Sol',
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

  const introduction = "Descubre los secretos de nuestra estrella más cercana. Esta trivia te permitirá aprender sobre la composición, temperatura, actividad solar, fusión nuclear y los fenómenos que afectan la Tierra desde el Sol."

  const quizResult = gameState === 'finished' ? {
    points: score,
    rank: rankInfo.rank,
    emoji: score >= totalQuestions * 0.8 ? "☀️" : score >= totalQuestions * 0.6 ? "🌞" : "🌅"
  } : null

  return (
    <QuizLayout
      title="Trivia sobre el Sol"
      description="Descubre los secretos de nuestra estrella más cercana. Aprende sobre la composición, temperatura, actividad solar y fenómenos que afectan la Tierra."
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
      currentTriviaPath="/trivias/quiz-sobre-el-sol"
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
                  <>
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </>
                )}
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
