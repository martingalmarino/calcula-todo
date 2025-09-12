"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { getRelatedTriviasIT } from '@/lib/trivias-config-it'
import { Microscope } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Chi ha proposto la teoria della relatività?",
    options: ["Newton", "Einstein", "Galileo"],
    correctAnswer: 1,
    explanation: "Albert Einstein ha proposto la teoria della relatività speciale nel 1905 e la teoria della relatività generale nel 1915, rivoluzionando la nostra comprensione dello spazio, tempo e gravità."
  },
  {
    id: 2,
    question: "Chi è considerato il padre della fisica moderna?",
    options: ["Galileo Galilei", "Newton", "Maxwell"],
    correctAnswer: 0,
    explanation: "Galileo Galilei è considerato il padre della fisica moderna per i suoi contributi fondamentali al metodo scientifico e le sue osservazioni astronomiche con il telescopio."
  },
  {
    id: 3,
    question: "Chi ha scoperto la penicillina?",
    options: ["Fleming", "Pasteur", "Koch"],
    correctAnswer: 0,
    explanation: "Alexander Fleming ha scoperto la penicillina nel 1928, il primo antibiotico che ha rivoluzionato la medicina e salvato milioni di vite."
  },
  {
    id: 4,
    question: "Chi ha formulato la legge della gravitazione universale?",
    options: ["Newton", "Einstein", "Copernico"],
    correctAnswer: 0,
    explanation: "Isaac Newton ha formulato la legge della gravitazione universale nel 1687, spiegando come gli oggetti si attraggono tra loro in funzione della loro massa e distanza."
  },
  {
    id: 5,
    question: "Chi è conosciuto come il padre della genetica?",
    options: ["Mendel", "Darwin", "Watson"],
    correctAnswer: 0,
    explanation: "Gregor Mendel è conosciuto come il padre della genetica per i suoi esperimenti con i piselli che hanno stabilito le leggi fondamentali dell'ereditarietà."
  },
  {
    id: 6,
    question: "Chi è stata la prima donna a vincere un Premio Nobel?",
    options: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace"],
    correctAnswer: 1,
    explanation: "Marie Curie è stata la prima donna a vincere un Premio Nobel (Fisica nel 1903) e la prima persona a vincere due Premi Nobel in discipline diverse."
  },
  {
    id: 7,
    question: "Chi ha proposto la teoria dell'evoluzione per selezione naturale?",
    options: ["Darwin", "Lamarck", "Wallace"],
    correctAnswer: 0,
    explanation: "Charles Darwin ha proposto la teoria dell'evoluzione per selezione naturale ne 'L'origine delle specie' (1859), rivoluzionando la biologia."
  },
  {
    id: 8,
    question: "Chi ha sviluppato la tavola periodica?",
    options: ["Mendeleev", "Lavoisier", "Dalton"],
    correctAnswer: 0,
    explanation: "Dmitri Mendeleev ha sviluppato la tavola periodica degli elementi nel 1869, organizzando gli elementi chimici secondo le loro proprietà atomiche."
  },
  {
    id: 9,
    question: "Chi è stato il primo a usare un telescopio per studiare il cielo?",
    options: ["Galileo", "Copernico", "Kepler"],
    correctAnswer: 0,
    explanation: "Galileo Galilei è stato il primo a usare un telescopio per osservazioni astronomiche sistematiche, scoprendo le lune di Giove e le fasi di Venere."
  },
  {
    id: 10,
    question: "Chi ha decifrato la struttura del DNA nel 1953?",
    options: ["Watson e Crick", "Mendel", "Pasteur"],
    correctAnswer: 0,
    explanation: "James Watson e Francis Crick hanno decifrato la struttura a doppia elica del DNA nel 1953, una delle scoperte più importanti della biologia molecolare."
  }
]

export default function QuizGrandiScienziatiClientIT() {
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
        rank: "Esperto in Storia Scientifica 🧪",
        message: "Incredibile! Conosci molto bene i grandi scienziati della storia.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "Conoscitore di Scienza 📚",
        message: "Molto bene! Hai una buona conoscenza sui scienziati più importanti.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "Apprendista di Scienza 🔬",
        message: "Continua a studiare! La storia della scienza è affascinante e c'è molto da scoprire.",
        color: "text-orange-600"
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
    const message = `🧪 Ho appena completato il Quiz di Grandi Scienziati e ho ottenuto ${score}/${totalQuestions} punti. ${rankInfo.rank}\n\nMetti alla prova le tue conoscenze sulla storia della scienza! 🚀`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz di Grandi Scienziati',
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

  const introduction = "Scopri gli scienziati più importanti della storia e i loro contributi che hanno cambiato il mondo della scienza. Questo quiz ti permetterà di imparare sulle scoperte e teorie che hanno cambiato la nostra comprensione dell'universo."

  const quizResult = gameState === 'finished' ? {
    points: score,
    rank: rankInfo.rank,
    emoji: score >= totalQuestions * 0.8 ? "🧪" : score >= totalQuestions * 0.6 ? "📚" : "🔬"
  } : null

  return (
    <QuizLayout
      title="Quiz di grandi scienziati"
      description="Scopri gli scienziati più importanti della storia e i loro contributi che hanno cambiato il mondo della scienza."
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
      currentTriviaPath="/it/trivias/quiz-grandi-scienziati"
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
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
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
    </QuizLayout>
  )
}
