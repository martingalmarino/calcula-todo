"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MissingNumberProblem {
  equation: string
  correctAnswer: number
  options: number[]
}

const generateProblem = (): MissingNumberProblem => {
  const operations = ['+', '-', '×']
  const operation = operations[Math.floor(Math.random() * operations.length)]
  
  let equation: string
  let correctAnswer: number
  
  if (operation === '+') {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const missingPosition = Math.floor(Math.random() * 3)
    if (missingPosition === 0) {
      equation = `? + ${b} = ${a + b}`
      correctAnswer = a
    } else if (missingPosition === 1) {
      equation = `${a} + ? = ${a + b}`
      correctAnswer = b
    } else {
      equation = `${a} + ${b} = ?`
      correctAnswer = a + b
    }
  } else if (operation === '-') {
    const a = Math.floor(Math.random() * 30) + 10
    const b = Math.floor(Math.random() * 10) + 1
    const missingPosition = Math.floor(Math.random() * 3)
    if (missingPosition === 0) {
      equation = `? - ${b} = ${a - b}`
      correctAnswer = a
    } else if (missingPosition === 1) {
      equation = `${a} - ? = ${a - b}`
      correctAnswer = b
    } else {
      equation = `${a} - ${b} = ?`
      correctAnswer = a - b
    }
  } else {
    const a = Math.floor(Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 10) + 1
    const missingPosition = Math.floor(Math.random() * 3)
    if (missingPosition === 0) {
      equation = `? × ${b} = ${a * b}`
      correctAnswer = a
    } else if (missingPosition === 1) {
      equation = `${a} × ? = ${a * b}`
      correctAnswer = b
    } else {
      equation = `${a} × ${b} = ?`
      correctAnswer = a * b
    }
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
  
  return { equation, correctAnswer, options }
}

export default function NumeroFaltanteClientPT() {
  const [currentProblem, setCurrentProblem] = useState<MissingNumberProblem | null>(null)
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
      title="Encontre o Número Faltante"
      description="Complete as equações encontrando o número que falta. Teste sua lógica!"
      introduction="Você verá equações com um número faltante e deve encontrar o valor correto. Tem 30 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/numero-faltante"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Encontre o Número Faltante!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá equações com um número faltante e deve encontrar o valor correto. 
            Tem 30 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Encontre o número que falta:
            </h3>
            <div className="text-3xl font-bold text-blue-700 mb-6">
              {currentProblem.equation}
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
