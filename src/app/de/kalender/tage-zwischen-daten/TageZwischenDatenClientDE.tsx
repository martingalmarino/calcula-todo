"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calendar, Calculator, Info } from 'lucide-react'
import { calculateDaysBetween, type DaysBetweenResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function TageZwischenDatenClientDE() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<DaysBetweenResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Bitte wählen Sie beide Daten aus')
      return
    }

    try {
      const result = calculateDaysBetween(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Berechnen der Tage')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setStartDate((values.startDate as string) || '')
    setEndDate((values.endDate as string) || '')
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/kalender/tage-zwischen-daten')

  const examples = [
    {
      label: 'Beispiel: 1. Januar 2024 bis 31. Dezember 2024',
      values: { startDate: '2024-01-01', endDate: '2024-12-31' }
    },
    {
      label: 'Beispiel: 1. Januar 2023 bis 1. Januar 2024',
      values: { startDate: '2023-01-01', endDate: '2024-01-01' }
    }
  ]

  const faqItems = [
    {
      question: "Wie genau ist die Berechnung der Tage zwischen Daten?",
      answer: "Unser Rechner berechnet die genaue Anzahl der Tage zwischen zwei Daten, einschließlich Schaltjahren. Die Berechnung ist sehr präzise und berücksichtigt alle Kalendertage."
    },
    {
      question: "Werden Schaltjahre berücksichtigt?",
      answer: "Ja, der Rechner berücksichtigt automatisch Schaltjahre (29. Februar) und berechnet die korrekte Anzahl der Tage in jedem Jahr."
    },
    {
      question: "Kann ich auch Wochen und Monate sehen?",
      answer: "Ja, der Rechner zeigt Ihnen die Anzahl der Tage, Wochen, Monate und Jahre zwischen den beiden Daten an."
    },
    {
      question: "Welches Datumsformat sollte ich verwenden?",
      answer: "Verwenden Sie das Format JJJJ-MM-TT (z.B. 2024-01-15). Dies ist das internationale Standardformat und funktioniert am besten."
    }
  ]

  const structuredData = jsonLdCalculator({
    name: 'Tage zwischen Daten',
    description: 'Berechnen Sie die Anzahl der Tage zwischen zwei Daten',
    category: 'Kalender',
    url: '/de/kalender/tage-zwischen-daten'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorLayout
        title="Tage zwischen Daten"
        description="Berechnen Sie die Anzahl der Tage zwischen zwei Daten"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExample}
      >
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Tage zwischen Daten berechnen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Startdatum *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="JJJJ-MM-TT"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Enddatum *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="JJJJ-MM-TT"
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Tage berechnen
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Zeitraum zwischen den Daten</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Gesamttage:</span> {results.totalDays}
                          </div>
                          <div>
                            <span className="font-medium">Wochen:</span> {results.weeks}
                          </div>
                          <div>
                            <span className="font-medium">Monate:</span> {results.months}
                          </div>
                          <div>
                            <span className="font-medium">Jahre:</span> {results.years}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Startdatum:</span> {results.breakdown.startDate}</div>
                            <div><span className="font-medium">Enddatum:</span> {results.breakdown.endDate}</div>
                            {results.breakdown.isLeapYear && (
                              <div className="text-blue-600">
                                <span className="font-medium">Schaltjahr berücksichtigt</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wie funktioniert der Tage-Rechner?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Der Tage-Rechner berechnet die genaue Anzahl der Tage zwischen zwei Daten, 
                einschließlich Schaltjahren.
              </p>
              <p>
                <strong>Berechnung:</strong> Die Differenz wird in Tagen, Wochen, Monaten 
                und Jahren angezeigt.
              </p>
              <p>
                <strong>Schaltjahre:</strong> Jahre, die durch 4 teilbar sind, sind Schaltjahre 
                (außer wenn sie durch 100, aber nicht durch 400 teilbar sind).
              </p>
            </CardContent>
          </Card>
        </div>
      </CalculatorLayout>
    </>
  )
}
