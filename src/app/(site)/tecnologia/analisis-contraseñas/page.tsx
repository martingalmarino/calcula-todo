import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import AnalisisContraseñasClient from './AnalisisContraseñasClient';

export const metadata: Metadata = buildMeta({
  title: 'Analizador de Contraseñas - Entropía y Fortaleza de Contraseñas',
  description: 'Analiza la fortaleza y entropía de contraseñas. Calcula tiempo de crackeo, genera hashes MD5/SHA-256 y proporciona sugerencias de mejora.',
  keywords: ['análisis contraseñas', 'entropía', 'fortaleza contraseñas', 'hash', 'seguridad', 'crackeo', 'MD5', 'SHA-256']
});

export default function AnalisisContraseñasPage() {
  return <AnalisisContraseñasClient />;
}
