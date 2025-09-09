import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Algebra - Risolvi Equazioni Online',
  description: 'Risolvi equazioni lineari, quadratiche e sistemi di equazioni online. Risultati precisi con passaggi dettagliati.',
  keywords: [
    'calcolatrice algebra',
    'risolvi equazioni',
    'equazioni lineari',
    'equazioni quadratiche',
    'sistemi equazioni',
    'algebra online',
    'matematica'
  ]
})

export default function AlgebraPageIT() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Calcolatrice di Algebra
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Risolvi equazioni lineari, quadratiche e sistemi di equazioni online
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
