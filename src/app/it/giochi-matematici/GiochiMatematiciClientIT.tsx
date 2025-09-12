"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Gamepad2, Trophy, Clock, LucideIcon } from 'lucide-react'
import { gamesConfigIT, getGamesStatsIT } from '@/lib/games-config-it'

// Generar cluster dinámicamente
const generateGiochiMatematiciCluster = () => {
  return {
    title: 'Giochi di Intelligenza Matematica',
    label: 'Giochi di Intelligenza Matematica',
    description: 'Divertiti imparando matematica con i nostri giochi educativi. Migliora la tua agilità mentale, velocità di calcolo e comprensione matematica in modo divertente.',
    href: '/it/giochi-matematici',
    calculators: gamesConfigIT.map(game => ({
      title: game.title,
      label: game.label,
      description: game.description,
      href: game.href,
      category: game.category,
      keywords: game.keywords
    }))
  }
}

export default function GiochiMatematiciClientIT() {
  const giochiMatematiciCluster = generateGiochiMatematiciCluster()
  const stats = getGamesStatsIT()
  
  // Generar iconos dinámicamente
  const customIcons = gamesConfigIT.reduce((acc, game) => {
    acc[game.href] = game.icon
    return acc
  }, {} as Record<string, LucideIcon>)

  // Generar estadísticas dinámicamente
  const customStats = [
    {
      icon: Gamepad2,
      value: stats.totalGames.toString(),
      label: 'Giochi Disponibili',
      color: 'blue' as const
    },
    {
      icon: Clock,
      value: '30s-60s',
      label: 'Per Partita',
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
  const gameTypes = [...new Set(gamesConfigIT.map(game => {
    if (game.difficulty === 'facile') return 'operazioni base'
    if (game.difficulty === 'intermedio') return 'logica matematica'
    return 'algebra avanzata'
  }))]

  const faqItems = [
    {
      question: "Come funzionano i giochi di matematica?",
      answer: `Ogni gioco ha una durata di 30-60 secondi dove devi risolvere il maggior numero di problemi matematici possibile. Ogni risposta corretta aggiunge punti e alla fine ottieni un ranking in base alle tue prestazioni.`
    },
    {
      question: "Che tipi di giochi ci sono disponibili?",
      answer: `Abbiamo ${stats.totalGames} giochi diversi: ${gameTypes.join(', ')}. Ognuno sviluppa abilità specifiche ed è progettato per diversi livelli di difficoltà.`
    },
    {
      question: "I giochi sono appropriati per i bambini?",
      answer: "Sì, tutti i nostri giochi sono progettati per essere educativi e appropriati per i bambini, ma sono anche divertenti per gli adulti che vogliono mantenere la mente agile."
    },
    {
      question: "Posso giocare sul mio cellulare?",
      answer: "Certo! Tutti i giochi sono ottimizzati per funzionare perfettamente su computer, tablet e cellulare."
    },
    {
      question: "C'è un sistema di punteggio?",
      answer: "Sì, ogni gioco ha il suo sistema di punteggio e ranking. Puoi ottenere da 'Principiante' fino a 'Genio' in base alle tue prestazioni."
    }
  ]

  return (
    <CategoryPageLayout
      category={giochiMatematiciCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
