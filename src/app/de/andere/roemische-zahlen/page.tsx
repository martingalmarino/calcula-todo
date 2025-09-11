import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RoemischeZahlenClientDE from './RoemischeZahlenClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Römische Zahlen - Konvertierung Online',
  description: 'Konvertieren Sie zwischen arabischen und römischen Zahlen. Kostenloser Online-Konverter für römische Zahlen von 1 bis 3999.',
  keywords: [
    'römische zahlen',
    'römisch',
    'arabisch',
    'konvertierung',
    'zahlen umwandeln',
    'antike zahlen',
    'deutsch'
  ]
})

export default function RoemischeZahlenPage() {
  return <RoemischeZahlenClientDE />
}
