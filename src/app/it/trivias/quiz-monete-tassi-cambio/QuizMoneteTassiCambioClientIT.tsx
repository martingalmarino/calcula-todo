"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { Share2, Check, Coins, Globe, Banknote } from 'lucide-react'

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
    question: 'Qual è la moneta ufficiale del Giappone?',
    options: ['Yuan', 'Yen', 'Won'],
    correctAnswer: 1,
    explanation: 'Lo yen giapponese (¥) è la moneta ufficiale del Giappone dal 1871. È una delle monete più importanti del mondo e si usa ampiamente nel commercio internazionale.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Quale paese utilizza la rupia come moneta?',
    options: ['India', 'Indonesia', 'Arabia Saudita'],
    correctAnswer: 0,
    explanation: 'La rupia indiana (₹) è la moneta ufficiale dell\'India. Ci sono anche rupie in altri paesi come Pakistan, Sri Lanka e Nepal, ma ognuna è diversa.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Qual è la moneta ufficiale del Brasile?',
    options: ['Real', 'Peso', 'Escudo'],
    correctAnswer: 0,
    explanation: 'Il real brasiliano (R$) è la moneta ufficiale del Brasile dal 1994. Ha sostituito il cruzeiro real come parte di un piano di stabilizzazione economica.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Qual è la moneta del Sudafrica?',
    options: ['Rand', 'Dollaro sudafricano', 'Sterlina'],
    correctAnswer: 0,
    explanation: 'Il rand sudafricano (R) è la moneta ufficiale del Sudafrica dal 1961. Si usa anche in altri paesi dell\'area monetaria comune dell\'Africa meridionale.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Vero/Falso: L\'euro è usato in tutti i paesi d\'Europa.',
    options: ['Vero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. L\'euro è usato in 19 dei 27 paesi dell\'Unione Europea. Paesi come Regno Unito, Svezia, Danimarca e altri mantengono le loro monete.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: 'Quale paese ha come moneta il peso cileno?',
    options: ['Cile', 'Perù', 'Bolivia'],
    correctAnswer: 0,
    explanation: 'Il peso cileno ($) è la moneta ufficiale del Cile dal 1975. È una delle monete più stabili dell\'America Latina.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Qual è la moneta ufficiale della Svizzera?',
    options: ['Euro', 'Franco svizzero', 'Sterlina'],
    correctAnswer: 1,
    explanation: 'Il franco svizzero (CHF) è la moneta ufficiale della Svizzera e del Liechtenstein. È considerata una delle monete più stabili e sicure del mondo.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Quale paese usa il dollaro canadese?',
    options: ['Canada', 'Australia', 'Nuova Zelanda'],
    correctAnswer: 0,
    explanation: 'Il dollaro canadese (CAD) è la moneta ufficiale del Canada dal 1858. È una delle monete di riserva più importanti del mondo.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Qual è la moneta ufficiale della Corea del Sud?',
    options: ['Yen', 'Won', 'Ringgit'],
    correctAnswer: 1,
    explanation: 'Il won sudcoreano (₩) è la moneta ufficiale della Corea del Sud dal 1962. È una delle monete più importanti dell\'Asia.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Quale paese ha come moneta il peso messicano?',
    options: ['Messico', 'Colombia', 'Venezuela'],
    correctAnswer: 0,
    explanation: 'Il peso messicano ($) è la moneta ufficiale del Messico dal 1993. È una delle monete più negoziate nel mercato delle valute.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz di Monete e Tassi di Cambio',
  description: 'Impara sulle monete ufficiali di diversi paesi del mondo. Scopri quali paesi usano quali monete e espandi le tue conoscenze geografiche.',
  url: '/it/trivias/quiz-monete-tassi-cambio',
  category: 'Quiz Educativi'
})

export default function QuizMoneteTassiCambioClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minuti
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
    if (points >= 8) return { rank: 'Esperto di Valute', emoji: '💱' }
    if (points >= 5) return { rank: 'Conoscitore di Monete', emoji: '💰' }
    return { rank: 'Necessita Più Conoscenza', emoji: '🌍' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(300)
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
    setTimeLeft(300)
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
      }, 2500) // 2.5 secondi per leggere la spiegazione
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `Ho appena completato il "Quiz di Monete e Tassi di Cambio"! 💰\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nConosci le monete del mondo? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz di Monete e Tassi di Cambio',
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
        title="Quiz di Monete e Tassi di Cambio"
        description="Impara sulle monete ufficiali di diversi paesi del mondo. Scopri quali paesi usano quali monete e espandi le tue conoscenze geografiche."
        introduction="Benvenuto al Quiz di Monete e Tassi di Cambio! Ti faremo domande sulle monete ufficiali di diversi paesi del mondo. Imparerai sullo yen giapponese, l'euro, il dollaro canadese, il peso messicano e molte altre monete importanti. Scopri quanto bene conosci la geografia monetaria mondiale!"
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
        currentTriviaPath="/it/trivias/quiz-monete-tassi-cambio/"
        relatedCalculator="/it/finanze/conversione-monete"
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
                    ✅ Vero
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
                  Copiato!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Condividi Risultato
                </>
              )}
            </Button>
          </div>
        )}
      </QuizLayout>
    </>
  )
}
