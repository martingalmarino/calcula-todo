"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Heart, Coffee, Target, Beer, Dog, Pizza } from 'lucide-react'

export default function KuriosesClientDE() {
  const kuriosesClusterDE = {
    title: 'Kurioses',
    label: 'Kurioses',
    description: 'Lustige und interessante Rechner für Kurioses: Kuss-Kalorien, Kaffee-Spar, Liebes-Rechner, Bier-Party, Alter-Tiere und Pizza-Person. Unterhaltsame Berechnungen für den Alltag.',
    href: '/de/kurioses',
    calculators: [
      {
        title: 'Kuss-Kalorien-Rechner',
        label: 'Kuss-Kalorien-Rechner',
        description: 'Berechnen Sie Kalorien, die durch Küsse, Umarmungen und Lachen verbrannt werden',
        href: '/de/kurioses/kuss-kalorien',
        category: 'Kurioses',
        keywords: ['kuss', 'kalorien', 'umarmungen', 'lachen', 'gesundheit']
      },
      {
        title: 'Kaffee-Spar-Rechner',
        label: 'Kaffee-Spar-Rechner',
        description: 'Berechnen Sie, wie viel Sie sparen könnten, wenn Sie auf täglichen Kaffee verzichten',
        href: '/de/kurioses/kaffee-spar',
        category: 'Kurioses',
        keywords: ['kaffee', 'sparen', 'geld', 'zinsen', 'investition']
      },
      {
        title: 'Liebes-Rechner',
        label: 'Liebes-Rechner',
        description: 'Berechnen Sie die Liebeskompatibilität zwischen zwei Namen',
        href: '/de/kurioses/liebes',
        category: 'Kurioses',
        keywords: ['liebe', 'kompatibilität', 'namen', 'beziehung', 'romantik']
      },
      {
        title: 'Bier-Party-Rechner',
        label: 'Bier-Party-Rechner',
        description: 'Berechnen Sie, wie viel Bier Sie für Ihre Party benötigen',
        href: '/de/kurioses/bier-party',
        category: 'Kurioses',
        keywords: ['bier', 'party', 'gäste', 'konsum', 'planung']
      },
      {
        title: 'Alter-Tiere-Rechner',
        label: 'Alter-Tiere-Rechner',
        description: 'Konvertieren Sie das Alter Ihrer Haustiere in Menschenjahre',
        href: '/de/kurioses/alter-tiere',
        category: 'Kurioses',
        keywords: ['tiere', 'alter', 'haustiere', 'hunde', 'katzen']
      },
      {
        title: 'Pizza-Person-Rechner',
        label: 'Pizza-Person-Rechner',
        description: 'Berechnen Sie, wie viele Pizzen Sie für eine bestimmte Anzahl von Personen benötigen',
        href: '/de/kurioses/pizza-person',
        category: 'Kurioses',
        keywords: ['pizza', 'personen', 'portionen', 'hunger', 'planung']
      }
    ]
  }

  const customIcons = {
    'Kuss-Kalorien-Rechner': Heart,
    'Kaffee-Spar-Rechner': Coffee,
    'Liebes-Rechner': Heart,
    'Bier-Party-Rechner': Beer,
    'Alter-Tiere-Rechner': Dog,
    'Pizza-Person-Rechner': Pizza
  }

  const customStats = [
    {
      icon: Heart,
      value: kuriosesClusterDE.calculators.length.toString(),
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
      icon: Target,
      value: 'Unterhaltsam',
      label: 'Berechnungen',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Was sind Kurioses-Rechner?",
      answer: "Kurioses-Rechner sind lustige und interessante Berechnungen für den Alltag, die auf wissenschaftlichen Grundlagen basieren, aber mit einem unterhaltsamen Twist präsentiert werden."
    },
    {
      question: "Sind diese Berechnungen wissenschaftlich korrekt?",
      answer: "Die Berechnungen basieren auf realen Daten und Formeln, sind aber für Unterhaltungszwecke vereinfacht. Sie sollten nicht als medizinische oder finanzielle Beratung betrachtet werden."
    },
    {
      question: "Kann ich diese Rechner für ernsthafte Zwecke verwenden?",
      answer: "Diese Rechner sind hauptsächlich für Unterhaltung und Bildung gedacht. Für wichtige Entscheidungen sollten Sie immer professionelle Beratung einholen."
    },
    {
      question: "Wie oft werden die Berechnungen aktualisiert?",
      answer: "Die zugrunde liegenden Formeln und Daten werden regelmäßig überprüft und aktualisiert, um die bestmögliche Genauigkeit zu gewährleisten."
    },
    {
      question: "Kann ich Vorschläge für neue Kurioses-Rechner machen?",
      answer: "Ja! Wir freuen uns über Ihre Vorschläge. Kontaktieren Sie uns über unsere Kontaktseite mit Ihren Ideen für neue unterhaltsame Rechner."
    }
  ]

  return (
    <CategoryPageLayout
      category={kuriosesClusterDE}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
