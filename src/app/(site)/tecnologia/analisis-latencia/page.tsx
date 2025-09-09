import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import AnalisisLatenciaClient from './AnalisisLatenciaClient';

export const metadata: Metadata = buildMeta({
  title: 'Analizador de Latencia - Ping y Tiempo de Respuesta',
  description: 'Analiza latencia y tiempo de respuesta para gaming, videollamadas y aplicaciones. Convierte ping en tiempo real y evalúa calidad de conexión.',
  keywords: ['latencia', 'ping', 'tiempo respuesta', 'gaming', 'videollamadas', 'redes', 'conexión internet']
});

export default function AnalisisLatenciaPage() {
  return <AnalisisLatenciaClient />;
}
