import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContadorPalavrasClientPT from './ContadorPalavrasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Contador de palavras e caracteres online gratuito. Conta palavras, caracteres, frases e parágrafos em tempo real. Ferramenta útil para escritores e estudantes.',
  autoTitle: true,
})

export default function ContadorPalavrasPage() {
  return <ContadorPalavrasClientPT />
}
