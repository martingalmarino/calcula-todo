"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Heart, Flame, Percent, Users, Droplets, CalendarHeart } from 'lucide-react'

// Definir la categoría salute en italiano
const saluteClusterIT = {
  title: 'Salute',
  label: 'Salute',
  description: 'Calcolatrici di salute e benessere in italiano per monitorare il tuo stato di salute, calcolare IMC, TMB, percentuale di grasso corporeo e molto altro.',
  href: '/it/salute',
  calculators: [
    {
      label: 'Indice di Massa Corporea (IMC)',
      title: 'Indice di Massa Corporea (IMC)',
      description: 'Calcola il tuo indice di massa corporea per valutare il peso ideale',
      href: '/it/salute/imc',
      category: 'Salute',
      keywords: ['IMC', 'indice massa corporea', 'peso', 'altezza', 'salute', 'BMI']
    },
    {
      label: 'Tasso Metabolico Basale (TMB)',
      title: 'Tasso Metabolico Basale (TMB)',
      description: 'Calcola il tuo metabolismo basale per ottimizzare la dieta',
      href: '/it/salute/tmb',
      category: 'Salute',
      keywords: ['TMB', 'metabolismo', 'basale', 'calorie', 'dieta', 'energia']
    },
    {
      label: 'Percentuale di Grasso Corporeo',
      title: 'Percentuale di Grasso Corporeo',
      description: 'Stima la percentuale di grasso corporeo per monitorare la composizione corporea',
      href: '/it/salute/grasso-corporeo',
      category: 'Salute',
      keywords: ['grasso', 'corporeo', 'percentuale', 'composizione', 'massa', 'muscolo']
    },
    {
      label: 'Calcolatrice PaFi',
      title: 'Calcolatrice PaFi',
      description: 'Calcola l\'indice PaFi per valutare la funzione respiratoria',
      href: '/it/salute/pafi',
      category: 'Salute',
      keywords: ['PaFi', 'respiratorio', 'ossigeno', 'polmoni', 'funzione', 'respirazione']
    },
    {
      label: 'Acqua Giornaliera Raccomandata',
      title: 'Acqua Giornaliera Raccomandata',
      description: 'Calcola la quantità di acqua giornaliera raccomandata per la tua salute',
      href: '/it/salute/acqua-giornaliera',
      category: 'Salute',
      keywords: ['acqua', 'idratazione', 'giornaliera', 'salute', 'liquidi', 'benessere']
    },
    {
      label: 'Calcolatrice di Ovulazione',
      title: 'Calcolatrice di Ovulazione',
      description: 'Calcola i giorni fertili e il periodo di ovulazione',
      href: '/it/salute/ovulazione',
      category: 'Salute',
      keywords: ['ovulazione', 'fertilità', 'ciclo', 'mestruale', 'giorni', 'fertili']
    }
  ]
}

// Iconos personalizados para las calculadoras
const customIcons = {
  'Indice di Massa Corporea (IMC)': Heart,
  'Tasso Metabolico Basale (TMB)': Flame,
  'Percentuale di Grasso Corporeo': Percent,
  'Calcolatrice PaFi': Users,
  'Acqua Giornaliera Raccomandata': Droplets,
  'Calcolatrice di Ovulazione': CalendarHeart
}

// Estadísticas personalizadas
const customStats = {
  totalCalculators: 6,
  categories: ['Salute', 'Benessere', 'Medicina'],
  lastUpdated: '2024'
}

// FAQ personalizadas
const faqItems = [
  {
    question: 'Come funzionano le calcolatrici di salute?',
    answer: 'Le nostre calcolatrici di salute utilizzano formule mediche standardizzate per fornire stime accurate di parametri come IMC, TMB e percentuale di grasso corporeo. Tuttavia, questi risultati sono solo indicativi e non sostituiscono il parere di un medico.'
  },
  {
    question: 'I risultati sono accurati?',
    answer: 'I risultati sono basati su formule scientifiche riconosciute, ma sono solo stime. Per una valutazione medica accurata, consulta sempre un professionista della salute.'
  },
  {
    question: 'Posso usare queste calcolatrici per diagnosi mediche?',
    answer: 'No, queste calcolatrici sono solo strumenti informativi. Non devono essere utilizzate per diagnosi mediche o sostituire il parere di un medico qualificato.'
  },
  {
    question: 'Quali parametri posso calcolare?',
    answer: 'Puoi calcolare IMC, TMB, percentuale di grasso corporeo, indice PaFi, acqua giornaliera raccomandata e giorni di ovulazione. Ogni calcolatrice fornisce spiegazioni dettagliate dei risultati.'
  }
]

// Breadcrumbs personalizzati en italiano
const customBreadcrumbs = [
  { label: 'Home', href: '/it' },
  { label: 'Salute', href: '/it/salute' }
]

export default function SaluteClientIT() {
  return (
    <CategoryPageLayout
      category={saluteClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
      breadcrumbs={customBreadcrumbs}
    />
  )
}
