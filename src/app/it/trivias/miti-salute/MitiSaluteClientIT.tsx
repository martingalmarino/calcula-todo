"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayoutIT } from '@/components/QuizLayoutIT'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
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
    statement: 'Mangiare dopo le 20:00 fa ingrassare di più.', 
    correctAnswer: false, 
    explanation: 'Falso: Quello che conta è il bilancio calorico totale della giornata, non l\'ora in cui mangi.' 
  },
  { 
    id: 2, 
    statement: 'L\'uovo aumenta pericolosamente il colesterolo.', 
    correctAnswer: false, 
    explanation: 'Falso: Il consumo moderato di uova non influisce significativamente sul colesterolo nelle persone sane.' 
  },
  { 
    id: 3, 
    statement: 'Bere acqua fredda fa ingrassare.', 
    correctAnswer: false, 
    explanation: 'Falso: L\'acqua fredda non ha calorie e può persino aiutare a bruciare alcune calorie riscaldandola il corpo.' 
  },
  { 
    id: 4, 
    statement: 'Le vitamine della frutta si perdono immediatamente quando la tagli.', 
    correctAnswer: false, 
    explanation: 'Falso: Le vitamine si mantengono per diverse ore se conservate bene, anche se si perdono gradualmente.' 
  },
  { 
    id: 5, 
    statement: 'Dormire poco influisce sulla memoria e la salute generale.', 
    correctAnswer: true, 
    explanation: 'Vero: La mancanza di sonno influisce sulla memoria, concentrazione, sistema immunitario e metabolismo.' 
  },
  { 
    id: 6, 
    statement: 'Sudare molto significa che stai bruciando più grasso.', 
    correctAnswer: false, 
    explanation: 'Falso: Sudare è regolazione termica, non indica bruciare grasso. È perdita di acqua, non grasso.' 
  },
  { 
    id: 7, 
    statement: 'Il caffè in eccesso può influire sul sonno.', 
    correctAnswer: true, 
    explanation: 'Vero: La caffeina può interferire con il sonno se consumata vicino all\'ora di andare a dormire.' 
  },
  { 
    id: 8, 
    statement: 'Il consumo eccessivo di zucchero può portare al diabete di tipo 2.', 
    correctAnswer: true, 
    explanation: 'Vero: L\'eccesso di zucchero può contribuire allo sviluppo del diabete di tipo 2 e obesità.' 
  },
  { 
    id: 9, 
    statement: 'Saltare la colazione fa sempre ingrassare.', 
    correctAnswer: false, 
    explanation: 'Falso: Dipende dal totale calorico della giornata. Alcune persone beneficiano del digiuno intermittente.' 
  },
  { 
    id: 10, 
    statement: 'Bere 2 litri di acqua al giorno aiuta la salute generale.', 
    correctAnswer: true, 
    explanation: 'Vero: L\'idratazione adeguata è fondamentale per il funzionamento dell\'organismo.' 
  },
]

const structuredData = jsonLdCalculator({
  name: 'Gioco di Miti di Salute',
  description: 'Smentisci credenze comuni sulla salute in modo ludico. Sai distinguere tra miti e realtà?',
  url: '/it/trivias/miti-salute',
  category: 'Trivie Educative'
})

export default function MitiSaluteClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[1].timeLimit)
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
    if (points >= 8) return { rank: 'Cacciatore di Miti', emoji: '🧪' }
    if (points >= 5) return { rank: 'Scettico', emoji: '🤔' }
    return { rank: 'Credente', emoji: '😅' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[1].timeLimit)
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
    setTimeLeft(triviasConfigIT[1].timeLimit)
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

    // Aggiornare lo stato delle domande risposte
    setAnsweredQuestions(prev => {
      const newAnswered = new Set(prev).add(currentQuestion.id)
      
      // Usare setTimeout per permettere che lo stato si aggiorni
      setTimeout(() => {
        setFeedback(null)
        setSelectedAnswer(null)
        
        // Verificare se abbiamo risposto a tutte le domande
        if (newAnswered.size >= totalQuestions) {
          // Gioco terminato
          setIsActive(false)
          const finalScore = score + (isCorrect ? 1 : 0)
          const rankInfo = getRankInfo(finalScore)
          setQuizResult({ points: finalScore, rank: rankInfo.rank, emoji: rankInfo.emoji })
        } else {
          // Continuare con la prossima domanda
          setCurrentQuestionIndex(prevIndex => prevIndex + 1)
          // Ottenere domande non risposte
          const unansweredQuestions = quizQuestions.filter(q => !newAnswered.has(q.id))
          if (unansweredQuestions.length > 0) {
            const nextQuestion = shuffleArray([...unansweredQuestions])[0]
            setCurrentQuestion(nextQuestion)
          }
        }
      }, 2000) // Dare 2 secondi per feedback e spiegazione
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `Ho appena completato il Gioco di Miti di Salute! 🧪\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nTi azzardi a smentire miti di salute? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Gioco di Miti di Salute',
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
                  <QuizLayoutIT
        title="Gioco di Miti di Salute"
        description="Smentisci credenze comuni sulla salute in modo ludico. Sai distinguere tra miti e realtà?"
        introduction="Benvenuto al Gioco di Miti di Salute! Ti presenteremo affermazioni su salute e nutrizione. La tua missione è determinare se sono vere o false. Ogni risposta corretta vale un punto e riceverai una spiegazione breve. Alla fine, otterrai un ranking secondo la tua conoscenza. Dimostra di essere un vero cacciatore di miti!"
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
        currentTriviaPath="/it/trivias/miti-salute/"
        relatedCalculator="/it/salute/imc"
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
                ✅ Vero
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
                  </QuizLayoutIT>
    </>
  )
}