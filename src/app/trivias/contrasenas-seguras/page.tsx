import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContrasenasSegurasClient from './ContrasenasSegurasClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('contrasenas-seguras')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz de Contraseñas Seguras - Ciberseguridad',
  description: triviaConfig?.description || 'Aprende sobre ciberseguridad y buenas prácticas para crear contraseñas seguras. Descubre cómo proteger tus cuentas digitales de forma efectiva.',
  keywords: triviaConfig?.keywords || ['contraseñas', 'seguridad', 'ciberseguridad', 'protección', 'cuentas', 'digital', 'privacy', 'trivia educativa']
})

export default function ContrasenasSegurasPage() {
  return <ContrasenasSegurasClient />
}
