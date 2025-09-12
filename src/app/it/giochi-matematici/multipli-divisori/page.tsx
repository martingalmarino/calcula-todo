import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MultipliDivisoriClientIT from './MultipliDivisoriClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Sfida Multipli e Divisori - Giochi Matematici',
  description: 'Identifica multipli e divisori in tempo limitato. Sfida la tua comprensione dei numeri e delle loro relazioni!',
  keywords: ['multipli', 'divisori', 'numeri', 'relazioni', 'comprensione', 'identificare', 'sfida']
})

export default function MultipliDivisoriPage() {
  return <MultipliDivisoriClientIT />
}
