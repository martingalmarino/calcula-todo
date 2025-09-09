import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import TiempoNetflixClient from './TiempoNetflixClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Tiempo en Netflix - Cuántas Temporadas Viste y Qué Podrías Haber Hecho',
  description: 'Calcula cuántas temporadas has visto en Netflix, años de vida dedicados y qué actividades alternativas podrías haber realizado.',
  keywords: ['netflix', 'streaming', 'series', 'temporadas', 'tiempo', 'vida', 'entretenimiento', 'productividad']
});

export default function TiempoNetflixPage() {
  return <TiempoNetflixClient />;
}
