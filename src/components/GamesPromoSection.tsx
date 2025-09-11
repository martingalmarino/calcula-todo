"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Target, Gamepad2, Play, Trophy, Clock, Brain } from "lucide-react"
import Link from "next/link"

export function GamesPromoSection() {
  const games = [
    {
      id: "sumas-restas",
      title: "Sumas y Restas contra Reloj",
      description: "Resuelve operaciones de suma y resta en 30 segundos. ¡Demuestra tu velocidad mental!",
      icon: Calculator,
      color: "bg-blue-500",
      href: "/juegos-matematicos/sumas-restas",
      features: ["30 segundos", "Velocidad mental", "Operaciones básicas"]
    },
    {
      id: "numero-faltante",
      title: "Encuentra el Número Faltante",
      description: "Encuentra el número que falta en las ecuaciones. ¡Mejora tu comprensión algebraica!",
      icon: Target,
      color: "bg-green-500",
      href: "/juegos-matematicos/numero-faltante",
      features: ["Ecuaciones", "Lógica matemática", "Múltiple opción"]
    },
    {
      id: "fracciones",
      title: "Rompecabezas de Fracciones Visuales",
      description: "Selecciona la pizza que representa la fracción correcta. ¡Aprende fracciones visualmente!",
      icon: Gamepad2,
      color: "bg-purple-500",
      href: "/juegos-matematicos/fracciones",
      features: ["Visual", "Fracciones", "Pizzas SVG"]
    }
  ]

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Brain className="h-4 w-4" />
            ¡Nuevo!
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Juegos de Inteligencia Matemática
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Aprende matemáticas de forma divertida e interactiva. Desafía tu mente con nuestros juegos educativos 
            diseñados para mejorar tu agilidad mental y comprensión matemática.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-600">
                <Trophy className="h-6 w-6" />
                3 Juegos
              </div>
              <p className="text-sm text-gray-500">Diferentes desafíos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
                <Clock className="h-6 w-6" />
                30s
              </div>
              <p className="text-sm text-gray-500">Por partida</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-600">
                <Brain className="h-6 w-6" />
                3 Niveles
              </div>
              <p className="text-sm text-gray-500">De dificultad</p>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {games.map((game) => {
            const IconComponent = game.icon
            return (
              <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Game Icon */}
                  <div className={`${game.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Game Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {game.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Link href={game.href}>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      <Play className="h-4 w-4 mr-2" />
                      Jugar Ahora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <Link href="/juegos-matematicos">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Ver Todos los Juegos
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            ¡Completamente gratis y sin registro!
          </p>
        </div>
      </div>
    </div>
  )
}
