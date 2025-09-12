import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import JogosMatematicosClientPT from './JogosMatematicosClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Jogos de Inteligência Matemática - Divirta-se Aprendendo',
  description: 'Jogos de matemática fáceis para crianças e adultos. Somas, subtrações, frações e muito mais. Melhore sua agilidade mental com nossos jogos educativos gratuitos.',
  keywords: ['jogos de matemática', 'jogos educativos', 'matemática fácil', 'somas e subtrações', 'frações', 'agilidade mental', 'jogos para crianças']
})

export default function JogosMatematicosPage() {
  return <JogosMatematicosClientPT />
}
