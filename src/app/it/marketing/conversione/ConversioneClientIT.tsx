"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BarChart3, AlertCircle } from 'lucide-react'
import { calcularConversion } from '@/lib/math/marketing'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function ConversioneClientIT() {
  const [visitantes, setVisitantes] = useState('')
  const [leads, setLeads] = useState('')
  const [ventas, setVentas] = useState('')
  const [resultado, setResultado] = useState<{
    visitantes: number
    leads: number
    ventas: number
    tasaVisitasALeads: number
    tasaLeadsAVentas: number
    tasaVisitasAVentas: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const visit = parseInt(visitantes)
    const lead = parseInt(leads)
    const venta = parseInt(ventas)

    if (!visitantes || !leads || !ventas) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(visit) || isNaN(lead) || isNaN(venta)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (visit <= 0 || lead <= 0 || venta <= 0) {
      setError('I valori devono essere maggiori di zero')
      return
    }

    if (lead > visit || venta > lead) {
      setError('I leads non possono superare i visitatori e le vendite non possono superare i leads')
      return
    }

    try {
      const result = calcularConversion(visit, lead, venta)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo delle conversioni')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.visitantes) setVisitantes(example.visitantes as string)
    if (example.leads) setLeads(example.leads as string)
    if (example.ventas) setVentas(example.ventas as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/marketing/conversione')

  const examples = [
    { label: 'E-commerce', values: { visitantes: '10000', leads: '500', ventas: '50' } },
    { label: 'SaaS B2B', values: { visitantes: '5000', leads: '200', ventas: '20' } },
    { label: 'Lead Generation', values: { visitantes: '8000', leads: '400', ventas: '30' } },
    { label: 'App Mobile', values: { visitantes: '15000', leads: '750', ventas: '75' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è la conversione in marketing?',
      answer: 'La conversione è il processo di trasformare visitatori in leads e leads in clienti. Le percentuali di conversione misurano l\'efficacia del tuo funnel di vendita.'
    },
    {
      question: 'Quali sono le percentuali di conversione tipiche?',
      answer: 'Le percentuali variano per settore: e-commerce 2-3%, SaaS B2B 1-2%, lead generation 3-5%. L\'importante è migliorare costantemente i propri numeri.'
    },
    {
      question: 'Come posso migliorare le mie conversioni?',
      answer: 'Ottimizza la landing page, migliora la user experience, usa call-to-action chiari, testa A/B, personalizza il contenuto e riduci l\'attrito nel processo.'
    },
    {
      question: 'Qual è la differenza tra lead e vendita?',
      answer: 'Un lead è un potenziale cliente che ha mostrato interesse, mentre una vendita è la conversione finale in cliente pagante.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Conversione',
            description: 'Analizza le tue conversioni e ottimizza il funnel di vendita',
            url: '/it/marketing/conversione/',
            category: 'Marketing'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Conversione"
            description="Analizza le tue conversioni e ottimizza il funnel di vendita per migliorare i risultati delle tue campagne"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Calcolatrice Conversione
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Visitatori
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 10000"
                        value={visitantes}
                        onChange={(e) => setVisitantes(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Leads Generati
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 500"
                        value={leads}
                        onChange={(e) => setLeads(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Vendite Realizzate
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 50"
                        value={ventas}
                        onChange={(e) => setVentas(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Conversioni
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
                        <CardTitle className="text-lg">Risultati Conversione</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              {resultado.tasaVisitasALeads.toFixed(2)}%
                            </div>
                            <div className="text-sm text-blue-800">Visitatori → Leads</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {resultado.tasaLeadsAVentas.toFixed(2)}%
                            </div>
                            <div className="text-sm text-green-800">Leads → Vendite</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {resultado.tasaVisitasAVentas.toFixed(2)}%
                            </div>
                            <div className="text-sm text-purple-800">Visitatori → Vendite</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Visitatori Totali:</span>
                            <span className="font-medium">{resultado.visitantes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Leads Generati:</span>
                            <span className="font-medium">{resultado.leads.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vendite Realizzate:</span>
                            <span className="font-medium">{resultado.ventas.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conversione Totale:</span>
                            <span className="font-medium">{resultado.tasaVisitasAVentas.toFixed(2)}%</span>
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
