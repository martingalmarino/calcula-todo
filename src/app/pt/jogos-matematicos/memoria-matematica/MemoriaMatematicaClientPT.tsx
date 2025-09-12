"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MemoryProblem {
  operations: { operation: string; result: number }[]
  correctAnswer: number
  options: number[]
  question: string
}

const generateProblem = (): MemoryProblem => {
  const operations: { operation: string; result: number }[] = []
  
  // Gerar 3 operações
  for (let i = 0; i < 3; i++) {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const operation = `${a} + ${b}`
    const result = a + b
    operations.push({ operation, result })
  }
  
  // Escolher uma operação para perguntar
  const selectedOperation = operations[Math.floor(Math.random() * operations.length)]
  const question = `Qual é o resultado de ${selectedOperation.operation}?`
  const correctAnswer = selectedOperation.result
  
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
  
  return { operations, correctAnswer, options, question }
}

export default function MemoriaMatematicaClientPT() {
  const [currentProblem, setCurrentProblem] = useState<MemoryProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)
  const [showOperations, setShowOperations] = useState(true)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(45)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
    setShowOperations(true)
    
    // Esconder operações após 3 segundos
    setTimeout(() => {
      setShowOperations(false)
    }, 3000)
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(45)
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(null)
    setShowOperations(true)
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
        setShowOperations(true)
        setTimeout(() => {
          setShowOperations(false)
        }, 3000)
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
      title="Memória Matemática"
      description="Memorize operações matemáticas e seus resultados. Desafie sua memória e agilidade mental!"
      introduction="Você verá operações matemáticas por 3 segundos, depois deve responder sobre uma delas. Use sua memória! Tem 45 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/memoria-matematica"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Memória Matemática!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá operações matemáticas por 3 segundos, depois deve responder sobre uma delas. Use sua memória! 
            Tem 45 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            {showOperations ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Memorize estas operações:
                </h3>
                <div className="space-y-3">
                  {currentProblem.operations.map((op, index) => (
                    <div key={index} className="text-2xl font-bold text-blue-700 bg-blue-100 p-3 rounded">
                      {op.operation} = {op.result}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-lg text-gray-600">
                  Operações desaparecerão em 3 segundos...
                </div>
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </GameLayoutPT>
  )
}
