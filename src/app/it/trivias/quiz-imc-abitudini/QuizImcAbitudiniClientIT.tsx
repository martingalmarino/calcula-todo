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
    question: "L'IMC normale è tra:",
    type: 'multiple',
    options: ['18.5 e 24.9', '20 e 28', '15 e 22'],
    correctAnswer: '18.5 e 24.9',
    explanation: 'L\'IMC normale secondo l\'OMS è tra 18.5 e 24.9 kg/m².'
  },
  {
    id: 2,
    question: "Una persona con IMC di 30 si considera:",
    type: 'multiple',
    options: ['Sovrappeso', 'Obesità', 'Peso normale'],
    correctAnswer: 'Obesità',
    explanation: 'Un IMC di 30 o più si considera obesità secondo gli standard medici.'
  },
  {
    id: 3,
    question: "L'IMC si calcola solo con peso e altezza.",
    type: 'truefalse',
    correctAnswer: true,
    explanation: 'L\'IMC si calcola unicamente con peso (kg) e altezza (m) usando la formula: peso/altezza².'
  },
  {
    id: 4,
    question: "L'IMC differenzia tra massa muscolare e grasso corporeo.",
    type: 'truefalse',
    correctAnswer: false,
    explanation: 'L\'IMC non differenzia tra massa muscolare e grasso corporeo, per questo può essere ingannevole negli atleti.'
  },
  {
    id: 5,
    question: "Qual è un'abitudine salutare?",
    type: 'multiple',
    options: ['Dormire 4 ore', 'Bere 2 L di acqua', 'Saltare tutti i pasti'],
    correctAnswer: 'Bere 2 L di acqua',
    explanation: 'Bere abbastanza acqua è fondamentale per mantenere il corpo idratato e funzionante correttamente.'
  },
  {
    id: 6,
    question: "Qual è il range raccomandato di ore di sonno per adulti?",
    type: 'multiple',
    options: ['5–6 ore', '7–9 ore', '10–12 ore'],
    correctAnswer: '7–9 ore',
    explanation: 'Gli adulti hanno bisogno tra 7 e 9 ore di sonno per notte per un riposo ottimale.'
  },
  {
    id: 7,
    question: "Fumare occasionalmente non danneggia la salute.",
    type: 'truefalse',
    correctAnswer: false,
    explanation: 'Fumare, anche occasionalmente, danneggia la salute e aumenta il rischio di malattie cardiovascolari e polmonari.'
  },
  {
    id: 8,
    question: "Camminare 30 min al giorno riduce il rischio cardiovascolare.",
    type: 'truefalse',
    correctAnswer: true,
    explanation: 'L\'attività fisica regolare, come camminare 30 minuti al giorno, riduce significativamente il rischio cardiovascolare.'
  },
  {
    id: 9,
    question: "Qual è un segnale di cattive abitudini?",
    type: 'multiple',
    options: ['Mangiare frutta quotidianamente', 'Sedentarietà', 'Dormire 8 ore'],
    correctAnswer: 'Sedentarietà',
    explanation: 'La sedentarietà è una cattiva abitudine che aumenta il rischio di obesità, diabete e malattie cardiovascolari.'
  },
  {
    id: 10,
    question: "L'IMC è uno strumento di screening, non una diagnosi medica definitiva.",
    type: 'truefalse',
    correctAnswer: true,
    explanation: 'L\'IMC è utile come strumento di screening iniziale, ma non sostituisce una valutazione medica completa.'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz di IMC e Abitudini Salutari',
  description: 'Quiz educativo su IMC, salute corporea e abitudini salutari',
  url: '/it/trivias/quiz-imc-abitudini',
  category: 'Trivie Educative'
})

export default function QuizImcAbitudiniClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minuti
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
    if (points >= 9) return { rank: 'Esperto in Salute', emoji: '🏆' }
    if (points >= 7) return { rank: 'Molto Conoscitore', emoji: '🥇' }
    if (points >= 5) return { rank: 'Ben Informato', emoji: '🥈' }
    if (points >= 3) return { rank: 'In Apprendimento', emoji: '🥉' }
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
        title="Quiz di IMC e Abitudini Salutari"
        description="Metti alla prova le tue conoscenze su salute corporea, IMC e abitudini salutari. Impara mentre ti diverti."
        introduction="Benvenuto al Quiz di IMC e Abitudini Salutari! Metti alla prova le tue conoscenze su salute corporea, indice di massa corporea e abitudini salutari. Hai 5 minuti per rispondere a 10 domande. Ogni risposta corretta vale 1 punto. Riuscirai a raggiungere il livello di Esperto in Salute? Dimostra la tua conoscenza!"
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
        currentTriviaPath="/it/trivias/quiz-imc-abitudini/"
        relatedCalculator="/it/salute/imc"
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
                    variant={selectedAnswer === option ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                    size="lg"
                    className={`w-full py-3 text-left justify-start transition-all duration-200 ${
                      selectedAnswer === option
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
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => checkAnswer(true)}
                    variant={selectedAnswer === true ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                    size="lg"
                    className={`py-3 transition-all duration-200 ${
                      selectedAnswer === true
                        ? feedback === 'correct' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                    disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                  >
                    ✅ Vero
                  </Button>
                  <Button
                    onClick={() => checkAnswer(false)}
                    variant={selectedAnswer === false ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                    size="lg"
                    className={`py-3 transition-all duration-200 ${
                      selectedAnswer === false
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
              )}
            </div>
          </div>
        )}
      </QuizLayout>
    </>
  )
}