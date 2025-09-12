"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayoutIT } from '@/components/QuizLayoutIT'
import { Sun } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple' | 'truefalse'
}

const questions: Question[] = [
  {
    id: 1,
    question: "Che tipo di stella è il Sole?",
    options: ["Gigante rossa", "Nana gialla", "Supernova"],
    correctAnswer: 1,
    explanation: "Il Sole è una stella nana gialla di tipo G2V. È una stella della sequenza principale che converte idrogeno in elio attraverso la fusione nucleare.",
    type: 'multiple'
  },
  {
    id: 2,
    question: "Qual è la temperatura approssimativa della superficie del Sole?",
    options: ["1500 °C", "5500 °C", "10.000 °C"],
    correctAnswer: 1,
    explanation: "La temperatura della superficie del Sole (fotosfera) è di circa 5500 °C. Il nucleo solare raggiunge temperature molto più elevate, intorno ai 15 milioni di gradi.",
    type: 'multiple'
  },
  {
    id: 3,
    question: "Quanto tempo impiega la luce del Sole per raggiungere la Terra?",
    options: ["1 minuto", "8 minuti", "1 ora"],
    correctAnswer: 1,
    explanation: "La luce del Sole impiega circa 8 minuti e 20 secondi per raggiungere la Terra, viaggiando alla velocità della luce (300.000 km/s).",
    type: 'multiple'
  },
  {
    id: 4,
    question: "Vero/Falso: Il Sole ruota sul proprio asse.",
    options: ["Vero", "Falso"],
    correctAnswer: 0,
    explanation: "Vero. Il Sole ruota sul proprio asse, ma non come un corpo solido. L'equatore solare ruota più velocemente (25 giorni) rispetto ai poli (35 giorni).",
    type: 'truefalse'
  },
  {
    id: 5,
    question: "Qual è l'elemento più abbondante nel Sole?",
    options: ["Ossigeno", "Idrogeno", "Elio"],
    correctAnswer: 1,
    explanation: "L'idrogeno è l'elemento più abbondante nel Sole, rappresentando circa il 73% della sua massa. L'elio costituisce circa il 25%.",
    type: 'multiple'
  },
  {
    id: 6,
    question: "Quale fenomeno solare influenza le telecomunicazioni sulla Terra?",
    options: ["Pioggia di meteoriti", "Tempeste solari", "Eclissi"],
    correctAnswer: 1,
    explanation: "Le tempeste solari, specialmente le espulsioni di massa coronale, possono influenzare le telecomunicazioni, i sistemi GPS e le reti elettriche sulla Terra.",
    type: 'multiple'
  },
  {
    id: 7,
    question: "Che frazione della massa totale del sistema solare rappresenta il Sole?",
    options: ["50%", "99%", "75%"],
    correctAnswer: 1,
    explanation: "Il Sole rappresenta circa il 99,86% della massa totale del sistema solare. Tutti i pianeti, asteroidi e comete insieme rappresentano solo il rimanente 0,14%.",
    type: 'multiple'
  },
  {
    id: 8,
    question: "Qual è il ciclo di attività solare approssimativo?",
    options: ["3 anni", "11 anni", "20 anni"],
    correctAnswer: 1,
    explanation: "Il ciclo solare ha una durata media di 11 anni, durante il quale l'attività solare (macchie solari, brillamenti) aumenta e diminuisce ciclicamente.",
    type: 'multiple'
  },
  {
    id: 9,
    question: "Vero/Falso: Il Sole si spegnerà tra pochi milioni di anni.",
    options: ["Vero", "Falso"],
    correctAnswer: 1,
    explanation: "Falso. Il Sole ha circa 4,6 miliardi di anni e si stima che abbia altri 5 miliardi di anni prima di diventare una gigante rossa.",
    type: 'truefalse'
  },
  {
    id: 10,
    question: "Che energia produce il Sole attraverso la fusione nucleare?",
    options: ["Energia chimica", "Energia termica e luminosa", "Energia elettrica"],
    correctAnswer: 1,
    explanation: "Il Sole produce principalmente energia termica e luminosa attraverso la fusione nucleare dell'idrogeno in elio. Questa energia viene irradiata nello spazio sotto forma di luce e calore.",
    type: 'multiple'
  }
]

