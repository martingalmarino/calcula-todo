"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutIT } from '@/components/GameLayoutIT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface GuessResultProblem {
  steps: string[]
  correctAnswer: number
  options: number[]
}

const generateProblem = (): GuessResultProblem => {
  const num1 = Math.floor(Math.random() * 20) + 1 // 1-20
  const num2 = Math.floor(Math.random() * 20) + 1 // 1-20
  const num3 = Math.floor(Math.random() * 10) + 1 // 1-10
  
  const operations = ['+', '-', '×', '÷']
  const op1 = operations[Math.floor(Math.random() * operations.length)]
  const op2 = operations[Math.floor(Math.random() * operations.length)]
  
  let steps: string[]
  let correctAnswer: number
  
  // Generare passaggi
  if (Math.random() < 0.5) {
    steps = [
      `${num1} ${op1} ${num2}`,
      `= ${num1} ${op1} ${num2}`,
      `= ?`
    ]
    
    if (op1 === '+') correctAnswer = num1 + num2
    else if (op1 === '-') correctAnswer = num1 - num2
    else if (op1 === '×') correctAnswer = num1 * num2
    else correctAnswer = Math.round(num1 / num2)
  } else {
    const intermediate = Math.floor(Math.random() * 20) + 1
    steps = [
      `${num1} ${op1} ${num2} = ${intermediate}`,
      `${intermediate} ${op2} ${num3}`,
      `= ?`
    ]
    
    if (op2 === '+') correctAnswer = intermediate + num3
    else if (op2 === '-') correctAnswer = intermediate - num3
    else if (op2 === '×') correctAnswer = intermediate * num3
    else correctAnswer = Math.round(intermediate / num3)
  }
  
  // Generare opzioni errate
  const options: number[] = []
  while (options.length < 3) {
    let deviation = Math.floor(Math.random() * 20) - 10
    if (deviation === 0) deviation = 1
    const wrongAnswer = Math.max(1, correctAnswer + deviation)
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { steps, correctAnswer, options }
}

export default function IndovinaRisultatoClientIT() {
  const [currentProblem, setCurrentProblem] = useState<GuessResultProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(40)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(40)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(40)
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
    if (finalScore <= 4) return { rank: 'Principiante del Seguimento', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 8) return { rank: 'Esperto del Seguimento', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 12) return { rank: 'Maestro del Seguimento', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Genio del Seguimento', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutIT
      title="Indovina il Risultato"
      description="Osserva operazioni passo dopo passo e indovina il risultato finale. Sfida la tua capacità di seguimento matematico!"
      introduction="Ti mostreremo operazioni passo dopo passo e dovrai indovinare il risultato finale. Hai 40 secondi per risolverne quante più possibile!"
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
      currentGamePath="/it/giochi-matematici/indovina-risultato"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Indovina il Risultato!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Ti mostreremo operazioni passo dopo passo e dovrai indovinare il risultato finale. 
            Hai 40 secondi per risolverne quante più possibile!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Segui i passaggi:
            </h3>
            <div className="space-y-2 mb-6">
              {currentProblem.steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-lg font-medium ${
                    index === currentProblem.steps.length - 1 
                      ? 'text-red-600 font-bold' 
                      : 'text-gray-700'
                  }`}
                >
                  {step}
                </div>
              ))}
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
