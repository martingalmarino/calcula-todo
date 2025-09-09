import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { TecnologiaClient } from './TecnologiaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Tecnología - Herramientas Digitales y Técnicas',
  description: 'Calculadoras especializadas en tecnología: conversión de unidades, velocidad de internet, uptime, colores, seguridad y latencia. Herramientas para desarrolladores y técnicos.',
  keywords: ['calculadoras tecnología', 'conversión unidades', 'velocidad internet', 'uptime', 'colores', 'seguridad', 'latencia', 'desarrolladores']
});

export default function TecnologiaPage() {
  return <TecnologiaClient />;
}
