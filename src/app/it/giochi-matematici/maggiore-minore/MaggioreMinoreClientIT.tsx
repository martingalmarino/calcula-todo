"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ComparisonProblem {
  num1: number
  num2: number
  correctAnswer: 'maggiore' | 'minore' | 'uguale'
  options: ('maggiore' | 'minore' | 'uguale')[]
}

const generateProblem = (): ComparisonProblem => {
  const num1 = Math.floor(Math.random() * 100) + 1 // 1-100
  const num2 = Math.floor(Math.random() * 100) + 1 // 1-100
  
  let correctAnswer: 'maggiore' | 'minore' | 'uguale'
  if (num1 > num2) {
    correctAnswer = 'maggiore'
  } else if (num1 < num2) {
    correctAnswer = 'minore'
  } else {
    correctAnswer = 'uguale'
  }
  
  // Generare opzioni (sempre includere quella corretta)
  const options: ('maggiore' | 'minore' | 'uguale')[] = [correctAnswer]
  
  // Aggiungere opzioni errate
  const allOptions: ('maggiore' | 'minore' | 'uguale')[] = ['maggiore', 'minore', 'uguale']
  const incorrectOptions = allOptions.filter(opt => opt !== correctAnswer)
  
  // Aggiungere 2 opzioni errate casuali
  while (options.length < 3) {
    const randomOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)]
    if (!options.includes(randomOption)) {
      options.push(randomOption)
    }
  }
  
  options.sort(() => Math.random() - 0.5) // Mescolare
  
  return { num1, num2, correctAnswer, options }
}

export default function MaggioreMinoreClientIT() {
  const [currentProblem, setCurrentProblem] = useState<ComparisonProblem | null>(null)
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

  const checkAnswer = useCallback((answer: 'maggiore' | 'minore' | 'uguale') => {
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
    if (finalScore <= 5) return { rank: 'Principiante Comparatore', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 10) return { rank: 'Comparatore Veloce', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 15) return { rank: 'Esperto in Confronti', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio dei Confronti', emoji: '🧠', color: 'text-red-600' }
  }

  const getAnswerText = (answer: 'maggiore' | 'minore' | 'uguale') => {
    switch (answer) {
      case 'maggiore': return 'Maggiore'
      case 'minore': return 'Minore'
      case 'uguale': return 'Uguale'
    }
  }

  const getAnswerEmoji = (answer: 'maggiore' | 'minore' | 'uguale') => {
    switch (answer) {
      case 'maggiore': return '>'
      case 'minore': return '<'
      case 'uguale': return '='
    }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Maggiore o Minore"
      description="Confronta numeri e determina quale è maggiore o minore. Sfida il tuo senso numerico e agilità mentale!"
      introduction="Ti mostreremo due numeri e dovrai determinare la relazione tra loro. Hai 30 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/maggiore-minore"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚖️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Maggiore o Minore!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo due numeri e dovrai determinare la relazione tra loro. 
            Hai 30 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Confronta questi numeri:
            </h3>
            <div className="text-4xl font-bold text-blue-700 mb-6">
              {currentProblem.num1} ? {currentProblem.num2}
            </div>
            <p className="text-gray-600 mb-6">
              Qual è la relazione tra {currentProblem.num1} e {currentProblem.num2}?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={feedback !== null}
                >
                  <span className="text-xl">{getAnswerEmoji(option)}</span>
                  {getAnswerText(option)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayout>
  )
}
