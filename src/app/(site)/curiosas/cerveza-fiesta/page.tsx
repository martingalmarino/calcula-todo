import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CervezaFiestaClient from './CervezaFiestaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Cerveza por Fiesta - Cuántos Litros Necesitas para tu Evento',
  description: 'Calcula cuántos litros de cerveza necesitas para tu fiesta según invitados, nivel de consumo y duración. Incluye cálculo de costos.',
  keywords: ['cerveza', 'fiesta', 'litros', 'invitados', 'consumo', 'costo', 'evento', 'party']
});

export default function CervezaFiestaPage() {
  return <CervezaFiestaClient />;
}
