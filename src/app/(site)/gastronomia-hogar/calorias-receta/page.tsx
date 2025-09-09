import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CaloriasRecetaClient from './CaloriasRecetaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Calorías por Receta - Calorías por Ingredientes',
  description: 'Calcula las calorías totales y por porción de tus recetas. Análisis nutricional completo con macronutrientes.',
  keywords: ['calorías receta', 'análisis nutricional', 'calorías por ingredientes', 'macronutrientes', 'recetas saludables']
});

export default function CaloriasRecetaPage() {
  return <CaloriasRecetaClient />;
}
