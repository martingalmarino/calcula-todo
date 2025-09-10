"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, Coffee, Pizza, Heart, Tv, Thermometer, Dog, Beer, Bus, Turtle, Users } from 'lucide-react'

const curiosasCluster = {
  name: 'Curiosas',
  label: 'Curiosas',
  description: 'Calculadoras divertidas e originais para descobrir coisas curiosas e inesperadas',
  href: '/pt/curiosas/',
  calculators: [
    {
      name: 'Beijos e Calorias',
      description: 'Calcula as calorias queimadas por beijos, abraços e risadas',
      href: '/pt/curiosas/beijos-calorias/',
      icon: 'heart'
    },
    {
      name: 'Café e Economia',
      description: 'Descubra quanto você pode economizar se parar de tomar café',
      href: '/pt/curiosas/cafe-economia/',
      icon: 'coffee'
    },
    {
      name: 'Calculadora do Amor',
      description: 'Descubra a compatibilidade entre dois nomes',
      href: '/pt/curiosas/calculadora-amor/',
      icon: 'heart'
    },
    {
      name: 'Cerveja e Festa',
      description: 'Calcule quanta cerveja você precisa para sua festa',
      href: '/pt/curiosas/cerveja-festa/',
      icon: 'beer'
    },
    {
      name: 'Idade do Animal',
      description: 'Converta a idade humana para idade de animais de estimação',
      href: '/pt/curiosas/idade-animal/',
      icon: 'dog'
    },
    {
      name: 'Expectativa de Animais',
      description: 'Compare sua idade com a expectativa de vida de diferentes animais',
      href: '/pt/curiosas/expectativa-animais/',
      icon: 'turtle'
    }
  ]
}

export function CuriosasClientPT() {
  const customIcons = {
    '/pt/curiosas/cafe-economia/': Coffee,
    '/pt/curiosas/pizza-pessoa/': Pizza,
    '/pt/curiosas/expectativa-comida/': Heart,
    '/pt/curiosas/beijos-calorias/': Heart,
    '/pt/curiosas/tempo-filmes/': Tv,
    '/pt/curiosas/nivel-friolento/': Thermometer,
    '/pt/curiosas/idade-animal/': Dog,
    '/pt/curiosas/cerveja-festa/': Beer,
    '/pt/curiosas/tempo-transporte/': Bus,
    '/pt/curiosas/expectativa-animais/': Turtle,
    '/pt/curiosas/calculadora-amor/': Heart,
    '/pt/curiosas/tempo-netflix/': Tv
  }

  const customStats = [
    {
      icon: Calculator,
      value: curiosasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: Heart,
      value: '6',
      label: 'Calculadoras Curiosas',
      color: 'green' as const
    },
    {
      icon: Users,
      value: '100%',
      label: 'Gratuito',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "O que são as calculadoras curiosas?",
      answer: "São calculadoras divertidas e originais que permitem calcular coisas incomuns como o custo do café a longo prazo, quantas pizzas você precisa para uma festa, ou quantos beijos queimam calorias."
    },
    {
      question: "Essas calculadoras são precisas?",
      answer: "Essas calculadoras são projetadas para entretenimento e curiosidade. Os resultados são aproximações baseadas em dados gerais e não devem ser considerados como dados científicos exatos."
    },
    {
      question: "Posso usar essas calculadoras para decisões importantes?",
      answer: "Não recomendamos usar essas calculadoras para decisões importantes. São ferramentas de entretenimento e curiosidade, não para planejamento sério."
    },
    {
      question: "Como funciona a calculadora do amor?",
      answer: "É uma calculadora divertida que combina diferentes fatores para gerar uma porcentagem de compatibilidade. É apenas para entretenimento."
    },
    {
      question: "Que calculadoras de tempo incluem?",
      answer: "Incluímos calculadoras para estimar tempo de vida em filmes, tempo em transporte público, tempo no Netflix, e outras métricas curiosas de tempo."
    }
  ]

  return (
    <CategoryPageLayout
      category={curiosasCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
