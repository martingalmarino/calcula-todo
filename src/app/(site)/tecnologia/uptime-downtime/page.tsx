import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import UptimeDowntimeClient from './UptimeDowntimeClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Uptime/Downtime - Porcentaje de Disponibilidad',
  description: 'Calcula el porcentaje de disponibilidad (uptime) y el tiempo de caída (downtime) para servicios, hosting y aplicaciones. Ideal para admins de sistemas.',
  keywords: ['uptime', 'downtime', 'disponibilidad', 'servicios', 'hosting', 'SLA', 'tiempo caída']
});

export default function UptimeDowntimePage() {
  return <UptimeDowntimeClient />;
}
