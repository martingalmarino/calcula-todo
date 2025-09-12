"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PatternProblem {
  sequence: string[]
  correctAnswer: string
  options: string[]
}

const generateProblem = (): PatternProblem => {
  const patternTypes = ['shapes', 'numbers', 'colors']
  const patternType = patternTypes[Math.floor(Math.random() * patternTypes.length)]
  
  let sequence: string[]
  let correctAnswer: string
  
  if (patternType === 'shapes') {
    const shapes = ['🔴', '🔵', '🟡', '🟢', '🟣']
    const pattern = [0, 1, 2, 0, 1] // Padrão que se repete
    sequence = pattern.map(i => shapes[i])
    correctAnswer = shapes[2] // Próximo na sequência
  } else if (patternType === 'numbers') {
    const numbers = ['2', '4', '6', '8', '10']
    sequence = numbers.slice(0, 4)
    correctAnswer = '12' // Próximo número par
  } else {
    const colors = ['🔴', '🟡', '🔴', '🟡', '🔴']
    sequence = colors.slice(0, 4)
    correctAnswer = '🟡' // Alternância de cores
  }
  
  // Gerar opções erradas
  const allOptions = ['🔴', '🔵', '🟡', '🟢', '🟣', '2', '4', '6', '8', '10', '12', '14']
  const options: string[] = []
  
  while (options.length < 3) {
    const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)]
    if (!options.includes(randomOption) && randomOption !== correctAnswer) {
      options.push(randomOption)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { sequence, correctAnswer, options }
}

export default function RaciocinioLogicoClientPT() {
  const [currentProblem, setCurrentProblem] = useState<PatternProblem | null>(null)
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
    if (finalScore <= 3) return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 6) return { rank: 'Rápido', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 9) return { rank: 'Especialista', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Gênio', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayoutPT
      title="Raciocínio Lógico com Padrões"
      description="Descubra padrões matemáticos em sequências de símbolos e números. Desafie seu pensamento lógico e raciocínio abstrato!"
      introduction="Você verá sequências de símbolos e números com padrões. Descubra o padrão e encontre o próximo elemento! Tem 40 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/raciocinio-logico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Raciocínio Lógico com Padrões!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá sequências de símbolos e números com padrões. Descubra o padrão e encontre o próximo elemento! 
            Tem 40 segundos!
          </p>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <Card className="w-full max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Qual é o próximo elemento?
            </h3>
            <div className="flex justify-center items-center gap-4 mb-6">
              {currentProblem.sequence.map((item, index) => (
                <div key={index} className="text-3xl">
                  {item}
                </div>
              ))}
              <div className="text-3xl text-gray-500">?</div>
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
