"use client"

import React from 'react'
import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Gamepad2, Trophy, Clock, LucideIcon } from 'lucide-react'
import { gamesConfigPT, getGamesStatsPT } from '@/lib/games-config-pt'
import { jsonLdCollection } from '@/lib/seo'

// Gerar cluster dinamicamente
const generateJogosMatematicosCluster = () => {
  return {
    title: 'Jogos de Inteligência Matemática',
    label: 'Jogos de Inteligência Matemática',
    description: 'Divirta-se aprendendo matemática com nossos jogos educativos. Melhore sua agilidade mental, velocidade de cálculo e compreensão matemática de forma divertida.',
    href: '/pt/jogos-matematicos',
    calculators: gamesConfigPT.map(game => ({
      title: game.title,
      label: game.label,
      description: game.description,
      href: game.href,
      category: game.category,
      keywords: game.keywords
    }))
  }
}

export default function JogosMatematicosClientPT() {
  const jogosMatematicosCluster = generateJogosMatematicosCluster()
  const stats = getGamesStatsPT()
  
  // Gerar ícones dinamicamente
  const customIcons = gamesConfigPT.reduce((acc, game) => {
    acc[game.href] = game.icon
    return acc
  }, {} as Record<string, LucideIcon>)

  // Gerar estatísticas dinamicamente
  const customStats = [
    {
      icon: Gamepad2,
      value: stats.totalGames.toString(),
      label: 'Jogos Disponíveis',
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
      value: '3',
      label: 'Níveis de Dificuldade',
      color: 'purple' as const
    }
  ]

  // FAQ em português
  const faqItems = [
    {
      question: 'Os jogos são realmente gratuitos?',
      answer: 'Sim! Todos os nossos jogos matemáticos são completamente gratuitos. Não há taxas ocultas, assinaturas ou limitações.'
    },
    {
      question: 'Para que idade são adequados estes jogos?',
      answer: 'Nossos jogos são adequados para todas as idades. Temos jogos para iniciantes (crianças) até jogos avançados para adultos que querem desafiar suas habilidades matemáticas.'
    },
    {
      question: 'Posso jogar no celular?',
      answer: 'Absolutamente! Todos os jogos são responsivos e funcionam perfeitamente em computadores, tablets e celulares.'
    },
    {
      question: 'Como funcionam os níveis de dificuldade?',
      answer: 'Temos 3 níveis: Iniciante (jogos básicos), Intermediário (desafios moderados) e Avançado (para gênios da matemática).'
    },
    {
      question: 'Os jogos ajudam a melhorar as habilidades matemáticas?',
      answer: 'Sim! Nossos jogos são projetados para melhorar o cálculo mental, agilidade, lógica e compreensão matemática através da prática divertida.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Jogos de Inteligência Matemática',
            description: 'Jogos educativos de matemática para todas as idades. Melhore sua agilidade mental com nossos jogos gratuitos.',
            url: '/pt/jogos-matematicos',
            calculators: gamesConfigPT.map(game => ({
              name: game.title,
              url: game.href,
              description: game.description
            }))
          }))
        }}
      />
      
      <CategoryPageLayout
        category={jogosMatematicosCluster}
        customIcons={customIcons}
        customStats={customStats}
        faqItems={faqItems}
        breadcrumbs={[
          { label: 'Início', href: '/pt' },
          { label: 'Jogos Matemáticos', href: '/pt/jogos-matematicos' }
        ]}
      />
    </>
  )
}
