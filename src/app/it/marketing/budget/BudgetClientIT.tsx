"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DollarSign, AlertCircle } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function BudgetClientIT() {
  const [budgetTotal, setBudgetTotal] = useState('')
  const [canales, setCanales] = useState('')
  const [resultado, setResultado] = useState<{
    budgetTotal: number
    canales: number
    budgetPorCanal: number
    distribucion: Array<{ canal: string; porcentaje: number; presupuesto: number }>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const budget = parseFloat(budgetTotal)
    const canal = parseInt(canales)

    if (!budgetTotal || !canales) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(budget) || isNaN(canal)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (budget <= 0 || canal <= 0) {
      setError('I valori devono essere maggiori di zero')
      return
    }

    try {
      setResultado({
        budgetTotal: budget,
        canales: canal,
        budgetPorCanal: budget / canal,
        distribucion: Array.from({ length: canal }, (_, i) => ({
          canal: `Canale ${i + 1}`,
          porcentaje: 100 / canal,
          presupuesto: budget / canal
        }))
      })
    } catch {
      setError('Errore nel calcolo del budget')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.budgetTotal) setBudgetTotal(example.budgetTotal as string)
    if (example.canales) setCanales(example.canales as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/marketing/budget')

  const examples = [
    { label: 'Startup', values: { budgetTotal: '5000', canales: '3' } },
    { label: 'PMI', values: { budgetTotal: '15000', canales: '4' } },
    { label: 'Enterprise', values: { budgetTotal: '50000', canales: '6' } },
    { label: 'E-commerce', values: { budgetTotal: '25000', canales: '5' } }
  ]

  const faqItems = [
    {
      question: 'Come distribuire il budget di marketing?',
      answer: 'Distribuisci il budget basandoti sui canali più performanti, sui tuoi obiettivi e sul pubblico target. Monitora costantemente i risultati per ottimizzare.'
    },
    {
      question: 'Quali canali includere nel budget?',
      answer: 'Includi Google Ads, Facebook/Instagram, LinkedIn, email marketing, content marketing, SEO, eventi e qualsiasi altro canale rilevante per il tuo business.'
    },
    {
      question: 'Quanto budget dedicare a ogni canale?',
      answer: 'Non c\'è una regola fissa. Inizia con una distribuzione equilibrata e modifica basandoti sui risultati. I canali digitali spesso richiedono 60-80% del budget.'
    },
    {
      question: 'Come monitorare l\'efficacia del budget?',
      answer: 'Usa metriche come ROI, CAC, conversioni e revenue per canale. Rivedi e rialloca il budget mensilmente basandoti sui risultati.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Budget di Marketing',
            description: 'Pianifica e distribuisci il tuo budget pubblicitario in modo efficace',
            url: '/it/marketing/budget/',
            category: 'Marketing'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Budget di Marketing"
            description="Pianifica e distribuisci il tuo budget pubblicitario in modo efficace per massimizzare i risultati delle tue campagne"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Calcolatrice Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Budget Totale (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 15000"
                        value={budgetTotal}
                        onChange={(e) => setBudgetTotal(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Numero di Canali
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 4"
                        value={canales}
                        onChange={(e) => setCanales(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Budget
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
                        <CardTitle className="text-lg">Distribuzione Budget</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            €{resultado.budgetPorCanal.toFixed(2)}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Budget per Canale
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {resultado.distribucion.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <div className="font-medium">{item.canal}</div>
                                <div className="text-sm text-gray-600">{item.porcentaje.toFixed(1)}% del budget</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">€{item.presupuesto.toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Budget Totale:</span>
                            <span className="font-medium">€{resultado.budgetTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Numero Canali:</span>
                            <span className="font-medium">{resultado.canales}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Budget per Canale:</span>
                            <span className="font-medium">€{resultado.budgetPorCanal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Percentuale per Canale:</span>
                            <span className="font-medium">{(100/resultado.canales).toFixed(1)}%</span>
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
