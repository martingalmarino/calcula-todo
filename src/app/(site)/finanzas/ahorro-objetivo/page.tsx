import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import AhorroObjetivoClient from './AhorroObjetivoClient';

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de ahorro objetivo online. Calcula cuánto ahorrar mensualmente para alcanzar tu meta financiera con intereses.',
  autoTitle: true,
});

export default function AhorroObjetivoPage() {
  return <AhorroObjetivoClient />;
}
