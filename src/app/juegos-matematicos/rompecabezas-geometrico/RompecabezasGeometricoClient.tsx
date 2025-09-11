"use client"

import { useState, useEffect, useCallback } from 'react'
import { GameLayout } from '@/components/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, RotateCcw, Play } from 'lucide-react'

interface GeometricProblem {
  figure: 'rectangulo' | 'cuadrado' | 'triangulo'
  dimensions: {
    base?: number
    altura?: number
    lado?: number
  }
  question: 'perimetro' | 'area'
  correctAnswer: number
  options: number[]
}

const generateGeometricProblem = (): GeometricProblem => {
  const figures = ['rectangulo', 'cuadrado', 'triangulo'] as const
  const questions = ['perimetro', 'area'] as const
  
  const figure = figures[Math.floor(Math.random() * figures.length)]
  const question = questions[Math.floor(Math.random() * questions.length)]
  
  const dimensions: { base?: number; altura?: number; lado?: number } = {}
  let correctAnswer: number
  let options: number[] = []
  
  switch (figure) {
    case 'rectangulo':
      dimensions.base = Math.floor(Math.random() * 8) + 3 // 3-10
      dimensions.altura = Math.floor(Math.random() * 8) + 3 // 3-10
      
      if (question === 'perimetro') {
        correctAnswer = 2 * (dimensions.base + dimensions.altura)
      } else {
        correctAnswer = dimensions.base * dimensions.altura
      }
      break
      
    case 'cuadrado':
      dimensions.lado = Math.floor(Math.random() * 8) + 3 // 3-10
      
      if (question === 'perimetro') {
        correctAnswer = 4 * dimensions.lado
      } else {
        correctAnswer = dimensions.lado * dimensions.lado
      }
      break
      
    case 'triangulo':
      dimensions.base = Math.floor(Math.random() * 8) + 4 // 4-11
      dimensions.altura = Math.floor(Math.random() * 8) + 4 // 4-11
      
      if (question === 'perimetro') {
        // Para triángulo rectángulo: hipotenusa = √(base² + altura²)
        const hipotenusa = Math.round(Math.sqrt(dimensions.base * dimensions.base + dimensions.altura * dimensions.altura))
        correctAnswer = dimensions.base + dimensions.altura + hipotenusa
      } else {
        correctAnswer = Math.round((dimensions.base * dimensions.altura) / 2)
      }
      break
  }
  
  // Generar opciones incorrectas
  const generateOptions = () => {
    const options = [correctAnswer]
    while (options.length < 4) {
      let wrongAnswer: number
      if (question === 'perimetro') {
        wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10
      } else {
        wrongAnswer = correctAnswer + Math.floor(Math.random() * 40) - 20
      }
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer)
      }
    }
    return options.sort(() => Math.random() - 0.5)
  }
  
  options = generateOptions()
  
  return {
    figure,
    dimensions,
    question,
    correctAnswer,
    options
  }
}

const getFigureDisplay = (figure: string, dimensions: { base?: number; altura?: number; lado?: number }) => {
  switch (figure) {
    case 'rectangulo':
      return `Rectángulo ${dimensions.base} × ${dimensions.altura}`
    case 'cuadrado':
      return `Cuadrado de lado ${dimensions.lado}`
    case 'triangulo':
      return `Triángulo base ${dimensions.base}, altura ${dimensions.altura}`
    default:
      return ''
  }
}

const getQuestionText = (question: string) => {
  return question === 'perimetro' ? 'perímetro' : 'área'
}

