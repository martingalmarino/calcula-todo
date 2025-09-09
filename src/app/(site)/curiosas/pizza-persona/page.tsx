import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { PizzaPersonaClient } from './PizzaPersonaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Pizza por Persona - Cuántas Pizzas Necesitas',
  description: 'Calcula cuántas pizzas necesitas según el número de personas, nivel de hambre y tamaño de pizza. Perfecto para fiestas y reuniones.',
  keywords: [
    'pizza personas', 'cuántas pizzas', 'fiesta pizza', 'tamaño pizza', 'hambre', 'reunión'
  ],
  canonical: '/curiosas/pizza-persona/',
});

export default function PizzaPersonaPage() {
  return <PizzaPersonaClient />;
}
