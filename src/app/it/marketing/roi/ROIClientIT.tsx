"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Users, AlertCircle } from 'lucide-react'
import { calcularROIMarketing } from '@/lib/math/marketing'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function ROIClientIT() {
  const [ingresos, setIngresos] = useState('')
  const [inversion, setInversion] = useState('')
  const [resultado, setResultado] = useState<{
    ingresos: number
    inversion: number
    ganancia: number
    roi: number
    roiPorcentaje: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const ingreso = parseFloat(ingresos)
    const inv = parseFloat(inversion)

    if (!ingresos || !inversion) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(ingreso) || isNaN(inv)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (ingreso < 0 || inv <= 0) {
      setError('I ricavi non possono essere negativi e l\'investimento deve essere maggiore di zero')
      return
    }

    try {
      const result = calcularROIMarketing(ingreso, inv)
      setResultado({
        ingresos: result.ingresos,
        inversion: result.inversion,
        ganancia: result.gananciaNeta,
        roi: result.ratioROI,
        roiPorcentaje: result.roi
      })
    } catch {
      setError('Errore nel calcolo del ROI')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.ingresos) setIngresos(example.ingresos as string)
    if (example.inversion) setInversion(example.inversion as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/marketing/roi')

  const examples = [
    { label: 'Campagna Google Ads', values: { ingresos: '5000', inversion: '1000' } },
    { label: 'Facebook Marketing', values: { ingresos: '3000', inversion: '800' } },
    { label: 'Email Marketing', values: { ingresos: '8000', inversion: '500' } },
    { label: 'Content Marketing', values: { ingresos: '12000', inversion: '2000' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il ROI in marketing?',
      answer: 'Il ROI (Return on Investment) misura il ritorno sull\'investimento delle tue campagne di marketing. Indica quanto profitto generi per ogni euro investito.'
    },
    {
      question: 'Qual è un buon ROI per il marketing?',
      answer: 'Un ROI del 300-500% (3:1 o 5:1) è considerato buono. Tuttavia, questo varia per settore. L\'importante è che sia positivo e in crescita.'
    },
    {
      question: 'Come migliorare il ROI del marketing?',
      answer: 'Ottimizza le campagne, migliora il targeting, aumenta i tassi di conversione, riduci i costi per acquisizione e migliora la retention dei clienti.'
    },
    {
      question: 'Il ROI include tutti i costi?',
      answer: 'Per un calcolo accurato, includi tutti i costi diretti e indiretti: pubblicità, personale, strumenti, tempo e risorse utilizzate.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'ROI in Marketing - Ritorno sull\'Investimento',
            description: 'Misura il ritorno sull\'investimento delle tue campagne pubblicitarie',
            url: '/it/marketing/roi/',
            category: 'Marketing'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="ROI in Marketing - Ritorno sull'Investimento"
            description="Misura il ritorno sull'investimento (ROI) delle tue campagne pubblicitarie per valutare l'efficacia del marketing"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Calcolatrice ROI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ricavi Generati (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 5000"
                        value={ingresos}
                        onChange={(e) => setIngresos(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Investimento Marketing (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 1000"
                        value={inversion}
                        onChange={(e) => setInversion(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola ROI
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
                        <CardTitle className="text-lg">Risultato ROI</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.roiPorcentaje.toFixed(1)}%
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Ritorno sull&apos;Investimento
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            (€{resultado.ingresos.toLocaleString()} - €{resultado.inversion.toLocaleString()}) ÷ €{resultado.inversion.toLocaleString()} × 100 = {resultado.roiPorcentaje.toFixed(1)}% ROI
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Ricavi Generati:</span>
                            <span className="font-medium">€{resultado.ingresos.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Investimento:</span>
                            <span className="font-medium">€{resultado.inversion.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guadagno Netto:</span>
                            <span className="font-medium">€{resultado.ganancia.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ROI:</span>
                            <span className="font-medium">{resultado.roi.toFixed(2)}:1</span>
                          </div>
                        </div>

                        {resultado.roiPorcentaje > 0 && (
                          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <div className="text-green-800 text-sm">
                              <strong>Ottimo risultato!</strong> Per ogni euro investito in marketing, hai generato €{resultado.roi.toFixed(2)} in ricavi.
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
