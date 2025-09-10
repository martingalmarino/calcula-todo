"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Coffee, Pizza, Heart, Film, Thermometer, Target } from 'lucide-react'

export default function CuriosasClientIT() {
  const curiosasClusterIT = {
    title: 'Curiose',
    label: 'Curiose',
    description: 'Calcolatrici curiose e divertenti per scoprire aspetti insoliti della vita quotidiana: caffè, pizza, aspettativa di vita e molto altro.',
    href: '/it/curiosas',
    calculators: [
      {
        title: 'Caffè vs. Risparmio',
        label: 'Caffè vs. Risparmio',
        description: 'Scopri quanto risparmieresti se smettessi di prendere il caffè ogni giorno',
        href: '/it/curiosas/caffe-risparmio',
        category: 'Curiose',
        keywords: ['caffè', 'risparmio', 'denaro', 'interesse composto']
      },
      {
        title: 'Pizza per Persona',
        label: 'Pizza per Persona',
        description: 'Calcola quante pizze servono per il tuo gruppo di amici',
        href: '/it/curiosas/pizza-persona',
        category: 'Curiose',
        keywords: ['pizza', 'porzioni', 'persone', 'cibo']
      },
      {
        title: 'Aspettativa di Vita e Cibo',
        label: 'Aspettativa di Vita e Cibo',
        description: 'Scopri come il cibo spazzatura influisce sulla tua aspettativa di vita',
        href: '/it/curiosas/aspettativa-vita-cibo',
        category: 'Curiose',
        keywords: ['aspettativa vita', 'cibo spazzatura', 'salute', 'calorie']
      },
      {
        title: 'Baci Brucia Calorie',
        label: 'Baci Brucia Calorie',
        description: 'Calcola quante calorie bruci baciando e abbracciando',
        href: '/it/curiosas/baci-brucia-calorie',
        category: 'Curiose',
        keywords: ['baci', 'abbracci', 'calorie', 'esercizio']
      },
      {
        title: 'Tempo nei Film',
        label: 'Tempo nei Film',
        description: 'Scopri quanto tempo della tua vita hai passato guardando film',
        href: '/it/curiosas/tempo-film',
        category: 'Curiose',
        keywords: ['film', 'tempo', 'cinema', 'intrattenimento']
      },
      {
        title: 'Livello di Freddoloso',
        label: 'Livello di Freddoloso',
        description: 'Scopri il tuo livello di freddoloso basato su temperatura e abbigliamento',
        href: '/it/curiosas/livello-freddoloso',
        category: 'Curiose',
        keywords: ['freddoloso', 'temperatura', 'abbigliamento', 'meteo']
      }
    ]
  }

  const customIcons = {
    'Caffè vs. Risparmio': Coffee,
    'Pizza per Persona': Pizza,
    'Aspettativa di Vita e Cibo': Heart,
    'Baci Brucia Calorie': Target,
    'Tempo nei Film': Film,
    'Livello di Freddoloso': Thermometer
  }

  const customStats = [
    {
      icon: Coffee,
      value: '6',
      label: 'Calcolatrici Curiose',
      color: 'blue' as const
    },
    {
      icon: Heart,
      value: '100%',
      label: 'Traduzione Italiana',
      color: 'green' as const
    },
    {
      icon: Film,
      value: '2024',
      label: 'Ultimo Aggiornamento',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: 'Cosa sono le calcolatrici curiose?',
      answer: 'Sono calcolatrici divertenti e insolite che ti permettono di scoprire aspetti curiosi della vita quotidiana, dal risparmio del caffè al tempo passato guardando film.'
    },
    {
      question: 'Le calcolatrici curiose sono accurate?',
      answer: 'Sì, utilizzano dati scientifici e statistiche reali per fornire risultati accurati e divertenti sui vari aspetti della vita quotidiana.'
    },
    {
      question: 'Posso usare queste calcolatrici per scopi seri?',
      answer: 'Anche se sono divertenti, molte di queste calcolatrici forniscono informazioni utili per la vita quotidiana, come il risparmio a lungo termine o la gestione del tempo.'
    },
    {
      question: 'Ci sono altre calcolatrici curiose in arrivo?',
      answer: 'Sì, stiamo sempre aggiungendo nuove calcolatrici curiose e divertenti per rendere la matematica più interessante e coinvolgente.'
    }
  ]

  return (
    <CategoryPageLayout
      category={curiosasClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
