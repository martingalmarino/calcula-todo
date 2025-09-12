import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RagionamentoLogicoClientIT from './RagionamentoLogicoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Ragionamento Logico con Modelli - Giochi Matematici',
  description: 'Risolvi problemi di ragionamento logico con pattern e modelli. Sfida la tua capacità di pensiero logico!',
  keywords: ['ragionamento', 'logico', 'pattern', 'modelli', 'pensiero', 'logica', 'problemi']
})

export default function RagionamentoLogicoPage() {
  return <RagionamentoLogicoClientIT />
}
