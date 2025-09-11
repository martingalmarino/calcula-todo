"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, BookOpen, Users, Divide, Percent, Zap, X, Triangle, TrendingUp } from 'lucide-react'

const matematicasCluster = SITE.clusters.matematicas

export default function MatematicaClientPT() {
  const customIcons = {
    '/pt/matematica/fracoes/': Divide,
    '/pt/matematica/percentuais/': Percent,
    '/pt/matematica/potencias-raizes/': Zap,
    '/pt/matematica/algebra/': X,
    '/pt/matematica/trigonometria/': Triangle,
    '/pt/matematica/derivadas/': TrendingUp
  }

  const customStats = [
    {
      icon: Calculator,
      value: '6',
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      value: '6+',
      label: 'Categorias Matemáticas',
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
      question: "São gratuitas todas as calculadoras?",
      answer: "Sim, todas as nossas calculadoras matemáticas são completamente gratuitas. Não requerem registro nem têm limites de uso."
    },
    {
      question: "Como funcionam as explicações passo a passo?",
      answer: "Cada calculadora mostra o processo completo de resolução, incluindo as fórmulas utilizadas e cada passo do cálculo para que você possa entender como se chega ao resultado."
    },
    {
      question: "Posso usar essas calculadoras na minha tarefa ou exame?",
      answer: "Nossas calculadoras são ferramentas educativas. Recomendamos verificar com seu professor se é permitido seu uso em tarefas ou exames específicos."
    },
    {
      question: "Que tipos de problemas matemáticos posso resolver?",
      answer: "Oferecemos calculadoras para aritmética básica, álgebra, trigonometria, cálculo, álgebra linear, combinatória, progressões e logaritmos. Cobrimos desde nível básico até universitário."
    },
    {
      question: "As calculadoras mostram o processo de resolução?",
      answer: "Sim, todas as calculadoras mostram o processo passo a passo, incluindo as fórmulas utilizadas e cada etapa do cálculo para facilitar o aprendizado."
    }
  ]

  // Mapear as calculadoras para português
  const calculatorsPT = matematicasCluster.calculators
    .filter(calc => ['Fracciones', 'Porcentajes', 'Potencias y Raíces', 'Álgebra', 'Trigonometría', 'Derivadas'].includes(calc.label))
    .map(calc => {
      let href = calc.href.replace('/matematicas/', '/pt/matematica/')
      
      // Corrigir nomes das pastas para coincidir com as que vamos criar
      if (href.includes('fracciones')) {
        href = href.replace('fracciones', 'fracoes')
      }
      if (href.includes('porcentajes')) {
        href = href.replace('porcentajes', 'percentuais')
      }
      if (href.includes('potencias-raices')) {
        href = href.replace('potencias-raices', 'potencias-raizes')
      }
      if (href.includes('algebra')) {
        href = href.replace('algebra', 'algebra')
      }
      if (href.includes('trigonometria')) {
        href = href.replace('trigonometria', 'trigonometria')
      }
      if (href.includes('derivadas')) {
        href = href.replace('derivadas', 'derivadas')
      }
      
      return {
        ...calc,
        href,
        label: calc.label === 'Fracciones' ? 'Calculadora de Frações' :
               calc.label === 'Porcentajes' ? 'Calculadora de Percentuais' :
               calc.label === 'Potencias y Raíces' ? 'Calculadora de Potências e Raízes' :
               calc.label === 'Álgebra' ? 'Calculadora de Álgebra' :
               calc.label === 'Trigonometría' ? 'Calculadora de Trigonometria' :
               calc.label === 'Derivadas' ? 'Calculadora de Derivadas' :
               calc.label,
        description: calc.description === 'Simplificar, convertir, sumar, restar, multiplicar y dividir fracciones'
          ? 'Simplificar, converter, somar, subtrair, multiplicar e dividir frações'
          : calc.description === 'Calcular porcentajes, descuentos, aumentos y variaciones porcentuales'
          ? 'Calcular percentuais, descontos, aumentos e variações percentuais'
          : calc.description === 'Calcular potencias, raíces cuadradas, cúbicas y n-ésimas'
          ? 'Calcular potências, raízes quadradas, cúbicas e n-ésimas'
          : calc.description === 'Resolver ecuaciones lineales, cuadráticas y sistemas de ecuaciones'
          ? 'Resolver equações lineares, quadráticas e sistemas de equações'
          : calc.description === 'Calcular seno, coseno, tangente y funciones trigonométricas inversas'
          ? 'Calcular seno, cosseno, tangente e funções trigonométricas inversas'
          : calc.description === 'Calcular derivadas numéricas y analíticas de funciones'
          ? 'Calcular derivadas numéricas e analíticas de funções'
          : calc.description
      }
    })

  // Criar objeto category para português
  const categoryPT = {
    ...matematicasCluster,
    label: 'Matemática',
    description: 'Calculadoras matemáticas para resolver operações de frações, percentuais, álgebra, trigonometria, cálculo e mais.',
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
