"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Circle, Info } from 'lucide-react'
import { calculateCircle, calculateCircleFromDiameter, calculateCircleFromArea, type CircleResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function KreisRechnerClientDE() {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputType, setInputType] = useState<'radius' | 'diameter' | 'area'>('radius')
  const [result, setResult] = useState<CircleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)

    try {
      const value = parseFloat(inputValue)
      
      if (isNaN(value) || value <= 0) {
        setError('Bitte geben Sie einen gültigen Wert größer als 0 ein')
        return
      }

      let calculation: CircleResult
      
      switch (inputType) {
        case 'radius':
          calculation = calculateCircle(value)
          break
        case 'diameter':
          calculation = calculateCircleFromDiameter(value)
          break
        case 'area':
          calculation = calculateCircleFromArea(value)
          break
        default:
          setError('Ungültiger Eingabetyp')
          return
      }
      
      setResult(calculation)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Fehler bei der Berechnung')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setInputValue(values.inputValue as string)
    setInputType(values.inputType as 'radius' | 'diameter' | 'area')
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/geometrie/kreis')

  const examples = [
    {
      label: 'Kreis mit Radius 5 cm',
      values: {
        inputValue: '5',
        inputType: 'radius' as const
      }
    },
    {
      label: 'Kreis mit Durchmesser 10 cm',
      values: {
        inputValue: '10',
        inputType: 'diameter' as const
      }
    },
    {
      label: 'Kreis mit Fläche 78,54 cm²',
      values: {
        inputValue: '78.54',
        inputType: 'area' as const
      }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist der Unterschied zwischen Radius und Durchmesser?',
      answer: 'Der Radius ist der Abstand vom Mittelpunkt des Kreises zu einem beliebigen Punkt am Rand. Der Durchmesser ist das Doppelte des Radius, also die Entfernung, die den Kreis durch den Mittelpunkt durchquert.'
    },
    {
      question: 'Wie berechnet man die Fläche eines Kreises?',
      answer: 'Die Fläche wird mit der Formel A = π × r² berechnet, wobei π (Pi) ungefähr 3,14159 ist und r der Radius des Kreises.'
    },
    {
      question: 'Was ist π (Pi) und warum wird es verwendet?',
      answer: 'π (Pi) ist eine mathematische Konstante, die das Verhältnis zwischen dem Umfang eines Kreises und seinem Durchmesser darstellt. Sein Näherungswert ist 3,14159 und ist grundlegend für geometrische Kreisberechnungen.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Rechteck-Rechner',
      href: '/de/geometrie/rechteck/'
    },
    {
      label: 'Dreieck-Rechner',
      href: '/de/geometrie/dreieck/'
    },
    {
      label: 'Quadrat-Rechner',
      href: '/de/geometrie/quadrat/'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Kreis-Rechner - Fläche und Umfang berechnen',
            description: 'Berechnen Sie Fläche, Umfang, Durchmesser und Radius eines Kreises mit präzisen Formeln',
            url: '/de/geometrie/kreis/',
            category: 'Geometrie'
          }))
        }}
      />

      <Container>
        <div className="py-8">
          <BreadcrumbsDE 
            items={breadcrumbs} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Kreis-Rechner - Fläche und Umfang berechnen"
            description="Berechnen Sie Fläche, Umfang, Durchmesser und Radius eines Kreises mit präzisen Formeln."
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExample}
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Circle className="text-blue-600" />
                      Kreisdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Eingabetyp</Label>
                      <Select value={inputType} onValueChange={(value: 'radius' | 'diameter' | 'area') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="radius">Radius</SelectItem>
                          <SelectItem value="diameter">Durchmesser</SelectItem>
                          <SelectItem value="area">Fläche</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="inputValue">
                        {inputType === 'radius' ? 'Radius' : inputType === 'diameter' ? 'Durchmesser' : 'Fläche'} (cm)
                      </Label>
                      <Input
                        id="inputValue"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Geben Sie den ${inputType === 'radius' ? 'Radius' : inputType === 'diameter' ? 'Durchmesser' : 'Fläche'} ein`}
                        step="0.01"
                        min="0"
                      />
                    </div>

                    <Button onClick={handleCalculate} className="w-full calculator-button">
                      <Calculator className="w-4 h-4 mr-2" />
                      Berechnen
                    </Button>

                    {error && (
                      <Alert variant="destructive">
                        <AlertTitle>Fehler</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="text-green-600" />
                        Ergebnisse
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Radius</div>
                          <div className="text-2xl font-bold text-blue-900">{result.radius} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Durchmesser</div>
                          <div className="text-2xl font-bold text-blue-900">{result.diameter} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Fläche</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Umfang</div>
                          <div className="text-2xl font-bold text-green-900">{result.circumference} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Verwendete Formeln:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Fläche = π × r² = π × {result.radius}² = {result.area} cm²</div>
                          <div>• Umfang = 2 × π × r = 2 × π × {result.radius} = {result.circumference} cm</div>
                          <div>• Durchmesser = 2 × r = 2 × {result.radius} = {result.diameter} cm</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Informationen über den Kreis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Ein Kreis ist eine ebene geometrische Figur, die aus allen Punkten besteht, die den gleichen Abstand zu einem zentralen Punkt haben, der als Mittelpunkt bezeichnet wird.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Eigenschaften des Kreises:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Radius (r): Abstand vom Mittelpunkt zum Rand</li>
                            <li>Durchmesser (d): 2 mal der Radius</li>
                            <li>Fläche: π × r²</li>
                            <li>Umfang: 2 × π × r</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Anwendungen:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Berechnung von Kreisflächen</li>
                            <li>Design von Rädern und Zahnrädern</li>
                            <li>Architektur und Bauwesen</li>
                            <li>Physik und Ingenieurwesen</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
