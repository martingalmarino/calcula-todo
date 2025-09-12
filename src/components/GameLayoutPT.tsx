"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Clock, Trophy, RotateCcw, Play, Calculator, CheckCircle, XCircle } from 'lucide-react'
import { getRelatedGamesPT } from '@/lib/games-config-pt'

interface GameLayoutPTProps {
  title: string
  description: string
  introduction?: string
  timeLeft: number
  score: number
  onStart: () => void
  onReset: () => void
  isActive?: boolean
  feedback?: 'correct' | 'incorrect' | null
  gameResult?: {
    points: number
    rank: string
    emoji: string
  } | null
  showIntroduction?: boolean
  currentQuestion?: number
  totalQuestions?: number
  currentGamePath: string
  children: React.ReactNode
}

export function GameLayoutPT({
  title,
  description,
  introduction,
  timeLeft,
  score,
  onStart,
  onReset,
  isActive,
  feedback,
  gameResult,
  showIntroduction,
  currentQuestion,
  totalQuestions,
  currentGamePath,
  children
}: GameLayoutPTProps) {
  const getRankInfo = (finalScore: number) => {
    if (finalScore <= 2) return { rank: 'Iniciante', emoji: '🌱', color: 'text-green-600' }
    if (finalScore <= 4) return { rank: 'Rápido', emoji: '⚡', color: 'text-yellow-600' }
    if (finalScore <= 6) return { rank: 'Especialista', emoji: '🎯', color: 'text-blue-600' }
    return { rank: 'Gênio', emoji: '🧠', color: 'text-red-600' }
  }

  const rankInfo = getRankInfo(score)
  const relatedGames = getRelatedGamesPT(currentGamePath, 2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header com Timer e Pontuação */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Timer */}
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800" aria-live="polite">
                  {timeLeft}s
                </span>
              </div>
              
              {/* Pontuação */}
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800" aria-live="polite">
                  {score} pontos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progresso */}
        {currentQuestion && totalQuestions && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progresso</span>
              <span className="text-sm font-medium text-gray-600">
                Pergunta {currentQuestion} de {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="mb-6">
            {feedback === 'correct' ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Correto! +1 ponto</span>
              </div>
            ) : (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Errado</span>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="mb-8">
          {children}
        </div>

        {/* Resultado do Jogo */}
        {gameResult && (
          <Card className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{gameResult.emoji}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Jogo Terminado!</h2>
              <div className="space-y-2 mb-6">
                <p className="text-xl text-gray-700">
                  <span className="font-semibold">Ponteggio:</span> {gameResult.points} pontos
                </p>
                <p className="text-xl text-gray-700">
                  <span className="font-semibold">Nível:</span> {gameResult.rank}
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={onReset} className="bg-blue-600 hover:bg-blue-700">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar Jogo
                </Button>
                <Button onClick={onStart} className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  Jogar de Novo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Jogos Relacionados */}
        {relatedGames.length > 0 && (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Outros Jogos Matemáticos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedGames.map((game) => (
                  <a
                    key={game.href}
                    href={game.href}
                    className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <game.icon className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{game.label}</h4>
                        <p className="text-sm text-gray-600">{game.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {game.difficulty}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {game.timeRange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
