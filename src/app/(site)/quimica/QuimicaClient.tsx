"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, FlaskRound, Atom, Zap, Droplets, Wind, Users } from 'lucide-react'

const quimicaCluster = SITE.clusters.quimica

export default function QuimicaClient() {
  const customIcons = {
    '/quimica/ph/': FlaskRound,
    '/quimica/molaridad/': FlaskRound,
    '/quimica/gases-ideales/': Wind,
    '/quimica/masa-molar/': Atom,
    '/quimica/energia-enlace/': Zap,
    '/quimica/diluciones/': Droplets
  }

  const customStats = [
    {
      icon: Calculator,
      value: quimicaCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: FlaskRound,
      value: '6',
      label: 'Herramientas Químicas',
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
      question: "¿Son precisas las calculadoras químicas?",
      answer: "Nuestras calculadoras utilizan fórmulas químicas estándar y constantes reconocidas. Son herramientas educativas y de referencia para estudiantes y profesionales."
    },
    {
      question: "¿Puedo usar estas calculadoras para trabajos de laboratorio?",
      answer: "Estas calculadoras son herramientas de apoyo educativo. Para trabajos de laboratorio reales, siempre verifica los resultados con métodos estándar y consulta con tu supervisor."
    },
    {
      question: "¿Qué incluye la calculadora de pH?",
      answer: "La calculadora de pH calcula el pH a partir de la concentración de iones hidrógeno [H⁺] usando la fórmula pH = -log[H⁺] e indica si la solución es ácida, neutra o básica."
    },
    {
      question: "¿Cómo funciona la calculadora de molaridad?",
      answer: "La calculadora de molaridad calcula la concentración molar (M) dividiendo moles de soluto entre litros de solución, e incluye conversión de gramos a moles usando masa molar."
    },
    {
      question: "¿Qué es la ley de gases ideales?",
      answer: "La ley de gases ideales (PV = nRT) relaciona presión, volumen, número de moles y temperatura de un gas ideal. R es la constante universal de los gases."
    },
    {
      question: "¿Cómo calcula la masa molar?",
      answer: "La calculadora de masa molar suma las masas atómicas de todos los elementos en una fórmula química, multiplicadas por sus respectivos subíndices."
    }
  ]

  return (
    <CategoryPageLayout
      category={quimicaCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
