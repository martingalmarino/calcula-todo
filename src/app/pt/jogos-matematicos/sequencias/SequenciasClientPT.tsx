"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface SequenceProblem {
  sequence: number[]
  correctAnswer: number
  options: number[]
  pattern: string
}

const structuredData = jsonLdCalculator({
  name: 'Sequências Numéricas',
  description: 'Jogo educativo para completar sequências numéricas e desenvolver pensamento lógico',
  url: '/pt/jogos-matematicos/sequencias',
  category: 'Jogos de Matemática'
})

export default function SequenciasClientPT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<SequenceProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  const generateProblem = useCallback((): SequenceProblem => {
    const patterns = [
      // Aritmética
      () => {
        const start = Math.floor(Math.random() * 10) + 1
        const diff = Math.floor(Math.random() * 5) + 1
        const sequence = [start, start + diff, start + 2 * diff, start + 3 * diff]
        return { sequence, answer: start + 4 * diff, pattern: 'Aritmética' }
      },
      // Geométrica
      () => {
        const start = Math.floor(Math.random() * 5) + 1
        const ratio = Math.floor(Math.random() * 3) + 2
        const sequence = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio]
        return { sequence, answer: start * ratio * ratio * ratio * ratio, pattern: 'Geométrica' }
      },
      // Quadrados
      () => {
        const start = Math.floor(Math.random() * 5) + 1
        const sequence = [start * start, (start + 1) * (start + 1), (start + 2) * (start + 2), (start + 3) * (start + 3)]
        return { sequence, answer: (start + 4) * (start + 4), pattern: 'Quadrados' }
      },
      // Fibonacci-like
      () => {
        const a = Math.floor(Math.random() * 5) + 1
        const b = Math.floor(Math.random() * 5) + 1
        const sequence = [a, b, a + b, a + 2 * b]
        return { sequence, answer: 2 * a + 3 * b, pattern: 'Fibonacci' }
      }
    ]
    
    const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
    const { sequence, answer, pattern } = selectedPattern()
    
    // Gerar opções erradas
    const options: number[] = []
    while (options.length < 3) {
      let deviation = Math.floor(Math.random() * 10) - 5
      if (deviation === 0) deviation = 1
      const wrongAnswer = Math.max(1, answer + deviation)
      if (!options.includes(wrongAnswer) && wrongAnswer !== answer) {
        options.push(wrongAnswer)
      }
    }
    
    options.push(answer)
    options.sort(() => Math.random() - 0.5)
    
    return { sequence, correctAnswer: answer, options, pattern }
  }, [])

  const startGame = useCallback(() => {
    setIsActive(true)
    setTimeLeft(30)
    setScore(0)
    setCurrentQuestion(1)
    setFeedback(null)
    setGameResult(null)
    setShowIntroduction(false)
    setCurrentProblem(generateProblem())
  }, [generateProblem])

  const resetGame = useCallback(() => {
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentQuestion(1)
    setFeedback(null)
    setGameResult(null)
    setShowIntroduction(true)
    setCurrentProblem(null)
    setSelectedAnswer(null)
  }, [])

  const checkAnswer = useCallback((answer: number) => {
    if (!currentProblem || !isActive) return
    
    setSelectedAnswer(answer)
    
    if (answer === currentProblem.correctAnswer) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions) {
        setCurrentQuestion(prev => prev + 1)
        setCurrentProblem(generateProblem())
        setFeedback(null)
        setSelectedAnswer(null)
      } else {
        // Game finished
        const finalScore = answer === currentProblem.correctAnswer ? score + 1 : score
        let rank: string, emoji: string
        
        if (finalScore >= 12) {
          rank = 'Gênio'
          emoji = '🤯'
        } else if (finalScore >= 8) {
          rank = 'Rápido'
          emoji = '⚡'
        } else {
          rank = 'Iniciante'
          emoji = '🌱'
        }
        
        setGameResult({ points: finalScore, rank, emoji })
        setIsActive(false)
      }
    }, 1000)
  }, [currentProblem, isActive, currentQuestion, totalQuestions, score, generateProblem])

  // Timer effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false)
          const finalScore = score
          let rank: string, emoji: string
          
          if (finalScore >= 12) {
            rank = 'Gênio'
            emoji = '🤯'
          } else if (finalScore >= 8) {
            rank = 'Rápido'
            emoji = '⚡'
          } else {
            rank = 'Iniciante'
            emoji = '🌱'
          }
          
          setGameResult({ points: finalScore, rank, emoji })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isActive, timeLeft, score])

  // Keyboard support
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isActive || !currentProblem) return
    
    const key = event.key
    if (key >= '1' && key <= '9') {
      const answer = parseInt(key)
      if (currentProblem.options.includes(answer)) {
        checkAnswer(answer)
      }
    }
  }, [isActive, currentProblem, checkAnswer])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GameLayoutPT
        title="Sequências Numéricas"
        description="Descubra o padrão e complete a sequência. Desenvolva seu pensamento lógico!"
        introduction="Bem-vindo ao desafio de sequências numéricas! Descubra o padrão em cada sequência e encontre o próximo número. Você tem 30 segundos para resolver o máximo possível. Cada resposta correta soma 1 ponto. Você conseguirá alcançar o nível de Gênio? Desenvolva seu pensamento lógico!"
        onStart={startGame}
        onReset={resetGame}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        gameResult={gameResult}
        showIntroduction={showIntroduction}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        currentGamePath="/pt/jogos-matematicos/sequencias/"
      >
        {currentProblem && (
          <div className="w-full">
            {/* Sequence Display - Mobile-first design */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-4">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {currentProblem.sequence.map((num, index) => (
                    <div key={index} className="bg-white text-blue-900 text-2xl sm:text-3xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[60px] text-center">
                      {num}
                    </div>
                  ))}
                  <div className="bg-blue-100 text-blue-900 text-2xl sm:text-3xl font-bold px-4 py-3 rounded-lg border-2 border-blue-300 min-w-[60px] text-center">
                    ?
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Padrão: {currentProblem.pattern}
              </p>
            </div>

            {/* Answer Options - Mobile optimized */}
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  disabled={!isActive || selectedAnswer !== null}
                  className={`h-16 text-xl font-bold transition-all ${
                    !isActive || selectedAnswer !== null
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95'
                  } ${
                    selectedAnswer === option
                      ? feedback === 'correct' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                      : ''
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </GameLayoutPT>
    </>
  )
}