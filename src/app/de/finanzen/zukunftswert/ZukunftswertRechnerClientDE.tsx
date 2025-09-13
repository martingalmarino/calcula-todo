"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DollarSign, AlertCircle } from 'lucide-react'
import { calcularValorFuturo, calcularValorPresente } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function ZukunftswertRechnerClientDE() {
  const [betrag, setBetrag] = useState('')
  const [zinsrate, setZinsrate] = useState('')
  const [zeitraum, setZeitraum] = useState('')
  const [berechnungstyp, setBerechnungstyp] = useState('zukunftswert')
  const [resultado, setResultado] = useState<{
    betrag: number
    zinsrate: number
    zeitraum: number
    ergebnis: number
    typ: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const bet = parseFloat(betrag)
    const zins = parseFloat(zinsrate)
    const zeit = parseFloat(zeitraum)

    if (!betrag || !zinsrate || !zeitraum) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    if (isNaN(bet) || isNaN(zins) || isNaN(zeit)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein')
      return
    }

    if (bet <= 0 || zins < 0 || zeit <= 0) {
      setError('Betrag und Zeitraum müssen größer als 0 sein, Zinsrate darf nicht negativ sein')
      return
    }

    try {
      let ergebnis: number
      let typ: string

      if (berechnungstyp === 'zukunftswert') {
        ergebnis = calcularValorFuturo(bet, zins / 100, zeit)
        typ = 'Zukunftswert'
      } else {
        ergebnis = calcularValorPresente(bet, zins / 100, zeit)
        typ = 'Barwert'
      }

      setResultado({
        betrag: bet,
        zinsrate: zins,
        zeitraum: zeit,
        ergebnis: ergebnis,
        typ: typ
      })
    } catch {
      setError('Fehler bei der Berechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.betrag) setBetrag(example.betrag as string)
    if (example.zinsrate) setZinsrate(example.zinsrate as string)
    if (example.zeitraum) setZeitraum(example.zeitraum as string)
    if (example.berechnungstyp) setBerechnungstyp(example.berechnungstyp as string)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/finanzen/zukunftswert')

  const examples = [
    { label: 'Zukunftswert Investition', values: { betrag: '10000', zinsrate: '5', zeitraum: '10', berechnungstyp: 'zukunftswert' } },
    { label: 'Barwert zukünftiger Summe', values: { betrag: '20000', zinsrate: '4', zeitraum: '5', berechnungstyp: 'barwert' } },
    { label: 'Zukunftswert Sparen', values: { betrag: '5000', zinsrate: '3', zeitraum: '15', berechnungstyp: 'zukunftswert' } },
    { label: 'Barwert Rente', values: { betrag: '100000', zinsrate: '6', zeitraum: '20', berechnungstyp: 'barwert' } }
  ]

  const faqItems = [
    {
      question: 'Was ist der Zukunftswert?',
      answer: 'Der Zukunftswert ist der Wert, den eine heutige Summe in der Zukunft haben wird, wenn sie zu einem bestimmten Zinssatz angelegt wird.'
    },
    {
      question: 'Was ist der Barwert?',
      answer: 'Der Barwert ist der heutige Wert einer zukünftigen Summe, abgezinst mit einem bestimmten Zinssatz. Er zeigt, wie viel eine zukünftige Summe heute wert ist.'
    },
    {
      question: 'Wie wird der Zeitwert des Geldes berücksichtigt?',
      answer: 'Der Zeitwert des Geldes berücksichtigt, dass Geld heute mehr wert ist als in der Zukunft, da es investiert und verzinst werden kann.'
    },
    {
      question: 'Welche Anwendungen gibt es für diese Berechnungen?',
      answer: 'Diese Berechnungen werden für Investitionsentscheidungen, Rentenplanung, Kreditvergleiche und allgemeine Finanzplanung verwendet.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Zukunftswert-Rechner',
            description: 'Berechnen Sie den zukünftigen Wert von Investitionen und den Barwert zukünftiger Summen',
            url: '/de/finanzen/zukunftswert/',
            category: 'Finanzen'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Zukunftswert-Rechner"
            description="Berechnen Sie den zukünftigen Wert von Investitionen und den Barwert zukünftiger Summen. Ideal für Investitionsentscheidungen und Finanzplanung"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Zukunftswert-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Berechnungstyp
                      </label>
                      <Select value={berechnungstyp} onValueChange={setBerechnungstyp}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zukunftswert">Zukunftswert berechnen</SelectItem>
                          <SelectItem value="barwert">Barwert berechnen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {berechnungstyp === 'zukunftswert' ? 'Heutiger Betrag (€)' : 'Zukünftiger Betrag (€)'}
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 10000"
                        value={betrag}
                        onChange={(e) => setBetrag(e.target.value)}
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
                        placeholder="z.B. 5"
                        value={zinsrate}
                        onChange={(e) => setZinsrate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Zeitraum (Jahre)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 10"
                        value={zeitraum}
                        onChange={(e) => setZeitraum(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    {berechnungstyp === 'zukunftswert' ? 'Zukunftswert berechnen' : 'Barwert berechnen'}
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
                        <CardTitle className="text-lg">Berechnungsergebnis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.ergebnis.toFixed(2)} €
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            {resultado.typ}
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Berechnungsdetails:</h4>
                          <p className="text-blue-800 text-sm">
                            {resultado.typ === 'Zukunftswert' 
                              ? `${resultado.betrag.toFixed(2)} € × (1 + ${resultado.zinsrate.toFixed(2)}%)^${resultado.zeitraum} = ${resultado.ergebnis.toFixed(2)} €`
                              : `${resultado.betrag.toFixed(2)} € ÷ (1 + ${resultado.zinsrate.toFixed(2)}%)^${resultado.zeitraum} = ${resultado.ergebnis.toFixed(2)} €`
                            }
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>{resultado.typ === 'Zukunftswert' ? 'Heutiger Betrag:' : 'Zukünftiger Betrag:'}</span>
                            <span className="font-medium">{resultado.betrag.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zinsrate:</span>
                            <span className="font-medium">{resultado.zinsrate.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zeitraum:</span>
                            <span className="font-medium">{resultado.zeitraum} Jahre</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{resultado.typ}:</span>
                            <span className="font-medium">{resultado.ergebnis.toFixed(2)} €</span>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Interpretation:</h4>
                          <p className="text-green-700 text-sm">
                            {resultado.typ === 'Zukunftswert' 
                              ? `Ihre Investition von ${resultado.betrag.toFixed(2)} € wird in ${resultado.zeitraum} Jahren bei ${resultado.zinsrate.toFixed(2)}% Zinsen ${resultado.ergebnis.toFixed(2)} € wert sein.`
                              : `Eine zukünftige Summe von ${resultado.betrag.toFixed(2)} € in ${resultado.zeitraum} Jahren ist heute bei ${resultado.zinsrate.toFixed(2)}% Zinsen ${resultado.ergebnis.toFixed(2)} € wert.`
                            }
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
