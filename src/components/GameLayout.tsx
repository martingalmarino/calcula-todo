"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          {/* Progress Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-semibold">
              JUEGO DE MATEMÁTICAS
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{description}</p>
          </div>

          {/* Introduction Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-white/20 rounded-full p-4">
                  <Brain className="h-12 w-12" />
                </div>
              </div>
              <p className="text-lg leading-relaxed text-white/95">
                {introduction}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4" />
                  <span>30 segundos</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Target className="h-4 w-4" />
                  <span>Máxima velocidad</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Trophy className="h-4 w-4" />
                  <span>3 niveles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button 
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Play className="h-6 w-6 mr-3" />
              ¡JUGAR AHORA!
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-white/80 text-sm">¡Demuestra tu velocidad mental!</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Clock className="h-6 w-6" />
                <span aria-live="polite">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-white/70 text-xs">Tiempo</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Zap className="h-6 w-6" />
                <span aria-live="polite">{score}</span>
              </div>
              <p className="text-white/70 text-xs">Puntos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Feedback */}
          {feedback && (
            <div className={`mb-6 p-4 rounded-xl text-center font-semibold text-lg ${
              feedback === 'correct' 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-red-100 text-red-800 border-2 border-red-300'
            }`}>
              {feedback === 'correct' ? '✅ ¡Correcto!' : '❌ Incorrecto'}
            </div>
          )}

          {/* Game Content */}
          <div className="min-h-[300px] flex items-center justify-center">
            {children}
          </div>

          {/* Game Controls */}
          <div className="flex gap-4 justify-center mt-8">
            {isActive && (
              <Button 
                onClick={onNext} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Siguiente Pregunta
              </Button>
            )}
            <Button 
              onClick={onReset} 
              variant="outline" 
              className="border-2 border-gray-300 hover:border-gray-400 font-semibold px-6 py-3 rounded-xl"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>
      </div>

      {/* Game Result */}
      {gameResult && (
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-center space-y-6">
            <div className="text-6xl">{gameResult.emoji}</div>
            <h3 className="text-3xl font-bold">¡Juego Terminado!</h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-semibold mb-2">
                Puntuación: {gameResult.points} puntos
              </div>
              <div className={`text-3xl font-bold ${getRankInfo(gameResult.points).color}`}>
                {gameResult.rank} {gameResult.emoji}
              </div>
            </div>
            <Button 
              onClick={onReset} 
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Play className="h-5 w-5 mr-2" />
              Jugar de Nuevo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
