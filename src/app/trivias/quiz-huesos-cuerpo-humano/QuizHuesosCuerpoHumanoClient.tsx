"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Bone, Skull, Heart } from 'lucide-react'

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
    question: '¿Cuántos huesos tiene un adulto promedio?',
    options: ['106', '206', '306'],
    correctAnswer: 1,
    explanation: 'Un adulto promedio tiene 206 huesos. Los bebés nacen con aproximadamente 270 huesos, pero muchos se fusionan durante el crecimiento. El esqueleto humano proporciona estructura, protección y permite el movimiento.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Cuál es el hueso más largo del cuerpo?',
    options: ['Fémur', 'Húmero', 'Tibia'],
    correctAnswer: 0,
    explanation: 'El fémur es el hueso más largo del cuerpo humano. Se encuentra en el muslo y puede representar hasta el 25% de la altura total de una persona. También es uno de los huesos más fuertes.',
    type: 'multiple'
  },
  {
    id: 3,
    question: '¿Qué hueso protege el cerebro?',
    options: ['Cráneo', 'Esternón', 'Vértebras'],
    correctAnswer: 0,
    explanation: 'El cráneo protege el cerebro y está formado por 22 huesos fusionados. Proporciona una protección sólida para el órgano más importante del sistema nervioso central.',
    type: 'multiple'
  },
  {
    id: 4,
    question: '¿Dónde se encuentra la rótula?',
    options: ['Rodilla', 'Mano', 'Hombro'],
    correctAnswer: 0,
    explanation: 'La rótula (o patela) se encuentra en la rodilla. Es un hueso sesamoideo que protege la articulación de la rodilla y mejora la eficiencia del músculo cuádriceps.',
    type: 'multiple'
  },
  {
    id: 5,
    question: '¿Cuál es el hueso más pequeño del cuerpo?',
    options: ['Estribo (o estribo del oído)', 'Radio', 'Clavícula'],
    correctAnswer: 0,
    explanation: 'El estribo (o estribo del oído) es el hueso más pequeño del cuerpo humano. Se encuentra en el oído medio y mide aproximadamente 2.8 mm de longitud. Es parte de la cadena de huesecillos que transmite el sonido.',
    type: 'multiple'
  },
  {
    id: 6,
    question: '¿Qué hueso une el brazo con el tórax?',
    options: ['Escápula', 'Fémur', 'Vértebra'],
    correctAnswer: 0,
    explanation: 'La escápula (u omóplato) une el brazo con el tórax. Es un hueso plano triangular que forma parte de la cintura escapular y permite una amplia gama de movimientos del brazo.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Cómo se llama el hueso del antebrazo junto al cúbito?',
    options: ['Radio', 'Húmero', 'Clavícula'],
    correctAnswer: 0,
    explanation: 'El radio es el hueso del antebrazo que se encuentra junto al cúbito. Es el más lateral de los dos huesos del antebrazo y permite la rotación del antebrazo y la mano.',
    type: 'multiple'
  },
  {
    id: 8,
    question: '¿Qué hueso se conoce como la "columna vertebral"?',
    options: ['Vértebras', 'Tibia', 'Esternón'],
    correctAnswer: 0,
    explanation: 'Las vértebras forman la columna vertebral, que está compuesta por 33 vértebras en total. La columna vertebral protege la médula espinal y proporciona soporte estructural al cuerpo.',
    type: 'multiple'
  },
  {
    id: 9,
    question: '¿Qué hueso protege el corazón y los pulmones?',
    options: ['Esternón', 'Mandíbula', 'Sacro'],
    correctAnswer: 0,
    explanation: 'El esternón (junto con las costillas) protege el corazón y los pulmones. Es un hueso plano en forma de T que se encuentra en la parte frontal del tórax.',
    type: 'multiple'
  },
  {
    id: 10,
    question: '¿Cuántos huesos forman la caja torácica?',
    options: ['12 pares de costillas', '10 pares de costillas', '14 pares de costillas'],
    correctAnswer: 0,
    explanation: 'La caja torácica está formada por 12 pares de costillas (24 costillas en total), el esternón y las vértebras torácicas. Protege los órganos vitales del tórax como el corazón y los pulmones.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz sobre los huesos del cuerpo humano',
  description: 'Aprende sobre la anatomía ósea del cuerpo humano. Descubre cuántos huesos tenemos, cuáles son los más largos y pequeños, y sus funciones principales.',
  url: '/trivias/quiz-huesos-cuerpo-humano',
  category: 'Trivias Educativas'
})

export default function QuizHuesosCuerpoHumanoClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[14].timeLimit)
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
    if (points >= 8) return { rank: 'Experto en Anatomía', emoji: '🦴' }
    if (points >= 5) return { rank: 'Conocedor del Esqueleto', emoji: '💀' }
    return { rank: 'Necesita Más Estudio', emoji: '🧬' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[14].timeLimit)
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
    setTimeLeft(triviasConfig[14].timeLimit)
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
    
    const shareText = `¡Acabo de completar el "Quiz sobre los huesos del cuerpo humano"! 🦴\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Conoces la anatomía del esqueleto humano? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz sobre los huesos del cuerpo humano',
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
        title="Quiz sobre los huesos del cuerpo humano"
        description="Aprende sobre la anatomía ósea del cuerpo humano. Descubre cuántos huesos tenemos, cuáles son los más largos y pequeños, y sus funciones principales."
        introduction="¡Bienvenido al Quiz sobre los huesos del cuerpo humano! Te haremos preguntas sobre la anatomía ósea y el esqueleto humano. Aprenderás sobre cuántos huesos tenemos, cuáles son los más largos y pequeños, dónde se encuentran los huesos principales y sus funciones. ¡Descubre qué tan bien conoces tu propio esqueleto!"
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
        currentTriviaPath="/trivias/quiz-huesos-cuerpo-humano/"
        relatedCalculator="/salud/imc"
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
