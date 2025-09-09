import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import FermentacionLevadoClient from './FermentacionLevadoClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Fermentación y Tiempos de Levado - Pan y Masas',
  description: 'Calcula los tiempos de fermentación y levado para panes y masas según temperatura y tipo de levadura. Guía completa para panaderos.',
  keywords: ['fermentación pan', 'tiempo levado', 'levadura', 'pan casero', 'masas', 'panadería']
});

export default function FermentacionLevadoPage() {
  return <FermentacionLevadoClient />;
}
