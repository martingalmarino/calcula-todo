"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Heart, Scale, Target, Droplets, Moon, Activity } from 'lucide-react'

export default function GesundheitClientDE() {
  const gesundheitClusterDE = {
    title: 'Gesundheit',
    label: 'Gesundheit',
    description: 'Gesundheitsrechner für BMI, Idealgewicht, Kalorien, Wasser, Schlaf und Sport. Präzise Gesundheitstools für Ihr Wohlbefinden.',
    href: '/de/gesundheit',
    calculators: [
      {
        title: 'BMI-Rechner',
        label: 'BMI-Rechner',
        description: 'Berechnen Sie Ihren Body-Mass-Index und bewerten Sie Ihr Gewicht',
        href: '/de/gesundheit/bmi',
        category: 'Gesundheit',
        keywords: ['bmi', 'gewicht', 'gesundheit', 'körpermasse']
      },
      {
        title: 'Idealgewicht-Rechner',
        label: 'Idealgewicht-Rechner',
        description: 'Berechnen Sie Ihr ideales Gewicht basierend auf Ihrer Größe und Ihrem Geschlecht',
        href: '/de/gesundheit/idealgewicht',
        category: 'Gesundheit',
        keywords: ['idealgewicht', 'gewicht', 'größe', 'gesundheit']
      },
      {
        title: 'Kalorien-Rechner',
        label: 'Kalorien-Rechner',
        description: 'Berechnen Sie Ihren täglichen Kalorienbedarf basierend auf Ihrem Aktivitätsniveau',
        href: '/de/gesundheit/kalorien',
        category: 'Gesundheit',
        keywords: ['kalorien', 'ernährung', 'stoffwechsel', 'energie']
      },
      {
        title: 'Wasser-Rechner',
        label: 'Wasser-Rechner',
        description: 'Berechnen Sie Ihre tägliche Wasseraufnahme basierend auf Gewicht und Aktivität',
        href: '/de/gesundheit/wasser',
        category: 'Gesundheit',
        keywords: ['wasser', 'hydratation', 'flüssigkeit', 'gesundheit']
      },
      {
        title: 'Schlaf-Rechner',
        label: 'Schlaf-Rechner',
        description: 'Berechnen Sie optimale Schlafzeiten basierend auf Schlafzyklen',
        href: '/de/gesundheit/schlaf',
        category: 'Gesundheit',
        keywords: ['schlaf', 'schlafzyklen', 'erholung', 'gesundheit']
      },
      {
        title: 'Sport-Rechner',
        label: 'Sport-Rechner',
        description: 'Berechnen Sie verbrannte Kalorien bei verschiedenen Sportarten',
        href: '/de/gesundheit/sport',
        category: 'Gesundheit',
        keywords: ['sport', 'kalorien', 'fitness', 'training']
      }
    ]
  }

  const customIcons = {
    'BMI-Rechner': Scale,
    'Idealgewicht-Rechner': Target,
    'Kalorien-Rechner': Activity,
    'Wasser-Rechner': Droplets,
    'Schlaf-Rechner': Moon,
    'Sport-Rechner': Heart
  }

  const customStats = [
    {
      icon: Heart,
      value: gesundheitClusterDE.calculators.length.toString(),
      label: 'Rechner Verfügbar',
      color: 'blue' as const
    },
    {
      icon: Heart,
      value: '100%',
      label: 'Kostenlos',
      color: 'green' as const
    },
    {
      icon: Activity,
      value: 'Präzise',
      label: 'Gesundheitsberechnungen',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Was ist der BMI und wie wird er berechnet?",
      answer: "Der Body-Mass-Index (BMI) ist ein Maß für das Verhältnis von Gewicht zu Körpergröße. Er wird berechnet als Gewicht (kg) geteilt durch die Körpergröße (m) zum Quadrat."
    },
    {
      question: "Wie viel Wasser sollte ich täglich trinken?",
      answer: "Die empfohlene Wasseraufnahme hängt von Gewicht, Alter und Aktivitätsniveau ab. Als Faustregel gelten 35ml pro kg Körpergewicht, angepasst an Ihre individuellen Bedürfnisse."
    },
    {
      question: "Was sind Schlafzyklen und warum sind sie wichtig?",
      answer: "Schlafzyklen dauern etwa 90 Minuten und bestehen aus verschiedenen Schlafphasen. 5 vollständige Zyklen (7,5 Stunden) sind ideal für die meisten Menschen."
    },
    {
      question: "Wie berechne ich meinen täglichen Kalorienbedarf?",
      answer: "Der tägliche Kalorienbedarf wird basierend auf der Grundumsatzrate (BMR) und dem Aktivitätsniveau berechnet. Die Mifflin-St Jeor-Formel wird als Standard verwendet."
    },
    {
      question: "Welche Faktoren beeinflussen das Idealgewicht?",
      answer: "Das Idealgewicht hängt von Größe, Geschlecht, Alter, Körperzusammensetzung und Aktivitätsniveau ab. Es ist nur eine Schätzung und sollte mit einem Gesundheitsfachmann besprochen werden."
    }
  ]

  return (
    <CategoryPageLayout
      category={gesundheitClusterDE}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
