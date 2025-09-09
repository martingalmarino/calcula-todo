import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CACClient from './CACClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de CAC - Costo de Adquisición de Cliente',
  description: 'Calcula el costo de adquisición de cliente (CAC) dividiendo la inversión total en marketing y ventas entre los nuevos clientes adquiridos.',
  keywords: [
    'CAC', 'costo adquisición cliente', 'marketing', 'ventas', 'startup', 'e-commerce', 'agencia'
  ],
  canonical: '/marketing/cac/',
});

export default function CACPage() {
  return <CACClient />;
}
