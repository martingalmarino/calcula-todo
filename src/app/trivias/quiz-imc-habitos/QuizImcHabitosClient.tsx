"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Question {
  id: number
  question: string
  type: 'multiple' | 'truefalse'
  options?: string[]
  correctAnswer: string | boolean
  explanation?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "El IMC normal está entre:",
    type: 'multiple',
    options: ['18.5 y 24.9', '20 y 28', '15 y 22'],
    correctAnswer: '18.5 y 24.9',
    explanation: 'El IMC normal según la OMS está entre 18.5 y 24.9 kg/m².'
  },
  {
    id: 2,
    question: "Una persona con IMC de 30 se considera:",
    type: 'multiple',
    options: ['Sobrepeso', 'Obesidad', 'Peso normal'],
    correctAnswer: 'Obesidad',
    explanation: 'Un IMC de 30 o más se considera obesidad según los estándares médicos.'
  },
  {
    id: 3,
    question: "El IMC solo se calcula con peso y altura.",
    type: 'truefalse',
    correctAnswer: true,
    explanation: 'El IMC se calcula únicamente con peso (kg) y altura (m) usando la fórmula: peso/altura².'
  },
  {
    id: 4,
    question: "El IMC diferencia entre masa muscular y grasa corporal.",
    type: 'truefalse',
    correctAnswer: false,
    explanation: 'El IMC no diferencia entre masa muscular y grasa corporal, por eso puede ser engañoso en atletas.'
  },
  {
    id: 5,
    question: "¿Cuál es un hábito saludable?",
    type: 'multiple',
    options: ['Dormir 4 horas', 'Beber 2 L de agua', 'Saltar todas las comidas'],
    correctAnswer: 'Beber 2 L de agua',
    explanation: 'Beber suficiente agua es fundamental para mantener el cuerpo hidratado y funcionando correctamente.'
  },
  {
    id: 6,
    question: "¿Cuál es el rango recomendado de horas de sueño para adultos?",
    type: 'multiple',
    options: ['5–6 horas', '7–9 horas', '10–12 horas'],
    correctAnswer: '7–9 horas',
    explanation: 'Los adultos necesitan entre 7 y 9 horas de sueño por noche para un descanso óptimo.'
  },
  {
    id: 7,
    question: "Fumar ocasionalmente no daña la salud.",
    type: 'truefalse',
    correctAnswer: false,
    explanation: 'Fumar, incluso ocasionalmente, daña la salud y aumenta el riesgo de enfermedades cardiovasculares y pulmonares.'
  },
  {
    id: 8,
    question: "Caminar 30 min al día reduce riesgo cardiovascular.",
    type: 'truefalse',
    correctAnswer: true,
    explanation: 'La actividad física regular, como caminar 30 minutos diarios, reduce significativamente el riesgo cardiovascular.'
  },
  {
    id: 9,
    question: "¿Cuál es una señal de malos hábitos?",
    type: 'multiple',
    options: ['Comer frutas a diario', 'Sedentarismo', 'Dormir 8 horas'],
    correctAnswer: 'Sedentarismo',
    explanation: 'El sedentarismo es un mal hábito que aumenta el riesgo de obesidad, diabetes y enfermedades cardiovasculares.'
  },
  {
    id: 10,
    question: "El IMC es una herramienta de cribado, no un diagnóstico médico definitivo.",
    type: 'truefalse',
    correctAnswer: true,
    explanation: 'El IMC es útil como herramienta de cribado inicial, pero no reemplaza una evaluación médica completa.'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz de IMC y Hábitos Saludables',
  description: 'Quiz educativo sobre IMC, salud corporal y hábitos saludables',
  url: '/trivias/quiz-imc-habitos',
  category: 'Trivias Educativas'
})

export default function QuizImcHabitosClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [quizResult, setQuizResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const startQuiz = useCallback(() => {
    setIsActive(true)
    setShowIntroduction(false)
    setTimeLeft(300)
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
  }, [])

  const resetQuiz = useCallback(() => {
    setIsActive(false)
    setShowIntroduction(true)
    setTimeLeft(300)
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
  }, [])

  const checkAnswer = useCallback((answer: string | boolean) => {
    if (!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)) return

    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }

    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]))

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setFeedback(null)
      } else {
        // Quiz completed
        setIsActive(false)
        const finalScore = isCorrect ? score + 1 : score
        const rankInfo = getRankInfo(finalScore)
        setQuizResult({
          points: finalScore,
          rank: rankInfo.rank,
          emoji: rankInfo.emoji
        })
      }
    }, 2000)
  }, [isActive, feedback, answeredQuestions, currentQuestion, currentQuestionIndex, totalQuestions, score])

  const getRankInfo = (points: number) => {
    if (points >= 9) return { rank: 'Experto en Salud', emoji: '🏆' }
    if (points >= 7) return { rank: 'Muy Conocedor', emoji: '🥇' }
    if (points >= 5) return { rank: 'Bien Informado', emoji: '🥈' }
    if (points >= 3) return { rank: 'En Aprendizaje', emoji: '🥉' }
    return { rank: 'Principiante', emoji: '📚' }
  }

  // Timer effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false)
          const rankInfo = getRankInfo(score)
          setQuizResult({
            points: score,
            rank: rankInfo.rank,
            emoji: rankInfo.emoji
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, timeLeft, score])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <QuizLayout
        title="Quiz de IMC y Hábitos Saludables"
        description="Pon a prueba tus conocimientos sobre salud corporal, IMC y hábitos saludables. Aprende mientras te diviertes."
        introduction="¡Bienvenido al Quiz de IMC y Hábitos Saludables! Pon a prueba tus conocimientos sobre salud corporal, índice de masa corporal y hábitos saludables. Tienes 5 minutos para responder 10 preguntas. Cada respuesta correcta suma 1 punto. ¿Podrás alcanzar el nivel de Experto en Salud? ¡Demuestra tu conocimiento!"
        onStart={startQuiz}
        onReset={resetQuiz}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        quizResult={quizResult}
        showIntroduction={showIntroduction}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        currentTriviaPath="/trivias/quiz-imc-habitos/"
        relatedCalculator="/salud/imc"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Question */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.question}
              </h2>
              {currentQuestion.explanation && feedback && (
                <p className="text-sm text-gray-600 italic">
                  {currentQuestion.explanation}
                </p>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'multiple' && currentQuestion.options ? (
                currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => checkAnswer(option)}
                    className={`w-full py-3 text-left justify-start transition-all duration-200 ${
                      selectedAnswer === option
                        ? (feedback === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600')
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => checkAnswer(true)}
                    className={`py-3 transition-all duration-200 ${
                      selectedAnswer === true
                        ? (feedback === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600')
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                  >
                    ✅ Verdadero
                  </Button>
                  <Button
                    onClick={() => checkAnswer(false)}
                    className={`py-3 transition-all duration-200 ${
                      selectedAnswer === false
                        ? (feedback === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600')
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                  >
                    ❌ Falso
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </QuizLayout>
    </>
  )
}
