import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CuriosasClient from './CuriosasClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Curiosas - Datos Sorprendentes y Divertidos',
  description: 'Calculadoras divertidas y curiosas para descubrir datos sorprendentes sobre café, pizza, comida chatarra, besos, películas y más.',
  keywords: [
    'calculadoras curiosas', 'café ahorro', 'pizza personas', 'comida chatarra', 'besos calorías', 'películas tiempo', 'datos curiosos'
  ],
  canonical: '/curiosas/',
});

export default function CuriosasPage() {
  return <CuriosasClient />;
}