export default function QuizSulSoleClientIT() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minuti
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const getRankInfo = useCallback((points: number) => {
    const percentage = (points / totalQuestions) * 100
    
    if (percentage >= 80) {
      return {
        rank: "Astrofisico Solare ☀️",
        message: "Incredibile! Padroneggi perfettamente i segreti del Sole e la fisica solare. Sei un vero esperto di astronomia.",
        color: "text-yellow-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "Osservatore del Sole 🌞",
        message: "Molto bene! Hai una buona conoscenza della nostra stella e dei suoi fenomeni. Continua a esplorare il cosmo.",
        color: "text-orange-600"
      }
    } else {
      return {
        rank: "Apprendista Solare 🌅",
        message: "Continua a studiare! Il Sole è affascinante e c'è molto di più da scoprire sulla nostra stella più vicina.",
        color: "text-red-600"
      }
    }
  }, [totalQuestions])

  const checkAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null || showFeedback) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setGameState('finished')
      }
    }, 2000)
  }, [selectedAnswer, showFeedback, currentQuestion.correctAnswer, currentQuestion.id, currentQuestionIndex, totalQuestions])

  const startQuiz = useCallback(() => {
    setGameState('playing')
  }, [])

  const resetGame = useCallback(() => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(300)
    setGameState('intro')
    setSelectedAnswer(null)
    setShowFeedback(false)
  }, [])

  const shareResult = useCallback(async () => {
    const rankInfo = getRankInfo(score)
    const message = `☀️ Ho appena completato il Quiz sul Sole e ho ottenuto ${score}/${totalQuestions} punti. ${rankInfo.rank}\n\nScopri i segreti della nostra stella più vicina! 🌟`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz sul Sole',
          text: message,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${message}\n${window.location.href}`)
        alert('Risultato copiato negli appunti!')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }, [score, totalQuestions, getRankInfo])

  const rankInfo = useMemo(() => getRankInfo(score), [score, getRankInfo])

  const introduction = "Scopri i segreti della nostra stella più vicina. Questo quiz ti permetterà di imparare sulla composizione, temperatura, attività solare, fusione nucleare e i fenomeni che influenzano la Terra dal Sole."

  const quizResult = gameState === 'finished' ? {
    points: score,
    rank: rankInfo.rank,
    emoji: score >= totalQuestions * 0.8 ? "☀️" : score >= totalQuestions * 0.6 ? "🌞" : "🌅"
  } : null

  return (
                  <QuizLayoutIT
      title="Quiz sul Sole"
      description="Scopri i segreti della nostra stella più vicina. Impara sulla composizione, temperatura, attività solare e fenomeni che influenzano la Terra."
      introduction={introduction}
      onStart={startQuiz}
      onReset={resetGame}
      isActive={gameState === 'playing'}
      timeLeft={timeLeft}
      score={score}
      feedback={null}
      quizResult={quizResult}
      showIntroduction={gameState === 'intro'}
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={totalQuestions}
      currentTriviaPath="/it/trivias/quiz-sul-sole"
      relatedCalculator="/it/salute/imc"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:bg-blue-50"
            
            if (selectedAnswer !== null) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += " bg-green-600 hover:bg-green-700 text-white border-green-600"
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += " bg-red-600 hover:bg-red-700 text-white border-red-600"
              } else {
                buttonClass += " bg-gray-100 text-gray-500 border-gray-300"
              }
            } else {
              buttonClass += " border-gray-300 hover:border-blue-400"
            }

            return (
              <button
                key={index}
                onClick={() => checkAnswer(index)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                {currentQuestion.type === 'truefalse' ? (
                  <span className="font-medium">{option}</span>
                ) : (
                  <>
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </>
                )}
              </button>
            )
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✗</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Spiegazione:</strong> {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
                  </QuizLayoutIT>
  )
}
