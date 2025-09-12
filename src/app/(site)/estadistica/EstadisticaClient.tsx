"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { BarChart3, Calculator, BookOpen, Users, TrendingUp, Target, PieChart } from 'lucide-react'

const estadisticaCluster = SITE.clusters.estadistica

export default function EstadisticaClient() {
  const customIcons = {
    '/estadistica/media-aritmetica/': BarChart3,
    '/estadistica/mediana/': BarChart3,
    '/estadistica/moda/': BarChart3,
    '/estadistica/varianza-desviacion/': TrendingUp,
    '/estadistica/probabilidad-simple/': Target,
    '/estadistica/regla-tres/': PieChart
  }

  const customStats = [
    {
      icon: Calculator,
      value: '6',
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '4+',
      label: 'Categorías Estadísticas',
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
      question: '¿Qué es la media aritmética?',
      answer: 'La media aritmética es el promedio de un conjunto de números, calculado sumando todos los valores y dividiendo entre la cantidad de elementos.'
    },
    {
      question: '¿Cuál es la diferencia entre mediana y moda?',
      answer: 'La mediana es el valor central cuando los datos están ordenados, mientras que la moda es el valor que más se repite en el conjunto.'
    },
    {
      question: '¿Cuándo usar población vs muestra en varianza?',
      answer: 'Usa población cuando tienes todos los datos del grupo completo, y muestra cuando trabajas con una parte representativa de la población.'
    },
    {
      question: '¿Cómo se calcula la probabilidad simple?',
      answer: 'La probabilidad simple se calcula dividiendo el número de casos favorables entre el número total de casos posibles.'
    },
    {
      question: '¿Para qué sirve la regla de tres en estadística?',
      answer: 'La regla de tres es útil para calcular proporciones, extrapolar datos de encuestas y hacer estimaciones basadas en muestras.'
    }
  ]

  return (
    <CategoryPageLayout
      category={estadisticaCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
