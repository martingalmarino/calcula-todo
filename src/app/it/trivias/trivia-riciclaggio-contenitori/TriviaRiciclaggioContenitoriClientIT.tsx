"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { Share2, Check, Recycle, Leaf, Trash2 } from 'lucide-react'

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
    question: 'Una bottiglia di vetro rotta deve andare in:',
    options: ['Contenitore verde', 'Contenitore blu', 'Contenitore giallo'],
    correctAnswer: 0,
    explanation: 'Il vetro rotto va nel contenitore verde. Il vetro si ricicla infinitamente senza perdere qualità, quindi è importante separarlo correttamente.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Un contenitore di yogurt di plastica:',
    options: ['Contenitore giallo', 'Contenitore verde', 'Contenitore marrone'],
    correctAnswer: 0,
    explanation: 'I contenitori di plastica come lo yogurt vanno nel contenitore giallo. Include bottiglie, contenitori, buste e altri prodotti di plastica.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Resti di cibo (bucce, ossa):',
    options: ['Contenitore marrone', 'Contenitore blu', 'Contenitore giallo'],
    correctAnswer: 0,
    explanation: 'I resti organici come bucce e ossa vanno nel contenitore marrone. Questi rifiuti si convertono in compost per fertilizzare la terra.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Un giornale vecchio deve andare in:',
    options: ['Contenitore blu', 'Contenitore verde', 'Contenitore giallo'],
    correctAnswer: 0,
    explanation: 'Carta e cartone vanno nel contenitore blu. Include giornali, riviste, scatole di cartone e qualsiasi prodotto di carta.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Una lattina di bibita vuota si butta in:',
    options: ['Contenitore giallo', 'Contenitore marrone', 'Contenitore verde'],
    correctAnswer: 0,
    explanation: 'Le lattine di metallo vanno nel contenitore giallo insieme ai contenitori di plastica. Il metallo si può riciclare infinitamente.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Un barattolo di vetro con tappo metallico:',
    options: ['Il vetro nel verde e il tappo nel giallo', 'Tutto insieme nel verde', 'Tutto nel marrone'],
    correctAnswer: 0,
    explanation: 'Devi separare: il barattolo di vetro va nel contenitore verde e il tappo metallico nel giallo. Ogni materiale si ricicla separatamente.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Tovaglioli sporchi con cibo:',
    options: ['Contenitore marrone', 'Contenitore blu', 'Contenitore giallo'],
    correctAnswer: 0,
    explanation: 'I tovaglioli sporchi con resti di cibo vanno nel contenitore marrone (organico). La carta sporca non si può riciclare come carta pulita.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Una scatola di cartone pulita e piegata:',
    options: ['Contenitore blu', 'Contenitore giallo', 'Contenitore verde'],
    correctAnswer: 0,
    explanation: 'Il cartone pulito va nel contenitore blu. È importante piegarlo per risparmiare spazio e facilitare il trasporto.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Batterie usate:',
    options: ['Punto pulito speciale', 'Contenitore marrone', 'Contenitore blu'],
    correctAnswer: 0,
    explanation: 'Le batterie usate vanno in un punto pulito speciale o contenitore specifico. Contengono materiali tossici che non devono mescolarsi con altri rifiuti.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Un contenitore di tetrapak (latte, succo):',
    options: ['Contenitore giallo', 'Contenitore verde', 'Contenitore marrone'],
    correctAnswer: 0,
    explanation: 'I contenitori di tetrapak vanno nel contenitore giallo. Anche se contengono cartone, hanno anche plastica e alluminio, quindi si classificano come contenitori.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Trivia di Riciclaggio: Cosa va in ogni contenitore?',
  description: 'Impara sulla corretta classificazione dei rifiuti e riciclaggio. Scopri cosa va in ogni contenitore per prenderti cura dell\'ambiente.',
  url: '/it/trivias/trivia-riciclaggio-contenitori',
  category: 'Quiz Educativi'
})

export default function TriviaRiciclaggioContenitoriClientIT() {
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
    if (points >= 8) return { rank: 'Eco-Eroe', emoji: '🌱' }
    if (points >= 5) return { rank: 'Riciclatore Consapevole', emoji: '♻️' }
    return { rank: 'Necessita Migliorare', emoji: '🗑️' }
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
    
    const shareText = `Ho appena completato la "Trivia di Riciclaggio: Cosa va in ogni contenitore?"! ♻️\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai classificare correttamente i rifiuti? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Trivia di Riciclaggio: Cosa va in ogni contenitore?',
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
        title="Trivia di Riciclaggio: Cosa va in ogni contenitore?"
        description="Impara sulla corretta classificazione dei rifiuti e riciclaggio. Scopri cosa va in ogni contenitore per prenderti cura dell\'ambiente."
        introduction="Benvenuto alla Trivia di Riciclaggio! Ti faremo domande sulla corretta classificazione dei rifiuti nei diversi contenitori. Imparerai sul contenitore verde (vetro), blu (carta/cartone), giallo (contenitori), marrone (organico) e punti puliti speciali. Scopri se conosci le migliori pratiche per prenderti cura dell\'ambiente!"
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
        currentTriviaPath="/it/trivias/trivia-riciclaggio-contenitori/"
        relatedCalculator="/it/altre/calcolatrice-mance"
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
      </QuizLayout>
    </>
  )
}
