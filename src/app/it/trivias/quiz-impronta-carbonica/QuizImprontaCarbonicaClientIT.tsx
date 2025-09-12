"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayoutIT } from '@/components/QuizLayoutIT'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { Share2, Check, Leaf, Car, Plane, TreePine } from 'lucide-react'

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
    question: 'Quale trasporto emette più CO₂ per passeggero-km?',
    options: ['Aereo', 'Treno', 'Bicicletta'],
    correctAnswer: 0,
    explanation: 'L\'aereo emette approssimativamente 285g CO₂/km per passeggero, mentre il treno emette solo 14g CO₂/km. La bicicletta non emette CO₂ diretto.',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Quale dieta solitamente genera minore impronta di carbonio?',
    options: ['Vegetariana', 'Onnivora alta in carne', 'Ricca in carne rossa'],
    correctAnswer: 0,
    explanation: 'La dieta vegetariana genera approssimativamente 1,7 tonnellate di CO₂ annuali, mentre una dieta ricca in carne può generare fino a 3,3 tonnellate.',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Vero/Falso: Viaggiare in auto condivisa inquina meno che andare da soli.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. Condividere l\'auto riduce le emissioni per passeggero, poiché si divide l\'impatto ambientale tra più persone.',
    type: 'truefalse'
  },
  {
    id: 4,
    question: 'Quale attività emette più CO₂?',
    options: ['Volo di 1000 km', 'Viaggio in treno di 1000 km', 'Camminare 1000 km'],
    correctAnswer: 0,
    explanation: 'Un volo di 1000 km emette approssimativamente 285kg di CO₂ per passeggero, mentre il treno emette solo 14kg. Camminare non emette CO₂.',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Vero/Falso: La produzione di carne bovina genera più emissioni di quella di pollo.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. La carne bovina genera 27kg CO₂ per kg, mentre il pollo genera solo 6,9kg CO₂ per kg a causa della minore durata del ciclo di vita.',
    type: 'truefalse'
  },
  {
    id: 6,
    question: 'Quale elettrodomestico solitamente genera più impronta indiretta per uso?',
    options: ['Lavatrice', 'Aria condizionata', 'Microonde'],
    correctAnswer: 1,
    explanation: 'L\'aria condizionata consuma molta energia elettrica, specialmente in estate. Un AC da 3,5kW può consumare 2,5-3,5kWh per ora di uso.',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Vero/Falso: Comprare vestiti di seconda mano riduce l\'impronta di carbonio.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. L\'industria tessile genera il 10% delle emissioni globali. Comprare vestiti usati evita la produzione di nuovi capi e le loro emissioni associate.',
    type: 'truefalse'
  },
  {
    id: 8,
    question: 'Quale abitudine aiuta a ridurre l\'impronta personale?',
    options: ['Usare trasporto pubblico', 'Comprare più plastica', 'Lasciare luci accese'],
    correctAnswer: 0,
    explanation: 'Il trasporto pubblico emette meno CO₂ per passeggero rispetto ai veicoli privati. Un autobus può trasportare 40-50 persone con minore impatto ambientale.',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Quale di questi alimenti ha minore impronta di carbonio?',
    options: ['Carne bovina', 'Lenticchie', 'Formaggio'],
    correctAnswer: 1,
    explanation: 'Le lenticchie generano solo 0,9kg CO₂ per kg, mentre la carne bovina genera 27kg e il formaggio 13,5kg CO₂ per kg.',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Vero/Falso: Riciclare e riutilizzare plastica aiuta a diminuire le emissioni globali.',
    options: ['Vero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Vero. Riciclare plastica riduce la necessità di produrre plastica nuova, che richiede petrolio e genera emissioni significative nella sua fabbricazione.',
    type: 'truefalse'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Quiz di Impronta di Carbonio',
  description: 'Scopri come le tue azioni quotidiane impattano l\'ambiente. Impara sulle emissioni di CO₂, trasporto sostenibile e abitudini eco-friendly.',
  url: '/it/trivias/quiz-impronta-carbonica',
  category: 'Quiz Educativi'
})

export default function QuizImprontaCarbonicaClientIT() {
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
    if (points >= 8) return { rank: 'Eco-Champion', emoji: '🌍' }
    if (points >= 5) return { rank: 'Consapevole Ambientale', emoji: '🌱' }
    return { rank: 'Necessita Più Consapevolezza', emoji: '🏭' }
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
    
    const shareText = `Ho appena completato il "Quiz di Impronta di Carbonio"! 🌍\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nConosci l'impatto ambientale delle tue azioni? Scoprilo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz di Impronta di Carbonio',
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
        title="Quiz di Impronta di Carbonio"
        description="Scopri come le tue azioni quotidiane impattano l\'ambiente. Impara sulle emissioni di CO₂, trasporto sostenibile e abitudini eco-friendly."
        introduction="Benvenuto al Quiz di Impronta di Carbonio! Ti faremo domande sull'impatto ambientale di diverse attività e abitudini. Imparerai sulle emissioni di CO₂, trasporto sostenibile, diete eco-friendly, e come ridurre la tua impronta di carbonio personale. Scopri quanto sei consapevole dell'ambiente!"
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
        currentTriviaPath="/it/trivias/quiz-impronta-carbonica/"
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
