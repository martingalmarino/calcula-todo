"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { User, Calculator, Info } from 'lucide-react'
import { calculateAge, type AgeResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AlterRechnerClientDE() {
  const [birthDate, setBirthDate] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [results, setResults] = useState<AgeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!birthDate) {
      setError('Bitte wählen Sie Ihr Geburtsdatum aus')
      return
    }

    try {
      const result = calculateAge(birthDate, currentDate || undefined)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Berechnen des Alters')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setBirthDate((values.birthDate as string) || '')
    setCurrentDate((values.currentDate as string) || '')
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/kalender/alter-rechner')

  const examples = [
    {
      label: 'Beispiel: Geboren am 1. Januar 1990',
      values: { birthDate: '1990-01-01' }
    },
    {
      label: 'Beispiel: Geboren am 15. März 1985',
      values: { birthDate: '1985-03-15' }
    }
  ]

  const faqItems = [
    {
      question: "Wie genau ist der Alter-Rechner?",
      answer: "Unser Rechner berücksichtigt Schaltjahre und berechnet Ihr genaues Alter in Jahren, Monaten und Tagen. Die Berechnung ist sehr präzise und berücksichtigt alle Kalendertage."
    },
    {
      question: "Kann ich mein Alter zu einem bestimmten Datum berechnen?",
      answer: "Ja, Sie können optional ein aktuelles Datum eingeben, um Ihr Alter zu diesem Zeitpunkt zu berechnen. Ohne Eingabe wird das heutige Datum verwendet."
    },
    {
      question: "Wie werden Schaltjahre berücksichtigt?",
      answer: "Der Rechner berücksichtigt automatisch Schaltjahre (29. Februar) und berechnet die korrekte Anzahl der Tage in jedem Jahr."
    },
    {
      question: "Welches Datumsformat sollte ich verwenden?",
      answer: "Verwenden Sie das Format JJJJ-MM-TT (z.B. 1990-01-15). Dies ist das internationale Standardformat und funktioniert am besten."
    }
  ]

  const structuredData = jsonLdCalculator({
    name: 'Alter-Rechner',
    description: 'Berechnen Sie Ihr genaues Alter in Jahren, Monaten und Tagen',
    category: 'Kalender',
    url: '/de/kalender/alter-rechner'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorLayout
        title="Alter-Rechner"
        description="Berechnen Sie Ihr genaues Alter in Jahren, Monaten und Tagen"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExample}
      >
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Alter berechnen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Geburtsdatum *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="JJJJ-MM-TT"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentDate">Aktuelles Datum (optional)</Label>
                  <Input
                    id="currentDate"
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    placeholder="JJJJ-MM-TT"
                  />
                  <p className="text-sm text-muted-foreground">
                    Lassen Sie dieses Feld leer, um das heutige Datum zu verwenden
                  </p>
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Alter berechnen
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
                    <AlertTitle>Ihr Alter</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Jahre:</span> {results.years}
                          </div>
                          <div>
                            <span className="font-medium">Monate:</span> {results.months}
                          </div>
                          <div>
                            <span className="font-medium">Tage:</span> {results.days}
                          </div>
                          <div>
                            <span className="font-medium">Gesamttage:</span> {results.totalDays}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Geburtsdatum:</span> {results.breakdown.birthDate}</div>
                            <div><span className="font-medium">Aktuelles Datum:</span> {results.breakdown.currentDate}</div>
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
              <CardTitle>Wie funktioniert der Alter-Rechner?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Der Alter-Rechner berechnet Ihr genaues Alter basierend auf Ihrem Geburtsdatum 
                und einem optionalen aktuellen Datum.
              </p>
              <p>
                <strong>Berechnung:</strong> Das Alter wird in Jahren, Monaten und Tagen angezeigt, 
                wobei Schaltjahre automatisch berücksichtigt werden.
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
