"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Triangle, Info } from 'lucide-react'
import { calculateTriangle, calculateTriangleFromSides, type TriangleResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function DreieckRechnerClientDE() {
  const [inputType, setInputType] = useState<'base-height' | 'sides'>('base-height')
  const [base, setBase] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [side1, setSide1] = useState<string>('')
  const [side2, setSide2] = useState<string>('')
  const [side3, setSide3] = useState<string>('')
  const [result, setResult] = useState<TriangleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)

    try {
      let calculation: TriangleResult
      
      if (inputType === 'base-height') {
        const baseNum = parseFloat(base)
        const heightNum = parseFloat(height)
        
        if (isNaN(baseNum) || isNaN(heightNum) || baseNum <= 0 || heightNum <= 0) {
          setError('Bitte geben Sie gültige Werte größer als 0 ein')
          return
        }
        
        calculation = calculateTriangle(baseNum, heightNum)
      } else {
        const s1 = parseFloat(side1)
        const s2 = parseFloat(side2)
        const s3 = parseFloat(side3)
        
        if (isNaN(s1) || isNaN(s2) || isNaN(s3) || s1 <= 0 || s2 <= 0 || s3 <= 0) {
          setError('Bitte geben Sie gültige Werte größer als 0 ein')
          return
        }
        
        calculation = calculateTriangleFromSides(s1, s2, s3)
      }
      
      setResult(calculation)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Fehler bei der Berechnung')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setInputType(values.inputType as 'base-height' | 'sides')
    setBase((values.base as string) || '')
    setHeight((values.height as string) || '')
    setSide1((values.side1 as string) || '')
    setSide2((values.side2 as string) || '')
    setSide3((values.side3 as string) || '')
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/geometrie/dreieck')

  const examples = [
    {
      label: 'Dreieck mit Basis 8 cm und Höhe 6 cm',
      values: {
        inputType: 'base-height' as const,
        base: '8',
        height: '6'
      }
    },
    {
      label: 'Dreieck mit Seiten 3, 4, 5 cm',
      values: {
        inputType: 'sides' as const,
        side1: '3',
        side2: '4',
        side3: '5'
      }
    },
    {
      label: 'Dreieck mit Seiten 5, 7, 9 cm',
      values: {
        inputType: 'sides' as const,
        side1: '5',
        side2: '7',
        side3: '9'
      }
    }
  ]

  const faqItems = [
    {
      question: 'Wie berechnet man die Fläche eines Dreiecks?',
      answer: 'Die Fläche wird mit der Formel A = (Basis × Höhe) / 2 berechnet. Bei drei Seiten wird die Formel von Heron verwendet.'
    },
    {
      question: 'Was ist die Formel von Heron?',
      answer: 'Die Formel von Heron berechnet die Fläche eines Dreiecks aus seinen drei Seiten: A = √(s(s-a)(s-b)(s-c)), wobei s der halbe Umfang ist.'
    },
    {
      question: 'Was ist die Dreiecksungleichung?',
      answer: 'Die Dreiecksungleichung besagt, dass die Summe zweier Seiten immer größer sein muss als die dritte Seite, damit ein gültiges Dreieck entsteht.'
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
            name: 'Dreieck-Rechner - Fläche und Umfang berechnen',
            description: 'Berechnen Sie Fläche und Umfang eines Dreiecks mit verschiedenen Methoden',
            url: '/de/geometrie/dreieck/',
            category: 'Geometrie'
          }))
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={breadcrumbs} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Dreieck-Rechner - Fläche und Umfang berechnen"
            description="Berechnen Sie Fläche und Umfang eines Dreiecks mit verschiedenen Methoden."
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
                      <Triangle className="text-blue-600" />
                      Dreieckdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Berechnungsmethode</Label>
                      <Select value={inputType} onValueChange={(value: 'base-height' | 'sides') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="base-height">Basis und Höhe</SelectItem>
                          <SelectItem value="sides">Drei Seiten</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {inputType === 'base-height' ? (
                      <>
                        <div>
                          <Label htmlFor="base">Basis (cm)</Label>
                          <Input
                            id="base"
                            type="number"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                            placeholder="Geben Sie die Basis ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Höhe (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Geben Sie die Höhe ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="side1">Seite 1 (cm)</Label>
                          <Input
                            id="side1"
                            type="number"
                            value={side1}
                            onChange={(e) => setSide1(e.target.value)}
                            placeholder="Geben Sie Seite 1 ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="side2">Seite 2 (cm)</Label>
                          <Input
                            id="side2"
                            type="number"
                            value={side2}
                            onChange={(e) => setSide2(e.target.value)}
                            placeholder="Geben Sie Seite 2 ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="side3">Seite 3 (cm)</Label>
                          <Input
                            id="side3"
                            type="number"
                            value={side3}
                            onChange={(e) => setSide3(e.target.value)}
                            placeholder="Geben Sie Seite 3 ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
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
                          <div className="text-sm text-blue-600 font-medium">Basis</div>
                          <div className="text-2xl font-bold text-blue-900">{result.base} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Höhe</div>
                          <div className="text-2xl font-bold text-blue-900">{result.height} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg col-span-2">
                          <div className="text-sm text-green-600 font-medium">Fläche</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                      </div>

                      {result.side1 && result.side2 && result.side3 && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Seitenlängen:</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center">
                              <div className="font-medium">Seite 1</div>
                              <div className="text-purple-600">{result.side1} cm</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">Seite 2</div>
                              <div className="text-purple-600">{result.side2} cm</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">Seite 3</div>
                              <div className="text-purple-600">{result.side3} cm</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Verwendete Formel:</h4>
                        <div className="text-sm text-gray-600">
                          {inputType === 'base-height' ? (
                            <div>• Fläche = (Basis × Höhe) / 2 = ({result.base} × {result.height}) / 2 = {result.area} cm²</div>
                          ) : (
                            <div>• Fläche = √(s(s-a)(s-b)(s-c)) = {result.area} cm² (Formel von Heron)</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Informationen über das Dreieck</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Ein Dreieck ist eine geometrische Figur mit drei Seiten und drei Winkeln. Es ist die einfachste Form eines Polygons.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Eigenschaften des Dreiecks:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Drei Seiten und drei Winkel</li>
                            <li>Die Summe der Winkel beträgt 180°</li>
                            <li>Dreiecksungleichung muss erfüllt sein</li>
                            <li>Fläche = (Basis × Höhe) / 2</li>
                            <li>Umfang = Summe aller Seiten</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Anwendungen:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Architektur und Bauwesen</li>
                            <li>Ingenieurwesen und Design</li>
                            <li>Navigation und Vermessung</li>
                            <li>Computer-Grafik und 3D-Modellierung</li>
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
