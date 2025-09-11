"use client"

import { Button } from "@/components/ui/button"
import { Clock, Trophy, RotateCcw, Play, Zap, Target, Brain, CheckCircle, XCircle } from "lucide-react"

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

  // Introduction Screen - Estilo profesional del artefacto
  if (showIntroduction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 font-inter">
        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
          <div className="text-center max-w-2xl mx-auto">
            {/* Game Logo */}
            <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
              🧮 Matemáticas
            </h1>
            <p className="text-2xl font-medium text-white/90 mb-12">
              {description}
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white text-purple-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">⏱️</div>
                <div className="text-xl font-bold mb-2">30 Segundos</div>
                <div className="text-base text-gray-600">Tiempo límite por partida</div>
              </div>
              <div className="bg-white text-purple-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">⚡</div>
                <div className="text-xl font-bold mb-2">Velocidad</div>
                <div className="text-base text-gray-600">Pon a prueba tu agilidad mental</div>
              </div>
              <div className="bg-white text-purple-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">🏆</div>
                <div className="text-xl font-bold mb-2">3 Niveles</div>
                <div className="text-base text-gray-600">Principiante, Rápido, Genio</div>
              </div>
            </div>

            {/* Start Button */}
            <Button 
              onClick={onStart}
              className="bg-white text-purple-600 text-2xl font-bold px-16 py-6 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide"
            >
              <Play className="h-6 w-6 mr-3" />
              Jugar Ahora
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen - Estilo profesional del artefacto
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 font-inter relative">
      {/* Timer Circular */}
      <div className={`fixed top-6 right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 ${
        timeLeft <= 10 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-white text-purple-600'
      }`}>
        <span className="text-2xl font-bold">{timeLeft}</span>
      </div>
      
      {/* Score Container */}
      <div className="fixed top-6 left-6 bg-white text-purple-600 px-6 py-4 rounded-full shadow-xl z-50">
        <span className="font-bold">Puntos: {score}</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        {/* Question Indicator */}
        <div className="bg-white text-purple-600 text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full text-center mb-12 shadow-lg mx-auto">
          Pregunta 1 / 15
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 h-2 rounded-full overflow-hidden mb-8 backdrop-blur-sm">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 relative"
            style={{ width: '6.67%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-4xl font-bold text-white text-center mb-12 leading-tight">
          ¿Cuál es el resultado?
        </h2>

        {/* Math Container */}
        <div className="bg-white rounded-3xl p-12 mb-12 shadow-2xl text-center">
          {children}
        </div>

        {/* Game Controls */}
        <div className="flex gap-4 justify-center flex-wrap">
          {isActive && (
            <Button 
              onClick={onNext} 
              className="bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Saltar
            </Button>
          )}
          <Button 
            onClick={onReset} 
            className="bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar
          </Button>
        </div>
      </div>

      {/* Feedback Overlay */}
      {feedback && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className={`bg-white p-12 rounded-3xl text-center shadow-2xl animate-in zoom-in duration-500 ${
            feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            <div className="text-6xl mb-4">
              {feedback === 'correct' ? '🎉' : '❌'}
            </div>
            <div className="text-3xl font-bold mb-2">
              {feedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}
            </div>
            <div className="text-xl opacity-90">
              {feedback === 'correct' ? '+1 punto' : 'Inténtalo de nuevo'}
            </div>
          </div>
        </div>
      )}

      {/* Game Result */}
      {gameResult && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white p-12 rounded-3xl text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="text-6xl mb-4">{gameResult.emoji}</div>
            <h3 className="text-3xl font-bold mb-2 text-purple-600">¡Juego Terminado!</h3>
            <div className="text-xl text-gray-600 mb-6">
              Puntuación: {gameResult.points} puntos - Nivel: {gameResult.rank}
            </div>
            <Button 
              onClick={onReset} 
              className="bg-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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