import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import CalculadoraPropinasClient from './CalculadoraPropinasClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Propinas - Calcular Propina y Dividir Cuenta',
  description: 'Calcula propinas fácilmente y divide la cuenta entre varias personas. Incluye porcentajes estándar y cálculo por persona.',
  keywords: ['propinas', 'calculadora propinas', 'dividir cuenta', 'restaurante', 'porcentaje propina', 'cuenta']
});

export default function CalculadoraPropinasPage() {
  return <CalculadoraPropinasClient />;
}
