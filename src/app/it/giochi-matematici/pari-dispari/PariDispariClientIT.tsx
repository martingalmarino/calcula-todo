"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ParityProblem {
  number: number
  correctAnswer: 'pari' | 'dispari'
  options: ('pari' | 'dispari')[]
}

const generateProblem = (): ParityProblem => {
  const number = Math.floor(Math.random() * 100) + 1 // 1-100
  const correctAnswer: 'pari' | 'dispari' = number % 2 === 0 ? 'pari' : 'dispari'
  
  // Le opzioni sono sempre le stesse: pari e dispari
  const options: ('pari' | 'dispari')[] = ['pari', 'dispari']
  
  return { number, correctAnswer, options }
}

export default function PariDispariClientIT() {
  const [currentProblem, setCurrentProblem] = useState<ParityProblem | null>(null)
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

  const checkAnswer = useCallback((answer: 'pari' | 'dispari') => {
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
    if (finalScore <= 8) return { rank: 'Principiante Pari/Dispari', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 15) return { rank: 'Esperto Pari/Dispari', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 22) return { rank: 'Maestro Pari/Dispari', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio Pari/Dispari', emoji: '🧠', color: 'text-red-600' }
  }

  const getAnswerEmoji = (answer: 'pari' | 'dispari') => {
    return answer === 'pari' ? '🔢' : '🔣'
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Pari o Dispari Express"
      description="Identifica rapidamente se i numeri sono pari o dispari. Sfida la tua velocità di riconoscimento numerico!"
      introduction="Ti mostreremo numeri e dovrai identificare rapidamente se sono pari o dispari. Hai 30 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/pari-dispari"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Pari o Dispari Express!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo numeri e dovrai identificare rapidamente se sono pari o dispari. 
            Hai 30 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Il numero {currentProblem.number} è:
            </h3>
            <div className="text-6xl font-bold text-blue-700 mb-8">
              {currentProblem.number}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="w-full py-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={feedback !== null}
                >
                  <span className="text-2xl">{getAnswerEmoji(option)}</span>
                  {option === 'pari' ? 'Pari' : 'Dispari'}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutIT>
  )
}
