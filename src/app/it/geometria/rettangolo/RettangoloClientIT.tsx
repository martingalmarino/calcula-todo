"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RectangleHorizontal, AlertCircle, Info } from 'lucide-react'
import { calculateRectangle, type RectangleResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'

export default function RettangoloClientIT() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [result, setResult] = useState<RectangleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!length || !width) {
      setError('Inserisci sia la base che l\'altezza')
      return
    }

    try {
      const lengthNum = parseFloat(length)
      const widthNum = parseFloat(width)
      
      if (isNaN(lengthNum) || isNaN(widthNum) || lengthNum <= 0 || widthNum <= 0) {
        setError('Inserisci valori numerici validi e positivi')
        return
      }

      const rectangleResult = calculateRectangle(lengthNum, widthNum)
      setResult(rectangleResult)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Geometria', href: '/it/geometria' },
    { label: 'Area e Perimetro del Rettangolo', href: '/it/geometria/rettangolo' }
  ]

  const examples = [
    {
      label: 'Rettangolo 5×3 cm',
      values: { length: '5', width: '3' }
    },
    {
      label: 'Rettangolo 8×6 m',
      values: { length: '8', width: '6' }
    },
    {
      label: 'Rettangolo 12×4.5 cm',
      values: { length: '12', width: '4.5' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual è la differenza tra base e altezza?',
      answer: 'La base è la lunghezza del lato inferiore del rettangolo, mentre l\'altezza è la lunghezza del lato verticale. In un rettangolo, i lati opposti sono uguali.'
    },
    {
      question: 'Come si calcola l\'area del rettangolo?',
      answer: 'L\'area del rettangolo si calcola moltiplicando la base per l\'altezza: A = base × altezza.'
    },
    {
      question: 'Come si calcola il perimetro del rettangolo?',
      answer: 'Il perimetro del rettangolo si calcola sommando tutti i lati: P = 2 × (base + altezza).'
    },
    {
      question: 'Posso usare diverse unità di misura?',
      answer: 'Sì, puoi usare qualsiasi unità di misura (cm, m, pollici, ecc.). I risultati saranno nelle stesse unità che hai inserito.'
    }
  ]

  const relatedLinks = [
    { label: 'Area e Perimetro del Cerchio', href: '/it/geometria/cerchio', description: 'Calcola area e perimetro del cerchio' },
    { label: 'Area del Triangolo', href: '/it/geometria/triangolo', description: 'Calcola l\'area del triangolo' },
    { label: 'Area e Perimetro del Quadrato', href: '/it/geometria/quadrato', description: 'Calcola area e perimetro del quadrato' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setLength(values.length as string)
    setWidth(values.width as string)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Area e Perimetro del Rettangolo',
            description: 'Calcola area e perimetro del rettangolo conoscendo base e altezza',
            url: '/it/geometria/rettangolo/',
            category: 'Geometria'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Area e Perimetro del Rettangolo"
            description="Calcola area e perimetro del rettangolo conoscendo base e altezza"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RectangleHorizontal className="h-5 w-5" />
                  Calcolatrice Rettangolo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Base (Lunghezza)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 5"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Altezza (Larghezza)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 3"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <RectangleHorizontal className="h-4 w-4 mr-2" />
                  Calcola
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {result && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultati del Calcolo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <RectangleHorizontal className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Area</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            {result.area.toFixed(2)} unità²
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <RectangleHorizontal className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Perimetro</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {result.perimeter.toFixed(2)} unità
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Rettangolo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Base:</span>
                            <span className="font-medium">{result.length.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Altezza:</span>
                            <span className="font-medium">{result.width.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Area:</span>
                            <span className="font-medium">{result.area.toFixed(2)} unità²</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Perimetro:</span>
                            <span className="font-medium">{result.perimeter.toFixed(2)} unità</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Formule Utilizzate:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>Area:</strong> A = base × altezza</li>
                              <li><strong>Perimetro:</strong> P = 2 × (base + altezza)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
