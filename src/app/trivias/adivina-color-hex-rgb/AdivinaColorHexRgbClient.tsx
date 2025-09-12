"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Palette, Brush, Eye } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple'
  colorPreview?: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'HEX #FF0000 corresponde a:',
    options: ['RGB(255, 0, 0)', 'RGB(0, 255, 0)', 'RGB(0, 0, 255)'],
    correctAnswer: 0,
    explanation: 'HEX #FF0000 es rojo puro. En RGB, FF (hex) = 255 (decimal) para rojo, y 00 para verde y azul, resultando en RGB(255, 0, 0).',
    type: 'multiple',
    colorPreview: '#FF0000'
  },
  {
    id: 2,
    question: 'HEX #00FF00 es:',
    options: ['Verde', 'Azul', 'Rojo'],
    correctAnswer: 0,
    explanation: 'HEX #00FF00 es verde puro. El valor FF está en la posición del verde, mientras que rojo y azul están en 00.',
    type: 'multiple',
    colorPreview: '#00FF00'
  },
  {
    id: 3,
    question: 'RGB(0, 0, 0) equivale a:',
    options: ['Blanco', 'Negro', 'Gris'],
    correctAnswer: 1,
    explanation: 'RGB(0, 0, 0) es negro puro. Cuando todos los valores RGB están en 0, no hay luz de ningún color, resultando en negro.',
    type: 'multiple',
    colorPreview: '#000000'
  },
  {
    id: 4,
    question: 'HEX #FFFFFF corresponde a:',
    options: ['Blanco', 'Negro', 'Amarillo'],
    correctAnswer: 0,
    explanation: 'HEX #FFFFFF es blanco puro. FF es el valor máximo en hexadecimal (255 en decimal) para rojo, verde y azul, creando blanco.',
    type: 'multiple',
    colorPreview: '#FFFFFF'
  },
  {
    id: 5,
    question: 'HEX #0000FF es:',
    options: ['Azul', 'Rojo', 'Verde'],
    correctAnswer: 0,
    explanation: 'HEX #0000FF es azul puro. El valor FF está en la posición del azul, mientras que rojo y verde están en 00.',
    type: 'multiple',
    colorPreview: '#0000FF'
  },
  {
    id: 6,
    question: 'RGB(255, 255, 0) equivale a:',
    options: ['Naranja', 'Amarillo', 'Rosa'],
    correctAnswer: 1,
    explanation: 'RGB(255, 255, 0) es amarillo. La combinación de rojo y verde al máximo (255) con azul en 0 produce amarillo.',
    type: 'multiple',
    colorPreview: '#FFFF00'
  },
  {
    id: 7,
    question: 'HEX #FFA500 corresponde a:',
    options: ['Naranja', 'Violeta', 'Verde'],
    correctAnswer: 0,
    explanation: 'HEX #FFA500 es naranja. FF (255) para rojo, A5 (165) para verde, y 00 para azul crean un color naranja vibrante.',
    type: 'multiple',
    colorPreview: '#FFA500'
  },
  {
    id: 8,
    question: 'RGB(128, 128, 128) equivale a:',
    options: ['Gris', 'Negro', 'Plateado'],
    correctAnswer: 0,
    explanation: 'RGB(128, 128, 128) es gris medio. Cuando todos los valores RGB son iguales e intermedios, se crea un tono de gris.',
    type: 'multiple',
    colorPreview: '#808080'
  },
  {
    id: 9,
    question: 'HEX #800080 corresponde a:',
    options: ['Rosa', 'Violeta', 'Celeste'],
    correctAnswer: 1,
    explanation: 'HEX #800080 es violeta/púrpura. 80 (128) para rojo y azul, con 00 para verde, crea un color violeta intenso.',
    type: 'multiple',
    colorPreview: '#800080'
  },
  {
    id: 10,
    question: 'RGB(0, 255, 255) equivale a:',
    options: ['Cian', 'Magenta', 'Amarillo'],
    correctAnswer: 0,
    explanation: 'RGB(0, 255, 255) es cian. La combinación de verde y azul al máximo (255) con rojo en 0 produce cian.',
    type: 'multiple',
    colorPreview: '#00FFFF'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Adivina el Color (HEX ↔ RGB)',
  description: 'Pon a prueba tus conocimientos sobre códigos de color. Aprende a convertir entre códigos hexadecimales (HEX) y valores RGB de forma divertida.',
  url: '/trivias/adivina-color-hex-rgb',
  category: 'Trivias Educativas'
})

export default function AdivinaColorHexRgbClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[8].timeLimit)
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
    if (points >= 8) return { rank: 'Maestro del Color', emoji: '🎨' }
    if (points >= 5) return { rank: 'Diseñador en Progreso', emoji: '🖌️' }
    return { rank: 'Necesita Más Práctica', emoji: '🎭' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[8].timeLimit)
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
    setTimeLeft(triviasConfig[8].timeLimit)
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
    
    const shareText = `¡Acabo de completar "Adivina el Color (HEX ↔ RGB)"! 🎨\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes convertir códigos de color? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Adivina el Color (HEX ↔ RGB)',
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
        title="Adivina el Color (HEX ↔ RGB)"
        description="Pon a prueba tus conocimientos sobre códigos de color. Aprende a convertir entre códigos hexadecimales (HEX) y valores RGB de forma divertida."
        introduction="¡Bienvenido a Adivina el Color! Te haremos preguntas sobre conversión entre códigos hexadecimales (HEX) y valores RGB. Aprenderás sobre los sistemas de color digital, cómo se representan los colores en la web, y las equivalencias entre diferentes formatos. ¡Descubre si conoces los códigos de color más comunes!"
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
        currentTriviaPath="/trivias/adivina-color-hex-rgb/"
        relatedCalculator="/tecnologia/conversion-colores"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Question */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.question}
              </h2>
              
              {/* Color Preview */}
              {currentQuestion.colorPreview && (
                <div className="mb-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-lg border-2 border-gray-300 shadow-md"
                    style={{ backgroundColor: currentQuestion.colorPreview }}
                    title={`Color: ${currentQuestion.colorPreview}`}
                  ></div>
                  <p className="text-sm text-gray-600 mt-2 font-mono">
                    {currentQuestion.colorPreview}
                  </p>
                </div>
              )}
              
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
