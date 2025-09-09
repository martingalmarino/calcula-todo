import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ExpectativaComidaClient from './ExpectativaComidaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Expectativa de Vida y Comida Chatarra - Impacto en la Salud',
  description: 'Descubre el impacto de la comida chatarra en tu expectativa de vida. Calcula cuántos días podrías "perder" por hamburguesas, gaseosas y pizzas.',
  keywords: [
    'expectativa vida', 'comida chatarra', 'hamburguesas', 'gaseosas', 'pizzas', 'salud', 'alimentación'
  ],
});

export default function ExpectativaComidaPage() {
  return <ExpectativaComidaClient />;
}
