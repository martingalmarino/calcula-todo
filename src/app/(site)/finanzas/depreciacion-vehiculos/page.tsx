import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import DepreciacionVehiculosClient from './DepreciacionVehiculosClient';

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de depreciación de vehículos online. Calcula la depreciación anual y mensual usando método lineal. Gratis y fácil de usar.',
  autoTitle: true,
});

export default function DepreciacionVehiculosPage() {
  return <DepreciacionVehiculosClient />;
}
