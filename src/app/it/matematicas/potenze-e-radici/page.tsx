import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Potenze e Radici - Calcoli con Esponenti',
  description: 'Calcola potenze, radici quadrate, cubiche e n-esime online. Risultati precisi con spiegazioni dettagliate per ogni calcolo.',
  keywords: [
    'calcolatrice potenze',
    'calcolatrice radici',
    'radice quadrata',
    'radice cubica',
    'esponenti',
    'potenze online',
    'matematica'
  ]
})

export default function PotenzeRadiciPageIT() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Calcolatrice di Potenze e Radici
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Calcola potenze, radici quadrate, cubiche e n-esime online
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800">
              Questa calcolatrice sarà disponibile presto. Stiamo lavorando per portarti la migliore esperienza di calcolo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
