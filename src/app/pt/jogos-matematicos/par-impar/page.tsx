import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ParImparClientPT from './ParImparClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Par ou Ímpar Express - Jogos Matemáticos',
  description: 'Classifique números como pares ou ímpares antes que o tempo termine. Desafie sua agilidade mental e reconhecimento numérico!',
  keywords: ['par', 'ímpar', 'números pares', 'números ímpares', 'classificação', 'agilidade mental']
})

export default function ParImparPage() {
  return <ParImparClientPT />
}
