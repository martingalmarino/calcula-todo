"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pizza, AlertCircle } from 'lucide-react'
import { calcularPizzasNecesarias } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function PizzaPersonaClientIT() {
  const [personas, setPersonas] = useState('')
  const [nivelHambre, setNivelHambre] = useState('')
  const [tamañoPizza, setTamañoPizza] = useState('')
  const [resultado, setResultado] = useState<{
    personas: number
    nivelHambre: number
    tamañoPizza: string
    porcionesNecesarias: number
    pizzasNecesarias: number
    porcionesPorPizza: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const pers = parseInt(personas)
    const hambre = parseInt(nivelHambre)

    if (!personas || !nivelHambre || !tamañoPizza) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(pers) || isNaN(hambre)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (pers <= 0 || hambre < 1 || hambre > 5) {
      setError('Le persone devono essere maggiori di 0 e il livello di fame tra 1 e 5')
      return
    }

    try {
      const result = calcularPizzasNecesarias(pers, hambre, tamañoPizza)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo delle pizze')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.personas) setPersonas(example.personas as string)
    if (example.nivelHambre) setNivelHambre(example.nivelHambre as string)
    if (example.tamañoPizza) setTamañoPizza(example.tamañoPizza as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/pizza-persona')

  const examples = [
    { label: 'Festa Piccola', values: { personas: '4', nivelHambre: '3', tamañoPizza: 'mediana' } },
    { label: 'Cena Famiglia', values: { personas: '6', nivelHambre: '4', tamañoPizza: 'grande' } },
    { label: 'Festa Grande', values: { personas: '12', nivelHambre: '3', tamañoPizza: 'grande' } },
    { label: 'Cena Romantica', values: { personas: '2', nivelHambre: '2', tamañoPizza: 'pequeña' } }
  ]

  const faqItems = [
    {
      question: 'Come funziona il calcolo delle pizze?',
      answer: 'Il calcolo considera il numero di persone, il loro livello di fame (1-5) e la dimensione della pizza per determinare quante pizze servono.'
    },
    {
      question: 'Quali sono i livelli di fame?',
      answer: '1 = Poco fame, 2 = Fame normale, 3 = Fame media, 4 = Molto fame, 5 = Fame estrema. Ogni livello corrisponde a un numero diverso di porzioni per persona.'
    },
    {
      question: 'Quante porzioni ha ogni pizza?',
      answer: 'Pizza piccola: 4 porzioni, Pizza media: 6 porzioni, Pizza grande: 8 porzioni. Questi sono standard comuni nel settore.'
    },
    {
      question: 'Il calcolo è accurato per tutti i tipi di pizza?',
      answer: 'Il calcolo è basato su pizze standard. Pizze con ingredienti particolari o dimensioni non standard potrebbero richiedere aggiustamenti.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Pizza per Persona',
            description: 'Calcola quante pizze servono per il tuo gruppo di amici',
            url: '/it/curiosas/pizza-persona/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Pizza per Persona"
            description="Calcola quante pizze servono per il tuo gruppo di amici. Scopri la quantità perfetta di pizza per ogni occasione"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pizza className="h-5 w-5" />
                  Calcolatrice Pizza per Persona
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Numero di Persone
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 6"
                        value={personas}
                        onChange={(e) => setPersonas(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Livello di Fame (1-5)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Es: 3"
                        value={nivelHambre}
                        onChange={(e) => setNivelHambre(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Dimensione Pizza
                      </label>
                      <Select value={tamañoPizza} onValueChange={setTamañoPizza}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleziona dimensione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pequeña">Piccola (4 porzioni)</SelectItem>
                          <SelectItem value="mediana">Media (6 porzioni)</SelectItem>
                          <SelectItem value="grande">Grande (8 porzioni)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Pizze
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
                        <CardTitle className="text-lg">Risultato Calcolo Pizze</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.pizzasNecesarias}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Pizze Necessarie
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            {resultado.personas} persone × {resultado.nivelHambre} livello fame = {resultado.porcionesNecesarias} porzioni necessarie
                          </p>
                          <p className="text-blue-800 text-sm">
                            {resultado.porcionesNecesarias} porzioni ÷ {resultado.porcionesPorPizza} porzioni/pizza = {resultado.pizzasNecesarias} pizze
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Numero Persone:</span>
                            <span className="font-medium">{resultado.personas}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Livello Fame:</span>
                            <span className="font-medium">{resultado.nivelHambre}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dimensione Pizza:</span>
                            <span className="font-medium">{resultado.tamañoPizza}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Porzioni Necessarie:</span>
                            <span className="font-medium">{resultado.porcionesNecesarias}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Porzioni per Pizza:</span>
                            <span className="font-medium">{resultado.porcionesPorPizza}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pizze Necessarie:</span>
                            <span className="font-medium">{resultado.pizzasNecesarias}</span>
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
