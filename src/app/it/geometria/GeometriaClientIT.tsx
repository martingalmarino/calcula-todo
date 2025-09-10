"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Circle, RectangleHorizontal, Triangle, Square, Diamond, Hexagon, BookOpen, Users } from 'lucide-react'

export default function GeometriaClientIT() {
  const geometriaClusterIT = {
    title: 'Geometria',
    label: 'Geometria',
    description: 'Calcolatrici geometriche per calcolare aree, perimetri e proprietà di figure piane: cerchi, rettangoli, triangoli, quadrati, rombi e trapezi.',
    href: '/it/geometria',
    calculators: [
      {
        title: 'Area e Perimetro del Cerchio',
        label: 'Area e Perimetro del Cerchio',
        description: 'Calcola area e perimetro del cerchio conoscendo il raggio o il diametro',
        href: '/it/geometria/cerchio',
        category: 'Geometria',
        keywords: ['area cerchio', 'perimetro cerchio', 'raggio', 'diametro', 'circonferenza']
      },
      {
        title: 'Area e Perimetro del Rettangolo',
        label: 'Area e Perimetro del Rettangolo',
        description: 'Calcola area e perimetro del rettangolo conoscendo base e altezza',
        href: '/it/geometria/rettangolo',
        category: 'Geometria',
        keywords: ['area rettangolo', 'perimetro rettangolo', 'base', 'altezza']
      },
      {
        title: 'Area del Triangolo',
        label: 'Area del Triangolo',
        description: 'Calcola l\'area del triangolo con diversi metodi: base e altezza, formula di Erone',
        href: '/it/geometria/triangolo',
        category: 'Geometria',
        keywords: ['area triangolo', 'base', 'altezza', 'formula di Erone']
      },
      {
        title: 'Area e Perimetro del Quadrato',
        label: 'Area e Perimetro del Quadrato',
        description: 'Calcola area e perimetro del quadrato conoscendo il lato',
        href: '/it/geometria/quadrato',
        category: 'Geometria',
        keywords: ['area quadrato', 'perimetro quadrato', 'lato']
      },
      {
        title: 'Area e Perimetro del Rombo',
        label: 'Area e Perimetro del Rombo',
        description: 'Calcola area e perimetro del rombo conoscendo le diagonali o il lato',
        href: '/it/geometria/rombo',
        category: 'Geometria',
        keywords: ['area rombo', 'perimetro rombo', 'diagonali', 'lato']
      },
      {
        title: 'Area del Trapezio',
        label: 'Area del Trapezio',
        description: 'Calcola l\'area del trapezio conoscendo le basi e l\'altezza',
        href: '/it/geometria/trapezio',
        category: 'Geometria',
        keywords: ['area trapezio', 'basi', 'altezza', 'trapezio isoscele']
      }
    ]
  }

  const customIcons = {
    'Area e Perimetro del Cerchio': Circle,
    'Area e Perimetro del Rettangolo': RectangleHorizontal,
    'Area del Triangolo': Triangle,
    'Area e Perimetro del Quadrato': Square,
    'Area e Perimetro del Rombo': Diamond,
    'Area del Trapezio': Hexagon
  }

  const customStats = [
    {
      icon: Circle,
      value: geometriaClusterIT.calculators.length.toString(),
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '6',
      label: 'Figure Geometriche',
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
      question: 'Sono gratuite tutte le calcolatrici di geometria?',
      answer: 'Sì, tutte le nostre calcolatrici geometriche sono completamente gratuite. Non richiedono registrazione né hanno limiti di utilizzo.'
    },
    {
      question: 'Quali figure geometriche posso calcolare?',
      answer: 'Offriamo calcolatrici per cerchi, rettangoli, triangoli, quadrati, rombi e trapezi. Ognuna include diversi metodi di calcolo.'
    },
    {
      question: 'Come funzionano le formule mostrate?',
      answer: 'Ogni calcolatrice mostra le formule utilizzate e il processo passo a passo per farti capire come si arriva al risultato.'
    },
    {
      question: 'Posso calcolare con diverse unità di misura?',
      answer: 'Le calcolatrici lavorano con le unità che inserisci (cm, m, pollici, ecc.) e mostrano i risultati nelle stesse unità.'
    },
    {
      question: 'I risultati sono precisi?',
      answer: 'Sì, utilizziamo formule matematiche precise e testate. Per calcoli critici raccomandiamo sempre di verificare i risultati manualmente.'
    }
  ]

  return (
    <CategoryPageLayout
      category={geometriaClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
