"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Circle, RectangleHorizontal, Triangle, Square, Diamond, Hexagon } from 'lucide-react'

export default function GeometrieClientDE() {
  const geometrieClusterDE = {
    title: 'Geometrie',
    label: 'Geometrie',
    description: 'Geometrie-Rechner für die Berechnung von Flächen und Umfängen verschiedener Formen. Präzise Formeln und einfache Bedienung.',
    href: '/de/geometrie',
    calculators: [
      {
        title: 'Kreis-Rechner',
        label: 'Kreis-Rechner',
        description: 'Berechnen Sie Fläche, Umfang, Durchmesser und Radius eines Kreises',
        href: '/de/geometrie/kreis',
        category: 'Geometrie',
        keywords: ['kreis', 'fläche', 'umfang', 'radius', 'durchmesser']
      },
      {
        title: 'Rechteck-Rechner',
        label: 'Rechteck-Rechner',
        description: 'Berechnen Sie Fläche und Umfang eines Rechtecks',
        href: '/de/geometrie/rechteck',
        category: 'Geometrie',
        keywords: ['rechteck', 'fläche', 'umfang', 'länge', 'breite']
      },
      {
        title: 'Dreieck-Rechner',
        label: 'Dreieck-Rechner',
        description: 'Berechnen Sie Fläche und Umfang eines Dreiecks',
        href: '/de/geometrie/dreieck',
        category: 'Geometrie',
        keywords: ['dreieck', 'fläche', 'umfang', 'höhe', 'basis']
      },
      {
        title: 'Quadrat-Rechner',
        label: 'Quadrat-Rechner',
        description: 'Berechnen Sie Fläche und Umfang eines Quadrats',
        href: '/de/geometrie/quadrat',
        category: 'Geometrie',
        keywords: ['quadrat', 'fläche', 'umfang', 'seite']
      },
      {
        title: 'Raute-Rechner',
        label: 'Raute-Rechner',
        description: 'Berechnen Sie Fläche und Umfang einer Raute',
        href: '/de/geometrie/raute',
        category: 'Geometrie',
        keywords: ['raute', 'fläche', 'umfang', 'diagonale']
      },
      {
        title: 'Trapez-Rechner',
        label: 'Trapez-Rechner',
        description: 'Berechnen Sie Fläche und Umfang eines Trapezes',
        href: '/de/geometrie/trapez',
        category: 'Geometrie',
        keywords: ['trapez', 'fläche', 'umfang', 'höhe', 'basis']
      }
    ]
  }

  const customIcons = {
    'Kreis-Rechner': Circle,
    'Rechteck-Rechner': RectangleHorizontal,
    'Dreieck-Rechner': Triangle,
    'Quadrat-Rechner': Square,
    'Raute-Rechner': Diamond,
    'Trapez-Rechner': Hexagon
  }

  const customStats = [
    {
      icon: Circle,
      value: geometrieClusterDE.calculators.length.toString(),
      label: 'Rechner',
      color: 'blue' as const
    },
    {
      icon: RectangleHorizontal,
      value: 'Präzise',
      label: 'Formeln',
      color: 'green' as const
    },
    {
      icon: Triangle,
      value: 'Kostenlos',
      label: 'Geometrie-Tools',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: 'Was ist Geometrie?',
      answer: 'Geometrie ist ein Teilgebiet der Mathematik, das sich mit Formen, Größen, relativen Positionen von Figuren und den Eigenschaften des Raumes beschäftigt.'
    },
    {
      question: 'Wie berechnet man Flächen?',
      answer: 'Die Fläche wird je nach Form unterschiedlich berechnet. Zum Beispiel: Kreis = π × r², Rechteck = Länge × Breite, Dreieck = (Basis × Höhe) / 2.'
    },
    {
      question: 'Was ist der Unterschied zwischen Fläche und Umfang?',
      answer: 'Die Fläche ist der Inhalt einer Fläche (gemessen in cm², m², etc.), während der Umfang die Länge der Begrenzungslinie ist (gemessen in cm, m, etc.).'
    },
    {
      question: 'Sind die Formeln korrekt?',
      answer: 'Ja, alle verwendeten Formeln sind mathematisch korrekt und werden in der Geometrie standardmäßig verwendet.'
    }
  ]

  return (
    <CategoryPageLayout
      category={geometrieClusterDE}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
