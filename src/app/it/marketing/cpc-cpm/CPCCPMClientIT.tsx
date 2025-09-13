"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calculator, AlertCircle } from 'lucide-react'
import { calcularCPCCPM } from '@/lib/math/marketing'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function CPCCPMClientIT() {
  const [costoTotal, setCostoTotal] = useState('')
  const [clicks, setClicks] = useState('')
  const [impresiones, setImpresiones] = useState('')
  const [resultado, setResultado] = useState<{
    costoTotal: number
    clicks: number
    impresiones: number
    cpc: number
    cpm: number
    ctr: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const costo = parseFloat(costoTotal)
    const click = parseInt(clicks)
    const impresion = parseInt(impresiones)

    if (!costoTotal || !clicks || !impresiones) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(costo) || isNaN(click) || isNaN(impresion)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (costo <= 0 || click <= 0 || impresion <= 0) {
      setError('I valori devono essere maggiori di zero')
      return
    }

    if (click > impresion) {
      setError('I click non possono superare le impressioni')
      return
    }

    try {
      const result = calcularCPCCPM(costo, click, impresion)
      setResultado({
        costoTotal: result.inversionTotal,
        clicks: result.clicks,
        impresiones: result.impresiones,
        cpc: result.cpc,
        cpm: result.cpm,
        ctr: result.ctr
      })
    } catch {
      setError('Errore nel calcolo di CPC/CPM')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.costoTotal) setCostoTotal(example.costoTotal as string)
    if (example.clicks) setClicks(example.clicks as string)
    if (example.impresiones) setImpresiones(example.impresiones as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/marketing/cpc-cpm')

  const examples = [
    { label: 'Google Ads', values: { costoTotal: '500', clicks: '100', impresiones: '10000' } },
    { label: 'Facebook Ads', values: { costoTotal: '300', clicks: '150', impresiones: '15000' } },
    { label: 'LinkedIn Ads', values: { costoTotal: '800', clicks: '50', impresiones: '5000' } },
    { label: 'Instagram Ads', values: { costoTotal: '200', clicks: '80', impresiones: '8000' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il CPC (Costo Per Click)?',
      answer: 'Il CPC è il costo medio che paghi per ogni click sui tuoi annunci. Si calcola dividendo il costo totale per il numero di click ricevuti.'
    },
    {
      question: 'Cos\'è il CPM (Costo Per Mille)?',
      answer: 'Il CPM è il costo per mille impressioni (visualizzazioni) del tuo annuncio. È utile per confrontare l\'efficacia di diverse campagne.'
    },
    {
      question: 'Qual è un buon CPC?',
      answer: 'Un buon CPC dipende dal settore e dal valore del cliente. In generale, dovrebbe essere inferiore al 5-10% del valore medio per transazione.'
    },
    {
      question: 'Come migliorare CPC e CPM?',
      answer: 'Migliora la rilevanza degli annunci, ottimizza le keyword, migliora la qualità del sito, usa targeting più specifico e testa diversi formati creativi.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'CPC / CPM - Costo per Click e per Mille',
            description: 'Calcola il costo per click e per mille impressioni delle tue campagne pubblicitarie',
            url: '/it/marketing/cpc-cpm/',
            category: 'Marketing'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="CPC / CPM - Costo per Click e per Mille"
            description="Calcola il costo per click (CPC) e per mille impressioni (CPM) delle tue campagne pubblicitarie per ottimizzare gli investimenti"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calcolatrice CPC/CPM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Costo Totale (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 500"
                        value={costoTotal}
                        onChange={(e) => setCostoTotal(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Click Ricevuti
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 100"
                        value={clicks}
                        onChange={(e) => setClicks(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Impressioni
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 10000"
                        value={impresiones}
                        onChange={(e) => setImpresiones(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola CPC/CPM
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
                        <CardTitle className="text-lg">Risultati CPC/CPM</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              €{resultado.cpc.toFixed(2)}
                            </div>
                            <div className="text-sm text-blue-800">CPC (Costo per Click)</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              €{resultado.cpm.toFixed(2)}
                            </div>
                            <div className="text-sm text-green-800">CPM (Costo per Mille)</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {resultado.ctr.toFixed(2)}%
                            </div>
                            <div className="text-sm text-purple-800">CTR (Click Through Rate)</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Costo Totale:</span>
                            <span className="font-medium">€{resultado.costoTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Click Ricevuti:</span>
                            <span className="font-medium">{resultado.clicks.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Impressioni:</span>
                            <span className="font-medium">{resultado.impresiones.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CTR:</span>
                            <span className="font-medium">{resultado.ctr.toFixed(2)}%</span>
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
