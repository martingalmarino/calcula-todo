import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import HipotecaClient from './HipotecaClient';

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de hipoteca online. Calcula cuotas mensuales, intereses totales y cronograma de pagos para préstamos hipotecarios.',
  canonical: '/finanzas/hipoteca/',
  autoTitle: true,
});

export default function HipotecaPage() {
  return <HipotecaClient />;
}
