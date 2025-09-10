import { Metadata } from 'next'
import IdadeAnimalClientPT from './IdadeAnimalClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Idade do Animal - Calculadoras Online',
  description: 'Converta a idade humana para idade de animais de estimação. Descubra quantos anos seu pet tem em anos humanos.',
  keywords: ['idade animal', 'idade pet', 'cachorro idade', 'gato idade', 'conversão idade animal']
})

export default function IdadeAnimalPage() {
  return <IdadeAnimalClientPT />
}
