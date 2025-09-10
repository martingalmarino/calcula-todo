import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EscalaNotasClientPT from './EscalaNotasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de escala de notas online gratuita. Converte pontuações numéricas para escala de letras A, B, C, D, F. Ferramenta educativa precisa.',
  autoTitle: true,
})

export default function EscalaNotasPage() {
  return <EscalaNotasClientPT />
}
