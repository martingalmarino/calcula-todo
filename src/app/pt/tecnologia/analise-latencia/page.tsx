import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AnaliseLatenciaClientPT from './AnaliseLatenciaClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Analisador de latência online gratuito. Calcula latência e tempo de resposta de rede. Ferramenta útil para desenvolvedores e administradores de rede.',
  autoTitle: true,
})

export default function AnaliseLatenciaPage() {
  return <AnaliseLatenciaClientPT />
}
