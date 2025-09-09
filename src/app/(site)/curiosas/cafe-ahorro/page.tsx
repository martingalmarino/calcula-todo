import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { CafeAhorroClient } from './CafeAhorroClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Café vs. Ahorro - Cuánto Ahorrarías Dejando el Café',
  description: 'Descubre cuánto dinero ahorrarías si dejaras de tomar café diario durante años. Calcula el ahorro con interés compuesto y sorpréndete con los resultados.',
  keywords: [
    'café ahorro', 'starbucks', 'interés compuesto', 'finanzas personales', 'ahorro diario', 'dinero café'
  ],
  canonical: '/curiosas/cafe-ahorro/',
});

export default function CafeAhorroPage() {
  return <CafeAhorroClient />;
}
