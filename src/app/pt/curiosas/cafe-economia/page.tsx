import { Metadata } from 'next'
import CafeEconomiaClientPT from './CafeEconomiaClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Café e Economia - Calculadoras Online',
  description: 'Descubra quanto você pode economizar se parar de tomar café diário. Calcule o ahorro a longo prazo com juros compostos.',
  keywords: ['café economia', 'economia café', 'poupança café', 'juros compostos', 'economia diária']
})

export default function CafeEconomiaPage() {
  return <CafeEconomiaClientPT />
}
