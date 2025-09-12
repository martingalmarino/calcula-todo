"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ProbabilityProblem {
  question: string
  correctAnswer: number
  options: number[]
}

const generateProblem = (): ProbabilityProblem => {
  const problems = [
    {
      question: 'Qual è la probabilità di ottenere testa lanciando una moneta?',
      correctAnswer: 0.5
    },
    {
      question: 'Qual è la probabilità di ottenere un 6 lanciando un dado?',
      correctAnswer: 1/6
    },
    {
      question: 'Qual è la probabilità di ottenere un numero pari lanciando un dado?',
      correctAnswer: 0.5
    },
    {
      question: 'Qual è la probabilità di ottenere un numero maggiore di 4 lanciando un dado?',
      correctAnswer: 1/3
    },
    {
      question: 'Qual è la probabilità di ottenere croce lanciando una moneta?',
      correctAnswer: 0.5
    }
  ]
  
  const selectedProblem = problems[Math.floor(Math.random() * problems.length)]
  
  // Generare opzioni errate
  const options: number[] = []
  const wrongOptions = [0.25, 0.33, 0.4, 0.6, 0.67, 0.75, 0.8, 0.17, 0.83]
  
  while (options.length < 3) {
    const randomOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
    if (!options.includes(randomOption) && randomOption !== selectedProblem.correctAnswer) {
      options.push(randomOption)
    }
  }
  
  options.push(selectedProblem.correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return {
    question: selectedProblem.question,
    correctAnswer: selectedProblem.correctAnswer,
    options
  }
}

export default function ProbabilitaClientIT() {
  const [currentProblem, setCurrentProblem] = useState<ProbabilityProblem | null>(null)
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
      if (Math.abs(answer - currentProblem.correctAnswer) < 0.01) {
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
    if (finalScore <= 3) return { rank: 'Principiante della Probabilità', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Esperto della Probabilità', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Maestro della Probabilità', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio della Probabilità', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Gioco di Probabilità"
      description="Risolvi problemi di probabilità e calcoli probabilistici. Sfida la tua comprensione della probabilità!"
      introduction="Ti mostreremo problemi di probabilità e dovrai calcolare la probabilità corretta. Hai 50 secondi!"
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
      currentGamePath="/it/giochi-matematici/probabilita"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎲</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Gioco di Probabilità!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo problemi di probabilità e dovrai calcolare la probabilità corretta. 
            Hai 50 secondi!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentProblem.question}
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
    </GameLayoutIT>
  )
}
