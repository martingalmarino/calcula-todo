"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Heart, AlertCircle } from 'lucide-react'
import { calcularExpectativaVidaComida } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AspettativaVitaCiboClientIT() {
  const [edad, setEdad] = useState('')
  const [comidasChatarra, setComidasChatarra] = useState('')
  const [resultado, setResultado] = useState<{
    edad: number
    comidasChatarra: number
    expectativaVidaOriginal: number
    expectativaVidaAjustada: number
    añosPerdidos: number
    diasPerdidos: number
    comidasRestantes: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const age = parseInt(edad)
    const comidas = parseInt(comidasChatarra)

    if (!edad || !comidasChatarra) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(age) || isNaN(comidas)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (age < 0 || age > 120 || comidas < 0) {
      setError('L\'età deve essere tra 0 e 120 anni e le pietanze non possono essere negative')
      return
    }

    try {
      const result = calcularExpectativaVidaComida(age, comidas)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo dell\'aspettativa di vita')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.edad) setEdad(example.edad as string)
    if (example.comidasChatarra) setComidasChatarra(example.comidasChatarra as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/aspettativa-vita-cibo')

  const examples = [
    { label: 'Giovane Adulto', values: { edad: '25', comidasChatarra: '50' } },
    { label: 'Adulto Medio', values: { edad: '40', comidasChatarra: '200' } },
    { label: 'Persona Attiva', values: { edad: '30', comidasChatarra: '30' } },
    { label: 'Forte Consumatore', values: { edad: '35', comidasChatarra: '500' } }
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Età Attuale
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 30"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Pietanze Spazzatura Consumate
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 100"
                        value={comidasChatarra}
                        onChange={(e) => setComidasChatarra(e.target.value)}
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
                            {resultado.expectativaVidaAjustada.toFixed(1)} anni
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Aspettativa di Vita Aggiustata
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            Aspettativa originale: {resultado.expectativaVidaOriginal.toFixed(1)} anni
                          </p>
                          <p className="text-blue-800 text-sm">
                            Pietanze spazzatura: {resultado.comidasChatarra} (ogni pietanza riduce l\'aspettativa di vita)
                          </p>
                          <p className="text-blue-800 text-sm">
                            Anni persi: {resultado.añosPerdidos.toFixed(1)} anni
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Età Attuale:</span>
                            <span className="font-medium">{resultado.edad} anni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pietanze Spazzatura:</span>
                            <span className="font-medium">{resultado.comidasChatarra}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Aspettativa Originale:</span>
                            <span className="font-medium">{resultado.expectativaVidaOriginal.toFixed(1)} anni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Aspettativa Aggiustata:</span>
                            <span className="font-medium">{resultado.expectativaVidaAjustada.toFixed(1)} anni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Anni Persi:</span>
                            <span className="font-medium">{resultado.añosPerdidos.toFixed(1)} anni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Giorni Persi:</span>
                            <span className="font-medium">{resultado.diasPerdidos.toFixed(0)} giorni</span>
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
