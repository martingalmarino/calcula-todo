import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { MarketingClient } from './MarketingClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Marketing - CAC, LTV, Conversión, ROI y Más',
  description: 'Calculadoras de marketing online gratuitas para CAC, LTV, conversión, presupuesto, CPC/CPM y ROI de campañas publicitarias.',
  keywords: [
    'calculadoras marketing', 'CAC', 'LTV', 'conversión', 'ROI', 'CPC', 'CPM', 'presupuesto marketing', 'marketing online'
  ]
});

export default function MarketingPage() {
  return <MarketingClient />;
}
