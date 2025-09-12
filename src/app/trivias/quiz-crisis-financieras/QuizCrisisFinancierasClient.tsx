"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react'

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
    question: '¿En qué año ocurrió la Gran Depresión en EE. UU.?',
    options: ['1929', '1939', '1945'],
    correctAnswer: 0,
    explanation: 'La Gran Depresión comenzó en 1929 con el colapso de la bolsa de valores de Wall Street. Fue la crisis económica más devastadora del siglo XX, afectando a todo el mundo durante más de una década.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué causó la crisis de 2008 en EE. UU.?',
    options: ['Burbuja inmobiliaria', 'Crisis del petróleo', 'Guerra comercial'],
    correctAnswer: 0,
    explanation: 'La crisis de 2008 fue causada por la burbuja inmobiliaria y las hipotecas subprime. Los bancos otorgaron préstamos a personas con mal crédito, y cuando los precios de las casas cayeron, se desencadenó una crisis financiera global.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Verdadero/Falso: Lehman Brothers quebró durante la crisis de 2008.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Lehman Brothers, uno de los bancos de inversión más grandes de EE.UU., quebró en septiembre de 2008. Su colapso marcó el punto más crítico de la crisis financiera y llevó a intervenciones masivas del gobierno.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: '¿Qué país sufrió el "corralito" financiero en 2001?',
    options: ['España', 'Argentina', 'México'],
    correctAnswer: 1,
    explanation: 'Argentina sufrió el "corralito" en 2001, una medida que limitó los retiros bancarios para evitar una corrida bancaria. Esta crisis fue parte de una recesión económica severa que duró varios años.',
    type: 'multiple'
  },
  {
    id: 5,
    question: '¿En qué década ocurrió la crisis de deuda latinoamericana?',
    options: ['1960s', '1980s', '2000s'],
    correctAnswer: 1,
    explanation: 'La crisis de deuda latinoamericana ocurrió en la década de 1980, conocida como la "década perdida". Muchos países de América Latina no pudieron pagar sus deudas externas, llevando a reestructuraciones y austeridad.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Verdadero/Falso: La crisis asiática comenzó en Tailandia en 1997.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. La crisis financiera asiática comenzó en Tailandia en julio de 1997 cuando el baht tailandés colapsó. Se extendió rápidamente a otros países asiáticos como Indonesia, Corea del Sur y Malasia.',
    type: 'truefalse'
  },
  {
    id: 7,
    question: '¿Qué país tuvo una gran crisis económica en 2010 ligada a la deuda soberana europea?',
    options: ['Grecia', 'Francia', 'Alemania'],
    correctAnswer: 0,
    explanation: 'Grecia tuvo una crisis de deuda soberana en 2010 que amenazó con extenderse por toda la zona euro. El país necesitó múltiples rescates financieros y implementó medidas de austeridad severas.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Cuál fue una consecuencia global de la crisis del petróleo de 1973?',
    options: ['Alta inflación', 'Expansión económica', 'Reducción de precios'],
    correctAnswer: 0,
    explanation: 'La crisis del petróleo de 1973 causó alta inflación global. Los países árabes redujeron la producción de petróleo, cuadruplicando los precios y causando estanflación (inflación con recesión) en muchos países.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Verdadero/Falso: La Gran Recesión (2008) afectó solo a Estados Unidos.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. La Gran Recesión de 2008 fue una crisis global que afectó a países de todo el mundo. Europa, Asia y América Latina experimentaron recesiones, desempleo masivo y crisis bancarias.',
    type: 'truefalse'
  },
  {
    id: 10,
    question: '¿Qué sector detonó la crisis de las "punto com" en 2000?',
    options: ['Tecnología', 'Energía', 'Automotriz'],
    correctAnswer: 0,
    explanation: 'La crisis de las "punto com" en 2000 fue detonada por el sector tecnológico. Las empresas de internet y tecnología se sobrevaloraron durante la burbuja, y cuando colapsó, muchas empresas quebraron y el NASDAQ perdió el 78% de su valor.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz de Crisis Financieras',
  description: 'Aprende sobre las crisis financieras más importantes de la historia. Descubre qué causó cada crisis, cuándo ocurrieron y sus consecuencias globales.',
  url: '/trivias/quiz-crisis-financieras',
  category: 'Trivias Educativas'
})

export default function QuizCrisisFinancierasClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[13].timeLimit)
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
    if (points >= 8) return { rank: 'Experto en Historia Económica', emoji: '📈' }
    if (points >= 5) return { rank: 'Conocedor de Crisis', emoji: '📊' }
    return { rank: 'Necesita Más Estudio', emoji: '📉' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[13].timeLimit)
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
    setTimeLeft(triviasConfig[13].timeLimit)
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
    
    const shareText = `¡Acabo de completar el "Quiz de Crisis Financieras"! 📊\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Conoces la historia económica mundial? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de Crisis Financieras',
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
        title="Quiz de Crisis Financieras"
        description="Aprende sobre las crisis financieras más importantes de la historia. Descubre qué causó cada crisis, cuándo ocurrieron y sus consecuencias globales."
        introduction="¡Bienvenido al Quiz de Crisis Financieras! Te haremos preguntas sobre las crisis económicas más importantes de la historia. Aprenderás sobre la Gran Depresión de 1929, la crisis de 2008, la crisis asiática de 1997, el corralito argentino y muchas otras crisis que han moldeado la economía mundial. ¡Descubre qué tan bien conoces la historia económica!"
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
        currentTriviaPath="/trivias/quiz-crisis-financieras/"
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
