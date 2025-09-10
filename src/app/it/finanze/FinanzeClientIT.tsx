"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { TrendingUp, Home, Car, Target, DollarSign, Calculator } from 'lucide-react'

export default function FinanzeClientIT() {
  const finanzeClusterIT = {
    title: 'Finanze',
    label: 'Finanze',
    description: 'Calcolatrici finanziarie per gestire mutui, investimenti, deprezzamento veicoli, interesse semplice e pianificazione del risparmio.',
    href: '/it/finanze',
    calculators: [
      {
        title: 'Interesse Semplice',
        label: 'Interesse Semplice',
        description: 'Calcola l\'interesse semplice per prestiti brevi e operazioni finanziarie di base',
        href: '/it/finanze/interesse-semplice',
        category: 'Finanze',
        keywords: ['interesse semplice', 'prestiti', 'finanze', 'calcolo interesse']
      },
      {
        title: 'Deprezzamento Veicoli',
        label: 'Deprezzamento Veicoli',
        description: 'Calcola la perdita di valore del tuo veicolo nel tempo usando il metodo lineare',
        href: '/it/finanze/deprezzamento-veicoli',
        category: 'Finanze',
        keywords: ['deprezzamento', 'veicoli', 'auto', 'perdita valore']
      },
      {
        title: 'Calcolatrice di Mutuo',
        label: 'Calcolatrice di Mutuo',
        description: 'Calcola le rate mensili, interessi totali e piano di ammortamento per il tuo mutuo',
        href: '/it/finanze/calcolatrice-mutuo',
        category: 'Finanze',
        keywords: ['mutuo', 'rate', 'casa', 'prestito immobiliare']
      },
      {
        title: 'Calcolatrice dell\'IPC',
        label: 'Calcolatrice dell\'IPC',
        description: 'Calcola il potere d\'acquisto e l\'inflazione usando l\'Indice dei Prezzi al Consumo',
        href: '/it/finanze/calcolatrice-ipc',
        category: 'Finanze',
        keywords: ['IPC', 'inflazione', 'potere acquisto', 'prezzi']
      },
      {
        title: 'Risparmio Obiettivo',
        label: 'Risparmio Obiettivo',
        description: 'Calcola quanto devi risparmiare mensilmente per raggiungere i tuoi obiettivi finanziari',
        href: '/it/finanze/risparmio-obiettivo',
        category: 'Finanze',
        keywords: ['risparmio', 'obiettivo', 'pianificazione', 'investimenti']
      },
      {
        title: 'Valore Futuro e Presente',
        label: 'Valore Futuro e Presente',
        description: 'Calcola il valore futuro degli investimenti e il valore presente di somme future',
        href: '/it/finanze/valore-futuro-presente',
        category: 'Finanze',
        keywords: ['valore futuro', 'valore presente', 'investimenti', 'sconto']
      }
    ]
  }

  const customIcons = {
    'Interesse Semplice': TrendingUp,
    'Calcolatrice di Mutuo': Home,
    'Deprezzamento Veicoli': Car,
    'Risparmio Obiettivo': Target,
    'Valore Futuro e Presente': DollarSign,
    'Calcolatrice dell\'IPC': Calculator
  }

  const customStats = [
    {
      icon: TrendingUp,
      value: finanzeClusterIT.calculators.length.toString(),
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: TrendingUp,
      value: '100%',
      label: 'Gratuite',
      color: 'green' as const
    },
    {
      icon: DollarSign,
      value: 'Precise',
      label: 'Calcoli Finanziari',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Cos'è l'interesse semplice?",
      answer: "L'interesse semplice è l'interesse che si calcola unicamente sul capitale iniziale, senza considerare gli interessi accumulati dei periodi precedenti. È ideale per prestiti brevi e operazioni semplici."
    },
    {
      question: "Come si calcola il deprezzamento di un veicolo?",
      answer: "Il deprezzamento si calcola considerando il valore iniziale del veicolo, la sua vita utile stimata e il metodo di deprezzamento (lineare, accelerato, ecc.). La nostra calcolatrice usa metodi standard del mercato."
    },
    {
      question: "Cosa include il calcolo del mutuo?",
      answer: "Il calcolo del mutuo include lo scomposizione mensile di capitale e interessi, il totale degli interessi da pagare, e il cronogramma dei pagamenti per aiutarti a pianificare il tuo budget."
    },
    {
      question: "A cosa serve l'IPC?",
      answer: "L'Indice dei Prezzi al Consumo (IPC) misura l'inflazione e ti aiuta a calcolare il potere d'acquisto del denaro nel tempo, essenziale per la pianificazione finanziaria."
    },
    {
      question: "Come funziona la calcolatrice di risparmio obiettivo?",
      answer: "Ti aiuta a determinare quanto devi risparmiare mensilmente per raggiungere un obiettivo finanziario specifico in un tempo determinato, considerando il tasso di interesse."
    }
  ]

  return (
    <CategoryPageLayout
      category={finanzeClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
