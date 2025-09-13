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
import { Calculator, RectangleHorizontal, Info } from 'lucide-react'
import { calculateRectangle, calculateRectangleFromArea, calculateRectangleFromPerimeter, type RectangleResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function RechteckRechnerClientDE() {
  const [length, setLength] = useState<string>('')
  const [width, setWidth] = useState<string>('')
  const [inputType, setInputType] = useState<'dimensions' | 'area' | 'perimeter'>('dimensions')
  const [knownValue, setKnownValue] = useState<string>('')
  const [result, setResult] = useState<RectangleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)

    try {
      let calculation: RectangleResult
      
      switch (inputType) {
        case 'dimensions':
          const len = parseFloat(length)
          const wid = parseFloat(width)
          
          if (isNaN(len) || isNaN(wid) || len <= 0 || wid <= 0) {
            setError('Bitte geben Sie gültige Werte größer als 0 ein')
            return
          }
          
          calculation = calculateRectangle(len, wid)
          break
          
        case 'area':
          const area = parseFloat(knownValue)
          const lenFromArea = parseFloat(length)
          
          if (isNaN(area) || isNaN(lenFromArea) || area <= 0 || lenFromArea <= 0) {
            setError('Bitte geben Sie gültige Werte größer als 0 ein')
            return
          }
          
          calculation = calculateRectangleFromArea(area, lenFromArea)
          break
          
        case 'perimeter':
          const perimeter = parseFloat(knownValue)
          const lenFromPerimeter = parseFloat(length)
          
          if (isNaN(perimeter) || isNaN(lenFromPerimeter) || perimeter <= 0 || lenFromPerimeter <= 0) {
            setError('Bitte geben Sie gültige Werte größer als 0 ein')
            return
          }
          
          calculation = calculateRectangleFromPerimeter(perimeter, lenFromPerimeter)
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
    setInputType(values.inputType as 'dimensions' | 'area' | 'perimeter')
    setLength(values.length as string)
    setWidth((values.width as string) || '')
    setKnownValue((values.knownValue as string) || '')
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/geometrie/rechteck')

  const examples = [
    {
      label: 'Rechteck 8cm × 6cm',
      values: {
        inputType: 'dimensions' as const,
        length: '8',
        width: '6'
      }
    },
    {
      label: 'Rechteck mit Fläche 48 cm² und Länge 8 cm',
      values: {
        inputType: 'area' as const,
        length: '8',
        knownValue: '48'
      }
    },
    {
      label: 'Rechteck mit Umfang 28 cm und Länge 8 cm',
      values: {
        inputType: 'perimeter' as const,
        length: '8',
        knownValue: '28'
      }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist der Unterschied zwischen Fläche und Umfang?',
      answer: 'Die Fläche ist die Oberfläche, die die Figur einnimmt (gemessen in quadratischen Einheiten wie cm²). Der Umfang ist die Summe aller Seiten der Figur (gemessen in linearen Einheiten wie cm).'
    },
    {
      question: 'Wie berechnet man die Fläche eines Rechtecks?',
      answer: 'Die Fläche wird berechnet, indem die Länge mit der Breite multipliziert wird: Fläche = Länge × Breite. Zum Beispiel hat ein Rechteck von 5cm × 3cm eine Fläche von 15 cm².'
    },
    {
      question: 'Was ist ein Rechteck?',
      answer: 'Ein Rechteck ist ein Parallelogramm, das vier rechte Winkel (90°) hat und dessen gegenüberliegende Seiten gleich und parallel sind. Es ist eine der häufigsten geometrischen Figuren.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Kreis-Rechner',
      href: '/de/geometrie/kreis/'
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
            name: 'Rechteck-Rechner - Fläche und Umfang berechnen',
            description: 'Berechnen Sie Fläche und Umfang eines Rechtecks, wenn Sie die Abmessungen kennen oder umgekehrt',
            url: '/de/geometrie/rechteck/',
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
            title="Rechteck-Rechner - Fläche und Umfang berechnen"
            description="Berechnen Sie Fläche und Umfang eines Rechtecks, wenn Sie die Abmessungen kennen oder umgekehrt."
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
                      <RectangleHorizontal className="text-blue-600" />
                      Rechteckdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Berechnungstyp</Label>
                      <Select value={inputType} onValueChange={(value: 'dimensions' | 'area' | 'perimeter') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dimensions">Sie kennen Länge und Breite</SelectItem>
                          <SelectItem value="area">Sie kennen Fläche und Länge</SelectItem>
                          <SelectItem value="perimeter">Sie kennen Umfang und Länge</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="length">Länge (cm)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Geben Sie die Länge ein"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    {inputType === 'dimensions' && (
                      <div>
                        <Label htmlFor="width">Breite (cm)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="Geben Sie die Breite ein"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}

                    {inputType === 'area' && (
                      <div>
                        <Label htmlFor="knownValue">Fläche (cm²)</Label>
                        <Input
                          id="knownValue"
                          type="number"
                          value={knownValue}
                          onChange={(e) => setKnownValue(e.target.value)}
                          placeholder="Geben Sie die Fläche ein"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}

                    {inputType === 'perimeter' && (
                      <div>
                        <Label htmlFor="knownValue">Umfang (cm)</Label>
                        <Input
                          id="knownValue"
                          type="number"
                          value={knownValue}
                          onChange={(e) => setKnownValue(e.target.value)}
                          placeholder="Geben Sie den Umfang ein"
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
                          <div className="text-sm text-blue-600 font-medium">Länge</div>
                          <div className="text-2xl font-bold text-blue-900">{result.length} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Breite</div>
                          <div className="text-2xl font-bold text-blue-900">{result.width} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Fläche</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Umfang</div>
                          <div className="text-2xl font-bold text-green-900">{result.perimeter} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Verwendete Formeln:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Fläche = Länge × Breite = {result.length} × {result.width} = {result.area} cm²</div>
                          <div>• Umfang = 2 × (Länge + Breite) = 2 × ({result.length} + {result.width}) = {result.perimeter} cm</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Informationen über das Rechteck</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Ein Rechteck ist ein Parallelogramm, das vier rechte Winkel und gegenüberliegende Seiten hat, die gleich und parallel sind.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Eigenschaften des Rechtecks:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Vier rechte Winkel (90°)</li>
                            <li>Gegenüberliegende Seiten gleich und parallel</li>
                            <li>Gleiche Diagonalen, die sich halbieren</li>
                            <li>Fläche = Länge × Breite</li>
                            <li>Umfang = 2 × (Länge + Breite)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Anwendungen:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Bauwesen und Architektur</li>
                            <li>Möbeldesign</li>
                            <li>Berechnung von Oberflächen</li>
                            <li>Raumplanung</li>
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
