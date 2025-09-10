"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Target, TrendingUp, DollarSign, Users, BarChart3, Calculator } from 'lucide-react'

export default function MarketingClientIT() {
  const marketingClusterIT = {
    title: 'Marketing',
    label: 'Marketing',
    description: 'Calcolatrici di marketing per analizzare CAC, LTV, conversioni, budget e ROI delle tue campagne pubblicitarie.',
    href: '/it/marketing',
    calculators: [
      {
        title: 'CAC - Costo di Acquisizione',
        label: 'CAC - Costo di Acquisizione',
        description: 'Calcola il costo di acquisizione del cliente per ottimizzare le tue campagne',
        href: '/it/marketing/cac',
        category: 'Marketing',
        keywords: ['CAC', 'costo acquisizione', 'marketing', 'clienti']
      },
      {
        title: 'LTV - Lifetime Value',
        label: 'LTV - Lifetime Value',
        description: 'Calcola il valore a lungo termine di un cliente per la tua azienda',
        href: '/it/marketing/ltv',
        category: 'Marketing',
        keywords: ['LTV', 'lifetime value', 'valore cliente', 'marketing']
      },
      {
        title: 'Conversione',
        label: 'Conversione',
        description: 'Analizza le tue conversioni e ottimizza il funnel di vendita',
        href: '/it/marketing/conversione',
        category: 'Marketing',
        keywords: ['conversione', 'funnel', 'lead', 'vendite']
      },
      {
        title: 'Budget di Marketing',
        label: 'Budget di Marketing',
        description: 'Pianifica e distribuisci il tuo budget pubblicitario in modo efficace',
        href: '/it/marketing/budget',
        category: 'Marketing',
        keywords: ['budget', 'marketing', 'pubblicità', 'pianificazione']
      },
      {
        title: 'CPC / CPM',
        label: 'CPC / CPM',
        description: 'Calcola il costo per click e per mille impressioni delle tue campagne',
        href: '/it/marketing/cpc-cpm',
        category: 'Marketing',
        keywords: ['CPC', 'CPM', 'costo click', 'impressioni']
      },
      {
        title: 'ROI in Marketing',
        label: 'ROI in Marketing',
        description: 'Misura il ritorno sull\'investimento delle tue campagne pubblicitarie',
        href: '/it/marketing/roi',
        category: 'Marketing',
        keywords: ['ROI', 'ritorno investimento', 'marketing', 'campagne']
      }
    ]
  }

  const customIcons = {
    'CAC - Costo di Acquisizione': Target,
    'LTV - Lifetime Value': TrendingUp,
    'Conversione': BarChart3,
    'Budget di Marketing': DollarSign,
    'CPC / CPM': Calculator,
    'ROI in Marketing': Users
  }

  const customStats = [
    {
      icon: Calculator,
      value: '6',
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: TrendingUp,
      value: '100%',
      label: 'Traduzione Italiana',
      color: 'green' as const
    },
    {
      icon: Users,
      value: '2024',
      label: 'Ultimo Aggiornamento',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il CAC (Costo di Acquisizione del Cliente)?',
      answer: 'Il CAC è il costo medio per acquisire un nuovo cliente. Si calcola dividendo l\'investimento totale in marketing e vendite per il numero di nuovi clienti acquisiti.'
    },
    {
      question: 'Come si calcola il LTV (Lifetime Value)?',
      answer: 'Il LTV si calcola moltiplicando il valore medio per transazione per la frequenza di acquisto e la durata media della relazione con il cliente.'
    },
    {
      question: 'Qual è la differenza tra CPC e CPM?',
      answer: 'CPC (Costo Per Click) è il costo pagato per ogni click su un annuncio, mentre CPM (Costo Per Mille) è il costo per mille visualizzazioni dell\'annuncio.'
    },
    {
      question: 'Come si misura il ROI del marketing?',
      answer: 'Il ROI del marketing si calcola sottraendo l\'investimento dal ricavo generato, diviso per l\'investimento, moltiplicato per 100 per ottenere la percentuale.'
    }
  ]

  return (
    <CategoryPageLayout
      category={marketingClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
