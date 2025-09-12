"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { getTriviasByCategory, getTriviasStats } from '@/lib/trivias-config'
import { jsonLdCollection } from '@/lib/seo'
import { Brain, BookOpen, Zap } from 'lucide-react'

const cienciaTrivias = getTriviasByCategory('Ciencia')
const stats = getTriviasStats()

const structuredData = jsonLdCollection({
  name: 'Trivias de Ciencia',
  description: 'Trivias educativas sobre ciencia, anatomía, biología y más. Aprende sobre el cuerpo humano, huesos, órganos y sistemas biológicos.',
  url: '/trivias/ciencia',
  calculators: cienciaTrivias.map(trivia => ({
    name: trivia.title,
    description: trivia.description,
    url: `https://www.calculatodo.online${trivia.href}`
  }))
})

export default function TriviasCienciaClient() {
  // Crear objeto category que coincida con la interfaz Category
  const category = {
    label: 'Trivias de Ciencia',
    href: '/trivias/ciencia',
    description: 'Descubre el fascinante mundo de la ciencia a través de nuestras trivias educativas. Aprende sobre anatomía, biología, química y más temas científicos de forma divertida e interactiva.',
    calculators: cienciaTrivias.map(trivia => ({
      name: trivia.title,
      href: trivia.href,
      description: trivia.description,
      icon: trivia.icon,
      keywords: trivia.keywords,
      difficulty: trivia.difficulty,
      totalQuestions: trivia.totalQuestions,
      timeLimit: trivia.timeLimit,
      relatedCalculator: trivia.relatedCalculator,
      isNew: trivia.isNew
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryPageLayout
        category={category}
        customStats={[
          { 
            icon: Brain, 
            label: 'Trivias de Ciencia', 
            value: `${cienciaTrivias.length}`,
            color: 'blue' as const
          },
          { 
            icon: BookOpen, 
            label: 'Preguntas Totales', 
            value: `${cienciaTrivias.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)}`,
            color: 'green' as const
          },
          { 
            icon: Zap, 
            label: '100% Gratuito', 
            value: 'Siempre',
            color: 'purple' as const
          }
        ]}
        faqItems={[
          {
            question: '¿Qué temas de ciencia cubren estas trivias?',
            answer: 'Nuestras trivias de ciencia cubren anatomía humana, biología, química básica, física y otros temas científicos fundamentales. Cada trivia está diseñada para ser educativa y entretenida.'
          },
          {
            question: '¿Son apropiadas para estudiantes?',
            answer: 'Sí, nuestras trivias de ciencia están diseñadas para ser educativas y apropiadas para estudiantes de diferentes niveles. Incluyen explicaciones detalladas para facilitar el aprendizaje.'
          },
          {
            question: '¿Cuánto tiempo toma completar una trivia?',
            answer: `Cada trivia de ciencia tiene un límite de tiempo de ${stats.timeRangeDisplay}. Puedes completarla a tu propio ritmo, pero el cronómetro añade un elemento de desafío educativo.`
          },
          {
            question: '¿Hay diferentes niveles de dificultad?',
            answer: `Sí, nuestras trivias de ciencia incluyen diferentes niveles: ${stats.difficulties.join(', ')}. Esto permite que tanto principiantes como expertos encuentren contenido apropiado.`
          },
          {
            question: '¿Puedo compartir mis resultados?',
            answer: '¡Absolutamente! Cada trivia incluye una función para compartir tus resultados en redes sociales, perfecto para desafiar a amigos y familiares.'
          }
        ]}
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Trivias', href: '/trivias' },
          { label: 'Ciencia', href: '/trivias/ciencia' }
        ]}
      />
    </>
  )
}