"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
import { Share2, Check, Activity, Zap, Heart } from 'lucide-react'

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
    question: 'Quanti minuti di attività moderata raccomanda l\'OMS agli adulti per settimana?',
    options: ['75 minuti', '150 minuti', '300 minuti'],
    correctAnswer: 1,
    explanation: 'L\'OMS raccomanda almeno 150 minuti di attività fisica moderata per settimana agli adulti. Questo equivale a 30 minuti, 5 giorni alla settimana.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Quanti minuti di attività vigorosa equivalgono ai 150 di moderata?',
    options: ['50 minuti', '75 minuti', '100 minuti'],
    correctAnswer: 1,
    explanation: '75 minuti di attività vigorosa equivalgono a 150 minuti di attività moderata. L\'attività vigorosa è più intensa e richiede meno tempo.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Camminare velocemente conta come esercizio moderato.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Camminare velocemente (a un ritmo che ti fa sudare leggermente) conta come attività fisica moderata secondo le raccomandazioni dell\'OMS.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: 'Che tipo di esercizio è vigoroso?',
    options: ['Correre', 'Passeggiare lentamente', 'Stretching dolce'],
    correctAnswer: 0,
    explanation: 'Correre è considerato esercizio vigoroso. Altri esempi includono nuoto veloce, ciclismo veloce, e sport come calcio o pallacanestro.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'L\'OMS raccomanda a bambini e adolescenti:',
    options: ['30 min/settimana', '60 min giornalieri', 'Solo a scuola'],
    correctAnswer: 1,
    explanation: 'I bambini e adolescenti (5-17 anni) hanno bisogno di almeno 60 minuti di attività fisica moderata a vigorosa giornalmente per uno sviluppo salutare.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Salire le scale conta come attività fisica moderata.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Salire le scale è un\'eccellente forma di attività fisica moderata che puoi incorporare facilmente nella tua routine giornaliera.',
    type: 'truefalse'
  },
  {
    id: 7,
    question: 'Quale NON è esercizio moderato?',
    options: ['Andare in bicicletta a ritmo tranquillo', 'Ballare socialmente', 'Guardare la televisione'],
    correctAnswer: 2,
    explanation: 'Guardare la televisione non è attività fisica. Andare in bicicletta a ritmo tranquillo e ballare socialmente sì contano come esercizio moderato.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Quale altro beneficio ha l\'esercizio regolare?',
    options: ['Migliora la salute cardiovascolare', 'Cambiare colore degli occhi', 'Aumentare l\'altezza'],
    correctAnswer: 0,
    explanation: 'L\'esercizio regolare migliora la salute cardiovascolare, rafforza il cuore, riduce la pressione sanguigna e migliora la circolazione.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'L\'esercizio aiuta a prevenire il diabete di tipo 2.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: L\'esercizio regolare aiuta a prevenire il diabete di tipo 2 migliorando la sensibilità all\'insulina e mantenendo un peso salutare.',
    type: 'truefalse'
  },
  {
    id: 10,
    question: 'Quale minimo di giorni per settimana si raccomanda di fare esercizio moderato?',
    options: ['1–2 giorni', '3–5 giorni', '7 giorni'],
    correctAnswer: 1,
    explanation: 'Si raccomanda di fare esercizio moderato almeno 3-5 giorni per settimana. Questo permette di distribuire i 150 minuti settimanali in modo equilibrato.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Esercizio Fisico Minimo Raccomandato (OMS)',
  description: 'Impara le raccomandazioni ufficiali dell\'OMS sull\'attività fisica. Scopri quanto esercizio hai bisogno per mantenerti salutare.',
  url: '/it/trivias/esercizio-fisico-oms',
  category: 'Trivie Educative'
})

export default function EsercizioFisicoOmsClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[4].timeLimit)
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
    if (points >= 8) return { rank: 'Atleta OMS', emoji: '🏃‍♂️' }
    if (points >= 5) return { rank: 'Attivo Salutare', emoji: '💪' }
    return { rank: 'Necessita Più Movimento', emoji: '🚶‍♂️' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[4].timeLimit)
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
    setTimeLeft(triviasConfigIT[4].timeLimit)
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
    
    const shareText = `Ho appena completato il quiz "Esercizio Fisico Minimo Raccomandato (OMS)"! 🏃‍♂️\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai quanto esercizio raccomanda l\'OMS? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Esercizio Fisico Minimo Raccomandato (OMS)',
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
        title="Esercizio Fisico Minimo Raccomandato (OMS)"
        description="Impara le raccomandazioni ufficiali dell\'OMS sull\'attività fisica. Scopri quanto esercizio hai bisogno per mantenerti salutare."
        introduction="Benvenuto al quiz sull\'esercizio fisico! Ti faremo domande sulle raccomandazioni ufficiali dell\'OMS per l\'attività fisica. Imparerai quanti minuti di esercizio hai bisogno per settimana, che tipi di attività contano come esercizio moderato o vigoroso, e i benefici per la salute. Scopri se conosci le linee guida ufficiali per mantenerti attivo e salutare!"
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
        currentTriviaPath="/it/trivias/esercizio-fisico-oms/"
        relatedCalculator="/it/salute/calorie"
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
