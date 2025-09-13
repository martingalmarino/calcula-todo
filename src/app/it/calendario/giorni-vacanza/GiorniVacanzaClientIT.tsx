"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plane, AlertCircle } from 'lucide-react'
import { calculateVacationDays, type VacationDaysResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'

export default function GiorniVacanzaClientIT() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [includeWeekends, setIncludeWeekends] = useState(true)
  const [results, setResults] = useState<VacationDaysResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Per favore, seleziona entrambe le date')
      return
    }

    try {
      const result = calculateVacationDays(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo dei giorni di vacanza')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' },
    { label: 'Giorni di Vacanza', href: '/it/calendario/giorni-vacanza' }
  ]

  const examples = [
    {
      label: 'Esempio: Vacanze dal 1 al 15 agosto 2024',
      values: { startDate: '2024-08-01', endDate: '2024-08-15' }
    },
    {
      label: 'Esempio: Vacanze dal 20 dicembre 2024 al 5 gennaio 2025',
      values: { startDate: '2024-12-20', endDate: '2025-01-05' }
    }
  ]

  const faqItems = [
    {
      question: 'Come vengono calcolati i giorni di vacanza?',
      answer: 'Si calcola la differenza tra la data di inizio e fine, considerando se includere o escludere i weekend.'
    },
    {
      question: 'Posso escludere i weekend dal calcolo?',
      answer: 'Sì, puoi scegliere se includere o escludere i weekend dal conteggio dei giorni di vacanza.'
    },
    {
      question: 'Il calcolo include la data di inizio e fine?',
      answer: 'Sì, entrambe le date sono incluse nel calcolo dei giorni di vacanza.'
    },
    {
      question: 'Posso calcolare vacanze che attraversano anni diversi?',
      answer: 'Sì, la calcolatrice gestisce correttamente le vacanze che attraversano anni diversi.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Giorni di Vacanza - Calcolatrice Vacanze',
            description: 'Calcola i giorni di vacanza e ferie lavorative per pianificare le tue vacanze',
            url: '/it/calendario/giorni-vacanza/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Giorni di Vacanza - Calcolatrice Vacanze"
            description="Calcola i giorni di vacanza e ferie lavorative per pianificare le tue vacanze"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setStartDate(values.startDate as string)
              setEndDate(values.endDate as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Calcolatrice Giorni di Vacanza
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data di Inizio Vacanze
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data di Fine Vacanze
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeWeekends"
                    checked={includeWeekends}
                    onChange={(e) => setIncludeWeekends(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="includeWeekends" className="text-sm font-medium">
                    Includi weekend nel calcolo
                  </label>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Plane className="h-4 w-4 mr-2" />
                  Calcola Giorni di Vacanza
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
                      <CardTitle className="text-lg">Risultato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {results.totalDays}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          giorni di vacanza
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {results.workingDays}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Giorni Lavorativi
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600 mb-1">
                            {results.weekendDays}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Weekend
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Dettagli del Calcolo:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Data di inizio:</span>
                            <span className="font-medium">{results.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Data di fine:</span>
                            <span className="font-medium">{results.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Giorni totali:</span>
                            <span className="font-medium">{results.totalDays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Include weekend:</span>
                            <span className="font-medium">{includeWeekends ? 'Sì' : 'No'}</span>
                          </div>
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
    </div>
  )
}
