"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Wifi, Zap, Globe } from 'lucide-react'

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
    question: '¿Cuántos MB hay en 1 GB?',
    options: ['500 MB', '1000 MB', '1024 MB'],
    correctAnswer: 2,
    explanation: '1 GB equivale a 1024 MB. Esta es la conversión binaria estándar usada en informática (2^10 = 1024).',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué es más rápido?',
    options: ['100 Mbps', '100 MB/s'],
    correctAnswer: 0,
    explanation: '100 MB/s es más rápido que 100 Mbps. 100 MB/s equivale aproximadamente a 800 Mbps. La diferencia está en que MB/s mide megabytes por segundo, mientras que Mbps mide megabits por segundo.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿Qué significa Mbps?',
    options: ['Megabits por segundo', 'Megabytes por segundo', 'Mega battery per second'],
    correctAnswer: 0,
    explanation: 'Mbps significa "Megabits por segundo". Es una unidad de medida de velocidad de transferencia de datos en redes. 1 byte = 8 bits, por lo que 1 MB/s = 8 Mbps.',
    type: 'multiple'
  },
  {
    id: 4,
    question: '¿Qué protocolo se usa para navegar en páginas seguras?',
    options: ['HTTP', 'HTTPS', 'FTP'],
    correctAnswer: 1,
    explanation: 'HTTPS (HTTP Secure) es el protocolo usado para páginas web seguras. Encripta la comunicación entre el navegador y el servidor, protegiendo datos sensibles.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Una IP pública es única en internet.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Una dirección IP pública es única globalmente en internet. Cada dispositivo conectado a internet tiene una IP pública única que lo identifica.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué mide el ping?',
    options: ['Velocidad de descarga', 'Latencia', 'Capacidad de memoria'],
    correctAnswer: 1,
    explanation: 'El ping mide la latencia, es decir, el tiempo que tarda un paquete de datos en ir desde tu dispositivo hasta un servidor y regresar. Se mide en milisegundos (ms).',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Qué significa 4G en redes móviles?',
    options: ['Cuarta generación', '4 gigabytes de datos', '4 megabits'],
    correctAnswer: 0,
    explanation: '4G significa "Cuarta generación" de tecnología de redes móviles. Es la evolución de 3G, ofreciendo velocidades más altas y mejor conectividad.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Qué es el ancho de banda?',
    options: ['El tiempo de respuesta', 'La capacidad de transmisión', 'El tipo de cable'],
    correctAnswer: 1,
    explanation: 'El ancho de banda es la capacidad máxima de transmisión de datos de una conexión. Se mide en bits por segundo y determina cuánta información puede transferirse simultáneamente.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Qué unidad mide la velocidad de internet?',
    options: ['km/h', 'bits por segundo', 'Joules'],
    correctAnswer: 1,
    explanation: 'La velocidad de internet se mide en bits por segundo (bps) o sus múltiplos como Kbps, Mbps, Gbps. Representa cuántos bits de datos se pueden transmitir en un segundo.',
    type: 'multiple'
  },
  {
    id: 10,
    question: '¿Qué protocolo sirve para enviar correos electrónicos?',
    options: ['SMTP', 'FTP', 'DNS'],
    correctAnswer: 0,
    explanation: 'SMTP (Simple Mail Transfer Protocol) es el protocolo estándar para enviar correos electrónicos. Se encarga de la transmisión de mensajes entre servidores de correo.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Trivia de Internet',
  description: 'Pon a prueba tus conocimientos sobre internet, redes y tecnología. Aprende conceptos básicos de conectividad, protocolos y velocidad de internet.',
  url: '/trivias/trivia-internet',
  category: 'Trivias Educativas'
})

export default function TriviaInternetClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[7].timeLimit)
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
    if (points >= 8) return { rank: 'Experto en Redes', emoji: '🌐' }
    if (points >= 5) return { rank: 'Usuario Conectado', emoji: '📶' }
    return { rank: 'Necesita Mejorar Conectividad', emoji: '📡' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[7].timeLimit)
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
    setTimeLeft(triviasConfig[7].timeLimit)
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
    
    const shareText = `¡Acabo de completar la "Trivia de Internet"! 🌐\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes cómo funciona internet? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Trivia de Internet',
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
        title="Trivia de Internet"
        description="Pon a prueba tus conocimientos sobre internet, redes y tecnología. Aprende conceptos básicos de conectividad, protocolos y velocidad de internet."
        introduction="¡Bienvenido a la Trivia de Internet! Te haremos preguntas sobre conceptos básicos de internet, redes y tecnología. Aprenderás sobre velocidades de conexión, protocolos, unidades de medida, y cómo funciona la conectividad digital. ¡Descubre si conoces los fundamentos de internet y las redes!"
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
        currentTriviaPath="/trivias/trivia-internet/"
        relatedCalculator="/tecnologia/velocidad-descarga"
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
              {currentQuestion.type === 'truefalse' ? (
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button
                    onClick={() => checkAnswer(0)}
                    variant={selectedAnswer === 0 ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                    size="lg"
                    className={`py-3 transition-all duration-200 ${
                      selectedAnswer === 0
                        ? feedback === 'correct' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                    disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                  >
                    ✅ Verdadero
                  </Button>
                  <Button
                    onClick={() => checkAnswer(1)}
                    variant={selectedAnswer === 1 ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                    size="lg"
                    className={`py-3 transition-all duration-200 ${
                      selectedAnswer === 1
                        ? feedback === 'correct' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                    disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                  >
                    ❌ Falso
                  </Button>
                </div>
              ) : (
                currentQuestion.options.map((option, index) => (
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
                ))
              )}
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
