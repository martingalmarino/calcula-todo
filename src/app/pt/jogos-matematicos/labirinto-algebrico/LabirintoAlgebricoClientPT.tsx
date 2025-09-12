"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MazeProblem {
  currentPosition: { x: number; y: number }
  targetPosition: { x: number; y: number }
  operation: string
  correctAnswer: number
  options: number[]
  maze: string[][]
}

const generateProblem = (): MazeProblem => {
  // Criar um labirinto simples 3x3
  const maze = [
    ['🚪', '🟫', '🟫'],
    ['🟫', '🟫', '🟫'],
    ['🟫', '🟫', '🏁']
  ]
  
  const currentPosition = { x: 0, y: 0 }
  const targetPosition = { x: 2, y: 2 }
  
  // Gerar operação algébrica
  const operations = ['+', '-', '×']
  const operation = operations[Math.floor(Math.random() * operations.length)]
  
  let operationText: string
  let correctAnswer: number
  
  if (operation === '+') {
    const a = Math.floor(Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 10) + 1
    operationText = `${a} + ${b}`
    correctAnswer = a + b
  } else if (operation === '-') {
    const a = Math.floor(Math.random() * 20) + 10
    const b = Math.floor(Math.random() * 10) + 1
    operationText = `${a} - ${b}`
    correctAnswer = a - b
  } else {
    const a = Math.floor(Math.random() * 5) + 2
    const b = Math.floor(Math.random() * 5) + 2
    operationText = `${a} × ${b}`
    correctAnswer = a * b
  }
  
  // Gerar opções erradas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 10) - 5
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { 
    currentPosition, 
    targetPosition, 
    operation: operationText, 
    correctAnswer, 
    options, 
    maze 
  }
}

export default function LabirintoAlgebricoClientPT() {
  const [currentProblem, setCurrentProblem] = useState<MazeProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(50)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(50)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(50)
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
      title="O Labirinto Algébrico"
      description="Navegue por um labirinto resolvendo operações algébricas em cada passo. Desafie sua agilidade matemática e pensamento estratégico!"
      introduction="Você está em um labirinto e deve resolver operações algébricas para avançar. Resolva as operações para chegar ao objetivo! Tem 50 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/labirinto-algebrico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            O Labirinto Algébrico!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você está em um labirinto e deve resolver operações algébricas para avançar. Resolva as operações para chegar ao objetivo! 
            Tem 50 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Resolva para avançar no labirinto:
            </h3>
            <div className="text-2xl font-bold text-blue-700 mb-6">
              {currentProblem.operation} = ?
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
