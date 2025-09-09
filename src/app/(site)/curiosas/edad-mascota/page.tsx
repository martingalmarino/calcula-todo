import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import EdadMascotaClient from './EdadMascotaClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Edad de tu Mascota - Convierte Años Humanos a Años Perro y Gato',
  description: 'Convierte años humanos a años de perro o gato usando tablas científicas. Descubre la edad real de tu mascota y su etapa de vida.',
  keywords: ['mascotas', 'perros', 'gatos', 'edad', 'años humanos', 'años perro', 'años gato', 'cachorro', 'gatito']
});

export default function EdadMascotaPage() {
  return <EdadMascotaClient />;
}
