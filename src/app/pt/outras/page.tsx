import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OutrasClientPT from './OutrasClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Outras Calculadoras - Escala de Notas, Gasolina, Palavras, Romanos e Cliques',
  description: 'Calculadoras úteis online: escala de notas, gasto de gasolina, contador de palavras, conversor de números romanos e contador de cliques. Ferramentas práticas gratuitas.',
  keywords: [
    'outras calculadoras',
    'escala de notas',
    'gasto gasolina',
    'contador palavras',
    'números romanos',
    'contador cliques',
    'CPS test',
    'calculadoras úteis',
    'ferramentas online'
  ]
})

export default function OutrasPage() {
  return <OutrasClientPT />
}
