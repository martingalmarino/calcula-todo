import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import BesosCaloriasClient from './BesosCaloriasClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Besos Quemacalorías - Calorías Quemadas por Besos y Abrazos',
  description: 'Calcula las calorías quemadas por besos, abrazos y risas. Descubre equivalencias divertidas como cuántos chocolates equivalen a 10 minutos de risa.',
  keywords: [
    'besos calorías', 'abrazos calorías', 'risas calorías', 'ejercicio', 'quemar calorías', 'actividades afectivas'
  ],
});

export default function BesosCaloriasPage() {
  return <BesosCaloriasClient />;
}
