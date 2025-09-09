import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ExpectativaAnimalesClient from './ExpectativaAnimalesClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Expectativa de Vida en Animales - Tu Edad en Vidas de Tortuga, Colibrí y Mosca',
  description: 'Convierte tu edad humana a vidas de tortuga, años de colibrí o días de mosca. Descubre comparaciones fascinantes con el reino animal.',
  keywords: ['animales', 'tortuga', 'colibrí', 'mosca', 'expectativa vida', 'comparación', 'edad', 'vida animal']
});

export default function ExpectativaAnimalesPage() {
  return <ExpectativaAnimalesClient />;
}
