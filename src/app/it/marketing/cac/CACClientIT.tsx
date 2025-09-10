"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Target, AlertCircle } from 'lucide-react'
import { calcularCAC } from '@/lib/math/marketing'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function CACClientIT() {
  const [inversionTotal, setInversionTotal] = useState('')
  const [nuevosClientes, setNuevosClientes] = useState('')
  const [resultado, setResultado] = useState<{
    inversionTotal: number
    nuevosClientes: number
    cac: number
    inversionPorCliente: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const inversion = parseFloat(inversionTotal)
    const clientes = parseInt(nuevosClientes)

    if (!inversionTotal || !nuevosClientes) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(inversion) || isNaN(clientes)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (inversion <= 0 || clientes <= 0) {
      setError('I valori devono essere maggiori di zero')
      return
    }

    try {
      const result = calcularCAC(inversion, clientes)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo del CAC')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.inversionTotal) setInversionTotal(example.inversionTotal as string)
    if (example.nuevosClientes) setNuevosClientes(example.nuevosClientes as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/marketing/cac')

  const examples = [
    { label: 'Startup Tech', values: { inversionTotal: '10000', nuevosClientes: '100' } },
    { label: 'E-commerce', values: { inversionTotal: '5000', nuevosClientes: '50' } },
    { label: 'Servizi B2B', values: { inversionTotal: '25000', nuevosClientes: '25' } },
    { label: 'App Mobile', values: { inversionTotal: '15000', nuevosClientes: '300' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il CAC (Costo di Acquisizione del Cliente)?',
      answer: 'Il CAC è il costo medio per acquisire un nuovo cliente. Include tutti i costi di marketing e vendite divisi per il numero di nuovi clienti acquisiti.'
    },
    {
      question: 'Qual è un buon rapporto CAC/LTV?',
      answer: 'Un rapporto CAC/LTV di 1:3 o superiore è considerato sano. Questo significa che il valore a lungo termine del cliente è almeno 3 volte il costo di acquisizione.'
    },
    {
      question: 'Come posso ridurre il mio CAC?',
      answer: 'Puoi ridurre il CAC migliorando la qualità del traffico, ottimizzando le campagne, aumentando i tassi di conversione e riducendo i costi per click.'
    },
    {
      question: 'Il CAC include tutti i costi di marketing?',
      answer: 'Sì, il CAC dovrebbe includere tutti i costi diretti e indiretti di marketing e vendite: pubblicità, personale, strumenti, eventi, ecc.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'CAC - Costo di Acquisizione del Cliente',
            description: 'Calcola il costo di acquisizione del cliente per ottimizzare le tue campagne di marketing',
            url: '/it/marketing/cac/',
            category: 'Marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="CAC - Costo di Acquisizione del Cliente"
            description="Calcola il costo di acquisizione del cliente per ottimizzare le tue campagne di marketing e vendite"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Calcolatrice CAC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Investimento Totale (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 10000"
                        value={inversionTotal}
                        onChange={(e) => setInversionTotal(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nuovi Clienti Acquisiti
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 100"
                        value={nuevosClientes}
                        onChange={(e) => setNuevosClientes(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola CAC
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
                        <CardTitle className="text-lg">Risultato CAC</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            €{resultado.cac.toFixed(2)}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Costo di Acquisizione per Cliente
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            Investimento totale di €{resultado.inversionTotal.toLocaleString()} diviso per {resultado.nuevosClientes} nuovi clienti = €{resultado.cac.toFixed(2)} per cliente
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Investimento Totale:</span>
                            <span className="font-medium">€{resultado.inversionTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nuovi Clienti:</span>
                            <span className="font-medium">{resultado.nuevosClientes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CAC Calcolato:</span>
                            <span className="font-medium">€{resultado.cac.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Costo per Cliente:</span>
                            <span className="font-medium">€{resultado.inversionPorCliente.toFixed(2)}</span>
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
