import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { MatematicasClient } from './MatematicasClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Matemáticas – Resuelve operaciones online',
  description: 'Fracciones, porcentajes, potencias y raíces, álgebra, trigonometría, derivadas, integrales, matrices, combinatoria, progresiones y logaritmos.',
  keywords: [
    'calculadoras matemáticas',
    'fracciones',
    'porcentajes',
    'potencias',
    'raíces',
    'álgebra',
    'trigonometría',
    'derivadas',
    'integrales',
    'matrices',
    'combinatoria',
    'progresiones',
    'logaritmos',
    'ecuaciones',
    'matemáticas online'
  ]
})

export default function MatematicasPage() {
  return <MatematicasClient />
}