"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Home, AlertCircle } from 'lucide-react'
import { calcularHipoteca } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function DarlehenRechnerClientDE() {
  const [darlehenssumme, setDarlehenssumme] = useState('')
  const [zinsrate, setZinsrate] = useState('')
  const [laufzeit, setLaufzeit] = useState('')
  const [resultado, setResultado] = useState<{
    darlehenssumme: number
    zinsrate: number
    laufzeit: number
    monatlicheRate: number
    gesamtbetrag: number
    gesamtzinsen: number
    tilgungsplan: Array<{
      monat: number
      rate: number
      kapital: number
      zinsen: number
      restschuld: number
    }>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const summe = parseFloat(darlehenssumme)
    const zins = parseFloat(zinsrate)
    const zeit = parseFloat(laufzeit)

    if (!darlehenssumme || !zinsrate || !laufzeit) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    if (isNaN(summe) || isNaN(zins) || isNaN(zeit)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein')
      return
    }

    if (summe <= 0 || zins < 0 || zeit <= 0) {
      setError('Darlehenssumme und Laufzeit müssen größer als 0 sein, Zinsrate darf nicht negativ sein')
      return
    }

    try {
      const result = calcularHipoteca(summe, zins / 100, zeit)
      setResultado({
        darlehenssumme: result.monto,
        zinsrate: result.tasaAnual,
        laufzeit: result.plazoAnos,
        monatlicheRate: result.cuotaMensual,
        gesamtbetrag: result.totalPagos,
        gesamtzinsen: result.totalIntereses,
        tilgungsplan: result.cronograma.map(item => ({
          monat: item.mes,
          rate: item.cuota,
          kapital: item.capital,
          zinsen: item.interes,
          restschuld: item.saldo
        }))
      })
    } catch {
      setError('Fehler bei der Darlehensberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.darlehenssumme) setDarlehenssumme(example.darlehenssumme as string)
    if (example.zinsrate) setZinsrate(example.zinsrate as string)
    if (example.laufzeit) setLaufzeit(example.laufzeit as string)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/finanzen/darlehen')

  const examples = [
    { label: 'Einfamilienhaus', values: { darlehenssumme: '300000', zinsrate: '3.5', laufzeit: '30' } },
    { label: 'Eigentumswohnung', values: { darlehenssumme: '200000', zinsrate: '4.2', laufzeit: '25' } },
    { label: 'Baufinanzierung', values: { darlehenssumme: '400000', zinsrate: '3.8', laufzeit: '35' } },
    { label: 'Modernisierung', values: { darlehenssumme: '50000', zinsrate: '5.5', laufzeit: '10' } }
  ]

  const faqItems = [
    {
      question: 'Wie wird die monatliche Rate berechnet?',
      answer: 'Die monatliche Rate wird mit der Annuitätenformel berechnet, die eine konstante Rate über die gesamte Laufzeit gewährleistet. Sie besteht aus einem Kapital- und einem Zinsanteil.'
    },
    {
      question: 'Was ist ein Tilgungsplan?',
      answer: 'Ein Tilgungsplan zeigt die Aufschlüsselung jeder Rate in Kapital und Zinsen sowie die verbleibende Restschuld nach jeder Zahlung. Dies hilft bei der Finanzplanung.'
    },
    {
      question: 'Kann ich Sondertilgungen berücksichtigen?',
      answer: 'Dieser Rechner zeigt die Standard-Tilgung. Sondertilgungen können die Laufzeit verkürzen und Zinsen sparen, werden aber hier nicht berücksichtigt.'
    },
    {
      question: 'Welche Nebenkosten sind nicht enthalten?',
      answer: 'Nebenkosten wie Notar, Grundbuch, Grunderwerbsteuer, Maklerprovision und Versicherungen sind nicht in der Berechnung enthalten.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Darlehen-Rechner',
            description: 'Berechnen Sie monatliche Raten und Tilgungsplan für Ihr Darlehen',
            url: '/de/finanzen/darlehen/',
            category: 'Finanzen'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Darlehen-Rechner"
            description="Berechnen Sie monatliche Raten, Gesamtzinsen und Tilgungsplan für Ihr Darlehen. Ideal für Hypotheken und Immobilienkredite"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Darlehen-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Darlehenssumme (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 300000"
                        value={darlehenssumme}
                        onChange={(e) => setDarlehenssumme(e.target.value)}
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
                        placeholder="z.B. 3.5"
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
                        placeholder="z.B. 30"
                        value={laufzeit}
                        onChange={(e) => setLaufzeit(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Darlehen berechnen
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
                        <CardTitle className="text-lg">Darlehensberechnung Ergebnis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.monatlicheRate.toFixed(2)} €
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Monatliche Rate
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Übersicht:</h4>
                          <p className="text-blue-800 text-sm">
                            Bei einer Darlehenssumme von {resultado.darlehenssumme.toLocaleString()} € und einer Laufzeit von {resultado.laufzeit} Jahren
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Darlehenssumme:</span>
                            <span className="font-medium">{resultado.darlehenssumme.toLocaleString()} €</span>
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
                            <span>Monatliche Rate:</span>
                            <span className="font-medium">{resultado.monatlicheRate.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gesamtzinsen:</span>
                            <span className="font-medium">{resultado.gesamtzinsen.toLocaleString()} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gesamtbetrag:</span>
                            <span className="font-medium">{resultado.gesamtbetrag.toLocaleString()} €</span>
                          </div>
                        </div>

                        {resultado.tilgungsplan.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-800 mb-3">Tilgungsplan (erste 12 Monate)</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse border border-gray-300">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-2 py-1">Monat</th>
                                    <th className="border border-gray-300 px-2 py-1">Rate</th>
                                    <th className="border border-gray-300 px-2 py-1">Kapital</th>
                                    <th className="border border-gray-300 px-2 py-1">Zinsen</th>
                                    <th className="border border-gray-300 px-2 py-1">Restschuld</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {resultado.tilgungsplan.map((monat) => (
                                    <tr key={monat.monat}>
                                      <td className="border border-gray-300 px-2 py-1">{monat.monat}</td>
                                      <td className="border border-gray-300 px-2 py-1">{monat.rate.toFixed(2)} €</td>
                                      <td className="border border-gray-300 px-2 py-1">{monat.kapital.toFixed(2)} €</td>
                                      <td className="border border-gray-300 px-2 py-1">{monat.zinsen.toFixed(2)} €</td>
                                      <td className="border border-gray-300 px-2 py-1">{monat.restschuld.toLocaleString()} €</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
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
