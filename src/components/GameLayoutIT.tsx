"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Trophy, RotateCcw, Play, Calculator, CheckCircle, XCircle, Target, Gamepad2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

interface GameLayoutProps {
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
  gameResult: {
    points: number
    rank: string
    emoji: string
  } | null
  showIntroduction: boolean
  currentQuestion: number
  totalQuestions: number
  currentGamePath?: string // Para excluir el juego actual de los relacionados
}

export function GameLayoutIT({
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
  gameResult,
  showIntroduction,
  currentQuestion,
  totalQuestions,
  currentGamePath
}: GameLayoutProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRankInfo = (points: number) => {
    if (points >= 15) return { rank: 'Genio', emoji: '🤯', color: 'text-purple-600' }
    if (points >= 8) return { rank: 'Veloce', emoji: '⚡', color: 'text-blue-600' }
    return { rank: 'Principiante', emoji: '🌱', color: 'text-green-600' }
  }

  // Generar juegos relacionados aleatorios (solo una volta per sessione)
  const relatedGames = useMemo(() => {
    const allGames = [
      {
        path: '/it/giochi-matematici/somme-sottrazioni/',
        title: 'Somme e Sottrazioni',
        description: 'Risolvi operazioni contro il tempo',
        icon: Calculator
      },
      {
        path: '/it/giochi-matematici/numero-mancante/',
        title: 'Numero Mancante',
        description: 'Trova il numero che manca nell\'equazione',
        icon: Target
      },
      {
        path: '/it/giochi-matematici/frazioni/',
        title: 'Frazioni Visuali',
        description: 'Seleziona la pizza che rappresenta la frazione',
        icon: Gamepad2
      },
      {
        path: '/it/giochi-matematici/multipli-divisori/',
        title: 'Multipli e Divisori',
        description: 'Identifica multipli e divisori rapidamente',
        icon: Target
      },
      {
        path: '/it/giochi-matematici/percentuali/',
        title: 'Percentuali',
        description: 'Calcola sconti e aumenti',
        icon: Calculator
      },
      {
        path: '/it/giochi-matematici/sequenze/',
        title: 'Sequenze Numeriche',
        description: 'Completa pattern matematici',
        icon: TrendingUp
      }
    ]

    // Filtrare il gioco attuale
    const availableGames = allGames.filter(game => game.path !== currentGamePath)
    
    // Mescolare e prendere 2 casuali
    const shuffled = availableGames.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 2)
  }, [currentGamePath])

  // Schermata di Introduzione - Integrata con il design del sito
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
                  <h3 className="font-semibold text-blue-900 mb-2">30 Secondi</h3>
                  <p className="text-sm text-gray-600">Tempo limite per partita</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">Velocità</h3>
                  <p className="text-sm text-gray-600">Metti alla prova la tua agilità mentale</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">3 Livelli</h3>
                  <p className="text-sm text-gray-600">Principiante, Veloce, Genio</p>
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
              Gioca Ora
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Schermata di Gioco - Design mobile-first
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Header compatto - Ottimizzato per mobile */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <Trophy className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-semibold text-blue-900">Punti: {score}</span>
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

        {/* Indicatore di progresso */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>Domanda {currentQuestion} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Carta Principale del Gioco */}
        <Card className="calculator-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-center text-blue-900 mb-6">
              Qual è il risultato?
            </h2>
            
            {/* Equazione Matematica - Ottimizzata per mobile */}
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
                  {feedback === 'correct' ? 'Corretto! +1 punto' : 'Sbagliato'}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controlli del Gioco - Ottimizzati per mobile */}
        <div className="space-y-3">
          <Button 
            onClick={onReset} 
            variant="outline"
            size="lg"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reinizia Gioco
          </Button>
        </div>

        {/* Risultato del Gioco - Senza overlay, inline */}
        {gameResult && (
          <Card className="calculator-card mt-6 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{gameResult.emoji}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Gioco Terminato!
              </h3>
              <p className="text-green-700 mb-4">
                Punteggio: {gameResult.points} punti - Livello: {gameResult.rank}
              </p>
              <Button 
                onClick={onReset} 
                size="lg"
                className="calculator-button"
              >
                <Play className="h-4 w-4 mr-2" />
                Gioca di Nuovo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Giochi Correlati */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
            Altri Giochi di Matematica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedGames.map((game, index) => {
              const IconComponent = game.icon
              return (
                <Link key={index} href={game.path}>
                  <Card className="calculator-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">{game.title}</h4>
                          <p className="text-sm text-gray-600">{game.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
