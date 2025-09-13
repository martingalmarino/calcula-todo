"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Circle, AlertCircle, Info } from 'lucide-react'
import { calculateCircle, type CircleResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'

export default function CerchioClientIT() {
  const [inputValue, setInputValue] = useState('')
  const [inputType, setInputType] = useState<'radius' | 'diameter'>('radius')
  const [result, setResult] = useState<CircleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!inputValue) {
      setError('Inserisci un valore')
      return
    }

    try {
      const value = parseFloat(inputValue)
      if (isNaN(value) || value <= 0) {
        setError('Inserisci un valore numerico valido e positivo')
        return
      }

      let radius: number
      if (inputType === 'radius') {
        radius = value
      } else {
        radius = value / 2 // diametro / 2 = raggio
      }

      const circleResult = calculateCircle(radius)
      setResult(circleResult)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Geometria', href: '/it/geometria' },
    { label: 'Area e Perimetro del Cerchio', href: '/it/geometria/cerchio' }
  ]

  const examples = [
    {
      label: 'Cerchio con raggio 5 cm',
      values: { inputValue: '5', inputType: 'radius' }
    },
    {
      label: 'Cerchio con diametro 10 cm',
      values: { inputValue: '10', inputType: 'diameter' }
    },
    {
      label: 'Cerchio con raggio 3.5 m',
      values: { inputValue: '3.5', inputType: 'radius' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual è la differenza tra raggio e diametro?',
      answer: 'Il raggio è la distanza dal centro del cerchio a qualsiasi punto della circonferenza. Il diametro è il doppio del raggio e passa per il centro del cerchio.'
    },
    {
      question: 'Come si calcola l\'area del cerchio?',
      answer: 'L\'area del cerchio si calcola con la formula A = π × r², dove r è il raggio e π (pi greco) è circa 3.14159.'
    },
    {
      question: 'Come si calcola la circonferenza?',
      answer: 'La circonferenza si calcola con la formula C = 2 × π × r (con il raggio) o C = π × d (con il diametro).'
    },
    {
      question: 'Posso usare diverse unità di misura?',
      answer: 'Sì, puoi usare qualsiasi unità di misura (cm, m, pollici, ecc.). I risultati saranno nelle stesse unità che hai inserito.'
    }
  ]

  const relatedLinks = [
    { label: 'Area e Perimetro del Rettangolo', href: '/it/geometria/rettangolo', description: 'Calcola area e perimetro del rettangolo' },
    { label: 'Area del Triangolo', href: '/it/geometria/triangolo', description: 'Calcola l\'area del triangolo' },
    { label: 'Area e Perimetro del Quadrato', href: '/it/geometria/quadrato', description: 'Calcola area e perimetro del quadrato' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInputValue(values.inputValue as string)
    setInputType(values.inputType as 'radius' | 'diameter')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Area e Perimetro del Cerchio',
            description: 'Calcola area e perimetro del cerchio conoscendo il raggio o il diametro',
            url: '/it/geometria/cerchio/',
            category: 'Geometria'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Area e Perimetro del Cerchio"
            description="Calcola area e perimetro del cerchio conoscendo il raggio o il diametro"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Circle className="h-5 w-5" />
                  Calcolatrice Cerchio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tipo di Input
                    </label>
                    <Select value={inputType} onValueChange={(value) => setInputType(value as 'radius' | 'diameter')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="radius">Raggio</SelectItem>
                        <SelectItem value="diameter">Diametro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valore ({inputType === 'radius' ? 'Raggio' : 'Diametro'})
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={`Es: ${inputType === 'radius' ? '5' : '10'}`}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Circle className="h-4 w-4 mr-2" />
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
                            <Circle className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Area</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            {result.area.toFixed(2)} π
                          </p>
                          <p className="text-sm text-blue-700">
                            ≈ {(result.area * Math.PI).toFixed(2)} unità²
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Circle className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Circonferenza</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {result.circumference.toFixed(2)} π
                          </p>
                          <p className="text-sm text-green-700">
                            ≈ {(result.circumference * Math.PI).toFixed(2)} unità
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Cerchio:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Raggio:</span>
                            <span className="font-medium">{result.radius.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Diametro:</span>
                            <span className="font-medium">{result.diameter.toFixed(2)} unità</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Area:</span>
                            <span className="font-medium">{result.area.toFixed(2)} π</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Circonferenza:</span>
                            <span className="font-medium">{result.circumference.toFixed(2)} π</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Formule Utilizzate:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>Area:</strong> A = π × r²</li>
                              <li><strong>Circonferenza:</strong> C = 2 × π × r</li>
                              <li><strong>Diametro:</strong> d = 2 × r</li>
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
