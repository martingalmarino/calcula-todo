import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AnaliseSenhasClientPT from './AnaliseSenhasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Analisador de senhas online gratuito. Analisa força e segurança de senhas. Ferramenta útil para verificar se suas senhas são seguras.',
  autoTitle: true,
})

export default function AnaliseSenhasPage() {
  return <AnaliseSenhasClientPT />
}
