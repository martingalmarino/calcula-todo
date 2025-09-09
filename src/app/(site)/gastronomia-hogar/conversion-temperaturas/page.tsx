import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ConversionTemperaturasClient from './ConversionTemperaturasClient';

export const metadata: Metadata = buildMeta({
  title: 'Conversión de Temperaturas - °C, °F y Gas Mark',
  description: 'Convierte entre grados Celsius, Fahrenheit y Gas Mark. Perfecto para hornear y cocinar con temperaturas precisas.',
  keywords: ['conversión temperaturas', 'grados celsius', 'fahrenheit', 'gas mark', 'horno', 'cocina', 'hornear']
});

export default function ConversionTemperaturasPage() {
  return <ConversionTemperaturasClient />;
}
