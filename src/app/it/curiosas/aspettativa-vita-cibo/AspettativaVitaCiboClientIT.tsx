"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Heart, AlertCircle } from 'lucide-react'
import { calcularImpactoComidaChatarra } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AspettativaVitaCiboClientIT() {
  const [hamburguesas, setHamburguesas] = useState('')
  const [gaseosas, setGaseosas] = useState('')
  const [pizzas, setPizzas] = useState('')
  const [resultado, setResultado] = useState<{
    hamburguesas: number
    gaseosas: number
    pizzas: number
    diasPerdidosSemana: number
    diasPerdidosAño: number
    diasPerdidosVida: number
    añosPerdidos: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const hamb = parseInt(hamburguesas)
    const gas = parseInt(gaseosas)
    const piz = parseInt(pizzas)

    if (!hamburguesas || !gaseosas || !pizzas) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(hamb) || isNaN(gas) || isNaN(piz)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (hamb < 0 || gas < 0 || piz < 0) {
      setError('I valori non possono essere negativi')
      return
    }

    try {
      const result = calcularImpactoComidaChatarra(hamb, gas, piz)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo dell\'aspettativa di vita')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.hamburguesas) setHamburguesas(example.hamburguesas as string)
    if (example.gaseosas) setGaseosas(example.gaseosas as string)
    if (example.pizzas) setPizzas(example.pizzas as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/aspettativa-vita-cibo')

  const examples = [
    { label: 'Consumo Moderato', values: { hamburguesas: '2', gaseosas: '3', pizzas: '1' } },
    { label: 'Consumo Alto', values: { hamburguesas: '5', gaseosas: '7', pizzas: '3' } },
    { label: 'Consumo Basso', values: { hamburguesas: '1', gaseosas: '1', pizzas: '0' } },
    { label: 'Consumo Estremo', values: { hamburguesas: '10', gaseosas: '15', pizzas: '5' } }
  ]

  const faqItems = [
    {
      question: 'Come viene calcolata l\'aspettativa di vita?',
      answer: 'Il calcolo si basa su studi scientifici che correlano il consumo di cibo spazzatura con la riduzione dell\'aspettativa di vita. Ogni pietanza spazzatura riduce l\'aspettativa di vita di una piccola quantità.'
    },
    {
      question: 'Cosa si considera "cibo spazzatura"?',
      answer: 'Cibo spazzatura include hamburger, patatine fritte, pizza, dolci, bevande zuccherate e altri alimenti ad alto contenuto calorico e basso valore nutrizionale.'
    },
    {
      question: 'Il calcolo è scientificamente accurato?',
      answer: 'Il calcolo è basato su studi epidemiologici reali, ma è semplificato per scopi educativi. L\'aspettativa di vita reale dipende da molti altri fattori.'
    },
    {
      question: 'Posso migliorare la mia aspettativa di vita?',
      answer: 'Sì! Riducendo il consumo di cibo spazzatura e adottando una dieta equilibrata, puoi migliorare significativamente la tua aspettativa di vita.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Aspettativa di Vita e Cibo',
            description: 'Scopri come il cibo spazzatura influisce sulla tua aspettativa di vita',
            url: '/it/curiosas/aspettativa-vita-cibo/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Aspettativa di Vita e Cibo"
            description="Scopri come il cibo spazzatura influisce sulla tua aspettativa di vita. Calcola l\'impatto delle tue abitudini alimentari"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Calcolatrice Aspettativa di Vita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Hamburger a Settimana
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 2"
                        value={hamburguesas}
                        onChange={(e) => setHamburguesas(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bibite Gassate a Settimana
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 3"
                        value={gaseosas}
                        onChange={(e) => setGaseosas(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Pizze a Settimana
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 1"
                        value={pizzas}
                        onChange={(e) => setPizzas(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Aspettativa di Vita
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
                        <CardTitle className="text-lg">Risultato Aspettativa di Vita</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.añosPerdidos.toFixed(1)} anni
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Anni di Vita Persi
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            Hamburger: {resultado.hamburguesas} a settimana
                          </p>
                          <p className="text-blue-800 text-sm">
                            Bibite gassate: {resultado.gaseosas} a settimana
                          </p>
                          <p className="text-blue-800 text-sm">
                            Pizze: {resultado.pizzas} a settimana
                          </p>
                          <p className="text-blue-800 text-sm">
                            Anni persi: {resultado.añosPerdidos.toFixed(1)} anni
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Hamburger/Settimana:</span>
                            <span className="font-medium">{resultado.hamburguesas}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bibite/Settimana:</span>
                            <span className="font-medium">{resultado.gaseosas}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pizze/Settimana:</span>
                            <span className="font-medium">{resultado.pizzas}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Giorni Persi/Settimana:</span>
                            <span className="font-medium">{resultado.diasPerdidosSemana.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Giorni Persi/Anno:</span>
                            <span className="font-medium">{resultado.diasPerdidosAño.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Anni Persi:</span>
                            <span className="font-medium">{resultado.añosPerdidos.toFixed(1)}</span>
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
