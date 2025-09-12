"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { getTriviasByCategory, getTriviasStats } from '@/lib/trivias-config'
import { jsonLdCollection } from '@/lib/seo'

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryPageLayout
        title="Trivias de Ciencia"
        description="Descubre el fascinante mundo de la ciencia a través de nuestras trivias educativas. Aprende sobre anatomía, biología, química y más temas científicos de forma divertida e interactiva."
        icon="🧬"
        items={cienciaTrivias}
        stats={{
          totalItems: cienciaTrivias.length,
          totalQuestions: cienciaTrivias.reduce((sum, trivia) => sum + trivia.totalQuestions, 0),
          timeRange: stats.timeRangeDisplay,
          difficulties: stats.difficulties
        }}
        customStats={[
          { label: 'Trivias de Ciencia', value: `${cienciaTrivias.length}` },
          { label: 'Preguntas Totales', value: `${cienciaTrivias.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)}` },
          { label: '100% Gratuito', value: 'Siempre' }
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
