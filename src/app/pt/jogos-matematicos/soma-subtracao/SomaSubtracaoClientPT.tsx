"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MathProblem {
  question: string
  correctAnswer: number
  options: number[]
}

const generateProblem = (): MathProblem => {
  const operations = ['+', '-']
  const operation = operations[Math.floor(Math.random() * operations.length)]
  
  let question: string
  let correctAnswer: number
  
  if (operation === '+') {
    const a = Math.floor(Math.random() * 50) + 1
    const b = Math.floor(Math.random() * 50) + 1
    question = `${a} + ${b}`
    correctAnswer = a + b
  } else {
    const a = Math.floor(Math.random() * 50) + 25
    const b = Math.floor(Math.random() * 25) + 1
    question = `${a} - ${b}`
    correctAnswer = a - b
  }
  
  // Gerar opções erradas
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(0, correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { question, correctAnswer, options }
}

export default function SomaSubtracaoClientPT() {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null)
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
      title="Soma e Subtração contra Relógio"
      description="Resolva operações de soma e subtração em 30 segundos. Demonstre sua velocidade mental!"
      introduction="Você verá operações de soma e subtração e deve resolvê-las mentalmente. Tem 30 segundos para resolver o máximo possível!"
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
      currentGamePath="/pt/jogos-matematicos/soma-subtracao"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Soma e Subtração contra Relógio!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá operações de soma e subtração e deve resolvê-las mentalmente. 
            Tem 30 segundos para resolver o máximo possível!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Resolva:
            </h3>
            <div className="text-4xl font-bold text-blue-700 mb-6">
              {currentProblem.question} = ?
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
