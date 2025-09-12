"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
import { Share2, Check, Lightbulb, Zap, Battery, Power } from 'lucide-react'

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
    question: 'Cosa consuma più energia in media?',
    options: ['Un condizionatore d\'aria', 'Un computer portatile', 'Una TV LED'],
    correctAnswer: 0,
    explanation: 'Un condizionatore d\'aria consuma tra 1.5-3.5kW per ora, mentre un laptop consuma 15-60W e una TV LED 30-100W. L\'AC è il maggior consumatore.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Una lampadina incandescente da 100W consuma... rispetto a un LED da 10W:',
    options: ['Lo stesso', '10 volte di più', '5 volte di meno'],
    correctAnswer: 1,
    explanation: 'Una lampadina incandescente da 100W consuma esattamente 10 volte più energia di un LED da 10W. I LED sono molto più efficienti energeticamente.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Vero/Falso: Un caricabatterie del cellulare collegato senza usarlo continua a consumare energia.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. I caricabatterie collegati senza usare consumano "energia fantasma" o "vampiro", anche se in piccola quantità (1-5W), si somma nel tempo.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: 'Quale elettrodomestico consuma di più in una casa tipica?',
    options: ['Frigorifero', 'Microonde', 'Ferro da stiro'],
    correctAnswer: 0,
    explanation: 'Il frigorifero consuma di più perché funziona 24/7 (150-300W), mentre il microonde (800-1200W) e il ferro da stiro (1000-1800W) si usano occasionalmente.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Cosa consuma più energia?',
    options: ['Asciugatrice', 'Ventilatore da soffitto', 'Radio'],
    correctAnswer: 0,
    explanation: 'L\'asciugatrice consuma 2000-4000W, mentre un ventilatore da soffitto consuma 15-75W e una radio 1-10W. L\'asciugatrice è il maggior consumatore.',
    type: 'multiple'
  },
  {
    id: 6,
    question: 'Quale è più efficiente?',
    options: ['Lavare i vestiti con acqua calda', 'Lavare i vestiti con acqua fredda', 'Non c\'è differenza'],
    correctAnswer: 1,
    explanation: 'Lavare con acqua fredda è più efficiente perché non richiede di riscaldare l\'acqua. Riscaldare l\'acqua consuma molta energia (il 90% del consumo di una lavatrice).',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Vero/Falso: Spegnere luci non necessarie aiuta a ridurre il consumo elettrico.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. Spegnere luci non necessarie riduce direttamente il consumo elettrico. Ogni lampadina accesa consuma energia costantemente.',
    type: 'truefalse'
  },
  {
    id: 8,
    question: 'Cosa consuma più energia in 1 ora di uso?',
    options: ['Computer portatile', 'Condizionatore d\'aria', 'Console di videogiochi'],
    correctAnswer: 1,
    explanation: 'In 1 ora: AC consuma 1.5-3.5kWh, console 100-200Wh, laptop 15-60Wh. Il condizionatore d\'aria è il maggior consumatore per ora.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Quale elettrodomestico è più efficiente?',
    options: ['Frigorifero classe A', 'Frigorifero classe C', 'Frigorifero senza etichetta'],
    correctAnswer: 0,
    explanation: 'I frigoriferi classe A sono i più efficienti energeticamente. La classificazione va da A (più efficiente) a G (meno efficiente).',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Vero/Falso: Scollegare apparecchi che non si usano può risparmiare energia in casa.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. Scollegare apparecchi elimina il consumo "vampiro" o "fantasma" che può sommare fino al 10% della bolletta elettrica mensile.',
    type: 'truefalse'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Gioco di Consumo Elettrico',
  description: 'Impara sull\'efficienza energetica e il consumo elettrico in casa. Scopri quali elettrodomestici consumano più energia e come risparmiare sulla bolletta.',
  url: '/it/trivias/gioco-consumo-elettrico',
  category: 'Trivie Educative'
})

export default function GiocoConsumoElettricoClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[11].timeLimit)
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
    if (points >= 8) return { rank: 'Esperto in Efficienza', emoji: '⚡' }
    if (points >= 5) return { rank: 'Consapevole Energetico', emoji: '💡' }
    return { rank: 'Necessita Risparmiare Di Più', emoji: '🔌' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[11].timeLimit)
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
    setTimeLeft(triviasConfigIT[11].timeLimit)
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
    
    const shareText = `Ho appena completato il "Gioco di Consumo Elettrico"! ⚡\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai come risparmiare energia in casa? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Gioco di Consumo Elettrico',
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
        title="Gioco di Consumo Elettrico"
        description="Impara sull'efficienza energetica e il consumo elettrico in casa. Scopri quali elettrodomestici consumano più energia e come risparmiare sulla bolletta."
        introduction="Benvenuto al Gioco di Consumo Elettrico! Ti faremo domande sull'efficienza energetica e il consumo elettrico in casa. Imparerai su quali elettrodomestici consumano più energia, come risparmiare sulla bolletta della luce, e le migliori pratiche per essere più efficienti energeticamente. Scopri se conosci i segreti del risparmio energetico!"
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
        currentTriviaPath="/it/trivias/gioco-consumo-elettrico/"
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
