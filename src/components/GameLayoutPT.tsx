"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Trophy, RotateCcw, Play, Calculator, CheckCircle, XCircle, Target, Gamepad2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

interface GameLayoutPTProps {
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
  currentGamePath?: string // Para excluir o jogo atual dos relacionados
}

export function GameLayoutPT({
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
}: GameLayoutPTProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRankInfo = (points: number) => {
    if (points >= 15) return { rank: 'Gênio', emoji: '🤯', color: 'text-purple-600' }
    if (points >= 8) return { rank: 'Rápido', emoji: '⚡', color: 'text-blue-600' }
    return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
  }

  // Gerar jogos relacionados aleatórios (apenas uma vez por sessão)
  const relatedGames = useMemo(() => {
    const allGames = [
      {
        path: '/pt/jogos-matematicos/soma-subtracao/',
        title: 'Soma e Subtração',
        description: 'Resolva operações contra o tempo',
        icon: Calculator
      },
      {
        path: '/pt/jogos-matematicos/numero-faltante/',
        title: 'Número Faltante',
        description: 'Encontre o número que falta na equação',
        icon: Target
      },
      {
        path: '/pt/jogos-matematicos/fracoes/',
        title: 'Frações Visuais',
        description: 'Selecione a pizza que representa a fração',
        icon: Gamepad2
      },
      {
        path: '/pt/jogos-matematicos/multiplos-divisores/',
        title: 'Múltiplos e Divisores',
        description: 'Identifique múltiplos e divisores rapidamente',
        icon: Target
      },
      {
        path: '/pt/jogos-matematicos/percentuais/',
        title: 'Percentuais',
        description: 'Calcule descontos e aumentos',
        icon: Calculator
      },
      {
        path: '/pt/jogos-matematicos/sequencias/',
        title: 'Sequências Numéricas',
        description: 'Complete padrões matemáticos',
        icon: TrendingUp
      }
    ]

    // Filtrar o jogo atual
    const availableGames = allGames.filter(game => game.path !== currentGamePath)
    
    // Misturar e pegar 2 aleatórios
    const shuffled = availableGames.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 2)
  }, [currentGamePath])

  // Introduction Screen - Integrado com o design do site
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
                  <p className="text-sm text-gray-600">Tempo limite por partida</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">Velocidade</h3>
                  <p className="text-sm text-gray-600">Teste sua agilidade mental</p>
                </CardContent>
              </Card>
              <Card className="calculator-card">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 mb-2">3 Níveis</h3>
                  <p className="text-sm text-gray-600">Iniciante, Rápido, Gênio</p>
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
              Jogar Agora
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
            <span className="font-semibold text-blue-900">Pontos: {score}</span>
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
            <span>Progresso</span>
            <span>Pergunta {currentQuestion} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Game Card */}
        <Card className="calculator-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-center text-blue-900 mb-6">
              Qual é o resultado?
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
                  {feedback === 'correct' ? 'Correto! +1 ponto' : 'Incorreto'}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Controls - Mobile optimized */}
        <div className="space-y-3">
          <Button 
            onClick={onReset} 
            variant="outline"
            size="lg"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar Jogo
          </Button>
        </div>

        {/* Game Result - Sem overlay, inline */}
        {gameResult && (
          <Card className="calculator-card mt-6 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{gameResult.emoji}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Jogo Terminado!
              </h3>
              <p className="text-green-700 mb-4">
                Pontuação: {gameResult.points} pontos - Nível: {gameResult.rank}
              </p>
              <Button 
                onClick={onReset} 
                size="lg"
                className="calculator-button"
              >
                <Play className="h-4 w-4 mr-2" />
                Jogar de Novo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Jogos Relacionados */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
            Outros Jogos de Matemática
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