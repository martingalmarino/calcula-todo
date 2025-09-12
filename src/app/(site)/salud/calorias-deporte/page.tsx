import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CaloriasDeporteClient from './CaloriasDeporteClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Calorías Quemadas en el Deporte - MET y Ejercicio',
  description: 'Calcula las calorías quemadas en diferentes deportes: correr, nadar, fútbol, ciclismo. Usa valores MET según tu peso y tiempo de actividad.',
  keywords: [
    'calorías quemadas',
    'deporte',
    'ejercicio',
    'MET',
    'correr',
    'nadar',
    'fútbol',
    'ciclismo',
    'quemar calorías',
    'actividad física',
    'fitness'
  ]
})

export default function CaloriasDeportePage() {
  return <CaloriasDeporteClient />
}
