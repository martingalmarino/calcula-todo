import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NumeroFaltanteClientPT from './NumeroFaltanteClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Encontre o Número Faltante - Jogos Matemáticos',
  description: 'Complete as equações encontrando o número que falta. Teste sua lógica!',
  keywords: ['equações', 'números faltantes', 'lógica', 'álgebra básica']
})

export default function NumeroFaltantePage() {
  return <NumeroFaltanteClientPT />
}
