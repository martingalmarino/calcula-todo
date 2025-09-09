import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { MatematicasClientIT } from './MatematicasClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrici di Matematica - Algebra, Geometria, Trigonometria',
  description: 'Calcolatrici matematiche online gratuite per frazioni, percentuali, algebra, trigonometria, derivate e molto altro. Risultati precisi e spiegazioni dettagliate.',
  keywords: [
    'calcolatrici matematica',
    'calcolatrice frazioni',
    'calcolatrice percentuali',
    'calcolatrice algebra',
    'calcolatrice trigonometria',
    'calcolatrice derivate',
    'matematica online',
    'gratis'
  ]
})

export default function MatematicasPageIT() {
  return <MatematicasClientIT />
}
