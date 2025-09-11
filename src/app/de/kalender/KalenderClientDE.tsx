"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, Calendar, Clock, User, Plus, Plane } from 'lucide-react'

const kalenderClusterDE = {
  title: 'Kalender',
  label: 'Kalender',
  description: 'Berechnen Sie Ihr Alter, Tage zwischen Daten, Urlaubstage, Stunden und Minuten sowie Datumsoperationen. Alle Kalender-Tools kostenlos und einfach zu verwenden.',
  href: '/de/kalender',
  calculators: [
    {
      title: 'Alter-Rechner',
      label: 'Alter-Rechner',
      description: 'Berechnen Sie Ihr genaues Alter in Jahren, Monaten und Tagen',
      href: '/de/kalender/alter-rechner',
      category: 'Kalender',
      keywords: ['alter', 'geburtstag', 'jahre', 'monate', 'tage']
    },
    {
      title: 'Tage zwischen Daten',
      label: 'Tage zwischen Daten',
      description: 'Berechnen Sie die Anzahl der Tage zwischen zwei Daten',
      href: '/de/kalender/tage-zwischen-daten',
      category: 'Kalender',
      keywords: ['tage', 'daten', 'zeitraum', 'differenz', 'kalender']
    },
    {
      title: 'Urlaubstage',
      label: 'Urlaubstage',
      description: 'Berechnen Sie Ihre Urlaubstage und Arbeitstage',
      href: '/de/kalender/urlaubstage',
      category: 'Kalender',
      keywords: ['urlaub', 'arbeitstage', 'wochenenden', 'ferien']
    },
    {
      title: 'Stunden und Minuten',
      label: 'Stunden und Minuten',
      description: 'Rechnen Sie mit Stunden und Minuten, addieren und subtrahieren',
      href: '/de/kalender/stunden-minuten',
      category: 'Kalender',
      keywords: ['stunden', 'minuten', 'zeit', 'berechnung', 'addieren']
    },
    {
      title: 'Tage addieren/subtrahieren',
      label: 'Tage addieren/subtrahieren',
      description: 'Addieren oder subtrahieren Sie Tage zu einem Datum',
      href: '/de/kalender/tage-addieren-subtrahieren',
      category: 'Kalender',
      keywords: ['tage', 'addieren', 'subtrahieren', 'datum', 'berechnung']
    }
  ]
}

export default function KalenderClientDE() {
  const customIcons = {
    'Alter-Rechner': User,
    'Tage zwischen Daten': Calendar,
    'Urlaubstage': Plane,
    'Stunden und Minuten': Clock,
    'Tage addieren/subtrahieren': Plus
  }

  const customStats = [
    {
      icon: Calculator,
      value: '5',
      label: 'Verfügbare Rechner',
      color: 'blue' as const
    },
    {
      icon: Calendar,
      value: '5',
      label: 'Datums-Tools',
      color: 'green' as const
    },
    {
      icon: Clock,
      value: '100%',
      label: 'Kostenlos',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Wie funktioniert der Alter-Rechner?",
      answer: "Der Alter-Rechner zeigt Ihr genaues Alter in Jahren, Monaten und Tagen an, unter Berücksichtigung von Schaltjahren und verschiedenen Datumsformaten."
    },
    {
      question: "Kann ich die Tage zwischen zwei Daten berechnen?",
      answer: "Ja, unser Rechner berechnet automatisch die genaue Anzahl der Tage zwischen zwei Daten, einschließlich Schaltjahren und verschiedenen Datumsformaten."
    },
    {
      question: "Wie addiere oder subtrahiere ich Tage zu einem Datum?",
      answer: "Geben Sie ein Basis-Datum ein und spezifizieren Sie, wie viele Tage Sie addieren oder subtrahieren möchten. Der Rechner behandelt automatisch Monats- und Jahreswechsel."
    },
    {
      question: "Was umfasst der Stunden- und Minuten-Rechner?",
      answer: "Er ermöglicht das Addieren, Subtrahieren und Konvertieren zwischen Stunden und Minuten, nützlich für Arbeitszeitberechnungen, Ereignisdauer, etc."
    },
    {
      question: "Wie berechne ich Urlaubstage?",
      answer: "Geben Sie Ihr Urlaubsstart- und -enddatum an, und der Rechner zeigt Ihnen genau, wie viele Arbeitstage und Gesamttage Sie haben."
    }
  ]

  return (
    <CategoryPageLayout
      category={kalenderClusterDE}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
