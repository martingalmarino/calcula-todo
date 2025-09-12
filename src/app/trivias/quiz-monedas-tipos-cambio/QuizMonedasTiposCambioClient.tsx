"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Coins, Globe, Banknote } from 'lucide-react'

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
    question: '¿Cuál es la moneda oficial de Japón?',
    options: ['Yuan', 'Yen', 'Won'],
    correctAnswer: 1,
    explanation: 'El yen japonés (¥) es la moneda oficial de Japón desde 1871. Es una de las monedas más importantes del mundo y se usa ampliamente en el comercio internacional.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué país utiliza la rupia como moneda?',
    options: ['India', 'Indonesia', 'Arabia Saudita'],
    correctAnswer: 0,
    explanation: 'La rupia india (₹) es la moneda oficial de India. También hay rupias en otros países como Pakistán, Sri Lanka y Nepal, pero cada una es diferente.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿Cuál es la moneda oficial de Brasil?',
    options: ['Real', 'Peso', 'Escudo'],
    correctAnswer: 0,
    explanation: 'El real brasileño (R$) es la moneda oficial de Brasil desde 1994. Reemplazó al cruzeiro real como parte de un plan de estabilización económica.',
    type: 'multiple'
  },
  {
    id: 4,
    question: '¿Cuál es la moneda de Sudáfrica?',
    options: ['Rand', 'Dólar sudafricano', 'Libra'],
    correctAnswer: 0,
    explanation: 'El rand sudafricano (R) es la moneda oficial de Sudáfrica desde 1961. También se usa en otros países del área monetaria común de África meridional.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Verdadero/Falso: El euro es usado en todos los países de Europa.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. El euro es usado en 19 de los 27 países de la Unión Europea. Países como Reino Unido, Suecia, Dinamarca y otros mantienen sus propias monedas.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué país tiene como moneda el peso chileno?',
    options: ['Chile', 'Perú', 'Bolivia'],
    correctAnswer: 0,
    explanation: 'El peso chileno ($) es la moneda oficial de Chile desde 1975. Es una de las monedas más estables de América Latina.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Cuál es la moneda oficial de Suiza?',
    options: ['Euro', 'Franco suizo', 'Libra'],
    correctAnswer: 1,
    explanation: 'El franco suizo (CHF) es la moneda oficial de Suiza y Liechtenstein. Es considerada una de las monedas más estables y seguras del mundo.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Qué país usa el dólar canadiense?',
    options: ['Canadá', 'Australia', 'Nueva Zelanda'],
    correctAnswer: 0,
    explanation: 'El dólar canadiense (CAD) es la moneda oficial de Canadá desde 1858. Es una de las monedas de reserva más importantes del mundo.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Cuál es la moneda oficial de Corea del Sur?',
    options: ['Yen', 'Won', 'Ringgit'],
    correctAnswer: 1,
    explanation: 'El won surcoreano (₩) es la moneda oficial de Corea del Sur desde 1962. Es una de las monedas más importantes de Asia.',
    type: 'multiple'
  },
  {
    id: 10,
    question: '¿Qué país tiene como moneda el peso mexicano?',
    options: ['México', 'Colombia', 'Venezuela'],
    correctAnswer: 0,
    explanation: 'El peso mexicano ($) es la moneda oficial de México desde 1993. Es una de las monedas más negociadas en el mercado de divisas.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz de Monedas y Tipos de Cambio',
  description: 'Aprende sobre las monedas oficiales de diferentes países del mundo. Descubre qué países usan qué monedas y expande tu conocimiento geográfico.',
  url: '/trivias/quiz-monedas-tipos-cambio',
  category: 'Trivias Educativas'
})

export default function QuizMonedasTiposCambioClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[12].timeLimit)
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
    if (points >= 8) return { rank: 'Experto en Divisas', emoji: '💱' }
    if (points >= 5) return { rank: 'Conocedor de Monedas', emoji: '💰' }
    return { rank: 'Necesita Más Conocimiento', emoji: '🌍' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[12].timeLimit)
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
    setTimeLeft(triviasConfig[12].timeLimit)
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
    
    const shareText = `¡Acabo de completar el "Quiz de Monedas y Tipos de Cambio"! 💰\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Conoces las monedas del mundo? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de Monedas y Tipos de Cambio',
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
        title="Quiz de Monedas y Tipos de Cambio"
        description="Aprende sobre las monedas oficiales de diferentes países del mundo. Descubre qué países usan qué monedas y expande tu conocimiento geográfico."
        introduction="¡Bienvenido al Quiz de Monedas y Tipos de Cambio! Te haremos preguntas sobre las monedas oficiales de diferentes países del mundo. Aprenderás sobre el yen japonés, el euro, el dólar canadiense, el peso mexicano y muchas otras monedas importantes. ¡Descubre qué tan bien conoces la geografía monetaria mundial!"
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
        currentTriviaPath="/trivias/quiz-monedas-tipos-cambio/"
        relatedCalculator="/finanzas/conversion-monedas"
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
