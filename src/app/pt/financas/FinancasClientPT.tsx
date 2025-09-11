"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { TrendingUp, Home, Car, Target, DollarSign, Calculator } from 'lucide-react'

const finanzasCluster = SITE.clusters.finanzas

export default function FinancasClientPT() {
  const customIcons = {
    '/pt/financas/juros-simples/': TrendingUp,
    '/pt/financas/calculadora-financiamento/': Home,
    '/pt/financas/depreciacao-veiculos/': Car,
    '/pt/financas/poupanca-objetivo/': Target,
    '/pt/financas/valor-futuro-presente/': DollarSign,
    '/pt/financas/calculadora-ipca/': DollarSign
  }

  const customStats = [
    {
      icon: Calculator,
      value: finanzasCluster.calculators.length.toString(),
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: TrendingUp,
      value: '100%',
      label: 'Gratuitas',
      color: 'green' as const
    },
    {
      icon: DollarSign,
      value: 'Precisas',
      label: 'Cálculos Financeiros',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "O que são juros simples?",
      answer: "Os juros simples são calculados apenas sobre o capital inicial, sem considerar os juros acumulados de períodos anteriores. É ideal para empréstimos curtos e operações simples."
    },
    {
      question: "Como calcular a depreciação de um veículo?",
      answer: "A depreciação é calculada considerando o valor inicial do veículo, sua vida útil estimada e o método de depreciação (linear, acelerada, etc.). Nossa calculadora usa métodos padrão do mercado."
    },
    {
      question: "O que inclui o cálculo de financiamento?",
      answer: "O cálculo de financiamento inclui o desdobramento mensal de capital e juros, o total de juros a pagar e o cronograma de pagamentos para ajudá-lo a planejar seu orçamento."
    },
    {
      question: "Para que serve o IPCA?",
      answer: "O Índice Nacional de Preços ao Consumidor Amplo (IPCA) mede a inflação e ajuda a calcular o poder de compra do dinheiro no tempo, essencial para planejamento financeiro."
    },
    {
      question: "Como funciona a calculadora de poupança objetivo?",
      answer: "Ajuda a determinar quanto você precisa poupar mensalmente para alcançar uma meta financeira específica em um tempo determinado, considerando a taxa de juros."
    },
    {
      question: "Qual a diferença entre valor futuro e presente?",
      answer: "O valor presente é o valor atual de um montante futuro, considerando uma taxa de desconto. O valor futuro é quanto um investimento atual valerá em uma data futura."
    }
  ]

  // Mapear as calculadoras para português
  const calculatorsPT = finanzasCluster.calculators.map(calc => {
    let href = calc.href.replace('/finanzas/', '/pt/financas/')
    
    // Corrigir nomes das pastas para coincidir com as que vamos criar
    if (href.includes('interes-simple')) {
      href = href.replace('interes-simple', 'juros-simples')
    }
    if (href.includes('hipoteca')) {
      href = href.replace('hipoteca', 'calculadora-financiamento')
    }
    if (href.includes('depreciacion-vehiculos')) {
      href = href.replace('depreciacion-vehiculos', 'depreciacao-veiculos')
    }
    if (href.includes('ahorro-objetivo')) {
      href = href.replace('ahorro-objetivo', 'poupanca-objetivo')
    }
    if (href.includes('valor-futuro-presente')) {
      href = href.replace('valor-futuro-presente', 'valor-futuro-presente')
    }
    if (href.includes('ipc')) {
      href = href.replace('ipc', 'calculadora-ipca')
    }
    
    return {
      ...calc,
      href,
      label: calc.label === 'Interés Simple' ? 'Juros Simples' :
             calc.label === 'Hipoteca' ? 'Calculadora de Financiamento' :
             calc.label === 'Depreciación de Vehículos' ? 'Depreciação de Veículos' :
             calc.label === 'Ahorro Objetivo' ? 'Poupança Objetivo' :
             calc.label === 'Valor Futuro y Presente' ? 'Valor Futuro e Presente' :
             calc.label === 'IPC' ? 'Calculadora do IPCA' :
             calc.label,
      description: calc.description === 'Calcular interés simple para préstamos cortos, descuentos y deudas básicas'
        ? 'Calcular juros simples para empréstimos curtos, descontos e dívidas básicas'
        : calc.description === 'Calcular hipotecas con desglose mensual de capital e intereses'
        ? 'Calcular financiamentos com desdobramento mensal de capital e juros'
        : calc.description === 'Calcular la depreciación de vehículos usando métodos estándar del mercado'
        ? 'Calcular a depreciação de veículos usando métodos padrão do mercado'
        : calc.description === 'Calcular cuánto ahorrar mensualmente para alcanzar una meta financiera'
        ? 'Calcular quanto poupar mensalmente para alcançar uma meta financeira'
        : calc.description === 'Calcular valor futuro y presente de inversiones con interés compuesto'
        ? 'Calcular valor futuro e presente de investimentos com juros compostos'
        : calc.description === 'Calcular el impacto de la inflación en el poder adquisitivo del dinero'
        ? 'Calcular o impacto da inflação no poder de compra do dinheiro'
        : calc.description
    }
  })

  // Criar objeto category para português
  const categoryPT = {
    ...finanzasCluster,
    label: 'Finanças',
    description: 'Calculadoras financeiras para juros simples, financiamentos, depreciação de veículos, IPCA, poupança objetivo e valor futuro/presente.',
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
