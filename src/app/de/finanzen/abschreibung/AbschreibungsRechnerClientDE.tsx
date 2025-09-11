"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Car, AlertCircle } from 'lucide-react'
import { calcularDepreciacionVehiculo } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AbschreibungsRechnerClientDE() {
  const [neuwert, setNeuwert] = useState('')
  const [restwert, setRestwert] = useState('')
  const [nutzungsdauer, setNutzungsdauer] = useState('')
  const [resultado, setResultado] = useState<{
    neuwert: number
    restwert: number
    nutzungsdauer: number
    jaehrlicheAbschreibung: number
    monatlicheAbschreibung: number
    aktuellerWert: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const neu = parseFloat(neuwert)
    const rest = parseFloat(restwert)
    const dauer = parseFloat(nutzungsdauer)

    if (!neuwert || !restwert || !nutzungsdauer) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    if (isNaN(neu) || isNaN(rest) || isNaN(dauer)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein')
      return
    }

    if (neu <= 0 || rest < 0 || dauer <= 0) {
      setError('Neuwert und Nutzungsdauer müssen größer als 0 sein, Restwert darf nicht negativ sein')
      return
    }

    if (neu <= rest) {
      setError('Der Neuwert muss größer als der Restwert sein')
      return
    }

    try {
      const result = calcularDepreciacionVehiculo(neu, rest, dauer)
      setResultado({
        neuwert: result.valorInicial,
        restwert: result.valorResidual,
        nutzungsdauer: result.vidaUtil,
        jaehrlicheAbschreibung: result.depreciacionAnual,
        monatlicheAbschreibung: result.depreciacionMensual,
        aktuellerWert: result.valorActual
      })
    } catch {
      setError('Fehler bei der Abschreibungsberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.neuwert) setNeuwert(example.neuwert as string)
    if (example.restwert) setRestwert(example.restwert as string)
    if (example.nutzungsdauer) setNutzungsdauer(example.nutzungsdauer as string)
  }

  const breadcrumbs = getBreadcrumbs('/de/finanzen/abschreibung')

  const examples = [
    { label: 'Kompaktwagen', values: { neuwert: '25000', restwert: '5000', nutzungsdauer: '8' } },
    { label: 'Mittelklasse', values: { neuwert: '35000', restwert: '8000', nutzungsdauer: '10' } },
    { label: 'Oberklasse', values: { neuwert: '60000', restwert: '15000', nutzungsdauer: '12' } },
    { label: 'SUV', values: { neuwert: '45000', restwert: '10000', nutzungsdauer: '9' } }
  ]

  const faqItems = [
    {
      question: 'Was ist lineare Abschreibung?',
      answer: 'Die lineare Abschreibung verteilt den Wertverlust gleichmäßig über die Nutzungsdauer. Jedes Jahr wird der gleiche Betrag abgeschrieben.'
    },
    {
      question: 'Wie wird der Restwert bestimmt?',
      answer: 'Der Restwert ist der geschätzte Wert des Fahrzeugs am Ende der Nutzungsdauer. Er hängt von Marktlage, Zustand und Nachfrage ab.'
    },
    {
      question: 'Welche Nutzungsdauer ist realistisch?',
      answer: 'Die Nutzungsdauer hängt vom Fahrzeugtyp ab. Kompaktwagen: 8-10 Jahre, Mittelklasse: 10-12 Jahre, Oberklasse: 12-15 Jahre.'
    },
    {
      question: 'Kann ich die Abschreibung steuerlich geltend machen?',
      answer: 'Für gewerbliche Nutzung können Sie die Abschreibung steuerlich geltend machen. Für private Nutzung gelten andere Regeln. Fragen Sie einen Steuerberater.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Abschreibungs-Rechner',
            description: 'Berechnen Sie den Wertverlust Ihres Fahrzeugs über die Zeit',
            url: '/de/finanzen/abschreibung/',
            category: 'Finanzen'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Abschreibungs-Rechner"
            description="Berechnen Sie den Wertverlust Ihres Fahrzeugs über die Zeit mit der linearen Abschreibungsmethode. Ideal für die Fahrzeugbewertung"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Abschreibungs-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Neuwert (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 30000"
                        value={neuwert}
                        onChange={(e) => setNeuwert(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Restwert (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 8000"
                        value={restwert}
                        onChange={(e) => setRestwert(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nutzungsdauer (Jahre)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 10"
                        value={nutzungsdauer}
                        onChange={(e) => setNutzungsdauer(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Abschreibung berechnen
                  </Button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {resultado && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Abschreibungsberechnung Ergebnis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.jaehrlicheAbschreibung.toFixed(2)} €
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Jährliche Abschreibung
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Abschreibungsdetails:</h4>
                          <p className="text-blue-800 text-sm">
                            ({resultado.neuwert.toLocaleString()} € - {resultado.restwert.toLocaleString()} €) ÷ {resultado.nutzungsdauer} Jahre = {resultado.jaehrlicheAbschreibung.toFixed(2)} €/Jahr
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Neuwert:</span>
                            <span className="font-medium">{resultado.neuwert.toLocaleString()} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Restwert:</span>
                            <span className="font-medium">{resultado.restwert.toLocaleString()} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nutzungsdauer:</span>
                            <span className="font-medium">{resultado.nutzungsdauer} Jahre</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Jährliche Abschreibung:</span>
                            <span className="font-medium">{resultado.jaehrlicheAbschreibung.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monatliche Abschreibung:</span>
                            <span className="font-medium">{resultado.monatlicheAbschreibung.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wertverlust nach 1 Jahr:</span>
                            <span className="font-medium text-red-600">{(resultado.neuwert - resultado.aktuellerWert).toFixed(2)} €</span>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <h4 className="font-semibold text-amber-800 mb-2">Hinweis:</h4>
                          <p className="text-amber-700 text-sm">
                            Dies ist eine vereinfachte Berechnung. Der tatsächliche Wertverlust hängt von vielen Faktoren ab wie Marktlage, 
                            Fahrzeugzustand, Kilometerstand und Nachfrage.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
