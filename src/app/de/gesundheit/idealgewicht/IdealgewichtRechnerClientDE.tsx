"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Target, AlertCircle } from 'lucide-react'
import { calculateIdealWeight, type IdealWeightResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function IdealgewichtRechnerClientDE() {
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [results, setResults] = useState<IdealWeightResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!height) {
      setError('Bitte geben Sie Ihre Größe ein')
      return
    }

    try {
      const heightNum = parseFloat(height)
      
      if (isNaN(heightNum)) {
        setError('Bitte geben Sie einen gültigen Zahlenwert ein')
        return
      }

      const result = calculateIdealWeight(heightNum, gender, 'de')
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Idealgewicht-Berechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.height) setHeight(example.height as string)
    if (example.gender) setGender(example.gender as 'male' | 'female')
  }

  const breadcrumbs = getBreadcrumbsDE('/de/gesundheit/idealgewicht')

  const examples = [
    {
      label: 'Beispiel: Mann 180cm',
      values: { height: '180', gender: 'male' }
    },
    {
      label: 'Beispiel: Frau 165cm',
      values: { height: '165', gender: 'female' }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist das Idealgewicht?',
      answer: 'Das Idealgewicht ist eine Schätzung des optimalen Körpergewichts basierend auf Größe und Geschlecht. Es wird mit der Devine-Formel berechnet.'
    },
    {
      question: 'Wie wird das Idealgewicht berechnet?',
      answer: 'Die Devine-Formel verwendet die Körpergröße in Zoll: Männer: 50kg + 2,3kg × (Größe in Zoll - 60), Frauen: 45,5kg + 2,3kg × (Größe in Zoll - 60)'
    },
    {
      question: 'Welche Faktoren beeinflussen das Idealgewicht?',
      answer: 'Größe, Geschlecht, Alter, Körperzusammensetzung, Muskelmasse und Knochenstruktur beeinflussen das Idealgewicht. Es ist nur eine Schätzung.'
    },
    {
      question: 'Ist das Idealgewicht für alle Menschen geeignet?',
      answer: 'Das Idealgewicht ist eine allgemeine Schätzung. Athleten, ältere Menschen oder Menschen mit besonderen Körperzusammensetzungen können abweichen.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Idealgewicht-Rechner - Optimales Gewicht',
            description: 'Berechnen Sie Ihr ideales Gewicht basierend auf Größe und Geschlecht',
            url: '/de/gesundheit/idealgewicht/',
            category: 'Gesundheit'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Idealgewicht-Rechner - Optimales Gewicht"
            description="Berechnen Sie Ihr ideales Gewicht basierend auf Größe und Geschlecht. Ideal für die Gewichtsplanung und Gesundheitsziele"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Idealgewicht-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Größe (cm)
                    </label>
                    <Input
                      type="number"
                      placeholder="z.B. 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Geschlecht
                    </label>
                    <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Mann</SelectItem>
                        <SelectItem value="female">Frau</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Idealgewicht berechnen
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {results && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Idealgewicht-Berechnung Ergebnis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {results.idealWeight} kg
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                          Ideales Gewicht
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Gewichtsbereich:</h4>
                        <p className="text-blue-800 text-sm">
                          {results.range.min} kg - {results.range.max} kg
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Verwendete Formel:</h4>
                          <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                            {results.method}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Empfehlungen:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {results.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
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
    </>
  )
}
