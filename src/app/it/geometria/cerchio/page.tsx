import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CerchioClientIT from './CerchioClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Area e Perimetro del Cerchio - Calcolatrice Online',
  description: 'Calcola area e perimetro del cerchio conoscendo il raggio o il diametro. Calcolatrice gratuita con formule e spiegazioni passo a passo.',
  keywords: [
    'area cerchio',
    'perimetro cerchio',
    'raggio',
    'diametro',
    'circonferenza',
    'calcolatrice cerchio',
    'formula cerchio'
  ]
})

export default function CerchioPageIT() {
  return <CerchioClientIT />
}
