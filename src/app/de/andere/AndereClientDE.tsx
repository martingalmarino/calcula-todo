"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Award, Car, Type, Hash, MousePointer, Coins } from 'lucide-react'

export default function AndereClientDE() {
  const andereClusterDE = {
    title: 'Andere',
    label: 'Andere',
    description: 'Verschiedene nützliche Rechner und Tools für den Alltag. Von Notenskalen bis hin zu Trinkgeld-Berechnungen.',
    href: '/de/andere',
    calculators: [
      {
        title: 'Notenskala-Rechner',
        label: 'Notenskala-Rechner',
        description: 'Konvertieren Sie numerische Bewertungen in Buchstabenskalen (A, B, C, D, F)',
        href: '/de/andere/notenskala',
        category: 'Andere',
        keywords: ['noten', 'bewertung', 'schulnoten', 'punkte', 'skala']
      },
      {
        title: 'Benzin-Reise-Rechner',
        label: 'Benzin-Reise-Rechner',
        description: 'Berechnen Sie Kraftstoffkosten pro Kilometer und Gesamtausgaben für Ihre Reise',
        href: '/de/andere/benzin-reise',
        category: 'Andere',
        keywords: ['benzin', 'kraftstoff', 'reise', 'kosten', 'verbrauch']
      },
      {
        title: 'Wort- und Zeichenzähler',
        label: 'Wort- und Zeichenzähler',
        description: 'Zählen Sie Wörter, Zeichen, Sätze, Absätze und Lesezeit in Ihrem Text',
        href: '/de/andere/wort-zeichenzaehler',
        category: 'Andere',
        keywords: ['wörter', 'zeichen', 'text', 'zählen', 'schreiben']
      },
      {
        title: 'Römische Zahlen',
        label: 'Römische Zahlen',
        description: 'Konvertieren Sie zwischen arabischen und römischen Zahlen',
        href: '/de/andere/roemische-zahlen',
        category: 'Andere',
        keywords: ['römisch', 'zahlen', 'konvertierung', 'arabisch', 'antik']
      },
      {
        title: 'Klick-Zähler',
        label: 'Klick-Zähler',
        description: 'Testen Sie Ihre Klickgeschwindigkeit und messen Sie Clicks pro Sekunde',
        href: '/de/andere/klick-zaehler',
        category: 'Andere',
        keywords: ['klicks', 'geschwindigkeit', 'test', 'cps', 'reaktion']
      },
      {
        title: 'Trinkgeld-Rechner',
        label: 'Trinkgeld-Rechner',
        description: 'Berechnen Sie Trinkgeld und teilen Sie die Rechnung zwischen mehreren Personen',
        href: '/de/andere/trinkgeld',
        category: 'Andere',
        keywords: ['trinkgeld', 'rechnung', 'teilen', 'restaurant', 'service']
      }
    ]
  }

  const customIcons = {
    'Notenskala-Rechner': Award,
    'Benzin-Reise-Rechner': Car,
    'Wort- und Zeichenzähler': Type,
    'Römische Zahlen': Hash,
    'Klick-Zähler': MousePointer,
    'Trinkgeld-Rechner': Coins
  }

  const customStats = [
    {
      icon: Award,
      value: andereClusterDE.calculators.length.toString(),
      label: 'Rechner',
      color: 'blue' as const
    },
    {
      icon: Car,
      value: '100%',
      label: 'Kostenlos',
      color: 'green' as const
    },
    {
      icon: Type,
      value: 'Nützlich',
      label: 'Alltagstools',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: 'Was sind "Andere" Rechner?',
      answer: 'Unsere "Andere" Kategorie enthält verschiedene nützliche Rechner und Tools, die nicht in die Hauptkategorien passen, aber im Alltag sehr hilfreich sind.'
    },
    {
      question: 'Sind alle Rechner kostenlos?',
      answer: 'Ja, alle unsere Rechner sind vollständig kostenlos und ohne Registrierung nutzbar. Sie können sie so oft verwenden, wie Sie möchten.'
    },
    {
      question: 'Kann ich die Ergebnisse kopieren?',
      answer: 'Ja, die meisten unserer Rechner bieten die Möglichkeit, Ergebnisse zu kopieren oder als Text zu exportieren.'
    },
    {
      question: 'Funktionieren die Rechner auf mobilen Geräten?',
      answer: 'Ja, alle unsere Rechner sind vollständig responsive und funktionieren optimal auf Desktop, Tablet und Smartphone.'
    }
  ]

  return (
    <CategoryPageLayout
      category={andereClusterDE}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
