"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Plane, Calculator, Info } from 'lucide-react'
import { calculateVacationDays, type VacationDaysResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function UrlaubstageClientDE() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<VacationDaysResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Bitte wählen Sie beide Daten aus')
      return
    }

    try {
      const result = calculateVacationDays(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Berechnen der Urlaubstage')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setStartDate((values.startDate as string) || '')
    setEndDate((values.endDate as string) || '')
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/kalender/urlaubstage')

  const examples = [
    {
      label: 'Beispiel: 1. Juli 2024 bis 15. Juli 2024',
      values: { startDate: '2024-07-01', endDate: '2024-07-15' }
    },
    {
      label: 'Beispiel: 1. Dezember 2024 bis 31. Dezember 2024',
      values: { startDate: '2024-12-01', endDate: '2024-12-31' }
    }
  ]

  const faqItems = [
    {
      question: "Wie werden Arbeitstage und Wochenenden berechnet?",
      answer: "Der Rechner unterscheidet zwischen Arbeitstagen (Montag bis Freitag) und Wochenenden (Samstag und Sonntag). Dies hilft bei der Urlaubsplanung."
    },
    {
      question: "Werden Feiertage berücksichtigt?",
      answer: "Derzeit berücksichtigt der Rechner nur Wochenenden. Feiertage können je nach Land und Region variieren und werden nicht automatisch berücksichtigt."
    },
    {
      question: "Kann ich auch längere Urlaubsperioden berechnen?",
      answer: "Ja, der Rechner funktioniert für beliebige Zeiträume, von wenigen Tagen bis zu mehreren Monaten."
    },
    {
      question: "Welches Datumsformat sollte ich verwenden?",
      answer: "Verwenden Sie das Format JJJJ-MM-TT (z.B. 2024-07-15). Dies ist das internationale Standardformat und funktioniert am besten."
    }
  ]

  const structuredData = jsonLdCalculator({
    name: 'Urlaubstage-Rechner',
    description: 'Berechnen Sie Ihre Urlaubstage und Arbeitstage',
    category: 'Kalender',
    url: '/de/kalender/urlaubstage'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorLayout
        title="Urlaubstage-Rechner"
        description="Berechnen Sie Ihre Urlaubstage und Arbeitstage"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExample}
      >
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Urlaubstage berechnen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Urlaubsbeginn *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="JJJJ-MM-TT"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Urlaubsende *</Label>
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
                Urlaubstage berechnen
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
                    <AlertTitle>Urlaubsübersicht</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Gesamttage:</span> {results.totalDays}
                          </div>
                          <div>
                            <span className="font-medium">Arbeitstage:</span> {results.workingDays}
                          </div>
                          <div>
                            <span className="font-medium">Wochenenden:</span> {results.weekendDays}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Urlaubsbeginn:</span> {results.startDate}</div>
                            <div><span className="font-medium">Urlaubsende:</span> {results.endDate}</div>
                            <div><span className="font-medium">Starttag:</span> {results.breakdown.startDayOfWeek}</div>
                            <div><span className="font-medium">Endtag:</span> {results.breakdown.endDayOfWeek}</div>
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
              <CardTitle>Wie funktioniert der Urlaubstage-Rechner?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Der Urlaubstage-Rechner berechnet die Anzahl der Arbeitstage und Wochenenden 
                in Ihrem Urlaubszeitraum.
              </p>
              <p>
                <strong>Arbeitstage:</strong> Montag bis Freitag (5 Tage pro Woche)
              </p>
              <p>
                <strong>Wochenenden:</strong> Samstag und Sonntag
              </p>
              <p>
                <strong>Hinweis:</strong> Feiertage werden nicht automatisch berücksichtigt, 
                da diese je nach Land und Region variieren können.
              </p>
            </CardContent>
          </Card>
        </div>
      </CalculatorLayout>
    </>
  )
}
