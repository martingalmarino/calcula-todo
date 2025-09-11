import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TecnologiaClientPT from './TecnologiaClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Tecnologia - Ferramentas Digitais e Técnicas',
  description: 'Calculadoras especializadas em tecnologia: conversão de unidades, velocidade de internet, uptime, cores, segurança e latência. Ferramentas para desenvolvedores e técnicos.',
  keywords: [
    'calculadoras tecnologia',
    'conversão unidades',
    'velocidade internet',
    'uptime',
    'cores',
    'segurança',
    'latência',
    'desenvolvedores'
  ]
})

export default function TecnologiaPage() {
  return <TecnologiaClientPT />
}
