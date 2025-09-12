"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { Share2, Check, Bone, Skull, Heart } from 'lucide-react'

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
    question: 'Quanti ossa ha un adulto medio?',
    options: ['106', '206', '306'],
    correctAnswer: 1,
    explanation: 'Un adulto medio ha 206 ossa. I bambini nascono con circa 270 ossa, ma molte si fondono durante la crescita. Lo scheletro umano fornisce struttura, protezione e permette il movimento.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Qual è l\'osso più lungo del corpo?',
    options: ['Femore', 'Omero', 'Tibia'],
    correctAnswer: 0,
    explanation: 'Il femore è l\'osso più lungo del corpo umano. Si trova nella coscia e può rappresentare fino al 25% dell\'altezza totale di una persona. È anche uno degli ossa più forti.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Quale osso protegge il cervello?',
    options: ['Cranio', 'Sterno', 'Vertebre'],
    correctAnswer: 0,
    explanation: 'Il cranio protegge il cervello ed è formato da 22 ossa fuse. Fornisce una protezione solida per l\'organo più importante del sistema nervoso centrale.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Dove si trova la rotula?',
    options: ['Ginocchio', 'Mano', 'Spalla'],
    correctAnswer: 0,
    explanation: 'La rotula (o patella) si trova nel ginocchio. È un osso sesamoide che protegge l\'articolazione del ginocchio e migliora l\'efficienza del muscolo quadricipite.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Qual è l\'osso più piccolo del corpo?',
    options: ['Staffa (dell\'orecchio)', 'Radio', 'Clavicola'],
    correctAnswer: 0,
    explanation: 'La staffa (dell\'orecchio) è l\'osso più piccolo del corpo umano. Si trova nell\'orecchio medio e misura circa 2,8 mm di lunghezza. Fa parte della catena di ossicini che trasmette il suono.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Quale osso unisce il braccio al torace?',
    options: ['Scapola', 'Femore', 'Vertebra'],
    correctAnswer: 0,
    explanation: 'La scapola (o omoplato) unisce il braccio al torace. È un osso piatto triangolare che fa parte della cintura scapolare e permette un\'ampia gamma di movimenti del braccio.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Come si chiama l\'osso dell\'avambraccio accanto all\'ulna?',
    options: ['Radio', 'Omero', 'Clavicola'],
    correctAnswer: 0,
    explanation: 'Il radio è l\'osso dell\'avambraccio che si trova accanto all\'ulna. È il più laterale dei due ossa dell\'avambraccio e permette la rotazione dell\'avambraccio e della mano.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Quale osso si conosce come la "colonna vertebrale"?',
    options: ['Vertebre', 'Tibia', 'Sterno'],
    correctAnswer: 0,
    explanation: 'Le vertebre formano la colonna vertebrale, che è composta da 33 vertebre in totale. La colonna vertebrale protegge il midollo spinale e fornisce supporto strutturale al corpo.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Quale osso protegge il cuore e i polmoni?',
    options: ['Sterno', 'Mascella', 'Sacro'],
    correctAnswer: 0,
    explanation: 'Lo sterno (insieme alle costole) protegge il cuore e i polmoni. È un osso piatto a forma di T che si trova nella parte frontale del torace.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Quanti ossa formano la gabbia toracica?',
    options: ['12 paia di costole', '10 paia di costole', '14 paia di costole'],
    correctAnswer: 0,
    explanation: 'La gabbia toracica è formata da 12 paia di costole (24 costole in totale), lo sterno e le vertebre toraciche. Protegge gli organi vitali del torace come il cuore e i polmoni.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz sulle ossa del corpo umano',
  description: 'Impara sull\'anatomia ossea del corpo umano. Scopri quanti ossa abbiamo, quali sono i più lunghi e piccoli, e le loro funzioni principali.',
  url: '/it/trivias/quiz-ossa-corpo-umano',
  category: 'Quiz Educativi'
})

export default function QuizOssaCorpoUmanoClientIT() {
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
    if (points >= 8) return { rank: 'Esperto di Anatomia', emoji: '🦴' }
    if (points >= 5) return { rank: 'Conoscitore dello Scheletro', emoji: '💀' }
    return { rank: 'Necessita Più Studio', emoji: '🧬' }
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
    
    const shareText = `Ho appena completato il "Quiz sulle ossa del corpo umano"! 🦴\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nConosci l'anatomia dello scheletro umano? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz sulle ossa del corpo umano',
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
        title="Quiz sulle ossa del corpo umano"
        description="Impara sull\'anatomia ossea del corpo umano. Scopri quanti ossa abbiamo, quali sono i più lunghi e piccoli, e le loro funzioni principali."
        introduction="Benvenuto al Quiz sulle ossa del corpo umano! Ti faremo domande sull\'anatomia ossea e lo scheletro umano. Imparerai su quanti ossa abbiamo, quali sono i più lunghi e piccoli, dove si trovano gli ossa principali e le loro funzioni. Scopri quanto bene conosci il tuo stesso scheletro!"
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
        currentTriviaPath="/it/trivias/quiz-ossa-corpo-umano/"
        relatedCalculator="/it/salute/imc"
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
