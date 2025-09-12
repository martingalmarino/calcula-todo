"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayoutIT } from '@/components/QuizLayoutIT'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
import { Share2, Check, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react'

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
    question: 'In quale anno è avvenuta la Grande Depressione negli USA?',
    options: ['1929', '1939', '1945'],
    correctAnswer: 0,
    explanation: 'La Grande Depressione è iniziata nel 1929 con il crollo della borsa di Wall Street. È stata la crisi economica più devastante del XX secolo, che ha colpito tutto il mondo per più di un decennio.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Cosa ha causato la crisi del 2008 negli USA?',
    options: ['Bolla immobiliare', 'Crisi del petrolio', 'Guerra commerciale'],
    correctAnswer: 0,
    explanation: 'La crisi del 2008 è stata causata dalla bolla immobiliare e dai mutui subprime. Le banche hanno concesso prestiti a persone con cattivo credito, e quando i prezzi delle case sono crollati, si è scatenata una crisi finanziaria globale.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Vero/Falso: Lehman Brothers è fallita durante la crisi del 2008.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. Lehman Brothers, una delle più grandi banche d\'investimento degli USA, è fallita nel settembre 2008. Il suo crollo ha segnato il punto più critico della crisi finanziaria e ha portato a interventi massicci del governo.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: 'Quale paese ha subito il "corralito" finanziario nel 2001?',
    options: ['Spagna', 'Argentina', 'Messico'],
    correctAnswer: 1,
    explanation: 'L\'Argentina ha subito il "corralito" nel 2001, una misura che ha limitato i prelievi bancari per evitare una corsa agli sportelli. Questa crisi faceva parte di una recessione economica severa durata diversi anni.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'In quale decennio è avvenuta la crisi del debito latinoamericano?',
    options: ['1960s', '1980s', '2000s'],
    correctAnswer: 1,
    explanation: 'La crisi del debito latinoamericano è avvenuta negli anni \'80, conosciuta come il "decennio perduto". Molti paesi dell\'America Latina non sono riusciti a pagare i loro debiti esteri, portando a ristrutturazioni e austerità.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Vero/Falso: La crisi asiatica è iniziata in Thailandia nel 1997.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. La crisi finanziaria asiatica è iniziata in Thailandia nel luglio 1997 quando il baht thailandese è crollato. Si è diffusa rapidamente ad altri paesi asiatici come Indonesia, Corea del Sud e Malesia.',
    type: 'truefalse'
  },
  {
    id: 7,
    question: 'Quale paese ha avuto una grande crisi economica nel 2010 legata al debito sovrano europeo?',
    options: ['Grecia', 'Francia', 'Germania'],
    correctAnswer: 0,
    explanation: 'La Grecia ha avuto una crisi del debito sovrano nel 2010 che ha minacciato di diffondersi in tutta la zona euro. Il paese ha avuto bisogno di multiple salvataggi finanziari e ha implementato misure di austerità severe.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Quale è stata una conseguenza globale della crisi del petrolio del 1973?',
    options: ['Alta inflazione', 'Espansione economica', 'Riduzione dei prezzi'],
    correctAnswer: 0,
    explanation: 'La crisi del petrolio del 1973 ha causato alta inflazione globale. I paesi arabi hanno ridotto la produzione di petrolio, quadruplicando i prezzi e causando stagflazione (inflazione con recessione) in molti paesi.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Vero/Falso: La Grande Recessione (2008) ha colpito solo gli Stati Uniti.',
    options: ['Vero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. La Grande Recessione del 2008 è stata una crisi globale che ha colpito paesi di tutto il mondo. Europa, Asia e America Latina hanno sperimentato recessioni, disoccupazione di massa e crisi bancarie.',
    type: 'truefalse'
  },
  {
    id: 10,
    question: 'Quale settore ha scatenato la crisi delle "dot-com" nel 2000?',
    options: ['Tecnologia', 'Energia', 'Automotive'],
    correctAnswer: 0,
    explanation: 'La crisi delle "dot-com" nel 2000 è stata scatenata dal settore tecnologico. Le aziende di internet e tecnologia sono state sopravvalutate durante la bolla, e quando è crollata, molte aziende sono fallite e il NASDAQ ha perso il 78% del suo valore.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz di Crisi Finanziarie',
  description: 'Impara sulle crisi finanziarie più importanti della storia. Scopri cosa ha causato ogni crisi, quando sono avvenute e le loro conseguenze globali.',
  url: '/it/trivias/quiz-crisi-finanziarie',
  category: 'Trivie Educative'
})

export default function QuizCrisiFinanziarieClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[13].timeLimit)
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
    if (points >= 8) return { rank: 'Esperto in Storia Economica', emoji: '📈' }
    if (points >= 5) return { rank: 'Conoscitore di Crisi', emoji: '📊' }
    return { rank: 'Necessita Più Studio', emoji: '📉' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[13].timeLimit)
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
    setTimeLeft(triviasConfigIT[13].timeLimit)
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
    
    const shareText = `Ho appena completato il "Quiz di Crisi Finanziarie"! 📊\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nConosci la storia economica mondiale? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz di Crisi Finanziarie',
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
        title="Quiz di Crisi Finanziarie"
        description="Impara sulle crisi finanziarie più importanti della storia. Scopri cosa ha causato ogni crisi, quando sono avvenute e le loro conseguenze globali."
        introduction="Benvenuto al Quiz di Crisi Finanziarie! Ti faremo domande sulle crisi economiche più importanti della storia. Imparerai sulla Grande Depressione del 1929, la crisi del 2008, la crisi asiatica del 1997, il corralito argentino e molte altre crisi che hanno modellato l'economia mondiale. Scopri quanto bene conosci la storia economica!"
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
        currentTriviaPath="/it/trivias/quiz-crisi-finanziarie/"
        relatedCalculator="/it/finanze/conversione-valute"
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
