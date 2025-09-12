"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Brain, Trophy, Clock, LucideIcon } from 'lucide-react'
import { triviasConfig, getTriviasStats } from '@/lib/trivias-config'

// Generar cluster dinámicamente
const generateTriviasCluster = () => {
  return {
    title: 'Trivias y Quiz Educativos',
    label: 'Trivias y Quiz Educativos',
    description: 'Pon a prueba tus conocimientos con nuestras trivias educativas. Aprende sobre salud, matemáticas, finanzas y más de forma entretenida.',
    href: '/trivias',
    calculators: triviasConfig.map(trivia => ({
      title: trivia.title,
      label: trivia.label,
      description: trivia.description,
      href: trivia.href,
      category: trivia.category,
      keywords: trivia.keywords
    }))
  }
}

export default function TriviasClient() {
  const triviasCluster = generateTriviasCluster()
  const stats = getTriviasStats()
  
  // Generar iconos dinámicamente
  const customIcons = triviasConfig.reduce((acc, trivia) => {
    acc[trivia.href] = trivia.icon
    return acc
  }, {} as Record<string, LucideIcon>)

  // Generar estadísticas dinámicamente
  const customStats = [
    {
      icon: Brain,
      value: stats.totalTrivias.toString(),
      label: 'Trivias Disponibles',
      color: 'blue' as const
    },
    {
      icon: Clock,
      value: stats.timeRangeDisplay,
      label: 'Por Quiz',
      color: 'green' as const
    },
    {
      icon: Trophy,
      value: `${stats.totalQuestions} preguntas`,
      label: 'Total de Preguntas',
      color: 'purple' as const
    }
  ]

  // Generar FAQ dinámicamente
  const categories = [...new Set(triviasConfig.map(trivia => trivia.category))]

  const faqItems = [
    {
      question: "¿Cómo funcionan las trivias educativas?",
      answer: `Cada trivia tiene una duración de ${stats.timeRangeDisplay} donde debes responder ${stats.avgQuestionsPerTrivia} preguntas en promedio sobre diferentes temas. Cada respuesta correcta suma puntos y al final obtienes un ranking según tu rendimiento.`
    },
    {
      question: "¿Qué temas cubren las trivias?",
      answer: `Tenemos ${stats.totalTrivias} trivias diferentes sobre: ${categories.join(', ')}. Cada una está diseñada para enseñar conceptos importantes de forma entretenida.`
    },
    {
      question: "¿Qué niveles de dificultad hay disponibles?",
      answer: `Ofrecemos trivias de ${stats.difficulties.join(', ')}. Puedes elegir según tu nivel de conocimiento y experiencia.`
    },
    {
      question: "¿Las trivias son apropiadas para todas las edades?",
      answer: "Sí, todas nuestras trivias están diseñadas para ser educativas y apropiadas para diferentes edades, desde estudiantes hasta adultos que quieren refrescar sus conocimientos."
    },
    {
      question: "¿Puedo jugar en mi móvil?",
      answer: "¡Por supuesto! Todas las trivias están optimizadas para funcionar perfectamente en computadora, tablet y móvil."
    },
    {
      question: "¿Hay algún sistema de puntuación?",
      answer: "Sí, cada trivia tiene su propio sistema de puntuación y ranking. Puedes obtener desde 'Aprendiz' hasta 'Experto' según tu rendimiento."
    },
    {
      question: "¿Las trivias incluyen calculadoras relacionadas?",
      answer: "Sí, al final de cada trivia te ofrecemos enlaces a calculadoras relacionadas para que puedas aplicar lo que has aprendido."
    }
  ]

  return (
    <CategoryPageLayout
      category={triviasCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