export default function RompecabezasGeometricoClient() {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [timeLeft, setTimeLeft] = useState(45)
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<GeometricProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const startGame = useCallback(() => {
    setGameState('playing')
    setTimeLeft(45)
    setScore(0)
    setProblemsSolved(0)
    setCurrentProblem(generateGeometricProblem())
    setSelectedAnswer(null)
    setFeedback(null)
  }, [])

  const checkAnswer = useCallback((answer: number) => {
    if (gameState !== 'playing' || !currentProblem) return
    
    setSelectedAnswer(answer)
    
    if (answer === currentProblem.correctAnswer) {
      setFeedback('correct')
      setScore(prev => prev + 1)
      setProblemsSolved(prev => prev + 1)
    } else {
      setFeedback('incorrect')
    }
    
    // Siguiente problema después de un breve delay
    setTimeout(() => {
      if (gameState === 'playing') {
        setCurrentProblem(generateGeometricProblem())
        setSelectedAnswer(null)
        setFeedback(null)
      }
    }, 1500)
  }, [gameState, currentProblem])

  const resetGame = useCallback(() => {
    setGameState('waiting')
    setTimeLeft(45)
    setScore(0)
    setCurrentProblem(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setProblemsSolved(0)
  }, [])

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('finished')
    }
  }, [gameState, timeLeft])

  const getRankInfo = (score: number) => {
    if (score <= 3) return { rank: 'Principiante', emoji: '🌱', color: 'text-green-600' }
    if (score <= 7) return { rank: 'Geómetra', emoji: '📐', color: 'text-blue-600' }
    if (score <= 12) return { rank: 'Experto', emoji: '🎯', color: 'text-purple-600' }
    return { rank: 'Genio Geométrico', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)

  return (
    <GameLayout
      title="Rompecabezas Geométrico Simple"
      description="Calcula perímetros y áreas de figuras geométricas simples. ¡Desafía tu conocimiento de geometría básica!"
      introduction="Te mostraremos figuras geométricas simples (rectángulos, cuadrados y triángulos) y tendrás que calcular su perímetro o área. ¡Tienes 45 segundos!"
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
      currentGamePath="/juegos-matematicos/rompecabezas-geometrico"
    >
      {gameState === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Calcula Perímetros y Áreas!
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Te mostraremos figuras geométricas simples (rectángulos, cuadrados y triángulos) 
            y tendrás que calcular su perímetro o área. ¡Tienes 45 segundos!
          </p>
          <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            <Play className="w-5 h-5 mr-2" />
            Comenzar Juego
          </Button>
        </div>
      )}

      {gameState === 'playing' && currentProblem && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {getFigureDisplay(currentProblem.figure, currentProblem.dimensions)}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                ¿Cuál es el <strong>{getQuestionText(currentProblem.question)}</strong>?
              </p>
              
              {/* Visual representation */}
              <div className="mb-6 flex justify-center">
                {currentProblem.figure === 'rectangulo' && currentProblem.dimensions.base && currentProblem.dimensions.altura && (
                  <div 
                    className="border-2 border-blue-600 bg-blue-100 flex items-center justify-center text-sm font-bold"
                    style={{ 
                      width: `${Math.min(currentProblem.dimensions.base * 20, 120)}px`, 
                      height: `${Math.min(currentProblem.dimensions.altura * 20, 80)}px` 
                    }}
                  >
                    {currentProblem.dimensions.base} × {currentProblem.dimensions.altura}
                  </div>
                )}
                {currentProblem.figure === 'cuadrado' && currentProblem.dimensions.lado && (
                  <div 
                    className="border-2 border-blue-600 bg-blue-100 flex items-center justify-center text-sm font-bold"
                    style={{ 
                      width: `${Math.min(currentProblem.dimensions.lado * 20, 100)}px`, 
                      height: `${Math.min(currentProblem.dimensions.lado * 20, 100)}px` 
                    }}
                  >
                    {currentProblem.dimensions.lado}
                  </div>
                )}
                {currentProblem.figure === 'triangulo' && currentProblem.dimensions.base && currentProblem.dimensions.altura && (
                  <div className="relative">
                    <div 
                      className="border-l-2 border-b-2 border-blue-600 bg-blue-100"
                      style={{ 
                        width: `${Math.min(currentProblem.dimensions.base * 15, 100)}px`, 
                        height: `${Math.min(currentProblem.dimensions.altura * 15, 80)}px`,
                        clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)'
                      }}
                    />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                      {currentProblem.dimensions.base} × {currentProblem.dimensions.altura}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {currentProblem.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => checkAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`h-16 text-lg font-bold transition-all ${
                  selectedAnswer === option
                    ? feedback === 'correct'
                      ? 'bg-green-500 hover:bg-green-500 text-white'
                      : 'bg-red-500 hover:bg-red-500 text-white'
                    : selectedAnswer !== null && option === currentProblem.correctAnswer
                    ? 'bg-green-500 hover:bg-green-500 text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {feedback && (
            <div className="text-center">
              {feedback === 'correct' ? (
                <div className="flex items-center justify-center text-green-600 text-xl font-bold">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  ¡Correcto!
                </div>
              ) : (
                <div className="flex items-center justify-center text-red-600 text-xl font-bold">
                  <XCircle className="w-6 h-6 mr-2" />
                  Incorrecto
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Juego Terminado!
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="text-4xl mb-2">{rankInfo.emoji}</div>
            <div className={`text-2xl font-bold ${rankInfo.color} mb-2`}>
              {rankInfo.rank}
            </div>
            <div className="text-lg text-gray-700 mb-4">
              Resolviste <strong>{score}</strong> problemas correctamente
            </div>
            <div className="text-sm text-gray-600">
              de {problemsSolved} problemas totales
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Jugar de Nuevo
            </Button>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>
      )}
    </GameLayout>
  )
}
