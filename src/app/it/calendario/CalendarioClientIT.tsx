"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, Calendar, Clock, User, Plus, Plane, Users } from 'lucide-react'

// Definir la categoría calendario en italiano
const calendarioClusterIT = {
  title: 'Calendario',
  description: 'Calculadoras de calendario y fechas en italiano para gestionar fechas, calcular edades, contar días y más.',
  href: '/it/calendario',
  calculators: [
    {
      title: 'Contatore di Giorni tra Date',
      description: 'Calcola la differenza esatta in giorni tra due date qualsiasi',
      href: '/it/calendario/contatore-giorni-date',
      icon: Calendar
    },
    {
      title: 'Calcolatrice dell\'Età',
      description: 'Scopri la tua età esatta in anni, mesi e giorni',
      href: '/it/calendario/calcolatrice-eta',
      icon: User
    },
    {
      title: 'Aggiungi/Sottrai Giorni a una Data',
      description: 'Aggiungi o sottrai giorni a una data specifica',
      href: '/it/calendario/aggiungi-sottrai-giorni',
      icon: Plus
    },
    {
      title: 'Calcolatrice di Ore e Minuti',
      description: 'Calcola, somma e converti ore e minuti facilmente',
      href: '/it/calendario/ore-minuti',
      icon: Clock
    },
    {
      title: 'Giorni di Vacanza',
      description: 'Calcola i giorni di vacanza e ferie lavorative',
      href: '/it/calendario/giorni-vacanza',
      icon: Plane
    },
    {
      title: 'Convertitore di Date',
      description: 'Converte date tra diversi formati e calendari',
      href: '/it/calendario/convertitore-date',
      icon: Calendar
    }
  ]
}

export default function CalendarioClientIT() {
  const customIcons = {
    '/it/calendario/contatore-giorni-date/': Calendar,
    '/it/calendario/calcolatrice-eta/': User,
    '/it/calendario/aggiungi-sottrai-giorni/': Plus,
    '/it/calendario/ore-minuti/': Clock,
    '/it/calendario/giorni-vacanza/': Plane,
    '/it/calendario/convertitore-date/': Calendar
  }

  const customStats = [
    {
      icon: Calculator,
      value: calendarioClusterIT.calculators.length.toString(),
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: Calendar,
      value: '6',
      label: 'Strumenti di Data',
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
      question: "Come funziona il contatore di giorni tra date?",
      answer: "Calcola automaticamente la differenza esatta in giorni tra due date, includendo anni bisestili e diversi formati di data."
    },
    {
      question: "Posso calcolare la mia età esatta?",
      answer: "Sì, la nostra calcolatrice dell'età ti mostra la tua età esatta in anni, mesi e giorni, considerando gli anni bisestili."
    },
    {
      question: "Come aggiungo o sottraggo giorni a una data?",
      answer: "Inserisci una data base e specifica quanti giorni vuoi aggiungere o sottrarre. La calcolatrice gestisce automaticamente i cambi di mese e anno."
    },
    {
      question: "Cosa include la calcolatrice di ore e minuti?",
      answer: "Permette di sommare, sottrarre e convertire tra ore e minuti, utile per calcoli di tempo di lavoro, durata di eventi, ecc."
    },
    {
      question: "Come calcolo i giorni di vacanza?",
      answer: "Specifica la tua data di inizio e fine vacanze, e la calcolatrice ti dirà esattamente quanti giorni lavorativi e totali hai."
    },
    {
      question: "Il convertitore di date supporta diversi formati?",
      answer: "Sì, supporta la conversione tra diversi formati di data e calendari, inclusi formati europei, americani e ISO."
    }
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' }
  ]

  return (
    <CategoryPageLayout
      category={calendarioClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
      breadcrumbs={breadcrumbs}
    />
  )
}
