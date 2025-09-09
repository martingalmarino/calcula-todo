"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, Coffee, Pizza, Heart, Tv, Thermometer, Dog, Beer, Bus, Turtle, Users } from 'lucide-react'

const curiosasCluster = SITE.clusters.curiosas

export function CuriosasClient() {
  const customIcons = {
    '/curiosas/cafe-ahorro/': Coffee,
    '/curiosas/pizza-persona/': Pizza,
    '/curiosas/expectativa-comida/': Heart,
    '/curiosas/besos-calorias/': Heart,
    '/curiosas/tiempo-peliculas/': Tv,
    '/curiosas/nivel-friolento/': Thermometer,
    '/curiosas/edad-mascota/': Dog,
    '/curiosas/cerveza-fiesta/': Beer,
    '/curiosas/tiempo-transporte/': Bus,
    '/curiosas/expectativa-animales/': Turtle,
    '/curiosas/calculadora-amor/': Heart,
    '/curiosas/tiempo-netflix/': Tv
  }

  const customStats = [
    {
      icon: Calculator,
      value: curiosasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: Heart,
      value: '12',
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
      question: "¿Qué son las calculadoras curiosas?",
      answer: "Son calculadoras divertidas y originales que te permiten calcular cosas inusuales como el costo de café a largo plazo, cuántas pizzas necesitas para una fiesta, o cuántos besos quemas calorías."
    },
    {
      question: "¿Son precisas estas calculadoras?",
      answer: "Estas calculadoras están diseñadas para entretenimiento y curiosidad. Los resultados son aproximaciones basadas en datos generales y no deben tomarse como datos científicos exactos."
    },
    {
      question: "¿Puedo usar estas calculadoras para decisiones importantes?",
      answer: "No recomendamos usar estas calculadoras para decisiones importantes. Son herramientas de entretenimiento y curiosidad, no para planificación seria."
    },
    {
      question: "¿Cómo funciona la calculadora de amor?",
      answer: "Es una calculadora divertida que combina diferentes factores para generar un porcentaje de compatibilidad. Es solo para entretenimiento."
    },
    {
      question: "¿Qué calculadoras de tiempo incluyen?",
      answer: "Incluimos calculadoras para estimar tiempo de vida en películas, tiempo en transporte público, tiempo en Netflix, y otras métricas curiosas de tiempo."
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