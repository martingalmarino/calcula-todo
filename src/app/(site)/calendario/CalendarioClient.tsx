"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, Calendar, Clock, User, Plus, Plane, Users } from 'lucide-react'

const calendarioCluster = SITE.clusters.calendario

export default function CalendarioClient() {
  const customIcons = {
    '/calendario/dias-entre-fechas/': Calendar,
    '/calendario/calculadora-edad/': User,
    '/calendario/sumar-restar-dias/': Plus,
    '/calendario/horas-minutos/': Clock,
    '/calendario/dias-vacaciones/': Plane
  }

  const customStats = [
    {
      icon: Calculator,
      value: calendarioCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: Calendar,
      value: '5',
      label: 'Herramientas de Fecha',
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
      question: "¿Cómo funciona la calculadora de días entre fechas?",
      answer: "Calcula automáticamente la diferencia exacta en días entre dos fechas, incluyendo años bisiestos y diferentes formatos de fecha."
    },
    {
      question: "¿Puedo calcular mi edad exacta?",
      answer: "Sí, nuestra calculadora de edad te muestra tu edad exacta en años, meses y días, considerando años bisiestos."
    },
    {
      question: "¿Cómo sumo o resto días a una fecha?",
      answer: "Ingresa una fecha base y especifica cuántos días quieres sumar o restar. La calculadora maneja automáticamente los cambios de mes y año."
    },
    {
      question: "¿Qué incluye la calculadora de horas y minutos?",
      answer: "Permite sumar, restar y convertir entre horas y minutos, útil para cálculos de tiempo de trabajo, duración de eventos, etc."
    },
    {
      question: "¿Cómo calculo días de vacaciones?",
      answer: "Especifica tu fecha de inicio y fin de vacaciones, y la calculadora te dirá exactamente cuántos días laborables y totales tienes."
    }
  ]

  return (
    <CategoryPageLayout
      category={calendarioCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}