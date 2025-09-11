"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Trophy, RotateCcw, Play } from "lucide-react"

interface GameLayoutProps {
  title: string
  description: string
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
}

export function GameLayout({
  title,
  description,
  children,
  onStart,
  onReset,
  onNext,
  isActive,
  timeLeft,
  score,
  feedback,
  gameResult
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {title}
          </CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          {/* Timer and Score */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5" />
              <span aria-live="polite">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Trophy className="h-5 w-5" />
              <span aria-live="polite">{score} puntos</span>
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex gap-3 mb-6">
            {!isActive && timeLeft === 30 && (
              <Button onClick={onStart} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Iniciar Juego
              </Button>
            )}
            {isActive && (
              <Button onClick={onNext} variant="outline" className="flex items-center gap-2">
                Siguiente Pregunta
              </Button>
            )}
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reiniciar
            </Button>
          </div>

          {/* Feedback */}
          {feedback && (
            <Alert className={`mb-4 ${feedback === 'correct' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <AlertDescription className={feedback === 'correct' ? 'text-green-700' : 'text-red-700'}>
                {feedback === 'correct' ? '✅ ¡Correcto!' : '❌ Incorrecto'}
              </AlertDescription>
            </Alert>
          )}

          {/* Game Content */}
          <div className="min-h-[200px]">
            {children}
          </div>
        </CardContent>
      </Card>

      {/* Game Result */}
      {gameResult && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              ¡Juego Terminado! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl">{gameResult.emoji}</div>
            <div className="text-xl font-semibold">
              Puntuación: {gameResult.points} puntos
            </div>
            <div className={`text-2xl font-bold ${getRankInfo(gameResult.points).color}`}>
              {gameResult.rank} {gameResult.emoji}
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={onReset} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Jugar de Nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
