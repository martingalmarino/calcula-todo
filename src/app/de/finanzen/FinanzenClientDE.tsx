"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { TrendingUp, Home, Car, Target, DollarSign, Calculator } from 'lucide-react'

export default function FinanzenClientDE() {
  const finanzenClusterDE = {
    title: 'Finanzen',
    label: 'Finanzen',
    description: 'Finanzrechner für die Verwaltung von Darlehen, Investitionen, Fahrzeugabschreibung, einfache Zinsen und Sparplanung.',
    href: '/de/finanzen',
    calculators: [
      {
        title: 'Zins-Rechner',
        label: 'Zins-Rechner',
        description: 'Berechnen Sie einfache Zinsen für kurzfristige Kredite und grundlegende Finanzoperationen',
        href: '/de/finanzen/zinsen',
        category: 'Finanzen',
        keywords: ['zinsen', 'kredite', 'finanzen', 'zinsberechnung']
      },
      {
        title: 'Darlehen-Rechner',
        label: 'Darlehen-Rechner',
        description: 'Berechnen Sie monatliche Raten, Gesamtzinsen und Tilgungsplan für Ihr Darlehen',
        href: '/de/finanzen/darlehen',
        category: 'Finanzen',
        keywords: ['darlehen', 'raten', 'haus', 'immobilienkredit']
      },
      {
        title: 'Inflations-Rechner',
        label: 'Inflations-Rechner',
        description: 'Berechnen Sie Kaufkraft und Inflation mit dem Verbraucherpreisindex',
        href: '/de/finanzen/inflation',
        category: 'Finanzen',
        keywords: ['inflation', 'kaufkraft', 'verbraucherpreisindex', 'preise']
      },
      {
        title: 'Spar-Rechner',
        label: 'Spar-Rechner',
        description: 'Berechnen Sie, wie viel Sie monatlich sparen müssen, um Ihre finanziellen Ziele zu erreichen',
        href: '/de/finanzen/sparen',
        category: 'Finanzen',
        keywords: ['sparen', 'ziel', 'planung', 'investitionen']
      },
      {
        title: 'Abschreibungs-Rechner',
        label: 'Abschreibungs-Rechner',
        description: 'Berechnen Sie den Wertverlust Ihres Fahrzeugs über die Zeit mit der linearen Methode',
        href: '/de/finanzen/abschreibung',
        category: 'Finanzen',
        keywords: ['abschreibung', 'fahrzeuge', 'auto', 'wertverlust']
      },
      {
        title: 'Zukunftswert-Rechner',
        label: 'Zukunftswert-Rechner',
        description: 'Berechnen Sie den zukünftigen Wert von Investitionen und den Barwert zukünftiger Summen',
        href: '/de/finanzen/zukunftswert',
        category: 'Finanzen',
        keywords: ['zukunftswert', 'barwert', 'investitionen', 'abzinsung']
      }
    ]
  }

  const customIcons = {
    'Zins-Rechner': TrendingUp,
    'Darlehen-Rechner': Home,
    'Abschreibungs-Rechner': Car,
    'Spar-Rechner': Target,
    'Zukunftswert-Rechner': DollarSign,
    'Inflations-Rechner': Calculator
  }

  const customStats = [
    {
      icon: TrendingUp,
      value: finanzenClusterDE.calculators.length.toString(),
      label: 'Rechner Verfügbar',
      color: 'blue' as const
    },
    {
      icon: TrendingUp,
      value: '100%',
      label: 'Kostenlos',
      color: 'green' as const
    },
    {
      icon: DollarSign,
      value: 'Präzise',
      label: 'Finanzberechnungen',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Was sind einfache Zinsen?",
      answer: "Einfache Zinsen sind Zinsen, die nur auf das ursprüngliche Kapital berechnet werden, ohne die aufgelaufenen Zinsen aus vorherigen Perioden zu berücksichtigen. Sie sind ideal für kurzfristige Kredite und einfache Operationen."
    },
    {
      question: "Wie wird die Abschreibung eines Fahrzeugs berechnet?",
      answer: "Die Abschreibung wird berechnet, indem der ursprüngliche Wert des Fahrzeugs, sein geschätzter Restwert und die Nutzungsdauer berücksichtigt werden. Unser Rechner verwendet Standard-Marktmethoden."
    },
    {
      question: "Was beinhaltet die Darlehensberechnung?",
      answer: "Die Darlehensberechnung umfasst die monatliche Aufschlüsselung von Kapital und Zinsen, die Gesamtzinsen, die zu zahlen sind, und den Zahlungsplan, um Ihnen bei der Budgetplanung zu helfen."
    },
    {
      question: "Wofür wird der Verbraucherpreisindex verwendet?",
      answer: "Der Verbraucherpreisindex (VPI) misst die Inflation und hilft Ihnen, die Kaufkraft des Geldes über die Zeit zu berechnen, was für die Finanzplanung unerlässlich ist."
    },
    {
      question: "Wie funktioniert der Sparziel-Rechner?",
      answer: "Er hilft Ihnen zu bestimmen, wie viel Sie monatlich sparen müssen, um ein bestimmtes finanzielles Ziel in einer bestimmten Zeit zu erreichen, unter Berücksichtigung des Zinssatzes."
    }
  ]

  return (
    <CategoryPageLayout
      category={finanzenClusterDE}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
