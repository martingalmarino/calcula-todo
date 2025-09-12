"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
import { Share2, Check, Apple, Utensils, Zap } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  comparison?: string
  type: 'multiple' | 'battle'
  battleItems?: { name: string; calories: number; emoji: string }[]
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Una mela media (150 g) ha:',
    options: ['52 kcal', '95 kcal', '150 kcal'],
    correctAnswer: 1,
    explanation: 'Una mela media ha approssimativamente 95 kcal. È un\'eccellente opzione per uno snack salutare.',
    comparison: 'Equivale a camminare 20 minuti a passo moderato',
    type: 'multiple'
  },
  {
    id: 2,
    question: 'Una lattina di bibita gassata (330 ml) contiene:',
    options: ['90 kcal', '140 kcal', '200 kcal'],
    correctAnswer: 1,
    explanation: 'Una lattina di bibita gassata ha 140 kcal, principalmente da zucchero. È come mangiare 7 cucchiaini di zucchero!',
    comparison: 'Equivale a correre 15 minuti a ritmo moderato',
    type: 'multiple'
  },
  {
    id: 3,
    question: 'Una porzione di pizza margherita (120 g) apporta:',
    options: ['180 kcal', '285 kcal', '350 kcal'],
    correctAnswer: 1,
    explanation: 'Una porzione di pizza margherita ha 285 kcal. L\'impasto e il formaggio sono i principali contributori.',
    comparison: 'Equivale a 45 minuti di yoga',
    type: 'multiple'
  },
  {
    id: 4,
    question: 'Una banana media (118 g) ha:',
    options: ['105 kcal', '150 kcal', '200 kcal'],
    correctAnswer: 0,
    explanation: 'Una banana media ha 105 kcal. È ricca di potassio e perfetta prima dell\'esercizio.',
    comparison: 'Equivale a 15 minuti di ciclismo',
    type: 'multiple'
  },
  {
    id: 5,
    question: 'Un hamburger semplice di fast food (100 g) apporta:',
    options: ['250 kcal', '295 kcal', '400 kcal'],
    correctAnswer: 1,
    explanation: 'Un hamburger semplice ha 295 kcal. Senza contare le patatine fritte e la bevanda.',
    comparison: 'Equivale a 30 minuti di nuoto',
    type: 'multiple'
  },
  {
    id: 6,
    question: '100 g di riso bianco cotto equivalgono a:',
    options: ['90 kcal', '130 kcal', '190 kcal'],
    correctAnswer: 1,
    explanation: '100g di riso bianco cotto hanno 130 kcal. È una buona fonte di carboidrati.',
    comparison: 'Equivale a 20 minuti di camminata veloce',
    type: 'multiple'
  },
  {
    id: 7,
    question: 'Un bicchiere di birra (330 ml) apporta:',
    options: ['150 kcal', '220 kcal', '300 kcal'],
    correctAnswer: 0,
    explanation: 'Un bicchiere di birra ha 150 kcal. L\'alcol apporta 7 kcal per grammo.',
    comparison: 'Equivale a 25 minuti di ballo',
    type: 'multiple'
  },
  {
    id: 8,
    question: 'Una porzione di patatine fritte (100 g) contiene:',
    options: ['250 kcal', '312 kcal', '400 kcal'],
    correctAnswer: 1,
    explanation: '100g di patatine fritte hanno 312 kcal. L\'olio di frittura aumenta significativamente le calorie.',
    comparison: 'Equivale a 40 minuti di camminata',
    type: 'multiple'
  },
  {
    id: 9,
    question: 'Una fetta di pane in cassetta (25 g) ha:',
    options: ['40 kcal', '80 kcal', '120 kcal'],
    correctAnswer: 0,
    explanation: 'Una fetta di pane in cassetta ha 40 kcal. È una base perfetta per colazioni salutari.',
    comparison: 'Equivale a 8 minuti di camminata',
    type: 'multiple'
  },
  {
    id: 10,
    question: 'Cosa fa ingrassare di più?',
    options: ['1 hamburger semplice', '2 empanadas', '1 porzione di pizza'],
    correctAnswer: 2,
    explanation: 'Una porzione di pizza (285 kcal) ha più calorie di 1 hamburger semplice (295 kcal) o 2 empanadas (280 kcal).',
    comparison: 'La pizza equivale a 45 minuti di yoga',
    type: 'battle',
    battleItems: [
      { name: 'Hamburger Semplice', calories: 295, emoji: '🍔' },
      { name: '2 Empanadas', calories: 280, emoji: '🥟' },
      { name: 'Porzione Pizza', calories: 285, emoji: '🍕' }
    ]
  }
]

const structuredData = jsonLdCalculator({
  name: 'Trivia di Nutrizione Básica',
  description: 'Indovina le calorie di diversi alimenti e impara sulla nutrizione. Include confronti visivi e modalità battaglia.',
  url: '/it/trivias/nutrizione-calorie',
  category: 'Trivie Educative'
})

export default function NutrizioneCalorieClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[2].timeLimit)
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
    if (points >= 8) return { rank: 'Nutrizionista Pro', emoji: '🥑' }
    if (points >= 5) return { rank: 'Esperto', emoji: '🥦' }
    return { rank: 'Principiante', emoji: '🍎' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[2].timeLimit)
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
    setTimeLeft(triviasConfigIT[2].timeLimit)
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
      }, 3000) // 3 secondi per leggere la spiegazione e confronto
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `Ho appena completato la Trivia di Nutrizione Básica! 🍎\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai quante calorie hanno i tuoi alimenti preferiti? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Trivia di Nutrizione Básica',
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
        title="Trivia di Nutrizione Básica"
        description="Indovina le calorie di diversi alimenti e impara sulla nutrizione. Include confronti visivi e modalità battaglia."
        introduction="Benvenuto alla Trivia di Nutrizione Básica! Ti presenteremo domande sulle calorie di diversi alimenti. Ogni risposta include una spiegazione e un confronto visivo per imparare in modo divertente. Alcune domande sono in modalità 'battaglia' dove dovrai scegliere tra opzioni. Dimostra le tue conoscenze nutrizionali!"
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
        currentTriviaPath="/it/trivias/nutrizione-calorie/"
        relatedCalculator="/it/salute/calorie"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Question */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.question}
              </h2>
              
              {/* Battle Mode Visual */}
              {currentQuestion.type === 'battle' && currentQuestion.battleItems && (
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                  {currentQuestion.battleItems.map((item, index) => (
                    <Card key={index} className={`p-4 text-center transition-all duration-200 ${
                      selectedAnswer === index 
                        ? feedback === 'correct' 
                          ? 'bg-green-100 border-green-300' 
                          : 'bg-red-100 border-red-300'
                        : 'hover:bg-blue-50'
                    }`}>
                      <CardContent className="p-0">
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <div className="font-semibold text-sm mb-1">{item.name}</div>
                        <div className="text-xs text-gray-600">{item.calories} kcal</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Feedback and Explanation */}
              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <p className="font-semibold text-sm mb-2">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.comparison && (
                    <div className="flex items-center justify-center text-sm">
                      <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                      <span className="italic">{currentQuestion.comparison}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'battle' ? (
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {currentQuestion.battleItems?.map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => checkAnswer(index)}
                      variant={selectedAnswer === index ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                      size="lg"
                      className={`py-4 transition-all duration-200 ${
                        selectedAnswer === index
                          ? feedback === 'correct' 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'
                          : 'hover:bg-blue-50'
                      }`}
                      disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{item.emoji}</div>
                        <div className="text-xs">{item.name}</div>
                      </div>
                    </Button>
                  ))}
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