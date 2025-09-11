"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Gamepad2, Trophy, Clock, LucideIcon } from 'lucide-react'
import { gamesConfig, getGamesStats } from '@/lib/games-config'

// Generar cluster dinámicamente
const generateJuegosMatematicosCluster = () => {
  return {
    title: 'Juegos de Inteligencia Matemática',
    label: 'Juegos de Inteligencia Matemática',
    description: 'Diviértete aprendiendo matemáticas con nuestros juegos educativos. Mejora tu agilidad mental, velocidad de cálculo y comprensión matemática de forma entretenida.',
    href: '/juegos-matematicos',
    calculators: gamesConfig.map(game => ({
      title: game.title,
      label: game.label,
      description: game.description,
      href: game.href,
      category: game.category,
      keywords: game.keywords
    }))
  }
}

export default function JuegosMatematicosClient() {
  const juegosMatematicosCluster = generateJuegosMatematicosCluster()
  const stats = getGamesStats()
  
  // Generar iconos dinámicamente
  const customIcons = gamesConfig.reduce((acc, game) => {
    acc[game.title] = game.icon
    return acc
  }, {} as Record<string, LucideIcon>)

  // Generar estadísticas dinámicamente
  const customStats = [
    {
      icon: Gamepad2,
      value: stats.totalGames.toString(),
      label: 'Juegos Disponibles',
      color: 'blue' as const
    },
    {
      icon: Clock,
      value: stats.timeRangeDisplay,
      label: 'Por Partida',
      color: 'green' as const
    },
    {
      icon: Trophy,
      value: '100%',
      label: 'Gratuito',
      color: 'purple' as const
    }
  ]

  // Generar FAQ dinámicamente
  const gameTypes = [...new Set(gamesConfig.map(game => {
    if (game.difficulty === 'básico') return 'operaciones básicas'
    if (game.difficulty === 'intermedio') return 'lógica matemática'
    return 'álgebra avanzada'
  }))]

  const faqItems = [
    {
      question: "¿Cómo funcionan los juegos de matemáticas?",
      answer: `Cada juego tiene una duración de ${stats.timeRangeDisplay} donde debes resolver la mayor cantidad de problemas matemáticos posibles. Cada acierto suma puntos y al final obtienes un ranking según tu rendimiento.`
    },
    {
      question: "¿Qué tipos de juegos hay disponibles?",
      answer: `Tenemos ${stats.totalGames} juegos diferentes: ${gameTypes.join(', ')}. Cada uno desarrolla habilidades específicas y está diseñado para diferentes niveles de dificultad.`
    },
    {
      question: "¿Los juegos son apropiados para niños?",
      answer: "Sí, todos nuestros juegos están diseñados para ser educativos y apropiados para niños, pero también son divertidos para adultos que quieren mantener su mente ágil."
    },
    {
      question: "¿Puedo jugar en mi móvil?",
      answer: "¡Por supuesto! Todos los juegos están optimizados para funcionar perfectamente en computadora, tablet y móvil."
    },
    {
      question: "¿Hay algún sistema de puntuación?",
      answer: "Sí, cada juego tiene su propio sistema de puntuación y ranking. Puedes obtener desde 'Principiante' hasta 'Genio' según tu rendimiento."
    }
  ]

  return (
    <CategoryPageLayout
      category={juegosMatematicosCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
