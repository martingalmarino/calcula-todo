"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Recycle, Leaf, Trash2 } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple'
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Una botella de vidrio rota debe ir en:',
    options: ['Contenedor verde', 'Contenedor azul', 'Contenedor amarillo'],
    correctAnswer: 0,
    explanation: 'El vidrio roto va en el contenedor verde. El vidrio se recicla infinitamente sin perder calidad, por lo que es importante separarlo correctamente.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Un envase de yogur de plástico:',
    options: ['Contenedor amarillo', 'Contenedor verde', 'Contenedor marrón'],
    correctAnswer: 0,
    explanation: 'Los envases de plástico como el yogur van en el contenedor amarillo. Incluye botellas, envases, bolsas y otros productos de plástico.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Restos de comida (cáscaras, huesos):',
    options: ['Contenedor marrón', 'Contenedor azul', 'Contenedor amarillo'],
    correctAnswer: 0,
    explanation: 'Los restos orgánicos como cáscaras y huesos van en el contenedor marrón. Estos residuos se convierten en compost para fertilizar la tierra.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Un periódico viejo debe ir en:',
    options: ['Contenedor azul', 'Contenedor verde', 'Contenedor amarillo'],
    correctAnswer: 0,
    explanation: 'El papel y cartón van en el contenedor azul. Incluye periódicos, revistas, cajas de cartón y cualquier producto de papel.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Una lata de gaseosa vacía se tira en:',
    options: ['Contenedor amarillo', 'Contenedor marrón', 'Contenedor verde'],
    correctAnswer: 0,
    explanation: 'Las latas de metal van en el contenedor amarillo junto con los envases de plástico. El metal se puede reciclar infinitamente.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Un frasco de vidrio con tapa metálica:',
    options: ['El vidrio en verde y la tapa en amarillo', 'Todo junto en el verde', 'Todo en el marrón'],
    correctAnswer: 0,
    explanation: 'Debes separar: el frasco de vidrio va en el contenedor verde y la tapa metálica en el amarillo. Cada material se recicla por separado.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Servilletas sucias con comida:',
    options: ['Contenedor marrón', 'Contenedor azul', 'Contenedor amarillo'],
    correctAnswer: 0,
    explanation: 'Las servilletas sucias con restos de comida van en el contenedor marrón (orgánico). El papel sucio no se puede reciclar como papel limpio.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Una caja de cartón limpia y doblada:',
    options: ['Contenedor azul', 'Contenedor amarillo', 'Contenedor verde'],
    correctAnswer: 0,
    explanation: 'El cartón limpio va en el contenedor azul. Es importante doblarlo para ahorrar espacio y facilitar el transporte.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Pilas usadas:',
    options: ['Punto limpio especial', 'Contenedor marrón', 'Contenedor azul'],
    correctAnswer: 0,
    explanation: 'Las pilas usadas van a un punto limpio especial o contenedor específico. Contienen materiales tóxicos que no deben mezclarse con otros residuos.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Un envase de tetra brik (leche, jugo):',
    options: ['Contenedor amarillo', 'Contenedor verde', 'Contenedor marrón'],
    correctAnswer: 0,
    explanation: 'Los envases de tetra brik van en el contenedor amarillo. Aunque contienen cartón, también tienen plástico y aluminio, por lo que se clasifican como envases.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Trivia de Reciclaje: ¿Qué va en cada contenedor?',
  description: 'Aprende sobre la correcta clasificación de residuos y reciclaje. Descubre qué va en cada contenedor para cuidar el medio ambiente.',
  url: '/trivias/trivia-reciclaje-contenedores',
  category: 'Trivias Educativas'
})

export default function TriviaReciclajeContenedoresClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[9].timeLimit)
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
    if (points >= 8) return { rank: 'Eco-Héroe', emoji: '🌱' }
    if (points >= 5) return { rank: 'Reciclador Consciente', emoji: '♻️' }
    return { rank: 'Necesita Mejorar', emoji: '🗑️' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[9].timeLimit)
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
    setTimeLeft(triviasConfig[9].timeLimit)
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
    
    const shareText = `¡Acabo de completar la "Trivia de Reciclaje: ¿Qué va en cada contenedor?"! ♻️\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes clasificar correctamente los residuos? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Trivia de Reciclaje: ¿Qué va en cada contenedor?',
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
        title="Trivia de Reciclaje: ¿Qué va en cada contenedor?"
        description="Aprende sobre la correcta clasificación de residuos y reciclaje. Descubre qué va en cada contenedor para cuidar el medio ambiente."
        introduction="¡Bienvenido a la Trivia de Reciclaje! Te haremos preguntas sobre la correcta clasificación de residuos en los diferentes contenedores. Aprenderás sobre el contenedor verde (vidrio), azul (papel/cartón), amarillo (envases), marrón (orgánico) y puntos limpios especiales. ¡Descubre si conoces las mejores prácticas para cuidar el medio ambiente!"
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
        currentTriviaPath="/trivias/trivia-reciclaje-contenedores/"
        relatedCalculator="/otras/calculadora-propinas"
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
