"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Trophy, RotateCcw, Play, Calculator, CheckCircle, XCircle, Target, Brain, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { getRelatedTrivias } from '@/lib/trivias-config'

interface QuizLayoutProps {
  title: string
  description: string
  introduction: string
  children: React.ReactNode
  onStart: () => void
  onReset: () => void
  isActive: boolean
  timeLeft: number
  score: number
  feedback: 'correct' | 'incorrect' | null
  quizResult: {
    points: number
    rank: string
    emoji: string
  } | null
  showIntroduction: boolean
  currentQuestion: number
  totalQuestions: number
  currentTriviaPath?: string
  relatedCalculator?: string
}

export function QuizLayout({
  title,
  description,
  introduction,
  children,
  onStart,
  onReset,
  isActive,
  timeLeft,
  score,
  feedback,
  quizResult,
  showIntroduction,
  currentQuestion,
  totalQuestions,
  currentTriviaPath,
  relatedCalculator
}: QuizLayoutProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRankInfo = (points: number) => {
    if (points >= 9) return { rank: 'Experto', emoji: '🏆' }
    if (points >= 7) return { rank: 'Avanzado', emoji: '🥇' }
    if (points >= 5) return { rank: 'Intermedio', emoji: '🥈' }
    if (points >= 3) return { rank: 'Principiante', emoji: '🥉' }
    return { rank: 'Aprendiz', emoji: '📚' }
  }

  const relatedTrivias = useMemo(() => {
    if (!currentTriviaPath) return []
    const triviaId = currentTriviaPath.split('/').pop()?.replace('/', '') || ''
    return getRelatedTrivias(triviaId, 2)
  }, [currentTriviaPath])

  if (showIntroduction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900">{title}</h1>
              <p className="text-lg text-blue-700 max-w-2xl mx-auto">{description}</p>
            </div>
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">5 Minutos</h3>
                  <p className="text-sm text-gray-600">Tiempo límite por quiz</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">Conocimiento</h3>
                  <p className="text-sm text-gray-600">Pon a prueba tu sabiduría</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">{totalQuestions} Preguntas</h3>
                  <p className="text-sm text-gray-600">Aprende mientras juegas</p>
                </CardContent>
              </Card>
            </div>
            {/* Start Button */}
            <Button onClick={onStart} size="lg" className="calculator-button text-lg px-8 py-4">
              <Play className="h-5 w-5 mr-2" />
              Comenzar Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
            <div className={`p-2 rounded-full ${timeLeft <= 60 ? 'bg-red-100' : 'bg-blue-100'}`}>
              <Clock className={`h-4 w-4 ${timeLeft <= 60 ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <span className={`font-bold text-lg ${timeLeft <= 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso</span>
            <span>Pregunta {currentQuestion} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Quiz Card */}
        <Card className="calculator-card mb-6">
          <CardContent className="p-6">
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

        {/* Quiz Controls - Mobile optimized */}
        <div className="space-y-3">
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar Quiz
          </Button>
        </div>

        {/* Quiz Result - Sin overlay, inline */}
        {quizResult && (
          <Card className="calculator-card mt-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{quizResult.emoji}</div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                ¡Quiz Completado!
              </h3>
              <p className="text-blue-700 mb-4">
                Puntuación: {quizResult.points} puntos - Nivel: {getRankInfo(quizResult.points).rank}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={onReset}
                  size="lg"
                  className="calculator-button"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Jugar de Nuevo
                </Button>
                {relatedCalculator && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <Link href={relatedCalculator}>
                      <Calculator className="h-4 w-4 mr-2" />
                      Usar Calculadora Relacionada
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trivias Relacionadas */}
        {relatedTrivias.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
              Otras Trivias Interesantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTrivias.map((trivia, index) => {
                const IconComponent = trivia.icon
                return (
                  <Link key={index} href={trivia.href}>
                    <Card className="calculator-card hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-900">{trivia.title}</h4>
                            <p className="text-sm text-gray-600">{trivia.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
