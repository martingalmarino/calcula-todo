"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, GraduationCap, Fuel, Type, Hash, MousePointer, DollarSign, Users } from 'lucide-react'

export default function AltreClientIT() {
  const altreClusterIT = {
    title: 'Altre Calcolatrici',
    label: 'Altre Calcolatrici',
    description: 'Calcolatrici utili per la vita quotidiana: scala di voti, spesa benzina, contatore di parole, numeri romani, test di velocità click e calcolatrice di mance.',
    href: '/it/altre',
    calculators: [
      {
        title: 'Scala di Voti',
        label: 'Scala di Voti',
        description: 'Converte punteggi numerici in scala di lettere A, B, C, D, F',
        href: '/it/altre/scala-di-voti',
        category: 'Altre Calcolatrici',
        keywords: ['scala di voti', 'voti', 'punteggi', 'educazione']
      },
      {
        title: 'Spesa Benzina per Viaggi',
        label: 'Spesa Benzina per Viaggi',
        description: 'Calcola il costo del carburante per i tuoi viaggi',
        href: '/it/altre/spesa-benzina-viaggi',
        category: 'Altre Calcolatrici',
        keywords: ['benzina', 'carburante', 'viaggi', 'costo']
      },
      {
        title: 'Contatore di Parole e Caratteri',
        label: 'Contatore di Parole e Caratteri',
        description: 'Conta parole, caratteri e paragrafi nel tuo testo',
        href: '/it/altre/contatore-parole-caratteri',
        category: 'Altre Calcolatrici',
        keywords: ['parole', 'caratteri', 'contatore', 'testo']
      },
      {
        title: 'Convertitore di Numeri Romani',
        label: 'Convertitore di Numeri Romani',
        description: 'Converte numeri arabi in romani e viceversa',
        href: '/it/altre/convertitore-numeri-romani',
        category: 'Altre Calcolatrici',
        keywords: ['numeri romani', 'conversione', 'arabici', 'romani']
      },
      {
        title: 'Contatore di Click (CPS Test)',
        label: 'Contatore di Click (CPS Test)',
        description: 'Testa la tua velocità di click per secondo',
        href: '/it/altre/contatore-click-cps',
        category: 'Altre Calcolatrici',
        keywords: ['click', 'CPS', 'velocità', 'test']
      },
      {
        title: 'Calcolatrice di Mance',
        label: 'Calcolatrice di Mance',
        description: 'Calcola la mancia appropriata per il servizio',
        href: '/it/altre/calcolatrice-mance',
        category: 'Altre Calcolatrici',
        keywords: ['mance', 'propina', 'servizio', 'ristorante']
      }
    ]
  }

  const customIcons = {
    'Scala di Voti': GraduationCap,
    'Spesa Benzina per Viaggi': Fuel,
    'Contatore di Parole e Caratteri': Type,
    'Convertitore di Numeri Romani': Hash,
    'Contatore di Click (CPS Test)': MousePointer,
    'Calcolatrice di Mance': DollarSign
  }

  const customStats = [
    {
      icon: Calculator,
      value: altreClusterIT.calculators.length.toString(),
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: Type,
      value: '6',
      label: 'Strumenti Utili',
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
      question: "Come funziona la calcolatrice di mance?",
      answer: "Inserisci l'importo del conto e la percentuale di mancia desiderata. La calcolatrice ti mostrerà la mancia esatta e il totale da pagare."
    },
    {
      question: "Posso contare parole e caratteri in tempo reale?",
      answer: "Sì, la nostra calcolatrice conta automaticamente parole, caratteri (con e senza spazi) mentre scrivi il tuo testo."
    },
    {
      question: "Come converto i numeri romani?",
      answer: "Puoi convertire sia da numeri arabi a romani che da romani ad arabi. Supporta numeri da 1 a 3999."
    },
    {
      question: "Cos'è il contatore di click (CPS)?",
      answer: "È uno strumento per misurare la tua velocità di click al secondo, utile per giochi e test di destrezza."
    },
    {
      question: "Come calcolo la spesa di benzina?",
      answer: "Inserisci la distanza, il consumo di carburante per chilometro e il prezzo per litro per ottenere il costo totale del viaggio."
    }
  ]

  return (
    <CategoryPageLayout
      category={altreClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
