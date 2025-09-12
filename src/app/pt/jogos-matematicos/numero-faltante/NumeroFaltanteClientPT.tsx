"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Target } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface Equation {
  num1: number
  num2: number
  operator: '+' | '-'
  missingPosition: 'first' | 'second' | 'result'
  correctAnswer: number
  options: number[]
}

const structuredData = jsonLdCalculator({
  name: 'Encontre o Número Faltante',
  description: 'Jogo educativo para encontrar o número que falta em equações matemáticas',
  url: '/pt/jogos-matematicos/numero-faltante',
  category: 'Jogos de Matemática'
})

export default function NumeroFaltanteClientPT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [gameResult, setGameResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const totalQuestions = 15

  // Generate equation with missing number
  const generateEquation = useCallback((): Equation => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operator = Math.random() > 0.5 ? '+' : '-'
    
    let result: number
    if (operator === '+') {
      result = num1 + num2
    } else {
      // Ensure positive result for subtraction
      const maxNum = Math.max(num1, num2)
      const minNum = Math.min(num1, num2)
      result = maxNum - minNum
    }
    
    const missingPositions: Array<'first' | 'second' | 'result'> = ['first', 'second', 'result']
    const missingPosition = missingPositions[Math.floor(Math.random() * missingPositions.length)]
    
    let correctAnswer: number
    if (missingPosition === 'first') {
      correctAnswer = operator === '+' ? result - num2 : result + num2
    } else if (missingPosition === 'second') {
      correctAnswer = operator === '+' ? result - num1 : num1 - result
    } else {
      correctAnswer = result
    }
    
    // Generate wrong options
    const options: number[] = []
    while (options.length < 3) {
      const deviation = Math.floor(Math.random() * 10) - 5
      if (deviation === 0) continue
      const wrongAnswer = Math.max(1, correctAnswer + deviation)
      if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
        options.push(wrongAnswer)
      }
    }
    options.push(correctAnswer)
    options.sort(() => Math.random() - 0.5)
    
    return {
      num1: operator === '+' ? num1 : Math.max(num1, num2),
      num2: operator === '+' ? num2 : Math.min(num1, num2),
      operator,
      missingPosition,
      correctAnswer,
      options
    }
  }, [])

  const startGame = useCallback(() => {
    setIsActive(true)
    setTimeLeft(30)
    setScore(0)
    setCurrentQuestion(1)
    setFeedback(null)
    setGameResult(null)
    setShowIntroduction(false)
    setCurrentEquation(generateEquation())
  }, [generateEquation])

  const resetGame = useCallback(() => {
    setIsActive(false)
    setTimeLeft(30)
    setScore(0)
    setCurrentQuestion(1)
    setFeedback(null)
    setGameResult(null)
    setShowIntroduction(true)
    setCurrentEquation(null)
    setSelectedAnswer(null)
  }, [])

  const checkAnswer = useCallback((answer: number) => {
    if (!currentEquation || !isActive) return
    
    setSelectedAnswer(answer)
    
    if (answer === currentEquation.correctAnswer) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions) {
        setCurrentQuestion(prev => prev + 1)
        setCurrentEquation(generateEquation())
        setFeedback(null)
        setSelectedAnswer(null)
      } else {
        // Game finished
        const finalScore = answer === currentEquation.correctAnswer ? score + 1 : score
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
  }, [currentEquation, isActive, currentQuestion, totalQuestions, score, generateEquation])

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
    if (!isActive || !currentEquation) return
    
    const key = event.key
    if (key >= '1' && key <= '9') {
      const answer = parseInt(key)
      if (currentEquation.options.includes(answer)) {
        checkAnswer(answer)
      }
    }
  }, [isActive, currentEquation, checkAnswer])

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
        title="Encontre o Número Faltante"
        description="Encontre o número que falta nas equações. Demonstre sua agilidade mental!"
        introduction="Bem-vindo ao desafio de números faltantes! Encontre o número que falta em cada equação matemática. Você tem 30 segundos para resolver o máximo possível. Cada resposta correta soma 1 ponto. Você conseguirá alcançar o nível de Gênio? Demonstre sua agilidade mental!"
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
        currentGamePath="/pt/jogos-matematicos/numero-faltante/"
      >
        {currentEquation && (
          <div className="w-full">
            {/* Math Equation - Mobile-first design */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                  {currentEquation.missingPosition === 'first' ? '?' : currentEquation.num1}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {currentEquation.operator}
                </div>
                <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                  {currentEquation.missingPosition === 'second' ? '?' : currentEquation.num2}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                  =
                </div>
                <div className="bg-blue-50 text-blue-900 text-3xl sm:text-4xl font-bold px-4 py-3 rounded-lg border-2 border-blue-200 min-w-[80px] text-center">
                  {currentEquation.missingPosition === 'result' ? '?' : (currentEquation.operator === '+' ? currentEquation.num1 + currentEquation.num2 : Math.abs(currentEquation.num1 - currentEquation.num2))}
                </div>
              </div>
            </div>

            {/* Answer Options - Mobile optimized */}
            <div className="grid grid-cols-2 gap-4">
              {currentEquation.options.map((option, index) => (
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