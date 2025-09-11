"use client"

import { Button } from "@/components/ui/button"
import { Clock, Trophy, RotateCcw, Play, Zap, Target, Brain } from "lucide-react"

interface GameLayoutProps {
  title: string
  description: string
  introduction: string
  children: React.ReactNode
  onStart: () => void
  onReset: () => void
  onNext: () => void
  isActive: boolean
  timeLeft: number
  score: number
  feedback: 'correct' | 'incorrect' | null
  gameResult: {
    points: number
    rank: string
    emoji: string
  } | null
  showIntroduction: boolean
}

export function GameLayout({
  title,
  description,
  introduction,
  children,
  onStart,
  onReset,
  onNext,
  isActive,
  timeLeft,
  score,
  feedback,
  gameResult,
  showIntroduction
}: GameLayoutProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRankInfo = (points: number) => {
    if (points >= 15) return { rank: 'Genio', emoji: '🤯', color: 'text-purple-600' }
    if (points >= 8) return { rank: 'Rápido', emoji: '⚡', color: 'text-blue-600' }
    return { rank: 'Principiante', emoji: '🌱', color: 'text-green-600' }
  }

  // Introduction Screen
  if (showIntroduction) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Progress Badge */}
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-xs font-semibold">
                JUEGO DE MATEMÁTICAS
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Introduction Content */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  {introduction}
                </p>
                <div className="flex justify-center gap-2 text-xs">
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 rounded-full px-2 py-1">
                    <Clock className="h-3 w-3" />
                    <span>30s</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 rounded-full px-2 py-1">
                    <Target className="h-3 w-3" />
                    <span>Velocidad</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 rounded-full px-2 py-1">
                    <Trophy className="h-3 w-3" />
                    <span>3 niveles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                onClick={onStart}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Play className="h-4 w-4 mr-2" />
                ¡JUGAR AHORA!
              </Button>
            </div>
          </div>
          
          {/* Related Games Section */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Otros Juegos de Matemáticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Número Faltante</h4>
                    <p className="text-xs text-gray-600">Encuentra el número que falta</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fracciones Visuales</h4>
                    <p className="text-xs text-gray-600">Identifica fracciones con pizzas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-800">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 rounded-full p-1">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-white/80 text-xs">¡Demuestra tu velocidad mental!</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold">
                  <Clock className="h-4 w-4" />
                  <span aria-live="polite">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-white/70 text-xs">Tiempo</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold">
                  <Zap className="h-4 w-4" />
                  <span aria-live="polite">{score}</span>
                </div>
                <p className="text-white/70 text-xs">Puntos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4">
            {/* Feedback */}
            {feedback && (
              <div className={`mb-4 p-3 rounded-lg text-center font-semibold text-sm ${
                feedback === 'correct' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {feedback === 'correct' ? '✅ ¡Correcto!' : '❌ Incorrecto'}
              </div>
            )}

            {/* Game Content */}
            <div className="min-h-[200px] flex items-center justify-center">
              {children}
            </div>

            {/* Game Controls */}
            <div className="flex gap-3 justify-center mt-4">
              {isActive && (
                <Button 
                  onClick={onNext} 
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                >
                  Siguiente
                </Button>
              )}
              <Button 
                onClick={onReset} 
                variant="outline" 
                className="border border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 font-semibold px-4 py-2 rounded-lg text-sm"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reiniciar
              </Button>
            </div>
          </div>
        </div>

        {/* Game Result */}
        {gameResult && (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
            <div className="text-center space-y-4">
              <div className="text-4xl">{gameResult.emoji}</div>
              <h3 className="text-xl font-bold">¡Juego Terminado!</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-lg font-semibold mb-1">
                  Puntuación: {gameResult.points} puntos
                </div>
                <div className={`text-xl font-bold ${getRankInfo(gameResult.points).color}`}>
                  {gameResult.rank} {gameResult.emoji}
                </div>
              </div>
              <Button 
                onClick={onReset} 
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Play className="h-4 w-4 mr-2" />
                Jugar de Nuevo
              </Button>
            </div>
          </div>
        )}

        {/* Related Games Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Otros Juegos de Matemáticas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Número Faltante</h4>
                  <p className="text-xs text-gray-600">Encuentra el número que falta</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fracciones Visuales</h4>
                  <p className="text-xs text-gray-600">Identifica fracciones con pizzas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}