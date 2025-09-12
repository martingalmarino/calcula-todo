"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { getTriviasByCategoryIT, getTriviasStatsIT } from '@/lib/trivias-config-it'
import { jsonLdCollection } from '@/lib/seo'
import { Brain, BookOpen, Zap } from 'lucide-react'

const scienzaTrivias = getTriviasByCategoryIT('Scienza')
const stats = getTriviasStatsIT()

const structuredData = jsonLdCollection({
  name: 'Quiz di Scienza',
  description: 'Quiz educativi su scienza, anatomia, biologia e altro. Impara sul corpo umano, ossa, organi e sistemi biologici.',
  url: '/it/trivias/scienza',
  calculators: scienzaTrivias.map(trivia => ({
    name: trivia.title,
    description: trivia.description,
    url: `https://www.calculatodo.online${trivia.href}`
  }))
})

export default function TriviasScienzaClientIT() {
  // Creare oggetto category che corrisponda all'interfaccia Category
  const category = {
    label: 'Quiz di Scienza',
    href: '/it/trivias/scienza',
    description: 'Scopri l\'affascinante mondo della scienza attraverso i nostri quiz educativi. Impara su anatomia, biologia, chimica e altri argomenti scientifici in modo divertente e interattivo.',
    calculators: scienzaTrivias.map(trivia => ({
      label: trivia.title,
      href: trivia.href,
      description: trivia.description,
      icon: trivia.icon.name || 'Calculator',
      category: 'Scienza',
      keywords: trivia.keywords
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
            label: 'Quiz di Scienza', 
            value: `${scienzaTrivias.length}`,
            color: 'blue' as const
          },
          { 
            icon: BookOpen, 
            label: 'Domande Totali', 
            value: `${scienzaTrivias.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)}`,
            color: 'green' as const
          },
          { 
            icon: Zap, 
            label: '100% Gratuito', 
            value: 'Sempre',
            color: 'purple' as const
          }
        ]}
        faqItems={[
          {
            question: 'Quali argomenti di scienza coprono questi quiz?',
            answer: 'I nostri quiz di scienza coprono anatomia umana, biologia, chimica base, fisica e altri argomenti scientifici fondamentali. Ogni quiz è progettato per essere educativo e divertente.'
          },
          {
            question: 'Sono appropriati per studenti?',
            answer: 'Sì, i nostri quiz di scienza sono progettati per essere educativi e appropriati per studenti di diversi livelli. Includono spiegazioni dettagliate per facilitare l\'apprendimento.'
          },
          {
            question: 'Quanto tempo ci vuole per completare un quiz?',
            answer: `Ogni quiz di scienza ha un limite di tempo di ${stats.timeRangeDisplay}. Puoi completarlo al tuo ritmo, ma il cronometro aggiunge un elemento di sfida educativo.`
          },
          {
            question: 'Ci sono diversi livelli di difficoltà?',
            answer: `Sì, i nostri quiz di scienza includono diversi livelli: ${stats.difficulties.join(', ')}. Questo permette sia ai principianti che agli esperti di trovare contenuti appropriati.`
          },
          {
            question: 'Posso condividere i miei risultati?',
            answer: 'Assolutamente! Ogni quiz include una funzione per condividere i tuoi risultati sui social media, perfetto per sfidare amici e familiari.'
          }
        ]}
        breadcrumbs={[
          { label: 'Inizio', href: '/it' },
          { label: 'Quiz', href: '/it/trivias' },
          { label: 'Scienza', href: '/it/trivias/scienza' }
        ]}
      />
    </>
  )
}
