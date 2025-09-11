"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Diamond, Info } from 'lucide-react'
import { calculateRhombus, type RhombusResult } from '@/lib/math/geometry'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function RauteRechnerClientDE() {
  const [inputType, setInputType] = useState<'diagonals' | 'side' | 'area'>('diagonals')
  const [diagonal1, setDiagonal1] = useState<string>('')
  const [diagonal2, setDiagonal2] = useState<string>('')
  const [side, setSide] = useState<string>('')
  const [knownValue, setKnownValue] = useState<string>('')
  const [result, setResult] = useState<RhombusResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)

    try {
      let calculation: RhombusResult
      
      switch (inputType) {
        case 'diagonals':
          const d1 = parseFloat(diagonal1)
          const d2 = parseFloat(diagonal2)
          
          if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
            setError('Bitte geben Sie gültige Werte größer als 0 ein')
            return
          }
          
          calculation = calculateRhombus(d1, d2)
          break
          
        case 'side':
          const sideNum = parseFloat(side)
          
          if (isNaN(sideNum) || sideNum <= 0) {
            setError('Bitte geben Sie einen gültigen Wert größer als 0 ein')
            return
          }
          
          // Für eine Raute mit gegebener Seite nehmen wir an, dass die Diagonalen gleich sind
          calculation = calculateRhombus(sideNum * Math.sqrt(2), sideNum * Math.sqrt(2))
          break
          
        case 'area':
          const area = parseFloat(knownValue)
          
          if (isNaN(area) || area <= 0) {
            setError('Bitte geben Sie einen gültigen Wert größer als 0 ein')
            return
          }
          
          // Für eine Raute mit gegebener Fläche nehmen wir an, dass die Diagonalen gleich sind
          const diagonal = Math.sqrt(2 * area)
          calculation = calculateRhombus(diagonal, diagonal)
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
    setInputType(values.inputType as 'diagonals' | 'side' | 'area')
    setDiagonal1((values.diagonal1 as string) || '')
    setDiagonal2((values.diagonal2 as string) || '')
    setSide((values.side as string) || '')
    setKnownValue((values.knownValue as string) || '')
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/geometrie/raute')

  const examples = [
    {
      label: 'Raute mit Diagonalen 8 cm und 6 cm',
      values: {
        inputType: 'diagonals' as const,
        diagonal1: '8',
        diagonal2: '6'
      }
    },
    {
      label: 'Raute mit Seite 5 cm',
      values: {
        inputType: 'side' as const,
        side: '5'
      }
    },
    {
      label: 'Raute mit Fläche 24 cm²',
      values: {
        inputType: 'area' as const,
        knownValue: '24'
      }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist eine Raute?',
      answer: 'Eine Raute ist ein Parallelogramm mit vier gleich langen Seiten. Die Diagonalen schneiden sich senkrecht und halbieren sich gegenseitig.'
    },
    {
      question: 'Wie berechnet man die Fläche einer Raute?',
      answer: 'Die Fläche wird berechnet, indem die beiden Diagonalen multipliziert und durch 2 geteilt werden: Fläche = (Diagonale1 × Diagonale2) / 2.'
    },
    {
      question: 'Wie berechnet man den Umfang einer Raute?',
      answer: 'Der Umfang wird berechnet, indem die Seite mit 4 multipliziert wird: Umfang = 4 × Seite.'
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
            name: 'Raute-Rechner - Fläche und Umfang berechnen',
            description: 'Berechnen Sie Fläche und Umfang einer Raute',
            url: '/de/geometrie/raute/',
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
            title="Raute-Rechner - Fläche und Umfang berechnen"
            description="Berechnen Sie Fläche und Umfang einer Raute."
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
                      <Diamond className="text-blue-600" />
                      Rautendaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Berechnungstyp</Label>
                      <select 
                        id="inputType"
                        value={inputType} 
                        onChange={(e) => setInputType(e.target.value as 'diagonals' | 'side' | 'area')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="diagonals">Sie kennen die Diagonalen</option>
                        <option value="side">Sie kennen die Seite</option>
                        <option value="area">Sie kennen die Fläche</option>
                      </select>
                    </div>

                    {inputType === 'diagonals' && (
                      <>
                        <div>
                          <Label htmlFor="diagonal1">Diagonale 1 (cm)</Label>
                          <Input
                            id="diagonal1"
                            type="number"
                            value={diagonal1}
                            onChange={(e) => setDiagonal1(e.target.value)}
                            placeholder="Geben Sie Diagonale 1 ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="diagonal2">Diagonale 2 (cm)</Label>
                          <Input
                            id="diagonal2"
                            type="number"
                            value={diagonal2}
                            onChange={(e) => setDiagonal2(e.target.value)}
                            placeholder="Geben Sie Diagonale 2 ein"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
                    )}

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
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Diagonale 1</div>
                          <div className="text-2xl font-bold text-blue-900">{result.diagonal1} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Diagonale 2</div>
                          <div className="text-2xl font-bold text-blue-900">{result.diagonal2} cm</div>
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
                          <div>• Fläche = (Diagonale1 × Diagonale2) / 2 = ({result.diagonal1} × {result.diagonal2}) / 2 = {result.area} cm²</div>
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
                    <CardTitle>Informationen über die Raute</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Eine Raute ist ein Parallelogramm mit vier gleich langen Seiten. Die Diagonalen schneiden sich senkrecht und halbieren sich gegenseitig.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Eigenschaften der Raute:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Vier gleich lange Seiten</li>
                            <li>Gegenüberliegende Winkel sind gleich</li>
                            <li>Diagonalen schneiden sich senkrecht</li>
                            <li>Fläche = (Diagonale1 × Diagonale2) / 2</li>
                            <li>Umfang = 4 × Seite</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Anwendungen:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Design und Kunst</li>
                            <li>Architektur</li>
                            <li>Mathematik und Geometrie</li>
                            <li>Spiele und Puzzles</li>
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
