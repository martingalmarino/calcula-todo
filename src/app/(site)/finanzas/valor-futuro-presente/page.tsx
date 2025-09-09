import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ValorFuturoPresenteClient from './ValorFuturoPresenteClient';

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de valor futuro y presente online. Calcula FV y PV para comparar inversiones y evaluar el valor temporal del dinero.',
  autoTitle: true,
});

export default function ValorFuturoPresentePage() {
  return <ValorFuturoPresenteClient />;
}
