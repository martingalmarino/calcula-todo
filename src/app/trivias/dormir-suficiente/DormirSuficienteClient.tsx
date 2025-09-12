"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Moon, Clock, Brain } from 'lucide-react'

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
    question: '¿Cuántas horas de sueño necesita un adulto promedio?',
    options: ['4–6 horas', '7–9 horas', '10–12 horas'],
    correctAnswer: 1,
    explanation: 'Los adultos necesitan entre 7-9 horas de sueño por noche para funcionar óptimamente. Menos de 7 horas puede afectar la salud.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Cuántas horas se recomienda para un adolescente (14–17 años)?',
    options: ['6–7 horas', '8–10 horas', '11–12 horas'],
    correctAnswer: 1,
    explanation: 'Los adolescentes necesitan 8-10 horas de sueño. Durante esta etapa, el cuerpo está en crecimiento y desarrollo activo.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Los adultos mayores (65+) necesitan dormir más que los adultos jóvenes.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Los adultos mayores generalmente necesitan entre 7-8 horas, similar a los adultos jóvenes, pero pueden tener patrones de sueño diferentes.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: '¿Qué grupo necesita más horas de sueño?',
    options: ['Niños de 6–12 años', 'Adultos jóvenes', 'Adultos mayores'],
    correctAnswer: 0,
    explanation: 'Los niños de 6-12 años necesitan 9-12 horas de sueño. El sueño es crucial para su crecimiento y desarrollo cognitivo.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Dormir menos de 5 horas aumenta el riesgo de hipertensión.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: La privación crónica del sueño está asociada con mayor riesgo de hipertensión, diabetes y enfermedades cardiovasculares.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué etapa del sueño es esencial para la memoria y el aprendizaje?',
    options: ['REM', 'Sueño ligero', 'Insomnio'],
    correctAnswer: 0,
    explanation: 'El sueño REM (movimiento rápido de ojos) es crucial para la consolidación de la memoria y el aprendizaje. Es cuando soñamos más intensamente.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Cuántas horas necesita un bebé (0–3 meses)?',
    options: ['10–12 horas', '14–17 horas', '20 horas'],
    correctAnswer: 1,
    explanation: 'Los bebés de 0-3 meses necesitan 14-17 horas de sueño por día. Su sueño está distribuido en múltiples siestas durante el día.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Dormir más de 10 horas al día siempre es saludable.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Dormir consistentemente más de 10 horas puede indicar problemas de salud subyacentes o ser contraproducente para algunos adultos.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: '¿Qué hábito ayuda a mejorar la calidad del sueño?',
    options: ['Usar pantallas hasta tarde', 'Mantener horarios regulares', 'Tomar café de noche'],
    correctAnswer: 1,
    explanation: 'Mantener horarios regulares de sueño ayuda a sincronizar el reloj biológico interno y mejora significativamente la calidad del descanso.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Dormir poco afecta principalmente a:',
    options: ['Memoria y concentración', 'Altura', 'Color de ojos'],
    correctAnswer: 0,
    explanation: 'La privación del sueño afecta principalmente las funciones cognitivas: memoria, concentración, toma de decisiones y tiempo de reacción.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: '¿Dormís lo suficiente?',
  description: 'Pon a prueba tus conocimientos sobre el sueño y los hábitos saludables. Aprende cuántas horas necesitas dormir según tu edad.',
  url: '/trivias/dormir-suficiente',
  category: 'Trivias Educativas'
})

export default function DormirSuficienteClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[3].timeLimit)
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
    if (points >= 8) return { rank: 'Experto del Sueño', emoji: '😴' }
    if (points >= 5) return { rank: 'Buen Durmiente', emoji: '😊' }
    return { rank: 'Necesita Más Descanso', emoji: '😴' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[3].timeLimit)
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
    setTimeLeft(triviasConfig[3].timeLimit)
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
    
    const shareText = `¡Acabo de completar el quiz "¿Dormís lo suficiente?"! 😴\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes cuántas horas necesitas dormir? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: '¿Dormís lo suficiente?',
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
        title="¿Dormís lo suficiente?"
        description="Pon a prueba tus conocimientos sobre el sueño y los hábitos saludables. Aprende cuántas horas necesitas dormir según tu edad."
        introduction="¡Bienvenido al quiz sobre el sueño! Te haremos preguntas sobre cuántas horas necesitas dormir según tu edad, las etapas del sueño, y hábitos saludables. Aprenderás datos importantes sobre cómo el sueño afecta tu salud física y mental. ¡Descubre si realmente sabes lo suficiente sobre el descanso!"
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
        currentTriviaPath="/trivias/dormir-suficiente/"
        relatedCalculator="/salud/sueno"
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
