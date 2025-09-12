"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Monitor, Clock, AlertTriangle } from 'lucide-react'

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
    question: '¿Cuántas horas sentado al día aumentan el riesgo de problemas de salud?',
    options: ['2 horas', '4 horas', '8 horas'],
    correctAnswer: 2,
    explanation: 'Estar sentado más de 8 horas al día aumenta significativamente el riesgo de problemas de salud como diabetes, enfermedades cardiovasculares y obesidad.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Estar 8+ horas sentado se relaciona con mayor riesgo cardiovascular.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Estudios muestran que estar sentado más de 8 horas diarias aumenta el riesgo de enfermedades cardiovasculares, incluso en personas que hacen ejercicio regularmente.',
    type: 'truefalse'
  },
  {
    id: 3,
    question: '¿Qué hábito ayuda a reducir riesgos del sedentarismo?',
    options: ['Hacer pausas de pie', 'Tomar más café', 'Dormir menos'],
    correctAnswer: 0,
    explanation: 'Hacer pausas regulares para ponerse de pie y moverse ayuda a reducir los riesgos del sedentarismo. Incluso 2-3 minutos de pausa cada hora pueden marcar la diferencia.',
    type: 'multiple'
  },
  {
    id: 4,
    question: '¿Cuánto tiempo de pausa activa se recomienda por cada hora sentado?',
    options: ['1 minuto', '5 minutos', '15 minutos'],
    correctAnswer: 1,
    explanation: 'Se recomienda hacer pausas activas de 5 minutos por cada hora sentado. Esto puede incluir caminar, estirarse, o hacer ejercicios simples.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'El ejercicio no contrarresta los efectos de estar muchas horas sentado.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Aunque el ejercicio regular no elimina completamente los riesgos del sedentarismo, sí ayuda significativamente a contrarrestar sus efectos negativos.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué problema está asociado al sedentarismo?',
    options: ['Hipertensión', 'Mejora del humor', 'Mejor visión nocturna'],
    correctAnswer: 0,
    explanation: 'El sedentarismo está asociado con hipertensión, diabetes tipo 2, obesidad, enfermedades cardiovasculares y problemas musculoesqueléticos.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Qué actividad se considera sedentaria?',
    options: ['Leer sentado', 'Caminar', 'Subir escaleras'],
    correctAnswer: 0,
    explanation: 'Leer sentado es una actividad sedentaria. Caminar y subir escaleras son actividades físicas que ayudan a combatir el sedentarismo.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Usar una estación de trabajo de pie puede ayudar a reducir el sedentarismo.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Las estaciones de trabajo de pie pueden ayudar a reducir el tiempo sentado, pero es importante alternar entre estar de pie y sentado para evitar otros problemas.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: '¿Cuál es un hábito poco saludable?',
    options: ['Caminar después de comer', 'Estar sentado 10 horas sin pausa', 'Hacer pausas cada hora'],
    correctAnswer: 1,
    explanation: 'Estar sentado 10 horas sin pausa es un hábito muy poco saludable que aumenta significativamente los riesgos para la salud. Es importante hacer pausas regulares.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'El sedentarismo se puede combatir con:',
    options: ['Actividad física regular', 'Comer más', 'Dormir menos'],
    correctAnswer: 0,
    explanation: 'La actividad física regular es la mejor forma de combatir el sedentarismo. Esto incluye ejercicio estructurado y moverse más durante el día.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: '¿Cuánto tiempo pasás sentado? (Sedentarismo)',
  description: 'Descubre los riesgos del sedentarismo y aprende cómo combatir los efectos de estar sentado demasiado tiempo. Conoce las recomendaciones para un estilo de vida más activo.',
  url: '/trivias/tiempo-sentado-sedentarismo',
  category: 'Trivias Educativas'
})

export default function TiempoSentadoSedentarismoClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[5].timeLimit)
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
    if (points >= 8) return { rank: 'Anti-Sedentario', emoji: '🚶‍♂️' }
    if (points >= 5) return { rank: 'Consciente del Movimiento', emoji: '💺' }
    return { rank: 'Necesita Más Actividad', emoji: '🪑' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[5].timeLimit)
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
    setTimeLeft(triviasConfig[5].timeLimit)
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
    
    const shareText = `¡Acabo de completar el quiz "¿Cuánto tiempo pasás sentado? (Sedentarismo)"! 🪑\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes los riesgos del sedentarismo? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: '¿Cuánto tiempo pasás sentado? (Sedentarismo)',
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
        title="¿Cuánto tiempo pasás sentado? (Sedentarismo)"
        description="Descubre los riesgos del sedentarismo y aprende cómo combatir los efectos de estar sentado demasiado tiempo. Conoce las recomendaciones para un estilo de vida más activo."
        introduction="¡Bienvenido al quiz sobre sedentarismo! Te haremos preguntas sobre los riesgos de estar sentado demasiado tiempo y cómo combatir el sedentarismo. Aprenderás sobre las horas recomendadas, los beneficios de las pausas activas, y estrategias para mantenerte más activo durante el día. ¡Descubre si conoces los peligros del sedentarismo y cómo evitarlos!"
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
        currentTriviaPath="/trivias/tiempo-sentado-sedentarismo/"
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
