"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, ArrowUp, Brain, Gamepad2 } from 'lucide-react'

export default function GamesPromoBanner() {
  const featuredGames = [
    {
      title: 'Sumas y Restas',
      icon: Zap,
      href: '/juegos-matematicos/sumas-restas',
      description: 'Velocidad mental'
    },
    {
      title: 'Mayor o Menor',
      icon: ArrowUp,
      href: '/juegos-matematicos/mayor-menor',
      description: 'Comparación rápida'
    },
    {
      title: 'Patrones Lógicos',
      icon: Brain,
      href: '/juegos-matematicos/patrones-logicos',
      description: 'Razonamiento abstracto'
    }
  ]

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 px-4 rounded-2xl shadow-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="h-8 w-8 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold">
              ¡NUEVA SECCIÓN!
            </h2>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-blue-100 mb-2">
            Juegos de Inteligencia Matemática
          </h3>
          <p className="text-blue-200 text-lg">
            Desafía tu mente con 13 juegos educativos interactivos
          </p>
        </div>

        {/* Featured Games Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredGames.map((game, index) => {
            const IconComponent = game.icon
            return (
              <Link
                key={index}
                href={game.href}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-center">
                  <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <IconComponent className="h-8 w-8 text-yellow-300 mx-auto" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                    {game.title}
                  </h4>
                  <p className="text-blue-200 text-sm">
                    {game.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/juegos-matematicos">
                <Gamepad2 className="h-5 w-5 mr-2" />
                Explorar 13 Juegos
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/juegos-matematicos/sumas-restas">
                <Zap className="h-5 w-5 mr-2" />
                Comenzar a Jugar
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>3 niveles de dificultad</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>30s-60s por juego</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>100% gratuito</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
