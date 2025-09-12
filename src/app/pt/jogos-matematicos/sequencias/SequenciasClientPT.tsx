"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SequenceProblem {
  sequence: number[]
  correctAnswer: number
  options: number[]
}

const generateProblem = (): SequenceProblem => {
  const patterns = [
    // Aritmética
    () => {
      const start = Math.floor(Math.random() * 10) + 1
      const diff = Math.floor(Math.random() * 5) + 1
      const sequence = [start, start + diff, start + 2 * diff, start + 3 * diff]
      return { sequence, answer: start + 4 * diff }
    },
    // Geométrica
    () => {
      const start = Math.floor(Math.random() * 5) + 1
      const ratio = Math.floor(Math.random() * 3) + 2
      const sequence = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio]
      return { sequence, answer: start * ratio * ratio * ratio * ratio }
    },
    // Quadrados
    () => {
      const start = Math.floor(Math.random() * 5) + 1
      const sequence = [start * start, (start + 1) * (start + 1), (start + 2) * (start + 2), (start + 3) * (start + 3)]
      return { sequence, answer: (start + 4) * (start + 4) }
    },
    // Fibonacci-like
    () => {
      const a = Math.floor(Math.random() * 5) + 1
      const b = Math.floor(Math.random() * 5) + 1
      const sequence = [a, b, a + b, a + 2 * b]
      return { sequence, answer: 2 * a + 3 * b }
    }
  ]
  
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
  const { sequence, answer } = selectedPattern()
  
  // Gerar opções erradas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, answer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== answer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(answer)
  options.sort(() => Math.random() - 0.5)
  
  return { sequence, correctAnswer: answer, options }
}

export default function SequenciasClientPT() {
  const [currentProblem, setCurrentProblem] = useState<SequenceProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(30)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(30)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(null)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished')
      if (timer) clearInterval(timer)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeLeft, gameState])

  const checkAnswer = useCallback((answer: number) => {
    if (currentProblem && gameState === 'playing') {
      if (answer === currentProblem.correctAnswer) {
        setScore((prevScore) => prevScore + 1)
        setFeedback('correct')
      } else {
        setFeedback('incorrect')
      }
      setProblemsSolved((prev) => prev + 1)
      setTimeout(() => {
        setCurrentProblem(generateProblem())
        setFeedback(null)
      }, 700)
    }
  }, [currentProblem, gameState])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 3) return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Rápido', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Especialista', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Gênio', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutPT
      title="Sequências Numéricas"
      description="Descubra o padrão e complete a sequência. Desenvolva seu pensamento lógico!"
      introduction="Você verá sequências numéricas e deve descobrir o padrão para encontrar o próximo número. Tem 30 segundos!"
      timeLeft={timeLeft}
      score={score}
      onStart={startGame}
      onReset={resetGame}
      isActive={gameState === 'playing'}
      feedback={feedback}
      gameResult={gameState === 'finished' ? {
        points: score,
        rank: rankInfo.rank,
        emoji: rankInfo.emoji
      } : null}
      showIntroduction={gameState === 'waiting'}
      currentQuestion={problemsSolved + 1}
      totalQuestions={problemsSolved + 1}
      currentGamePath="/pt/jogos-matematicos/sequencias"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sequências Numéricas!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá sequências numéricas e deve descobrir o padrão para encontrar o próximo número. 
            Tem 30 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Qual é o próximo número?
            </h3>
            <div className="flex justify-center items-center gap-4 mb-6">
              {currentProblem.sequence.map((num, index) => (
                <div key={index} className="text-2xl font-bold text-blue-700 bg-blue-100 px-3 py-2 rounded">
                  {num}
                </div>
              ))}
              <div className="text-2xl font-bold text-gray-500">?</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
                  disabled={feedback !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutPT>
  )
}
