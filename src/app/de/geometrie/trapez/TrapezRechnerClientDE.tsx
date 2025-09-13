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
import { Calculator, Hexagon, Info } from 'lucide-react'
import { calculateTrapezoid, type TrapezoidResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function TrapezRechnerClientDE() {
  const [base1, setBase1] = useState<string>('')
  const [base2, setBase2] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [side1, setSide1] = useState<string>('')
  const [side2, setSide2] = useState<string>('')
  const [result, setResult] = useState<TrapezoidResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)

    try {
      const b1 = parseFloat(base1)
      const b2 = parseFloat(base2)
      const h = parseFloat(height)
      const s1 = parseFloat(side1) || 0
      const s2 = parseFloat(side2) || 0
      
      if (isNaN(b1) || isNaN(b2) || isNaN(h) || b1 <= 0 || b2 <= 0 || h <= 0) {
        setError('Bitte geben Sie gültige Werte größer als 0 für die Basen und Höhe ein')
        return
      }
      
      const calculation = calculateTrapezoid(b1, b2, h)
      setResult(calculation)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Fehler bei der Berechnung')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setBase1(values.base1 as string)
    setBase2(values.base2 as string)
    setHeight(values.height as string)
    setSide1((values.side1 as string) || '')
    setSide2((values.side2 as string) || '')
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/geometrie/trapez')

  const examples = [
    {
      label: 'Trapez mit Basen 8 cm, 6 cm und Höhe 4 cm',
      values: {
        base1: '8',
        base2: '6',
        height: '4'
      }
    },
    {
      label: 'Trapez mit Basen 10 cm, 5 cm, Höhe 3 cm und Seiten 4 cm, 5 cm',
      values: {
        base1: '10',
        base2: '5',
        height: '3',
        side1: '4',
        side2: '5'
      }
    },
    {
      label: 'Trapez mit Basen 12 cm, 8 cm und Höhe 6 cm',
      values: {
        base1: '12',
        base2: '8',
        height: '6'
      }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist ein Trapez?',
      answer: 'Ein Trapez ist ein Viereck mit mindestens einem Paar paralleler Seiten. Die parallelen Seiten werden als Basen bezeichnet.'
    },
    {
      question: 'Wie berechnet man die Fläche eines Trapezes?',
      answer: 'Die Fläche wird berechnet, indem die Summe der beiden Basen mit der Höhe multipliziert und durch 2 geteilt wird: Fläche = ((Basis1 + Basis2) × Höhe) / 2.'
    },
    {
      question: 'Wie berechnet man den Umfang eines Trapezes?',
      answer: 'Der Umfang wird berechnet, indem alle vier Seiten addiert werden: Umfang = Basis1 + Basis2 + Seite1 + Seite2.'
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
            name: 'Trapez-Rechner - Fläche und Umfang berechnen',
            description: 'Berechnen Sie Fläche und Umfang eines Trapezes',
            url: '/de/geometrie/trapez/',
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
            title="Trapez-Rechner - Fläche und Umfang berechnen"
            description="Berechnen Sie Fläche und Umfang eines Trapezes."
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
                      <Hexagon className="text-blue-600" />
                      Trapezdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="base1">Basis 1 (cm)</Label>
                      <Input
                        id="base1"
                        type="number"
                        value={base1}
                        onChange={(e) => setBase1(e.target.value)}
                        placeholder="Geben Sie Basis 1 ein"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="base2">Basis 2 (cm)</Label>
                      <Input
                        id="base2"
                        type="number"
                        value={base2}
                        onChange={(e) => setBase2(e.target.value)}
                        placeholder="Geben Sie Basis 2 ein"
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

                    <div>
                      <Label htmlFor="side1">Seite 1 (cm) - Optional</Label>
                      <Input
                        id="side1"
                        type="number"
                        value={side1}
                        onChange={(e) => setSide1(e.target.value)}
                        placeholder="Geben Sie Seite 1 ein (optional)"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="side2">Seite 2 (cm) - Optional</Label>
                      <Input
                        id="side2"
                        type="number"
                        value={side2}
                        onChange={(e) => setSide2(e.target.value)}
                        placeholder="Geben Sie Seite 2 ein (optional)"
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
                          <div className="text-sm text-blue-600 font-medium">Basis 1</div>
                          <div className="text-2xl font-bold text-blue-900">{result.base1} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Basis 2</div>
                          <div className="text-2xl font-bold text-blue-900">{result.base2} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Höhe</div>
                          <div className="text-2xl font-bold text-blue-900">{result.height} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Fläche</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                      </div>

                      {(result.side1 || result.side2) && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Seitenlängen:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {result.side1 && (
                              <div className="text-center">
                                <div className="font-medium">Seite 1</div>
                                <div className="text-purple-600">{result.side1} cm</div>
                              </div>
                            )}
                            {result.side2 && (
                              <div className="text-center">
                                <div className="font-medium">Seite 2</div>
                                <div className="text-purple-600">{result.side2} cm</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Verwendete Formel:</h4>
                        <div className="text-sm text-gray-600">
                          <div>• Fläche = ((Basis1 + Basis2) × Höhe) / 2 = (({result.base1} + {result.base2}) × {result.height}) / 2 = {result.area} cm²</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Informationen über das Trapez</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Ein Trapez ist ein Viereck mit mindestens einem Paar paralleler Seiten. Die parallelen Seiten werden als Basen bezeichnet, und die anderen beiden Seiten sind die Schenkel.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Eigenschaften des Trapezes:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Mindestens ein Paar paralleler Seiten</li>
                            <li>Die parallelen Seiten heißen Basen</li>
                            <li>Die anderen Seiten heißen Schenkel</li>
                            <li>Fläche = ((Basis1 + Basis2) × Höhe) / 2</li>
                            <li>Umfang = Summe aller Seiten</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Anwendungen:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Architektur und Bauwesen</li>
                            <li>Ingenieurwesen</li>
                            <li>Mathematik und Geometrie</li>
                            <li>Design und Kunst</li>
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
