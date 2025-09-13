"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Scale, AlertCircle } from 'lucide-react'
import { calculateIMC, type IMCResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function BMIRechnerClientDE() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [results, setResults] = useState<IMCResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !height) {
      setError('Bitte geben Sie Ihr Gewicht und Ihre Größe ein')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      
      if (isNaN(weightNum) || isNaN(heightNum)) {
        setError('Bitte geben Sie gültige Zahlenwerte ein')
        return
      }

      const result = calculateIMC(weightNum, heightNum, 'de')
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der BMI-Berechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.height) setHeight(example.height as string)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/gesundheit/bmi')

  const examples = [
    {
      label: 'Beispiel: Person 70kg und 175cm',
      values: { weight: '70', height: '175' }
    },
    {
      label: 'Beispiel: Person 60kg und 165cm',
      values: { weight: '60', height: '165' }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist der BMI?',
      answer: 'Der Body-Mass-Index (BMI) ist eine Maßzahl, die das Verhältnis von Gewicht zu Körpergröße bewertet, um festzustellen, ob eine Person ein gesundes Gewicht hat.'
    },
    {
      question: 'Wie wird der BMI berechnet?',
      answer: 'Der BMI wird berechnet, indem das Gewicht (in kg) durch die Körpergröße zum Quadrat (in Metern) geteilt wird: BMI = Gewicht / (Größe)²'
    },
    {
      question: 'Welche BMI-Kategorien gibt es?',
      answer: 'Untergewicht: < 18,5, Normalgewicht: 18,5-24,9, Übergewicht: 25-29,9, Adipositas: ≥ 30'
    },
    {
      question: 'Ist der BMI für alle Menschen genau?',
      answer: 'Der BMI ist ein nützliches Tool, berücksichtigt aber nicht die Körperzusammensetzung. Sportler mit viel Muskelmasse können einen hohen BMI haben, ohne adipös zu sein.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'BMI-Rechner - Body-Mass-Index',
            description: 'Berechnen Sie Ihren Body-Mass-Index und bewerten Sie Ihr Gewicht',
            url: '/de/gesundheit/bmi/',
            category: 'Gesundheit'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="BMI-Rechner - Body-Mass-Index"
            description="Berechnen Sie Ihren Body-Mass-Index und bewerten Sie Ihr Gewicht. Ideal für die Bewertung Ihres Gesundheitszustands"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  BMI-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Gewicht (kg)
                    </label>
                    <Input
                      type="number"
                      placeholder="z.B. 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full"
                    />
                  </div>
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
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  BMI berechnen
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
                      <CardTitle className="text-lg">BMI-Berechnung Ergebnis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {results.imc}
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                          {results.category}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          {results.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          {results.recommendation}
                        </p>
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
