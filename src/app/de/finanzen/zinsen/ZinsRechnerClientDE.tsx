"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { calcularInteresSimple } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function ZinsRechnerClientDE() {
  const [kapital, setKapital] = useState('')
  const [zinsrate, setZinsrate] = useState('')
  const [zeitraum, setZeitraum] = useState('')
  const [zeitraumEinheit, setZeitraumEinheit] = useState('jahre')
  const [resultado, setResultado] = useState<{
    kapital: number
    zinsrate: number
    zeitraum: number
    zinsen: number
    gesamtbetrag: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const kap = parseFloat(kapital)
    const zins = parseFloat(zinsrate)
    const zeit = parseFloat(zeitraum)

    if (!kapital || !zinsrate || !zeitraum) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    if (isNaN(kap) || isNaN(zins) || isNaN(zeit)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein')
      return
    }

    if (kap <= 0 || zins < 0 || zeit <= 0) {
      setError('Kapital und Zeitraum müssen größer als 0 sein, Zinsrate darf nicht negativ sein')
      return
    }

    try {
      // Konvertiere Zeitraum zu Jahren
      let zeitraumInJahren = zeit
      if (zeitraumEinheit === 'monate') {
        zeitraumInJahren = zeit / 12
      } else if (zeitraumEinheit === 'tage') {
        zeitraumInJahren = zeit / 365
      }

      const result = calcularInteresSimple(kap, zins / 100, zeitraumInJahren)
      setResultado({
        kapital: result.capital,
        zinsrate: result.tasa,
        zeitraum: zeitraumInJahren,
        zinsen: result.interes,
        gesamtbetrag: result.montoTotal
      })
    } catch {
      setError('Fehler bei der Zinsberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.kapital) setKapital(example.kapital as string)
    if (example.zinsrate) setZinsrate(example.zinsrate as string)
    if (example.zeitraum) setZeitraum(example.zeitraum as string)
    if (example.zeitraumEinheit) setZeitraumEinheit(example.zeitraumEinheit as string)
  }

  const breadcrumbs = getBreadcrumbs('/de/finanzen/zinsen')

  const examples = [
    { label: 'Sparbuch', values: { kapital: '1000', zinsrate: '2.5', zeitraum: '1', zeitraumEinheit: 'jahre' } },
    { label: 'Kurzzeitkredit', values: { kapital: '5000', zinsrate: '8', zeitraum: '6', zeitraumEinheit: 'monate' } },
    { label: 'Festgeld', values: { kapital: '10000', zinsrate: '3.2', zeitraum: '2', zeitraumEinheit: 'jahre' } },
    { label: 'Tagesgeld', values: { kapital: '2500', zinsrate: '1.8', zeitraum: '90', zeitraumEinheit: 'tage' } }
  ]

  const faqItems = [
    {
      question: 'Was sind einfache Zinsen?',
      answer: 'Einfache Zinsen werden nur auf das ursprüngliche Kapital berechnet, ohne die aufgelaufenen Zinsen aus vorherigen Perioden zu berücksichtigen. Sie sind ideal für kurzfristige Anlagen und Kredite.'
    },
    {
      question: 'Wie unterscheiden sich einfache von zusammengesetzten Zinsen?',
      answer: 'Einfache Zinsen werden nur auf das ursprüngliche Kapital berechnet, während zusammengesetzte Zinsen auch auf die bereits aufgelaufenen Zinsen berechnet werden. Einfache Zinsen sind einfacher zu berechnen.'
    },
    {
      question: 'Welche Zeiteinheiten werden unterstützt?',
      answer: 'Der Rechner unterstützt Jahre, Monate und Tage. Die Berechnung erfolgt automatisch in Jahren, wobei Monate durch 12 und Tage durch 365 geteilt werden.'
    },
    {
      question: 'Ist der Rechner für alle Arten von Anlagen geeignet?',
      answer: 'Ja, der Rechner kann für Sparbücher, Festgeld, Tagesgeld, kurzfristige Kredite und andere Anlagen mit einfachen Zinsen verwendet werden.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Zins-Rechner',
            description: 'Berechnen Sie einfache Zinsen für Kredite und Investitionen',
            url: '/de/finanzen/zinsen/',
            category: 'Finanzen'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Zins-Rechner"
            description="Berechnen Sie einfache Zinsen für Kredite und Investitionen. Ideal für Sparbücher, Festgeld und kurzfristige Kredite"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Zins-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Kapital (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="z.B. 1000"
                        value={kapital}
                        onChange={(e) => setKapital(e.target.value)}
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
                        Zeitraum
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="z.B. 1"
                          value={zeitraum}
                          onChange={(e) => setZeitraum(e.target.value)}
                          className="flex-1"
                        />
                        <Select value={zeitraumEinheit} onValueChange={setZeitraumEinheit}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jahre">Jahre</SelectItem>
                            <SelectItem value="monate">Monate</SelectItem>
                            <SelectItem value="tage">Tage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Zinsen berechnen
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
                        <CardTitle className="text-lg">Zinsberechnung Ergebnis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.zinsen.toFixed(2)} €
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Zinsen
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Berechnungsdetails:</h4>
                          <p className="text-blue-800 text-sm">
                            {resultado.kapital.toFixed(2)} € × {resultado.zinsrate.toFixed(2)}% × {resultado.zeitraum.toFixed(2)} Jahre = {resultado.zinsen.toFixed(2)} €
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Ursprüngliches Kapital:</span>
                            <span className="font-medium">{resultado.kapital.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zinsrate:</span>
                            <span className="font-medium">{resultado.zinsrate.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zeitraum:</span>
                            <span className="font-medium">{resultado.zeitraum.toFixed(2)} Jahre</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zinsen:</span>
                            <span className="font-medium">{resultado.zinsen.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gesamtbetrag:</span>
                            <span className="font-medium">{resultado.gesamtbetrag.toFixed(2)} €</span>
                          </div>
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
