import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ConversionAlmacenamientoClient from './ConversionAlmacenamientoClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Conversión de Almacenamiento - KB, MB, GB, TB',
  description: 'Convierte entre unidades de almacenamiento digital (KB, MB, GB, TB) con base decimal (1000) y binaria (1024). Incluye comparaciones divertidas.',
  keywords: ['conversión almacenamiento', 'KB MB GB TB', 'bytes', 'almacenamiento digital', 'conversión unidades']
});

export default function ConversionAlmacenamientoPage() {
  return <ConversionAlmacenamientoClient />;
}
