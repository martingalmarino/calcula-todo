"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Thermometer, AlertCircle } from 'lucide-react'
import { encontrarCiudadesIdeal } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function LivelloFreddolosoClientIT() {
  const [temperatura, setTemperatura] = useState('')
  const [tolerancia, setTolerancia] = useState('3')
  const [resultado, setResultado] = useState<{
    temperaturaIdeal: number
    tolerancia: number
    ciudadesIdeal: Array<{nombre: string, temperatura: number, pais: string}>
    ciudadesCercanas: Array<{nombre: string, temperatura: number, pais: string}>
    totalCiudadesIdeal: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const temp = parseFloat(temperatura)
    const tol = parseFloat(tolerancia)

    if (!temperatura || !tolerancia) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(temp) || isNaN(tol)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (temp < -20 || temp > 40 || tol < 1 || tol > 10) {
      setError('Temperatura deve essere tra -20°C e 40°C, tolleranza tra 1 e 10')
      return
    }

    try {
      const result = encontrarCiudadesIdeal(temp, tol)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo delle città ideali')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.temperatura) setTemperatura(example.temperatura as string)
    if (example.tolerancia) setTolerancia(example.tolerancia as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/curiosas/livello-freddoloso')

  const examples = [
    { label: 'Temperatura Ideale Bassa', values: { temperatura: '15', tolerancia: '3' } },
    { label: 'Temperatura Ideale Media', values: { temperatura: '20', tolerancia: '2' } },
    { label: 'Temperatura Ideale Alta', values: { temperatura: '25', tolerancia: '4' } },
    { label: 'Temperatura Ideale Estrema', values: { temperatura: '30', tolerancia: '5' } }
  ]

  const faqItems = [
    {
      question: 'Come viene calcolato il livello di freddoloso?',
      answer: 'Il calcolo considera la temperatura ambiente, il tipo di abbigliamento indossato e l\'umidità relativa per determinare quanto freddo senti rispetto alla media.'
    },
    {
      question: 'L\'umidità influisce sulla sensazione di freddo?',
      answer: 'Sì! L\'umidità alta aumenta la sensazione di freddo perché il corpo perde calore più rapidamente. L\'umidità bassa invece riduce la sensazione di freddo.'
    },
    {
      question: 'Quali fattori influenzano la sensazione di freddo?',
      answer: 'Oltre a temperatura, abbigliamento e umidità, anche età, sesso, peso, attività fisica e abitudini personali influenzano la sensazione di freddo.'
    },
    {
      question: 'Come posso ridurre la sensazione di freddo?',
      answer: 'Indossa abbigliamento a strati, mantieni i piedi e le mani caldi, bevi bevande calde, fai attività fisica e mantieni una dieta equilibrata.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Livello di Freddoloso',
            description: 'Scopri il tuo livello di freddoloso basato su temperatura e abbigliamento',
            url: '/it/curiosas/livello-freddoloso/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Livello di Freddoloso"
            description="Scopri il tuo livello di freddoloso basato su temperatura e abbigliamento. Calcola quanto freddo senti rispetto agli altri"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Calcolatrice Livello di Freddoloso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Temperatura Ideale (°C)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 20"
                        value={temperatura}
                        onChange={(e) => setTemperatura(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tolleranza (°C)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 3"
                        value={tolerancia}
                        onChange={(e) => setTolerancia(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Livello di Freddoloso
                  </Button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {resultado && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Risultato Livello di Freddoloso</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.totalCiudadesIdeal}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Città Ideali Trovate
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            Temperatura ideale: {resultado.temperaturaIdeal}°C
                          </p>
                          <p className="text-blue-800 text-sm">
                            Tolleranza: ±{resultado.tolerancia}°C
                          </p>
                          <p className="text-blue-800 text-sm">
                            Città ideali trovate: {resultado.totalCiudadesIdeal}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Temperatura Ideale:</span>
                            <span className="font-medium">{resultado.temperaturaIdeal}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tolleranza:</span>
                            <span className="font-medium">±{resultado.tolerancia}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Città Ideali:</span>
                            <span className="font-medium">{resultado.totalCiudadesIdeal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Città Vicine:</span>
                            <span className="font-medium">{resultado.ciudadesCercanas.length}</span>
                          </div>
                        </div>

                        {resultado.ciudadesIdeal.length > 0 && (
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Città Ideali per Te:</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                              {resultado.ciudadesIdeal.map((ciudad, index) => (
                                <li key={index}>• {ciudad.nombre} ({ciudad.temperatura}°C)</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {resultado.ciudadesCercanas.length > 0 && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Città Vicine:</h4>
                            <ul className="text-purple-800 text-sm space-y-1">
                              {resultado.ciudadesCercanas.map((ciudad, index) => (
                                <li key={index}>• {ciudad.nombre} ({ciudad.temperatura}°C)</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
