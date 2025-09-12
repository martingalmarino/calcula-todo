"use client"

import { useState, useCallback, useMemo } from 'react'
import { QuizLayout } from '@/components/QuizLayout'
import { Ruler } from 'lucide-react'

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
    question: "Quanti centimetri ha un metro?",
    options: ["10", "100", "1000"],
    correctAnswer: 1,
    explanation: "Un metro ha 100 centimetri. Questa è una conversione base del Sistema Internazionale di Unità (SI)."
  },
  {
    id: 2,
    question: "Qual è l'unità base di massa nel Sistema Internazionale?",
    options: ["Grammo", "Chilogrammo", "Libbra"],
    correctAnswer: 1,
    explanation: "Il chilogrammo (kg) è l'unità base di massa nel Sistema Internazionale di Unità (SI)."
  },
  {
    id: 3,
    question: "Quanti millilitri ci sono in un litro?",
    options: ["10", "100", "1000"],
    correctAnswer: 2,
    explanation: "Un litro contiene 1000 millilitri. Il litro è un'unità di volume del Sistema Internazionale."
  },
  {
    id: 4,
    question: "Cosa misura un termometro?",
    options: ["Pressione", "Temperatura", "Velocità"],
    correctAnswer: 1,
    explanation: "Un termometro misura la temperatura. L'unità base di temperatura nel SI è il kelvin (K)."
  },
  {
    id: 5,
    question: "Quale strumento misura la pressione atmosferica?",
    options: ["Barometro", "Micrometro", "Telescopio"],
    correctAnswer: 0,
    explanation: "Un barometro misura la pressione atmosferica. L'unità di pressione nel SI è il pascal (Pa)."
  },
  {
    id: 6,
    question: "A quanto equivale 1 tonnellata?",
    options: ["100 kg", "1000 kg", "10.000 kg"],
    correctAnswer: 1,
    explanation: "Una tonnellata equivale a 1000 chilogrammi. È un'unità di massa multipla del chilogrammo."
  },
  {
    id: 7,
    question: "Cosa misura un amperometro?",
    options: ["Corrente elettrica", "Resistenza", "Voltaggio"],
    correctAnswer: 0,
    explanation: "Un amperometro misura la corrente elettrica. L'unità di corrente nel SI è l'ampere (A)."
  },
  {
    id: 8,
    question: "Qual è l'unità di energia nel SI?",
    options: ["Joule", "Watt", "Newton"],
    correctAnswer: 0,
    explanation: "Il joule (J) è l'unità di energia nel Sistema Internazionale. Un joule equivale a un newton per metro."
  },
  {
    id: 9,
    question: "Cosa misura un anemometro?",
    options: ["Velocità del vento", "Intensità della luce", "Umidità"],
    correctAnswer: 0,
    explanation: "Un anemometro misura la velocità del vento. Si esprime comunemente in metri al secondo (m/s) o chilometri all'ora (km/h)."
  },
  {
    id: 10,
    question: "Cosa misura la scala Richter?",
    options: ["Intensità dei terremoti", "Forza del vento", "Radiazione solare"],
    correctAnswer: 0,
    explanation: "La scala Richter misura la magnitudine dei terremoti. È una scala logaritmica che va da 0 a 10."
  }
]

export default function QuizUnitaMisuraClientIT() {
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
        rank: "Esperto in Unità di Misura 📏",
        message: "Eccellente! Padroneggi perfettamente il Sistema Internazionale di Unità e gli strumenti di misurazione.",
        color: "text-green-600"
      }
    } else if (percentage >= 60) {
      return {
        rank: "Conoscitore di Misure 📐",
        message: "Molto bene! Hai una buona conoscenza delle unità di misura e degli strumenti scientifici.",
        color: "text-blue-600"
      }
    } else {
      return {
        rank: "Apprendista di Misure 📊",
        message: "Continua a studiare! Le unità di misura sono fondamentali nella scienza e nella vita quotidiana.",
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
    const message = `📏 Ho appena completato il Quiz sulle Unità di Misura e ho ottenuto ${score}/${totalQuestions} punti. ${rankInfo.rank}\n\nMetti alla prova le tue conoscenze sul Sistema Internazionale di Unità! 🚀`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz sulle Unità di Misura',
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

  const introduction = "Impara sul Sistema Internazionale di Unità e gli strumenti di misurazione. Questo quiz ti permetterà di conoscere le unità base di lunghezza, massa, volume, temperatura e altro, così come gli strumenti scientifici che le misurano."

  const quizResult = gameState === 'finished' ? {
    points: score,
    rank: rankInfo.rank,
    emoji: score >= totalQuestions * 0.8 ? "📏" : score >= totalQuestions * 0.6 ? "📐" : "📊"
  } : null

  return (
    <QuizLayout
      title="Quiz sulle unità di misura"
      description="Impara sul Sistema Internazionale di Unità e gli strumenti di misurazione. Scopri le unità base di lunghezza, massa, volume e altro."
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
      currentTriviaPath="/it/trivias/quiz-unita-misura"
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
