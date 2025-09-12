"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Lightbulb, Zap, Battery, Power } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple' | 'truefalse'
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: '¿Qué gasta más energía en promedio?',
    options: ['Un aire acondicionado', 'Una computadora portátil', 'Un televisor LED'],
    correctAnswer: 0,
    explanation: 'Un aire acondicionado consume entre 1.5-3.5kW por hora, mientras que una laptop consume 15-60W y un TV LED 30-100W. El AC es el mayor consumidor.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Un foco incandescente de 100W gasta… comparado con un LED de 10W:',
    options: ['Lo mismo', '10 veces más', '5 veces menos'],
    correctAnswer: 1,
    explanation: 'Un foco incandescente de 100W consume exactamente 10 veces más energía que un LED de 10W. Los LEDs son mucho más eficientes energéticamente.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Verdadero/Falso: Un cargador de celular enchufado sin usar sigue consumiendo energía.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Los cargadores enchufados sin usar consumen "energía fantasma" o "vampiro", aunque sea poca cantidad (1-5W), suma en el tiempo.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: '¿Qué electrodoméstico consume más en una casa típica?',
    options: ['Heladera', 'Microondas', 'Plancha'],
    correctAnswer: 0,
    explanation: 'La heladera consume más porque funciona 24/7 (150-300W), mientras que el microondas (800-1200W) y plancha (1000-1800W) se usan ocasionalmente.',
    type: 'multiple'
  },
  {
    id: 5,
    question: '¿Qué consume más energía?',
    options: ['Secarropas', 'Ventilador de techo', 'Radio'],
    correctAnswer: 0,
    explanation: 'El secarropas consume 2000-4000W, mientras que un ventilador de techo consume 15-75W y una radio 1-10W. El secarropas es el mayor consumidor.',
    type: 'multiple'
  },
  {
    id: 6,
    question: '¿Cuál es más eficiente?',
    options: ['Lavar ropa con agua caliente', 'Lavar ropa con agua fría', 'No hay diferencia'],
    correctAnswer: 1,
    explanation: 'Lavar con agua fría es más eficiente porque no requiere calentar el agua. Calentar agua consume mucha energía (el 90% del consumo de una lavadora).',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Verdadero/Falso: Apagar luces innecesarias ayuda a reducir el consumo eléctrico.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Apagar luces innecesarias reduce directamente el consumo eléctrico. Cada bombilla encendida consume energía constantemente.',
    type: 'truefalse'
  },
  {
    id: 8,
    question: '¿Qué gasta más energía en 1 hora de uso?',
    options: ['Computadora portátil', 'Aire acondicionado', 'Consola de videojuegos'],
    correctAnswer: 1,
    explanation: 'En 1 hora: AC consume 1.5-3.5kWh, consola 100-200Wh, laptop 15-60Wh. El aire acondicionado es el mayor consumidor por hora.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Qué electrodoméstico es más eficiente?',
    options: ['Heladera clase A', 'Heladera clase C', 'Heladera sin etiqueta'],
    correctAnswer: 0,
    explanation: 'Las heladeras clase A son las más eficientes energéticamente. La clasificación va de A (más eficiente) a G (menos eficiente).',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Verdadero/Falso: Desenchufar aparatos que no se usan puede ahorrar energía en el hogar.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Desenchufar aparatos elimina el consumo "vampiro" o "fantasma" que pueden sumar hasta 10% de la factura eléctrica mensual.',
    type: 'truefalse'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Juego de Consumo Eléctrico',
  description: 'Aprende sobre eficiencia energética y consumo eléctrico en el hogar. Descubre qué electrodomésticos gastan más energía y cómo ahorrar en tu factura.',
  url: '/trivias/juego-consumo-electrico',
  category: 'Trivias Educativas'
})

export default function JuegoConsumoElectricoClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[11].timeLimit)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [quizResult, setQuizResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)

  const totalQuestions = quizQuestions.length

  const shuffleArray = useCallback((array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const getRankInfo = useCallback((points: number) => {
    if (points >= 8) return { rank: 'Experto en Eficiencia', emoji: '⚡' }
    if (points >= 5) return { rank: 'Consciente Energético', emoji: '💡' }
    return { rank: 'Necesita Ahorrar Más', emoji: '🔌' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[11].timeLimit)
    setScore(0)
    setCurrentQuestionIndex(1)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
    const shuffledQuestions = shuffleArray([...quizQuestions]);
    setCurrentQuestion(shuffledQuestions[0]);
  }, [shuffleArray])

  const resetQuiz = useCallback(() => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(triviasConfig[11].timeLimit)
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
    setCurrentQuestion(null)
  }, [])

  const checkAnswer = useCallback((answerIndex: number) => {
    if (!isActive || feedback !== null || !currentQuestion || answeredQuestions.has(currentQuestion.id)) return

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }

    setAnsweredQuestions(prev => {
      const newAnswered = new Set(prev).add(currentQuestion.id)
      
      setTimeout(() => {
        setFeedback(null)
        setSelectedAnswer(null)
        
        if (newAnswered.size >= totalQuestions) {
          setIsActive(false)
          const finalScore = score + (isCorrect ? 1 : 0)
          const rankInfo = getRankInfo(finalScore)
          setQuizResult({ points: finalScore, rank: rankInfo.rank, emoji: rankInfo.emoji })
        } else {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1)
          const unansweredQuestions = quizQuestions.filter(q => !newAnswered.has(q.id))
          if (unansweredQuestions.length > 0) {
            const nextQuestion = shuffleArray([...unansweredQuestions])[0]
            setCurrentQuestion(nextQuestion)
          }
        }
      }, 2500) // 2.5 segundos para leer la explicación
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `¡Acabo de completar el "Juego de Consumo Eléctrico"! ⚡\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes cómo ahorrar energía en casa? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Juego de Consumo Eléctrico',
        text: shareText,
        url: shareUrl
      })
    } else {
      const fullText = `${shareText}\n${shareUrl}`
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }, [quizResult])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive && timeLeft > 0 && !quizResult) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      const rankInfo = getRankInfo(score)
      setQuizResult({ points: score, rank: rankInfo.rank, emoji: rankInfo.emoji })
    }
    return () => clearInterval(timer)
  }, [isActive, timeLeft, score, quizResult, getRankInfo])

  useEffect(() => {
    if (!showIntroduction && !currentQuestion && isActive) {
      const shuffledQuestions = shuffleArray([...quizQuestions]);
      setCurrentQuestion(shuffledQuestions[0]);
    }
  }, [showIntroduction, currentQuestion, isActive, shuffleArray]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <QuizLayout
        title="Juego de Consumo Eléctrico"
        description="Aprende sobre eficiencia energética y consumo eléctrico en el hogar. Descubre qué electrodomésticos gastan más energía y cómo ahorrar en tu factura."
        introduction="¡Bienvenido al Juego de Consumo Eléctrico! Te haremos preguntas sobre eficiencia energética y consumo eléctrico en el hogar. Aprenderás sobre qué electrodomésticos gastan más energía, cómo ahorrar en tu factura de luz, y las mejores prácticas para ser más eficiente energéticamente. ¡Descubre si conoces los secretos del ahorro energético!"
        onStart={startQuiz}
        onReset={resetQuiz}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        quizResult={quizResult}
        showIntroduction={showIntroduction}
        currentQuestion={currentQuestionIndex}
        totalQuestions={totalQuestions}
        currentTriviaPath="/trivias/juego-consumo-electrico/"
        relatedCalculator="/otras/calculadora-propinas"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Question */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.question}
              </h2>
              
              {/* Feedback and Explanation */}
              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <p className="font-semibold text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(index)}
                  variant={selectedAnswer === index ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                  size="lg"
                  className={`w-full py-3 text-left justify-start transition-all duration-200 ${
                    selectedAnswer === index
                      ? feedback === 'correct' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                      : 'hover:bg-blue-50'
                  }`}
                  disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Share Result Button */}
        {quizResult && (
          <div className="mt-4 text-center">
            <Button
              onClick={shareResult}
              variant="outline"
              size="lg"
              className="w-full max-w-md mx-auto"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir Resultado
                </>
              )}
            </Button>
          </div>
        )}
      </QuizLayout>
    </>
  )
}
