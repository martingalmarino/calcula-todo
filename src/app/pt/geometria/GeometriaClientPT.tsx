"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Circle, RectangleHorizontal, Triangle, Square, Diamond, Hexagon, Calculator, Shapes, Users } from 'lucide-react'

const geometriaCluster = {
  name: 'Geometria',
  label: 'Geometria',
  description: 'Calculadoras geométricas para calcular áreas, perímetros e propriedades de figuras planas como círculos, retângulos, triângulos, quadrados, losangos e trapézios',
  href: '/pt/geometria/',
  calculators: [
    {
      name: 'Área e Perímetro do Círculo',
      label: 'Área e Perímetro do Círculo',
      description: 'Calcula a área, perímetro, diâmetro e raio de um círculo',
      href: '/pt/geometria/circulo/',
      icon: 'circle',
      category: 'geometria',
      keywords: ['círculo', 'área', 'perímetro', 'raio', 'diâmetro', 'circunferência']
    },
    {
      name: 'Área e Perímetro do Retângulo',
      label: 'Área e Perímetro do Retângulo',
      description: 'Calcula a área e perímetro de um retângulo conhecendo suas dimensões',
      href: '/pt/geometria/retangulo/',
      icon: 'rectangle-horizontal',
      category: 'geometria',
      keywords: ['retângulo', 'área', 'perímetro', 'comprimento', 'largura', 'dimensões']
    },
    {
      name: 'Área do Triângulo',
      label: 'Área do Triângulo',
      description: 'Calcula a área de um triângulo com base e altura ou usando a fórmula de Herón',
      href: '/pt/geometria/triangulo/',
      icon: 'triangle',
      category: 'geometria',
      keywords: ['triângulo', 'área', 'base', 'altura', 'fórmula herón', 'lados']
    },
    {
      name: 'Área e Perímetro do Quadrado',
      label: 'Área e Perímetro do Quadrado',
      description: 'Calcula a área e perímetro de um quadrado conhecendo seu lado',
      href: '/pt/geometria/quadrado/',
      icon: 'square',
      category: 'geometria',
      keywords: ['quadrado', 'área', 'perímetro', 'lado', 'figuras regulares']
    },
    {
      name: 'Área e Perímetro do Losango',
      label: 'Área e Perímetro do Losango',
      description: 'Calcula a área e perímetro de um losango conhecendo suas diagonais ou lado e diagonal',
      href: '/pt/geometria/losango/',
      icon: 'diamond',
      category: 'geometria',
      keywords: ['losango', 'área', 'perímetro', 'diagonais', 'lado', 'paralelogramo']
    },
    {
      name: 'Área do Trapézio',
      label: 'Área do Trapézio',
      description: 'Calcula a área de um trapézio conhecendo suas bases e altura',
      href: '/pt/geometria/trapezio/',
      icon: 'hexagon',
      category: 'geometria',
      keywords: ['trapézio', 'área', 'bases', 'altura', 'lados paralelos']
    }
  ]
}

export default function GeometriaClientPT() {
  const customIcons = {
    '/pt/geometria/circulo/': Circle,
    '/pt/geometria/retangulo/': RectangleHorizontal,
    '/pt/geometria/triangulo/': Triangle,
    '/pt/geometria/quadrado/': Square,
    '/pt/geometria/losango/': Diamond,
    '/pt/geometria/trapezio/': Hexagon
  }

  const customStats = [
    {
      icon: Calculator,
      value: geometriaCluster.calculators.length.toString(),
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: Shapes,
      value: '6',
      label: 'Figuras Geométricas',
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
      question: "Como funciona a calculadora de área do círculo?",
      answer: "A calculadora de área do círculo usa a fórmula A = π × r², onde r é o raio. Você pode inserir o raio, diâmetro ou área para calcular os outros valores automaticamente."
    },
    {
      question: "Posso calcular o perímetro de um retângulo?",
      answer: "Sim, a calculadora de retângulo calcula tanto a área (comprimento × largura) quanto o perímetro (2 × comprimento + 2 × largura) automaticamente."
    },
    {
      question: "Como calcular a área de um triângulo?",
      answer: "A calculadora oferece duas opções: usando base e altura (A = ½ × base × altura) ou usando a fórmula de Herón com os três lados do triângulo."
    },
    {
      question: "As calculadoras são precisas?",
      answer: "Sim, todas as calculadoras usam fórmulas matemáticas precisas e fornecem resultados com até 6 casas decimais de precisão."
    },
    {
      question: "Posso usar as calculadoras em dispositivos móveis?",
      answer: "Sim, todas as calculadoras são totalmente responsivas e funcionam perfeitamente em smartphones, tablets e computadores."
    }
  ]

  return (
    <CategoryPageLayout
      category={geometriaCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
