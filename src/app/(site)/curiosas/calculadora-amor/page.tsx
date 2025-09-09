import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CalculadoraAmorClient from './CalculadoraAmorClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Amor - Compatibilidad entre Nombres (Divertido y Viral)',
  description: 'Calcula el porcentaje de compatibilidad entre dos nombres de forma divertida. Una calculadora viral para descubrir la química entre nombres.',
  keywords: ['amor', 'compatibilidad', 'nombres', 'pareja', 'porcentaje', 'viral', 'química', 'relación']
});

export default function CalculadoraAmorPage() {
  return <CalculadoraAmorClient />;
}
