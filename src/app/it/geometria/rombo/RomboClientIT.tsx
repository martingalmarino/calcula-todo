"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Diamond, AlertCircle, Info } from 'lucide-react'
import { calculateRhombus, type RhombusResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'

export default function RomboClientIT() {
  const [diagonal1, setDiagonal1] = useState('')
  const [diagonal2, setDiagonal2] = useState('')
  const [side, setSide] = useState('')
  const [method, setMethod] = useState<'diagonals' | 'side'>('diagonals')
  const [result, setResult] = useState<RhombusResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (method === 'diagonals') {
      if (!diagonal1 || !diagonal2) {
        setError('Inserisci entrambe le diagonali')
        return
      }

      try {
        const d1 = parseFloat(diagonal1)
        const d2 = parseFloat(diagonal2)
        
        if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
          setError('Inserisci valori numerici validi e positivi')
          return
        }

        const rhombusResult = calculateRhombus(d1, d2)
        setResult(rhombusResult)
      } catch {
        setError('Errore nel calcolo. Verifica i valori inseriti.')
      }
    } else {
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

        // Per il calcolo con il lato, assumiamo diagonali uguali per semplicità
        const rhombusResult = calculateRhombus(sideNum, sideNum)
        setResult(rhombusResult)
      } catch {
        setError('Errore nel calcolo. Verifica i valori inseriti.')
      }
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Geometria', href: '/it/geometria' },
    { label: 'Area e Perimetro del Rombo', href: '/it/geometria/rombo' }
  ]

  const examples = [
    {
      label: 'Rombo diagonali 6×8 cm',
      values: { diagonal1: '6', diagonal2: '8', method: 'diagonals' }
    },
    {
      label: 'Rombo lato 5 cm',
      values: { side: '5', method: 'side' }
    },
    {
      label: 'Rombo diagonali 10×12 m',
      values: { diagonal1: '10', diagonal2: '12', method: 'diagonals' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è un rombo?',
      answer: 'Un rombo è un quadrilatero con tutti i lati uguali. Le diagonali si intersecano perpendicolarmente e si dividono a metà.'
    },
    {
      question: 'Come si calcola l\'area del rombo?',
      answer: 'L\'area del rombo si calcola moltiplicando le diagonali e dividendo per 2: A = (d1 × d2) / 2.'
    },
    {
      question: 'Come si calcola il perimetro del rombo?',
      answer: 'Il perimetro del rombo si calcola moltiplicando la lunghezza del lato per 4: P = 4 × lato.'
    },
    {
      question: 'Qual è la differenza tra rombo e quadrato?',
      answer: 'Un quadrato è un rombo con tutti gli angoli retti. Un rombo ha angoli che possono essere diversi da 90°.'
    }
  ]

  const relatedLinks = [
    { label: 'Area e Perimetro del Cerchio', href: '/it/geometria/cerchio', description: 'Calcola area e perimetro del cerchio' },
    { label: 'Area e Perimetro del Quadrato', href: '/it/geometria/quadrato', description: 'Calcola area e perimetro del quadrato' },
    { label: 'Area del Trapezio', href: '/it/geometria/trapezio', description: 'Calcola l\'area del trapezio' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMethod(values.method as 'diagonals' | 'side')
    if (values.method === 'diagonals') {
      setDiagonal1(values.diagonal1 as string)
      setDiagonal2(values.diagonal2 as string)
      setSide('')
    } else {
      setSide(values.side as string)
      setDiagonal1('')
      setDiagonal2('')
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
            name: 'Area e Perimetro del Rombo',
            description: 'Calcola area e perimetro del rombo conoscendo le diagonali o il lato',
            url: '/it/geometria/rombo/',
            category: 'Geometria'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Area e Perimetro del Rombo"
            description="Calcola area e perimetro del rombo conoscendo le diagonali o il lato"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Diamond className="h-5 w-5" />
                  Calcolatrice Rombo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Metodo di Calcolo
                  </label>
                  <Select value={method} onValueChange={(value) => setMethod(value as 'diagonals' | 'side')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diagonals">Diagonali</SelectItem>
                      <SelectItem value="side">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {method === 'diagonals' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Diagonale 1
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 6"
                        value={diagonal1}
                        onChange={(e) => setDiagonal1(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Diagonale 2
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 8"
                        value={diagonal2}
                        onChange={(e) => setDiagonal2(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Lato del Rombo
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
                )}
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Diamond className="h-4 w-4 mr-2" />
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
                            <Diamond className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Area</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            {result.area.toFixed(2)} unità²
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Diamond className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Perimetro</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {result.perimeter.toFixed(2)} unità
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Rombo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Lato:</span>
                            <span className="font-medium">{result.side.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Diagonale 1:</span>
                            <span className="font-medium">{result.diagonal1.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Diagonale 2:</span>
                            <span className="font-medium">{result.diagonal2.toFixed(2)} unità</span>
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
                              <li><strong>Area:</strong> A = (d1 × d2) / 2</li>
                              <li><strong>Perimetro:</strong> P = 4 × lato</li>
                              <li><strong>Lato:</strong> l = √[(d1/2)² + (d2/2)²]</li>
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
