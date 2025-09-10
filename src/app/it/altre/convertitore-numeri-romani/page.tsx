import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConvertitoreNumeriRomaniClientIT from './ConvertitoreNumeriRomaniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Convertitore di Numeri Romani - Conversione Arabi ↔ Romani',
  description: 'Converte numeri arabi in romani e viceversa. Supporta numeri da 1 a 3999. Calcolatrice gratuita per conversione di numeri romani.',
  keywords: [
    'numeri romani',
    'conversione numeri',
    'arabici romani',
    'convertitore romani',
    'calcolatrice romani',
    'I V X L C D M'
  ]
})

export default function ConvertitoreNumeriRomaniPageIT() {
  return <ConvertitoreNumeriRomaniClientIT />
}
