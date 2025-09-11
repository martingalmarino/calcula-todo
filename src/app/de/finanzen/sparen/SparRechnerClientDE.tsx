"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Target, AlertCircle } from 'lucide-react'
import { calcularAhorroObjetivo } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function SparRechnerClientDE() {
  const [sparziel, setSparziel] = useState('')
  const [zinsrate, setZinsrate] = useState('')
  const [laufzeit, setLaufzeit] = useState('')
  const [resultado, setResultado] = useState<{
    sparziel: number
    zinsrate: number
    laufzeit: number
    monatlicheSparrate: number
    gesparteSumme: number
    zinsen: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const ziel = parseFloat(sparziel)
    const zins = parseFloat(zinsrate)
    const zeit = parseFloat(laufzeit)

    if (!sparziel || !zinsrate || !laufzeit) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    if (isNaN(ziel) || isNaN(zins) || isNaN(zeit)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein')
      return
    }

    if (ziel <= 0 || zins < 0 || zeit <= 0) {
      setError('Sparziel und Laufzeit müssen größer als 0 sein, Zinsrate darf nicht negativ sein')
      return
    }

    try {
      const result = calcularAhorroObjetivo(ziel, zins / 100, zeit)
      setResultado({
        sparziel: result.objetivo,
        zinsrate: result.tasaAnual,
        laufzeit: result.plazoAnos,
        monatlicheSparrate: result.ahorroMensual,
        gesparteSumme: result.totalAhorrado,
        zinsen: result.interesesGanados
      })
    } catch {
      setError('Fehler bei der Sparberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.sparziel) setSparziel(example.sparziel as string)
    if (example.zinsrate) setZinsrate(example.zinsrate as string)
    if (example.laufzeit) setLaufzeit(example.laufzeit as string)
  }

  const breadcrumbs = getBreadcrumbs('/de/finanzen/sparen')

  const examples = [
    { label: 'Notgroschen', values: { sparziel: '5000', zinsrate: '2.5', laufzeit: '2' } },
    { label: 'Urlaub', values: { sparziel: '3000', zinsrate: '1.8', laufzeit: '1' } },
    { label: 'Auto', values: { sparziel: '15000', zinsrate: '3.0', laufzeit: '3' } },
    { label: 'Eigenheim', values: { sparziel: '50000', zinsrate: '2.8', laufzeit: '5' } }
  ]

  const faqItems = [
    {
      question: 'Wie wird die monatliche Sparrate berechnet?',
      answer: 'Die monatliche Sparrate wird mit der Annuitätenformel berechnet, die berücksichtigt, dass Sie regelmäßig sparen und Zinsen auf Ihre Ersparnisse erhalten.'
    },
    {
      question: 'Was passiert, wenn ich mehr spare als berechnet?',
      answer: 'Wenn Sie mehr sparen als die berechnete Rate, erreichen Sie Ihr Ziel schneller oder haben am Ende mehr Geld als geplant. Zusätzliche Einzahlungen sind immer vorteilhaft.'
    },
    {
      question: 'Kann ich die Sparrate während der Laufzeit ändern?',
      answer: 'Ja, Sie können Ihre Sparrate jederzeit anpassen. Eine Erhöhung bringt Sie schneller zum Ziel, eine Reduzierung verlängert die Zeit oder reduziert das Endkapital.'
    },
    {
      question: 'Welche Anlageformen sind für das Sparen geeignet?',
      answer: 'Für kurzfristige Ziele eignen sich Tagesgeld oder Festgeld. Für langfristige Ziele können auch ETFs oder andere Wertpapiere in Betracht gezogen werden.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Spar-Rechner',
            description: 'Berechnen Sie, wie viel Sie monatlich sparen müssen, um Ihr Sparziel zu erreichen',
            url: '/de/finanzen/sparen/',
            category: 'Finanzen'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Spar-Rechner"
            description="Berechnen Sie, wie viel Sie monatlich sparen müssen, um Ihr Sparziel zu erreichen. Ideal für die Finanzplanung und Sparziele"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Spar-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Sparziel (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 10000"
                        value={sparziel}
                        onChange={(e) => setSparziel(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Zinsrate (% pro Jahr)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="z.B. 2.5"
                        value={zinsrate}
                        onChange={(e) => setZinsrate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Laufzeit (Jahre)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 5"
                        value={laufzeit}
                        onChange={(e) => setLaufzeit(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Sparrate berechnen
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
                        <CardTitle className="text-lg">Sparberechnung Ergebnis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.monatlicheSparrate.toFixed(2)} €
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Monatliche Sparrate
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Sparplan-Übersicht:</h4>
                          <p className="text-blue-800 text-sm">
                            Um {resultado.sparziel.toLocaleString()} € in {resultado.laufzeit} Jahren zu erreichen
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Sparziel:</span>
                            <span className="font-medium">{resultado.sparziel.toLocaleString()} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zinsrate:</span>
                            <span className="font-medium">{resultado.zinsrate.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Laufzeit:</span>
                            <span className="font-medium">{resultado.laufzeit} Jahre</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monatliche Sparrate:</span>
                            <span className="font-medium">{resultado.monatlicheSparrate.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gesparte Summe:</span>
                            <span className="font-medium">{resultado.gesparteSumme.toLocaleString()} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zinsen:</span>
                            <span className="font-medium text-green-600">{resultado.zinsen.toFixed(2)} €</span>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Spartipp:</h4>
                          <p className="text-green-700 text-sm">
                            Durch die Zinsen von {resultado.zinsrate.toFixed(2)}% sparen Sie {resultado.zinsen.toFixed(2)} € an eigenen Einzahlungen ein. 
                            Das entspricht {(resultado.zinsen / resultado.gesparteSumme * 100).toFixed(1)}% Ihrer Gesamteinzahlungen.
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
