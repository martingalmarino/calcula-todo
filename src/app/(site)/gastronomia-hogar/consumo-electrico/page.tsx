import { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import ConsumoElectricoClient from './ConsumoElectricoClient';

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Consumo Eléctrico de Electrodomésticos',
  description: 'Calcula el consumo eléctrico y costo de tus electrodomésticos. Optimiza tu factura de luz con análisis detallado de consumo.',
  keywords: ['consumo eléctrico', 'electrodomésticos', 'factura luz', 'kWh', 'ahorro energía', 'eficiencia energética']
});

export default function ConsumoElectricoPage() {
  return <ConsumoElectricoClient />;
}
