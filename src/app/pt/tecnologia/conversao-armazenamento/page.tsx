import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConversaoArmazenamentoClientPT from './ConversaoArmazenamentoClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Conversor de armazenamento online gratuito. Converte entre KB, MB, GB, TB usando base decimal (1000) e binária (1024). Ferramenta precisa para desenvolvedores.',
  autoTitle: true,
})

export default function ConversaoArmazenamentoPage() {
  return <ConversaoArmazenamentoClientPT />
}
