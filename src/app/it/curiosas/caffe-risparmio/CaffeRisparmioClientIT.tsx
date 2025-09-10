"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Coffee, AlertCircle } from 'lucide-react'
import { calcularAhorroCafe } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function CaffeRisparmioClientIT() {
  const [precioCafe, setPrecioCafe] = useState('')
  const [años, setAños] = useState('')
  const [tasaInteres, setTasaInteres] = useState('5')
  const [resultado, setResultado] = useState<{
    precioCafe: number
    años: number
    tasaInteres: number
    ahorroDiario: number
    ahorroAnual: number
    ahorroTotal: number
    ahorroSinInteres: number
    gananciaInteres: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const precio = parseFloat(precioCafe)
    const anni = parseInt(años)
    const tasa = parseFloat(tasaInteres)

    if (!precioCafe || !años || !tasaInteres) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(precio) || isNaN(anni) || isNaN(tasa)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (precio <= 0 || anni <= 0 || tasa < 0) {
      setError('I valori devono essere maggiori di zero (tranne la tasa di interesse)')
      return
    }

    try {
      const result = calcularAhorroCafe(precio, anni, tasa)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo del risparmio')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.precioCafe) setPrecioCafe(example.precioCafe as string)
    if (example.años) setAños(example.años as string)
    if (example.tasaInteres) setTasaInteres(example.tasaInteres as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/caffe-risparmio')

  const examples = [
    { label: 'Caffè Espresso', values: { precioCafe: '1.50', años: '10', tasaInteres: '5' } },
    { label: 'Cappuccino', values: { precioCafe: '3.00', años: '5', tasaInteres: '3' } },
    { label: 'Caffè Americano', values: { precioCafe: '2.50', años: '15', tasaInteres: '4' } },
    { label: 'Caffè Speciale', values: { precioCafe: '4.50', años: '20', tasaInteres: '6' } }
  ]

  const faqItems = [
    {
      question: 'Come funziona il calcolo del risparmio del caffè?',
      answer: 'Il calcolo considera il prezzo giornaliero del caffè, moltiplicato per 365 giorni all\'anno, e applica l\'interesse composto per il periodo specificato.'
    },
    {
      question: 'La tasa di interesse è realistica?',
      answer: 'Sì, utilizziamo tassi di interesse realistici che puoi ottenere con conti di risparmio o investimenti a basso rischio.'
    },
    {
      question: 'Posso modificare la tasa di interesse?',
      answer: 'Assolutamente! Puoi inserire qualsiasi tasa di interesse annuale per vedere come influisce sul tuo risparmio totale.'
    },
    {
      question: 'Il calcolo include l\'inflazione?',
      answer: 'No, questo calcolo è semplificato e non considera l\'inflazione. È utile per confrontare il risparmio potenziale.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Caffè vs. Risparmio',
            description: 'Scopri quanto risparmieresti se smettessi di prendere il caffè ogni giorno',
            url: '/it/curiosas/caffe-risparmio/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Caffè vs. Risparmio"
            description="Scopri quanto risparmieresti se smettessi di prendere il caffè ogni giorno. Calcola il tuo potenziale risparmio a lungo termine"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  Calcolatrice Caffè vs. Risparmio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Prezzo Caffè al Giorno (€)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Es: 2.50"
                        value={precioCafe}
                        onChange={(e) => setPrecioCafe(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Anni di Risparmio
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 10"
                        value={años}
                        onChange={(e) => setAños(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tasa Interesse Annuo (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 5"
                        value={tasaInteres}
                        onChange={(e) => setTasaInteres(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Risparmio
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
                        <CardTitle className="text-lg">Risultato Risparmio</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            €{resultado.ahorroTotal.toFixed(2)}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Risparmio Totale con Interesse
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            €{resultado.precioCafe} al giorno × 365 giorni × {resultado.años} anni con {resultado.tasaInteres}% di interesse annuo
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Risparmio Giornaliero:</span>
                            <span className="font-medium">€{resultado.ahorroDiario.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risparmio Annuo:</span>
                            <span className="font-medium">€{resultado.ahorroAnual.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risparmio Senza Interesse:</span>
                            <span className="font-medium">€{resultado.ahorroSinInteres.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guadagno da Interesse:</span>
                            <span className="font-medium">€{resultado.gananciaInteres.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risparmio Totale:</span>
                            <span className="font-medium">€{resultado.ahorroTotal.toFixed(2)}</span>
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
