import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ConversionClient from './ConversionClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Conversión - Tasas de Conversión por Etapas',
  description: 'Calcula las tasas de conversión entre visitantes, leads y ventas en cada etapa del embudo de marketing.',
  keywords: [
    'conversión', 'tasa conversión', 'leads', 'ventas', 'embudo', 'marketing', 'funnel'
  ],
});

export default function ConversionPage() {
  return <ConversionClient />;
}
