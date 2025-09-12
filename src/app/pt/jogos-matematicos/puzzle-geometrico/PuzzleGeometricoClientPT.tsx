"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface GeometryProblem {
  shape: string
  question: string
  correctAnswer: number
  options: number[]
  dimensions: { width?: number; height?: number; side?: number; base?: number }
}

const generateProblem = (): GeometryProblem => {
  const shapes = ['retângulo', 'quadrado', 'triângulo']
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  
  let question: string
  let correctAnswer: number
  let dimensions: { width?: number; height?: number; side?: number; base?: number }
  
  if (shape === 'retângulo') {
    const width = Math.floor(Math.random() * 10) + 5
    const height = Math.floor(Math.random() * 10) + 5
    dimensions = { width, height }
    
    const operations = ['área', 'perímetro']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    
    if (operation === 'área') {
      question = `Um retângulo tem ${width}cm de largura e ${height}cm de altura. Qual é a área?`
      correctAnswer = width * height
    } else {
      question = `Um retângulo tem ${width}cm de largura e ${height}cm de altura. Qual é o perímetro?`
      correctAnswer = 2 * (width + height)
    }
  } else if (shape === 'quadrado') {
    const side = Math.floor(Math.random() * 10) + 5
    dimensions = { side }
    
    const operations = ['área', 'perímetro']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    
    if (operation === 'área') {
      question = `Um quadrado tem ${side}cm de lado. Qual é a área?`
      correctAnswer = side * side
    } else {
      question = `Um quadrado tem ${side}cm de lado. Qual é o perímetro?`
      correctAnswer = 4 * side
    }
  } else {
    const base = Math.floor(Math.random() * 10) + 5
    const height = Math.floor(Math.random() * 10) + 5
    dimensions = { base, height }
    
    question = `Um triângulo tem ${base}cm de base e ${height}cm de altura. Qual é a área?`
    correctAnswer = Math.round((base * height) / 2)
  }
  
  // Gerar opções erradas
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
  
  return { shape, question, correctAnswer, options, dimensions }
}

export default function PuzzleGeometricoClientPT() {
  const [currentProblem, setCurrentProblem] = useState<GeometryProblem | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(45)
    setGameState('playing')
    setFeedback(null)
    setProblemsSolved(0)
    setCurrentProblem(generateProblem())
  }, [])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setScore(0)
    setTimeLeft(45)
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
      title="Quebra-cabeça Geométrico Simples"
      description="Calcule perímetros e áreas de figuras geométricas simples. Desafie seu conhecimento de geometria básica!"
      introduction="Você verá problemas de geometria com retângulos, quadrados e triângulos. Calcule áreas e perímetros! Tem 45 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/puzzle-geometrico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quebra-cabeça Geométrico!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá problemas de geometria com retângulos, quadrados e triângulos. Calcule áreas e perímetros! 
            Tem 45 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
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
                  {option} cm²
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayoutPT>
  )
}
