import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import IPCClient from './IPCClient';

export const metadata: Metadata = buildMeta({
  description: 'Calculadora del IPC online. Calcula el poder adquisitivo, variación del IPC y pérdida de valor por inflación.',
  canonical: '/finanzas/ipc/',
  autoTitle: true,
});

export default function IPCPage() {
  return <IPCClient />;
}
