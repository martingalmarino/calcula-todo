"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, GraduationCap, Fuel, Type, Hash, MousePointer, DollarSign, Users } from 'lucide-react'

const otrasCluster = SITE.clusters.otras

export default function OtrasClient() {
  const customIcons = {
    '/otras/escala-notas/': GraduationCap,
    '/otras/gasto-gasolina/': Fuel,
    '/otras/contador-palabras/': Type,
    '/otras/numeros-romanos/': Hash,
    '/otras/contador-clicks/': MousePointer,
    '/otras/calculadora-propinas/': DollarSign
  }

  const customStats = [
    {
      icon: Calculator,
      value: otrasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: Type,
      value: '6',
      label: 'Herramientas Útiles',
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
      question: "¿Cómo funciona la calculadora de propinas?",
      answer: "Ingresa el monto de la cuenta y el porcentaje de propina deseado. La calculadora te mostrará la propina exacta y el total a pagar."
    },
    {
      question: "¿Puedo contar palabras y caracteres en tiempo real?",
      answer: "Sí, nuestra calculadora cuenta automáticamente palabras, caracteres (con y sin espacios) mientras escribes tu texto."
    },
    {
      question: "¿Cómo convierto números romanos?",
      answer: "Puedes convertir tanto de números arábigos a romanos como de romanos a arábigos. Soporta números del 1 al 3999."
    },
    {
      question: "¿Qué es el contador de clicks (CPS)?",
      answer: "Es una herramienta para medir tu velocidad de clicks por segundo, útil para juegos y pruebas de destreza."
    },
    {
      question: "¿Cómo calculo el gasto de gasolina?",
      answer: "Ingresa la distancia, el consumo de combustible por kilómetro y el precio por litro para obtener el costo total del viaje."
    }
  ]

  return (
    <CategoryPageLayout
      category={otrasCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}