import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ConversionMedidasClient from './ConversionMedidasClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Conversión de Medidas de Cocina - Gramos, Tazas, ML',
  description: 'Convierte cantidades entre gramos, mililitros, tazas, cucharadas y cucharaditas. Incluye selector de ingrediente para conversiones precisas.',
  keywords: ['conversión medidas cocina', 'gramos tazas ml', 'cucharadas cucharaditas', 'ingredientes cocina', 'medidas precisas']
});

export default function ConversionMedidasPage() {
  return <ConversionMedidasClient />;
}
