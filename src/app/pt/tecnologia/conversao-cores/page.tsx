import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConversaoCoresClientPT from './ConversaoCoresClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Conversor de cores online gratuito. Converte entre formatos HEX, RGB, CMYK e HSL. Ferramenta útil para designers e desenvolvedores web.',
  autoTitle: true,
})

export default function ConversaoCoresPage() {
  return <ConversaoCoresClientPT />
}
