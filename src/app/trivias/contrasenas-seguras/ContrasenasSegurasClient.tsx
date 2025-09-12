"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfig } from '@/lib/trivias-config'
import { Share2, Check, Lock, Shield, Key } from 'lucide-react'

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
    question: '¿Cuál de estas contraseñas es más segura?',
    options: ['123456', 'qwerty', 'Gt$9kP!2'],
    correctAnswer: 2,
    explanation: 'Gt$9kP!2 es la más segura porque combina mayúsculas, minúsculas, números y símbolos especiales, además de ser impredecible.',
    type: 'multiple'
  },
  {
    id: 2,
    question: '¿Qué longitud mínima se recomienda para una contraseña fuerte?',
    options: ['4 caracteres', '8 caracteres', '20 caracteres'],
    correctAnswer: 1,
    explanation: 'Se recomienda un mínimo de 8 caracteres, aunque 12 o más es ideal. Cada carácter adicional aumenta exponencialmente la seguridad.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Usar tu fecha de nacimiento es una buena práctica de seguridad.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Usar información personal como fechas de nacimiento, nombres o direcciones hace que las contraseñas sean fáciles de adivinar.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: '¿Cuál es la mejor opción para una contraseña?',
    options: ['perrito123', 'MiC0ntr@s3ña!', 'juan2020'],
    correctAnswer: 1,
    explanation: 'MiC0ntr@s3ña! es la mejor opción porque combina mayúsculas, minúsculas, números, símbolos y es suficientemente larga.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Una contraseña distinta para cada servicio es más segura.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Usar contraseñas únicas para cada servicio evita que un ataque comprometa todas tus cuentas. Es una práctica fundamental de seguridad.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: '¿Qué sistema es más seguro?',
    options: ['"password123"', '"T&l9m#Pz$4"', '"contraseña"'],
    correctAnswer: 1,
    explanation: 'T&l9m#Pz$4 es la más segura porque es aleatoria, combina diferentes tipos de caracteres y no contiene palabras comunes.',
    type: 'multiple'
  },
  {
    id: 7,
    question: '¿Qué factor aumenta la seguridad de una contraseña?',
    options: ['Usar solo letras', 'Usar mayúsculas, números y símbolos', 'Que sea muy corta'],
    correctAnswer: 1,
    explanation: 'Combinar mayúsculas, minúsculas, números y símbolos especiales aumenta significativamente la complejidad y seguridad de una contraseña.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Guardar contraseñas en un gestor es más seguro que memorizarlas todas.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Los gestores de contraseñas encriptan y protegen tus contraseñas, permitiendo usar contraseñas únicas y complejas sin riesgo de olvidarlas.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: '¿Cuál es la mejor estrategia para recordar contraseñas seguras?',
    options: ['Usar frases largas', 'Repetir siempre la misma', 'Anotarlas en un post-it'],
    correctAnswer: 0,
    explanation: 'Usar frases largas (passphrases) como "MiGatoSeLlamaMax2024!" es más seguro y fácil de recordar que contraseñas complejas aleatorias.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Cambiar la contraseña regularmente ayuda a la seguridad.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero: Cambiar contraseñas regularmente (cada 3-6 meses) reduce el riesgo si una contraseña es comprometida sin que te des cuenta.',
    type: 'truefalse'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz de Contraseñas Seguras',
  description: 'Aprende sobre ciberseguridad y buenas prácticas para crear contraseñas seguras. Descubre cómo proteger tus cuentas digitales de forma efectiva.',
  url: '/trivias/contrasenas-seguras',
  category: 'Trivias Educativas'
})

export default function ContrasenasSegurasClient() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfig[6].timeLimit)
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
    if (points >= 8) return { rank: 'Experto en Seguridad', emoji: '🔐' }
    if (points >= 5) return { rank: 'Usuario Consciente', emoji: '🛡️' }
    return { rank: 'Necesita Mejorar Seguridad', emoji: '🔓' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfig[6].timeLimit)
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
    setTimeLeft(triviasConfig[6].timeLimit)
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
    
    const shareText = `¡Acabo de completar el "Quiz de Contraseñas Seguras"! 🔐\n\nPuntuación: ${quizResult.points}/10\nNivel: ${quizResult.rank} ${quizResult.emoji}\n\n¿Sabes cómo crear contraseñas seguras? ¡Pruébalo aquí!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de Contraseñas Seguras',
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
        title="Quiz de Contraseñas Seguras"
        description="Aprende sobre ciberseguridad y buenas prácticas para crear contraseñas seguras. Descubre cómo proteger tus cuentas digitales de forma efectiva."
        introduction="¡Bienvenido al Quiz de Contraseñas Seguras! Te haremos preguntas sobre ciberseguridad y buenas prácticas para proteger tus cuentas digitales. Aprenderás sobre longitud de contraseñas, complejidad, gestores de contraseñas, y estrategias para mantener tus datos seguros. ¡Descubre si conoces las mejores prácticas de seguridad digital!"
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
        currentTriviaPath="/trivias/contrasenas-seguras/"
        relatedCalculator="/tecnologia/analisis-contraseñas"
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
