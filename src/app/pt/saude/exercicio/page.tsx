import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ExercicioClientPT from './ExercicioClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Exercício - Calorias Queimadas | CalculaTudo.online',
  description: 'Calcule calorias queimadas durante exercícios baseado em peso, duração, tipo de atividade e intensidade.',
  keywords: ['exercício', 'calorias queimadas', 'atividade física', 'fitness', 'treino']
})

export default function ExercicioPage() {
  return <ExercicioClientPT />
}