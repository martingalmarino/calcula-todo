"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Hexagon, AlertCircle, Info } from 'lucide-react'
import { calculateTrapezoid, type TrapezoidResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'

export default function TrapezioClientIT() {
  const [base1, setBase1] = useState('')
  const [base2, setBase2] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<TrapezoidResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!base1 || !base2 || !height) {
      setError('Inserisci entrambe le basi e l\'altezza')
      return
    }

    try {
      const base1Num = parseFloat(base1)
      const base2Num = parseFloat(base2)
      const heightNum = parseFloat(height)
      
      if (isNaN(base1Num) || isNaN(base2Num) || isNaN(heightNum) || 
          base1Num <= 0 || base2Num <= 0 || heightNum <= 0) {
        setError('Inserisci valori numerici validi e positivi')
        return
      }

      const trapezoidResult = calculateTrapezoid(base1Num, base2Num, heightNum)
      setResult(trapezoidResult)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Geometria', href: '/it/geometria' },
    { label: 'Area del Trapezio', href: '/it/geometria/trapezio' }
  ]

  const examples = [
    {
      label: 'Trapezio basi 8×6, altezza 4 cm',
      values: { base1: '8', base2: '6', height: '4' }
    },
    {
      label: 'Trapezio basi 12×10, altezza 5 m',
      values: { base1: '12', base2: '10', height: '5' }
    },
    {
      label: 'Trapezio basi 15×9, altezza 6.5 cm',
      values: { base1: '15', base2: '9', height: '6.5' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è un trapezio?',
      answer: 'Un trapezio è un quadrilatero con almeno una coppia di lati paralleli. I lati paralleli si chiamano basi, mentre l\'altezza è la distanza perpendicolare tra le basi.'
    },
    {
      question: 'Come si calcola l\'area del trapezio?',
      answer: 'L\'area del trapezio si calcola moltiplicando la somma delle basi per l\'altezza e dividendo per 2: A = [(base1 + base2) × altezza] / 2.'
    },
    {
      question: 'Qual è la differenza tra trapezio isoscele e scaleno?',
      answer: 'Un trapezio isoscele ha i lati non paralleli uguali, mentre un trapezio scaleno ha tutti i lati di lunghezze diverse.'
    },
    {
      question: 'Posso usare diverse unità di misura?',
      answer: 'Sì, puoi usare qualsiasi unità di misura (cm, m, pollici, ecc.). I risultati saranno nelle stesse unità che hai inserito.'
    }
  ]

  const relatedLinks = [
    { label: 'Area e Perimetro del Rettangolo', href: '/it/geometria/rettangolo', description: 'Calcola area e perimetro del rettangolo' },
    { label: 'Area e Perimetro del Rombo', href: '/it/geometria/rombo', description: 'Calcola area e perimetro del rombo' },
    { label: 'Area del Triangolo', href: '/it/geometria/triangolo', description: 'Calcola l\'area del triangolo' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setBase1(values.base1 as string)
    setBase2(values.base2 as string)
    setHeight(values.height as string)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Area del Trapezio',
            description: 'Calcola l\'area del trapezio conoscendo le basi e l\'altezza',
            url: '/it/geometria/trapezio/',
            category: 'Geometria'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Area del Trapezio"
            description="Calcola l'area del trapezio conoscendo le basi e l'altezza"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hexagon className="h-5 w-5" />
                  Calcolatrice Trapezio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Base Maggiore
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 8"
                      value={base1}
                      onChange={(e) => setBase1(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Base Minore
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 6"
                      value={base2}
                      onChange={(e) => setBase2(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Altezza
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 4"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Hexagon className="h-4 w-4 mr-2" />
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
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.area.toFixed(2)} unità²
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          Area del Trapezio
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Trapezio:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Base Maggiore:</span>
                            <span className="font-medium">{result.base1.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Base Minore:</span>
                            <span className="font-medium">{result.base2.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Altezza:</span>
                            <span className="font-medium">{result.height.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Area:</span>
                            <span className="font-medium">{result.area.toFixed(2)} unità²</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Formule Utilizzate:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>Area:</strong> A = [(base1 + base2) × altezza] / 2</li>
                              <li><strong>Base Media:</strong> bm = (base1 + base2) / 2</li>
                              <li><strong>Area (con base media):</strong> A = base_media × altezza</li>
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
