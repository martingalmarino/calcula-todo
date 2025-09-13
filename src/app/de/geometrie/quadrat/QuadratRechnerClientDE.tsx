"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Square, Info } from 'lucide-react'
import { calculateSquare, calculateSquareFromArea, calculateSquareFromPerimeter, type SquareResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function QuadratRechnerClientDE() {
  const [inputType, setInputType] = useState<'side' | 'area' | 'perimeter'>('side')
  const [side, setSide] = useState<string>('')
  const [knownValue, setKnownValue] = useState<string>('')
  const [result, setResult] = useState<SquareResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)

    try {
      let calculation: SquareResult
      
      switch (inputType) {
        case 'side':
          const sideNum = parseFloat(side)
          
          if (isNaN(sideNum) || sideNum <= 0) {
            setError('Bitte geben Sie einen gültigen Wert größer als 0 ein')
            return
          }
          
          calculation = calculateSquare(sideNum)
          break
          
        case 'area':
          const area = parseFloat(knownValue)
          
          if (isNaN(area) || area <= 0) {
            setError('Bitte geben Sie einen gültigen Wert größer als 0 ein')
            return
          }
          
          calculation = calculateSquareFromArea(area)
          break
          
        case 'perimeter':
          const perimeter = parseFloat(knownValue)
          
          if (isNaN(perimeter) || perimeter <= 0) {
            setError('Bitte geben Sie einen gültigen Wert größer als 0 ein')
            return
          }
          
          calculation = calculateSquareFromPerimeter(perimeter)
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
    setInputType(values.inputType as 'side' | 'area' | 'perimeter')
    setSide((values.side as string) || '')
    setKnownValue((values.knownValue as string) || '')
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/geometrie/quadrat')

  const examples = [
    {
      label: 'Quadrat mit Seite 5 cm',
      values: {
        inputType: 'side' as const,
        side: '5'
      }
    },
    {
      label: 'Quadrat mit Fläche 25 cm²',
      values: {
        inputType: 'area' as const,
        knownValue: '25'
      }
    },
    {
      label: 'Quadrat mit Umfang 20 cm',
      values: {
        inputType: 'perimeter' as const,
        knownValue: '20'
      }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist ein Quadrat?',
      answer: 'Ein Quadrat ist ein Rechteck mit vier gleich langen Seiten und vier rechten Winkeln. Es ist ein spezieller Fall eines Rechtecks.'
    },
    {
      question: 'Wie berechnet man die Fläche eines Quadrats?',
      answer: 'Die Fläche wird berechnet, indem die Seite mit sich selbst multipliziert wird: Fläche = Seite². Zum Beispiel hat ein Quadrat mit 5cm Seite eine Fläche von 25 cm².'
    },
    {
      question: 'Wie berechnet man den Umfang eines Quadrats?',
      answer: 'Der Umfang wird berechnet, indem die Seite mit 4 multipliziert wird: Umfang = 4 × Seite. Zum Beispiel hat ein Quadrat mit 5cm Seite einen Umfang von 20 cm.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Kreis-Rechner',
      href: '/de/geometrie/kreis/'
    },
    {
      label: 'Rechteck-Rechner',
      href: '/de/geometrie/rechteck/'
    },
    {
      label: 'Dreieck-Rechner',
      href: '/de/geometrie/dreieck/'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Quadrat-Rechner - Fläche und Umfang berechnen',
            description: 'Berechnen Sie Fläche und Umfang eines Quadrats',
            url: '/de/geometrie/quadrat/',
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
            title="Quadrat-Rechner - Fläche und Umfang berechnen"
            description="Berechnen Sie Fläche und Umfang eines Quadrats."
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
                      <Square className="text-blue-600" />
                      Quadratdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Berechnungstyp</Label>
                      <select 
                        id="inputType"
                        value={inputType} 
                        onChange={(e) => setInputType(e.target.value as 'side' | 'area' | 'perimeter')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="side">Sie kennen die Seite</option>
                        <option value="area">Sie kennen die Fläche</option>
                        <option value="perimeter">Sie kennen den Umfang</option>
                      </select>
                    </div>

                    {inputType === 'side' && (
                      <div>
                        <Label htmlFor="side">Seite (cm)</Label>
                        <Input
                          id="side"
                          type="number"
                          value={side}
                          onChange={(e) => setSide(e.target.value)}
                          placeholder="Geben Sie die Seite ein"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}

                    {(inputType === 'area' || inputType === 'perimeter') && (
                      <div>
                        <Label htmlFor="knownValue">
                          {inputType === 'area' ? 'Fläche (cm²)' : 'Umfang (cm)'}
                        </Label>
                        <Input
                          id="knownValue"
                          type="number"
                          value={knownValue}
                          onChange={(e) => setKnownValue(e.target.value)}
                          placeholder={`Geben Sie die ${inputType === 'area' ? 'Fläche' : 'Umfang'} ein`}
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}

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
                          <div className="text-sm text-blue-600 font-medium">Seite</div>
                          <div className="text-2xl font-bold text-blue-900">{result.side} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Fläche</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg col-span-2">
                          <div className="text-sm text-green-600 font-medium">Umfang</div>
                          <div className="text-2xl font-bold text-green-900">{result.perimeter} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Verwendete Formeln:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Fläche = Seite² = {result.side}² = {result.area} cm²</div>
                          <div>• Umfang = 4 × Seite = 4 × {result.side} = {result.perimeter} cm</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Informationen über das Quadrat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Ein Quadrat ist ein Rechteck mit vier gleich langen Seiten und vier rechten Winkeln. Es ist eine der grundlegendsten geometrischen Formen.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Eigenschaften des Quadrats:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Vier gleich lange Seiten</li>
                            <li>Vier rechte Winkel (90°)</li>
                            <li>Gleiche Diagonalen, die sich senkrecht schneiden</li>
                            <li>Fläche = Seite²</li>
                            <li>Umfang = 4 × Seite</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Anwendungen:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Architektur und Design</li>
                            <li>Mosaike und Kunst</li>
                            <li>Spiele und Puzzles</li>
                            <li>Mathematik und Geometrie</li>
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
