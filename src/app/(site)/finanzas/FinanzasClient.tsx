"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { TrendingUp, Home, Car, Target, DollarSign } from 'lucide-react'

const finanzasCluster = SITE.clusters.finanzas

export default function FinanzasClient() {
  const customIcons = {
    '/finanzas/interes-simple/': TrendingUp,
    '/finanzas/hipoteca/': Home,
    '/finanzas/depreciacion-vehiculos/': Car,
    '/finanzas/ahorro-objetivo/': Target,
    '/finanzas/valor-futuro-presente/': DollarSign,
    '/finanzas/ipc/': DollarSign
  }

  const customStats = [
    {
      icon: TrendingUp,
      value: finanzasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: TrendingUp,
      value: '100%',
      label: 'Gratuitas',
      color: 'green' as const
    },
    {
      icon: DollarSign,
      value: 'Precisas',
      label: 'Cálculos Financieros',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es el interés simple?",
      answer: "El interés simple es el interés que se calcula únicamente sobre el capital inicial, sin considerar los intereses acumulados de períodos anteriores. Es ideal para préstamos cortos y operaciones simples."
    },
    {
      question: "¿Cómo se calcula la depreciación de un vehículo?",
      answer: "La depreciación se calcula considerando el valor inicial del vehículo, su vida útil estimada y el método de depreciación (lineal, acelerada, etc.). Nuestra calculadora usa métodos estándar del mercado."
    },
    {
      question: "¿Qué incluye el cálculo de hipoteca?",
      answer: "El cálculo de hipoteca incluye el desglose mensual de capital e intereses, el total de intereses a pagar, y el cronograma de pagos para ayudarte a planificar tu presupuesto."
    },
    {
      question: "¿Para qué sirve el IPC?",
      answer: "El Índice de Precios al Consumidor (IPC) mide la inflación y te ayuda a calcular el poder adquisitivo del dinero en el tiempo, esencial para planificación financiera."
    },
    {
      question: "¿Cómo funciona la calculadora de ahorro objetivo?",
      answer: "Te ayuda a determinar cuánto necesitas ahorrar mensualmente para alcanzar una meta financiera específica en un tiempo determinado, considerando la tasa de interés."
    }
  ]

  return (
    <CategoryPageLayout
      category={finanzasCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
