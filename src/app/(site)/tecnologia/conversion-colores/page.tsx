import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ConversionColoresClient from './ConversionColoresClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Conversión de Colores - HEX, RGB, CMYK, HSL',
  description: 'Convierte colores entre formatos HEX, RGB, CMYK y HSL con vista previa en tiempo real. Herramienta para diseñadores y desarrolladores.',
  keywords: ['conversión colores', 'HEX RGB CMYK HSL', 'diseño', 'desarrollo web', 'paleta colores', 'color picker']
});

export default function ConversionColoresPage() {
  return <ConversionColoresClient />;
}
