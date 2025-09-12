import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RitmoCarreraClient from './RitmoCarreraClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Ritmo de Carrera - Pace Calculator para Running',
  description: 'Calcula tu ritmo por kilómetro y velocidad media en carreras. Ideal para runners y maratonistas que quieren mejorar sus tiempos.',
  keywords: [
    'ritmo carrera',
    'pace calculator',
    'running',
    'maratón',
    'velocidad media',
    'tiempo por kilómetro',
    'carrera',
    'atletismo',
    'fitness',
    'deporte'
  ]
})

export default function RitmoCarreraPage() {
  return <RitmoCarreraClient />
}
