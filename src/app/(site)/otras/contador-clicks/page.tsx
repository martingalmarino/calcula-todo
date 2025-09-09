import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContadorClicksClient from './ContadorClicksClient'

export const metadata: Metadata = buildMeta({
  description: 'Contador de clicks online gratuito - CPS Test. Mide tu velocidad de clicks por segundo. Herramienta para gamers y pruebas de velocidad de mouse.',
  autoTitle: true,
})

export default function ContadorClicksPage() {
  return <ContadorClicksClient />
}
