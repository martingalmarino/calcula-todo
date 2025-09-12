import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import VelocidadCiclismoClient from './VelocidadCiclismoClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Velocidad Media en Ciclismo - Tiempo y Distancia',
  description: 'Calcula la velocidad media en bicicleta y estima tiempos en distintas distancias. Ideal para ciclistas que quieren planificar sus rutas.',
  keywords: [
    'velocidad ciclismo',
    'bicicleta',
    'velocidad media',
    'tiempo distancia',
    'ciclismo',
    'bike',
    'carrera ciclista',
    'km/h',
    'deporte',
    'fitness'
  ]
})

export default function VelocidadCiclismoPage() {
  return <VelocidadCiclismoClient />
}
