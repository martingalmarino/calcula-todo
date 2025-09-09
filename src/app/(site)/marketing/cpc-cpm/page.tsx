import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CPCCPMClient from './CPCCPMClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de CPC/CPM - Costo por Clic e Impresiones',
  description: 'Calcula el costo por clic (CPC) y costo por mil impresiones (CPM) para campañas publicitarias en Google Ads, Meta Ads y más.',
  keywords: [
    'CPC', 'CPM', 'costo clic', 'impresiones', 'Google Ads', 'Meta Ads', 'publicidad', 'marketing digital'
  ],
  canonical: '/marketing/cpc-cpm/',
});

export default function CPCCPMPage() {
  return <CPCCPMClient />;
}
