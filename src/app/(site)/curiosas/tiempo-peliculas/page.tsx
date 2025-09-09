import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import TiempoPeliculasClient from './TiempoPeliculasClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Tiempo de Vida en Películas - Cuántos Años Dedicamos al Cine',
  description: 'Calcula cuántos años de vida dedicas a ver películas y series. Descubre cuántas películas completas equivalen a tu tiempo de entretenimiento.',
  keywords: [
    'tiempo películas', 'series', 'entretenimiento', 'cine', 'años vida', 'tiempo pantalla'
  ],
  canonical: '/curiosas/tiempo-peliculas/',
});

export default function TiempoPeliculasPage() {
  return <TiempoPeliculasClient />;
}
