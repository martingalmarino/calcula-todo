"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Square, AlertCircle, Info } from 'lucide-react'
import { calculateSquare, type SquareResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'

export default function QuadratoClientIT() {
  const [side, setSide] = useState('')
  const [result, setResult] = useState<SquareResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!side) {
      setError('Inserisci la lunghezza del lato')
      return
    }

    try {
      const sideNum = parseFloat(side)
      
      if (isNaN(sideNum) || sideNum <= 0) {
        setError('Inserisci un valore numerico valido e positivo')
        return
      }

      const squareResult = calculateSquare(sideNum)
      setResult(squareResult)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Geometria', href: '/it/geometria' },
    { label: 'Area e Perimetro del Quadrato', href: '/it/geometria/quadrato' }
  ]

  const examples = [
    {
      label: 'Quadrato lato 5 cm',
      values: { side: '5' }
    },
    {
      label: 'Quadrato lato 7.5 m',
      values: { side: '7.5' }
    },
    {
      label: 'Quadrato lato 12 cm',
      values: { side: '12' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è un quadrato?',
      answer: 'Un quadrato è un quadrilatero con tutti i lati uguali e tutti gli angoli retti (90°). È un caso particolare di rettangolo e rombo.'
    },
    {
      question: 'Come si calcola l\'area del quadrato?',
      answer: 'L\'area del quadrato si calcola elevando al quadrato la lunghezza del lato: A = lato².'
    },
    {
      question: 'Come si calcola il perimetro del quadrato?',
      answer: 'Il perimetro del quadrato si calcola moltiplicando la lunghezza del lato per 4: P = 4 × lato.'
    },
    {
      question: 'Posso usare diverse unità di misura?',
      answer: 'Sì, puoi usare qualsiasi unità di misura (cm, m, pollici, ecc.). I risultati saranno nelle stesse unità che hai inserito.'
    }
  ]

  const relatedLinks = [
    { label: 'Area e Perimetro del Cerchio', href: '/it/geometria/cerchio', description: 'Calcola area e perimetro del cerchio' },
    { label: 'Area e Perimetro del Rettangolo', href: '/it/geometria/rettangolo', description: 'Calcola area e perimetro del rettangolo' },
    { label: 'Area del Triangolo', href: '/it/geometria/triangolo', description: 'Calcola l\'area del triangolo' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setSide(values.side as string)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Area e Perimetro del Quadrato',
            description: 'Calcola area e perimetro del quadrato conoscendo il lato',
            url: '/it/geometria/quadrato/',
            category: 'Geometria'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Area e Perimetro del Quadrato"
            description="Calcola area e perimetro del quadrato conoscendo il lato"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Square className="h-5 w-5" />
                  Calcolatrice Quadrato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lato del Quadrato
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Es: 5"
                    value={side}
                    onChange={(e) => setSide(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Square className="h-4 w-4 mr-2" />
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
                            <Square className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Area</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            {result.area.toFixed(2)} unità²
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Square className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Perimetro</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {result.perimeter.toFixed(2)} unità
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Quadrato:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Lato:</span>
                            <span className="font-medium">{result.side.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Area:</span>
                            <span className="font-medium">{result.area.toFixed(2)} unità²</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Perimetro:</span>
                            <span className="font-medium">{result.perimeter.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Diagonale:</span>
                            <span className="font-medium">{(result.side * Math.sqrt(2)).toFixed(2)} unità</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Formule Utilizzate:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>Area:</strong> A = lato²</li>
                              <li><strong>Perimetro:</strong> P = 4 × lato</li>
                              <li><strong>Diagonale:</strong> d = lato × √2</li>
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
