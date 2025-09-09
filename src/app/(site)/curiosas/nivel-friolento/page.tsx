import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import NivelFriolentoClient from './NivelFriolentoClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Nivel de Friolento - Ciudades Ideales para tu Temperatura',
  description: 'Descubre en qué ciudades del mundo estarías siempre cómodo según tu temperatura ideal. Encuentra tu destino perfecto basado en el clima.',
  keywords: [
    'temperatura ideal', 'ciudades clima', 'friolento', 'temperatura cómoda', 'destinos', 'clima perfecto'
  ],
});

export default function NivelFriolentoPage() {
  return <NivelFriolentoClient />;
}
