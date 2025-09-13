"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { calcularLTV } from '@/lib/math/marketing'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function LTVClientIT() {
  const [ticketPromedio, setTicketPromedio] = useState('')
  const [frecuenciaCompra, setFrecuenciaCompra] = useState('')
  const [duracionRelacion, setDuracionRelacion] = useState('')
  const [resultado, setResultado] = useState<{
    ticketPromedio: number
    frecuenciaCompra: number
    duracionRelacion: number
    ltv: number
    valorAnual: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const ticket = parseFloat(ticketPromedio)
    const frecuencia = parseFloat(frecuenciaCompra)
    const duracion = parseFloat(duracionRelacion)

    if (!ticketPromedio || !frecuenciaCompra || !duracionRelacion) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(ticket) || isNaN(frecuencia) || isNaN(duracion)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (ticket <= 0 || frecuencia <= 0 || duracion <= 0) {
      setError('I valori devono essere maggiori di zero')
      return
    }

    try {
      const result = calcularLTV(ticket, frecuencia, duracion)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo del LTV')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.ticketPromedio) setTicketPromedio(example.ticketPromedio as string)
    if (example.frecuenciaCompra) setFrecuenciaCompra(example.frecuenciaCompra as string)
    if (example.duracionRelacion) setDuracionRelacion(example.duracionRelacion as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/marketing/ltv')

  const examples = [
    { label: 'E-commerce Fashion', values: { ticketPromedio: '80', frecuenciaCompra: '4', duracionRelacion: '3' } },
    { label: 'SaaS B2B', values: { ticketPromedio: '500', frecuenciaCompra: '12', duracionRelacion: '5' } },
    { label: 'Restaurant', values: { ticketPromedio: '25', frecuenciaCompra: '24', duracionRelacion: '2' } },
    { label: 'Fitness App', values: { ticketPromedio: '15', frecuenciaCompra: '12', duracionRelacion: '4' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il LTV (Lifetime Value)?',
      answer: 'Il LTV è il valore totale che un cliente genera per la tua azienda durante l\'intera durata della relazione commerciale.'
    },
    {
      question: 'Come posso aumentare il LTV dei miei clienti?',
      answer: 'Puoi aumentare il LTV migliorando la retention, aumentando la frequenza di acquisto, offrendo prodotti complementari e migliorando l\'esperienza cliente.'
    },
    {
      question: 'Qual è la differenza tra LTV e valore per transazione?',
      answer: 'Il valore per transazione è quanto spende un cliente in una singola transazione, mentre il LTV considera tutte le transazioni durante la relazione.'
    },
    {
      question: 'Come uso il LTV per le decisioni di marketing?',
      answer: 'Il LTV ti aiuta a determinare quanto puoi spendere per acquisire un cliente (CAC) mantenendo un rapporto LTV/CAC sano.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'LTV - Lifetime Value del Cliente',
            description: 'Calcola il valore a lungo termine di un cliente per ottimizzare le tue strategie di retention',
            url: '/it/marketing/ltv/',
            category: 'Marketing'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="LTV - Lifetime Value del Cliente"
            description="Calcola il valore a lungo termine di un cliente per ottimizzare le tue strategie di retention e marketing"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Calcolatrice LTV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ticket Medio (€)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 80"
                        value={ticketPromedio}
                        onChange={(e) => setTicketPromedio(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Frequenza Acquisti/Anno
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 4"
                        value={frecuenciaCompra}
                        onChange={(e) => setFrecuenciaCompra(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Durata Relazione (anni)
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 3"
                        value={duracionRelacion}
                        onChange={(e) => setDuracionRelacion(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola LTV
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
                        <CardTitle className="text-lg">Risultato LTV</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            €{resultado.ltv.toFixed(2)}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Lifetime Value del Cliente
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            €{resultado.ticketPromedio} × {resultado.frecuenciaCompra} acquisti/anno × {resultado.duracionRelacion} anni = €{resultado.ltv.toFixed(2)} LTV
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Ticket Medio:</span>
                            <span className="font-medium">€{resultado.ticketPromedio}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frequenza Acquisti:</span>
                            <span className="font-medium">{resultado.frecuenciaCompra}/anno</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Durata Relazione:</span>
                            <span className="font-medium">{resultado.duracionRelacion} anni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Valore Annuo:</span>
                            <span className="font-medium">€{resultado.valorAnual.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>LTV Totale:</span>
                            <span className="font-medium">€{resultado.ltv.toFixed(2)}</span>
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
