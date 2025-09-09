"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Circle, RectangleHorizontal, Triangle, Square, Diamond, Hexagon, BookOpen, Users } from 'lucide-react'

const geometriaCluster = SITE.clusters.geometria

export function GeometriaClient() {
  const customIcons = {
    '/geometria/circulo/': Circle,
    '/geometria/rectangulo/': RectangleHorizontal,
    '/geometria/triangulo/': Triangle,
    '/geometria/cuadrado/': Square,
    '/geometria/rombo/': Diamond,
    '/geometria/trapecio/': Hexagon
  }

  const customStats = [
    {
      icon: Circle,
      value: geometriaCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '6',
      label: 'Figuras Geométricas',
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
      question: "¿Son gratuitas todas las calculadoras de geometría?",
      answer: "Sí, todas nuestras calculadoras geométricas son completamente gratuitas. No requieren registro ni tienen límites de uso."
    },
    {
      question: "¿Qué figuras geométricas puedo calcular?",
      answer: "Ofrecemos calculadoras para círculos, rectángulos, triángulos, cuadrados, rombos y trapecios. Cada una incluye múltiples métodos de cálculo."
    },
    {
      question: "¿Cómo funcionan las fórmulas mostradas?",
      answer: "Cada calculadora muestra las fórmulas utilizadas y el proceso paso a paso para que puedas entender cómo se llega al resultado."
    },
    {
      question: "¿Puedo calcular con diferentes unidades de medida?",
      answer: "Las calculadoras trabajan con las unidades que ingreses (cm, m, pulgadas, etc.) y muestran los resultados en las mismas unidades."
    },
    {
      question: "¿Los resultados son precisos?",
      answer: "Sí, utilizamos fórmulas matemáticas precisas y probadas. Para cálculos críticos siempre recomendamos verificar los resultados manualmente."
    }
  ]

  return (
    <CategoryPageLayout
      category={geometriaCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
