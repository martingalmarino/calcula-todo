"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GameLayoutPT } from '@/components/GameLayoutPT'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ProbabilityProblem {
  question: string
  correctAnswer: string
  options: string[]
}

const generateProblem = (): ProbabilityProblem => {
  const problemTypes = ['dice', 'coin', 'cards']
  const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)]
  
  let question: string
  let correctAnswer: string
  
  if (problemType === 'dice') {
    const scenarios = [
      {
        question: "Qual a probabilidade de sair um número par ao lançar um dado?",
        answer: "1/2"
      },
      {
        question: "Qual a probabilidade de sair 6 ao lançar um dado?",
        answer: "1/6"
      },
      {
        question: "Qual a probabilidade de sair um número maior que 4 ao lançar um dado?",
        answer: "1/3"
      }
    ]
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    question = scenario.question
    correctAnswer = scenario.answer
  } else if (problemType === 'coin') {
    const scenarios = [
      {
        question: "Qual a probabilidade de sair cara ao lançar uma moeda?",
        answer: "1/2"
      },
      {
        question: "Qual a probabilidade de sair coroa ao lançar uma moeda?",
        answer: "1/2"
      }
    ]
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    question = scenario.question
    correctAnswer = scenario.answer
  } else {
    const scenarios = [
      {
        question: "Qual a probabilidade de tirar um ás de um baralho de 52 cartas?",
        answer: "1/13"
      },
      {
        question: "Qual a probabilidade de tirar uma carta vermelha de um baralho de 52 cartas?",
        answer: "1/2"
      },
      {
        question: "Qual a probabilidade de tirar um rei de um baralho de 52 cartas?",
        answer: "1/13"
      }
    ]
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    question = scenario.question
    correctAnswer = scenario.answer
  }
  
  // Gerar opções erradas
  const wrongOptions = ['1/2', '1/3', '1/4', '1/6', '1/13', '2/3', '3/4']
  const options: string[] = []
  
  while (options.length < 3) {
    const randomOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
    if (!options.includes(randomOption) && randomOption !== correctAnswer) {
      options.push(randomOption)
    }
  }
  
  options.push(correctAnswer)
  options.sort(() => Math.random() - 0.5)
  
  return { question, correctAnswer, options }
}

export default function ProbabilidadeClientPT() {
  const [currentProblem, setCurrentProblem] = useState<ProbabilityProblem | null>(null)
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
      title="Jogo de Probabilidade"
      description="Calcule probabilidades com dados, cartas e moedas em tempo limitado. Desafie sua compreensão estatística!"
      introduction="Você verá problemas de probabilidade com dados, cartas e moedas. Calcule as probabilidades! Tem 45 segundos!"
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
      currentGamePath="/pt/jogos-matematicos/probabilidade"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎲</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Jogo de Probabilidade!
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Você verá problemas de probabilidade com dados, cartas e moedas. Calcule as probabilidades! 
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
