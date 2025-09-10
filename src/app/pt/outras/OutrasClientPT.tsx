"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, GraduationCap, Fuel, Type, Hash, MousePointer, DollarSign, Users } from 'lucide-react'

const outrasCluster = SITE.clusters.otras

export default function OutrasClientPT() {
  const customIcons = {
    '/pt/outras/escala-notas/': GraduationCap,
    '/pt/outras/gasto-gasolina/': Fuel,
    '/pt/outras/contador-palavras/': Type,
    '/pt/outras/numeros-romanos/': Hash,
    '/pt/outras/contador-cliques/': MousePointer,
    '/pt/outras/calculadora-gorjeta/': DollarSign
  }

  const customStats = [
    {
      icon: Calculator,
      value: outrasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: Type,
      value: '6',
      label: 'Ferramentas Úteis',
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
      question: "Como funciona a calculadora de gorjetas?",
      answer: "Digite o valor da conta e a porcentagem de gorjeta desejada. A calculadora mostrará a gorjeta exata e o total a pagar."
    },
    {
      question: "Posso contar palavras e caracteres em tempo real?",
      answer: "Sim, nossa calculadora conta automaticamente palavras, caracteres (com e sem espaços) enquanto você digita seu texto."
    },
    {
      question: "Como converter números romanos?",
      answer: "Digite um número arábico (1-3999) para converter para romano, ou um número romano para converter para arábico. Suporta validação automática."
    },
    {
      question: "O que é o teste CPS (cliques por segundo)?",
      answer: "É um teste que mede quantos cliques você consegue fazer por segundo. Útil para testar velocidade de cliques e coordenação."
    },
    {
      question: "Como calcular o gasto de gasolina em uma viagem?",
      answer: "Digite a distância da viagem, o consumo do veículo (km/l) e o preço da gasolina. A calculadora mostrará o custo total da viagem."
    },
    {
      question: "Como funciona a escala de notas?",
      answer: "Digite sua pontuação e a pontuação máxima. A calculadora converterá para escala de letras (A, B, C, D, F) com base em percentuais padrão."
    }
  ]


  // Mapear as calculadoras para português
  const calculatorsPT = outrasCluster.calculators.map(calc => ({
    ...calc,
    href: calc.href.replace('/otras/', '/pt/outras/'),
    label: calc.label === 'Calculadora de Propinas' ? 'Calculadora de Gorjeta' : calc.label,
    description: calc.description === 'Calcula la propina y el total a pagar en restaurantes' 
      ? 'Calcula a gorjeta e o total a pagar em restaurantes'
      : calc.description === 'Convierte puntuaciones numéricas a escala de calificaciones A, B, C, D, F'
      ? 'Converte pontuações numéricas para escala de notas A, B, C, D, F'
      : calc.description === 'Calcula el gasto de gasolina para un viaje'
      ? 'Calcula o gasto de gasolina para uma viagem'
      : calc.description === 'Cuenta palabras, caracteres, oraciones y párrafos en tiempo real'
      ? 'Conta palavras, caracteres, frases e parágrafos em tempo real'
      : calc.description === 'Convierte números arábigos a romanos y viceversa'
      ? 'Converte números arábicos para romanos e vice-versa'
      : calc.description === 'Mide tu velocidad de clics por segundo (CPS)'
      ? 'Mede sua velocidade de cliques por segundo (CPS)'
      : calc.description
  }))

  // Criar objeto category para português
  const categoryPT = {
    ...outrasCluster,
    label: 'Outras Calculadoras',
    description: 'Calculadoras úteis para diversas situações: gorjetas, gasto de gasolina, contador de palavras, números romanos, contador de cliques e escala de notas.',
    calculators: calculatorsPT
  }

  return (
    <CategoryPageLayout
      category={categoryPT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
