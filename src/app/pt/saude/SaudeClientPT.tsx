"use client"

import { Heart, Activity, Droplets, Moon, Dumbbell, Target, Users, Clock, TrendingUp } from 'lucide-react'

export function SaudeClientPT() {
  const saudeCluster = {
    label: 'Saúde',
    description: 'Calculadoras de saúde para monitorar seu bem-estar físico e mental',
    href: '/pt/saude/',
    calculators: [
      {
        label: 'IMC',
        description: 'Calcule seu Índice de Massa Corporal e descubra sua categoria de peso',
        href: '/pt/saude/imc/',
        icon: 'activity',
        category: 'saude',
        keywords: ['IMC', 'peso', 'altura', 'massa corporal']
      },
      {
        label: 'Peso Ideal',
        description: 'Descubra qual é o peso ideal para sua altura e tipo corporal',
        href: '/pt/saude/peso-ideal/',
        icon: 'target',
        category: 'saude',
        keywords: ['peso ideal', 'altura', 'tipo corporal']
      },
      {
        label: 'Calorias',
        description: 'Calcule suas necessidades calóricas diárias baseadas em seu estilo de vida',
        href: '/pt/saude/calorias/',
        icon: 'flame',
        category: 'saude',
        keywords: ['calorias', 'TMB', 'metabolismo', 'dieta']
      },
      {
        label: 'Água',
        description: 'Descubra quanta água você deve beber por dia para manter-se hidratado',
        href: '/pt/saude/agua/',
        icon: 'droplets',
        category: 'saude',
        keywords: ['água', 'hidratação', 'líquidos']
      },
      {
        label: 'Sono',
        description: 'Calcule seus ciclos de sono e descubra os melhores horários para dormir',
        href: '/pt/saude/sono/',
        icon: 'moon',
        category: 'saude',
        keywords: ['sono', 'ciclos', 'descanso', 'horário']
      },
      {
        label: 'Exercício',
        description: 'Calcule calorias queimadas e intensidade de exercícios',
        href: '/pt/saude/exercicio/',
        icon: 'dumbbell',
        category: 'saude',
        keywords: ['exercício', 'calorias queimadas', 'atividade física']
      }
    ]
  }

  const customIcons = {
    'activity': Activity,
    'target': Target,
    'flame': TrendingUp,
    'droplets': Droplets,
    'moon': Moon,
    'dumbbell': Dumbbell
  }

  const stats = [
    {
      icon: Heart,
      value: '6',
      label: 'Calculadoras de Saúde',
      color: 'red' as const
    },
    {
      icon: Users,
      value: '100%',
      label: 'Gratuitas',
      color: 'green' as const
    },
    {
      icon: Clock,
      value: 'Precisas',
      label: 'Cálculos',
      color: 'blue' as const
    }
  ]

  const faqItems = [
    {
      question: 'Como funcionam as calculadoras de saúde?',
      answer: 'Nossas calculadoras usam fórmulas científicas reconhecidas para fornecer estimativas precisas de parâmetros de saúde como IMC, necessidades calóricas e hidratação.'
    },
    {
      question: 'Os resultados são precisos?',
      answer: 'Sim, usamos fórmulas médicas e científicas validadas. No entanto, sempre consulte um profissional de saúde para diagnósticos e tratamentos.'
    },
    {
      question: 'Posso usar essas calculadoras para diagnóstico médico?',
      answer: 'Não. Estas calculadoras são apenas para fins informativos e educacionais. Sempre consulte um médico para diagnósticos e tratamentos médicos.'
    },
    {
      question: 'Com que frequência devo recalcular?',
      answer: 'Recomendamos recalcular periodicamente, especialmente se houver mudanças significativas no peso, altura, idade ou nível de atividade física.'
    },
    {
      question: 'As calculadoras são adequadas para todas as idades?',
      answer: 'A maioria das calculadoras é adequada para adultos. Para crianças e adolescentes, consulte um pediatra para interpretação adequada dos resultados.'
    },
    {
      question: 'Posso confiar nos resultados para tomar decisões de saúde?',
      answer: 'Os resultados são baseados em fórmulas científicas, mas devem ser usados apenas como orientação. Sempre consulte profissionais de saúde qualificados para decisões importantes.'
    }
  ]

  return {
    saudeCluster,
    customIcons,
    stats,
    faqItems
  }
}
