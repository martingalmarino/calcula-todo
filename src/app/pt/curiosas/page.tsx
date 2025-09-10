import { Metadata } from 'next'
import { CuriosasClientPT } from './CuriosasClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Curiosas - Calculadoras Online',
  description: 'Calculadoras divertidas e originais: beijos e calorias, café e economia, calculadora do amor, cerveja e festa, idade do animal e muito mais.',
  keywords: ['calculadoras curiosas', 'calculadoras divertidas', 'beijos calorias', 'café economia', 'calculadora amor', 'cerveja festa', 'idade animal']
})

export default function CuriosasPage() {
  return <CuriosasClientPT />
}
