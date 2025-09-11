"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { calcularIPC } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function InflationsRechnerClientDE() {
  const [betrag, setBetrag] = useState('')
  const [vpiAnfang, setVpiAnfang] = useState('')
  const [vpiEnde, setVpiEnde] = useState('')
  const [resultado, setResultado] = useState<{
    betrag: number
    vpiAnfang: number
    vpiEnde: number
    inflation: number
    kaufkraft: number
    kaufkraftverlust: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const bet = parseFloat(betrag)
    const vpiA = parseFloat(vpiAnfang)
    const vpiE = parseFloat(vpiEnde)

    if (!betrag || !vpiAnfang || !vpiEnde) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    if (isNaN(bet) || isNaN(vpiA) || isNaN(vpiE)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein')
      return
    }

    if (bet <= 0 || vpiA <= 0 || vpiE <= 0) {
      setError('Alle Werte müssen größer als 0 sein')
      return
    }

    try {
      const result = calcularIPC(bet, vpiA, vpiE)
      setResultado({
        betrag: result.monto,
        vpiAnfang: result.ipcInicial,
        vpiEnde: result.ipcFinal,
        inflation: result.variacionIPC,
        kaufkraft: result.poderAdquisitivo,
        kaufkraftverlust: result.perdidaPoderAdquisitivo
      })
    } catch {
      setError('Fehler bei der Inflationsberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.betrag) setBetrag(example.betrag as string)
    if (example.vpiAnfang) setVpiAnfang(example.vpiAnfang as string)
    if (example.vpiEnde) setVpiEnde(example.vpiEnde as string)
  }

  const breadcrumbs = getBreadcrumbs('/de/finanzen/inflation')

  const examples = [
    { label: '10 Jahre Inflation', values: { betrag: '1000', vpiAnfang: '100', vpiEnde: '120' } },
    { label: '5 Jahre Inflation', values: { betrag: '5000', vpiAnfang: '105', vpiEnde: '115' } },
    { label: '20 Jahre Inflation', values: { betrag: '10000', vpiAnfang: '80', vpiEnde: '120' } },
    { label: '2 Jahre Inflation', values: { betrag: '2000', vpiAnfang: '100', vpiEnde: '106' } }
  ]

  const faqItems = [
    {
      question: 'Was ist der Verbraucherpreisindex (VPI)?',
      answer: 'Der VPI misst die durchschnittliche Preisänderung für Waren und Dienstleistungen, die von privaten Haushalten gekauft werden. Er ist ein wichtiger Indikator für die Inflation.'
    },
    {
      question: 'Wie wird die Kaufkraft berechnet?',
      answer: 'Die Kaufkraft wird berechnet, indem der ursprüngliche Betrag mit dem Verhältnis des VPI am Anfang zum VPI am Ende multipliziert wird. Dies zeigt, was der Betrag heute wert wäre.'
    },
    {
      question: 'Was bedeutet Kaufkraftverlust?',
      answer: 'Der Kaufkraftverlust ist die Differenz zwischen dem ursprünglichen Betrag und der aktuellen Kaufkraft. Er zeigt, wie viel Kaufkraft durch die Inflation verloren gegangen ist.'
    },
    {
      question: 'Wo finde ich aktuelle VPI-Werte?',
      answer: 'Aktuelle VPI-Werte finden Sie beim Statistischen Bundesamt oder der Europäischen Zentralbank. Diese werden monatlich veröffentlicht.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Inflations-Rechner',
            description: 'Berechnen Sie die Auswirkungen der Inflation auf Ihre Kaufkraft',
            url: '/de/finanzen/inflation/',
            category: 'Finanzen'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Inflations-Rechner"
            description="Berechnen Sie die Auswirkungen der Inflation auf Ihre Kaufkraft. Ideal für die Bewertung von Geldwerten über die Zeit"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Inflations-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Betrag (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 1000"
                        value={betrag}
                        onChange={(e) => setBetrag(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        VPI Anfang
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="z.B. 100"
                        value={vpiAnfang}
                        onChange={(e) => setVpiAnfang(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        VPI Ende
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="z.B. 120"
                        value={vpiEnde}
                        onChange={(e) => setVpiEnde(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Inflation berechnen
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
                        <CardTitle className="text-lg">Inflationsberechnung Ergebnis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.inflation.toFixed(2)}%
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Inflationsrate
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Kaufkraft-Analyse:</h4>
                          <p className="text-blue-800 text-sm">
                            {resultado.betrag.toFixed(2)} € von {resultado.vpiAnfang} VPI zu {resultado.vpiEnde} VPI
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Ursprünglicher Betrag:</span>
                            <span className="font-medium">{resultado.betrag.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VPI Anfang:</span>
                            <span className="font-medium">{resultado.vpiAnfang}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VPI Ende:</span>
                            <span className="font-medium">{resultado.vpiEnde}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Inflationsrate:</span>
                            <span className="font-medium">{resultado.inflation.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Aktuelle Kaufkraft:</span>
                            <span className="font-medium">{resultado.kaufkraft.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kaufkraftverlust:</span>
                            <span className="font-medium text-red-600">{resultado.kaufkraftverlust.toFixed(2)} €</span>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <h4 className="font-semibold text-amber-800 mb-2">Interpretation:</h4>
                          <p className="text-amber-700 text-sm">
                            {resultado.inflation > 0 
                              ? `Durch die Inflation von ${resultado.inflation.toFixed(2)}% hat Ihr Geld ${resultado.kaufkraftverlust.toFixed(2)} € an Kaufkraft verloren.`
                              : `Durch die Deflation von ${Math.abs(resultado.inflation).toFixed(2)}% hat Ihr Geld an Kaufkraft gewonnen.`
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
