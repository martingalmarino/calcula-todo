"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
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
    question: 'Quale di queste password è più sicura?',
    options: ['123456', 'qwerty', 'Gt$9kP!2'],
    correctAnswer: 2,
    explanation: 'Gt$9kP!2 è la più sicura perché combina maiuscole, minuscole, numeri e simboli speciali, oltre ad essere imprevedibile.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Quale lunghezza minima si raccomanda per una password forte?',
    options: ['4 caratteri', '8 caratteri', '20 caratteri'],
    correctAnswer: 1,
    explanation: 'Si raccomanda un minimo di 8 caratteri, anche se 12 o più è ideale. Ogni carattere aggiuntivo aumenta esponenzialmente la sicurezza.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Usare la tua data di nascita è una buona pratica di sicurezza.',
    options: ['Vero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Usare informazioni personali come date di nascita, nomi o indirizzi rende le password facili da indovinare.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: 'Qual è la migliore opzione per una password?',
    options: ['cagnolino123', 'LaMiaP@ssw0rd!', 'mario2020'],
    correctAnswer: 1,
    explanation: 'LaMiaP@ssw0rd! è la migliore opzione perché combina maiuscole, minuscole, numeri, simboli ed è sufficientemente lunga.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Una password diversa per ogni servizio è più sicura.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Usare password uniche per ogni servizio evita che un attacco comprometta tutti i tuoi account. È una pratica fondamentale di sicurezza.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: 'Quale sistema è più sicuro?',
    options: ['"password123"', '"T&l9m#Pz$4"', '"password"'],
    correctAnswer: 1,
    explanation: 'T&l9m#Pz$4 è la più sicura perché è casuale, combina diversi tipi di caratteri e non contiene parole comuni.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Quale fattore aumenta la sicurezza di una password?',
    options: ['Usare solo lettere', 'Usare maiuscole, numeri e simboli', 'Che sia molto corta'],
    correctAnswer: 1,
    explanation: 'Combinare maiuscole, minuscole, numeri e simboli speciali aumenta significativamente la complessità e sicurezza di una password.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Salvare password in un gestore è più sicuro che memorizzarle tutte.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: I gestori di password criptano e proteggono le tue password, permettendo di usare password uniche e complesse senza rischio di dimenticarle.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: 'Qual è la migliore strategia per ricordare password sicure?',
    options: ['Usare frasi lunghe', 'Ripetere sempre la stessa', 'Annotarle su un post-it'],
    correctAnswer: 0,
    explanation: 'Usare frasi lunghe (passphrase) come "IlMioGattoSiChiamaMax2024!" è più sicuro e facile da ricordare che password complesse casuali.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Cambiare la password regolarmente aiuta la sicurezza.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Cambiare password regolarmente (ogni 3-6 mesi) riduce il rischio se una password viene compromessa senza che te ne accorga.',
    type: 'truefalse'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz di Password Sicure',
  description: 'Impara sulla cybersicurezza e le buone pratiche per creare password sicure. Scopri come proteggere i tuoi account digitali in modo efficace.',
  url: '/it/trivias/password-sicure',
  category: 'Trivie Educative'
})

export default function PasswordSicureClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[6].timeLimit)
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
    if (points >= 8) return { rank: 'Esperto in Sicurezza', emoji: '🔐' }
    if (points >= 5) return { rank: 'Utente Consapevole', emoji: '🛡️' }
    return { rank: 'Necessita Migliorare la Sicurezza', emoji: '🔓' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[6].timeLimit)
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
    setTimeLeft(triviasConfigIT[6].timeLimit)
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
    
    const shareText = `Ho appena completato il "Quiz di Password Sicure"! 🔐\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai come creare password sicure? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz di Password Sicure',
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
        title="Quiz di Password Sicure"
        description="Impara sulla cybersicurezza e le buone pratiche per creare password sicure. Scopri come proteggere i tuoi account digitali in modo efficace."
        introduction="Benvenuto al Quiz di Password Sicure! Ti faremo domande sulla cybersicurezza e le buone pratiche per proteggere i tuoi account digitali. Imparerai sulla lunghezza delle password, complessità, gestori di password, e strategie per mantenere i tuoi dati sicuri. Scopri se conosci le migliori pratiche di sicurezza digitale!"
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
        currentTriviaPath="/it/trivias/password-sicure/"
        relatedCalculator="/it/tecnologia/analisi-password"
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
