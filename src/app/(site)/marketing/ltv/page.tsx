import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import LTVClient from './LTVClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de LTV - Lifetime Value del Cliente',
  description: 'Estima el valor total de un cliente en el tiempo basado en ticket promedio, frecuencia de compra y duración de la relación.',
  keywords: [
    'LTV', 'lifetime value', 'valor cliente', 'ticket promedio', 'frecuencia compra', 'marketing'
  ],
});

export default function LTVPage() {
  return <LTVClient />;
}
