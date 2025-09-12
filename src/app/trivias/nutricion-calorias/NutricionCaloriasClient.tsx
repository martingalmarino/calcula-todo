"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Apple, Utensils, Zap } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  comparison?: string
  type: 'multiple' | 'battle'
  battleItems?: { name: string; calories: number; emoji: string }[]
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Una manzana mediana (150 g) tiene:',
    options: ['52 kcal', '95 kcal', '150 kcal'],
    correctAnswer: 1,
    explanation: 'Una manzana mediana tiene aproximadamente 95 kcal. Es una excelente opción para un snack saludable.',
    comparison: 'Equivale a caminar 20 minutos a paso moderado',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Una lata de gaseosa (330 ml) contiene:',
    options: ['90 kcal', '140 kcal', '200 kcal'],
    correctAnswer: 1,
    explanation: 'Una lata de gaseosa tiene 140 kcal, principalmente de azúcar. ¡Es como comer 7 cucharaditas de azúcar!',
    comparison: 'Equivale a correr 15 minutos a ritmo moderado',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Una porción de pizza muzzarella (120 g) aporta:',
    options: ['180 kcal', '285 kcal', '350 kcal'],
    correctAnswer: 1,
    explanation: 'Una porción de pizza muzzarella tiene 285 kcal. La masa y el queso son los principales contribuyentes.',
    comparison: 'Equivale a 45 minutos de yoga',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Una banana mediana (118 g) tiene:',
    options: ['105 kcal', '150 kcal', '200 kcal'],
    correctAnswer: 0,
    explanation: 'Una banana mediana tiene 105 kcal. Es rica en potasio y perfecta para antes del ejercicio.',
    comparison: 'Equivale a 15 minutos de ciclismo',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Una hamburguesa simple de fast food (100 g) aporta:',
    options: ['250 kcal', '295 kcal', '400 kcal'],
    correctAnswer: 1,
    explanation: 'Una hamburguesa simple tiene 295 kcal. Sin contar las papas fritas y la bebida.',
    comparison: 'Equivale a 30 minutos de natación',
    type: 'multiple'
  },
  {
    id: 6,
    question: '100 g de arroz blanco cocido equivalen a:',
    options: ['90 kcal', '130 kcal', '190 kcal'],
    correctAnswer: 1,
    explanation: '100g de arroz blanco cocido tienen 130 kcal. Es una buena fuente de carbohidratos.',
    comparison: 'Equivale a 20 minutos de caminata rápida',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Un vaso de cerveza (330 ml) aporta:',
    options: ['150 kcal', '220 kcal', '300 kcal'],
    correctAnswer: 0,
    explanation: 'Un vaso de cerveza tiene 150 kcal. El alcohol aporta 7 kcal por gramo.',
    comparison: 'Equivale a 25 minutos de baile',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Una porción de papas fritas (100 g) contiene:',
    options: ['250 kcal', '312 kcal', '400 kcal'],
    correctAnswer: 1,
    explanation: '100g de papas fritas tienen 312 kcal. El aceite de fritura aumenta significativamente las calorías.',
    comparison: 'Equivale a 40 minutos de caminata',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Una rebanada de pan lactal (25 g) tiene:',
    options: ['40 kcal', '80 kcal', '120 kcal'],
    correctAnswer: 0,
    explanation: 'Una rebanada de pan lactal tiene 40 kcal. Es una base perfecta para desayunos saludables.',
    comparison: 'Equivale a 8 minutos de caminata',
    type: 'multiple'
  },
  {
    id: 10,
    question: '¿Qué engorda más?',
    options: ['1 hamburguesa simple', '2 empanadas', '1 porción de pizza'],
    correctAnswer: 2,
    explanation: 'Una porción de pizza (285 kcal) tiene más calorías que 1 hamburguesa simple (295 kcal) o 2 empanadas (280 kcal).',
    comparison: 'La pizza equivale a 45 minutos de yoga',
    type: 'battle',
    battleItems: [
      { name: 'Hamburguesa Simple', calories: 295, emoji: '🍔' },
      { name: '2 Empanadas', calories: 280, emoji: '🥟' },
      { name: 'Porción Pizza', calories: 285, emoji: '🍕' }
    ]
  }
]

const structuredData = jsonLdCalculator({
  name: 'Trivia de Nutrición Básica',
  description: 'Adivina las calorías de distintos alimentos y aprende sobre nutrición. Incluye comparaciones visuales y modo batalla.',
  url: '/trivias/nutricion-calorias',
  category: 'Trivias Educativas'
})

export default function NutricionCaloriasClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[2].timeLimit)
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
    if (points >= 8) return { rank: 'Nutricionista Pro', emoji: '🥑' }
    if (points >= 5) return { rank: 'Experto', emoji: '🥦' }
    return { rank: 'Principiante', emoji: '🍎' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[2].timeLimit)
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
    setTimeLeft(triviasConfig[2].timeLimit)
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
      }, 3000) // 3 segundos para leer la explicación y comparación
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `¡Acabo de completar la Trivia de Nutrición Básica! 🍎\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes cuántas calorías tienen tus alimentos favoritos? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Trivia de Nutrición Básica',
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
        title="Trivia de Nutrición Básica"
        description="Adivina las calorías de distintos alimentos y aprende sobre nutrición. Incluye comparaciones visuales y modo batalla."
        introduction="¡Bienvenido a la Trivia de Nutrición Básica! Te presentaremos preguntas sobre las calorías de diferentes alimentos. Cada respuesta incluye una explicación y una comparación visual para que aprendas de forma divertida. Algunas preguntas son del modo 'batalla' donde deberás elegir entre opciones. ¡Demuestra tus conocimientos nutricionales!"
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
        currentTriviaPath="/trivias/nutricion-calorias/"
        relatedCalculator="/salud/calorias"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Question */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.question}
              </h2>
              
              {/* Battle Mode Visual */}
              {currentQuestion.type === 'battle' && currentQuestion.battleItems && (
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                  {currentQuestion.battleItems.map((item, index) => (
                    <Card key={index} className={`p-4 text-center transition-all duration-200 ${
                      selectedAnswer === index 
                        ? feedback === 'correct' 
                          ? 'bg-green-100 border-green-300' 
                          : 'bg-red-100 border-red-300'
                        : 'hover:bg-blue-50'
                    }`}>
                      <CardContent className="p-0">
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <div className="font-semibold text-sm mb-1">{item.name}</div>
                        <div className="text-xs text-gray-600">{item.calories} kcal</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Feedback and Explanation */}
              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <p className="font-semibold text-sm mb-2">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.comparison && (
                    <div className="flex items-center justify-center text-sm">
                      <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                      <span className="italic">{currentQuestion.comparison}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'battle' ? (
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {currentQuestion.battleItems?.map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => checkAnswer(index)}
                      variant={selectedAnswer === index ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                      size="lg"
                      className={`py-4 transition-all duration-200 ${
                        selectedAnswer === index
                          ? feedback === 'correct' 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'
                          : 'hover:bg-blue-50'
                      }`}
                      disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{item.emoji}</div>
                        <div className="text-xs">{item.name}</div>
                      </div>
                    </Button>
                  ))}
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
