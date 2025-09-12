"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayoutIT } from '@/components/QuizLayoutIT'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { Share2, Check, Monitor, Clock, AlertTriangle } from 'lucide-react'

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
    question: 'Quante ore seduto al giorno aumentano il rischio di problemi di salute?',
    options: ['2 ore', '4 ore', '8 ore'],
    correctAnswer: 2,
    explanation: 'Stare seduto più di 8 ore al giorno aumenta significativamente il rischio di problemi di salute come diabete, malattie cardiovascolari e obesità.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Stare 8+ ore seduto si relaziona con maggiore rischio cardiovascolare.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Gli studi mostrano che stare seduto più di 8 ore al giorno aumenta il rischio di malattie cardiovascolari, anche nelle persone che fanno esercizio regolarmente.',
    type: 'truefalse'
  },
  {
    id: 3,
    question: 'Quale abitudine aiuta a ridurre i rischi della sedentarietà?',
    options: ['Fare pause in piedi', 'Bere più caffè', 'Dormire meno'],
    correctAnswer: 0,
    explanation: 'Fare pause regolari per alzarsi e muoversi aiuta a ridurre i rischi della sedentarietà. Anche 2-3 minuti di pausa ogni ora possono fare la differenza.',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Quanto tempo di pausa attiva si raccomanda per ogni ora seduto?',
    options: ['1 minuto', '5 minuti', '15 minuti'],
    correctAnswer: 1,
    explanation: 'Si raccomanda di fare pause attive di 5 minuti per ogni ora seduto. Questo può includere camminare, allungarsi, o fare esercizi semplici.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'L\'esercizio non contrasta gli effetti di stare molte ore seduto.',
    options: ['Vero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso: Anche se l\'esercizio regolare non elimina completamente i rischi della sedentarietà, aiuta significativamente a contrastare i suoi effetti negativi.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: 'Quale problema è associato alla sedentarietà?',
    options: ['Ipertensione', 'Miglioramento dell\'umore', 'Migliore visione notturna'],
    correctAnswer: 0,
    explanation: 'La sedentarietà è associata con ipertensione, diabete di tipo 2, obesità, malattie cardiovascolari e problemi muscoloscheletrici.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Quale attività è considerata sedentaria?',
    options: ['Leggere seduto', 'Camminare', 'Salire le scale'],
    correctAnswer: 0,
    explanation: 'Leggere seduto è un\'attività sedentaria. Camminare e salire le scale sono attività fisiche che aiutano a combattere la sedentarietà.',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Usare una postazione di lavoro in piedi può aiutare a ridurre la sedentarietà.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero: Le postazioni di lavoro in piedi possono aiutare a ridurre il tempo seduto, ma è importante alternare tra stare in piedi e seduto per evitare altri problemi.',
    type: 'truefalse'
  },
  {
    id: 9,
    question: 'Quale è un\'abitudine poco salutare?',
    options: ['Camminare dopo mangiato', 'Stare seduto 10 ore senza pausa', 'Fare pause ogni ora'],
    correctAnswer: 1,
    explanation: 'Stare seduto 10 ore senza pausa è un\'abitudine molto poco salutare che aumenta significativamente i rischi per la salute. È importante fare pause regolari.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'La sedentarietà si può combattere con:',
    options: ['Attività fisica regolare', 'Mangiare di più', 'Dormire meno'],
    correctAnswer: 0,
    explanation: 'L\'attività fisica regolare è il modo migliore per combattere la sedentarietà. Questo include esercizio strutturato e muoversi di più durante il giorno.',
    type: 'multiple'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quanto tempo passi seduto? (Sedentarietà)',
  description: 'Scopri i rischi della sedentarietà e impara come combattere gli effetti dello stare seduto troppo tempo. Conosci le raccomandazioni per uno stile di vita più attivo.',
  url: '/it/trivias/tempo-seduto-sedentarieta',
  category: 'Quiz Educativi'
})

export default function TempoSedutoSedentarietaClientIT() {
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
    if (points >= 8) return { rank: 'Anti-Sedentario', emoji: '🚶‍♂️' }
    if (points >= 5) return { rank: 'Consapevole del Movimento', emoji: '💺' }
    return { rank: 'Necessita Più Attività', emoji: '🪑' }
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
    
    const shareText = `Ho appena completato il quiz "Quanto tempo passi seduto? (Sedentarietà)"! 🪑\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nConosci i rischi della sedentarietà? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quanto tempo passi seduto? (Sedentarietà)',
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
        title="Quanto tempo passi seduto? (Sedentarietà)"
        description="Scopri i rischi della sedentarietà e impara come combattere gli effetti dello stare seduto troppo tempo. Conosci le raccomandazioni per uno stile di vita più attivo."
        introduction="Benvenuto al quiz sulla sedentarietà! Ti faremo domande sui rischi di stare seduto troppo tempo e come combattere la sedentarietà. Imparerai sulle ore raccomandate, i benefici delle pause attive, e strategie per rimanere più attivo durante il giorno. Scopri se conosci i pericoli della sedentarietà e come evitarli!"
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
        currentTriviaPath="/it/trivias/tempo-seduto-sedentarieta/"
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
                  </QuizLayoutIT>
    </>
  )
}
