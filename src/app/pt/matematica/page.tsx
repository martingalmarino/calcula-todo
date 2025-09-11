import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MatematicaClientPT from './MatematicaClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Matemática - Resolva operações online',
  description: 'Frações, percentuais, potências e raízes, álgebra, trigonometria, derivadas, integrales, matrizes, combinatória, progressões e logaritmos.',
  keywords: [
    'calculadoras matemáticas',
    'frações',
    'percentuais',
    'potências',
    'raízes',
    'álgebra',
    'trigonometria',
    'derivadas',
    'integrales',
    'matrizes',
    'combinatória',
    'progressões',
    'logaritmos',
    'equações',
    'matemática online'
  ]
})

export default function MatematicaPage() {
  return <MatematicaClientPT />
}
