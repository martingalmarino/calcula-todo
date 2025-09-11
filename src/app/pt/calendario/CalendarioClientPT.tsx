"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calendar, User, Clock, Plus, Plane, Calculator, Users } from 'lucide-react'

const calendarioCluster = {
  name: 'Calendário',
  label: 'Calendário',
  description: 'Ferramentas de calendário e datas: calcular dias entre datas, idade exata, somar/subtrair dias, horas e minutos, e dias de férias',
  href: '/pt/calendario/',
  calculators: [
    {
      name: 'Calculadora de Idade',
      label: 'Calculadora de Idade',
      description: 'Calcula sua idade exata em anos, meses e dias',
      href: '/pt/calendario/calculadora-idade/',
      icon: 'user',
      category: 'calendario',
      keywords: ['idade', 'anos', 'meses', 'dias', 'nascimento']
    },
    {
      name: 'Dias entre Datas',
      label: 'Dias entre Datas',
      description: 'Calcula a diferença em dias entre duas datas específicas',
      href: '/pt/calendario/dias-entre-datas/',
      icon: 'calendar',
      category: 'calendario',
      keywords: ['dias', 'datas', 'diferença', 'calendário']
    },
    {
      name: 'Dias de Férias',
      label: 'Dias de Férias',
      description: 'Calcula os dias de férias entre duas datas',
      href: '/pt/calendario/dias-ferias/',
      icon: 'plane',
      category: 'calendario',
      keywords: ['férias', 'dias', 'trabalho', 'descanso']
    },
    {
      name: 'Horas e Minutos',
      label: 'Horas e Minutos',
      description: 'Calcula e converte entre horas e minutos',
      href: '/pt/calendario/horas-e-minutos/',
      icon: 'clock',
      category: 'calendario',
      keywords: ['horas', 'minutos', 'tempo', 'conversão']
    },
    {
      name: 'Somar e Subtrair Dias',
      label: 'Somar e Subtrair Dias',
      description: 'Soma ou subtrai dias a uma data específica',
      href: '/pt/calendario/somar-e-subtrair-dias/',
      icon: 'plus',
      category: 'calendario',
      keywords: ['somar', 'subtrair', 'dias', 'data']
    }
  ]
}

export default function CalendarioClientPT() {
  const customIcons = {
    '/pt/calendario/calculadora-idade/': User,
    '/pt/calendario/dias-entre-datas/': Calendar,
    '/pt/calendario/dias-ferias/': Plane,
    '/pt/calendario/horas-e-minutos/': Clock,
    '/pt/calendario/somar-e-subtrair-dias/': Plus
  }

  const customStats = [
    {
      icon: Calculator,
      value: calendarioCluster.calculators.length.toString(),
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: Calendar,
      value: '5',
      label: 'Ferramentas de Tempo',
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
      question: "Como funciona a calculadora de idade?",
      answer: "A calculadora de idade calcula sua idade exata em anos, meses e dias desde sua data de nascimento até a data atual ou uma data específica que você escolher."
    },
    {
      question: "Posso calcular dias entre duas datas?",
      answer: "Sim! Nossa calculadora de dias entre datas mostra a diferença exata em dias, semanas, meses e anos entre duas datas específicas."
    },
    {
      question: "Como somar ou subtrair dias de uma data?",
      answer: "Use nossa calculadora de somar/subtrair dias para adicionar ou remover um número específico de dias de qualquer data, mostrando o resultado e o dia da semana."
    },
    {
      question: "Posso converter entre horas e minutos?",
      answer: "Sim! Nossa calculadora de horas e minutos permite somar, subtrair e converter entre diferentes unidades de tempo."
    },
    {
      question: "Como calcular dias de férias?",
      answer: "A calculadora de dias de férias mostra o total de dias entre duas datas, separando dias úteis e fins de semana para planejamento de férias."
    }
  ]

  return (
    <CategoryPageLayout
      category={calendarioCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
