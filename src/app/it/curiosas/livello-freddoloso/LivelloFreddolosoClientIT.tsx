"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Thermometer, AlertCircle } from 'lucide-react'
import { calcularNivelFrio } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function LivelloFreddolosoClientIT() {
  const [temperatura, setTemperatura] = useState('')
  const [abbigliamento, setAbbigliamento] = useState('')
  const [umidita, setUmidita] = useState('')
  const [resultado, setResultado] = useState<{
    temperatura: number
    abbigliamento: string
    umidita: number
    nivelFrio: number
    descripcionNivel: string
    consejos: string[]
    equivalenciaActividades: string[]
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const temp = parseFloat(temperatura)
    const humedad = parseFloat(umidita)

    if (!temperatura || !abbigliamento || !umidita) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(temp) || isNaN(humedad)) {
      setError('Inserisci valori numerici validi per temperatura e umidità')
      return
    }

    if (temp < -50 || temp > 50 || humedad < 0 || humedad > 100) {
      setError('Temperatura deve essere tra -50°C e 50°C, umidità tra 0% e 100%')
      return
    }

    try {
      const result = calcularNivelFrio(temp, abbigliamento, humedad)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo del livello di freddoloso')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.temperatura) setTemperatura(example.temperatura as string)
    if (example.abbigliamento) setAbbigliamento(example.abbigliamento as string)
    if (example.umidita) setUmidita(example.umidita as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/livello-freddoloso')

  const examples = [
    { label: 'Inverno Milano', values: { temperatura: '2', abbigliamento: 'pesante', umidita: '80' } },
    { label: 'Autunno Roma', values: { temperatura: '15', abbigliamento: 'medio', umidita: '60' } },
    { label: 'Primavera Napoli', values: { temperatura: '20', abbigliamento: 'leggero', umidita: '50' } },
    { label: 'Estate Sicilia', values: { temperatura: '30', abbigliamento: 'minimo', umidita: '70' } }
  ]

  const faqItems = [
    {
      question: 'Come viene calcolato il livello di freddoloso?',
      answer: 'Il calcolo considera la temperatura ambiente, il tipo di abbigliamento indossato e l\'umidità relativa per determinare quanto freddo senti rispetto alla media.'
    },
    {
      question: 'L\'umidità influisce sulla sensazione di freddo?',
      answer: 'Sì! L\'umidità alta aumenta la sensazione di freddo perché il corpo perde calore più rapidamente. L\'umidità bassa invece riduce la sensazione di freddo.'
    },
    {
      question: 'Quali fattori influenzano la sensazione di freddo?',
      answer: 'Oltre a temperatura, abbigliamento e umidità, anche età, sesso, peso, attività fisica e abitudini personali influenzano la sensazione di freddo.'
    },
    {
      question: 'Come posso ridurre la sensazione di freddo?',
      answer: 'Indossa abbigliamento a strati, mantieni i piedi e le mani caldi, bevi bevande calde, fai attività fisica e mantieni una dieta equilibrata.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Livello di Freddoloso',
            description: 'Scopri il tuo livello di freddoloso basato su temperatura e abbigliamento',
            url: '/it/curiosas/livello-freddoloso/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Livello di Freddoloso"
            description="Scopri il tuo livello di freddoloso basato su temperatura e abbigliamento. Calcola quanto freddo senti rispetto agli altri"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Calcolatrice Livello di Freddoloso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Temperatura (°C)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Es: 15"
                        value={temperatura}
                        onChange={(e) => setTemperatura(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tipo di Abbigliamento
                      </label>
                      <Select value={abbigliamento} onValueChange={setAbbigliamento}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleziona abbigliamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimo">Minimo (camicia/canottiera)</SelectItem>
                          <SelectItem value="leggero">Leggero (maglietta + felpa)</SelectItem>
                          <SelectItem value="medio">Medio (maglietta + giacca)</SelectItem>
                          <SelectItem value="pesante">Pesante (maglietta + felpa + giacca)</SelectItem>
                          <SelectItem value="estremo">Estremo (maglietta + felpa + giacca + cappotto)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Umidità Relativa (%)
                      </label>
                      <Input
                        type="number"
                        step="1"
                        placeholder="Es: 60"
                        value={umidita}
                        onChange={(e) => setUmidita(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Livello di Freddoloso
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
                        <CardTitle className="text-lg">Risultato Livello di Freddoloso</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.nivelFrio}/10
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            {resultado.descripcionNivel}
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            Temperatura: {resultado.temperatura}°C
                          </p>
                          <p className="text-blue-800 text-sm">
                            Abbigliamento: {resultado.abbigliamento}
                          </p>
                          <p className="text-blue-800 text-sm">
                            Umidità: {resultado.umidita}%
                          </p>
                          <p className="text-blue-800 text-sm">
                            Livello di freddoloso: {resultado.nivelFrio}/10
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Temperatura:</span>
                            <span className="font-medium">{resultado.temperatura}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Abbigliamento:</span>
                            <span className="font-medium">{resultado.abbigliamento}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Umidità:</span>
                            <span className="font-medium">{resultado.umidita}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Livello Freddoloso:</span>
                            <span className="font-medium">{resultado.nivelFrio}/10</span>
                          </div>
                        </div>

                        {resultado.consejos.length > 0 && (
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Consigli per Te:</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                              {resultado.consejos.map((consejo, index) => (
                                <li key={index}>• {consejo}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {resultado.equivalenciaActividades.length > 0 && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Equivalenze:</h4>
                            <ul className="text-purple-800 text-sm space-y-1">
                              {resultado.equivalenciaActividades.map((actividad, index) => (
                                <li key={index}>• {actividad}</li>
                              ))}
                            </ul>
                          </div>
                        )}
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
