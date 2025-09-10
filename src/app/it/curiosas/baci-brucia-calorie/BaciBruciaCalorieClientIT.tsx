"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Target, AlertCircle } from 'lucide-react'
import { calcularCaloriasBesoAbrazo } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function BaciBruciaCalorieClientIT() {
  const [peso, setPeso] = useState('')
  const [minutosBeso, setMinutosBeso] = useState('')
  const [minutosAbrazo, setMinutosAbrazo] = useState('')
  const [resultado, setResultado] = useState<{
    peso: number
    minutosBeso: number
    minutosAbrazo: number
    caloriasBeso: number
    caloriasAbrazo: number
    caloriasTotal: number
    equivalenciaEjercicio: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const weight = parseFloat(peso)
    const beso = parseFloat(minutosBeso)
    const abrazo = parseFloat(minutosAbrazo)

    if (!peso || !minutosBeso || !minutosAbrazo) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(weight) || isNaN(beso) || isNaN(abrazo)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (weight <= 0 || beso < 0 || abrazo < 0) {
      setError('Il peso deve essere maggiore di zero e i minuti non possono essere negativi')
      return
    }

    try {
      const result = calcularCaloriasBesoAbrazo(weight, beso, abrazo)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo delle calorie')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.peso) setPeso(example.peso as string)
    if (example.minutosBeso) setMinutosBeso(example.minutosBeso as string)
    if (example.minutosAbrazo) setMinutosAbrazo(example.minutosAbrazo as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/baci-brucia-calorie')

  const examples = [
    { label: 'Cena Romantica', values: { peso: '70', minutosBeso: '10', minutosAbrazo: '15' } },
    { label: 'Serata in Casa', values: { peso: '65', minutosBeso: '5', minutosAbrazo: '20' } },
    { label: 'Weekend Passionale', values: { peso: '75', minutosBeso: '20', minutosAbrazo: '30' } },
    { label: 'Giornata Normale', values: { peso: '60', minutosBeso: '2', minutosAbrazo: '5' } }
  ]

  const faqItems = [
    {
      question: 'Come vengono calcolate le calorie bruciate?',
      answer: 'Il calcolo si basa su studi scientifici che misurano il dispendio energetico durante baci e abbracci. I baci bruciano più calorie degli abbracci per l\'intensità dell\'attività.'
    },
    {
      question: 'I baci bruciano davvero calorie?',
      answer: 'Sì! I baci coinvolgono molti muscoli facciali e possono aumentare la frequenza cardiaca, bruciando calorie. È un\'attività fisica leggera ma reale.'
    },
    {
      question: 'Quanto è accurato questo calcolo?',
      answer: 'Il calcolo è basato su studi scientifici, ma il dispendio calorico reale varia in base all\'intensità, durata e caratteristiche individuali.'
    },
    {
      question: 'Posso usare questo per perdere peso?',
      answer: 'I baci e abbracci bruciano poche calorie, ma sono ottimi per il benessere emotivo e la salute del cuore. Per perdere peso, combina con esercizio regolare e dieta equilibrata.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Baci Brucia Calorie',
            description: 'Calcola quante calorie bruci baciando e abbracciando',
            url: '/it/curiosas/baci-brucia-calorie/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Baci Brucia Calorie"
            description="Calcola quante calorie bruci baciando e abbracciando. Scopri l\'attività fisica nascosta nelle dimostrazioni d\'affetto"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Calcolatrice Baci Brucia Calorie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Peso (kg)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 70"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Minuti di Baci
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 10"
                        value={minutosBeso}
                        onChange={(e) => setMinutosBeso(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Minuti di Abbracci
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 15"
                        value={minutosAbrazo}
                        onChange={(e) => setMinutosAbrazo(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Calorie Bruciate
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
                        <CardTitle className="text-lg">Risultato Calorie Bruciate</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.caloriasTotal.toFixed(1)} calorie
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Calorie Totali Bruciate
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            Baci: {resultado.minutosBeso} minuti × {resultado.peso} kg = {resultado.caloriasBeso.toFixed(1)} calorie
                          </p>
                          <p className="text-blue-800 text-sm">
                            Abbracci: {resultado.minutosAbrazo} minuti × {resultado.peso} kg = {resultado.caloriasAbrazo.toFixed(1)} calorie
                          </p>
                          <p className="text-blue-800 text-sm">
                            Equivalente a: {resultado.equivalenciaEjercicio}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Peso:</span>
                            <span className="font-medium">{resultado.peso} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Minuti Baci:</span>
                            <span className="font-medium">{resultado.minutosBeso}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Minuti Abbracci:</span>
                            <span className="font-medium">{resultado.minutosAbrazo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Calorie Baci:</span>
                            <span className="font-medium">{resultado.caloriasBeso.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Calorie Abbracci:</span>
                            <span className="font-medium">{resultado.caloriasAbrazo.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Calorie Totali:</span>
                            <span className="font-medium">{resultado.caloriasTotal.toFixed(1)}</span>
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
