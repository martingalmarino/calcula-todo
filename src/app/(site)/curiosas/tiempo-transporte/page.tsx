import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import TiempoTransporteClient from './TiempoTransporteClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Tiempo en Transporte Público - Cuántos Días de Vida Gastas Viajando',
  description: 'Calcula cuántos días y años de vida gastas en transporte público. Descubre el tiempo total que dedicas a viajar en tu vida laboral.',
  keywords: ['transporte', 'público', 'tiempo', 'vida', 'días', 'años', 'viaje', 'trabajo', 'commute']
});

export default function TiempoTransportePage() {
  return <TiempoTransporteClient />;
}
