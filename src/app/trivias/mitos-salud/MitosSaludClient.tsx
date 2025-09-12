"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check } from 'lucide-react'

interface Question {
  id: number
  statement: string
  correctAnswer: boolean
  explanation: string
}

const quizQuestions: Question[] = [
  { 
    id: 1, 
    statement: 'Comer después de las 20:00 engorda más.', 
    correctAnswer: false, 
    explanation: 'Falso: Lo que importa es el balance calórico total del día, no la hora en que comas.' 
  },
  { 
    id: 2, 
    statement: 'El huevo aumenta peligrosamente el colesterol.', 
    correctAnswer: false, 
    explanation: 'Falso: El consumo moderado de huevos no afecta significativamente el colesterol en personas sanas.' 
  },
  { 
    id: 3, 
    statement: 'Tomar agua fría engorda.', 
    correctAnswer: false, 
    explanation: 'Falso: El agua fría no tiene calorías y puede incluso ayudar a quemar algunas calorías al calentarla el cuerpo.' 
  },
  { 
    id: 4, 
    statement: 'Las vitaminas de frutas se pierden inmediatamente al cortarlas.', 
    correctAnswer: false, 
    explanation: 'Falso: Las vitaminas se mantienen varias horas si se conservan bien, aunque se pierden gradualmente.' 
  },
  { 
    id: 5, 
    statement: 'Dormir poco afecta la memoria y la salud general.', 
    correctAnswer: true, 
    explanation: 'Verdadero: La falta de sueño afecta la memoria, concentración, sistema inmunológico y metabolismo.' 
  },
  { 
    id: 6, 
    statement: 'Sudar mucho significa que estás quemando más grasa.', 
    correctAnswer: false, 
    explanation: 'Falso: Sudar es regulación térmica, no indica quema de grasa. Es la pérdida de agua, no grasa.' 
  },
  { 
    id: 7, 
    statement: 'El café en exceso puede afectar el sueño.', 
    correctAnswer: true, 
    explanation: 'Verdadero: La cafeína puede interferir con el sueño si se consume cerca de la hora de dormir.' 
  },
  { 
    id: 8, 
    statement: 'El consumo de azúcar en exceso puede llevar a diabetes tipo 2.', 
    correctAnswer: true, 
    explanation: 'Verdadero: El exceso de azúcar puede contribuir al desarrollo de diabetes tipo 2 y obesidad.' 
  },
  { 
    id: 9, 
    statement: 'Saltarse el desayuno siempre engorda.', 
    correctAnswer: false, 
    explanation: 'Falso: Depende del total calórico del día. Algunas personas se benefician del ayuno intermitente.' 
  },
  { 
    id: 10, 
    statement: 'Beber 2 litros de agua al día ayuda a la salud general.', 
    correctAnswer: true, 
    explanation: 'Verdadero: La hidratación adecuada es fundamental para el funcionamiento del organismo.' 
  },
]

const structuredData = jsonLdCalculator({
  name: 'Juego de Mitos de Salud',
  description: 'Desmiente creencias comunes sobre salud de forma lúdica. ¿Sabes distinguir entre mitos y realidades?',
  url: '/trivias/mitos-salud',
  category: 'Trivias Educativas'
})

export default function MitosSaludClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[1].timeLimit)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
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
    if (points >= 8) return { rank: 'Cazador de Mitos', emoji: '🧪' }
    if (points >= 5) return { rank: 'Escéptico', emoji: '🤔' }
    return { rank: 'Creyente', emoji: '😅' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[1].timeLimit)
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
    setTimeLeft(triviasConfig[1].timeLimit)
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
    setCurrentQuestion(null)
  }, [])

  const checkAnswer = useCallback((answer: boolean) => {
    if (!isActive || feedback !== null || !currentQuestion || answeredQuestions.has(currentQuestion.id)) return

    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }

    // Actualizar el estado de preguntas respondidas
    setAnsweredQuestions(prev => {
      const newAnswered = new Set(prev).add(currentQuestion.id)
      
      // Usar setTimeout para permitir que el estado se actualice
      setTimeout(() => {
        setFeedback(null)
        setSelectedAnswer(null)
        
        // Verificar si hemos respondido todas las preguntas
        if (newAnswered.size >= totalQuestions) {
          // Juego terminado
          setIsActive(false)
          const finalScore = score + (isCorrect ? 1 : 0)
          const rankInfo = getRankInfo(finalScore)
          setQuizResult({ points: finalScore, rank: rankInfo.rank, emoji: rankInfo.emoji })
        } else {
          // Continuar con la siguiente pregunta
          setCurrentQuestionIndex(prevIndex => prevIndex + 1)
          // Obtener preguntas no respondidas
          const unansweredQuestions = quizQuestions.filter(q => !newAnswered.has(q.id))
          if (unansweredQuestions.length > 0) {
            const nextQuestion = shuffleArray([...unansweredQuestions])[0]
            setCurrentQuestion(nextQuestion)
          }
        }
      }, 2000) // Give 2 seconds for feedback and explanation
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `¡Acabo de completar el Juego de Mitos de Salud! 🧪\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Te atreves a desmentir mitos de salud? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Juego de Mitos de Salud',
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
        title="Juego de Mitos de Salud"
        description="Desmiente creencias comunes sobre salud de forma lúdica. ¿Sabes distinguir entre mitos y realidades?"
        introduction="¡Bienvenido al Juego de Mitos de Salud! Te presentaremos afirmaciones sobre salud y nutrición. Tu misión es determinar si son verdaderas o falsas. Cada respuesta correcta suma un punto y recibirás una explicación breve. Al final, obtendrás un ranking según tu conocimiento. ¡Demuestra que eres un verdadero cazador de mitos!"
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
        currentTriviaPath="/trivias/mitos-salud/"
        relatedCalculator="/salud/imc"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Statement */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.statement}
              </h2>
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
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
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
                ✅ Verdadero
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
