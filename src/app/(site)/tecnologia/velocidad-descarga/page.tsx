import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import VelocidadDescargaClient from './VelocidadDescargaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Velocidad de Descarga - Mbps a MB/s',
  description: 'Convierte la velocidad de internet de Mbps a MB/s y calcula el tiempo estimado de descarga para archivos. Incluye ejemplos prácticos.',
  keywords: ['velocidad descarga', 'Mbps MB/s', 'tiempo descarga', 'internet', 'banda ancha', 'velocidad internet']
});

export default function VelocidadDescargaPage() {
  return <VelocidadDescargaClient />;
}
