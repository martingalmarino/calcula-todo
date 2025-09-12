"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface LogicProblem {
  pattern: string[]
  question: string
  correctAnswer: string
  options: string[]
}

const generateProblem = (): LogicProblem => {
  const patterns = [
    {
      pattern: ['🔴', '🔵', '🔴', '🔵', '🔴'],
      question: 'Qual è il prossimo elemento?',
      correctAnswer: '🔵'
    },
    {
      pattern: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
      question: 'Qual è il prossimo elemento?',
      correctAnswer: '⭐⭐⭐⭐⭐'
    },
    {
      pattern: ['1', '4', '9', '16'],
      question: 'Qual è il prossimo numero?',
      correctAnswer: '25'
    },
    {
      pattern: ['A', 'C', 'E', 'G'],
      question: 'Qual è la prossima lettera?',
      correctAnswer: 'I'
    }
  ]
  
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
  
  // Generare opzioni errate
  const options: string[] = []
  const wrongOptions = ['🔴', '🔵', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '1', '4', '9', '16', '25', 'A', 'C', 'E', 'G', 'I']
  
  while (options.length < 3) {
    const randomOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
    if (!options.includes(randomOption) && randomOption !== selectedPattern.correctAnswer) {
      options.push(randomOption)
    }
  }
  
  options.push(selectedPattern.correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return {
    pattern: selectedPattern.pattern,
    question: selectedPattern.question,
    correctAnswer: selectedPattern.correctAnswer,
    options
  }
}

export default function RagionamentoLogicoClientIT() {
  const [currentProblem, setCurrentProblem] = useState<LogicProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(55)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(55)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(55)
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

  const checkAnswer = useCallback((answer: string) => {
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
    if (finalScore <= 3) return { rank: 'Principiante del Ragionamento', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Esperto del Ragionamento', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Maestro del Ragionamento', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio del Ragionamento', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Ragionamento Logico con Modelli"
      description="Risolvi problemi di ragionamento logico con pattern e modelli. Sfida la tua capacità di pensiero logico!"
      introduction="Ti mostreremo pattern logici e dovrai trovare il prossimo elemento. Hai 55 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/ragionamento-logico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ragionamento Logico con Modelli!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo pattern logici e dovrai trovare il prossimo elemento. 
            Hai 55 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {currentProblem.question}
            </h3>
            <div className="flex justify-center items-center gap-4 mb-6">
              {currentProblem.pattern.map((item, index) => (
                <div
                  key={index}
                  className="w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-blue-400 bg-blue-50 text-blue-700"
                >
                  {item}
                </div>
              ))}
              <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-dashed border-red-400 bg-red-50 text-red-500">
                ?
              </div>
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
    </GameLayoutIT>
  )
}
