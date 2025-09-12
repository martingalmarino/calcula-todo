"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Brain, Trophy, Clock, LucideIcon } from 'lucide-react'
import { triviasConfigIT, getTriviasStatsIT } from '@/lib/trivias-config-it'

// Generare cluster dinamicamente
const generateTriviasClusterIT = () => {
  return {
    title: 'Trivias e Quiz Educativi',
    label: 'Trivias e Quiz Educativi',
    description: 'Metti alla prova le tue conoscenze con le nostre trivias educative. Impara su salute, matematica, finanza e altro in modo divertente.',
    href: '/it/trivias',
    calculators: triviasConfigIT.map(trivia => ({
      title: trivia.title,
      label: trivia.label,
      description: trivia.description,
      href: trivia.href,
      category: trivia.category,
      keywords: trivia.keywords
    }))
  }
}

export default function TriviasClientIT() {
  const triviasCluster = generateTriviasClusterIT()
  const stats = getTriviasStatsIT()
  
  // Generare icone dinamicamente
  const customIcons = triviasConfigIT.reduce((acc, trivia) => {
    acc[trivia.href] = trivia.icon
    return acc
  }, {} as Record<string, LucideIcon>)

  // Generare statistiche dinamicamente
  const customStats = [
    {
      icon: Brain,
      value: stats.totalTrivias.toString(),
      label: 'Trivias Disponibili',
      color: 'blue' as const
    },
    {
      icon: Clock,
      value: stats.timeRangeDisplay,
      label: 'Per Quiz',
      color: 'green' as const
    },
    {
      icon: Trophy,
      value: `${stats.totalQuestions} domande`,
      label: 'Totale Domande',
      color: 'purple' as const
    }
  ]

  // Generare FAQ dinamicamente
  const categories = [...new Set(triviasConfigIT.map(trivia => trivia.category))]

  const faqItems = [
    {
      question: "Come funzionano le trivias educative?",
      answer: `Ogni trivia ha una durata di ${stats.timeRangeDisplay} dove devi rispondere a ${stats.avgQuestionsPerTrivia} domande in media su diversi argomenti. Ogni risposta corretta somma punti e alla fine ottieni un ranking secondo le tue prestazioni.`
    },
    {
      question: "Che argomenti coprono le trivias?",
      answer: `Abbiamo ${stats.totalTrivias} trivias diverse su: ${categories.join(', ')}. Ognuna è progettata per insegnare concetti importanti in modo divertente.`
    },
    {
      question: "Che livelli di difficoltà ci sono disponibili?",
      answer: `Offriamo trivias di ${stats.difficulties.join(', ')}. Puoi scegliere secondo il tuo livello di conoscenza ed esperienza.`
    },
    {
      question: "Le trivias sono appropriate per tutte le età?",
      answer: "Sì, tutte le nostre trivias sono progettate per essere educative e appropriate per diverse età, dagli studenti agli adulti che vogliono rinfrescare le loro conoscenze."
    },
    {
      question: "Posso giocare sul mio cellulare?",
      answer: "Certamente! Tutte le trivias sono ottimizzate per funzionare perfettamente su computer, tablet e cellulare."
    },
    {
      question: "C'è qualche sistema di punteggio?",
      answer: "Sì, ogni trivia ha il suo sistema di punteggio e ranking. Puoi ottenere da 'Principiante' fino a 'Esperto' secondo le tue prestazioni."
    },
    {
      question: "Le trivias includono calcolatrici correlate?",
      answer: "Sì, alla fine di ogni trivia ti offriamo link a calcolatrici correlate per poter applicare quello che hai imparato."
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
