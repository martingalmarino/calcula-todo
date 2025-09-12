"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Problem {
  num1: number
  num2: number
  operation: '+' | '-'
  correctAnswer: number
  options: number[]
}

const generateProblem = (): Problem => {
  const operation: '+' | '-' = Math.random() < 0.5 ? '+' : '-'
  let num1: number, num2: number, correctAnswer: number

  if (operation === '+') {
    num1 = Math.floor(Math.random() * 50) + 1 // 1-50
    num2 = Math.floor(Math.random() * 50) + 1 // 1-50
    correctAnswer = num1 + num2
  } else {
    num1 = Math.floor(Math.random() * 50) + 20 // 20-69
    num2 = Math.floor(Math.random() * 20) + 1 // 1-20
    correctAnswer = num1 - num2
  }

  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10 // -10 a +9
    if (deviation === 0) deviation = 1 // Evitare duplicato esatto
    const wrongAnswer = Math.max(1, correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }

  // Aggiungere risposta corretta e mescolare
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)

  return { num1, num2, operation, correctAnswer, options }
}

export default function SommeSottrazioniClientIT() {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
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
      }, 700) // Breve pausa per mostrare feedback
    }
  }, [currentProblem, gameState])

  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 5) return { rank: 'Principiante Calcolatore', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 10) return { rank: 'Calcolatore Veloce', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 15) return { rank: 'Esperto in Calcoli', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio del Calcolo', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Somme e Sottrazioni"
      description="Pratica somme e sottrazioni contro il tempo. Sfida la tua agilità mentale e migliora il calcolo mentale!"
      introduction="Ti mostreremo somme e sottrazioni e dovrai risolverle mentalmente. Hai 30 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/somme-sottrazioni"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">➕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Somme e Sottrazioni!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo somme e sottrazioni e dovrai risolverle mentalmente. 
            Hai 30 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">
              {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
            </h3>
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
    </GameLayout>
  )
}
