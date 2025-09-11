import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import VelocidadeDownloadClientPT from './VelocidadeDownloadClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de velocidade de download online gratuita. Converte Mbps para MB/s e calcula tempo de download de arquivos. Ferramenta útil para testar conexão.',
  autoTitle: true,
})

export default function VelocidadeDownloadPage() {
  return <VelocidadeDownloadClientPT />
}
