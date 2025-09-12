"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, BookOpen, Users, Zap, Activity, Battery, Lightbulb, Globe } from 'lucide-react'

const fisicaCluster = SITE.clusters.fisica

export function FisicaClient() {
  const customIcons = {
    '/fisica/velocidad/': Zap,
    '/fisica/fuerza/': Activity,
    '/fisica/energia-cinetica/': Battery,
    '/fisica/potencia/': Lightbulb,
    '/fisica/ley-ohm/': Zap,
    '/fisica/gravedad/': Globe
  }

  const customStats = [
    {
      icon: Calculator,
      value: fisicaCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '4+',
      label: 'Áreas de Física',
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
      question: "¿Son gratuitas todas las calculadoras de física?",
      answer: "Sí, todas nuestras calculadoras de física son completamente gratuitas. No requieren registro ni tienen límites de uso."
    },
    {
      question: "¿Qué unidades de medida soportan las calculadoras?",
      answer: "Las calculadoras soportan las unidades del Sistema Internacional (SI): metros, kilogramos, segundos, Newtons, Joules, Watts, Voltios, Amperios y Ohmios."
    },
    {
      question: "¿Puedo usar las calculadoras para tareas escolares?",
      answer: "¡Absolutamente! Nuestras calculadoras están diseñadas para estudiantes y profesionales. Incluyen explicaciones paso a paso y fórmulas detalladas."
    },
    {
      question: "¿Las calculadoras muestran las fórmulas utilizadas?",
      answer: "Sí, cada calculadora muestra la fórmula aplicada y el proceso de cálculo paso a paso para facilitar el aprendizaje."
    },
    {
      question: "¿Qué áreas de física cubren las calculadoras?",
      answer: "Cubrimos mecánica (velocidad, fuerza), energía (cinética, potencia), electricidad (ley de Ohm) y gravitación (fuerza gravitatoria)."
    }
  ]

  return (
    <CategoryPageLayout
      category={fisicaCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
