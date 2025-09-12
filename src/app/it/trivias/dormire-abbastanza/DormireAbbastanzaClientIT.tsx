"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
import { Share2, Check, Moon, Clock, Brain } from 'lucide-react'

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
    question: 'Quante ore di sonno ha bisogno un adulto medio?',
    options: ['4–6 ore', '7–9 ore', '10–12 ore'],
    correctAnswer: 1,
    explanation: 'Gli adulti hanno bisogno tra 7-9 ore di sonno per notte per funzionare ottimalmente. Meno di 7 ore può influire sulla salute.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Quante ore si raccomanda per un adolescente (14–17 anni)?',
    options: ['6–7 ore', '8–10 ore', '11–12 ore'],
    correctAnswer: 1,
    explanation: 'Gli adolescenti hanno bisogno di 8-10 ore di sonno. Durante questa fase, il corpo è in crescita e sviluppo attivo.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Gli adulti anziani (65+) hanno bisogno di dormire più dei giovani adulti.',
    options: ['Vero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Gli adulti anziani generalmente hanno bisogno tra 7-8 ore, simile ai giovani adulti, ma possono avere modelli di sonno diversi.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: 'Quale gruppo ha bisogno di più ore di sonno?',
    options: ['Bambini di 6–12 anni', 'Giovani adulti', 'Adulti anziani'],
    correctAnswer: 0,
    explanation: 'I bambini di 6-12 anni hanno bisogno di 9-12 ore di sonno. Il sonno è cruciale per la loro crescita e sviluppo cognitivo.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Dormire meno di 5 ore aumenta il rischio di ipertensione.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: La privazione cronica del sonno è associata a maggior rischio di ipertensione, diabete e malattie cardiovascolari.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: 'Quale fase del sonno è essenziale per la memoria e l\'apprendimento?',
    options: ['REM', 'Sonno leggero', 'Insonnia'],
    correctAnswer: 0,
    explanation: 'Il sonno REM (movimento rapido degli occhi) è cruciale per la consolidazione della memoria e l\'apprendimento. È quando sogniamo più intensamente.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Quante ore ha bisogno un neonato (0–3 mesi)?',
    options: ['10–12 ore', '14–17 ore', '20 ore'],
    correctAnswer: 1,
    explanation: 'I neonati di 0-3 mesi hanno bisogno di 14-17 ore di sonno al giorno. Il loro sonno è distribuito in più pisolini durante il giorno.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Dormire più di 10 ore al giorno è sempre salutare.',
    options: ['Vero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Dormire consistentemente più di 10 ore può indicare problemi di salute sottostanti o essere controproducente per alcuni adulti.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: 'Quale abitudine aiuta a migliorare la qualità del sonno?',
    options: ['Usare schermi fino a tardi', 'Mantenere orari regolari', 'Bere caffè di sera'],
    correctAnswer: 1,
    explanation: 'Mantenere orari regolari di sonno aiuta a sincronizzare l\'orologio biologico interno e migliora significativamente la qualità del riposo.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Dormire poco influisce principalmente su:',
    options: ['Memoria e concentrazione', 'Altezza', 'Colore degli occhi'],
    correctAnswer: 0,
    explanation: 'La privazione del sonno influisce principalmente sulle funzioni cognitive: memoria, concentrazione, presa di decisioni e tempo di reazione.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Dormi Abbastanza?',
  description: 'Metti alla prova le tue conoscenze sul sonno e le abitudini salutari. Impara quante ore hai bisogno di dormire secondo la tua età.',
  url: '/it/trivias/dormire-abbastanza',
  category: 'Trivie Educative'
})

export default function DormireAbbastanzaClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[3].timeLimit)
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
    if (points >= 8) return { rank: 'Esperto del Sonno', emoji: '😴' }
    if (points >= 5) return { rank: 'Buon Dormiente', emoji: '😊' }
    return { rank: 'Necessita Più Riposo', emoji: '😴' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[3].timeLimit)
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
    setTimeLeft(triviasConfigIT[3].timeLimit)
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
    
    const shareText = `Ho appena completato il quiz "Dormi Abbastanza?"! 😴\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai quante ore hai bisogno di dormire? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Dormi Abbastanza?',
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
        title="Dormi Abbastanza?"
        description="Metti alla prova le tue conoscenze sul sonno e le abitudini salutari. Impara quante ore hai bisogno di dormire secondo la tua età."
        introduction="Benvenuto al quiz sul sonno! Ti faremo domande su quante ore hai bisogno di dormire secondo la tua età, le fasi del sonno, e abitudini salutari. Imparerai dati importanti su come il sonno influenza la tua salute fisica e mentale. Scopri se sai davvero abbastanza sul riposo!"
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
        currentTriviaPath="/it/trivias/dormire-abbastanza/"
        relatedCalculator="/it/salute/sonno"
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
