"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Triangle, AlertCircle, Info } from 'lucide-react'
import { calculateTriangle, type TriangleResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'

export default function TriangoloClientIT() {
  const [base, setBase] = useState('')
  const [height, setHeight] = useState('')
  const [side1, setSide1] = useState('')
  const [side2, setSide2] = useState('')
  const [side3, setSide3] = useState('')
  const [method, setMethod] = useState<'base-height' | 'heron'>('base-height')
  const [result, setResult] = useState<TriangleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (method === 'base-height') {
      if (!base || !height) {
        setError('Inserisci sia la base che l\'altezza')
        return
      }

      try {
        const baseNum = parseFloat(base)
        const heightNum = parseFloat(height)
        
        if (isNaN(baseNum) || isNaN(heightNum) || baseNum <= 0 || heightNum <= 0) {
          setError('Inserisci valori numerici validi e positivi')
          return
        }

        const triangleResult = calculateTriangle(baseNum, heightNum)
        setResult(triangleResult)
      } catch {
        setError('Errore nel calcolo. Verifica i valori inseriti.')
      }
    } else {
      if (!side1 || !side2 || !side3) {
        setError('Inserisci tutti e tre i lati del triangolo')
        return
      }

      try {
        const side1Num = parseFloat(side1)
        const side2Num = parseFloat(side2)
        const side3Num = parseFloat(side3)
        
        if (isNaN(side1Num) || isNaN(side2Num) || isNaN(side3Num) || 
            side1Num <= 0 || side2Num <= 0 || side3Num <= 0) {
          setError('Inserisci valori numerici validi e positivi')
          return
        }

        // Verifica che i lati possano formare un triangolo
        if (side1Num + side2Num <= side3Num || 
            side1Num + side3Num <= side2Num || 
            side2Num + side3Num <= side1Num) {
          setError('I lati inseriti non possono formare un triangolo valido')
          return
        }

        const triangleResult = calculateTriangle(side1Num, side2Num, side3Num)
        setResult(triangleResult)
      } catch {
        setError('Errore nel calcolo. Verifica i valori inseriti.')
      }
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Geometria', href: '/it/geometria' },
    { label: 'Area del Triangolo', href: '/it/geometria/triangolo' }
  ]

  const examples = [
    {
      label: 'Triangolo base 6, altezza 4 cm',
      values: { base: '6', height: '4', method: 'base-height' }
    },
    {
      label: 'Triangolo lati 3, 4, 5 cm',
      values: { side1: '3', side2: '4', side3: '5', method: 'heron' }
    },
    {
      label: 'Triangolo base 8, altezza 5.5 m',
      values: { base: '8', height: '5.5', method: 'base-height' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual è la differenza tra i due metodi di calcolo?',
      answer: 'Il metodo base-altezza usa la formula A = (base × altezza) / 2. Il metodo di Erone usa i tre lati del triangolo e la formula A = √[s(s-a)(s-b)(s-c)] dove s è il semiperimetro.'
    },
    {
      question: 'Quando usare il metodo di Erone?',
      answer: 'Usa il metodo di Erone quando conosci i tre lati del triangolo ma non l\'altezza. È particolarmente utile per triangoli scaleni.'
    },
    {
      question: 'Come si calcola l\'altezza di un triangolo?',
      answer: 'L\'altezza è la distanza perpendicolare dalla base al vertice opposto. In un triangolo rettangolo, uno dei cateti è l\'altezza.'
    },
    {
      question: 'Posso usare diverse unità di misura?',
      answer: 'Sì, puoi usare qualsiasi unità di misura (cm, m, pollici, ecc.). I risultati saranno nelle stesse unità che hai inserito.'
    }
  ]

  const relatedLinks = [
    { label: 'Area e Perimetro del Cerchio', href: '/it/geometria/cerchio', description: 'Calcola area e perimetro del cerchio' },
    { label: 'Area e Perimetro del Rettangolo', href: '/it/geometria/rettangolo', description: 'Calcola area e perimetro del rettangolo' },
    { label: 'Area e Perimetro del Quadrato', href: '/it/geometria/quadrato', description: 'Calcola area e perimetro del quadrato' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMethod(values.method as 'base-height' | 'heron')
    if (values.method === 'base-height') {
      setBase(values.base as string)
      setHeight(values.height as string)
      setSide1('')
      setSide2('')
      setSide3('')
    } else {
      setSide1(values.side1 as string)
      setSide2(values.side2 as string)
      setSide3(values.side3 as string)
      setBase('')
      setHeight('')
    }
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Area del Triangolo',
            description: 'Calcola l\'area del triangolo con diversi metodi: base e altezza, formula di Erone',
            url: '/it/geometria/triangolo/',
            category: 'Geometria'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Area del Triangolo"
            description="Calcola l'area del triangolo con diversi metodi: base e altezza, formula di Erone"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Triangle className="h-5 w-5" />
                  Calcolatrice Triangolo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Metodo di Calcolo
                  </label>
                  <Select value={method} onValueChange={(value) => setMethod(value as 'base-height' | 'heron')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base-height">Base e Altezza</SelectItem>
                      <SelectItem value="heron">Formula di Erone (3 lati)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {method === 'base-height' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Base
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 6"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
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
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Lato 1
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 3"
                        value={side1}
                        onChange={(e) => setSide1(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Lato 2
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 4"
                        value={side2}
                        onChange={(e) => setSide2(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Lato 3
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 5"
                        value={side3}
                        onChange={(e) => setSide3(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Triangle className="h-4 w-4 mr-2" />
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
                          Area del Triangolo
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Triangolo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {method === 'base-height' ? (
                            <>
                              <div className="flex justify-between">
                                <span>Base:</span>
                                <span className="font-medium">{result.base.toFixed(2)} unità</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Altezza:</span>
                                <span className="font-medium">{result.height.toFixed(2)} unità</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between">
                                <span>Lato 1:</span>
                                <span className="font-medium">{result.side1?.toFixed(2)} unità</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lato 2:</span>
                                <span className="font-medium">{result.side2?.toFixed(2)} unità</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lato 3:</span>
                                <span className="font-medium">{result.side3?.toFixed(2)} unità</span>
                              </div>
                            </>
                          )}
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
                            {method === 'base-height' ? (
                              <p><strong>Area:</strong> A = (base × altezza) / 2</p>
                            ) : (
                              <p><strong>Formula di Erone:</strong> A = √[s(s-a)(s-b)(s-c)] dove s = (a+b+c)/2</p>
                            )}
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
