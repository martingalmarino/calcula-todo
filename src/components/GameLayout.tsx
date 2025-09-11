"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Trophy, RotateCcw, Play, Calculator, CheckCircle, XCircle, Target, Gamepad2 } from "lucide-react"
import Link from "next/link"

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

  // Introduction Screen - Integrado con el diseño del sitio
  if (showIntroduction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
                {title}
              </h1>
              <p className="text-lg text-blue-700 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">30 Segundos</h3>
                  <p className="text-sm text-gray-600">Tiempo límite por partida</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">Velocidad</h3>
                  <p className="text-sm text-gray-600">Pon a prueba tu agilidad mental</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">3 Niveles</h3>
                  <p className="text-sm text-gray-600">Principiante, Rápido, Genio</p>
                </CardContent>
              </Card>
            </div>

            {/* Start Button */}
            <Button 
              onClick={onStart}
              size="lg"
              className="calculator-button text-lg px-8 py-4"
            >
              <Play className="h-5 w-5 mr-2" />
              Jugar Ahora
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen - Mobile-first design
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Header compacto - Mobile optimized */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <Trophy className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-semibold text-blue-900">Puntos: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${
              timeLeft <= 10 ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <Clock className={`h-4 w-4 ${
                timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'
              }`} />
            </div>
            <span className={`font-bold text-lg ${
              timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso</span>
            <span>Pregunta 1 / 15</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: '6.67%' }}
            ></div>
          </div>
        </div>

        {/* Main Game Card */}
        <Card className="calculator-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-center text-blue-900 mb-6">
              ¿Cuál es el resultado?
            </h2>
            
            {/* Math Equation - Mobile optimized */}
            <div className="space-y-6">
              {children}
            </div>

            {/* Feedback inline */}
            {feedback && (
              <div className={`mt-4 p-4 rounded-lg flex items-center justify-center gap-2 ${
                feedback === 'correct' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {feedback === 'correct' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span className="font-semibold">
                  {feedback === 'correct' ? '¡Correcto! +1 punto' : 'Incorrecto'}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Controls - Mobile optimized */}
        <div className="space-y-3">
          {isActive && (
            <Button 
              onClick={onNext} 
              variant="outline"
              size="lg"
              className="w-full"
            >
              Siguiente Pregunta
            </Button>
          )}
          <Button 
            onClick={onReset} 
            variant="outline"
            size="lg"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar Juego
          </Button>
        </div>

        {/* Game Result - Sin overlay, inline */}
        {gameResult && (
          <Card className="calculator-card mt-6 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{gameResult.emoji}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                ¡Juego Terminado!
              </h3>
              <p className="text-green-700 mb-4">
                Puntuación: {gameResult.points} puntos - Nivel: {gameResult.rank}
              </p>
              <Button 
                onClick={onReset} 
                size="lg"
                className="calculator-button"
              >
                <Play className="h-4 w-4 mr-2" />
                Jugar de Nuevo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Juegos Relacionados */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
            Otros Juegos de Matemáticas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/juegos-matematicos/numero-faltante/">
              <Card className="calculator-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Número Faltante</h4>
                      <p className="text-sm text-gray-600">Encuentra el número que falta en la ecuación</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/juegos-matematicos/fracciones/">
              <Card className="calculator-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Gamepad2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Fracciones Visuales</h4>
                      <p className="text-sm text-gray-600">Selecciona la pizza que representa la fracción</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}