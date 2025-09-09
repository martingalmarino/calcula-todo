import { Metadata } from 'next'
import ConvertitoreDateClientIT from './ConvertitoreDateClientIT'

export const metadata: Metadata = {
  title: 'Convertitore di Date - CalculaTodo.online',
  description: 'Converte date tra diversi formati e calendari. Strumento gratuito per conversione di date in vari formati.',
  keywords: 'convertitore date, formato data, conversione date, calendario, formato europeo, formato americano, italiano',
  openGraph: {
    title: 'Convertitore di Date - CalculaTodo.online',
    description: 'Converte date tra diversi formati e calendari. Strumento gratuito per conversione di date in vari formati.',
    type: 'website',
  },
}

export default function ConvertitoreDatePage() {
  return <ConvertitoreDateClientIT />
}
