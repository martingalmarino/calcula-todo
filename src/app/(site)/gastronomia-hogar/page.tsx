import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { GastronomiaHogarClient } from './GastronomiaHogarClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Gastronomía y Hogar - Cocina y Electrodomésticos',
  description: 'Calculadoras especializadas para cocina y hogar: conversión de medidas, calorías de recetas, temperaturas, costos, fermentación y consumo eléctrico.',
  keywords: ['calculadoras cocina', 'medidas cocina', 'calorías recetas', 'temperaturas horno', 'costos recetas', 'fermentación pan', 'consumo eléctrico']
});

export default function GastronomiaHogarPage() {
  return <GastronomiaHogarClient />;
}
