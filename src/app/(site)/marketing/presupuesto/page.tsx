import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import PresupuestoClient from './PresupuestoClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Presupuesto de Marketing - Inversión Recomendada',
  description: 'Define cuánto invertir en marketing basado en tus ingresos totales. Calcula el presupuesto recomendado (5-10%) para optimizar tu inversión.',
  keywords: [
    'presupuesto marketing', 'inversión marketing', 'ingresos', 'porcentaje', 'planificación', 'marketing'
  ],
  canonical: '/marketing/presupuesto/',
});

export default function PresupuestoPage() {
  return <PresupuestoClient />;
}
