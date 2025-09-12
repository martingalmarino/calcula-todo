"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Leaf, Car, Plane, TreePine } from 'lucide-react'

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
    question: '¿Qué transporte emite más CO₂ por pasajero-km?',
    options: ['Avión', 'Tren', 'Bicicleta'],
    correctAnswer: 0,
    explanation: 'El avión emite aproximadamente 285g CO₂/km por pasajero, mientras que el tren emite solo 14g CO₂/km. La bicicleta no emite CO₂ directo.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué dieta suele generar menor huella de carbono?',
    options: ['Vegetariana', 'Omnívora alta en carne', 'Rica en carne roja'],
    correctAnswer: 0,
    explanation: 'La dieta vegetariana genera aproximadamente 1.7 toneladas de CO₂ anuales, mientras que una dieta rica en carne puede generar hasta 3.3 toneladas.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Verdadero/Falso: Viajar en coche compartido contamina menos que ir solo.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Compartir el coche reduce las emisiones por pasajero, ya que se divide el impacto ambiental entre más personas.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: '¿Qué actividad emite más CO₂?',
    options: ['Vuelo de 1000 km', 'Viaje en tren de 1000 km', 'Caminar 1000 km'],
    correctAnswer: 0,
    explanation: 'Un vuelo de 1000 km emite aproximadamente 285kg de CO₂ por pasajero, mientras que el tren emite solo 14kg. Caminar no emite CO₂.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Verdadero/Falso: La producción de carne vacuna genera más emisiones que la de pollo.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. La carne de res genera 27kg CO₂ por kg, mientras que el pollo genera solo 6.9kg CO₂ por kg debido a la menor duración del ciclo de vida.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué electrodoméstico suele generar más huella indirecta por uso?',
    options: ['Lavarropas', 'Aire acondicionado', 'Microondas'],
    correctAnswer: 1,
    explanation: 'El aire acondicionado consume mucha energía eléctrica, especialmente en verano. Un AC de 3.5kW puede consumir 2.5-3.5kWh por hora de uso.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Verdadero/Falso: Comprar ropa de segunda mano reduce la huella de carbono.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. La industria textil genera 10% de las emisiones globales. Comprar ropa usada evita la producción de nuevas prendas y sus emisiones asociadas.',
    type: 'truefalse'
  },
  {
    id: 8,
    question: '¿Qué hábito ayuda a reducir la huella personal?',
    options: ['Usar transporte público', 'Comprar más plásticos', 'Dejar luces encendidas'],
    correctAnswer: 0,
    explanation: 'El transporte público emite menos CO₂ por pasajero que los vehículos privados. Un autobús puede transportar 40-50 personas con menor impacto ambiental.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Cuál de estos alimentos tiene menor huella de carbono?',
    options: ['Carne de res', 'Lentejas', 'Queso'],
    correctAnswer: 1,
    explanation: 'Las lentejas generan solo 0.9kg CO₂ por kg, mientras que la carne de res genera 27kg y el queso 13.5kg CO₂ por kg.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Verdadero/Falso: Reciclar y reutilizar plásticos ayuda a disminuir emisiones globales.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. Reciclar plástico reduce la necesidad de producir plástico nuevo, que requiere petróleo y genera emisiones significativas en su fabricación.',
    type: 'truefalse'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz de Huella de Carbono',
  description: 'Descubre cómo tus acciones diarias impactan el medio ambiente. Aprende sobre emisiones de CO₂, transporte sostenible y hábitos eco-friendly.',
  url: '/trivias/quiz-huella-carbono',
  category: 'Trivias Educativas'
})

export default function QuizHuellaCarbonoClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[10].timeLimit)
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
    if (points >= 8) return { rank: 'Eco-Champion', emoji: '🌍' }
    if (points >= 5) return { rank: 'Consciente Ambiental', emoji: '🌱' }
    return { rank: 'Necesita Más Conciencia', emoji: '🏭' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[10].timeLimit)
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
    setTimeLeft(triviasConfig[10].timeLimit)
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
    
    const shareText = `¡Acabo de completar el "Quiz de Huella de Carbono"! 🌍\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Conoces el impacto ambiental de tus acciones? ¡Descúbrelo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de Huella de Carbono',
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
        title="Quiz de Huella de Carbono"
        description="Descubre cómo tus acciones diarias impactan el medio ambiente. Aprende sobre emisiones de CO₂, transporte sostenible y hábitos eco-friendly."
        introduction="¡Bienvenido al Quiz de Huella de Carbono! Te haremos preguntas sobre el impacto ambiental de diferentes actividades y hábitos. Aprenderás sobre emisiones de CO₂, transporte sostenible, dietas eco-friendly, y cómo reducir tu huella de carbono personal. ¡Descubre qué tan consciente eres del medio ambiente!"
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
        currentTriviaPath="/trivias/quiz-huella-carbono/"
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
