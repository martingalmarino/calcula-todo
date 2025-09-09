"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, BookOpen, Users, Divide, Percent, Zap, X, Triangle, TrendingUp } from 'lucide-react'

// Configurazione specifica per matematica italiana
const matematicasClusterIT = {
  label: 'Matematica',
  description: 'Calcolatrici matematiche online gratuite per risolvere problemi di algebra, geometria, trigonometria e molto altro. Risultati precisi e spiegazioni dettagliate.',
  href: '/it/matematicas',
  calculators: [
    {
      label: 'Calcolatrice di Frazioni',
      description: 'Calcola operazioni con frazioni: somma, sottrazione, moltiplicazione e divisione',
      href: '/it/matematicas/frazioni',
      category: 'Matematica',
      keywords: ['frazioni', 'operazioni', 'semplifica', 'somma', 'sottrazione', 'moltiplicazione', 'divisione']
    },
    {
      label: 'Calcolatrice di Percentuali',
      description: 'Calcola percentuali, sconti, aumenti e rapporti percentuali',
      href: '/it/matematicas/percentuali',
      category: 'Matematica',
      keywords: ['percentuali', 'sconti', 'aumenti', 'variazione', 'calcolo percentuale']
    },
    {
      label: 'Calcolatrice di Potenze e Radici',
      description: 'Calcola potenze, radici quadrate, cubiche e n-esime',
      href: '/it/matematicas/potenze-e-radici',
      category: 'Matematica',
      keywords: ['potenze', 'radici', 'esponenti', 'radice quadrata', 'radice cubica']
    },
    {
      label: 'Calcolatrice di Algebra',
      description: 'Risolvi equazioni lineari, quadratiche e sistemi di equazioni',
      href: '/it/matematicas/algebra',
      category: 'Matematica',
      keywords: ['algebra', 'equazioni', 'lineari', 'quadratiche', 'sistemi']
    },
    {
      label: 'Calcolatrice di Trigonometria',
      description: 'Calcola seno, coseno, tangente e funzioni trigonometriche inverse',
      href: '/it/matematicas/trigonometria',
      category: 'Matematica',
      keywords: ['trigonometria', 'seno', 'coseno', 'tangente', 'angoli']
    },
    {
      label: 'Calcolatrice di Derivate',
      description: 'Calcola derivate di funzioni polinomiali, trigonometriche e logaritmiche',
      href: '/it/matematicas/derivate',
      category: 'Matematica',
      keywords: ['derivate', 'calcolo differenziale', 'funzioni', 'polinomiali', 'trigonometriche']
    }
  ]
}

export function MatematicasClientIT() {
  const customIcons = {
    '/it/matematicas/frazioni/': Divide,
    '/it/matematicas/percentuali/': Percent,
    '/it/matematicas/potenze-e-radici/': Zap,
    '/it/matematicas/algebra/': X,
    '/it/matematicas/trigonometria/': Triangle,
    '/it/matematicas/derivate/': TrendingUp
  }

  const customStats = [
    {
      icon: Calculator,
      value: matematicasClusterIT.calculators.length.toString(),
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '6+',
      label: 'Categorie Matematiche',
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
      question: "Sono gratuite tutte le calcolatrici?",
      answer: "Sì, tutte le nostre calcolatrici matematiche sono completamente gratuite. Non richiedono registrazione né hanno limiti di utilizzo."
    },
    {
      question: "Le calcolatrici mostrano i passaggi?",
      answer: "Sì, molte delle nostre calcolatrici mostrano i passaggi dettagliati per aiutarti a comprendere il processo di calcolo."
    },
    {
      question: "Posso usare le calcolatrici su dispositivi mobili?",
      answer: "Assolutamente! Tutte le nostre calcolatrici sono ottimizzate per dispositivi mobili e desktop."
    },
    {
      question: "Le calcolatrici sono precise?",
      answer: "Sì, utilizziamo algoritmi matematici precisi per garantire risultati accurati in tutti i calcoli."
    }
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' }
  ]

  return (
    <CategoryPageLayout
      category={matematicasClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
      breadcrumbs={breadcrumbs}
    />
  )
}
