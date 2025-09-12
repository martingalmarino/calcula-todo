"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { Share2, Check, Wifi, Zap, Globe } from 'lucide-react'

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
    question: 'Quanti MB ci sono in 1 GB?',
    options: ['500 MB', '1000 MB', '1024 MB'],
    correctAnswer: 2,
    explanation: '1 GB equivale a 1024 MB. Questa è la conversione binaria standard usata in informatica (2^10 = 1024).',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Cosa è più veloce?',
    options: ['100 Mbps', '100 MB/s'],
    correctAnswer: 0,
    explanation: '100 MB/s è più veloce di 100 Mbps. 100 MB/s equivale approssimativamente a 800 Mbps. La differenza è che MB/s misura megabyte al secondo, mentre Mbps misura megabit al secondo.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Cosa significa Mbps?',
    options: ['Megabit al secondo', 'Megabyte al secondo', 'Mega battery per second'],
    correctAnswer: 0,
    explanation: 'Mbps significa "Megabit al secondo". È un\'unità di misura della velocità di trasferimento dati nelle reti. 1 byte = 8 bit, quindi 1 MB/s = 8 Mbps.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Quale protocollo si usa per navigare su pagine sicure?',
    options: ['HTTP', 'HTTPS', 'FTP'],
    correctAnswer: 1,
    explanation: 'HTTPS (HTTP Secure) è il protocollo usato per pagine web sicure. Cripta la comunicazione tra il browser e il server, proteggendo i dati sensibili.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Un IP pubblico è unico su internet.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Un indirizzo IP pubblico è unico globalmente su internet. Ogni dispositivo connesso a internet ha un IP pubblico unico che lo identifica.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: 'Cosa misura il ping?',
    options: ['Velocità di download', 'Latenza', 'Capacità di memoria'],
    correctAnswer: 1,
    explanation: 'Il ping misura la latenza, cioè il tempo che impiega un pacchetto di dati per andare dal tuo dispositivo a un server e tornare indietro. Si misura in millisecondi (ms).',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Cosa significa 4G nelle reti mobili?',
    options: ['Quarta generazione', '4 gigabyte di dati', '4 megabit'],
    correctAnswer: 0,
    explanation: '4G significa "Quarta generazione" di tecnologia di reti mobili. È l\'evoluzione del 3G, offrendo velocità più elevate e migliore connettività.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Cos\'è la larghezza di banda?',
    options: ['Il tempo di risposta', 'La capacità di trasmissione', 'Il tipo di cavo'],
    correctAnswer: 1,
    explanation: 'La larghezza di banda è la capacità massima di trasmissione dati di una connessione. Si misura in bit al secondo e determina quanta informazione può essere trasferita simultaneamente.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Quale unità misura la velocità di internet?',
    options: ['km/h', 'bit al secondo', 'Joule'],
    correctAnswer: 1,
    explanation: 'La velocità di internet si misura in bit al secondo (bps) o i suoi multipli come Kbps, Mbps, Gbps. Rappresenta quanti bit di dati possono essere trasmessi in un secondo.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Quale protocollo serve per inviare email?',
    options: ['SMTP', 'FTP', 'DNS'],
    correctAnswer: 0,
    explanation: 'SMTP (Simple Mail Transfer Protocol) è il protocollo standard per inviare email. Si occupa della trasmissione di messaggi tra server di posta.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Trivia di Internet',
  description: 'Metti alla prova le tue conoscenze su internet, reti e tecnologia. Impara concetti base di connettività, protocolli e velocità di internet.',
  url: '/it/trivias/trivia-internet',
  category: 'Quiz Educativi'
})

export default function TriviaInternetClientIT() {
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
    if (points >= 8) return { rank: 'Esperto di Reti', emoji: '🌐' }
    if (points >= 5) return { rank: 'Utente Connesso', emoji: '📶' }
    return { rank: 'Necessita Migliorare Connettività', emoji: '📡' }
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
    
    const shareText = `Ho appena completato la "Trivia di Internet"! 🌐\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai come funziona internet? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Trivia di Internet',
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
        title="Trivia di Internet"
        description="Metti alla prova le tue conoscenze su internet, reti e tecnologia. Impara concetti base di connettività, protocolli e velocità di internet."
        introduction="Benvenuto alla Trivia di Internet! Ti faremo domande sui concetti base di internet, reti e tecnologia. Imparerai sulle velocità di connessione, protocolli, unità di misura, e come funziona la connettività digitale. Scopri se conosci i fondamenti di internet e delle reti!"
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
        currentTriviaPath="/it/trivias/trivia-internet/"
        relatedCalculator="/it/tecnologia/velocita-download"
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
