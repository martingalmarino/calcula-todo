import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ROIClient from './ROIClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de ROI en Marketing - Retorno de Inversión',
  description: 'Mide el retorno de inversión de tus campañas de marketing y publicidad. Calcula el ROI usando la fórmula: (Ingresos - Inversión) / Inversión × 100.',
  keywords: [
    'ROI', 'retorno inversión', 'marketing', 'campañas', 'publicidad', 'rentabilidad', 'ROI marketing'
  ],
  canonical: '/marketing/roi/',
});

export default function ROIPage() {
  return <ROIClient />;
}
