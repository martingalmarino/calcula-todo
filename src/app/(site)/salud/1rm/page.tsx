import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OneRepMaxClient from './OneRepMaxClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de 1RM (One Rep Max) - Fórmulas Epley y Brzycki',
  description: 'Calcula tu máximo de una repetición (1RM) usando las fórmulas de Epley o Brzycki. Ideal para planificar entrenamientos de fuerza.',
  keywords: [
    '1RM',
    'one rep max',
    'máximo',
    'fuerza',
    'peso',
    'repeticiones',
    'Epley',
    'Brzycki',
    'gimnasio',
    'entrenamiento',
    'fitness'
  ]
})

export default function OneRepMaxPage() {
  return <OneRepMaxClient />
}
