"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, TrendingUp, Target, DollarSign, BarChart3, MousePointer, Users } from 'lucide-react'

const marketingCluster = SITE.clusters.marketing

export function MarketingClient() {
  const customIcons = {
    '/marketing/cac/': Target,
    '/marketing/ltv/': TrendingUp,
    '/marketing/conversion/': BarChart3,
    '/marketing/presupuesto/': DollarSign,
    '/marketing/cpc-cpm/': MousePointer,
    '/marketing/roi/': TrendingUp
  }

  const customStats = [
    {
      icon: Calculator,
      value: marketingCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: TrendingUp,
      value: '6',
      label: 'Métricas de Marketing',
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
      question: "¿Qué es el CAC (Costo de Adquisición de Cliente)?",
      answer: "El CAC es el costo promedio que gastas para adquirir un nuevo cliente. Se calcula dividiendo el gasto total en marketing entre el número de clientes adquiridos."
    },
    {
      question: "¿Cómo se calcula el LTV (Lifetime Value)?",
      answer: "El LTV es el valor total que un cliente aporta durante toda su relación con tu empresa. Se calcula multiplicando el valor promedio de compra por la frecuencia de compra por la duración promedio del cliente."
    },
    {
      question: "¿Qué incluye la calculadora de conversión?",
      answer: "Te ayuda a calcular tasas de conversión, optimizar embudos de ventas y analizar la efectividad de tus campañas de marketing."
    },
    {
      question: "¿Cómo planifico mi presupuesto de marketing?",
      answer: "Nuestra calculadora te ayuda a distribuir tu presupuesto entre diferentes canales de marketing basándose en tus objetivos y métricas históricas."
    },
    {
      question: "¿Qué es CPC y CPM?",
      answer: "CPC (Costo por Click) es lo que pagas por cada click en tus anuncios. CPM (Costo por Mille) es lo que pagas por cada 1000 impresiones de tu anuncio."
    }
  ]

  return (
    <CategoryPageLayout
      category={marketingCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}