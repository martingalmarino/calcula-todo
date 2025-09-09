import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CostosRecetasClient from './CostosRecetasClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Costos de Recetas - Precio por Porción',
  description: 'Calcula el costo total y por porción de tus recetas. Presupuesto detallado de ingredientes y comparación con opciones comerciales.',
  keywords: ['costo recetas', 'precio por porción', 'presupuesto cocina', 'costos ingredientes', 'economía doméstica']
});

export default function CostosRecetasPage() {
  return <CostosRecetasClient />;
}
