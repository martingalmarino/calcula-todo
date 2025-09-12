"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Activity, Zap, Heart } from 'lucide-react'

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
    question: '¿Cuántos minutos de actividad moderada recomienda la OMS a los adultos por semana?',
    options: ['75 minutos', '150 minutos', '300 minutos'],
    correctAnswer: 1,
    explanation: 'La OMS recomienda al menos 150 minutos de actividad física moderada por semana para adultos. Esto equivale a 30 minutos, 5 días a la semana.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Cuántos minutos de actividad vigorosa equivalen a los 150 de moderada?',
    options: ['50 minutos', '75 minutos', '100 minutos'],
    correctAnswer: 1,
    explanation: '75 minutos de actividad vigorosa equivalen a 150 minutos de actividad moderada. La actividad vigorosa es más intensa y requiere menos tiempo.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Caminar rápido cuenta como ejercicio moderado.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Caminar rápido (a un ritmo que te haga sudar ligeramente) cuenta como actividad física moderada según las recomendaciones de la OMS.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: '¿Qué tipo de ejercicio es vigoroso?',
    options: ['Correr', 'Pasear lento', 'Estiramientos suaves'],
    correctAnswer: 0,
    explanation: 'Correr es considerado ejercicio vigoroso. Otros ejemplos incluyen natación rápida, ciclismo rápido, y deportes como fútbol o baloncesto.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'La OMS recomienda a niños y adolescentes:',
    options: ['30 min/semana', '60 min diarios', 'Solo en la escuela'],
    correctAnswer: 1,
    explanation: 'Los niños y adolescentes (5-17 años) necesitan al menos 60 minutos de actividad física moderada a vigorosa diariamente para un desarrollo saludable.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Subir escaleras cuenta como actividad física moderada.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Subir escaleras es una excelente forma de actividad física moderada que puedes incorporar fácilmente en tu rutina diaria.',
    type: 'truefalse'
  },
  {
    id: 7,
    question: '¿Cuál NO es ejercicio moderado?',
    options: ['Andar en bicicleta a ritmo tranquilo', 'Bailar social', 'Ver televisión'],
    correctAnswer: 2,
    explanation: 'Ver televisión no es actividad física. Andar en bicicleta a ritmo tranquilo y bailar social sí cuentan como ejercicio moderado.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Qué otro beneficio tiene el ejercicio regular?',
    options: ['Mejora cardiovascular', 'Cambiar color de ojos', 'Aumentar estatura'],
    correctAnswer: 0,
    explanation: 'El ejercicio regular mejora la salud cardiovascular, fortalece el corazón, reduce la presión arterial y mejora la circulación sanguínea.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'El ejercicio ayuda a prevenir diabetes tipo 2.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: El ejercicio regular ayuda a prevenir la diabetes tipo 2 al mejorar la sensibilidad a la insulina y mantener un peso saludable.',
    type: 'truefalse'
  },
  {
    id: 10,
    question: '¿Qué mínimo de días por semana se recomienda hacer ejercicio moderado?',
    options: ['1–2 días', '3–5 días', '7 días'],
    correctAnswer: 1,
    explanation: 'Se recomienda hacer ejercicio moderado al menos 3-5 días por semana. Esto permite distribuir los 150 minutos semanales de manera equilibrada.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Ejercicio Físico Mínimo Recomendado (OMS)',
  description: 'Aprende las recomendaciones oficiales de la OMS sobre actividad física. Descubre cuánto ejercicio necesitas para mantenerte saludable.',
  url: '/trivias/ejercicio-fisico-oms',
  category: 'Trivias Educativas'
})

export default function EjercicioFisicoOmsClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[4].timeLimit)
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
    if (points >= 8) return { rank: 'Atleta OMS', emoji: '🏃‍♂️' }
    if (points >= 5) return { rank: 'Activo Saludable', emoji: '💪' }
    return { rank: 'Necesita Más Movimiento', emoji: '🚶‍♂️' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[4].timeLimit)
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
    setTimeLeft(triviasConfig[4].timeLimit)
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
    
    const shareText = `¡Acabo de completar el quiz "Ejercicio Físico Mínimo Recomendado (OMS)"! 🏃‍♂️\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes cuánto ejercicio recomienda la OMS? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Ejercicio Físico Mínimo Recomendado (OMS)',
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
        title="Ejercicio Físico Mínimo Recomendado (OMS)"
        description="Aprende las recomendaciones oficiales de la OMS sobre actividad física. Descubre cuánto ejercicio necesitas para mantenerte saludable."
        introduction="¡Bienvenido al quiz sobre ejercicio físico! Te haremos preguntas sobre las recomendaciones oficiales de la OMS para la actividad física. Aprenderás cuántos minutos de ejercicio necesitas por semana, qué tipos de actividades cuentan como ejercicio moderado o vigoroso, y los beneficios para la salud. ¡Descubre si conoces las pautas oficiales para mantenerte activo y saludable!"
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
        currentTriviaPath="/trivias/ejercicio-fisico-oms/"
        relatedCalculator="/salud/calorias"
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
