"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, Heart, Activity, Scale, Zap, Droplets, Calendar, Users, Timer, Bike, Dumbbell } from 'lucide-react'

const saludCluster = SITE.clusters.salud

export default function SaludClient() {
  const customIcons = {
    '/salud/imc/': Scale,
    '/salud/tmb/': Activity,
    '/salud/grasa-corporal/': Heart,
    '/salud/pafi/': Zap,
    '/salud/agua-diaria/': Droplets,
    '/salud/ovulacion/': Calendar,
    '/salud/necesidades-energeticas/': Zap,
    '/salud/fecha-concepcion/': Heart,
    '/salud/calorias-deporte/': Activity,
    '/salud/ritmo-carrera/': Timer,
    '/salud/velocidad-ciclismo/': Bike,
    '/salud/1rm/': Dumbbell
  }

  const customStats = [
    {
      icon: Calculator,
      value: saludCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: Heart,
      value: '12',
      label: 'Herramientas de Salud',
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
      question: "¿Son precisas las calculadoras de salud?",
      answer: "Nuestras calculadoras utilizan fórmulas médicas estándar y reconocidas. Sin embargo, son herramientas informativas y no reemplazan la consulta médica profesional."
    },
    {
      question: "¿Puedo usar estos resultados para diagnóstico médico?",
      answer: "No. Estas calculadoras son solo herramientas informativas. Siempre consulta con un profesional de la salud para diagnósticos y tratamientos médicos."
    },
    {
      question: "¿Qué incluye la calculadora de IMC?",
      answer: "La calculadora de IMC evalúa tu índice de masa corporal y te proporciona información sobre tu categoría de peso según estándares médicos internacionales."
    },
    {
      question: "¿Cómo funciona la calculadora de TMB?",
      answer: "La Tasa Metabólica Basal calcula las calorías que tu cuerpo quema en reposo, considerando factores como edad, peso, altura y género."
    },
    {
      question: "¿Son confiables los cálculos de ovulación?",
      answer: "La calculadora de ovulación proporciona estimaciones basadas en ciclos regulares. Para planificación familiar, consulta siempre con un ginecólogo."
    }
  ]

  return (
    <CategoryPageLayout
      category={saludCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}