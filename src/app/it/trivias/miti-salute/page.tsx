import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MitiSaluteClientIT from './MitiSaluteClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Gioco di Miti di Salute - Smentisci Credenze Comuni',
  description: 'Metti alla prova le tue conoscenze sui miti di salute. Smentisci credenze comuni in modo ludico e impara la verità su nutrizione e benessere.',
  keywords: ['miti salute', 'credenze salute', 'vero falso', 'nutrizione', 'benessere', 'smentire miti', 'salute']
})

export default function MitiSalutePage() {
  return <MitiSaluteClientIT />
}