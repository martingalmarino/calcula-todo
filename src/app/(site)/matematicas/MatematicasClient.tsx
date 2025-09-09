"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, BookOpen, Users, Divide, Percent, Zap, X, Triangle, TrendingUp, BarChart3, Hash, FunctionSquare } from 'lucide-react'

const matematicasCluster = SITE.clusters.matematicas

export function MatematicasClient() {
  const customIcons = {
    '/matematicas/fracciones/': Divide,
    '/matematicas/porcentajes/': Percent,
    '/matematicas/potencias-raices/': Zap,
    '/matematicas/algebra/': X,
    '/matematicas/trigonometria/': Triangle,
    '/matematicas/derivadas/': TrendingUp,
    '/matematicas/integrales/': FunctionSquare,
    '/matematicas/matrices/': BarChart3,
    '/matematicas/combinatoria/': Hash,
    '/matematicas/progresiones/': TrendingUp,
    '/matematicas/logaritmos/': FunctionSquare
  }

  const customStats = [
    {
      icon: Calculator,
      value: matematicasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '6+',
      label: 'Categorías Matemáticas',
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
      question: "¿Son gratuitas todas las calculadoras?",
      answer: "Sí, todas nuestras calculadoras matemáticas son completamente gratuitas. No requieren registro ni tienen límites de uso."
    },
    {
      question: "¿Cómo funcionan las explicaciones paso a paso?",
      answer: "Cada calculadora muestra el proceso completo de resolución, incluyendo las fórmulas utilizadas y cada paso del cálculo para que puedas entender cómo se llega al resultado."
    },
    {
      question: "¿Puedo usar estas calculadoras en mi tarea o examen?",
      answer: "Nuestras calculadoras son herramientas educativas. Te recomendamos verificar con tu profesor si está permitido su uso en tareas o exámenes específicos."
    },
    {
      question: "¿Qué tipos de problemas matemáticos puedo resolver?",
      answer: "Ofrecemos calculadoras para aritmética básica, álgebra, trigonometría, cálculo, álgebra lineal, combinatoria, progresiones y logaritmos. Cubrimos desde nivel básico hasta universitario."
    },
    {
      question: "¿Los resultados son precisos?",
      answer: "Sí, utilizamos algoritmos matemáticos precisos y probados. Sin embargo, para cálculos críticos siempre recomendamos verificar los resultados manualmente."
    }
  ]

  return (
    <CategoryPageLayout
      category={matematicasCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}