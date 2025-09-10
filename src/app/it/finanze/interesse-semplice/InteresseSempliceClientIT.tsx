"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
import { calcularInteresSimple } from '@/lib/math/finance'

export default function InteresseSempliceClientIT() {
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [resultado, setResultado] = useState<{
    capital: number;
    tasa: number;
    tiempo: number;
    interes: number;
    montoTotal: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    try {
      const capitalNum = parseFloat(capital)
      const tasaNum = parseFloat(tasa) / 100 // Convertir porcentaje a decimal
      const tiempoNum = parseFloat(tiempo)

      if (isNaN(capitalNum) || isNaN(tasaNum) || isNaN(tiempoNum)) {
        setError('Inserisci valori numerici validi')
        return
      }

      if (capitalNum <= 0 || tasaNum <= 0 || tiempoNum <= 0) {
        setError('Tutti i valori devono essere maggiori di zero')
        return
      }

      const resultado = calcularInteresSimple(capitalNum, tasaNum, tiempoNum)
      setResultado(resultado)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const examples = [
    {
      label: 'Prestito personale di €10.000 al 12% annuo per 2 anni',
      values: { capital: '10000', tasa: '12', tiempo: '2' }
    },
    {
      label: 'Sconto per pagamento anticipato: €5.000 all\'8% per 6 mesi',
      values: { capital: '5000', tasa: '8', tiempo: '0.5' }
    },
    {
      label: 'Investimento semplice: €15.000 al 6% annuo per 3 anni',
      values: { capital: '15000', tasa: '6', tiempo: '3' }
    }
  ]

  const faqItems = [
    {
      question: "Cos'è l'interesse semplice?",
      answer: "L'interesse semplice è l'interesse che si calcola unicamente sul capitale iniziale, senza considerare gli interessi accumulati dei periodi precedenti. È ideale per prestiti brevi e operazioni semplici."
    },
    {
      question: "Qual è la formula dell'interesse semplice?",
      answer: "La formula è: I = C × r × t, dove I è l'interesse, C è il capitale, r è il tasso di interesse e t è il tempo."
    },
    {
      question: "Quando si usa l'interesse semplice?",
      answer: "Si usa principalmente per prestiti tra privati, sconti per pagamento anticipato, debiti di base e operazioni finanziarie a breve termine."
    },
    {
      question: "Come si differenzia dall'interesse composto?",
      answer: "L'interesse semplice si calcola solo sul capitale iniziale, mentre l'interesse composto si calcola sul capitale più gli interessi accumulati."
    }
  ]

  const relatedLinks = [
    { label: 'Calcolatrice di Mutuo', href: '/it/finanze/calcolatrice-mutuo', description: 'Calcola le rate del tuo mutuo' },
    { label: 'Risparmio Obiettivo', href: '/it/finanze/risparmio-obiettivo', description: 'Pianifica i tuoi risparmi' },
    { label: 'Valore Futuro e Presente', href: '/it/finanze/valore-futuro-presente', description: 'Calcola il valore degli investimenti' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setCapital(values.capital as string)
    setTasa(values.tasa as string)
    setTiempo(values.tiempo as string)
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Finanze', href: '/it/finanze' },
    { label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice' }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice Interesse Semplice',
            description: 'Calcola l\'interesse semplice per prestiti brevi, sconti e debiti di base',
            url: '/it/finanze/interesse-semplice/',
            category: 'finanze'
          }))
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs items={breadcrumbs} />

          <CalculatorLayout
            title="Calcolatrice Interesse Semplice"
            description="Calcola l'interesse semplice per prestiti brevi, sconti e debiti di base"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="calculator-label">
                    Capitale Iniziale (€)
                  </label>
                  <Input
                    type="number"
                    placeholder="Es: 10000"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="calculator-input"
                  />
                </div>

                <div>
                  <label className="calculator-label">
                    Tasso di Interesse Annuo (%)
                  </label>
                  <Input
                    type="number"
                    placeholder="Es: 12"
                    value={tasa}
                    onChange={(e) => setTasa(e.target.value)}
                    className="calculator-input"
                  />
                </div>

                <div>
                  <label className="calculator-label">
                    Tempo (anni)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Es: 2"
                    value={tiempo}
                    onChange={(e) => setTiempo(e.target.value)}
                    className="calculator-input"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Calculate Button */}
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcola Interesse Semplice
              </Button>

              {/* Results */}
              {resultado && (
                <div className="space-y-4">
                  <Card className="calculator-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Risultati del Calcolo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Capitale Iniziale</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            €{resultado.capital.toLocaleString()}
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Interesse Generato</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            €{resultado.interes.toLocaleString()}
                          </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Tasso Annuo</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">
                            {resultado.tasa.toFixed(2)}%
                          </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-orange-600" />
                            <span className="font-medium text-orange-800">Importo Totale</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-900">
                            €{resultado.montoTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Fórmula */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Formula utilizzata:</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Interesse = Capitale × Tasso × Tempo</strong>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          €{resultado.capital.toLocaleString()} × {resultado.tasa.toFixed(2)}% × {resultado.tiempo} anni = €{resultado.interes.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
